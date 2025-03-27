import Image from "next/image";

interface NoJobProps {
  title: string;
  desc: string;
  imageSrc: string;
  jobType: string;
}

const NoJob = ({ title, desc, imageSrc, jobType }: NoJobProps) => {
  return (
    <div className="grid font-merriweather text-[#F9F1E2] text-center py-8  lg:py-16 gap-y-8 justify-self-center w-[80%] md:w-[70%] lg:w-[40%] items-center">
      <span>
        <p className="font-bold text-2xl">{title}</p>
        <p>{desc}</p>
      </span>
      <div className="place-self-center relative h-[50vh] border-b-[1px] border-yellow w-[70%]">
        <Image
          src={imageSrc}
          alt="No job"
          fill
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      </div>

      {jobType !== "disputed" && (
        <button className="bg-yellow justify-self-center md:w-[40%] rounded-md text-[#1A1203] px-4 py-2 font-bold font-merriweather">
          Browse Jobs
        </button>
      )}
    </div>
  );
};

export default NoJob;
