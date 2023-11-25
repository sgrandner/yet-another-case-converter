# Yet Another Case Converter - Change Log

## [0.3.0] - 2023-11-25

- add settings commands for activation/deactivation of convert commands (grouped by command levels "important", "most" and "all")
- set defaults for commands to "most"


## [0.2.1] - 2023-11-23

- BUGFIX: add missing configuration properties for new commands in package.json, otherwise they are deactivated


## [0.2.0] - 2023-11-23

- config settings for enabling/disabling commands
- add custom case (custom separator defined in settings)
- add multi-line and multi-cursor selection handling
- match single characters or numbers
- match words starting or ending with separators
- renamed command titles showing case name in case itself and case name in space/title case in order to find them easier while typing

- renamed command titles to match naming conventions better
- add eslint
- add e2e tests
- add MIT license


## [0.1.0] - 2022-01-21

- match usual cases of selections
- convert matched cases to chosen case from commands
    - supports simple upper and lower case
    - supports snake, double snake, kebab, space, dot and camel in different upper and lower variants
    - allows upper case abbreviations in camel case, e.g., qwerNMOPAsdfYxcv -> qwer-nmop-asdf-yxcv
    - does not support some strange and unnecessary cases as, e.g.,  "upper inverse camel case" (QWERaSDFyXCV) and lower case abbreviations in camel case (qWERnmopaSDFyXCV)

## [Unreleased]

- first upper/lower case
- toggle/swap upper/lower
- custom separators
- deactivate unused cases in settings config (?)
- activate/deactivate allowed upper case abbreviations in camel case in config
