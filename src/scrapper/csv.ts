import fs from "fs";
import { Music } from "./index";

export const jsonToCSV = (data: Music[]) => {
  const jsonArray = data;

  let csvString = `Rank, Artist, Title, Album\r\n`;

  jsonArray.forEach((content, index) => {
    const row = `${content.rank}, ${content.artist}, ${content.title}, ${content.album}`;
    const result = index !== jsonArray.length - 1 ? `${row}\r\n` : `${row}`;

    csvString += result;
  });

  fs.writeFileSync(`melon.csv`, `\uFEFF${csvString}`);
};
