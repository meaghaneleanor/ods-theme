# ODS Theme

This repo is an extension of Foundation Sites 6, with settings configured for Ontario.ca look and feel.

## Development

### Installation

You'll need `npm` for local development. After you have cloned the repository, run `npm i` in your terminal to install the dependencies.

Run `npm run start` to start running gulp. This will watch `src/ods-theme.scss` and compile it into a distributed file in `dist/ods-theme.css`. It will also watch all subdirectories for imported files, but if the import is not included in the master `src/ods-theme.scss` file it will not be compiled into the final version. Check your imports!

### Development

The ODS work is loosely based on the Block-Element-Modifier system of CSS architecture. Please refer to the `/standards/basics.md` for more guidance on how to develop for this repo.

### Deployment

This project uses Gitlab's CI/CD pipeline to generate versioned releases. In order to release a version, create a new tag in Gitlab. The tag name should be the **version number** only. If you're not sure what the current version should be, consult a senior developer on the project.

Follow [semantic versioning](https://semver.org/) in your releases.

After you've created the tag, go to the pipelines for this project and make sure it runs smoothly. The pipeline will compress everything in the project and drop it onto the corresponding AWS sandbox (see section on "Usage" below)

## Usage

### npm

To use this repo in a node project, add the following to your to your `package.json` and run `npm `i (replacing `TAG_NAME` with the version you want to install:

`"ods-theme": "http://designsystem.ontariogovernment.ca/ods-theme/ods-theme-v<TAG_NAME>.tar.gz",`

So, for example, a release tagged `0.0.5` would look like this:

```http://designsystem.ontariogovernment.ca/ods-theme/ods-theme-v0.0.5.tar.gz```

Once you've installed it, you can then tmport the root SASS component by importing it into your own SASS file with `@import "<ODS_THEME_DIRECTORY>/src/sass/ods-theme.scss";`

Method #2 will give you access to the mixins, variables, and functions of the `ods-theme`, which you can then override or extend. Refer to the folder `src/tools` to see the ODS-specific variables and mixins that you can override or extend. Depending on how you are compiling your project, you can set up an alias for `ODS_THEME_DIRECTORY` to make it easier for you to import this file. Refer to `git.ontariogovernment.ca/jenny.zhang/minifront.git"` for an example of how to accomplish this.

### CDN

If you want to directly link to the minified CSS files and treat this like a CDN, you have the option of either linking directly to a versioned file or just accessing the `latest` release. You won't have access to the SASS mixins or variables, but you can override classes the way you can with regular CSS.

A versioned file will follow this pattern:

```http://designsystem.ontariogovernment.ca/ods-theme/css/<VERSION_NUMBER>/ods-theme.css```

The latest file will follow this pattern:

```http://designsystem.ontariogovernment.ca/ods-theme/css/latest/ods-theme.css```

Versioned files are essentially historical archives and will never changed. `latest` versions will update every time there's a release.

Each folder will have:

```
ods-theme.css
ods-theme.map.css
ods-theme.min.css
ods-theme.min.map.css
```
There will also be a fonts folder that includes all the font assets:

```http://designsystem.ontariogovernment.ca/ods-theme/css/fonts/```

### Local development use

You can download the theme and point your `package.json` to your local relative directory:

`"ods-theme": "../ods-theme"`

If you are working on the `ods-theme` repo at the same time as you are working on a project or application that is using it, this is the easiest way of testing that changes in one are reflected in the other. However, due to the way `npm` handles local repositories, this will create a symlink from the `node_modules` folder of your project directory to that relative theme directory. You may need to temporary adjust imports in `ods-theme.scss` while you're working locally.

## JavaScript

While this package relies on Foundation, it only exports and packages up CSS. If you want to use any of the Javascript modules provided by Foundation, refer to the [Foundation Sites Docs](https://foundation.zurb.com/sites.html) on how to import that manually.

For using JS on a Vue project, refer to `git.ontariogovernment.ca/jenny.zhang/minifront.git"` for an example of how to create universal Foundation plugins.
