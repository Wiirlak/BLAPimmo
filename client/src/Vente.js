import React, {Component} from "react";
import {HouseListSold} from "./houseList";

class Vente extends Component {

    render() {
        return (
            <div>
                <p>Vendre une de vos résidences !</p>
                <p>Actuellement en vente</p>
                <HouseListSold>

                </HouseListSold>
                <p>Mettre une nouvelle maison en vente</p>
                <p>Formulaire</p>

                <p>En votre possession</p>
                <p>Listing des maisons achetées mais pas en vente</p>

            </div>
        )
    }
}

export default Vente;