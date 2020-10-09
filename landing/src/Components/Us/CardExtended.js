import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import useWindowDimensions from '../../helper/getDimensions';

const useStyles = makeStyles((theme) => ({
    appbar: {
        backgroundColor: theme.palette.primary.main,
        width: "100%"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    menuText: {
        color: "white",
        fontSize: "4vh",
        flexGrow: 1,
        alignSelf: 'flex-end',
        fontWeight: 700
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CardExtended = ({ open, name, url, description, close }) => {
    const classes = useStyles();
    const { width } = useWindowDimensions();

    const handleClose = () => {
        close();
    };

    const Content = () => {
        if (width > 638) {
            return (
                <>
                    <Grid item xs={6}>
                        <img src={url} alt={name} style={{ height: "auto", bottom: 0, maxWidth: "100%", paddingLeft: "1vh" }} />
                    </Grid>
                    <Grid item xs={6} >
                        <h1 style={{ color: "black", fontWeight: 700, fontSize: "7vw", margin: 0 }}>{name}</h1>

                        <h1 style={{ color: "black", fontWeight: 700, fontSize: "7vw", margin: 0 }}>{description}</h1>
                    </Grid>
                </>
            )
        }
        else {
            return (
                <>
                    <Grid item xs={12}>
                        <h1 style={{ color: "black", fontWeight: 700, fontSize: "7vw" }}>{description}</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <img src={url} alt={name} style={{ height: "auto", bottom: 0, maxWidth: "80%" }} />
                    </Grid>
                </>
            )
        }
    }

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar position="static" className={classes.appbar}>
                    <Toolbar className={classes.toolbar}>
                        <Button className={classes.menuText} onClick={() => close()}>CERRAR</Button>
                    </Toolbar>
                </AppBar>
                <Grid container style={{ backgroundColor: "white", width: "100%", height: "100vh" }} justify="center" alignItems="center" spacing={1}>
                    <Content />
                </Grid>
            </Dialog>
        </div >
    );
}

export default CardExtended;