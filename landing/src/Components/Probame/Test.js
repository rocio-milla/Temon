import { Button, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
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

const Test = () => {
    const { height, width } = useWindowDimensions();
    const classes = useStyles();

    const Content = () => {
        if (width > 638) {
            return (
                <>
                    <Grid item xs={12} md={6}>
                        <h1 style={{ color: "white", fontWeight: 700, fontSize: "7vw" }}>PROBALO AHORA</h1>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={"/img/qr.png"} style={{ height: "auto", bottom: 0, maxWidth: "80%" }} />
                    </Grid>
                </>
            )
        }
        else {
            return (
                <>
                    <Grid item xs={12}>
                        <h1 style={{ color: "white", fontWeight: 700, fontSize: "10vw" }}>PROBALO AHORA</h1>
                    </Grid>
                    <Grid item xs={12}>

                        <Button className={classes.menuText} onClick={() => console.log("Click!")}>DESCARGAR</Button>
                    </Grid>
                </>
            )
        }
    }

    return (
        <Grid container style={width > 638 ? { backgroundColor: "#4F831F", height: "100vh", width: "100%" } : { backgroundColor: "#4F831F", height: "50vh", width: "100%" }} justify="center" alignItems="center" id="probalo">
            <Content />
        </Grid>
    )
}

export default Test
