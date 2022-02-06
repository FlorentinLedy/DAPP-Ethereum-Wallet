//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Wallet {
    
    mapping(address => uint) Wallets;

    

    receive() external payable{
        Wallets[msg.sender] += msg.value;
    }

    fallback() external payable{

    }

}
