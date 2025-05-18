"use client";
import React from "react";
import { usePathname } from "next/navigation";

const PathName = () => {
  const pathname = usePathname(); // e.g. "/employee/profile/edit/EMP@101"
  
  // Remove leading slash and split the path
  const segments = pathname.replace(/^\/|\/$/g, "").split("/");

  // Capitalize and format segments
  const breadcrumb = segments.map((segment, index) => {
    // Skip dynamic values like IDs or codes
    if (/^[A-Z0-9@]+$/.test(segment)) return null;

    // Capitalize first letter
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }).filter(Boolean); // remove nulls

  return (
    <div className="text-gray-500 font-medium mb-5 ps-12 sm:ps-0">
      {breadcrumb.join(" > ")}
    </div>
  );
};

export default PathName;
