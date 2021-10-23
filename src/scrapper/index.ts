import axios from "axios";
import { JSDOM } from "jsdom";
import schedule from "node-schedule";
import { jsonToCSV } from "./csv";

export interface Music {
  rank?: number;
  title: string;
  artist: string;
  album: string;
}

const melonScrapper = async () => {
  const res = await axios.get<string>("https://www.melon.com/chart/index.htm");

  const { document } = new JSDOM(res.data).window;

  const titles = Array.from(document.querySelectorAll("div.rank01 span a")).map(
    (el) => el.textContent?.trim()
  );

  const artists = Array.from(document.querySelectorAll("div.rank02 span")).map(
    (el) => el.textContent?.trim()
  );
  const albums = Array.from(document.querySelectorAll("div.rank03 a")).map(
    (el) => el.textContent?.trim()
  );

  const musicList: Music[] = titles.map((title, i) => ({
    rank: i + 1,
    title: title || "None",
    artist: artists[i] || "None",
    album: albums[i] || "None",
  }));

  console.log(musicList);
  return musicList;
};

// melonScrapper();

const scrapperToCsv = async () => {
  const musicList = await melonScrapper();
  jsonToCSV(musicList);
};

scrapperToCsv();

export const autoIssueRewardToUser = schedule.scheduleJob(
  "0 0 9 * * *",
  async () => {
    scrapperToCsv();
  }
);
