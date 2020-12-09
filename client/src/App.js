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
    render() {
        return (
            <div className="App">
                <Router>
                    <AppHeader />
                    <div>
                        <Switch>
                            <Route exact path="/" component={Default}/>
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
