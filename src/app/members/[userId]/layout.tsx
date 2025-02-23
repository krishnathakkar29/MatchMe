import { getMemberByUserId } from "@/actions/memberAction";
import { notFound } from "next/navigation";
import React from "react";
import MemberSidebar from "../_components/member-sidebar";
import { Card } from "@heroui/react";

async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) {
  const userIdParams = (await params).userId;
  const member = await getMemberByUserId(userIdParams);
  if (!member) return notFound();
  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member} />
      </div>
      <div className="col-span-9">
        <Card className="w-full mt-10 h-[80vh]">{children}</Card>
      </div>
    </div>
  );
}

export default layout;
