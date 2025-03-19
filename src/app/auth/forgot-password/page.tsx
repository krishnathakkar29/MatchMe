"use client";
import { cn } from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@heroui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";

function page() {
  const [result, setResult] = useState<any>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    });
    setResult(res);
    reset();
  };

  return (
    <div className="flex items-center justify-center vertical-center">
      <Card className="w-2/5 mx-auto p-5">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-default">
            <div className="flex flex-row items-center gap-3">
              <GiPadlock size={30} />
              <h1 className="text-3xl font-semibold">Forgot password</h1>
            </div>
            <p className="text-neutral-500">
              "Enter account email to reset your password
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <Input
              type="email"
              placeholder="Email address"
              variant="bordered"
              defaultValue=""
              {...register("email", {
                required: true,
              })}
            />
            <Button
              type="submit"
              color="default"
              isLoading={isSubmitting}
              isDisabled={!isValid}
            >
              Send reset email
            </Button>
          </form>
        </CardBody>
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
