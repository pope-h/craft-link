"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import IPFS from "@/hooks/useIPFS";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import { useLoading } from "@/hooks/useLoading";
import { FaCheck } from "react-icons/fa";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const { uploadToIPFS } = IPFS();
  const [privacyChecked, setPrivacyChecked] = useState<boolean>(false);

  const createAccount = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!username || !location) {
      toast.error("Please fill in all fields");
      return;
    }

    startLoading();
    try {
      const data = {
        username,
        location,
      };
      const url = await uploadToIPFS(JSON.stringify(data));
      console.log("IPFS Url: ", url);

      toast.success("Account created");
      router.push("/role");
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  return (
    <Loading show={isLoading}>
      <div className="flex h-[80vh] w-screen  items-center md:items-end justify-center py-4">
        <div className="flex flex-col  max-sm:w-[90vw] max-sm:py-4 rounded-lg bg-opacity-80  shadow-lg shadow-second  relative md:bottom-24  bg-[#F2E8CF0A] items-center md:min-h-[60%] ">
          <div className="flex flex-col text-center gap-y-4 md:px-8 items-center justify-center">
            <p className="font-alata text-fontPrimary pt-2 md:pt-8 text-xl md:text-[2vw]">
              Create Your Craftlink Account
            </p>
            <p className="text-fontSec px-2 text-balance font-merriweather italic">
              Join Craftlink to showcase your skills or find talented artisans
              for your project
            </p>
          </div>
          <form className="w-full md:w-[70%] p-4 sm:p-8 gap-2 md:gap-x-8 md:gap-y-2 ">
            <div className="flex flex-col py-2">
              <label className="">
                Username
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  type="text"
                />
              </label>
            </div>

            <div className="flex flex-col py-2">
              <label className="">
                Location
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="State, Country"
                  type="text"
                />
              </label>
            </div>
            <div className="flex py-4">
              <div className=" flex gap-x-2 items-center">
                <div className="relative h-[20px] w-[20px]">
                  <input
                    type="checkbox"
                    checked={privacyChecked}
                    onChange={() => setPrivacyChecked(!privacyChecked)}
                    className=" appearance-none h-[20px] w-[20px] border-2 rounded-md p-2 checked:border-0 checked:bg-yellow border-[#9A9992]"
                  />
                  {privacyChecked && (
                    <FaCheck
                      size={12}
                      color={"#111A00"}
                      className="absolute top-[5px] left-[5px]"
                      onClick={() => setPrivacyChecked(!privacyChecked)}
                    />
                  )}
                </div>
                <p className="font-merriweather md:py-2 self-end font-bold">
                  By Continuing, you agree to CraftLink’s{" "}
                  <span className="text-yellow">Privacy Policy and Terms</span>{" "}
                  and <span className="text-yellow">Conditions</span>
                </p>
              </div>
            </div>

            <div className="justify-self-center py-2 md:px-12 gap-y-2 grid font-merriweather md:col-span-2">
              <Button onClick={createAccount} text={"Create Account"} />
            </div>
          </form>
        </div>
      </div>
    </Loading>
  );
}
