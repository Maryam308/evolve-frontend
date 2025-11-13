import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import EntryList from "./components/EntryList/EntryList";
import EntryDetails from "./components/EntryDetails/EntryDetails";
import EntryListPage from "./components/EntryListPage/EntryListPage";

import { UserContext } from "./contexts/UserContext";
import * as entriesService from "./services/entryService";

const App = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [entries, setEntries] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
  }, [user, refreshTrigger]);

  const handleRefreshEntries = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteEntry = async (entryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      await entriesService.deleteEntry(entryId);
      setEntries(entries.filter((entry) => entry._id !== entryId));
      console.log(`Entry ${entryId} deleted successfully`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  // Add the update function from the branch
  const handleUpdateEntry = async (formData, entryId) => {
    try {
      const updatedEntry = await entriesService.update(entryId, formData);
      if (updatedEntry.err) {
        throw new Error(updatedEntry.err);
      }
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error("Error updating entry:", err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/entries" element={<EntryList entries={entries} />} />
          <Route path="/sign-in" element={user ? <Dashboard /> : <Landing />} />
          <Route path="/sign-up" element={user ? <Dashboard /> : <Landing />} />
          <Route
            path="/achievements"
            element={<EntryListPage pageType="achievement" />}
          />
          <Route
            path="/lessons"
            element={<EntryListPage pageType="lesson" />}
          />

          <Route
            path="/achievements/entries/:entryId"
            element={
              <EntryDetails
                handleDeleteEntry={handleDeleteEntry}
                handleRefreshEntries={handleRefreshEntries}
                handleUpdateEntry={handleUpdateEntry}
              />
            }
          />
          <Route
            path="/lessons/entries/:entryId"
            element={
              <EntryDetails
                handleDeleteEntry={handleDeleteEntry}
                handleRefreshEntries={handleRefreshEntries}
                handleUpdateEntry={handleUpdateEntry}
              />
            }
          />
          <Route path="/entries/:entryId" element={<Dashboard />} />
        </Routes>
      </div>

      {/* Modal overlays */}
      <Routes>
        <Route
          path="/achievements/entries/:entryId"
          element={
            <EntryDetails
              handleDeleteEntry={handleDeleteEntry}
              handleUpdateEntry={handleUpdateEntry}
            />
          }
        />
        <Route
          path="/lessons/entries/:entryId"
          element={
            <EntryDetails
              handleDeleteEntry={handleDeleteEntry}
              handleUpdateEntry={handleUpdateEntry}
            />
          }
        />

        <Route
          path="/entries"
          element={<EntryList entries={entries} onDelete={handleDeleteEntry} />}
        />

        {!user && <Route path="/sign-in" element={<SignInForm />} />}
        {!user && <Route path="/sign-up" element={<SignUpForm />} />}
      </Routes>
    </>
  );
};

export default App;