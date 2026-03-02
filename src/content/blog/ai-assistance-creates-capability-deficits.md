---
title: 'AI assistance creates capability deficits'
description: 'Is AI accelerating your output or your ignorance? New research shows AI-assisted learning can lead to 17% lower comprehension scores. Build real expertise via "load-bearing friction" before you outsource your judgment.'
pubDate: 2026-03-02
heroImage: '/assets/learning-with-ai.png'
readingTime: '8 min read'
tags: ['AI']
---

Picture a junior engineer who ships an AI-assisted feature in record time. Production incident hits two days later. The same engineer stares at the stack trace for 45 minutes, unable to isolate the failure. They never built the mental model that explains how the code behaves. They can't debug what they didn't understand in the first place.

Now picture a junior analyst who uses AI to build a financial model in an afternoon. Stakeholder asks a probing question about the assumptions. The analyst freezes. They can walk through the spreadsheet, but they can't explain why those assumptions make sense for this business context. They assembled the output without building the judgment.

Same pattern, different domain. The mechanism: **removing friction can remove the feedback loops that build skill.**

## The study, briefly

Anthropic researchers ran a small but well-designed experiment (n=52) where developers learned a new Python library with or without AI assistance. The AI group finished slightly faster but scored about 17 percentage points lower on a comprehension quiz taken immediately after. The biggest gap was in debugging questions.

More interesting than the headline result: researchers watched screen recordings and identified how people actually used the AI. Some delegated everything. Some asked conceptual questions and wrote code themselves. Some generated code, then asked follow-up questions to understand it. The delegation patterns scored worst. The patterns that kept people in the reasoning loop scored as well as or better than the control group.

If you want the full methodology, [read the paper](https://arxiv.org/abs/2601.20245). For our purposes, the takeaway is clear: **how you use AI determines whether you're building capability or outsourcing it.**

## This isn't about coding

The study used coding because it's measurable. But the dynamic applies anywhere AI can produce output faster than you can learn.

A consultant using AI to draft strategy decks might hit deliverable targets while never developing the pattern recognition that makes senior consultants valuable. A designer generating UI variations might ship faster while never building the taste that distinguishes good design from competent execution. A product manager using AI to write specs might clear the backlog while never developing the judgment to know which specs shouldn't exist at all.

The common thread: AI handles the production. The human skips the struggle. The struggle was doing the teaching.

I wrote about a related dynamic in my piece on [vibe coding](http:///vibe-coding-will-destroy-your-codebase-but-youre-probably-not-doing-it/), where I argued that AI multiplies whatever rigor you already have. But the risk is deeper than just technical debt; it's cognitive debt. I've felt this shift personally, [from a wake-up call about my own brain on ChatGPT](https://www.adaptivealchemist.com/when-my-wifes-instagram-warning-turned-into-a-wake-up-call-my-response-to-your-brain-on-chatgpt/) to the realization that we are effectively outsourcing our internal "operating system."

This study suggests the same logic applies to learning: AI multiplies whatever cognitive engagement you bring to the task. High engagement plus AI equals accelerated understanding. Low engagement plus AI equals accelerated ignorance.

## When friction matters

Not all friction is equal. Some of it is just friction. But some friction is load-bearing: it's doing the work of building your mental model.

**New domains require struggle.** When you're learning something unfamiliar, the errors you encounter are teachers. The confusion you work through is building neural pathways. If AI removes the errors and resolves the confusion for you, you skip the class. You get the output without the understanding.

This is where most professionals get it wrong. They're under time pressure. AI offers a shortcut. They take it. Completely rational in the moment, completely destructive to long-term capability.

**Familiar domains can absorb speed.** When you're operating in territory you know well, you already have the mental model. You can evaluate AI output because you understand what good looks like. AI becomes a power tool: it amplifies existing capability without eroding the foundation.

The critical question becomes: **where are you on the novice-to-expert spectrum for this specific task?**

Most people overestimate their expertise. They've done something similar before, so they assume they can evaluate AI output in the new context. But "similar" isn't "same." A backend engineer might be expert in synchronous Python but novice in async concurrency. A product manager might be expert in B2B SaaS but novice in marketplace dynamics. A consultant might be expert in cost reduction but novice in revenue strategy.

The honest assessment matters because it determines how much friction you need.

## The three zones

I think about AI assistance in three zones, based on your expertise level for the specific task:

### Zone 1: Learning territory (you're a novice)

You don't know what you don't know. AI can produce plausible-looking output that you can't evaluate. This is maximum danger for capability development.

In this zone, use AI as a tutor, not a generator. Ask conceptual questions: "How does X work?" "What are the tradeoffs between A and B?" "Why would someone choose this approach?" Let AI explain, then do the work yourself. When you hit errors, sit with them before asking for help. The confusion is the curriculum.

If you must use AI to generate output (deadline pressure, client expectations), force yourself into the reasoning loop afterward. Ask: "Why did you structure it this way?" "What could go wrong here?" "What assumptions does this depend on?" Don't just ship the output. Interrogate it until you understand it.

### Zone 2: Developing territory (you're competent but not expert)

You know enough to be dangerous. You can spot obvious problems but might miss subtle ones. AI can accelerate your work, but you need checkpoints.

In this zone, generate and verify. Let AI draft, but require yourself to explain every significant choice before accepting it. If you can't explain why a particular approach makes sense, you've found a gap in your understanding. That gap is a learning opportunity, not a speedbump to skip.

The "explain it to yourself" test is underrated. If you can articulate the reasoning behind an AI-generated solution, you've internalized the logic. If you can't, you're carrying cargo you don't understand, and it will bite you when conditions change.

### Zone 3: Expert territory (you have deep mastery)

You know the domain cold. You can evaluate AI output instantly because you've built the judgment through years of practice. AI is pure leverage here.

In this zone, let it fly. Generate, iterate, ship. Your expertise is the quality gate. The friction would just slow you down without teaching you anything new.

The trap: even experts have edges. The moment you move into adjacent territory where your expertise doesn't fully apply, you're back in Zone 1 or 2\. Stay honest about where those edges are.

## How to introduce friction without losing speed

The goal isn't to reject AI assistance. It's to use it in ways that build capability instead of eroding it.

**For individuals:**

Set explicit rules for yourself based on zone. When I'm learning a new area, I default to conceptual questions only for the first few hours. No generation until I can pass a basic self-test on the core concepts. When I'm generating, I require myself to annotate the output: what does this do, why does it work, what could break it.

Preserve the first error. When something goes wrong, resist the urge to immediately ask AI for the fix. Sit with the error. Form a hypothesis. Try to resolve it yourself. Then, if needed, ask AI to validate your reasoning, not to hand you the answer.

Type instead of paste. This sounds trivial, but it creates friction that forces you to read what you're adopting. Copy-paste is frictionless adoption. Typing is active engagement.

**For teams:**

Build learning time into project plans. If someone is working in a new domain, allocate explicit "no-AI blocks" where they struggle through initial concepts without assistance. The errors they encounter during that period are doing the teaching work. Skipping this phase creates engineers (or analysts, or designers) who can produce output but can't think independently.

Evolve review standards. When someone submits AI-assisted work, require them to explain the reasoning, not just present the output. What invariants does this maintain? What could go wrong? Why this approach over alternatives? If they can't answer, the work isn't ready, regardless of how polished it looks.

Unfortunately, inadequate reviews are the norm, not the exception—reviews that check surface quality but miss deeper problems because nobody in the room built the mental model that would surface them. The output looked fine. The understanding was hollow.

Run "AI-off" exercises. Periodically practice core skills without AI assistance. For engineering teams, this might be debugging drills. For analysts, it might be building models from scratch. For product managers, it might be writing specs with no AI support. The goal isn't to reject tools permanently. It's to maintain the underlying capability that makes you effective when tools aren't enough.

**For organizations:**

Recognize that velocity metrics can lie. If your dashboard shows throughput is up but your experienced people are spending more time cleaning up after juniors' AI-assisted work, you're not more productive. You're hollowed out. You've traded capability formation for output volume, and the bill comes due during your next crisis.

Treat capability development as infrastructure. Just like you invest in platforms, data systems, and tooling, invest in the learning loops that build human judgment. Resilient organizations treat human judgment as the ultimate fail-safe, ensuring their people can actually interrogate what the machine produces. Without that internal expertise, you aren't just using a tool; you're effectively outsourcing your survival to a black box with no one left to pull the emergency brake.

## The capability formation mindset

Forget the binary of “using or not using” AI. The metric that matters is whether your workflow acts as an investment in your future capability or a slow-motion liquidation of your current expertise.

AI is the most powerful lever most of us have ever had access to. Used well, it accelerates both output and understanding. Used poorly, it accelerates output while hollowing out the understanding that makes output valuable.

The study Anthropic ran was small and focused on one skill. But the mechanism it surfaced, friction as teacher, struggle as curriculum, errors as learning opportunities, applies broadly. Every domain where AI can generate output faster than humans can learn has this risk.

The professionals who thrive with AI will be the ones who understand when to let it run and when to deliberately slow down. They'll know their zones. They'll preserve friction where it matters. They'll treat capability formation as a first-class concern, not a nice-to-have that gets sacrificed for speed.

Learning isn't overhead. It's the stability engine. When you delete the feedback loops that produce expertise, judgment, and deep understanding, you're not just slowing individual growth. You're degrading your ability to evaluate, correct, and improve the AI-assisted output you're increasingly dependent on.

The leverage is real. The risk is real. Know the difference.

---

## Go deeper

- [How AI Impacts Skill Formation](https://arxiv.org/abs/2601.20245): the Anthropic study this piece builds on
- [Vibe coding will destroy your codebase](http:///vibe-coding-will-destroy-your-codebase-but-youre-probably-not-doing-it/): my framework for matching AI autonomy to engineering rigor
- [The AI cognitive debt we're not talking about](http:///the-ai-cognitive-debt-were-not-talking-about/): the broader pattern of offloading thinking and what it costs
