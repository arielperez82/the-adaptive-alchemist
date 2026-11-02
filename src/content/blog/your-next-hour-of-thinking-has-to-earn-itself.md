---
title: 'Your next hour of thinking has to earn itself'
description: "You don't need to know when you're done thinking. You need to know whether another hour is still worth buying."
pubDate: 2026-11-03
heroImage: '/assets/next-hour.png'
readingTime: '7 min read'
tags: ['Decision-making']
---

Every engineer who works on experimentation learns the same lesson early, usually the embarrassing way. Don't peek.

Check an A/B test every day, stop the moment it crosses significance, and your 5% false positive rate quietly stops being 5%. Evan Miller's classic walkthrough, [How not to run an A/B test](https://www.evanmiller.org/how-not-to-run-an-ab-test.html), shows a worst case where checking after every observation pushes it past 26%. The math assumes you decided when to look before the data arrived. Peeking lets the data decide when you stop, and the data will happily tell you what you want to hear.

The fix is boring. Decide upfront how big an effect is worth detecting, size the test for it, and pick your checkpoints before you start.

Investigations rarely get that discipline. You check what you've found every hour, then stop when the picture feels right or keep going because every look turns up something new. I argued in [The problem with needing everything to make sense](/the-problem-with-needing-everything-to-make-sense/) that the instinct to make a hard problem fit together never tells you when to stop.

The statistics don't carry over, but one principle does: decide when you'll evaluate the evidence before you know what it says. Otherwise what you find gets to decide when you look again.

## Justify the next hour, not the answer

The standard stopping rule asks what you'd do differently if you knew the answer. That demands that investigation justify its answer before it has one, which fails whenever the value comes from a dependency you didn't know existed. Unknown unknowns can't argue for themselves in advance.

So ask for something smaller. Nobody can predict what exploration will find, but anyone can say at a checkpoint whether the last two hours earned two more.

> Nobody can predict what exploration will find, but anyone can say at a checkpoint whether the last two hours earned two more.

That case has a competitor. Another hour of thinking is always bidding against other ways of buying the same information. You can model whether customers will tolerate a price or run the pricing test. You can debate whether a team structure will work or let one team try it for a month. You can reason about whether an architecture survives its workload or benchmark it.

Early on, thinking wins easily. It's cheap and every hour teaches you something. Its returns fall as you go, while the questions you can put to reality get sharper the more you know. Staying in your head also has a price that never shows up on the bill: feedback isn't arriving, and a decision you could reverse next week sits waiting as if it were permanent. Don Reinertsen argues in [The Principles of Product Development Flow](https://link.amazon/B06AhGqzb) that if you quantify only one thing, it should be the cost of delay. At some point the lines cross, and another hour of research teaches less than an hour of putting something in front of reality. That crossing is the last responsible moment for thinking.

> At some point the lines cross, and another hour of research teaches less than an hour of putting something in front of reality.

The hard part is noticing the crossing from inside an investigation, where another hour of thinking always looks like progress.

## Mode changes halfway through

Directed investigation has a known uncertainty attached to a decision, like comparing vendors or reading a clause before you sign. You can name what would change your mind. Exploratory investigation starts from a suspicion that your model is incomplete without knowing what's missing, and its value comes from the thing you couldn't have listed.

Confusing them fails in opposite directions. Treat a directed question as open exploration and you get analysis paralysis. Treat exploration like a directed lookup and you get premature closure, a confident answer to the wrong question. "This is exploratory" is also the easiest excuse in the world for never stopping.

The trap is classifying the work once at the start. I recently went after why enrichment kept failing in an agentic sales pipeline I've been building for a client. That was a directed question with an obvious decision attached: fix the enrichment step. It turned exploratory once the failures pointed upstream to how the pipeline chose and promoted contacts in the first place. Held to the original decision, I'd have patched a symptom. Left to run as open exploration from that point on, I'd still be in there. Mode is a state, and it gets re-decided at every checkpoint.

## Fund the next tranche

I've argued for funding teams in stages: allocate capacity for a period, then reallocate at a scheduled [investment review](/from-one-team-to-many-part-4-beyond-the-single-collective/#funding-outcomes-not-outputs-through-the-investment-review) based on what you learned. Thinking deserves the same treatment. Don't authorize "understand this problem." Authorize two hours mapping the territory, then a decision about whether four more are warranted. The checkpoint gets fixed before you start. The decision you make there depends entirely on what you found.

That's also why this isn't timeboxing. A timebox tells you when to look, not what should count when you get there. Without that, your own sense of progress grades the work, and it always passes.

## What earns another tranche

The obvious checkpoint question is whether you learned something. Anyone good at investigation almost always has. A finding can be true without being worth what it cost to find, so the checkpoint needs tests your sense of progress can't grade.

> A finding can be true without being worth what it cost to find.

The first is surprise. Before you spend a tranche, write down what you expect it to show, then compare. If the surprises touch the decision, the options or the size of the downside, there's still something material to learn. If the last two tranches came back as predicted, you're confirming what you already believed, which is only worth paying for when being wrong is very expensive.

The second is saturation, borrowed from qualitative research. Grounded theory stops sampling when new interviews stop producing new categories and only add examples of the ones already in hand. When new sources only add detail to concepts you already hold, the exploration has run out of road, even if every hour still feels productive.

The third is the alternative: whether another tranche will teach you more than testing, prototyping or acting would. Investigators skip this one, because from inside an investigation, more investigation is the only option in view. A surprise tells you there's more to learn. Only the alternative tells you whether thinking is the way to learn it.

Take the cost-of-ownership model I built when my family was choosing a car, which went through eight revisions. The later ones found real differences in financing and resale value, none of which changed which cars we'd test drive. Each one refined categories the model already had. The alternative was there the whole time: my wife's three criteria and an afternoon of test drives told us more than revisions four through eight combined.

Each renewal faces a higher burden of proof than the last, because the obvious discoveries in the territory you've mapped have been made. That doesn't mean smaller tranches. Two hours that expose a dependency with a seven-figure downside justify a far bigger one, and a discovery that opens new territory is a mode change that resets the economics.

## Unless the door only opens one way

Reality is a cheap teacher only for decisions you can walk back. You can't test a compliance interpretation by shipping and waiting to see whether the auditor objects, or a tax structure by filing and waiting for the letter. For one-way doors, the feedback from reality is the penalty.

Bent Flyvbjerg's rule for megaprojects in [How Big Things Get Done](https://amzn.to/PLACEHOLDER) is think slow, act fast: iterate while mistakes are still cheap. Look closely at one of his central examples, though. Pixar spends about two years on story development before production starts, and that planning is full of experiments: storyboards, rough reels, screenings, rewrites. When you can't afford to learn from the real thing, good investigation still looks like experimentation in a cheaper medium.

That widens the comparison. Every option on the table is an environment where an assumption can collide with evidence, and the job is finding the cheapest one that can still answer the question: a prototype, a tabletop exercise, a pilot with one team, an expert who's watched the failure happen, an advance ruling instead of another round of interpreting the code yourself. Thinking at a desk is the cheapest environment of all at the start, and the first to stop paying.

> Every option on the table is an environment where an assumption can collide with evidence, and the job is finding the cheapest one that can still answer the question.

A one-way door doesn't exempt you from the budget. It changes the economics. Getting the decision wrong costs more, so bigger tranches are worth buying, and finding a cheaper stand-in for reality matters more.

## A protocol you can run tomorrow

Before you start, write down five things:

- The trigger that made this worth investigating
- The mode it's in, for now
- What you expect this tranche to reveal
- How much you're spending before you look again
- The best alternative way to learn, and what it would cost
  At the checkpoint, look for surprise and saturation, and compare what you learned against what the alternative would have bought. Then fund another tranche, run the test, decide, defer or stop. Continuing becomes a call you make and defend like the other four, instead of the state you're in by default. For anything consequential, defend it to someone who isn't invested in the investigation. Barry Staw's research on escalation of commitment found people pour the most into a failing course of action when they made the original call themselves.

## The cheaper way to learn

None of this asks you to be less curious. It asks you to stop giving investigation a privilege nobody would give implementation: unlimited funding for as long as it keeps producing something.

On a hard enough problem, you're never done understanding it. You don't need to know when investigation is finished. You need to recognize when reality has become the cheaper way to learn.

---

## Further reading

[The Principles of Product Development Flow](https://link.amazon/B06AhGqzb) by Donald Reinertsen: Cost of delay, queues and the economics of information in product work

[How Big Things Get Done](https://link.amazon/B01r5miZA) by Bent Flyvbjerg and Dan Gardner: Why irreversible projects earn slow, iterative planning, and why that planning should look like experimentation

[Decisive](https://link.amazon/B0f4IMXcx) by Chip and Dan Heath: "Ooching," the habit of running small tests in reality before committing to a big decision

[How not to run an A/B test](https://www.evanmiller.org/how-not-to-run-an-ab-test.html) by Evan Miller: The short, classic explanation of why stopping rules have to be set before you look
