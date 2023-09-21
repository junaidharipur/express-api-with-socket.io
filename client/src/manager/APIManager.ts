import axios, { AxiosRequestConfig } from "axios";

import { LOGIN_API, SIGNUP_API, PROFILE_API } from "../constants/apiEndpoints";

export class APIManager {
  static get LOGIN_API(): string {
    return LOGIN_API;
  }

  static get SIGNUP_API(): string {
    return SIGNUP_API;
  }

  static get PROFILE_API(): string {
    return PROFILE_API;
  }

  static getErrorMessage(err: any) {
    const message =
      (err as any)?.response?.data?.message || "Something Wen't Wrong";

    return message;
  }

  static async request(req: AxiosRequestConfig) {
    const token = localStorage.getItem("token");
    try {
      return await axios({
        ...req,
        headers: { Authorization: token },
      });
    } catch (err) {
      return {
        status: "error",
        data: null,
        message: APIManager.getErrorMessage(err),
      };
    }
  }

  static get(endpoint: string, headers?: { [k: string]: any }) {
    return APIManager.request({
      method: "GET",
      url: endpoint,
      headers: headers,
    });
  }

  static post(endpoint: string, body: any, headers?: { [k: string]: any }) {
    return APIManager.request({
      method: "POST",
      url: endpoint,
      headers: headers,
      data: body,
    });
  }

  static put(endpoint: string, body: any, headers?: { [k: string]: any }) {
    return APIManager.request({
      method: "PUT",
      url: endpoint,
      headers: headers,
      data: body,
    });
  }

  static patch(endpoint: string, body?: any, headers?: { [k: string]: any }) {
    return APIManager.request({
      method: "PATCH",
      url: endpoint,
      headers: headers,
      data: body,
    });
  }

  static delete(endpoint: string, headers?: { [k: string]: any }) {
    return APIManager.request({
      method: "DELETE",
      url: endpoint,
      headers: headers,
    });
  }
}
