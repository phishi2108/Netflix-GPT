import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
	const movies = useSelector((store) => store.movies?.nowPlayingMovies);
	if (movies == null) return;
	const mainMovie = movies[1];
	const { original_title, overview, id } = mainMovie;

	return (
		<div className="bg-red-100 w-full  overflow-x-hidden overflow-y-hidden aspect-video">
			<VideoTitle  title={original_title} overview={overview} />
			<VideoBackground TrailerId ={id}/>
		</div>
	);
};

export default MainContainer;
