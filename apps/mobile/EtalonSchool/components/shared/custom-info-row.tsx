import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppText from '../ui/app-text';

type CustomInfoRowProps = {
  label: string;
  value: string;
  rightIcon?: ReactNode;
  showSeparator?: boolean;
};

export default function CustomInfoRow({ label, value, rightIcon, showSeparator = true }: CustomInfoRowProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <AppText weight='600' style={styles.label}>
            {label}
          </AppText>
          <AppText style={styles.value}>{value}</AppText>
        </View>

        {rightIcon && <View style={styles.iconWrapper}>{rightIcon}</View>}
      </View>

      {showSeparator && <View style={styles.separator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
  value: {
    fontSize: 15,
    color: '#374151',
  },
  iconWrapper: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#d1d5db', // finom szürke
    marginTop: 6,
  },
});
