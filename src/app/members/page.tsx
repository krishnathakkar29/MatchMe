import { fetchCurrentUserLikeIds } from "@/actions/likeAction";
import { getMemberList } from "@/actions/memberAction";
import MemberCard from "../../components/pages/members/member-card";
import { Card, CardBody, CardHeader } from "@heroui/react";

async function page({}) {
  const { items: members } = await getMemberList();
  const likedIds = await fetchCurrentUserLikeIds();

  if (members.length === 0) return <EmptyState />;
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
      {members &&
        members.map((member) => (
          <MemberCard key={member.id} member={member} likedIds={likedIds} />
        ))}
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="flex justify-center items-center mt-20">
      <Card className="p-5">
        <CardHeader className="text-3xl text-default">
          There are no results for this filter
        </CardHeader>
        <CardBody className="text-center">
          Please select a different filter
        </CardBody>
      </Card>
    </div>
  );
}

export default page;
