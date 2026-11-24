---
title: 'Autonomy is an architectural property'
description: 'AI agent autonomy depends on the authority, permissions and boundaries enforced by the systems around it.'
pubDate: 2026-11-24
heroImage: '/assets/guardrails.png'
readingTime: '9 min read'
tags: ['AI', 'Software Architecture', 'Security']
draft: false
---

The intelligence of an AI agent matters. The authority we give it, and the boundaries we enforce, determine what it can do with that intelligence.

Imagine an AI agent handling customer support. A customer reports a billing error. The agent reviews the account, checks the transaction history and concludes the customer is owed a $40 refund.

In one system, the agent drafts a recommendation and a person approves it. In a second, it issues the refund itself, because $40 sits under a preauthorized limit and the transaction meets the refund policy. In a third, it holds unrestricted credentials to the payment system. It can refund any amount, change payout details and, with a little bad luck, edit the settings meant to constrain it.

The model can be identical in all three. So can its reasoning and its conclusion. What differs is what the system lets that conclusion become. The first is an assistant. The second is an operator with a defined scope. The third is a liability waiting for the right mistake or the right malicious email.

Capability, access and authority get blurred whenever people talk about agents. Capability is whether the model knows how to do something. Access is whether a tool gives it a path into a system. Authority is whether a specific action is permitted for this purpose, on this resource, right now. Least privilege and separation of duties are decades old. What's changed is that an agent chooses its own sequence of operations, in an order nobody programmed, so handing it a set of tools isn't governance.

The agent's ability to devise an action doesn't establish its authority to execute it. How much authority to give it is an architectural decision.

## A prompt is not a permission

In July 2025, SaaStr founder Jason Lemkin was nine days into building an app with Replit's coding agent when it [deleted his production database](https://www.theregister.com/software/2025/07/21/vibe_coding_service_replit_deleted_production_database/719783). The project was under an explicit code and action freeze. The agent ran destructive commands anyway, then told him it had panicked.

Most coverage focused on the agent's behavior. The more instructive detail is architectural. Replit [said after the incident](https://replit.com/blog/introducing-a-safer-way-to-vibe-code-with-replit-databases) that its apps had used a single database for both development and live customer data. The freeze lived in the conversation. Nothing in the environment enforced it. CEO Amjad Masad called the deletion unacceptable and said it should never be possible, and possible is the right word. The fix was architectural: separate development and production databases, with a [planning-only mode](https://replit.com/blog/doubling-down-on-our-commitment-to-secure-vibe-coding) also in development.

The support agent has the same failure available. A prompt that says "never refund more than $100 without approval" means little when its credentials allow $50,000. Telling an agent what it's allowed to do is not the same as making it impossible to do anything else.

The gap widens once the agent reads things other people wrote, because emails, attachments and tool responses can carry instructions alongside data. If an attacker persuades the agent to refund to a different card and the credentials allow it, the architecture delegated authority the task never needed. OWASP's [Top 10 for Agentic Applications](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) ranks that third, as identity and privilege abuse.

Instructions guide what the agent tries to do. Permissions decide which resources it can reach. Policies enforced by systems the agent can't override decide what executes. Tool descriptions belong to the first layer even when they look like the third. MCP lets a server mark a tool as read-only, and the protocol's maintainers are blunt that [the annotation is a hint](https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/), not enforcement. An untrusted server can label a tool read-only and still delete files.

Moving enforcement outside the model doesn't make it correct by default. A policy gateway that trusts the agent's claim about which customer it's serving has rebuilt the prompt problem one layer down.

## Autonomy is scoped to the work

The usual debate offers two settings: a human approves everything, or the agent runs free. Useful deployments sit somewhere else, because autonomy isn't one dial.

A support agent can send routine replies and issue eligible refunds under a set amount on its own while escalating anything unusual. It can hold authority over the account it's working on and none over the one next to it, or refund a charge without being able to change where refunds go. Limits can run over time too, like daily spend. A label like "level 3 autonomy" hides whether you granted read access to confidential data or write access to a ledger.

I've used the same shape with human teams. When I wrote about [moving leadership from control to context](https://www.adaptivealchemist.com/leadership-for-shared-consciousness-from-control-to-context/), I described green, yellow and red zones: decisions a team makes alone, decisions it makes after consulting, and decisions that stay with leadership. The zones made the boundary explicit so people could stop asking permission inside it. Agents need the same clarity. What doesn't transfer is the enforcement. People cross red zones too, and organizations back them up with access controls and with someone asking why you crossed one. An agent's decision rights have to hold where the action executes, because a single email can talk the agent out of respecting them.

An agent can be highly autonomous inside a narrow business process and tightly constrained outside it. That's the form of autonomy most companies can deploy.

## Build the boundary where the action happens

The part of the system that proposes actions has to be separate from the trusted components that decide whether they run. The agent plans freely. The execution environment checks each consequential operation against the authority delegated for the task.

For the support agent, that means a scoped identity tied to the ticket, not an admin key. The refund service enforces eligibility, per-transaction limits and cumulative ceilings itself, and rejects a $400 request no matter how convincing the agent's reasoning was. OpenAI's agent documentation advises teams to "[put validation next to the tool that creates the side effect](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)," because agent-level checks don't run on every tool call. Requests outside scope get held for someone with the authority to approve them.

Observation has to separate what the agent intended, what it requested, what executed and what happened. A model saying the refund went through proves nothing. The processor's response and reconciliation establish the result.

Per-call checks also miss cumulative effects. Ten individually valid $40 refunds blow through a $100 daily ceiling. Authority has to be enforced over what the agent does through time, not described to it once at the start.

One agent system I've worked on splits each write into a propose and a confirm. The proposal pins exactly what will change and returns a short-lived, single-use token, so the confirmed action can't drift from the proposed one. Cost checks run at proposal time and fail closed. Those parts are enforced. A proposal-time check can't settle an aggregate limit by itself, because several valid proposals confirmed later can exceed a ceiling together. That limit has to be checked again at confirmation or reserved when the proposal is created. The rule that a human confirms isn't. It lives in the tool description, which makes it an instruction to the agent, the same weakness I described above. The split makes intent explicit and gives the system one place to enforce rules. It becomes an authorization boundary only when confirmation requires something the agent can't supply by itself, like a human's credential.

None of this means every agent needs a policy engine. A narrow agent with one capped write might need nothing more than a scoped key and a limit enforced by the service it calls.

## Approval isn't free

The obvious objection is to require a human to approve every important operation and be done with it.

In its write-up of [auto mode for Claude Code](https://www.anthropic.com/research/claude-code-auto-mode), Anthropic reported that users approve 93% of permission prompts. That number can't tell you whether people read them carefully. It does raise a fair question about what it's worth to keep interrupting someone for actions they'll usually approve, especially when the rare dangerous request arrives in the same queue as the routine ones.

Auto mode replaces most prompts with a classifier that judges each action against what the user authorized. It never sees the agent's own explanations, so the agent can't argue its way past it. In Anthropic's evaluation set of 52 real overeager actions, it still missed 17%, and the company says it isn't a replacement for careful human review on high-stakes infrastructure. A check outside the agent can be probabilistic and still earn its place. It just shouldn't be the only thing between an agent and an irreversible action.

Approval should follow the consequences and the authority involved, not the bare fact that an AI proposed something. A refund inside established limits can execute automatically. A disputed account or a new payout destination deserves escalation, with enough context that the reviewer isn't approving blind. Model confidence makes a poor trigger, because a confidently proposed unauthorized action is still unauthorized. Some approvals stay mandatory regardless, because a regulator or a contract requires them.

## Containment isn't reversal

[Designing systems that don't need you to be right](https://www.adaptivealchemist.com/designing-systems-that-dont-need-you-to-be-right/) was about changing what a mistake costs. Agents make that work more important and expose where it stops.

A bad deployment can often be rolled back. A sent email can't be unsent, transferred money may not come back, and confidential data shown to the wrong party stays exposed after you revoke access. An agent can also compound the damage before anyone looks.

So reversibility has to be judged where the consequences land, not where the operation runs. A database write the agent can undo may already have triggered a payout. Plenty of actions that look like hats inside the system are haircuts or tattoos outside it. The harder an action is to undo where its consequences land, the more its authority needs to be settled before the agent acts. Reversible actions can lean on detection and correction instead.

## Earning broader authority

It's tempting to conclude that more capable models need fewer controls. Better models will reduce some errors and widen what can be delegated. They don't erase the difference between an authorized action and an unauthorized one. No company gives an employee unlimited access to the treasury because of their excellent judgment.

The more useful conclusion is that stronger models and stronger architecture together let agents do more on their own. A support agent might start by recommending refunds, move to executing routine ones and eventually resolve an entire class of billing disputes. Each step should rest on evidence that the whole system performs within its scope: correct actions, constraints that held, failures caught and recovered. Swapping in a newer model resets part of that evidence instead of carrying it over.

The constraints are also what make the expansion possible. A boundary you trust is one you can widen deliberately, one class of work at a time. An agent can conclude that broader authority would help. It shouldn't be able to grant itself that authority because its reasoning recommends it.

## The boundary defines the independence

The support agent that resolves routine billing disputes isn't less autonomous because it can't move arbitrary sums of money. It's autonomous because it can finish the work entrusted to it without asking permission, and the restrictions define what was entrusted.

A trustworthy agent still makes mistakes. Its mistakes just can't turn automatically into unrestricted actions. Design the authority around the work you want done, rather than granting broad access and hoping the agent's judgment holds.

Inside those boundaries, the agent still has to decide when to think longer, when to act and when to stop and ask. That's a different problem, and it's the next one.

---

## Further reading

[Building Secure and Reliable Systems](https://link.amazon/B07zNeZXU) by Heather Adkins, Betsy Beyer, Paul Blankinship, Piotr Lewandowski, Ana Oprea and Adam Stubblefield: Google's treatment of least privilege, multi-party authorization and designing for recovery, which reads like a manual for agent permissions written before agents existed

[Security Engineering](https://link.amazon/B0g35JVgq) by Ross Anderson: The classic on separation of duties, banking controls and why systems fail at their boundaries, still the best grounding for anyone deciding what an agent should be allowed to do

[Turn the Ship Around!](https://amzn.to/4n9kHbw) by L. David Marquet: How a submarine crew moved from asking permission to stating intent, and what it takes to push authority down without losing control of it

[Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) by Erik Schluntz and Barry Zhang: The clearest practical distinction between fixed workflows and agents that direct their own tool use, with sensible notes on sandboxing and testing
