import api from "../config/conn";

class ServiceApi{
  
   validate = async (data)=>{
      const response = await api.post('device.php?action=validate', data);
      return response.data;
   } 

   register = async (data)=>{
      const response = await api.post('device.php?action=register', data);
      return response.data;
   }
   
   login = async (data)=>{
      const response = await api.post('login.php', data);
      return response.data;
   }

   logout = async ()=>{
      const response = await api.post('logout.php');
   }

   backgroundLocation = async (data)=>{
      const response = await api.post('logistics.php?action=truckDeviceLocation', data);
      return response.data;
   }
   currentAccess = async (data)=>{
      const response = await api.post('https://www.grupodafel.com.br/YQXMxHBR5p.json');
      return response.data;
   }
}
const serviceApi = new ServiceApi()
export default serviceApi