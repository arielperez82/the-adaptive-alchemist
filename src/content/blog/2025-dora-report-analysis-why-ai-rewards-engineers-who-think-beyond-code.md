---
title: '2025 DORA Report Analysis: Why AI Rewards Engineers Who Think Beyond Code'
description: "The 2025 DORA report proves AI rewards engineers who think in systems, not just syntax. Experience isn't compounding anymore, it's calcifying."
pubDate: 2025-09-30
heroImage: '/assets/dora-2025.png'
readingTime: '7 min read'
tags: ['AI', 'Software Development']
---

The [2025 DORA Report](https://dora.dev/research/2025/dora-report/) studied nearly 5,000 technology professionals across more than 100 countries and found that AI adoption is nearly universal. 90% of respondents now use AI as part of their work, with most reporting productivity gains. But the outcomes vary wildly between organizations. Some teams are shipping faster while maintaining quality. Others are generating more code while creating downstream chaos.

The deciding factor isn't AI itself. It's what AI amplifies. Strong foundations or broken systems. Strategic clarity or tactical thrashing. User focus or feature factories.

AI isn't neutral about expertise. It amplifies some kinds and exposes the limits of others. The question every engineer needs to answer is which path they're on.

## AI amplifies what already exists

The report's central finding is simple but consequential. AI magnifies whatever already exists in your organization. High-performing teams with solid foundations see acceleration. Struggling teams with fragmented processes see their dysfunction multiply.

The data tells a specific story. Compared to 2024, throughput improved this year. Teams are shipping more frequently. But instability persists, and in some cases worsened. Change failure rates remain elevated. Unplanned work continues to eat into capacity.

Translation: we're moving faster without evolving our systems to handle the velocity. We're generating more code without building the guardrails, feedback loops, and organizational structures needed to manage AI-accelerated development safely.

This isn't about AI being flawed. It's about AI revealing what was always true. Speed without direction is just expensive motion. Productivity without purpose is just waste at a higher velocity.

I wrote about this dynamic in my article on [vibe coding](https://www.adaptivealchemist.com/vibe-coding-will-destroy-your-codebase-but-youre-probably-not-doing-it/), where I argued that when development velocity increases by 10x, your control systems must also speed up. The engineering instincts and practices that served you well at walking speed will wreck the car at highway speed. Fast feedback loops aren't optional anymore. They're the difference between acceleration and collision.

## Seven capabilities that make the difference

DORA's inaugural AI Capabilities Model identifies what makes AI valuable versus chaotic. Seven capabilities emerged as the differentiators between teams that benefit from AI and teams that struggle with it.

None of them are about prompt engineering or knowing which model to use. These capabilities have nothing to do with years of experience or technical depth. They're about systems.

### Clear and communicated AI stance

Teams need to make explicit which tools are permitted, what's expected of developers, and how the organization's AI policy applies to different roles. Ambiguity here creates both over-cautious behavior (developers afraid to use AI) and over-permissive behavior (developers using AI inappropriately).

### User-centric focus

The most striking finding is about user focus. The data shows that AI adoption without this foundation actually harms team performance. Teams that kept user needs at the center saw AI amplify their impact. Teams that didn't saw AI make things worse. This finding cuts through a lot of noise. It's not about whether you adopt AI early or late. It's about whether you have strategic clarity on what you're building and for whom.

### Quality internal platforms

A quality platform isn't just developer convenience. It's what separates localized productivity from systemic improvement. The report found that 90% of organizations now have platform engineering teams, but the quality of those platforms varies dramatically. This quality determines whether individual productivity gains translate to organizational benefits or get absorbed by downstream bottlenecks.

### Strong version control practices

Version control discipline matters more than ever when AI can generate large batches of code quickly. The ability to roll back changes, work in small increments, and maintain clean commit history turns from best practice to survival skill.

### Working in small batches

Even with AI generating code faster, working in small batches amplifies AI's benefits for product performance while reducing friction. This practice keeps changes manageable and reduces the risk that comes with large, complex deployments.

### Healthy data ecosystems

High-quality, accessible, unified internal data is essential. AI is only as good as the data it learns from. Organizations that treat their data infrastructure as a strategic asset see better returns from AI investments.

### AI-accessible internal data

Connecting AI tools to internal systems so they have company-specific context makes the difference between generic assistance and truly valuable output. This means going beyond just procuring licenses and investing the engineering effort to give AI tools secure access to internal documentation, codebases, and other data sources.

These seven capabilities have something in common. They're all about understanding how work flows through organizations and where constraints actually exist. They reward engineers who can see across product, data, systems, and user experience. They punish engineers who optimize their local environment without considering the broader system.

This aligns with what I recently wrote about [multi-dimensional engineers](https://www.adaptivealchemist.com/multi-dimensional-engineers-are-dominating-in-ai-augmented-teams/), the ones who can move between backend, frontend, data, and infrastructure while maintaining depth in their primary domain. The DORA data provides empirical backing for this thesis.

## How this plays out in practice

There's a false dichotomy that shows up in discussions about AI and engineering. Rigor versus breadth. Depth versus adaptability. Senior expertise versus generalist flexibility.

The DORA data refutes this framing. Deep technical expertise still matters, but it's not sufficient on its own.

I've seen this across organizations where I've led product and engineering teams.

At Split, we had engineers who were primarily backend developers but understood enough about data pipelines, frontend interactions, and infrastructure to make informed tradeoffs. When they used AI to accelerate development, they knew which shortcuts were safe and which would create problems downstream. They could ship faster because they understood the full context of what they were building.

At Tinybird, the Ops Squad members who understood product context could make better decisions about infrastructure and reliability. They didn't just optimize for uptime metrics. They understood how system performance affected user experience and business outcomes. When AI helped them work faster, they directed that speed toward the right problems.

Both cases show engineers who pair technical depth with systems thinking and user awareness. They're not generalists who know a little about everything. They're specialists who understand how their domain connects to everything else.

The user focus finding from the DORA report reinforces this point. Teams without a user-centric focus got worse when they adopted AI. This isn't about replacing engineers with product managers or forcing developers to become UX designers. It's about engineers understanding the "why" behind what they're building.

Gene Kim's research, referenced in the DORA report, showed that teams with loosely coupled architectures and fast feedback loops saw 20-30% productivity gains from AI. Teams with tightly coupled systems and slow feedback saw nothing, or worse. The difference wasn't in the AI tools. It was in whether the organizational system was structured to amplify or absorb the individual productivity gains.

## From individual productivity to organizational impact

The DORA report highlights value stream management as a force multiplier for AI. Teams that map and optimize their value streams see AI benefits translate into organizational impact. Teams that don't end up with localized productivity gains that get lost in downstream chaos.

This is the missing piece most discussions about AI and engineering ignore. Individual productivity gains are real, but they're meaningless if they hit organizational bottlenecks. The engineer who can identify which part of the value stream is the actual constraint, who can see where work gets stuck between idea and customer, that engineer becomes dramatically more valuable with AI. They're not just working faster, they're directing organizational capacity toward the right problems.

At Tinybird, we saw this pattern repeatedly when building [Tinybird Code](https://www.tinybird.co/tinybird-code?utm_source=the-adaptive-alchemist&utm_medium=referral), our AI agent for developing real-time analytics applications. Developers would use AI to generate SQL transformations faster, but the actual bottleneck wasn't code generation, it was testing and validating those transformations against production data patterns. More generated code just meant more untested logic piling up in quarantine when type mismatches hit production. Once we understood this constraint, we built our agent to focus on the validation layer: automatic error recovery, schema optimization, and test generation. We also built tools to automatically query quarantine tables and provide that context back to the agent for self-correction. That's where the actual velocity gains materialized, turning AI from a productivity toy into a multiplier of reliable delivery.

This is what value stream management actually looks like. Not dashboards or process diagrams, but identifying where work gets stuck and building systems that address the real constraint instead of optimizing what's easy to measure.

Value stream management reveals where AI-accelerated code generation creates downstream problems. Maybe your team can write features twice as fast, but if testing is the bottleneck, you've just doubled the size of the queue. Maybe you can ship more frequently, but if your deployment process is manual and error-prone, you've just increased the blast radius of each mistake.

Understanding the full flow of work means you can apply AI where it actually helps, not just where it feels productive. That's the difference between local optimization and systemic improvement. The DORA report doesn’t make claims about individual careers. Its lens is organizational. But if you extend its findings to the level of individual engineers, the implications are unavoidable: years of experience on their own don’t explain who thrives in an AI-accelerated environment.

## Experience isn't compounding, it's calcifying

Years of experience in the wrong direction doesn't compound, it calcifies. AI raises the bar for what "senior engineer" means.

It's no longer enough to be the person who knows the codebase or the framework or the infrastructure. That knowledge is valuable, but it's not sufficient if it exists in isolation from strategic context.

The valuable engineer is the one who can connect technical decisions to user outcomes, work within systems that enable fast feedback, adapt their instincts to match AI-accelerated velocity, and identify true constraints versus perceived constraints.

This isn't about becoming a generalist or abandoning depth. It's about building depth in multiple dimensions. Technical systems, organizational systems, and user systems. The engineer who can debug a complex distributed system, explain why that system exists in terms of user needs, and identify which part of the organization's workflow is the actual constraint becomes disproportionately more valuable with AI.

The engineer who can only debug the system, even if they're the absolute best at it, finds their influence constrained. They're solving problems, but they can't determine if those are the right problems to solve.

## Moving forward

AI isn't replacing engineers. It's raising the bar for what engineering means. The combination that wins is technical rigor plus user focus plus systems thinking.

Seniority without adaptability accelerates obsolescence. But adaptability without rigor accelerates chaos. You need both. The discipline to build quality systems and the breadth to understand which systems are worth building.

The DORA report provides a roadmap. Start by mapping your value stream. Understand where work actually gets stuck in your organization. Connect your technical decisions to user outcomes. Build the foundations (platforms, data infrastructure, fast feedback loops) that make AI an amplifier rather than a multiplier of dysfunction.

Most importantly, be honest about whether you're building expertise that compounds or expertise that calcifies. The engineers who thrive in the AI era won't be the ones who resist change or the ones who chase every new tool. They'll be the ones who understand that great engineering has always been about systems, not just syntax.
