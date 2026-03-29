export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pair = url.searchParams.get("pair");
    
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (!pair) {
      return new Response(JSON.stringify({ error: "pair required" }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const target = `https://indodax.com/api/ticker/${pair}`;

    try {
      const res = await fetch(target, {
        headers: corsHeaders
      });

      const data = await res.text();

      return new Response(data, {
        headers: corsHeaders
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }
};
