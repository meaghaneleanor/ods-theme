# Ontario Digital Service CSS Guidelines

## CSS Architecture

The CSS architecture for the ODS follows a combination of the Block Element Modifier ([BEM](http://getbem.com/introduction/)) and the Inverted Triangle ([ITCSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)) systems. For more detail on the structure adopted here, please see the [architecture documentation file](./architecture.md).

## Namespacing

All classes specific to the Ontario.ca look and feel should be prefixed with `.ods-`, to reduce the likelihood of conflicting with framework class names or any other CSS you may be applying to your system.

### App-specific namespacing
It is recommended that you also adopt an app-specific namespace to differentiate custom styles from the base Ontario.ca look and feel. For example, for a health project involving Long Term Care, your classes might be prefixed with `.ltc-`.

### Functional namespacing
If you need to add dynamic behaviour to a component, create a new class for it instead of applying it to an existing class. This prevents accidentally breaking dynamic behaviour when CSS attributes change, and clearly communicates to the reader what the function of the class is. For example, for the health project described above, all classes tied to Javascript functions might be prefixed with `.ltc-js-`.

## Selector specificity

## Nesting

## Mobile development

## Using Frameworks

As much as possible, avoid baking in framework-specific classes.

## Sources

https://github.com/alphagov/govuk-frontend/blob/master/docs/contributing/coding-standards/css.md
https://medium.com/@mktlr/the-backendification-of-frontend-development-62f218a773d4
