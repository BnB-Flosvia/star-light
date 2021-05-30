import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from "react-router";
import GlobalFontStyle from 'src/styles/fonts/globalStyle'
import 'antd/dist/antd.css'

addDecorator(
  (StoryFn) => (
    <MemoryRouter initialEntries={['/']}>
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
    </MemoryRouter>
  ),
);