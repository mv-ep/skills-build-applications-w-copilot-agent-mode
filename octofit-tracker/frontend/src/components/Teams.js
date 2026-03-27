import React from 'react';
import ResourcePage from './ResourcePage';

const endpointTemplate = 'https://${REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/';

export default function Teams() {
  return <ResourcePage resource="teams" title="Teams" endpointTemplate={endpointTemplate} />;
}