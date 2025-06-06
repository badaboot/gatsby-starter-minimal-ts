---
slug: "/thoughts-vibe-coding"
date: "2025-06-04"
title: "Vibe coding + SQL"
tags: ["technology"]
---

TLDR: I had to prompt to generate SQL queries while working with [lovable.dev](https://lovable.dev/), and the results were interesting.

### Background

Lovable.dev was promoted in a LinkedIn post, and its post on [vibe coding](https://lovable.dev/blog/what-is-vibe-coding) promised `Full-scale apps from simple descriptions`.

It seems to target non-developers with [posts like these](https://lovable.dev/blog/uottohack-umar-app-development), so I thought: if a non-technical person can do that, how much further can a technical person go?

### Testing the hypothesis

Instead of creating an app from prompts I decided to remix an existing one to save time. I chose a note-taking app. The UI looks clean and more importantly, it works.

I tried a few prompts to add fields including an **Author** field, and it worked.
<img src='../../img/note.png' alt="Note-taking app from lovable.dev" />
<span>Note-taking app from lovable.dev</span>

It's frontend only and uses the **React** library; I tried editing it and found editing is **disallowed in the Free plan**.

<img src='../../img/react.png' alt="The frontend app uses React and is structured" />
<span>The frontend app uses React and is structured</span>

Lovable's **Free plan** also limits me to **5 queries per day**. At this point I'm tempted to download the code and edit it myself. I'm a full-stack dev, I can do lots of things...

Hold on; lovable's promise was one can get a full-stack app, complete with databases, by merely prompting. It promised: [`Full-scale apps from simple descriptions`](https://lovable.dev/blog/what-is-vibe-coding#the-future-of-vibe-coding).

I should at least test out its database connection through [Supabase](https://supabase.com/).

### Database integration

I setup a Supabase account and successfully connected it to lovable. Given I chose a **community project** in lovable I expected to see ready-made SQL statements to create the tables. However there weren't, and I was asked to **prompt to create** the tables.

Hmm, there's a first time for everything.

I've written SQL `CREATE` statements before and never prompted for them. Here's what I did:

1. write the SQL `CREATE` statements and test it locally on Postgres
2. write a prompt to describe the statement
3. put the prompt into lovable and verify the resulting SQL was correct

A non-technical person can prompt to create the `CREATE` statements and get them right; this is not the hard part.

I then wrote a **SQL query** to list notes with tags. Since `notes` and `tags` is a many-to-many relationship I had to `JOIN` various tables and use `STRING_AGG()` to combine multiple rows. I wrote the query, tested it in SQL, and gave up with prompting for it via Lovable's LLM.

**Prompting is too much work** in addition to dev work. At this point I can recreate the tables + frontend locally. Prompting adds more time from **ideating + testing + complexity**.

I'm sure a non-technical person can figure out the query by prompting eventually, however SQL and prompting are separate skills, and it's a lot to learn both.

### Does it match the hype?

If the hype is **creating the app of your dreams with a few lines of English**, then we're not there yet.

Lovable does give people a set of building blocks, and saves time choosing a technology stack.

This `text-to-app` category includes many players, including Google. The bigger players have higher usage limits while smaller providers like Lovable provide a focused feature set (eg. connection to Supabase).

Every platform is trying to be sticky and provides a custom prompt manual, including Lovable. [Lovable's prompt manual](https://lovable.dev/blog/2025-01-16-lovable-prompting-handbook) is specific to app-building.

As a technical person I'm watching this space to save time on my development flow. So far prompting has not saved me time, but who knows, it might in the future.
