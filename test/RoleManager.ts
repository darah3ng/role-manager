import { ethers } from "hardhat";
import { expect } from "chai";

describe("Greeting", () => {
  async function setupContracts() {
    const Greeting = await ethers.getContractFactory("Greeting");
    const greeting = await Greeting.deploy();

    const RoleManager = await ethers.getContractFactory("RoleManager");
    const roleManager = await RoleManager.deploy();

    const [owner, admin, otherAccount] = await ethers.getSigners();

    return { greeting, roleManager, owner, admin, otherAccount };
  }

  it("should have an initial greeting of empty string", async function () {
    const { greeting } = await setupContracts();
    expect(await greeting.greet()).to.equal("");
  });

  it("should by default apply the owner wallet to be the owner of the contract deployment", async function () {
    const { greeting, owner } = await setupContracts();
    expect(await greeting.owner()).to.equals(owner.address);
  });

  it("should allow an authorized wallet to set the greeting", async function () {
    const { greeting, roleManager, owner, admin } = await setupContracts();

    // Accept owner and admin wallet
    await roleManager.setWallet(owner.address);
    await roleManager.setWallet(admin.address);

    // Point roleManager in Greeting.sol to use RoleManager.sol
    await greeting.setRoleManager(roleManager.address);

    const ownerText = "Hi, this is the owner!";
    const adminText = "Hello, I am the admin!";

    await greeting.connect(owner).setGreet(ownerText);
    expect(await greeting.greet()).to.equal(ownerText);

    await greeting.connect(admin).setGreet(adminText);
    expect(await greeting.greet()).to.equal(adminText);
  });

  it("should prevent unauthorized wallet from setting the greeting", async function () {
    const { greeting, roleManager, owner, otherAccount } =
      await setupContracts();

    // Accept owner and admin wallet
    await roleManager.setWallet(owner.address);

    // Point roleManager in Greeting.sol to use RoleManager.sol
    await greeting.setRoleManager(roleManager.address);

    await expect(
      greeting.connect(otherAccount).setGreet("Hi, I am a random account!")
    ).to.be.revertedWith("The wallet is not authorized.");
  });

  it("should allow checking if a wallet has access", async function () {
    const { greeting, roleManager, owner, otherAccount } =
      await setupContracts();

    // Accept owner and admin wallet
    await roleManager.setWallet(owner.address);

    // Point roleManager in Greeting.sol to use RoleManager.sol
    await greeting.setRoleManager(roleManager.address);

    expect(await greeting.hasRole(owner.address)).to.equal(true);
    expect(await greeting.hasRole(otherAccount.address)).to.equal(false);
  });

  it("should unset the wallet if the owner decides to", async function () {
    const { greeting, roleManager, owner, otherAccount } =
      await setupContracts();

    // Accept owner and otherAccount wallet
    await roleManager.setWallet(owner.address);
    await roleManager.setWallet(otherAccount.address);

    // Point roleManager in Greeting.sol to use RoleManager.sol
    await greeting.setRoleManager(roleManager.address);

    expect(await greeting.hasRole(owner.address)).to.equal(true);
    expect(await greeting.hasRole(otherAccount.address)).to.equal(true);

    await roleManager.unSetWallet(otherAccount.address);
    expect(await greeting.hasRole(otherAccount.address)).to.equal(false);
  });
});
