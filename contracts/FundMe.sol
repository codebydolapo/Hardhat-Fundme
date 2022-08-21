// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    mapping(address => uint256) public addressToAmountFunded;
    address[] private funders;

    // Could we make this constant?  /* hint: no! We should make it immutable! */
    address private /* immutable */ i_owner;
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;

    AggregatorV3Interface public priceFeed;
    
    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }
    
    function getVersion() public view returns (uint256){
        // AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        return priceFeed.version();
    }
    
    modifier onlyOwner {
        
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }
    
    // function withdraw() payable onlyOwner public {
    //     for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
    //         address funder = funders[funderIndex];
    //         addressToAmountFunded[funder] = 0;
    //     }
    //     funders = new address[](0);
        
    //     (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
    //     require(callSuccess, "Call failed");
    // }

    function withdraw() public payable onlyOwner{
        address[] memory fundersMem = funders;
        for(uint256 i = 0; i < fundersMem.length; i++){
            address funder = fundersMem[i];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}('');
        require(success, 'Cannot Withdraw! Not Owner');
    }

    function getOwner() public view returns(address){
        return i_owner;
    }

    function getAmountFunded(address _funderAddress) public view returns(uint256){
        uint256 funderAmount = addressToAmountFunded[_funderAddress];
        return funderAmount;
    }
    

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

}


