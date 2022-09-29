import { Plant } from './../../interfaces/plant.model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPlants = createAsyncThunk('plants/getPlants', async () => {
  const response = await axios.get('/api/plants');

  return response.data;
});

export const addPlant = createAsyncThunk(
  'plants/addPlant',
  async (payload: Plant) => {
    const response = await axios.post('/api/plants', payload);

    return response.data;
  }
);

export const updatePlant = createAsyncThunk(
  'plants/updatePlant',
  async (payload: Plant) => {
    const response = await axios.put('/api/plants', payload);

    return response.data;
  }
);

export const removePlant = createAsyncThunk(
  'plants/removePlant',
  async (id: string) => {
    await axios.delete(`/api/plants?id=${id}`);

    return id;
  }
);
