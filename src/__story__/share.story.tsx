import * as React from 'react';
import {storiesOf} from '@storybook/react';
import Embed from '..';
import {Box} from './Box';

storiesOf('share', module)
  .add('Default', () => {
    return (
      <Box>
        <Embed
          url={'https://mirror.xyz/m7e.eth/A7qYgyU55tBVkgsOYplBYV4dSMkI72P2cxi-QbceIfA'}
          endPoint="https://alpha.metajam.studio/"
        />
      </Box>
    );
  })
  .add('notShowImage', () => {
    return (
      <Box>
        <Embed
          url={'https://mirror.xyz/m7e.eth/A7qYgyU55tBVkgsOYplBYV4dSMkI72P2cxi-QbceIfA'}
          endPoint="https://alpha.metajam.studio/"
          showImage={false}
        />
      </Box>
    );
  });
