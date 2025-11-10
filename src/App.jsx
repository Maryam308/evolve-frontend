import { useContext, useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

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
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const fetchAllEntries = async () => {
      const entriesData = await entriesService.index();

      setEntries(entriesData);
    };
    if (user) fetchAllEntries();
  }, [user]);

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddEntry = async (formData) => {
    try {
      const newEntry = await entriesService.create(formData);
      if (newEntry.err) {
        throw new Error(newEntry.err);
      }
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />

        <Route path="/entries" element={<EntryList entries={entries} />} />
        <Route path="/entries/:entryId" element={<EntryDetails />} />
      </Routes>

      {user && (
        <div>
          <button onClick={handleFormView}>
            {isFormOpen ? "Close Form" : "Create New Entry"}
          </button>
          {isFormOpen && <EntryForm handleAddEntry={handleAddEntry} />}
        </div>
      )}
    </>
  );
};

export default App;

