'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { toast } from 'sonner'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FooterFormBlockType = {
  blockName?: string
  blockType?: 'FooterFormBlock'
  form: FormType
  title: string
  description: string
  backgroundImage: MediaType
}

export const FooterFormBlock: React.FC<
  {
    id?: string
  } & FooterFormBlockType
> = (props) => {
  const {
    title,
    description,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    backgroundImage,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
    mode: 'onSubmit',
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            toast.error(`${res.errors?.[0]?.message || 'Something went wrong'}`, {
              position: 'top-center',
              className: 'slide-down',
              style: {
                animation: 'custom-slide-in 0.4s ease-out, custom-fade-in 0.4s ease-out',
              },
            })

            return
          }

          setIsLoading(false)

          // Show success toast message with the confirmation message from the CMS
          toast.success(
            typeof confirmationMessage?.root === 'object'
              ? confirmationMessage?.root?.children?.[0]?.children?.[0]?.text ||
                  "Thank you for your message. We've received it — and we're looking forward to reading it carefully. We'll be in touch soon."
              : "Thank you for your message. We've received it — and we're looking forward to reading it carefully. We'll be in touch soon.",
          )

          // Reset the form
          reset()

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
          toast.error('Something went wrong. Please try again.')
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, confirmationMessage, reset],
  )

  // Create a button handler instead of a form submit handler
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleSubmit(onSubmit)()
    return false
  }

  // Prevent the form from submitting using any method
  const preventSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  return (
    <div className="relative bg-fwd-black-950">
      <div className="relative" style={{ clipPath: 'polygon(0 5vw, 100% 0, 100% 100%, 0 100%)' }}>
        {/* Background Image with Gradient Overlay */}
        {backgroundImage && (
          <div className="absolute inset-0">
            <Media
              fill
              imgClassName="object-cover w-full h-full"
              priority
              resource={backgroundImage}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-fwd-black-950" />
          </div>
        )}

        <div className="relative px-0 pb-32 pt-8">
          <div className="container pt-[calc(5vw+2rem)]">
            {/* Main Container with white transparency */}
            <div className="rounded-3xl bg-white/10 p-2 backdrop-blur-sm md:p-8">
              {/* Two Column Grid */}
              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
                {/* Left Column - Title and Description */}
                <div className="flex h-full flex-col text-center md:text-left">
                  <div className="prose-sm md:prose-md xl:prose-lg">
                    <h2 className="text-white">{title}</h2>
                    <p className="mt-4 text-white/90 md:pl-2">{description}</p>
                  </div>

                  {/* Address - visible at bottom on desktop, below description on mobile */}
                  <div className="mt-auto pt-6 md:pt-8 lg:pt-10">
                    <div className="flex flex-col items-center text-center text-white/70 md:flex-row md:items-start md:text-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mb-3 h-6 w-6 text-white/80 md:mb-0 md:mr-3 md:mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div className="space-y-1 md:space-y-2">
                        <p className="text-base font-medium text-white/90 md:text-lg">
                          forward Labs AG
                        </p>
                        <p className="text-sm md:text-base">Dammstrasse 19</p>
                        <p className="text-sm md:text-base">6300 Zug</p>
                        <p className="text-sm md:text-base">Switzerland</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Form */}
                <div className="rounded-3xl bg-white/20 p-4 backdrop-blur-md md:p-6">
                  <FormProvider {...formMethods}>
                    {isLoading && <p className="text-white">Loading, please wait...</p>}
                    {error && (
                      <div className="text-fwd-red-600">{`${error.status || '500'}: ${error.message || ''}`}</div>
                    )}
                    <form onSubmit={preventSubmit} noValidate>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {formFromProps &&
                          formFromProps.fields &&
                          formFromProps.fields?.map((field, index) => {
                            const Field: React.FC<any> =
                              fields?.[field.blockType as keyof typeof fields]
                            if (Field) {
                              const gridSpanClass =
                                'gridSpan' in field && field.gridSpan
                                  ? field.gridSpan === 'half'
                                    ? 'md:col-span-1'
                                    : field.gridSpan === 'halfEmpty'
                                      ? 'md:col-span-1'
                                      : 'md:col-span-2'
                                  : 'md:col-span-2'

                              return (
                                <div
                                  key={index}
                                  className={`form-field-container ${gridSpanClass}`}
                                >
                                  <Field
                                    form={formFromProps}
                                    {...field}
                                    {...formMethods}
                                    control={control}
                                    errors={errors}
                                    register={register}
                                    fieldErrorClass="border-fwd-red-600 focus-visible:ring-fwd-red-600"
                                  />
                                </div>
                              )
                            }
                            return null
                          })}
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button
                          type="button"
                          variant="primary"
                          size="lg"
                          className="w-full md:w-auto"
                          disabled={isLoading}
                          onClick={handleButtonClick}
                        >
                          {submitButtonLabel}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="border-t border-gray-800"></div>
      </div>
    </div>
  )
}

export default FooterFormBlock
