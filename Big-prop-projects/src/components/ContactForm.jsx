import { useId, useState } from 'react';
import { Select } from '@base-ui/react/select';
import { HiChevronDown, HiCheck } from 'react-icons/hi2';

const projectTypes = [
  { value: 'painting', label: 'Painting' },
  { value: 'waterproofing', label: 'Waterproofing' },
  { value: 'roofing', label: 'Roofing' },
  { value: 'renovations', label: 'Residential & Commercial Renovations' },
];
const budgets = [
  { value: 'under10', label: 'Under R10,000' },
  { value: '10-30', label: 'R10,000 - R30,000' },
  { value: '30-75', label: 'R30,000 - R75,000' },
  { value: '75-150', label: 'R75,000 - R150,000' },
  { value: 'over150', label: 'R150,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

function FormSelect({ id, label, name, items, value, onValueChange }) {
  return (
    <div className="contact-field">
      <label id={id + '-label'} htmlFor={id}>{label} *</label>
      <Select.Root name={name} items={items} value={value} onValueChange={onValueChange} required>
        <Select.Trigger id={id} aria-labelledby={id + '-label'} className="contact-select-trigger">
          <Select.Value placeholder="Please select" />
          <Select.Icon className="contact-select-icon"><HiChevronDown aria-hidden="true" /></Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className="contact-select-positioner" sideOffset={6} alignItemWithTrigger={false}>
            <Select.Popup className="contact-select-popup">
              <Select.List className="contact-select-list">
                {items.map((item) => (
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
    </div>
  );
}

// Pass your existing submission handler as onSubmit when the backend is ready.
function ContactForm({ onSubmit }) {
  const id = useId();
  const [projectType, setProjectType] = useState(null);
  const [budget, setBudget] = useState(null);
  const [status, setStatus] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (onSubmit) { onSubmit(event); return; }
    setStatus('This form is not connected yet. Please call +27 81 045 0505 to discuss your project.');
  }

  return (
    <form className="contact-form-section" onSubmit={handleSubmit} onReset={() => {
      setProjectType(null); setBudget(null); setStatus('');
    }}>
      <div className="contact-field">
        <label htmlFor={id + '-name'}>Full name *</label>
        <input id={id + '-name'} name="fullName" type="text" autoComplete="name" placeholder="Your full name" required />
      </div>

      <div className="contact-field">
        <label htmlFor={id + '-email'}>Email address *</label>
        <input id={id + '-email'} name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </div>

      <div className="contact-field">
        <label htmlFor={id + '-area'}>Area *</label>
        <input id={id + '-area'} name="area" type="text" autoComplete="address-level2" placeholder="Suburb or city" required />
      </div>

      <div className="contact-field">
        <label htmlFor={id + '-company'}>Company (optional)</label>
        <input id={id + '-company'} name="company" type="text" autoComplete="organization" placeholder="Company name" />
      </div>

      <FormSelect id={id + '-project'} label="Project type" name="projectType" items={projectTypes} value={projectType} onValueChange={setProjectType} />
      <FormSelect id={id + '-budget'} label="Budget" name="budget" items={budgets} value={budget} onValueChange={setBudget} />
      
      <div className="contact-field contact-field-wide">
        <label htmlFor={id + '-description'}>Brief description of your project needs *</label>
        <textarea id={id + '-description'} name="description" placeholder="Tell us a little about your project" required />
      </div>

      <fieldset className="radio-buttons-div">
        <legend>When are you looking to get started? *</legend>
        <div className="radio-items">
          {[
            ['explore-option', 'Just exploring'],
            ['future-option', 'In the near future'],
            ['asap-option', 'As soon as possible'],
          ].map(([value, label]) => (
            <label className="radio-option" key={value}>
              <input type="radio" name="timeline" value={value} required />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-buttons">
        <button className="submit-btn" type="submit">Submit</button>
        <button className="clear-btn" type="reset">Clear</button>
      </div>

      {status && <p className="contact-form-status" role="status">{status}</p>}
    </form>
  );
}

export default ContactForm;
