# Coinkeeper Data Dump

Minimal utility for exporting your personal transaction data for backup, migration, and analysis purposes.

## Requirements

- Node.js
- Active authenticated session

## Setup

1. Install [Node.js](https://nodejs.org)
1. Copy `.env.example` to `.env`
1. Provide authentication data in `.env`
1. Run `npm start`

## Notes

This tool works with your existing authenticated session.
No credentials are stored or transmitted externally.
All data is fetched and written locally.
