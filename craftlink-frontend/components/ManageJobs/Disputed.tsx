import { Applied } from "@/utils/job";
import NoJob from "./NoJob";
import Image from "next/image";

const DisputedJob = ({ job }: { job: Applied }) => {
  return (
    <div>
      {job ? (
        <div className="font-merriweather text-[#F9F1E2] flex flex-col px-4 md:px-8 xl:px-16 py-8 gap-x-8 gap-y-2">
          <h2 className="font-bold text-lg ">Resolve Outstanding Disputes</h2>
          <h4 className="text-sm  text-[#F9F1E2]">
            View and manage jobs currently under dispute. Respond to claims,
            upload evidence, or track resolution updates.
          </h4>
          <div className="p-4 md:p-8 bg-[#F2E8CF0A] rounded-lg flex flex-col gap-y-4">
            <h2 className="w-full border-b border-[#FCFBF726] font-bold text-xl py-2  ">
              Dispute Details
            </h2>
            <div className="px-4 font-merriweather text-fontPrimary  flex flex-col gap-y-4 w-full">
              <div>
                <span className="text-[#B5B4AD] text-sm">Job Title</span>
                <p>{job?.job?.title}</p>
              </div>
              <div>
                <span className="text-[#B5B4AD] text-sm">
                  Dispute raised by: {"Artisan"}
                </span>
                <div className="flex justify-start gap-x-2">
                  <span className="flex gap-x-2 font-alata text-[#F9F1E2] text-2xl">
                    {job.job?.client?.walletAddress.slice(0, 6)}...
                    {job.job?.client?.walletAddress.slice(21)}
                  </span>
                  <span className="hidden md:flex rounded-full text-sm font-merriweather text-[#FCFBF7] border border-[#FCFBF726] text-center p-2 px-4">
                    View Profile
                  </span>
                </div>
              </div>
              <div className="grid md:flex gap-y-4 md:gap-y-0 max-sm:text-center">
                <div className="flex md:grid md:border-r md:border-[#FCFBF726] md:px-8 gap-2 items-center">
                  <span className="text-sm text-[#B5B4AD]">Dispute Type:</span>
                  <span className="">{job?.disputeType}</span>
                </div>
                <div className="flex md:grid md:border-r md:border-[#FCFBF726] md:px-8 gap-2 items-center">
                  <span className="text-sm text-[#B5B4AD]">Budget:</span>
                  <div className="flex gap-x-2">
                    {" "}
                    <span className="relative hidden md:flex h-[20px] w-[20px] self-center">
                      <Image
                        src="/money.png"
                        alt="Amount spent"
                        fill
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                    </span>
                    <p className="font-merriweather self-center font-bold ">
                      ${job?.job?.price} spent
                    </p>
                  </div>
                </div>
                <div className="flex md:grid md:px-8 gap-2 max-sm:text-start items-center">
                  <span className="text-sm  text-[#B5B4AD]">
                    {" "}
                    Resolution Status:
                  </span>
                  <span>{job?.statusMsg}</span>
                </div>
              </div>
              <div className="flex max-md:flex-col justify-between w-full gap-4">
                <div className="flex flex-col gap-y-2 lg:w-[35%]">
                  <h4 className="text-[#B5B4AD] text-sm">Dispute Summary</h4>
                  <p className="text-xs md:text-sm italic text-[#D8D6CF]">
                    The artisan has raised a dispute regarding the payment for
                    the completed job. The dispute is based on the following
                    issue:
                  </p>
                  <div className="flex gap-x-2 py-2">
                    <span className="font-bold">Issue:</span>
                    <p>{job?.issue}</p>
                  </div>
                </div>
                <div className="flex flex-col md:self-end  ">
                  <h4 className="text-[#B5B4AD] text-sm text-start">
                    Evidence Submitted
                  </h4>
                  <div className="flex flex-wrap min-w-[25vw] gap-x-2 h-[15vh] py-2">
                    {job?.job?.files.map((file) => (
                      <div key={file} className="relative h-[80%] w-[20%]">
                        <Image
                          src={file}
                          alt="Attached file"
                          fill
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                        />
                      </div>
                    ))}
                    {job?.job?.images.map((file) => (
                      <div key={file} className="relative h-[80%] w-[20%]">
                        <Image
                          src={file}
                          alt="Attached file"
                          fill
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="font-bold italic">
                Client is yet to confirm that the job has been completed to
                release the payment to the artisan.
              </p>
              <div>
              <button className="rounded-md bg-yellow uppercase py-2 px-4 font-bold text-[#1A1203] ">
                Add Evidence
              </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoJob
          title={"You have no disputed jobs currently."}
          desc={
            "All your jobs are going smoothly! If an issue arises, it will appear here for resolution."
          }
          imageSrc={"/disputed.png"}
          jobType={"disputed"}
        />
      )}
    </div>
  );
};

export default DisputedJob;
