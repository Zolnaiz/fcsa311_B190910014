# AI Usage Report

## Introduction

This project was developed using AI-assisted software construction methods. 
The development workflow followed the process discussed in Lecture 13:
Spec → Generate → Review → Integrate.

The AI assistant was mainly used for:
- Project planning
- Folder structure generation
- Backend API implementation
- React frontend generation
- Documentation generation
- Debugging assistance

The student reviewed and modified all generated code before integration.

---

# 1. What AI Did vs What I Did

## AI Contributions

The AI assistant helped generate:
- Express backend starter code
- CRUD endpoint structure
- React frontend component template
- Markdown documentation
- Architecture ideas
- Commit message suggestions
- Error debugging suggestions

AI also explained:
- TypeScript errors
- PowerShell issues
- JSON formatting problems
- Vite configuration issues

## My Contributions

I:
- Set up the development environment
- Ran commands manually
- Tested backend APIs
- Connected frontend and backend
- Fixed runtime errors
- Managed GitHub repository
- Organized the project structure

I also reviewed every generated file and adjusted code where necessary.

---

# 2. Hallucination Examples

## Example 1 — Wrong curl Syntax

The AI initially suggested curl commands that failed in PowerShell because PowerShell handles quotes differently from Linux bash.

Problem:
- JSON body parsing failed
- Quotes were escaped incorrectly

Solution:
- Switched to Invoke-RestMethod
- Used PowerShell-compatible syntax

This showed that AI-generated commands may not always match the user's operating system.

---

## Example 2 — Wrong Module Format

The AI generated CommonJS require() syntax while the project used ES modules.

Problem:
- require is not defined in ES module scope

Solution:
- Renamed server.js to server.cjs

This demonstrated the importance of understanding Node.js module systems instead of blindly trusting generated code.

---

# 3. Security and License Concerns

One security-related issue involved API validation.

Originally:
- Tasks could be created with empty titles

Risk:
- Invalid data entering the application

Fix:
- Added validation in the backend:
  if (!req.body.title)

Another concern involved accidentally committing secrets.
The CLAUDE.md file explicitly states:
- Do not commit secrets
- Do not hardcode API keys

The project does not currently use authentication tokens, reducing security complexity.

---

# 4. What AI Helped Speed Up

AI significantly accelerated:
- Boilerplate generation
- Documentation writing
- React component generation
- Backend route creation
- Markdown formatting

Without AI, writing the documentation alone would take much longer.

AI also reduced debugging time by quickly identifying:
- JSX issues
- TypeScript file extension problems
- Vite configuration mistakes

---

# 5. What AI Made Slower

Some debugging became slower because:
- AI occasionally generated incorrect PowerShell commands
- Some generated solutions were too generic
- Some code assumed Linux/macOS environments

The biggest slowdown came from:
- Incorrect JSON escaping
- Curl syntax issues
- Module format mismatch

This required manual troubleshooting.

---

# 6. Skill Atrophy Risk

Using AI too heavily can reduce programming skill development.

To avoid this:
- I manually tested APIs
- I reviewed every generated file
- I debugged issues independently
- I avoided copy-pasting without understanding

I also practiced:
- Git commands
- Node.js debugging
- React component editing

AI was used as a helper, not a replacement for learning.

---

# Conclusion

This project demonstrated that AI can dramatically accelerate software development when combined with human review and testing.

The most important lesson learned was:
"Verify, don't trust."

AI-generated code must always be reviewed, tested, and understood before use.