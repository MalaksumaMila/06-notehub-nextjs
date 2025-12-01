'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';

import css from './NotesPage.module.css';

import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/app/loading';

export default function NotesClient() {
  const sortOrder = 'created';
  const perPage = 12;

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');

  const debounceSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setQuery(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', query, page, sortOrder, perPage],
    queryFn: () => fetchNotes(query, page, sortOrder, perPage),
    placeholderData: prev => prev,
  });

  const pageCount = data?.totalPages ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {isLoading && <Loader />}

        <SearchBox search={search} onChange={debounceSearch} />

        {isSuccess && pageCount > 1 && (
          <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        )}

        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>

      {isSuccess && !isLoading && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <NoteForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}
