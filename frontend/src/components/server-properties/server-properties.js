import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, TextField } from '@material-ui/core';

export default function ServerProperties(props) {

    const handleServerValueChange = (event) => {
        props.setServerValue(event.target.value);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Insert server URL:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Insert here server URL"
                    fullWidth
                    value={props.serverValue}
                    onChange={handleServerValueChange}
                />
            </Grid>
        </Grid>
    );
}

ServerProperties.propTypes = {
    serverValue: PropTypes.string.isRequired,
    setServerValue: PropTypes.func.isRequired
}