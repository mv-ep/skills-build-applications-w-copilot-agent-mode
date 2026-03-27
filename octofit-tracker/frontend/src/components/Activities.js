import React from 'react';
import ResourcePage from './ResourcePage';

const endpointTemplate = 'https://${REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/';

export default function Activities() {
  return <ResourcePage resource="activities" title="Activities" endpointTemplate={endpointTemplate} />;
}