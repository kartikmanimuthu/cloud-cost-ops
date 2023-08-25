"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <div className="bg-card p-6 rounded-lg shadow-lg w-96 border border-border">
        <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
          404 - Page Not Found
        </h2>
        <p className="text-gray-600 mb-6 text-card-foreground">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Button
          className="bg-primary text-primary-foreground px-4 py-2 rounded transition hover:bg-secondary hover:text-secondary-foreground"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Return Home
        </Button>
      </div>
    </div>
  );
}
