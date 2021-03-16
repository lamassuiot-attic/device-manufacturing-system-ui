import { getKeycloakToken } from '../auth';

const protocol = process.env.REACT_APP_ENROLLER_PROTOCOL;
const host = process.env.REACT_APP_ENROLLER_HOST;
const port = process.env.REACT_APP_ENROLLER_PORT;
const path = process.env.REACT_APP_ENROLLER_PATH;

export function getCSRs() {
  const fetchUrl = protocol + '://' + host + ':' + port + path;
  return fetch(fetchUrl, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + getKeycloakToken(),
    },
  });
}

export function getCSRStatus(id) {
  const fetchUrl = protocol + '://' + host + ':' + port + path + '/' + id;
  return fetch(fetchUrl, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + getKeycloakToken(),
    },
  });
}

export function getCRT(id) {
  const fetchUrl =
    protocol + '://' + host + ':' + port + path + '/' + id + '/crt';
  return fetch(fetchUrl, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + getKeycloakToken(),
    },
  });
}
