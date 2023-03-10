# Role manager smart contract

This project implements a simple Greeting contract that enables setting and retrieving a greeting message through a **role-based approach**, enforced by the **RoleManager** contract.

The Greeting contract extends the Ownable contract from the OpenZeppelin library, which provides ownership-related functionality, such as the `onlyOwner` modifier. It also has a reference to an instance of an **IRoleManager contract**, which is used to check if a wallet has access to perform certain actions on the Greeting contract.

The `onlyWalletWithAccess` modifier is used to enforce this check and prevent unauthorized access. Additionally, it provides the `hasRole` function that allows checking if a given address has access to the Greeting contract.

## Diagram

<img src="https://user-images.githubusercontent.com/12386682/215650811-d943be35-39ae-494d-81cf-49664387f266.png" width="700px" />



Commands

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
