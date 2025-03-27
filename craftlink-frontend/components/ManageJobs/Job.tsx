"use client";
import Filter from "@/components/Marketplace/Filter";
import { useFilterState } from "@/context/filter";
import { Applied } from "@/utils/job";
import { FilterProps } from "@/utils/filters";
import NoJob from "./NoJob";

interface ManageJobProps {
  jobs: Applied[];
  title: string;
  desc: string;
  imageSrc: string;
  filters: FilterProps[];
  JobStatus: React.ComponentType<{ job: Applied; key: string }>;
  jobType: string;
  pageDetails?: string;
}

const ManageJobs = ({
  jobs,
  title,
  desc,
  imageSrc,
  filters,
  JobStatus,
  jobType,
  pageDetails,
}: Readonly<ManageJobProps>) => {
  const { filterState } = useFilterState();

  return (
    <div className="grid h-full w-full">
      {jobs.length > 1 ? (
        <div className="w-full px-4 md:px-8 xl:px-16 py-8">
          <p className=" text-[#F9F1E2] py-4 w-[90%]">
            {pageDetails}
          </p>
          <div className=" gap-x-8 md:flex w-full">
            {filterState && (
              <div className="md:hidden  min-h-[60%]">
                <Filter filters={filters} />
              </div>
            )}
            <div className="hidden md:grid md:w-[25%] xl:w-[20%] min-h-[60%]">
              <Filter filters={filters} />
            </div>
            <div className="grid gap-y-4 w-[90vw] md:w-[75%] h-full overflow-y-scroll">
              {jobs.map((job) => (
                <JobStatus job={job} key={job?.job?.title} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NoJob
          title={title}
          desc={desc}
          imageSrc={imageSrc}
          jobType={jobType}
        />
      )}
    </div>
  );
};

export default ManageJobs;
