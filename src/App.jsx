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

  // Check if we're on modal overlay pages
  const isModalPage =
    location.pathname.includes("/entries/") ||
    location.pathname === "/sign-in" ||
    location.pathname === "/sign-up";

  useEffect(() => {
    const fetchAllEntries = async () => {
      const entriesData = await entriesService.index();
      setEntries(entriesData);
    };
    if (user) fetchAllEntries();
  }, [user]);

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

  return (
    <>
      <NavBar />

      {/* Main content area */}
      <div
        className={isModalPage ? "main-content-with-overlay" : "main-content"}
      >
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/entries" element={<EntryList entries={entries} />} />
          {/* Entry list pages with form popups */}
          <Route
            path="/achievements"
            element={<EntryListPage pageType="achievement" />}
          />
          <Route
            path="/lessons"
            element={<EntryListPage pageType="lesson" />}
          />
        </Routes>
      </div>

      {/* Modal overlays - rendered outside main content */}
      <Routes>
        <Route
          path="/entries/:entryId"
          element={<EntryDetails handleDeleteEntry={handleDeleteEntry} />}
        />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
      </Routes>
    </>
  );
};

export default App;
