const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Registry = await hre.ethers.getContractFactory("Registry");
  const Token = await hre.ethers.getContractFactory("Token");
  const PaymentProcessor = await hre.ethers.getContractFactory(
    "PaymentProcessor"
  );
  const GigMarketplace = await hre.ethers.getContractFactory("GigMarketplace");
  const ReviewSystem = await hre.ethers.getContractFactory("ReviewSystem");
  const ChatSystem = await hre.ethers.getContractFactory("ChatSystem");

  // Deploy contracts
  const registry = await Registry.deploy();
  await registry.waitForDeployment();

  const token = await Token.deploy();
  await token.waitForDeployment();

  const paymentProcessor = await PaymentProcessor.deploy(token.getAddress());
  await paymentProcessor.waitForDeployment();

  const gigMarketplace = await GigMarketplace.deploy(
    registry.getAddress(),
    paymentProcessor.getAddress()
  );
  await gigMarketplace.waitForDeployment();

  const reviewSystem = await ReviewSystem.deploy(
    registry.getAddress(),
    gigMarketplace.getAddress()
  );
  await reviewSystem.waitForDeployment();

  const chatSystem = await ChatSystem.deploy(gigMarketplace.getAddress());
  await chatSystem.waitForDeployment();

  console.log("Registry deployed to:", await registry.getAddress());
  console.log("Token deployed to:", await token.getAddress());
  console.log(
    "PaymentProcessor deployed to:",
    await paymentProcessor.getAddress()
  );
  console.log("GigMarketplace deployed to:", await gigMarketplace.getAddress());
  console.log("ReviewSystem deployed to:", await reviewSystem.getAddress());
  console.log("ChatSystem deployed to:", await chatSystem.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
