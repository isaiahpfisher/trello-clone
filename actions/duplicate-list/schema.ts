import { z } from "zod";

export const DuplicateList = z.object({
  id: z.string(),
  boardId: z.string(),
});
