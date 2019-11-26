# ODS Theme

This project provides the CSS and assets required for any front-end developer to create a website or application that matches the Ontario.ca branding and look and feel. It is an extension of Foundation Sites 6.

## Using the theme

Developers can make use of this theme in several different ways:

* Referencing the compiled CSS directly from a CDN (suggested path for OPS developers)
* Importing the project as a Git submodule (internal ODS developers only)
* Installing as a node package

Refer to the Ontario Design System to see how the classes in this theme can be used. We recommend following the same CSS coding standards as the `ods-theme` project if you are overriding or extending its classes. This theme uses a combination of Block-Element-Modifer and ITCSS - please refer to the `/standards` folder in this project for more detail.

### Referencing the compiled CSS directly

The simplest option, and the option we recommend to OPS developers, is making use of our hosted and compiled CSS files on our content distribution network (CDN). This method won't give you access to the SASS mixins or variables, but you can override classes the way you can with regular CSS.

You have the option of either linking directly to a versioned file or just accessing the most recent stable release. Versioned files are essentially historical archives and will never change from the day you started using it. The `latest` version of each file will update every time there's a release. If you would like to be notified when this happens, contact Robyn Walter on the Design System team.

The folder for the most recent release:

```
https://files.ontario.ca/design-system/theme/css/latest/
```

The folder for a historical version:

```
https://files.ontario.ca/design-system/theme/css/VERSION_NUMBER/
```

Each set of files will have the following contents:

```
ods-theme.css
ods-theme.map.css
ods-theme.min.css
ods-theme.min.map.css
```

So for example, the latest CSS can be found at this location:

```
https://files.ontario.ca/design-system/theme/css/latest/ods-theme.css
```

More information available about file patterns in the [Design System Tech Deck](https://docs.google.com/presentation/d/1wJfxcDwUYSPI1g8gD9D4H1FH1QGXJzvxxQlBd_ZVCZk/).

#### Fonts

There is also a file called `fonts.css` that will refer to all the font files available to you:

```
https://files.ontario.ca/design-system/theme/fonts/fonts.css
```

The font files are also available to be directly downloaded to your local system at the following URL:

```
https://files.ontario.ca/design-system/theme/fonts.tar.gz
```

#### Icons

SVG icons used in the theme can be separately downloaded. **Further documentation to come**.

### Importing the project as a Git submodule

This option is only available to internal ODS developers and their partners, because it requires acess to our Gitlab system. Inside of a project that is being tracked with Git, you can create a directory that will refer directly to the Git repo for this project, known as a submodule. Any version control commands you use on your project will not affect that submodule, but you can manually check for version updates.

The command to link a subdirectory in your project to the `ods-theme` repo is as follows:

```
git subtree add --prefix $DIRECTORY \[git@git.ssh.ontariogovernment.ca:8080\]:frontend/ods-theme.git master --squash
```

To update the subdirectory:

```
git subtree pull --prefix $DIRECTORY \[git@git.ssh.ontariogovernment.ca:8080\]:frontend/ods-theme.git master --squash
```

This method is currently being used on the Drupal 8 migration project, so refer to the `ontario-ca-d8` team if you have any questions. You may want to add these as aliases in your command line.

### Installing as a node package

To use this repo in a node project, add the following to your to your `package.json` and run `npm `i (replacing `TAG_NAME` with the version you want to install:

`"theme": "http://files.ontario.ca/design-system/theme/ods-theme-<VERSION_NUMBER>.tar.gz",`

So, for example, a release tagged `0.0.5` would look like this:

```http://files.ontario.ca/design-system/theme/ods-theme-v0.0.5.tar.gz```

Once you've installed it, you can then import the root SASS component by importing it into your own SASS file with `@import "<ODS_THEME_DIRECTORY>/src/sass/ods-theme.scss";`

This will give you access to the mixins, variables, and functions of the `ods-theme`, which you can then override or extend. Refer to the folder `src/tools` to see the ODS-specific variables and mixins that you can override or extend. Depending on how you are compiling your project, you can set up an alias for `ODS_THEME_DIRECTORY` to make it easier for you to import this file.

#### Local development use

Alternatively, you can download the theme and unzip it in your local project. Point your `package.json` to your local relative directory:

`"ods-theme": "../ods-theme"`

If you are working on the `ods-theme` repo at the same time as you are working on a project or application that is using it, this is the easiest way of testing that changes in one are reflected in the other. However, due to the way `npm` handles local repositories, this will create a symlink from the `node_modules` folder of your project directory to that relative theme directory. You may need to temporary adjust imports in `ods-theme.scss` while you're working locally.

## Developing the ods-theme

This theme is jointly maintained by the Ontario Design System team and the frontend experts of the Ontario Digital Service tech chapter. If you have questions about anything here, please reach out to #c-technology or #p-design-system for help. The following instructions apply to developers who are **extending or modifying the theme**, not to end-user developers who are using the theme create their own internal applications.

### Installation

You'll need `npm` for local development. After you have cloned the repository, run `npm i` in your terminal to install the dependencies.

Run `npm run start` to start running gulp. This will watch `src/ods-theme.scss` and compile it into a distributed file in `dist/ods-theme.css`. It will also watch all subdirectories for imported files, but if the import is not included in the master `src/ods-theme.scss` file it will not be compiled into the final version. Check your imports!

### Development

All CSS for this project must follow the standards laid out in the `/standards` folder, and be code reviewed by a member of the ODS Technology Chapter before being merged. Please reach out to #c-technology in Slack if you are unsure how to go about this.

The `master` branch of this project is the production branch, and the `develop` branch of this project is the staging branch. All other work should be done in feature branches. For a sample workflow of how this is done, refer to the README file of the design system project.

### Deployment

This project uses Gitlab's CI/CD pipeline to generate versioned releases. In order to release a version, create a new tag in Gitlab. The tag name should be the **version number** only. If you're not sure what the current version should be, consult a senior developer on the project.

Follow [semantic versioning](https://semver.org/) in your releases.

After you've created the tag, go to the pipelines for this project and make sure it runs smoothly. The pipeline will compress everything in the project and drop it onto the corresponding AWS sandbox (see section on "Usage" below)


## Deployment

A gulp pipeline has been set up that will compile a static build of the Fractal project, including all compiled CSS. This can be run manually with `npm run build`.

 The standard ontariogovernment HTTP username and password are required to access this page. Please refer to the product manager for this project if you don't know what this is.

### Staging

In order to deploy a staging version of this project, create a merge request from `testing` to `develop`. This will automatically trigger the staging build process using a [CI/CD pipeline job](https://git.ontariogovernment.ca/frontend/ods-theme/pipelines) that you can monitor for its ongoing success. If anything fails at this point, contact #discuss-devops in Slack.

Staged versions of the project will be deployed to https://designsystem.ontariogovernment.ca/ods-theme instead of https://files.ontario.ca/design-system/theme. All other URL patterns are the same.

### Production

In order to deploy a version of this project to production, create a merge request from `develop` to `master`. Then, you must create a new **version release tag**, which is a read-only checkpoint in your git history. Follow [semantic versioning](https://semver.org/) in your release naming, and indicate through the naming whether your release is a patch, a minor fix, or a major upgrade that will break backwards compatibility.

The `.gitlab-ci.yml` has steps for Production deployment set up, but it currently does not go anywhere because a deployment server has not been provisioned yet. If you would like to deploy to `designsystem.ontario.ca` in production form, please talk to Devops about setting up a production environment and an associated Ansible script. Refer to the `ods-theme` deployment documentation CI/CD pipeline to see an example.
