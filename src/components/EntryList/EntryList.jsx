import { Link } from "react-router";

const EntryList = (props) => {
  return (
    <main>
      {props.entries.map((entry) => (
        <article key={entry._id}>
          <Link to={`/entries/${entry._id}`}>
            <header>
              <h2>{entry.title}</h2>
            </header>
          </Link>
        </article>
      ))}
    </main>
  );
};

export default EntryList;

