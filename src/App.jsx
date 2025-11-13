import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import EntryForm from "./components/EntryForm/EntryForm";
import EntryList from "./components/EntryList/EntryList";
import EntryDetails from "./components/EntryDetails/EntryDetails";

import { UserContext } from "./contexts/UserContext";
import * as entriesService from "./services/entryService";

const App = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [entries, setEntries] = useState([]);


  useEffect(() => {
    const fetchAllEntries = async () => {
      try {
        const entriesData = await entriesService.index();
        setEntries(entriesData);
      } catch (err) {
        console.error("Error fetching entries:", err);
      }
    };

    if (user) fetchAllEntries();
  }, [user]);

  const handleFormView = () => setIsFormOpen(!isFormOpen);


  const handleAddEntry = async (formData) => {
    try {
      const newEntry = await entriesService.create(formData);
      if (newEntry.err) throw new Error(newEntry.err);

      setIsFormOpen(false);

      if (Array.isArray(newEntry)) {
        setEntries(newEntry); 
      } else {
        setEntries((prev) => [...prev, newEntry]); 
      }
    } catch (err) {
      console.error("Error adding entry:", err);
    }
  };

  
  const handleDeleteEntry = async (entryId) => {
    try {
      await entriesService.deleteEntry(entryId); 
      setEntries(entries.filter((entry) => entry._id !== entryId)); 
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        
        <Route
          path="/entries"
          element={
            <EntryList
              entries={entries}
              onDelete={handleDeleteEntry}
            />
          }
        />
        <Route path="/entries/:entryId" element={<EntryDetails />} />
      </Routes>

      {user && (
        <div className="text-center mt-6">
          <button
            onClick={handleFormView}
            className="bg-beige-200 px-6 py-2 rounded-xl hover:bg-beige-300 transition"
          >
            {isFormOpen ? "Close Form" : "Create New Entry"}
          </button>

          {isFormOpen && <EntryForm handleAddEntry={handleAddEntry} />}
        </div>
      )}
    </>
  );
};

export default App;
