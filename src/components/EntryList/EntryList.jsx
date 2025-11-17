<<<<<<< HEAD
<<<<<<< HEAD
import { Link } from "react-router";

const EntryList = (props) => {
  return (
    <main>
      {props.entries.map((entry) => (
        <article key={entry._id}>
          <Link to={`/entries/${entry._id}`}>
            <header>
              <h2>{entry.title}</h2>
            </header>
          </Link>
        </article>
=======
=======
>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
import { useState } from "react";
import { Link } from "react-router-dom";
import DeletePopup from "../DeletePopup/DeletePopup";

const EntryList = ({ entries, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleConfirmDelete = () => {
    if (selectedEntry) {
      onDelete(selectedEntry._id);
      setSelectedEntry(null);
      setShowDelete(false);
    }
  };

  return (
    <main className="p-4">
      {entries.map((entry) => (
        <div key={entry._id} className="border p-3 rounded mb-3">
          <Link to={`/entries/${entry._id}`}>
            <article>
              <header>
                <h2 className="text-lg font-semibold">{entry.title}</h2>
              </header>
              <p>{entry.description}</p>
            </article>
          </Link>
          <button
            onClick={() => {
              setSelectedEntry(entry);
              setShowDelete(true);
            }}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
<<<<<<< HEAD
>>>>>>> 2fe9bda1c419a618c39a8605383b7a60467c3e53
=======
>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
      ))}

      {showDelete && selectedEntry && (
        <DeletePopup
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </main>
  );
};

export default EntryList;