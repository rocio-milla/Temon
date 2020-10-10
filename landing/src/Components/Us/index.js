import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import OurCard from './Card';
import CardExtended from './CardExtended';

function Us() {
    const [open, setOpen] = useState({ open: false, name: "", url: "", description: "" });
    return (
        <div id="equipo">
            <Grid container style={{ paddingLeft: "2%", paddingRight: "2%", backgroundColor: "#A548D8", margin: 0 }} justify="center" alignItems="center" spacing={1}>
                <Grid item xs={12} md={12}>
                    <h1 style={{ color: "black", fontWeight: 700, fontSize: "250%" }}>NOSOTROS</h1>
                </Grid>
                <Grid item xs={12} md={4}>
                    <OurCard name="Yessica Zornetta" url="/img/nosotros/yessi.jpg" description={["📈 Business Analyst", "✈ Amante de viajar", "💅 Manicura"]} open={setOpen} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <OurCard name="Juan Milla" url="/img/nosotros/juan.jpg" description={["👨‍💻 Software developer", "📸 Fotógrafo amateur", "🚴‍♂️ Ciclista"]} open={setOpen} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <OurCard name="Leandro Coronel" url="/img/nosotros/lean.jpg" description={["🖥️ Web developer", "📚 Atención en una librería", "😴 Tomar siestas"]} open={setOpen} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <OurCard name="Miguel Quiroz" url="/img/nosotros/migue.jpg" description={["🤖 Tester automatizador", "🖊 Diseñador gráfico textil", "🎬 Series y películas"]} open={setOpen} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <OurCard name="Rocio Milla" url="/img/nosotros/rocio.jpg" description={["🖥️ Web developer", "🎮 Videojuegos", "🌸 Cositas tiernas y rosas"]} open={setOpen} />
                </Grid>
            </Grid>
            <CardExtended open={open.open} name={open.name} url={open.url}
                description={open.description} close={() => setOpen({ open: false, name: "", url: "", description: "" })} />
        </div>
    )
}

export default Us;
