import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { NotFound } from "./NotFound";

export const Details = () => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=8092261de010896c13c23d2f471ef156&language=en-US`;
        const response = await axios.get(url);
        setMovie(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {isLoading && (
        <div className="py-6 text-center text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-2"></div>
          Loading more posts...
        </div>
      )}

      {error && <NotFound/>}

      {!isLoading && !error ? (
        <div className="container m-auto mt-4">
          <div className="bg-gray-100 mx-10 p-4 flex flex-col md:flex-row gap-5 rounded-lg">
            <div className="w-3/4 m-auto basis-2/4 xl:basis-1/4">
              <img
                loading="lazy"
                className="w-full h-80 object-cover rounded-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="Card image"
              />
            </div>
            <div className="basis-3/4 text-center leading-10 my-auto text-2xl font-bold text-gray-700 tracking-wide">
              <p>Film Name : {movie.original_title}</p>
              <p>Release Date : {movie.release_date}</p>
              <p>Vote Count : {movie.vote_count}</p>
              <p>Vote Average : {movie.vote_average}</p>
            </div>
          </div>

          <div className="bg-gray-100 mx-10 mt-3 p-4 rounded-lg">
            <div className="text-2xl font-bold h-12">Story :</div>
            <div className="min-h-20">{movie.overview}</div>
          </div>

          <div className="w-2/4 m-auto flex flex-col sm:flex-row justify-center items-center gap-4 my-4">
            <Link
              to="/"
              className="bg-orange-700 text-white px-6 py-4 rounded-lg text-center w-full sm:w-auto">
              Home Page
            </Link>

            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-700 text-white px-6 py-4 rounded-lg text-center w-full sm:w-auto">
              Watch Film
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
