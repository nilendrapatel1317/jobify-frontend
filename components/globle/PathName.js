"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

const PathName = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Remove leading/trailing slashes and split path
  const segments = pathname.replace(/^\/|\/$/g, "").split("/");

  const handleClick = (index) => {
    // Recreate the path up to the clicked segment
    const newPath = "/" + segments.slice(0, index + 1).join("/");
    router.push(newPath); // Navigate to the new path
  };

  return (
    <div className="text-gray-500 text-xs sm:text-sm font-medium mb-10 sm:mb-5 mt-3 sm:mt-0 ps-12 sm:ps-0">
      {segments.map((segment, index) => {
        // Skip dynamic values like IDs or codes
        if (/^[A-Z0-9@]+$/.test(segment)) return null;

        const formatted = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <span key={index}>
            <span
              onClick={() => handleClick(index)}
              className="cursor-pointer hover:underline hover:text-blue-600"
            >
              {formatted}
            </span>
            {index < segments.length - 1 && " > "}
          </span>
        );
      })}
    </div>
  );
};

export default PathName;
