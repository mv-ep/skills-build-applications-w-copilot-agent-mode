export function resolveCodespaceName() {
  if (process.env.REACT_APP_CODESPACE_NAME) {
    return process.env.REACT_APP_CODESPACE_NAME;
  }

  if (typeof window !== 'undefined') {
    const match = window.location.hostname.match(/^([a-z0-9-]+)-(3000|8000)\.app\.github\.dev$/i);

    if (match) {
      return match[1];
    }
  }

  return '';
}

export function resolveApiBaseUrl() {
  const codespaceName = resolveCodespaceName();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

export function getApiEndpoint(resource) {
  const normalizedResource = String(resource || '').replace(/^\/+|\/+$/g, '');
  return `${resolveApiBaseUrl()}/${normalizedResource}/`;
}

export function getApiFetchUrl(resource) {
  const normalizedResource = String(resource || '').replace(/^\/+|\/+$/g, '');

  if (process.env.NODE_ENV === 'development') {
    return `/api/${normalizedResource}/`;
  }

  return getApiEndpoint(normalizedResource);
}