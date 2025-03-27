"use client";
import { Applied } from "@/utils/job";
import Image from "next/image";
import AnimatedDiv from "@/components/AnimatedDiv";
import React, { useState } from "react";
import Feedback from "./Feedback";
import Modal from "../Modal";
import { formatDate } from "@/utils/formatDate";

const CompletedJob = ({ job }: { job: Applied }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <h3 className="font-bold text-xl md:text-3xl text-fontPrimary group-hover:text-yellow">
        {job.job?.title}
      </h3>

      <div className="p-4 font-merriweather text-fontPrimary rounded-sm border border-[#FCFBF726] group-hover:bg-[#26220826] flex flex-col gap-y-4">
        <div className="flex justify-between pt-2 ">
          <div className="flex justify-between gap-x-8">
            <span className="flex gap-x-2 font-alata text-[#F9F1E2] text-xl md:text-2xl">
              {job.job?.client?.walletAddress.slice(0, 6)}...
              {job.job?.client?.walletAddress.slice(21)}
            </span>
          </div>
        </div>
        <div className="flex gap-x-2 flex-wrap text-sm md:text-base">
          <span className="px-2 border-r border-[#FCFBF726] flex items-center gap-x-2">
            <div className=" bg-[#04DF76] h-4 w-4 self-center rounded-full"></div>
            Completed
          </span>
          <span className="relative h-[20px] w-[20px] self-center ">
            {" "}
            <Image
              src="/money.png"
              alt="Amount spent"
              fill
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </span>
          <p className="font-merriweather self-center text-[#B5B4AD] border-r border-[#FCFBF726] pr-2 ">
            ${job?.job?.price}
          </p>
          <span className="relative h-[20px] w-[20px] self-center ">
            {" "}
            <Image
              src="/calendar.png"
              alt="Calendar"
              fill
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </span>
          <p className="font-merriweather self-center text-[#B5B4AD] pr-2">
            {job?.startDate} - {job?.endDate}
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          <h3 className="text-[#B5B4AD]">Feedback</h3>
          <p>
            <span className="text-[#F9F1E2] font-bold">Client:</span>{" "}
            {job?.feedback}
          </p>
          <div className="px-8 flex gap-x-2">
            {" "}
            <span className="relative h-[20px] w-[20px] ">
              <Image
                src="/star.png"
                alt="star"
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </span>
            <p>({job?.rating}/5)</p>
          </div>
        </div>
        <div className="flex justify-between font-merriweather">
          <button
            className="hidden md:flex rounded-md bg-yellow uppercase py-2 px-4 font-bold text-[#1A1203] "
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            GIVE FEEDBACK
          </button>
          <button
            className="flex md:hidden  rounded-md bg-yellow uppercase py-2 px-4 font-bold text-[#1A1203] "
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            FEEDBACK
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal closeFn={() => setIsModalOpen(false)}>
          <AnimatedDiv
            initialX="200%"
            animateX={0}
            exitX={"-100%"}
            duration={0.5}
            className="bg-[#333333] border border-[#FCFBF726] md:w-[50vw] rounded-xl p-4  relative  "
          >
            <Feedback />
          </AnimatedDiv>
        </Modal>
      )}
    </AnimatedDiv>
  );
};

export default CompletedJob;
