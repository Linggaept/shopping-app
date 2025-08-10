"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editUserService } from "@/services/admin/user-service";
import { useUserStore } from "@/store/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
  email: email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

interface DetailProductProps {
  params: Promise<{ id: number }>;
}

export default function EditFormUser({ params }: DetailProductProps) {
  const { fetchUserById, user, loading } = useUserStore();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      console.log(resolvedParams.id);
      if (resolvedParams.id) {
        try {
          await fetchUserById(resolvedParams.id);
        } catch (error) {
          console.error("Error loading user:", error);
        }
      }
    };

    getParams();
  }, [params, fetchUserById]);

  // Reset form values when user data is loaded
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user || !user.id) {
      console.error("User ID is not available");
      return;
    }

    try {
      await editUserService(user.id, data.name, data.email);
      console.log("User updated successfully:", {
        id: user.id,
        name: data.name,
        email: data.email,
      });

      // You might want to show a success message or redirect
      router.push("admin/user-manage");
    } catch (error) {
      console.error("Error updating user:", error);
      // You might want to show an error message to the user
    }
  };

  // Show loading state while user is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error state if user is not found
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email..." {...field} />
              </FormControl>
              <FormDescription>This is your user email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name..." {...field} />
              </FormControl>
              <FormDescription>This is your user name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button onClick={() => router.back()} variant="outline" disabled={loading}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
