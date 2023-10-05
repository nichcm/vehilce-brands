
import HttpService from "./http.service";

const basePath = "/VehicleBrand";

export const BrandService = {
    Get,
    GetList,
    Insert,
    Update,
    ToggleActive
};

async function Get(id: any): Promise<any> {
  return HttpService.get(`${basePath}/selectVehicleBrandById?vehicleBrandId=${id}`);
}

async function GetList(request: any): Promise<any> {
    return HttpService.post(`${basePath}/selectVehicleBrand`, request);
  }
  
  async function Insert(request: any): Promise<any> {
    return HttpService.post(`${basePath}/InsertVehicleBrand`, request);
  }

  async function Update(request: any): Promise<any> {
    return HttpService.put(`${basePath}/UpdateVehicleBrand`, request);
  }

  async function ToggleActive(request: any): Promise<any> {
    return HttpService.put(`${basePath}/ToggleActiveVehicleBrand`, request);
  }

export default BrandService;
