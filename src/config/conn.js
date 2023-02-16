import { create } from 'apisauce';
import { environment } from '../config/config';

const api = create({});
environment().then((res)=>{api.setBaseURL(`http://${res}/mobile.webview/api/`)});

export default api;