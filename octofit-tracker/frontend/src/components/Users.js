import React from 'react';
import ResourcePage from './ResourcePage';

const endpointTemplate = 'https://${REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/';

export default function Users() {
  return <ResourcePage resource="users" title="Users" endpointTemplate={endpointTemplate} />;
}