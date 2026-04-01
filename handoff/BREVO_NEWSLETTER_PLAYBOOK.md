# Brevo Newsletter Playbook

Last updated: 2026-04-01 UTC

## Current Technical State

- `gosites.uk` already sends opted-in website submissions to Brevo automatically.
- The live backend sync happens in:
  - `app/api/contact/route.js`
  - `app/api/enquiry/route.js`
  - `lib/form-submissions.js`
- Railway production already has `BREVO_NEWSLETTER_LIST_ID=11`.
- Brevo already has:
  - folder `GoSites` (`10`)
  - list `GoSites Newsletter` (`11`)

## What You Still Need To Do Manually

### 1. Authenticate the sending domain

In Brevo, authenticate `gosites.uk` and the sender mailbox you want to use for campaigns.

Why this matters:

- better inbox placement
- fewer spam-folder issues
- aligns with current Gmail, Yahoo, and Microsoft sender requirements

Source:

- https://help.brevo.com/hc/en-us/articles/12163873383186-Authenticate-your-domain-with-Brevo-Brevo-code-DKIM-DMARC
- https://help.brevo.com/hc/en-us/articles/14925263522578-Comply-with-Gmail-Yahoo-and-Microsoft-s-requirements-for-email-senders

### 2. Decide on single opt-in vs double opt-in

Current code is set up for simple direct subscription:

- if a person checks the newsletter box, they are added to list `11`

If you want cleaner consent records, set up Brevo double opt-in for external forms:

- website form submit
- add to a temporary list
- confirmation email
- confirmed contacts move into `GoSites Newsletter`

My recommendation:

- start with the current direct add flow if you want the simplest launch
- move to double opt-in once you want stricter list hygiene and consent records

Source:

- https://help.brevo.com/hc/en-us/articles/27353832123026-Set-up-a-double-opt-in-process-for-a-sign-up-form-created-outside-of-Brevo

### 3. Create one welcome automation

After someone joins the newsletter, send one short welcome email.

Keep it simple:

- thank them
- restate what they will receive
- set the expected cadence
- link to one useful page or case study

Source:

- https://help.brevo.com/hc/en-us/articles/15476926804370-Welcome-message-Send-welcome-emails-to-onboard-new-contacts

### 4. Turn on sending cadence

Enable Brevo sending cadence / frequency cap before you start automations and weekly newsletters.

Recommended starting point:

- max `1` marketing email per week while you are getting started
- if you add a welcome email automation, include that automation email in the cap only if you want strict throttling

Source:

- https://help.brevo.com/hc/en-us/articles/7428460876690-Limit-your-marketing-pressure-with-sending-cadence-Frequency-cap-and-Email-overload-prevention

### 5. Use lists for subscriptions and segments for targeting

Keep `GoSites Newsletter` as the master subscription list.

Later, create segments such as:

- engaged in last 90 days
- never opened a campaign
- contact-form subscribers
- service-request subscribers

Source:

- https://help.brevo.com/hc/en-us/articles/9276668499346-Differences-between-lists-and-segments

### 6. Send the newsletter as a normal campaign

The normal workflow is manual:

- write one issue
- test it
- schedule it for a day and time

You do not need to prebuild months of emails. Start with one issue per week.

Recommended starting cadence for GoSites:

- one email each Thursday morning UK time
- short and practical
- one idea per email

Source:

- https://help.brevo.com/hc/en-us/articles/4413566705298-Create-and-send-an-email-campaign

### 7. Keep promotional nudges separate from transactional emails

Do not label marketing nudges as transactional.

Practical rule:

- the existing enquiry confirmation email is transactional
- extra automated nudges that try to win work or sell services are marketing
- send those only to opted-in subscribers, or send a genuinely relevant one-to-one follow-up tied to the enquiry

For GoSites, the simplest low-risk setup is:

- 1 transactional confirmation right after the enquiry
- 0 additional automated promotional emails to non-subscribers
- weekly newsletter only for people who checked the newsletter box

Source:

- https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/what-are-the-rules-on-direct-marketing-using-electronic-mail/
- https://ico.org.uk/media/for-organisations/documents/2021/2619043/direct-marketing-code-draft-guidance-122020.pdf
- https://help.brevo.com/hc/en-us/articles/7428460876690-Limit-your-marketing-pressure-with-sending-cadence-Frequency-cap-and-Email-overload-prevention

## Suggested GoSites Newsletter

- Name: `GoSites Growth Notes`
- Promise: one short weekly email with one practical website or conversion fix for UK service businesses
- Length: `200-500` words

Simple issue structure:

- subject line
- one problem
- one practical fix
- one proof or example
- one call to action

Starter topics:

- Can a stranger understand your homepage in 5 seconds?
- Why your contact form loses ready-to-buy leads
- The trust signals most small business sites forget
- What to fix on mobile before paying for traffic

## Simplest Operating Workflow

1. Someone checks the newsletter box on the site.
2. The backend adds them to list `11`.
3. Brevo sends one welcome email.
4. Once a week, you write and schedule one campaign to `GoSites Newsletter`.
5. Review opens, clicks, unsubscribes, and replies after each send.
