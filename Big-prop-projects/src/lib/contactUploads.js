export const uploadLimits = { count: 5, perFile: 5 * 1024 * 1024, total: 10 * 1024 * 1024 };
export const uploadHelp = 'PNG or JPG only. Up to 5 images, 5 MB each and 10 MB total.';

export function validateUploads(files) {
  if (files.length > uploadLimits.count) return 'Please choose no more than 5 images.';
  let total = 0;
  for (const file of files) {
    const extension = /\.(png|jpe?g)$/i.exec(file.name || '')?.[1].toLowerCase();
    const expected = extension === 'png' ? 'image/png' : 'image/jpeg';
    if (!extension || (file.type && file.type !== expected)) return 'Please upload PNG or JPG images only.';
    if (!file.size) return 'Empty files cannot be attached.';
    if (file.size > uploadLimits.perFile) return 'Each image must be 5 MB or smaller.';
    total += file.size;
  }
  return total > uploadLimits.total ? 'The images must total 10 MB or less.' : '';
}
