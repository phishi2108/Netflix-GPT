import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ TrailerId }) => {
	//FETCHING THE TRAILER VIDEO AND UPDATING THE TRAILER IN THE STORE

	const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

	useMovieTrailer(TrailerId);

	return (
		<div className="w-full h-screen no-scrollbar">
			<iframe
				className="w-full h-full aspect-video"
				src={
					"https://www.youtube.com/embed/" +
					trailerVideo?.key +
					"?autoplay=1&mute=1&controls=0&loop=1"
				}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			></iframe>
		</div>
	);
};

export default VideoBackground;
