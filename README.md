# <p align="center">🚀 Minecraft Mod Manager 🚀</p>

<p align="center">A command line utility to install and update Minecraft mods (for the Java edition) without a launcher.</p>

<br/><br/>

Minecraft Mod Manager is a helpful utility for players, modpack creators and server owners who want to keep their
Minecraft mods up to date without the need for a launcher or having to manually check and download new files.

It can currently use mods from [Curseforge](https://curseforge.com/minecraft) and [Modrinth](https://modrinth.com/).
If you want support for other platforms, please feel free to submit a pull request or a feature request.


You currently can

- add mods
- automatically update mods
- change minecraft versions and uppdate the mods

Upcoming features:

- scan and recognize manually added mods
- consolidate mods to the same platform
- remove mods
- use github as the source for mods
- self-update

It's purposefully made to have a very explicit configuration file to avoid any "magic". This allows you to have full
control over the mods that are installed.

---

### Table Of Contents

* [Installation](#installation)
* [Running](#running)
* [How it works](#how-it-works)
  * [INIT](#init)
    * [Command line arguments for `init`](#command-line-arguments-for-init)
  * [ADD](#add)
    * [Platforms](#platforms)
    * [How to find the Mod ID?](#how-to-find-the-mod-id)
  * [INSTALL](#install)
  * [UPDATE](#update)
  * [CHANGE](#change)
  * [LIST](#list)
  * [TEST](#test)
* [Explaining the configuration](#explaining-the-configuration)
  * [modlist-lock.json](#modlist-lockjson)
  * [modlist.json](#modlistjson)
    * [loader](#loader-_required)
    * [gameVersion](#gameversion-required)
    * [modsFolder](#modsfolder-required)
    * [defaultAllowedReleaseTypes](#defaultallowedreleasetypes-required)
    * [allowVersionFallback](#allowversionfallback-optional)
* [Using with MultiMC](#using-with-multimc)
* [Contribute to the project](#contribute-to-the-project)
  * [Setup](#setup)
    * [Prerequisites](#prerequisites)
    * [Install dependencies](#install-dependencies)
    * [Validate](#validate)
  * [Code Considerations](#code-considerations)
    * [Conventional commmit messages](#conventional-commmit-messages)
    * [Using `console.log` and `console.error`](#using-consolelog-and-consoleerror)

<!-- TOC -->

---

## Installation

Go to the [releases page](https://github.com/meza/minecraft-mod-manager/releases), find the latest release,
**click on the Assets word** and download the latest version for your platform.

For the best results, put the downloaded executable into your minecraft folder in the same level as the `mods` folder.

![Folder Structure](/doc/images/mmm-folder-structure.png)

---

## Running

To use the tool, **you need to have a command line / terminal open** and be in the folder where the tool is.

<details>
<summary>Click for help with opening a terminal in Windows</summary>

<br/>

1. Navigate to the folder where the `mmm.exe` (and the rest of your minecraft installation) exists
2. Click to the address bar
3. Type: cmd and hit enter

![](/doc/images/cmd-windows.gif)

</details>

<details>
<summary>Click for help with opening a terminal in Linux and MacOS</summary>

<br/>

Let's be honest, you already know...
</details>
---

## How it works

> _If you know `npm` or `yarn` from the web development world, this works just the same_

There are 5 main commands of the app. These are: [init](#init), [add](#add), [install](#install), [update](#update)
and [list](#list)

Every command has a help page that you can access by running `mmm help <command>`.

__Common Options__

Every command has a few common options that you can use:

| Option Short | Option Long | Description                                |
|--------------|-------------|--------------------------------------------|
| -q           | --quiet     | Suppress all interactive ui elements       |
| -c           | --config    | Set the config file to an alternative path |
| -d           | --debug     | Enable verbose logging                     |

All options should be specified **before** the command. For example:

```bash
mmm --quiet install
```

or

```bash
mmm -c ./my-config.json install
```

### INIT

`mmm init`

Initializes the configuration file. This will create a `modlist.json` file in the current folder by default.

This will use an interactive prompt to ask you for the information it needs. If you don't want to use that or you're in
an
environment without interaction, you can supply all the answers through the command line arguments.

#### Command line arguments for `init`

You can supply all the answers via the command line arguments.
You can add these one after the other, for example: `mmm init -l curseforge -p 1.16.5 -m ./mods -c ./modlist.json`

| Short | Long                            | Description                             | Value                                                                                                                                     | Example                                            |
|-------|---------------------------------|-----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| -l    | --loader                        | The modloader to use                    | `curseforge` or `modrinth`                                                                                                                | `mmm init -l curseforge`                           |
| -g    | --game-version                  | The Minecraft version to use            | A valid Minecraft version                                                                                                                 | `mmm init -g 1.19.2`                               |
| -f    | --allow-version-fallback        | Whether to allow version fallback       | No value needed. <br/>When it is supplied, `true` is assumed                                                                              | `mmm init -f` to allow<br/>`mmm init` to not allow |
| -r    | --default-allowed-release-types | Which release types do you allow?       | A comma separated list of the following: <br/>`alpha`, `beta`, `release`                                                                  | `mmm init -r release,beta`                         |
| -m    | --mods-folder                   | Where do you want to download the mods? | An absolute or relative path to an **existing** folder<br/>Don't forget to use quotes for paths that include spaces or special characters | `mmm init -m "C:/My Modpack/mods"`                 |

---

### ADD

`mmm add <platform> <id>`

This adds a given mod to the configuration file and downloads the relevant mod file to the configured mod folder.

You would run this command to add a given mod to the configuration file.

Adding a mod also downloads the corresponding jar file.

#### Platforms

Currently the 2 possible values of the platform are:

- curseforge
- modrinth

#### How to find the Mod ID?

**On Curseforge** you need the **Project ID** which you can find in the **top right hand corner** of every mod's page.

![](/doc/images/curseforge.png)

**On Modrinth** you need the **Project ID** which you can find in the **bottom left hand corner** of every mod's page.

![](/doc/images/modrinth.png)

<details>
  <summary>Click for examples</summary>


Adding
the [Fabric API from Curseforge](https://www.curseforge.com/minecraft/mc-mods/fabric-api): `mmm add curseforge 306612`

Adding [Sodium from Modrinth](https://modrinth.com/mod/sodium/): `mmm add modrinth AANobbMI`
</details>

---

### INSTALL

`mmm install` or `mmm i`

This makes sure that every mod that is specified in the config file is downloaded and ready to use.

You need to run this command whenever you want to make sure that the previously added mods are downloaded and ready to
use.

The install command works off of the `modlist-lock.json` file which contains the exact version information for any given
mod.

If a `modlist-lock.json` does not exist, the install command will download the latest version of every mod. This is a
limitation of the Minecraft modding ecosystem and the lack of enforced versioning.

> If you are in charge of Modrinth or Curseforge, please mandate the use of semver!

If a `modlist-lock.json` exists, then the install command will *always* download the exact same version of the mods
listed inside of it.

Sending both the `modlist.json` and the `modlist-lock.json` file to other people is the surefire way to ensure that
everyone has the exact same versions of everything.

---

### UPDATE

`mmm update` or `mmm u`

This will try and find newer versions of every mod defined in the `modlist.json` file that matches the given game
version and loader. If a new mod is found, it will be downloaded and the old one will be removed. If the download fails,
the old one will be kept.

You would run this command when you want to make sure that you're using the newest versions of the mods.

Due to the Minecraft modding community's lack of consistent versioning, the "newness" of a mod is defined by the release
date of a file being newer than the old one + the hash of the file being different.

---

### CHANGE

`mmm change [game_version]`

This will attempt to change all the mods that are configured for the mod manager to the supplied
minecraft version.

If no version is given, the command will assume the most recent release version of Minecraft.

It will perform the same check as the `mmm test` would before attempting a change so if either
of the configured mods doesn't support the new game version, the change will not happen.

The process of a `mmm change` is the equivalent of running `mmm test`, deleting all the current mod files
from the configured mods directory, changing the `gameVersion` in the `modlist.json`, then running a
`mmm install`.

The exit codes of this command are identical to the [test](#test) command's.

---

### LIST

`mmm list`

This will list all the mods that are managed by the tool and their current status.

---

### TEST

`mmm test [game_version]`

Test if you can use the specified game version. This is most commonly used to see if you can upgrade to a newer version
of Minecraft and _test_ that all of your configured mods will have a version for it.

For example if you're on 1.19.2 and you want to see if you could upgrade to 1.19.3, you would run: `mmm test 1.19.3`

If you omit the game version, it will use the latest stable minecraft version.

**For server operators and script automation, the command will have a non-zero (1) exit value when it finds mods that
don't support the version you are testing for.**

It will also return a non-zero (2) exit value when you're testing for the version that's already being used.

This means that you could run `mmm test` every day for example, which would in return always check for the latest
Minecraft release. Whenever the command returns with a zero exit code, you can run a version upgrade on your server if
you like.

---

## Explaining the configuration

### modlist-lock.json

You have seen this file mentioned in this document and you might be wondering what to do with it.

The lockfile is 100% managed by the app itself and it ensures consistency across [`install`](#install) runs. It
effectively "locks" the versions to the exact versions you installed with the last [`add`](#add) or [`update`](#update)
commands.

**You don't have to do anything with it!**

If you use version control to manage your server/modpack/configuration then make sure to commit **both**
the `modlist.json` and the `modlist-lock.json`. Together they ensure that you are in full control of what gets
installed.

### modlist.json

The modlist.json is the main configuration file of Minecraft Mod Manager.

It is in JSON format. If you're unfamiliar with JSON or want to make sure that everything is in order, please use
the [JSON Validator](https://jsonlint.com/) website to make sure that the file contents are valid before running the
app.

This is how it looks like if you followed the examples in the [`add`](#add) section:

```json
{
  "loader": "fabric",
  "gameVersion": "1.19.2",
  "modsFolder": "mods",
  "defaultAllowedReleaseTypes": [
    "release",
    "beta"
  ],
  "allowVersionFallback": true,
  "mods": [
    {
      "type": "curseforge",
      "id": "306612",
      "name": "Fabric API",
      "allowedReleaseTypes": [
        "release"
      ]
    },
    {
      "type": "modrinth",
      "id": "AANobbMI",
      "name": "Sodium"
    }
  ]
}
```

> The **mods** field is managed by the [`add`](#add) command, but you can also edit it by hand if you wish.

#### loader _required_

Possible values: `fabric`, `forge`

The loader defines which minecraft loader you're using.

#### gameVersion _required_

This needs to be the game version as listed by Mojang. `1.19`, `1.19.1`, `1.19.2`, etc

#### modsFolder _required_

This points to your mods folder. Traditionally it would be "mods" but you can modify it to whatever your situation
needs.
The value of this could be an absolute path or a relative path.

We recommend you use relative paths as they are more portable.

> __PRO TIP__
>
> Keep the `modlist.json` file in the root of your minecraft installation. Right next to the `server.properties` file.
>
> If the mods folder is relative, it will be a relative path from the modlist.json file. This makes it so that you can
> easily include the modlist json with your modpack or multimc instance so others could make use of it too.

#### defaultAllowedReleaseTypes _required_

Possible values is one or all of the following: `alpha`, `beta`, `release`

You can override this on a per-mod basis with the `allowedReleaseTypes` field in the mod definition.

<details>
  <summary>Example</summary>

To lock Fabric Api to only release versions when everything else could be beta too, use it like below:

```json
{
  ...
  "mods": [
    {
      "type": "curseforge",
      "id": "306612",
      "name": "Fabric API",
      "allowedReleaseTypes": [
        "release"
      ]
    },
    ...
  ]
}
```

</details>

#### allowVersionFallback _optional_

This is a field that exist due to the chaotic nature of Minecraft mod versioning. Setting this `true` will do the
following:

- If a suitable mod isn't found for the given Minecraft version, say 1.19.2, it will try for 1.19.1 (the previous minor
  version)
- If a suitable mod isn't found for the previous minor version, it will try for 1.19 (the previous major version)

This happens quite frequently unfortunately because mod developers either don't update their mods but they still work or
they forget to list the supported Minecraft versions correctly.

This setting will be overridable on an individual mod basis in the next release. Currently, it's a global setting.

## Using with MultiMC

MultiMC is a great tool for managing your Minecraft instances. However, it lacks the capability to keep the mods updated.

You can use Minecraft Mod Manager to keep your mods up to date automatically.

Step 1: Make sure that you have `mmm` in the .minecraft folder of your instance.

Step 2: Edit your instance and go to "Settings" on the left hand side

Step 3: Click on Custom Commands

Step 4: Set the following for the "Pre-launch command" `"$INST_MC_DIR/mmm.exe" update`

It should look something like this:

![](/doc/images/multimc.png)

<br/><hr/>

## <p align="center">Contribute to the project</p>

Feel free to contribute to the project but please read the [contribution guidelines](CONTRIBUTING.md) first before
making any changes.

### Setup

#### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.10 or higher)
- [pnpm](https://pnpm.io) (v7.13.4 or higher)

#### Install dependencies

```bash
pnpm install
```

#### Validate

```bash
pnpm ci
 ```

### Code Considerations

#### Conventional commmit messages

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to generate the changelog and
to automatically bump the version number.

> **Changes not following the Conventional Commits specification will be rejected.**

---

#### Unit testing

The project has been written in a TDD fashion and all contributions are required to have full and meaningful coverage.

> _100% coverage is just the bare minimum_

Untested pull requests will be rejected.

---

#### Linting rules

`pnpm lint` or the `pnpm ci` will apply the supplied linting rules.

##### DO NOT

- suppress linting errors unless there is absolutely no way around them
- modify the rules to make them less strict
- argue about the rules

##### DO

- create contributions that make the rules more coherent
- ask for help if you don't understand why a rule is in place (but first please look up the violation)

##### Exceptions

Sometimes when dealing with external sources, things like `snake_case_names` are inevitable. Those can be suppressed on
the line they occur.

---

#### Documentation

Make sure additions are well documented with the same language and style as the main readme is.

---

#### Using `console.log` and `console.error`

> To make sure that we communicate with the user on the right level,
> all invocations to the `console.log` and the `console.error` functions should
> be done in the `actions` folder. This means that the `console.log` and the
> `console.error` functions should not be used in the `lib` folder.

Read more about this in the [Architecture Decision Record](doc/adr/0002-console-log-only-in-actions.md).
