"use client";

import React from "react";

import { SignUpSchema, SignUpSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSignInDialog } from "@/hooks/useSignInDialog";
import { useSignUpDialog } from "@/hooks/useSignUpDialog";

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

export function SignUpDialog() {
  const [isLoading, setIsLoading] = React.useState(false);
  const signUpDialog = useSignUpDialog();
  const signInDialog = useSignInDialog();

  const signUpForm = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    setIsLoading(true);

    axios
      .post("/api/sign-up", data)
      .then(() => {
        signUpDialog.onOpenChange(false);
        toast.success("Account created successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <DialogHeading
        title="Sign up"
        subtitle="Welcome to Residia - the best place to find your next home."
      />

      <Form {...signUpForm}>
        <form
          className="flex flex-col gap-4"
          onSubmit={signUpForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={signUpForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signUpForm.control}
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
            control={signUpForm.control}
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

          <FormField
            control={signUpForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
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
          <h1>Already have an account?</h1>
          <p
            className="cursor-pointer font-medium text-foreground hover:underline"
            onClick={() => {
              signUpDialog.onOpenChange(false);
              signInDialog.onOpenChange(true);
            }}
          >
            Sign in
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog
      disabled={isLoading}
      open={signUpDialog.open}
      title="Sign up"
      body={bodyContent}
      footer={footerContent}
      onClose={() => signUpDialog.onOpenChange(false)}
      onSubmit={signUpForm.handleSubmit(onSubmit)}
      actionLabel="Continue"
    />
  );
}
