import { LoginFormAdmin } from "./admin-login-form";

const AdminPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginFormAdmin />
      </div>
    </div>
  );
};

export default AdminPage;