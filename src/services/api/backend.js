import { getKeycloakToken } from '../auth';

const protocol = process.env.REACT_APP_DEVICE_PROTOCOL;
const host = process.env.REACT_APP_DEVICE_HOST;
const port = process.env.REACT_APP_DEVICE_PORT;
const path = process.env.REACT_APP_DEVICE_PATH;

export function postSetConfig(data) {
  const fetchUrl = protocol + '://' + host + ':' + port + path + '/config';
  return fetch(fetchUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: 'Bearer ' + getKeycloakToken(),
    },
  });
}

export function postGetCRT(data) {
  const fetchUrl = protocol + '://' + host + ':' + port + path;
  return fetch(fetchUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: 'Bearer ' + getKeycloakToken(),
    },
  });
}
