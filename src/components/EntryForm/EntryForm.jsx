import { useState } from "react";

const EntryForm = (props) => {
  const initialState = {
    title: "",
    description: "",
    entryType: "Lesson",
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

    if (props.selected && props.selected._id && props.handleUpdateEntry) {
      props.handleUpdateEntry(formData, props.selected._id);
    } else if (props.handleAddEntry) {
      props.handleAddEntry(formData);
    }
  };

  // Determine which fields to show based on entry type
  const isLesson = formData.entryType === "Lesson";
  const isAchievement = formData.entryType === "Achievement";

  return (
    <div>
      <h1>{props.selected ? "Edit Entry" : "Create New Entry"}</h1>

      <form onSubmit={handleSubmit}>
        {/* Entry Type */}
        <div>
          <label htmlFor="entryType">Type</label>
          <select
            id="entryType"
            name="entryType"
            value={formData.entryType}
            onChange={handleChange}
            required
          >
            <option value="Lesson">Lesson</option>
            <option value="Achievement">Achievement</option>
          </select>
        </div>

        {/* Entry Category */}
        <div>
          <label htmlFor="entryCategory">Category</label>
          <select
            id="entryCategory"
            name="entryCategory"
            value={formData.entryCategory}
            onChange={handleChange}
            required
          >
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Hobbies">Hobbies</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Give your entry a title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="What happened?"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>

        {/* Conditional Fields for Lesson */}
        {isLesson && (
          <>
            {/* Initial Situation (How I Felt) */}
            <div>
              <label htmlFor="initialSituation">How I Felt</label>
              <textarea
                id="initialSituation"
                name="initialSituation"
                placeholder="What emotions did you experience?"
                value={formData.initialSituation}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {/* Improvement Plan (What I'd Do Differently) */}
            <div>
              <label htmlFor="improvementPlan">What I'd Do Differently</label>
              <textarea
                id="improvementPlan"
                name="improvementPlan"
                placeholder="What would you change next time?"
                value={formData.improvementPlan}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </>
        )}

        {/* Conditional Fields for Achievement */}
        {isAchievement && (
          <>
            {/* Actions Implemented (How I Got There) */}
            <div>
              <label htmlFor="actionsImplemented">How I Got There</label>
              <textarea
                id="actionsImplemented"
                name="actionsImplemented"
                placeholder="What steps did you take?"
                value={formData.actionsImplemented}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {/* Key Outcomes (What Worked Well) */}
            <div>
              <label htmlFor="keyOutcomes">What Worked Well</label>
              <textarea
                id="keyOutcomes"
                name="keyOutcomes"
                placeholder="What strategies were effective?"
                value={formData.keyOutcomes}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </>
        )}

        <button type="submit">
          {props.selected ? "Update Entry" : "Create Entry"}
        </button>
      </form>
    </div>
  );
};

export default EntryForm;
