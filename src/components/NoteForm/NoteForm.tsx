import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { type NewNote } from "../../types/note";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import iziToast from "izitoast";

interface NoteFormProps {
  onClose: () => void;
}

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "To short title")
    .max(50, "To long title")
    .required("Title is required"),
  content: Yup.string()
    .min(2, "To short content")
    .max(500, "To long content")
    .required("Content is required"),
  tag: Yup.string().oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const addNewNote = useMutation({
    mutationFn: (newNoteData: NewNote) => createNote(newNoteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Notes"] });
    },
    onError: () => {
      iziToast.error({
        message: "Error adding note, please try again",
        position: "topCenter",
      });
    },
  });
  const handleSubmit = (values: NewNote, actions: FormikHelpers<NewNote>) => {
    addNewNote.mutate(values);
    actions.resetForm();
    onClose();
  };
  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        tag: "Todo",
      }}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component="div" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows="8"
            className={css.textarea}
          />
          <ErrorMessage component="div" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="div" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            {addNewNote.isPending && !addNewNote.isSuccess
              ? `Creating note...`
              : `Create note`}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
