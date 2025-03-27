import { ethers } from "ethers";
import gigMarketPlaceABI from "./gigMarketplaceABI.json";
import registryABI from "./registryABI.json";
import tokenABI from "./tokenABI.json";
import reviewABI from "./reviewSystemABI.json";
import chatABI from "./chatSystemABI.json";

export const getGigContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.GIG_MARKET_PLACE as string,
    gigMarketPlaceABI,
    providerOrSigner
  );

export const getRegistryContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.REGISTRY as string,
    registryABI,
    providerOrSigner
  );

export const getTokenContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.TOKEN as string,
    tokenABI,
    providerOrSigner
  );

export const getReviewContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.REVIEW_SYSTEM as string,
    reviewABI,
    providerOrSigner
  );

export const getChatContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.CHAT_SYSTEM as string,
    chatABI,
    providerOrSigner
  );