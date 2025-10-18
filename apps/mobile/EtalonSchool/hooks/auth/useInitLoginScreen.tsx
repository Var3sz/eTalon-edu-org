import { useMemo, useState, useTransition } from 'react';
import { Login } from '../../api/models/serviceEndpoints/auth';
import { LoginDto } from '../../models/auth';
import { Alert } from 'react-native';
export default function useInitLoginScreen() {
  const [isPending, startTransaction] = useTransition();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onValidFormSubmit = () => {
    startTransaction(async () => {
      const loginResponse = await Login<LoginDto, any>({ username: email, password: password });
      if (loginResponse.status === 200 || loginResponse.status === 201) {
        Alert.alert('Sikeres');
      } else {
        Alert.alert('Sikertelen');
      }
    });
  };

  return useMemo(
    () => ({ isPending, email, password, setEmail, setPassword, onValidFormSubmit }),
    [isPending, email, password, setEmail, setPassword, onValidFormSubmit]
  );
}
