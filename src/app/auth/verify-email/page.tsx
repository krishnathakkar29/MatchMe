import { verifyEmail } from "@/actions/authAction";
import { cn } from "@/lib/utils";
import { Card, CardFooter, CardHeader } from "@heroui/react";
import React from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

async function page({
  searchParams,
}: {
  searchParams: {
    token: string;
  };
}) {
  const result = await verifyEmail(searchParams.token);
  return (
    <div className="flex items-center justify-center vertical-center">
      <Card className="w-2/5 mx-auto p-5">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-default">
            <div className="flex flex-row items-center gap-3">
              <MdOutlineMailOutline size={30} />
              <h1 className="text-3xl font-semibold">
                Verify your email address
              </h1>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col justify-center">
          {result && (
            <div
              className={cn(
                "p-3 rounded-xl w-full flex items-center justify-center gap-x-2 text-sm",
                {
                  "text-danger-800 bg-danger-50": result.status === "error",
                  "text-success-800 bg-success-50": result.status === "success",
                }
              )}
            >
              {result.status === "success" ? (
                <FaCheckCircle size={20} />
              ) : (
                <FaExclamationTriangle size={20} />
              )}
              <p>
                {result.status === "success"
                  ? result.data
                  : (result.error as string)}
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default page;
