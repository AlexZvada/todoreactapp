import { FilledNoteList, EmptyNoteList } from "../components/NoteList";
export const Notes = () => {
  const note = true;
  const notes = [
    {
      id: 1,
      title: "some title",
      text: "some text",
      status: false,
    },
    {
      id: 2,
      title: "some title",
      text: "some text",
      status: true,
    },
    {
      id: 3,
      title: "some title",
      text: "some text",
      status: true,
    },
    {
      id: 4,
      title: "some title",
      text: "some text",
      status: true,
    },
  ];
    return (
      <div>
        {note ? FilledNoteList(notes) : <EmptyNoteList/>}
      </div>
    );
}