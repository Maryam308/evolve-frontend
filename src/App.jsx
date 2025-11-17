import { useContext, useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";

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

// Wrapper component to show list page with modal on top
const ListPageWithModal = ({
  pageType,
  handleDeleteEntry,
  handleRefreshEntries,
  handleUpdateEntry,
}) => {
  const { entryId } = useParams();

  return (
    <>
      <EntryListPage pageType={pageType} />
      {entryId && (
        <EntryDetails
          handleDeleteEntry={handleDeleteEntry}
          handleRefreshEntries={handleRefreshEntries}
          handleUpdateEntry={handleUpdateEntry}
        />
      )}
    </>
  );
};

const App = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [entries, setEntries] = useState([]);
<<<<<<< HEAD
<<<<<<< HEAD
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const fetchAllEntries = async () => {
    const entriesData = await entriesService.index();
    setEntries(entriesData);
  };

  useEffect(() => {
    if (user) fetchAllEntries();
  }, [user]);

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
    if (isFormOpen) {
      setSelectedEntry(null);
    }
=======

=======
>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Check if we're on sign-in or sign-up route
  const isAuthRoute =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

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
<<<<<<< HEAD
>>>>>>> 2fe9bda1c419a618c39a8605383b7a60467c3e53
=======
>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
  };

  const handleDeleteEntry = async (entryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const newEntry = await entriesService.create(formData);
      if (newEntry.err) {
        throw new Error(newEntry.err);
      }
      setIsFormOpen(false);
      setSelectedEntry(null);
      await fetchAllEntries();
=======
      await entriesService.deleteEntry(entryId);
      setEntries(entries.filter((entry) => entry._id !== entryId));
      console.log(`Entry ${entryId} deleted successfully`);
      navigate("/dashboard");
>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  const handleUpdateEntry = async (formData, entryId) => {
    try {
      const updatedEntry = await entriesService.update(entryId, formData);
      if (updatedEntry.err) {
        throw new Error(updatedEntry.err);
      }
<<<<<<< HEAD
      setIsFormOpen(false);
      setSelectedEntry(null);
      await fetchAllEntries();
      setRefreshTrigger(prev => prev + 1);
=======
      await entriesService.deleteEntry(entryId);
      setEntries(entries.filter((entry) => entry._id !== entryId));
      console.log(`Entry ${entryId} deleted successfully`);
      navigate("/dashboard");
>>>>>>> 2fe9bda1c419a618c39a8605383b7a60467c3e53
=======
      setRefreshTrigger((prev) => prev + 1);
>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
    } catch (err) {
      console.error("Error updating entry:", err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={user ? <Dashboard /> : <Landing />} />
          <Route
            path="/sign-in"
            element={
              user ? (
                <Dashboard />
              ) : (
                <>
                  <Landing />
                  <SignInForm />
                </>
              )
            }
          />
          <Route
            path="/sign-up"
            element={
              user ? (
                <Dashboard />
              ) : (
                <>
                  <Landing />
                  <SignUpForm />
                </>
              )
            }
          />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/entries" element={<EntryList entries={entries} />} />

          {/* List Pages - Both with and without entry details */}
          <Route
            path="/achievements"
            element={<EntryListPage pageType="achievement" />}
          />
          <Route
            path="/achievements/entries/:entryId"
            element={
              <ListPageWithModal
                pageType="achievement"
                handleDeleteEntry={handleDeleteEntry}
                handleRefreshEntries={handleRefreshEntries}
                handleUpdateEntry={handleUpdateEntry}
              />
            }
          />

          <Route
            path="/lessons"
            element={<EntryListPage pageType="lesson" />}
          />
          <Route
            path="/lessons/entries/:entryId"
            element={
              <ListPageWithModal
                pageType="lesson"
                handleDeleteEntry={handleDeleteEntry}
                handleRefreshEntries={handleRefreshEntries}
                handleUpdateEntry={handleUpdateEntry}
              />
            }
          />

          {/* Fallback for generic entries */}
          <Route
            path="/entries/:entryId"
            element={
              <EntryDetails
                handleDeleteEntry={handleDeleteEntry}
                handleRefreshEntries={handleRefreshEntries}
                handleUpdateEntry={handleUpdateEntry}
              />
            }
          />
        </Routes>
      </div>
<<<<<<< HEAD

      {/* Modal overlays */}
      <Routes>
        <Route
          path="/achievements/entries/:entryId"
          element={<EntryDetails handleDeleteEntry={handleDeleteEntry} />}
        />
        <Route
          path="/lessons/entries/:entryId"
          element={<EntryDetails handleDeleteEntry={handleDeleteEntry} />}
        />

<<<<<<< HEAD
        <Route 
          path="/entries" 
          element={
            <EntryList 
              entries={entries} 
              onEditEntry={(entry) => {
                setSelectedEntry(entry);
                setIsFormOpen(true);
              }}
            /> 
          } 
        />
        <Route 
          path="/entries/:entryId" 
          element={
            <EntryDetails 
              key={refreshTrigger}
              onEditEntry={(entry) => {
                setSelectedEntry(entry);
                setIsFormOpen(true);
              }}
            /> 
          } 
        />
      </Routes>

      {user && (
        <div>
          <button onClick={handleFormView}>
            {isFormOpen ? "Close Form" : "Create New Entry"}
          </button>
          {isFormOpen && (
            <EntryForm 
              handleAddEntry={handleAddEntry}
              handleUpdateEntry={handleUpdateEntry}
              selected={selectedEntry}
            />
          )}
        </div>
      )}
=======
        <Route
          path="/entries"
          element={<EntryList entries={entries} onDelete={handleDeleteEntry} />}
        />

        {!user && <Route path="/sign-in" element={<SignInForm />} />}
        {!user && <Route path="/sign-up" element={<SignUpForm />} />}
      </Routes>
>>>>>>> 2fe9bda1c419a618c39a8605383b7a60467c3e53
=======
>>>>>>> 04412e1e4da9d03cbc691c25010c67d7dbe6be37
    </>
  );
};

export default App;
