---
title: 'From One Team to Many - Part 2: Making Large Collectives Work'
description: "Most leaders avoid large teams fearing chaos. Here's how dozens of people actually self-organize around shared priorities to solve problems no traditional team structure can handle."
pubDate: 2025-07-30
heroImage: '/assets/making-large-collectives-work.jpg'
readingTime: '13 min read'
tags: ['Organizational Design', 'High-Performing Teams']
---

Your boundary dissolution experiments succeeded. Teams that started as separate entities are naturally collaborating across traditional lines. People express frustration when they have to return to their original team structures after working on joint missions. Dependencies have become conversations. Knowledge flows freely across what used to be impermeable boundaries.

You're ready for the next step: merging several teams into large collectives where dozens of people coordinate as a single adaptive unit.

The mechanics change completely at this scale. What worked for your pilot fluid team won't work when you have eight times as many people trying to self-organize. New coordination challenges emerge. Information flow becomes more complex. The human dynamics shift in ways that can either create remarkable synergy or complete chaos. You're going to need several pizzas to keep this many people fed.

What I'm about to share is one possible implementation approach based on my experiences at companies like Chase, Split, and Tinybird. The specific practices matter less than understanding the principles behind them. You can use these patterns as starting points, then adapt them to your context, culture, and constraints.

The difference between success and failure comes down to getting the operational details right for your specific situation.

## Staying aligned with a collective sync

When dozens of people gather for a collective sync meeting, the energy is different than a small team standup. The room buzzes with multiple conversations, people catching up on work they haven't seen, and mission teams forming organically around emerging priorities.

Think of it as a standup meeting at a much larger scale, but focused on alignment and coordination rather than status reporting. With this many people, you need to be a lot more deliberate about how to run this effectively.

At Split, it took us a bit of trial-and-error to keep these unstructured large group meetings from turning into chaos. After several adjustments and quite some direction from the [FAST Guide](https://www.fastagile.io/guide), we developed a three-phase structure that actually works:

### Phase 1: Close the previous cycle (10-15 minutes)

Mission teams share what's happened since the last sync:

- New learnings and customer insights
- Challenges and blockers they're facing
- How close they are to completion
- Anything ready to demo
- Specific asks for help from the collective

The focus is on sharing learnings, not status updates. When one team discovers that customers hate a feature we thought they'd love, everyone needs to know immediately.

### Phase 2: Strategic context for the new cycle (5-10 minutes)

Leadership provides the strategic overview that helps people make good decisions:

- Shifts in customer priorities or business constraints
- New competitive intelligence or market changes
- Technical discoveries that affect multiple teams
- External resource availability and organizational updates
- Key movements in KPIs or important metrics

This context setting ensures everyone has the same strategic information when they choose where to contribute next.

### Phase 3: Mission formation and prioritization (15-20 minutes)

This is where the magic happens, but it requires more rigor than mission formation in your pilot teams.

**Current mission teams** report their continuation needs:

- Whether their mission needs to continue
- What phase they're in (discovery, definition, build)
- How many people and which skills they need
- An estimate of time remaining

**New mission proposals** get pitched with complete context:

- Why this work matters now
- What skills and effort are required
- Expected timeline and outcomes
- How it connects to customer or business priorities

**Collective prioritization** happens through voting. The whole collective stack-ranks all proposals—both continuing missions and new ones—to agree on what needs to be tackled first and what can wait. Ranked-choice voting worked for us but, you can use any method that allows the collective to determine priorities and can break ties.

At Tinybird, this process revealed something powerful: just because something is in progress doesn't mean it MUST continue. When our customer activation work suddenly became more urgent than a performance optimization project, the performance mission team voluntarily disbanded to join the activation mission. That's adaptability in action.

The ensuing magic happens when missions naturally right-size themselves around work complexity, but also when people join teams that need them even if they weren't initially drawn to the work. The stack-ranking process reinforces that we don't always get to work on what we want to—sometimes we're called to the "greater good" of the most important thing for the collective and the company.

### Visual decision support

Simple visual tools make these decisions easier:

- **Product maps/opportunity solution trees** showing customer journey priorities
- **Metric dashboards** highlighting business objectives
- **Discovery trees** showing what's been completed, in-progress, and up ahead

These information radiators help people make informed choices about where to contribute without requiring central coordination.

## Transparency without chaos

Managing information flow across dozens of people requires intentional design. The goal is shared consciousness without information overload. People need enough context to make good decisions without drowning in updates that don't affect their work.

### Mission team channels

Each mission team gets its own dedicated channel. These become the context hubs for that specific work:

- Daily updates and technical discussions
- Customer feedback and research insights
- Decision records and next actions
- Links to key documents
- Team huddles

The channels aren't exclusive—anyone from the collective can join any mission channel. This transparency prevents information silos while keeping routine communication contained. An infrastructure engineer can follow the customer activation mission channel to understand how their platform work affects user experience, without participating in every tactical discussion.

At Split, this open-channel policy saved us countless times. When the data infrastructure team was struggling with a performance issue, an engineer from a different mission who had solved a similar problem jumped into their channel and shared the solution. Knowledge flowed naturally because barriers didn't exist.

### Navigation tools that scale

**Product maps/opportunity solution trees** serve as the collective's primary navigation tool. They show customer journey priorities, pain points, and opportunities in a visual format that everyone can understand. Coupled with **Discovery Trees**, they enable the collective to maintain a real-time view of the key opportunities, the progress we’ve made, and what’s ahead.

Some mission teams find additional tools helpful—Kanban boards for task tracking, end-of-day summaries for distributed teams, or customer research artifacts for discovery work. The key is letting teams choose tools that help them stay organized rather than mandating uniform processes.

### Documentation that serves a purpose

We maintain lightweight documentation standards:

- **Living specification documents** that capture decisions as they emerge
- **Meeting notes** with a simple template (decisions made, questions raised, next actions, blockers)
- **Context summaries** that help new mission members get up to speed quickly

The transparency also serves the critical purpose of building institutional memory. Given the very fluid nature of priorities, any mission team might need to stop and then restart later, or new team members might need to join mid-flight. This institutional memory is critical for rapid onboarding and context acquisition.

The principle is shared understanding through transparency, not comprehensive documentation for its own sake.

## Learning rituals that keep collectives healthy

Large collectives need rhythms that keep people connected and learning from each other without overwhelming them with meetings. We use two types of retrospectives that serve different purposes.

### Daily mission team quick retros

Mission teams end each day with a quick reflection:

- What went well today?
- What could've been better?
- What are we sorely lacking?

These quick check-ins surface issues while they're still fresh and maintain team cohesion. More importantly, they accelerate learning from all the experimentation happening across different mission teams. When one team discovers a better approach to customer research or technical implementation, that knowledge spreads quickly through the daily retro practice.

### Bi-weekly collective retrospectives

Every two weeks, the entire collective gathers for a deeper retrospective. We rotate facilitation and focus on systemic issues:

- How well are we supporting each other?
- What patterns are emerging across missions?
- How can we improve our operating system?

Any of the numerous retro templates out there can work well here. At this scale, I've found that enabling people to pre-fill items before the meeting, write things in a "suggestion box" at any time, or use [waste snakes](https://www.industriallogic.com/blog/waste-snake/) makes the retro more effective. With this many people, starting from zero every time can easily take over an hour.

These sessions shape how the collective evolves its practices over time. They also allow the collective to celebrate wins and highlight great things that occurred since the last retro.

## Leadership that enables rather than controls

### The behind-the-scenes coaching model

Managers in large collectives work differently than in traditional teams. They operate behind the scenes, coaching individuals rather than directing teams. They help people develop compelling mission pitches rather than assigning work. They track individual growth and provide career guidance even as people move between different types of work.

Managers also look ahead to what they see on the horizon and use that to guide their people toward learning and growth opportunities: missions they should pitch, missions they might want to join, skills they might develop by contributing to upcoming challenges.

### Strategic coordination that stays parallel

Senior leaders coordinate their own strategy sessions, thinking ahead about upcoming priorities, which missions are likely to emerge, and how to organize leadership support. They discuss which capabilities the collective needs to develop, what technical investments would unlock better customer outcomes, and what issues they foresee with dependencies. They then work that into the sync meetings.

This leadership coordination happens in parallel to the collective's self-organization. Leaders provide context and remove obstacles without taking over decision-making. They influence through information sharing rather than resource allocation—folks allocate resources themselves as they form mission teams.

### Leaders as collective members

It's important to highlight that leaders don't just pull strings and isolate themselves while overlooking the whole process. They're active participants that join mission teams as needed and sometimes lead them. They have many different skills that missions might benefit from and absolutely lend them as necessary. They're members of the collective, just like everyone else.

When conflicts emerge that mission teams can't resolve, managers step in with coaching and facilitation. When people struggle to find their place in the collective, managers provide individual guidance and development opportunities. The goal is enabling self-organization, not replacing it.

## Social contracts that scale

Large collectives need explicit agreements about how they make decisions, resolve conflicts, and prioritize work. These are established through collective discussion and are updated based on experience.

### Clear decision hierarchies

Decision-making follows a clear hierarchy:

- **Mission teams** decide how to execute their work
- **The collective** decides strategic priorities through the stack-ranking process
- **Leadership** decides business constraints and organizational changes

When decisions affect multiple missions, we use time-boxed discussion followed by voting with leadership guidance.

### Transparent prioritization

The stack-ranking process handles marketplace prioritization through transparent criteria:

- Customer impact and business value
- Technical feasibility and learning opportunities
- Resource requirements and timeline estimates

People pitch missions against these criteria, and the collective discusses tradeoffs openly before ranking them collectively.

### Target-driven timeboxes, not detailed estimates

We avoid detailed estimation in favor of target-driven timeboxes. Mission teams broadcast their intentions for landing dates, along with confidence levels. More importantly, they update those estimates when new information arises. The goal is not predictability but rather, continues delivery of value and optimizing for learning.

### Escalation paths that prevent stalling

Tie-breaking mechanisms prevent endless debate:

- Mission teams escalate to the collective sync when they can't reach consensus quickly
- The collective escalates to leadership when alignment isn't possible
- Clear escalation paths prevent important decisions from stalling

## Mission team dynamics within the larger context

Mission teams operate with significant autonomy while remaining connected to the broader collective context. Teams typically include 3-7 people and can exist anywhere from the same week to as long as 12 weeks, depending on the scope of their objective.

### Formation and working rhythms

Formation happens organically during collective syncs, but teams develop their own working rhythms once they start. Some teams prefer daily standups, others work more async. Some teams need frequent customer contact, others focus on internal technical challenges. The collective supports this variety rather than enforcing uniform practices.

While I firmly believe (and have seen empirically) that collaborating synchronously, especially through mobbing and pairing, accelerates learning and onboarding and improves outcomes across the board, some teams might be uncomfortable with the practice. Still, I highly suggest going with this as the default way of working rather than working individually and asynchronously.

### Natural collaboration patterns

Cross-mission collaboration happens naturally when teams have shared dependencies or complementary objectives. The open channel policy and regular collective syncs make it easy for teams to coordinate without formal processes. When one mission needs input from another, they jump into each other's channels or schedule quick joint sessions. They might even decide to merge mission teams, disband and re-form teams, or or something else altogether.

### Rotating leadership

Mission team leadership rotates based on expertise and interest rather than formal hierarchy. The person who pitched the mission often starts as the coordinator, but leadership can shift as the work evolves. Some teams rotate daily facilitation, others identify natural leaders who emerge through the work.

When missions complete, teams dissolve and people become available for new challenges. Some individuals immediately join new missions, others take time to reflect and pursue individual learning goals, still others rotate into operational work that keeps the collective's systems running smoothly.

## Anti-patterns that kill collective fluidity

Several patterns consistently undermine large collective effectiveness. I've seen these destroy promising transformations, so watch for them carefully.

### Coordination creep

This happens when people add alignment meetings and approval processes in response to early confusion. Formal coordination mechanisms end up slowing decision-making more than informal coordination challenges ever did.

**What it looks like:** "We need an additional weekly alignment meeting between mission teams." "All mission proposals need architecture review before formation." "Let's create a dependency tracking board."

**Why it's dangerous:** These mechanisms feel productive but create exactly the bureaucracy that fluid teams are designed to eliminate.

### Information overload

This strikes when transparency turns into noise—too many channels, too many updates, too many decisions that don't affect most people.

**What it looks like:** People stop reading channels because there's too much irrelevant information. Important decisions get lost in the flood of updates.

**The solution:** Ruthless curation. Information that helps people make better decisions gets highlighted, everything else gets background treatment.

### Mission sprawl

This develops when mission teams never dissolve and gradually become permanent departments. This defeats the entire purpose of fluid organization.

**What it looks like:** "We're still working on the customer activation mission" becomes "We're the customer activation team."

**Why it matters:** Teams should celebrate mission completion as success, not failure. When follow-up work is needed, form new missions with clear scope rather than extending existing ones indefinitely.

### Leadership bottlenecks

This emerges when managers can't resist the urge to review decisions or provide approval for mission formation. This destroys the speed and autonomy that make fluid teams effective.

**The fix:** Leaders need to influence through context and resources, not approval gates.

## **Culture dilution**

This occurs when rapid growth brings in people who haven't internalized fluid working principles. New hires default to traditional hierarchical behaviors without understanding collaborative decision-making or mission-driven work.

**What it looks like:** New team members waiting for assignments instead of joining missions. People asking "who's in charge here?" or "what's my role?" instead of contributing where they can add value. Requests for detailed job descriptions and formal approval processes.

**Why it's dangerous:** Traditional behaviors can quickly contaminate the collective's fluid culture. Without proper onboarding, new members recreate the silos and hierarchies that fluid teams are designed to eliminate.

**The solution:** Thankfully this isn't always a problem, especially when mission teams work collaboratively and synchronously. Huddles, mobbing, and pairing are extremely effective at onboarding new people and getting them to absorb the culture and processes. Pair new collective members with experienced fluid workers and immerse them in collaborative practices from day one.

## Measuring what actually matters at scale

Traditional metrics often miss the value created by fluid collectives. Here's what to track instead:

### Responsiveness and formation speed

- How quickly can new missions assemble?
- How regular and early is value delivery?
- How many opportunities for direct feedback are we getting?

The key thing is early and consistent value being shipped, early feedback, and transparency on timeline changes due to new information or new priorities stopping or slowing some things down.

### Knowledge flow and cross-learning

- How many people are learning the hidden areas of the system that no one dares touch?
- How many are internalizing the customer pain points?
- How many are becoming experts in the product, how it works, and why?
- How many are learning the most important business, product, and other metrics and KPIs?

### Skill development and growth

- How many people are building leadership capabilities?
- How many are learning discovery, operations, architecture, or people management?
- Are individuals progressing faster through seniority levels and responsibility?
- Are people proactively seeking management tracks when that aligns with their interests?

### Initiative and autonomy indicators

- Are people stepping up to solve problems rather than waiting to be told what to do?
- Are they identifying opportunities and pitching solutions?
- Are they taking ownership of outcomes rather than just completing tasks?

### Collective health signals

- Are teams naturally helping each other?
- Are people sharing insights and resources without being asked?
- Are mission teams building on each other's work rather than duplicating effort?

### Individual engagement metrics

- Do people feel energized by the variety of work and colleagues?
- Do they express enthusiasm about the collective approach rather than nostalgia for fixed teams?
- Are they having fun?

## Adapting the implementation approach to your reality

Remember: these patterns represent one possible approach. The principles matter more than the specific practices. Focus on creating shared consciousness, enabling self-organization, and maintaining collective learning. Adapt the mechanics to your culture, constraints, and context.

### Start with what fits your context

Identify which elements resonate with your organization's needs:

- Some collectives need more structure, others need more flexibility
- Some need formal documentation, others thrive on informal communication
- Some need frequent synchronization, others work better with lightweight touch points

### The ultimate goal: Organizational adaptability

The whole point of this fluid organization is to ensure that you can be responsive to the emergent challenges and opportunities you will inevitably face. If you've done this right, this will be the last re-org you'll need because new markets, new opportunities, new competitive threats, and sunsetting products won't require you to change your org structure to invest accordingly. Your collective just adapts at the turn of a dime and it's simply a matter of updating the context at the next sync.

### Build learning loops

The key is building learning loops that help your collective evolve its practices based on what actually works in your specific situation. What I've shared are patterns that worked for our contexts. Your collective will develop its own patterns that work for you.

## Common early challenges and troubleshooting

Based on my experience, here are the most common issues you'll face in the first few months:

**Week 1-2:** Information chaos as people figure out which channels to follow
**Solution:** Have the teams appoint information curators who highlight the most important updates

**Month 1:** Mission formation takes too long as people debate priorities  
**Solution:** Time-box the prioritization discussion and have leadership break ties

**Month 2-3:** Some people feel lost in the larger group
**Solution:** Pair experienced collective members with newcomers for mentoring

**Month 3-4:** Mission sprawl as successful teams resist dissolution
**Solution:** Celebrate completion ceremonies and make mission endings positive events

The key is addressing these challenges quickly before they become embedded patterns.

---

In the next article, I'll explore the stability engine that keeps large collectives running: how the Launchpad/Basecamp/Operations Squad model balances innovation with operational excellence, and how people flow between mission work and keeping the lights on.

For now, focus on the dynamics of fluidity. Get the collective sync mechanics right. Build information systems that inform without overwhelming. Create rituals that maintain collective health and accelerate learning. Train leaders to enable rather than control.

The future belongs to organizations that can coordinate large groups of talented people without bureaucratic overhead. The patterns are proven. Your job is adapting them to your reality.

---

## Essential reading for large collective operations

**Foundation frameworks:**

- [**Open Space Technology**](https://amzn.to/41jK4xX) by Harrison Owen \- Enabling self-organizing groups of all sizes to deal with complex issues
- [**The Surprising Power of Liberating Structures**](https://amzn.to/4f9Kfla) by Henri Lipmanowicz and Keith McCandless \- Practical methods for unleashing innovation with groups of any size

**Visual management tools:**

- [**Building an Opportunity Solution Tree**](https://www.producttalk.org/opportunity-solution-tree/) \- Step-by-step guide for charting paths to desired outcomes
- [**Working with Discovery Trees**](https://www.industriallogic.com/blog/discovery-trees/) \- Flexible breakdown of work to discover what needs to be done

**Organizational patterns:**

- [**Building Shared Consciousness**](https://www.adaptivealchemist.com/building-shared-consciousness-practical-mechanisms-that-scale-decision-making/) \- Practical systems for transparency without information overload
- [**Reinventing Organizations**](https://amzn.to/44XJU1O) by Frederic Laloux \- How organizations reach the next stage of self-organization

_Next in the series: **From One Team to Many \- Part 3: The Stability Engine** \- How the Operations Squad model balances innovation with operational excellence_
