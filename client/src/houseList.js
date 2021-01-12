import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Grid} from "@material-ui/core";
import {House} from './modele/House'
import {makeStyles} from "@material-ui/styles";
import utils from "./utils";

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

const random = (name) => (event) => {
    console.log(name)
}


export default function HouseList() {
    const classes = useStyles();
    utils.loadComponentData()
        .then(r => {
            console.log(r.web3.eth.getBlockNumber())
            console.log(r.web3.eth.getBlock(22195367))
            console.log(r.web3.eth.net.getId())
        })
    const houses = [new House('House 1', 80, ' 12 Rue du port'),
        new House('House 2', 3, ' 12 Rue du pont')]
    return (
        <Grid container spacing={5}>
            {houses.map( house => (
                <Grid item>
                    <Card className={classes.root}>
                        <CardActionArea onClick={random(house.name)}>
                            <CardMedia image={"https://www.thehousedesigners.com/house-plans/images/AdvSearch2-7263.jpg"}
                            title={house.name} className={classes.media}>
                            </CardMedia>
                            <CardContent>
                                <p>{house.name}</p>
                                <p>{house.price}</p>
                                <p>{house.location}</p>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

            ))
            }
        </Grid>
    )
}