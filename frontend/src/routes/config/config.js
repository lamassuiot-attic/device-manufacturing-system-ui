import React, { useState, useEffect } from 'react';

import { Container, Grid, Button, Box, Typography, Divider, CircularProgress } from '@material-ui/core';

import ServerProperties from '../../components/server-properties';
import GetCert from '../../components/get-cert';
import AlertBar from '../../components/alert-bar';

import { postSetConfig } from '../../services/api/backend';
import { getCSRStatus, getCRT } from '../../services/api/enroller';
import { updateKeycloakToken } from '../../services/auth';

export default function Config(props) {
        
    const [certValue, setCertValue] = useState('');
    const [caValue, setCAValue] = useState("Lamassu-Root-CA1-RSA4096");
    const [correct, setCorrect] = useState(null);
    const [isApprobed, setIsApprobed] = useState(false);
    const [error, setError] = useState(null);
      
    useEffect(() => {
       const timer = setInterval(() => updateKeycloakToken().success(() => {
        getCSRStatus(props.match.params.id)
        .then(
          (response) => {
            if (response.ok) {
              response.json().then(
                (csr) => {
                    if(csr.status !== "APPROBED") {
                      setIsApprobed(false);
                      setError("Waiting to approbe CSR by Enroller, status is: "+csr.status);
                    }else{
                       getCRT(props.match.params.id).then(
                           (response) => {
                               if (response.ok) {
                                   console.log(response);
                                   response.text().then(
                                       (text) => {
                                           setCertValue(text);
                                       }
                                   )
                                    clearInterval(timer);
                                    setIsApprobed(true);
                                    setError(null);
                               }
                           }
                       ).catch(error => setError(error.message));

                    }
              })
            }else{
                console.log("erroreeaa baina ez network")
              response.text().then(
                (text) => {
                  setError(text);
                  setIsApprobed(false);
                }
              )
            }
          }).catch(error => {
              console.log("erroreeaa")
              setError(error.message)}); 
      }), 10000) 
    }, [props.match.params.id])


    const handleConfigSubmit = (event) => {
        const data = {
            "crt": certValue,
            "ca": caValue,
        }
        updateKeycloakToken().success(() => {
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
        })
        event.preventDefault();
    }

    return(
        <Container maxWidth="md">
            { !isApprobed && (
                <React.Fragment>
                    <CircularProgress size={100}/>
                    <AlertBar setMessage={()=>{}} message={"Waiting for Enroller response..."} type="warning"/>
                </React.Fragment>
            )}
            { error !== null && <AlertBar setMessage={setError} message={error} type="error"/>}
            { correct !== null && <AlertBar setMessage={setCorrect} message={correct} type="success"/>}
            { isApprobed && (
            <form onSubmit={handleConfigSubmit}>
            <Box border={1} p={4} borderRadius="borderRadius">
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h3">
                            Configuration (Step 2)
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={6}>
                        <GetCert setCertValue={setCertValue} certValue={certValue}/>
                    </Grid>
                    <Grid item xs={6}>
                        <ServerProperties setCAValue={setCAValue} caValue={caValue}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Button fullWidth type="submit" variant="contained" color="primary">
                            Set Configuration
                        </Button>
                    </Grid>
                </Grid>
                </Box>
            </form>)}
        </Container>
    )
}