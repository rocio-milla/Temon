import { Grid, makeStyles } from '@material-ui/core';
import { Favorite, ImportantDevices, MusicNote, PhoneAndroidRounded } from '@material-ui/icons';
import React from 'react';
import useWindowDimensions from '../../helper/getDimensions';

const useStyles = makeStyles((theme) => ({
    mobile: {
        height: "85vh"
    },
}));

const HowItWorks = () => {
    const classes = useStyles();
    const { height, width } = useWindowDimensions();

    return (
        <div id="comofunciona">
            <Grid container style={{ backgroundColor: "white", width: "100%" }}>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%", marginBottom: 0 }}>¿QUÉ ES TEMON?</h1>
                </Grid>

                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%", marginBottom: 0 }}>TEMON ES UN REPRODUCTOR DE MÚSICA PARA USUARIOS DE BAJA VISIÓN.</h1>
                    <MusicNote color="primary" style={{ fontSize: "500%" }} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%", marginBottom: 0 }}>CUENTA CON CONTRASTE ALTO, BOTONES GRANDES, BÚSQUEDA POR VOZ Y TODO AQUELLO QUE NO PODÉS HACER CON OTRAS APLICACIONES.</h1>
                    <PhoneAndroidRounded color="secondary" style={{ fontSize: "500%" }} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%", marginBottom: 0 }}>TODOS ESCUCHAMOS MÚSICA, ¿O NO?</h1>
                    <Favorite color="primary" style={{ fontSize: "500%", marginBottom: "2%" }} />
                </Grid>
            </Grid>
        </div>
    )
}

export default HowItWorks
