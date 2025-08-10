"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useUserStore } from "@/store/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";

const UsersTable = () => {
    const { users, loading, error, fetchUsers } = useUserStore();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    if (users.length === 0) {
      setIsLoading(true);
      fetchUsers();
      console.log(users);
      setIsLoading(false);
    }
  }, [users, fetchUsers]);

  const handleEdit = (user: number) => {
    setSelectedUser(user);

    router.push(`/admin/user-manage/edit/${user}`);
  };

  return (
    <>
      {loading && <Loading />}
      <Table className={`w-full ${loading ? "hidden" : ""}`}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID User</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No users available.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell> 
                <TableCell>{user.name}</TableCell>
                <TableCell className="text-right space-x-2 ">
                  <button
                    className="btn px-2 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default UsersTable;
