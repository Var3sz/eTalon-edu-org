import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { FormBaseProps } from '../../models/ui/form-props';
import AppText from '../ui/app-text';

export default function FormTextInput<T extends FieldValues>({
  id,
  formControl,
  label,
  secureTextEntry = false,
  placeholder = '',
}: FormBaseProps<T>) {
  return (
    <View style={styles.container}>
      <Controller
        control={formControl}
        name={id as Path<T>}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <AppText weight='600'>{label}</AppText>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
            />
            {error && (
              <AppText weight='500' style={styles.errorText}>
                {error.message}
              </AppText>
            )}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
