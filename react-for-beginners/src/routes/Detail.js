import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getMovie = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setMovie(json.data.movie);
      setLoading(false);
    };

    getMovie();
  }, [id]);
  return (
    <div>
      {loading ? (
        <h1> Movie Loading...</h1>
      ) : (
        <div>
          <img src={movie.medium_cover_image} alt={movie.title}></img>
          <h2> Title : {movie.title}</h2>
          <h3> Movie Genres</h3>
          <ul>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p>Rating : {movie.rating}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
