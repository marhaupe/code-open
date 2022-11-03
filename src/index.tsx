import { useState } from "react";
import { Action, ActionPanel, closeMainWindow, List } from "@raycast/api";
import { search } from "./fzf";
import { exec } from "child_process";

export default function Command() {
  const [state, setState] = useState({
    searchText: "",
  });

  return (
    <List
      searchText={state.searchText}
      enableFiltering
      onSearchTextChange={(newValue) => {
        setState((previous) => ({ ...previous, searchText: newValue }));
      }}
    >
      {search(state.searchText).map((folder) => (
        <List.Item
          key={folder.path}
          title={folder.path ?? "undefined"}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <Action
                  title={"Open"}
                  onAction={() => {
                    exec("code " + folder.path);
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
