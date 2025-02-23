import { getMemberPhotosByUserId } from "@/actions/memberAction";
import PhotoGallery from "../_components/photo-gallery";

async function page({ params }: { params: Promise<{ userId: string }> }) {
  const userIdParams = (await params).userId;

  const photos = await getMemberPhotosByUserId(userIdParams);
  return (
    <>
      <PhotoGallery photos={photos} />
    </>
  );
}

export default page;
