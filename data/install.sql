CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at timestamptz,
    nickname VARCHAR(255),
    avatar_url VARCHAR(255),
    locale VARCHAR(50),
    signin_type VARCHAR(50),
    signin_ip VARCHAR(255),
    signin_provider VARCHAR(50),
    signin_openid VARCHAR(255),
    UNIQUE (email, signin_provider)
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(255)  NOT NULL,
    description TEXT,
    avatar_url VARCHAR(255),
    created_at timestamptz,
    updated_at timestamptz,
    status VARCHAR(50),
    author_name VARCHAR(255),
    author_avatar_url VARCHAR(255),
    tags TEXT,
    category VARCHAR(50),
    is_featured BOOLEAN DEFAULT FALSE,
    sort INTEGER DEFAULT 0,
    url VARCHAR(255),
    target VARCHAR(50),
    content TEXT,
    summary TEXT,
    img_url TEXT
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50),
    created_at timestamptz
);

CREATE INDEX idx_projects_category_query ON projects(category, status, sort DESC, created_at DESC);

CREATE INDEX idx_projects_featured_query ON projects(is_featured, status, sort DESC, created_at DESC);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER NOT NULL,
    user_nickname VARCHAR(255),
    user_avatar_url VARCHAR(255),
    project_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE INDEX idx_comments_user_query ON comments(user_id, created_at DESC);

CREATE TABLE replies (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    comment_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    user_nickname VARCHAR(255),
    user_avatar_url VARCHAR(255),
    content TEXT NOT NULL,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_replies_user_query ON replies(user_id, created_at DESC);

CREATE INDEX idx_comments_project_query ON comments(project_id, created_at DESC);
CREATE INDEX idx_replies_comment_query ON replies(comment_id, created_at DESC);