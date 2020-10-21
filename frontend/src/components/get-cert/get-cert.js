import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, TextField } from '@material-ui/core';


export default function GetCert(props) {

    const handleCertValueChange = (event) => {
        props.setCertValue(event.target.value)
    }

    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Insert Certificate to authenticate:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Insert certificate here"
                    multiline
                    fullWidth
                    rows={10}
                    value={props.certValue}
                    onChange={handleCertValueChange}
                />
            </Grid>
        </Grid>
    )
}

GetCert.propTypes = {
    certValue: PropTypes.string.isRequired,
    setCertValue: PropTypes.func.isRequired
}
