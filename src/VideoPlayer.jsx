import ReactPlayer from "react-player/youtube";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import AddNotes from "./AddNotes";
import NotesList from "./NotesList";
import { useNotes } from "./context/notesContext";
import { CiSearch } from "react-icons/ci";
import "./VideoPlayer.css";
function VideoPlayer() {
  const [playing, setPlaying] = useState(true);
  const [search, setSearch] = useState("");

  const {
    playedSeconds,
    setPlayedSeconds,
    showInput,
    setShowInput,
    videoId,
    setVideoId,
    playerRef,
  } = useNotes();

  useState(() => {
    setVideoId("IdHC3hNJs6I"); // Set your default video ID here
  }, []);
  const handleOnPlaying = () => {
    setPlaying(true);
  };
  const handleAddNewNotes = () => {
    console.log(`Current timestamp: ${playedSeconds} seconds`);
    setPlaying(false);
    setShowInput(true);
    // You can add logic to save the timestamp along with the note here
  };

  const handleProgress = (e) => {
    setPlayedSeconds(e.playedSeconds);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  console.log(search);
  const handleSubmit = (e) => {
    e.preventDefault();
    setVideoId(search);
  };
  console.log(videoId);
  return (
    <div className="m-5 w-full h-screen">
      <div className=" ml-28 md:flex  md:justify-between  mr-2">
        <h1 className="text-xl font-medium mb-4 md:text-xs lg:text-xl ">
          Video Player with Notes
        </h1>
        <form onSubmit={handleSubmit} className="flex w-36 h-8 md:w-72 md:h-8 ">
          <input
            type="search"
            value={search}
            placeholder="Search ID"
            className="border border-none text-lg outline-none shadow"
            onChange={handleSearch}
          />
          <button type="submit" className="mr-10">
            <CiSearch />
          </button>
        </form>
      </div>
      <div className="flex justify-center item-center w-full shadow-sm ">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          width="1220px"
          height="500px"
          className="player"
          light="true"
          controls={true}
          playing={playing}
          onPlay={handleOnPlaying}
          onProgress={handleProgress}
          ref={playerRef}
        />
      </div>
      <hr className="w-4/5 my-4 bg-gray-100   border-0 rounded dark:bg-gray-200 ml-20 md:ml-5" />
      <div className="border border-solid rounded-md w-4/5">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-medium ml-5 mt-5">My Notes</h1>
            <p className="ml-5 mt-1 font-light text-sm text-gray-500">
              All your notes at a single place. Click on any note to go to a
              specific timestamp of the video.
            </p>
          </div>
          <button
            onClick={handleAddNewNotes}
            className="flex mt-5 mr-4 border border-s rounded-md h-9 w-36 justify-between items-center shadow-md"
          >
            <CiCirclePlus className="mt-1 ml-1" />
            <p className=" hidden md:block mr-1">Add new note</p>
          </button>
        </div>
        {showInput && <AddNotes playedSeconds={playedSeconds} />}
        <hr className="w-4/5 h-1 my-4 mx-auto bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-200" />
        <NotesList />
      </div>
    </div>
  );
}

export default VideoPlayer;
