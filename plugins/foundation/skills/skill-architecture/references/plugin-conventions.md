# 插件约定
- 结构: plugins/<group>/.claude-plugin/plugin.json + skills/<skill>/SKILL.md
- plugin.json 唯一强制字段 name（kebab-case）；建议补 version/description/author。
- 自定义只读目录放 skill 内 references/（如 chains），不放 plugin 根。
- 运行时产物（runs）落项目工作区，绝不写进插件目录。
- 版本 manual semver，破坏性变更（改插件名）升 minor 起步。
