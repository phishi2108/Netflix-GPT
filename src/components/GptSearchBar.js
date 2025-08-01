import { useSelector } from "react-redux";
import lang from "../utils/languagueConstants";

const GptSearchBar = () => {
  const lang_toggle_state = useSelector(store => store.config.lang)
	return (
		<div className="pt-[20%] flex justify-center">
			{" "}
			<form className="w-1/2  bg-black grid  rounded-lg grid-cols-12">
				<input
					type="text"
					className="p-4 m-4 col-span-9 rounded-md"
					placeholder={lang[lang_toggle_state].gptSearchPlaceholder}
				/>
				<button className="col-span-3 rounded-md m-4 bg-red-500 text-white ">
					{lang[lang_toggle_state].search}
				</button>
			</form>
		</div>
	);
};

export default GptSearchBar;
