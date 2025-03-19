"use client";

import CardInnerWrapper from "@/providers/card-inner-wrapper";
import { Button, Card, CardFooter, CardHeader } from "@heroui/react";
import { useRouter } from "next/navigation";
import { IconBase } from "react-icons/lib";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center vertical-center">
      <Card className="w-2/5 mx-auto p-5">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-default">
            <div className="flex flex-row items-center gap-3">
              <IconBase size={30} />
              <h1 className="text-3xl font-semibold">
                You have successfully registered
              </h1>
            </div>

            <p className="text-neutral-500">
              You can go to login page to log into your account
            </p>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col justify-center">
          <Button
            onClick={() => {
              router.push("/auth/login");
            }}
            fullWidth
            color="default"
            variant="bordered"
          >
            Go to login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
