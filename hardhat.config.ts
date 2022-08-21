require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers")

const config = {
  solidity: {
    compilers: [
      { version: '0.8.8' },
      { version: "0.6.6" }
    ]
  },
  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      url: `${process.env.RINKEBY_RPC_URL}`,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`],
      chainId: 4,
      blockConfirmations: 6,
    },
    goerli: {
      url: `${process.env.GOERLI_RPC_URL}`,
      accounts: [`0x${process.env.GOERLI_PRIVATE_KEY}`],
      chainId: 5,
      blockConfirmations: 6,
    }
  },
  gasReporter: {
    enabled: false,
    outputFile: '',
    noColors: true,
    currency: 'USD',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: 'MATIC'
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },

};



export default config;
