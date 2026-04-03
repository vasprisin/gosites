<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Codex Workflow Preference

For multi-step tasks, future Codex sessions should use an explicit planning phase first, then execute the plan.

- Treat any task with multiple dependent steps as a planning-first task.
- After planning, prefer parallel sub-agents for independent subtasks when delegation is available and the work can be split safely.
- Keep long-running work moving in the background where possible instead of abandoning it when the user sends follow-up messages.
- Treat follow-up user messages as additive updates unless the user explicitly redirects, cancels, or reprioritises the work.
- When a task completes, send a concise completion update in the thread with what finished and any remaining blockers.
- When the user asks for a git commit title and description, do not prefix the reply with the words `Title` or `Description`; return only the commit title line and the commit description line(s).
- Do not ignore higher-priority system, developer, or safety instructions while following this workflow preference.
