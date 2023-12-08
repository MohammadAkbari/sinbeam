import axios from 'axios';
import baseUrl from '@/shared/globals/config';
import type Link from '@/models/link';
import helper from '@/shared/common/helper';

// import { useCancelRequestStore } from '@/store/cancelRequest';

export default class ApiService {
  jwtService = '';

  constructor() {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }


  callApi = async (links: Link[], key: string, model = null) => {
    const link = links.find(e => e.rel == key);
    try {
      switch (link.method.toLocaleLowerCase()) {
        case 'post':
          const postData = await axios.post(link.href, model);
          return postData.data;
        case 'get':
          const url = link.href + (model == null ? '' : helper.objectIntoQueryStringParameters(model))
          const getData = await axios.get(url);
          return getData.data;
      }
    } catch (e) {
      debugger
      console.log(e);
    }
  }

  callService = async (href: string, method: string, model = null) => {
    
    try {
      switch (method.toLocaleLowerCase()) {
        case 'post':
          const postData = await axios.post(href, model);
          return postData.data;
        case 'get':
          const url = href + (model == null ? '' : helper.objectIntoQueryStringParameters(model))
          const getData = await axios.get(url);
          return getData.data;
      }
    } catch (e) {
      debugger
      console.log(e);
    }
  }


  get = async (url: string) => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (e) {
      debugger
      console.log(e);
    }

  };

  post = async (url: string, model: any) => {
    try {
      const data = await axios.post(url, model);
      return data;

    } catch (e) {
      debugger
      console.log(e);
    }
  };
}

