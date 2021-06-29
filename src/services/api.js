import axios from 'axios';

const headers = {
   'Content-Type': 'application/json',
};

const baseURL = 'https://reqres.in/api/';

const api = {
   users: {
      listUsers: () => axios.get(`${baseURL}users`, { headers }),
      getUser: (id) => axios.get(`${baseURL}users/${id}`, { headers }),
      deleteUser: (id) => axios.delete(`${baseURL}users/${id}`, { headers }),
      updateUser: (id, data) => axios.put(`${baseURL}users/${id}`, data, { headers }),
      createUser: (data) => axios.post(`${baseURL}users/`, data, { headers }),
   },
   auth: {
      login: (data) => axios.post(`${baseURL}login`, data, { headers }),
   },
 };

 export default api;
