import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import DropdownIcon from "./icons/DropdownIcon";
import { FormEventHandler, useState } from "react";
import FilmsSearchBar from "./FilmsSearchBar";
import { Film } from "@/lib/interfaces";
import RemoveIcon from "./icons/RemoveIcon";
import { DialogClose } from "@radix-ui/react-dialog";

export default function CreateDropdown() {
  const [filmsOnNewList, setFilmsOnNewList] = useState<Film[]>([]);
  const [listTitle, setListTitle] = useState<string>("");
  const [listDescription, setListDescription] = useState<string>("");

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const filmIds = filmsOnNewList.map((film) => film.id);
    const listData = { listTitle, listDescription, filmIds };
    await fetch("/api/list", {
      method: "POST",
      body: JSON.stringify(listData),
    }).catch((e) => {
      console.error(e);
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-beeYellow rounded-md flex flex-row items-end px-2 py-1 text-beeBrownBackground">
          Create <DropdownIcon className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-beeBrownLight border-none flex flex-col">
          <Dialog>
            <DialogTrigger>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                New review
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <div className="w-10 h-10">
                <span>review</span>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            onOpenChange={() => {
              setFilmsOnNewList([]);
            }}
          >
            <DialogTrigger>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                New list
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="border-none max-w-fit">
              <DialogTitle>Create a new list </DialogTitle>
              <form className="flex flex-row" onSubmit={handleFormSubmit}>
                <div className="flex flex-col gap-1">
                  <label htmlFor="listTitle">List title</label>
                  <input
                    type="text"
                    id="listTitle"
                    value={listTitle}
                    onChange={(e) => {
                      setListTitle(e.target.value);
                    }}
                    className="w-[30ch] text-beeBrownBackground bg-beeBeig rounded-sm px-1 py-0.5"
                  />
                  <label htmlFor="listDescription">Description</label>
                  <textarea
                    className="w-[30ch] text-beeBrownBackground bg-beeBeig rounded-sm px-1 py-0.5"
                    name="listDescription"
                    id="listDescription"
                    cols={12}
                    rows={4}
                    value={listDescription}
                    onChange={(e) => {
                      setListDescription(e.target.value);
                    }}
                  />
                  <FilmsSearchBar
                    className="flex-col gap-1"
                    addFilm={true}
                    filmsOnNewList={filmsOnNewList}
                    setFilmsOnNewList={setFilmsOnNewList}
                  />
                </div>
                <div className="bg-beeBrownHeader min-w-[15rem]">
                  <ul>
                    {filmsOnNewList.map((film) => {
                      return (
                        <li
                          className="text-beeBeig flex flex-row gap-2 group"
                          key={film.id}
                        >
                          <span>{film.title}</span>
                          <span> {film.release_date.slice(0, 4)}</span>
                          <button
                            className="invisible group-hover:visible"
                            onClick={() => {
                              setFilmsOnNewList(
                                filmsOnNewList.filter((filmOnList) => {
                                  return filmOnList.id !== film.id;
                                })
                              );
                            }}
                          >
                            <RemoveIcon className="w-4 h-4 self-center" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <DialogClose>
                  <button
                    type="submit"
                    className="bg-beeYellow text-beeBrownBackground"
                  >
                    Save
                  </button>
                </DialogClose>
              </form>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
