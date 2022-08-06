import axios from 'axios'; 
// frontend ve backend arasında erişim sağlar.

export const signup =  (body) => {
    return axios.post('/api/1.0/users', body);
}