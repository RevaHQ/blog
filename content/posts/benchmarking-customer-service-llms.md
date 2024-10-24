---
title: "Benchmarking Customer Service LLMs: Exploring Intercom's Switch from GPT-4 to Claude"
date: 2024-10-23T11:00:00+01:00
toc: false
images:
tags:
  - case_study
  - comparison
  - anthropic
  - open_ai
---

Earlier this month, Intercom announced the release of their latest product, Fin 2, an update to their customer service chatbot that has been helping their customers offer support by answering customer questions since last year.

On the technical side, Intercom shared one of the big changes; Fin 2 is [powered by Anthropic's Claude 3.5 Sonnet](https://www.intercom.com/blog/fin-2-powered-by-anthropic-claude-llm/), a big change as the original Fin was [powered by GPT4](https://www.intercom.com/blog/announcing-intercoms-new-ai-chatbot/).

An obvious question would be "how big of an impact could they expect to see in the quality of their product?". We can't know exactly the system Intercom has worked to build, so when they say “With Claude, Fin answers more questions, more accurately, with more depth, and more speed”, we don’t have real technical context on that impact, from the outside. Focusing on accuracy, can we find a way to empirically compare the models they likely used (either GPT-4o or GPT-4o-mini) to the model they've moved to (Claude Sonnet 3.5)? These tests were conducted prior to the Oct 22nd [update](https://www.anthropic.com/news/3-5-models-and-computer-use) of Claude 3.5 Sonnet and represent the information Intercom had available to them to make their change.

# Evaluating models

To compare the potential performance of models many teams go on vibes, having ad-hoc conversations or using one or two ‘eval’ questions and 'feeling' good or bad about the model, prompt and configuration they have chosen. We've been thinking about the problem a little differently. For any task, we want to prove that a model is both suitable and reliable. To show both we need data, not vibes, at a scale that proves what we see isn't a fluke.

As a first attempt at evaluating the models, we might get hard data by testing them on a classification task. For example, we can use a small dataset of 400 emails (synthesised for this test, available on [HuggingFace](https://huggingface.co/datasets/RevaHQ/data-phishing-detection)), known to be either genuine or phishing, and see if each LLM can correctly identify them. Doing this, we find Claude 3.5 Sonnet achieved 85% accuracy, which was the same as a locally-run Llama3.1-7B, lower than the GPT-4o score of 87.5% and GPT-4o-mini, which scored 86.25%. So is Claude worse? Well, the result is a reliable indication of the model setup, but this is not a suitable test of a customer support agent. LLMs are extremely flexible tools, but good performance on one task is not a guarantee of good performance on another.

{{< pullquote >}}
We should really test these models on a task like the sort of support work a customer support agent does.
{{< /pullquote >}}

# A Task Like Fin

In order to go deeper understanding what these models are good at, it might be tempting to look at academic question-answering benchmarks as ‘roughly equivalent’. Unfortunately, there is a world of difference between those questions (e.g. knowing the capital of France) and helping a customer change their password. We should really test these models on a task like the sort of support work a customer support agent does.

# Backtesting

If we had Intercom’s historic data we could use previous questions to give an indication of model performance, a process called backtesting. This is a powerful tool for comparing algorithms, used frequently by traders to ask “would I have made more money with a different trading strategy last month?”. With a history of LLM use we would have a ready-made dataset to use, we could ask “What would my product have looked like last month if we used Claude rather than GPT-4o?” and directly, concretely compare their performance at scale, to show reliable metrics, a sort of integration test that would then give you the measurable impact of any AI change you make. We can replay a scenario in different models to build data and not just vibes.

## Building a dataset

Since we don’t have access to Fin’s systems or data, we need to synthesise something similar to the sorts of prompts Fin would feed a model. We will go into detail on this process in an upcoming post about data synthesis for testing, the script we used to generate the data can be found [here](https://github.com/RevaHQ/data-inverted-RAG). At a high level, we invert the process used by a Retrieval-Augmented Generation system to build prompts that a customer support agent would use. Taking a section of a support doc and asking an LLM to take on the persona of a user and ask a question answered by the doc. These are the easiest sort of questions for a customer support agent to answer, but they begin to represent the task. Our dataset is 1,000 of these prompts, including question and support doc, and we will get each model to answer every question.

# Results

{{< full-width >}}
{{< metrics-comparison >}}
{{< /full-width >}}

Our backtesting approach makes it easy to see the quantitative, aggregate data that summarises key strengths and weaknesses of each model on the task, as well as dive into individual generations, to see the qualitative performance of each model on a single example, much like an eval. The readability of answers from all candidates is roughly the same, all producing high-school-level text, though Claude is very slightly in sophomore rather than freshman territory. That increased complexity coupled with longer answers might be an advantage for Claude. Again, the task dictates what is truly important, so let’s take a look at some of the signals we are seeing in detail.

## Response Length

Claude responses are generally the longest of our three candidates, about 11 words more than GPT-4o on average, or 5 more than GPT-4o-mini. Is this what Intercom means by ‘deeper’? Let’s look at a specific example, both Claude and GPT-4o answering the same exact question:

> I've been trying to set up Fin AI Agent in our Messenger, but I'm getting some conflicts with an existing Workflow. Can you help me understand how to use the "Let Fin answer" step to avoid this conflict? Specifically, what happens when a customer opens a new conversation and clicks on a reply button - does that mean Fin will never fire if the composer is disabled at the start of the Workflow?

In the answers compared below, Claude is more wordy certainly, but we can see its output is more clear and explanatory, which Intercom would be right to classify as “deeper” in the context of a chatbot. Qualitatively this reads like a stronger response. Interestingly, when we dig in, we see GPT-4o offered incorrect information, “When a customer opens a new conversation and clicks on a reply button, they enter the Workflow, and Fin AI Agent will not trigger.” is not true, and Claude offered correct information.

{{< details title="Claude 3.5 Sonnet's answer" >}}

> Thank you for reaching out about setting up Fin AI Agent in your Messenger. I understand you're experiencing some conflicts with an existing Workflow and have questions about how the "Let Fin answer" step works. I'd be happy to help clarify this for you.
>
> Based on the information in our support docs, here are a few key points that should help address your concerns:
>
> 1. Workflow and Fin AI Agent conflicts: There are two main scenarios where conflicts can occur:
>
> - When a customer sends their first message, Fin AI Agent takes priority over Workflows.
> - When a customer opens a new conversation in the Messenger, the Workflow will be shown with reply buttons.
>
> 2. Reply buttons and Fin AI Agent: You're correct that if a customer clicks on a reply button, they enter the Workflow, and Fin AI Agent won't fire. This is because choosing a reply button means the customer is following the Workflow path rather than asking an open-ended question.
> 3. Disabled composer: If you disable the composer at the start of the Workflow, you're right that this will prevent Fin from firing. This is because Fin needs the customer to type a message to generate a response.
>
> To avoid these conflicts and ensure Fin can still operate effectively, here are some suggestions:
>
> 1. Remove the "Disable customer reply" option from the start of your Workflow. This allows customers to type their own messages, which Fin can then respond to.
> 2. Add the "Let Fin answer" step later in your Workflow, preferably after a button that says "Ask question" or something similar. This gives customers a clear path to interact with Fin.
> 3. Ensure that the audience targeting for your Workflow and Fin don't overlap, to prevent conflicts.
> 4. If you want to use both the Workflow and Fin, consider adding a message action in your Workflow that prompts the customer to ask a question. This can then lead to the "Let Fin answer" step.
>
> Remember, the "Let Fin answer" step will only trigger after a customer has sent a message in the conversation. So if you want Fin to respond after a button click, you'll need to add a prompt for the customer to type a question.
>
> I hope this information helps clarify how to use Fin AI Agent alongside your existing Workflows. If you have any more questions or need further assistance, please don't hesitate to ask. We're here to help you get the most out of your Intercom setup!

{{< /details >}}
{{< details title="GPT-4o's answer" >}}

> Hello! I'd be happy to help you with setting up the Fin AI Agent and resolving the conflicts you're experiencing with your existing Workflow.
>
> To address your specific question about the "Let Fin answer" step and when Fin AI Agent will fire, here's what you need to know:
>
> 1. **Workflow and Fin AI Agent Conflict:** When a customer opens a new conversation and clicks on a reply button, they enter the Workflow, and Fin AI Agent will not trigger. This is because the Workflow takes precedence in this scenario.
> 2. **Composer Settings:** If the composer is disabled at the start of the Workflow, customers won't have the option to type a message, which means Fin AI Agent won't be able to take over. To avoid this, you should:
>
> - Remove the "Disable customer reply" option at the start of the Workflow. This allows customers to type their questions, enabling Fin AI Agent to respond.
> - Consider adding a Fin step later in your Workflow, ideally after a button that prompts the customer to "Ask a question."
>
> 3. **Using the "Let Fin answer" Step:** This step should be used to hand over the conversation to Fin AI Agent after a customer has sent a message. If you'd like a reply button to lead to a "Let Fin answer" step, ensure you include a message action prompting the customer to engage further.
> 4. **Audience Targeting:** Ensure that the audience targeting for both the Workflow and Fin AI Agent do not overlap, to prevent conflicts.
>
> By following these suggestions, you should be able to integrate Fin AI Agent smoothly with your existing Workflows and avoid any conflicts. If you have any more questions or need further assistance, feel free to ask!

{{< /details >}}
{{< details title="GPT-4o-mini's answer" >}}

> Hi there! I'd be happy to help you with setting up the Fin AI Agent in your Messenger and understanding how to avoid conflicts with your existing Workflow.
>
> When you use the "Let Fin answer" step in your Workflow, it's important to consider how it interacts with customer input and the Workflow itself. If you disable the composer at the start of the Workflow, customers will not have the option to type their questions. In this case, if they click on a reply button, they will enter the Workflow, and the Fin AI Agent will not fire.
>
> Here's a breakdown to clarify:
>
> - **When a customer opens a new conversation**: The Workflow with reply buttons will show up. If the customer clicks a reply button, they will enter that Workflow, and Fin will not respond.
> - **If the composer is left open**: Customers can type their questions, and Fin AI Agent will take over, bypassing the Workflow entirely.
>
> To ensure that Fin can respond, you can try the following:
>
> 1. **Remove the "Disable customer reply" option**: This allows customers to type in their questions, enabling Fin to respond.
> 2. **Position the "Let Fin answer" step later in the Workflow**: Consider adding it after a button that prompts users to ask a question.
> 3. **Check audience targeting**: Make sure that the audience rules for the Workflow and Fin AI Agent do not overlap, as this can cause unexpected behavior.
>
> By making these adjustments, you should be able to set up the Fin AI Agent effectively without conflicts with your existing Workflow. If you have any further questions or need more assistance, feel free to ask!

{{< /details >}}

## Sentiment

On average Claude shows more emotion, whether joy, sadness, anger or fear. The difference is quite small, but we should be aware of the fact that presentation and sentiment can have a huge impact on customer experience. Let’s look at the response that had the strongest fear sentiment detected:

> "Hey, I'm trying to create a Custom Action in my Workflow, but I have no idea what endpoint to call on our third party support tool API. The thing is, we just use some generic API for our email support and the guy who set it up last year left the company... Can you walk me through this 'Select Custom Action' step again? What do I need to provide here?"

What’s interesting here is that it’s clear the emotion is mild in all three responses, Claude likely registers as the most fearful seemingly because it is mirroring the customer’s annoyance back to them (“I want to reassure you that it's completely normal to feel unsure about API details, especially if the person who set it up is no longer with the company. We can work through this together!”). Also notice that Claude goes in-depth on the steps required, and GPT-4o would require more information.

{{< details title="Claude 3.5 Sonnet's answer" >}}

> Hello! Thank you for reaching out about setting up a Custom Action in your Workflow. I understand you're having trouble with the API endpoint for your third-party support tool. Let me try to help guide you through this process.
>
> First, I want to reassure you that it's completely normal to feel unsure about API details, especially if the person who set it up is no longer with the company. We can work through this together!
>
> When you get to the "Select Custom Action" step, you'll need to create a new Custom Action. This requires some specific information about your third-party support tool's API:
>
> 1. The API endpoint URL
> 2. The HTTP method (usually POST for creating tickets)
> 3. Any required headers (like authentication tokens)
> 4. The body of the request, which typically includes the data you want to send
>
> Without knowing the specifics of your support tool, I can't provide the exact details. However, here are some steps you can take:
>
> 1. Try to locate any documentation about your support tool's API. This might be in your company's internal documentation or on the support tool's website.
> 2. If you can't find documentation, reach out to your IT department or whoever manages your support tools. They may have this information.
> 3. As a last resort, you could contact the support team of your third-party tool directly. Explain that you're trying to integrate with Intercom and need the API details.
>
> Once you have this information, you'll be able to set up the Custom Action in Intercom. We're here to help you through that process once you have the API details.
>
> In the meantime, is there any other way I can assist you with your Workflow setup?

{{< /details >}}
{{< details title="GPT-4o's answer" >}}

> Hello! I'd be happy to help you with creating a Custom Action in your Workflow. It sounds like you're at the step where you need to connect to your third-party support tool API.
>
> Here’s a quick guide to walk you through the process:
>
> 1. **Open Your Workflow**: Go to **Automation > Workflows** and open the Workflow you've set up for Fin.
> 2. **Select Custom Action**: Click on **Select Custom Action** and then choose **Create a Custom Action**.
> 3. **API Documentation**: Since you're using a generic API for your email support, you will need to refer to the API documentation for this third-party tool. This documentation will guide you on the correct endpoint to call and the data required.
> 4. **Collect Necessary Data**: Ensure your Workflow is set up to collect the necessary data from the customer. This data will be used in the Custom Action to provide context when creating a ticket on your support tool.
> 5. **Configure the Custom Action**: Use the API documentation to configure the Custom Action with the appropriate endpoint and parameters.
>
> If you're unable to find the API documentation or need specific details that aren't available, consider reaching out to your IT team or checking the Community Forum for additional support.
>
> Let me know if you have any more questions or need further assistance! 😊

{{< /details >}}
{{< details title="GPT-4o-mini's answer" >}}

> Hi there!
>
> I’d be happy to help you with creating a Custom Action in your Workflow! It sounds like you're looking to connect your third-party support tool, but you’re unsure about the specific API endpoint to call.
>
> Here’s a quick walkthrough of the steps you need to follow:
>
> 1. **Access the Workflow**: Start by going to **Automation > Workflows** in Intercom and open the Workflow you’ve set up for Fin.
> 2. **Select Custom Action**: Within your Workflow, click on **Select Custom Action** and then choose **Create a Custom Action**.
> 3. **Refer to Your API Documentation**: This is where you’ll need to refer to the API documentation for your specific third-party support tool. The documentation will provide you with the necessary information on:
>
> - The endpoint URL you need to call.
> - The HTTP method (GET, POST, etc.) you should use.
> - Any required headers or authentication details (like API keys).
> - The data format and parameters that need to be included in the request body.
>
> 4. **Provide Required Data**: Make sure to collect any necessary data from the customer (like their email) before making the API call. You can configure this in your Workflow to ensure all relevant customer information is sent to the support tool.
>
> If you’re having trouble finding the API documentation for your support tool, please let me know the name of the tool, and I can help you look it up!
>
> Feel free to reach out if you have more questions or need further assistance. Happy building! 😊

{{< /details >}}

# LLM-as-Judge

One way the success of Fin is judged is by 'resolutions', whether it solved the customer's problem. We don't have access to real data on this, like corresponding support tickets with closed/open statuses, which can be used to further directly measure success. Instead we can use a common technique, LLM-as-judge, as a proxy. This is an accepted evaluation technique that uses an LLM to provide a qualitative judgement as a large scale test of a sample of the answers generated by these models

We used Llama 3 7B to judge each model’s response to 100 samples from our dataset. In the LLM's judgement both GPT-4o and Claude Sonnet 3.5 were judged to have not resolved two questions, with GPT-4o resolving 98 and Claude resolving 96. Interestingly GPT-4o-mini resolved the most, with 99 resolved. As we’ve seen GPT-4o-mini tends to be more direct, with less commentary, a more “just the facts” approach.

Claude wrote two responses that weren't labelled as either resolving or not resolving, one of which looks like this:

{{< details title="Claude 3.5 Sonnet's insufficient answer" >}}

> Question:
> Hi there, I'm trying to customize Fin's name and profile picture, but when I click on the 'Save changes' button, it just doesn't seem to be applying those changes to the Messenger. Can you help me figure out why this might be happening?
>
> Answer:
> Thank you for reaching out about customizing Fin's name and profile picture. I'm sorry to hear you're having trouble getting the changes to apply in the Messenger. Let me try to help you with that.
>
> Based on the information in our support documentation, here are a few things we can check:
>
> 1. Make sure you're in the correct settings area. To customize Fin's appearance, go to Settings > AI & Automation > Automation.
> 2. After making changes to Fin's name and profile picture, be sure to click the "Save changes" button at the bottom of the page.
> 3. Check if the changes are visible in the preview on the right side of the settings page. This should show you how it will appear to customers.
> 4. Keep in mind that Fin's identity will apply to all messages sent by bots in the Messenger.
>
> If you've followed these steps and are still not seeing the changes reflected in your Messenger, it's possible there may be a technical issue or delay in applying the updates.
>
> Would you mind trying to make the changes again and letting me know if you still don't see them applied after a few minutes? If the problem persists, I'd be happy to look into this further for you.
>
> Is there anything else about customizing Fin that I can help you with?

This seems to be a case where back-and-forth conversation may provide finality, so it's hard to comment on quality. These were both rated 0, and will be included in rating analysis as such.
{{< /details >}}

{{< pullquote >}}
...there are fewer unhelpful responses from Claude than GPT-4o, which may be a good baseline to build from, with better failures than GPT-4o. In short, the bad experience with Claude isn't as bad as the bad experience with GPT-4o
{{< /pullquote >}}

Looking at the ratings, the LLM was instructed to give a quality rating to each response. But here we find what may be one of the main reasons Intercom have chosen to go with Claude as opposed to GPT-4o. As shown below, there are fewer unhelpful responses from Claude than GPT-4o, which may be a good baseline to build from, with better failures than GPT-4o. In short, the bad experience with Claude isn't as bad as the bad experience with GPT-4o, which is hugely important over millions of support conversations. A rising tide of improving quality on average, rather than focusing on a better experience for the high end.

{{< full-width-image src="/images/rev_bar_chart.webp" alt="Three bar charts showing the distribution of answer quality for each of our three models. Claude's answers have a much higher floor than GPT-4o or GPT-4o-mini" >}}

# Conclusion

The story is clear in the data, Intercom's switch to Claude will have clear specific effects when it comes to improving the conversations that are more difficult. Claude is anecdotally much better than GPT-4o, but our results show that Claude's advantages aren't unconditional, and depending on your task going with the popular model isn't always optimal.

Claude will raise the floor for Fin’s worse interactions in its current iteration, so the switch makes obvious sense from a product perspective. There are always new and different models, prompts and approaches, so a good testing framework such as what we have presented here is essential. Of course, Intercom isn't working on a basic version of the task, and their system has the benefit of a talented team of ML Engineers working to tune each aspect of the system to best effect. Their system could produce more relevant support docs, their prompts could have been updated to take advantage of Claude Sonnet 3.5's strengths, and a whole host of changes could have a massive impact. This means it is measuring a specific, relevant metric of model performance (this could be part of SMART goal-setting, for example).

This post has shown that for this task there is no intrinsic advantage to one of these models or the other, execution is what truly matters. As new models appear, having the ability to perform representative tests on your task will be essential. This is the sort of data that will let your team iterate and improve at speed. At Reva, we are working to build out tooling and expertise that helps teams, whether big or small, measure and improve their AI performance, and you can find out more about us [here](tryreva.com).
