import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { act } from 'react-dom/test-utils';

import Config from './config';
import { updateKeycloakToken } from '../../services/auth';
import { getCSRStatus, getCRT } from '../../services/api/enroller';
import AlertBar from '../../components/alert-bar';

jest.mock('../../services/api/enroller');
jest.mock('../../services/auth');

describe('<Config />', () => {
  let mount = null;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    updateKeycloakToken.mockImplementation(() => {
      return { success: (callback) => callback() };
    });
  });

  it('Config rendering with NEW CSR', async () => {
    jest.useFakeTimers();
    getCSRStatus.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: 'NEW' }),
      });
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<Config match={{ params: { id: 1 } }} />);
    });
    wrapper.update();

    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('warning');

    await act(async () => {
      jest.advanceTimersByTime(12000);
    });

    wrapper.update();
    expect(getCSRStatus).toHaveBeenCalledTimes(1);
    expect(wrapper.find(AlertBar)).toHaveLength(2);
    expect(wrapper.find(AlertBar).last().prop('type')).toBe('error');
    jest.clearAllTimers();
  });

  it('Config rendering with APPROBED CSR', async () => {
    jest.useFakeTimers();
    getCSRStatus.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: 'APPROBED' }),
      });
    });

    getCRT.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        text: () => Promise.resolve('a test certificate'),
      });
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<Config match={{ params: { id: 1 } }} />);
    });
    wrapper.update();

    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('warning');

    await act(async () => {
      jest.advanceTimersByTime(12000);
    });

    wrapper.update();
    expect(getCSRStatus).toHaveBeenCalledTimes(2);
    expect(wrapper.find(AlertBar)).toHaveLength(0);
    jest.clearAllTimers();
  });
});
