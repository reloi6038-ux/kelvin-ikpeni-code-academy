(function () {
  "use strict";

  var BASE = "/api";

  async function request(path, options) {
    options = options || {};
    var res = await fetch(BASE + path, {
      method: options.method || "GET",
      headers: Object.assign(
        { Accept: "application/json" },
        options.body ? { "Content-Type": "application/json" } : {},
        options.headers || {}
      ),
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: "same-origin"
    });

    var contentType = res.headers.get("content-type") || "";
    var payload = contentType.includes("application/json") ? await res.json() : await res.text();

    if (!res.ok) {
      var err = new Error((payload && payload.message) || "Request failed (" + res.status + ")");
      err.status = res.status;
      err.payload = payload;
      throw err;
    }
    return payload;
  }

  window.KICA = window.KICA || {};
  window.KICA.api = {
    get: function (p) { return request(p); },
    post: function (p, body) { return request(p, { method: "POST", body: body }); },
    put: function (p, body) { return request(p, { method: "PUT", body: body }); },
    patch: function (p, body) { return request(p, { method: "PATCH", body: body }); },
    del: function (p) { return request(p, { method: "DELETE" }); },
    health: function () { return request("/health"); },

    auth: {
      register: function (body) { return request("/auth/register", { method: "POST", body: body }); },
      login:    function (body) { return request("/auth/login", { method: "POST", body: body }); },
      logout:   function () { return request("/auth/logout", { method: "POST" }); },
      me:       function () { return request("/auth/me"); },
      forgot:   function (body) { return request("/auth/forgot-password", { method: "POST", body: body }); },
      reset:    function (body) { return request("/auth/reset-password", { method: "POST", body: body }); }
    }
  };
})();