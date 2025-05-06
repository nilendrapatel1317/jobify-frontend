"use client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteEmployee } from "@/services/employeeService";

const DeleteEmpProfileButton = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { isEmployeeLoggedIn, employee } = useSelector((state) => state.employee);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isEmployeeLoggedIn) {
      router.push("/");
    }
  }, [isEmployeeLoggedIn, mounted]);

  if (!mounted || !employee) return null;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure to delete employee? This will permanently delete all records!"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteEmployee(employee?.id);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      dispatch({ type: "EMPLOYEE_DELETE" });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
    }
  };

  return (
    <button onClick={handleDelete}>
      <div className="flex items-center justify-center gap-5 bg-red-500  text-white text-2xl py-20 rounded-xl shadow-md cursor-pointer">
        <Trash2 className="w-8 h-8" />
        Delete Profile
      </div>
    </button>
  );
};

export default DeleteEmpProfileButton;
