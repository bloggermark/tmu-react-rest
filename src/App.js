import React, { useEffect, useState } from "react";
import "./styles.css";

const SERVER_URL = "https://r7rmr.sse.codesandbox.io/";

export default function App() {
  const movie = useQueryMovie({ year: 1977 });

  return (
    <div className="App">
      <h1>This is a React App</h1>
      <h2>We are using a REST API to get the following data</h2>
      {movie.title ? (
        <div>
          <p>Movie Title: {movie.title}</p>
          <p>Director: {movie.directors[0] ? movie.directors[0] : ""}</p>
          <p>Movie Year: {movie.year}</p>
          <p>Cast:</p>
          <ul>
            {movie.cast.map((value, index) => (
              <li key={index.toString()}>{value}</li>
            ))}
          </ul>
          <p>Awards: {movie.awards.wins}</p>
        </div>
      ) : (
        <p>No Titles Found!</p>
      )}
    </div>
  );
}

function useQueryMovie(query) {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    })
      .then((res) => res.json())
      .then((y) => setMovie(y));
  }, []);
  if (movie === null) {
    console.log(`Asking for movie with ${JSON.stringify(query)}`);
    return { title: false };
  } else {
    console.log(`Matched: ${movie.title}`);
    return movie;
  }
}
