"use client";
import React, { Suspense } from "react";
import EditInternship from "./EditInternship";

export const dynamic = "force-dynamic"; // Optional safeguard

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditInternship />
    </Suspense>
  );
};

export default Page;
