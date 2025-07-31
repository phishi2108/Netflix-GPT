import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowTrendingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useNowTrending = () => {
	const dispatch = useDispatch();

	const getNowTrendingMovies = async () => {
		const data = await fetch(
			"https://api.themoviedb.org/3/movie/popular?page=1 ",
			API_OPTIONS
		);
		const json = await data.json();
		console.log(json);
		dispatch(addNowTrendingMovies(json.results));
	};
	useEffect(() => {
		getNowTrendingMovies();
	}, []);
};

export default useNowTrending;
