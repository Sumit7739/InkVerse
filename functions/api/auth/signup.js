import { hashPassword, newSessionToken, sessionExpiryIso } from '../../_lib/auth';
import { json, methodNotAllowed, readJsonBody } from '../../_lib/json';

export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return methodNotAllowed();
  }

  const body = await readJsonBody(context.request);
  const username = body?.username?.trim();
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password;

  if (!username || !email || !password) {
    return json({ success: false, error: 'Username, email, and password are required.' }, 400);
  }

  if (username.length < 3) {
    return json({ success: false, error: 'Username must be at least 3 characters.' }, 400);
  }

  if (password.length < 8) {
    return json({ success: false, error: 'Password must be at least 8 characters.' }, 400);
  }

  try {
    const { DB } = context.env;
    const existing = await DB.prepare(
      'SELECT id FROM Users WHERE email = ? OR username = ? LIMIT 1'
    )
      .bind(email, username)
      .first();

    if (existing) {
      return json({ success: false, error: 'An account already exists with this email or username.' }, 409);
    }

    const passwordHash = await hashPassword(password);
    const insertResult = await DB.prepare(
      'INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)'
    )
      .bind(username, email, passwordHash)
      .run();

    const userId = insertResult.meta?.last_row_id;
    if (!userId) {
      return json({ success: false, error: 'Failed to create account.' }, 500);
    }

    const token = newSessionToken();
    const expiresAt = sessionExpiryIso();

    await DB.prepare(
      'INSERT INTO Sessions (token, user_id, expires_at) VALUES (?, ?, ?)'
    )
      .bind(token, userId, expiresAt)
      .run();

    return json({
      success: true,
      token,
      user: {
        id: userId,
        username,
        email,
      },
      expiresAt,
    });
  } catch (error) {
    return json({ success: false, error: error.message || 'Unexpected server error.' }, 500);
  }
}
