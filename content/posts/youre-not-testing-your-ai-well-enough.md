---
title: "You're Not Testing Your AI Well Enough"
date: 2024-11-13T11:00:00+01:00
toc: false
description: "In this post we discuss backtesting, a way to test your AI comprehensively at scale"
images: [https://assets.tryreva.com/backtesting.webp]
tags:
  - backtesting
  - testing
---

#

The Challenge of Evaluating Large Language Models

Large Language Models (LLMs) have revolutionised machine learning, offering unprecedented versatility across various tasks. However, this flexibility poses a significant challenge: how do we effectively evaluate LLMs to ensure they're suitable for specific applications? In a [prior post](https://blog.tryreva.com/posts/benchmarking-customer-service-llms/) we used large scale techniques to test an LLM change, here we’ll discuss the problem more generally.

## The Problem

Unlike traditional products with well-defined outcomes, LLMs are non-deterministic and seem like they can work well for many different kinds of tasks. This disrupts the usual product development cycle (a topic we’ll cover in future). It’s a fundamental difference that makes conventional ML evaluation metrics nearly impossible to apply: how do we measure the performance of something that inherently defies quantification? Really this boils down to two issues:

1. **Capability**: The breadth of tasks LLMs _can_ be applied to makes comprehensive testing for any one task difficult. Understanding the suitability of the model for the task is key. General performance doesn't always translate to specific task utility.
2. **Alignment**: There's often a gap between capability and consistency in real-world use. Model reliability, how 'aligned' it is with the task, is key to building great features. Having _a_ great conversation with a chatbot doesn't mean it will consistently be able to deal with customers.

As Arvind Narayanan [says](https://x.com/random_walker/status/1778770599340290103) "If AI could _reliably_ do all the things it's _capable_ of, it would truly be a sweeping economic transformation."

## The Solution

Testing your AI well enough means understanding its operating characteristics in all likely scenarios. Large-scale AI testing for your task is essential. When developing a feature you need the confidence to be able to ship changes and know that they improve the experience for customers.

Backtesting is a solution. By replaying a historical scenario with your new settings you can ask "What would last week have looked like if we had made these changes then?", and have a set of 1 to 1 comparisons that you can evaluate and get a rigorous idea of how your AI feature would perform in-situ, _at the task you want it to perform_, before you expose it to customers.

At Reva, we understand the importance of thorough testing and validation when deploying AI models at scale. That's why we've made backtesting the cornerstone of our AI testing framework. It's more involved to implement than quick evals or relying on external benchmarks, which is why we're building it, to help teams test AI better. We provide the data-driven insights and end-to-end confidence that teams need to ensure their AI systems perform as expected in the real world. Our scalable backtesting platform empowers you to meticulously test across a wide range of scenarios, optimize model features, and deliver AI solutions that truly meet the needs of your customers. Contact us today to learn how Reva's backtesting expertise can take your AI development to the next level.
