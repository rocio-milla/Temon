import { Grid } from '@material-ui/core';
import { Favorite, FiberManualRecord, MusicNote, PhoneAndroidRounded } from '@material-ui/icons';
import React from 'react';

const HowItWorks = () => {
    return (
        <div id="comofunciona">
            <Grid container style={{ backgroundColor: "white", width: "100%" }}>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%", marginBottom: 0 }}>¿QUÉ ES TEMON?</h1>
                </Grid>

                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%", marginBottom: 0 }}>TEMON ES UN REPRODUCTOR DE MÚSICA PARA USUARIOS DE BAJA VISIÓN.</h1>
                    <FiberManualRecord color="primary" style={{ fontSize: "500%" }} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%", marginBottom: 0 }}>CUENTA CON CONTRASTE ALTO, BOTONES GRANDES, BÚSQUEDA POR VOZ Y TODO AQUELLO QUE NO PODÉS HACER CON OTRAS APLICACIONES.</h1>
                    <FiberManualRecord color="primary" style={{ fontSize: "500%" }} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%", marginBottom: 0 }}>TODOS ESCUCHAMOS MÚSICA, ¿O NO?</h1>
                    <FiberManualRecord color="primary" style={{ fontSize: "500%", marginBottom: "2%" }} />
                </Grid>
            </Grid>
        </div>
    )
}

export default HowItWorks
