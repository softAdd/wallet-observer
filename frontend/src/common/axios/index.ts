import Axios from 'axios';
import { addJwtInterceptors } from './jwt';

const client = Axios.create();

export default addJwtInterceptors(client);
