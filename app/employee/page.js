"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const page = () => {

  const router = useRouter();
  const { isEmployeeLoggedIn, employee } = useSelector((state) => state.employee);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isEmployeeLoggedIn) {
      router.push("/employee/dashboard");
    }
    else{
      router.push("/employee/auth/login");
    }
  }, [isEmployeeLoggedIn, mounted]);

  if (!mounted || !employee) return null;

  return (
    <div></div>
  )
}

export default page