---
title: "Reva"
date: 2024-08-01T11:39:02+01:00
draft: false
toc: false
images:
tags:
  - announcement
---

# Evaluating models

To compare the potential performance of models many teams go on vibes, having ad-hoc conversations or using one or two ‘eval’ questions and 'feeling' good or bad about the model, prompt and configuration they have chosen. We've been thinking about the problem a little differently. For any task, we want to prove that a model is both suitable and reliable. To show both we need data, not vibes, at a scale that proves what we see isn't a fluke.

As a first attempt at evaluating the models, we might get hard data by testing them on a classification task. For example, we can use a small dataset of 400 emails (synthesised for this test, available on [HuggingFace](https://huggingface.co/datasets/RevaHQ/data-phishing-detection)), known to be either genuine or phishing, and see if each LLM can correctly identify them. Doing this, we find Claude 3.5 Sonnet achieved 85% accuracy, which was the same as a locally-run Llama3.1-7B, lower than the GPT-4o score of 87.5% and GPT-4o-mini, which scored 86.25%. So is Claude worse? Well, the result is a reliable indication of the model setup, but this is not a suitable test of a customer support agent. LLMs are extremely flexible tools, but good performance on one task is not a guarantee of good performance on another.


{{< pullquote >}}
We should really test these models on a task like the sort of support work a customer support agent does.
{{< /pullquote >}}


{{< full-width >}}
{{< metrics-comparison >}}
{{< /full-width >}}

## Image

{{< full-width-image src="/images/rev_bar_chart.webp" alt="Quality rating analysis" >}}