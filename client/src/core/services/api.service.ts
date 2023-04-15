import axios from 'axios';
import baseUrl from '@/shared/globals/config';
import type Link from '@/models/link';

// import { useCancelRequestStore } from '@/store/cancelRequest';

export default class ApiService {
  jwtService = '';

  constructor() {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }


callApi = async (links :Link[],key:string ,model = null) => {
debugger
  const link = links.find(e=>e.rel == key);

  switch(link.method.toLocaleLowerCase()){
    case 'post' : 
      const postData = await axios.post(link.href, model);
      return postData.data;
    case 'get' : 
      const getData  = await axios.get(link.href);
      return getData.data;
  }
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

