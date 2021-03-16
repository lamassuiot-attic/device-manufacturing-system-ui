import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Grid, Typography, Select } from '@material-ui/core';

import ServerProperties from './server-properties';

describe('<ServerProperties />', () => {
  let shallow = null;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('Server Properties rendering', () => {
    const mockSetCAValue = jest.fn();
    const mockCAValue = 'Lamassu-Root-CA1-RSA4096';

    const wrapper = shallow(
      <ServerProperties setCAValue={mockSetCAValue} caValue={mockCAValue} />
    );

    expect(wrapper.find(Grid)).toHaveLength(3);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find(Select)).toHaveLength(1);
  });
});
