import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Paper, Grid, Button } from '@material-ui/core';

import CSRBox from './csr-box';

describe('<CSRBox />', () => {
  let shallow = null;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('CSR Box rendering with NEW CSR', () => {
    const csr = {
      id: 1,
      status: 'NEW',
    };
    const wrapper = shallow(<CSRBox csr={csr} />);

    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.find(Grid)).toHaveLength(3);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().disabled).toBe(false);
  });

  it('CSR Box rendering with APPROBED CSR', () => {
    const csr = {
      id: 1,
      status: 'APPROBED',
    };
    const wrapper = shallow(<CSRBox csr={csr} />);

    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.find(Grid)).toHaveLength(3);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().disabled).toBe(false);
  });

  it('CSR Box rendering with DENY CSR', () => {
    const csr = {
      id: 1,
      status: 'DENY',
    };
    const wrapper = shallow(<CSRBox csr={csr} />);

    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.find(Grid)).toHaveLength(3);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().disabled).toBe(true);
  });
});
