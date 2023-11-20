# Yet Another Case Converter (VS Code Extension)

Convert cases into each other for single, multiline or multi-cursor selections.

Deactivate those commands you don't need.

Define your own case with a special character.


## TODOs

* add settings for deactivated commands as comments in settings.json !?
* icon


## Features

Each conversion can be applied as a command which start with the extension name, i.e. `Yet Another Case Converter: ...` **In order to see these commands text must be selected !** Type `yet` or the name of the case.

*Certain cases supported here may not be used ever. The purpose of this little project was to convert "everthing" to "everything"... at least almost everything ;) **Each conversion command can be deactivated** if you want. See section [Extension Settings](#extension-settings)*

Supported cases:
- supports simple upper and lower case

- supports **snake**, **kebab**, **space**, **dot** and **camel** in different upper and lower variants including **long** versions for snake and kebab case with doubled separators.

- supports multiline selection converting lines separately

- supports multicursor selection

- matches **acronyms** in camel case, e.g., *qwerNMOPAsdfYxcv* -> *qwer-nmop-asdf-yxcv*

- supports a **custom** case, e.g. *asdf+qwer+yxcv*, which can be defined in the settings (yet-another-case-converter.custom1-separator)

- does not support some strange and unnecessary cases as, e.g.,  "upper inverse camel case" (*QWERaSDFyXCV*) and lower case acronyms in camel case (*qWERnmopaSDFyXCV*)

## Requirements

## Extension Settings

By default all commands are activated. Each of them can be deactivated in the settings. Editing the settings.json directly would be, e.g.,

    "yet-another-case-converter.activate.cobol-case": false

## Known Issues

## Release Notes
