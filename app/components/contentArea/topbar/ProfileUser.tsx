"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

const ProfileUser = () => {
  const { user } = useUser();

  const imgUrl = user?.imageUrl;

  const loadingImage = (
    <div className="w-9 h-9 rounded-full mb-1 bg-slate-200"></div>
  );

  const loadingUserName = <div className="bg-slate-100 h-4 w-[100px]"></div>;

  const loadingUserEmail = <div className="bg-slate-100 h-2 w-[130px]"></div>;

  return (
    <div className="flex gap-3 items-center">
      {!user ? (
        loadingImage
      ) : (
        <img
          src={imgUrl}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-9 h-9 mb-1 rounded-full"
        />
      )}
      <div
        className={`max-md:hidden flex flex-col text-sm ${
          !user ? "gap-2" : "gap-1"
        }`}
      >
        {!user ? (
          loadingUserName
        ) : (
          <span className="font-semibold">
            {user?.lastName} {user?.firstName}
          </span>
        )}
        {!user ? (
          loadingUserEmail
        ) : (
          <span className="text-slate-500 text-sm">
            {user?.emailAddresses[0].emailAddress}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileUser;
