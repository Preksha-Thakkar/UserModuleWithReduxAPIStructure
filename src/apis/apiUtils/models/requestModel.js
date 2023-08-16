export class requestModel {
  url: string;
  method: string;
  params: string;
  data: string;
  headers: string;
  timeout: number;
  withCredentials: boolean;
  auth: { username: string, password: string };
  responseType: string;
  responseEncoding: string;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  proxy: {
    protocol: string,
    host: string,
    port: number,
    auth: {
      username: string,
      password: string,
    },
  };
}
