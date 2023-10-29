require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL , PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    ganache: {
      url: API_URL, // Adjust the URL if necessary
      accounts: [PRIVATE_KEY],
    }
  },
};
