import { API_URL } from "./../config/config";
import axios from "axios";

export const authenticeUser = async username => {
  const url = `${API_URL}people/?search=${username}`;
  const res = await axios.get(url);
  if (res.status === 200 && res.data.count === 1) {
    return res.data.results[0];
  }
  return false;
};
export const getPlanetLists = async name => {
  const url = `${API_URL}planets/?search=${name}`;
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data.results;
  }
  return false;
};
