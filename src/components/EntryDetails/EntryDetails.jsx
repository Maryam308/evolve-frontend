import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as entriesService from "../../services/entryService";
import { UserContext } from "../../contexts/UserContext";
import "./EntryDetails.css";

const EntryDetails = (props) => {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [entry, setEntry] = useState(null);
  const [reflectionText, setReflectionText] = useState("");

  useEffect(() => {
    const fetchEntry = async () => {
      if (!entryId || entryId === "undefined") {
        return;
      }
      try {
        const entryData = await entriesService.show(entryId);
        setEntry(entryData);
      } catch (error) {
        console.error("Error fetching entry:", error);
      }
    };
    fetchEntry();
  }, [entryId]);

  const handleAddReflection = async (e) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;

    const newReflection = await entriesService.createReflection(entryId, {
      reflectionText: reflectionText,
    });
    setEntry(newReflection);
    setReflectionText("");
  };

  const handleClose = () => {
    // Determine which page to navigate back to based on the current URL
    const currentPath = window.location.pathname;
    if (currentPath.includes("/achievements/")) {
      navigate("/achievements");
    } else if (currentPath.includes("/lessons/")) {
      navigate("/lessons");
    } else {
      navigate(-1); // Fallback to previous page
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmed) {
      await props.handleDeleteEntry(entryId);
      // Navigate back to the correct list page after deletion
      const currentPath = window.location.pathname;
      if (currentPath.includes("/achievements/")) {
        navigate("/achievements");
      } else if (currentPath.includes("/lessons/")) {
        navigate("/lessons");
      } else {
        navigate(-1);
      }
    }
  };

  // Show loading state if entry is null - MOVE THIS CHECK TO THE TOP
  if (!entry) {
    return (
      <div className="details-overlay">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Determine icon and colors based on entry type - NOW entry is guaranteed to not be null
  const isAchievement = entry.entryType === "achievement";
  const icon = isAchievement ? (
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
      className="lucide lucide-trophy-icon lucide-trophy"
    >
      <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
      <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
      <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
      <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
    </svg>
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
      className="lucide lucide-book-open-icon lucide-book-open"
    >
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );

  // Map entry fields to display sections
  const sections = [];

  if (isAchievement) {
    if (entry.initialSituation) {
      sections.push({
        title: "How I Got There",
        content: entry.initialSituation,
        className: "section-teal",
      });
    }
    if (entry.actionsImplemented) {
      sections.push({
        title: "What Worked Well",
        content: entry.actionsImplemented,
        className: "section-blue",
      });
    }
  } else {
    if (entry.keyOutcomes) {
      sections.push({
        title: "How I Felt",
        content: entry.keyOutcomes,
        className: "section-purple",
      });
    }
    if (entry.improvementPlan) {
      sections.push({
        title: "What I'd Do Differently",
        content: entry.improvementPlan,
        className: "section-pink",
      });
    }
  }

  return (
    <div className="details-overlay" onClick={handleClose}>
      <div className="details-container" onClick={(e) => e.stopPropagation()}>
        {/* Close and Delete buttons */}
        <div className="details-actions">
          {user && entry.author && entry.author._id === user._id && (
            <button
              onClick={handleDelete}
              className="details-delete-btn"
              title="Delete entry"
            >
              <svg
                className="btn-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
          <button
            onClick={handleClose}
            className="details-close-btn"
            title="Close"
          >
            <svg
              className="btn-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="details-content">
          {/* Header */}
          <div className="details-header">
            <div
              className={`details-icon-box ${
                isAchievement ? "icon-achievement" : "icon-lesson"
              }`}
            >
              <span className="details-icon-emoji">{icon}</span>
            </div>
            <div className="details-header-text">
              <h1 className="details-title">{entry.title}</h1>
              <div className="details-meta">
                <div className="meta-tag">
                  <svg
                    className="meta-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {new Date(entry.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="meta-tag">
                  <svg
                    className="meta-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span>{entry.entryCategory}</span>
                </div>
                <span
                  className={`details-badge ${
                    isAchievement ? "badge-achievement" : "badge-lesson"
                  }`}
                >
                  {entry.entryType}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          {entry.description && (
            <div className="details-description">
              <h2 className="details-section-title">Description</h2>
              <p className="details-description-text">{entry.description}</p>
            </div>
          )}

          {/* Dynamic Sections */}
          {sections.length > 0 && (
            <div className="details-sections">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`details-section ${section.className}`}
                >
                  <h3 className="details-section-heading">
                    <svg className="section-icon" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="8" opacity="0.2" />
                      <circle cx="10" cy="10" r="3" />
                    </svg>
                    {section.title}
                  </h3>
                  <p className="details-section-text">{section.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* Reflections Section */}
          <div className="details-reflections">
            <h2 className="details-reflections-title">
              <svg
                className="reflections-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Reflections ({entry.reflections?.length || 0})
            </h2>

            {/* Reflection Form */}
            <form onSubmit={handleAddReflection} className="reflection-form">
              <input
                type="text"
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Add a reflection..."
                className="reflection-input"
              />
              <button type="submit" className="reflection-btn">
                Add
              </button>
            </form>

            {/* Reflections List */}
            {!entry.reflections?.length ? (
              <p className="no-reflections">No reflections yet.</p>
            ) : (
              <div className="reflections-list">
                {entry.reflections.map((reflection) => (
                  <div key={reflection._id} className="reflection-item">
                    <svg
                      className="reflection-quote-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="reflection-text">
                      {reflection.reflectionText}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryDetails;
