"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logoutStudent } from "@/services/studentService";
import { toast } from "react-toastify";

const Sidebar = (props) => {
  const sidebarFor = props.sidebarFor;

  // For Logout
  const dispatch = useDispatch();
  const router = useRouter();

  const { student } = useSelector((state) => state.student);

  const handleLogout = async () => {
    const response = await logoutStudent(student?.id);
    toast.success(response.data.msg, {
      position: "bottom-right",
      autoClose: 2000
    });
    dispatch({ type: "STUDENT_LOGOUT" });
  };

  return (
    <div className="w-64 h-screen fixed top-0 left-0 bg-gray-800 text-white p-6 flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Jobify Portal</h2>
        <Link
          href={`/${sidebarFor}/dashboard`}
          className="hover:bg-gray-700 p-2 rounded"
        >
          Dashboard
        </Link>
        <Link
          href={`/${sidebarFor}/internships`}
          className="hover:bg-gray-700 p-2 rounded"
        >
          Internships
        </Link>
        <Link
          href={`/${sidebarFor}/jobs`}
          className="hover:bg-gray-700 p-2 rounded"
        >
          Jobs
        </Link>
        <Link
          href={`/${sidebarFor}/resume`}
          className="hover:bg-gray-700 p-2 rounded"
        >
          Resume
        </Link>
        <Link
          href={`/${sidebarFor}/profile`}
          className="hover:bg-gray-700 p-2 rounded"
        >
          Profile
        </Link>
        <Link
          href={`/${sidebarFor}/settings`}
          className="hover:bg-gray-700 p-2 rounded"
        >
          Settings
        </Link>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <button
          onClick={handleLogout}
          className="bg-red-400/50 hover:bg-red-400 rounded w-full text-start p-2"
        >
          Logout
        </button>
        <h1 className="px-2 text-xl font-bold">
          {student?.firstname + " " + student?.lastname}
        </h1>
      </div>
    </div>
  );
};

export default Sidebar;
