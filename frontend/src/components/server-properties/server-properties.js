import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, Select, MenuItem } from '@material-ui/core';

export default function ServerProperties(props) {

    const handleCAValueChange = (event) => {
        props.setCAValue(event.target.value);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Select CA:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Select
                    value={props.caValue}
                    fullWidth
                    onChange={handleCAValueChange}
                >
                    <MenuItem value={"Lamassu-Root-CA1-RSA4096"}>Lamassu-Root-CA1-RSA4096</MenuItem>
                    <MenuItem value={"Lamassu-Root-CA2-RSA2048"}>Lamassu-Root-CA2-RSA2048</MenuItem>
                    <MenuItem value={"Lamassu-Root-CA3-ECC384"}>Lamassu-Root-CA3-ECC384</MenuItem>
                    <MenuItem value={"Lamassu-Root-CA4-ECC256"}>Lamassu-Root-CA4-ECC256</MenuItem>
                </Select>
            </Grid>
        </Grid>
    );
}

ServerProperties.propTypes = {
    caValue: PropTypes.string.isRequired,
    setCAValue: PropTypes.func.isRequired
}