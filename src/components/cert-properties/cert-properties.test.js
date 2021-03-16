import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { act } from 'react-dom/test-utils';

import { Grid, Select } from '@material-ui/core';

import CertProperties from './cert-properties';

describe('<CertProperties />', () => {
  let mount = null;

  const algValue = 'RSA';
  const setAlgValue = jest.fn();
  const sizeValue = 2048;
  const setSizeValue = jest.fn();
  const c = 'ES';
  const setC = jest.fn();
  const st = 'Test';
  const setST = jest.fn();
  const l = 'Test';
  const setL = jest.fn();
  const o = 'Test';
  const setO = jest.fn();
  const ou = 'Test';
  const setOU = jest.fn();
  const cn = 'test.com';
  const setCN = jest.fn();
  const email = 'test@test.com';
  const setEmail = jest.fn();

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('Cert Properties redering', async () => {
    let wrapper;

    await act(async () => {
      wrapper = mount(
        <CertProperties
          algValue={algValue}
          setAlgValue={setAlgValue}
          sizeValue={sizeValue}
          setSizeValue={setSizeValue}
          c={c}
          setC={setC}
          st={st}
          setST={setST}
          l={l}
          setL={setL}
          o={o}
          setO={setO}
          ou={ou}
          setOU={setOU}
          cn={cn}
          setCN={setCN}
          email={email}
          setEmail={setEmail}
        />
      );
    });
    wrapper.update();

    expect(wrapper.find(Grid)).toHaveLength(11);
    expect(wrapper.find(Select).last().props().children).toHaveLength(4);
  });

  it('Cert Properties redering with algorithm change', async () => {
    let wrapper;

    await act(async () => {
      wrapper = mount(
        <CertProperties
          algValue={algValue}
          setAlgValue={setAlgValue}
          sizeValue={sizeValue}
          setSizeValue={setSizeValue}
          c={c}
          setC={setC}
          st={st}
          setST={setST}
          l={l}
          setL={setL}
          o={o}
          setO={setO}
          ou={ou}
          setOU={setOU}
          cn={cn}
          setCN={setCN}
          email={email}
          setEmail={setEmail}
        />
      );
    });
    wrapper.update();

    const algSelect = wrapper.find(Select).first();

    await act(async () => {
      algSelect.props().onChange({ target: { name: 'algValue', value: 'EC' } });
    });
    wrapper.update();

    expect(wrapper.find(Grid)).toHaveLength(11);
    expect(wrapper.find(Select).last().props().children).toHaveLength(2);
  });
});
