import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { act } from 'react-dom/test-utils';

import { Box } from '@material-ui/core';

import Operation from './operation';
import CertProperties from '../../components/cert-properties';
import { updateKeycloakToken } from '../../services/auth';
import { postGetCRT } from '../../services/api/backend';
import AlertBar from '../../components/alert-bar';

jest.mock('../../services/api/backend');
jest.mock('../../services/auth');

describe('<Operation />', () => {
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
  });

  it('Operation rendering with no error', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<Operation />);
    });
    wrapper.update();

    expect(wrapper.find(Box)).toHaveLength(1);
    expect(wrapper.find(CertProperties)).toHaveLength(1);
  });

  it('Operation rendering with correct CRT download', async () => {
    const event = { preventDefault: () => {} };
    window.URL.createObjectURL = jest.fn();

    postGetCRT.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        blob: () => Promise.resolve('a test certificate'),
      });
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<Operation />);
    });
    wrapper.update();

    expect(wrapper.find(Box)).toHaveLength(1);
    expect(wrapper.find(CertProperties)).toHaveLength(1);

    const form = wrapper.find('form');

    await act(async () => {
      form.props().onSubmit(event);
    });

    expect(postGetCRT).toHaveBeenCalledTimes(1);
    wrapper.update();

    expect(wrapper.find(Box)).toHaveLength(1);
    expect(wrapper.find(CertProperties)).toHaveLength(1);
    window.URL.createObjectURL.mockReset();
  });

  it('Operation rendering with CRT download error', async () => {
    const event = { preventDefault: () => {} };
    window.URL.createObjectURL = jest.fn();

    postGetCRT.mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        text: () => Promise.resolve('error from API'),
      });
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<Operation />);
    });
    wrapper.update();

    expect(wrapper.find(Box)).toHaveLength(1);
    expect(wrapper.find(CertProperties)).toHaveLength(1);

    const form = wrapper.find('form');

    await act(async () => {
      form.props().onSubmit(event);
    });

    expect(postGetCRT).toHaveBeenCalledTimes(2);
    wrapper.update();

    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('error');
    window.URL.createObjectURL.mockReset();
  });
});
