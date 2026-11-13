import axios from 'axios';
import { upload } from '@vercel/blob/client';
import { auth } from './firebase';

export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const http = axios.create({ baseURL: API_URL });

// 요청마다 최신 Firebase ID 토큰을 붙인다 (SDK 가 만료 시 자동 갱신).
async function authHeader() {
  const user = auth.currentUser;
  if (!user) throw new Error('Not signed in');
  return { Authorization: `Bearer ${await user.getIdToken()}` };
}

const request = async (method, url, data) =>
  (await http({ method, url, data, headers: await authHeader() })).data;

export const login = () => request('post', '/users');
export const getSpotList = () => request('get', '/spots').then(d => d.spotList);
export const getSpotDetail = id => request('get', `/spots/${id}`).then(d => d.spot);
export const createSpot = spot => request('post', '/spots/new', spot);
export const getComents = id => request('get', `/coments/${id}`).then(d => d.coments);
export const postComent = (id, body) =>
  request('post', `/coments/${id}`, body).then(d => d.comentList);

export async function uploadImage(file) {
  const blob = await upload(file.name, file, {
    access: 'public',
    handleUploadUrl: `${API_URL}/spots/upload`,
    headers: await authHeader()
  });
  return blob.url;
}
