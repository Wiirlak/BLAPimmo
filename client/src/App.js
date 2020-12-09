import React, {Component} from "react";

import "./App.css";

import AppHeader from "./AppBar";
import {withRouter} from "react-router"
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Achat from "./Achat";
import Default from "./Default";
import Vente from "./Vente";

class App extends Component {



    render() {
        return (

            <div className="App">
                <AppHeader />
                <Router>
                    <div>
                        <Route exact path="/" component={withRouter(Default)}/>
                        <Route path="/achat" component={withRouter(Achat)}/>
                        <Route path="/vente" component={withRouter(Vente)}/>
                    </div>
                </Router>

            </div>
        );
    }
}

export default App;
