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
import { cn } from '@/utilities/ui'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { htmlDecode } from '@/utilities/htmlDecode'
import { FadeInView } from '@/utilities/animations/FadeInView'

export type FooterFormBlockType = {
  blockName?: string
  blockType?: 'FooterFormBlock'
  form: FormType
  title: string
  description: string
  isFooterForm: boolean
  isFullHeight: boolean
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
    isFooterForm = true,
    isFullHeight = false,
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
      // Clear any previous errors
      setError(undefined)
      // Set loading state to true
      setIsLoading(true)

      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value,
      }))

      // Create a promise for the form submission
      const submitPromise = new Promise((resolve, reject) => {
        fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({
            form: formID,
            submissionData: dataToSend,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
          .then(async (response) => {
            const res = await response.json()

            if (response.status >= 400) {
              const errorStatus = response.status.toString()
              setError({
                message: res.errors?.[0]?.message || 'Internal Server Error',
                status: errorStatus,
              })
              reject(res.errors?.[0]?.message || 'Something went wrong')
              return
            }

            // Reset the form
            reset()

            // Handle redirect if needed
            if (confirmationType === 'redirect' && redirect) {
              const { url } = redirect
              const redirectUrl = url
              if (redirectUrl) {
                setTimeout(() => {
                  router.push(redirectUrl)
                }, 1000)
              }
            }

            resolve(res)
          })
          .catch((err) => {
            console.warn(err)
            setError({
              message: 'Something went wrong.',
              status: '500',
            })
            reject('Something went wrong. Please try again.')
          })
          .finally(() => {
            // Set loading state to false when done
            setIsLoading(false)
          })
      })

      // Use toast.promise to show loading, success, and error states
      toast.promise(submitPromise, {
        loading: 'Submitting your message...',
        success: () => {
          // Return the confirmation message either as text or JSX with RichText
          if (confirmationMessage && typeof confirmationMessage === 'object') {
            return {
              message: (
                <div className="toast-rich-text">
                  {typeof confirmationMessage?.root === 'object' ? (
                    <RichText data={confirmationMessage} enableProse={false} />
                  ) : (
                    "Thank you for your message. We've received it — and we're looking forward to reading it carefully. We'll be in touch soon."
                  )}
                </div>
              ),
              duration: 5000, // 10 seconds max duration
            }
          }

          return {
            message:
              "Thank you for your message. We've received it — and we're looking forward to reading it carefully. We'll be in touch soon.",
            duration: 5000, // 10 seconds max duration
          }
        },
        error: (errorMsg) => {
          return {
            message: errorMsg,
            position: 'bottom-center',
            duration: 5000, // 10 seconds max duration
          }
        },
      })
    },
    [router, formID, redirect, confirmationType, confirmationMessage, reset, setIsLoading],
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
    // <div className="relative bg-fwd-black">
    <div className={cn('relative bg-fwd-black', isFullHeight && 'flex flex-1 flex-col')}>
      <div
        className={cn(
          'relative flex flex-col items-center justify-center',
          isFullHeight && 'flex-1',
          !isFullHeight && 'py-32',
        )}
        style={isFooterForm ? { clipPath: 'polygon(0 5vw, 100% 0, 100% 100%, 0 100%)' } : {}}
      >
        {/* Background Image with Gradient Overlay */}
        {backgroundImage && (
          <div
            className={`absolute inset-0 overflow-hidden`}
            style={isFooterForm ? { clipPath: 'polygon(0 5vw, 100% 0, 100% 100%, 0 100%)' } : {}}
          >
            <div className="absolute inset-0 h-[calc(100%+75px)] w-full -translate-y-[50px]">
              <Media
                fill
                imgClassName="absolute inset-0 h-full w-full object-cover"
                className="absolute inset-0 h-full w-full"
                priority
                resource={backgroundImage}
                hasParallax={true}
              />
            </div>
            <div className="via-66% absolute inset-0 bg-gradient-to-b from-transparent from-0% via-transparent to-fwd-black to-95%" />
          </div>
        )}

        <div className={cn('container md:py-32', isFullHeight && 'py-24', !isFullHeight && 'py-8')}>
          {/* Main Container with white transparency */}
          <div
            className={cn(
              'rounded-3xl bg-white/10 p-2 backdrop-blur-md',
              isFullHeight ? 'md:p-16' : 'md:p-8',
            )}
          >
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-12">
              {/* Left Column - Title and Description */}
              <div className="flex h-full flex-col py-4 text-center md:py-0 md:text-left">
                <div className="prose-sm md:prose-md xl:prose-lg">
                  <FadeInView animationStep={0}>
                    <h2 className="text-white">{htmlDecode(title)}</h2>
                  </FadeInView>
                  <FadeInView animationStep={1}>
                    <p className="mt-4 text-white/90 md:pl-2">{htmlDecode(description)}</p>
                  </FadeInView>
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
                      <FadeInView animationStep={2}>
                        <p className="text-base font-medium text-white/90 md:text-lg">
                          forward Labs AG
                        </p>
                      </FadeInView>
                      <FadeInView animationStep={3}>
                        <p className="text-base">Dammstrasse 19</p>
                      </FadeInView>
                      <FadeInView animationStep={4}>
                        <p className="text-base">6300 Zug</p>
                      </FadeInView>
                      <FadeInView animationStep={5}>
                        <p className="text-base">Switzerland</p>
                      </FadeInView>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <FadeInView animationStep={1}>
                <div className="relative z-10 rounded-3xl bg-white/30 p-4 md:p-6">
                  <FormProvider {...formMethods}>
                    {isLoading && <p className="text-white">Loading, please wait...</p>}
                    {error && (
                      <div className="text-fwd-red-600">{`${error.status || '500'}: ${error.message || ''}`}</div>
                    )}
                    <form onSubmit={preventSubmit} noValidate>
                      <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
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
              </FadeInView>
              {/* </div> */}
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
