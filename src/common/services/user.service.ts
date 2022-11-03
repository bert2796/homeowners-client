import axios from 'axios';

const url = 'localhost:4000/auth';

export const login = async (params: { username: string; password: string }) => {
  return await axios({
    data: params,
    method: 'POST',
    url: `${url}/login`,
  });
};
