import { useState } from "react";
import { Action, ActionPanel, closeMainWindow, getPreferenceValues, List } from "@raycast/api";
import { exec } from "child_process";
import { search } from "./search";

type Preferences = {
  rootDir: string;
  cmd: string;
};

const preferences = getPreferenceValues<Preferences>();

export default function Command() {
  const [state, setState] = useState({
    searchText: "",
  });

  return (
    <List
      searchText={state.searchText}
      filtering={true}
      onSearchTextChange={(newValue) => {
        setState((previous) => ({ ...previous, searchText: newValue }));
      }}
    >
      {search({
        term: state.searchText,
        rootDir: preferences.rootDir,
      }).map((folder) => (
        <List.Item
          key={folder.path}
          title={folder.title ?? "undefined"}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <Action
                  title={"Open"}
                  onAction={() => {
                    exec(preferences.cmd + " " + folder.path);
                    closeMainWindow();
                  }}
                />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
