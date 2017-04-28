# Change log

This project adheres to [Semantic Versioning](http://semver.org/). This change
log follows the format outlined at http://keepachangelog.com.

## Unreleased

## 2.0.1 - 2017-04-28

### Changed

- Move the API key to the user name position
- Add client version header

## 2.0.0 - 2017-04-24

### Changed

- Complete rewrite
- The output format has changed slightly and has more data

## 1.0.0 - 2016-02-07

### Added

- Support promises

### Changed

- Will now return `null` if the BIN is not found instead of throwing

### Removed

- Remove caching and advice to use [AsyncCache](http://npmjs.com/package/async-cache)
