---
slug: "/frontend-engineering-challenges"
date: "2025-06-02"
title: "What makes frontend engineering challenging?"
tags: ["technology"]
---

Why is frontend engineering hard? It's more than pixel-pushing.

1. Everyone has an opinion on the UI including the users, colleagues, and their grandmas. Only the database people care for [optimistic vs pessimistic locking](https://stackoverflow.com/questions/129329/optimistic-vs-pessimistic-locking), but the general population have an opinion on a button size and color, plus font style and size. People will disagree and grumble about the decision.

2. A new framework or library comes out every month in addition to the AI stuff. AI models can be used in-browser with **web-llm** and **web GPU**, with heavy performance implications. It's more than styling; the browser can crash, preventing the user from doing any work :(

3. Many full-stack engineers started as frontend engineers who went above and beyond, but the reverse is rarely the case. I've yet to hear a backend/distributed systems engineer say they enjoy frontend work; most avoid it like the plague.

4. Frontend is the top layer of a complicated stack including Auth + API + database. The user will experience any inefficiences/deficiencies in the stack, and they'll dislike the UI for it.

5. On new projects I'm often torn between laying the foundations and prettifying the UI. Laying the foundations is more important, but people expect frontend engineers to make things pretty; expectation manangement is key.
