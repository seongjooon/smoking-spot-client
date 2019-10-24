import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const login = ({ displayName, email, photoURL }) => {
  return axios
    .post('/users', {
      username: displayName,
      email,
      photourl: photoURL
    })
    .then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      return token;
    })
    .catch(error => {
      console.log(error);
    });
};

export default login;
