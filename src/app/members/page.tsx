import { getMemberList } from "@/actions/memberAction";
import MemberCard from "./_components/member-card";
import { fetchCurrentUserLikeIds } from "@/actions/likeAction";

async function page() {
  const members = await getMemberList();

  const likedIds = await fetchCurrentUserLikeIds();
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
      {members &&
        members.map((member) => (
          <MemberCard key={member.id} member={member} likedIds={likedIds} />
        ))}
    </div>
  );
}

export default page;
