import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";
//connections-api.goit.global
export const fetchAll = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      console.log("fetching");
      const res = await axios.get("contacts");
      //   console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newTask, thunkAPI) => {
    try {
      const res = await axios.post("contacts", newTask);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (taskId, thunkAPI) => {
    try {
      const res = await axios.delete(`contacts/${taskId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
