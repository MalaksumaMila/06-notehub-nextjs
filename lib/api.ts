import axios from 'axios';
import type { Note } from '@/types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

const CLIENT_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteRequest {
  title: string
  content: string
  tag: string
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
        Authorization: `Bearer ${CLIENT_TOKEN}`,
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
      Authorization: `Bearer ${CLIENT_TOKEN}`,
    },
  });

  return response.data;
}

export async function deleteNote(id: Note['id']): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${CLIENT_TOKEN}`,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const response = await axios.get<Note>(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${CLIENT_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
