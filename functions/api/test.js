export async function onRequest(context) {
  try {
    // context.env contains all bindings, including our D1 database 'DB'
    const { env } = context;
    const { results } = await env.DB.prepare("SELECT * FROM Users").all();
    
    return new Response(JSON.stringify({ success: true, users: results }), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  }
}
