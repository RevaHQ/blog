---
title: "AI Product Development Lifecycle: tackling uncertainty"
date: 2024-10-30T11:00:00+01:00
toc: false
description: "In this post we discuss the shift in traditional product development when working with the uncertainty and capability of an LLM"
images: [https://assets.tryreva.com/benchmarking.webp]
tags:
  - workflow
  - product_development
  - testing
---

{{< figure src="https://assets.tryreva.com/benchmarking.webp"
alt="Reva AI tooling - comparing OpenAI and Anthropic"

>}}

## Introduction

Throughout my career I’ve been fortunate enough to work within great product and engineering teams, both as an Individual Contributor and Engineering leader, across organisations of varying size. And while processes change company-to-company depending on the context, the fundamental goal of shipping high quality software and impacting the product and customers remained at the core. 
Most product teams adopt a development framework that typically follows this high-level flow:

* **Opportunity assessment:** Do we feel this idea moves the cursor for our product and customer

* **Discovery:** Deep dive into the problem. Start to design and spec out a solution. Often here a PRD will be finalised as well as product design and technical specifications / design.

* **Delivery:** Plan the work to fit a team's sprint or cycle. Implement and ship via the CI/CD pipelines. Rinse and repeat.

* **Measure and Iterate:** Constantly ship incremental improvements based on customer usage metrics

In this traditional product development cycle, teams have well-established pipelines and processes in place. Code is written, tested though unit and integration tests and deployed to non-prod and prod environments through tried and tested CI/CD pipelines that have now become industry standard. The point here is that teams have significant control over the context, and with that comes an element of certainty and confidence - you can define the inputs and business logic, and to a large extent control or predict the outputs with a high degree of certainty. Even from a design perspective, designers have confidence in the space and content they are designing with. When bugs occur, they can be reproduced reliably (most of the time!), hot-fixes applied and shipped. This level of predictability has become the norm and at the same time fundamental to how we’ve approached product development, enabling teams to ship with confidence through the use of having controlled datasets and environments. 

## LLMs are not a feature

Products have evolved to leverage LLMs for core features, and so companies have to adapt to using LLMs in their development cycle. Teams building products now face a set of challenges that do not align with the more controlled elements outlined above. We now have to adapt the traditional product development cycle to include the big black box that an LLM can bring. Not to mention which [LLM a team should use for a specific task](https://blog.tryreva.com/posts/benchmarking-customer-service-llms/)

The controlled and predictable environment teams are used to has been replaced with a more uncertain one, where the relationship between input and output isn’t always deterministic. Even simple features that call an LLM need to account for this shift - the same prompt can produce different responses, user inputs are more varied and unpredictable, and the context teams are dealing with has grown substantially. LLMs are so powerful and the pace of innovation is remarkable, but at the ground level teams are having to rethink how they are not only building product but how they are testing and measuring these LLM-powered products.

## Test more than Vibes

Teams making a configuration change to a model that is core to their product, often at some stage of their development lifecycle go through introducing a blend of Manual, Vibes and Industry benchmark checks to validate changes. We’ve seen teams:

* Manually reviewing a suite (or handful) of core test cases and Eyeballing the results
* Pasting outputs into a spreadsheet and manually reconciling examples
* Comparing results and performance against industry benchmarks that are often not relevant to your task.

These approaches will never scale. They’re risky for teams working at any scale and introduce significant uncertainty into the development cycle. 

In a previous post we talked about our [Backtesting infrastructure](https://blog.tryreva.com/posts/youre-not-testing-your-ai-well-enough/). It's an important aspect of the product development lifecycle that we’ve seen have a big impact and influenced how teams are shipping software.

## Remove uncertainty

Just as teams have CI/CD pipelines for traditional software development, integrating systematic testing of LLM outputs using real and historical datasets needs to become a core part of your development process. Backtesting provides teams with the confidence they need when making changes to their configuration that impacts their product. This can be in the form of prompt change, model change or tweaking parameters. These results influence potential change for the whole team, not to mention potential business outcomes. We’ve found that it's not just the ML team that can benefit from reviewing backtesting outputs, but all members of a product development team.

#### **Development flow**
When an engineer makes a configuration change, they should be able to run backtests locally against a subset of their historical and real data, over any date-range or size. This rapid feedback loop influences change, removes guesswork as it catches potential issues early in the cycle. 

#### **CI/CD Integration**
As part of the CI/CD flow teams can test their widespread changes against any subset of historical changes. This gives a wider business perspective of how a change can impact an outcome. “We tested this change on last month's data, and it had an increase of X”


#### **No vibes path to Production**
Before deploying to production, ML and product leads can assess the change confidently against the business outcome to ensure these changes have a positive impact. Backtesting against production traffic patterns provides full certainty and confidence to teams. 
Teams also have high-quality datasets to use after each backtest that can then be used to train their model. 

#### **Continuous Monitoring**
* Once changes are pushed to production, continuous backtesting ensures teams have:
* Visibility on any degradation in model performance and output
* Visibility on edge cases that were not identified during testing
* Ability to track performance over time

## Ship with confidence

The shift towards LLMs being core to products rather than just a feature means teams need to adapt how they approach testing and measuring. As LLMs continue to evolve, and new ones emerge, having systematic backtesting infrastructure isn't just nice to have - it's a crucial part of the development lifecycle. 
* Engineers can iterate faster, with confidence
* Product teams are making data-driven decisions about changes beyond vibes
* ML teams can focus on improvements rather than reviewing spreadsheets
* Business leaders can clearly see the impact of changes and therefore the true ROI

We’ve seen firsthand teams shift from a mindset of **“we think this will work”** to **“we know this works!”**
