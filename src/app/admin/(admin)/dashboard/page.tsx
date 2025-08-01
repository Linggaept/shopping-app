'use client';

import { DashboardCard } from "@/components/admin/dashboard-card";
import Container from "@/components/container";
import { CountProductPresenter } from "./countProductPresenter";


const DashboardAdmin = () => {
  const { productCount,loading } = CountProductPresenter();

  return (
    <Container>
      {loading ? (
        <div className="flex items-center justify-center h-screen mx-auto w-full text-center">
          <p className="text-gray-500 text-center">Loading...</p>
        </div>
      ) : (
        <>
          <h1>Admin Dashboard</h1>
          <p>
            Welcome to the admin dashboard. Here you can manage your application
            settings and user accounts.
          </p>
          <DashboardCard title="Total Products" description={`Total Products: ${productCount}`} />
        </>
      )}
    </Container>
  );
};

export default DashboardAdmin;
