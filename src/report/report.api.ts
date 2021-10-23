import axios from "axios";
import { ADMIN_ACCESS_TOKEN, ADMIN_PRODUCTION } from "../../config";
import {
  TotalAnlsResponse,
  YdayAnlsResponse,
  PointReportResponse,
} from "./report.type";

export const getTotalUserAnls = async () => {
  try {
    const res = await axios.get<TotalAnlsResponse>(
      `${ADMIN_PRODUCTION}/admin/analytics/overview/total`,
      { headers: { Authorization: `Bearer ${ADMIN_ACCESS_TOKEN}` } }
    );

    const { data } = res.data;
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getYdayUserAnls = async () => {
  try {
    const res = await axios.get<YdayAnlsResponse>(
      `${ADMIN_PRODUCTION}/admin/analytics/overview`,
      {
        params: { size: 10, page: 1 },
        headers: { Authorization: `Bearer ${ADMIN_ACCESS_TOKEN}` },
      }
    );

    const data = res.data.data.items[1];
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getPointReport = async () => {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  const targetDate = `${yesterday.getFullYear()}-${
    yesterday.getMonth() + 1
  }-${yesterday.getDate()}`;

  try {
    const res = await axios.get<PointReportResponse>(
      "https://api.newming.io/v1/admin/report/point",
      {
        params: { report_date: targetDate },
        headers: { Authorization: `Bearer ${ADMIN_ACCESS_TOKEN}` },
      }
    );

    const { data } = res.data;
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
