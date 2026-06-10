document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name    = document.getElementById('name').value;
  const email   = document.getElementById('email').value;
  const message = document.getElementById('msg').value;
  const result  = document.getElementById('result');
  const btn     = document.getElementById('submitBtn');

  // Reset result box
  result.textContent = '';
  result.className = '';
  result.style.display = 'none';

  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    const res = await fetch('http://localhost:8080/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ name, email, message }).toString()
    });

    if (!res.ok) throw new Error('Server error');

    await res.text();

    result.textContent = '✅ Message saved to database successfully!';
    result.className = 'success';
    result.style.display = 'block';
    this.reset();

  } catch (err) {
    result.textContent = '❌ Could not connect. Is Spring Boot running on port 8080?';
    result.className = 'error';
    result.style.display = 'block';

  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }
});
