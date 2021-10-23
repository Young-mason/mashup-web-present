import schedule from "node-schedule";

import { BOT_ACCESS_TOKEN } from "../config";
import { postMessage } from "./common/common.api";
import { getUserAnlsText, getPointReportText } from "./report";

/* ----------- 슬랙봇 analytics 채널 리포트 ----------- */

const token = BOT_ACCESS_TOKEN || "";

export const reportScheduler = schedule.scheduleJob("0 0 9 * * *", () => {
  const userAnalytics = getUserAnlsText();
  const pointReport = getPointReportText();

  const TARGET_CHANNEL = "newming-analytics";

  Promise.all([userAnalytics, pointReport]).then(async (texts) => {
    for (let text of texts) {
      await postMessage(token, TARGET_CHANNEL, text);
    }
  });
});

/* ----------- 슬랙봇 random 채널 게더 메시지 ----------- */

const date = new Date();
const today = `${date.getMonth() + 1}/${date.getDate()}`;

export const gatherMsgSchedulerAM = schedule.scheduleJob(
  "0 0 10 * * 1-5",
  () => {
    const TARGET_CHANNEL = "random";
    const msg = `${today}일 오전 집중 근무 시간입니다. 게더!`;
    console.log("gather msg AM", TARGET_CHANNEL, msg);
    postMessage(token, TARGET_CHANNEL, msg);
  }
);

export const gatherMsgSchedulerPM = schedule.scheduleJob(
  "0 0 14 * * 1-5",
  () => {
    const TARGET_CHANNEL = "random";
    const msg = `${today}일 오후 집중 근무 시간입니다. 게더!`;
    console.log("gather msg PM", TARGET_CHANNEL, msg);
    postMessage(token, TARGET_CHANNEL, msg);
  }
);

/*
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
*/
