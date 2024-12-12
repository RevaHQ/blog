---
title: "Rethinking Testing for AI Products: Evals in Perspective"
date: 2024-12-12T11:00:00+01:00
toc: false
description: "Why you need more than Evals to ship AI products with confidence: A framework for comprehensive LLM testing"
images: [https://assets.tryreva.com/rethinking_evals.webp]
tags:
  - case_study
  - comparison
  - evals
  - testing
---

{{< figure src="https://assets.tryreva.com/rethinking_evals.webp"
alt="Reva AI tooling - Rethinking Testing for AI Products: Evals in Perspective"

>}}

# Rethinking Testing for AI Products: Evals in Perspective

In the rapidly evolving landscape of artificial intelligence, products have to be tested in significantly different ways. Traditional testing methodologies, meticulously crafted over decades of software engineering practice, are being fundamentally reimagined—and for good reason, as a new approach is needed to reason about the performance of LLM features.

## Chasing Determinism: Why LLM Testing Defies Convention

Software engineers have long relied on predictable, reproducible testing frameworks. Unit tests, integration tests, and end-to-end tests have been our trusted companions in ensuring code quality. We validate inputs, verify outputs, and create comprehensive test suites that provide a high degree of confidence in our systems.

Large Language Models (LLMs) obliterate this comfortable paradigm by introducing non-determinism. The same prompt can generate subtly—or dramatically—different responses across executions. This fundamental unpredictability renders traditional unit testing not just challenging, but practically impossible. We talked about the shift to [traditional product development in a previous post](https://blog.tryreva.com/posts/ai-product-development-lifecycle/)

So how do we build confidence in systems that aren't deterministic?

## Enter Evals: The New Confidence Builders

Evals represent our first line of defence in understanding and constraining AI system behaviour. Think of them less as binary pass/fail tests and more as sophisticated probabilistic assessments of model performance and safety.

A robust eval framework will include a small number of prompts, with some constraints and expectations on the answers generated, typically encompassing:

- Behavioural consistency checks
- Safety boundary testing
- Performance benchmarking across diverse input scenarios
- Bias and fairness assessments
- Alignment verification with intended system goals

## What Evals Cannot Do

Critically, evals are not a silver bullet. They depend on a roll of the dice, rerunning them will produce different answers. We could say they are potentially equivalent to flaky tests, but we also need to understand that in non-deterministic systems you can never get full test coverage. Evals only cover known cases, but when you put your product out into the world you could get any sort of input, and any sort of output. Evals build confidence but cannot guarantee absolute predictability. They're more akin to spot-checks to assess risk than definitive quality seals. This probabilistic nature demands a fundamentally different approach to system validation.

## The Integration Testing Imperative

If evals are our initial probabilistic screening, integration testing should become the true proving ground for AI systems. Unlike traditional software, where integration testing validates component interactions, AI integration testing must validate the AI behaviour with respect to the existing system. The goal shifts from finding explicit bugs to understanding systemic behaviour under varied, sometimes extreme conditions.

Effective AI integration testing requires comprehensive contextual simulation, a way to see how the AI responds to typical user interactions. More than this it should be continuously able to pull in edge cases, for example difficult interactions that caused worse-than-expected outcomes in the past. And crucially, it should be done with enough volume that you can be confident that the result isn't just a favourable roll of the non-deterministic dice. At Reva, we're building infrastructure to enable teams to test at real scale, helping them ship LLM products with confidence

## A New Engineering Discipline

Software engineers must change their mindset, moving from deterministic problem solvers to probabilistic risk managers when working with AI products. The future of AI testing isn't about elimination of all potential failures, but intelligent risk mitigation and continuous, adaptive validation. We're not just writing code anymore; we're orchestrating intelligent systems whose behaviours emerge from intricate, probabilistic foundations.

