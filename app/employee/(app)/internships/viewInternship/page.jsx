"use client";
import React, { Suspense } from "react";
import ViewInternship from "./ViewInternship";

export const dynamic = "force-dynamic"; // Optional safeguard

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewInternship />
    </Suspense>
  );
};

export default Page;
