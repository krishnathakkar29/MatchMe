import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from "@/actions/likeAction";
import ListsTab from "./_components/lists-tab";

async function page({ searchParams }: { searchParams: { type: string } }) {
  const type = searchParams.type || "source";

  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(type);
  return (
    <div>
      <ListsTab likeIds={likeIds} members={members} />
    </div>
  );
}

export default page;
