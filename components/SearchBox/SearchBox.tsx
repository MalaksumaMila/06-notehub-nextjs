import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ search, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      defaultValue={search}
      type="text"
      placeholder="Search notes"
      onChange={e => onChange(e.target.value)}
    />
  );
}
