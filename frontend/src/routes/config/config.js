import React, { useState } from 'react';

import { Container, Grid, Button, Box, Typography, Divider } from '@material-ui/core';

import ServerProperties from '../../components/server-properties';
import GetCert from '../../components/get-cert';
import AlertBar from '../../components/alert-bar';

import { postSetConfig } from '../../services/api/backend';

export default function Config() {
    const SCEPprotocol = process.env.REACT_APP_SCEP_PROTOCOL
    const SCEPhost = process.env.REACT_APP_SCEP_HOST
    const SCEPport = process.env.REACT_APP_SCEP_PORT

    const [certValue, setCertValue] = useState('');
    const [serverValue, setServerValue] = useState(SCEPprotocol + "://" + SCEPhost + ":" + SCEPport + "/scep");
    const [correct, setCorrect] = useState(null);
    const [error, setError] = useState(null);

    const handleConfigSubmit = (event) => {
        const data = {
            "crt": certValue,
            "serverURL": serverValue,
        }
        postSetConfig(data).then(
            (response) => {
                if (response.ok) {
                    setCorrect("Configuration successfully loaded");
                }else{
                    response.text().then(
                        (text) => {
                            setError(text);
                        }
                    )
                }
            }
        ).catch( error => setError(error.message));
        event.preventDefault();
    }

    return(
        <Container maxWidth="md">
            { error !== null && <AlertBar setMessage={setError} message={error} type="error"/>}
            { correct !== null && <AlertBar setMessage={setCorrect} message={correct} type="success"/>}
            <form onSubmit={handleConfigSubmit}>
            <Box border={1} p={4} borderRadius="borderRadius">
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h3">
                            Configuration
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={6}>
                        <GetCert setCertValue={setCertValue} certValue={certValue}/>
                    </Grid>
                    <Grid item xs={6}>
                        <ServerProperties setServerValue={setServerValue} serverValue={serverValue}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Button fullWidth type="submit" variant="contained" color="primary">
                            Set Configuration
                        </Button>
                    </Grid>
                </Grid>
                </Box>
            </form>
        </Container>
    )
}