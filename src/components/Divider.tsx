import React from 'react';
import { Divider as PaperDivider, useTheme } from 'react-native-paper';

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
    />
  );
}
