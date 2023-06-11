# Yet Another Case Converter (VS Code Extension)

## Features

Change/toggle case of selections to another.

Supported cases:
- supports simple upper and lower case

- supports **snake**, **double snake**, **kebap**, **space**, **dot** and **camel** in different upper and lower variants

- supports multiline selection converting lines separately

- supports multicursor selection

- matches **acronyms** in camel case, e.g., *qwerNMOPAsdfYxcv* -> *qwer-nmop-asdf-yxcv*

- supports a **custom** case, e.g. *asdf+qwer+yxcv*, which can be defined in the settings (yet-another-case-converter.custom1-separator)

- does not support some strange and unnecessary cases as, e.g.,  "upper inverse camel case" (*QWERaSDFyXCV*) and lower case acronyms in camel case (*qWERnmopaSDFyXCV*)

## Requirements

## Extension Settings

By default all commands are activated. Each of them can be deactivated in the settings. Editing the settings.json directly would be, e.g.,

    "yet-another-case-converter.activate.upper-snake-case": false

## Known Issues

## Release Notes
