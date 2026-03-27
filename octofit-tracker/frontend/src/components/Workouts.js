import React from 'react';
import ResourcePage from './ResourcePage';

const endpointTemplate = 'https://${REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/';

export default function Workouts() {
  return <ResourcePage resource="workouts" title="Workouts" endpointTemplate={endpointTemplate} />;
}