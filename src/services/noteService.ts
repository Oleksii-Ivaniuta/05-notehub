import axios from "axios";
import type { Note } from "../types/note";

interface NoteHubResponse {
  notes: Note[];
  totalPages: number;
}

interface NoteHubSearchParams {
  params: {
    search?: string;
    page: number;
    perPage: number;
  };
  headers: {
    authorization: string;
  };
}

interface CreateNoteResponse {
  content: string;
  createdAt: string;
  id: number;
  tag: string;
  title: string;
  updatedAt: string;
  userId: number;
}

interface RemoveNoteResponse {
  content: string;
  createdAt: string;
  id: number;
  tag: string;
  title: string;
  updatedAt: string;
  userId: number;
}

const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(
  query: string,
  page: number
): Promise<NoteHubResponse> {
  const noteHubSearchParams: NoteHubSearchParams = {
    params: {
      page,
      perPage: 12,
    },
    headers: {
      authorization: `Bearer ${myToken}`,
    },
  };
  if (query.trim() !== "") {
    noteHubSearchParams.params.search = query.trim();
  }
  const response = await axios.get<NoteHubResponse>(
    "https://notehub-public.goit.study/api/notes/",
    noteHubSearchParams
  );

  return response.data;
}

export async function removeNote(id: number): Promise<RemoveNoteResponse> {
  const response = await axios.delete<RemoveNoteResponse>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data;
}

export async function createNote(note: Note): Promise<CreateNoteResponse> {
  const response = await axios.post<CreateNoteResponse>(
    "https://notehub-public.goit.study/api/notes/",
    note,
    {
      headers: {
        authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data;
}
