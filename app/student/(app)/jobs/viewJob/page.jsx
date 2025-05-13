"use client";
import React, { Suspense } from "react";
import ViewJobByStudent from "./ViewJobByStudent";

export const dynamic = "force-dynamic"; // Optional safeguard

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewJobByStudent />
    </Suspense>
  );
};

export default Page;
