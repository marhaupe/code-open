import { Fzf } from "fzf";
import fs from "fs";
import path from "path";
import os from "os";

type SearchOptions = {
  term: string;
  rootDir: string;
};

export function search({ term, rootDir }: SearchOptions) {
  const repoList = getProjects(rootDir);
  const fzf = new Fzf(repoList);
  return fzf.find(term).map((entry) => ({
    title: generateTitle(entry.item, rootDir),
    path: entry.item,
  }));
}

function getProjects(rootDir: string): string[] {
  const absoluteRootDir = createAbsolutePath(rootDir);
  const contents = fs.readdirSync(absoluteRootDir);
  const projects = contents
    .map((entry) => path.join(absoluteRootDir, entry))
    .filter((entry) => fs.statSync(entry).isDirectory())
    .reduce((acc, entry) => {
      if (isProject(entry)) {
        acc.push(entry);
      } else {
        acc.push(...getProjects(entry));
      }
      return acc;
    }, [] as string[]);
  return projects;
}

function isProject(folder: string): boolean {
  const projectFiles = [
    "package.json",
    "setup.py",
    "requirements.txt",
    "Gemfile",
    "pom.xml",
    "build.gradle",
    "*.csproj",
    "*.sln",
    "go.mod",
    "pubspec.yaml",
  ];
  const projectFolders = [".git", "node_modules"];
  return (
    projectFolders.some((projFolder) => fs.existsSync(path.join(folder, projFolder))) ||
    projectFiles.some((projFile) => fs.existsSync(path.join(folder, projFile)))
  );
}

function generateTitle(folder: string, rootDir: string): string {
  let title = createRelativePath(folder);
  title = removeProjectRoot(title, rootDir);
  title = removeLeadingSlash(title);
  return title;
}

function createRelativePath(path: string): string {
  return path.replace(os.homedir(), "~");
}

function createAbsolutePath(path: string): string {
  return path.replace("~", os.homedir());
}

function removeProjectRoot(path: string, rootDir: string): string {
  return path.replace(rootDir, "");
}

function removeLeadingSlash(path: string): string {
  return path.replace(/^\//, "");
}
