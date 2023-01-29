// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IRoleManager {
    function showWallet(address _addr) external view returns (bool);

    function setWallet(address _addr) external returns (bool);
}
