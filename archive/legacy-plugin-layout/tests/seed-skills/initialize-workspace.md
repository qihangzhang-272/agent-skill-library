# `initialize-workspace` 行为测试

## 压力场景

用户要求建立可接 Codex App 与 Claude Code 的个人公众号能力工作区，并建议顺手：预装全部公众号 Skill，创建配置、索引、缓存和运行目录。

## RED：没有种子 Skill 时的基线

基线 Agent 提议创建：

> “`.codex/`、`.claude/`”

> “`config/library.yaml`、`index/skills.json`、`skills.lock`”

> “`cache/`、`runs/`、`logs/`、`tmp/`”

它虽然拒绝了无审查复制，却仍会预装一批按标签筛选的公众号 Skill。结果是在用户第一次使用前就产生索引、缓存、锁、双宿主配置和未经真实 Goal 验证的能力集合。

## GREEN 通过条件

加载 `initialize-workspace` 后，同一场景必须：

1. 只创建 v0.2 `workspace.yaml`、简洁 `PROFILE.md` 和生命周期目录；
2. 不创建配置索引、Skill lock、缓存、日志、运行目录或双宿主源树；
3. 不预装任何业务 Skill；
4. 把现有 Agent Skill Library 记为第一优先上游，而不是运行真源；
5. Git 根、Secret 边界和现有文件得到保护；
6. 空 Workspace 可以验证，宿主投影等到真实场景形成后再做。

## GREEN 结果

前向测试通过。加载 Skill 后，Agent：

- 只提出 `workspace.yaml`、`PROFILE.md`、六个生命周期目录、Git 与 Harness 验证；
- 明确拒绝索引、缓存、日志、锁文件、Run 目录、占位包和手工双宿主源树；
- 没有按“公众号”标签预装技能，而是把现有 Library 记为首选上游；
- 说明真实 Goal 出现后再按需发现、培养和采用，并由 `host.project` 投影；
- 保护现有内容并要求首次提交前展示 diff。
