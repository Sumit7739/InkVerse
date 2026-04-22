export async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}

export function methodNotAllowed() {
  return json({ success: false, error: 'Method not allowed.' }, 405);
}
