---
title: "Designing systems that don't need you to be right"
description: 'Bounded exposure, fast feedback and recovery change the economics of decisions. The environment a mistake lands in decides what it costs.'
pubDate: 2026-11-11
heroImage: '/assets/systems-not-right.png'
readingTime: '8 min read'
tags: ['Decision-making']
---

On August 1, 2012, Knight Capital lost more than $460 million in about 45 minutes. Within days, it needed $400 million in emergency financing to stay alive.

The trigger was small. A technician deploying new trading code missed one of eight servers. The new code reused a flag that had once activated a function called Power Peg, retired in 2003. On the eighth server, the old code was still there. When the market opened, the flag woke it up, and it started firing orders with nothing left in it that knew when to stop.

Reading the [SEC's order](https://www.sec.gov/litigation/admin/2013/34-70694.pdf), I keep noticing how many other things had to be true for one missed server to threaten a company's survival. The system sent 97 emails about the problem before the opening bell, and nobody treated them as alarms. There was no procedure to halt the router when it misbehaved. When the team pulled the new code off the seven healthy servers, the problem got worse, because now all eight were running Power Peg.

A person made a mistake. The system decided what that mistake would cost.

In [The economics of being wrong](/the-economics-of-being-wrong/), I argued that the cost of a bad decision depends on how long recovery takes and what never comes back, beyond whether the action can be undone. Much of that cost comes from the environment a decision lands in. This piece is about that environment, and about the idea running through this whole series: design systems in which fewer decisions need to be correct in advance.

## The same change, three ways

Take one change: a new pricing calculation in a checkout service. The team has tested it and believes it's right. They can't be certain, because production has customers, data and edge cases no staging environment reproduces.

Ship it to everyone at once and every customer is exposed from the first second. If the calculation is wrong, you hear about it from support tickets, chargebacks or the finance team at month end.

Roll it out progressively and the new version reaches 1% of traffic first. Guardrail metrics compare conversion, errors and refund requests against everyone else. If something drifts, exposure stops growing and the flag goes off.

Run it in shadow mode and the new calculation runs against real traffic while customers keep seeing the old price. You compare outputs without anyone paying the new one.

The change is the same in all three, and so is the uncertainty the team starts with. What differs is how much the organization bets before it learns anything, and how much it can learn before betting more.

Shadow mode can offer the lowest exposure of the three, and it's also the most limited. It tells you whether the new code produces different numbers. It can't tell you how customers respond to them. A shadow path that writes to a database or calls a payment provider has quietly stopped being a shadow. Each implementation buys a different mix of safety and learning, and each one costs something.

> Reversibility is partly an architectural property. It belongs to the implementation as much as to the decision.

## The race between damage and detection

Four mechanisms do most of the work of changing what a mistake costs. None of them is new, and I'm not trying to turn them into a framework.

Isolation limits how far a mistake can travel. Loose coupling, separate failure domains, bulkheads between tenants, a pilot in one region before the whole company. It's one reason I've [argued for well-structured modular monoliths](/why-technical-due-diligence-focused-on-adaptability-beats-traditional-architecture-audits/) over premature microservice sprawl: the quality of the seams matters more than the number of deployables.

Bounded exposure limits how much is at stake while you're still uncertain. Canaries, percentage rollouts, cohort restrictions, spending caps, funding released in tranches as milestones land. Isolation controls where damage can reach. Bounded exposure controls how much of it you allow at once.

Fast feedback tells you an assumption was wrong before the consequences pile up. That means observability, guardrail metrics and success criteria written down before launch, so nobody gets to redefine success after the data arrives.

Recovery shrinks the cost and time of getting back to an acceptable state: rollbacks, compensating transactions, migrations that keep the old path working until the new one proves itself, and contingency plans someone has rehearsed.

The clearest case I've worked on was moving a customer-facing analytics platform from batch processing to streaming while hundreds of customers kept pushing terabytes through it every day. Nobody could predict how the new pipeline would behave against every customer's data. The modular architecture let us move one component at a time instead of cutting over the whole platform.

Feature flags controlled which customers used which system, so exposure to the new pipeline was a setting we could change instead of a date on a calendar. Monitoring caught issues early. A flag can move a customer between paths. It can't repair data the wrong path already produced, which is a distinction I'll come back to.

None of that made us better at predicting. It made each wrong guess small, visible and cheaper to back out of.

The mechanisms only matter in relation to each other. The outcome is decided by a race between how fast consequences accumulate and how fast the system can detect and contain them.

Feedback that arrives after exposure has already expanded tells you what went wrong without preventing any of it. Knight's emails were feedback, and they arrived early. Nothing in the system turned them into a halt.

Progressive rollouts lose the race too when the harm is slow or rare. A 1% canary is unlikely to catch a bug that corrupts one record in a million during a short rollout, or one that only fires during month-end close. By the time the signal shows up, you're at 100%. A rollout has to stay small long enough for the slowest consequence you care about to surface, which means somebody has to know what that consequence is.

A reversible change with a three-month recovery is still a haircut. Nominal reversibility says very little about what you're risking. The ratio between how fast damage builds and how fast you can respond says much more. It doesn't settle the question on its own: severity still matters, and so does whatever harm remains after you've contained it.

## Rollback isn't recovery

Engineers love rollbacks because they feel like an undo button. They undo the code. They leave behind everything the code did while it was running.

A bad migration has already fed incorrect values into downstream reports, caches and other services. A customer who saw the wrong balance may have already moved money. A credential written to a log is still exposed after you patch the logger. As Knight showed, rolling back can make things worse when the previous state isn't as safe as you assumed.

That's why I care more about roll-forward capability and data recovery than about deployment rollback. [Expand-and-contract migrations](https://martinfowler.com/bliki/ParallelChange.html) keep the old path alive until the new one has earned trust. Compensating transactions assume mistakes will reach the ledger and design the correction ahead of time. A point-in-time backup only counts as a recovery plan if someone has restored from it recently.

Organizations behave the same way. You can reverse a reorg on paper in a week. The senior people who left during it aren't coming back, and everyone who lived through it will read the next announcement with suspicion. That's the haircut from the last piece: technically reversible, slow and costly to grow out.

How recoverable a decision is depends on where its consequences land, and they rarely land in the deployment pipeline.

## Flexibility has a carrying cost

None of this is an argument for maximum optionality.

Every mechanism above costs something to build and more to keep working. Flags multiply code paths. Canaries slow down changes that were fine all along. An abstraction that keeps a vendor swappable stops you from using the features that made the vendor worth paying for. Recovery procedures rot unless someone exercises them.

Knight is the uncomfortable example here too. Power Peg was retired in 2003, and its code was still callable nine years later. The new release reused its activation flag without removing the old implementation everywhere, so one missed deployment brought it back to life. Obsolete code that nobody owned had become a risk nobody was pricing. Pete Hodgson's [guide to feature toggles](https://martinfowler.com/articles/feature-toggles.html) makes a related point more calmly: every toggle is inventory with a carrying cost, and so is any switch still wired to live code.

Commitment also creates value flexibility can't. A team that commits to one database builds deep expertise in it. A company that commits publicly to a direction gives customers and employees something to plan around. A reorg rolled out in cautious stages can leave people in limbo for months, and sometimes the staged version does more damage than making the change cleanly and once.

So the test for any safeguard is the same economics from the last piece, applied to the infrastructure instead of the decision. Compare what the safeguard costs with the expected losses it prevents. Then check two things the average can't see: whether it protects against an outcome the company couldn't survive, and whether a regulator or a contract already requires it. Some safeguards pay for themselves on expected losses alone. Some earn their place only because the downside is ruin. Others protect against failures that would have cost less than the safeguard did.

A fair objection is that safeguards are predictions too. You put the bulkhead where you expect the flood, and knowing where to put it can be as hard as any other forecast. The advantage is reuse. Investigating a change protects that one change. A good boundary protects every future change that crosses it, including mistakes nobody imagined when it was built. A firm-wide capital limit wired into Knight's router wouldn't have needed anyone to predict Power Peg. Knight didn't have one.

There's a second objection I take seriously: safety nets can make people careless. A team that knows the canary will catch it starts skimming reviews. The mechanisms are there to let judgment act sooner and on smaller bets. When they become a reason to stop thinking, the organization has traded one dependence on being right for another.

## Spend less on prediction

Most organizations try to lower the cost of being wrong by trying harder to be right: more review, more sign-off, longer planning. Past a certain point, the same effort buys more when it goes into shrinking the blast radius, shortening the feedback loop and rehearsing the recovery.

When I can't make a decision reliably correct, I look at whether I can make its consequences more recoverable. Often I can. Sometimes I can't, at least not at a price worth paying, and that's the signal the decision deserves the investigation and deliberate commitment a tattoo calls for.

The rest of the series takes this into systems that act on their own. An agent can decide and act faster than anyone can review it, and its actions reach past the software into sent emails and moved money. At that speed, the environment stops being a backstop for human judgment and becomes the main control, which shifts the question from what the system can do to what it's allowed to do.

---

## Further reading

[**Release It!**](https://link.amazon/B031PgJj0) by Michael Nygard: The field guide to bulkheads, circuit breakers and the other patterns that keep one failure from becoming everyone's failure

[**Accelerate**](https://amzn.to/41clfEc) by Nicole Forsgren, Jez Humble and Gene Kim: The research showing that deployment frequency and time to restore service improve together, which is the economic case for small, recoverable changes

[**Building Evolutionary Architectures**](https://link.amazon/B02fKOmY1) by Neal Ford, Rebecca Parsons, Patrick Kua and Pramod Sadalage: How to design systems that can keep changing safely, including fitness functions that catch drift before it compounds

[**The Principles of Product Development Flow**](https://link.amazon/B06AhGqzb) by Donald Reinertsen: The economics of batch size, feedback speed and cost of delay, and why smaller bets usually win
