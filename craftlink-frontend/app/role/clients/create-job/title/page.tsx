"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import ProgressBar from "@/components/ProgressBar";
import { suggestedSkillsArray } from "@/utils/skills";
import Select from "@/components/Select";
import { LevelOfExperience, ArtisanLocation } from "@/utils/filters";
import { useGetJobData } from "@/utils/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Title() {
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  const { 
    setJobTitle, 
    setJobLocation, 
    setExperienceRequired,
    addSkill,
    removeSkill,
    jobTitle, 
    jobLocation, 
    experienceRequired, 
    requiredSkills 
  } = useGetJobData();

  const handleAddSkill = (skill: string) => {
    if (requiredSkills.length < 10 && !requiredSkills.includes(skill)) {
      addSkill(skill);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddFromInput = () => {
    if (
      inputValue.trim() &&
      requiredSkills.length < 10 &&
      !requiredSkills.includes(inputValue.trim())
    ) {
      addSkill(inputValue.trim());
    }
    setInputValue("");
  };

  const handleRemoveSkill = (skill: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeSkill(skill);
  };

  const filteredSuggestedSkills = suggestedSkillsArray.filter(
    (skill) => !requiredSkills.includes(skill)
  );

  const handleNext = () => {
    setIsUploading(true);

    if (jobTitle === "") {
      toast.error("Please enter a job title");
      setIsUploading(false);
      return;
    }
    if (experienceRequired === "") {
      toast.error("Please select your level of experience");
      setIsUploading(false);
      return;
    }
    if (jobLocation === "") {
      toast.error("Please select a location");
      setIsUploading(false);
      return;
    }

    if (requiredSkills.length === 0) {
      toast.error("Please add at least one required skill");
      setIsUploading(false);
      return;
    }
    console.log(jobTitle, jobLocation, experienceRequired, requiredSkills);
    router.push("/role/clients/create-job/details");
    setIsUploading(false);
  };

  const handlePrevious = () => {
    router.push("/role/clients/onboarding");
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center py-4">
      <div className="flex flex-col text-[#F9F1E2] w-[90vw] p-8 rounded-lg bg-opacity-80 shadow-lg md:w-[65%] lg:w-[45%] shadow-second relative 2xl:bottom-16 bg-[#F2E8CF0A] items-start md:min-h-[80%] gap-y-2 md:gap-y-4">
        <ProgressBar totalSteps={5} currentStep={1} />
        <h2 className="font-alata text-2xl md:text-3xl md:w-[80%]">
          Start with a Clear Job Title and Skills
        </h2>
        <p className="font-merriweather text-start self-start md:w-[70%]">
          Write a title that grabs attention and gives artisans a clear idea of your project. This is the first thing they will see.
        </p>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="w-full py-2 flex flex-col gap-y-2">
            <p className="font-bold">Title</p>
            <textarea
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="E.g Seeking a Fashion Designer for a New Clothing Line"
              className="h-24 focus:outline-[#262208] w-full font-merriweather bg-[#F2E8CF29] rounded-md placeholder:px-4 placeholder:py-2 text-[#FCFBF7] placeholder:italic px-4 py-2"
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="w-full">
              <Select
                onSelect={(value) => setExperienceRequired(value)}
                filters={LevelOfExperience}
                placeholder={"Select your level of experience"}
              />
            </div>
            <div className="w-full">
              <Select
                onSelect={(value) => setJobLocation(value)}
                filters={ArtisanLocation}
                placeholder={"Select location"}
              />
            </div>
          </div>
        </div>

        {/* Selected Skills */}
        <div className="w-[80%] md:w-[50%] self-start py-2">
          <label>
            <p className="font-bold py-2 flex flex-col gap-y-2">Required Skill</p>
            <div className="flex flex-wrap gap-2 py-2 self-start">
              {requiredSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={(e) => handleRemoveSkill(skill, e)}
                  className="flex items-center px-4 py-[3px] rounded-full bg-[#333333] text-white text-sm font-bold"
                >
                  {skill} <span className="ml-2 text-lg">×</span>
                </button>
              ))}
            </div>
            <div className="relative">
              <Input
                placeholder="Enter your skills"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFromInput();
                  }
                }}
              />
              <button
                className="absolute right-2 top-4 bg-yellow px-3 py-1 text-sm flex items-center font-bold text-black rounded"
                onClick={handleAddFromInput}
              >
                Add
              </button>
            </div>
            <p className="text-end text-[#D8D6CF]">Max 10 skills</p>
          </label>
        </div>

        {/* Suggested Skills */}
        <div>
          <h3 className="font-bold mb-2">Suggested Skills</h3>
          <div className="flex flex-wrap gap-2">
            {filteredSuggestedSkills.map((skill) => (
              <button
                key={skill}
                className="flex items-center px-4 py-[3px] rounded-full border border-[#B5B4AD] text-[#D8D6CF] text-sm font-bold hover:bg-[#333333]"
                onClick={() => handleAddSkill(skill)}
              >
                {skill} <span className="ml-2 text-lg text-[#D8D6CF]">+</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex font-merriweather w-full justify-between mt-8">
          <button 
            onClick={handlePrevious} 
            className="flex w-fit py-2 px-4 uppercase bg-[#262208] rounded-sm text-[#FCF8E3] font-bold text-sm md:text-base"
          >
            Back
          </button>
          <button 
            onClick={handleNext} 
            className="flex w-fit py-2 px-4 uppercase bg-yellow rounded-sm text-[#1A1203] font-bold text-sm md:text-base"
          >
            {isUploading ? "Uploading..." : "Next, Job Details"}
          </button>
        </div>
      </div>
    </div>
  );
}
