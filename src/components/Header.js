import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);
	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				navigate("/");
			})
			.catch((error) => {
				navigate("/error");
				// An error happened.
			});
	};

	return (
		<div className="flex justify-between items-center px-6 py-4 w-full absolute z-50">
			<div>
				<img
					className="w-36 md:w-44"
					src="https://download.logo.wine/logo/Netflix/Netflix-Logo.wine.png"
					alt="logo_netflix"
				/>
			</div>
			{user && (
				<div className="flex items-center gap-3">
					<img
						className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover"
						alt="user_icon"
						src={
							"https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
						}
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
