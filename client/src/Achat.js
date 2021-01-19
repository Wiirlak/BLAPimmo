import React, {Component} from "react";
import utils from "./utils";
import {House} from "./modele/House";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogTitle,
    Grid
} from "@material-ui/core";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import {makeStyles} from "@material-ui/styles";


const styleHouseListToSale = makeStyles({
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

class Achat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            propertiesArrayToSale: [],
            selectedHouse: null,
            isLoading: true,
            openSell: false
        };
    }
    render() {
        return (
            <div>
                <h1>Achetez un résidence !</h1>
                <h2>Voici les résidences disponnibles à la vente</h2>
                {!this.isLoading ?
                    this.state.propertiesArrayToSale.length ?
                        <this.HouseListBuy data={this.state}/>
                        :<p>Empty result</p>
                    :<p>Loading</p>
                }
                <this.AlertDialogBuy/>
            </div>
    )
    }

    componentDidMount() {
        this.getOwnedProperties().then(_ => this.setState({isLoading: false})
        );
    }

    async getOwnedProperties() {
        const componentData = await utils.loadComponentData();

        const properties = await componentData.contract.methods.getMarketPlace().call({from: componentData.accounts[0]})
        this.setState({propertiesArrayToSale: []})

        for(const property in properties) {
            const propertyTmp = await componentData.contract.methods.getProperty(properties[property]).call()
            const house = new House(propertyTmp.price,
                propertyTmp.surface,
                propertyTmp.name,
                propertyTmp.addr,
                propertyTmp.description,
                propertyTmp.dateUtc,
                parseInt(properties[property])
            )
            this.setState({propertiesArrayToSale: [...this.state.propertiesArrayToSale, house]})
        }

    }

    HouseListBuy = (props) =>  {
        const classes = styleHouseListToSale();
        return (
            <Grid container spacing={5} style={{marginLeft:'1vH', marginRight:'1vH'}}>
                {props.data.propertiesArrayToSale.map( house => (
                    <Grid item key={house.id} style={{display: 'flex', alignItems: 'stretch', justifyContent: 'space-between'}}>
                        <Card className={classes.root} style={{display: 'flex', flexDirection:'column', maxWidth:'17vW', minWidth:'17vW'}}>
                            <CardMedia image={"https://www.thehousedesigners.com/house-plans/images/AdvSearch2-7263.jpg"}
                                       title={house.name} className={classes.media}>
                            </CardMedia>
                            <CardContent width={"100%"} style={{display:'inline-block'}}>
                                <div style={{display:'flex' ,justifyContent: 'space-between' }}>
                                    <p><b>{house.name}</b></p>
                                    <p style={{marginLeft:'9vW'}}><b>Prix</b>: {house.price}Ξ</p>
                                </div>
                                <p><b>Mise en vente le</b>: {house.dateUtc}</p>
                                <p><b>Surface</b>: {house.surface}m²</p>
                                <p style={{maxWidth: '20vW', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '15vH'}}>{house.description}</p>
                            </CardContent>
                            <CardActions width={"100%"} style={{marginTop: 'auto'}}>
                                <Button  onClick={() => this.handleClickOpenSell(house)} style={{backgroundColor: '#3f51b5', border: 'none', color: 'white', padding: '20px', textAlign: 'center',
                                    textDecoration: 'none', display: 'flex', fontSize: '10px', margin: '4px 2px', cursor: 'pointer', width:'100%'}}>
                                    <p  style={{marginRight:'10px'}}>Achetez !</p>
                                    <LocalAtmIcon/>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                ))
                }
            </Grid>
        )
    }

    handleCloseSell = () =>{
        this.setState({ openSell: false,selectedHouse: null})
    }

    handleClickOpenSell = (house) =>{
        this.setState({ openSell: true, selectedHouse: house})
    }

    AlertDialogBuy = ()  =>  {

        return (
            <div>
                <br/>
                <Dialog open={this.state.openSell} onClose={this.handleCloseSell} maxWidth={'xs'} fullWidth>
                    <DialogTitle>Etes vous sur de vouloir acheter cette maison ?</DialogTitle>
                    <Grid container direction={"column"} style={{display: 'flex', alignItems: 'center',justifyContent: 'center', marginBottom: '2vw', padding: '10px'}}>
                        <p>Etes vous sur ?</p>
                        <Button style={{marginTop: '1vw'}}  onClick={()  => this.buyHouse()}>Confirmer</Button>
                    </Grid>
                </Dialog>
            </div>
        )
    }

    buyHouse = async () => {
        const componentData = await utils.loadComponentData();

        const amountToSend = componentData.web3.utils.toWei(this.state.selectedHouse.price, "ether");
        componentData.contract.methods.transaction(this.state.selectedHouse.id).send({ from: componentData.accounts[0], value:amountToSend}).then(_ => {
            this.handleCloseSell()
            this.getOwnedProperties()

        })
    }
}

export default Achat;