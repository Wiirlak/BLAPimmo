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
import utils from "./utils";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ShopIcon from '@material-ui/icons/Shop';

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

const sellHouse = (name) => (event) => {
    console.log(name)
}

const buyHouse = (name) => (event) => {
    console.log(name)
}

export function HouseListSold() {
    const classes = useStyles();
    // utils.loadComponentData()
    //     .then(r => {
    //         console.log(r.web3.eth.getBlockNumber())
    //         console.log(r.web3.eth.getBlock(22195367))
    //         console.log(r.web3.eth.net.getId())
    //     })
    const houses = [new House('House 1', 80, ' 12 Rue du port'),
        new House('House 2', 3, ' 12 Rue du pont')]
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
                            <AlertDialogSell house={house}/>
                        </CardActionArea>
                    </Card>
                </Grid>

            ))
            }
        </Grid>
    )
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
    const houses = [new House('House 1', 80, ' 12 Rue du port'),
        new House('House 2', 3, ' 12 Rue du pont')]
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

export function HouseListOwn() {
    const classes = useStyles();
    // utils.loadComponentData()
    //     .then(r => {
    //         console.log(r.web3.eth.getBlockNumber())
    //         console.log(r.web3.eth.getBlock(22195367))
    //         console.log(r.web3.eth.net.getId())
    //     })
    const houses = [new House('House 1', 80, ' 12 Rue du port'),
        new House('House 2', 3, ' 12 Rue du pont')]
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
                            <AlertDialogSell house={house}/>
                        </CardActionArea>
                    </Card>
                </Grid>

            ))
            }
        </Grid>
    )
}


export function AlertDialogSell(house) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        console.log('vendu')
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <br/>
            <Button onClick={handleClickOpen} style={{backgroundColor: '#3f51b5', border: 'none', color: 'white', padding: '20px', textAlign: 'center',
                textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer'}}>
                <LocalAtmIcon></LocalAtmIcon>
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'xs'} fullWidth>
                <DialogTitle>Mettre en vente une maison</DialogTitle>
                <Grid container direction={"column"} style={{display: 'flex', alignItems: 'center',justifyContent: 'center', marginBottom: '2vw', padding: '10px'}}>
                    <TextField label="Prix" />
                    <Button style={{marginTop: '1vw'}}  onClick={sellHouse(house)}>Mettre en vente</Button>
                </Grid>
            </Dialog>
        </div>
    )
}
