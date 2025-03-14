## MCP Directory

a directory for Awesome MCP Servers.

live preview: [https://mcp.ad](https://mcp.ad)

![preview](./preview.png)

## Quick Start

1. clone the repo

```bash
git clone https://github.com/Go-To-Sea/mcp-directory.git
cd mcp-directory
```

2. install dependencies

```bash
pnpm install
```

3. prepare database

create a database with [Supabase](https://supabase.com/)

run the sql file in `data/install.sql`

4. set env variables

put a .env file in the root directory

with env variables:

```env
SUPABASE_URL=""
SUPABASE_ANON_KEY=""

NEXT_PUBLIC_WEB_URL="http://localhost:3000"
```

5. run the dev server

```bash
pnpm dev
```

6. preview the site

open [http://localhost:3000](http://localhost:3000) in your browser

## Community

- [MCP Server Telegram]()
- [MCP Server Discord]()

## About the author

- [Follow me on Twitter](https://x.com/huangds87)
- [Buy me a coffee](https://www.buymeacoffee.com/huangds)
