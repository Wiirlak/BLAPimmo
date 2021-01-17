import React from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Dialog,
    DialogTitle,
    Grid,
    TextField
} from "@material-ui/core";
import {House} from './modele/House'
import {makeStyles} from "@material-ui/styles";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
const ethers = require("ethers");

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 140,
    },
});

const buyHouse = (name) => (event) => {
    console.log(name)
}

export function HouseListBuy() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        console.log('buy')
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();
    // utils.loadComponentData()
    //     .then(r => {
    //         console.log(r.web3.eth.getBlockNumber())
    //         console.log(r.web3.eth.getBlock(22195367))
    //         console.log(r.web3.eth.net.getId())
    //     })
    const houses = []
    return (
        <Grid container spacing={5}>
            {houses.map( house => (
                <Grid item>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia image={"https://www.thehousedesigners.com/house-plans/images/AdvSearch2-7263.jpg"}
                                       title={house.name} className={classes.media}>
                            </CardMedia>
                            <CardContent>
                                <p>{house.name}</p>
                                <p>{house.price}</p>
                                <p>{house.location}</p>
                            </CardContent>
                            <Button onClick={handleClickOpen} style={{backgroundColor: '#3f51b5', border: 'none', color: 'white', padding: '20px', textAlign: 'center',
                                textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer'}}>
                                <LocalAtmIcon></LocalAtmIcon>
                            </Button>
                        </CardActionArea>
                    </Card>
                </Grid>

            ))
            }
        </Grid>
    )
}