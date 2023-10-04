
import HttpService from "./http.service";

const basePath = "/Users";

export const AuthService = {
  login
};

async function login(data: any): Promise<any> {
  return HttpService.post(`${basePath}/auth`, data);
}

export default AuthService;
