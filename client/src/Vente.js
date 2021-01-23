import React, {Component} from "react";
import {
    Button,
    Card,
    CardActions,
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
import {ethers} from "ethers";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import CancelIcon from '@material-ui/icons/Cancel';

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
            isLoading: true,
            labelName: "",
            labelAddress: "",
            labelDescription: "",
            labelPrix: 0,
            labelSurface: 0,
            selectedHouse: null,
            openCreate: false,
            openSell: false,
            openDelete: false
        };
    }

    componentDidMount() {
       this.getOwnedProperties().then(_ => this.setState({isLoading: false})
       );
    }

    render() {
        return (
            <div>
                <h1>Vendre une de vos résidences !</h1>
                <h2>Actuellement en vente</h2>
                {!this.isLoading ?
                    this.state.propertiesArrayToSale.length ?
                        <this.HouseListSold data={this.state}/>
                        :<p>Empty result</p>
                    :<p>Loading</p>
                }
                <this.AlertDialog/>
                <this.AlertDialogSell/>
                <this.AlertDialogDelete/>
                <h1>En votre possession</h1>
                <h2>Liste de vos maisons pas en vente</h2>
                {!this.isLoading ?
                    this.state.propertiesArrayOwned.length ?
                        <this.HouseListOwn data={this.state}/>
                        :<p>Empty result</p>
                    :<p>Loading</p>
                }

            </div>
        )
    }

    async getOwnedProperties(){
        const componentData = await utils.loadComponentData();

        const properties = await componentData.contract.methods.getPropertiesByOwner().call({ from: componentData.accounts[0]})

        this.setState({propertiesArrayToSale: [], propertiesArrayOwned: []})

        for(const property in properties) {
            const propertyTmp = await componentData.contract.methods.getProperty(properties[property]).call()
            const isForSale = await componentData.contract.methods.isForSale(properties[property]).call()
            const house = new House(propertyTmp.price,
                                    propertyTmp.surface,
                                    propertyTmp.name,
                                    propertyTmp.addr,
                                    propertyTmp.description,
                                    propertyTmp.dateUtc,
                                    parseInt(properties[property])
                )
            if(isForSale){
                this.setState({propertiesArrayToSale: [...this.state.propertiesArrayToSale, house]})
            }else{
                this.setState({propertiesArrayOwned: [...this.state.propertiesArrayOwned, house]})
            }
        }
    }

    HouseListSold = (props) => {
        const classes = styleHouseListSold();

        console.log(props.data.propertiesArrayToSale)
        return (
            <Grid container spacing={5}  style={{marginLeft:'1vH', marginRight:'1vH'}}>
                {props.data.propertiesArrayToSale.map( house => (
                    <Grid item key={house.id} style={{display: 'flex', alignItems: 'stretch', justifyContent: 'space-between'}}>
                        <Card className={classes.root} style={{display: 'flex', flexDirection:'column', maxWidth:'17vW', minWidth:'17vW'}}>
                            <CardMedia image={"https://www.thehousedesigners.com/house-plans/images/AdvSearch2-7263.jpg"}
                                       title={house.name} className={classes.media}>
                            </CardMedia>
                            <CardContent  width={"100%"} style={{display:'inline-block'}}>
                                <div style={{display:'flex',justifyContent: 'space-between' }}>
                                    <p><b>{house.name}</b></p>
                                    <p style={{marginLeft:'9vW'}}><b>Prix</b>: {house.price}Ξ</p>
                                </div>
                                <p><b>Mise en vente le</b>: {house.dateUtc}</p>
                                <p><b>Surface</b>: {house.surface}m²</p>
                                <p style={{maxWidth: '20vW', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '15vH'}}>{house.description}</p>
                            </CardContent>
                            <CardActions width={"100%"} style={{marginTop: 'auto'}}>
                                <Button onClick={() => this.handleClickOpenDelete(house)} style={{backgroundColor: '#ff7777', border: 'none', color: 'white', padding: '20px', textAlign: 'center',
                                    textDecoration: 'none', display: 'flex', fontSize: '10px', margin: '4px 2px', cursor: 'pointer', width:'100%'}}>
                                    <p style={{marginRight:'10px'}}>Annuler la mise en vente !</p>
                                    <CancelIcon/>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
                }
            </Grid>
        )
    }

    HouseListOwn = (props) => {
        const classes = styleHouseListSold();
        return (
            <Grid container spacing={5}  style={{marginLeft:'1vH', marginRight:'1vH'}}>
                {props.data.propertiesArrayOwned.map( house => (
                    <Grid item key={house.id} style={{display: 'flex', alignItems: 'stretch', justifyContent: 'space-between'}}>
                        <Card className={classes.root} style={{display: 'flex', flexDirection:'column', maxWidth:'17vW', minWidth:'17vW'}}>

                            <CardMedia image={"https://www.thehousedesigners.com/house-plans/images/AdvSearch2-7263.jpg"}
                                       title={house.name} className={classes.media}>
                            </CardMedia>
                            <CardContent width={"100%"} style={{display:'inline-block'}}>
                                <div style={{display:'flex',justifyContent: 'space-between' }}>
                                    <p><b>{house.name}</b></p>
                                    <p style={{marginLeft:'9vW'}}><b>Prix</b>: {house.price}Ξ</p>
                                </div>
                                <p stylme={{textAlign: 'left'}}><b>Mise en vente le</b>: {house.dateUtc}</p>
                                <p><b>Surface</b>: {house.surface}m²</p>
                                <p style={{maxWidth: '20vW', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '15vH'}}>{house.description}</p>
                            </CardContent>
                            <CardActions  width={"100%"} style={{marginTop: 'auto'}}>
                                <Button onClick={() => this.handleClickOpenSell(house)} style={{backgroundColor: '#3f51b5', border: 'none', color: 'white', padding: '20px', textAlign: 'center',
                                    textDecoration: 'none', display: 'flex', fontSize: '10px', margin: '4px 2px', cursor: 'pointer', width:'100%'}}>
                                    <p  style={{marginRight:'5px'}}>Mettre en vente !</p>
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

    handleCloseCreate = () =>{
        this.setState({ openCreate: false})
    }

    handleClickOpenCreate = () =>{
        this.setState({ openCreate: true})
    }

    handleCloseSell = () =>{
        this.setState({ openSell: false,selectedHouse: null})
    }

    handleClickOpenSell = (house) =>{
        this.setState({ openSell: true, selectedHouse: house})
    }

    handleCloseDelete = () =>{
        this.setState({ openDelete: false,selectedHouse: null})
    }

    handleClickOpenDelete = (house) =>{
        this.setState({ openDelete: true, selectedHouse: house})
    }


    AlertDialog = ()  => {

        return (
            <div>
                <br/>
                <Button onClick={this.handleClickOpenCreate} style={{
                    backgroundColor: '#3f51b5',
                    border: 'none',
                    color: 'white',
                    padding: '20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer'
                }}>
                    Mettre une nouvelle maison en vente
                </Button>
                <Dialog open={this.state.openCreate} onClose={this.handleCloseCreate} maxWidth={'xs'} fullWidth>
                    <DialogTitle>Mettre en vente une maison</DialogTitle>
                    <Grid container direction={"column"} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2vw',
                        padding: '10px'
                    }}>
                        <TextField label="Nom" name="labelName" value={this.state.labelName} onChange={this.handleChange.bind(this)} inputProps={{ maxLength: 30 }}/>
                        <TextField label="Adresse" name="labelAddress" value={this.state.labelAddress} onChange={this.handleChange.bind(this)} inputProps={{ maxLength: 30 }}/>
                        <TextField label="Description" name="labelDescription" value={this.state.labelDescription} onChange={this.handleChange.bind(this)}/>
                        <TextField label="Prix" name="labelPrix" value={this.state.labelPrix} onChange={this.handleChange.bind(this)} type="number"/>
                        <TextField type="number" label="Surface" name="labelSurface" value={this.state.labelSurface} onChange={this.handleChange.bind(this)}/>
                        <Button style={{marginTop: '1vw'}} onClick={this.saveNewProperty}>Payer</Button>
                    </Grid>
                </Dialog>
            </div>
        )
    }

    saveNewProperty = async () => {
        const componentData = await utils.loadComponentData()

        await componentData.contract.methods.createProperty(
            parseInt(this.state.labelPrix),
            parseInt(this.state.labelSurface),
            ethers.utils.formatBytes32String(this.state.labelName),
            ethers.utils.formatBytes32String(this.state.labelAddress),
            this.state.labelDescription,
            ethers.utils.formatBytes32String("2021-01-16T13:23:11Z"),
        ).send({ from: componentData.accounts[0], gas: 300000 }).then(_ => {
            this.handleCloseCreate()
            this.getOwnedProperties()
        })

    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    AlertDialogSell = ()  =>  {

        return (
            <div>
                <br/>
                <Dialog open={this.state.openSell} onClose={this.handleCloseSell} maxWidth={'xs'} fullWidth>
                    <DialogTitle>Mettre en vente une maison</DialogTitle>
                    <Grid container direction={"column"} style={{display: 'flex', alignItems: 'center',justifyContent: 'center', marginBottom: '2vw', padding: '10px'}}>
                        <p>Etes vous sur ?</p>
                        <Button style={{marginTop: '1vw'}}  onClick={()  => this.sellHouse()}>Confirmer</Button>
                    </Grid>
                </Dialog>
            </div>
        )
    }

    sellHouse = async () => {
        const componentData = await utils.loadComponentData();
        componentData.contract.methods.addProperty(this.state.selectedHouse.id).send({ from: componentData.accounts[0]}).then(_ => {
            this.handleCloseSell()
            this.getOwnedProperties()
        })
        console.log(this.state.selectedHouse)
    }

    AlertDialogDelete = ()  =>  {

        return (
            <div>
                <br/>
                <Dialog open={this.state.openDelete} onClose={this.handleCloseDelete} maxWidth={'xs'} fullWidth>
                    <DialogTitle>Enlever votre maison de la vente</DialogTitle>
                    <Grid container direction={"column"} style={{display: 'flex', alignItems: 'center',justifyContent: 'center', marginBottom: '2vw', padding: '10px'}}>
                        <p>Etes vous sur ?</p>
                        <Button style={{marginTop: '1vw'}}  onClick={()  => this.removeHouseFromMarket()}>Confirmer</Button>
                    </Grid>
                </Dialog>
            </div>
        )
    }

    removeHouseFromMarket = async () => {
        const componentData = await utils.loadComponentData();
        console.log(componentData.contract.methods)
        componentData.contract.methods.removePropertyFromMarketPlace(this.state.selectedHouse.id).send({ from: componentData.accounts[0]}).then(_ => {
            this.handleCloseDelete()
            this.getOwnedProperties()
        })
    }
}
export default Vente;