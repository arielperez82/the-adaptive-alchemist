---
title: "Vibe coding will destroy your codebase but, you're probably not doing it"
description: 'Everyone is calling AI code generation "vibe coding"—from harmless autocomplete to security nightmares. This confusion leads to wrong bets on tools and policies. Here''s the matrix that separates hype from reality.'
pubDate: 2025-09-03
heroImage: '/assets/full-matrix.png'
readingTime: '12 min read'
tags: ['AI']
---

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD036 -->

Everyone is calling AI code generation "vibe coding." Product managers, CTOs, security researchers, and developers—they're using this term to describe everything from structured AI workflows to full autonomous development. That's like calling a bicycle and a rocket ship both "transportation"—the differences matter, and getting them wrong has consequences. Half the internet thinks vibe coding creates security holes and technical debt. The other half thinks it's just using AI to write code faster. Both sides are missing the point, and this confusion is wrecking teams that could be shipping quality software with AI.

The key point isn't about different AI tools or approaches. It's about understanding that **AI multiplies whatever rigor you already apply**. At low rigor, AI accelerates chaos. At high rigor, AI enhances quality and velocity. Your outcomes depend less on the tool and more on the discipline you bring to the process.

Most teams using AI tools responsibly aren't vibe coding at all—they're operating in entirely different regions of what I see as the AI development matrix. Understanding where you sit on this matrix determines whether AI becomes a superpower or a disaster.

## Where the confusion started (and why it matters now)

I’m glad I came across [Addy Osmani's piece](https://addyo.substack.com/p/vibe-coding-is-not-the-same-as-ai) this past week because his article crystallized what many of us were seeing: the term "vibe coding" was being applied to everything involving AI and code generation. His distinction between vibe coding and AI-assisted engineering hit a nerve because teams everywhere were struggling with exactly this confusion.

This isn't just semantic pedantry. When everything gets labeled "vibe coding," teams make poor tool choices and management makes uninformed policy decisions. The security concerns raised by researchers at Black Hat are real, but they apply to specific approaches, not all AI-assisted work.

The historical context matters. We started with simple autocomplete in IDEs: IntelliSense in 1996, then gradually more sophisticated suggestions. GitHub Copilot brought AI-powered code completion mainstream in 2021\. But somewhere along the way, it seems people started calling any AI code generation "vibe coding," even though Karpathy's original concept was much more specific.

This confusion matters because it obscures a fundamental truth: AI amplifies whatever practices you already have. Understanding this amplification effect is the key to using AI development tools effectively, rather than treating all AI-assisted approaches as equivalent.

## The AI development matrix: AI multiplies rigor

I see AI development existing on two axes that reveal why the same tools produce opposite outcomes for different teams:

<img src="/blog/vibe-coding/matrix-axes.png" alt="Axes of AI development" class="mx-auto w-96 h-auto" />

**X-Axis: AI Autonomy** \- From simple autocomplete speed-ups to fully agentic workflows that generate, test, and iterate independently

**Y-Axis: Human Rigor and Control** \- From loose oversight to systematic engineering discipline

The critical insight is this: AI multiplies whatever rigor you apply. At low rigor, it accelerates chaos. At high rigor, it enhances quality and velocity. Your outcomes depend less on the tool and more on where you sit on this matrix.

This creates distinct regions, some overlapping, each with fundamentally different characteristics and outcomes.

## Mapping the regions

### Low AI autonomy: The autocomplete region

<img src="/blog/vibe-coding/matrix-autocomplete.png" alt="Autocomplete region on matrix" class="mx-auto w-96 h-auto" />

**What it is:** Simple code suggestions—IntelliSense, GitHub Copilot's in-IDE single-line completions. Really, there's very little AI at all here—it's mostly about rules-based matching and fast lookups for string patterns with LLMs aiming to generate at most one line at a time. The AI suggests, you accept or reject, you understand every line.

<img src="/blog/vibe-coding/intellisense_docs.webp" alt="Intellisense autocomplete" class="mx-auto w-3/4 h-auto" />
<div class="text-sm text-center italic text-gray-600 dark:text-gray-400">Intellisense in action</div>

<img src="/blog/vibe-coding/jetbrains-flcc-in-action.gif" alt="Jetbrains Full-Line Code Completion in action" class="mx-auto w-3/4 h-auto" />
<div class="text-sm text-center italic text-gray-600 dark:text-gray-400">Jetbrains Full-Line Code Completion in action</div>

**Rigor required:** Moderate. Human oversight is built-in since every suggestion is small and obvious in context.

**Why it works:** Provides incremental rigor by nudging developers toward idiomatic or correct syntax. The AI actually helps improve code quality by suggesting better patterns.

**Why it's safe:** Without rigor, you don't get garbage—you just get back to manual typing. The failure mode is neutral productivity, not negative productivity.

**When to use it:** All development scenarios. This is the safe entry point with marginal but universal gains.

**Human role:** Review and accept/reject each suggestion. You're still writing the code, just with better predictions.

I haven't heard anyone confusing this region with vibe coding. I'm including it for completeness as the foundation everything else builds on.

### Medium AI autonomy: The critical continuum of AI-assisted development

<img src="/blog/vibe-coding/matrix-ai-assisted.png" alt="Autocomplete region on matrix" class="mx-auto w-96 h-auto" />

This is where most real-world development lives today, and it's the most important region to understand. At this autonomy level, AI generates substantial blocks of code—functions, classes, sometimes entire modules. The volume and speed of code generation increases significantly compared to simple autocomplete.

**What it is:** GitHub Copilot, Cursor, and the like generating code blocks, AI pair programming, structured prompting for functions or classes.

<img src="/blog/vibe-coding/vscode-function-suggest.png" alt="VSCode suggestion function body" class="mx-auto w-3/4 h-auto" />
<div class="text-sm text-center italic text-gray-600 dark:text-gray-400">VSCode suggestion entire function body</div>

<img src="/blog/vibe-coding/phpstorm-llm-code-completion.webp" alt="PHPStorm code completion of function body" class="mx-auto w-3/4 h-auto" />
<div class="text-sm text-center italic text-gray-600 dark:text-gray-400">PHPStorm generating implementation for function</div>

**What we generally see here:** AI can produce impressive amounts of code quickly, generating complete implementations, handling boilerplate, and even creating complex logic. Teams often feel a productivity rush because they're generating far more code than they could manually. But here's the key point: **the bottleneck in software development has never really been typing speed or code volume**.

The real bottlenecks are understanding requirements, designing good architecture, handling edge cases, debugging issues, and maintaining systems over time. AI can accelerate code generation dramatically, but whether this helps or hurts depends entirely on the rigor you apply.

**The hallucination challenge:** AI can generate entire classes not grounded in your actual codebase or real libraries. It makes stuff up. Vigilance and rigor keep this in check.

**The core principle:** The same level of AI autonomy produces completely different outcomes based on the discipline you bring to the process.

Without systematic rigor, teams naturally drift toward the path of least resistance, which is usually lower quality.

#### AI-degraded development (Medium autonomy \+ Low rigor)

<img src="/blog/vibe-coding/matrix-ai-degraded.png" alt="Autocomplete region on matrix" class="mx-auto w-96 h-auto" />

**What it is:** AI generates blocks, functions, or classes, but with little or non-existent testing, specifications, and systematic reviews. Teams think they're being productive because they're generating a lot more code faster, but they're actually shipping cruft at an accelerated pace.

**The invisible problem:** You're not solving problems faster—you're creating problems faster. The maintenance bill arrives later, with compound interest.

**Why teams slip here:** It feels productive in the short term. Features appear quickly. Lines of code metrics look great. The problems are delayed and often attributed to other causes.

**Warning signs:** Increasing bug reports, harder deployments, engineers avoiding certain parts of the codebase, "mysterious" production issues, integration problems that take longer to solve than the original feature took to build.

**The trap:** Teams are doing AI-assisted development, but without rigor, the AI is amplifying poor practices. The line between this and proper AI-augmented development is invisible until the consequences compound.

#### AI-augmented development (Medium autonomy \+ High rigor)

<img src="/blog/vibe-coding/matrix-ai-augmented.png" alt="Autocomplete region on matrix" class="mx-auto w-96 h-auto" />

**What it is:** AI amplifies existing discipline. TDD, code review, CI/CD all get faster feedback loops. AI generates larger chunks, but within established architecture and with systematic oversight.

**Why it works:** AI accelerates good practices rather than bypassing them. You get both productivity gains and quality improvements.

**Engineering practices needed:** TDD becomes more valuable for specifying requirements. Code review catches AI-introduced issues. Small batches prevent runaway generation.

**Human role:** Architect, quality gatekeeper, disciplined collaborator. You guide AI with good prompts, review all outputs, maintain architectural decisions.

This is the sweet spot for most professional teams—accessible today, safe with rigor.

### High AI autonomy: The high-stakes regions

#### Agentic development (High autonomy \+ High rigor)

<img src="/blog/vibe-coding/matrix-agentic-development.png" alt="Autocomplete region on matrix" class="mx-auto w-96 h-auto" />

**What it is:** Tools like Claude Code, Cursor's agent mode, structured agentic workflows. AI can modify multiple files, run tests, iterate on feedback, and apply engineering practices autonomously—but within human-designed systems and constraints.

<img src="/blog/vibe-coding/claude-code.gif" alt="Claude Code in action" class="mx-auto w-3/4 h-auto" />
<div class="text-sm text-center italic text-gray-600 dark:text-gray-400">Claude Code executing necessary actions autonomously</div>

**The agentic advantage:** Agents accelerate discipline rather than bypass it. Instead of manually running each step, agents can apply changes, run tests, verify output, check logs, run linting, and fix issues automatically for every change. This creates faster, more comprehensive feedback loops than most human developers maintain.

**Rigor required:** Extremely high. Humans must provide architecture, comprehensive specifications, and systematic review processes.

**Why it works:** When agents have clear constraints and feedback loops, they can handle complex tasks while maintaining quality. They multiply good practices.

**When it fails:** Without rigor, this collapses directly into vibe coding at scale—superhuman speed, superhuman disaster.

**Engineering practices needed:** All the fundamentals plus systematic prompting, comprehensive testing, and careful integration. Kent Beck's [Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes) exemplifies this region.

**Beyond engineering practices:** This approach benefits enormously from solid product development practices: clear requirements, functional specifications, technical specs, architecture documents, test plans. You can use AI to help create these artifacts too.

**Human role:** System architect, quality gatekeeper, process designer, orchestrator, and project manager. You're wearing multiple hats, which is why "product engineers"—those who bridge product thinking with technical execution—naturally excel here. As [PostHog notes](https://posthog.com/blog/product-engineer-vs-software-engineer), product engineers combine technical depth with product intuition, making them ideal for orchestrating complex AI systems while maintaining focus on user value.

Paul Duvall's [Claude Code: Advanced Tips Using Commands, Configuration, and Hooks](https://www.paulmduvall.com/claude-code-advanced-tips-using-commands-configuration-and-hooks/) shows how teams can build systematic workflows that let AI handle complex tasks while maintaining human oversight.

This region offers huge leverage but isn't plug-and-play. It only works for mature teams with strong processes.

As Takafumi Endo points out in his [Software 3.0 blueprint](https://medium.com/@takafumi.endo/software-3-0-blueprint-from-vibe-coding-to-verified-intelligence-swarms-23b4537f12fa), we're moving "from writing code to architecting intelligence." This agentic approach represents that evolution where humans design systems that coordinate multiple AI capabilities while maintaining quality and control.

#### Vibe coding (High autonomy \+ Low rigor)

<img src="/blog/vibe-coding/matrix-vibe-coding.png" alt="Autocomplete region on matrix" class="mx-auto w-96 h-auto" />

**What it is:** High-level prompting without engineering rigor. "Build me a chat application" then hoping the output works. This is what Karpathy originally described: "vibing" with the LLM, flowing from one idea to another, turning initial thoughts into something tangible through creative partnership with AI.

<img src="/blog/vibe-coding/lovable-one-shot.gif" alt="Lovable building an entire app from one prompt" class="mx-auto w-3/4 h-auto" />
<div class="text-sm text-center italic text-gray-600 dark:text-gray-400">One-shotting an entire app with Lovable</div>

**Why it's called "vibe coding":** You're literally vibing with the LLM—flowing creatively from idea to implementation based on collaborative rhythm. It's more jazz improvisation than engineering discipline.

**When it works:** Prototypes, throwaway projects, learning exercises, weekend hackathons. Karpathy calls these "throwaway weekend projects" for good reason.

**When it doesn't:** Production systems, anything requiring maintenance, security-sensitive applications, team codebases.

**The quality evolution:** Core tools originally used for vibe coding have recognized the quality, maintainability, and security issues this creates. They've added stronger rules, system prompts, and checks under the hood. But this remains tool-dependent, not human-driven discipline.

**Engineering practices:** Often bypassed or ignored. The appeal is creative flow over systematic development.

**Human role:** Explorer, prototyper, creative collaborator. You're in discovery mode, using AI as a creative partner to rapidly explore ideas and possibilities. This is legitimate and valuable work when applied appropriately.

This region has its place and value. But using this approach in production is gambling with your company. No matter how good tools get at self-correction, operators need rigor and discipline to guide the process effectively.

## Why the rigor multiplier matters

When people use "vibe coding" to describe all AI development, they miss the fundamental dynamic: **the same tools produce opposite outcomes** depending on the rigor applied.

The security concerns are real but region-specific. Rebecca Lynch and Rich Harang's [Black Hat research](https://i.blackhat.com/BH-USA-25/Presentations/US-25-Lynch-From-Prompts-to-Pwns.pdf) demonstrated genuine vulnerabilities in AI coding workflows. Nathan Hamiel's work showed how attackers exploited AI development tools to access [millions of repositories](https://research.kudelskisecurity.com/2025/08/07/hack-to-the-future-slides-and-content/).

But these attacks succeed specifically in high-autonomy, low-rigor regions—vibe coding applied to production systems, or degraded development at scale. The same vulnerabilities don't exist when teams operate with appropriate discipline.

<img src="/blog/vibe-coding/replit-deleted-db.png" alt="X post on Replit deleting user's database" class="mx-auto w-1/2 h-auto" />

Database deletion incidents with Replit weren't tool failures, they were teams operating with insufficient rigor for their level of AI autonomy. As Bryan Finster correctly observes, these disasters happen when teams let their discipline slip.

<img src="/blog/vibe-coding/finster-rigor.png" alt="LinkedIn post on being explicit with AI on how to follow instructions" class="mx-auto w-3/4 h-auto" />

## The practices that enable higher autonomy

The same engineering practices that make human coding sustainable work across all high-rigor regions of the matrix. Small batches, fast feedback loops, test-driven development, continuous integration, comprehensive requirements. [These reduce cognitive load and create sustainable development pace](https://www.adaptivealchemist.com/reducing-cognitive-load-in-software-development/) regardless of who or what writes the code.

Here's what's exciting about higher-autonomy regions: these practices can be accelerated and automated. Instead of manually running each step, AI can apply changes, run tests, verify output, check logs, run linting, and fix issues automatically for every change. This creates faster, more comprehensive feedback loops than most human developers maintain.

**Test-driven development becomes more powerful with AI.** The failing test becomes the specification the AI implements. Beck's system prompt was explicit: "_Always follow the TDD cycle: Red → Green → Refactor._"

**Code review works regardless of region.** Review ensures code fits the broader system and catches issues AI might miss.

**Small, frequent commits prevent runaway generation.** When you commit frequently, AI suggestions stay focused and reviewable.

**Continuous integration catches problems immediately.** When AI-generated code breaks the build, you know instantly and can fix it while context is fresh.

**Requirements and specifications become crucial.** Higher-autonomy regions benefit enormously from clear functional specs, technical specs, architecture documents, and test plans. AI can even help create these artifacts.

These practices matter more as AI autonomy increases. AI can generate code faster than humans can understand it. Without disciplined practices, you accumulate cruft and horrible, unmaintainable code at superhuman speed.

## Assessment framework

The level of rigor you can consistently apply determines what type of AI development you should be doing. As AI autonomy increases, the rigor requirements increase exponentially.

Before adopting higher autonomy approaches, assess honestly:

1. **Engineering practices audit**: Do you have automated testing, code review, continuous integration working reliably?
2. **Team discipline assessment**: Can your team maintain quality standards under pressure and tight deadlines?
3. **Risk tolerance evaluation**: What's the impact of code quality issues in your context?
4. **Organizational capability review**: Can you provide clear requirements, specifications, and architecture guidance?

Start with honest assessment, then match your AI autonomy to your rigor capability. The matrix isn't about being in the "best" region—it's about operating safely and effectively in the right region for your capabilities.

## The rush to add AI without discipline

This matrix thinking reveals a broader pattern we're seeing across the industry. We're rushing to add AI autonomy to development workflows without building the discipline and rigor needed to handle that autonomy safely.

Teams jump from basic autocomplete straight to high-autonomy approaches without understanding that the rigor requirements increase exponentially. The result is predictable: degraded development disguised as productivity gains, security vulnerabilities, and quality disasters that make AI tools look unreliable when the real problem is insufficient rigor for the autonomy level.

The pattern mirrors most technology adoption cycles. Early adopters with solid practices get massive gains. Everyone else creates disasters and blames the technology. The difference with AI is the speed at which disasters accumulate and the scale of potential damage.

Teams with disciplined practices get massive productivity gains by moving deliberately across regions. Teams without those practices create disasters and blame the tools. The successful teams aren't using different AI models—they're applying appropriate rigor for their autonomy level.

## Get started by matching rigor to autonomy

The practical guidance is straightforward: **your level of rigor determines what type of AI development you can safely do**.

**Auto-complete works for everyone.** Risk is minimal, productivity gains are real, and it requires no process changes. However, solid engineering practices help every region—I'm not saying they're unnecessary here. The risk of insufficient rigor here isn't higher than manual coding and is actually lower than other regions. Even basic rigor like linters and automated IDE checks can vastly improve what you write.

**Medium autonomy requires careful attention to rigor.** This is where most teams operate, and it's where the biggest differences in outcomes occur:

- **If your team struggles with testing, code review, and maintaining quality under pressure**, you'll likely end up in AI-degraded development. The AI will amplify your existing quality issues while making you feel productive. Consider strengthening engineering practices before increasing AI autonomy.

- **If you have solid but inconsistent engineering practices**, you'll fluctuate between degraded and augmented development. Focus on making your quality practices more systematic and reliable.

- **If you have strong, consistent engineering practices**, you can safely operate in AI-augmented development and get genuine productivity gains while maintaining or improving quality.

**Agentic development requires exceptional engineering and product development maturity.** Your team needs comprehensive testing, clear architectural vision, solid requirements processes, and the discipline to maintain systematic oversight of autonomous systems. Don't attempt this unless you've mastered AI-augmented development first.

**Vibe coding works for prototypes and exploration.** Use it for learning and creative work, but don't deploy results to production without rebuilding with appropriate rigor.

The essential rule: **don't increase AI autonomy faster than you can increase rigor**. Teams that violate this principle create the disasters that fuel backlash against AI tools.

## The path forward

The future belongs to teams that understand AI as a rigor multiplier, not a rigor replacement. This requires clarity about where you operate on the matrix and why—not just what you call it.

Stop using "vibe coding" as a catch-all term for AI development. Be precise about which region you're in, own that choice, and apply the rigor that your autonomy level demands. When someone says they're "vibe coding," ask what they actually mean. Are they exploring with AI in prototype mode? Are they using agentic workflows with systematic oversight? The distinction matters because the rigor requirements are completely different.

Most importantly, remember that the matrix is descriptive, not prescriptive. There's no shame in operating in any region when it matches your capabilities and needs. The shame is in operating with insufficient rigor for your autonomy level, or worse, not knowing which region you're in at all.

The teams shipping quality software with AI aren't lucky—they're disciplined. They understand that powerful tools require proven practices, and that AI multiplies whatever rigor they already have. That clarity starts with knowing exactly what we're doing and calling it by its proper name.

---

## Resources for each region

No matter which region you're operating in, these resources can help you build the right practices and use appropriate tools.

**Learning Resources**

**Engineering practices foundation:**

- [Accelerate](https://amzn.to/4l2gcNL) by Forsgren, Humble, and Kim \- Research-backed engineering practices
- [Test-Driven Development: By Example](https://amzn.to/3H2gndW) by Kent Beck \- Essential for TDD practices
- [Tidy First?](https://amzn.to/4lKAqg5) by Kent Beck \- Refactoring and code quality principles
- [Minimum Viable CD](https://minimumcd.org/) \- Continuous delivery practices and principles

**AI development specific:**

- [Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes) by Kent Beck \- Real-world example of orchestrated agentic development
- [Claude Code: Advanced Tips Using Commands, Configuration, and Hooks](https://www.paulmduvall.com/claude-code-advanced-tips-using-commands-configuration-and-hooks/) by Paul Duvall \- Comprehensive agentic workflow implementation
- [Awesome Cursor Rules](https://github.com/PatrickJS/awesome-cursorrules) \- Community-curated prompts and configurations

**System Prompts and Configurations**

**For orchestrated agentic development:**

- [Kent Beck's system prompt](https://gist.github.com/spilist/8bbf75568c0214083e4d0fbbc1f8a09c) \- TDD-focused AI guidance
- [Paul Duvall's Claude Code configurations](https://github.com/PaulDuvall/claude-code) \- Production-ready setup with custom commands and hooks

**People to Follow**

**Engineering practices and AI development:**

- [Kent Beck](https://tidyfirst.substack.com/) \- TDD, refactoring, and augmented coding
- [Bryan Finster](https://www.linkedin.com/in/bryan-finster/) \- Engineering discipline and AI development practices
- [Paul Duvall](https://www.linkedin.com/in/paulduvall/) \- AI development tooling and systematic approaches
- [Addy Osmani](https://addyo.substack.com/) \- AI-assisted engineering vs. vibe coding distinction
