require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc', // Avalanche Fuji Testnet RPC URL
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
