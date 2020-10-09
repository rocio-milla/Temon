import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    mobile: {
        height: "85vh"
    },
    appbar: {
        width: "100%",
        minHeight: "10%",
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },

}));

function Footer() {
    const classes = useStyles();

    return (
        <>
            <div style={{ backgroundColor: "white" }} className={classes.appbar}>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <h1 style={{ color: "black", }}>© 2020 temon</h1>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Footer
