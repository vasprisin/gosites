'use client'

import { motion } from 'framer-motion'
import { ArrowRight, LoaderCircle, Mail, MessageSquare } from 'lucide-react'
import { useState } from 'react'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { contactSection } from '@/lib/content'
import { fadeUp, scaleIn, staggerParent, viewport } from '@/lib/motion'
import { cn } from '@/lib/utils'

const initialForm = {
  firstName: '',
  email: '',
  phone: '',
  linkedinUrl: '',
  websiteUrl: '',
  messageTitle: '',
  messageBody: '',
  subscribe: false,
}

function Field({ label, required = false, hint, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-800">
        {label}
        {required ? <span className="ml-1 text-blue-600">*</span> : null}
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
        'h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300 focus:bg-blue-50/30',
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
        'min-h-32 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300 focus:bg-blue-50/30',
        props.className
      )}
    />
  )
}

export default function ContactSection() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit message right now.')
      }

      setStatus('submitted')
    } catch (submissionError) {
      setStatus('idle')
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to submit message right now.'
      )
    }
  }

  if (status === 'submitted') {
    return (
      <Section id="contact">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={staggerParent}
        >
          <Card className="overflow-hidden border-slate-200 p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
              <motion.div className="space-y-6" variants={fadeUp}>
                <Heading
                  eyebrow={contactSection.eyebrow}
                  title={contactSection.title}
                  description={contactSection.successMessage}
                  titleClassName="max-w-3xl"
                  descriptionClassName="max-w-xl"
                />
                <Button asChild>
                  <a href={contactSection.cta.href}>
                    {contactSection.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-6"
                variants={scaleIn}
              >
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-slate-950">
                      Message received
                    </p>
                    <p className="text-sm leading-7 text-slate-700">
                      {contactSection.successMessage}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </Section>
    )
  }

  return (
    <Section id="contact">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <Card className="overflow-hidden border-slate-200 p-8 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
            <motion.div className="space-y-8" variants={fadeUp}>
              <Heading
                eyebrow={contactSection.eyebrow}
                title={contactSection.title}
                description={contactSection.description}
                titleClassName="max-w-3xl"
                descriptionClassName="max-w-xl"
              />

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-3">
                  <MessageSquare className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Service request
                    </p>
                    <p className="text-base leading-7 text-slate-700">
                      {contactSection.description}{' '}
                      <a
                        href={contactSection.serviceRequestNote.href}
                        className="font-semibold text-blue-600 underline decoration-blue-200 underline-offset-4 transition-colors hover:text-blue-500"
                      >
                        {contactSection.serviceRequestNote.label}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_30px_100px_-56px_rgba(15,23,42,0.16)] sm:p-6"
              variants={scaleIn}
            >
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
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
                </div>

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

                <Field
                  label="LinkedIn profile URL"
                  hint="Optional. Add your profile or company page if relevant."
                >
                  <Input
                    name="linkedinUrl"
                    type="url"
                    placeholder="https://www.linkedin.com/in/..."
                    value={form.linkedinUrl}
                    onChange={(event) =>
                      updateField('linkedinUrl', event.target.value)
                    }
                  />
                </Field>

                <Field
                  label="Company website"
                  hint="Optional. Add your current site if you already have one."
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

                <Field label="Message title" required>
                  <Input
                    name="messageTitle"
                    placeholder="Tell us what you need"
                    value={form.messageTitle}
                    onChange={(event) =>
                      updateField('messageTitle', event.target.value)
                    }
                  />
                </Field>

                <Field label="Message body" required>
                  <Textarea
                    name="messageBody"
                    placeholder="Share the details, timeline, and anything else we should know."
                    value={form.messageBody}
                    onChange={(event) =>
                      updateField('messageBody', event.target.value)
                    }
                  />
                </Field>

                <label className="flex items-start gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <input
                    name="subscribe"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    checked={form.subscribe}
                    onChange={(event) =>
                      updateField('subscribe', event.target.checked)
                    }
                  />
                  <span className="leading-6">
                    Email me occasional website and growth updates. Optional.
                  </span>
                </label>

                {error ? (
                  <div className="rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        Submit enquiry
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    General enquiries only.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </Section>
  )
}
