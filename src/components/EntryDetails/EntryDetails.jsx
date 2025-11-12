import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as entriesService from "../../services/entryService"; 
import DeletePopup from "../DeletePopup/DeletePopup";

const EntryDetails = () => {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const data = await entriesService.show(entryId);
        setEntry(data);
      } catch (err) {
        console.error("Error fetching entry:", err);
      }
    };
    fetchEntry();
  }, [entryId]);

  if (!entry) return <p>Loading...</p>;

  const handleDeleteClick = () => setShowPopup(true);


  const handleConfirmDelete = async () => {
    try {
      await entriesService.deleteEntry(entry._id);
      navigate("/entries"); 
    } catch (err) {
      console.error("Error deleting entry:", err);
    } finally {
      setShowPopup(false);
    }
  };

 
  const handleCancelDelete = () => setShowPopup(false);

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">{entry.title}</h2>
      <p className="text-gray-700 mb-4">{entry.description}</p>

      <button
        onClick={handleDeleteClick}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete
      </button>

      {/* Show popup when requested */}
      {showPopup && (
        <DeletePopup
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default EntryDetails;
