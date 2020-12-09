import getWeb3 from "./getWeb3";
import PropertyOwnershipContract from "./contracts/PropertyOwnership.json";

const loadComponentData = async () => {
    console.log("load")
    try {

        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = PropertyOwnershipContract.networks[networkId];

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

export default {
    loadComponentData,
}