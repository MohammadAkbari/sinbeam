import axios from 'axios';
import baseUrl from '@/shared/globals/config';

// import { useCancelRequestStore } from '@/store/cancelRequest';

export default class ApiService {
  jwtService = '';

  constructor() {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  get = async (url: string) => {
      const { data } = await axios.get(url);
      return data;
    };

  post = async (url: string, model: any) => {
      const data = await axios.post(url, model);    
      return data;
  };
}

