import { useNotes } from "./context/notesContext";
import { useState, useEffect } from "react";

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
}

function NotesList() {
  const { videoId, notes, setNotes, playerRef } = useNotes();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editNotes, setEditNotes] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(videoId)) || [];
    setNotes(storedNotes);
  }, [videoId, setNotes]);

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
  };

  const handleChange = (e) => {
    setEditNotes(e.target.value);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditNotes(notes[index].note);
  };
  const handleTimestampClick = (seconds) => {
    if (playerRef && playerRef.current) {
      playerRef.current.seekTo(seconds, "seconds");
    }
  };
  const handleUpdate = (index) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, note: editNotes } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
    setEditingIndex(null);
  };

  return (
    <div>
      {notes.map((note, index) => (
        <div
          className="m-5 mt-1 text-sm text-gray-500 border-2 border-s rounded-md"
          key={index}
        >
          <h1 className="font-medium">{note.date}</h1>
          <h1 className="font-light">
            Timestamp:{" "}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => handleTimestampClick(note.playedSeconds)}
            >
              {formatTime(Math.floor(note.playedSeconds))}
            </span>
          </h1>
          <div className="border border-s rounded-md py-2">
            {editingIndex === index ? (
              <div>
                <input
                  value={editNotes}
                  onChange={handleChange}
                  className="border w-full outline-none p-1"
                />
                <button
                  onClick={() => handleUpdate(index)}
                  className="ml-2 h-8 w-16 bg-blue-700 py-1 text-white font-medium"
                >
                  Change
                </button>
              </div>
            ) : (
              <h1>{note.note}</h1>
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => handleEdit(index)}
              className="mt-2 mr-2 border border-s rounded-md h-5 w-16 justify-between items-center shadow-md"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(index)}
              className="mt-2 mr-2 border border-s rounded-md h-5 w-16 justify-between items-center shadow-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
