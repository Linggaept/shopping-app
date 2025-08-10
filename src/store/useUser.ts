import { fetchUserById, getAllUser } from "@/services/admin/user-service";
import { create } from "zustand";

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

interface UserState {
  loading: boolean;
  error: string | null;
  users: User[];
  user: User | null;
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,
  user: null,
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const users = await getAllUser();
      set({ users });
    } catch (error: string | any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  fetchUserById: async (id: number) => {
    set({ loading: true });
    try {
      const user = await fetchUserById(id);
      set({ user });
    } catch (error: string | any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
