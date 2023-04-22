import { useEffect } from "react";
import { FilledNoteList, EmptyNoteList } from "../components/NoteList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function NotePage() {

  const {isAuth} = useSelector((store)=> store.auth)
  const navigate = useNavigate()

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

  useEffect(()=>{
    const redirect = ()=> {
      if (!isAuth) {
      navigate('/')
    }
    }
    redirect()
  }, [isAuth, navigate])
  return (
    <div>
      {note ? FilledNoteList(notes) : <EmptyNoteList />}
    </div>
  );
}
