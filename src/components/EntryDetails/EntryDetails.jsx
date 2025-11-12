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
      const entryData = await entriesService.show(entryId);
      setEntry(entryData);
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
    navigate(-1);
  };

  const handleDelete = async () => {
    await props.handleDeleteEntry(entryId);
  };

  if (!entry) {
    return (
      <div className="modal-overlay">
        <div className="loading-card">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Determine icon and colors based on entry type
  const isAchievement = entry.entryType === "achievement";
  const icon = isAchievement ? "🏆" : "📖";

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
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close and Delete buttons */}
        <div className="action-buttons">
          {entry.author._id === user._id && (
            <button onClick={handleDelete} className="delete-button">
              <svg
                className="icon"
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
          <button onClick={handleClose} className="close-button">
            <svg
              className="icon"
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
        <div className="modal-content">
          {/* Header */}
          <div className="entry-header">
            <div className="icon-box">
              <span className="icon-emoji">{icon}</span>
            </div>
            <div className="header-text">
              <h1 className="entry-title">{entry.title}</h1>
              <div className="entry-metadata">
                <div className="meta-item">
                  <svg
                    className="small-icon"
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
                <div className="meta-item">
                  <svg
                    className="small-icon"
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
                  className={`entry-badge ${
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
            <div className="description-section">
              <h2 className="section-title">Description</h2>
              <p className="description-text">{entry.description}</p>
            </div>
          )}

          {/* Dynamic Sections */}
          <div className="sections-container">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`colored-section ${section.className}`}
              >
                <h3 className="colored-section-title">
                  <svg className="section-icon" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" opacity="0.2" />
                    <circle cx="10" cy="10" r="3" />
                  </svg>
                  {section.title}
                </h3>
                <p className="colored-section-content">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Reflections Section */}
          <div className="reflections-section">
            <h2 className="reflections-title">
              Reflections ({entry.reflections?.length || 0})
            </h2>

            {/* Reflection Form */}
            <div className="reflection-form">
              <input
                type="text"
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddReflection(e);
                  }
                }}
                placeholder="Add a reflection..."
                className="reflection-input"
              />
              <button onClick={handleAddReflection} className="add-button">
                Add
              </button>
            </div>

            {/* Reflections List */}
            {!entry.reflections?.length ? (
              <p className="no-reflections">No reflections yet</p>
            ) : (
              <div className="reflections-list">
                {entry.reflections.map((reflection) => (
                  <div key={reflection._id} className="reflection-item">
                    {reflection.reflectionText}
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
