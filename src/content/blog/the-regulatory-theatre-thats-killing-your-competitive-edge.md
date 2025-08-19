---
title: "The regulatory theater that's killing your competitive edge"
description: 'Your competitors ship faster while staying compliant because they stopped accepting "the regulators won''t let us" as gospel. Most regulatory theater actually makes you less safe while killing velocity. Here''s how to escape.'
pubDate: 2025-08-19
heroImage: '/assets/red-tape.jpg'
readingTime: '10 min read'
tags: ['High-Performing Teams']
---

I've lost count of how many engineering discussions end with "the regulators won't let us do that." Someone suggests trunk-based development? "Can't do it, compliance issues." Continuous deployment? "Too risky for our industry." You build it, you run it? "Our risk team would never approve."

This is complete nonsense.

After spending years implementing progressive delivery at JP Morgan Chase and working with teams across financial services, healthcare, and other heavily regulated industries, I can tell you this: regulators aren't blocking your engineering best practices. Your organization's interpretation of regulations is. And frankly, most of these interpretations are just lazy thinking disguised as prudent risk management.

CEOs at regulated companies watch fast-moving startups eat their lunch and assume regulations give those competitors an unfair advantage. While some smaller competitors might face less stringent regulations, that's too often an excuse covering for a deeper truth: many of these companies have figured out how to go faster while remaining fully compliant. They understand that speed itself is a risk that must be managed. They've figured out how to mitigate the same regulatory risks with controls that enable velocity rather than destroy it.

This pattern is everywhere. Engineering teams inherit compliance interpretations that became organizational gospel without anyone questioning whether they're actually required. Some smart people read a regulation once, implemented the most conservative possible control, and that became "what the regulators require" for the next decade. It's maddening because the actual regulations are often far more flexible than the processes we've built around them.

## No, PCI-DSS does not require branches or PRs

Take this conversation I have at least once a week: "We can't do trunk-based development because PCI-DSS requires code review by someone other than the author."

Let me show you what [PCI-DSS 4.0.1](https://docs-prv.pcisecuritystandards.org/PCI%20DSS/Standard/PCI-DSS-v4_0_1.pdf) actually says.

**Control 6.2.3**: "Code reviews may be performed using either manual or automated processes, or a combination of both."

**Control 6.2.3.1**: "IF manual code reviews are performed for bespoke and custom software prior to release to production, code changes are: Reviewed by individuals other than the originating code author..."

Notice that word "IF." The entire 6.2.3.1 control is conditional on choosing manual reviews in the first place. If you're using automated security scanning, static analysis tools, and comprehensive test suites, this control doesn't even apply to you.

The really damning part is that the "Customized Approach Objective" for 6.2.3 states: "Bespoke and custom software cannot be exploited via coding vulnerabilities." That's it. The regulation cares about preventing exploitable vulnerabilities, not your process for preventing them.

Yet most organizations never read past the first suggested approach. They see "code review" and immediately implement mandatory pull request workflows with human approvers. They create bottlenecks where senior developers must approve every change, slowing delivery to a crawl, all while claiming "PCI requires this."

It doesn't. PCI explicitly allows automated approaches that achieve the same security objectives. Your automated security scanning probably catches more vulnerabilities than tired reviewers approving their fifteenth PR of the day.

Before we go further, let me be clear: I'm neither a lawyer nor an auditor, and nothing I'm saying should be taken as legal advice. Every organization's regulatory requirements are different, and you absolutely need to work with your compliance teams to understand what applies to your specific situation. What I'm sharing is my experience with how regulations are often interpreted more conservatively than necessary, and how working closely with compliance professionals can reveal flexibility that engineering teams don't realize exists.

## Why we keep fighting the same old battles

This reminds me of something I figured out years ago while working across different organizations: most compliance problems aren't actually about the work, they're about how we think about the work. The regulatory compliance world is stuck optimizing for compliance activities rather than compliance outcomes.

I've seen this obsession with effectiveness versus efficiency, with focusing on outcomes versus activities. The knowledge workers building these systems need autonomy to be effective. Yet we've built compliance processes that assume engineers can't be trusted to make good decisions about code quality and security. We treat software development like manufacturing widgets on an assembly line, complete with inspection stations and approval checkpoints.

The absurdity is that modern development practices like automated testing, continuous integration, and progressive deployment actually provide better risk controls than traditional approval processes. They catch problems earlier, provide faster feedback, and create more reliable systems. But we're so stuck in our industrial-age thinking that we can't see it.

## Change Advisory Boards are theatre

Let's talk about Change Advisory Boards, the sacred cow of traditional IT operations. Most companies implement CABs because they believe [SOX](https://www.sec.gov/rules/final/33-8238.htm) requires approval for changes to systems affecting financial reporting.

Here's what actually happens with CABs. Research from the State of DevOps Reports proves that external approvals are negatively correlated with lead time, deployment frequency, and restore time. They have no correlation with change failure rate. CABs don't improve stability, but they definitely slow everything down.

One of the fundamental problems is batching. CABs create deployment batching where multiple changes get bundled together for approval. When something breaks, you can't isolate which change caused the problem. The blast radius increases. Time to resolution gets longer. Customer impact gets worse.

I've seen this pattern destroy velocity at so many regulated companies. Teams would spend weeks developing features, then watch them sit in approval queues for additional weeks. When problems occurred, the batched changes made debugging exponentially harder. The "control" that was supposed to reduce risk actually made incidents worse.

CAB meetings become rubber-stamping exercises. Board members have minutes to understand complex technical changes. They focus on process compliance, not technical risk. They approve changes they don't understand because the paperwork is complete. It's theater, not oversight.

Meanwhile, automated deployment pipelines with comprehensive testing and monitoring provide better controls than committee approvals. They catch problems earlier, limit exposure, and enable faster recovery. The audit trail is cleaner because every change is automatically tracked and measurable.

## Risk mitigation is a never-ending game of whack-a-mole

What most people don't understand about regulatory compliance is that every new control you implement to mitigate a risk introduces brand new risks. You're not eliminating risk, you're choosing which risks you want to have.

Some risks introduced by traditional controls are actually worse than the initial risk we were trying to mitigate. Long-lived feature branches reduce integration risk but increase merge conflict risk and delay feedback. Manual testing purportedly reduces deployment risk but increases quality risk due to slower feedback cycles. Separate QA teams reduce developer testing risk but increase handoff risk and context loss.

Smart organizations recognize these tradeoffs and choose their risks deliberately. They ask whether the new risks introduced by a control are acceptable compared to the original risk being mitigated.

At Split, I helped customers understand that small, frequent deployments with automated rollback created less risk than large, infrequent deployments with extensive manual approval processes. The ability to fix problems quickly outweighed the slightly higher chance of introducing them. The customers that made these changes experienced fewer outages and shorter downtime when issues did occur.

## What regulators actually want

Regulators understand that technology moves faster than their ability to write specific rules. That's why modern regulatory frameworks are built around risk management principles, not prescriptive controls.

[MAS Technology Risk Management Guidelines](https://www.mas.gov.sg/regulation/guidelines/technology-risk-management-guidelines) provide a perfect example. TRM-G1 requires "proper planning and oversight of technology implementation." Most banks interpret this as requiring detailed project plans, multiple approval gates, and extensive documentation before any code can be deployed.

But MAS explicitly acknowledges that innovation requires flexibility. They provide pathways for organizations that can demonstrate effective risk management through alternative means. If you can show that your CI/CD pipeline provides better change tracking than manual documentation, if your automated testing provides more comprehensive coverage than manual QA, if your monitoring and rollback capabilities provide faster incident response than traditional change control, they'll accept those alternatives.

The key is demonstration. You need metrics that prove your controls are effective. You need evidence that your approach reduces risk better than traditional methods.

## Continuous deployment isn't reckless, it's risk reduction

"We can't do continuous deployment because we need human oversight of production changes." This excuse falls apart when you examine what human oversight actually provides.

Traditional change approval boards review hundreds of changes per release. Board members have minutes to understand complex technical changes. They focus on process compliance, not technical risk. They approve changes they don't understand because the paperwork is complete.

This isn't oversight, it's theater. It creates the appearance of control without actually controlling anything.

Real oversight comes from systems that understand what you're deploying and can assess its impact automatically. Feature flags let you deploy changes without exposing them to users. Canary deployments automatically roll back when metrics degrade. Automated testing validates changes more thoroughly than human reviewers ever could.

[MAS TRM-G4](https://www.mas.gov.sg/regulation/guidelines/technology-risk-management-guidelines) requires "proper testing" of changes before production deployment. It doesn't specify that testing must be manual or that deployment must be approved by committee. Automated testing that runs on every change provides more comprehensive coverage than manual testing that only happens at release time.

The irony is that continuous deployment with proper automation is actually more conservative than traditional approaches. You're making smaller changes, testing them more thoroughly, and maintaining the ability to roll back instantly. Compare this to big-bang releases where you deploy weeks of changes simultaneously and hope nothing breaks.

## Building your escape plan from compliance theater

If your organization is stuck in this pattern, you need to approach change strategically. Don't steamroll the people who support existing controls. They genuinely believe they're protecting the organization, and they're working within systems they likely didn't design.

Start by understanding what specific risks your current controls are supposed to mitigate. Map each control to its intended outcome. Ask whether the control actually reduces that risk or just creates the appearance of doing so.

Partner with your risk and compliance teams. They understand the regulatory landscape better than engineering teams. They can help you identify which requirements have flexibility and which ones don't. Frame your proposals around risk reduction, not process improvement.

For CABs specifically, begin by making them more efficient rather than eliminating them. Ask about triaging changes into high, medium, and low risk categories. What would it take to auto-approve low-risk changes? Could medium-risk changes be downgraded through additional automated testing?

Suggest daily or continuous review for low-risk changes instead of weekly batches. This reduces lead time while keeping oversight for truly risky changes. Measure the four key DORA metrics (lead time, deployment frequency, restore time, and change failure rate) as you iterate.

The key is proving that your approach provides better risk controls, not just faster delivery. Document everything with data. Show that automated testing catches more bugs than manual QA. Demonstrate that deployment pipelines provide better change tracking than manual documentation. Prove that monitoring detects issues faster than traditional oversight.

The Chase UK experience was particularly enlightening because it gave us the opportunity to rethink these controls from the ground up, working directly with our legal and compliance colleagues. The most important part was working shoulder to shoulder with our risk and compliance teams rather than just accepting their initial interpretations. I learned more about risk and controls in that short timeframe than I ever had in my career up to that point, where I too would just accept that "Well, the regulators require that." Working directly with compliance teams taught me that most regulations have far more flexibility than engineering teams realize, and that the people implementing controls genuinely want to enable the business, not slow it down. But this only works when you involve them in the conversation about alternatives.

## Why fast companies aren't breaking the rules

Here's what CEOs at regulated companies need to understand: those fast-moving startups eating your lunch aren't operating in a regulation-free zone. They just understand risk management in a much more nuanced way.

They understand that speed itself is a risk. In markets where customer expectations change monthly and competitive threats emerge from unexpected directions, the inability to adapt quickly is often more dangerous than the risks you're trying to control through traditional processes.

These companies have figured out how to make regulatory compliance and velocity mutually reinforcing rather than opposing forces. Their automated testing provides better security than manual reviews. Their monitoring catches problems faster than approval committees. Their deployment practices reduce risk while increasing speed.

This isn't about being reckless or cutting corners. It's about recognizing that the cure can be worse than the disease. When your controls slow you down so much that you can't respond to market changes, you've traded one set of risks for another, potentially worse set.

## Stop accepting inherited wisdom

The barrier isn't regulatory requirements. It's organizational willingness to challenge assumptions and do the work required to prove that better practices actually reduce risk.

Too many engineering teams never question the controls they inherit. They accept bottlenecks like mandatory PR reviews and CABs as regulatory necessities when the regulations often have built-in flexibility for better approaches. They perpetuate compliance theater because it's easier than doing the work to prove alternatives.

This is exactly what I learned from studying organizational effectiveness over the years. Organizations get stuck optimizing for the wrong things. They focus on looking compliant rather than being effective. They mistake activity for achievement.

The companies that figure this out will have a massive competitive advantage. They'll ship faster, with higher quality, while maintaining stronger risk controls than their peers who are still stuck in compliance theater.

Choose your risks wisely. Every control introduces new risks. Make sure the risks you're accepting are better than the ones you're trying to avoid. Sometimes the cure is worse than the disease.

The question isn't whether you can implement modern software practices in regulated industries. The question is whether you'll do the work to prove they're better than the status quo, or keep fighting battles that were won decades ago.

---

## Essential reading

**Understanding regulatory compliance and velocity:**

- [**Lean Enterprise**](https://amzn.to/4lzQPDd) **by Jez Humble, Joanne Molesky, and Barry O'Reilly**: The definitive guide to applying lean principles in regulated environments and large organizations
- [**A Seat at the Table**](https://amzn.to/4mTh7l8) **by Mark Schwartz**: How to transform IT from a cost center to a strategic enabler while navigating compliance requirements

**Research and evidence:**

- [**Accelerate: Building Strategic Agility for a Faster-Moving World**](https://amzn.to/4mr7tX0) **by Nicole Forsgren, Jez Humble, and Gene Kim**: The research behind why modern practices improve both speed and stability
- [**The DevOps Handbook**](https://amzn.to/4mSsQAd) **by Gene Kim, Patrick Debois, John Willis, and Jez Humble**: Practical implementation guide for DevOps practices in enterprise environments
