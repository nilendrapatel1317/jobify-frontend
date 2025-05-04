"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const page = () => {

  const router = useRouter();
  const { isLoggedIn, student } = useSelector((state) => state.student);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/student/dashboard");
    }
    else{
      router.push("/student/auth/login");
    }
  }, [isLoggedIn, mounted]);

  if (!mounted || !student) return null;

  return (
    <div></div>
  )
}

export default page