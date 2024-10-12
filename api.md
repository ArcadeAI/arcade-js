# Shared

Types:

- <code><a href="./src/resources/shared.ts">AuthorizationResponse</a></code>

# Authorization

Methods:

- <code title="post /v1/auth/authorize">client.authorization.<a href="./src/resources/authorization.ts">authorize</a>({ ...params }) -> AuthorizationResponse</code>
- <code title="get /v1/auth/status">client.authorization.<a href="./src/resources/authorization.ts">status</a>({ ...params }) -> AuthorizationResponse</code>

# LlmCompletions

Types:

- <code><a href="./src/resources/llm-completions.ts">ChatResponse</a></code>

Methods:

- <code title="post /v1/chat/completions">client.llmCompletions.<a href="./src/resources/llm-completions.ts">create</a>({ ...params }) -> ChatResponse</code>

# Operations

Types:

- <code><a href="./src/resources/operations.ts">HealthSchema</a></code>

Methods:

- <code title="get /v1/health">client.operations.<a href="./src/resources/operations.ts">health</a>() -> HealthSchema</code>

# Tools

Types:

- <code><a href="./src/resources/tools.ts">Definition</a></code>
- <code><a href="./src/resources/tools.ts">ToolResponse</a></code>

Methods:

- <code title="post /v1/tools/authorize">client.tools.<a href="./src/resources/tools.ts">authorize</a>({ ...params }) -> AuthorizationResponse</code>
- <code title="get /v1/tools/definition">client.tools.<a href="./src/resources/tools.ts">definition</a>({ ...params }) -> Definition</code>
- <code title="post /v1/tools/execute">client.tools.<a href="./src/resources/tools.ts">execute</a>({ ...params }) -> ToolResponse</code>
