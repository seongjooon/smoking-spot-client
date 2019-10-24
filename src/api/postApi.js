import axios from 'axios';

axios.defaults.withCredentials = true;

export const postSthreeApi = imageData => {
  return axios
    .post('/spots/image', imageData)
    .then(res => res)
    .catch(err => console.log(err));
};

export const postSpotApi = spotData => {
  return axios
    .post('http://localhost:5000/spots/new', spotData)
    .then(res => res.data.message)
    .catch(err => err.response.data.message);
};

export const postComentApi = comentData => {
  return axios
    .post(`http://localhost:5000/coments/${comentData.spot_id}`, comentData)
    .then(res => res.data)
    .catch(err => console.log(err));
};
