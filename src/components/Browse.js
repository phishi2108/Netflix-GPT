import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useNowTrending from "../hooks/useNowTrending";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
	useNowPlayingMovies();
	useNowTrending();
	useTopRatedMovies();
	useUpcomingMovies();
	return (
		<div>
			<Header />
			<MainContainer />
			<SecondaryContainer />
		</div>
	);
};

export default Browse;
