# Shared

Types:

- <code><a href="./src/resources/shared.ts">AuthorizationResponse</a></code>

# Auth

Methods:

- <code title="post /v1/auth/authorize">client.auth.<a href="./src/resources/auth.ts">authorization</a>({ ...params }) -> AuthorizationResponse</code>
- <code title="get /v1/auth/status">client.auth.<a href="./src/resources/auth.ts">status</a>({ ...params }) -> AuthorizationResponse</code>

# Chat

Types:

- <code><a href="./src/resources/chat.ts">ChatResponse</a></code>

Methods:

- <code title="post /v1/chat/completions">client.chat.<a href="./src/resources/chat.ts">completions</a>({ ...params }) -> ChatResponse</code>

# Health

Types:

- <code><a href="./src/resources/health.ts">HealthSchema</a></code>

Methods:

- <code title="get /v1/health">client.health.<a href="./src/resources/health.ts">list</a>() -> HealthSchema</code>

# Tools

Types:

- <code><a href="./src/resources/tools.ts">Definition</a></code>
- <code><a href="./src/resources/tools.ts">Response</a></code>

Methods:

- <code title="get /v1/tools/definition">client.tools.<a href="./src/resources/tools.ts">retrieve</a>({ ...params }) -> Definition</code>
- <code title="post /v1/tools/authorize">client.tools.<a href="./src/resources/tools.ts">authorize</a>({ ...params }) -> AuthorizationResponse</code>
- <code title="post /v1/tools/execute">client.tools.<a href="./src/resources/tools.ts">execute</a>({ ...params }) -> Response</code>
