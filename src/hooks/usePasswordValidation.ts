import { useState, useEffect } from 'react';

export interface PasswordValidation {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  isValid: boolean;
}

export const usePasswordValidation = (password: string): PasswordValidation => {
  const [validation, setValidation] = useState<PasswordValidation>({
    hasMinLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isValid: false
  });

  useEffect(() => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    const isValid = hasMinLength && hasUppercase && hasNumber && hasSpecialChar;

    setValidation({
      hasMinLength,
      hasUppercase,
      hasNumber,
      hasSpecialChar,
      isValid
    });
  }, [password]);

  return validation;
};