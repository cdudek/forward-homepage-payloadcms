import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
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
  const inputPlaceholder = placeholder || `Enter ${label?.toLowerCase() || 'text'}`
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
        type="text"
        placeholder={inputPlaceholder}
        className={hasError ? fieldErrorClass : ''}
        {...register(name, { required })}
      />

      <div className="relative">
        <div className={hasError ? '' : 'invisible'}>
          <Error />
        </div>
      </div>
    </Width>
  )
}
