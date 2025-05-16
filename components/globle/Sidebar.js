"use client";
import { useEffect, useState } from "react";
import { logoutEmployee } from "@/services/employeeService";
import { logoutStudent } from "@/services/studentService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// ✅ Import Lucide icons
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  FileText,
  User,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

const Sidebar = (props) => {
  const sidebarFor = props.sidebarFor;
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { employee } = useSelector((state) => state.employee);
  const { student } = useSelector((state) => state.student);

  const [hydrated, setHydrated] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setHydrated(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    if (sidebarFor === "employee") {
      const response = await logoutEmployee(employee?.id);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      dispatch({ type: "EMPLOYEE_LOGOUT" });
      router.push("/login");
    } else {
      const response = await logoutStudent(student?.id);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      dispatch({ type: "STUDENT_LOGOUT" });
      router.push("/login");
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMobileMenu} 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div className={`
        w-64 h-screen fixed top-0 left-0 bg-gray-800 text-white p-6 
        flex flex-col justify-between transition-transform duration-300 ease-in-out z-40
        lg:translate-x-0 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Close button for mobile */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden absolute top-4 right-4 text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col gap-4 mt-8 lg:mt-0">
          <h2 className="text-2xl font-bold mb-4 capitalize">
            <Link href={"/"}>
              <span className="uppercase text-2xl text-red-500">Jobify</span>
            </Link>
            <br />
            <span className="text-lg capitalize">{sidebarFor} Portal</span>
          </h2>
          <Link
            href={`/${sidebarFor}/dashboard`}
            className="hover:bg-gray-700 p-2 rounded flex text-xl items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <LayoutDashboard className="w-6 h-6" /> Dashboard
          </Link>
          <Link
            href={`/${sidebarFor}/internships`}
            className="hover:bg-gray-700 p-2 rounded flex text-xl items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Briefcase className="w-6 h-6" /> Internships
          </Link>
          <Link
            href={`/${sidebarFor}/jobs`}
            className="hover:bg-gray-700 p-2 rounded flex text-xl items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ClipboardList className="w-6 h-6" /> Jobs
          </Link>
          {sidebarFor === "student" && (
            <Link
              href={`/${sidebarFor}/resume`}
              className="hover:bg-gray-700 p-2 rounded flex text-xl items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FileText className="w-6 h-6" /> Resume
            </Link>
          )}
          <Link
            href={`/${sidebarFor}/profile`}
            className="hover:bg-gray-700 p-2 rounded flex text-xl items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <User className="w-6 h-6" /> Profile
          </Link>
          <Link
            href={`/${sidebarFor}/settings`}
            className="hover:bg-gray-700 p-2 rounded flex text-xl items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Settings className="w-6 h-6" /> Settings
          </Link>
        </div>
        <div className="flex flex-col gap-4 items-start mb-40">
          <button
            onClick={handleLogout}
            className="bg-red-400/50 hover:bg-red-400 rounded w-full text-start p-2 flex items-center gap-2 mb-3"
          >
            <LogOut className="w-6 h-6" /> Logout
          </button>
          {hydrated && (
            <div>
              <div className="flex items-center space-x-2">
                <img
                  src={sidebarFor === "employee" ? employee?.organizationLogo?.url : student?.avatar?.url}
                  alt="Logo"
                  className="h-7 w-7 rounded-full"
                />
                <h1 className="px-2 text-xl font-bold">
                  {sidebarFor === "employee"
                    ? `${employee?.firstname ?? ""} ${employee?.lastname ?? ""}`
                    : `${student?.firstname ?? ""} ${student?.lastname ?? ""}`}
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
