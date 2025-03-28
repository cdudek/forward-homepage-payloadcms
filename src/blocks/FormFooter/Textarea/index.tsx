import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
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
  rows = 5,
  width,
  placeholder,
  fieldErrorClass,
}) => {
  const inputPlaceholder = placeholder || `Enter ${label?.toLowerCase() || 'message'}`
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

      <TextAreaComponent
        defaultValue={defaultValue || ''}
        id={name}
        rows={rows}
        placeholder={inputPlaceholder}
        className={hasError ? fieldErrorClass : ''}
        {...register(name, { required: required })}
      />

      {/* {hasError && <Error />} */}
      <div className="relative">
        <div className={hasError ? '' : 'invisible'}>
          <Error />
        </div>
      </div>
    </Width>
  )
}
