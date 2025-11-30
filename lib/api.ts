import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteRequest {
  title: string;
  content: string | null;
  tag: NoteTag;
}

export type SortOrder = 'created' | 'updated';
export async function fetchNotes(
  query: string,
  page: number,
  sortOrder: SortOrder,
  perPage: number
): Promise<fetchNotesResponse> {
  try {
    const response = await axios.get<fetchNotesResponse>(`/notes`, {
      params: {
        search: query || undefined,
        page,
        sortBy: sortOrder,
        perPage,
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createNote(data: CreateNoteRequest): Promise<Note> {
  const response = await axios.post<Note>(`/notes`, data, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return response.data;
}

export async function deleteNote(id: Note['id']) {
  const response = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
}
