import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
	name: "movies",
	initialState: {
		nowPlayingMovies: null,
		nowTrendingMovies: null,
		topRatedMovies: null,
		upcomingMovies: null,
		trailerVideo: null,
	},
	reducers: {
		addNowPlayingMovies: (state, action) => {
			state.nowPlayingMovies = action.payload;
		},
		addNowTrendingMovies: (state, action) => {
			state.nowTrendingMovies = action.payload;
		},
		addTopRatedMovies: (state, action) => {
			state.topRatedMovies = action.payload;
		},
		addUpcomingMovies: (state, action) => {
			state.upcomingMovies = action.payload;
		},
		addTrailerVideo: (state, action) => {
			state.trailerVideo = action.payload;
		},
	},
});
export const {
	addNowPlayingMovies,
	addTrailerVideo,
	addNowTrendingMovies,
	addTopRatedMovies,
	addUpcomingMovies,
} = movieSlice.actions;
export default movieSlice.reducer;
