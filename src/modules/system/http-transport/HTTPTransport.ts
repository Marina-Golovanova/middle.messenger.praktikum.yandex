enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type IData = Document | XMLHttpRequestBodyInit | null | undefined;

type IOptions = {
  method?: METHODS;
  data?: IData;
  timeout?: number;
  headers?: Record<string, string>;
};

type IHTTPMethod = (url: string, options?: IOptions) => Promise<unknown>;

const queryStringify = (data: IData) => {
  const formattedData = data
    ? Object.entries(data).reduce(
        (acc, curr, idx) =>
          acc +
          `${curr[0]}=${curr[1]}` +
          (idx === Object.entries(data).length - 1 ? '' : '&'),
        '?',
      )
    : '';
  return formattedData;
};

export class HTTPTransport {
  get: IHTTPMethod = (url, options = {}) => {
    const { data } = options;
    const formattedData = queryStringify(data);

    return this.request(
      url + formattedData,
      { ...options, method: METHODS.GET },
      options.timeout as number,
    );
  };

  put: IHTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  post: IHTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  delete: IHTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url: string, options: IOptions, timeout?: number) => {
    const { method = METHODS.GET, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout || 5000;

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
