# Case Study: vLLM / Inferact

**Evaluated:** March 2026  
**Evaluator:** @lucycxy  
**Status:** Anchor case — founding calibration reference

---

## Company Profile

| Field | Value |
|-------|-------|
| Open-source project | vLLM |
| Commercial entity | Inferact Inc. |
| Founded | November 2025 |
| HQ | San Francisco, CA |
| Sub-sector | AI Inference Infrastructure |
| Funding | $150M Seed @ $800M valuation |
| Lead investors | Andreessen Horowitz, Lightspeed Venture Partners |
| Other investors | Sequoia Capital, Altimeter Capital, Redpoint Ventures, ZhenFund, Databricks Ventures, UC Berkeley Chancellor's Fund |

**Sources:**
- TechCrunch announcement: https://techcrunch.com/2026/01/22/inference-startup-inferact-lands-150m-to-commercialize-vllm/
- GitHub: https://github.com/vllm-project/vllm

---

## Macro Gate

| Question | Answer | Rationale |
|----------|--------|-----------|
| Sub-sector in window-of-opportunity? | ✅ Yes | Inference market not yet consolidated; vLLM is leading but not monopolist |
| Open-source mode confers structural advantage? | ✅ Yes | Hardware vendor compatibility standard — every chip maker integrates with vLLM on Day 1 |
| AI-cycle value premium applicable? | ✅ Yes | Sits directly on inference throughput chokepoint; as model deployment scales, vLLM's value compounds |

**Gate result: Proceed**

---

## Scorecard

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|---------|
| A. Open-Source Ecosystem | 25% | 9.5/10 | 2.375 |
| B. Team & Globalisation | 20% | 9.0/10 | 1.800 |
| C. Technical Moat | 20% | 9.5/10 | 1.900 |
| D. Commercialisation & PMF | 20% | 7.0/10 | 1.400 |
| E. Exit Path | 15% | 9.5/10 | 1.425 |
| **Total** | 100% | — | **8.9/10** |

**Verdict: 🟢 Strongly Recommend**

---

## Dimension Evidence

**A — Open-Source Ecosystem (9.5)**  
2,000+ contributors; 50+ core developers; PyTorch Foundation stewardship; supports 500+ model architectures and 200+ accelerator types. Meta, Google, and Amazon are confirmed production users. a16z hosted the first vLLM meetup and made the first OSS AI grant to this team — institutional community validation that is non-manipulable.

**B — Team & Globalisation (9.0)**  
Ion Stoica (Databricks co-founder, UC Berkeley Sky Computing Lab director) as key advisor — same lab produced Apache Spark and Ray. Core founders Simon Mo, Woosuk Kwon, Kaichao You are original vLLM creators and Berkeley researchers. Track record: Spark → Databricks ($43B), Ray → Anyscale — the lab has a proven pattern of commercialising foundational infrastructure.

**C — Technical Moat (9.5)**  
L1 innovation: PagedAttention is a genuinely new algorithm (SOSP 2023 paper) that reduces KV cache memory waste through non-contiguous storage. Every major hardware vendor integrates vLLM on chip launch day — this is a compatibility standard, not a tool. Moat compounds as more model architectures are released: each new architecture needs vLLM support, deepening dependency.

**D — Commercialisation & PMF (7.0)**  
Revenue at time of raise: $0 direct ARR. Revenue path is Rank 3 — Infrastructure embedding / OEM licensing: Amazon Web Services is a confirmed production user; Inferact's commercial product is managed serverless vLLM embedded into enterprise and cloud infrastructure, priced on strategic control rather than per-seat subscription. This is the exact model the updated framework's Rank 3 tier was written to describe. Score is 7.0 rather than higher because the path is structurally clear and strongly PMF-validated, but zero confirmed revenue means it cannot score into the 8+ band yet. First paid managed service contract would move this to 8.5+.

**E — Exit Path (9.5)**  
Three credible paths, all with precedent: ①IPO (Berkeley pedigree, Databricks analogy); ②Strategic acquisition — NVIDIA, AWS, Google, Microsoft all have "must-own" motivation since whoever doesn't control the inference standard loses hardware/cloud leverage; ③Platform growth to $10B+ independently. "Must-buy-or-lose" urgency is demonstrably real: SGLang raised at $400M from Accel the same week, proving the market is pricing this category urgently.

---

## One-Vote Veto Check

None triggered. ✅

---

## IC Thesis

vLLM is the inference equivalent of what Kubernetes was for container orchestration — not one of many options, but the standard everything else must be compatible with. Inferact monetises this through managed infrastructure while keeping the upstream open. With Ion Stoica's track record (Spark → Databricks, Ray → Anyscale) and a16z/Lightspeed co-leading at $800M seed, the institutional conviction is validated. Risk: NVIDIA or a cloud provider builds a competing managed offering and uses hardware relationships to displace vLLM as the default. Mitigant: 2,000-contributor community creates switching cost that hardware leverage alone cannot override.

---

## Scoring Lesson

High D score is NOT required for a Green verdict when A + C + E are all ≥9.0. The "infrastructure standard" exception applies: when a project is structurally necessary across the stack, revenue follows adoption — it doesn't gate it. This is the same logic that justified MongoDB ($0 → IPO) and HashiCorp ($0 → $6.4B M&A).
