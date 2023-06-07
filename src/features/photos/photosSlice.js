import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"


const initialState = {
  photos: [],
  currentCategory: "animals",
  currentPage: 1,
  isLoading: false,
  error: null,
};

export const getPhotosByPage = createAsyncThunk(
  'photos/getPhotosByPage',
  async (payload, { dispatch, rejectWithValue, getState }) => {
    try {
      const {currentCategory, currentPage} = getState().photos;
      const response = await axios.get(`https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${currentCategory}`)

      return dispatch(photosSlice.actions.setPhotos(response.data.hits));
    } catch (error) {
      return rejectWithValue('something went wrong: ' + error.message || error);
    }
  }
);


const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotos: (state, { payload }) => {
      state.photos = payload;
    },
    setCurrentCategory: (state, { payload }) => {
      state.currentCategory = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhotosByPage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPhotosByPage.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getPhotosByPage.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});


export const getPhotos = (state) => state.photos.photos;
export const getCurrentCategory = (state) => state.photos.currentCategory;
export const getCurrentPage = (state) => state.photos.currentPage;
export const getIsLoading = (state) => state.photos.isLoading;
export const getError = (state) => state.photos.error;


export const { 
  setPhotos,
  setCurrentCategory,
  setCurrentPage
} = photosSlice.actions;

export default photosSlice.reducer;
