/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `index` command */
  export type Index = ExtensionPreferences & {
  /** Root repository directory - Specify the root directory for searching projects. This is usually your workspace or where you keep your projects. */
  "rootDir": string,
  /** The program to open the project with - Specify the program to open the project with. This will default to running "code <YOUR_PROJECT>" */
  "cmd": string
}
}

declare namespace Arguments {
  /** Arguments passed to the `index` command */
  export type Index = {}
}

