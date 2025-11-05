import { useState, useContext } from "react";
import { Routes, Route } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import EntryForm from "./components/EntryForm/EntryForm";

import { UserContext } from "./contexts/UserContext";
import * as entryService from "./services/entryService";

const App = () => {
  const { user } = useContext(UserContext);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddEntry = async (formData) => {
    try {
      const newEntry = await entryService.create(formData);
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
