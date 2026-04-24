const AUTH_STORAGE_KEY = 'inkverse.auth';

export async function signup(payload) {
  return callAuthEndpoint('/api/auth/signup', payload);
}

export async function login(payload) {
  return callAuthEndpoint('/api/auth/login', payload);
}

export async function fetchCurrentUser(token) {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch current user.');
  }

  return data;
}

function persistSession(session) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function storeAuthSession(result) {
  const session = {
    token: result.token,
    user: result.user,
    expiresAt: result.expiresAt,
  };
  persistSession(session);
}

export function getAuthSession() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed?.token || !parsed?.user || !parsed?.expiresAt) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    const isExpired = new Date(parsed.expiresAt).getTime() <= Date.now();
    if (isExpired) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

async function callAuthEndpoint(path, payload) {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Request failed.');
  }

  return data;
}
