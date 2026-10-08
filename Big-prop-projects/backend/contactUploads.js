import { emptyContact } from '../src/lib/contactValidation.js';
import { validateUploads } from '../src/lib/contactUploads.js';

export async function parseContactMultipart(body, contentType) {
  const form = await new Response(body, { headers: { 'Content-Type': contentType } }).formData();
  const payload = Object.create(null);
  const files = [];
  let textBytes = 0;
  for (const [key, value] of form) {
    if (key === 'images' && typeof value !== 'string') { files.push(value); continue; }
    if (typeof value !== 'string' || !(Object.hasOwn(emptyContact, key) || key === 'captchaToken') || Object.hasOwn(payload, key)) {
      throw new Error('Unexpected or duplicate form field.');
    }
    textBytes += Buffer.byteLength(value);
    if (textBytes > 24 * 1024) throw new Error('Form text is too large.');
    payload[key] = value;
  }
  const error = validateUploads(files);
  if (error) return { payload, attachments: [], error };
  const attachments = [];
  for (const file of files) {
    const bytes = Buffer.from(await file.arrayBuffer());
    const png = bytes.length >= 24 && bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
      && bytes.toString('ascii', 12, 16) === 'IHDR';
    const jpg = bytes.length >= 4 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    const expectsPNG = /\.png$/i.test(file.name);
    if (expectsPNG ? !png : !jpg) return { payload, attachments: [], error: 'One of the files is not a valid PNG or JPG image.' };
    const name = file.name.split(/[\\/]/).pop().replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120);
    attachments.push({ name, type: expectsPNG ? 'image/png' : 'image/jpeg', bytes });
  }
  return { payload, attachments, error: '' };
}
