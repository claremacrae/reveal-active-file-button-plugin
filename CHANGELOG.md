# 2.0.6

- chore: Add Contributing guidelines

# 2.0.5

More code and infrastructure quality improvements

- Chore: Add attestation of released plugin, as wanted by the [Obsidian scorecard](https://community.obsidian.md/plugins/reveal-active-file-button)
- Chore: Fully pass all the Obsidian ESLint code quality checks (a recommendation had changed since the last release)
- Chore: Further streamline release process
- Chore: Update some vulnerable dependencies

# 2.0.4

This is a code-quality release, to satisfy current Obsidian coding standards. **It now requires Obsidian 0.15.9 or newer.**

* Increase minimum supported Obsidian version from 0.12.11 to 0.15.9. This was required to ensure correct behaviour if there are popup windows open.
* Fix: Remove Unsafe assignment (of static icon value) to innerHTML.
* Chore: Fully pass all the Obsidian ESLint code quality checks.
* Chore: Add [Verify Commit](https://github.com/claremacrae/reveal-active-file-button-plugin/actions/workflows/verify.yml) GitHub action, to check pushed code.
* Chore: Add initial version of release automation and instructions (see [Doing a release](https://github.com/claremacrae/reveal-active-file-button-plugin#doing-a-release)).
* Chore: Update dependencies.
* Chore: Version-control `package-lock.json`.

# 2.0.3

* Bug fix: Fix issue where Reveal button requires two clicks ([#3](https://github.com/claremacrae/reveal-active-file-button-plugin/pull/3), thanks @alangrainger)

# 2.0.2

* Bug fix: Restore alignment of Reveal button in Obsidian v0.16.* ([#1](https://github.com/claremacrae/reveal-active-file-button-plugin/pull/1), thanks @OfficerHalf)

# 2.0.1

* Bug fix: Updated manifest.json and versions.json

# 2.0.0

Plugin renamed to **Reveal Active File Button**.

If you previously installed the 1.0.0 release, please follow the notes in [Removing version 1.0.0](docs/RemoveV100.md) to remove it.

Improvements made as part of the review process, for adding the plugin to the Community Plugins catalogue:

* Documentation improved
* Plugin renamed: `Reveal Active File Button`
* ID renamed: `reveal-active-file-button`
* Repository URL: https://github.com/claremacrae/reveal-active-file-button-plugin

# 1.0.0

Initial release. 

* Plugin name: `Manually Reveal Active File`
* ID: `obsidian-manually-reveal-active-file`
* Repository URL: https://github.com/claremacrae/obsidian-manually-reveal-active-file
