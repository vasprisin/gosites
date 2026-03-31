# Airtable Setup

Last updated: 2026-03-30 UTC

## Purpose

This file documents the current Airtable setup used by the website form handlers so future sessions can make changes without re-discovering the schema.

## Current Airtable Target

- Base ID: `appuAvzh91hfclBCM`
- Table ID: `tblhCLHHqAfSGwJv1`
- Table name: `Table 1`

These are read from:

- `AIRTABLE_BASE_ID`
- `AIRTABLE_TABLE_ID`

If those env vars are missing, the code currently falls back to the IDs above in [`lib/form-submissions.js`](/home/runner/workspace/lib/form-submissions.js).

## How Submissions Are Written

Both form routes write to Airtable through:

- [`createAirtableSubmission`](/home/runner/workspace/lib/form-submissions.js#L159)

That helper sends:

- one record per form submission
- `typecast: true`

`typecast: true` matters because the code sends single-select values by name, not by Airtable choice ID.

## Form Sources

Two form handlers currently write to this table:

- General enquiry form:
  - [`app/api/contact/route.js`](/home/runner/workspace/app/api/contact/route.js)
- Service request form:
  - [`app/api/enquiry/route.js`](/home/runner/workspace/app/api/enquiry/route.js)

## Field Reference

### `Name`

- Airtable type: `singleLineText`
- Meaning: Person's first name
- Used by: enquiry form, service request form
- Example value: `Alex`

### `Email`

- Airtable type: `email`
- Meaning: Submitter email address
- Used by: enquiry form, service request form
- Example value: `alex@business.com`

### `Phone`

- Airtable type: `phoneNumber`
- Meaning: Contact number
- Used by:
  - enquiry form: required
  - service request form: optional, only sent if provided
- Example value: `+44 7700 900123`

### `LinkedIn URL`

- Airtable type: `url`
- Meaning: Optional LinkedIn profile or company page
- Used by:
  - enquiry form: optional
  - service request form: route supports it, current frontend does not collect it
- Example value: `https://www.linkedin.com/in/alex-example/`

### `Website Situation`

- Airtable type: `singleSelect`
- Meaning: Current website status for service requests
- Used by: service request form only
- Allowed values:
  - `Existing website`
  - `Brand new website`
- Example value: `Existing website`

### `Website URL`

- Airtable type: `url`
- Meaning: Current website address when the person already has a site
- Used by:
  - enquiry form: optional
  - service request form: required when `Website Situation` is `Existing website`
- Example value: `https://example.com`

### `Start Timeline`

- Airtable type: `singleSelect`
- Meaning: How quickly the lead wants to start
- Used by: service request form only
- Allowed values:
  - `Right away`
  - `Within a week`
  - `Within this month`
  - `Next month`
- Example value: `Within a week`

### `Status`

- Airtable type: `singleSelect`
- Meaning: Internal lead stage
- Used by: both forms
- Current default written by code: `New`
- Allowed values:
  - `New`
  - `Qualified`
  - `Contacted`
  - `Closed`
- Example value: `New`

### `Submission Source`

- Airtable type: `singleLineText`
- Meaning: Human-readable label for where the row came from
- Used by: both forms
- Current values written by code:
  - enquiry form: `Website enquiry form`
  - service request form: `Website service request form`
- Example value: `Website service request form`

### `form_name`

- Airtable type: `singleSelect`
- Meaning: Machine-friendly form discriminator used to distinguish row origin
- Used by: both forms
- Allowed values:
  - `enquiry`
  - `service`
- Example value: `service`

This is the field that should be used when filtering rows by form type.

### `Message Title`

- Airtable type: `singleLineText`
- Meaning: Short summary of the general enquiry
- Used by: general enquiry form only
- Example value: `Need help launching a brochure site`

### `Message Body`

- Airtable type: `multilineText`
- Meaning: Main enquiry details
- Used by: general enquiry form only
- Example value: `We need a simple five-page site and want to launch within three weeks.`

## Current Field Mapping By Form

### General Enquiry Form

Route:

- [`app/api/contact/route.js`](/home/runner/workspace/app/api/contact/route.js)

Writes:

- `Name`
- `Email`
- `Phone`
- `LinkedIn URL` if provided
- `Website URL` if provided
- `Message Title`
- `Message Body`
- `Status = New`
- `Submission Source = Website enquiry form`
- `form_name = enquiry`

### Service Request Form

Route:

- [`app/api/enquiry/route.js`](/home/runner/workspace/app/api/enquiry/route.js)

Writes:

- `Name`
- `Email`
- `Phone` if provided
- `Website Situation`
- `Website URL` if provided
- `Start Timeline`
- `Status = New`
- `Submission Source = Website service request form`
- `form_name = service`

## Example Records

### Example General Enquiry Row

```json
{
  "Name": "Alex",
  "Email": "alex@business.com",
  "Phone": "+44 7700 900123",
  "LinkedIn URL": "https://www.linkedin.com/in/alex-example/",
  "Website URL": "https://alexbusiness.com",
  "Message Title": "Need help launching a brochure site",
  "Message Body": "We need a simple five-page site and want to launch within three weeks.",
  "Status": "New",
  "Submission Source": "Website enquiry form",
  "form_name": "enquiry"
}
```

### Example Service Request Row

```json
{
  "Name": "Jordan",
  "Email": "jordan@company.com",
  "Phone": "+44 7700 900456",
  "Website Situation": "Existing website",
  "Website URL": "https://company.com",
  "Start Timeline": "Right away",
  "Status": "New",
  "Submission Source": "Website service request form",
  "form_name": "service"
}
```

## Brevo Relationship

Airtable storage and Brevo auto-replies are separate steps in the form routes:

- first the row is written to Airtable
- then the form route triggers a Brevo transactional email auto-reply

Current auto-reply helper:

- [`sendAutoReplyEmail`](/home/runner/workspace/lib/form-submissions.js#L95)

Current behavior:

- `form_name = enquiry` -> enquiry confirmation copy
- `form_name = service` -> service request confirmation copy

## Notes For Future Changes

- Field names are case-sensitive and must match Airtable exactly.
- Keep `form_name` as the canonical row discriminator unless there is a deliberate migration plan.
- If you add new Airtable fields, update both this file and the relevant route handler.
- If the Airtable single-select choices change, update the route mappings in [`lib/form-submissions.js`](/home/runner/workspace/lib/form-submissions.js).
