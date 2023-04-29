import { useEffect } from "react";
import { NoteList } from "../components/NoteList";
import {  useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNotes } from "../store/notesSlice";



export function NotePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.auth);
  
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);
  return (
    <div>
        <NoteList/>
    </div>
  );
}
