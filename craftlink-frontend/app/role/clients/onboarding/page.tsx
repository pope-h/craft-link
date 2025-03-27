"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { useGetClientData } from "@/utils/store";
import { useRouter } from "next/navigation";
import { uploadFiles } from "@/utils/upload";
import { toast } from "sonner";

// Types and constants
interface FileValidation {
  maxSizeInMB: number;
  allowedTypes: string[];
}

const FILE_VALIDATION: FileValidation = {
  maxSizeInMB: 15,
  allowedTypes: ['image/jpeg', 'image/png']
};

const validateFile = (file: File): string | null => {
  if (file.size > FILE_VALIDATION.maxSizeInMB * 1024 * 1024) {
    return `File size must be less than ${FILE_VALIDATION.maxSizeInMB}MB`;
  }
  
  if (!FILE_VALIDATION.allowedTypes.includes(file.type)) {
    return 'Only JPEG and PNG files are allowed';
  }
  
  return null;
};

export default function Onboarding() {
  // States
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Hooks
  const { clientBio, setClientBio, setClientAvatar } = useGetClientData();
  const router = useRouter();

  // Handlers
  const handleNext = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setIsUploading(true);
      const uploadedUrl = await uploadAvatar();
      
      if (uploadedUrl) {
        setClientAvatar(uploadedUrl[0]);
        router.push("/role/clients/create-job/title");
      }
    } catch (error) {
      console.error("Error during onboarding:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const validateForm = (): boolean => {
    if (!clientBio.trim()) {
      toast.error("Please provide a brief description of yourself");
      return false;
    }

    if (!imagePreview) {
      toast.error("Please upload an avatar");
      return false;
    }

    return true;
  };

  const uploadAvatar = async (): Promise<string[] | null> => {
    try {
      const response = await fetch(imagePreview!);
      const blob = await response.blob();
      const mimeType = blob.type;
      const fileExtension = mimeType.split("/")[1];

      const file = new File([blob], `avatar-${Date.now()}.${fileExtension}`, {
        type: mimeType,
      });

      return await uploadFiles([file]);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar. Please try again.");
      return null;
    }
  };

  const handleImageChange = useCallback((file: File) => {
    const error = validateFile(file);
    if (error) {
      setFileError(error);
      toast.error(error);
      return;
    }

    setFileError(null);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange(file);
    }
  }, [handleImageChange]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div className="flex min-h-screen md:min-h-[80vh] md:max-h-screen w-screen items-start md:items-center justify-center overflow-y-scroll">
      <div className="flex flex-col text-[#F9F1E2] max-w-[95%] md:min-w-[40%] p-8 rounded-lg bg-opacity-80 shadow-lg shadow-second relative bg-[#F2E8CF0A] items-start md:min-h-[80%] gap-y-4">
        <h2 className="font-alata text-2xl md:text-3xl">
          Help Artisans Get to Know You!
        </h2>
        
        <p className="font-merriweather md:w-[70%] text-balance">
          Complete your profile with a few details to help artisans feel confident in applying for your job.
        </p>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 w-full py-4">
          <div className="flex flex-col gap-y-2">
            <p className="font-bold">Tell Artisans About Yourself</p>
            <textarea
              value={clientBio}
              onChange={(e) => setClientBio(e.target.value)}
              placeholder="Write a brief summary about yourself..."
              className="h-44 focus:outline-[#262208] w-full font-merriweather bg-[#F2E8CF29] rounded-md placeholder:px-4 placeholder:py-2 text-[#FCFBF7] placeholder:italic px-4 py-2"
              maxLength={500}
            />
            <span className="text-xs text-[#D8D6CF]">
              {clientBio.length}/500 characters
            </span>
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="font-bold">Add a profile Avatar</p>
            {imagePreview ? (
              <div className="relative h-64 w-64">
                <Image
                  src={imagePreview}
                  alt="Profile Preview"
                  fill
                  className="rounded-lg object-cover"
                />
                <button
                  className="absolute top-2 right-2 bg-[#FCF8E3] text-[#262208] p-1 rounded-full hover:bg-[#262208] hover:text-[#FCF8E3] transition-colors"
                  onClick={() => {
                    setImagePreview(null);
                    setFileError(null);
                  }}
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-start">
                <div 
                  className={`flex justify-center w-[80%] h-64 border-2 border-dotted rounded-xl ${
                    isDragging ? 'border-yellow bg-[#F2E8CF40]' : 'border-[#FCFBF726]'
                  } gap-4 transition-colors`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <label className="flex flex-col gap-y-2 items-center justify-center font-merriweather cursor-pointer">
                    <input
                      type="file"
                      accept={FILE_VALIDATION.allowedTypes.join(',')}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageChange(file);
                      }}
                    />
                    <span className="relative p-2 border-[2.9px] border-[#FCFBF726] rounded-md h-24 w-24">
                      <Image
                        src="/user.png"
                        alt="Upload Avatar"
                        fill
                        className="p-2"
                        style={{ objectFit: "contain", objectPosition: "center" }}
                      />
                    </span>

                    <p className="text-[#D8D6CF]">
                      Drag and drop here or{" "}
                      <span className="text-yellow uppercase font-bold hover:underline">
                        UPLOAD
                      </span>
                    </p>
                  </label>
                </div>
                <p className="text-xs text-start self-start mt-2">
                  Accepted formats: JPEG, PNG. Max size: {FILE_VALIDATION.maxSizeInMB}MB.
                </p>
                {fileError && (
                  <p className="text-red-500 text-xs mt-1">{fileError}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex font-merriweather w-full">
          <button 
            onClick={handleNext}
            disabled={isUploading || !clientBio.trim() || !imagePreview}
            className="flex w-fit py-2 px-4 uppercase bg-yellow rounded-md text-[#1A1203] font-bold text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#262208] hover:text-yellow transition-colors"
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">↻</span> Uploading...
              </span>
            ) : (
              "Next, Job Title"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}