// Production API URL - GitHub Pages doesn't support environment variables easily
const API_BASE_URL = 'https://vistaloom-backend.onrender.com';

export async function apiFetch<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function apiDelete(path: string): Promise<void> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, { method: 'DELETE' });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
}