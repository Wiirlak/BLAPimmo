import React, {Component} from "react";
import {HouseListSold} from "./houseList";

class Vente extends Component {

    render() {
        return (
            <div>
                <p>Vendre une de vos résidences !</p>
                <HouseListSold>

                </HouseListSold>
            </div>
        )
    }
}

export default Vente;