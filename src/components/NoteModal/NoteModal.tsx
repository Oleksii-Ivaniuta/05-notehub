import css from "./NoteModal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm";
import type Note from "../../types/note";

interface NoteModalProps {
  onClose: () => void,
  onSubmit: (newNote: Note) => Promise<void>
}

export default function NoteModal({ onClose, onSubmit }: NoteModalProps) {

  useEffect(() => {
	  const handleKeyDown = (e: KeyboardEvent) => {
	    if (e.key === "Escape") {
	      onClose();
	    }
	  };
	
	  document.addEventListener("keydown", handleKeyDown);
	
	  return () => {
	    document.removeEventListener("keydown", handleKeyDown);
	  };
	}, [onClose]);

    return createPortal(
      <div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
>
  <div className={css.modal}>
    <NoteForm onSubmit={onSubmit} onClose={onClose}/>
  </div>
</div>, document.body
    )
}