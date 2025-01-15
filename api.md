# Shared

Types:

- <code><a href="./src/resources/shared.ts">AuthAuthorizationContext</a></code>
- <code><a href="./src/resources/shared.ts">AuthAuthorizationResponse</a></code>
- <code><a href="./src/resources/shared.ts">Error</a></code>

# Auth

Types:

- <code><a href="./src/resources/auth.ts">AuthRequest</a></code>

Methods:

- <code title="post /v1/auth/authorize">client.auth.<a href="./src/resources/auth.ts">authorize</a>({ ...params }) -> AuthAuthorizationResponse</code>
- <code title="get /v1/auth/status">client.auth.<a href="./src/resources/auth.ts">status</a>({ ...params }) -> AuthAuthorizationResponse</code>

# Health

Types:

- <code><a href="./src/resources/health.ts">HealthSchema</a></code>

Methods:

- <code title="get /v1/health">client.health.<a href="./src/resources/health.ts">check</a>() -> HealthSchema</code>

# Chat

Types:

- <code><a href="./src/resources/chat/chat.ts">ChatMessage</a></code>
- <code><a href="./src/resources/chat/chat.ts">ChatRequest</a></code>
- <code><a href="./src/resources/chat/chat.ts">ChatResponse</a></code>
- <code><a href="./src/resources/chat/chat.ts">Choice</a></code>
- <code><a href="./src/resources/chat/chat.ts">Usage</a></code>

## Completions

Methods:

- <code title="post /v1/chat/completions">client.chat.completions.<a href="./src/resources/chat/completions.ts">create</a>({ ...params }) -> ChatResponse</code>

# Tools

Types:

- <code><a href="./src/resources/tools/tools.ts">AuthorizeToolRequest</a></code>
- <code><a href="./src/resources/tools/tools.ts">ExecuteToolRequest</a></code>
- <code><a href="./src/resources/tools/tools.ts">ExecuteToolResponse</a></code>
- <code><a href="./src/resources/tools/tools.ts">ToolExecution</a></code>
- <code><a href="./src/resources/tools/tools.ts">ToolExecutionAttempt</a></code>
- <code><a href="./src/resources/tools/tools.ts">ValueSchema</a></code>
- <code><a href="./src/resources/tools/tools.ts">ToolGetResponse</a></code>

Methods:

- <code title="post /v1/tools/authorize">client.tools.<a href="./src/resources/tools/tools.ts">authorize</a>({ ...params }) -> AuthAuthorizationResponse</code>
- <code title="post /v1/tools/execute">client.tools.<a href="./src/resources/tools/tools.ts">execute</a>({ ...params }) -> ExecuteToolResponse</code>
- <code title="get /v1/tools/{name}">client.tools.<a href="./src/resources/tools/tools.ts">get</a>(name) -> ToolGetResponse</code>

## Scheduled

Types:

- <code><a href="./src/resources/tools/scheduled.ts">ScheduledGetResponse</a></code>

Methods:

- <code title="get /v1/scheduled_tools">client.tools.scheduled.<a href="./src/resources/tools/scheduled.ts">list</a>({ ...params }) -> ToolExecutionsOffsetPage</code>
- <code title="get /v1/scheduled_tools/{id}">client.tools.scheduled.<a href="./src/resources/tools/scheduled.ts">get</a>(id) -> ScheduledGetResponse</code>

## Formatted

Types:

- <code><a href="./src/resources/tools/formatted.ts">FormattedGetResponse</a></code>

Methods:

- <code title="get /v1/formatted_tools/{name}">client.tools.formatted.<a href="./src/resources/tools/formatted.ts">get</a>(name, { ...params }) -> unknown</code>
