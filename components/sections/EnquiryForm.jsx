'use client'

import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import Button from '@/components/ui/Button'
import { capturePostHogEvent } from '@/lib/posthog'
import { cn } from '@/lib/utils'

const situationOptions = [
  {
    value: 'existing-website',
    label: 'I have an existing website but I am not happy with it',
  },
  {
    value: 'brand-new-website',
    label: 'I want to create a brand new website',
  },
]

const timelineOptions = [
  { value: 'right-away', label: 'Right away' },
  { value: 'within-a-week', label: 'Within a week' },
  { value: 'within-this-month', label: 'Within this month' },
  { value: 'next-month', label: 'Next month' },
]

const quickStartTimelines = new Set(['right-away', 'within-a-week'])

const initialForm = {
  firstName: '',
  email: '',
  phone: '',
  linkedinUrl: '',
  situation: '',
  websiteUrl: '',
  startTimeline: '',
  subscribe: false,
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
      <span className="text-base font-semibold text-slate-900">
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

export default function EnquiryForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [submittedTimeline, setSubmittedTimeline] = useState('')
  const hasTrackedStartRef = useRef(false)
  const hasTrackedCalendlyRef = useRef(false)
  const completedStepsRef = useRef(new Set())

  const showCalendly = quickStartTimelines.has(submittedTimeline)

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL

  useEffect(() => {
    if (!showCalendly || status !== 'submitted' || hasTrackedCalendlyRef.current) {
      return
    }

    hasTrackedCalendlyRef.current = true
    capturePostHogEvent('calendly_prompt_shown', {
      form_name: 'service_request',
      section: 'contact',
      calendly_url_configured: Boolean(calendlyUrl),
      start_timeline: submittedTimeline,
    })
  }, [calendlyUrl, showCalendly, status, submittedTimeline])

  function getAnalyticsProperties() {
    return {
      form_name: 'service_request',
      section: 'contact',
      has_linkedin_url: Boolean(form.linkedinUrl.trim()),
      has_website_url: Boolean(form.websiteUrl.trim()),
      situation: form.situation || undefined,
      start_timeline: form.startTimeline || undefined,
      subscribed: form.subscribe,
    }
  }

  function trackFormStarted(entryPoint) {
    if (hasTrackedStartRef.current) {
      return
    }

    hasTrackedStartRef.current = true
    capturePostHogEvent('service_request_started', {
      ...getAnalyticsProperties(),
      entry_point: entryPoint || 'unknown',
    })
  }

  function trackValidationError(currentStep, message) {
    capturePostHogEvent('service_request_validation_error', {
      ...getAnalyticsProperties(),
      error_message: message,
      step_number: currentStep,
    })
  }

  function trackStepCompleted(currentStep) {
    if (completedStepsRef.current.has(currentStep)) {
      return
    }

    completedStepsRef.current.add(currentStep)
    capturePostHogEvent('service_request_step_completed', {
      ...getAnalyticsProperties(),
      completed_step: currentStep,
      next_step: currentStep < 3 ? currentStep + 1 : 'submitted',
    })
  }

  function handleFormFocus() {
    trackFormStarted(`step_${step}`)
  }

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }))
  }

  function validateStep(currentStep) {
    if (currentStep === 1) {
      if (!form.firstName.trim() || !form.email.trim() || !form.phone.trim()) {
        return 'Please add your first name, email, and phone number.'
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
    trackFormStarted(`step_${step}_continue`)
    const nextError = validateStep(step)
    if (nextError) {
      setError(nextError)
      trackValidationError(step, nextError)
      return
    }

    setError('')
    trackStepCompleted(step)
    setStep((current) => Math.min(current + 1, 3))
  }

  function goBack() {
    setError('')
    setStep((current) => Math.max(current - 1, 1))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    trackFormStarted('submit')

    const nextError = validateStep(3)
    if (nextError) {
      setError(nextError)
      trackValidationError(3, nextError)
      return
    }

    setStatus('submitting')
    setError('')
    trackStepCompleted(3)
    capturePostHogEvent('service_request_submit_attempt', getAnalyticsProperties())

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: form.firstName,
          email: form.email,
          phone: form.phone,
          linkedinUrl: form.linkedinUrl,
          situation: form.situation,
          websiteUrl: form.websiteUrl,
          startTimeline: form.startTimeline,
          subscribe: form.subscribe,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit enquiry right now.')
      }

      capturePostHogEvent('service_request_submitted', {
        ...getAnalyticsProperties(),
        airtable_record_id: data.airtableRecordId || null,
        show_calendly_prompt: quickStartTimelines.has(form.startTimeline),
      })
      setSubmittedTimeline(form.startTimeline)
      setStatus('submitted')
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to submit enquiry right now.'

      capturePostHogEvent('service_request_submit_failed', {
        ...getAnalyticsProperties(),
        error_message: message,
      })
      setStatus('idle')
      setError(message)
    }
  }

  if (status === 'submitted') {
    return (
      <div className="space-y-6">
        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
            <div className="space-y-2">
              <p className="text-base font-semibold text-slate-950">
                Enquiry received
              </p>
              <p className="text-sm leading-7 text-slate-700">
                {showCalendly && calendlyUrl
                  ? 'Everything checks out so far. Pick a time below and we can move this forward quickly.'
                  : 'Thank you for your enquiry. Our team will reach out to you within 24 hours.'}
              </p>
            </div>
          </div>
        </div>

        {showCalendly && calendlyUrl ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Book your call:</p>
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              <iframe
                title="Calendly booking"
                src={calendlyUrl}
                className="h-[700px] w-full"
              />
            </div>
          </div>
        ) : null}

        {showCalendly && !calendlyUrl ? (
          <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-800">
            Add `NEXT_PUBLIC_CALENDLY_URL` to embed your Calendly booking page
            here.
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <form
      className="space-y-6"
      onFocusCapture={handleFormFocus}
      onSubmit={handleSubmit}
    >
      <div
        className="grid grid-cols-3 gap-2"
        aria-label={`Progress step ${step} of 3`}
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className={cn(
              'h-2.5 rounded-full transition-colors duration-300',
              step >= item ? 'bg-blue-600' : 'bg-slate-200'
            )}
          />
        ))}
      </div>

      {step === 1 ? (
        <div className="grid gap-5">
          <Field label="First name" required>
            <Input
              name="firstName"
              autoComplete="given-name"
              placeholder="Alex"
              value={form.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
            />
          </Field>

          <Field label="Email" required>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@business.com"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
            />
          </Field>

          <Field label="Phone" required>
            <Input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+44 7..."
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
            />
          </Field>

          <Field label="LinkedIn (Optional)">
            <Input
              name="linkedinUrl"
              type="url"
              autoComplete="url"
              placeholder="https://linkedin.com/in/..."
              value={form.linkedinUrl}
              onChange={(event) =>
                updateField('linkedinUrl', event.target.value)
              }
            />
          </Field>
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
            <Field label="Website address" required>
              <Input
                name="websiteUrl"
                type="url"
                autoComplete="url"
                placeholder="https://yourwebsite.com"
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
                onClick={() => updateField('startTimeline', option.value)}
              />
            ))}
          </div>

          <label className="flex items-start gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
            <input
              name="subscribe"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              checked={form.subscribe}
              onChange={(event) => updateField('subscribe', event.target.checked)}
            />
            <span className="leading-6">
              Email me occasional website and growth updates. Optional.
            </span>
          </label>
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
            <Button type="button" variant="secondary" onClick={goBack}>
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
  )
}
