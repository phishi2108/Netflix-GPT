import { useSelector } from "react-redux";
import MovieLists from "./MovieLists";

const SecondaryContainer = () => {
	const movies = useSelector((store) => store.movies);

	return (
		<div className="bg-black">
			{/* MovieList - popular
      Movie-cards*n
    MovieList - nowPlaying
    MovieList - Trending
    MovieList - Horror */}
			<div className="-mt-20">
				<MovieLists title={"Now Playing"} movies={movies.nowPlayingMovies} />
				<MovieLists title={"Top Rated"} movies={movies.topRatedMovies} />
				<MovieLists title={"Trending"} movies={movies.nowTrendingMovies} />
				<MovieLists title={"Upcoming"} movies={movies.upcomingMovies} />
			</div>
		</div>
	);
};

export default SecondaryContainer;
