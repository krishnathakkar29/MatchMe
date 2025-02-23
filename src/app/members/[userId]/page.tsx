import { getMemberByUserId } from "@/actions/memberAction";
import { notFound } from "next/navigation";
import ProfileCard from "./_components/profile-card";

async function page({ params }: { params: Promise<{ userId: string }> }) {
  const userIdParams = (await params).userId;

  const member = await getMemberByUserId(userIdParams);

  if (!member) {
    return notFound();
  }
  return (
    <>
      <ProfileCard member={member} />
    </>
  );
}

export default page;
