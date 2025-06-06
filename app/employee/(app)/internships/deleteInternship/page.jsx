"use client";
import React, { Suspense } from "react";
import DeleteInternship from "./DeleteInternship";

export const dynamic = "force-dynamic"; // Optional safeguard

const Page = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <DeleteInternship />
    </Suspense>
  );
};

export default Page;
