import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { act } from 'react-dom/test-utils';

import { HashRouter } from 'react-router-dom';

import Home from './home';
import CSRBox from '../components/csr-box';
import { updateKeycloakToken } from '../services/auth';
import { getCSRs } from '../services/api/enroller';
import AlertBar from '../components/alert-bar';

jest.mock('../services/auth');
jest.mock('../services/api/enroller');

describe('<Home />', () => {
  const fakeCSRs = {
    _embedded: {
      csr: [
        {
          id: 1,
          cn: 'test',
          status: 'NEW',
          c: 'test',
          st: 'test',
          l: 'test',
          o: 'test',
          ou: 'test',
          mail: 'test',
          csrpath: 'test',
        },
        {
          id: 2,
          cn: 'test',
          status: 'NEW',
          c: 'test',
          st: 'test',
          l: 'test',
          o: 'test',
          ou: 'test',
          mail: 'test',
          csrpath: 'test',
        },
      ],
    },
  };

  let mount = null;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    updateKeycloakToken.mockImplementation(() => {
      return Promise.resolve();
    });

    getCSRs.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeCSRs),
      });
    });
  });

  it('Home rendering with no error', async () => {
    let wrapper;

    await act(async () => {
      wrapper = mount(
        <HashRouter>
          <Home />
        </HashRouter>
      );
    });
    wrapper.update();

    expect(wrapper.find(CSRBox)).toHaveLength(2);
  });

  it('Home rendering empty', async () => {
    getCSRs.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<Home />);
    });
    wrapper.update();

    expect(wrapper.find(CSRBox)).toHaveLength(0);
  });

  it('Home rendering with Enroller API error', async () => {
    getCSRs.mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        text: () => Promise.resolve('error from API'),
      });
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<Home />);
    });
    wrapper.update();

    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('error');
  });

  it('Home rendering unable to obtain Keycloak Token', async () => {
    updateKeycloakToken.mockImplementation(() => {
      return Promise.reject(new Error('unable to obtain Keycloak token'));
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<Home />);
    });
    wrapper.update();

    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('error');
  });
});
