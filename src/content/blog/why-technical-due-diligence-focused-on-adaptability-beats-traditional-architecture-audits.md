---
title: 'Technical due diligence focused on adaptability beats traditional architecture audits'
description: "Traditional tech due diligence audits architecture but misses adaptability. Smart VCs evaluate a startup's capacity to evolve, not just code quality."
pubDate: 2025-09-18
heroImage: '/assets/due-diligence.png'
readingTime: '8 min read'
tags: []
---

When investors look under the hood of a company, the instinct is to audit what exists today: the architecture diagrams, the code quality, the backlog of tech debt, the security posture. All of that matters, but it misses the point. In an investment horizon measured in years, the real question isn't "Is the system sound today?" but "Can this company evolve tomorrow?" You're not just buying software. You're buying adaptability.

Traditional diligence is a snapshot. The better approach is to evaluate a company's ability to keep adapting, technically, organizationally, and operationally.

## What gets overlooked

The typical diligence checklist covers the technical surface but ignores how the organization actually works. It tells you little about whether engineers understand the product and the customer, or whether product, design, engineering, data, and go-to-market operate on one roadmap or several. A company may have a clean architecture but a fractured system of priorities. That fracture is often a bigger risk than messy code.

Most diligence processes actually reward the wrong signals. Perfect architecture diagrams look impressive in presentations but tell you nothing about how quickly teams can change direction when those diagrams become obsolete. Pristine code quality metrics might indicate a system so rigid that simple feature requests require weeks of refactoring. Comprehensive documentation could mask processes so heavyweight that innovation crawls to a halt.

The result is that traditional diligence optimizes for perfect initial states while completely missing the organizational dynamics that separate high-performing companies from their struggling competitors.

## Adaptability as the missing dimension

Adaptability comes from two intertwined sources: the flexibility of the architecture and the fluidity of the organization around it. An adaptable company can redirect its energy without creating gridlock or rewrites. That ability depends not only on decoupled systems, but on whether functions learn together, plan together, and invest in technology as an integrated part of product strategy rather than as a parallel track.

The most adaptive companies I've worked with share characteristics that traditional diligence never evaluates. They have systems that can flex without massive coordination overhead. Their teams share context and priorities across disciplines. Their people understand customers well enough to make good decisions without constant oversight.

## Architecture that bends without breaking

A core signal of adaptability is whether the company has built for cohesion and decoupling. Early in the journey, the healthiest pattern is often a well-structured modular monolith (a "modulith") rather than a premature sprawl of microservices. A modulith concentrates energy, reduces coordination overhead, and still creates clean seams where functionality can be split into independent services later if growth demands it. What matters isn't the buzzword but the ability to carve along natural boundaries when the time comes.

In practice, you look for high cohesion within modules, low coupling between them, clear ownership of persistence boundaries, and mechanisms for asynchronous communication. Companies that leap to microservices too early often discover that they've traded one kind of rigidity for another. The mature signal is restraint paired with clarity: a system that doesn't sprawl now, but can split easily later.

The red flags are obvious once you know what to look for. Companies with dozens of microservices and teams of 20 people have optimized for architectural purity over delivery speed. They'll spend more time managing service communication than building features customers want. System boundaries should align with team coordination capabilities, not theoretical architectural ideals.

## Practices that make systems truly adaptable

Architecture is only half the story. Adaptability depends on the engineering practices that shape it every day. The diligence question isn't "Do they have tests?" but "Do their tests give them confidence to change?" Healthy signals include test suites that focus on behaviors rather than just functions, contract tests between components, and property-based approaches that surface hidden edge cases. Speed matters too—slow or flaky tests kill learning cycles. Teams that practice test-driven development, trunk-based development, and continuous integration are showing they can adapt at the pace of the market.

Look as well at how code ownership is structured. Can anyone safely work across the system, or is knowledge siloed? Practices like pairing and mobbing accelerate shared understanding, while developer experience signals (time to first PR, ease of spinning up an environment, speed of deployment) tell you whether engineers spend time solving problems or wrestling with friction.

Operational resilience isn't about preventing all failures but rather, about recovering from them quickly. The best companies can run experiments safely with feature flags, monitor systems comprehensively to catch problems early, and have rollback processes that restore service in minutes rather than hours. Look for deployment frequency versus incident rates. Companies that excel at adaptability deploy multiple times per day while maintaining low incident rates. This combination indicates both technical excellence and organizational maturity.

## Alignment across functions

Adaptability also lives in how priorities are set and pursued. A company where technical investments sit on a separate "engineering roadmap" is less likely to adapt quickly than one where technical and product decisions are fused into the same conversation. The healthiest organizations don't treat scaling infrastructure or improving developer experience as detours from customer value. They treat them as essential parts of it.

This is where cross-functional work matters. Engineers who participate in product discovery, designers who understand technical constraints, data scientists embedded in customer conversations, marketers aligned with delivery. All of this creates one adaptive system rather than multiple parallel ones. The diligence question is simple: do these groups learn together, or do they negotiate handoffs?

Joint planning sessions where product and engineering make tradeoffs together reveal healthy dynamics. Shared context syncs where everyone understands current priorities and constraints demonstrate alignment. Engineers who can articulate customer problems rather than just technical solutions show organizational depth. The absence of these rituals indicates organizational dysfunction that no amount of technical excellence can overcome. As I've written about in my work on [shared consciousness](/shared-consciousness-and-breaking-the-decision-bottleneck/#what-is-shared-consciousness), creating transparency without information overload is what separates adaptive organizations from coordination nightmares.

## Learning velocity

Perhaps the most revealing signal is how quickly the company learns. How long does it take to move from an idea to something that changes customer behavior? When they make a wrong bet, how quickly can they reverse it? The healthier the feedback loops, the more adaptive the system. Ask when engineers last talked to a customer, or how the last major pivot was handled. The answers tell you whether the organization learns through direct contact with reality or through layers of interpretation.

Learning velocity cuts across all other dimensions. You need flexible architecture to iterate quickly, operational resilience to run experiments safely, and cross-functional alignment to act on what you learn. The best companies optimize for cycle time, not feature delivery. They measure lead time from idea to customer impact and show patterns of rapid iteration and quick reversals when they make wrong bets.

## Case examples: adaptability in action

At Split, we made a decision that demonstrated the power of adaptable architecture. We re-platformed our entire big-data analytics infrastructure from batch-processing to real-time streaming while continuing to serve hundreds of customers processing terabytes of data daily. The modulith architecture let us migrate components incrementally. Feature flags controlled which customers used which systems. Comprehensive monitoring caught issues early.

The result saved over $1.2 million annually while accelerating innovation speed. But the real value was proving that our architecture could evolve without breaking existing customer promises. That adaptability enabled us to seize new market opportunities that rigid competitors couldn't pursue.

At Tinybird, we faced a different challenge. Engineering teams were shipping innovative features rapidly, but operational incidents were increasing. Instead of slowing down feature delivery, we created an [Operations Squad](/from-one-team-to-many-part-3-the-stability-engine#introducing-the-operations-squad-model) with rotating membership that maintained dedicated focus on production stability. This eliminated P0 incidents entirely while actually accelerating feature delivery. The Operations Squad became a knowledge-sharing mechanism that improved practices across all teams.

At Chase UK, we used feature flags to enable dozens of concurrent releases while aligning product and engineering roadmaps. Instead of treating feature releases as binary events, we made them gradual processes that could be adjusted based on real customer behavior. This let us move faster while taking less risk.

## Why this matters for investors

Companies that lack adaptability eventually overpay the debt: costly rewrites, missed opportunities, slower growth. Companies with adaptive systems compound value. They learn faster than the market changes. They integrate technical and product investments into a single flywheel. They can pivot with less drama and capture upside more quickly.

From an investment perspective, adaptability determines whether you're buying a growth engine or inheriting a rewrite project. The financial implications are substantial. Overpaying for systems that require expensive rewrites destroys returns. Missing growth opportunities because your technology can't evolve fast enough is even worse.

More importantly, adaptability across product, engineering, and go-to-market ensures that technical investments actually drive revenue outcomes. The most technically excellent companies fail when they can't translate technical capabilities into business results.

## Building adaptability into diligence

It's time to expand diligence frameworks. Alongside security and scalability, we should evaluate cohesion, cross-functional learning, roadmap integration, engineering practices, and learning velocity. The goal is not just to certify what exists but to forecast how the system will respond when the future arrives.

To make this practical, you need a repeatable adaptability scorecard alongside traditional architecture assessments. Evaluate architectural flexibility by looking for modulith patterns and clear boundaries that can evolve. Assess operational resilience through deployment frequency and incident recovery times. Check cross-functional alignment by examining whether teams operate from shared roadmaps. Measure learning velocity through lead times and evidence of rapid iteration.

### The adaptability scorecard: making evaluation systematic

To make this practical for investment teams, you need a repeatable adaptability scorecard alongside traditional architecture and security assessments. Here are the five dimensions with their weights and key indicators:

#### Architecture flexibility (25%)

- **Strong signals**: Modulith architecture with clear component boundaries, documented architecture decisions with tradeoffs (ADRs), system boundaries that align with team coordination capabilities
- **Red flags**: Premature microservice sprawl (more than 5 services for teams under 50 people), architecture chosen for sophistication over coordination capabilities, rigid boundaries requiring massive coordination to change

#### Operational resilience (20%)

- **Strong signals**: Deploy multiple times per week with low incident rates, comprehensive monitoring enables rapid problem detection, feature flags enable safe experimentation, incident postmortems focus on learning
- **Red flags**: Manual deployment processes or heavyweight change approval, high incident rates or slow recovery times, fear of deploying leads to large risky releases

#### Cross-functional alignment (25%)

- **Strong signals**: Single integrated roadmap combining technical and product investments, joint planning sessions where product and engineering make tradeoffs together, engineers participate in customer research and product discovery
- **Red flags**: Separate "engineering roadmap" vs "product roadmap," teams optimize for local success rather than shared outcomes, engineers see themselves as "ticket takers" rather than problem solvers

#### Learning velocity (25%)

- **Strong signals**: Short lead time from idea to customer impact (measured in days/weeks, not months), evidence of rapid iteration and course correction, teams can point to features killed or significantly changed after launch, regular customer contact for engineers and designers
- **Red flags**: Long lead times (months from idea to customer feedback), roadmaps treated as commitments rather than hypotheses, teams can't point to recent pivots or significant strategy changes

#### Decision transparency (5%)

- **Strong signals**: Architecture Decision Records document major technical tradeoffs, regular retrospectives drive systematic improvement, decision-making process includes relevant stakeholders
- **Red flags**: Ad hoc decision making without documentation, blame culture that discourages honest retrospectives

Weight these dimensions based on your investment thesis and time horizon. Growth-stage companies might prioritize learning velocity over architectural purity. Mature companies might need stronger operational resilience as they scale. The key is making adaptability evaluation as systematic as traditional technical assessment.

## The real diligence question

The architecture may be neat or messy today, but the true diligence question is whether this company has built the capacity to evolve. Architecture quality matters, but adaptability is the multiplier that determines whether quality compounds or becomes a constraint.

The traditional question is whether this technology can handle current requirements. The right question is whether this company can keep evolving, learning, and aligning across disciplines faster than market conditions change around them. Because the one certainty in any investment is that the future won't look like the present.
