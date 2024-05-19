import { createContext, useContext, useState, useRef } from "react";

export const NotesContext = createContext({});

export const NotesProvider = function ({ children }) {
  const [note, setNote] = useState("");
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [notes, setNotes] = useState([]);
  const playerRef = useRef(null); // Correctly create the ref using useRef

  return (
    <NotesContext.Provider
      value={{
        videoId,
        setVideoId,
        note,
        setNote,
        playedSeconds,
        setPlayedSeconds,
        showInput,
        setShowInput,
        notes,
        setNotes,
        playerRef,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = function () {
  return useContext(NotesContext);
};
