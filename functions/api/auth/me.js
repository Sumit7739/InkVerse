import { json, methodNotAllowed } from '../../_lib/json';

function extractBearerToken(request) {
  const authHeader = request.headers.get('authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice('Bearer '.length).trim();
}

export async function onRequest(context) {
  if (context.request.method !== 'GET') {
    return methodNotAllowed();
  }

  const token = extractBearerToken(context.request);
  if (!token) {
    return json({ success: false, error: 'Unauthorized.' }, 401);
  }

  try {
    const { DB } = context.env;
    const row = await DB.prepare(
      `SELECT u.id, u.username, u.email, s.expires_at
       FROM Sessions s
       JOIN Users u ON u.id = s.user_id
       WHERE s.token = ?
         AND datetime(s.expires_at) > datetime('now')
       LIMIT 1`
    )
      .bind(token)
      .first();

    if (!row) {
      return json({ success: false, error: 'Session is invalid or expired.' }, 401);
    }

    return json({
      success: true,
      user: {
        id: row.id,
        username: row.username,
        email: row.email,
      },
      expiresAt: row.expires_at,
    });
  } catch (error) {
    return json({ success: false, error: error.message || 'Unexpected server error.' }, 500);
  }
}
