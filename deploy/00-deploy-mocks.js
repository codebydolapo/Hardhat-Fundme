// import { network } from "hardhat"
// import {developmentChains} from '../helper-hardhat-config'





module.exports = async ({deployments, getNamedAccounts})=>{
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    const chainId = network.config.chainId

    // const argumentsForContract = {
    //     DECIMALS: 8,
    //     INITIAL_VALUE: 200000000000
    // }

    

    if(chainId == 31337){ //LOCALHOST NETWORK FOR HARDHAT
        log("Local Network Detected: Deploying Mock Script...")
        await deploy('MockV3Aggregator', {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            // args: [argumentsForContract.DECIMALS, argumentsForContract.INITIAL_VALUE]
            args: []
        })
        log('Mock Deployed')
        log('-----------------------------------------------')
    }

}

module.exports.tags = ['all', 'mocks']