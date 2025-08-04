import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import { netflix_bg_url } from "../utils/constants";

const GptSearch = () => {
	return (
		<div className="relative w-full min-h-screen">
			{/* Background Image */}
			<img
				src={netflix_bg_url}
				alt="netflix_bg_login"
				className="absolute top-0 left-0 w-full h-full object-cover"
			/>

			{/* Dark overlay */}
			<div className="absolute inset-0 bg-black opacity-70 z-10"></div>

			{/* Content over the overlay */}
			<div className="relative z-20 w-full">
				<GptSearchBar />
				<GptMovieSuggestions />
			</div>
		</div>
	);
};

export default GptSearch;
