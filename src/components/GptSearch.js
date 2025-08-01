import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import { netflix_bg_url } from "../utils/constants";

const GptSearch = () => {
	return (
		<div className="relative h-screen w-full">
			{/* Background Image */}
			<img
				src={netflix_bg_url}
				alt="netflix_bg_login"
				className="w-full h-full object-cover"
			/>

			{/* Dark overlay */}
			<div className="absolute inset-0 bg-black opacity-70 z-10"></div>

			{/* Content over the overlay */}
			<div className="absolute inset-0 z-20">
				<GptSearchBar />
				<GptMovieSuggestions />
			</div>
		</div>
	);
};

export default GptSearch;
