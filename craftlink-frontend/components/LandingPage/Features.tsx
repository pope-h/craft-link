import { features } from "@/utils/features"
import Image from "next/image";

const Features = () => {

return <div className="grid lg:flex grid-cols-2 lg:flex-row items-center justify-center lg:h-[50vh] md:h-[80vh] p-4 md:px-[10vw] gap-4 font-merriweather">
    {features.map((feature) => (
        <div key={feature.title} className="flex flex-col md:gap-4 gap-y-2 rounded-lg shadow-md bg-[#F2E8CF0A] border-[#FFFFFF40] border-[0.5px] backdrop-blur-[120px] px-4 md:px-8 py-4 lg:w-[25%] w-[45vw] md:w-[38vw] lg:h-[90%] lg:min-h-fit h-[100%]">
            <div className="bg-[#AEFF0005] rounded-full border-1 shadow-lg md:w-24 w-16 h-16 md:h-24 flex items-center justify-center mb-2 md:mb-1 ">
           <Image src={feature.icon} alt={feature.title} width="56" height="56" className="self-center rounded-md "/> </div>
           <p className="font-alata lg:text-[4vh] leading-5 lg:leading-[3.5vh]  md:text-[30px] md:leading-[36px]">{feature.title}</p>
           <p className="text-sm leading-4 lg:text-[2.6vh] md:text-[20px] md:leading-6 lg:leading-[2.6vh] text-[#D8D6CF]">{feature.details}</p>
    </div>
    ))}
</div>
}
export default Features
