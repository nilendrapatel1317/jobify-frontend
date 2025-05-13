"use client";
import React, { Suspense } from "react";
import ViewJob from "./ViewJob";

export const dynamic = "force-dynamic"; // Optional safeguard

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewJob />
    </Suspense>
  );
};

export default Page;
