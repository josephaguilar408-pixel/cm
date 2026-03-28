# Release Checklist

Use this checklist when preparing a new ClearMic release.

## Pre-Release

- [ ] Pull latest main branch changes.
- [ ] Confirm working tree is clean (`git status`).
- [ ] Bump app version in `package.json`.
- [ ] Update `CHANGELOG.md` with release notes.
- [ ] Verify app icon and bundle metadata are correct.

## Quality Checks

- [ ] Install dependencies (`npm install`).
- [ ] Run app locally and sanity test core flows.
- [ ] Validate noise cancellation path and fallback behavior.
- [ ] Confirm packaging config in `forge.config.js`.

## Build

- [ ] Build distributables (`npm run make`).
- [ ] Confirm output artifacts under `out/`.
- [ ] Smoke-test generated app bundle on macOS.
- [ ] If Forge build is unavailable, create zip from app bundle (`./scripts/create-release-zip.sh X.Y.Z /Users/josephaguilar/Applications/ClearMic.app`).

## GitHub Release

- [ ] Commit version/changelog updates.
- [ ] Push commits to `main`.
- [ ] Create tag `vX.Y.Z`.
- [ ] Draft GitHub Release titled `vX.Y.Z`.
- [ ] Paste release notes from `CHANGELOG.md`.
- [ ] Upload release assets (zip/dmg/app artifacts).
- [ ] Publish release.

## Post-Release

- [ ] Verify release assets are downloadable.
- [ ] Verify app launches after fresh download.
- [ ] Announce release notes to users/team.
