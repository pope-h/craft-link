import { PortfolioProps } from "@/utils/profile";
import Image from "next/image";

const Portfolio = ({ portfolio }: { portfolio: PortfolioProps[] }) => {
  return (
    <div className="flex font-merriweather text-[#F9F1E2] p-4 md:p-8 bg-[#F2E8CF0A] rounded-lg h-full gap-y-8 max-w-full  flex-col">
      <div className="flex justify-between">
        <h3 className="text-2xl">Portfolio</h3>
        <div className=" flex items-center gap-x-4">
          <span className="relative h-[32px] w-[32px] rounded-full bg-[#262208]">
            <Image
              src={"/link.png"}
              alt="pen"
              fill
              className="object-contain p-2"
            />
          </span>
          <div className="hidden bg-[#262208] rounded-full md:flex items-center px-[10px] py-[6px] gap-x-2">
            Add Portfolio{" "}
            <span className="bg-[#F2E8CF0A]  rounded-full w-[18px] h-[18px] text-lg flex justify-center items-center">
              +
            </span>{" "}
          </div>
          <span className="bg-[#262208]  rounded-full h-[32px] w-[32px] text-xl flex text-[#FCFBF7] md:hidden justify-center items-center">
              +
            </span>{" "}
        </div>
      </div>
      <div className="min-w-screen flex overflow-x-scroll gap-x-4">
        {portfolio.map((project) => (
          <div
            key={project.id}
            className="bg-[#F2E8CF0A] rounded-lg h-[45vh] min-w-[90%] md:min-w-[35%] md:max-w-[50%] lg:min-w-[20%] 2xl:max-w-[25%] flex flex-col items-start px-4 py-2 md:p-2 gap-y-4"
          >
            <span className="relative h-[20vh] md:h-[70%] w-full">
              <Image
                src={project.imgSrc}
                alt="Project image"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </span>
            <h3 className="font-bold text-lg md:text-2xl px-2 text-[#F9F1E2]">
              {project.title}
            </h3>
            <p className="text-[#B5B4AD] px-2">{project.desc}</p>
            <div className="flex justify-between w-full  ">
              <div>
                Duration: <span className="font-bold">{project.duration} week(s)</span>
              </div>
              <div className="flex gap-x-2">
                <span className="relative h-[32px] w-[32px] rounded-full bg-[#F2E8CF0A]">
                  <Image
                    src={"/trash.png"}
                    alt="pen"
                    fill
                    className="object-contain p-2"
                  />
                </span>
                <span className="relative h-[32px] w-[32px] rounded-full bg-[#F2E8CF0A]">
                  <Image
                    src={"/edit-2.png"}
                    alt="pen"
                    fill
                    className="object-contain p-2"
                  />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
