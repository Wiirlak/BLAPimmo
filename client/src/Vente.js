import React, {Component} from "react";
import {AlertDialogSell} from "./houseList";
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
import utils from "./utils";
import {House} from "./modele/House";
import {makeStyles} from "@material-ui/styles";

const styleHouseListSold = makeStyles({
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

class Vente extends Component {


    constructor(props) {
        super(props);
        this.state = {
            propertiesArrayOwned: [],
            propertiesArrayToSale: [],
            isLoading: true
        };
    }

    componentDidMount() {
       this.getOwnedProperties().then(load => this.setState({isLoading: false})
       );
    }

    render() {
        return (
            <div>
                <p>Vendre une de vos résidences !</p>
                <p>Actuellement en vente</p>
                {!this.isLoading ?
                    this.state.propertiesArrayToSale.length ?
                        <this.HouseListSold data={this.state}/>
                        :<p>Empty result</p>
                    :<p>Loading</p>
                }
                <AlertDialog></AlertDialog>
                <p>En votre possession</p>
                <p>Listing des maisons achetées mais pas en vente</p>
                {!this.isLoading ?
                    this.state.propertiesArrayOwned.length ?
                        <this.HouseListOwn data={this.state}/>
                        :<p>{this.state.propertiesArrayOwned}</p>
                    :<p>Loading</p>
                }

            </div>
        )
    }

    async getOwnedProperties(){
        const componentData = await utils.loadComponentData();

        // const market = await componentData.contract.methods.getMarketPlace().call();
        const properties = await componentData.contract.methods.getPropertiesByOwner().call({ from: componentData.accounts[0]})

        for(const property in properties) {
            const propertyTmp = await componentData.contract.methods.getProperty(property).call()
            const isForSale = await componentData.contract.methods.isForSale(property).call()
            const house = new House(propertyTmp.price,
                                    propertyTmp.surface,
                                    propertyTmp.name,
                                    propertyTmp.addr,
                                    propertyTmp.description,
                                    propertyTmp.dateUtc )
            if(isForSale){
                this.setState({propertiesArrayToSale: [...this.state.propertiesArrayToSale, house]})
            }else{
                this.setState({propertiesArrayOwned: [...this.state.propertiesArrayOwned, house]})
            }
        }
    }

    HouseListSold(props) {
        const classes = styleHouseListSold();

        return (
            <Grid container spacing={5}>
                {props.data.propertiesArrayToSale.map( house => (
                    <Grid item>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia image={"https://www.thehousedesigners.com/house-plans/images/AdvSearch2-7263.jpg"}
                                           title={house.name} className={classes.media}>
                                </CardMedia>
                                <CardContent>
                                    <p>{house.name}</p>
                                    <p>{house.price}</p>
                                    <p>{house.description}</p>
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

    HouseListOwn(props) {
        const classes = styleHouseListSold();
        return (
            <Grid container spacing={5}>
                {props.data.propertiesArrayOwned.map( house => (
                    <Grid item>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia image={"https://www.thehousedesigners.com/house-plans/images/AdvSearch2-7263.jpg"}
                                           title={house.name} className={classes.media}>
                                </CardMedia>
                                <CardContent>
                                    <p>{house.name}</p>
                                    <p>{house.price}</p>
                                    <p>{house.description}</p>
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
}

export default Vente;

export function AlertDialog() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <br/>
        <Button onClick={handleClickOpen} style={{backgroundColor: '#3f51b5', border: 'none', color: 'white', padding: '20px', textAlign: 'center',
            textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer'}}>
            Mettre une nouvelle maison en vente
        </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'xs'} fullWidth>
                <DialogTitle>Mettre en vente une maison</DialogTitle>
                <Grid container direction={"column"} style={{display: 'flex', alignItems: 'center',justifyContent: 'center', marginBottom: '2vw', padding: '10px'}}>
                    <TextField label="Label" />
                    <TextField label="Adresse" />
                    <TextField label="Description" />
                    <TextField label="Prix" />
                    <Button style={{marginTop: '1vw'}}>Payer</Button>
                </Grid>
            </Dialog>
        </div>
    )
}