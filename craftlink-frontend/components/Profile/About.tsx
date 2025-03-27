import { AboutProps } from "@/utils/profile";
import Image from "next/image";
import { useRouter } from "next/navigation";

const About = ({ about }: { about: AboutProps }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push("/role/artisans/onboarding/bio");
  };
  return (
    <div className="flex font-merriweather text-[#F9F1E2] p-4 md:p-8 bg-[#F2E8CF0A] rounded-lg  gap-y-8 md:gap-y-4 flex-col">
      <div className="flex justify-between">
        <h3 className="text-2xl">About</h3>
        <div onClick={handleEdit} className="bg-[#262208] rounded-full flex items-center px-[10px] py-[6px] gap-x-2">
          Edit{" "}
          <span className="relative h-[28px] w-[28px] rounded-full bg-[#F2E8CF0A]">
            <Image
              src={"/edit.png"}
              alt="pen"
              fill
              className="object-contain p-2"
            />
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-between">
        <div className="flex max-sm:items-center flex-col gap-4">
          <div className="flex justify-end w-64">
            <button className="self-end border px-4 py-2 border-[#555139] font-bold text-[#E0D8A8] rounded">
              + Change Avatar
            </button>
          </div>
          <span className=" h-64 w-64 relative">
            {" "}
            <Image
              src={about.avatar}
              alt="avatar"
              fill
              className="object-contain rounded-xl"
            />
          </span>
          <div className="flex flex-col gap-y-2">
            <div className="font-alata text-lg md:text-[35px] text-[#FCF8F0] uppercase flex max-sm:gap-x-2">
              #{about.username}{" "}
              <span className="relative flex bottom-2 md:bottom-4 h-8 w-8 rounded-full bg-[#F2E8CF0A]">
                <Image
                  src={"/edit.png"}
                  alt="pen"
                  fill
                  className="object-contain p-2"
                />
              </span>
            </div>
            <span className="text-2xl font-bold text-[#FCF8F0] flex items-center gap-x-2">
              {about.jobTitle}{" "}
              <span className="flex text-[#F0FCF6] self-end text-xs md:text-sm px-2  py-[3px] bg-[#04DF7621] border rounded-full border-[#04DF76]">
                Verified
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-col px-2 md:px-8  items-center  text-start gap-y-4 lg:gap-y-8">
          <div className="flex">
            <h3 className=" font-alata w-full pr-4 text-2xl md:text-[35px] lg:text-[40px] md:leading-[35px] lg:leading-[47px] font-bold">
              {about.title}{" "}
            </h3>{" "}
            <span className="relative md:right-4 flex h-8 w-8 rounded-full bg-[#F2E8CF0A]">
              <Image
                src={"/edit.png"}
                alt="pen"
                fill
                className="object-contain p-2"
              />
            </span>
          </div>
          <p className="md:text-[20px] lg:columns-2 gap-8 lg:gap-16">
            {about.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
