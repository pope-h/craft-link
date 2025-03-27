"use client";
import { Applied } from "@/utils/job";
import AnimatedDiv from "@/components/AnimatedDiv";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";

const Details = ({
  value,
  imageSrc,
}: {
  value: string | number;
  imageSrc: string;
}) => {
  return (
    <div
      className={`flex gap-x-2 px-2 ${
        imageSrc !== "/star.png" && "border-r border-[#FCFBF726]"
      }`}
    >
      <span className="relative h-[20px] w-[20px] self-center ">
        <Image
          src={imageSrc}
          alt={"icon"}
          fill
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </span>
      <span className="font-merriweather text-[#D8D6CF]">{value}</span>
    </div>
  );
};

const OpenJob = ({ job }: { job: Applied }) => {
  const applicants = job.job?.applicants;
  return (
    <AnimatedDiv
      initialX="100%"
      animateX={0}
      exitX={"-100%"}
      duration={1.0}
      className="group hover:bg-[#F2E8CF0A] border border-[#FCFBF726] w-[85vw] md:w-full  rounded-xl flex flex-col p-4 gap-y-2"
    >
      <span className="italic font-merriweather text-fontPrimary text-sm ">
        Job posted: {formatDate(job.job?.createdAt)}
      </span>
      <h3 className="font-merriweather font-bold text-xl md:text-3xl text-fontPrimary group-hover:text-yellow border-b border-[#FFFFFF40]">
        {job.job?.title}
      </h3>
      <div className="">
        {applicants ? (
          <div className="min-w-screen overflow-x-scroll flex gap-x-4 py-2">
            {" "}
            {applicants.map((applicant) => (
              <div
                key={applicant.walletAddress}
                className=" font-merriweather text-fontPrimary border border-[#FCFBF726] hover:bg-[#26220826] rounded-lg flex flex-col gap-y-4 p-4 min-w-[95%] lg:min-w-[60%] text-sm md:text-base"
              >
                <div className="flex justify-between pt-2 ">
                  <span className="flex gap-x-2 font-alata text-[#F9F1E2] text-xl md:text-2xl">
                    {job.job?.client?.walletAddress.slice(0, 6)}...
                    {job.job?.client?.walletAddress.slice(21)}
                  </span>
                  <span className="rounded-full text-xs md:text-sm font-merriweather text-[#FCFBF7] border border-[#FCFBF726] text-center p-2 md:px-4">
                    View Profile
                  </span>
                </div>
                <div className="flex gap-x-2 flex-wrap">
                  <Details
                    imageSrc={"/location.png"}
                    value={applicant.location}
                  />
                  <Details
                    imageSrc={"/language.png"}
                    value={applicant.language}
                  />
                  <Details
                    imageSrc={"/expertise.png"}
                    value={applicant.expertise}
                  />
                  <Details imageSrc={"/star.png"} value={applicant.rating} />
                </div>
                <div className="flex justify-between font-merriweather">
                  <button className="hidden xl:flex rounded-md bg-yellow uppercase py-2 px-4 text-sm md:text-base font-bold text-[#1A1203] ">
                    HIRE ARTISAN
                  </button>
                  <button className="flex xl:hidden  rounded-md bg-yellow uppercase py-2 px-4 text-sm md:text-base font-bold text-[#1A1203] ">
                    HIRE
                  </button>

                  <button className="hidden xl:flex  w-fit py-2 px-4 text-sm md:text-base uppercase  bg-[#262208] rounded-md text-[#FCF8E3] font-bold flex gap-x-2">
                    <span className="relative h-[25px] w-[25px] self-center ">
                      <Image
                        src="/message-white.png"
                        alt="Chats"
                        fill
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                    </span>{" "}
                    START CHAT
                  </button>
                  <button className="flex xl:hidden  w-fit py-2 px-4 text-sm md:text-base uppercase  bg-[#262208] rounded-md text-[#FCF8E3] font-bold gap-x-2">
                    <span className="relative h-[25px] w-[25px] self-center ">
                      <Image
                        src="/message-white.png"
                        alt="Chats"
                        fill
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                    </span>
                    {""}CHAT
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#333333] rounded-xl p-8 grid gap-y-2 xl:w-[60%] shadow-md shadow-[#33333340]">
            <div className="py-2 border-b border-[#FCFBF726]">
              <h1 className="border-b-2 border-yellow py-2 text-[#FCFBF7] w-fit font-bold">
                No Applications Yet
              </h1>
            </div>
            <span>
              No artisan has applied for this job yet. Closing the job will
              remove it from the marketplace, and artisans will no longer see
              it.
            </span>
            <span className="py-2">Do you want to close this job?</span>
            <div className="flex justify-between">
              <button className="bg-[#262208] hidden md:flex rounded-md text-[#FCF8E3] py-2 px-4">
                KEEP JOB OPEN
              </button>
              <button className="bg-yellow rounded-md font-bold text-[#1A1203] py-2 px-4">
                YES, CLOSE JOB
              </button>
            </div>
          </div>
        )}
      </div>
    </AnimatedDiv>
  );
};

export default OpenJob;
