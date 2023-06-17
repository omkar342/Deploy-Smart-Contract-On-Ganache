// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    uint256 public myNumber;

    function setNumber(uint256 number) external {
        myNumber = number;
    }

    function getNumber() external view returns (uint256) {
        return myNumber;
    }
}
