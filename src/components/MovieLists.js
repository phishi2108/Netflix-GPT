import { useRef, useEffect } from "react";
import MovieCard from "./MovieCard";

const MovieLists = ({ title, movies }) => {
	const scrollRef = useRef(null);
	const animationFrameId = useRef(null);
	const targetScroll = useRef(0);
	const currentScroll = useRef(0);

	useEffect(() => {
		const element = scrollRef.current;
		if (element) {
			targetScroll.current = element.scrollLeft;
			currentScroll.current = element.scrollLeft;

			const onWheel = (e) => {
				e.preventDefault();
				const maxScroll = element.scrollWidth - element.clientWidth;
				targetScroll.current += e.deltaY * 1.2;
				targetScroll.current = Math.max(0, Math.min(targetScroll.current, maxScroll));

				if (animationFrameId.current === null) {
					animationFrameId.current = requestAnimationFrame(animationLoop);
				}
			};

			const animationLoop = () => {
				const easeFactor = 0.08;
				const scrollDifference = targetScroll.current - currentScroll.current;
				currentScroll.current += scrollDifference * easeFactor;
				element.scrollLeft = currentScroll.current;

				if (Math.abs(scrollDifference) < 0.5) {
					element.scrollLeft = targetScroll.current;
					currentScroll.current = targetScroll.current;
					cancelAnimationFrame(animationFrameId.current);
					animationFrameId.current = null;
				} else {
					animationFrameId.current = requestAnimationFrame(animationLoop);
				}
			};

			element.addEventListener("wheel", onWheel, { passive: false });

			return () => {
				element.removeEventListener("wheel", onWheel);
				if (animationFrameId.current) {
					cancelAnimationFrame(animationFrameId.current);
				}
			};
		}
	}, [movies]);

	if (!movies || movies.length === 0) return null;

	return (
		<div className="p-4 md:p-6 no-scrollbar">
			<h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow">
				{title}
			</h2>

			<div
				ref={scrollRef}
				className="flex overflow-x-auto space-x-4 scrollbar-hide"
			>
				{movies.map((movie) => (
					<MovieCard key={movie.id} posterPath={movie.poster_path} />
				))}
			</div>
		</div>
	);
};

export default MovieLists;
