export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pair = url.searchParams.get("pair");

    if (!pair) {
      return new Response(JSON.stringify({ error: "pair is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const target = `https://indodax.com/api/${pair}/depth`;

    try {
      const res = await fetch(target);
      const data = await res.text();

      return new Response(data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
