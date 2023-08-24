"use client";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function notification() {
  const { toast } = useToast();
  return (
    <>
      <div>
        <Toaster />
        <Button
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            });
          }}
        >
          Show Toast
        </Button>
      </div>
      <div>
        <div>
          <Progress value={33} />
        </div>
      </div>
    </>
  );
}
