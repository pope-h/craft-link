"use client";
import MarketHeader from "@/components/Marketplace/MarketHeader";
import {useFilterState } from "@/context/filter";
import { links } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { filterState, setFilterState } = useFilterState();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: links.opened, label: "Open" },
    { href: links.client_active, label: "Active" },
    { href: links.client_completed, label: "Completed" },
    { href: links.client_disputed, label: "Disputed" },
    { href: links.client_closed, label: "Closed" },
  ];

  const toggleFilter = () => {
    setFilterState(!filterState);
  };

  return (
    <div className="flex flex-col bg-[url('/bg.png')] min-h-screen bg-opacity-[25%]">
      <div className="flex flex-col bg-[#333333] bg-opacity-[95%] min-h-screen ">
        <div className="min-h-screen">
          <div className="flex gap-y-4 flex-col w-screen h-full pb-8">
            <MarketHeader isActive={isActive} toggleFilter={toggleFilter} />
            <div
              className="w-[90%] self-center "
            >
              <h2 className="text-[#FCFBF7] md:text-2xl font-bold ">
                <span className="border-b-2 border-yellow"> MANAGE </span>JOBS
              </h2>
              <span className="md:w-[20%] font-merriweather text-[#F9F1E2]">
                Track applications, submit completed work, and resolve disputes
                in one place.
              </span>
            </div>
            <div
              className="w-[90%] self-center bg-[#F2E8CF0A] h-[70%] rounded-lg"
            >
              <div className="border-b-[0.5px] px-4 border-[#FCFBF726] flex justify-between text-lg text-[#B5B4AD] py-[16px] max-sm:gap-x-8 max-sm:overflow-x-scroll md:w-full shadow-md self-center">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <p
                      className={`${
                        isActive(item.href)
                          ? "bg-[#262208] rounded-md px-16"
                          : "hover:text-yellow px-8"
                      } py-2`}
                    >
                      {item.label} <span className="max-sm:hidden">Jobs</span>
                    </p>
                  </Link>
                ))}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
