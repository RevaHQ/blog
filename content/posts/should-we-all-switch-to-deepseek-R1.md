---
title: "So should we all switch to DeepSeek-R1?"
date: 2025-02-04T11:00:00+01:00
toc: false
description: "In this post we talk about resisting the urge to follow benchmark hype and making changes specific to your task"
images: [https://assets.tryreva.com/switch.webp]
tags:
  - workflow
  - models
  - testing
---

{{< figure src="https://assets.tryreva.com/switch.webp"
alt="Reva AI tooling - AI Product Development Lifecycle"

> }}

We've all heard the quote "if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid." This wisdom, often attributed to Albert Einstein, has newfound relevance in today's AI landscape, particularly as we witness impressive benchmark results from models like DeepSeek.

While DeepSeek's recent achievements are noteworthy, we need to pause and consider what these benchmarks really tell us. Think of these benchmarks as unit tests for AI - they're specific, controlled measurements of particular capabilities. But just as passing unit tests doesn't guarantee a software system will meet your specific needs, high benchmark scores don't automatically translate to real-world performance for your use case.

## Benchmarks in Context

Let's look at MMLU (Massive Multitask Language Understanding), a popular benchmark. It includes questions like "What is the second most common element in the solar system?" and "Who was president of the United States when Bill Clinton was born?" While these questions demonstrate breadth of knowledge, ask yourself: how relevant are they to your AI application? If you're building a legal document analyzer or a medical diagnosis assistant, does it matter if your model knows about Bill Clinton's birth year? Comparing AI models based on general knowledge benchmarks is like choosing between Yann LeCun (a pioneering AI researcher) and your local pub quiz champion for an AI research position based solely on their general knowledge scores. The pub quiz champion might win at trivia, but that hardly qualifies them to advance the field of artificial intelligence.

The real key to success lies in understanding and testing for your specific needs. Here's why:

First, non-deterministic systems like large language models don't operate like traditional software. Their performance can vary significantly across different types of tasks, and what works brilliantly for one application might struggle with another.

Second, the depth of knowledge in your specific domain matters more than broad, shallow knowledge across many fields. If you're building a financial analysis tool, you need deep understanding of financial concepts and regulations, not trivia about the solar system.

Most importantly, your competitors might be chasing the latest model with the highest benchmark scores, while you could gain an advantage by focusing on what actually matters: performance on your specific use case. This means developing your own evaluation metrics and testing frameworks that align with your actual needs.

## Judging which Model is Best (for your Task)

So what should you do? Start by defining what success looks like for your specific application. Create a comprehensive test suite that reflects real-world usage scenarios. Test multiple models, including ones that might not top the benchmark charts, and evaluate them based on what matters to you.

Remember, the best model for your needs might not be the one making headlines for its MMLU scores. It might be the one that consistently delivers reliable results for your specific use case, operates within your resource constraints, and integrates smoothly with your existing systems. Monitoring this continually and adapting will become the real competitive advantage for AI product teams.

In the end, choosing the right AI model is less about following benchmark trends and more about understanding your own needs deeply. Don't let your AI be judged by its ability to climb trees when what you really need is a fish that swims exceptionally well in your particular pond.
