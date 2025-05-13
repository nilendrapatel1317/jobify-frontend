"use client";
import React, { Suspense } from "react";
import DeleteInternshipContent from "./DeleteInternshipContent";

export const dynamic = "force-dynamic"; // Optional safeguard

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeleteInternshipContent />
    </Suspense>
  );
};

export default Page;
