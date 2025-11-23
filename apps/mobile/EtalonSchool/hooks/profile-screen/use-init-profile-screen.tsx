import { useMemo } from 'react';

type UseInitProfileScreenProps = {
  getAccessToken: () => Promise<string | null>;
};

export default function useInitProfileScreen({ getAccessToken }: UseInitProfileScreenProps) {
  return useMemo(() => ({}), []);
}
