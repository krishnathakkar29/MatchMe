"use client";

import { Photo } from "@prisma/client";
import React, { useState } from "react";
import {
  AiFillDelete,
  AiFillStar,
  AiOutlineDelete,
  AiOutlineStar,
} from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";
import { CldImage } from "next-cloudinary";
import { Image } from "@heroui/react";
import { useRouter } from "next/navigation";
import { deleteImage, setMainImage } from "@/actions/userAction";

function MemberPhotos({
  photos,
  editing,
  mainImageUrl,
}: {
  photos: Photo[] | null;
  editing?: boolean;
  mainImageUrl?: string | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState({
    type: "",
    isLoading: false,
    id: "",
  });

  const onSetMain = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({
      isLoading: true,
      id: photo.id,
      type: "main",
    });
    await setMainImage(photo);
    router.refresh();
    setLoading({
      isLoading: false,
      id: "",
      type: "",
    });
  };

  const onDelete = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({
      isLoading: true,
      id: photo.id,
      type: "delete",
    });
    await deleteImage(photo);
    router.refresh();
    setLoading({
      isLoading: false,
      id: "",
      type: "",
    });
  };

  return (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos &&
        photos.map((photo) => (
          <div key={photo.id} className="relative">
            <MemberImage photo={photo} />
            {editing && (
              <div className="absolute top-1 z-50 w-full flex justify-between">
                <div onClick={() => onSetMain(photo)}>
                  <StarButton
                    selected={photo.url === mainImageUrl}
                    loading={
                      loading.isLoading &&
                      loading.type === "main" &&
                      loading.id === photo.id
                    }
                  />
                </div>
                <div onClick={() => onDelete(photo)}>
                  <DeleteButton
                    loading={
                      loading.isLoading &&
                      loading.type === "delete" &&
                      loading.id === photo.id
                    }
                  />
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export function MemberImage({ photo }: { photo: Photo | null }) {
  return (
    <>
      <div>
        {photo?.publicId ? (
          <CldImage
            alt="Image of member"
            src={photo.publicId}
            width={300}
            height={300}
            crop="fill"
            gravity="faces"
            className="rounded-2xl"
            priority
          />
        ) : (
          <Image src={photo?.url || "/images/user.png"} alt="Image of user" />
        )}
      </div>
    </>
  );
}

export function StarButton({
  selected,
  loading,
}: {
  selected: boolean;
  loading?: boolean;
}) {
  return (
    <div className="relative hover:opacity-80 transition cursor-pointer">
      {!loading ? (
        <>
          <AiOutlineStar
            size={32}
            className="fill-white absolute -top-[2px] -right-[2px]"
          />
          <AiFillStar
            size={28}
            className={selected ? "fill-yellow-200" : "fill-neutral-500/70"}
          />
        </>
      ) : (
        <PiSpinnerGap size={32} className="fill-white animate-spin" />
      )}
    </div>
  );
}

export function DeleteButton({ loading }: { loading?: boolean }) {
  return (
    <div className="relative hover:opacity-80 transition cursor-pointer">
      {!loading ? (
        <>
          <AiFillDelete size={28} className="fill-red-600" />
        </>
      ) : (
        <PiSpinnerGap size={32} className="fill-white animate-spin" />
      )}
    </div>
  );
}

export default MemberPhotos;
