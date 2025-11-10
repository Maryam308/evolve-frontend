import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as entryService from "../../services/entryService";
import EntryForm from "../EntryForm/EntryForm";
import "./EntryListPage.css";

const EntryListPage = ({ pageType }) => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const categories = [
    { id: "all", label: "All", icon: "✨", color: "#8b5cf6" },
    { id: "career", label: "Career", icon: "🎯", color: "#3b82f6" },
    {
      id: "relationships",
      label: "Relationships",
      icon: "💗",
      color: "#ec4899",
    },
    { id: "hobbies", label: "Hobbies", icon: "💡", color: "#f59e0b" },
    { id: "personal", label: "Personal", icon: "👤", color: "#14b8a6" },
  ];

  useEffect(() => {
    fetchEntries();
  }, [pageType]);

  const fetchEntries = async () => {
    try {
      const fetchedEntries = await entryService.index();
      // Filter by page type (achievement or lesson)
      const typeFiltered = fetchedEntries.filter(
        (entry) => entry.entryType?.toLowerCase() === pageType
      );
      setEntries(typeFiltered);
      setFilteredEntries(typeFiltered);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredEntries(entries);
    } else {
      setFilteredEntries(
        entries.filter(
          (entry) => entry.entryCategory?.toLowerCase() === selectedCategory
        )
      );
    }
  }, [selectedCategory, entries]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleNewEntry = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleAddEntry = async (formData) => {
    try {
      const newEntry = await entryService.create(formData);
      if (newEntry.err) throw new Error(newEntry.err);
      setIsFormOpen(false);
      fetchEntries(); // Refresh entries after adding
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewDetails = (entryId) => {
    navigate(`/entries/${entryId}`);
  };

  const getCategoryIcon = (entryCategory) => {
    const cat = categories.find((c) => c.id === entryCategory?.toLowerCase());
    return cat ? cat.icon : "💡";
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
            {filteredEntries.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✨</div>
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
              <div className="entries-grid">
                {filteredEntries.map((entry) => (
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
                            📅{" "}
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
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <footer className="page-footer">
        © All Rights Reserved - Evolve 2025
      </footer>

      {/* Form Popup Modal */}
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
              defaultType={
                pageType === "achievement" ? "Achievement" : "Lesson"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryListPage;
