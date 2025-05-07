"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const page = () => {

  const router = useRouter();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  const { isEmployeeLoggedIn } = useSelector((state) => state.employee);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isStudentLoggedIn) {
      router.push("/student/dashboard");
    }else if(isEmployeeLoggedIn){
      router.push("/")
    }
    else{
      router.push("/student/auth/login");
    }
  }, [isStudentLoggedIn, mounted]);

  if (!mounted || !student) return null;

  return (
    <div></div>
  )
}

export default page