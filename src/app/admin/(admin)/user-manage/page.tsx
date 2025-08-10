import AddUserDialog from "@/components/admin/add-user";
import UsersTable from "@/components/admin/user-table";
import Container from "@/components/container";

const UserManagePage = () => {
  return (
    <>
      <Container className="py-10">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-gray-600 mb-4">
          Here you can manage your users, including adding, editing, and
          deleting users.
        </p>
        <AddUserDialog />
        <UsersTable />
      </Container>
    </>
  );
};

export default UserManagePage;
