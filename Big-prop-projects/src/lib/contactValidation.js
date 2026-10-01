export const projectTypes = [
  { value: 'painting', label: 'Painting' },
  { value: 'waterproofing', label: 'Waterproofing' },
  { value: 'roofing', label: 'Roofing' },
  { value: 'renovations', label: 'Residential & Commercial Renovations' },
];
export const budgets = [
  { value: 'under10', label: 'Under R10,000' },
  { value: '10-30', label: 'R10,000 - R30,000' },
  { value: '30-75', label: 'R30,000 - R75,000' },
  { value: '75-150', label: 'R75,000 - R150,000' },
  { value: 'over150', label: 'R150,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
];
export const timelines = [
  { value: 'explore-option', label: 'Just exploring' },
  { value: 'future-option', label: 'In the near future' },
  { value: 'asap-option', label: 'As soon as possible' },
];
export const limits = { fullName: 100, email: 254, area: 120, company: 120, description: 3000 };
export const emptyContact = {
  fullName: '', email: '', area: '', company: '', projectType: '', budget: '', description: '', timeline: '', website: '',
};
export function validEmail(value) {
  if (typeof value !== 'string' || value.length > 254) return false;
  const parts = value.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  return local.length <= 64 && /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local)
    && !local.startsWith('.') && !local.endsWith('.') && !local.includes('..')
    && domain.includes('.') && domain.split('.').every(label =>
      label.length <= 63 && /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label));
}

// Pure and shared: both browser and API validate this exact submitted snapshot.
export function validateContact(input) {
  const values = { ...emptyContact };
  const errors = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { values, errors: { form: 'Please submit a valid contact form.' } };
  }
  for (const field of Object.keys(values)) {
    const raw = input[field];
    if (raw !== undefined && typeof raw !== 'string') {
      errors[field] = 'Please enter a valid value.';
      continue;
    }
    const text = raw ?? '';
    const max = limits[field] ?? 120;
    if (text.length > max) errors[field] = `Please use ${max} characters or fewer.`;
    // Allow line breaks/tabs in descriptions, but never in email/header fields.
    const hasControls = Array.from(text).some(character => {
      const code = character.codePointAt(0);
      if (field === 'description' && [9, 10, 13].includes(code)) return false;
      return code < 32 || code === 127;
    });
    if (hasControls) errors[field] = 'Please remove unsupported control characters.';
    values[field] = field === 'description' ? text.trim() : text.trim().replace(/ +/g, ' ');
  }
  for (const [field, label] of Object.entries({ fullName: 'Full name', email: 'Email address', area: 'Area', description: 'Project description' })) {
    if (!values[field] && !errors[field]) errors[field] = `${label} is required.`;
  }
  if (!errors.email && !validEmail(values.email)) errors.email = 'Please enter a valid email address.';
  for (const [field, items, message] of [
    ['projectType', projectTypes, 'Please select a project type.'],
    ['budget', budgets, 'Please select a budget.'],
    ['timeline', timelines, 'Please select when you would like to start.'],
  ]) {
    if (!items.some(item => item.value === values[field])) errors[field] = message;
  }
  return { values, errors };
}
