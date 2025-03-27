// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeployModule", (m) => {
  const deploymentOptions = {
    gasLimit: 5000000,
  };

  const registry = m.contract("Registry");
  const token = m.contract("Token");

  const paymentProcessor = m.contract("PaymentProcessor", [token]);
  const gigMarketplace = m.contract("GigMarketplace", [
    registry,
    paymentProcessor,
  ]);

  const reviewSystem = m.contract("ReviewSystem", [registry, gigMarketplace]);
  const chatSystem = m.contract("ChatSystem", [gigMarketplace]);

  return { registry, token, paymentProcessor, gigMarketplace, reviewSystem, chatSystem };
});
