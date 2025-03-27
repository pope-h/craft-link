import { DetailsProps } from "@/utils/profile";
import Image from "next/image";
import { LiaToggleOnSolid } from "react-icons/lia";

const PreviewDetails = ({ details }: { details: DetailsProps }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col border border-[#FCFBF726] gap-y-4 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
        <div className="flex justify-between items-start justify-start">
          <h3 className="text-lg">Wallet</h3>

          <span className="relative h-[33px] w-[33px] ">
            <Image
              src={"/edit.png"}
              alt="pen"
              fill
              className="object-contain p-2"
            />
          </span>
        </div>
        <div className="flex text-sm justify-between">
          <p className="text-sm text-[#D8D6CF]">
            {details.walletAddress.slice(0, 6)}...
            {details.walletAddress.slice(21)}
          </p>
          <div className="flex gap-x-2 items-center text-[#E0D8A8]">
            <span className="relative border border-[#F9F1E240]  rounded-full h-[24px] w-[24px] ">
              <Image
                src={"/save.png"}
                alt="save"
                fill
                className="object-contain p-[6px]"
              />
            </span>{" "}
            <p className="text-lg ">Copy</p>
          </div>
        </div>
        <div className="flex  items-start justify-start gap-x-2">
          <Image src={"/money.png"} alt={"money"} width="22" height="22" />
          <span className="text-[#D8D6CF]">${details.amountEarned} Earned</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
          <div className="flex justify-between items-start justify-start">
            <h3 className="text-lg">Location</h3>
          </div>
          <div className="flex  items-start justify-start gap-x-2">
            <Image
              src={"/location.png"}
              alt={"location"}
              width="22"
              height="22"
            />
            <span className="text-[#D8D6CF]">{details.location}</span>
          </div>
        </div>
        <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
          <div className="flex justify-between items-start justify-start">
            <h3 className="text-lg">Language</h3>
            <div className="flex ">
              <span className="relative h-[33px] w-[33px] ">
                <Image
                  src={"/add-square.png"}
                  alt="add"
                  fill
                  className="object-contain p-2"
                />
              </span>
              <span className="relative h-[33px] w-[33px] ">
                <Image
                  src={"/edit.png"}
                  alt="pen"
                  fill
                  className="object-contain p-2"
                />
              </span>
            </div>
          </div>
          <div className="flex  items-start justify-start gap-x-2">
            <Image
              src={"/language.png"}
              alt={"language"}
              width="18"
              height="18"
            />
            <span className="text-[#D8D6CF]">{details.language}</span>
          </div>
        </div>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-2">

        <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
          <div className="flex justify-between items-start justify-start">
            <h3 className="text-lg">Experience</h3>

            <span className="relative h-[33px] w-[33px] ">
              <Image
                src={"/edit.png"}
                alt="pen"
                fill
                className="object-contain p-2"
              />
            </span>
          </div>
          <div className="flex  items-start justify-start gap-x-2">
            <Image
              src={"/expertise.png"}
              alt={"expertise"}
              width="22"
              height="22"
            />
            <span className="text-[#D8D6CF]">{details.experience}</span>
          </div>
        </div>
        <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
          <div className="flex justify-between items-start justify-start">
            <h3 className="text-lg">Availability</h3>
            <LiaToggleOnSolid size={22} color={"#FFD700"} />
          </div>
          <div className="flex  items-start justify-start gap-x-2">
            <Image
              src={"/calendar.png"}
              alt={"calendar"}
              width="22"
              height="22"
            />
            <span className="text-[#D8D6CF]">{details.availability ? "Available to work" : "Not available for work"}</span>
          </div>
        </div>
      </div>
      {details.rating && (
        <div className="flex flex-col border border-[#FCFBF726] gap-y-4 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
          <h3 className="text-lg">Rating</h3>

          <div className="flex flex-col gap-y-2">
            <div className="flex  text-sm items-center justify-start gap-x-2">
              <Image src={"/star.png"} alt={"star"} width="22" height="22" />
              <span className="flex self-end italic font-bold text-[#F9F1E2]">{details.rating}/5</span>
            </div>
            <span className="text-[#D8D6CF]">
              Encourage your clients to leave feedback after completing a
              project to improve your rating!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewDetails;
