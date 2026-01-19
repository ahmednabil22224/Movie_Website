import React from "react";
import { Link } from "react-router-dom";

export const Movie = React.memo((props) => {
  return (
    <div className="relative max-h-96 rounded overflow-hidden shadow-lg transition duration-500">
      <Link to={`/movie/${props.id}`}>
        <img
          loading="lazy"
          className="aspect-[2/3] w-full object-cover"
          src={`https://image.tmdb.org/t/p/w300${props.posterPath}`}
          alt="Card image"
        />

        <div className="absolute top-0 left-0 w-full h-full p-11 bg-black text-white opacity-0 z-50 flex flex-col justify-center items-center gap-5 hover:opacity-50 transition duration-500">
          <p>Film Name : {props.originalTitle}</p>
          <p>Release Date : {props.releaseDate}</p>
          <p>Vote Count : {props.voteCount}</p>
          <p>Vote Average : {props.voteAverage}</p>
        </div>
      </Link>
    </div>
  );
});
