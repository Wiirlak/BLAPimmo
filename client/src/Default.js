import React, {Component} from "react";
import "./utils"
import utils from "./utils";

class Default extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storageValue: 0,
            web3: null,
            accounts: null,
            contract: null
        };
    }

    componentDidMount = async () => {
        await utils.loadComponentData()
            .then(r => {
                console.log(r)
                this.setState(r, this.runExample)
            })
    };

    runExample = async () => {
        console.log("example")
        const {accounts, contract} = this.state;
        // Get the value from the contract to prove it worked.
        const response = await contract.methods.balanceOf(accounts[0]).call();
        // Update state with the result.
        this.setState({storageValue: response});
    };

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div>
                <h1>Good to Go!</h1>
                <p>Your Truffle Box is installed and ready.</p>
                <h2>Smart Contract Example</h2>
                <p>
                    If your contracts compiled and migrated successfully, below will show
                    a stored value of 5 (by default).
                </p>
                <p>
                    Try changing the value stored on <strong>line 40</strong> of App.js.
                </p>
                <div>The stored value is: {this.state.storageValue}</div>
                <div>the smart contract: {this.state.contract._address}</div>
            </div>
        )
    }
}

export default Default;
