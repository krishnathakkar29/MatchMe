"use client";

import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Member } from "@prisma/client";

export default function ProfileCard({ member }: { member: Member }) {
  return (
    // <Card>
    <>
      <CardHeader className="text-2xl font-semibold text-default">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </>
    // </Card>
  );
}
