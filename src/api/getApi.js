import axios from 'axios';

export const getSpotListApi = () => {
  return axios
    .get('/spots')
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const getSpotDetailApi = spotId => {
  return axios
    .get(`/spots/${spotId}`)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const getComentsApi = spot_id => {
  return axios
    .get(`/coments/${spot_id}`)
    .then(res => res.data)
    .catch(err => console.log(err));
};
