import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '@/app/notes/Notes.client';

export default async function NotesPages() {
  const queryClient = new QueryClient();

  const initialQuery = '';
  const initialPage = 1;
  const sortOrder = 'created';
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialQuery, initialPage, sortOrder, perPage],
    queryFn: () => fetchNotes(initialQuery, initialPage, sortOrder, perPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialQuery={initialQuery}
        initialPage={initialPage}
        sortOrder={sortOrder}
        perPage={perPage}
      />
    </HydrationBoundary>
  );
}
