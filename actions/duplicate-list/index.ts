"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DuplicateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let list;

  try {
    const listToDuplicate = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToDuplicate) {
      return { error: "List not found." };
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        boardId: listToDuplicate.boardId,
        title: `${listToDuplicate.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToDuplicate.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: { cards: true },
    });
  } catch (err) {
    return {
      error: "Failed to duplicate.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const duplicateList = createSafeAction(DuplicateList, handler);
