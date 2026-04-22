import { newSessionToken, sessionExpiryIso, verifyPassword } from '../../_lib/auth';
import { json, methodNotAllowed, readJsonBody } from '../../_lib/json';

export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return methodNotAllowed();
  }

  const body = await readJsonBody(context.request);
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password;

  if (!email || !password) {
    return json({ success: false, error: 'Email and password are required.' }, 400);
  }

  try {
    const { DB } = context.env;
    const user = await DB.prepare(
      'SELECT id, username, email, password_hash FROM Users WHERE email = ? LIMIT 1'
    )
      .bind(email)
      .first();

    if (!user) {
      return json({ success: false, error: 'Invalid email or password.' }, 401);
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return json({ success: false, error: 'Invalid email or password.' }, 401);
    }

    const token = newSessionToken();
    const expiresAt = sessionExpiryIso();

    await DB.prepare('INSERT INTO Sessions (token, user_id, expires_at) VALUES (?, ?, ?)')
      .bind(token, user.id, expiresAt)
      .run();

    return json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      expiresAt,
    });
  } catch (error) {
    return json({ success: false, error: error.message || 'Unexpected server error.' }, 500);
  }
}
