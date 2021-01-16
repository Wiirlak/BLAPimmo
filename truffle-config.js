const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  compilers: {
    solc: {
      version: "0.8.0",
      parser: "solcjs"
    },
  },
  networks: {
    test: {
      port: 9545,
      network_id: '*',
      accounts: 5,
      defaultEtherBalance: 500,
      blockTime: 3,
      gasPrice: 12,
      gas: 4700000
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`)
      },
      network_id: 42
    }
  }
};
