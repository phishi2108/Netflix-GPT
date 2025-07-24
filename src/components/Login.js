import React from "react";
import Header from "./Header";

const Login = () => {
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
			<form className="absolute top-[25%] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white p-10 rounded-md z-20 w-96">
				<h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
				<input
					type="text"
					placeholder="Email Address"
					className="p-3 my-2 w-full rounded bg-gray-800 bg-opacity-50 focus:outline-none"
				/>
				<input
					type="password"
					placeholder="Password"
					className="p-3 my-2 w-full rounded bg-gray-800 bg-opacity-50 focus:outline-none"
				/>
				<button className="w-full bg-red-600 p-3 mt-4 rounded hover:bg-red-700 transition">
					Sign In
				</button>
				<p className="w-full p-3 my-2">New to Netflix? Sign up now</p>
			</form>
		</div>
	);
};

export default Login;
