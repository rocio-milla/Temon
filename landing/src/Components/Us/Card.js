import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import { SettingsPowerRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        Width: 345,
        marginBottom: "5%"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
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
    }
}));

const OurCard = ({ url, name, description, open }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        open({ open: true, name: name, url: url, description: description })
    };

    return (
        <Card className={classes.root}>
            <Typography variant="p" className={classes.text} style={{ marginTop: "4%", marginBottom: "4%" }}>
                {name}
            </Typography>
            <CardMedia
                className={classes.media}
                image={url}
                title={name}
            />
            <CardContent>
                <Typography variant="p" className={classes.text}>
                    {description}
                </Typography>
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