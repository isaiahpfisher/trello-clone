"use client";

import { ListWithCards } from "@/types";
import { ListHeader } from "./ListHeader";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./CardForm";
import { cn } from "@/lib/utils";
import { CardItem } from "./CardItem";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

export const ListItem = ({ index, data }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#F1F2F4] pb-2 shadow-md">
        <ListHeader data={data} onAddCard={enableEditing} />
        <ol
          className={cn(
            "mx-1 flex flex-col gap-y-2 px-1 py-0.5",
            data.cards.length > 0 ? "mt-2" : "mt-0",
          )}
        >
          {data.cards.map((card, index) => (
            <CardItem key={card.id} index={index} data={card} />
          ))}
        </ol>
        <CardForm
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          listId={data.id}
        />
      </div>
    </li>
  );
};
