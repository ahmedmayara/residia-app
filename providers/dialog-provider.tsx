import React from "react";

import { FiltersDialog } from "@/components/dialogs/filters-dialog";
import { HostDialog } from "@/components/dialogs/host-dialog";
import { SignInDialog } from "@/components/dialogs/sign-in-dialog";
import { SignUpDialog } from "@/components/dialogs/sign-up-dialog";

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
