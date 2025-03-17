import { Fzf } from "fzf";
import fs from "fs";
import path from "path";
import os from "os";

type SearchOptions = {
  term: string;
  rootDir: string;
};

export function search({ term, rootDir }: SearchOptions) {
  const rootDirs = rootDir.split(",");
  const repoList = rootDirs
    .map((rootDir) => getProjects(rootDir))
    .flat()
    .filter(Boolean);
  const fzf = new Fzf(repoList);
  return fzf.find(term).map((entry) => ({
    title: generateTitle(entry.item, rootDir),
    path: entry.item,
  }));
}

function getProjects(directory: string): string[] {
  const rootProjects = findRootProjects(directory);
  return [
    ...rootProjects,
    ...rootProjects
      .map((project) => getProjectsFromDirectory(project))
      .flat()
      .filter(Boolean),
  ];
}

function findRootProjects(directory: string): string[] {
  const absoluteDir = createAbsolutePath(directory);
  const contents = fs.readdirSync(absoluteDir);
  return contents
    .map((entry) => path.join(absoluteDir, entry))
    .filter((entry) => fs.statSync(entry).isDirectory())
    .reduce((acc, entry) => {
      if (isProject(entry)) {
        acc.push(entry);
      } else {
        acc.push(...getProjectsFromDirectory(entry));
      }
      return acc;
    }, [] as string[]);
}

function getProjectsFromDirectory(directory: string) {
  const absoluteDir = createAbsolutePath(directory);
  const contents = fs.readdirSync(absoluteDir);
  return contents
    .map((entry) => path.join(absoluteDir, entry))
    .filter((entry) => fs.statSync(entry).isDirectory() && isProject(entry));
}

// This should probably also read the .gitignore
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
    "Makefile",
    "README.md",
  ];
  const projectFolders = [".git", "node_modules"];
  return (
    projectFolders.some((projectFolder) => fs.existsSync(path.join(folder, projectFolder))) ||
    projectFiles.some((projectFile) => fs.existsSync(path.join(folder, projectFile)))
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
