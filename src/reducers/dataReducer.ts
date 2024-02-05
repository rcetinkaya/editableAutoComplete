import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  // State yapısı
  data:[]
  loading:boolean
  error:string | null
}

const initialState: DataState = {
  // İlk durum
  data:[],
  loading:false,
  error:""
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Reducer ve actions
    fetchDataRequest: (state,action) => {
      // İstek durumunu işaretlemek için state'i güncelle
      state.loading = true;
      state.error = null; // Hata durumunu sıfırla
    },
    fetchDataSuccess: (state, action: PayloadAction<any>) => {
      // Başarılı yanıt durumunda verileri güncelle
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      // Hata durumunda hata mesajını güncelle
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataRequest,fetchDataSuccess,fetchDataFailure } = dataSlice.actions;
export default dataSlice.reducer;
