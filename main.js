export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pair = url.searchParams.get("pair");

    const target = `https://indodax.com/api/${pair}/depth`;

    const response = await fetch(target);

    const data = await response.text();

    return new Response(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
  }
};
