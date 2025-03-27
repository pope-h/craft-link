import { ArtisanProfileProps, AboutProps, DetailsProps, PortfolioProps, WorkHistory } from '@/utils/profile';

export const transformProfileData = (
  fetchedData: {
    category: string | undefined;
    skills: string[] | undefined;
    experienceLevel: string | undefined;
    preferredLanguage: string | undefined;
    yearsOfExperience: number | undefined;
    tagline: string | undefined;
    bio: string | undefined;
    rate: number | undefined;
    availability: boolean | undefined;
    avatar: string | undefined;
    whProjectTitle: string[] | undefined;
    whDescription: string[] | undefined;
    whDuration: string[] | undefined;
    whMediaUrls: string[] | undefined;
  },
  detail: {
    username: string;
    location: string;
  } | null,
  address: string
): ArtisanProfileProps => {
  // Transform About section
  const about: AboutProps = {
    avatar: fetchedData.avatar || "/avatar.png",
    title: fetchedData.tagline || "No tagline provided",
    desc: fetchedData.bio || "No bio provided",
    username: detail?.username || "Anonymous",
    jobTitle: fetchedData.category || "Unspecified Role",
  };

  // Transform Details section
  const details: DetailsProps = {
    language: fetchedData.preferredLanguage || "Not specified",
    location: detail?.location || "Not specified",
    experience: `${fetchedData.experienceLevel || "Not specified"}/${fetchedData.yearsOfExperience || "0"} years`,
    availability: fetchedData.availability || "Not specified",
    pricing: fetchedData.rate || 0,
    walletAddress: address,
    amountEarned: undefined,
    rating: undefined,
  };

  // Transform Portfolio section
  const portfolio: PortfolioProps[] = fetchedData.whProjectTitle?.map((title, index) => ({
    id: index + 1,
    imgSrc: (fetchedData.whMediaUrls && fetchedData.whMediaUrls[index]) || "/elegant-dress.png",
    title: title,
    desc: (fetchedData.whDescription && fetchedData.whDescription[index]) || "",
    duration: (fetchedData.whDuration && fetchedData.whDuration[index]) || "",
  })) || [];

  // Transform Work History
  const works: WorkHistory[] = fetchedData.whProjectTitle?.map((title, index) => ({
    title: title,
    detail: (fetchedData.whDescription && fetchedData.whDescription[index]) || "",
    start: (fetchedData.whDuration && fetchedData.whDuration[index]?.split("-")[0]) || "",
    end: (fetchedData.whDuration && fetchedData.whDuration[index]?.split("-")[1]) || "",
  })) || [];

  return {
    about,
    skills: fetchedData.skills || [],
    details,
    portfolio,
    works,
    reviews: [], // Initialize empty as it seems reviews data isn't available in the fetch
  };
};