const VideoTitle = ({ title, overview }) => {
	return (
		<div className="py-36 px-20 pt-[28%] z-20 absolute text-white w-full aspect-video no-scrollbar overflow-x-hidden">
			<h1 className="text-6xl font-bold drop-shadow-lg">{title}</h1>
			<p className="py-6  text-lg w-3/4">{overview}</p>
			<div className="flex gap-4">
				<button className="bg-black text-white py-2 px-6 rounded-md font-semibold text-lg hover:bg-opacity-70 transition">
					▶️ Play
				</button>
				<button className="bg-gray-300 text-black py-2 px-6 rounded-md font-semibold text-lg hover:bg-gray-400 transition">
					ℹ️ More Info
				</button>
			</div>
		</div>
	);
};

export default VideoTitle;
