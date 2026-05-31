document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name    = document.getElementById('name').value;
  const email   = document.getElementById('email').value;
  const message = document.getElementById('msg').value;
  const result  = document.getElementById('result');
  const btn     = document.getElementById('submitBtn');

  // reset result box
  result.textContent = '';
  result.removeAttribute('class');
  result.style.display = 'none';

  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    const res = await fetch('http://localhost:8080/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ name, email, message }).toString()
    });

    await res.text();

    // show success
    result.textContent = '✅ Contact Form Submitted Successfully!';
    result.style.display = 'block';
    result.style.padding = '0.65rem';
    result.style.borderRadius = '8px';
    result.style.fontSize = '0.84rem';
    result.style.textAlign = 'center';
    result.style.background = '#f6f0e4';
    result.style.color = '#5c4a30';
    result.style.border = '1px solid #d9cebc';
    this.reset();

  } catch (err) {

    // show error
    result.textContent = '❌ Could not connect. Is Spring Boot running on port 8080?';
    result.style.display = 'block';
    result.style.padding = '0.65rem';
    result.style.borderRadius = '8px';
    result.style.fontSize = '0.84rem';
    result.style.textAlign = 'center';
    result.style.background = '#fdf5ee';
    result.style.color = '#8b3a1a';
    result.style.border = '1px solid #f0c9a8';

  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }
});