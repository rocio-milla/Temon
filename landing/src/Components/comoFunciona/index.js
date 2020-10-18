import { Grid } from '@material-ui/core';
import React from 'react';

const HowItWorks = () => {
    return (
        <div id="comofunciona">
            <Grid container style={{ backgroundColor: "white", width: "100%", margin: "1vh" }}>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%", marginBottom: 0, textAlign: "left" }}>¿QUÉ ES TEMON?</h1>
                </Grid>

                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%", marginBottom: 0, textAlign: "left"  }}>TEMON ES UN REPRODUCTOR DE MÚSICA PARA USUARIOS DE BAJA VISIÓN.</h1>
                    {/* <FiberManualRecord color="primary" style={{ fontSize: "500%", textAlign: "center"  }} /> */}
                </Grid>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%", marginBottom: 0, textAlign: "left"  }}>CUENTA CON CONTRASTE ALTO, BOTONES GRANDES, BÚSQUEDA POR VOZ Y TODO AQUELLO QUE NO PODÉS HACER CON OTRAS APLICACIONES.</h1>
                    {/* <FiberManualRecord color="primary" style={{ fontSize: "500%", textAlign: "center" }} /> */}
                </Grid>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%", marginBottom: 0, textAlign: "left"  }}>TODOS ESCUCHAMOS MÚSICA, ¿O NO?</h1>
                    {/* <FiberManualRecord color="primary" style={{ fontSize: "500%", marginBottom: "2%", textAlign: "center" }} /> */}
                </Grid>
            </Grid>
        </div>
    )
}

export default HowItWorks
