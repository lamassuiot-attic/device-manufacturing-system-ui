import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Grid, Typography, TextField } from '@material-ui/core';

import GetCert from './get-cert';

describe('<GetCert />', () => {
  let shallow = null;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('GetCert rendering', () => {
    const mockSetCertValue = jest.fn();
    const mockCertValue = '';

    const wrapper = shallow(
      <GetCert setCertValue={mockSetCertValue} certValue={mockCertValue} />
    );

    expect(wrapper.find(Grid)).toHaveLength(3);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(1);
  });
});
