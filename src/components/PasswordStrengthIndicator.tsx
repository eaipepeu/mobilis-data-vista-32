import { Check, X } from 'lucide-react';
import { PasswordValidation } from '@/hooks/usePasswordValidation';

interface PasswordStrengthIndicatorProps {
  validation: PasswordValidation;
  password: string;
}

const PasswordStrengthIndicator = ({ validation, password }: PasswordStrengthIndicatorProps) => {
  if (!password) return null;

  const requirements = [
    { key: 'hasMinLength', text: 'Mínimo 8 caracteres', met: validation.hasMinLength },
    { key: 'hasUppercase', text: '1 letra maiúscula', met: validation.hasUppercase },
    { key: 'hasNumber', text: '1 número', met: validation.hasNumber },
    { key: 'hasSpecialChar', text: '1 caractere especial (!@#$%^&*)', met: validation.hasSpecialChar }
  ];

  return (
    <div className="mt-2 space-y-1">
      {requirements.map((req) => (
        <div key={req.key} className="flex items-center text-xs">
          {req.met ? (
            <Check className="w-3 h-3 text-secondary mr-2" />
          ) : (
            <X className="w-3 h-3 text-destructive mr-2" />
          )}
          <span className={req.met ? 'text-secondary' : 'text-muted-foreground'}>
            {req.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PasswordStrengthIndicator;