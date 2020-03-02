# ODS Theme

This project provides the CSS and assets required for any front-end developer to create a website or application that matches the Ontario.ca branding and look and feel. It is an extension of Foundation Sites 6.

## Using the theme

Developers can make use of this theme in several different ways:

* Referencing the compiled CSS directly from a CDN (suggested path for OPS developers)
* Importing the project as a Git submodule (internal ODS developers only)
* Installing as a node package

Refer to the Ontario Design System to see how the classes in this theme can be used. We recommend following the same CSS coding standards as the `ods-theme` project if you are overriding or extending its classes. This theme uses a combination of Block-Element-Modifer and ITCSS - please refer to the `/standards` folder in this project for more detail.

### Installation

You'll need `npm` for local development. After you have cloned the repository, run `npm i` in your terminal to install the dependencies.

Run `npm run start` to start running gulp. This will watch `src/ods-theme.scss` and compile it into a distributed file in `dist/ods-theme.css`. It will also watch all subdirectories for imported files, but if the import is not included in the master `src/ods-theme.scss` file it will not be compiled into the final version. Check your imports!

### Development

All CSS for this project must follow the standards laid out in the `/standards` folder.
