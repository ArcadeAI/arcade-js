# Shared

Types:

- <code><a href="./src/resources/shared.ts">AuthorizationResponse</a></code>
- <code><a href="./src/resources/shared.ts">Error</a></code>
- <code><a href="./src/resources/shared.ts">ToolDefinition</a></code>

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

- <code><a href="./src/resources/tools.ts">AuthorizeToolRequest</a></code>
- <code><a href="./src/resources/tools.ts">ExecuteToolRequest</a></code>
- <code><a href="./src/resources/tools.ts">Inputs</a></code>
- <code><a href="./src/resources/tools.ts">Output</a></code>
- <code><a href="./src/resources/tools.ts">Parameter</a></code>
- <code><a href="./src/resources/tools.ts">Requirements</a></code>
- <code><a href="./src/resources/tools.ts">Response</a></code>
- <code><a href="./src/resources/tools.ts">ResponseOutput</a></code>
- <code><a href="./src/resources/tools.ts">ToolkitDefinition</a></code>
- <code><a href="./src/resources/tools.ts">ValueSchema</a></code>

Methods:

- <code title="get /v1/tools/list">client.tools.<a href="./src/resources/tools.ts">list</a>({ ...params }) -> ToolDefinitionsOffsetPage</code>
- <code title="post /v1/tools/authorize">client.tools.<a href="./src/resources/tools.ts">authorize</a>({ ...params }) -> AuthorizationResponse</code>
- <code title="post /v1/tools/execute">client.tools.<a href="./src/resources/tools.ts">execute</a>({ ...params }) -> Response</code>
- <code title="get /v1/tools/definition">client.tools.<a href="./src/resources/tools.ts">get</a>({ ...params }) -> ToolDefinition</code>
