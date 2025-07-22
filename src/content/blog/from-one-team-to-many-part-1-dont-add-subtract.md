---
title: "From One Team to Many - Part 1: Don't Add, Subtract"
description: "Most organizations scale by adding teams when work increases. That creates the coordination hell you're trying to escape. The counterintuitive approach: grow by removing boundaries, not multiplying them."
pubDate: 2025-07-22
heroImage: '/assets/dont-add-subtract.jpeg'
readingTime: '9 min read'
tags: ['Organizational Design']
---

Your fluid team experiment worked. People loved the autonomy, decisions moved faster, and stakeholders are asking how to scale the approach. The natural instinct is to replicate what worked: form more fluid teams, train more leaders, and roll out the model across the organization.

That instinct will kill your transformation.

The companies that succeed with fluid organizations don't scale by adding teams. They scale by removing them. Instead of creating more boundaries, they systematically eliminate the ones that already exist. Instead of managing coordination between teams, they merge teams into larger collectives where coordination becomes internal collaboration.

At Split, I merged (in Team Topologies nomenclature) a Stream-aligned Team and Complicated Subsystem Team into one FAST Collective. At Tinybird, we've been working on merging 8 stream-aligned, complicated subsystem, and platform teams into a single FAST Collective.

Both times, the result wasn't chaos—it was clarity. Dependencies disappeared. Handoffs became conversations. Knowledge silos evaporated.

The conventional wisdom about scaling teams is wrong. You don't grow by addition. You grow by subtraction.

## **The scaling myth that's killing organizations**

Walk into any growing tech company and you'll see the same pattern: as work increases, teams multiply. Product engineering spawns platform engineering. Frontend splits from backend. Data science branches into ML engineering and analytics. Each division creates its own processes, priorities, and protective barriers.

Leaders justify this by arguing that cognitive load increases with team size and scope, so you need smaller teams focused on tighter scopes. We also pursue further specialization in pursuit of efficiency. The logic seems sound: create seemingly independent teams that can work in parallel without stepping on each other. Then there's Conway's Law, which suggests that system architecture tends to closely follow team communication structure, so we attempt [Reverse Conway](https://www.thoughtworks.com/radar/techniques/inverse-conway-maneuver) maneuvers to create the system architecture we want by creating the team structure that will generate it.

The result is an org chart that looks logical on paper but creates dependency hell in practice.

I've seen engineering organizations with dozens of separate teams, each optimizing for their own success while the customer experience fragments across handoffs. Product managers spend more time in alignment meetings than talking to customers. Engineers wait for approvals from teams they've never worked with. Simple features require coordination across six different backlogs.

The typical response is to add more coordination mechanisms. Create architecture review boards. Implement dependency tracking systems. Build elaborate planning processes to sequence work across teams. And god forbid, impose the [train wreck that is SAFe](https://safedelusion.com/).

All of this misses the fundamental problem: you can't coordinate your way out of a structure that creates coordination problems. Every team boundary becomes a potential conflict. Every handoff risks losing context. Every specialized team creates knowledge that only they possess.

The companies building the most adaptive organizations have figured out that the solution isn't better coordination. It's fewer boundaries to coordinate across.

## **Why bigger teams can actually work better**

The prevailing wisdom about team size comes from research showing that communication overhead grows exponentially with team members. The formula is n(n-1)/2—a ten-person team has 45 potential communication channels. Conventional thinking says this complexity becomes unmanageable, forcing organizations to keep teams small.

The fundamental flaw in traditional team size research is assuming that communication follows what graph theory calls a "complete graph"—where every team member must communicate with every other team member. As [Prateek Singh](https://singhpr.medium.com/) points out in his analysis of team communication patterns, real teams don't work this way. Communication typically follows hierarchical or hub-and-spoke patterns, where most coordination happens through key connectors rather than everyone talking to everyone.

This misunderstanding leads to the `n(n-1)/2` formula that terrifies managers about larger teams. But when you look at how high-performing larger teams actually organize—whether it's FAST collectives, Pipedrive tribes, or fluid Scrum teams—they create natural communication hierarchies that scale much better than the complete graph model predicts.

The analysis also treats all communication as equally necessary and equally expensive. In reality, most communication in knowledge work is about context sharing, not task coordination. (Note: this is only true if the group is truly a team that is collaborating rather than a set of individuals merely cooperating on what's hopefully the same problem. In the latter case, task coordination is what takes up the bulk of the time, but that's an article for another day\!) When [everyone understands the bigger picture](https://www.adaptivealchemist.com/shared-consciousness-and-breaking-the-decision-bottleneck/), they make better individual decisions and need less explicit coordination.

Cognitive load research reveals something the team topology orthodoxy missed: the cognitive load that kills performance isn't about the size of your team or domain—it's the overhead of managing ownership boundaries and external dependencies. The typical way we create teams around bounded contexts actually creates more cognitive overhead through constant context switching, dependency coordination, and knowledge fragmentation than larger teams with fluid ownership models.

Technical ownership patterns force engineers to become gatekeepers for their domains, creating bottlenecks and preventing knowledge distribution. Meanwhile, fluid ownership patterns allow cognitive load to be distributed across team members rather than concentrated in individual owners.

Consider the difference between these scenarios:

**Scenario A**: Five-person team building a feature that requires API changes from the platform team, design system updates from the design team, and data pipeline modifications from the data engineering team. The engineers spend half their time in alignment meetings and waiting for handoffs.

**Scenario B**: Fifteen-person collective with a platform engineer, design system expert, and data engineer working together on the same feature. The engineers can sit together and discuss tradeoffs in real-time instead of creating tickets and waiting for responses.

Which engineer has a higher cognitive load? The research is clear: it's Scenario A. The overhead of managing external dependencies often exceeds the overhead of working in larger, more self-enabled teams.

The cognitive load that kills performance isn't team size—it's fragmented ownership and external dependencies.

## **The counterintuitive path to growth: vertical scaling**

At Split, our initial FAST experiment involved merging the Data Infrastructure team with the Experimentation team into a single Measurement & Learning collective. Instead of two teams coordinating on experimentation features, we had one team that could design, build, test, and deploy complete solutions.

The metrics tell the story: our release velocity increased by 500%, deployment frequency 10X'd all while quality improved. Not because people worked harder, but because at the minimum, they stopped waiting for each other. They not only were no longer waiting for each others' calendars to align, they also weren't waiting for domain or technical expertise that only resided on the other team.

At Tinybird, we've been taking this further. We're merging eight traditional teams—Infra, Clickhouse Core, Clickhouse Ops, Ingestion, Integrations, Interfaces, and Core—into a fluid collective organized around our customers' needs rather than functional specializations.

The transformation looked chaotic from the outside at Split. Team boundaries dissolved. People started working with colleagues they'd never collaborated with before. Traditional role definitions became fluid as engineers contributed to product strategy and product managers participated in data science decisions.

But the results were measurable: feature delivery time dropped from months to weeks, customer activation time improved from months to days, and employee engagement reached all-time highs. Most importantly, we started building features that customers actually used instead of features that looked good in functional silos.

At Tinybird, the results have been equally compelling. We launched [Tinybird Forward](https://www.tinybird.co/blog-posts/introducing-tinybird-forward)—a fully-reimagined product experience—in record time while simultaneously increasing platform stability, improving margins, and shipping valuable features. We eliminated P0 incidents and reduced P1 incidents, increased business profitability by improving margins 25%, and shipped this major evolution of the developer experience, all in under one quarter.

The secret wasn't better people or better processes. A core aspect was removing the boundaries that forced talented people to work in isolation from each other and from the problems they were trying to solve.

## **Setting up your boundary dissolution experiments**

Your pilot fluid team proved the concept works. Now you need to accelerate the learning by creating multiple parallel laboratories while preparing teams to practice working across traditional boundaries.

Before launching additional experiments, assess your foundation. Your pilot fluid team should have been operating successfully for several months, with clear metrics showing improved outcomes. Leadership needs to actively support the approach, and people from other teams should be curious about the model. If no one else is asking questions about your pilot's success, work on making that success more visible first.

When selecting 2-3 additional teams for fluid experiments, look for natural collaboration opportunities: teams that already coordinate frequently, share customer problems, or have obvious integration points. The goal is creating multiple laboratories where teams can practice fluid working while experimenting with boundary dissolution.

[Willem-Jan Ageling](https://medium.com/@WJAgeling)'s work with Fluid Scrum Teams provides a practical bridge toward larger collectives. His approach uses stable pools of 20+ people who dynamically form smaller Scrum teams each sprint based on the work at hand. This creates a stepping stone between traditional small teams and full collective merging—people get comfortable with fluid team boundaries while maintaining familiar Scrum practices.

Launch these new experiments with dual learning objectives. First, each team practices the internal mechanics of fluid working: self-organization, mission formation, collaborative decision-making, and cross-functional contribution. Use the learnings from your pilot to accelerate their adoption of these practices.

Second, and more importantly, practice boundary dissolution between the experimental teams. This means identifying shared priorities that require collaboration across team boundaries, then experimenting with temporary team reformation to eliminate those dependencies.

Here's what this looks like in practice: Instead of Team A building an API that Team B will consume, they form a temporary mission team with the API designer from Team A and the consumer from Team B. They work together until the integration is complete, then return to their home bases. The dependency becomes a collaboration, and both teams learn what it feels like to work without boundaries.

Your initial successful pilot team becomes the catalyst for this learning. They've already developed the skills and mindset for fluid working. Use them to seed knowledge across the new experimental teams. Have pilot team members rotate into mission teams with the newer groups. Let them share stories, demonstrate practices, and help troubleshoot challenges.

The goal isn't to scale your pilot team directly. The goal is to create multiple learning laboratories that develop both internal fluidity and boundary dissolution skills. You're preparing the foundation for the eventual structural changes that come next.

## **Preparing for the psychological barriers**

It's essential to recognize that one of the biggest challenges isn't technical—it's psychological. People tend to derive identity and security from team membership. "I work on the platform team" or "I'm part of the design systems group" provides clarity about role, responsibility, and career progression. Experimenting with dissolved boundaries can threaten these identity anchors.

Address this directly by distinguishing between tribal identity and work organization. People need to belong somewhere stable and meaningful. In fluid organizations, that belonging comes from the collective or home base, not from the specific mission teams they join.

At Split, we maintained engineering chapters (borrowed from the Spotify model) even as we dissolved functional team boundaries. People belonged to the "Frontend Engineering" or "Backend Engineering" chapter for skill development, mentorship, and career guidance. But their daily work happened in mission teams that formed around customer problems.

This dual identity system solved the psychological need for belonging while enabling the structural flexibility that fluid teams require. People felt rooted in their professional community while remaining adaptable in their work assignment.

Be explicit about what you're experimenting with: you're not eliminating people, reducing headcount, or devaluing expertise. You're testing ways to remove artificial barriers that prevent talented people from working together effectively. You're exploring opportunities for growth and learning by giving people access to a broader range of challenges and colleagues.

The boundary dissolution strategy requires patience and clear communication. Some people will be excited by the prospect of working more broadly. Others will be anxious about losing the clarity and predictability of fixed team roles. Both reactions are valid and expected during experimentation.

## **Your next experiment: Practicing collaboration across boundaries**

Your immediate next step is setting up the parallel experiments that will prepare teams for working fluidly across traditional boundaries. Pick 2-3 teams that coordinate frequently with your pilot team. Start them on their own fluid team journey while creating opportunities for boundary-crossing collaboration.

Start with bridge strategies that let teams practice working across boundaries. Try shared retrospectives where experimental teams reflect together on coordination challenges. Experiment with cross-team mission formations around specific integration points. Have people spend short rotations working with other experimental teams. These practices build the collaboration skills and trust that will eventually enable larger transformations.

Track both individual team development and cross-team collaboration patterns. Are teams developing fluid working skills internally? Are they finding natural ways to collaborate with other experimental teams? Monitor whether dependencies are becoming conversations rather than handoffs. Most importantly, watch for signs that teams are thinking beyond their boundaries—when people start naturally reaching across teams for expertise or proposing joint solutions to shared problems.

Pay attention to the human side. How are people responding to working across traditional boundaries? What concerns are they expressing? What support do they need to feel comfortable collaborating more fluidly across team lines?

The successful boundary dissolution strategy isn't about forcing teams to work together. It's about creating the conditions where talented people naturally want to collaborate on important problems, regardless of which team they started in.

In Part 2, we'll explore what happens when these experiments succeed and you're ready to execute full team integration: how large collectives organize themselves, coordinate work, and maintain quality without descending into chaos. The mechanics look different when you have 40 people trying to work as one team instead of four teams of ten people each.

But first, get your boundary dissolution experiments running. The future of organizational design isn't about managing more teams—it's about needing fewer boundaries between them.

---

## **Essential reading on vertical scaling**

**Challenging team size orthodoxy:**

- [**The Non-Issue of Team Size**](https://singhpr.medium.com/the-non-issue-of-team-size-aka-the-incomplete-understanding-of-complete-graphs-31286e555bd6) by Priyank Singh \- How misunderstanding graph theory creates false limits on team size
- [**Navigating Cognitive Load**](https://navigatingcognitiveload.com/docs/introduction) \- Why conventional thinking about team size and technical ownership creates more cognitive overhead
- [**Fluid Scrum Teams**](https://medium.com/serious-scrum/stable-scrum-teams-can-limit-you-to-create-value-enter-fluid-teams-3df4f2108219) by Willem-Jan Ageling \- Practical approach to larger, more flexible team structures

**Vertical scaling in practice:**

- [**Pipedrive's Agile Framework**](https://medium.com/pipedrive-engineering/pipedrive-agile-framework-a-detailed-view-c0a9717f0c5a) \- How tribes of 20-40+ people maintain effectiveness while spawning dynamic mission teams
- [**FAST: An Innovative Way to Scale Agile**](https://www.scrum.org/resources/blog/fast-scaling-innovative-way-scale-agile-james-shore) by James Shore \- Practitioner insights from scaling with larger collectives
- [**Rubick FAST Overview**](https://www.rubick.com/fast-agile/) \- Real-world implementation patterns and lessons learned

_Next in the series: **From One Team to Many \- Part 2: Making Large Collectives Work** \- The operational reality of coordinating 40+ people as a single adaptive unit_
