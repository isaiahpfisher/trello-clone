"use client";

import { useProModal } from "@/hooks/useProModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export const ProModal = () => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-normal">
          <Image
            fill
            src={"/hero.svg"}
            alt="upgrade hero"
            className="object-cover"
          />
        </div>
        <div className="mx-auto space-y-6 p-6 text-neutral-700">
          <h2 className="text-center text-xl font-semibold">
            Upgrade to Taskify Pro Today!
          </h2>
          <p className="text-center font-semibold text-neutral-600">
            Get the best of Taskify with unlimited boards.
          </p>
          <Button
            className="w-full"
            variant={"primary"}
            disabled={isLoading}
            onClick={onClick}
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
