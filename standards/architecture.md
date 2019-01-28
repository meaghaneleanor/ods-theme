
## BEM


## ITCSS



The categories are divided into 7 sections:

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
