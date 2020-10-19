import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';

import { useStyles } from './app-bar-styles';


export default function LamassuAppBar() {

  const classes = useStyles();
  
  return(
      <div className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar className={classes.toolbar}>
            <Avatar variant="square" alt="Lamassu Logo" src="lamassu_logo.png"></Avatar>
            <Typography variant="h6" noWrap className={classes.typoAppBarTitle}>Lamassu Device Manufacturing System</Typography>
            <Button component={Link} to="/" replace variant="text">Configuration</Button>
            <Button component={Link} to="/operation" replace variant="text">Operation</Button>
          </Toolbar>
        </AppBar>
      </div>
  );
}
