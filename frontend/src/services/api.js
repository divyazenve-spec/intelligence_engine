// Fetch client for the Django backend. Not used by the compiled bundle (it has its own client).
const BASE = import.meta.env?.VITE_API_BASE_URL || '/api/v1';

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify({ data: body }) : undefined,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const loadData = () => request('/data');
export const saveSale = (sale) => request('/sales/save', { method: 'POST', body: sale });
export const importSales = (rows) => request('/sales/import', { method: 'POST', body: { rows } });
export const aiBrief = (filters) => request('/ai/brief', { method: 'POST', body: filters });
