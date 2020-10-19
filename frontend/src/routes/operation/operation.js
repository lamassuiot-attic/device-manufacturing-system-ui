import React, { useState } from 'react';

import { Container, Grid, Button, Box, Typography, Divider } from '@material-ui/core';

import CertProperties from '../../components/cert-properties';
import AlertBar from '../../components/alert-bar';

import { postGetCRT } from '../../services/api/backend';

export default function Operation() {

    const [c, setC] = useState('ES');
    const [st, setST] = useState('Gipuzkoa');
    const [l, setL] = useState('Arrasate');
    const [o, setO] = useState('LKS Next, S. Coop.');
    const [ou, setOU] = useState('');
    const [cn, setCN] = useState('NewDevice');
    const [email, setEmail] = useState('');
    const [sizeValue, setSizeValue] = useState(2048)
    const [algValue, setAlgValue] = useState("RSA");
    const [error, setError] = useState(null);

    const handleCertSubmit = (event) => {
        const data = {
            "keyAlg": algValue,
            "keySize": Math.trunc(sizeValue),
            "c": c,
            "st": st,
            "l": l,
            "o": o,
            "ou": ou,
            "cn": cn,
            "email": email
        }
        postGetCRT(data).then(
            (response) => {
                if (response.ok) {
                    response.blob().then(
                        (blob) => {
                            setError(null);
                            const url = window.URL.createObjectURL(new Blob([blob]));
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute('download', `${data.cn}.pem` );
                            document.body.appendChild(link);
                            link.click();
                            link.parentNode.removeChild(link);
                        }
                    )
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
            <form onSubmit={handleCertSubmit}>
                <Box border={1} p={4} borderRadius="borderRadius">
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h3">
                            Operation
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <CertProperties 
                            setC={setC} c={c} 
                            setST={setST} st={st} 
                            setL={setL} l={l} 
                            setO={setO} o={o} 
                            setOU={setOU} ou={ou} 
                            setCN={setCN} cn={cn} 
                            setEmail={setEmail} email={email}
                            setSizeValue={setSizeValue} sizeValue={sizeValue}
                            setAlgValue={setAlgValue} algValue={algValue}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button fullWidth type="submit" variant="contained" color="primary">
                            Get Certificate
                        </Button>
                    </Grid>
                </Grid>
                </Box>
            </form>
        </Container>
    )
}