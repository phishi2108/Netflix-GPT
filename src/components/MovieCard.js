import { Card_Poster_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
	return (
		<div className="w-48 ">
			<img alt="Movie_Card" src={Card_Poster_URL + posterPath}></img>
		</div>
	);
};

export default MovieCard;
