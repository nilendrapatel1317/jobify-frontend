"use client";
import React, { Suspense } from "react";
import EditJob from "./EditJob";

export const dynamic = "force-dynamic"; // Optional safeguard

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditJob />
    </Suspense>
  );
};

export default Page;
