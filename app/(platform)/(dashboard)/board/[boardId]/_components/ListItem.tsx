"use client";

import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import { ListHeader } from "./ListHeader";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

export const ListItem = ({ index, data }: ListItemProps) => {
  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#F1F2F4] pb-2 shadow-md">
        <ListHeader data={data} />
      </div>
    </li>
  );
};
