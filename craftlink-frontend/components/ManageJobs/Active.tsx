"use client";
import { Applied } from "@/utils/job";
import Image from "next/image";
import AnimatedDiv from "@/components/AnimatedDiv";
import { formatDate } from "@/utils/formatDate";

const ActiveJob = ({ job }: { job: Applied }) => {
  return (
    <AnimatedDiv
      initialX="100%"
      animateX={0}
      exitX={"-100%"}
      duration={1.0}
      className="group hover:bg-[#F2E8CF0A] border border-[#FCFBF726] w-[92%] md:w-full rounded-xl flex flex-col p-4 gap-y-2"
    >
      <span className="italic font-merriweather text-fontPrimary text-xs md:text-sm ">
        Job posted: {formatDate(job.job?.createdAt)}
      </span>
      <h3 className="font-merriweather font-bold text-xl md:text-3xl text-fontPrimary group-hover:text-yellow">
        {job.job?.title}
      </h3>

      <div className="p-4 font-merriweather text-fontPrimary rounded-sm border border-[#FCFBF726] group-hover:bg-[#26220826] flex flex-col gap-y-4">
        <div className="flex justify-between pt-2 ">
          <div className="flex justify-between gap-x-8">
            <span className="flex gap-x-2 font-alata text-[#F9F1E2] text-xl md:text-2xl">
              {job.job?.client?.walletAddress.slice(0, 6)}...
              {job.job?.client?.walletAddress.slice(21)}
            </span>
            <span className="hidden md:flex rounded-full text-xs md:text-sm font-merriweather text-[#FCFBF7] border border-[#FCFBF726] text-center p-2 px-4">
              View Profile
            </span>
          </div>
          <div className="rounded-full bg-yellow h-[40px] w-[40px] flex justify-center items-center">
            <span className="relative h-[25px] w-[25px] self-center ">
=              <Image
                src="/messages.png"
                alt="Chats"
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </span>
          </div>
        </div>
        <div className="flex gap-x-2 flex-wrap">
          <span className="relative h-[20px] w-[20px] self-center ">
            {" "}
            <Image
              src="/calendar.png"
              alt="Calendar"
              fill
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </span>
          <p className="font-merriweather self-center text-sm md:text-base text-[#B5B4AD] pr-2 border-r border-[#FCFBF726]">
            Start Date: {job?.startDate}
          </p>
          <span className="relative h-[20px] w-[20px] self-center ">
            {" "}
            <Image
              src="/endDate.png"
              alt="End date"
              fill
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </span>
          <p className="font-merriweather text-sm md:text-base self-center text-[#B5B4AD]">
            End Date: {job?.endDate}
          </p>
          <span className="px-2 border-l border-[#FCFBF726] text-xs md:text-base flex items-center gap-x-2">
            <div className=" bg-[#FAB427] h-4 w-4   self-center rounded-full"></div>
            {job?.statusMsg}
          </span>
        </div>
        <div className="flex justify-between font-merriweather">
          <button className="hidden md:flex rounded-md bg-yellow uppercase py-2 px-4 text-sm md:text-base font-bold text-[#1A1203] ">
            MARK AS COMPLETE
          </button>
          <button className="flex md:hidden  rounded-md bg-yellow uppercase py-2 px-4 font-bold text-sm md:text-base text-[#1A1203] ">
            COMPLETE
          </button>

          <button className="hidden md:flex  w-fit py-2 px-4 uppercase  bg-[#262208] rounded-md text-[#FCF8E3] font-bold text-sm md:text-base">
            RAISE DISPUTE
          </button>
          <button className="flex md:hidden  w-fit py-2 px-4 uppercase  bg-[#262208] rounded-md text-[#FCF8E3] font-bold text-sm md:text-base">
            DISPUTE
          </button>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default ActiveJob;
