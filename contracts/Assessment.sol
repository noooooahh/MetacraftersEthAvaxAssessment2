// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public weight;

    event ChangedWeight(uint256 amount);

    constructor() payable {
        owner = payable(msg.sender);
        weight = 70;
    }

    function getWeight() public view returns(uint256){
        return weight;
    }

    function addWeight(uint256 _kilograms) public {
        uint _previousWeight = weight;

        // perform transaction
        weight += _kilograms;

        // assert transaction completed successfully
        assert(weight == _previousWeight + _kilograms);

        // emit the event
        emit ChangedWeight(_kilograms);
    }

     function removeWeight(uint256 _kilograms) public {
        uint _previousWeight = weight;

        // perform transaction
        weight -= _kilograms;

        // assert transaction completed successfully
        assert(weight == _previousWeight - _kilograms);

        // emit the event
        emit ChangedWeight(_kilograms);
    }

    function checkWeight() public view returns(string memory) {
        if (weight < 90 || weight > 110) {
            return "Weight must be between 90kg and 110kg. Please adjust your weight!";
        }
        return "You have the right weight!";
    }

}