export interface YdayAnlsItem {
  inflow_user: number;
  authorized_user: number;
  bounced_user: number;
  dau: string;
  wau: string;
  guest_user: number;
  authorized_rate: string;
  bounced_rate: string;
  retention: string;
  user_count: number;
  date: string;
}

export interface YdayAnlsResponse {
  status: "success" | "fail";
  data: {
    items: YdayAnlsItem[];
    total: number;
  };
}

export interface TotalAnlsResponse {
  status: "success" | "fail";
  data: {
    inflow_user: number;
    authorized_user: number;
    bounced_user: number;
    guest_user: number;
    average_dau: string;
    average_wau: string;
    authorized_rate: string;
    bounced_rate: string;
    average_retention: string;
    date: string;
  };
}

export interface PointReportResponse {
  status: "success" | "fail";
  data: {
    getProvidePoint: { provided_count: number; provided_sum: number };
    getUsePoint: { used_count: number; used_sum: number };
    getTotalPoint: {
      count: number;
      sum_point_total: number;
      sum_point_after: number;
      diff_point_after: number;
      point_usage_rate: number;
    };
  };
}
