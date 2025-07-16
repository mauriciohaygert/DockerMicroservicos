const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const ENRICHMENT_API_URL = import.meta.env.VITE_ENRICHMENT_API_URL || 'http://localhost:3001';

function getToken() {
  return localStorage.getItem('token');
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login inválido');
  return res.json();
}

export async function getUsers(page = 1, perPage = 15) {
  const res = await fetch(`${API_URL}/api/users?page=${page}&per_page=${perPage}`, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  return res.json();
}

export async function getUser(id) {
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error('Erro ao buscar usuário');
  return res.json();
}

export async function createUser(data) {
  const res = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar usuário');
  return res.json();
}

export async function getEnrichmentUser(uuid) {
  const res = await fetch(`${ENRICHMENT_API_URL}/users/enriched/${uuid}`);
  if (!res.ok) throw new Error('Erro ao buscar dados enriquecidos');
  return res.json();
} 