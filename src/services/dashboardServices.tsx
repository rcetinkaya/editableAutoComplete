import axios, { AxiosResponse } from 'axios';

// Örnek API URL


// Örnek bir GET isteği
export const fetchDashboardData = (action:any):any /* Promise<AxiosResponse<any>> */ => {
    console.log("action22 :",action)
  return axios.get(`${process.env.REACT_APP_API_URL}/character`)
    .then((response) => {
      // İsteğin başarılı olması durumunda dönen veriyi geri döndür
      return response.data.results;
    })
    .catch((error) => {
      // Hata durumunda hata nesnesini fırlat
      throw new Error(`Error fetching dashboard data: ${error.message}`);
    });
};
