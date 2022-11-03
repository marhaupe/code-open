import { Fzf } from "fzf";
import fs from "fs";
import path from "path";

const repoList = [
  "/Users/haupma/Entwicklung",
  "/Users/haupma/Entwicklung/other",
  "/Users/haupma/Entwicklung/temp",
  "/Users/haupma/Entwicklung/other/belletenu",
  "/Users/haupma/Entwicklung/gallier",
]
  .map((repoFolder, i, arr) => {
    return fs
      .readdirSync(repoFolder)
      .map((folder) => path.join(repoFolder, folder))
      .filter((f) => fs.statSync(f).isDirectory() && arr.some((otherRepoFolder) => f.includes(otherRepoFolder)));
  })
  .flat(1);

const fzf = new Fzf(repoList);

export function search(term: string) {
  return fzf.find(term).map((entry) => ({
    title: entry.item.split("/").pop(),
    path: entry.item,
  }));
}
