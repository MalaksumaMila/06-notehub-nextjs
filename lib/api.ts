import axios from 'axios';
import type { Note } from '@/types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

const SERVER_TOKEN = process.env.NOTEHUB_TOKEN;
const CLIENT_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

function getToken() {
  if (typeof window === 'undefined') {
    return SERVER_TOKEN;
  }

  return CLIENT_TOKEN;
}

export interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteResponse {
  note: Note;
}

export type SortOrder = 'created' | 'updated';
export async function fetchNotes(
  query: string,
  page: number,
  sortOrder: SortOrder,
  perPage: number
): Promise<fetchNotesResponse> {
  const token = getToken();
  try {
    const response = await axios.get<fetchNotesResponse>(`/notes`, {
      params: {
        search: query || undefined,
        page,
        sortBy: sortOrder,
        perPage,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createNote(data: CreateNoteResponse): Promise<Note> {
  const token = getToken();
  const response = await axios.post<Note>(`/notes`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function deleteNote(id: Note['id']): Promise<Note> {
  const token = getToken();
  const response = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: Note['id']): Promise<Note> {
  const token = getToken();
  const response = await axios.get<{ note: Note }>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.note;
}
