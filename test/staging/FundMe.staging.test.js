const {getNamedAccounts, ethers, network} = require('hardhat')
const {developmentChains} = require( '../../helper-hardhat-config')
const {assert} = require('chai')
const { assertHardhatInvariant } = require('hardhat/internal/core/errors')

debelopmentChains.includes(network.name) ? describe.skip :
describe('FundMe', async function(){
    let fundMe, deployer
    const sendValue = ethers.utils.parseEther('1')
    beforeEach(async function(){
        deployer = (await getNamedAccounts).deployer
        fundMe = await ethers.getContract('FundMe')
    })

    it('Allows people to fund and withdraw', async function (){
        await fundMe.fund({value: sendValue})
        const endingBalance = await fundMe.provider.getBalance(fundMe.address)
        assert.equal(endingBalance.toString(), "0")
    })
})