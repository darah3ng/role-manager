// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoleManager is Ownable {
    mapping(address => bool) private _wallets;

    function showWallet(address _addr) public view returns (bool) {
        return _wallets[_addr];
    }

    function setWallet(address _addr) public onlyOwner returns (bool) {
        _wallets[_addr] = true;
        return true;
    }

    function unSetWallet(address _addr) public onlyOwner returns (bool) {
        _wallets[_addr] = false;
        return true;
    }
}
