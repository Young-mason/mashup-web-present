import axios from "axios";

import { ADMIN_ACCESS_TOKEN, ADMIN_PRODUCTION } from "../../config";
import { RewardResponse, RewardModel } from "./reward.type";

export const getRewardList = async () => {
  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const campaign_ids = [7, 14, 27, 24, 29, 35];
  const status = "PROVIDED";
  const is_authorized = "TRUE";

  let result: RewardModel[] = [];

  for (let campaign_id of campaign_ids) {
    const params = {
      page: 1,
      size: 1000,
      campaign_id,
      status,
      account_auth: is_authorized,
      end_at: today,
    };
    try {
      const res = await axios.get<RewardResponse>(
        `${ADMIN_PRODUCTION}/admin/rewards`,
        {
          params,
          headers: {
            Authorization: `Bearer ${ADMIN_ACCESS_TOKEN}`,
          },
        }
      );
      const { items } = res.data.data;

      result = result.concat(items);
    } catch (err: any) {
      console.log(
        "리워드 대상자 수집중 오류발생!",
        err.response.status,
        err.response.statusText
      );
      throw new Error(err);
    }
  }

  return result;
};

export const issueRewards = async (rewardIds: number[]) => {
  let ids = [...rewardIds];
  let count = 0;

  console.log(
    "---------- 리워드 지급 시작 : ",
    new Date().toLocaleString("en-GB")
  );

  const timer = setInterval(async () => {
    const splice = ids.splice(0, 5);

    const uid = splice.join(",");
    if (splice.length < 1) {
      clearInterval(timer);
      console.log(
        "---------- 리워드 지급 완료 : ",
        new Date().toLocaleString("en-GB")
      );
      return;
    }

    try {
      const res = await axios.post(
        `${ADMIN_PRODUCTION}/admin/rewards/issue/all`,
        { uid },
        {
          headers: {
            Authorization: `Bearer ${ADMIN_ACCESS_TOKEN}`,
          },
        }
      );
      count += splice.length;
      console.log(res.data, `${count}/${rewardIds.length}`); // Progress Check
    } catch (err: any) {
      console.log(
        uid,
        "리워드 발급 중 오류 발생!",
        new Date().toLocaleString("en-GB")
      );
      clearInterval(timer);
    }
  }, 1000);
};
