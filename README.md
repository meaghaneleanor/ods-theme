# ODS Theme

This repo is an extension of Foundation Sites 6, with settings configured for Ontario.ca look and feel.

## Use

You can install this project from the Gitlab repository by running `npm i git+ssh://[git@git.ssh.ontariogovernment.ca:8080]:jenny.zhang/ods-theme.git#v1.0.0` . Alternatively, you can add this to your `package.json`:

```
"ods-theme": "git+ssh://[git@git.ssh.ontariogovernment.ca:8080]:jenny.zhang/ods-theme.git#v1.0.0"
```

Once you have done that, you can do one of two things:

1. include the compiled file CSS file in your project by referencing it directly at `node_modules/ods-theme/dist/ods-theme.min.css`
2. require the SASS components by importing `node_modules/ods-theme/src/ods-theme.scss`

Refer to the [Foundation Sites Docs](https://foundation.zurb.com/sites.html) to see how to use and override Foundation settings. Refer to the folder `src/tools` to see the ODS-specific variables and mixins that you can override or extend.

## Development

You'll need `npm` for local development. After you have cloned the repository, run `npm i` in your terminal to install the dependencies.

Run `npm run start` to start running gulp. This will watch `src/ods-theme.scss` and compile it into a distributed file in `dist/ods-theme.css`. It will watch all subdirectories for imported files, too, but if the import is not included in the master `src/ods-theme.scss` file it will not be found in the final version. Check your imports!

## Styles and standards

The ODS work is loosely based on the Block-Element-Modifier system of CSS architecture. Please refer to the `/standards/basics.md` for more guidance on how to develop for this repo.
