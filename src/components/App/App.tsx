import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [debouncedQuery] = useDebounce(query, 1000);

  const loadNotes = useQuery({
    queryKey: ["Notes", currentPage, debouncedQuery],
    queryFn: () => fetchNotes(currentPage, debouncedQuery),
    placeholderData: keepPreviousData,
  });

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query === "") {
      setQuery(undefined);
    } else {
      setQuery(query);
    }
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={onChangeQuery} />
        {loadNotes.isSuccess && loadNotes.data.totalPages > 1 && (
          <Pagination
            pageCount={loadNotes.data.totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
        <button className={css.button}>Create note +</button>
      </header>
      {loadNotes.isSuccess && <NoteList notes={loadNotes.data.notes} />}
    </div>
  );
}
