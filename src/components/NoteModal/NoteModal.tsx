import css from "./NoteModal.module.css";
export default function NoteModal() {
    return (
        <div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
>
  <div className={css.modal}>
    {/* Компонент NoteForm */}
  </div>
</div>
    )
}