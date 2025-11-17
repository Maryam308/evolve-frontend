import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as entryService from "../../services/entryService";
import EntryForm from "../EntryForm/EntryForm";
import "./EntryListPage.css";
import Footer from "../Footer/Footer";

const EntryListPage = ({ pageType }) => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(6);

  // Sort state
  const [sortOrder, setSortOrder] = useState("newest");

  const categories = [
    {
      id: "all",
      label: "All",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-sparkle-icon lucide-sparkle"
        >
          <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
        </svg>
      ),
      color: "#8b5cf6",
    },
    {
      id: "career",
      label: "Career",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-goal-icon lucide-goal"
        >
          <path d="M12 13V2l8 4-8 4" />
          <path d="M20.561 10.222a9 9 0 1 1-12.55-5.29" />
          <path d="M8.002 9.997a5 5 0 1 0 8.9 2.02" />
        </svg>
      ),
      color: "#3b82f6",
    },
    {
      id: "relationships",
      label: "Relationships",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-heart-icon lucide-heart"
        >
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>
      ),
      color: "#ec4899",
    },
    {
      id: "hobbies",
      label: "Hobbies",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-lightbulb-icon lucide-lightbulb"
        >
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
      ),
      color: "#f59e0b",
    },
    {
      id: "personal",
      label: "Personal",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-icon lucide-user"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      color: "#14b8a6",
    },
  ];

  useEffect(() => {
    fetchEntries();
  }, [pageType]);

  const fetchEntries = async () => {
    try {
      const fetchedEntries = await entryService.index();
      const typeFiltered = fetchedEntries.filter(
        (entry) => entry.entryType?.toLowerCase() === pageType
      );
      setEntries(typeFiltered);
      setFilteredEntries(typeFiltered);
      setCurrentPage(1);
    } catch (err) {
      console.log(err);
    }
  };

  const sortEntriesByDate = (entriesToSort, order) => {
    return [...entriesToSort].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === "newest" ? dateB - dateA : dateA - dateB;
    });
  };

  useEffect(() => {
    let filtered = entries;

    if (selectedCategory !== "all") {
      filtered = entries.filter(
        (entry) => entry.entryCategory?.toLowerCase() === selectedCategory
      );
    }

    const sorted = sortEntriesByDate(filtered, sortOrder);
    setFilteredEntries(sorted);
    setCurrentPage(1);
  }, [selectedCategory, entries, sortOrder]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleNewEntry = () => {
    setEditingEntry(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingEntry(null);
  };

  const handleAddEntry = async (formData) => {
    try {
      const newEntry = await entryService.create(formData);
      if (newEntry.err) throw new Error(newEntry.err);
      setIsFormOpen(false);
      fetchEntries();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditEntry = async (entryId) => {
    try {
      const entry = await entryService.show(entryId);

      const completeEntry = {
        ...entry,
        title: entry.title || "",
        description: entry.description || "",
        entryType:
          entry.entryType ||
          (pageType === "achievement" ? "Achievement" : "Lesson"),
        entryCategory: entry.entryCategory || "Career",
        initialSituation: entry.initialSituation || "",
        actionsImplemented: entry.actionsImplemented || "",
        keyOutcomes: entry.keyOutcomes || "",
        improvementPlan: entry.improvementPlan || "",
      };

      setEditingEntry(completeEntry);
      setIsFormOpen(true);
    } catch (err) {
      console.log("Error fetching entry for edit:", err);
    }
  };

  const handleUpdateEntry = async (formData, entryId) => {
    try {
      const updatedEntry = await entryService.update(entryId, formData);
      if (updatedEntry.err) throw new Error(updatedEntry.err);
      setIsFormOpen(false);
      setEditingEntry(null);
      fetchEntries();
    } catch (err) {
      console.log("Error updating entry:", err);
    }
  };

  const handleViewDetails = (entryId) => {
    navigate(
      `/${
        pageType === "achievement" ? "achievements" : "lessons"
      }/entries/${entryId}`
    );
  };

  const getCategoryIcon = (entryCategory) => {
    const cat = categories.find((c) => c.id === entryCategory?.toLowerCase());
    return cat ? (
      cat.icon
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-lightbulb-icon lucide-lightbulb"
      >
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    );
  };

  const getCategoryColor = (entryCategory) => {
    const cat = categories.find((c) => c.id === entryCategory?.toLowerCase());
    return cat ? cat.color : "#8b5cf6";
  };

  const getCategoryLabel = (entryCategory) => {
    const cat = categories.find((c) => c.id === entryCategory?.toLowerCase());
    return cat ? cat.label : entryCategory;
  };

  return (
    <div className="entry-list-page-wrapper">
      <div className="entry-list-page">
        <div className="entry-list-container">
          <div className="entry-list-header">
            <button onClick={handleNewEntry} className="new-entry-button">
              New Entry
            </button>
          </div>

          <div className="page-content">
            <aside className="categories-sidebar">
              <h3 className="sidebar-title">CATEGORIES</h3>
              <div className="category-list">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-item ${
                      selectedCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-label">{category.label}</span>
                  </button>
                ))}
              </div>
            </aside>

            <main className="entries-main">
              {filteredEntries.length > 0 && (
                <div className="sort-controls">
                  <label htmlFor="sort-select" className="sort-label">
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortOrder}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="sort-select"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              )}

              {filteredEntries.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-sparkle-icon lucide-sparkle"
                    >
                      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                    </svg>
                  </div>
                  <h2 className="empty-title">Start Your Journey</h2>
                  <p className="empty-description">
                    Create your first entry to begin tracking your growth
                  </p>
                  <button
                    onClick={handleNewEntry}
                    className="create-entry-button"
                  >
                    Create Entry
                  </button>
                </div>
              ) : (
                <>
                  <div className="entries-grid">
                    {currentEntries.map((entry) => (
                      <div key={entry._id} className="entry-card">
                        <div className="entry-card-header">
                          <div
                            className="entry-icon"
                            style={{
                              backgroundColor: getCategoryColor(
                                entry.entryCategory
                              ),
                            }}
                          >
                            {getCategoryIcon(entry.entryCategory)}
                          </div>
                          <div className="entry-meta">
                            <h3 className="entry-title">{entry.title}</h3>
                            <div className="entry-info">
                              <span className="entry-date">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-calendar-icon lucide-calendar"
                                >
                                  <path d="M8 2v4" />
                                  <path d="M16 2v4" />
                                  <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="4"
                                    rx="2"
                                  />
                                  <path d="M3 10h18" />
                                </svg>{" "}
                                {new Date(entry.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                              <span className="entry-subcategory">
                                {getCategoryLabel(entry.entryCategory)}
                              </span>
                              <span className="entry-type-badge">
                                {entry.entryType}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="entry-description">
                          {entry.description?.substring(0, 200)}
                          {entry.description?.length > 200 ? "..." : ""}
                        </p>

                        <button
                          onClick={() => handleViewDetails(entry._id)}
                          className="view-details-button"
                        >
                          View Details
                        </button>
                        <br />
                        <button
                          onClick={() => handleEditEntry(entry._id)}
                          className="view-details-button"
                        >
                          Edit Entry
                        </button>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="pagination">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-button"
                      >
                        Previous
                      </button>

                      <div className="pagination-numbers">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`pagination-number ${
                              currentPage === number ? "active" : ""
                            }`}
                          >
                            {number}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-button"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />

      {isFormOpen && (
        <div className="form-modal-overlay" onClick={handleCloseForm}>
          <div
            className="form-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="form-close-button" onClick={handleCloseForm}>
              ✕
            </button>
            <EntryForm
              handleAddEntry={handleAddEntry}
              handleUpdateEntry={handleUpdateEntry}
              selected={editingEntry}
              defaultType={
                pageType === "achievement" ? "Achievement" : "Lesson"
              }
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryListPage;
