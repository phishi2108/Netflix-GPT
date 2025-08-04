import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import lang from "../utils/languagueConstants";
import { addGptMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
	const dispatch = useDispatch();
	const langState = useSelector((store) => store.config.lang);
	const inputRef = useRef(null);
	const [loading, setLoading] = useState(false);

	const fetchMovieFromTmdb = async (title) => {
		const response = await fetch(
			`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
				title
			)}&include_adult=false&language=en-US&page=1`,
			API_OPTIONS
		);
		const data = await response.json();
		return data.results;
	};

	const handleGPTSearchClick = async () => {
		const prompt = inputRef.current.value;
		if (!prompt) return;

		setLoading(true);
		let recommendedMovies = [];

		try {
			const response = await fetch("http://localhost:5000/api/ask", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt }),
			});
			const data = await response.json();
			recommendedMovies = data?.reply?.movie_titles || [];
		} catch (err) {
			console.error("GPT fetch error:", err);
		} finally {
			setLoading(false);
		}

		const tmdbResults = await Promise.all(
			recommendedMovies.map(fetchMovieFromTmdb)
		);

		dispatch(
			addGptMovieResults({
				movieNames: recommendedMovies,
				movieResults: tmdbResults,
			})
		);
	};

	return (
		<div className="pt-[20%] flex flex-col items-center">
			<form
				className="w-1/2 bg-black grid rounded-lg grid-cols-12"
				onSubmit={(e) => e.preventDefault()}
			>
				<input
					ref={inputRef}
					type="text"
					className="p-4 m-4 col-span-9 rounded-md"
					placeholder={lang[langState].gptSearchPlaceholder}
				/>
				<button
					onClick={handleGPTSearchClick}
					disabled={loading}
					className="col-span-3 rounded-md m-4 bg-red-500 text-white"
				>
					{loading ? "Loading..." : lang[langState].search}
				</button>
			</form>
		</div>
	);
};

export default GptSearchBar;
