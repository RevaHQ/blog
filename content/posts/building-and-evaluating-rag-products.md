---
title: "Building and Evaluating RAG Products"
date: 2025-01-23T11:00:00+01:00
toc: false
description: "Retrieval-Augmented Generation (RAG) - how can you evaluate them?"
images: [https://assets.tryreva.com/RAG_evaluation.webp]
tags:
  - RAG
  - comparison
  - evals
  - testing
---

{{< figure src="https://assets.tryreva.com/RAG_evaluation.webp"
alt="Reva AI tooling - Building and Evaluating RAG Products"

>}}

One of the most popular ways to implement AI product features is using Retrieval-Augmented Generation (RAG). RAG systems dynamically build a prompt, using some existing library of useful information, to give your AI model everything it needs to generate a great response. Once you understand the pattern, its use is obvious everywhere:
 - Chatbots - The bot searches company documentation and support material to find the relevant answers, and generates a response to the customer's question that is accurate, appropriate, and can cite the support documents
 - Natural Language BI tools - The tool draws on knowledge of the data warehouse's table schema to transform a question into a series of SQL queries and fetch the answer.

Everyone, it seems, is building a RAG, but how do they know if it's any good? These systems have outsized potential to make use of your company's information, so how we evaluate them is key. There are three key systems interacting in a RAG, so it's worth isolating and testing each in turn.

### Information Processing (Or: How to Teach a Computer to Read)
The foundation of any RAG system is its ability to process and understand your organization's information. These documents will likely live in a variety of sources and need to be collected for easy, standard access in a single source, be it a MySQL database, ElasticSearch cluster or Pinecone vector database. Along with standard performance measures for these services you should be evaluating this system specifically for how you get information into them and out of them. These include:

- Index building time: Time to extract, transform and load data should be monitored to ensure the index can be rebuilt quickly if there are issues.
- Index latency: How long it takes for a piece of information to get into your RAG. This is critical in any RAG dealing with realtime information.
- Document size: Depending on your task, information stored as larger documents might include more context than is needed, resulting in confusion. Spot-check your index to ensure the documents are discreet, sensible items that are focused and provide details on one specific thing, an answer to a support question, a key business fact, or a single schema, as this will likely improve performance.

### Retrieval (Or: Finding Needles in Digital Haystacks)
The dynamic generation of a prompt in RAG starts with information retrieval, a well-understood task that can be tested, modified and verified independently of the rest of the system. Look at the retrieval step as a search problem, you are taking a query and getting the most relevant results. Depending on your approach to making the prompt, you are likely most interested in the most relevant result, metrics like NDCG@1 or precision will give a clear understanding of how well your retrieval system works. One approach would be to use a benchmark search dataset to generate these metrics, then work on the system to improve those numbers. As well as these, keep track of:

- Retrieval latency: How quickly can the system find relevant information?
- Context relevance: Is the retrieved information actually useful for answering the question?
- Knowledge base coverage: Is the system accessing all relevant information?
### Generation  (Or: Making Sure the AI Doesn't Make Stuff Up)
This is the most task-dependent part of the system. How well an LLM takes a prompt and produces a good response depends on what you want it to do. Is a chatbot friendly? Does a BI tool provide enough context? When evaluating an LLM the temptation is to reach for [evals](https://blog.tryreva.com/posts/evals-in-perspective/) as a way to test. [As we have talked about](https://blog.tryreva.com/posts/youre-not-testing-your-ai-well-enough/) this really isn't enough to give a good idea of how a model will perform, and RAGs make this obvious, how well your chatbot can answer a question on one document has little to do with how well it can answer on another. At Reva we have been working on this problem, and we focus on large-scale testing as a way to give confidence around model performance. Generating a large number of responses and then examining the characteristics of those responses is a better, more indicative way of understanding your model's performance.

- Response Length: Is the system giving enough context, or is it being concise?
- Sentiment: Does the model respond with specific emotions?
- LLM-as-Judge metrics: How well are the responses judged on specific criteria related to the task?
- Response accuracy: Does the system provide correct information?
- Source consistency: Do responses align with your source documents?


### Conclusion
RAG systems work when a number of separate services each work well together, so building and evaluating them requires carefully testing each piece in turn. None need to be perfect, the secret is in understanding the interplay between them and where would benefit most from work to improve the overall system. Your document pipeline could be saving gibberish, your retrieval system could be returning irrelevant results, or your LLM could ultimately be giving terrible responses. Each needs careful testing, and [Reva](tryreva.com) can help ensure your system is set up for success.
