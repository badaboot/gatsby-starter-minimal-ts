---
slug: "/thoughts-ai"
date: "2025-06-02"
title: "Thoughts on AI image generation"
tags: ["technology"]
---

### Text to Image

Whenever I look at generated images I want to edit them, since they're usually a little off.

For example these are cats generated using the [Black Forest's Schnell model](https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell) with the prompt: "Angry cat in Japanese style."

<img src='../../img/cat_1.webp' alt="cat with thin lips" />
<span>The upper lips are too thin, also the toes are off by one.</span>

<img src='../../img/cat_2.webp' alt="cat with extra paw" />
<span>This cat has an extra, human-like hand, and its furless foot looks odd.</span>

### With Reference image

When I gave a specific reference image the end result still looks off. This is the original

<img src='../../img/original.jpg' alt="Rene Magritte's pipe image" />
<span>"Treachery of images" by Rene Magritte, 1929</span>

and here's the generated image with a twist.
<img src='../../img/pipe.png' alt="Rene Magritte's pipe image with last word being AI" />
<span>An image I generated with Gemini 2.5 Flash</span>

Perhaps editing the original would've been better, as I only meant to change the caption.

[The original painting](https://www.dailyartmagazine.com/painting-week-rene-magritte-treachery-images/)'s caption said: "This is not a pipe". It's a representation of a pipe.

I changed it to say: "This is not AI." It's a representation of AI-generated images.

### Prediction

AI tools are affordable now; their prices will rise after a **consolidation**. Similar to how Uber and Lyft's fares were low to starve off competitors, and now they're high.

In AI's case the big providers eg. Google will drive other providers out of business before raising prices.

### How to prevent vendor lock-in?

One way is to use open source models (they're on [Huggingface](https://huggingface.co/)), but it's hard to compete against better-funded models.

Another option is to continue to develop core skills (eg. coding/drawing/editing/animation) and avoid being dependent on AI tools. One can still use them to augment existing skills, but they should not be a crutch.
