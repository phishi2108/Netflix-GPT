import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useNowTrending from "../hooks/useNowTrending";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
	const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
	useNowPlayingMovies();
	useNowTrending();
	useTopRatedMovies();
	useUpcomingMovies();
	return (
		<div>
			<Header />
			{showGptSearch ? (
				<GptSearch />
			) : (
				<>
					<MainContainer />
					<SecondaryContainer />
				</>
			)}
		</div>
	);
};

export default Browse;
