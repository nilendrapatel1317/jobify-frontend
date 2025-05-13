"use client";
import React, { Suspense } from "react";
import DeleteJob from "./DeleteJob";

export const dynamic = "force-dynamic"; // Optional safeguard

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeleteJob />
    </Suspense>
  );
};

export default Page;
