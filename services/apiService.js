export default class ApiService {
  constructor(baseUrl, defaultReq) {
    console.log("service1");
    const { headers, ...rest } = defaultReq;
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.rest = rest;
  }

  fetcher = (url, config) => {
    const promise = fetch(this.baseUrl + url, {
      ...this.rest,
      ...config,
      headers: {
        ...this.headers,
        ...config.headers,
      },
    });
    return {
      json: async () => {
        const response = await promise;

        if (!response.ok) {
          return Promise.reject(await response.json());
        }
        return await response.json();
      },
      text: async () => {
        const response = await promise;
        if (!response.ok) {
          return Promise.reject(await response.text());
        }
      },
    };
  };

  get(url, config = {}) {
    return this.fetcher(url, { ...config, method: "GET" });
  }
  post(url, config = {}) {
    return this.fetcher(url, { ...config, method: "POST" });
  }
  delete(url, config = {}) {
    return this.fetcher(url, { ...config, method: "POST" });
  }
  put(url, config = {}) {
    return this.fetcher(url, { ...config, method: "POST" });
  }
}
