import axios from "axios";
import { baseUrl, userData } from "../helpers";
const { jwt } = userData();
const privateInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
});
export default privateInstance;
