import { getAuthUserId } from "@/actions/authAction";
import { getMemberByUserId } from "@/actions/memberAction";
import { Card } from "@heroui/react";
import { notFound } from "next/navigation";
import React from "react";
import MemberSidebar from "../../../components/pages/members/member-sidebar";

async function layout({ children }: { children: React.ReactNode }) {
  const userId = await getAuthUserId();

  if (!userId) {
    return notFound();
  }

  const member = await getMemberByUserId(userId);

  const basePath = `/members/edit`;

  const navLinks = [
    { name: "Edit Profile", href: `${basePath}` },
    {
      name: "Update Photos",
      href: `${basePath}/photos`,
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member!} navLinks={navLinks} />
      </div>
      <div className="col-span-9">
        <Card className="w-full mt-10 h-[80vh]">{children}</Card>
      </div>
    </div>
  );
}

export default layout;
