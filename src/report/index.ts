import {
  getPointReport,
  getYdayUserAnls,
  getTotalUserAnls,
} from "./report.api";

export const getPointReportText = async () => {
  const data = await getPointReport();

  const provided = data.getProvidePoint;
  const total = data.getTotalPoint;
  const used = data.getUsePoint;

  const { provided_count, provided_sum } = provided;
  const { used_count, used_sum } = used;
  const {
    count,
    sum_point_total,
    sum_point_after,
    diff_point_after,
    point_usage_rate,
  } = total;

  const result = `
  <포인트 Report>
  총 발행량: ${sum_point_total.toLocaleString("ko-KR")}
  총 사용량: ${diff_point_after.toLocaleString("ko-KR")}
  잔여 포인트: ${sum_point_after.toLocaleString("ko-KR")}
  포인트 사용률: ${point_usage_rate.toFixed(2)}%
  전일 사용량: ${used_sum.toLocaleString("ko-KR")}
  전일 사용자 수: ${used_count.toLocaleString("ko-KR")}
  전일 지급량: ${provided_sum.toLocaleString("ko-KR")}
  전일 지급자 수: ${provided_count.toLocaleString("ko-KR")}
  `;

  return result;
};

export const getUserAnlsText = async () => {
  const [ydayData, totalData] = await Promise.all([
    getYdayUserAnls(),
    getTotalUserAnls(),
  ]);

  const {
    inflow_user,
    authorized_user,
    bounced_user,
    bounced_rate,
    dau,
    wau,
    guest_user,
    authorized_rate,
    retention,
    user_count,
    date,
  } = ydayData;
  const totalUser = totalData.inflow_user;

  const result = `
  ${date}

  <일일 유저 분석>
  총 유저 수: ${totalUser}
  방문 수: ${user_count}
  유입 수: ${inflow_user}
  인증 유저 수: ${authorized_user}
  게스트 수: ${guest_user}
  이탈 수: ${bounced_user}
  DAU: ${dau}
  WAU: ${wau}
  전환율: ${retention}%
  유저 등록률: ${authorized_rate}%
  이탈률: ${bounced_rate}%

  `;

  return result;
};
