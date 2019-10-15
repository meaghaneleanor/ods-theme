# Ontario Digital Service CSS Guidelines

## **CSS Architecture**

### **BEM**

The Ontario theme uses the [Block Element Modifier](http://getbem.com/introduction/) (BEM) methodology for naming CSS classes and variables. This allows CSS developers to see at a glance how classes relate to one another while maintaining the modularity of blocks.

The basic BEM convention goes: ``.block-name__element-name--modifier-state``, with double underscores denoting relationships between elements, and double hyphens indicating variants and states. 

- **Blocks** are independent components of the page. 
  - _Example:_ `.ontario-header`, `.ontario-site-nav`, `.ontario-image`, etc.
- **Elements** are children of blocks. An element can only have one parent Block, and can’t be used independently outside of that block. 
  - _Example:_ `.ontario-footer__notice-links`, `.ontario-panel__image`, `.ontario-fact-block__heading`
- A M**odifier** defines the look, state and behavior of a block or an element. It contains only additional styles that change the original block implementation in some way. This allows you to set the appearance of a universal block only once, and add only those features that differ from the original block code into the modifier styles.
  - _Example_: `.ontario-form-label—-required`, `.ontario-button-—alert`, .`ontario-form-input__button—clear`.

It is important to note to only use the parts you need: elements can also be ``.block-name__element-name``, ``.block-name--modifier-name``, or just ``.block-name``.

**Examples:**

    // Block-name class
    .ontario-form-input {
    	background-color: $ontario-darkest-gray;
    }
    
    // Block-name__element-name class
    .ontario-form-input__button {
    	background-color: $ontario-white;
    }
    
    // Block-name__element-name--modifer class
    .ontario-form-input__button--clear {
    	display: inline-block
    }
    
    // Block-name--modifier-name
    .ontario-label--status-open {
    	backgorund-color: $ontario-label-status-open-bg;
    }

A good analogy for the BEM naming structure can be found in this article: [https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/](https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/)


**Benefits of BEM:**

Benefits of the BEM methodology include:

1. **Better HTML/CSS decoupling**
    - By avoiding use of HTML element names in CSS selectors, BEM makes CSS code readily portable to a different HTML structure.
2. **Better CSS performance**
    - Browsers evaluate CSS selectors right to left and BEM encourages frontend developers to create a flat CSS structure with no nested selectors. So the less browsers have to evaluate, the faster they can render.
3. **No CSS conflicts**
    - BEM avoids CSS conflicts by using unique contextual class names for every block, element and modifier combination.
    - BEM reduces style conflicts by keeping CSS specificity to a minimum.
4. **Easier code maintenance**
    - BEM's modular approach encourages developing independent modules of code and hence easier to maintain & update without affecting other modules in the project.
    - BEM avoids CSS inheritance and provides some sort of scope by using *unique* CSS classes per element.
5. **Ensuring that styles adhere to the single responsibility principle**
    - The Single Responsibility Principle states that every module or chunk of code should do one job well and one job only. The benefits of this are mainly in the way of maintainability and extensibility.
    - Styles for elements should never be dependent on other elements on the page, and when properly implemented, BEM allows you to safely add and remove styles without worrying about side effects. Most styles should only require a single selector, and this flat hierarchy helps developers avoid unnecessarily escalating CSS selector specificity and makes it more easy to maintain in the long run.


### **ITCSS**

In addition to BEM, this theme follows Harry Roberts' Inverted Triangle CSS (ITCSS) method of organizing code, to provide further structure. The inverted triangle organizes code along three axes:

- Generic to explicit
- Low specificity to high specificity
- Far-reaching to localised.


That means that styles that appear in the beginning of the project tend to be general styles that affect large pieces of the DOM (Document Object Model), while styles that appear later target very specific elements in explicit ways.

The code is broken out into 7 sections:

1. **Settings:**
    - Global variables like font sizes, colour variables, etc. This includes settings for vendor frameworks like Foundation. If you would like to define variables for re-use in a specific component, please keep it local to that component file, for ease of future maintenance.
    - ***Note:** these files should not generate actual CSS.*
2. **Tools:**
    - Globally available mixins, functions, etc. Like with settings, if you would like to define a mixin that will only be used in one component, please keep it in that component file.
    - ***Note:** these files should not generate actual CSS.*
3. **Generics:**
    - High level and far-reaching styles that should be minimally modified once they have been defined. This layer will probably look the same for every project you work on.
4. **Elements:**
    - Bare unclassed HTML elements. These should only be element-level selectors, **not** classes or ids.
5. **Objects:**
    - Non-structured design patterns, such as wrappers, containers, layout systems, typography, and media. Selectors here should have at **most** one class.
6. **Components:**
    - Recognizable design patterns and UI pieces. Selectors here should have at *least* one class.
7. **Overrides:**
    - Helper classes that should override all other patterns, for specific behaviours such as clearfixing, text alignment, etc.

**Resources:**
[https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)


### **File Structure**

All files that would be regularly edited by developers live in the "*src*" and "*standards*" folder of this project. All the SASS files live under "*src/sass*" with `.ods-theme.scss` being the main compiled CSS file and containing all the other Sass imports.  

The Sass is broken into partials all falling within different sections of the ITCSS structure. An explanation of the ITCSS structure and what types of partials live where is detailed in the section above. 

The partials should be kept as small and granular as possible, with each one containing only as much CSS as it needs to fulfil its role. For example, `**_elements.headings.scss**` would contain only the rules h1 to h6 and nothing more. If you had, for example, a page title component that makes a main heading (e.g. h1) and a subheading (e.g. h2) look a certain way, you would create a `**_components.page-title.scss**` partial in the **Components** layer and bind onto classes (e.g. `.page-title`, `.page-title-sub`), not onto HTML elements. This project also groups various component partials in their own separate folders, for better organization.


**CSS Organization:**

When applicable, CSS organization for this project is as follows: 

- Variables are kept at the top of the file (so they can be referenced later throughout the CSS partial)
- Classes relating to the specific target of that partial are next
- Lastly are any class modifiers or variations.

All documentation surrounding the project lives in the "*standards"* folder.

### **Importing**

Since CSS rules are read from top to bottom, Sass imports can be used to control inheritance and specificity. In the "src/sass/ods-theme.scss" file, all the Sass imports reflect the ITCSS structure the projects CSS follows: the generic, global styles are imported first, and the files with more specificity are imported later.

A general rule of thumb for Sass imports (if not using a structured methodology like ITCSS) is:

- Start with base elements, global styles & global variables first.
- Move to single nested classes and utils.
- Move next to more specific classes, often with nesting.
- Move next to overrides
- Only modify import order for groups of files, not specific files.

**Assets:**

Any assets in the "*/src*" file that are not "*.scss*" files will be copied, with directory structure maintained, to the **dist** folder upon deploying.

**Directory Variables:**

Because this project is designed to work both as a repository of dynamic variables and as a set of static distributed files, there are a few Sass variables provided to make sure that asset paths are accurate. These are: ``$fontDir`` and ``$assetDir``, which are are set to "*../fonts*" and "*../assets*" respectively by default (which is relative to the compiled CSS from the **dist** folder).

When specifying paths to anything related to those folders, make sure to use those variables in the CSS instead of relative paths:

`src: url('#{$fontDir}/...');`

## **Namespacing**

All classes specific to the [ontario.ca](http://ontario.ca) look and feel, or held within the ontario theme repo, should be prefixed with `.ontario-`, to reduce the likelihood of conflicting with framework class names or any other CSS you may be applying to your system.

### *App-specific namespacing*

It is recommended that you also adopt an app-specific namespace to differentiate custom styles from the base [ontario.ca](http://ontario.ca) look and feel/ontario theme. For example, for styles specific to a health project involving Long Term Care, your classes might be prefixed with `.ltc-`.

### *Functional namespacing*

If you need to add dynamic behaviour to a component, best practice is to create a new class for it instead of applying it to an existing class. This prevents accidentally breaking dynamic behaviour when CSS attributes change, and clearly communicates to the reader what the function of the class is. For example, all classes tied to Javascript functions might be prefixed with `.ontario-js-`. If it were specific to the Long Term Care project (described above), it might be prefixed with `.ltc-js-`.

## Nesting

Sass nesting can be very helpful for organizing your thinking while you're developing. Howeer, heavily nested code is difficult to read, search through, and maintain. 

General rules to follow when it comes to nesting are:

- Try to have **no more than 3 levels of nesting** in your code
    - This rule also applies for selector specificity. Specificity determines which CSS rule is applied by the browsers. If two selectors apply to the same element, the one with higher specificity wins.
- When defining elements inside blocks, break them out of the containing block instead of using `&` parent selectors:

        Good:
        .ontario-header { }
        
        .ontario-header__logo { }
        
        Bad:
        .ontario-header {
        	&__logo { }
        }

- It is best to save nesting for specific scenarios, such as:
    - Adding pseudo-classes (i.e: hover/focus/visited/active states etc.)
    - Adding pseudo-elements (i.e: `::before`, `::after`, `:first-of-type`, etc.)
    - Media Queries

## Linting

This project currently does not have linting set in place.

## Documentation

Documentation - whether technical or non - is extremely important for any project. It is a way of  providing easier understanding of software, architecture and design and also acts as a reference for later accesses.

Documentation can come in the form of comments, official documentation, README's, repo Wiki's, etc. Discuss with your team and come to a concensus on which conventions you’ll use and how you should implement them.

### Commenting

A CSS comment is used to add explanatory notes to the code or to prevent the browser from interpreting specific parts of the style sheet.

This project uses comments as a way of delineating/organizing sections in a CSS file, or to include reasoning for any complex styles that may not be obvious to another developer at first glance.

It is important to note, however, that if your code is only understandable with comments attached, your code should be refactored. Since there is nothing enforcing that comments must be updated when your code is, often times comments start drifting from code. Comments are a nice to have, but they should never be essential.

**Example:** 

    /* -------------------------------
        Panel Variables
    --------------------------------- */
    
    $ontario-panel-aside-bg: #f5f5f5;
    $ontario-panel-callout-bg: #dff3f3;
    
    /* -------------------------------
        Panel Classes
    --------------------------------- */
    
    .ontario-panel {
        border-color: $ontario-gray-10;
        border-style: solid;
    }
    
    /*
        This targets an error panel/message for a required input field.
        This is to allow for a smaller panel to display error messages
        in forms. 
    */
    input:required + .ontario-panel--error,
    textarea:required + .ontario-panel-error,
    fieldset:required + .ontario-panel-error,
    select:required + .ontario-panel-error {
        padding: .375rem;
    }
    
    /* Panel color variations */
    .ontario-panel--aside {
        background: $ontario-panel-aside-bg;
    }

Other recommedations may suggest indexing the contents of your stylesheets, which is a great way to provide a snapshot of what's in the stylesheet and a must in those projects where, for whatever reason, there are long stylesheets. 

**Example:**

    /**
     * _icons.components.scss
     *
     * Icons should convey in a simple and meaningful way the concept of the function
     * they represent. When designing new icons be sure to remove any complexities 
     * and follow the linear and lightweight appearance of the icon set.
     *
     * Index
     * - Icon Font
     * - Icon Variations
     * - Icon Animations
     *
     */

### **How to write good documentation:**

Good documentation is  usually short, simple, and easy to understand. Here are a few guidelines you can follow:

- Understand who the documentation is aimed for. Is it only for developers? Is it for external use? Understanding this will save you time, since you will know up front how much to elaborate in your explanations.
- Write a short, but descriptive background explaining the main points of what you built. This will help readers understand the purpose of the feature and ascertain its relevance to what they want to know.
- List and describe the main perspectives of your feature, making sure to point out any dependencies that exist with other features.
- Make sure there is a timestamp, to tell readers the validity of the documentation.
- Be generous with your coding examples, detailing how to properly use the feature you wrote and showcase the expected results. Include comments!

## **Frameworks**

To maintain tech agnosticity, the intent for the Ontario theme is to be independent from third-party frameworks. However, because the current implementation was based off of the current [Ontario.ca](http://ontario.ca) CSS, the Ontario theme has some dependencies on **[Foundation 6](https://foundation.zurb.com/sites/docs/).**

The current guidance towards working with the Ontario theme and using the Foundation framework is to, as much as possible, avoid baking in framework-specific classes. With the exception of layout classes (grids, columns, etc), you should treat the Foundation framework as decorators for your own classes. For example, if you want to specify a button that looks like the Foundation button, instead of using:

`<a class="button">`

You should use a name-spaced

`<a class="ontario-button">`

And then extend the Foundation button in Sass:

    .ontario-button {
    	@extend .button;
    	// additional styles
    }

This has the main benefit of allowing you to switch out different frameworks in the future, so that if you no longer want to use Foundation, you only need to change the extension in `.ontario-button` instead of swaping out class specifications elsewhere in the app. This convention was suggested by Mike Taylor: [https://medium.com/@mktlr/the-backendification-of-frontend-development-62f218a773d4](https://medium.com/@mktlr/the-backendification-of-frontend-development-62f218a773d4).

A similar principle applies to CSS variables. Instead of using `$body-font-color`, which is a Foundation-provided name, create an ODS-specific variable called `$ontario-font-color` and set that variable to `$body-font-color.`

### Where to find the Foundation files in the Ontario theme

A list of the current Foundation settings the Ontario theme is currently using/can make use of can be found under `src/sass/1-settings/_foundation.settings.sass`, and all the CSS Foundation imports can be found under `src/sass/2-tools/_foundation.includes.scss`.

## **Standards & Formatting**

Your coding standards or CSS style guide refers to the way your team has agreed on writing CSS. This includes the best practices on writing code, like formatting, naming, and syntax conventions.

The way one developer writes code can greatly differ from another. This is why it’s important for your team to set coding standards. This ensures that code is consistent across a project, which makes it easier to read, write and review. Make sure that anything that you include in your coding standards is a practice that your team has agreed on.

Some example of coding standards/practices this project uses are:

- Write multiple selectors on separate lines.

        .ontario-button--alert,
        input.ontario-button--alert {
           //...styles
        }

- Put one space after : in property declarations.
- Use 4 space indents
- Allow max 3-rule property shorthand if possible
- Files should always have a final newline, etc.

Some of these rules can be specified by your editor via your linting rules.

## **Mixins & Extends**

When creating multiple variants of the same basic element, there are two main options. You can either use a single CSS class for each variant that contains all of the CSS required to style that element, or you define a baseline style for all variants, and use additional classes to apply variant styles (also known in Sass as **mixins**).

The advantage of the first method is more readable HTML, because each variant only needs one class. The advantage of the second method is less repeated and more maintainable code, because there is less redundant CSS between classes. This project uses **mixins** - the second strategy.

### **Mixins**

**Best practices:** 

- Use mixins for groups of properties that appear together intentionally and are used multiple times.

        @mixin clearfix { 
        	&:after { 
        		content: ''; 
        		display: table; 
        		clear: both; 
          }
        }

- Use mixins for components to change size.
- Use mixins when something requires parameters.

        @mixin size($width, $height: $width) { 
        	width: $width; 
        	height: $height;
        }

**Don't do it:** 

- Do **NOT** use mixins for browser prefixes. Use some type of autoprefixer.

        // Bad
        @mixin transform($value) { 
        	-webkit-transform: $value; 
        	-moz-transform: $value; 
        	transform: $value;
        }

### **Extend**

Be very careful with using **extend**. It’s a powerful tool that can have disastrous side-effects (namely, specificy and inheritence issues). Our recommendation would be to avoid using it as much as possible, except in cases of applying the Foundation settings. Before using please consider:

- Where is my current selector going to be appended?
- Am I likely to be causing undesired side-effects?
- How large is the CSS generated by this single **extend**?

If you think you need to use **extend**, follow these rules to avoid running into trouble:

- Use **extend** from within a module, not across different modules.
- Use **extend** on placeholders exclusively, not on actual selectors.
- Make sure the placeholder you extend is present as little as possible in the stylesheet.

**Recommended alternatives to Extend:** 

If you're building variants, you should follow a pattern of having a a class for all baseline styles of an element, and modifier classes for any variants. A **mixin** could also be used!

**Example:** 

    .ontario-element {
    	// baseline styles that apply to all variants
    	margin: 1rem;
    	padding: 0.5rem;
    	font-size: $ontario-body-font-size;
    	display: block;
    }
    
    .ontario-element--alert {
    	color: $font-color--alert;
    }
    
    .ontario-element--disabled {
    	color: $font-color--disabled;
    }

The trade-off is that the HTML will look a little bit more redundant, like `<a class="ontario-button ontario-button--disabled">`, but this will be easier to maintain in the long-run. If you need to share code between classes but the baseline code will never be used, consider using a [placeholder](https://sass-lang.com/documentation/style-rules/placeholder-selectors).

## Preprocessors

`node-sass` is the preprocessor used for compiling the scss files in this project.

`gulp` is also used as a task runner for this project to minify the compiled css, as well as compile assets into the distributed folder. 

## **Units**

There are many different ways you could approach using CSS units for different elements - the most important thing is to research, reach a consensus amongst your team for what to use, and maintain consistency throughout. That being said, here are some general guidelines that can be referenced or used based on the tech teams research:

### **Measurements**

[Recommendations of unit types per media type:](https://www.notion.so/5fc14cb917134a8c8a98c5cc3e24c2e9)

Relative units (%, em, rem) play nicely with both screen and media types and should be the most frequently used CSS units.

Viewport-percentage length units should be used with caution, as there is still some [lingering bugs with their implementation](https://caniuse.com/#feat=viewport-units).

**General recommended practices:**

- Do not use a unit with 0.

        // Bad:
        width: 0px;
        
        // Good:
        width: 0;

- Use unitless values for `line-height` as this will inherit values from the `font-size`.
- Use **pixels** for when a measurement shouldn’t change based on scale.
    - **Example:** borders. Often a border value won't need to change based on the user font-size or if there is browser zooming.

*Font sizes:*

- Use **rem** units for font sizes with a px fallback.
    - Using **rems** for font sizes is super important for accessibility, because it means that the font will increase proportionately for a user who may be using a tool to increase their font size/zoom in.
    - Using **rem** units for font sizes with a px fallback can be done with the following mixin:

            @mixin font-size($sizeValue: 1.6) {
              font-size: ($sizeValue * 10) + px;
              font-size: $sizeValue + rem;
            }

    - Since **rems** are calculated relative to the root, it is important to set the HTML font size to 10px to ensure that 0.1rem equals 1px.

            html {
            	font-size: 10px;
            }

*Positioning:*

- Use **ems** for positioning. Ems are a good idea to use for positioning because they are relative to their parent, therefore, it is easier to control absolute positioning based on relativity to the parent element.

*Layouts:*

- Use **percentages** or **rems** when layout components stay relational to each other (e.g. a main content area that takes up 75% of the screen and a sidebar that takes up 25%).

        // Good
        .ontario-sidebar {
          width: 25%;
        }
        
        .ontario-main {
          width: 75%;
        }

*Padding/Margin:*

- In order to ensure consistent use of whitespace throughout (given a component could be used in a variety of contexts) it may be best to use **rem** for margin and padding.

*Media Queries:* 

- Only use **em** within media query definitions
    - Never use **pixels**.
    - Until there's wider rem support within media queries, **rem** should be avoided in media queries as well.
    - [https://zellwk.com/blog/media-query-units/](https://zellwk.com/blog/media-query-units/)

## **Variables**

Variables make it possible to reduce repetition, do complex math, configure libraries, and much more.

Since the Ontario theme is using Sass, variables are created according to Sass documentation: you assign a value to a name that begins with `$`, and then refer to that name instead of the value itself.

**Example:** 

    $base-color: #c6538c;
    $border-dark: rgba($base-color, 0.88);
    
    .ontario-panel--alert {
      border: 1px solid $border-dark;
    }

As the Ontario theme is using ITCSS as it's guiding architecture, all *global variables* should live within the `**1-settings**` folder. It is recommended variables referring to specific settings (for example, global colors, global spacing, etc.) be separated into their own file. 

**Example:** `_colours.global.scss`, `_spacing.global.scss`

Any component specific variables should live at the top of the file for the component itself, and it is a good practice to leave a comment delineating the component variables from the rest of the CSS.

**Example:**

    /* -------------------------------
        Panel Variables
    --------------------------------- */
    
    $ontario-panel-aside-bg: #f5f5f5;
    $ontario-panel-callout-bg: #dff3f3;
    $ontario-panel-warning-bg: #fafad2;

### Create new variables in the following circumstances:

- The value is repeated twice
- The value is likely to be updated at least once
- All occurrences of the value are tied to the variable

Tips for naming variables: [https://css-tricks.com/what-do-you-name-color-variables/](https://css-tricks.com/what-do-you-name-color-variables/)

## General Good CSS Practices:

- ID's should be reserved for JavaScript. Don't use IDs for style.
- A more specific selector beats any number of less specific selectors. For instance, `.list` is more specific than `div ul li`.
- Increasing the number of selectors will result in higher specificity. `.list.link` is more specific than `.list` and `.link`.
- Order matters: If two selectors have the same specificity, the last rule read by the browser wins.
- Although `!important` has nothing to do with the specificity of a selector, it is good to know that a declaration using `!important` overrides any normal declaration. When two conflicting declarations have the `!important` keyword, the declaration with a greater specificity wins.
- Don't use HTML elements as selectors unless there are default styles you want applied for all instances of that selector.
    - Using HTML elements as selectors creates high-specificity.

### Colors

- It's best practice to use variables for colours, and to have your colour variables defined in either the settings folder of the ITCSS structure, or the component file they are being used for.
- When possible, use hex notation for colors. If opacity is needed, next use rgb(a) and lastly hsl(a). While using hex codes over rgb(a) will probably not make too large a difference in terms of performance, using hsl(a) might.
    - If using a color that requires opacity, and therefore needs to be rbg(a) or hsl(a), set a hex value as a fallback

            .ontario-footer {
              background-color: #eee; // fallback
              background-color: rgba(221, 221, 221, 0.75);
            }

    - Use three-digit hex notation when possible.
- When denoting color using hex notation, use all lowercase letters.