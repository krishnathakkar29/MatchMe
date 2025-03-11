"use client";

import { updateMemberProfile } from "@/actions/userAction";
import { memberEditSchema, MemberEditSchema } from "@/lib/schemas/edit-member";
import { handleFormServerErrors } from "@/lib/util";
import { Button, Input, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditForm({ member }: { member: Member }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: MemberEditSchema) => {
    const nameUpdated = data.name !== member.name;

    const result = await updateMemberProfile(data, nameUpdated);

    if (result.status === "success") {
      toast.success("Profile updated");
      router.refresh();
      reset({ ...data });
    } else {
      if (result.error) {
        handleFormServerErrors({ error: result.error }, setError);
      }
    }
  };

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        description: member.description,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Input
        label="Name"
        variant="bordered"
        {...register("name")}
        defaultValue={member.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />

      <Textarea
        label="Description"
        variant="bordered"
        {...register("description")}
        defaultValue={member.description}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        minRows={6}
      />

      <div className="flex flex-row gap-3">
        <Input
          label="City"
          variant="bordered"
          {...register("city")}
          defaultValue={member.city}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          label="Country"
          variant="bordered"
          {...register("country")}
          defaultValue={member.country}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      {errors.root?.serverError && (
        <p className="text-danger text-sm">{errors.root.serverError.message}</p>
      )}

      <Button
        type="submit"
        className="flex self-end"
        variant="solid"
        isDisabled={!isValid || !isDirty}
        isLoading={isSubmitting}
        color="default"
      >
        Update profile
      </Button>
    </form>
  );
}

export default EditForm;
