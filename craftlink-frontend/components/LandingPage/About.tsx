import Image from "next/image";

const About = () => {
  return (
    <div className="grid lg:flex p-8 gap-4 justify-center lg:h-[70vh] lg:min-h-fit font-merriweather">
      <div className="h-[40vh] w-[90vw] md:h-[50vh] lg:h-full md:w-[90%] md:justify-self-center  lg:w-[45%] relative ">
        <Image
          src="/about.png"
          alt="An artisan"
          className="rounded-xl"
          fill
          style={{ objectFit: 'cover' }}

        />
      </div>
      <div
        className="bg-about border-2  md:border-1 border-[#FCFBF726] flex flex-col justify-between lg:w-[45%] lg:min-h-fit md:w-[90%] px-8 md:py-4 md:justify-self-center rounded-xl backdrop-blur-[100px] z-10"
      >
        <p className="py-8 uppercase text-[#FCFBF7]">About</p>
        <div className="flex flex-col text-balance md:gap-y-4">
          <p className="font-alata text-[#F9F1E2] text-lg font-bold  md:text-[3vw] md:leading-[3vw] py-2">Crafted for Artisans, Trusted by Clients.</p>
          <div className="grid text-lg md:flex md:text-[25px] lg:text-[2.3vh] 2xl:text-[3vh] md:leading-7 lg:leading-[2.3vh] 2xl:leading-[3vh] py-2  md:gap-4 md:py-4 ">
            <span>We understand that making the leap to digital can feel daunting. That’s why we built our platform with simplicity and safety at its core. Integrating user-friendly design with blockchain technology </span>
            <span>that ensures artisans can  confidently showcase their work, maintain ownership, and attract clients who value authenticity and craftsmanship. Your craft deserves to be seen. with us, you are accessible. </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
