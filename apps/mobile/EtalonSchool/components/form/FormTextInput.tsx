import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormBaseProps } from '../../models/ui/form-props';

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
            <Text>{label}</Text>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
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
