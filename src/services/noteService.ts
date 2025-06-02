import axios from "axios";
import type Note from "../types/note";

interface NoteHubResponce {
  notes: Note[];
  totalPages: number;
}

interface NoteHubSearchParams {
  params: {
    search?: string,
    page: number,
    perPage: 12,
},
  headers: {
  authorization: string,
}
}

const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;


export async function fetchNotes(page: number, query?: string): Promise<NoteHubResponce> {
  const noteHubSearchParams: NoteHubSearchParams = {
    params: {
      search: query,
      page: page,
      perPage: 12,
  },
    headers: {
    authorization: `Bearer ${myToken}`,
  }}
  const responce = await axios.get(
    "https://notehub-public.goit.study/api/notes/", noteHubSearchParams 
  );
  console.log(responce.data);

  return responce.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const responce = await axios.delete(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        authorization: `Bearer ${myToken}`,
      },
    }
  );
  console.log(responce.data);
  return responce.data;
}

export async function createNote(note: Note): Promise<Note> {
  const responce = await axios.post(
    "https://notehub-public.goit.study/api/notes/",
    note,
    {
      headers: {
        authorization: `Bearer ${myToken}`,
      },
    }
  );
  console.log(responce.data);
  return responce.data;
}
