---
title: 'Choosing Your Fluid Organization Approach'
description: "Every organization is different. Here's how to pick the right frameworks and patterns for your specific context, based on real implementations."
pubDate: 2025-07-15
heroImage: '/assets/legos.jpg'
readingTime: '7 min read'
tags: ['Organizational Design']
---

The question I get most after talks about fluid organizations is always the same: "This sounds great, but how do I actually start?" Leaders want specifics. They want to know which frameworks to use, what patterns to follow, and how to avoid the mistakes that kill momentum before it builds.

Starting my journey with fluid teams at Chase UK, building a fully complex, adaptive organization at Split, expanding on Tinybird's initial forays into dynamic reteaming, and seeing dozens of other organizations experiment with fluid models has taught me that success comes down to three things: start small, choose your frameworks intentionally, and measure what matters from day one.

The biggest mistake organizations make is trying to copy someone else's approach wholesale. They read about Spotify's model or Netflix's culture and attempt to implement it exactly as described. The result is usually failure, not because the original approach was wrong, but because every organization is different. What works for a Swedish music streaming company may not work for a US financial services firm or a European SaaS startup.

What I'm about to share is one possible implementation path based on real experience across multiple organizations. The goal isn't to follow my playbook exactly—it's to give you a foundation for building your own approach that fits your specific context, culture, and constraints.

## **Proven frameworks and patterns you can choose from**

Fluid organizations aren't a single approach—they're a collection of frameworks, patterns, and principles that you can mix and match based on your context. Here are the methodologies I've found most helpful:

### **FAST (Fluid Adaptive Scaling Technology)**

FAST provides the core mechanics for self-organizing teams around work rather than hierarchy. Teams merge into a collective, visualize the work, self-organize into teams, execute, then sync and repeat.

**What it brings:** Clear processes for team formation, transparent mission definition, and built-in learning cycles. The collective approach eliminates silos while enabling people to choose work that matches their skills and interests.

**When to use it:** You have knowledge workers facing complex, rapidly changing environments where traditional frameworks like Scrum or SAFe create bottlenecks.

### **Pipedrive's Launchpad and Mission model**

Pipedrive balances stability with fluidity through their dual operating system. Tribes provide stable identity and domain ownership. Launchpads handle maintenance and operations. Missions are time-boxed teams that form around specific customer problems.

**What it brings:** Separation of operational work (stability) from innovation work (fluidity). Clear career development through rotating leadership and cross-tribe collaboration.

**When to use it:** You have both ongoing operational responsibilities and new development work. Teams need stability for skill building but flexibility for diverse customer problems.

### **Haier's RenDanHeYi marketplace model**

Haier treats the organization as a network of autonomous microenterprises (10-15 people each) that operate as independent businesses with full control over strategy, operations, and budgets.

**What it brings:** Market-driven resource allocation and entrepreneurial accountability. People gravitate toward the highest-value opportunities because that's where the rewards are.

**When to use it:** You can define clear value metrics and want teams to self-optimize around business outcomes in highly volatile environments.

### **UnFIX base and crew patterns**

UnFIX provides modular patterns for organizational design. Crews are small cross-functional teams focused on value streams. Bases are home units containing multiple crews. The patterns repeat fractally at different scales.

**What it brings:** Systematic thinking about which parts need stability versus fluidity. Maximum flexibility to reconfigure as conditions change.

**When to use it:** You're designing structure from scratch or need a framework for thinking about where to apply fluid patterns versus traditional teams.

### **Extreme Programming practices for collective ownership**

XP's practices—pair programming, collective code ownership, test-driven development, continuous integration—create the technical foundation that makes fluid teams possible.

**What it brings:** Engineering practices that allow anyone to work on any part of the codebase, eliminating knowledge silos and enabling rapid adaptation.

**When to use it:** Your fluid teams work on shared technical systems and you need to eliminate the "only Sarah knows how this works" problem.

### **Fluid Scrum Teams for dynamic priorities**

Fluid Scrum Teams adapt traditional Scrum for stable pools of people (10-50 members) who reorganize each Sprint around the most important goals, with members self-selecting based on skills and interests.

**What it brings:** Optimized skill utilization for volatile requirements while maintaining Scrum's structure and ceremonies.

**When to use it:** Requirements change often, you have broad cross-functional needs, and communication silos are slowing delivery.

## **What I actually implemented and why**

At Split, I didn't implement any single framework wholesale. Instead, I took elements from multiple approaches based on what our specific situation required:

### **The core model**

I used FAST as the foundation for merging teams into a larger home base for their product domain, creating a marketplace for mission team formation, and establishing synchronization rituals. I kept the existing Chapters (popularized by Spotify) as permanent groups for identity and skill development—people belonged to their stable home base (Measurement & Learning) and Chapters (Data Engineering, Product Engineering, Data Science) while working on dynamic mission teams.

**Why this combination:** Engineers needed deep technical skill development from peers in their discipline, but our business problems required cross-functional collaboration that traditional boundaries prevented. The Collectives provided strategy, focus, and a core set of problems to solve, Chapters provided belonging and growth, while missions provided adaptability.

### **Weekly strategy connection sessions**

Every home base had weekly sessions connecting current work to overall strategy. These combined FAST synchronization meetings with deep dives into how missions advanced strategic goals. Anyone could propose additional sessions if urgent priorities emerged.

**Why this approach:** Teams could see how daily work connected to business outcomes without waiting for quarterly planning cycles. This single practice had more impact on clarity and alignment than any other change.

### **Information radiators everywhere**

We made everything visible: active missions, team composition, progress, and learning. Everyone was responsible for updating information as it surfaced. Leaders updated strategic context and cross-cutting organizational updates.

**Why radical transparency:** Fluid teams require shared context to make good decisions. When people see the whole picture, they make choices that benefit the organization.

### **The Operations Squad model**

Not everything was fluid. I created a stable "Operations Squad" for production systems, monitoring, and operational excellence. This is where mission teams shepherded products to production, where on-call rotations happened, and where operational initiatives were tackled.

**Why stability for operations:** Production systems benefit from deep knowledge and consistent attention. On-call engineers needed to know they had an entire team backing them up.

### **What I explicitly rejected**

- **Traditional performance reviews:** Individual ratings became meaningless when people constantly changed teams
- **Permanent product ownership:** Product responsibilities rotated based on mission needs and growth goals
- **Permanent component ownership:** Even more critical—when engineers "own" specific services, it creates bottlenecks that prevent fluid teams from working
- **Pure consensus decision-making:** We aimed for consensus with strict deadlines. Mission leads had final say but anyone could escalate contentious decisions

## **When to use stability versus fluidity**

Different types of work benefit from different approaches. Here's how to make the right choice:

### **Default to fluidity for innovation work**

New product development, experimental features, and strategic initiatives benefit from fluid teams. These efforts require diverse skills, fresh perspectives, and rapid adaptation.

**Examples from Split:** New analytics capabilities, re-architecting data engineering infrastructure, major UX redesigns, performance optimizations, new data science algorithms.

### **Use stability for operational excellence**

Production systems, security monitoring, and infrastructure management benefit from stable teams with deep domain knowledge. On-call engineers need consistent team support.

**Examples from Split:** Our Operations Squad handled deployment pipelines, monitoring systems, and incident response. Leadership rotated, but core members stayed 6+ months to build expertise.

### **Hybrid models for ongoing product development**

Mature products often benefit from mixing stable platform teams with fluid feature teams. The platform provides consistency while feature teams provide adaptability.

**Examples from Tinybird:** We had a more stable team for Tinybird Classic and the shared platform while a dynamic team tackled Tinybird Forward, our major product redesign. Teams collaborated intensively and rotated membership on longer cadences.

## **Questions to guide your decisions**

Use these questions to determine the right approach for each area:

**Cognitive load:** How much specialized knowledge does effective work require? Counterintuitively, high cognitive load might call for fluidity—to diffuse complexity across more people rather than concentrating it in specialists.

**Change frequency:** How often do requirements, priorities, or approaches change? High change frequency suggests fluidity since teams can adapt composition to match evolving needs.

**Risk tolerance:** What happens if knowledge is lost or mistakes are made? High-risk areas often benefit from stable expertise initially, but this is usually short-term. Eventually, fluidity reduces risk by eliminating single points of failure and spreading critical knowledge.

**Learning opportunities:** Does the work provide valuable cross-functional learning? High learning value suggests including it in fluid rotations since knowledge transfer benefits the entire organization.

The pattern I've observed is that areas calling for stability often need it most in the initial phase. Over time, fluidity becomes the better long-term strategy because it reduces silos, increases organizational resilience, and spreads expertise across more people. What feels risky short-term—spreading critical knowledge—actually reduces risk over time by eliminating dangerous dependencies on individual experts.

## **Building your approach**

Every organization is unique. Your culture, people, customers, technology, and market all influence what fluid approaches will work best. The frameworks I've shared are starting points, not destinations. Use them as inspiration, not prescription.

In the next article, I'll walk you through the practical steps for running your first fluid team experiment. We'll cover the week-by-week implementation roadmap, common mistakes to avoid, and how to measure success.

For now, focus on understanding your options and thinking through what combination of approaches might work in your context. The future of work is fluid, but it's built one thoughtful experiment at a time.

---

## **Essential reading for choosing your approach**

**Framework resources:**

- [**FaST Agile Guide**](https://www.fastagile.io/guide) by Quinton (Ron) Quartel: Complete guide to Fluid Adaptive Scaling Technology
- [**unFIX Model**](https://unfix.work/): Patterns for mixing stability and fluidity in organizational design
- [**Pipedrive's Agile Framework**](https://medium.com/pipedrive-engineering/pipedrive-agile-framework-a-detailed-view-c0a9717f0c5a): Real-world implementation of tribes, missions, and launchpads

**Foundational practices:**

- [**Extreme Programming Explained**](http://www.extremeprogramming.org/) by Kent Beck: Engineering practices that enable collective ownership
- [**Fluid Scrum Teams**](https://medium.com/serious-scrum/stable-scrum-teams-can-limit-you-to-create-value-enter-fluid-teams-3df4f2108219) by Willem-Jan Ageling: Adapting Scrum for dynamic team formation

_Next: **Running Your First Fluid Team Experiment** \- The practical week-by-week roadmap for implementing fluid teams in your organization._
