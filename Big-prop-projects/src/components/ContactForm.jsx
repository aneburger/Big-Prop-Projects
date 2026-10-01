import { useId, useRef, useState } from 'react';
import { Select } from '@base-ui/react/select';
import { HiChevronDown, HiCheck } from 'react-icons/hi2';
import { budgets, projectTypes, timelines, limits, emptyContact, validateContact } from '../lib/contactValidation';
import { getContactToken } from '../lib/recaptcha';

function FormSelect({ id, label, name, items, value, onValueChange, error, disabled }) {
  return (
    <div className="contact-field">
      <label id={id + '-label'} htmlFor={id}>{label} *</label>
      <Select.Root name={name} items={items} value={value || null} onValueChange={onValueChange} required disabled={disabled}>
        <Select.Trigger id={id} aria-labelledby={id + '-label'} aria-invalid={Boolean(error)}
          aria-describedby={error ? id + '-error' : undefined} className="contact-select-trigger">
          <Select.Value placeholder="Please select" />
          <Select.Icon className="contact-select-icon"><HiChevronDown aria-hidden="true" /></Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className="contact-select-positioner" sideOffset={6} alignItemWithTrigger={false}>
            <Select.Popup className="contact-select-popup">
              <Select.List className="contact-select-list">
                {items.map(item => (
                  <Select.Item key={item.value} value={item.value} className="contact-select-item">
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator className="contact-select-check"><HiCheck aria-hidden="true" /></Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
      {error && <p className="contact-field-error" id={id + '-error'}>{error}</p>}
    </div>
  );
}

export default function ContactForm() {
  const id = useId();
  const [values, setValues] = useState({ ...emptyContact });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const busy = useRef(false);
  const summary = useRef(null);

  function change(name, value) {
    const next = { ...values, [name]: value ?? '' };
    setValues(next);
    setStatus('');
    if (errors[name]) setErrors(previous => ({ ...previous, [name]: validateContact(next).errors[name] }));
  }
  function blur(name) {
    setErrors(previous => ({ ...previous, [name]: validateContact(values).errors[name] }));
  }
  function showMessage(message) {
    setStatus(message);
    requestAnimationFrame(() => summary.current?.focus());
  }
  function clear() {
    if (busy.current) return;
    setValues({ ...emptyContact }); setErrors({}); setStatus('');
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (busy.current) return;
    const result = validateContact(values);
    setErrors(result.errors);
    if (Object.keys(result.errors).length) {
      showMessage('Please check the highlighted fields and submit again.');
      return;
    }
    busy.current = true;
    setSubmitting(true);
    setStatus('Verifying your submission…');
    const controller = new AbortController();
    let timeout;
    try {
      let captchaToken;
      try { captchaToken = await getContactToken(); }
      catch {
        showMessage('Verification could not be completed. Please check your connection and try again, or call +27 81 045 0505.');
        return;
      }
      setStatus('Sending your enquiry…');
      timeout = setTimeout(() => controller.abort(), 25000);
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.values, captchaToken }), signal: controller.signal,
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || data?.success !== true) {
        if (data?.errors && typeof data.errors === 'object') {
          setErrors(Object.fromEntries(Object.entries(data.errors)
            .filter(([key, value]) => key in emptyContact && typeof value === 'string')));
        }
        showMessage(data?.message || 'We could not send your enquiry. Please try again or call +27 81 045 0505.');
        return;
      }
      setValues({ ...emptyContact }); setErrors({});
      showMessage('Thank you! Your enquiry has been submitted. We’ll be in touch.');
    } catch {
      showMessage('We could not confirm submission. Your details are still here. Please try again later or call +27 81 045 0505.');
    } finally {
      clearTimeout(timeout); busy.current = false; setSubmitting(false);
    }
  }
  const fieldProps = name => ({
    id: `${id}-${name}`, name, value: values[name], disabled: submitting,
    maxLength: limits[name], onChange: event => change(name, event.target.value), onBlur: () => blur(name),
    'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
  });
  const fieldError = name => errors[name] && <p className="contact-field-error" id={`${id}-${name}-error`}>{errors[name]}</p>;

  return (
    <form className="contact-form-section" noValidate onSubmit={handleSubmit} aria-busy={submitting}>
      <div className="contact-field">
        <label htmlFor={`${id}-fullName`}>Full name *</label>
        <input {...fieldProps('fullName')} type="text" autoComplete="name" placeholder="Your full name" required />
        {fieldError('fullName')}
      </div>
      <div className="contact-field">
        <label htmlFor={`${id}-email`}>Email address *</label>
        <input {...fieldProps('email')} type="email" autoComplete="email" placeholder="you@example.com" required />
        {fieldError('email')}
      </div>
      <div className="contact-field">
        <label htmlFor={`${id}-area`}>Area *</label>
        <input {...fieldProps('area')} type="text" autoComplete="address-level2" placeholder="Suburb or city" required />
        {fieldError('area')}
      </div>
      <div className="contact-field">
        <label htmlFor={`${id}-company`}>Company (optional)</label>
        <input {...fieldProps('company')} type="text" autoComplete="organization" placeholder="Company name" />
        {fieldError('company')}
      </div>
      <FormSelect id={`${id}-projectType`} name="projectType" label="Project type" items={projectTypes}
        value={values.projectType} onValueChange={value => change('projectType', value)} error={errors.projectType} disabled={submitting} />
      <FormSelect id={`${id}-budget`} name="budget" label="Budget" items={budgets}
        value={values.budget} onValueChange={value => change('budget', value)} error={errors.budget} disabled={submitting} />
      <div className="contact-field contact-field-wide">
        <label htmlFor={`${id}-description`}>Brief description of your project needs *</label>
        <textarea {...fieldProps('description')} placeholder="Tell us a little about your project" required />
        {fieldError('description')}
      </div>
      <fieldset className="radio-buttons-div" disabled={submitting} aria-describedby={errors.timeline ? `${id}-timeline-error` : undefined}>
        <legend>When are you looking to get started? *</legend>
        <div className="radio-items">
          {timelines.map(({ value, label }) => (
            <label className="radio-option" key={value}>
              <input type="radio" name="timeline" value={value} checked={values.timeline === value}
                onChange={() => change('timeline', value)} aria-invalid={Boolean(errors.timeline)} required />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {fieldError('timeline')}
      </fieldset>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input id={`${id}-website`} name="website" value={values.website} onChange={event => change('website', event.target.value)}
          tabIndex={-1} autoComplete="off" maxLength={120} />
      </div>
      <div className="form-buttons">
        <button className="submit-btn" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Submit'}</button>
        <button className="clear-btn" type="button" disabled={submitting} onClick={clear}>Clear</button>
      </div>
      <p className="contact-recaptcha-notice">
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </p>
      <p ref={summary} className="contact-form-status" tabIndex={-1} role="status" aria-live="polite">{status}</p>
    </form>
  );
}
