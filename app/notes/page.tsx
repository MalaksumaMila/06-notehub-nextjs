import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Значення, які відповідають NotesClient
  const query = '';
  const page = 1;
  const sortOrder = 'created';
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ['notes', query, page, sortOrder, perPage],
    queryFn: () => fetchNotes(query, page, sortOrder, perPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
