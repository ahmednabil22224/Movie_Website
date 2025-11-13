import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const Details = () => {
  const [data, setData] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=8092261de010896c13c23d2f471ef156&language=en-US`;
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="container m-auto mt-4">
      <div className="bg-gray-100 mx-10 p-4 flex flex-col md:flex-row gap-5 rounded-lg">
        <div className="w-3/4 m-auto basis-2/4 xl:basis-1/4">
          <img
            loading="lazy"
            className="w-full h-80 object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt="Card image"
          />
        </div>
        <div className="basis-3/4 text-center leading-10 my-auto text-2xl font-bold text-gray-700 tracking-wide">
          <p>Film Name : {data.original_title}</p>
          <p>Release Date : {data.release_date}</p>
          <p>Vote Count : {data.vote_count}</p>
          <p>Vote Average : {data.vote_average}</p>
        </div>
      </div>

      <div className="bg-gray-100 mx-10 mt-3 p-4 rounded-lg">
        <div className="text-2xl font-bold h-12">Story :</div>
        <div className="min-h-20">{data.overview}</div>
      </div>

      <div className="w-2/4 m-auto flex flex-col sm:flex-row justify-center items-center gap-4 my-4">
        <Link
          to="/"
          className="bg-orange-700 text-white px-6 py-4 rounded-lg text-center w-full sm:w-auto">
          Home Page
        </Link>

        <a
          href={data.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-700 text-white px-6 py-4 rounded-lg text-center w-full sm:w-auto">
          Watch Film
        </a>
      </div>
    </div>
  );
};
