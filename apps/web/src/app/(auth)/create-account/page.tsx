import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { CreateAccountForm } from "@app/(auth)/create-account/accountForm";
import { AuthBanner } from "@app/(auth)/_components/authBanner";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <AuthBanner
        LinkSlot={() => (
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Login
          </Link>
        )}
      >
        <CreateAccountForm></CreateAccountForm>
      </AuthBanner>
    </>
  );
}
