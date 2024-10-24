---
title: "Reva"
date: 2024-08-01T11:39:02+01:00
draft: false
toc: false
images:
tags:
  - announcement
---

# Header 1

Plain text here

{{< quote text="We should really test these models on a task like the sort of support work a customer support agent does." >}}

### Header 3

{{< expandable title="Claude 3.5 Sonnet's answer" >}}
Thank you for reaching out about setting up Fin AI Agent in your Messenger. I understand you're experiencing some conflicts with an existing Workflow and have questions about how the "Let Fin answer" step works. I'd be happy to help clarify this for you.

Based on the information in our support docs, here are a few key points that should help address your concerns:

1. Workflow and Fin AI Agent conflicts: There are two main scenarios where conflicts can occur:

- When a customer sends their first message, Fin AI Agent takes priority over Workflows.
- When a customer opens a new conversation in the Messenger, the Workflow will be shown with reply buttons.

2. Reply buttons and Fin AI Agent: You're correct that if a customer clicks on a reply button, they enter the Workflow, and Fin AI Agent won't fire. This is because choosing a reply button means the customer is following the Workflow path rather than asking an open-ended question.

3. Disabled composer: If you disable the composer at the start of the Workflow, you're right that this will prevent Fin from firing. This is because Fin needs the customer to type a message to generate a response.

To avoid these conflicts and ensure Fin can still operate effectively, here are some suggestions:

1. Remove the "Disable customer reply" option from the start of your Workflow. This allows customers to type their own messages, which Fin can then respond to.
2. Add the "Let Fin answer" step later in your Workflow, preferably after a button that says "Ask question" or something similar. This gives customers a clear path to interact with Fin.
3. Ensure that the audience targeting for your Workflow and Fin don't overlap, to prevent conflicts.
4. If you want to use both the Workflow and Fin, consider adding a message action in your Workflow that prompts the customer to ask a question. This can then lead to the "Let Fin answer" step.

Remember, the "Let Fin answer" step will only trigger after a customer has sent a message in the conversation. So if you want Fin to respond after a button click, you'll need to add a prompt for the customer to type a question.

I hope this information helps clarify how to use Fin AI Agent alongside your existing Workflows. If you have any more questions or need further assistance, please don't hesitate to ask. We're here to help you get the most out of your Intercom setup!
{{< /expandable >}}