import { Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import useWindowDimensions from '../../helper/getDimensions';


const useStyles = makeStyles((theme) => ({
    menuText: {
        color: "black",
        fontSize: "7vw",
        flexGrow: 1,
        alignSelf: 'flex-end',
        fontWeight: 700,
        backgroundColor: "white",
        padding: "5%",
        "&:hover": {
            backgroundColor: 'white'
        }
    }
}));

const SeguinosEnIG = () => {
    const { width } = useWindowDimensions();
    const classes = useStyles();

    const Content = () => {
        if (width > 638) {
            return (
                <>
                    <Grid item xs={12} md={6}>
                        <h1 style={{ color: "white", fontWeight: 700, fontSize: "7vw" }}>SEGUINOS EN INSTAGRAM @TEMONAPP</h1>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={"/img/instagram.png"} alt="Código QR" style={{ height: "auto", bottom: 0, width: "60%" }} />
                    </Grid>
                </>
            )
        }
        else {
            return (
                <>
                    <Grid item xs={12}>
                        <h1 style={{ color: "white", fontWeight: 700, fontSize: "10vw" }}>SEGUINOS EN</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <Button className={classes.menuText} onClick={() => console.log("Click!")}>INSTAGRAM @TEMONAPP</Button>
                    </Grid>
                </>
            )
        }
    }

    return (
        <Grid container style={width > 638 ? { backgroundColor: "#1b7701", width: "100%", paddingTop: "5%", paddingBottom: "5%" } : { backgroundColor: "#1b7701", height: "50vh", width: "100%" }} justify="center" alignItems="center" id="probalo">
            <Content />
        </Grid>
    )
}

export default SeguinosEnIG
