type HTTPMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"
  | "TRACE"
  | "CONNECT";

interface FetchOptions<TBody = unknown>
  extends Omit<RequestInit, "body" | "method"> {
  method: HTTPMethod;
  body?: TBody;
}

export async function fetchWrapper<TResponse, TBody = unknown>(
  url: string,
  options: FetchOptions<TBody> = {
    method: "GET",
  }
): Promise<TResponse> {
  if (!url.length) {
    throw new Error(`Please pass a valid url`);
  }
  const response = await fetch(url, {
    ...options,
    body:
      options.body && !(options.body instanceof FormData)
        ? JSON.stringify(options.body)
        : undefined,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! url: ${url}, status: ${response.status}, body: ${errorText}`
    );
  }
  const responseTypeMapper: Record<string, "json" | "text"> = {
    "application/json; charset=utf-8": "json",
    "text/plain": "text",
  };
  const contentType = response.headers.get(
    "Content-Type"
  ) as keyof typeof responseTypeMapper;
  if (contentType in responseTypeMapper) {
    return (await response[
      responseTypeMapper[contentType]
    ]()) as Promise<TResponse>;
  } else {
    throw new Error(`Unsupported content type: ${contentType}`);
  }
}
