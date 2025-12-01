'use client';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const queryClient = new QueryClient();
{
  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => {},
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
