"use client";

import Image from "next/image";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import Button from "../Button";
// import Link from "next/link";
// import { links } from "@/utils/links";
import AnimatedDiv from "@/components/AnimatedDiv";
import { useEthersProvider } from "@/hooks/useEthersProvider";
import { useAccount } from "wagmi";
import { getRegistryContract, getTokenContract } from "@/constants/contracts";
import { useRouter } from "next/navigation";
import ConnectWallet from "../ConnectWallet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const provider = useEthersProvider();
  const { address, isConnected } = useAccount();
  const router = useRouter();

  // Menu items array
  const menuItems = [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
    { href: "#howItWorks", label: "How It Works" },
    { href: "#resources", label: "Resources" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = async () => {
    try {
      if (!provider) {
        throw new Error("Provider not initialized");
      }

      const registryContract = getRegistryContract(provider);
      const tokenContract = getTokenContract(provider);
      
      const isClient = await registryContract.isClient(address);
      console.log("Client checked", isClient);
      const isArtisan = await registryContract.isArtisan(address);
      console.log("Artisan checked", isArtisan);

      const hasClaimed = await tokenContract.hasClaimed(address);
      console.log("Claim checked", hasClaimed);

      console.log("Roles checked");
      if (isArtisan) {
        router.push("/marketplace");
      } else if (isClient) {
        if (!hasClaimed) {
          router.push("/role/clients/claim-token");
        } else {
          router.push("/marketplace");
        }
      } else {
        router.push("/register");
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <div>
      <div className="bg-header w-screen  bg-opacity-100 flex justify-between border-b-[0.5px] border-[#FCFBF726] shadow-lg px-4 md:px-8 items-center py-4  font-merriweather">
        <div className="flex md:px-2 gap-x-4 items-center font-mooli">
          <Image src="/logo.png" alt="CraftLink logo" width={22} height={49} />
          <span className="text-[20px] md:text-[28px]">
            Craft{""}
            <span className="bg-[#FFD700] text-[#1A1203] rounded-sm">Link</span>
          </span>
        </div>

        <div className="hidden md:flex gap-x-8 text-lg text-[#F9F1E2]">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#FFD700]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex">
          {/* <Link  href={links.register}> */}
          {isConnected ? <Button onClick={handleLogin} text="Get Started" /> :  <ConnectWallet />}
          {/* </Link> */}
        </div>

        <div className="flex lg:hidden">
          <MdOutlineMenu color="#FFD700" size={32} onClick={toggleMenu} />
        </div>
      </div>

      {isMenuOpen && (
        <AnimatedDiv
        initialX="100%"
        animateX={0}
        exitX={"-100%"}
        duration={1.0}
        className="fixed inset-0 w-screen h-screen bg-[#333333] bg-opacity-50 z-10">
          <div className="relative top-8 right-1 flex justify-end">
            <button
              onClick={toggleMenu}
              className="text-[#FFD700] text-3xl"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 bg-[#1A1A1A] text-[#F9F1E2] h-full p-6 text-xl rounded-md">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className="hover:text-[#FFD700]"
                tabIndex={0}
              >
                {item.label}
              </a>
            ))}
            <Button onClick={handleLogin} text="Get Started" />
          </div>
        </AnimatedDiv>
      )}
    </div>
  );
};

export default Header;
