# WhatsApp Chat Bot Using ChatGPT | LangChain | WhatsApp Web JS

[![GitHub Repo stars](https://img.shields.io/github/stars/anggara-26/Ucup-Ai?style=social)](https://GitHub.com/anggara-26/Ucup-Ai/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/anggara-26/Ucup-Ai?style=social)](https://GitHub.com/anggara-26/Ucup-Ai/network/)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fanggara0526)](https://twitter.com/anggara0526)
[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=https://github.com/sponsors/anggara-26)](https://github.com/sponsors/anggara-26)

This is a WhatsApp bot that connects with [Chat GPT](https://openai.com/chatgpt). Check out the documentation below to get started.

Facing issues? Check the [FAQ page](https://github.com/anggara-26/Ucup-Ai/wiki) and do a search on past issues. Feel free to open a new issue if none has been posted previously.

Feature request? Check the past discussions to see if it has been brought up previously. Otherwise, feel free to start a new discussion thread. All ideas are welcomed!

## Motivation

I was bored and finally thought about trying ChatGPT from OpenAi and I thought it would be easier if I could just chat with ChatGPT from WhatsApp.

I looked for references for this and there are still very few open-source that specifically shows what I need, so I made this project open-source so hopefully it can be useful for those who need it.

## Quick Start Guide

1. Clone the repo

```bash
git clone https://github.com/anggara-26/Ucup-Ai.git
```

2. Rename `.env.example` to `.env`
3. Put your openAi API Key `OPENAI_API_KEY="YOUR_API_KEY_HERE"` at `.env`
4. Put your MongoDB URI at `.env` if you use Remote Auth Strategy (optional)
5. Personalize your chat bot, change `PREFIX_TEMPLATE` variable at `src/ai.ts`
6. Run `npm run dev`
7. Scan the QRCode

## Installation

```bash
npm i
```

## Development

First, run the development server:

```bash
npm run dev
```

Scan the QRCode on your WhatsApp app.

Done.

## Support

How to support? Support this effort by giving a star on GitHub, sharing your own Chatbot and giving a shoutout on Twitter or becoming a project [sponsor](https://github.com/sponsors/anggara-26).

## Licence

[MIT](https://github.com/anggara-26/Ucup-Ai/blob/main/LICENSE) © [Anggara Roshandi](https://anggara0526.my.id)
