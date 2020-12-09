import React, {Component} from "react";

import "./App.css";

import AppHeader from "./AppBar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Achat from "./Achat";
import Default from "./Default";
import Vente from "./Vente";
import getWeb3 from "./getWeb3";
import PropertyOwnershipContract from "./contracts/PropertyOwnership.json";

class App extends Component {

    constructor() {
        super();
        this.state = {storageValue: 0, web3: null, accounts: null, contract: null};
        this.loadComponentData()
    }



    loadComponentData = async () => {

        try {

            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            console.log(accounts)

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();

            const deployedNetwork = PropertyOwnershipContract.networks[networkId];
            console.log(deployedNetwork)

            const instance = new web3.eth.Contract(
                PropertyOwnershipContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            return {web3, accounts, contract: instance};


        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    render() {
        return (
            <div className="App">

                <Router>
                    <AppHeader />
                    <div>
                        <Switch>
                            <Route exact path="/">
                                <Default data3={this.state}>
                                </Default>
                            </Route>
                            <Route path="/achat" component={Achat}/>
                            <Route path="/vente" component={Vente}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
