import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        marginBottom: "5%"
    },
    text: {
        flexGrow: 1,
        alignSelf: 'flex-end',
        fontWeight: 700,
        fontSize: "4vh"
    },
    white: {
        color: "white"
    },
    black: {
        color: "black"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

const OurCard = ({ url, name, description, open }) => {
    const classes = useStyles();

    const handleExpandClick = () => {
        open({ open: true, name: name, url: url, description: description })
    };

    return (
        <Card className={classes.root}>
            <Typography className={classes.text} style={{ marginTop: "4%", marginBottom: "4%" }}>
                {name}
            </Typography>
            <CardMedia
                className={classes.media}
                image={url}
                title={name}
            />
            <CardContent>
                    {typeof description === "string" ?
                        <Typography className={classes.text}>
                            description
                        </Typography>
                        :
                        description.map((x, i) => <Typography key={i} className={classes.text} style={{ margin: 0 }}> {x}</Typography>)
                    }
                <CardActions>
                    <Button color="primary" variant="contained" onClick={() => handleExpandClick()} className={classes.text} style={{ width: "100%" }}>
                        AGRANDAR
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default OurCard;