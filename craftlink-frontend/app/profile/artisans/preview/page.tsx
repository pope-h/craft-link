"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/LandingPage/Footer";
import About from "@/components/Profile/About";
import Portfolio from "@/components/Profile/Portfolio";
import PreviewDetails from "@/components/Profile/PreviewDetails";
import Skills from "@/components/Profile/Skills";
import Status from "@/components/Profile/Status";
import { useGetArtisanData } from "@/utils/store";
import { transformProfileData } from "@/utils/transformProfileData";
import { ArtisanProfileProps } from "@/utils/profile";
import { useAccount } from "wagmi";
import Loading from "@/components/Loading";
import { useLoading } from "@/hooks/useLoading";
import IPFS from "@/hooks/useIPFS";
import { useEthersProvider } from "@/hooks/useEthersProvider";
import { getRegistryContract } from "@/constants/contracts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from '@/app/API/axios';
import handleApiError, { ArtisanResponse } from "@/app/API/handleApiError";

export default function ProfilePreview() {
  const [profile, setProfile] = useState<ArtisanProfileProps | null>(null);
  const { 
    category,
    skills,
    experienceLevel,
    preferredLanguage,
    yearsOfExperience,
    tagline,
    bio,
    rate,
    availability,
    avatar,
    whProjectTitle,
    whDescription,
    whDuration,
    whMediaUrls 
  } = useGetArtisanData();
  const router = useRouter();
  
  const { fetchFromIPFS } = IPFS();
  const { address } = useAccount();
  const provider = useEthersProvider({ chainId: 656476 });
  const [detail, setDetail] = useState<{
    username: string;
    location: string;
  } | null>(null);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const handleNext = async () => {
    if (!profile || !address) {
      toast.error("Profile data is incomplete");
      return;
    }

    startLoading();
    try {
      const portfolio = profile.portfolio.map(item => ({
        projectTitle: item.title,
        projectDuration: { "weeks": item.duration },
        description: item.desc,
        files: [{
          "type": "IMAGE",
          "url": item.imgSrc
        }],
      }));

      const artisanProfileData = {
        walletAddress: address,
        artisanCategory: category,
        skills: skills,
        experienceLevel: experienceLevel,
        yearsOfPractice: yearsOfExperience,
        bio: bio,
        preferredLanguages: [preferredLanguage],
        serviceTagline: tagline,
        portfolio: portfolio,
        minimumProjectAmount: rate,
        availableForProjects: availability,
        avatar: avatar
      };

      const backendResponse = await axios.post("/api/artisans", artisanProfileData);
      const data = await handleApiError<ArtisanResponse>(backendResponse);
      console.log("Processed data:", data);

      toast.success("Profile posted successfully");
      router.push("/profile/artisans");
    } catch (error) {
      toast.error("Error posting profile");
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  // Fetch user details from IPFS
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!address || isLoading) return;
      startLoading();

      try {
        const contract = provider ? getRegistryContract(provider) : null;
        if (!contract) {
          toast.error("Provider not initialized");
          return;
        }

        const isArtisan = contract ? await contract.isArtisan(address) : false;

        if (!isArtisan) {
          toast.error("User is not an artisan");
          return;
        }

        const ipfsDetail = contract ? await contract.getArtisanDetails(address) : null;

        if (ipfsDetail && ipfsDetail.ipfsHash) {
          try {
            const fetchedDetail = await fetchFromIPFS(ipfsDetail.ipfsHash);
            setDetail(JSON.parse(fetchedDetail));
          } catch (ipfsError) {
            toast.error("Error fetching from IPFS");
            console.error(ipfsError);
          }
        }
      } catch (error) {
        toast.error("Error fetching user details");
        console.error(error);
      } finally {
        stopLoading();
        setIsInitialLoading(false);
      }
    };

    fetchUserDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Transform and set profile data when all required data is available
  useEffect(() => {
    if (address && detail) {
      const fetchedData = {
        category,
        skills,
        experienceLevel,
        preferredLanguage,
        yearsOfExperience,
        tagline,
        bio,
        rate,
        availability,
        avatar,
        whProjectTitle: [whProjectTitle],
        whDescription: [whDescription],
        whDuration: [whDuration],
        whMediaUrls
      };

      const transformedProfile = transformProfileData(fetchedData, detail, address);
      setProfile(transformedProfile);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, detail]);

  if (isInitialLoading || isLoading || !profile) {
    return <Loading show={true} />;
  }

  return (
    <div>
      <div className="fixed z-50 backdrop-blur-3xl bg-opacity-100 h-[75px] ">
        <Header />
      </div>
      <div className="pt-24 px-4 flex flex-col gap-y-4 md:gap-y-8 md:px-16 2xl:px-32">
        <div className="w-fit pt-8">
          <h1 className="font-bold text-xl ">PREVIEW PROFILE</h1>
          <p className="border-b-2 border-yellow w-[60%]"></p>
        </div>
        <Status
          onClick={handleNext}
          title={"Look at You, Ready to Shine!"}
          desc={
            "Here's how your craft comes to life for clients. Need a final touch? Go ahead and perfect it!"
          }
          button={"Go live now"}
          imageSrc={"/preview.png"}
        />
        <About about={profile.about} />
        <div className="grid md:grid-cols-4 gap-4 w-full h-full">
          <div>
            <PreviewDetails details={profile.details} />
          </div>
          <div className="md:col-span-3">
            <Skills skills={profile.skills} />
          </div>
        </div>
        <Portfolio portfolio={profile.portfolio} />
        <button onClick={handleNext} className="flex self-end items-center w-fit py-2 px-4 uppercase bg-yellow rounded-md text-[#1A1203] font-bold text-sm md:text-base">
          GO LIVE NOW
        </button>
        <Footer />
      </div>
    </div>
  );
}