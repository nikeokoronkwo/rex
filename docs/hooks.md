# Git Hooks and Actions with Rex

Rex includes support for running Git Hooks.
The Git Hooks supported by Rex are:

## Getting Started

When scaffolding a new project in Rex (or adding Rex to an existing project), Rex will automatically bind with the git folder, if any, in your project to allow hooks to be run.

## Using `rex.json`

The basic way, which is suggested for short hooks, is to use the `rex.json` file.

## Using a `.rex/` folder

You can also write your hooks as bash scripts with file names `<name>` where the name corresponds to a supported git hook. This could be used for much larger scenarios.
