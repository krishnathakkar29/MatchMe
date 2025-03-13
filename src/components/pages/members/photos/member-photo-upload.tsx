"use client";

import { addImage } from "@/actions/userAction";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useRouter } from "next/navigation";
import { HiPhoto } from "react-icons/hi2";
import { toast } from "react-toastify";

function MemberPhotoUpload() {
  const router = useRouter();

  const onUploadImage = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info == "object") {
      await addImage(result.info.public_id, result.info.secure_url);
      router.refresh();
    } else {
      toast.error("Problem adding image");
    }
  };

  return (
    <div>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={onUploadImage}
        signatureEndpoint="/api/sign-image"
        uploadPreset="truematch-demo"
        className={`flex items-center gap-2 border-2 border-default text-default 
        rounded-lg py-2 px-4 hover:bg-default/10`}
      >
        <HiPhoto size={28} />
        Upload new image
      </CldUploadButton>
    </div>
  );
}
export default MemberPhotoUpload;
