export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/article" || url.pathname.startsWith("/article/")) {
      const articleURL = new URL(request.url);
      articleURL.pathname = "/article.html";
      return env.ASSETS.fetch(new Request(articleURL, request));
    }

    return env.ASSETS.fetch(request);
  }
};
