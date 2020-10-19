import React, {useState} from 'react';

import { Grid, Select, MenuItem, TextField, Typography, FormControl } from '@material-ui/core';
import { useStyles } from './cert-properties-styles';

const algSize = new Map();
algSize.set("RSA", [2048, 4096])
algSize.set("EC", [256,384])

export default function CertProperties(props) {

    const [selectedAlgSize, setSelectedAlgSize] = useState([2048, 4096, 256, 384]);

    const handleAlgChange = (event) => {
        props.setAlgValue(event.target.value);
        setSelectedAlgSize(algSize.get(event.target.value))
    }

    const handleAlgSizeChange = (event) => {
        props.setSizeValue(event.target.value);
    }

    const handleCChange = (event) => {
        props.setC(event.target.value);
    }

    const handleSTChange = (event) => {
        props.setST(event.target.value);
    }

    const handleLChange = (event) => {
        props.setL(event.target.value);
    }

    const handleOChange = (event) => {
        props.setO(event.target.value);
    }

    const handleOUChange = (event) => {
        props.setOU(event.target.value);
    }

    const handleCNChange = (event) => {
        props.setCN(event.target.value);
    }

    const handleEmailChange = (event) => {
        props.setEmail(event.target.value);
    }

    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography variant="h6">
                    Select key algorithm:
                </Typography>
                <FormControl className={classes.formControl}>
                <Select value={props.algValue} onChange={handleAlgChange}>
                    <MenuItem value="RSA">RSA</MenuItem>
                    <MenuItem value="EC">EC</MenuItem>
                </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h6">
                    Select key bit size:
            </Typography>
            <FormControl className={classes.formControl}>
                <Select value={props.sizeValue} onChange={handleAlgSizeChange}>
                    {selectedAlgSize.map((size, keyIndex) => (
                        <MenuItem key={keyIndex} value={size}>{size}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">
                        Insert certificate properties:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Country name" onChange={handleCChange} value={props.c}/>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="State or province name" onChange={handleSTChange} value={props.st}/>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Locality name" onChange={handleLChange} value={props.l}/>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Organization name" onChange={handleOChange} value={props.o}/>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Organizational Unit name" onChange={handleOUChange} value={props.ou}/>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Common name" onChange={handleCNChange} value={props.cn}/>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Email address" onChange={handleEmailChange} value={props.email}/>
            </Grid>
        </Grid>
    );
}