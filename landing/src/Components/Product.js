import React, { useEffect, useRef, useState } from 'react';
import { Grid, Hidden } from '@material-ui/core';

function Product() {
    return (
        <div id="inicio">
            <Grid container style={{ backgroundColor: "white", height: "85vh" }}>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "6vh" }}>¿TENÉS GANAS DE ESCUCHAR MÚSICA?</h1>
                </Grid>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "6vh"}}>QUE NADA TE LO IMPIDA.</h1>
                </Grid>
                <Grid item xs={12} md={12}>
                    <img src={"/img/logo.png"} style={{ height: "30vh", position: "relative", top: "50%", transform: "translateY(-50%)" }}
                    />
                </Grid>
            </Grid>
            {/* <Player
                ref={appPlayer}
                playsInline
                poster="/assets/poster.png"
                src="/img/videoplayback.mp4"
                volume={10}
                autoPlay
                style={{ visibility: "hidden", pointerEvents: "none" }}
            /> */}
        </div>
    )
}

export default Product
