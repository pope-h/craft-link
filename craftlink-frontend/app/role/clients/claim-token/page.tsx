"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import { toast } from "sonner";
import { getTokenContract } from "@/constants/contracts";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useLoading } from "@/hooks/useLoading";

export default function ClaimToken() {
  const signer = useEthersSigner();
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleClaim = async () => {
    if (!signer) {
      toast.warning("Wallet not connected");
      router.push("/");
      return;
    }

    startLoading();
    try {
      const contract = getTokenContract(signer);
      const gasEstimate = await contract.claim.estimateGas();

      const tx = await contract.claim({
        gasLimit: gasEstimate,
      });
      toast.message("Please wait while we process your transaction.");
      await tx.wait();
      toast.success("Token claimed");

      router.push("/role/clients/welcome");
    } catch (error) {
      console.error(error); 
    } finally {
      stopLoading();
    }
  };
  return (
    <Loading show={isLoading}>
      <div className="flex h-[80vh] items-center justify-center">
        <div className="rounded-lg  border border-[#FCFBF726] md:border-0 shadow-lg h-[60vh] bg-[#F2E8CF0A] flex flex-col items-center justify-center w-[90%] md:w-[45vw] ">
          <p className="font-alata text-3xl md:text-[3vw] text-center text-[#F9F1E2] leading-8 md:leading-[3vw]">
            Claim USDT Token!
          </p>
          <span className="text-center text-[#D8D6CF] lg:w-[70%] text-balance md:p-8 p-4 font-merriweather">
            Use this token to test secure payments and experience seamless
            transactions.
            (0xeF840E811b86A753291990B2A6DD219e407d231D)
          </span>
          <div className="relative h-[40%] w-[50%] p-4">
            <Image
              src="/claim-token.png"
              alt="token"
              fill
              style={{ objectFit: "contain" }}
              className=""
            />
          </div>
          <div className="relative top-4">
            {" "}
            <Button onClick={handleClaim} text={"Claim Token"} />
          </div>
        </div>
      </div>
    </Loading>
  );
}
