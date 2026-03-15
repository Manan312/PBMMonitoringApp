import { LoginRequest, AuthResponse } from "../models/Auth";
import { APIResponse } from "../models/APIResponse";
import {
  MasterStatResponse,
  MasterSyncLog,
  MasterSearchRequest,
} from "../models/MasterSync";
import {
  PBMStatResponse,
  PBMDenialResponse,
  PBMSyncLog,
  PBMSearchRequest,
  ApprovalDetails,
  PBMDailyDumpRequest,
} from "../models/PBMSync";
import { ServiceStatusResponse } from "../models/Service";
import {
  UserResponse,
  UserDetailsResponse,
  UserAddUpdateRequest,
} from "../models/User";
import { showError } from "./toastService";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "/api";

const handleResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  console.log(res.text());
  return res.text();
};

/**
 * API Service layer for PBM Sync Monitor
 * Connects to .NET 8.0 Backend using JSON bodies for data transfer
 * Supports Mock Data for demonstration purposes
 */
export const apiService = {
  // Auth
  login: async (
    credentials: LoginRequest,
  ): Promise<APIResponse<UserResponse>> => {
    // debugger;
    // console.log(API_BASE_URL);
    const res = await fetch(`${API_BASE_URL}/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  signup: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const res = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  // Master Sync
  getMasterStats: async (
    AuthToken: string,
    body?: MasterSearchRequest,
  ): Promise<APIResponse<MasterStatResponse[]>> => {
    const res = await fetch(`${API_BASE_URL}/mastersync/get-master-count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
    });
    debugger;
    return handleResponse(res);
  },

  getMasterFailed: async (
    AuthToken: string,
    body?: MasterSearchRequest,
  ): Promise<APIResponse<MasterSyncLog[]>> => {
    const res = await fetch(`${API_BASE_URL}/mastersync/get-master-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },
  getMasterFailedExcel: async (
    AuthToken: string,
    body?: MasterSearchRequest,
  ) => {
    const res = await fetch(`${API_BASE_URL}/mastersync/getExcelFile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      showError("Something went Wrong");
    }

    return await res.blob();
  },

  // PBM Sync
  getPBMStats: async (
    AuthToken: string,
  ): Promise<APIResponse<PBMStatResponse[]>> => {
    const res = await fetch(`${API_BASE_URL}/pbmsync/getPbmCounts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
    });
    return handleResponse(res);
  },

  getPBMDenials: async (
    AuthToken: string,
  ): Promise<APIResponse<PBMDenialResponse[]>> => {
    const res = await fetch(`${API_BASE_URL}/pbmsync/getPBMDenialCodes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
    });
    return handleResponse(res);
  },

  getPBMDetails: async (
    AuthToken: string,
    body: PBMSearchRequest,
  ): Promise<APIResponse<ApprovalDetails>> => {
    const res = await fetch(`${API_BASE_URL}/pbmsync/GetPBMData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  getPBMSyncData: async (
    AuthToken: string,
  ): Promise<APIResponse<PBMSyncLog[]>> => {
    const res = await fetch(`${API_BASE_URL}/pbmsync/GetPBMSyncLog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
    });
    return handleResponse(res);
  },

  getPBMDump: async (AuthToken: string, body: PBMDailyDumpRequest) => {
    const res = await fetch(`${API_BASE_URL}/pbmsync/getpbmdump`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      showError("Something went Wrong");
    }
    return await res.blob();
  },

  // Services
  getServices: async (
    AuthToken: string,
  ): Promise<APIResponse<ServiceStatusResponse[]>> => {
    const res = await fetch(`${API_BASE_URL}/WinService/Service-status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
    });
    return handleResponse(res);
  },

  toggleStartService: async (
    AuthToken: string,
    Name: string,
  ): Promise<APIResponse<ServiceStatusResponse>> => {
    const res = await fetch(`${API_BASE_URL}/WinService/start-service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
      body: JSON.stringify({ Name: Name }),
    });
    return handleResponse(res);
  },
  toggleStopService: async (
    AuthToken: string,
    Name: string,
  ): Promise<APIResponse<ServiceStatusResponse>> => {
    const res = await fetch(`${API_BASE_URL}/WinService/stop-service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
      body: JSON.stringify({ Name: Name }),
    });
    return handleResponse(res);
  },

  // Users
  getUserDetails: async (
    AuthToken: string,
  ): Promise<APIResponse<UserDetailsResponse>> => {
    const res = await fetch(`${API_BASE_URL}/user/user-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
    });
    return handleResponse(res);
  },
  getAllUsers: async (
    AuthToken: string,
  ): Promise<APIResponse<UserDetailsResponse[]>> => {
    const res = await fetch(`${API_BASE_URL}/user/get-all-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
    });
    return handleResponse(res);
  },

  updateUserAccess: async (
    AuthToken: string,
    body: UserAddUpdateRequest,
  ): Promise<APIResponse<string>> => {
    console.log(body);
    console.log(JSON.stringify(body));
    const res = await fetch(`${API_BASE_URL}/User/AddUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },
};
