"use client";

import React from "react";

import { Dialog } from "./dialog";
import { DialogHeading } from "./dialog-heading";

import { useSignInDialog } from "@/hooks/useSignInDialog";

import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { SubmitHandler, useForm } from "react-hook-form";
import { SignInSchema, SignInSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignInDialog() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const signInDialog = useSignInDialog();

  const signInForm = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((response) => {
        if (response?.ok && !response?.error) {
          toast.success("Signed in successfully!");
          router.refresh();
          signInDialog.onOpenChange(false);
        }

        if (response?.error) {
          toast.error("Invalid credentials!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <DialogHeading
        title="Sign in"
        subtitle="Welcome back to Residia - the best place to find your next home."
      />

      <Form {...signInForm}>
        <form
          className="flex flex-col gap-4"
          onSubmit={signInForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={signInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signInForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
  return (
    <Dialog
      disabled={isLoading}
      open={signInDialog.open}
      title="Sign in"
      body={bodyContent}
      onClose={() => signInDialog.onOpenChange(false)}
      onSubmit={signInForm.handleSubmit(onSubmit)}
      actionLabel="Continue"
    />
  );
}
