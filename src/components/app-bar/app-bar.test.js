import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { act } from 'react-dom/test-utils';

import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';

import LamassuAppBar from './app-bar';

describe('<LamassuAppBar />', () => {
  let shallow = null;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('App Bar rendering', async () => {
    const wrapper = shallow(<LamassuAppBar />);

    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(Toolbar)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });
});
