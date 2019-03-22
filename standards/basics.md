# Ontario Digital Service CSS Guidelines

## CSS Architecture

The CSS architecture for the ODS follows a combination of the Block Element Modifier ([BEM](http://getbem.com/introduction/)) and the Inverted Triangle ([ITCSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)) systems. For more detail on the structure adopted here, please see the [architecture documentation file](./architecture.md).

## Basics

### Directory variables

Because this project is designed to work both as a repository of dynamic variables and as a set of static distributed files, there are a few SASS variables provided to make sure that asset paths are accurate. These are: `$fontDir` and `$assetDir`, and are set to `../fonts` and `../assets` by default (which is relative to the compiled CSS from the `dist` folder).

When specifying paths to anything related to those folders, make sure to use those variables in the CSS instead of relative paths:

`src: url('#{$fontDir}/...');`

### Assets

Any assets in the `/src` file that are not `.scss` files will be copied, with directory structure maintained, to the `dist` folder upon deploying.

## Namespacing
All classes specific to the Ontario.ca look and feel should be prefixed with `.ontario-`, to reduce the likelihood of conflicting with framework class names or any other CSS you may be applying to your system.

### App-specific namespacing
It is recommended that you also adopt an app-specific namespace to differentiate custom styles from the base Ontario.ca look and feel. For example, for a health project involving Long Term Care, your classes might be prefixed with `.ltc-`.

### Functional namespacing
If you need to add dynamic behaviour to a component, create a new class for it instead of applying it to an existing class. This prevents accidentally breaking dynamic behaviour when CSS attributes change, and clearly communicates to the reader what the function of the class is. For example, for the health project described above, all classes tied to Javascript functions might be prefixed with `.ltc-js-`.

## Using the Foundation Framework

As much as possible, avoid baking in framework-specific classes. With the exception of layout classes (grids, columns, etc), you should treat the Foundation framework as decorators for your own classes. For example, if you want to specify a button that looks like the Foundation button, instead of using:

```<a class="button">```

You should use a name-spaced

```<a class="ontario-button">```

And then extend the Foundation button in SASS:

```
.ontario-button {
  @extend .button;
  // ...additional styes
}
```

This has the main benefit of allowing you to switch out different frameworks in the future, so that if you no longer want to use Foundation, you only need to change the extension in `.ontario-button` instead of swaping out class specifications elsewhere in the app. This convention was suggested by Mike Taylor - [read this article for more information](https://medium.com/@mktlr/the-backendification-of-frontend-development-62f218a773d4).

A similar principle applies to CSS variables. Instead of using `$body-font-color`, which is a Foundation-provided name, create an ODS-specific variable called `$ontario-font-color` and set that variable to `$body-font-color`.

## Chaining vs. extending

When creating multiple variants of the same basic element, there are two main options. Either you use a single CSS class for each variant that contains all of the CSS required to style that element and apply that class to the HTML element, or you define a baseline style for all variants, and use additional classes to apply variant styles.

The advantage of the first method is more readable HTML. The advantage of the second method is less repeated and more maintainable code. Avoid using `@extend` (except in cases of applying the Foundation settings) in your variant classes, because that will create a lot of redundant code in the final compiled CSS. Instead, if you're building variants, you should follow this basic pattern:

```
.ontario-element {
  // baseline styles that apply to all variants
  margin: 1rem;
  padding: 0.5rem;
  font-size: $ods-body-font-size;
  display: block;
}

.ontario-element--alert {
  color: $font-color--alert;
}

.ontario-element--disabled {
  color: $font-color--disabled;
}
```

The trade-off is that the HTML will look a little bit more redundant, like `<a class="ontario-button ontario-button--disabled">`, but this will be easier to maintain in the long-run.

## Nesting

Sass nesting can be very helpful for organizing your thinking while you're developing, but heavily nested code is difficult to read, search through, and maintain. Try to have no more than 3 levels of nesting in your code, and when defining elements inside blocks, break them out of the containing block instead of using `&` parent selectors:

Good:

```
.ontario-header {

}

.ontario-header__logo {

}
```

Bad:

```
.ontario-header {
  &__logo {

  }
}
```

## Selector specificity

## Mobile development

## Icon fonts

## Sources

https://github.com/alphagov/govuk-frontend/blob/master/docs/contributing/coding-standards/css.md
