"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/app/login/submit-button";
import { addSegment } from "@/utils/lib";
import { toast } from "sonner";
import { useState } from "react";
export function AddNewSegment({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  async function handleAddSegment(formData: FormData) {
    if (formData.get("name") === "") {
      toast.error("Name is required");
      return;
    }
    if (formData.get("targeting") === "") {
      toast.error("Targeting is required");
      return;
    }

    const result = await addSegment(formData, userId);
    if (result?.message) {
      toast.error(result.message);
    } else {
      toast.success("Added new segment");
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add new segment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new segment</DialogTitle>
          <DialogDescription>
            Create a new segment to organize your audience
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input name="name" id="name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="targeting">Targeting</Label>
            <Select name="targeting">
              <SelectTrigger>
                <SelectValue placeholder="Select a targeting" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="csv">CSV file</SelectItem>
                  <SelectItem value="shopify">Shopify</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <SubmitButton
            formAction={handleAddSegment}
            pendingText="Creating segment..."
          >
            Create segment
          </SubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
