"use client";
import { Applied } from "@/utils/job";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "../Modal";
import JobDetails from "../Marketplace/JobDetails";
import AnimatedDiv from "@/components/AnimatedDiv";
import { formatDate } from "@/utils/formatDate";

const AppliedJob = ({ job }: { job: Applied }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <AnimatedDiv
      initialX="100%"
      animateX={0}
      exitX={"-100%"}
      duration={1.0}
      className="group hover:bg-[#F2E8CF0A] border border-[#FCFBF726] w-[92%] md:w-full rounded-xl flex flex-col p-4 gap-y-2"
      onClick={() => {
        setIsModalOpen(true);
      }}
    >
      <span className="italic font-merriweather text-fontPrimary text-xs md:text-sm ">
        Job posted: {formatDate(job.job?.createdAt)}
      </span>
      <h3 className="font-bold text-xl md:text-3xl text-fontPrimary group-hover:text-yellow">
        {job.job?.title}
      </h3>
     
      <div className="py-2 px-4 font-merriweather text-fontPrimary rounded-sm border border-[#FCFBF726] group-hover:bg-[#26220826] flex flex-col gap-y-2 md:gap-y-4">
        <div className="flex justify-between pt-2 2xl:w-[30%]">
      <span className="flex gap-x-2 font-alata text-[#F9F1E2] text-xl md:text-2xl">
        {job.job?.client?.walletAddress.slice(0, 6)}...{job.job?.client?.walletAddress.slice(21)}
      </span>
      <span className="rounded-full text-xs md:text-sm font-merriweather text-[#FCFBF7] border border-[#FCFBF726] text-center p-2 md:px-4">View Profile</span>
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
        <p className="font-merriweather self-center   text-sm md:text-base text-[#B5B4AD]">
          Start Date: {job?.startDate}
        </p>
        <span className="px-2 border-l border-[#FCFBF726] text-xs max-sm:py-2 md:text-base flex items-center gap-x-2">
          <div className={`${ job.status === "review" ? " bg-[#FAB427]" : "bg-[#04DF76]"} h-4 w-4 self-center rounded-full`}></div>
          {job?.statusMsg}
        </span>

        
        </div>
        <button
          className="hidden md:flex  w-fit py-2 px-4 uppercase  bg-[#262208] rounded-md text-sm md:text-base text-[#FCF8E3] font-bold"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
        View Job Details
        </button>
      </div>

      {isModalOpen && (
        <Modal closeFn={() => setIsModalOpen(false)}>
          <AnimatedDiv
            initialX="200%"
            animateX={0}
            exitX={"-100%"}
            duration={0.5}
            className="bg-[#333333] border border-[#FCFBF726] md:w-[60vw] h-[90vh] rounded-xl p-4 relative  "
          >
            <div className="h-[90%] overflow-y-scroll">
              <JobDetails job={job.job} />
            </div>
          </AnimatedDiv>
        </Modal>
      )}
    </AnimatedDiv>
  );
};

export default AppliedJob;
