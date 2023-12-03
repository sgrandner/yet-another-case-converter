# Yet Another Case Converter (VS Code Extension)

Convert cases into each other for single, multiline or multi-cursor selections.

Deactivate those commands you don't need.

Define your own case with a special character.


## TODOs

* add apostrophe to segment characters !
* add command to set and update custom separator
* convert or keep special characters (Sonderzeichen)
* icon


## Features

Each conversion can be applied as a command which start with the extension name, i.e. `Yet Another Case Converter: ...` **In order to see these commands text must be selected !** Type `yet` and/or the name of the case.

*Certain cases supported here may not be used ever. The purpose of this little project was to convert "everthing" to "everything"... at least almost everything ;) **Each conversion command can be deactivated** if you want. See section [Extension Settings](#extension-settings)*

Supported cases:
- supports simple upper and lower case

- supports **snake**, **kebab**, **space**, **dot** and **camel** in different upper and lower variants including **long** versions for snake and kebab case with doubled separators.

- supports multiline selection converting lines separately

- supports multicursor selection

- matches **acronyms** in camel case, e.g., *qwerNMOPAsdfYxcv* -> *qwer-nmop-asdf-yxcv*

- supports a **custom** case, e.g. *asdf+qwer+yxcv*, which can be defined in the settings (see section [Define separator for custom case](#define-separator-for-custom-case))

- does not support some strange and unnecessary cases as, e.g.,  "upper inverse camel case" (*QWERaSDFyXCV*) and lower case acronyms in camel case (*qWERnmopaSDFyXCV*)


## Requirements


## Extension Settings

### Activate/Deactivate convert commands

By default most commands are activated. Each of them can be activated/deactivated in the settings.

1) use the following commands to activated/deactivated groups of them. Common cases are grouped as "important commands".

    * `Yet Another Case Converter: Activate important commands`
    * `Yet Another Case Converter: Activate most commands`
    * `Yet Another Case Converter: Activate all commands`
    * `Yet Another Case Converter: Deactivate all commands (for manual configuration)`

Changes from the default value are persisted in the global VS Code settings as

    "yet-another-case-converter.activate.<case name>": [true|false]

If not set the default value is used which corresponds to "Activate most commands".

Of course, you can edit these settings manually in the settings view or directly in the `settings.json`.


### Define separator for custom case

Find the custom cases by typing *"yet custom"* or similar in the VS Code command line.

The custom separator must be set and must contain at least one charactor. These charactors must not interfer with the matching charactors of the word's segments, i.e. not allowing characters are `[a-zA-Z0-9]`.

e.g.

    "yet-another-case-converter.custom1-separator": "+"


## Known Issues

## Release Notes


## Some notes on adding new commands

* package.json
    * add command to `contributes.commands`
    * if setting (settings.json) is needed add property to `configuration.properties`
        * the property name is arbitrary and unique and can be used for `enablement` in the form `config.<property name>`
        * the property name can be used in the code as well with `vscode.workspace.getConfiguration().get()` or updated with `vscode.workspace.getConfiguration().update()`
        * for convert commands in this extension the property names should be `yet-another-case-converter.activate.<command name>` since they are constructed from the command name at some places
* extension.ts
    * register command in the function `activate()` with the command name and a callback function
    * push the returned disposable to the subscriptions of the `vscode.ExtensionContext`
* convert-commands.config.ts
    * add convert commands to the CommandConfig array returned by getConvertCommandsConfig()


## when clause context

Useful, e.g., to enable or disable commands... and much more.

* e.g. `editorHasSelection`
