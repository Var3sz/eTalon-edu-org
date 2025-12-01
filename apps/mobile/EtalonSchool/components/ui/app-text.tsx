import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

type AppTextProps = TextProps & {
  weight?: '300' | '400' | '500' | '600' | '700';
  style?: StyleProp<TextStyle>;
};

const fontFamilyMap: Record<string, string> = {
  '300': 'Inter300',
  '400': 'Inter400',
  '500': 'Inter500',
  '600': 'Inter600',
  '700': 'Inter700',
};

export default function AppText({ weight = '400', style, children, ...rest }: AppTextProps) {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: fontFamilyMap[weight] ?? fontFamilyMap['400'],
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
