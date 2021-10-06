import React from 'react';
import { Divider as PaperDivider, useTheme } from 'react-native-paper';

import { DIVIDER } from '@app/test/testIDs';

export function Divider(props: React.ComponentProps<typeof PaperDivider>) {
  const theme = useTheme();

  return (
    <PaperDivider
      {...props}
      style={[
        {
          backgroundColor: theme.colors.dividerBackground,
        },
        props.style,
      ]}
      testID={DIVIDER}
    />
  );
}
