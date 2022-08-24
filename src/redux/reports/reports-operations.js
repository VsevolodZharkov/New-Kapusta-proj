import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDataTransaction = createAsyncThunk(   
	'getTranzaction/curentData',   
	async date => {     
		return await axios.get(`/transaction/period-data?date=${date}`);
	} 
);