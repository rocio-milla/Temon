import { Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import useWindowDimensions from '../../helper/getDimensions';
import OurCard from './Card';
import CardExtended from './CardExtended';

const useStyles = makeStyles((theme) => ({
    mobile: {
        height: "85vh"
    },
}));

function Us() {
    const classes = useStyles();
    const { height, width } = useWindowDimensions();
    const [open, setOpen] = useState({ open: false, name: "", url: "", description: "" });
    return (
        <div id="equipo">
            <Grid container style={{ backgroundColor: "white", paddingLeft: "2%", paddingRight: "2%", backgroundColor: "#A548D8" }} justify="center" alignItems="center" spacing={1}>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%" }}>NOSOTROS</h1>
                </Grid>
                <Grid item xs={12} md={4}>
                    <OurCard name="Yessica Zornetta" url="/img/nosotros/yessi.jpg" description="Hola. Soy Yessi :D ¿Qué debería escribir acá?" open={setOpen} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <OurCard name="Juan Milla" url="/img/nosotros/juan.jpg" description="Hola. Soy Juanjo :D ¿Qué debería escribir acá?" open={setOpen} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <OurCard name="Leandro Coronel" url="/img/nosotros/lean.jpg" description="Hola. Soy Lean :D ¿Qué debería escribir acá?" open={setOpen} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <OurCard name="Miguel Quiroz" url="/img/nosotros/migue.jpg" description="Hola. Soy Miguel :D ¿Qué debería escribir acá?" open={setOpen} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <OurCard name="Rocio Milla" url="/img/nosotros/rocio.jpg" description="Me encanta la tecnología :)" open={setOpen} />
                </Grid>
            </Grid>
            <CardExtended open={open.open} name={open.name} url={open.url}
                description={open.description} close={() => setOpen({ open: false, name: "", url: "", description: "" })} />
        </div>
    )
}

export default Us;
