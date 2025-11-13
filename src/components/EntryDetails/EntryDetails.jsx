import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useContext } from 'react';
import * as entryService from "../../services/entryService";
import { UserContext } from '../../contexts/UserContext';

const EntryDetails = () => {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const entryData = await entryService.show(entryId);
        setEntry(entryData);
      } catch (err) {
        console.error('Error fetching entry:', err);
      }
    };
    fetchEntry();
  }, [entryId]);

  const handleAddReflection = async (reflectionFormData) => {
    try {
      const updatedEntry = await entryService.createReflection(
        entryId,
        reflectionFormData
      );
      setEntry(updatedEntry);
    } catch (err) {
      console.error('Error adding reflection:', err);
    }
  };

  const handleDeleteEntry = async () => {
    try {
      const result = await entryService.deleteEntry(entryId);
      if (result.err) {
        throw new Error(result.err);
      }
      navigate('/entries');
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  const handleEditEntry = () => {
    if (props.onEditEntry) {
      props.onEditEntry(entry);
    }
  };

  if (!entry) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <h1>{entry.title}</h1>
        <p>{entry.description}</p>
        {entry.author && (
          <p>
            {entry.author.username} posted on{" "}
            {new Date(entry.createdAt).toLocaleDateString()}
          </p>
        )}
        <p>Type: {entry.entryType}</p>
        <p>Category: {entry.entryCategory}</p>
        {entry.author && entry.author._id === user._id && (
          <>
            <button onClick={handleEditEntry}>Edit</button>
            <button onClick={handleDeleteEntry}>Delete</button>
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
        )}

        {entry.actionsImplemented && (
          <div>
            <h3>Actions Implemented</h3>
            <p>{entry.actionsImplemented}</p>
          </div>
        )}

        {entry.keyOutcomes && (
          <div>
            <h3>Key Outcomes</h3>
            <p>{entry.keyOutcomes}</p>
          </div>
        )}

        {entry.improvementPlan && (
          <div>
            <h3>Improvement Plan</h3>
            <p>{entry.improvementPlan}</p>
          </div>
        )}
      </section>

      <section>
        <h2>Reflections</h2>

        <ReflectionForm handleAddReflection={handleAddReflection} />

        {(!entry.reflections || entry.reflections.length === 0) && (
          <p>There are no reflections.</p>
        )}

        {entry.reflections && entry.reflections.length > 0 && (
          entry.reflections.map((reflection) => (
            <article key={reflection._id}>
              <p>{reflection.reflectionText}</p>
            </article>
          ))
        )}
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
