# Ontario Digital Service CSS Architecture

## BEM

This theme uses the [Block Element Modifier](http://getbem.com/introduction/) (BEM) methodology for naming CSS classes and variable. This allows CSS developers to see at a glance how classes relate to one another while maintaining the modularity of blocks.

Other benefits include ensuring that styles adhere to the single responsibility principle - styles for elements should never be dependent on other elements on the page, and when properly implemented, BEM allows you to safely add and remove styles without worrying about side effects. Most styles should only require a single selector, and this flat hierarchy also helps developers avoid escalating CSS selector specificity unnecessarily and makes it more easy to maintain in the long run.

The basic BEM convention goes: `.block-name__element-name--modifier-state`, with double underscores denoting relationships between elements, and double hyphens indicating variants and states. Only use the parts you need: elements can also be `.block-name__element-name`, `.block-name--modifier-name`, or just `.block-name`.

## ITCSS

In addition to BEM, this theme follows Harry Roberts' [Inverted Triangle CSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528) (ITCSS) method of organizing code, to provide further structure and minimize specificity conflicts. The inverted triangle organizes code along three axes: generic to explicit, low specificity to high specificity, and far-reaching to localised. That means that styles that appear in the beginning of the project tend to be general styles that affect large pieces of the DOM, while styles that appear later target very specific elements in explicit ways. See the link above for more explanation.

The code is broken out into 7 sections:

1. **Settings**
Global variables like font sizes, colour variables, etc. Settings for vendor frameworks like Foundation would also go here.

Note: these files should not generate actual CSS.

2. **Tools**
Globally available mixins, functions, etc.

Note: these files should not generate actual CSS.

3. **Generics**
High level and far-reaching styles that should be minimally modified once they have been defined, such as resets, box model rules, etc.

4. **Elements**
Bare unclassed HTML elements. These should only be element-level selectors, **not** classes or ids.

5. **Objects**
Non-cosmetic design patterns, such as wrappers, containers, layout systems, etc. Selectors here should have at most one class.

6. **Components**
Recognizable design patterns and UI pieces. Selectors here should have at least one class.

Note: Within Vue's component system, some of these styles may be contained within individual components. A good general rule of thumb: if deleting a Vue component requires deleting that style, that style should live within the component. However, consider whether you need to apply snowflake styles to that Vue component, or whether you should be reusing existing patterns

7. **Overrides**
Helper classes that should override all other patterns, for specific behaviours such as clearfixing, text alignment, etc.
