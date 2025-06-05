import axios from "axios";
import type Note from "../types/note";
import type { NewNote } from "../types/note";

interface NoteHubResponce {
  notes: Note[];
  totalPages: number;
}

interface NoteHubSearchParams {
  params: {
    search?: string;
    page: number;
    perPage: 12;
  };
  headers: {
    authorization: string;
  };
}

const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(
  page: number,
  query?: string
): Promise<NoteHubResponce> {
  const noteHubSearchParams: NoteHubSearchParams = {
    params: {
      search: query,
      page: page,
      perPage: 12,
    },
    headers: {
      authorization: `Bearer ${myToken}`,
    },
  };
  const responce = await axios.get<NoteHubResponce>(
    "https://notehub-public.goit.study/api/notes/",
    noteHubSearchParams
  );
  return responce.data;
}

export async function removeNote(id: number): Promise<Note> {
  const responce = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        authorization: `Bearer ${myToken}`,
      },
    }
  );
  return responce.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const responce = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes/",
    note,
    {
      headers: {
        authorization: `Bearer ${myToken}`,
      },
    }
  );
  return responce.data;
}
