export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pair = url.searchParams.get("pair");

    if (!pair) {
      return new Response(JSON.stringify({ error: "pair required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const target = `https://indodax.com/api/${pair}/depth`;

    try {
      const res = await fetch(target, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept": "application/json",
          "Accept-Language": "en-US,en;q=0.9"
        }
      });

      const data = await res.text();

      return new Response(data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
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
