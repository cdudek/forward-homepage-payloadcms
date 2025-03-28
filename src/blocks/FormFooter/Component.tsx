'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

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
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
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

        // delay loading indicator by 1s
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

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

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
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

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

        <div className="relative px-0 py-8">
          <div className="container pt-[calc(5vw+2rem)]">
            {/* Main Container with white transparency */}
            <div className="rounded-3xl bg-white/10 p-2 backdrop-blur-sm md:p-8">
              {/* Two Column Grid */}
              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
                {/* Left Column - Title and Description */}
                <div className="prose-sm md:prose-md xl:prose-lg">
                  <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">{title}</h2>
                  <p className="mt-4 text-xl text-white/90 md:text-2xl">{description}</p>
                </div>

                {/* Right Column - Form */}
                <div className="rounded-3xl bg-white/20 p-4 backdrop-blur-md md:p-6">
                  <FormProvider {...formMethods}>
                    {!isLoading && hasSubmitted && confirmationType === 'message' && (
                      <RichText data={confirmationMessage} />
                    )}
                    {isLoading && !hasSubmitted && (
                      <p className="text-white">Loading, please wait...</p>
                    )}
                    {error && (
                      <div className="text-red-300">{`${error.status || '500'}: ${error.message || ''}`}</div>
                    )}
                    {!hasSubmitted && (
                      <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                          {formFromProps &&
                            formFromProps.fields &&
                            formFromProps.fields?.map((field, index) => {
                              const Field: React.FC<any> =
                                fields?.[field.blockType as keyof typeof fields]
                              if (Field) {
                                return (
                                  <div key={index} className="form-field-container">
                                    <Field
                                      form={formFromProps}
                                      {...field}
                                      {...formMethods}
                                      control={control}
                                      errors={errors}
                                      register={register}
                                    />
                                  </div>
                                )
                              }
                              return null
                            })}
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button
                            form={formID}
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full md:w-auto"
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
                    )}
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
