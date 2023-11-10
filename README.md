# code-open: A Raycast Extension

![Raycast Extension Demo Placeholder](media/demo.gif)

code-open is a Raycast extension that lets you quickly search and open your projects in VS Code. Utilizing the speed and efficiency of `fzf`, this extension allows you to traverse your dev directory, search for any project, and open it instantly in your code editor.

## Features

- Quickly search for any project in your dev directory using `fzf`.
- Easy setup: Simply specify your root directory for searching projects.
- Instantly open the selected project in VS Code.

## Installation

1. Install [Raycast](https://www.raycast.com/).
2. `git clone git@github.com:marhaupe/code-open.git`
3. `cd code_open && npm run dev` to build the extension. You can quit it after it's built.
4. Open Raycast preferences (⌘+,).
5. Navigate to Extensions → My Extensions.
6. Click on "Add From Folder" and select the `code-open` folder.

## Configuration

After installing the extension, you'll need to set the "Root Repository Directory" in the extension settings. This should point to the root directory of your workspace, where all your projects reside.

## Usage

Once you've configured the extension, simply open Raycast, simply type `co` or `Open Project in VS Code`, choose your project, and watch as it instantly opens in VS Code.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.
