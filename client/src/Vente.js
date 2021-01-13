import React, {Component} from "react";
import {HouseListOwn, HouseListSold} from "./houseList";
import {Button, Dialog, DialogTitle, Grid, TextField} from "@material-ui/core";


class Vente extends Component {

    render() {
        return (
            <div>
                <p>Vendre une de vos résidences !</p>
                <p>Actuellement en vente</p>
                <HouseListSold>

                </HouseListSold>
                <AlertDialog></AlertDialog>
                <p>En votre possession</p>
                <p>Listing des maisons achetées mais pas en vente</p>
                <HouseListOwn></HouseListOwn>

            </div>
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