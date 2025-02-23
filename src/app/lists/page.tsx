import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from "@/actions/likeAction";
import ListsTab from "./_components/lists-tab";

async function page({ searchParams }: { searchParams: { type: string } }) {
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(searchParams.type);
  return (
    <div>
      <ListsTab likeIds={likeIds} members={members} />
    </div>
  );
}

export default page;
