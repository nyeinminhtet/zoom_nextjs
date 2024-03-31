import Button, { btnClassName } from "@/components/Button";
import { cn } from "@/lib/utils";
import { ClerkLoaded, ClerkLoading, SignInButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const MeetingLogin = () => {
  return (
    <div className="mx-auto w-fit space-y-3">
      <h1 className="text-center text-2xl font-bold">Join Meeting</h1>
      <ClerkLoaded>
        <SignInButton>
          <Button>Sign in</Button>
        </SignInButton>

        <Link
          href="?guest=true"
          className={cn(btnClassName, "w-44 bg-gray-400 hover:bg-gray-500")}
        >
          Continue as guest
        </Link>
      </ClerkLoaded>

      <ClerkLoading>
        <Loader2 className="mx-auto animate-spin" />
      </ClerkLoading>
    </div>
  );
};

export default MeetingLogin;
