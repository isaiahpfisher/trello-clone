import { z } from "zod";
import { DuplicateList } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof DuplicateList>;
export type ReturnType = ActionState<InputType, List>;
