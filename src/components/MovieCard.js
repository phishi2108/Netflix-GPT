import { Card_Poster_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
	if (!posterPath) return null;

	return (
		<div className="min-w-[150px] md:min-w-[180px] rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-200 bg-gray-900 no-scrollbar">
			<img
				alt="Movie Poster"
				src={Card_Poster_URL + posterPath}
				className="w-full h-full object-cover"
			/>
		</div>
	);
};

export default MovieCard;
