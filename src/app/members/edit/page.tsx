import { getAuthUserId } from "@/actions/authAction";
import { getMemberByUserId } from "@/actions/memberAction";
import EditForm from "@/components/pages/members/edit/edit-form";
import { CardBody, CardHeader, Divider } from "@heroui/react";
import { notFound } from "next/navigation";

export default async function MemberEditPage() {
  const userId = await getAuthUserId();

  const member = await getMemberByUserId(userId);

  if (!member) return notFound();
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-default">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member} />
      </CardBody>
    </>
  );
}
