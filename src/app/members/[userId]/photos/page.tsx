import { getMemberPhotosByUserId } from "@/actions/memberAction";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { Image } from "@heroui/react";

async function page({ params }: { params: Promise<{ userId: string }> }) {
  const userIdParams = (await params).userId;

  const photos = await getMemberPhotosByUserId(userIdParams);
  return (
    <>
      {/* <PhotoGallery photos={photos} /> */}
      <CardInnerWrapper
        header="Photos"
        body={
          <div className="grid grid-cols-5 gap-3">
            {photos &&
              photos.map((photo) => (
                <div key={photo.id}>
                  <Image
                    src={photo.url}
                    alt="Image of member"
                    className="object-cover aspect-square"
                  />
                </div>
              ))}
          </div>
        }
      />
    </>
  );
}

export default page;
