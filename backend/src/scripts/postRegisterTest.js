(
async () => {
  const url = 'http://localhost:5000/api/auth/register';
  const body = { name: 'AutoTest', email: `autotest${Date.now()}@example.com`, password: 'password123' };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    console.log('STATUS:', res.status);
    console.log('HEADERS:', Object.fromEntries(res.headers));
    console.log('BODY:', text);
      // Attempt login with same credentials
      const loginUrl = 'http://localhost:5000/api/auth/login';
      const loginRes = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: body.email, password: body.password }),
      });
      const loginText = await loginRes.text();
      console.log('\nLOGIN STATUS:', loginRes.status);
      console.log('LOGIN BODY:', loginText);
  } catch (err) {
    console.error('Request error:', err);
    process.exit(1);
  }
})();
