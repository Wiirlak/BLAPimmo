import React, {Component} from "react";

class Default extends Component {
    state = {storageValue: 0, web3: null, accounts: null, contract: null};

    componentDidMount = async () => {
        this.rap = this.props.data3
        console.log('v')
        // await this.runExample()
    };

    runExample = async () => {
        const {accounts, contract} = this.state;

        // Get the value from the contract to prove it worked.
        const response = await contract.methods.balanceOf(accounts[0]).call();

        // Update state with the result.
        this.setState({storageValue: response});
    };

    render() {
        if (!this.props.web3) {
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
                <div>The stored value is: {this.props.storageValue}</div>
                <div>the smart contract: {this.props.contract._address}</div>
            </div>
        )
    }
}

export default Default;
