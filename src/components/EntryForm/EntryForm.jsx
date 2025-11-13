import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EntryForm.css";

const EntryForm = (props) => {
  const navigate = useNavigate();

  const initialState = {
    title: "",
    description: "",
    entryType: props.defaultType || "Lesson", // Changed to capitalized
    entryCategory: "Career",
    initialSituation: "",
    actionsImplemented: "",
    keyOutcomes: "",
    improvementPlan: "",
  };

  const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  );

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (props.selected && props.selected._id) {
      props.handleUpdateEntry(formData, props.selected._id);
    } else {
      props.handleAddEntry(formData);
    }
  };

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    } else {
      navigate(-1);
    }
  };

  // Determine which fields to show based on entry type
  const isLesson = formData.entryType === "Lesson"; // Changed to capitalized
  const isAchievement = formData.entryType === "Achievement"; // Changed to capitalized

  return (
    <div className="entry-form-overlay" onClick={handleClose}>
      <div
        className="entry-form-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="form-close-button" onClick={handleClose}>
          ×
        </button>

        {/* Form Header */}
        <div className="form-header">
          <h1 className="form-title">Create New Entry</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="entry-form">
          {/* Entry Type */}
          <div className="form-group">
            <label htmlFor="entryType">Type</label>
            <select
              id="entryType"
              name="entryType"
              value={formData.entryType}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="Lesson">Lesson</option> {/* Capitalized */}
              <option value="Achievement">Achievement</option>{" "}
              {/* Capitalized */}
            </select>
          </div>

          {/* Entry Category */}
          <div className="form-group">
            <label htmlFor="entryCategory">Category</label>
            <select
              id="entryCategory"
              name="entryCategory"
              value={formData.entryCategory}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Hobbies">Hobbies</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Give your entry a title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="What happened?"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="form-textarea"
            />
          </div>

          {/* Conditional Fields for Achievement */}
          {isAchievement && (
            <>
              {/* How I Got There */}
              <div className="form-group">
                <label htmlFor="initialSituation">How I Got There</label>
                <textarea
                  id="initialSituation"
                  name="initialSituation"
                  placeholder="What steps did you take?"
                  value={formData.initialSituation}
                  onChange={handleChange}
                  rows="3"
                  className="form-textarea"
                />
              </div>

              {/* What Worked Well */}
              <div className="form-group">
                <label htmlFor="actionsImplemented">What Worked Well</label>
                <textarea
                  id="actionsImplemented"
                  name="actionsImplemented"
                  placeholder="What strategies were effective?"
                  value={formData.actionsImplemented}
                  onChange={handleChange}
                  rows="3"
                  className="form-textarea"
                />
              </div>
            </>
          )}

          {/* Conditional Fields for Lesson */}
          {isLesson && (
            <>
              {/* How I Felt */}
              <div className="form-group">
                <label htmlFor="keyOutcomes">How I Felt</label>
                <textarea
                  id="keyOutcomes"
                  name="keyOutcomes"
                  placeholder="What emotions did you experience?"
                  value={formData.keyOutcomes}
                  onChange={handleChange}
                  rows="3"
                  className="form-textarea"
                />
              </div>

              {/* What I'd Do Differently */}
              <div className="form-group">
                <label htmlFor="improvementPlan">What I'd Do Differently</label>
                <textarea
                  id="improvementPlan"
                  name="improvementPlan"
                  placeholder="What would you change next time?"
                  value={formData.improvementPlan}
                  onChange={handleChange}
                  rows="3"
                  className="form-textarea"
                />
              </div>
            </>
          )}

          <button type="submit" className="form-submit-button">
            {props.selected ? "Update Entry" : "Create Entry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EntryForm;
