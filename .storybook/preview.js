import React from 'react';
import { addDecorator } from '@storybook/react';
import GlobalFontStyle from 'src/styles/fonts/globalStyle'

addDecorator(
  (StoryFn) => (
    <>
      <GlobalFontStyle />
      <div style={{ margin: '3em' }}>
        {StoryFn()}
      </div>
    </>
  ),
);