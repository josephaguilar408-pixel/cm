# Testing Guide

Use this guide when testing ClearMic builds from GitHub Releases.

## 1. Download the App

1. Open the latest release page.
2. Download the release zip asset (for example `ClearMic-v1.0.1.zip`).
3. Unzip the file.

## 2. Install and Launch (macOS)

1. Drag `ClearMic.app` to Applications.
2. Right-click `ClearMic.app`, then click Open.
3. If macOS blocks launch, open System Settings > Privacy & Security and click Open Anyway.

## 3. Grant Permissions

1. Allow Microphone access when prompted.
2. Allow any audio-related permissions requested by the app.

## 4. Quick Functional Test

1. Launch ClearMic.
2. Select your microphone input.
3. Speak with background noise (fan, keyboard, TV, music).
4. Verify noise reduction in output audio.
5. Keep app running for 10-15 minutes and watch for dropouts, lag, or crashes.

## 5. Report Feedback

Share the following with the team:

- macOS version
- Mac model
- ClearMic release version tested
- Exact steps performed
- Expected result vs actual result
- Any error text or screenshot/video

## 6. Known First-Run Behavior

- Security prompts are expected on unsigned or non-notarized builds.
- First launch may require the right-click Open flow.

## Tester Feedback Template

```text
Device:
macOS:
Release version:
Test steps:
What worked:
What failed:
Screenshots/videos:
Additional notes:
```
