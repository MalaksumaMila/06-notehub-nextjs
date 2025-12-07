import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

console.log('SERVER TOKEN:', process.env.NOTEHUB_TOKEN);
export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  const id = params.id;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
