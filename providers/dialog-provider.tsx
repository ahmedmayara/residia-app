import React from "react";

import { SignUpDialog } from "@/components/dialogs/sign-up-dialog";
import { SignInDialog } from "@/components/dialogs/sign-in-dialog";
import { HostDialog } from "@/components/dialogs/host-dialog";
import { FiltersDialog } from "@/components/dialogs/filters-dialog";

export function DialogProvider() {
  return (
    <>
      <HostDialog />
      <FiltersDialog />
      <SignUpDialog />
      <SignInDialog />
    </>
  );
}
