import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Button, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import useWindowDimensions from '../../helper/getDimensions';
import { StarBorder } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        minHeight: "10%",
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    appbar: {
        backgroundColor: theme.palette.secondary.main,
        width: "100%"
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
    },
    menuText: {
        color: "white",
        fontSize: "4vh",
        flexGrow: 1,
        alignSelf: 'flex-end',
        fontWeight: 700
    }
}));
function Menu() {
    const classes = useStyles();
    const { height, width } = useWindowDimensions();
    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                {width > 481 ?
                    <Toolbar className={classes.toolbar}>
                        <Button className={classes.menuText} href="#inicio">INICIO</Button>
                        <Button className={classes.menuText} href="#probalo">PROBALO</Button>
                        <Button className={classes.menuText} href="#equipo">NOSOTROS</Button>
                    </Toolbar>
                    :
                    <Toolbar className={classes.toolbar}>
                        <Button className={classes.menuText} onClick={() => setOpen(!open)}>{open ? "CERRAR MENÚ" : "ABRIR MENÚ"}</Button>
                    </Toolbar>
                }
            </AppBar>
            {
                !(width > 481) &&
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <AppBar position="static" className={classes.appbar} style={{ alignItems: "center" }}>
                        <Button className={classes.menuText} href="#inicio">INICIO</Button>
                        <Button className={classes.menuText} href="#probalo">PROBALO</Button>
                        <Button className={classes.menuText} href="#equipo">NOSOTROS</Button>
                    </AppBar>
                </Collapse>
            }

        </div>
    )
}

export default Menu
