import { fetchNotes } from "../../services/noteService";
import css from "./App.module.css";



export default function App() {
  fetchNotes();
  return (
    <div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{/* Пагінація */}
		<button className={css.button}>Create note +</button>
  </header>
</div>
  )
}