import { z } from "zod";
import { DuplicateCard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Card } from "@prisma/client";

export type InputType = z.infer<typeof DuplicateCard>;
export type ReturnType = ActionState<InputType, Card>;
