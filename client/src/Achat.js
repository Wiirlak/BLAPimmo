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
                <p>Achetez un résidence !</p>
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
            <Grid container spacing={5}>
                {props.data.propertiesArrayToSale.map( house => (
                    <Grid item key={house.id}>
                        <Card className={classes.root}>
                            <CardMedia image={"https://www.thehousedesigners.com/house-plans/images/AdvSearch2-7263.jpg"}
                                       title={house.name} className={classes.media}>
                            </CardMedia>
                            <CardContent width={"100%"}>
                                <p>{house.name}</p>
                                <p>{house.price}</p>
                                <p>{house.description}</p>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => this.handleClickOpenSell(house)} style={{backgroundColor: '#3f51b5', border: 'none', color: 'white', padding: '20px', textAlign: 'center',
                                    textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer'}}>
                                    <LocalAtmIcon></LocalAtmIcon>
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