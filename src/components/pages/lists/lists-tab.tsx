"use client";

import { Tab, Tabs } from "@heroui/react";
import { Member } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Key, useTransition } from "react";
import MemberCard from "@/components/pages/members/member-card";
import LoadingComponent from "./loading-comp";

function ListsTab({
  likeIds,
  members,
}: {
  likeIds: string[];
  members: Member[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const tabs = [
    {
      id: "source",
      label: "Members I have liked",
    },
    {
      id: "target",
      label: "Members that like me",
    },
    { id: "mutual", label: "Mutual likes" },
  ];

  function handleTabChange(key: Key) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  }
  const currentType = searchParams.get("type") || "source";

  return (
    <div className="flex w-full flex-col mt-10 gap-5">
      <Tabs
        aria-label="Like tabs"
        items={tabs}
        color="default"
        onSelectionChange={(key) => handleTabChange(key)}
        selectedKey={currentType}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {isPending ? (
              <LoadingComponent />
            ) : (
              <>
                {members.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                    {members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        likedIds={likeIds}
                      />
                    ))}
                  </div>
                ) : (
                  <div>No members for this filter</div>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export default ListsTab;
