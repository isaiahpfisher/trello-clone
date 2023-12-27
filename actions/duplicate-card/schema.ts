import { z } from "zod";

export const DuplicateCard = z.object({
  id: z.string(),
  boardId: z.string(),
});
