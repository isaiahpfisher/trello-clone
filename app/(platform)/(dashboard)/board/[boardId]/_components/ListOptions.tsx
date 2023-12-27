"use client";

import { deleteList } from "@/actions/delete-list";
import { duplicateList } from "@/actions/duplicate-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/useAction";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeDuplicate } = useAction(duplicateList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" duplicated.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  const onDuplicate = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDuplicate({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="size-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          List Actions
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="absolute right-2 top-2 size-auto p-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          variant={"ghost"}
        >
          Add a Card
        </Button>
        <form action={onDuplicate}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Duplicate List
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Delete List
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
