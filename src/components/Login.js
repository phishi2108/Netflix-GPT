import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
	const [isSignInFrom, setIsSignInFrom] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const name = useRef(null);
	const email = useRef(null);
	const password = useRef(null);

	const toggleSignInForm = () => {
		setIsSignInFrom(!isSignInFrom);
	};

	const handleButtonClick = () => {
		//Validate the Form Data
		const message = checkValidateData(
			email.current.value,
			password.current.value
		);
		setErrorMessage(message);

		if (message) return;

		//sigin or signup logic
		if (isSignInFrom) {
			//sign in logic
			signInWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value
			)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					console.log(user);
					navigate("/browse");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMessage(errorCode + "-" + errorMessage);
				});
		} else {
			//sign up logic
			createUserWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value
			)
				.then((userCredential) => {
					// Signed up
					const user = userCredential.user;
					updateProfile(user, {
						displayName: name.current.value,
						photoURL:
							"https://i.pinimg.com/736x/c7/9a/37/c79a37e13ef14be556b51143bcbb1b01.jpg",
					})
						.then(() => {
							const { uid, email, displayName, photoURL } = auth.currentUser;
							dispatch(
								addUser({
									uid: uid,
									email: email,
									displayName: displayName,
									photoURL: photoURL,
								})
							);
						})
						.catch((error) => {
							setErrorMessage(error.message);
						});
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMessage(errorCode + "-" + errorMessage);
					// ..
				});
		}
	};

	return (
		<div className="relative h-screen w-full">
			{/* Header */}
			<div className="absolute top-0 left-0 w-full z-20">
				<Header />
			</div>

			{/* Background Image with Black Overlay */}
			<div className="relative h-full">
				<img
					src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg"
					alt="netflix_bg_login"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black opacity-70 z-10"></div>
			</div>

			{/* Form */}
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				className="absolute top-[25%] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white p-10 rounded-md z-20 w-96"
			>
				<h2 className="text-2xl font-bold mb-6 text-center">
					{isSignInFrom ? "Sign In" : "Sign Up"}
				</h2>
				<input
					ref={email}
					type="text"
					placeholder="Email Address"
					className="p-3 my-2 w-full rounded bg-gray-800 bg-opacity-50 focus:outline-none"
				/>
				{!isSignInFrom && (
					<input
						ref={name}
						type="text"
						placeholder="Full Name"
						className="p-3 my-2 w-full rounded bg-gray-800 bg-opacity-50 focus:outline-none"
					/>
				)}
				<input
					ref={password}
					type="password"
					placeholder="Password"
					className="p-3 my-2 w-full rounded bg-gray-800 bg-opacity-50 focus:outline-none"
				/>
				<p className=" text-red-500 font-bold text-lg py-2 ">{errorMessage}</p>
				<button
					className="w-full bg-red-600 p-3 mt-4 rounded hover:bg-red-700 transition"
					onClick={handleButtonClick}
				>
					{isSignInFrom ? "Sign In" : "Sign Up"}
				</button>
				<p
					className="w-full py-3 my-2 cursor-pointer"
					onClick={toggleSignInForm}
				>
					{isSignInFrom
						? "New to Netflix? Sign up now"
						: "Already Registered? Sign In now"}
				</p>
			</form>
		</div>
	);
};

export default Login;
