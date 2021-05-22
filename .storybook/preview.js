import React from 'react';
import { addDecorator } from '@storybook/react';
import GlobalFontStyle from 'src/styles/fonts/globalStyle'

addDecorator(
  (StoryFn) => (
    <>
      <GlobalFontStyle />
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        minWidth: "320px", 
        alignItems: "center",
        width: "100vw", 
        height: "100vh",
      }}>
        {StoryFn()}
      </div>
    </>
  ),
);