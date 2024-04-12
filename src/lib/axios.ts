import axios from 'axios';

import { env } from '../env';

const api = axios.create({
  baseURL: 'https://graph.facebook.com/v19.0',
  headers: {
    Authorization: `Bearer ${env.GRAPH_API_TOKEN}`,
  },
});

export { api };
