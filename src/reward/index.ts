import schedule from "node-schedule";
import { getRewardList, issueRewards } from "./reward.api";

export const autoIssueRewardToUser = schedule.scheduleJob(
  "0 0 * * * *",
  async () => {
    console.log("----- 시작");
    const rewards = await getRewardList(); // 리워드 지급대상자 불러오기
    const rewardIds = rewards.map((item) => item.uid); // id 추출
    console.log("리워드 지급대상자", rewardIds);
    issueRewards(rewardIds); // 리워드 지급
  }
);
