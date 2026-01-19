import { useEffect, useState } from "react";
import { Movie } from "../components/Movie";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getAllMovies } from "../redux/reducer";
const apiKey = process.env.REACT_APP_API_KEY;

export const AllMovies = ({ searchedWord }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const dispatch = useDispatch();

  const data = useSelector((state) => state.movies);
  const moviesCount = useSelector((state) => state.moviesCount);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    let url;
    if (searchedWord === "")
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${
        pageNum + 1
      }`;
    else
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchedWord}&language=en-US`;

    dispatch(getAllMovies(url));
  }, [dispatch, pageNum, searchedWord]);

  useEffect(() => { 
    setAllMovies(data);
  }, [data]);

  const handlePageClick = (event) => {
    setPageNum(event.selected);
  };

  return (
    <div className="container m-auto mt-5 ">
      {isLoading && (
        <div className="py-6 text-center text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-2"></div>
          Loading more posts...
        </div>
      )}

      {error && <p className="text-red-500">{error.message || error}</p>}

      {!error && !isLoading && (
        <>
          {moviesCount ? (
            <>
              <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.isArray(allMovies) && allMovies.length > 0
                  ? allMovies.map((film) => {
                      return (
                        <Movie
                          key={film.id}
                          id={film.id}
                          posterPath={film.poster_path}
                          originalTitle={film.original_title}
                          releaseDate={film.release_date}
                          voteCount={film.vote_count}
                          voteAverage={film.vote_average}
                        />
                      );
                    })
                  : ""}
              </div>
              <div>
                {moviesCount ? (
                  <Pagination handlePageClick={handlePageClick} pageNum={pageNum}/>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-5xl mt-20">
              The Film Is Not Exist{" "}
            </div>
          )}
        </>
      )}
    </div>
  );
};
