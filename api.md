# Shared

Types:

- <code><a href="./src/resources/shared.ts">Error</a></code>

# Auth

Types:

- <code><a href="./src/resources/auth.ts">AuthorizationResponse</a></code>

Methods:

- <code title="post /v1/auth/authorize">client.auth.<a href="./src/resources/auth.ts">authorize</a>({ ...params }) -> AuthorizationResponse</code>
- <code title="get /v1/auth/status">client.auth.<a href="./src/resources/auth.ts">status</a>({ ...params }) -> AuthorizationResponse</code>

# Chat

Types:

- <code><a href="./src/resources/chat.ts">ChatMessage</a></code>
- <code><a href="./src/resources/chat.ts">ChatRequest</a></code>
- <code><a href="./src/resources/chat.ts">ChatResponse</a></code>

Methods:

- <code title="post /v1/chat/completions">client.chat.<a href="./src/resources/chat.ts">completions</a>({ ...params }) -> ChatResponse</code>

# Health

Types:

- <code><a href="./src/resources/health.ts">HealthSchema</a></code>

Methods:

- <code title="get /v1/health">client.health.<a href="./src/resources/health.ts">check</a>() -> HealthSchema</code>

# Tools

Types:

- <code><a href="./src/resources/tools.ts">AuthorizeToolRequest</a></code>
- <code><a href="./src/resources/tools.ts">ExecuteToolRequest</a></code>
- <code><a href="./src/resources/tools.ts">ToolDefinition</a></code>
- <code><a href="./src/resources/tools.ts">ToolResponse</a></code>

Methods:

- <code title="post /v1/tools/authorize">client.tools.<a href="./src/resources/tools.ts">authorize</a>({ ...params }) -> AuthorizationResponse</code>
- <code title="post /v1/tools/execute">client.tools.<a href="./src/resources/tools.ts">execute</a>({ ...params }) -> ToolResponse</code>
- <code title="get /v1/tools/definition">client.tools.<a href="./src/resources/tools.ts">retrieveDefinition</a>({ ...params }) -> ToolDefinition</code>
