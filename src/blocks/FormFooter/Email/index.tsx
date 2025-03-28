import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    placeholder?: string
    fieldErrorClass?: string
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  width,
  placeholder,
  fieldErrorClass,
}) => {
  const inputPlaceholder = placeholder || `Enter ${label?.toLowerCase() || 'email'}`
  const hasError = !!errors[name]

  return (
    <Width width={width}>
      <Label htmlFor={name} className={hasError ? 'text-fwd-red-600' : ''}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        defaultValue={defaultValue || ''}
        id={name}
        type="email"
        placeholder={inputPlaceholder}
        className={hasError ? fieldErrorClass : ''}
        {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
      />

      {hasError && <Error />}
    </Width>
  )
}
