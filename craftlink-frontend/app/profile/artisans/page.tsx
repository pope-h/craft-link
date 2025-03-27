"use client";
import ProfileHeader from "@/components/Profile/Header";
import Footer from "@/components/LandingPage/Footer";
import About from "@/components/Profile/About";
import Portfolio from "@/components/Profile/Portfolio";
import Details from "@/components/Profile/Details";
import Skills from "@/components/Profile/Skills";
import Status from "@/components/Profile/Status";
import Review from "@/components/Profile/Review";
import Settings from "@/components/Profile/Settings";
import { usePathname, useRouter } from "next/navigation";
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
import { useEffect, useState } from "react";

export default function Profile() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

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
    whMediaUrls,
  } = useGetArtisanData();
  const router = useRouter();

  const { fetchFromIPFS } = IPFS();
  const { address } = useAccount();
  const provider = useEthersProvider();
  const [detail, setDetail] = useState<{
    username: string;
    location: string;
  } | null>(null);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [, setUserRole] = useState("");

  const handleNext = () => {
    router.push("/marketplace");
  };

  // Fetch user details from IPFS
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!address || isLoading) return;
      startLoading();

      try {
        console.log("Fetching user details");
        const contract = provider ? getRegistryContract(provider) : null;
        if (!contract) {
          toast.error("Provider not initialized");
          return;
        }

        console.log("Checking user role");
        const isClient = contract ? await contract.isClient(address) : false;

        if (isClient) {
          console.log("User is a client", isClient);
          setUserRole("client");
          const detail = contract
            ? await contract.getClientDetails(address)
            : null;

          if (detail?.ipfsHash) {
            try {
              const fetchedDetail = await fetchFromIPFS(detail.ipfsHash);
              setDetail(JSON.parse(fetchedDetail));
            } catch (error) {
              toast.error("Error fetching from IPFS");
              console.error(error);
            }
          }
        } else {
          console.log("User is an artisan", !isClient);
          setUserRole("artisan");
          const detail = contract
            ? await contract.getArtisanDetails(address)
            : null;

          if (detail?.ipfsHash) {
            try {
              const fetchedDetail = await fetchFromIPFS(detail.ipfsHash);
              setDetail(JSON.parse(fetchedDetail));
            } catch (ipfsError) {
              toast.error("Error fetching from IPFS");
              console.error(ipfsError);
            }
          }
        }
      } catch (error) {
        toast.error("Error fetching user details");
        console.error(error);
      } finally {
        stopLoading();
      }
    };

    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Transform and set profile data when all required data is available
  useEffect(() => {
    console.log("Transforming profile data");
    console.log("Address: ", address);
    console.log("Detail: ", detail);
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
        whMediaUrls,
      };

      console.log("Fetched data", fetchedData);
      const transformedProfile = transformProfileData(
        fetchedData,
        detail,
        address
      );
      setProfile(transformedProfile);
      console.log("Profile data transformed", transformedProfile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail, address]);

  if (isLoading || !profile) {
    return <Loading show={false} />;
  }

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
          onClick={handleNext}
          title={"You’re All Set!"}
          shortDesc={"Your profile is ready to go, and clients are waiting!"}
          desc={
            "Now that your profile is complete, it’s time to get noticed. Start exploring new opportunities today!"
          }
          button={"START BROWSING JOBS"}
          imageSrc={"/profile-ready.png"}
        />
        <About about={profile.about} />
        <div className="grid md:grid-cols-5 gap-4 w-full h-full">
          <div className="md:col-span-2">
            <Details details={profile.details} />
          </div>
          <div className="md:col-span-3">
            <Skills skills={profile.skills} />
          </div>
        </div>
        <Portfolio portfolio={profile.portfolio} />
        {profile.reviews && <Review reviews={profile.reviews} />}
        <Settings />
        <Footer />
      </div>
    </div>
  );
}
