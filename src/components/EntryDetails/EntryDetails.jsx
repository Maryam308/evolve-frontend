import { useParams } from "react-router";
import { useState, useEffect, useContext } from 'react';
import * as entryService from "../../services/entryService";
import { UserContext } from '../../contexts/UserContext';

const EntryDetails = () => {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [entry, setEntry] = useState(null);
  const [reflectionText, setReflectionText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      const entryData = await entryService.show(entryId);
      setEntry(entryData);
      
    };
    fetchEntry();
  }, [entryId]);

  const handleAddReflection = async (reflectionFormData) => {
    const newReflection = await entryService.createReflection(
      entryId,
      reflectionFormData
    );
    setEntry(newReflection);
  };

  if (!entry) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <h1>{entry.title}</h1>
        <p>{entry.description}</p>
        <p>
          {entry.author.username} posted on{" "}
          {new Date(entry.createdAt).toLocaleDateString()}
        </p>
        <p>Type: {entry.entryType}</p>
        <p>Category: {entry.entryCategory}</p>
        {entry.author._id === user._id && (
              <>
                <button>Delete</button>
              </>
            )}
      </header>

      <section>
        <h2>Entry Details</h2>

        {entry.initialSituation && (
          <div>
            <h3>Initial Situation</h3>
            <p>{entry.initialSituation}</p>
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
        )}
      </section>

      <section>
        <h2>Reflections</h2>

        <ReflectionForm handleAddReflection={handleAddReflection} />

        {!entry.reflections.length && <p>There are no reflections.</p>}

        {entry.reflections.map((reflection) => (
          <article key={reflection._id}>
            <p>{reflection.reflectionText}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

// Reflection Form Component
const ReflectionForm = ({ handleAddReflection }) => {
  const [formData, setFormData] = useState({
    reflectionText: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddReflection(formData);
    setFormData({ reflectionText: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="reflectionText">Add a reflection:</label>
      <textarea
        required
        name="reflectionText"
        id="reflectionText"
        value={formData.reflectionText}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EntryDetails;
