import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph as PaperParagraph } from 'react-native-paper';

type Size = 'xs' | 's' | 'm' | 'l';

export function Paragraph({
  size = 'm',
  ...props
}: React.ComponentProps<typeof PaperParagraph> & { size?: Size }) {
  return (
    <PaperParagraph
      {...props}
      style={[
        mapSizePropToFontSizeAndLineHeight(size),
        props.style,
        styles.text,
      ]}
    />
  );
}

function mapSizePropToFontSizeAndLineHeight(size: Size) {
  switch (size) {
    case 'xs':
      return { fontSize: 11, lineHeight: 18 };
    case 's':
      return { fontSize: 12, lineHeight: 18 };
    case 'm':
      return { fontSize: 14, lineHeight: 20 };
    case 'l':
      return { fontSize: 16, lineHeight: 24 };
  }
}

const styles = StyleSheet.create({
  text: {
    letterSpacing: 0.1,
  },
});
