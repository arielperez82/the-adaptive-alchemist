---
title: 'The problem with needing everything to make sense'
description: 'The instinct that lets you see how a large system fits together is the same instinct that keeps you investigating long after it stops paying. The fix is to depend less on being right in advance, not to think less.'
pubDate: 2026-10-30
heroImage: '/assets/making-sense.png'
readingTime: '6 min read'
tags: ['Decision-Making']
---

A big chunk of my career rests on one idea: you don't have to be right in advance if you can find out cheaply.

I built a feature flagging platform from scratch so teams could expose a change gradually instead of betting a release on a prediction. I later led engineering for experimentation at a feature management and experimentation company, where the whole product was letting reality settle arguments that meetings couldn't. I've carried the same approach into organizational change. New team structures, rituals, decision rights and planning processes each get a purpose, a success signal and a date to decide whether to keep going, adjust or stop.

It took buying a family car to show me I don't apply any of it to my own thinking.

I built a total cost of ownership model covering 24 vehicles: renting offers, used listings, plug-in hybrids and EVs, dealer versus bank financing, resale value at different mileages. It went through eight revisions. Meanwhile my wife had three criteria: all-wheel drive, physical controls and a comfortable ride. Those three cut the list to a handful in an afternoon, and nothing in revisions four through eight changed which car we were going to test drive. Each revision found something true. None of them found something that mattered.

A [Psychology Today piece on assessing your most unusual strengths](https://www.psychologytoday.com/us/blog/in-practice/202610/5-questions-to-assess-your-most-unusual-strengths) gave me language for what was going on. The exercise keeps asking what you're willing to do that fewer and fewer people around you will. My answer, at the far end, was an unusually strong pull toward coherence: keeping a large, interconnected problem open until the important pieces agree with each other, across whatever disciplines it touches.

That pull has paid my bills for twenty years. It's also what kept the car model going long after it stopped mattering. I doubt I'm alone in this. The work of understanding large, interconnected systems rewards exactly this behavior, which is why it's worth taking apart.

## Coherence finds what compartments miss

Organizations reason about large problems in compartments. Legal handles legal. Tax handles tax. Engineering handles architecture. Finance owns the model. Each answer can be locally correct while the answers contradict each other, and the contradictions live in the seams where nobody has ownership.

Run a business across two countries and you see this immediately. A US accountant and a Spanish asesor can each give you a correct answer for their own jurisdiction and still hand you a structure that falls apart once both tax authorities look at it together. Neither is wrong. Nobody was asked to own the seam.

The same failure shows up in places that look purely technical. Teams in financial services routinely believe they can't do trunk-based development because PCI DSS requires code review by someone other than the author. [PCI DSS v4.0.1](https://docs-prv.pcisecuritystandards.org/PCI%20DSS/Standard/PCI-DSS-v4_0_1.pdf) requirement 6.2.3 says custom software has to be reviewed before release to find and fix coding vulnerabilities, and allows that review to be manual, automated or both. Requirement 6.2.3.1, the one about a reviewer other than the author, opens with "_If manual code reviews are performed._" Teams had fused the control objective with one habitual way of meeting it, and nobody could see the difference from inside their own compartment. I covered this in [The regulatory theater that's killing your competitive edge](/the-regulatory-theatre-thats-killing-your-competitive-edge/).

Finding those contradictions takes someone willing to hold the regulation, the practice and the incentives in view at once. That's what a strong pull toward coherence buys you, and organizations need more of it.

## The same instinct has no stop condition

At the same time, the mechanism that finds hidden dependencies doesn't know when its work is done.

A contradiction can exist and still be irrelevant to the next decision. An uncertainty can be genuine without being worth resolving this week. A future need can be perfectly imaginable without deserving any work today. The pull treats all of them as unfinished business.

That's how a decision that needed 80% confidence turns into a hunt for closure. An architecture gets designed for a scale the product won't reach for years. A reorg plan tries to resolve every edge case before a single team has worked in the new shape. A strategy document reconciles every scenario when only the next quarter's bet needed to hold together.

From the inside, both modes feel identical. Resolving a contradiction that matters and resolving one that doesn't produce the same satisfaction. Nothing signals that the work stopped paying three iterations ago. Someone good at investigation almost never reaches a point where they learn nothing. They keep finding real things, like every revision of that car model did, so asking whether they're still learning never tells them to stop.

## Coherence is not completeness

Coherence means the important parts don't contradict each other. Completeness means everything is specified. A strategy can be coherent without dictating every move, and an org design can be coherent without anticipating every conflict. The first is often necessary. The second is usually impossible, and chasing it feels exactly like chasing the first.

Context decides which one you owe. When I prepared a startup certification application for a Spanish government agency, the financial projections, hiring plan, founder compensation, funding needs, scenario cases and narrative all had to tell the same story, down to a single ambiguous equity percentage corrected across ten separate documents. That wasn't an attempt to make a forecast predictive. Those documents were going to lawyers and then to a government agency, and they described the same company.

That's coherence as a contract at a boundary. A private working model can stay messy and provisional. The artifacts that cross into a contract, a regulatory filing or a board deck can't. One source of over-investigation is applying the boundary standard to work that never crosses one.

## Understanding is the ungoverned stage

The tools leaders use for working under uncertainty are well established. Mary and Tom Poppendieck popularized the last responsible moment in [_Lean Software Development_](https://amzn.to/41PDQGt). Bezos made [one-way and two-way doors](https://fs.blog/reversible-irreversible-decisions/) a decision criterion for a generation of operators. Real options thinking, Lean and the whole experimentation discipline push the same way.

Decision theory has plenty to say about search, information value and when to stop looking. The operating frameworks product and engineering leaders use day to day mostly don't. They govern deciding and committing explicitly: when to make the call, how much to invest first, how hard it'll be to walk back. The investigation that comes before the decision is left to instinct, and that's exactly where a strong pull toward coherence does its work.

When you change a product or an organization well, the loop looks like this:

```text
uncertainty → hypothesis → small bet → measurement → adaptation
```

When you investigate a hard problem on instinct, it too often looks like this:

```text
uncertainty → investigation → investigation → investigation → ...
```

Experimental practice suggests part of an answer to that second loop. In [Running your first fluid team experiment](/running-you-first-fluid-team-experiment/), the first step I give leaders is to decide "how you'll know it's working or not, and when/how you'll evaluate results to determine if you proceed, adjust, or stop," and to "set these parameters upfront to avoid bias later." We rarely give investigations that step. They run until they feel done, and the feeling of done is the least reliable signal available.

## Depend less on being right

The default lever for hard problems is better judgment. Get more context, see more of the system, make better calls. A strong pull toward coherence fits that model perfectly, which is why it overreaches.

Experimentation points at a different lever. A well-run experiment doesn't make anyone smarter. It reduces how often judgment has to be right in advance.

So thinking less isn't the fix. The instinct that finds a PCI misreading or a gap between two tax authorities is worth keeping. The answer is to design the reasoning process so the instinct doesn't have to know when to stop by feel alone. That doesn't mean keeping every option open, since some commitments create value precisely because they're commitments. It means fewer things that need to be right before you move.

## The open question

The obvious stopping rule for investigation is to ask what you'd do differently if you learned the answer, and to stop when the answer is nothing.

That rule breaks exactly where the coherence instinct is most useful. The dependencies nobody saw are, by definition, the ones you couldn't have predicted would change the decision. Apply the rule too rigidly and you suppress the behavior that finds the PCI misreading in the first place.

Investigation needs its own version of that upfront step, one that still leaves room for exploration whose value can't be named in advance. That's the next article.

---

## Further reading

- [**Algorithms to Live By: The Computer Science of Human Decisions**](https://link.amazon/B03cqUL6n) by Brian Christian and Tom Griffiths: Optimal stopping and explore/exploit, explained through everyday decisions
- [**Quit: The Power of Knowing When to Walk Away**](https://link.amazon/B05M9mams) by Annie Duke: Why stopping is a skill, and why the signals to stop arrive long before we act on them
- [**How to Measure Anything: Finding the Value of 'Intangibles' in Business**](https://link.amazon/B0fOIZsj3) by Douglas Hubbard: Practical approaches to uncertainty, measurement and the value of additional information
- [**Trustworthy Online Controlled Experiments**](https://link.amazon/B04p8OHIU) by Ron Kohavi, Diane Tang and Ya Xu: The standard reference on running experiments that let reality make the call
- [**Lean Software Development: An Agile Toolkit**](https://amzn.to/41PDQGt) by Mary and Tom Poppendieck: The classic Lean software treatment of the last responsible moment
