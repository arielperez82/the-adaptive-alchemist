---
title: 'The economics of being wrong'
description: "Growth, reliability and risk compete for the same capacity. Comparing them honestly means pricing what changes if you're right and what it costs to recover when you're wrong."
pubDate: 2026-11-06
heroImage: '/assets/being-wrong.png'
readingTime: '8 min read'
tags: ['Decision-making']
---

A product leader wants to ship a feature that could close a new enterprise customer. An engineering leader wants the same two engineers for a sprint to fix a reliability problem that hasn't caused an outage yet.

The feature shows up with a revenue estimate. The reliability work shows up with a risk assessment.

The feature goes first. Nobody proved it was worth more. It won because one proposal arrived dressed as growth and the other arrived dressed as cost.

I've sat through versions of this argument throughout my career. Product work gets credit for creating value. Engineering work has to defend the value it keeps the business from losing, in language that sounds like an insurance pitch. I made part of this case in [Technical debt is inevitable. Fragility is a choice.](/technical-debt-is-inevitable-fragility-is-a-choice/): fragility never shows up as a line item until it shows up as an incident. That piece was about debt. The broader problem is comparing any two kinds of work that compete for the same people.

> Preventing the loss of a million dollars is not inherently worth less than earning another million. Plenty of organizations plan as though it is.

## Both proposals move the same number

A prevented loss and a new gain change the same thing: what the business is worth a year from now. Treat them as separate economies and the proposal with the better storyteller wins.

The comparison that matters is incremental: what plausibly changes if we pick this option instead of that one, including what we give up. Foregone value never hits a ledger. The customer who signed with a competitor while you hardened infrastructure cost you money, and nobody will ever book it.

None of this makes preventive work automatically right. Risk reduction has to justify its cost the same way a feature does, and plenty of reliability work is engineers buying peace of mind with the company's money. All I'm asking for is a shared scale.

## Numbers make the assumptions argue with each other

Give the two proposals rough numbers. Say the feature has a 40% chance of landing a contract that contributes about $1.2M after delivery costs, which is $480K in expected contribution. The reliability fix targets a component the team thinks has a 25% chance of causing a multi-day outage this year, at roughly $2M in credits and churn. The fix brings that probability down to about 5%, so it cuts expected losses by $400K. Credit the fix with the risk it removes, since no fix removes all of it.

Suddenly the two look close, and the conversation improves because the inputs are on the table. The 40% came from a sales forecast with a track record. The 25% came from an engineer's gut after reading the incident log. Those deserve different weights, and saying so out loud is progress.

Somebody might also notice that the feature routes new load through the same fragile component. Shipping it raises the outage probability. The bets are correlated, and scoring each one separately hides that.

> Putting numbers on a decision leaves the uncertainty right where it was. What changes is that everyone can see the assumptions.

Years of building experimentation systems taught me that a number earns its keep by what it forces people to defend. A precise estimate built on a guess is worse than a wide range everyone knows is a guess. It's the same trap I described in [The futile chase for predictability in software development](/the-futile-chase-for-predictability-in-software-development/), wearing a finance badge this time.

## Averages don't tell you whether you survive

Expected value is a probability-weighted average. It says nothing about the spread of outcomes behind it or whether you can absorb the bad ones.

Picture two exposures. One is a 10% chance each quarter of a $100K loss, which works out to $40K in expected losses a year: annoying, budgetable, survivable. The other is a 1% chance of losing $4M over the year. Same expected loss. If you have $3M in the bank, those are different animals. One is a cost of doing business. The other is a way to stop doing business.

Nassim Taleb hammers this point in [Skin in the Game](https://amzn.to/B03KK2goC). Once ruin is on the table, the average stops describing your experience, because you don't stick around for the good draws that follow the bad one. Some outcomes sit behind constraints you shouldn't trade against upside at all: a regulatory breach that costs you your license, or a cash position that misses payroll.

A skeptic would say a constraint is just a very large cost and belongs in the same calculation. Sometimes it does. A fine with a known ceiling is a cost. You can put a probability and a price on ruin too, but whether to let it trade against upside is a policy choice. I'd rather a company decide upfront that it won't accept plausible ruin scenarios, whatever the estimated average says. Priced as a big number, ruin invites someone to outvote it with a bigger one.

## The messy middle between doors

I've used Jeff Bezos's one-way and two-way doors for years, and I've [pointed teams to them](/leadership-without-control-part-2/) as a way to set decision boundaries. The distinction holds up. Most decisions are reversible, and organizations that treat them as permanent slow themselves to a crawl.

There's always been a messy middle I struggled to explain. A decision can be reversible and still leave you paying for it long after you've changed your mind. You can undo a reorg, but rebuilding the trust it burned takes months. You can roll back a platform migration and still spend weeks getting operations stable. Bezos hedged with "nearly irreversible" in his 2015 shareholder letter, so he felt the middle too. The binary just never gave it a name.

I recently came across James Clear's [hats, haircuts, and tattoos](https://jamesclear.com/3-2-1/february-1-2024) from his February 2024 newsletter, and it gave me exactly the language I was missing. Hats are cheap to try and cheap to take off, so try a lot of them. A bad haircut can be fixed, but not quickly, and you might look foolish while it grows out. Tattoos stay with you. Clear credits a Tim Ferriss sweater analogy as his inspiration.

The haircut adds time and cost to the picture. Reversibility tells you whether you can undo the action. It says nothing about what you lose getting back to an acceptable position, how long the consequences keep running or what never comes back. Roll back a release and the customer data it exposed is still out there. Exit a market and the investment is still gone.

> Reversible doesn't mean cheap to reverse, and expensive to reverse doesn't mean irreversible.

The categories have no precise boundaries, and haircuts don't grow out on a schedule. They're metaphors, and they earn their place by making people ask how long recovery takes and what it costs, which a door never prompts. Clear's advice on haircuts is worth keeping too: don't be scared of them. A recoverable mistake is usually a risk worth taking, as long as you priced the recovery honestly.

## Waiting has a price tag too

In [Your next hour of thinking has to earn itself](/your-next-hour-of-thinking-has-to-earn-itself/), I argued that investigation has to compete against every other way of learning. Recovery cost decides how much that competition should favor caution. A tattoo justifies buying more information before you commit. A hat almost never does, even when you're deeply uncertain, because finding out by wearing it costs less than finding out by thinking about it.

Uncertainty alone tells you very little about whether to wait. The useful comparison is how much the next piece of information could change the decision, against what it costs to get and what you'd lose by being wrong without it.

Waiting is a decision too. It keeps some options open and quietly lets others expire. The prospect evaluating your feature won't wait forever, and neither will the outage.

## A rough way to compare

When proposals compete, I work through the same handful of things: what each option creates, preserves or gives up, which assumptions carry the weight, what we could learn before committing and at what price, how fast and how completely we recover if we're wrong, and what disappears while we wait. Then I check which outcomes are off the table no matter how good the average looks.

Recovery and information value do most of the sorting, so I compress them into a matrix:

|                          | Low value from more information | High value from more information |
| ------------------------ | ------------------------------- | -------------------------------- |
| Cheap, fast recovery     | Decide and move                 | Experiment early                 |
| Expensive, slow recovery | Limit exposure or decline       | Investigate, then commit         |

The bottom left is where teams burn the most time. More research won't change the answer, so the work is shrinking the downside before you commit. Sometimes it can't be shrunk at a price worth paying, and the right call is to walk away.

It's a heuristic, and a lossy one. Recovery cost runs on a continuum, and the matrix flattens it into two rows so people can use it in a meeting. Cost of delay pushes every quadrant toward acting sooner. Hard constraints override all of it. I don't turn this into a score, because the moment it becomes a score people start gaming the inputs.

## Sometimes the answer is a better option

Go back to the feature and the reliability fix. Framed as a contest, one wins and the other waits. The more useful move is usually to change what's being decided.

Ship the feature to the prospect's pilot group behind a flag. Route its load around the fragile component, or give that component a fallback. Run a cheap demand test before building the full integration. Stage the reliability work so the riskiest part lands first. Each one changes the economics of the original choice, and some move it to a different quadrant.

Hats, haircuts and tattoos aren't always fixed properties of the outcome you want. Sometimes the implementation turns a haircut into something much closer to a hat.

That has limits. Some consequences stay permanent no matter how carefully you stage them. Every safeguard costs something to build and maintain, and it's easy to spend more on flexibility than the mistake would have cost.

> Choosing the best available option is not the same as creating a better set of options.

## The environment sets the price

The goal of all this is modest: make the consequences visible enough that judgment has something concrete to argue with. Expected value helps. It just doesn't get the last word.

Once the consequences are visible, the cost of being wrong stops looking fixed. Much of it depends on the environment the decision lands in: how far a mistake spreads, and how quickly you can notice it and undo it. That environment is something you can design, and it's where I'm going next.

---

## Further reading

[**Skin in the Game**](https://link.amazon/B03KK2goC) by Nassim Nicholas Taleb: Why the possibility of ruin breaks expected-value reasoning, and why survival comes before the average

[**How to Measure Anything: Finding the Value of 'Intangibles' in Business**](https://link.amazon/B0fOIZsj3) by Douglas Hubbard: Practical methods for putting numbers on intangibles and estimating what more information is worth before you pay for it

[**How to Decide**](ihttps://link.amazon/B0dH5U1oa) by Annie Duke: Tools for separating decision quality from outcome luck, and for deciding faster when the stakes are low

[On hats, haircuts, and tattoos](https://jamesclear.com/3-2-1/february-1-2024) by James Clear: The short newsletter piece behind the middle category, worth reading in full
