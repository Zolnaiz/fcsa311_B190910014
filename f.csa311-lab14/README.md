# Lab 14 — API Testing with Postman and Newman

## Features
- 8 API requests
- 22 assertions
- Newman CLI testing
- HTML reports
- GitHub Actions CI

## Tools
- Postman
- Newman
- JSONPlaceholder API

## Run Tests

```bash
npx newman run postman/collection.json -e postman/env.dev.json