import Image from "next/image";
import { useRouter } from "next/navigation";

const Skills = ({skills}: {skills: string[]}) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push("/role/artisans/onboarding/skills");
  }
    return <div className="flex h-full font-merriweather text-[#F9F1E2] p-4 md:p-8 bg-[#F2E8CF0A] rounded-lg gap-y-8  flex-col">
          <div className="flex justify-between">
            <h3 className="text-2xl">Skills</h3>
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
          <div className=" bg-[#F2E8CF0A] w-full h-fit border-[0.5px] p-4 rounded-md border-[#FCFBF726]  shadow-md shadow-[#00000040] gap-2">
            <div className="flex flex-wrap py-2 px-4 gap-x-2 gap-y-4">
            {skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center px-4 py-[4px] rounded-full border border-[#FFFFFF40] text-[#D8D6CF] text-sm font-bold  bg-[#26220826]"
              >
                {skill}
              </span>
            ))}
            </div>
          </div>
        
    </div>
}

export default Skills