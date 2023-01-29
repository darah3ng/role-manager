// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import {IRoleManager} from "./IRoleManager.sol";

error Unauthorized();

contract Greeting is Ownable {
    string private _greet;
    IRoleManager private _roleManager;

    event SetRoleManager();
    event SetGreet();

    modifier onlyWalletWithAccess() {
        require(
            _roleManager.showWallet(msg.sender),
            "The wallet is not authorized."
        );
        _;
    }

    function speak() public view returns (string memory) {
        return _greet;
    }

    function setGreet(
        string memory _greetInput
    ) public onlyWalletWithAccess returns (bool) {
        _greet = _greetInput;
        emit SetGreet();
        return true;
    }

    function setRoleManager(address _addr) public onlyOwner {
        _roleManager = IRoleManager(_addr);
        emit SetRoleManager();
    }

    function hasRole(address _addr) public view returns (bool) {
        return _roleManager.showWallet(_addr);
    }
}
