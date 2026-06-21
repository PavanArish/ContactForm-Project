const API_URL = 'http://localhost:8080/contacts';

const tableEl      = document.getElementById('contactsTable');
const bodyEl        = document.getElementById('contactsBody');
const loadingEl     = document.getElementById('loading');
const errorEl       = document.getElementById('error');
const emptyStateEl  = document.getElementById('emptyState');
const refreshBtn    = document.getElementById('refreshBtn');

async function loadContacts() {
  // Reset UI state
  loadingEl.style.display = 'block';
  errorEl.style.display = 'none';
  tableEl.style.display = 'none';
  emptyStateEl.style.display = 'none';
  bodyEl.innerHTML = '';

  try {
    const res = await fetch(API_URL);

    if (!res.ok) throw new Error('Server returned an error');

    const contacts = await res.json();

    loadingEl.style.display = 'none';

    if (contacts.length === 0) {
      emptyStateEl.style.display = 'block';
      return;
    }

    contacts.forEach(contact => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${contact.id}</td>
        <td>${escapeHtml(contact.name)}</td>
        <td>${escapeHtml(contact.email)}</td>
        <td>${escapeHtml(contact.message)}</td>
      `;
      bodyEl.appendChild(row);
    });

    tableEl.style.display = 'table';

  } catch (err) {
    loadingEl.style.display = 'none';
    errorEl.textContent = '❌ Could not load contacts. Is Spring Boot running on port 8080?';
    errorEl.style.display = 'block';
  }
}

// Basic escaping to avoid breaking the table if message contains HTML
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

refreshBtn.addEventListener('click', loadContacts);

// Load contacts as soon as the page opens
loadContacts();
