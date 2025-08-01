import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { icon_url, netflix_logo, supported_lang } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
	

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {})
			.catch((error) => {
				navigate("/error");
			});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName, photoURL } = user;
				dispatch(
					addUser({
						uid,
						email,
						displayName,
						photoURL,
					})
				);
				if (window.location.pathname !== "/browse") {
					navigate("/browse");
				}
			} else {
				dispatch(removeUser());
				navigate("/");
			}
		});

		return () => unsubscribe();
	}, []);

	const handleGPTSearchClick = () => {
		//toggle my gpt search
		dispatch(toggleGptSearchView());
	};

	const handleLangChange = (e) => {
		dispatch(changeLanguage(e.target.value))
	}

	return (
		<div className=" flex justify-between items-center px-6 w-full absolute top-0 z-50 bg-gradient-to-b from-black via-transparent to-transparent py-3">
			<div>
				<img className="w-36 md:w-44" src={netflix_logo} alt="logo_netflix" />
			</div>
			{user && (
				<div className="flex items-center gap-2 md:gap-4">
					{showGptSearch && <select
						className="bg-black text-white border border-white p-2 rounded-md text-sm md:text-base hover:cursor-pointer"
						defaultValue="en"
						onChange={handleLangChange}
					>
						{supported_lang.map((lang) => (
							<option key={lang.identifier} value={lang.identifier}>
								{lang.name}
							</option>
						))}
					</select>}

					<button
						onClick={handleGPTSearchClick}
						className="bg-gradient-to-r from-red-600 to-red-800 text-white text-sm md:text-base px-4 py-1.5 rounded-md hover:scale-105 transition-transform duration-200 shadow-md"
					>
						{showGptSearch ? "🏠 Home" : "🔥 Smart Recommend"}{" "}
					</button>

					<img
						className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover"
						alt="user_icon"
						src={icon_url}
					/>
					<button
						onClick={handleSignOut}
						className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm md:text-base"
					>
						Sign Out
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
