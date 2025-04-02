import { type ClassValue, clsx } from 'clsx';
import { addMinutes, format, isValid } from 'date-fns';
import { hu } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

import { DatePatterns } from '@/api/consts/date-patterns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateCustom = (date: Date | string | null, pattern: string = DatePatterns.DATE) => {
  if (date) {
    return format(date, pattern, {
      locale: hu,
    });
  } else {
    return null;
  }
};

export const parseDateToISO = (date: Date | null): string | null => {
  if (date === null) return null;
  return addMinutes(date, -date.getTimezoneOffset()).toISOString().slice(0, -1);
};

export const convertStringToDate = (stringDate: string | null): Date | null =>
  stringDate !== null && stringDate && isValid(new Date(stringDate)) ? new Date(stringDate) : null;

export const dateFormatRegex = (date: string) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
};
