---
title: 'From One Team to Many - Part 3: The Stability Engine'
description: 'How to innovate at breakneck speed without your production systems falling apart. The dual operating system that balances mission team velocity with operational excellence.'
pubDate: 2025-07-31
heroImage: '/assets/stability-and-innovation.jpg'
readingTime: '9 min read'
tags: ['Organizational Design', 'High-Performing Teams']
---

Your mission teams are shipping features at record pace. Release velocity is up 300%. Customer activation time dropped from months to days. Leadership is thrilled. Then your production systems start showing cracks.

At Split, I watched this exact scenario unfold. Our FAST collectives were delivering amazing results, but we had a problem: someone needed to keep the lights on. Our single on-call engineer was drowning, trying to support everything being shipped by multiple mission teams. Features would deploy successfully, mission teams would celebrate, then dissolve. But who was responsible when things broke at 2 AM three weeks later?

That's when I learned that fluid organizations need more than just adaptive mission teams. They need what I call the stability engine: systems and people dedicated to maintaining what's already been built while innovation continues at full speed.

The dual operating system isn't just about mission teams. It's about balancing innovation with operations in a way that makes both sustainable.

## The innovation-operations tension

Most organizations face this tension but don't realize it. Engineers get pulled between building new features and supporting existing ones. The cognitive load is brutal: context switching between creative work and debugging production issues, handling normal business hours plus nights and weekends on-call, trying to keep documentation and monitoring current while shipping new features.

At Split, our on-call engineer was essentially trying to be an expert on every feature shipped by every mission team. When something broke, they had to quickly understand code they'd never seen, debug systems they hadn't built, and fix problems they couldn't have anticipated. The burnout was real and measurable.

The deeper problem was mission completion ambiguity. When exactly was a mission "done"? When the code deployed? When customers started using it? When it had been running stable in production for a month? This ambiguity created dangerous gaps where nobody felt responsible for ongoing system health.

We tried handling operational work through missions, but it didn't work all that well. Forming mission teams around emergent production issues was too slow and disruptive. By the time we could assemble the right people, the incident had either resolved itself or caused real customer damage. Proactive maintenance work—keeping documentation current, tuning alerts, monitoring system health—got deprioritized because it never felt urgent enough to justify disrupting existing missions.

The traditional response is to make teams own what they build: "you build it, you run it." But this approach breaks down in fluid organizations where teams form and dissolve around customer problems rather than technical boundaries. When mission teams disband, who owns the code they created?

## Introducing the Operations Squad model

The Operations Squad model solves this by creating dedicated capacity for stability work while preserving the innovation speed of mission teams. Drawing inspiration from Pipedrive's Launchpad concept but adapted for our collective context, the Operations Squad focuses on minimizing cognitive load on the on-call rotation while proactively investing in production health.

The squad's core responsibilities span both reactive and proactive work: incident response and production support, system monitoring and performance optimization, documentation and runbook maintenance, pattern recognition for systemic improvements, etc... But their most important function is serving as the landing zone for mission team innovations—the bridge between "it works in development" and "it's stable in production."

This is where the Operations Squad differs from traditional ops teams. Rather than being separate from product development, they're deeply integrated with mission teams. They understand what's being built because they help build it. They know what to monitor because they help design the monitoring. They can debug issues quickly because they participated in creating the systems.

The pattern recognition aspect is crucial. Because Operations Squad members see everything that goes through production, they spot trends that individual mission teams might miss. They identify recurring problems that warrant systematic solutions, infrastructure constraints that need addressing, monitoring gaps that create blind spots. Some of our most valuable missions at Tinybird originated from Operations Squad insights about what needed improvement.

## How people flow between innovation and stability

The specific rotation model depends heavily on your context, but the principles remain consistent. At Split, we had the equivalent of 2-3 traditional teams' worth of people with one person on-call per week. That person became the de-facto operations lead for their week, and others were welcome to join the squad for as long as they liked—which often happened when there were no missions that truly appealed to them or urgently needed their particular skills or when there was ongoing work in the Operations Squad that drew their attention.

At Tinybird, our model optimizes for longer rotations into the Operations Squad rather than brief assignments. People typically stay for a couple of weeks, allowing them to tackle ongoing operational challenges that can’t be solved in a few days. We stagger rotations to ensure knowledge won't be lost when people cycle out, and maintain continuity on complex issues that span multiple rotations.

The Operations Lead role rotates every 3-6 months, giving that person enough time to develop a longer-term vision and strategy. The role isn't just about managing day-to-day operations—it's about understanding systemic patterns, identifying improvement opportunities, and building relationships with mission teams to ensure smooth collaboration.

The flexibility is key. Team members can join the Operations Squad when no missions align with their skills or interests, making it an attractive alternative rather than a punishment assignment. Some people discover they genuinely enjoy operations work and extend their rotations. Others use it as a learning opportunity to understand production systems before returning to mission work with better context.

Daily on-call responsibilities rotate within the Operations Squad, distributing the cognitive load across multiple people rather than burning out a single person. The longer squad rotations mean that when incidents occur, there are always people available who understand both the immediate technical details and the broader system context.

## The dual operating system in practice

What really makes this work is how mission teams and the Operations Squad collaborate throughout the development lifecycle. At Split, we developed what we called the "mission landing" process: a structured handoff that ensured new features could be safely supported in production.

When mission teams neared completion, they worked closely with Operations Squad members to prepare for production deployment. This included comprehensive knowledge transfer where mission team members explained not just what they built but why they built it that way, updating documentation and runbooks to reflect the new functionality, setting up monitoring and alerting for the new features, creating troubleshooting guides for common issues.

Mission team members would then "shepherd" their work into production, actively monitoring it during the initial deployment period and staying available for a period of time to handle any issues that arose. This shepherding period wasn't just about fixing bugs—it was about transferring deep contextual knowledge to the Operations Squad so they, and thus the collective, could maintain the feature long-term.

The Operations Squad became a pattern recognition engine for the entire collective. Because they saw all production systems, they could identify opportunities for systematic improvement that individual mission teams might miss. They'd spot recurring performance issues, common failure modes, or infrastructure constraints that warranted dedicated mission team attention.

Quality gates emerged naturally from this collaboration. The Operations Squad wouldn't accept mission outputs that couldn't be properly monitored or supported. This created a feedback loop that improved mission team practices over time—teams learned to build more observable, maintainable systems because they knew that not only would the Operations Squad be evaluating supportability but also, that they’d get their turn to rotate in to the Operations Squad and be responsible for maintaining other mission teams’ releases.

The knowledge flow worked in both directions. Mission teams brought fresh perspectives and new technical approaches to operational challenges. Operations Squad members brought production experience and systems thinking to mission work. Engineers who rotated between both contexts became valuable bridges, understanding both innovation and stability concerns.

## Making the transition without chaos

Below I describe two approaches to implementing this dual operating system, and your choice depends on your current situation and organizational needs.

The innovation-first approach starts with mission teams and adds operational support as needed. This works well when you already have stable systems and want to increase innovation speed. You begin with fluid mission teams, identify operational pain points as they emerge, then gradually build dedicated operational capacity to support the increased development velocity.

The stability-first approach inverts this sequence, and it's what we used at Tinybird. We started by establishing a strong Operations Squad before scaling mission team activity. This approach makes sense when your current systems are less stable or when you need to build cross-team collaboration muscles before attempting full fluidity.

At Tinybird, the results spoke for themselves. Within a quarter of establishing the Operations Squad, we completely eliminated P0 incidents and reduced P1 incidents to a trickle. Memory-related alerts that had plagued us for months got systematically resolved. The model enabled the team to tackle hard operational problems that required cross-team collaboration but couldn't get adequate attention with traditional siloed team structures.

The stability-first approach also helped us build the cultural and operational foundation for broader organizational fluidity. People learned to rotate into work for the greater good rather than defending territorial boundaries. They developed collaboration skills across traditional team lines. They saw firsthand how operational excellence enabled innovation rather than constraining it.

The key success factor was making Operations Squad work prestigious rather than punitive. We positioned it as essential strategic work, not a dumping ground for unwanted tasks. Operations Squad members were solving the hardest problems in the organization and building capabilities that enabled everyone else to move faster. Recognition and career advancement came from operational excellence just as much as feature development.

Cultural shift required intentional effort. We celebrated Operations Squad wins just as visibly as mission team successes. We shared stories about how operational improvements enabled faster feature development. We made sure engineers understood that production expertise was valuable and career-enhancing, not a dead-end assignment.

Implementation timing matters. Don't wait until your systems are on fire to build operational capacity. But also don't over-engineer operational processes before you understand what kind of support your mission teams actually need. Start with basic coverage and evolve based on real experience.  
I understand I am writing as Ariel Pérez and avoiding phrases and words that are AI-giveaways.

Here's the revised ending with bullet points:

## The stability engine enables sustainable fluidity

The Operations Squad isn't just about keeping systems running. It's about creating the foundation that makes rapid innovation sustainable over time. Mission teams can move fast because they know someone will be there to support what they build. They also know they'll get their turn to rotate in, so there's no chucking it over the wall to production support to handle it. You craft things with care. Engineers can focus on solving customer problems because they trust the operational foundation.

This dual operating system scales naturally with organizational growth. As you add more mission teams, you proportionally expand Operations Squad capacity. As systems become more complex, operational expertise deepens to match. The balance between innovation and stability becomes a conscious choice rather than an accident of whoever happens to be on-call.

The stability engine also enables the next phase of organizational scaling. When you're ready to move beyond a single large collective, you'll need operational excellence patterns that can be replicated across multiple groups. The Operations Squad model provides that replicable foundation.

## Core principles for your Operations Squad implementation

As you think about how to implement this model within your own context, the following principles will guide your design decisions and help you avoid common pitfalls. Every organization's context is different, but these fundamentals remain consistent across successful implementations:

- **Meaningful rotations**: People need weeks, not days, to tackle substantial operational challenges
- **Shared ownership**: Everyone rotates through operations, eliminating handoff mentality
- **Proactive focus**: Measure success by reducing reactive work, not firefighting excellence
- **Prestigious positioning**: Frame operations work as high-impact problem-solving that enables organizational velocity
- **Quality gates with collaboration**: Authority to reject unsupportable outputs, implemented cooperatively
- **Pattern recognition**: Operations Squad becomes your systemic insight engine across all teams
- **Flexible scaling**: Size the squad based on operational load, not arbitrary team structures

In Part 4, we'll explore what happens when you outgrow even large collectives: how to identify when it's time to split, how to maintain coordination across multiple groups, and how to preserve the benefits of fluidity as you scale to hundreds or thousands of people.

For now, assess your current balance between innovation and operations. Are your on-call engineers burning out from context switching? Do mission teams struggle to maintain what they build? Are operational improvements getting deprioritized because they're not urgent enough? If so, you might need your own stability engine.

Building systems that excel at both innovation and operations simultaneously is possible. You just need to design for it intentionally

---

## Essential reading for building operational excellence

**Foundation practices:**

- [**Accelerate: Building Strategic Agility for a Faster-Moving World**](https://amzn.to/41clfEc) by John Kotter: How to balance change, stability, and speed in modern organizations
- [**The Phoenix Project**](https://amzn.to/3HadEiG) by Gene Kim, Kevin Behr, and George Spafford: The definitive guide to DevOps transformation and operational thinking
- [**Site Reliability Engineering**](https://amzn.to/3U9NbVo) by Google: Comprehensive approach to building reliable distributed systems at scale
- [**The DevOps Handbook**](https://amzn.to/43IWU9E) by Gene Kim, Patrick Debois, John Willis, and Jez Humble: Practical implementation guide for DevOps practices
- [**The Invincible Company**](https://amzn.to/4l0JZX3) by Alex Osterwalder and Yves Pigneur: Frameworks for building ambidextrous organizations—those that can explore (innovate) and exploit (optimize existing processes) at the same time.

**Operational patterns:**

- [**Pipedrive’s Launchpads**](https://www.infoq.com/articles/pipedrive-unfixed-unicorn/#:~:text=Launchpads): How Pipedrive balances new product development and ongoing maintenance work
- [**Reducing Cognitive Load in Software Development**](/reducing-cognitive-load-in-software-development/): Engineering practices that reduce operational burden

_Next in the series: **From One Team to Many \- Part 4: Beyond the Single Collective** \- When and how to scale beyond even large collectives while preserving fluidity benefits._
