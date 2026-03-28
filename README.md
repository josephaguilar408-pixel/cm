# ClearMic

Electron desktop app for AI-powered microphone noise cancellation.

## About This Repository

This repository contains source extracted from the packaged ClearMic app bundle and published to GitHub.

## Requirements

- Node.js 18+
- npm 9+
- macOS for creating the .app bundle

## Install

```bash
npm install
```

## Run Locally

If your local project has Electron Forge scripts, run:

```bash
npm run start
```

If scripts are missing, add the standard Forge scripts first or run Electron directly with your local setup.

## Build Package

For Electron Forge projects, package and make distributables with:

```bash
npm run package
npm run make
```

Typical macOS output is generated under out/.

## Publish New Changes

```bash
git add .
git commit -m "Describe your change"
git push
```

## Create a GitHub Release (Distribute the App)

1. Create the macOS release zip artifact:

```bash
./scripts/create-release-zip.sh 1.0.1 /Users/josephaguilar/Applications/ClearMic.app
```

2. Open the repository Releases page.
3. Click Draft a new release.
4. Create a tag (for example v1.0.1).
5. Upload the generated zip artifact (for example `ClearMic-v1.0.1-macOS.app.zip`).
6. Publish release.

## Notes

- Keep large build artifacts out of Git history; upload them as Release assets instead.
- node_modules and local environment files are ignored by .gitignore.

## Documentation

- Release checklist: see `RELEASE_CHECKLIST.md`
- Changelog: see `CHANGELOG.md`
