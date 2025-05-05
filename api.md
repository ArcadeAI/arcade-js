# Shared

Types:

- <code><a href="./src/resources/shared.ts">AuthorizationContext</a></code>
- <code><a href="./src/resources/shared.ts">AuthorizationResponse</a></code>
- <code><a href="./src/resources/shared.ts">Error</a></code>

# Auth

Types:

- <code><a href="./src/resources/auth.ts">AuthRequest</a></code>

Methods:

- <code title="post /v1/auth/authorize">client.auth.<a href="./src/resources/auth.ts">authorize</a>({ ...params }) -> AuthorizationResponse</code>
- <code title="get /v1/auth/status">client.auth.<a href="./src/resources/auth.ts">status</a>({ ...params }) -> AuthorizationResponse</code>

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
- <code><a href="./src/resources/tools/tools.ts">ToolDefinition</a></code>
- <code><a href="./src/resources/tools/tools.ts">ToolExecution</a></code>
- <code><a href="./src/resources/tools/tools.ts">ToolExecutionAttempt</a></code>
- <code><a href="./src/resources/tools/tools.ts">ValueSchema</a></code>

Methods:

- <code title="get /v1/tools">client.tools.<a href="./src/resources/tools/tools.ts">list</a>({ ...params }) -> ToolDefinitionsOffsetPage</code>
- <code title="post /v1/tools/authorize">client.tools.<a href="./src/resources/tools/tools.ts">authorize</a>({ ...params }) -> AuthorizationResponse</code>
- <code title="post /v1/tools/execute">client.tools.<a href="./src/resources/tools/tools.ts">execute</a>({ ...params }) -> ExecuteToolResponse</code>
- <code title="get /v1/tools/{name}">client.tools.<a href="./src/resources/tools/tools.ts">get</a>(name, { ...params }) -> ToolDefinition</code>

## Scheduled

Types:

- <code><a href="./src/resources/tools/scheduled.ts">ScheduledGetResponse</a></code>

Methods:

- <code title="get /v1/scheduled_tools">client.tools.scheduled.<a href="./src/resources/tools/scheduled.ts">list</a>({ ...params }) -> ToolExecutionsOffsetPage</code>
- <code title="get /v1/scheduled_tools/{id}">client.tools.scheduled.<a href="./src/resources/tools/scheduled.ts">get</a>(id) -> ScheduledGetResponse</code>

## Formatted

Types:

- <code><a href="./src/resources/tools/formatted.ts">FormattedListResponse</a></code>
- <code><a href="./src/resources/tools/formatted.ts">FormattedGetResponse</a></code>

Methods:

- <code title="get /v1/formatted_tools">client.tools.formatted.<a href="./src/resources/tools/formatted.ts">list</a>({ ...params }) -> FormattedListResponsesOffsetPage</code>
- <code title="get /v1/formatted_tools/{name}">client.tools.formatted.<a href="./src/resources/tools/formatted.ts">get</a>(name, { ...params }) -> unknown</code>

# Workers

Types:

- <code><a href="./src/resources/workers.ts">CreateWorkerRequest</a></code>
- <code><a href="./src/resources/workers.ts">UpdateWorkerRequest</a></code>
- <code><a href="./src/resources/workers.ts">WorkerHealthResponse</a></code>
- <code><a href="./src/resources/workers.ts">WorkerResponse</a></code>

Methods:

- <code title="post /v1/workers">client.workers.<a href="./src/resources/workers.ts">create</a>({ ...params }) -> WorkerResponse</code>
- <code title="patch /v1/workers/{id}">client.workers.<a href="./src/resources/workers.ts">update</a>(id, { ...params }) -> WorkerResponse</code>
- <code title="get /v1/workers">client.workers.<a href="./src/resources/workers.ts">list</a>({ ...params }) -> WorkerResponsesOffsetPage</code>
- <code title="delete /v1/workers/{id}">client.workers.<a href="./src/resources/workers.ts">delete</a>(id) -> void</code>
- <code title="get /v1/workers/{id}">client.workers.<a href="./src/resources/workers.ts">get</a>(id) -> WorkerResponse</code>
- <code title="get /v1/workers/{id}/health">client.workers.<a href="./src/resources/workers.ts">health</a>(id) -> WorkerHealthResponse</code>
- <code title="get /v1/workers/{id}/tools">client.workers.<a href="./src/resources/workers.ts">tools</a>(id, { ...params }) -> ToolDefinitionsOffsetPage</code>
