"use client";
import React, { Suspense } from "react";
import ViewInternshipByStudent from "./ViewInternshipByStudent";

export const dynamic = "force-dynamic"; // Optional safeguard

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewInternshipByStudent />
    </Suspense>
  );
};

export default Page;
