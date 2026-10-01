let loading;
const SCRIPT_ID = 'big-prop-recaptcha';
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function loadRecaptcha() {
  if (!siteKey) return Promise.reject(new Error('Verification is not configured. Please call +27 81 045 0505.'));
  if (window.grecaptcha?.execute) return Promise.resolve(window.grecaptcha);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const script = document.getElementById(SCRIPT_ID) || document.createElement('script');
    const timeout = setTimeout(() => fail(), 12000);
    function fail() {
      clearTimeout(timeout);
      script.remove();
      reject(new Error('Verification could not load. Please check your connection and try again.'));
    }
    script.onload = () => {
      if (!window.grecaptcha?.ready) { fail(); return; }
      window.grecaptcha.ready(() => {
        clearTimeout(timeout);
        resolve(window.grecaptcha);
      });
    };
    script.onerror = fail;
    if (!script.isConnected) {
      script.id = SCRIPT_ID;
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      script.async = true;
      document.head.appendChild(script);
    }
  }).catch(error => { loading = undefined; throw error; });
  return loading;
}

export async function getContactToken() {
  const captcha = await loadRecaptcha();
  let timeout;
  try {
    const token = await Promise.race([
      captcha.execute(siteKey, { action: 'contact_submit' }),
      new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error('Verification timed out. Please try again.')), 12000); }),
    ]);
    if (typeof token !== 'string' || !token) throw new Error('Verification failed. Please try again.');
    return token;
  } finally { clearTimeout(timeout); }
}
