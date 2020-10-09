import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import useWindowDimensions from '../helper/getDimensions';

const useStyles = makeStyles((theme) => ({
    mobile: {
        height: "85vh"
    },
}));

function Product() {
    const classes = useStyles();
    const { width } = useWindowDimensions();

    return (
        <div id="inicio">
            <Grid container style={{ backgroundColor: "white", width: "100%" }} className={width > 481 ? classes.mobile : ""}>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%" }}>¿TENÉS GANAS DE ESCUCHAR MÚSICA?</h1>
                </Grid>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%" }}>QUE NADA TE LO IMPIDA.</h1>
                </Grid>
                <Grid item xs={12} md={12} style={{ height: "45vh" }}>
                    {width > 638 ?
                        <img src={"/img/logo.png"} alt="Logo de temon" style={{ height: "100%" }} />
                        :
                        <img src={"/img/logo.png"} alt="Logo de temon" style={{ height: "auto", bottom: 0, maxWidth: "100%", display: "block" }} />
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default Product
