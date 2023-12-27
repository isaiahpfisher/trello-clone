"use client";

import { deleteCard } from "@/actions/delete-card";
import { duplicateCard } from "@/actions/duplicate-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { useCardModal } from "@/hooks/useCardModal";
import { CardWithList } from "@/types";
import { CopyPlus, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const { execute: executeDuplicateCard, isLoading: isLoadingDuplicate } =
    useAction(duplicateCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created.`);
        cardModal.onClose();
        cardModal.onOpen(data.id);
      },
      onError: (error) => {
        toast.error(error);
      },
    });
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted.`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const params = useParams();
  const cardModal = useCardModal();

  const onDuplicate = () => {
    const boardId = params.boardId as string;

    executeDuplicateCard({ id: data.id, boardId });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({ id: data.id, boardId });
  };

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant={"gray"}
        className="w-full justify-start"
        size={"inline"}
        onClick={onDuplicate}
        disabled={isLoadingDuplicate}
      >
        <CopyPlus className="mr-2 size-4" />
        Duplicate
      </Button>
      <Button
        variant={"gray"}
        className="w-full justify-start"
        size={"inline"}
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        <Trash className="mr-2 size-4" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  );
};
