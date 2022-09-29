import { Plant } from './../../interfaces/plant.model';
import { createSlice } from '@reduxjs/toolkit';
import {
  addPlant,
  getPlants,
  removePlant,
  updatePlant,
} from '../services/plant.service';

export type PlantState = {
  plants: Plant[];
  searchTerm: '';
  pending: boolean;
  error: boolean;
};

const initialState: PlantState = {
  plants: [],
  searchTerm: '',
  pending: false,
  error: false,
};

export const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    setFilterByTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlants.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(getPlants.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getPlants.fulfilled, (state, action) => {
        state.pending = false;
        state.error = false;
        state.plants = action.payload;
      })
      .addCase(addPlant.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(addPlant.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(addPlant.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.error = false;
        state.plants.push(payload.data);
      })
      .addCase(removePlant.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(removePlant.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(removePlant.fulfilled, (state, action) => {
        state.pending = false;
        state.error = false;
        state.plants = state.plants.filter(
          (plant) => plant._id !== action.payload
        );
      })
      .addCase(updatePlant.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(updatePlant.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(updatePlant.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.error = false;
        const index = state.plants.findIndex(
          (plant) => plant._id === payload.data._id
        );
        state.plants[index] = {
          ...payload.data,
        };
      });
  },
});

export const { setFilterByTerm } = plantsSlice.actions;

export default plantsSlice.reducer;
