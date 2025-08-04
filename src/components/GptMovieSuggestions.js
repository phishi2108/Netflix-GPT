import { useSelector } from "react-redux";
import MovieLists from "./MovieLists";

const GptMovieSuggestions = () => {
	const { movieNames, movieResults } = useSelector((store) => store.gpt);

	if (!movieNames || !movieResults) return null;

	// Extract top movie from each result
	const topMovies = movieResults
		.map((movieList) => movieList?.[0])
		.filter((movie) => movie); // Remove null/undefined

	return (
		<div className="bg-black text-white px-4 py-10">
			<h2 className="text-3xl font-bold mb-8 text-center">
				🎬 Recommended Movies
			</h2>

			{/* Horizontal scrollable list */}
			<div className="overflow-x-auto scrollbar-hide">
				<MovieLists title="Top Picks for You" movies={topMovies} />
			</div>
		</div>
	);
};

export default GptMovieSuggestions;
