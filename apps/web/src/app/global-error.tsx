"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <div className="bg-card p-6 rounded-lg shadow-lg w-96 border border-border">
        <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6 text-card-foreground">
          {error.message}
        </p>
        <Button
          className="bg-primary text-primary-foreground px-4 py-2 rounded transition hover:bg-secondary hover:text-secondary-foreground"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
