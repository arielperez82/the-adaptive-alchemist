---
title: 'Software is R&D, even when AI writes the code'
description: 'AI is collapsing the cost of implementation. The harder problem remains discovering what deserves to be built and proving that it matters.'
pubDate: 2026-11-19
heroImage: '/assets/software-is-rd.png'
readingTime: '10 min read'
tags: ['AI', 'Software Development']
---

Someone whose engineering judgment I respect recently went on a tirade about the term "software factory."

I understood the reaction immediately. I've spent enough years watching software development get managed like an assembly line to know what happens when the metaphor becomes the operating model. Estimates become promises. Utilization becomes productivity. Engineers become interchangeable capacity, and the uncertainty that comes with building something new gets treated as a failure of execution.

Now AI is bringing the factory metaphor back, and this time the argument behind it is a lot stronger.

Agents can take a specification, generate code, run tests, fix failures and repeat until the work passes every predefined check. In sufficiently constrained environments, the generated code can become a disposable artifact. That's genuine progress, and I'm building toward that kind of automation in my own work.

It also reopens a distinction the software industry has struggled with for decades. Producing software is getting cheaper. Discovering what deserves to be built still requires evidence that implementation alone can't provide. The faster we produce software, the more it costs to confuse the two.

## We've been trying to build this factory for decades

The factory metaphor isn't new, and it isn't absurd. Hitachi called a software organization a factory in 1969, and Toshiba, NEC and Fujitsu followed within a decade. Michael Cusumano's [Japan's Software Factories](https://link.amazon/B0fc2OcYq) documents the real quality gains they got from standardized tools and systematic reuse.

In 1992, Jack Reeves offered a sharper way to think about where the factory belongs. In [What is software design?](https://www.developerdotstar.com/mag/articles/reeves_design.html) he argued that source code is the design, and that compiling and linking is the manufacturing step. Construction in software is nearly free. The expense lives in design.

By that definition, we automated the factory a long time ago. Compilers, build systems and continuous delivery turned manufacturing into a button press. Today's agentic factories go well past that, so I won't pretend they're compilers with better marketing.

Industrial production promises predictable quality and cost, a fair promise for work that's already understood. The trouble starts when we assume everything entering the process qualifies.

## Software has different economics

Information goods cost a lot to produce the first time and almost nothing to copy, the point Carl Shapiro and Hal Varian built [Information Rules](https://link.amazon/B0bzILViP) around. Most commercial software businesses don't create value by stamping out identical units. Their economic problem is deciding which capabilities deserve that first, expensive copy, then keeping them alive.

Semiconductors show the two economies sitting side by side. Chip design takes years of architecture work, simulation and verification, and plenty of it ends in revisions or abandoned approaches. Fabrication is a separate, heavily industrialized business that reproduces a finished design millions of times. Same industry, different economics, managed differently. Nobody judges a design team by wafer output.

The analogy has limits. SaaS carries real ongoing costs in hosting, support, security and integration, and manufacturers run process experiments and product development of their own. The split I care about doesn't run between industries. It runs between work whose acceptance criteria are established and work whose acceptance criteria are still being discovered.

That line cuts through a single project. Routine integrations, migrations, well-specified components and product-line variants have settled intent and suit factory-style implementation just fine. The feature next to them, built on a guess about what customers need, doesn't. Not every ticket is R&D.

What sets software apart is how cheap it is to learn by building, and how often the learning says no. When Bing [evaluated ideas in controlled experiments](https://blogs.bing.com/search-quality-insights/2013/08/08/large-scale-experimentation-at-bing), fewer than a third moved the metrics they were designed to improve. Speed up production without speeding up that evaluation and you mostly ship more ideas that don't work, sooner.

## AI makes the factory argument much stronger

Gartner's [September research](https://www.gartner.com/en/documents/8397881) calls AI software factories the "North Star" for agentic software engineering, arguing that agents stuck inside a slow, human-coordinated lifecycle can't deliver what they're capable of. That diagnosis is hard to dispute: plenty of organizations already generate code faster than they can review or release it.

[Factory](https://factory.com/news/software-factory) describes a system that starts from outside signals like bug reports, customer input and business requirements, then builds, tests, reviews, ships and monitors changes in a continuous loop that improves by observing itself. StrongDM's AI team [runs its factory](https://simonwillison.net/2026/Feb/7/software-factory/) on two rules: code must not be written by humans, and code must not be reviewed by humans. Scenarios the coding agents never see decide whether the work converges.

Follow that logic to its end. If acceptance criteria are precise and the harness is trustworthy, the implementation becomes disposable. You stop caring which language it's in. You care that it satisfies the contract, and you regenerate it when the contract changes.

The probabilistic nature of an LLM isn't a sufficient objection. A deterministic compiler can still produce a wrong implementation. For sufficiently well-specified work, a verification system can establish the required properties no matter how the implementation was generated. Reliability comes from the guarantees of the whole process.

The [Djinnlang paper](https://arxiv.org/abs/2609.23954), published by Harvard researchers in September, takes that idea furthest. Programmers write only formal specifications, an LLM writes the implementation plus a proof, and a verifier checks it. An unambiguity constraint requires the spec to be tight enough that every satisfying implementation produces the same outputs for the same inputs. The generated code then need not be manually reviewed for the functional properties the verifier establishes, and it can be regenerated at will.

The results also show where that guarantee stops. Across three benchmark programs, Claude Code took about 21 hours, with an estimated API-equivalent cost of $1,026. Codex took about 33 minutes and $47. Both ran on subscriptions, and the cost estimates aren't directly comparable. Both passed verification, yet Codex's programs ran up to several hundred times slower even after optimization, and some unoptimized versions timed out or crashed. Two implementations of the same verified spec can differ enormously in qualities the spec never mentioned, like performance and resource use. Those need explicit treatment.

For a bounded and growing class of work, implementation is turning into manufacturing. Reeves's line has moved: the spec is becoming the design.

## The specification is still a hypothesis

The promise of an end-to-end factory makes three distinct activities look like one continuous operation. Implementation produces a system that does what the spec says. Verification establishes that it satisfies defined properties and acceptance criteria. Validation tests whether those criteria represent a solution worth having.

Agentic factories are increasingly capable at implementation and verification. They can take part in validation too, but only when the process brings in evidence independent of the assumptions encoded in the spec. Otherwise the system can keep confirming that it built exactly what someone mistakenly asked for.

Tests, proofs and market evidence establish different claims. A passing acceptance suite shows that anticipated scenarios work. A formal proof shows conformity to formalized properties, under its assumptions and only as far as the proof reaches. The Djinnlang authors are candid about the limit: a contradictory spec gets rejected at compile time, a consistent but wrong one gets accepted, and the language "does not fully resolve" the problem of eliciting specifications.

Picture a team that specifies an AI-generated onboarding flow for a B2B product. It satisfies every acceptance criterion. All the tests pass. It's secure, fast and functionally correct. Customers still abandon it.

The team thought new users struggled because they couldn't find the features, so the spec called for a guided tour. They struggled because they couldn't get their own data in. Every test passed because every test encoded the same misunderstanding. No amount of implementation verification settles that unless the verification includes evidence about what users do.

Good ATDD and BDD practice never assumed acceptance criteria could be written once, upfront. They evolve through discovery, implementation and feedback. Specifications are outputs of a learning process, not raw material for a production line.

> AI is making it extraordinarily cheap to build what we specify. It's also making it easier to build the wrong thing before we discover that our specification was wrong.

Factory's loop and StrongDM's scenarios, which score whether observed behavior would likely satisfy a user, are the strongest counters. The word may be defensible for an operating model that supports ongoing discovery. That depends on whether the loop can tell that the specified outcome matters, where its evidence comes from and what it does when the evidence contradicts the spec. A loop that turns every bug report and feature request into shipped code at machine speed is John Cutler's [feature factory](https://cutle.fish/blog/12-signs-youre-working-in-a-feature-factory) with better tooling.

## AI is resurrecting ideas that failed for reasons other than cost

AI makes exhaustive specifications and extensive upfront design cheap enough to reconsider, and much of the factory pitch quietly brings them back. Those practices didn't fall out of favor because documents were expensive to write. Upfront requirements gathering often failed because important requirements couldn't be known until users and engineers met working software. Big design upfront failed because predictions about future needs went stale once the market answered. AI makes a detailed spec far cheaper to write. It can't hand its authors information that only shows up later.

Regulated systems, safety-critical code and well-understood domains still benefit from rigorous upfront formalization. The mistake is assuming that because a practice got cheaper, the uncertainty that made it ineffective went away with the cost.

## The management consequences worry me most

Language shapes how organizations try to manage work. It doesn't dictate behavior, but a factory framing pulls leaders toward throughput, unit cost, utilization, standardization and variance reduction. Those are sound measures for predictable production. Applied indiscriminately to product discovery, they do damage.

Donald Reinertsen explains why in [The Principles of Product Development Flow](https://link.amazon/B06AhGqzb). Product development inventory is information, so its queues are invisible, and queue time climbs steeply as utilization approaches full. High utilization delays feedback, large batches delay it further, and every delay carries a cost that never shows up on a dashboard. Standardizing too early hides the fact that some work is far more uncertain than the rest.

Generated code adds a new version of the problem. When we built an AI agent for developing real-time analytics at Tinybird, the bottleneck wasn't generating SQL. It was validating it against production data patterns, and more generated code meant more untested logic piling up. The gains showed up once we pointed the agent at validation. Measure generated output and you reward activity while hiding the cost of validating, maintaining and operating it.

None of this is an attack on Lean. The Toyota Production System lets anyone on the line stop it when they spot a defect, and treats continuous improvement as part of the job. My complaint is with importing the wrong factory incentives into discovery work.

The fix is usually structural. At Split, we merged our Data Infrastructure and Experimentation teams into one collective, so a single team could take a solution from design through deployment instead of two teams coordinating. As we moved to teams that formed around the work, lead time dropped from months to weeks.

Mistake information-producing work for standardized output and you get an organization that's very efficient at building things nobody needs.

## Perhaps the factory metaphor can be reclaimed

A repeatable system can produce uncertain outcomes.

Supercell built its method around killing games. In his 2016 BAFTA lecture, CEO Ilkka Paananen said the studio had killed nine games over roughly two years, some in beta, while launching one: Clash Royale. The company toasts cancellations with champagne. The process is highly repeatable, and most of what it produces is evidence that says no.

Supercell also shows what happens when the learning gets squeezed. It gave Squad Busters a one-month soft launch, and Paananen later said that left no room to test retention and monetization beyond the first week. The game drew 75 million installs and more than $100 million in player spending, and Supercell still decided to shut it down, the first live game it had ever killed. Validation depends on the economic objective, and Supercell judged it against its own. A culture built on experimentation still made a decision that cut short its chance to learn.

A good AI-native development system would industrialize the repetitive parts of implementation and make discovery and validation faster. Its repeatability would serve learning instead of pretending learning is unnecessary.

If we're going to build software factories, build them to manufacture evidence as efficiently as they manufacture code. The difference that matters is whether the operating model rewards verified output alone, or the learning that leads to better outcomes.

## What we should industrialize

Automate aggressively everything that can be made repeatable: building, testing, deployment, recovery, mechanical implementation against well-defined requirements, reproducible verification and the mechanics that make experiments cheaper and safer. Build structured discovery too, without pretending every important discovery can be specified before the work starts.

AI will increasingly run that discovery as well. A software factory can automate implementation, verification and more and more of discovery itself. Its value depends on how reliably it connects those activities to evidence about the outcomes that matter. The uncertainty doesn't disappear because an agent is the one facing it.

In [Designing systems that don't need you to be right](/designing-systems-that-dont-need-you-to-be-right/), I argued that bounded exposure, fast feedback and recovery let an organization learn from decisions without paying full price for every mistake. Faster implementation makes that architecture worth more.

I've spent much of my career trying to make software development more predictable, reliable and efficient. I want AI to take that much further. I'm unwilling to confuse the ability to produce software with the ability to know what software deserves to exist.

Call the system a factory if you want. Just don't manage discovery as though the answers were known before the work began. That's how we end up building the wrong thing faster than ever.

---

## Further reading

[**The Principles of Product Development Flow**](https://link.amazon/B06AhGqzb) by Donald Reinertsen: The economics of queues, batch size and cost of delay, and why product development can't be managed like a production line

[**Information Rules**](https://link.amazon/B0bzILViP) by Carl Shapiro and Hal Varian: The first-copy economics of information goods, which explain why software's value question is what to build, not how many to make

[**Escaping the Build Trap**](https://link.amazon/B0a3OeBGa) by Melissa Perri: Why organizations that measure output keep shipping features that don't move outcomes, and how product teams get out

[Code as Design: Three Essays](https://www.developerdotstar.com/mag/articles/reeves_design_main.html) by Jack W. Reeves: The original 1992 essay plus his 2005 follow-up, still the best argument that programming is design and compilation is manufacturing
