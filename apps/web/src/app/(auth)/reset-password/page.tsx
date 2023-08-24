import Link from "next/link";

import ResetPasswordForm from "@app/(auth)/reset-password/resetForm";
import { AuthBanner } from "@app/(auth)/_components/authBanner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ResetPassword() {
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
        <ResetPasswordForm></ResetPasswordForm>
      </AuthBanner>
    </>
  );
}
