---
title: 'Technical debt is inevitable. Fragility is a choice.'
description: "Technical debt isn't bad code. It's the organizational residue of moving faster than you can adapt. Debt is inevitable. Fragility is a choice."
pubDate: 2025-10-08
heroImage: '/assets/chef.jpg'
readingTime: '8 min read'
tags: ['Software Development', 'Leadership']
---

A few years ago, I watched a company sprint itself into paralysis.

They'd grown fast. Every quarter brought new features, new customers, new revenue targets. The CEO loved talking about velocity. The board loved the growth metrics. Engineering? They were drowning.

What started as a nimble platform became a minefield. Simple changes took weeks. Deployments were white-knuckle events. The team that once shipped daily now spent their time navigating around landmines they'd planted six months earlier.

The CFO called it "technical debt." The CTO called it "legacy systems." The CEO called it "growing pains."

They were all describing the same thing: the system had become too rigid to adapt.

In [_Modern Software Engineering_](https://amzn.to/472w1z6) Dave Farley uses a perfect analogy. He compares software engineering to cooking in a restaurant kitchen. A professional chef doesn't skip cleaning because they're busy. The cleaning _is_ the work. It's what allows them to cook fast, consistently, and safely. A dirty kitchen doesn't make you faster. It makes you dangerous.

**You'd never tolerate a chef who skipped cleaning to 'move faster.' Why do you tolerate it in engineering?**

Technical debt isn't about bad code. It's the organizational residue of moving faster than you can adapt.

## What technical debt actually is

Most people think technical debt means messy code or shortcuts. That's only half the picture.

[Sam McAfee](https://www.linkedin.com/posts/smcafee_how-to-explain-technical-debt-to-executives-activity-6919667452339507200-dNMg) nails the other half. Technical debt is "an emergent condition present in any digitally-enabled business enterprise that has now discovered its technology is too rigid to accommodate new business objectives that have come to light."

The debt isn't in the code. It's in the gap between what the system can do and what the business now needs it to do.

This gap exists because no technology can do everything. When engineers build a system, they make design choices based on the business objectives they know about _right now_. Every choice optimizes for one possible future and, by necessity, excludes others.

Good engineers try to keep options open. They build in flexibility because they know requirements will change. But eventually, you have to optimize for _something_. You have to place your bets.

"_We future-proof to the best of our ability_," as McAfee puts it, "_but we ain't got a crystal ball._"

Six months later, the business pivots. The market shifts. A competitor launches something unexpected. Suddenly, all those reasonable design decisions are constraints. The system is rigid not because engineers were incompetent, but because they were solving for Tuesday's problems and now it's Friday.

This kind of debt is _inevitable_. It's entropy. It's the cost of operating in an uncertain world where information is always incomplete.

## The trap of underengineering

But there's a way to make this worse: don't think about the future at all.

Barry O'Reilly and Michele Sollecito [point to something critical](https://www.linkedin.com/posts/michelesollecito_something-people-get-confused-about-is-overcomplicating-activity-7379596317850828800-BxXT/): underengineering is a bigger problem than overengineering. Most teams aren't building systems that are too flexible. They're building systems that are too rigid because they refused to think past next sprint.

The confusion comes from equating "thinking about the future" with "implementing everything you might need." They're not the same thing. One is design. The other is waste.

If you have 10,000 users today, you design and implement for 10,000 users. But if you can see a future with a million users, you design to leave the door open to that future. You don't build the million-user infrastructure now. You build the 10,000-user system in a way that doesn't lock you out of scaling later.

This is where most debt accumulates. Teams build for exactly right now, with no consideration for tomorrow. Then tomorrow arrives, and the system can't bend. The choices made six months ago become constraints you can't escape without massive rework.

Michele is totally right: underengineering stems from expedience disguised as pragmatism. It's easier to convince yourself that "you aren't gonna need it" than to do the hard work of thinking through what flexibility actually costs and what doors you're closing.

The worst part is that overengineering and underengineering often have the same root: no reasoning about the future. You either implement everything with no thought, or you implement only for today with no thought. Both leave you fragile.

If underengineering is failing to think ahead, shortcuts are failing to care enough to do things right.

## The other kind: shortcuts and cruft

Then there's the debt that comes from shortcuts. From skipping tests because "we don't have time." From copy-pasting code instead of refactoring. From shipping features with known defects because the quarterly target matters more than stability.

This debt doesn't emerge from uncertainty. It emerges from incentives.

When you reward teams for throughput instead of outcomes, you get throughput. When you measure success by features shipped instead of problems solved, teams optimize for features shipped. When you treat quality as optional and speed as mandatory, you get motion without progress.

The thing is that, not all technical debt is created equal.

Taking on debt to ship features faster is like refinancing your house to go on vacation. You're borrowing against future capacity for immediate gratification. The asset doesn't appreciate. You just feel good now and pay for it later.

Taking on debt to accelerate validated learning is like refinancing to invest in assets. You're deliberately trading short-term flexibility for long-term insight. You ship something imperfect because getting real feedback fast is worth more than building the perfect thing slowly. Then you use that feedback to make better decisions.

Same mechanism. Completely different outcomes.

Both types of debt, the inevitable and the self-inflicted, produce the same symptom: rigidity. The system becomes harder to change. The team slows down. Adaptability dies.

The difference is that one comes from the fundamental nature of building systems under uncertainty. The other comes from leadership decisions about what to reward and what to tolerate.

## The economics of fragility

[McKinsey research](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/breaking-technical-debts-vicious-cycle-to-modernize-your-business) estimates that technical debt represents 20-40% of the value of an organization's entire technology estate. Not 20-40% of the codebase. 20-40% of the _value_.

Think of it like financial debt. There's principal (the original shortcuts or misalignments), interest (the ongoing cost of working around them), and opportunity cost (everything you can't do because the system won't let you).

The principal is bad enough. [Stripe's research](https://stripe.com/files/reports/the-developer-coefficient.pdf) shows engineers spend roughly a third of their time dealing with technical debt instead of building new capabilities. That's a third of your R\&D budget servicing old decisions.

The interest is worse. Every change takes longer. Every deployment carries more risk. Every new engineer takes months to become productive because the system's complexity has exceeded what any one person can hold in their head.

The opportunity cost is what kills you. The features you can't build, the experiments you can't run, the pivots you can't make because the system won't bend that way.

Every dollar you invest in reducing rigidity buys you optionality: the ability to change direction without losing momentum. Paying down debt rarely shows up as a line item in revenue, but it often unlocks entire product lines, market expansions, or M\&A integrations that were previously impossible.

Technical debt isn't an engineering problem, it's an enterprise problem. It shows up as slower time-to-market, higher operational costs, increased turnover, and reduced ability to compete.

You know what they say in the military and in XP circles? Slow is smooth, and smooth is fast. Sustained speed comes from stability, not spurts. Quality makes teams look slower until you realize they're the only ones still shipping six months later.

## The illusion of speed

Teams that invest in quality look slower in the short term. They spend time refactoring. They write tests. They have design discussions that feel like bureaucracy to people who just want the feature shipped.

But you're measuring the wrong thing.

Speeding in the wrong direction while destroying your engine isn't winning. It's just expensive motion.

The goal isn't to go as fast as possible. The goal is to go as fast as you safely can in the most likely right direction, while keeping your engine cool enough to change course when you learn something new.

That's adaptability. That's what technical debt steals from you.

When your system becomes rigid, you lose the ability to learn. You can't run experiments because changes are too risky. You can't pivot because the system won't support it. You can't innovate because all your capacity goes to maintenance.

You traded speed for fragility. And fragility compounds.

## Managing debt as portfolio strategy

Most companies treat technical debt like a cleanup project. They allocate 20% of capacity to "tech debt work" or run periodic "bug bash" sprints. This is like trying to manage your investment portfolio by deciding that 20% of all decisions should be about bonds.

It's not a strategy. It's a quota.

You need two different approaches for two different problems.

**For existing debt**: inventory it, quantify the impact, and prioritize based on constraint × business value. Where is the system preventing you from adapting? Where is rigidity costing you opportunities? Where are changes most risky or time-consuming? That's where you invest.

**For future debt**: prevent it through professional hygiene. Back to Farley's chef analogy. You don't schedule time to clean the kitchen. Cleaning is _part of cooking_. Writing tests, refactoring, thinking through design before implementing, these aren't separate activities. They're how you build software professionally.

This is where O'Reilly's insight about thinking about the future and implementing for the future as different things really matters. Design is cheap. Implementation is expensive. You can think through how your system might need to evolve without building all that flexibility today.

Separate design from implementation. Think about uncertainty. Don't just code your way into certainty and hope for the best.

Managing technical debt isn't bookkeeping. It's capital allocation strategy for adaptability. You're making investment decisions about where to improve flexibility and where to accept constraints.

[Accenture's framework](https://www.accenture.com/us-en/insights/consulting/build-tech-balance-debt) treats this like portfolio management: continuous review, active prioritization, explicit trade-offs. Not arbitrary ratios.

Some debt is fine to carry if the interest is low and the principal isn't blocking anything critical. Some debt needs to be paid down immediately because it's preventing the business from moving. The difference is context, not percentages.

## Redesigning incentives for learning velocity

**Executives don't write the code, but they write the conditions under which it's written.**

When you reward teams for shipping features regardless of quality, you get features without quality. When you treat production incidents as engineering failures instead of system feedback, you get teams that hide problems instead of solving them. When you measure success by velocity instead of validated learning, you optimize for motion instead of progress.

The fix isn't better engineering practices, though those help. The fix is redefining what you're optimizing for.

Stop measuring speed. Start measuring learning velocity: how quickly can you test an idea, get real feedback, and adapt? How fast can you pivot when the market shifts? How rapidly can you incorporate what you learn?

[Research from CMU's Software Engineering Institute](https://insights.sei.cmu.edu/blog/5-recommendations-to-help-your-organization-manage-technical-debt/) shows that organizations that treat technical debt as a strategic concern, not just an engineering concern, perform better on every metric that matters: time-to-market, operational efficiency, employee retention, innovation capacity.

Make debt visible. Put it on executive dashboards next to financial metrics. Track the cost of rigidity the same way you track the cost of capital. Reward the teams that maintain quality and adaptability, not just the ones that ship fast.

Because clean code isn't about craftsmanship. It's about keeping your organization capable of learning and adapting quickly.

## The compounding cost of mistaking motion for progress

Technical debt isn't the price of going fast. It's the compounding cost of mistaking motion for progress.

Some debt is inevitable because we can't predict the future. Information is always incomplete. Markets shift. Competitors surprise us. Customer needs evolve. Every system accumulates some amount of misalignment between what it was built to do and what the business now needs it to do.

That's entropy. That's the cost of operating in uncertainty.

But fragility? Fragility is a choice. It's what happens when leadership incentivizes throughput over adaptability, when quality becomes optional, when short-term velocity matters more than long-term capability. When teams stop thinking about tomorrow because they're rewarded only for shipping today.

You can't avoid debt but, you can decide whether it compounds against you or for you.

Slow is smooth. Smooth is fast. And fast, done right, is sustainable.
