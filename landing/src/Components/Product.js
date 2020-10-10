import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import useWindowDimensions from '../helper/getDimensions';

const useStyles = makeStyles((theme) => ({
    mobile: {
        height: "85vh"
    },
}));

function Product() {
    const classes = useStyles();
    const { width } = useWindowDimensions();
    const [isPlaying, setIsPlaying] = useState(false);
    const [url, setUrl] = useState("")
    const links = [
        "https://www.youtube.com/watch?v=lm4OJxGQm_E",
        "https://www.youtube.com/watch?v=q8Vk8Wx0xJo",
        "https://www.youtube.com/watch?v=fugQAnzL1uk",
        "https://www.youtube.com/watch?v=MqUCDzom5Xw",
        "https://www.youtube.com/watch?v=0E6KXgWuaHo",
        "https://www.youtube.com/watch?v=Ag3qFsqBJZo",
        "https://www.youtube.com/watch?v=TPvfaASfL5E",
        "https://www.youtube.com/watch?v=h7Ua_4s05eM",
        "https://www.youtube.com/watch?v=5lkPLevM9t4",
        "https://www.youtube.com/watch?v=uVeuVjtqzHQ",
        "https://www.youtube.com/watch?v=7FCPUJi8Us8",
        "https://www.youtube.com/watch?v=duDot7d8YVk",
        "https://www.youtube.com/watch?v=vJAcXd_UtWQ",
        "https://www.youtube.com/watch?v=MkNeIUgNPQ8",
        "https://www.youtube.com/watch?v=EtZ2m2Zm3vY",
        "https://www.youtube.com/watch?v=83RUhxsfLWs"
    ]

    useEffect(() => {
        isPlaying === false && setUrl(links[Math.floor(Math.random() * links.length)])
    }, [isPlaying])

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
                        <img src={!isPlaying ? "/img/logo.png" : "/img/logopause.png"} alt="Logo de temon" style={{ height: "100%" }} onClick={() => setIsPlaying(!isPlaying)} />
                        :
                        <img src={!isPlaying ? "/img/logo.png" : "/img/logopause.png"} alt="Logo de temon" style={{ height: "auto", bottom: 0, maxWidth: "100%", display: "block" }} onClick={() => setIsPlaying(!isPlaying)} />
                    }
                </Grid>
            </Grid>
            <ReactPlayer style={{ display: "none" }} url={url} volume={0.1} playing={isPlaying} loop />

        </div>
    )
}

export default Product
