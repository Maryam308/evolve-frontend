import { useParams } from "react-router";
import { useState, useEffect, useContext } from 'react';
import * as entryService from "../../services/entryService";
import { UserContext } from '../../contexts/UserContext';

const EntryDetails = () => {
  const { entryId } = useParams();
   const { user } = useContext(UserContext);
  const [entry, setEntry] = useState(null);

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
