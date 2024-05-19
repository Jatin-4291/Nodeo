import { useNotes } from "./context/notesContext";
function AddNotes() {
  const { note, setNote, setShowInput, playedSeconds, videoId, setNotes } =
    useNotes();
  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleAddNote = () => {
    setShowInput(false);
    const date = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const newNote = { date, note, playedSeconds };
    const existingNotes = JSON.parse(localStorage.getItem(videoId)) || [];
    console.log(existingNotes);
    if ((newNote.playedSeconds == 0) == null) {
      return (
        <h1 className=" text-red-600 font-bold">
          Notes cannot be added as video was not Staryed
        </h1>
      );
    }
    const updatedNotes = [...existingNotes, newNote];
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  return (
    <div className="w-4/5 h-48 relative">
      <input
        type="text"
        value={note}
        className="w-4/5 h-24 border border-s rounded-md outline-none m-5"
        placeholder="Type your note"
        onChange={handleChange}
      />
      <button
        className="absolute bottom-5 right-5 bg-blue-800 text-white font-bold text-xl px-1 py-1 rounded"
        onClick={handleAddNote}
      >
        Add
      </button>
    </div>
  );
}

export default AddNotes;
