import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Paper, Grid, Button } from '@material-ui/core';

import CSRInfo from '../csr-info';
import { useStyles } from './csr-box-styles';

export default function CSRBox(props) {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <Paper className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CSRInfo csr={props.csr} />
          </Grid>
          <Button
            component={Link}
            to={`/config/${props.csr.id}`}
            disabled={
              props.csr.status !== 'NEW' && props.csr.status !== 'APPROBED'
            }
            color="primary"
            variant="contained"
            fullWidth
          >
            Select
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

CSRBox.propTypes = {
  csr: PropTypes.object,
};
