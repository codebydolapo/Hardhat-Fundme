const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")


describe("FundMe", function () {

    let mockV3Aggregator: any, fundMe: any
    beforeEach(async () => {
        // const accounts = await ethers.getSigners()
        // let deployer = accounts[0]

        const deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer
        )
    })


    it("sets the aggregator addresses correctly", async () => {
        const response = await fundMe.getPriceFeed()
        assert.equal(response, mockV3Aggregator.address)
    })
})