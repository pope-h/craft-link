"use client";
import ProfileHeader from "@/components/Profile/Header";
import Footer from "@/components/LandingPage/Footer";
import Status from "@/components/Profile/Status";
import Settings from "@/components/Profile/Settings";
import { usePathname } from "next/navigation";
import ClientDetails from "@/components/Profile/ClientDetails";
import { Abdul, jobs, fashion } from "@/utils/job";
import OngoingProjects from "@/components/Profile/OngoingProject";
import CompletedProjects from "@/components/Profile/CompletedProject";

export default function Profile() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <div className="fixed z-50 backdrop-blur-3xl bg-opacity-100 h-[75px] ">
        <ProfileHeader isActive={isActive} />
      </div>
      <div className="pt-24 px-4  flex flex-col gap-y-4 md:gap-y-8 md:px-16 2xl:px-32">
        <div className="w-fit  pt-8">
          <h1 className="font-bold text-xl ">PROFILE</h1>
          <p className="border-b-2 border-yellow w-[80%]"></p>
        </div>{" "}
        <Status
          title={"You’re All Set!"}
          shortDesc={
            "Your profile is ready, and artisans are waiting to bring your ideas to life!"
          }
          desc={
            "Now that your profile is complete, start posting projects and connecting with top artisans today."
          }
          button={"POST JOB"}
          clientButton={"Edit Profile"}
          imageSrc={"/profile-ready.png"}
        />
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-full">
          <div className="">
            <ClientDetails client={Abdul} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <OngoingProjects project={fashion} />
          </div>
        </div>
        <CompletedProjects projects={jobs} />
        <Settings />
        <Footer />
      </div>
    </div>
  );
}
