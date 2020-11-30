import React, { useState, useEffect } from 'react';

import { Grid, CircularProgress, Container, Box, Typography, Divider } from '@material-ui/core';

import CSRBox from '../components/csr-box';
import AlertBar from '../components/alert-bar';

import { updateKeycloakToken } from '../services/auth';
import { getCSRs } from '../services/api/enroller'; 

export default function Home() {
  const [csrs, setCSRs] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);

  const getCSRS = () => {
      updateKeycloakToken().success(() => {
        getCSRs()
        .then(
          (response) => {
            if (response.ok) {
              response.json().then(
                (result) => {
                  if (result._embedded !== undefined) {
                    setIsLoaded(true);
                    setCSRs(result._embedded.csr);
                }
              })
            }else{
              response.text().then(
                (text) => {
                  setIsLoaded(false);
                  setError(text);
                }
              )
            }
          }).catch(error => setError(error.message)); 
      })
    }
  
    useEffect(() => {
      getCSRS();
    }, [])

    return(
      <Container maxWidth="md">
        { error !== null && <AlertBar setMessage={setError} message={error} type= "error"/>}
        { (error === null && !isLoaded && csrs !== null) && <CircularProgress/>}
        { (error === null && isLoaded && csrs !== null) && (
          <Box border={1} p={4} borderRadius="borderRadius">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h3">
                  Configuration (Step 1)
                </Typography>
              </Grid>
              <Grid item xs={12}>
                  <Divider/>
              </Grid>
            {csrs.length > 1 ?
                (csrs.map(csr => (
                    <CSRBox key={csr.id.toString()} csr={csr}/>
                ))) : (
                    <CSRBox key={csrs.id.toString()} csr={csrs}/>
            )}
            </Grid>
          </Box>)}
      </Container>
    )
}

