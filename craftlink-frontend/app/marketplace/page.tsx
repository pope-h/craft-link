"use client";
import { useState } from "react";
import Filter from "@/components/Marketplace/Filter";
import PostedJob from "@/components/Marketplace/Job";
import MarketHeader from "@/components/Marketplace/MarketHeader";
// import { jobs } from "@/utils/job";
import { filters } from "@/utils/filters";
import { usePathname } from "next/navigation";
import axios from "@/app/API/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { Job } from "@/utils/job";

export default function MarketPlace() {
  const [showFilter, setShowFilter] = useState(false);

  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const fetchGigs = async (): Promise<Job[]> => {
    const backendResponse = await axios.get("/api/gigs");

    return backendResponse.data?.gigs;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["gigs"],
    queryFn: fetchGigs,
  });

  return (
    <div className="w-screen">
      <MarketHeader toggleFilter={toggleFilter} isActive={isActive} />
      <div className="px-4 md:px-8 xl:px-16 py-8 gap-x-8 md:flex w-screen">
        {showFilter && (
          <div className="md:hidden  min-h-[60%]">
            <Filter filters={filters} />
          </div>
        )}
        <div className="hidden md:grid md:w-[25%] xl:w-[20%] min-h-[60%]">
          <Filter filters={filters} />
        </div>

        <div className={`flex flex-col  gap-y-0 w-[90vw] md:w-[75%] md:min-h-[80vh] ${isLoading ? "items-center justify-center" : ""} overflow-y-scroll`}>
          <Loading show={isLoading} size="lg" fullScreen={false}>
            {data?.map((job) => (
              <PostedJob job={job} key={job?.title} />
            ))}
          </Loading>
        </div>
      </div>
    </div>
  );
}
