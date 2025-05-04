import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="p-5">
      <h1 className="text-4xl my-5">Student Management</h1>
      <div className="flex flex-col gap-3">
        <Link href={"/student/auth/login"} className="bg-blue-500 text-white py-2 px-3 w-fit">Student Login</Link>
        <Link href={"/student/auth/register"} className="bg-blue-500 text-white py-2 px-3 w-fit">Student Register</Link>
      </div>
    </div>
  );
};

export default page;
