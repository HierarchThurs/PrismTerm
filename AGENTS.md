# AGENTS.md

## 项目定位

PrismTerm 是一款基于 Rust + Tauri 的跨平台 SSH 客户端，目标是打造现代、高级、企业级、高性能、低资源占用、可高度定制、支持插件系统的终端与远程连接管理工具。

## 技术栈

* 桌面端框架：Tauri v2
* 后端核心：Rust
* 前端框架：React + TypeScript + Vite
* 包管理器：pnpm
* Rust 工作区：Cargo workspace
* 前端工作区：pnpm workspace

## 开发原则

AI Agent 在开发本项目时，必须遵循以下原则：

1. 先理解项目结构，再修改代码。
2. 不允许盲目生成大段代码。
3. 不允许破坏现有架构。
4. 不允许把所有逻辑堆在单个文件中。
5. 不允许为了快速实现牺牲可维护性。
6. 不允许引入不必要的复杂抽象。
7. 不允许随意新增重量级依赖。
8. 不允许直接重构无关代码。
9. 不允许删除用户已有代码，除非明确说明原因。
10. 每次修改都应保持可运行、可测试、可回滚。

## 项目结构约定

项目采用 monorepo 结构：

```text
PrismTerm
├── apps
│   └── desktop
│       ├── src
│       └── src-tauri
├── crates
│   ├── prism-core
│   ├── prism-ssh
│   ├── prism-terminal
│   ├── prism-storage
│   └── prism-plugin-api
├── packages
├── docs
├── scripts
├── pnpm-workspace.yaml
├── package.json
└── Cargo.toml
```

## Rust 模块职责

### prism-core

负责项目核心公共能力：

* 公共错误类型
* 公共 Result 类型
* 核心领域模型
* 事件定义
* 配置结构
* 通用 trait
* 跨模块共享类型

不得放入具体 SSH 连接实现。

### prism-ssh

负责 SSH 相关能力：

* SSH 连接
* SSH 认证
* SSH 会话管理
* SSH channel 管理
* SSH 配置解析
* 连接状态维护

不得直接依赖前端 UI。

### prism-terminal

负责终端相关能力：

* 终端会话抽象
* PTY 抽象
* 终端输入输出模型
* 终端尺寸变化
* 终端事件
* 会话生命周期

不得混入 SSH 业务之外的 UI 状态。

### prism-storage

负责本地存储：

* 用户配置
* 连接配置
* 会话历史
* 插件配置
* 本地数据库或文件存储封装

不得直接操作 UI。

### prism-plugin-api

负责插件系统接口：

* 插件元数据
* 插件权限声明
* 插件生命周期
* 插件能力注册
* 插件通信协议

插件系统必须优先考虑安全边界和权限控制。

### apps/desktop/src-tauri

负责 Tauri 桌面宿主：

* Tauri command
* 窗口管理
* 前后端通信桥接
* 调用 Rust crates
* 桌面端权限配置
* 插件加载入口

不得把大量业务逻辑直接写在 `src-tauri/src/lib.rs` 中。

## 前端目录职责

前端代码位于：

```text
apps/desktop/src
```

推荐结构：

```text
src
├── app
│   ├── layouts
│   ├── providers
│   └── router
├── features
│   ├── connections
│   ├── sessions
│   ├── terminal
│   ├── plugins
│   └── settings
├── shared
│   ├── api
│   ├── components
│   ├── hooks
│   ├── lib
│   └── types
└── styles
```

### app

负责应用级结构：

* 应用入口
* 全局布局
* 全局 provider
* 路由
* 主题初始化

### features

按业务功能拆分，每个 feature 内部可以包含：

```text
components
model
api
hooks
types
utils
```

不得跨 feature 随意互相引用内部实现。

### shared

负责跨业务共享代码：

* 通用组件
* 通用 hooks
* 通用工具函数
* 通用类型
* Tauri API 封装

不得放具体业务逻辑。

## 代码质量要求

### Rust

Rust 代码必须遵循：

1. 优先使用强类型建模。
2. 错误类型要清晰，不允许大量使用字符串错误。
3. 公共错误优先使用 `thiserror`。
4. 应用层可以使用 `anyhow`，核心库中谨慎使用。
5. 异步逻辑优先使用 `tokio`。
6. 不允许在核心库中直接 `unwrap()` 或 `expect()`，除非有充分注释说明。
7. 不允许隐藏错误。
8. 所有 public API 必须具备清晰命名。
9. 复杂逻辑必须添加中文注释。
10. 模块边界必须清晰。

### TypeScript

TypeScript 代码必须遵循：

1. 禁止使用 `any`，除非有明确注释说明。
2. 类型定义应放在合理位置。
3. 组件保持单一职责。
4. 不允许超大组件。
5. 不允许在 UI 组件中直接堆业务请求逻辑。
6. Tauri invoke 调用必须通过封装层。
7. 状态管理必须按功能域组织。
8. 复杂交互必须拆分 hooks。
9. 样式命名必须清晰稳定。
10. 公共组件必须可复用、低耦合。

## 注释要求

本项目要求谷歌风格中文完整注释，但禁止无意义注释。

必须添加注释的场景：

1. 复杂业务逻辑。
2. 跨线程、异步、生命周期相关代码。
3. SSH 会话状态变化。
4. 插件权限判断。
5. 安全相关逻辑。
6. 错误恢复逻辑。
7. 前后端通信协议。
8. 数据持久化结构。
9. 非显而易见的设计取舍。
10. 临时方案或技术债。

禁止添加以下注释：

```text
// 设置变量
// 调用函数
// 返回结果
// 初始化对象
```

注释应解释“为什么这样做”，而不是重复“代码做了什么”。

## 命名规范

### Rust

* crate 名称使用 kebab-case
* 模块名使用 snake_case
* 类型名使用 PascalCase
* 函数名使用 snake_case
* trait 名称应表达能力或行为
* 错误类型统一以 `Error` 结尾

### TypeScript

* 组件使用 PascalCase
* hooks 使用 `useXxx`
* 类型使用 PascalCase
* 工具函数使用 camelCase
* 文件名保持清晰，不使用模糊缩写

## 前后端通信规范

所有前端调用 Tauri command 必须经过封装层。

禁止在组件中直接写：

```ts
invoke("xxx")
```

应封装为：

```ts
connectionApi.createConnection(...)
sessionApi.openSession(...)
terminalApi.writeInput(...)
```

Tauri command 命名应稳定、清晰、可追踪。

示例：

```text
connection_create
connection_list
connection_update
session_open
session_close
terminal_write
terminal_resize
plugin_install
plugin_enable
```

## 插件系统设计原则

插件系统是 PrismTerm 的核心能力之一，必须从早期就预留架构边界。

插件系统必须满足：

1. 插件元数据独立声明。
2. 插件权限明确声明。
3. 插件不能默认获得全部能力。
4. 插件通信协议必须稳定。
5. 插件加载、启用、禁用、卸载必须有生命周期。
6. 插件异常不能导致主程序崩溃。
7. 插件 API 必须版本化。
8. 插件市场与本地插件机制要解耦。

## 安全要求

PrismTerm 是 SSH 客户端，安全优先级高于功能实现速度。

必须注意：

1. 不得明文保存密码。
2. 私钥不得无保护存储。
3. 敏感信息不得打印到日志。
4. 日志中不得包含密码、token、私钥内容。
5. 插件不得默认访问敏感数据。
6. 配置导出时必须区分敏感字段。
7. SSH 主机指纹校验必须设计清晰。
8. 远程命令执行必须有明确边界。
9. 文件传输必须防止路径误操作。
10. 所有危险操作必须可追踪。

## UI/UX 要求

PrismTerm 的 UI 目标是现代、高级、企业级。

设计风格要求：

1. 深色主题优先。
2. 支持主题系统。
3. 支持高度可定制布局。
4. 保持信息密度和可读性平衡。
5. 交互反馈必须明确。
6. 连接状态必须清晰可见。
7. 终端区域必须优先保证性能和可用性。
8. 插件入口必须自然融入主界面。
9. 设置页面必须结构清晰。
10. 企业级功能不能牺牲易用性。

## 性能要求

必须优先考虑性能：

1. SSH 核心逻辑优先放在 Rust。
2. 高频终端输出不得导致 React 大量重渲染。
3. 终端渲染应使用专用终端组件。
4. 前端状态应避免全局无意义刷新。
5. 大量日志、会话、连接记录必须分页或虚拟化。
6. 插件系统不得阻塞主线程。
7. 文件传输必须支持进度与取消。
8. 长任务必须异步处理。
9. 不允许 UI 线程执行重计算。
10. 不允许为了方便牺牲启动速度。

## 依赖管理

新增依赖前必须考虑：

1. 是否真的需要。
2. 是否可以用已有依赖解决。
3. 是否长期维护。
4. 是否体积过大。
5. 是否影响启动速度。
6. 是否有安全风险。
7. 是否跨平台兼容。
8. 是否适合企业级项目。

不得为了小功能引入大型框架。

## 开发命令

在项目根目录执行：

```powershell
pnpm install
```

启动桌面开发模式：

```powershell
pnpm dev
```

构建前端：

```powershell
pnpm --filter prismterm-desktop build
```

检查 Rust workspace：

```powershell
cargo check --workspace
```

构建 Tauri：

```powershell
pnpm build
```

## AI Agent 工作流程

每次开发前必须：

1. 查看当前目录结构。
2. 阅读相关文件。
3. 明确修改范围。
4. 给出简短实现计划。
5. 只修改必要文件。
6. 修改后运行必要检查。
7. 总结改动内容。
8. 说明验证结果。
9. 标明未完成事项。
10. 不隐藏失败或风险。

## 禁止行为

AI Agent 禁止：

1. 未阅读文件就直接改代码。
2. 大规模重写无关模块。
3. 删除已有业务代码。
4. 引入未经说明的新框架。
5. 把临时代码当正式代码提交。
6. 在核心逻辑中写硬编码配置。
7. 在 UI 组件中混入底层通信细节。
8. 在 Rust 核心库中直接依赖前端概念。
9. 忽略错误处理。
10. 忽略跨平台差异。

## 输出要求

AI Agent 回复时应：

1. 使用中文。
2. 简洁清晰。
3. 直接给出结论。
4. 必要时给出命令。
5. 命令必须可复制执行。

## 当前阶段目标

当前阶段是 PrismTerm 的基础工程搭建阶段。

优先级如下：

1. 保持项目可运行。
2. 建立清晰目录结构。
3. 建立 Rust workspace。
4. 建立 pnpm workspace。
5. 拆分核心 crates。
6. 建立前后端通信规范。
7. 搭建 PrismTerm 初始主界面。
8. 再逐步实现连接管理、终端会话、插件系统。

## 总原则

PrismTerm 不是一次性 Demo，而是长期维护的企业级桌面客户端。

所有代码都应以长期演进为目标：

```text
可运行
可维护
可扩展
可测试
可替换
可审查
可长期演进
```

