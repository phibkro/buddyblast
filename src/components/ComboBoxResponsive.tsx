"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Category = {
  value: string;
  label: string;
};

// note: the value field must be lowercase, otherwise it will not set the value of the selected category
// the label is what will show, and can be set to whatever you want (maybe)
const categories: Category[] = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "outdoors",
    label: "Outdoors",
  },
  {
    value: "indoors",
    label: "Indoors",
  },
  {
    value: "cards",
    label: "Cards",
  },
];

export function ComboBoxResponsive({
  onChange,
}: {
  onChange?: (selectedCategory: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedCategory ? (
            <>{selectedCategory.label}</>
          ) : (
            <>+ Select category</>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <CategoryList
          setOpen={setOpen}
          setSelectedCategory={(selectedCategory) => {
            setSelectedCategory(selectedCategory);
            if (onChange) {
              onChange(selectedCategory?.value || "");
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function CategoryList({
  setOpen,
  setSelectedCategory,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCategory: (Category: Category | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter Category..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {categories.map((Category) => (
            <CommandItem
              key={Category.value}
              value={Category.value}
              onSelect={(value) => {
                if (value == "none") {
                  setSelectedCategory(null);
                } else {
                  setSelectedCategory(
                    categories.find((priority) => priority.value === value) ||
                      null,
                  );
                }
                setOpen(false);
              }}
            >
              {Category.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
