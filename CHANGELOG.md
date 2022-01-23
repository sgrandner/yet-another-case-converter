# Change Log

## [Unreleased]

- first upper/lower case
- toggle/swap upper/lower
- custom separators
- deactivate unused cases in settings config (?)
- activate/deactivate allowed upper case abbreviations in camel case in config

## [0.1.0] - 2022-01-21
### Added
- match usual cases of selections
- convert matched cases to chosen case from commands
    - supports simple upper and lower case
    - supports snake, double snake, kebap, space, dot and camel in different upper and lower variants
    - allows upper case abbreviations in camel case, e.g., qwerNMOPAsdfYxcv -> qwer-nmop-asdf-yxcv
    - does not support some strange and unnecessary cases as, e.g.,  "upper inverse camel case" (QWERaSDFyXCV) and lower case abbreviations in camel case (qWERnmopaSDFyXCV)
