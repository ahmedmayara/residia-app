"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { SignInSchema, SignInSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSignInDialog } from "@/hooks/useSignInDialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/dialogs/dialog";
import { DialogHeading } from "@/components/dialogs/dialog-heading";

export function SignInDialog() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const signInDialog = useSignInDialog();
  const signUpDialog = useSignInDialog();

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

  const footerContent = (
    <div className="mt-4 flex flex-col gap-4">
      <div className="mt-2 text-center font-normal text-muted-foreground">
        <div className="flex flex-row justify-center gap-2">
          <h1>Don&apos;t have an account?</h1>
          <p
            className="cursor-pointer font-medium text-foreground hover:underline"
            onClick={() => {
              signInDialog.onOpenChange(false);
              signUpDialog.onOpenChange(true);
            }}
          >
            Sign up
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <Dialog
      disabled={isLoading}
      open={signInDialog.open}
      title="Sign in"
      body={bodyContent}
      footer={footerContent}
      onClose={() => signInDialog.onOpenChange(false)}
      onSubmit={signInForm.handleSubmit(onSubmit)}
      actionLabel="Continue"
    />
  );
}
