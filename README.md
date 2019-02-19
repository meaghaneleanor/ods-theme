# ODS Theme

This repo is an extension of Foundation Sites 6, with settings configured for Ontario.ca look and feel.

## Development

### Installation

You'll need `npm` for local development. After you have cloned the repository, run `npm i` in your terminal to install the dependencies.

Run `npm run start` to start running gulp. This will watch `src/ods-theme.scss` and compile it into a distributed file in `dist/ods-theme.css`. It will also watch all subdirectories for imported files, but if the import is not included in the master `src/ods-theme.scss` file it will not be compiled into the final version. Check your imports!

### Development

The ODS work is loosely based on the Block-Element-Modifier system of CSS architecture. Please refer to the `/standards/basics.md` for more guidance on how to develop for this repo.

## Usage

### Installation

For now, this repo lives in a private Gitlab repository. To access it, you have to create a [personal access token](https://git.ontariogovernment.ca/profile/personal_access_tokens) for your Gitlab. Then add this to your `package.json` and run `npm i`:

`"ods-theme": "git+https://oauth2:<GITLAB_ACCESS_TOKEN>@git.ontariogovernment.ca/jenny.zhang/ods-theme.git",`

Note: This is just a temporary workaround while the CSS package is in a private repo. **Do not actually commit your Gitlab access token to the repo itself**!

Alternatively, you can download the theme and point your `package.json` to your local relative directory:

`"ods-theme": "../ods-theme"`

If you are working on the `ods-theme` repo at the same time as you are working on a project or application that is using it, this is the easiest way of testing that changes in one are reflected in the other. However, due to the way `npm` handles local repositories, this will create a symlink from the `node_modules` folder of your project directory to that relative theme directory. You may need to temporary adjust imports in `ods-theme.scss` while you're working locally.

### CSS

Once you have installed the repo, you can do one of two things:

1. Include the compiled file CSS file in your project directly by referencing `node_modules/ods-theme/dist/css/ods-theme.min.css` in your HTML (or by copying the file to a `public` or `dist` folder)
2. Import the root SASS component by importing it into your own SASS file with `@import "<ODS_THEME_DIRECTORY>/src/sass/ods-theme.scss";`

Method #2 will give you access to the mixins, variables, and functions of the `ods-theme`, which you can then override or extend. Refer to the folder `src/tools` to see the ODS-specific variables and mixins that you can override or extend. Depending on how you are compiling your project, you can set up an alias for `ODS_THEME_DIRECTORY` to make it easier for you to import this file. Refer to `git.ontariogovernment.ca/jenny.zhang/minifront.git"` for an example of how to accomplish this.

The SASS in the `ods-theme` project provides two variables for static assets, `$fontDir` and `$assetDir`. These are provided so that relative URL schemes within CSS (e.g. for font includes, background images, etc) can be kept flexible. By default they are set to `../fonts` and `../assets`, relative to the compiled CSS from the `dist` folder. If you want to work with the dynamic SASS components, set these variables to be relative from your project SASS file:

`$assetsDir: '../../node_modules/ods-theme/src/assets';`

Test your settings with both live development (e.g. with webpack hot reload) and with generating a static build.

### JavaScript

The `ods-theme` project exports the basic Foundation object along with all required modules, already attached to jQuery. Import the Foundation object with something like

`import Foundation from 'ods-theme'`

Refer to the [Foundation Sites Docs](https://foundation.zurb.com/sites.html) to see how to use and override Foundation settings. For using JS on a Vue project, refer to `git.ontariogovernment.ca/jenny.zhang/minifront.git"` for an example of how to create universal Foundation plugins.
