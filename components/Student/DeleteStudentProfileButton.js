"use client";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "@/services/studentService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const DeleteStudentProfileButton = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isStudentLoggedIn) {
      router.push("/student/auth/login");
    }
  }, [isStudentLoggedIn, mounted]);

  if (!mounted || !student) return null;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure to delete student? This will permanently delete all records!"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteStudent(student?.id);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      dispatch({ type: "STUDENT_DELETED" });
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

export default DeleteStudentProfileButton;
