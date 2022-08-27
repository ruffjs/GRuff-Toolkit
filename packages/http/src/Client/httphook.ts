const XHR = window.XMLHttpRequest;
const rawFetch = window.fetch;

(window as any).XMLHttpRequest = class XMLHttpRequest
  extends XHR
  implements XMLHttpRequest
{
  constructor() {
    console.log("XMLHttpRequest");
    super();
  }

  open(method: string, url: string | URL): void;
  open(
    method: string,
    url: string | URL,
    async: boolean,
    username?: string | null | undefined,
    password?: string | null | undefined
  ): void;
  open(
    method: unknown,
    url: unknown,
    async?: unknown,
    username?: unknown,
    password?: unknown
  ): void {
    console.log(method, url);
    super.open(method, url, async, username, password);
  }

  send(body?: Document | XMLHttpRequestBodyInit | null | undefined): void {
    super.send(body);
  }
};

(window as any).fetch = function fetch(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  console.log("fetch", input, init);
  return rawFetch(input, init);
};

export default {};
