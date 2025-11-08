import { Link } from "react-router";
const EntryList = (props) => {
  return (
    <main>
      {props.entries.map((entry) => (
        <Link key={entry._id} to={`/entries/${entry._id}`}>
          <article>
            <header>
              <h2>{entry.title}</h2>
            </header>
            <p>{entry.description}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default EntryList;
