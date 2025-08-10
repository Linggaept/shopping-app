"use client";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("gada token");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };
  return (
    <>
      <div className="w-full bg-sidebar border-b-1 border-b-gray-200 text-white p-2 flex justify-end items-center">
        <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
          Logout
        </Button>
      </div>
    </>
  );
};

export default TopBar;
