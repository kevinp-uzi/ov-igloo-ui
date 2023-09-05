import { useEffect } from 'react';

export const useBrand = (StoryFn, context) => {
  const {brand} = context.globals;
  const {displayName} = context.component;
  const components = [
    "ActionMenu", 
    "Alert", 
    "Avatar", 
    "Button", 
    "Color",
    "Hyperlink",
    "IconButton", 
    "List", 
    "Tag", 
    "Tooltip",
    "VisualIdentifier"
  ];

  useEffect(() => {
    //document.documentElement refers to html tag inside iframe#storybook-preview-iframe
    if (components.includes(displayName)) {
      document.documentElement.setAttribute('data-brand', brand);
    } else {
      document.documentElement.removeAttribute('data-brand');
    }
  }, [brand]);

  return StoryFn();
}