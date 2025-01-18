require('dotenv').config({ path: '../.env' });
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
  networks: {
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc', // Avalanche Fuji Testnet RPC URL
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
};