"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DuplicateCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let card;

  try {
    const cardToDuplicate = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!cardToDuplicate) {
      return { error: "Card not found." };
    }

    const lastCard = await db.card.findFirst({
      where: { listId: cardToDuplicate.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title: `${cardToDuplicate.title} - Copy`,
        description: cardToDuplicate.description,
        order: newOrder,
        listId: cardToDuplicate.listId,
      },
    });
  } catch (err) {
    return {
      error: "Failed to duplicate.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
};

export const duplicateCard = createSafeAction(DuplicateCard, handler);
