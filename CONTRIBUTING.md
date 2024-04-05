# Contributing to Rex

First off, thank you for considering contributing to Rex. It's people like you that make Rex such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make one! It's generally best if you get confirmation of your bug or approval for your feature request this way before starting to code.

## Fork & create a branch

If this is something you think you can fix, then fork and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```bash
git checkout -b 325-add-japanese-translations
```

## Get the test suite running

Make sure you’re using a recent version of Deno.

> In the later future, the packages, when compatible, will be published to JSR for use across all platforms.

Run the test suite to make sure everything is operating correctly:

```bash
deno test
```

## Implement your fix or feature

At this point, you’re ready to make your changes! Feel free to ask for help; everyone is a beginner at first.

## Make a Pull Request

At this point, you should switch back to your master branch and make sure it’s up to date with Rex's master branch:

```bash
git remote add upstream git@github.com:nikeokoronkwo/rex.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of master, and push it!

```bash
git checkout 325-add-japanese-translations
git merge master
git push --set-upstream origin 325-add-japanese-translations
```

Finally, go to GitHub and make a Pull Request :D

## Keeping your Pull Request updated

If a maintainer asks you to "rebase" your PR, they’re saying that a lot of code has changed, and that you need to update your branch so it’s easier to merge.

To learn more about rebasing in Git, there are a lot of good resources but here’s the suggested workflow:

```bash
git checkout 325-add-japanese-translations
git pull --merge upstream master
git push --force-with-lease 325-add-japanese-translations
```

## Merging a PR (maintainers only)

A PR can only be merged into master by a maintainer if:

- It is passing CI.
- It has been approved by at least two maintainers (assuming there are more than two maintainers on this project, else all). If it was a maintainer who opened the PR, only one extra approval is needed.
- It has no requested changes.
- It is up to date with current master.

Any maintainer is allowed to merge a PR if all of these conditions are met.

## Standards

This project adheres to:

- Contributor Covenant Code of Conduct
- Semantic Versioning
- Deno Linting
- Prettier Formatting

## License

By contributing your code, you agree to license your contribution under the MIT License.
