const { getNamedAccounts, deployments, network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")



export default async ({ deployments, getNamedAccounts }: any) => {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId: any = network.config.chainId

    //THE DEPLOY FUNCTION LETS YOU DEPLOY WHATEVER INSTANCE YOU WANT. IT TAKES IN TWO ARGS. ONE, THE NAME. THE SECOND, AN OBLECT CONTAINING WHO THE TRANSACTION IS FROM, THE ARGUMENTS IT TAKES IN, AND WHETHER OR NOT TO LOG ITSELF
    //THE LOG FUNCTION LETS YOU LOG FUNCTIONS BEFORE, DURING OR AFTER DEPLOYMENTS. LITERALLY THE SAME AS CONSOLE LOGS
    //THE GET FUNCTION LETS YOU GET INSTANCES OF DEPLOYED CONTRACTS

    //THE DEPLOYER IS SIMPLY THE ADDRESS OF WHO IS DEPLOYING THE CONTRACT. IN THIS CASE, YOU

    //THE CHAIN ID IS SIMPLY THE IDENTIIFER OF THE CHAIN YOU'RE TRYING TO USE. 4 FOR RINKEBY, 31337 FOR HARDHAT, ETC


    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
}

module.exports.tags = ["all", "fundme"]