"use client";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  admin?: boolean;
}

const Container = ({ children, className, admin }: ContainerProps) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("gada token");
      if (admin) {
        router.push("/admin/login");
      } else {
        return;
      }
    }
  }, []);

  return (
    <div className={cn("container mx-auto px-4 w-full", className)}>
      {children}
    </div>
  );
};

export default Container;
