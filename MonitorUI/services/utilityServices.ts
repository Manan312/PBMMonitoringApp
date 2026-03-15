import {
  MasterSearchRequest,
  MasterStatResponse,
  MasterSyncLog,
} from "../models/MasterSync";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import {
  UserAddUpdateRequest,
  UserDetailsResponse,
  UserResponse,
} from "../models/User";
import { apiService } from "./apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showError } from "./toastService";
import {
  ApprovalDetails,
  PBMDailyDumpRequest,
  PBMDenialResponse,
  PBMSearchRequest,
  PBMStatResponse,
  PBMSyncLog,
} from "../models/PBMSync";
import { ServiceStatusResponse } from "../models/Service";

export const GetUserDetails = async (): Promise<UserDetailsResponse | null> => {
  try {
    const storedUser = await AsyncStorage.getItem("pbm_user");

    if (!storedUser) return null;

    const accessToken: UserResponse = JSON.parse(storedUser);
    const res = await apiService.getUserDetails(accessToken.Token);
    if (res.Errors != null) {
      if (res.Errors[0].Message) {
        showError(res.Errors[0].Message);
      }
    }
    return res.Data;
  } catch (error) {
    showError("Failed to Load Data");
    return null;
  }
};

export const GetAllUsers =
  async (): Promise<UserDetailsResponse[] | null> => {
    try {
      const storedUser = await AsyncStorage.getItem("pbm_user");

      if (!storedUser) return null;

      const accessToken: UserResponse = JSON.parse(storedUser);
      const res = await apiService.getAllUsers(accessToken.Token);
      if (res.Errors != null) {
        if (res.Errors[0].Message) {
          showError(res.Errors[0].Message);
        }
      }
      return res.Data;
    } catch (error) {
      showError("Failed to load data");
      return null;
    }
  };

export const GetMasterSyncStats = async (): Promise<
  MasterStatResponse[] | null
> => {
  try {
    debugger;
    const storedUser = await AsyncStorage.getItem("pbm_user");
    if (!storedUser) return null;
    const accessToken: UserResponse = JSON.parse(storedUser);
    const res = await apiService.getMasterStats(accessToken.Token);
    if (res.Errors != null) {
      if (res.Errors[0].Message) {
        showError(res.Errors[0].Message);
      }
    }
    return res.Data;
  } catch (error) {
    showError("Failed to load data");
    return null;
  }
};

export const GetMasterDataSyncFailedRecords = async (
  masterSyncSearch: MasterSearchRequest,
): Promise<MasterSyncLog[] | null> => {
  try {
    debugger;
    const storedUser = await AsyncStorage.getItem("pbm_user");

    if (!storedUser) return null;
    //console.log(masterSyncSearch);
    const accessToken: UserResponse = JSON.parse(storedUser);
    const res = await apiService.getMasterFailed(
      accessToken.Token,
      masterSyncSearch,
    );
    if (res.Errors != null) {
      if (res.Errors[0].Message) {
        showError(res.Errors[0].Message);
      }
    }
    return res.Data;
  } catch (error) {
    showError("Failed to load data");
    return null;
  }
};
export const downloadCSVFromBlob = async (blob: Blob,reportName:string) => {
  try {
    const fileName = `${reportName}-${new Date()
      .toISOString()
      .split("T")[0]}.csv`;

    if (Platform.OS === "web") {
      // WEB
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } else {
      // MOBILE
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(",")[1];

        const fileUri = FileSystem.cacheDirectory + fileName;

        await FileSystem.writeAsStringAsync(fileUri, base64data!, {
          encoding: FileSystem.EncodingType.Base64,
        });

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        }
      };

      reader.readAsDataURL(blob);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const GetMasterDataSyncFailedExcel = async (
  masterSyncSearch: MasterSearchRequest,
) => {
  try {
    debugger;
    const storedUser = await AsyncStorage.getItem("pbm_user");

    if (!storedUser) return null;
    const accessToken: UserResponse = JSON.parse(storedUser);
    const blob = await apiService.getMasterFailedExcel(
      accessToken.Token,
      masterSyncSearch,
    );
    try{
      await downloadCSVFromBlob(blob,"MasterSyncData");
    }
    catch(error)
    {
      showError("Failed to Download Details");
    }
  } catch (error) {
    showError("Failed to load data");
    return null;
  }
};

export const GetPBMStats = async (): Promise<PBMStatResponse[] | null> => {
  try {
    debugger;
    const storedUser = await AsyncStorage.getItem("pbm_user");

    if (!storedUser) return null;
    const accessToken: UserResponse = JSON.parse(storedUser);
    const res = await apiService.getPBMStats(accessToken.Token);
    if (res.Errors != null) {
      if (res.Errors[0].Message) {
        showError(res.Errors[0].Message);
      }
    }
    return res.Data;
  } catch (error) {
    showError("Failed to load data");
    return null;
  }
};

export const GetPBMDenialStats = async (): Promise<
  PBMDenialResponse[] | null
> => {
  try {
    debugger;
    const storedUser = await AsyncStorage.getItem("pbm_user");

    if (!storedUser) return null;
    const accessToken: UserResponse = JSON.parse(storedUser);
    const res = await apiService.getPBMDenials(accessToken.Token);
    if (res.Errors != null) {
      if (res.Errors[0].Message) {
        showError(res.Errors[0].Message);
      }
    }
    return res.Data;
  } catch (error) {
    showError("Failed to load data");
    return null;
  }
};

export const GetPBMRequestDetails = async (
  body: PBMSearchRequest,
): Promise<ApprovalDetails | null> => {
  try {
    debugger;
    const storedUser = await AsyncStorage.getItem("pbm_user");

    if (!storedUser) return null;
    const accessToken: UserResponse = JSON.parse(storedUser);
    const res = await apiService.getPBMDetails(accessToken.Token, body);
    if (res.Errors != null) {
      if (res.Errors[0].Message) {
        showError(res.Errors[0].Message);
      }
    }
    return res.Data;
  } catch (error) {
    showError("Failed to load data");
    return null;
  }
};

export const GetPBMSyncData = async (): Promise<PBMSyncLog[] | null> => {
  try {
    debugger;
    const storedUser = await AsyncStorage.getItem("pbm_user");

    if (!storedUser) return null;
    const accessToken: UserResponse = JSON.parse(storedUser);
    const res = await apiService.getPBMSyncData(accessToken.Token);
    if (res.Errors != null) {
      if (res.Errors[0].Message) {
        showError(res.Errors[0].Message);
      }
    }
    return res.Data;
  } catch (error) {
    showError("Failed to load data");
    return null;
  }
};

export const GetPBMSyncDailyDump = async (
  pbmSyncDump: PBMDailyDumpRequest,
) => {
  try {
    debugger;
    const storedUser = await AsyncStorage.getItem("pbm_user");

    if (!storedUser) return null;
    const accessToken: UserResponse = JSON.parse(storedUser);
    const blob = await apiService.getPBMDump(
      accessToken.Token,
      pbmSyncDump,
    );
    try{
      await downloadCSVFromBlob(blob,"PBMDailyDump")
    }
    catch(error)
    {
      showError("Failed to load data");
      return null;
    }
  } catch (error) {
    showError("Failed to load data");
    return null;
  }
};

export const GetWinServiceStatus = async (): Promise<
  ServiceStatusResponse[] | null
> => {
  try {
    debugger;
    const storedUser = await AsyncStorage.getItem("pbm_user");

    if (!storedUser) return null;
    const accessToken: UserResponse = JSON.parse(storedUser);
    const res = await apiService.getServices(accessToken.Token);
    if (res.Errors != null) {
      if (res.Errors[0].Message) {
        showError(res.Errors[0].Message);
      }
    }
    return res.Data;
  } catch (error) {
    showError("Failed to load data");
    return null;
  }
};

export const ToggleWinService = async (
  Name: string,
  Request: string,
): Promise<ServiceStatusResponse | null> => {
  try {
    debugger;
    const storedUser = await AsyncStorage.getItem("pbm_user");

    if (!storedUser) return null;
    const accessToken: UserResponse = JSON.parse(storedUser);
    if (Request === "Stop") {
      const res = await apiService.toggleStopService(accessToken.Token, Name);
      if (res.Errors != null) {
        if (res.Errors[0].Message) {
          showError(res.Errors[0].Message);
        }
      }
      if (res.Data.Status === "Error") {
        showError("Something Went Wrong Service Toggle Failed");
        return null;
      }
      return res.Data;
    } else if (Request === "Start") {
      const res = await apiService.toggleStartService(accessToken.Token, Name);
      if (res.Errors != null) {
        if (res.Errors[0].Message) {
          showError(res.Errors[0].Message);
        }
      }
      if (res.Data.Status === "Error") {
        showError("Something Went Wrong Service Toggle Failed");
        return null;
      }
      return res.Data;
    } else return null;
  } catch (error) {
    showError("Failed to load data");
    return null;
  }
};


export const UpdateUserDetails = async (user:UserAddUpdateRequest): Promise<string | null> => {
  try {
    const storedUser = await AsyncStorage.getItem("pbm_user");

    if (!storedUser) return null;

    const accessToken: UserResponse = JSON.parse(storedUser);
    const res = await apiService.updateUserAccess(accessToken.Token,user);
    if (res.Errors != null) {
      if (res.Errors[0].Message) {
        showError(res.Errors[0].Message);
      }
    }
    return res.Status;
  } catch (error) {
    showError("Failed to Load Data");
    return null;
  }
};