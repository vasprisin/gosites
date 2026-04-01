'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react'
import { useMemo, useState } from 'react'

import Button from '@/components/ui/Button'
import CalendlyInlineWidget from '@/components/ui/CalendlyInlineWidget'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'
import { cn } from '@/lib/utils'

const situationOptions = [
  {
    value: 'brand-new-website',
    label: 'I do not have a website',
  },
  {
    value: 'existing-website',
    label: 'I have a website but I am not happy with it',
  },
]

const timelineOptions = [
  { value: 'right-away', label: 'Right away' },
  { value: 'within-a-week', label: 'Within a week' },
  { value: 'within-this-month', label: 'Within this month' },
  { value: 'next-month', label: 'Next month' },
]

const quickStartTimelines = new Set(['right-away', 'within-a-week'])
const DEFAULT_CALENDLY_URL =
  'https://calendly.com/priyanshusingh/gosites-discovery'

const initialForm = {
  firstName: '',
  email: '',
  wantsPhoneCallback: false,
  phone: '',
  situation: '',
  websiteUrl: '',
  startTimeline: '',
}

function StepPill({ active, children }) {
  return (
    <div
      className={cn(
        'rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors',
        active
          ? 'border-sky-300 bg-sky-50 text-sky-700'
          : 'border-slate-200 bg-white text-slate-500'
      )}
    >
      {children}
    </div>
  )
}

function ChoiceCard({ checked, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full rounded-[1.5rem] border px-5 py-4 text-left transition-all duration-300',
        checked
          ? 'border-sky-300 bg-sky-50 text-slate-950 shadow-[0_24px_72px_-44px_rgba(56,189,248,0.24)]'
          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
      )}
    >
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}

function Field({ label, required = false, hint, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-800">
        {label}
        {required ? <span className="ml-1 text-sky-600">*</span> : null}
      </span>
      {children}
      {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
    </label>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      className={cn(
        'h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:bg-sky-50/40',
        props.className
      )}
    />
  )
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className={cn(
        'min-h-28 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:bg-sky-50/40',
        props.className
      )}
    />
  )
}

export default function FinalCTA() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [submittedTimeline, setSubmittedTimeline] = useState('')

  const showCalendly = useMemo(
    () => quickStartTimelines.has(submittedTimeline),
    [submittedTimeline]
  )

  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || DEFAULT_CALENDLY_URL

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }))
  }

  function validateStep(currentStep) {
    if (currentStep === 1) {
      if (!form.firstName.trim() || !form.email.trim()) {
        return 'Please add your first name and email.'
      }

      if (form.wantsPhoneCallback && !form.phone.trim()) {
        return 'Please add your phone number for a callback.'
      }
    }

    if (currentStep === 2) {
      if (!form.situation) {
        return 'Please choose the option that fits best.'
      }

      if (form.situation === 'existing-website' && !form.websiteUrl.trim()) {
        return 'Please add your current website address.'
      }
    }

    if (currentStep === 3 && !form.startTimeline) {
      return 'Please choose when you are ready to start.'
    }

    return ''
  }

  function goNext() {
    const nextError = validateStep(step)
    if (nextError) {
      setError(nextError)
      return
    }

    setError('')
    setStep((current) => Math.min(current + 1, 3))
  }

  function goBack() {
    setError('')
    setStep((current) => Math.max(current - 1, 1))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextError = validateStep(3)
    if (nextError) {
      setError(nextError)
      return
    }

    setStatus('submitting')
    setError('')

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: form.firstName,
          email: form.email,
          phone: form.wantsPhoneCallback ? form.phone : '',
          situation: form.situation,
          websiteUrl: form.websiteUrl,
          startTimeline: form.startTimeline,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit service request right now.')
      }

      setSubmittedTimeline(form.startTimeline)
      setStatus('submitted')
    } catch (submissionError) {
      setStatus('idle')
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to submit service request right now.'
      )
    }
  }

  return (
    <Section id="contact">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <Card
          tone="accent"
          className="overflow-hidden border-sky-200 p-8 sm:p-10 lg:p-12"
        >
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-[-15%] w-[32%] bg-gradient-to-r from-transparent via-sky-200/35 to-transparent"
            animate={{ x: ['-120%', '380%'] }}
            transition={{
              duration: 4.4,
              repeat: Infinity,
              repeatDelay: 3.2,
              ease: 'easeInOut',
            }}
          />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <motion.div className="space-y-8" variants={fadeUp}>
              <Heading
                eyebrow="Service Request"
                title="Tell us where you are now and how fast you want to move."
                description="Use the short form to send a service request. Fast-start projects can go straight to a call once submitted."
                titleClassName="max-w-3xl"
                descriptionClassName="max-w-xl"
              />

              <div className="flex flex-wrap gap-3">
                <StepPill active={step === 1 || status === 'submitted'}>
                  Step 1
                </StepPill>
                <StepPill active={step === 2 || status === 'submitted'}>
                  Step 2
                </StepPill>
                <StepPill active={step === 3 || status === 'submitted'}>
                  Step 3
                </StepPill>
              </div>

              <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-white/90 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  What happens next
                </p>
                <div className="space-y-3 text-sm leading-7 text-slate-600">
                  <p>We review fit, scope, and timing before taking projects forward.</p>
                  <p>
                    The enquiry form now sits in the hero area so visitors can act
                    earlier without scrolling past the opening section.
                  </p>
                  <p>
                    If your timing is later, the team will follow up within 24 hours.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_40px_120px_-64px_rgba(15,23,42,0.18)] backdrop-blur-2xl sm:p-6">
                {status === 'submitted' ? (
                  <div className="space-y-6">
                    <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                        <div className="space-y-2">
                          <p className="text-base font-semibold text-slate-950">
                            Service request received
                          </p>
                          <p className="text-sm leading-7 text-slate-700">
                            {showCalendly && calendlyUrl
                              ? 'Everything checks out so far. Pick a time below and we can move this forward quickly.'
                              : 'Thank you for your service request. Our team will reach out to you within 24 hours.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {showCalendly ? (
                      <div className="space-y-4">
                        <p className="text-sm text-slate-600">
                          Book your call:
                        </p>
                        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                          <CalendlyInlineWidget url={calendlyUrl} />
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-950">
                        {step === 1 && 'Page 1 of 3'}
                        {step === 2 && 'Page 2 of 3'}
                        {step === 3 && 'Page 3 of 3'}
                      </p>
                      <p className="text-sm text-slate-500">
                        {step === 1 && 'Basic contact details'}
                        {step === 2 && 'Your current website situation'}
                        {step === 3 && 'Your timing'}
                      </p>
                    </div>

                    {step === 1 ? (
                      <div className="grid gap-5">
                        <Field label="First name" required>
                          <Input
                            name="firstName"
                            autoComplete="given-name"
                            placeholder="Alex"
                            value={form.firstName}
                            onChange={(event) =>
                              updateField('firstName', event.target.value)
                            }
                          />
                        </Field>

                        <Field label="Email" required>
                          <Input
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="alex@business.com"
                            value={form.email}
                            onChange={(event) =>
                              updateField('email', event.target.value)
                            }
                          />
                        </Field>

                        <label className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3">
                          <input
                            type="checkbox"
                            checked={form.wantsPhoneCallback}
                            onChange={(event) =>
                              updateField('wantsPhoneCallback', event.target.checked)
                            }
                            className="mt-1 h-4 w-4 rounded border-slate-300 bg-transparent text-sky-600"
                          />
                          <span className="text-sm leading-6 text-slate-700">
                            I want a phone callback as part of this service request.
                          </span>
                        </label>

                        {form.wantsPhoneCallback ? (
                          <Field
                            label="Phone"
                            required
                            hint="This only appears if the visitor wants a callback."
                          >
                            <Input
                              name="phone"
                              type="tel"
                              autoComplete="tel"
                              placeholder="+44 7..."
                              value={form.phone}
                              onChange={(event) =>
                                updateField('phone', event.target.value)
                              }
                            />
                          </Field>
                        ) : null}

                      </div>
                    ) : null}

                    {step === 2 ? (
                      <div className="space-y-4">
                        <p className="text-sm font-medium text-slate-800">
                          What describes you best?
                        </p>

                        <div className="space-y-3">
                          {situationOptions.map((option) => (
                            <ChoiceCard
                              key={option.value}
                              checked={form.situation === option.value}
                              label={option.label}
                              onClick={() => updateField('situation', option.value)}
                            />
                          ))}
                        </div>

                        {form.situation === 'existing-website' ? (
                          <Field
                            label="Current website"
                            required
                            hint="Add the website you want us to review."
                          >
                            <Input
                              name="websiteUrl"
                              type="url"
                              placeholder="https://example.com"
                              value={form.websiteUrl}
                              onChange={(event) =>
                                updateField('websiteUrl', event.target.value)
                              }
                            />
                          </Field>
                        ) : null}
                      </div>
                    ) : null}

                    {step === 3 ? (
                      <div className="space-y-4">
                        <p className="text-sm font-medium text-slate-800">
                          If everything checks out, how quickly are you ready to start?
                        </p>

                        <div className="space-y-3">
                          {timelineOptions.map((option) => (
                            <ChoiceCard
                              key={option.value}
                              checked={form.startTimeline === option.value}
                              label={option.label}
                              onClick={() =>
                                updateField('startTimeline', option.value)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {error ? (
                      <div className="rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {error}
                      </div>
                    ) : null}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex gap-3">
                        {step > 1 ? (
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={goBack}
                          >
                            Back
                          </Button>
                        ) : null}

                        {step < 3 ? (
                          <Button type="button" onClick={goNext}>
                            Continue
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button type="submit" disabled={status === 'submitting'}>
                            {status === 'submitting' ? (
                              <>
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                Sending
                              </>
                            ) : (
                              <>
                                Submit service request
                                <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </Section>
  )
}
