INSERT INTO categories (id, name, title, status, created_at, type)
VALUES
    (1, 'big_companies_and_well_known_organizations', 'Big Companies and Well-known Organizations', 'active', NOW(), 'server'),
    (2, 'well_known_developers_and_high_impact_projects', 'Well-known Developers and High-Impact Projects', 'active', NOW() ,'server'),
    (3, 'enterprise_tools_and_integrations', 'Enterprise Tools and Integrations', 'active', NOW(), 'server'),
    (4, 'e_commerce_and_cms', 'E-commerce and CMS', 'active', NOW(), 'server'),
    (5, 'documentation_and_knowledge_management', 'Documentation and Knowledge Management', 'active', NOW(), 'server'),
    (6, 'databases_and_storage', 'Databases and Storage', 'active', NOW(), 'server'),
    (7, 'ai_ml_infrastructure', 'AI/ML Infrastructure', 'active', NOW(), 'server'),
    (8, 'development_toolchains', 'Development Toolchains', 'active', NOW(), 'server'),
    (9, 'community_and_frameworks', 'Community and Frameworks', 'active', NOW(), 'server'),
    (10, 'other_projects_alphabetical_order', 'Other Projects Alphabetical Order', 'active', NOW(), 'server');

-- 插入新的分类，并指定 'type' 字段为 'client'
INSERT INTO categories (id,name, title, status, created_at, type)
VALUES
    (101,'mcp_clients_big_companies', 'Big Companies MCP Clients', 'active', NOW(), 'client'),
    (102,'mcp_clients_frameworks', 'MCP Client Frameworks', 'active', NOW(), 'client'),
    (103,'mcp_clients_language_specific', 'Language Specific MCP Clients', 'active', NOW(), 'client'),
    (104,'mcp_clients_ai_integration', 'AI Integration MCP Clients', 'active', NOW(), 'client'),
    (105,'mcp_clients_tools', 'MCP Client Tools', 'active', NOW(), 'client'),
    (106,'mcp_clients_other', 'Other MCP Clients', 'active', NOW(), 'client')
ON CONFLICT (name) DO NOTHING;
