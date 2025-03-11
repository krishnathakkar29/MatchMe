import { getAuthUserId } from "@/actions/authAction";
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from "@/actions/memberAction";
import MemberPhotoUpload from "@/components/pages/members/photos/member-photo-upload";
import MemberPhotos from "@/components/pages/members/photos/member-photos";
import { CardBody, CardHeader, Divider } from "@heroui/react";

async function page() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="text-2xl font-semibold text-default">Edit Profile</div>
      </CardHeader>
      <Divider />
      <CardBody>
      <MemberPhotoUpload />
        <MemberPhotos
          photos={photos}
          editing={true}
          mainImageUrl={member?.image!}
        />
      </CardBody>
    </>
  );
}

export default page;
