import React from 'react';
import ResourcePage from './ResourcePage';

const endpointTemplate = 'https://${REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/';

export default function Leaderboard() {
  return <ResourcePage resource="leaderboard" title="Leaderboard" endpointTemplate={endpointTemplate} />;
}