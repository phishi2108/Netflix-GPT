import { useRef, useEffect } from "react";
import MovieCard from "./MovieCard";

const MovieLists = ({ title, movies }) => {
    // Refs to hold the DOM element and animation values without causing re-renders.
    const scrollRef = useRef(null);
    const animationFrameId = useRef(null);
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);

    useEffect(() => {
        const element = scrollRef.current;

        // Safety Check: Only run the logic if the element has been rendered.
        if (element) {
            // Initialize scroll positions when the effect runs.
            targetScroll.current = element.scrollLeft;
            currentScroll.current = element.scrollLeft;

            const onWheel = (e) => {
                e.preventDefault();
                const maxScroll = element.scrollWidth - element.clientWidth;

                // Update the target position based on the wheel's vertical scroll.
                targetScroll.current += e.deltaY * 1.2;

                // Clamp the target to stay within the scrollable bounds (0 to max).
                targetScroll.current = Math.max(0, Math.min(targetScroll.current, maxScroll));
                
                // Start the animation loop if it's not already running.
                if (animationFrameId.current === null) {
                    animationFrameId.current = requestAnimationFrame(animationLoop);
                }
            };

            const animationLoop = () => {
                // Easing factor: Lower number is smoother but slower.
                const easeFactor = 0.08; 
                const scrollDifference = targetScroll.current - currentScroll.current;

                // Move the current scroll position a fraction of the way to the target.
                currentScroll.current += scrollDifference * easeFactor;
                element.scrollLeft = currentScroll.current;

                // Stop the animation if we're very close to the target to save performance.
                if (Math.abs(scrollDifference) < 0.5) {
                    element.scrollLeft = targetScroll.current;
                    currentScroll.current = targetScroll.current;
                    cancelAnimationFrame(animationFrameId.current);
                    animationFrameId.current = null;
                } else {
                    // Otherwise, continue the loop on the next frame.
                    animationFrameId.current = requestAnimationFrame(animationLoop);
                }
            };

            // Add the event listener with 'passive: false' to ensure preventDefault works.
            element.addEventListener("wheel", onWheel, { passive: false });

            // Cleanup Function: This runs when the component unmounts.
            return () => {
                element.removeEventListener("wheel", onWheel);
                if (animationFrameId.current) {
                    cancelAnimationFrame(animationFrameId.current);
                }
            };
        }
    }, [movies]); // Dependency array ensures the effect re-runs if the movies change.

    // Return null if there are no movies, preventing errors.
    if (!movies || movies.length === 0) {
        return null;
    }

    return (
        <div className="px-6 py-4">
            <h2 className="text-6xl md:text-4xl font-extrabold text-red-500 mb-3 tracking-wide drop-shadow">
                {title}
            </h2>
            <div
                ref={scrollRef}
                className="flex overflow-x-auto no-scrollbar"
            >
                <div className="flex space-x-4">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} posterPath={movie.poster_path} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieLists;