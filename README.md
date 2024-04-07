# Coinkeeper Data Dump

1. Install [Node.js](https://nodejs.org/)
1. Get `__AUTH_cookie` from Coinkeeper request via devtools
1. Copy `.env.example` to `.env`
1. Paste `__AUTH_cookie` in `.env` as `COOKIE` value (including `__AUTH_cookie=` part)
1. Run `node --env-file=.env fetch.js`
