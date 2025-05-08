import type { Metadata, ResolvingMetadata } from 'next';
interface Props {
  params: Promise<{ name: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
import { getProjectById, getProjectByName, getProjects } from "@/models/project";

import ProjectContent from "@/templates/tailspark/landing/components/project/detail";
 const officials = [
  {
    author_avatar_url: "https://mcp.so/_next/image?url=https%3A%2F%2Fr2.trys.ai%2Fimgs%2F206yyoqjn-1733449547133.png&w=48&q=75",
    author_name: "modelcontextprotocol",
    avatar_url: "",
    content:`<div class="rounded-lg border bg-card text-card-foreground shadow-sm"><div class="flex flex-col space-y-1.5 p-6"><div class="text-2xl font-semibold leading-none tracking-tight">Content</div></div><div class="p-6 pt-0"><div data-color-mode="light"><div class="wmde-markdown wmde-markdown-color markdown text-xs"><h1 id="github-mcp-server"><a class="anchor" aria-hidden="true" tabindex="-1" href="#github-mcp-server" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>GitHub MCP Server</h1>
<p>MCP Server for the GitHub API, enabling file operations, repository management, search functionality, and more.</p>
<h3 id="features"><a class="anchor" aria-hidden="true" tabindex="-1" href="#features" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Features</h3>
<ul>
<li><strong>Automatic Branch Creation</strong>: When creating/updating files or pushing changes, branches are automatically created if they don't exist</li>
<li><strong>Comprehensive Error Handling</strong>: Clear error messages for common issues</li>
<li><strong>Git History Preservation</strong>: Operations maintain proper Git history without force pushing</li>
<li><strong>Batch Operations</strong>: Support for both single-file and multi-file operations</li>
<li><strong>Advanced Search</strong>: Support for searching code, issues/PRs, and users</li>
</ul>
<h2 id="tools"><a class="anchor" aria-hidden="true" tabindex="-1" href="#tools" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Tools</h2>
<ol>
<li>
<p><code>create_or_update_file</code></p>
<ul>
<li>Create or update a single file in a repository</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner (username or organization)</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>path</code> (string): Path where to create/update the file</li>
<li><code>content</code> (string): Content of the file</li>
<li><code>message</code> (string): Commit message</li>
<li><code>branch</code> (string): Branch to create/update the file in</li>
<li><code>sha</code> (optional string): SHA of file being replaced (for updates)</li>
</ul>
</li>
<li>Returns: File content and commit details</li>
</ul>
</li>
<li>
<p><code>push_files</code></p>
<ul>
<li>Push multiple files in a single commit</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>branch</code> (string): Branch to push to</li>
<li><code>files</code> (array): Files to push, each with <code>path</code> and <code>content</code></li>
<li><code>message</code> (string): Commit message</li>
</ul>
</li>
<li>Returns: Updated branch reference</li>
</ul>
</li>
<li>
<p><code>search_repositories</code></p>
<ul>
<li>Search for GitHub repositories</li>
<li>Inputs:
<ul>
<li><code>query</code> (string): Search query</li>
<li><code>page</code> (optional number): Page number for pagination</li>
<li><code>perPage</code> (optional number): Results per page (max 100)</li>
</ul>
</li>
<li>Returns: Repository search results</li>
</ul>
</li>
<li>
<p><code>create_repository</code></p>
<ul>
<li>Create a new GitHub repository</li>
<li>Inputs:
<ul>
<li><code>name</code> (string): Repository name</li>
<li><code>description</code> (optional string): Repository description</li>
<li><code>private</code> (optional boolean): Whether repo should be private</li>
<li><code>autoInit</code> (optional boolean): Initialize with README</li>
</ul>
</li>
<li>Returns: Created repository details</li>
</ul>
</li>
<li>
<p><code>get_file_contents</code></p>
<ul>
<li>Get contents of a file or directory</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>path</code> (string): Path to file/directory</li>
<li><code>branch</code> (optional string): Branch to get contents from</li>
</ul>
</li>
<li>Returns: File/directory contents</li>
</ul>
</li>
<li>
<p><code>create_issue</code></p>
<ul>
<li>Create a new issue</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>title</code> (string): Issue title</li>
<li><code>body</code> (optional string): Issue description</li>
<li><code>assignees</code> (optional string[]): Usernames to assign</li>
<li><code>labels</code> (optional string[]): Labels to add</li>
<li><code>milestone</code> (optional number): Milestone number</li>
</ul>
</li>
<li>Returns: Created issue details</li>
</ul>
</li>
<li>
<p><code>create_pull_request</code></p>
<ul>
<li>Create a new pull request</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>title</code> (string): PR title</li>
<li><code>body</code> (optional string): PR description</li>
<li><code>head</code> (string): Branch containing changes</li>
<li><code>base</code> (string): Branch to merge into</li>
<li><code>draft</code> (optional boolean): Create as draft PR</li>
<li><code>maintainer_can_modify</code> (optional boolean): Allow maintainer edits</li>
</ul>
</li>
<li>Returns: Created pull request details</li>
</ul>
</li>
<li>
<p><code>fork_repository</code></p>
<ul>
<li>Fork a repository</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>organization</code> (optional string): Organization to fork to</li>
</ul>
</li>
<li>Returns: Forked repository details</li>
</ul>
</li>
<li>
<p><code>create_branch</code></p>
<ul>
<li>Create a new branch</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>branch</code> (string): Name for new branch</li>
<li><code>from_branch</code> (optional string): Source branch (defaults to repo default)</li>
</ul>
</li>
<li>Returns: Created branch reference</li>
</ul>
</li>
<li>
<p><code>list_issues</code></p>
<ul>
<li>List and filter repository issues</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>state</code> (optional string): Filter by state ('open', 'closed', 'all')</li>
<li><code>labels</code> (optional string[]): Filter by labels</li>
<li><code>sort</code> (optional string): Sort by ('created', 'updated', 'comments')</li>
<li><code>direction</code> (optional string): Sort direction ('asc', 'desc')</li>
<li><code>since</code> (optional string): Filter by date (ISO 8601 timestamp)</li>
<li><code>page</code> (optional number): Page number</li>
<li><code>per_page</code> (optional number): Results per page</li>
</ul>
</li>
<li>Returns: Array of issue details</li>
</ul>
</li>
<li>
<p><code>update_issue</code></p>
<ul>
<li>Update an existing issue</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>issue_number</code> (number): Issue number to update</li>
<li><code>title</code> (optional string): New title</li>
<li><code>body</code> (optional string): New description</li>
<li><code>state</code> (optional string): New state ('open' or 'closed')</li>
<li><code>labels</code> (optional string[]): New labels</li>
<li><code>assignees</code> (optional string[]): New assignees</li>
<li><code>milestone</code> (optional number): New milestone number</li>
</ul>
</li>
<li>Returns: Updated issue details</li>
</ul>
</li>
<li>
<p><code>add_issue_comment</code></p>
<ul>
<li>Add a comment to an issue</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>issue_number</code> (number): Issue number to comment on</li>
<li><code>body</code> (string): Comment text</li>
</ul>
</li>
<li>Returns: Created comment details</li>
</ul>
</li>
<li>
<p><code>search_code</code></p>
<ul>
<li>Search for code across GitHub repositories</li>
<li>Inputs:
<ul>
<li><code>q</code> (string): Search query using GitHub code search syntax</li>
<li><code>sort</code> (optional string): Sort field ('indexed' only)</li>
<li><code>order</code> (optional string): Sort order ('asc' or 'desc')</li>
<li><code>per_page</code> (optional number): Results per page (max 100)</li>
<li><code>page</code> (optional number): Page number</li>
</ul>
</li>
<li>Returns: Code search results with repository context</li>
</ul>
</li>
<li>
<p><code>search_issues</code></p>
<ul>
<li>Search for issues and pull requests</li>
<li>Inputs:
<ul>
<li><code>q</code> (string): Search query using GitHub issues search syntax</li>
<li><code>sort</code> (optional string): Sort field (comments, reactions, created, etc.)</li>
<li><code>order</code> (optional string): Sort order ('asc' or 'desc')</li>
<li><code>per_page</code> (optional number): Results per page (max 100)</li>
<li><code>page</code> (optional number): Page number</li>
</ul>
</li>
<li>Returns: Issue and pull request search results</li>
</ul>
</li>
<li>
<p><code>search_users</code></p>
<ul>
<li>Search for GitHub users</li>
<li>Inputs:
<ul>
<li><code>q</code> (string): Search query using GitHub users search syntax</li>
<li><code>sort</code> (optional string): Sort field (followers, repositories, joined)</li>
<li><code>order</code> (optional string): Sort order ('asc' or 'desc')</li>
<li><code>per_page</code> (optional number): Results per page (max 100)</li>
<li><code>page</code> (optional number): Page number</li>
</ul>
</li>
<li>Returns: User search results</li>
</ul>
</li>
<li>
<p><code>list_commits</code></p>
</li>
</ol>
<ul>
<li>Gets commits of a branch in a repository</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>page</code> (optional string): page number</li>
<li><code>per_page</code> (optional string): number of record per page</li>
<li><code>sha</code> (optional string): branch name</li>
</ul>
</li>
<li>Returns: List of commits</li>
</ul>
<ol start="17">
<li><code>get_issue</code></li>
</ol>
<ul>
<li>Gets the contents of an issue within a repository</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>issue_number</code> (number): Issue number to retrieve</li>
</ul>
</li>
<li>Returns: Github Issue object &amp; details</li>
</ul>
<ol start="18">
<li><code>get_pull_request</code></li>
</ol>
<ul>
<li>Get details of a specific pull request</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>pull_number</code> (number): Pull request number</li>
</ul>
</li>
<li>Returns: Pull request details including diff and review status</li>
</ul>
<ol start="19">
<li><code>list_pull_requests</code></li>
</ol>
<ul>
<li>List and filter repository pull requests</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>state</code> (optional string): Filter by state ('open', 'closed', 'all')</li>
<li><code>head</code> (optional string): Filter by head user/org and branch</li>
<li><code>base</code> (optional string): Filter by base branch</li>
<li><code>sort</code> (optional string): Sort by ('created', 'updated', 'popularity', 'long-running')</li>
<li><code>direction</code> (optional string): Sort direction ('asc', 'desc')</li>
<li><code>per_page</code> (optional number): Results per page (max 100)</li>
<li><code>page</code> (optional number): Page number</li>
</ul>
</li>
<li>Returns: Array of pull request details</li>
</ul>
<ol start="20">
<li><code>create_pull_request_review</code></li>
</ol>
<ul>
<li>Create a review on a pull request</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>pull_number</code> (number): Pull request number</li>
<li><code>body</code> (string): Review comment text</li>
<li><code>event</code> (string): Review action ('APPROVE', 'REQUEST_CHANGES', 'COMMENT')</li>
<li><code>commit_id</code> (optional string): SHA of commit to review</li>
<li><code>comments</code> (optional array): Line-specific comments, each with:
<ul>
<li><code>path</code> (string): File path</li>
<li><code>position</code> (number): Line position in diff</li>
<li><code>body</code> (string): Comment text</li>
</ul>
</li>
</ul>
</li>
<li>Returns: Created review details</li>
</ul>
<ol start="21">
<li><code>merge_pull_request</code></li>
</ol>
<ul>
<li>Merge a pull request</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>pull_number</code> (number): Pull request number</li>
<li><code>commit_title</code> (optional string): Title for merge commit</li>
<li><code>commit_message</code> (optional string): Extra detail for merge commit</li>
<li><code>merge_method</code> (optional string): Merge method ('merge', 'squash', 'rebase')</li>
</ul>
</li>
<li>Returns: Merge result details</li>
</ul>
<ol start="22">
<li><code>get_pull_request_files</code></li>
</ol>
<ul>
<li>Get the list of files changed in a pull request</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>pull_number</code> (number): Pull request number</li>
</ul>
</li>
<li>Returns: Array of changed files with patch and status details</li>
</ul>
<ol start="23">
<li><code>get_pull_request_status</code></li>
</ol>
<ul>
<li>Get the combined status of all status checks for a pull request</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>pull_number</code> (number): Pull request number</li>
</ul>
</li>
<li>Returns: Combined status check results and individual check details</li>
</ul>
<ol start="24">
<li><code>update_pull_request_branch</code></li>
</ol>
<ul>
<li>Update a pull request branch with the latest changes from the base branch (equivalent to GitHub's "Update branch" button)</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>pull_number</code> (number): Pull request number</li>
<li><code>expected_head_sha</code> (optional string): The expected SHA of the pull request's HEAD ref</li>
</ul>
</li>
<li>Returns: Success message when branch is updated</li>
</ul>
<ol start="25">
<li><code>get_pull_request_comments</code></li>
</ol>
<ul>
<li>Get the review comments on a pull request</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>pull_number</code> (number): Pull request number</li>
</ul>
</li>
<li>Returns: Array of pull request review comments with details like the comment text, author, and location in the diff</li>
</ul>
<ol start="26">
<li><code>get_pull_request_reviews</code></li>
</ol>
<ul>
<li>Get the reviews on a pull request</li>
<li>Inputs:
<ul>
<li><code>owner</code> (string): Repository owner</li>
<li><code>repo</code> (string): Repository name</li>
<li><code>pull_number</code> (number): Pull request number</li>
</ul>
</li>
<li>Returns: Array of pull request reviews with details like the review state (APPROVED, CHANGES_REQUESTED, etc.), reviewer, and review body</li>
</ul>
<h2 id="search-query-syntax"><a class="anchor" aria-hidden="true" tabindex="-1" href="#search-query-syntax" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Search Query Syntax</h2>
<h3 id="code-search"><a class="anchor" aria-hidden="true" tabindex="-1" href="#code-search" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Code Search</h3>
<ul>
<li><code>language:javascript</code>: Search by programming language</li>
<li><code>repo:owner/name</code>: Search in specific repository</li>
<li><code>path:app/src</code>: Search in specific path</li>
<li><code>extension:js</code>: Search by file extension</li>
<li>Example: <code>q: "import express" language:typescript path:src/</code></li>
</ul>
<h3 id="issues-search"><a class="anchor" aria-hidden="true" tabindex="-1" href="#issues-search" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Issues Search</h3>
<ul>
<li><code>is:issue</code> or <code>is:pr</code>: Filter by type</li>
<li><code>is:open</code> or <code>is:closed</code>: Filter by state</li>
<li><code>label:bug</code>: Search by label</li>
<li><code>author:username</code>: Search by author</li>
<li>Example: <code>q: "memory leak" is:issue is:open label:bug</code></li>
</ul>
<h3 id="users-search"><a class="anchor" aria-hidden="true" tabindex="-1" href="#users-search" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Users Search</h3>
<ul>
<li><code>type:user</code> or <code>type:org</code>: Filter by account type</li>
<li><code>followers:&gt;1000</code>: Filter by followers</li>
<li><code>location:London</code>: Search by location</li>
<li>Example: <code>q: "fullstack developer" location:London followers:&gt;100</code></li>
</ul>
<p>For detailed search syntax, see <a href="https://docs.github.com/en/search-github/searching-on-github" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow">GitHub's searching documentation</a>.</p>
<h2 id="setup"><a class="anchor" aria-hidden="true" tabindex="-1" href="#setup" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Setup</h2>
<h3 id="personal-access-token"><a class="anchor" aria-hidden="true" tabindex="-1" href="#personal-access-token" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Personal Access Token</h3>
<p><a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow">Create a GitHub Personal Access Token</a> with appropriate permissions:</p>
<ul>
<li>Go to <a href="https://github.com/settings/tokens" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow">Personal access tokens</a> (in GitHub Settings &gt; Developer settings)</li>
<li>Select which repositories you'd like this token to have access to (Public, All, or Select)</li>
<li>Create a token with the <code>repo</code> scope ("Full control of private repositories")
<ul>
<li>Alternatively, if working only with public repositories, select only the <code>public_repo</code> scope</li>
</ul>
</li>
<li>Copy the generated token</li>
</ul>
<h3 id="usage-with-claude-desktop"><a class="anchor" aria-hidden="true" tabindex="-1" href="#usage-with-claude-desktop" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Usage with Claude Desktop</h3>
<p>To use this with Claude Desktop, add the following to your <code>claude_desktop_config.json</code>:</p>
<h4 id="docker"><a class="anchor" aria-hidden="true" tabindex="-1" href="#docker" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Docker</h4>
<pre class="language-json"><code class="language-json code-highlight"><span class="code-line"><span class="token punctuation">{</span>
</span><span class="code-line">  <span class="token property">"mcpServers"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">    <span class="token property">"github"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">      <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"docker"</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
</span><span class="code-line">        <span class="token string">"run"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"-i"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"--rm"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"-e"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"GITHUB_PERSONAL_ACCESS_TOKEN"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"mcp/github"</span>
</span><span class="code-line">      <span class="token punctuation">]</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"env"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">        <span class="token property">"GITHUB_PERSONAL_ACCESS_TOKEN"</span><span class="token operator">:</span> <span class="token string">"&lt;YOUR_TOKEN&gt;"</span>
</span><span class="code-line">      <span class="token punctuation">}</span>
</span><span class="code-line">    <span class="token punctuation">}</span>
</span><span class="code-line">  <span class="token punctuation">}</span>
</span><span class="code-line"><span class="token punctuation">}</span>
</span></code><div class="copied" data-code="{
  &quot;mcpServers&quot;: {
    &quot;github&quot;: {
      &quot;command&quot;: &quot;docker&quot;,
      &quot;args&quot;: [
        &quot;run&quot;,
        &quot;-i&quot;,
        &quot;--rm&quot;,
        &quot;-e&quot;,
        &quot;GITHUB_PERSONAL_ACCESS_TOKEN&quot;,
        &quot;mcp/github&quot;
      ],
      &quot;env&quot;: {
        &quot;GITHUB_PERSONAL_ACCESS_TOKEN&quot;: &quot;<YOUR_TOKEN>&quot;
      }
    }
  }
}
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h3 id="npx"><a class="anchor" aria-hidden="true" tabindex="-1" href="#npx" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>NPX</h3>
<pre class="language-json"><code class="language-json code-highlight"><span class="code-line"><span class="token punctuation">{</span>
</span><span class="code-line">  <span class="token property">"mcpServers"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">    <span class="token property">"github"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">      <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"npx"</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
</span><span class="code-line">        <span class="token string">"-y"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"@modelcontextprotocol/server-github"</span>
</span><span class="code-line">      <span class="token punctuation">]</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"env"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">        <span class="token property">"GITHUB_PERSONAL_ACCESS_TOKEN"</span><span class="token operator">:</span> <span class="token string">"&lt;YOUR_TOKEN&gt;"</span>
</span><span class="code-line">      <span class="token punctuation">}</span>
</span><span class="code-line">    <span class="token punctuation">}</span>
</span><span class="code-line">  <span class="token punctuation">}</span>
</span><span class="code-line"><span class="token punctuation">}</span>
</span></code><div class="copied" data-code="{
  &quot;mcpServers&quot;: {
    &quot;github&quot;: {
      &quot;command&quot;: &quot;npx&quot;,
      &quot;args&quot;: [
        &quot;-y&quot;,
        &quot;@modelcontextprotocol/server-github&quot;
      ],
      &quot;env&quot;: {
        &quot;GITHUB_PERSONAL_ACCESS_TOKEN&quot;: &quot;<YOUR_TOKEN>&quot;
      }
    }
  }
}
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h2 id="build"><a class="anchor" aria-hidden="true" tabindex="-1" href="#build" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Build</h2>
<p>Docker build:</p>
<pre class="language-bash"><code class="language-bash code-highlight"><span class="code-line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> mcp/github <span class="token parameter variable">-f</span> src/github/Dockerfile <span class="token builtin class-name">.</span>
</span></code><div class="copied" data-code="docker build -t mcp/github -f src/github/Dockerfile .
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h2 id="license"><a class="anchor" aria-hidden="true" tabindex="-1" href="#license" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>License</h2>
<p>This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.</p></div></div></div></div>`,
    category: ['official'],
    created_at: "2025-04-15T01:27:47.148+00:00",
    description: "Repository management, file operations, and GitHub API integration",
    id: 88888,
    name: "github",
    status: "active",
    tags: "official,mcp",
    title: "github",
    type: "official",
  },
  {
    author_avatar_url: "https://mcp.so/_next/image?url=https%3A%2F%2Fr2.trys.ai%2Fimgs%2Ful08gchu-1742450813135.png&w=48&q=75",
    author_name: "modelcontextprotocol",
    category: ['official'],
    description: "An MCP service designed for deploying HTML content to EdgeOne Pages and obtaining an accessible public URL.",
    id: 88888,
    content:`<div class="rounded-lg border bg-card text-card-foreground shadow-sm"><div class="flex flex-col space-y-1.5 p-6"><div class="text-2xl font-semibold leading-none tracking-tight">Content</div></div><div class="p-6 pt-0"><div data-color-mode="light"><div class="wmde-markdown wmde-markdown-color markdown text-xs"><h1 id="redis"><a class="anchor" aria-hidden="true" tabindex="-1" href="#redis" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Redis</h1>
<p>A Model Context Protocol server that provides access to Redis databases. This server enables LLMs to interact with Redis key-value stores through a set of standardized tools.</p>
<h2 id="components"><a class="anchor" aria-hidden="true" tabindex="-1" href="#components" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Components</h2>
<h3 id="tools"><a class="anchor" aria-hidden="true" tabindex="-1" href="#tools" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Tools</h3>
<ul>
<li>
<p><strong>set</strong></p>
<ul>
<li>Set a Redis key-value pair with optional expiration</li>
<li>Input:
<ul>
<li><code>key</code> (string): Redis key</li>
<li><code>value</code> (string): Value to store</li>
<li><code>expireSeconds</code> (number, optional): Expiration time in seconds</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>get</strong></p>
<ul>
<li>Get value by key from Redis</li>
<li>Input: <code>key</code> (string): Redis key to retrieve</li>
</ul>
</li>
<li>
<p><strong>delete</strong></p>
<ul>
<li>Delete one or more keys from Redis</li>
<li>Input: <code>key</code> (string | string[]): Key or array of keys to delete</li>
</ul>
</li>
<li>
<p><strong>list</strong></p>
<ul>
<li>List Redis keys matching a pattern</li>
<li>Input: <code>pattern</code> (string, optional): Pattern to match keys (default: *)</li>
</ul>
</li>
</ul>
<h2 id="usage-with-claude-desktop"><a class="anchor" aria-hidden="true" tabindex="-1" href="#usage-with-claude-desktop" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Usage with Claude Desktop</h2>
<p>To use this server with the Claude Desktop app, add the following configuration to the "mcpServers" section of your <code>claude_desktop_config.json</code>:</p>
<h3 id="docker"><a class="anchor" aria-hidden="true" tabindex="-1" href="#docker" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Docker</h3>
<ul>
<li>when running docker on macos, use host.docker.internal if the server is running on the host network (eg localhost)</li>
<li>Redis URL can be specified as an argument, defaults to "redis://localhost:6379"</li>
</ul>
<pre class="language-json"><code class="language-json code-highlight"><span class="code-line"><span class="token punctuation">{</span>
</span><span class="code-line">  <span class="token property">"mcpServers"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">    <span class="token property">"redis"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">      <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"docker"</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
</span><span class="code-line">        <span class="token string">"run"</span><span class="token punctuation">,</span> 
</span><span class="code-line">        <span class="token string">"-i"</span><span class="token punctuation">,</span> 
</span><span class="code-line">        <span class="token string">"--rm"</span><span class="token punctuation">,</span> 
</span><span class="code-line">        <span class="token string">"mcp/redis"</span><span class="token punctuation">,</span> 
</span><span class="code-line">        <span class="token string">"redis://host.docker.internal:6379"</span><span class="token punctuation">]</span>
</span><span class="code-line">    <span class="token punctuation">}</span>
</span><span class="code-line">  <span class="token punctuation">}</span>
</span><span class="code-line"><span class="token punctuation">}</span>
</span></code><div class="copied" data-code="{
  &quot;mcpServers&quot;: {
    &quot;redis&quot;: {
      &quot;command&quot;: &quot;docker&quot;,
      &quot;args&quot;: [
        &quot;run&quot;, 
        &quot;-i&quot;, 
        &quot;--rm&quot;, 
        &quot;mcp/redis&quot;, 
        &quot;redis://host.docker.internal:6379&quot;]
    }
  }
}
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h3 id="npx"><a class="anchor" aria-hidden="true" tabindex="-1" href="#npx" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>NPX</h3>
<pre class="language-json"><code class="language-json code-highlight"><span class="code-line"><span class="token punctuation">{</span>
</span><span class="code-line">  <span class="token property">"mcpServers"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">    <span class="token property">"redis"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">      <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"npx"</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
</span><span class="code-line">        <span class="token string">"-y"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"@modelcontextprotocol/server-redis"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"redis://localhost:6379"</span>
</span><span class="code-line">      <span class="token punctuation">]</span>
</span><span class="code-line">    <span class="token punctuation">}</span>
</span><span class="code-line">  <span class="token punctuation">}</span>
</span><span class="code-line"><span class="token punctuation">}</span>
</span></code><div class="copied" data-code="{
  &quot;mcpServers&quot;: {
    &quot;redis&quot;: {
      &quot;command&quot;: &quot;npx&quot;,
      &quot;args&quot;: [
        &quot;-y&quot;,
        &quot;@modelcontextprotocol/server-redis&quot;,
        &quot;redis://localhost:6379&quot;
      ]
    }
  }
}
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h2 id="building"><a class="anchor" aria-hidden="true" tabindex="-1" href="#building" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Building</h2>
<p>Docker:</p>
<pre class="language-sh"><code class="language-sh code-highlight"><span class="code-line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> mcp/redis <span class="token parameter variable">-f</span> src/redis/Dockerfile <span class="token builtin class-name">.</span> 
</span></code><div class="copied" data-code="docker build -t mcp/redis -f src/redis/Dockerfile . 
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h2 id="license"><a class="anchor" aria-hidden="true" tabindex="-1" href="#license" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>License</h2>
<p>This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.</p></div></div></div></div>`,
    name: "Redis",
    status: "active",
    tags: "database,redis",
    title: "Redis",
    type: "official",
  },
  {
    author_avatar_url: "https://mcp.so/_next/image?url=https%3A%2F%2Fr2.trys.ai%2Fimgs%2F2vyqphp5g-1742442281770.png&w=48&q=75",
    author_name: "modelcontextprotocol",
    category: ['official'],
    content:`<div class="rounded-lg border bg-card text-card-foreground shadow-sm"><div class="flex flex-col space-y-1.5 p-6"><div class="text-2xl font-semibold leading-none tracking-tight">Content</div></div><div class="p-6 pt-0"><div data-color-mode="light"><div class="wmde-markdown wmde-markdown-color markdown text-xs"><h1 id="aws-knowledge-base-retrieval-mcp-server"><a class="anchor" aria-hidden="true" tabindex="-1" href="#aws-knowledge-base-retrieval-mcp-server" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>AWS Knowledge Base Retrieval MCP Server</h1>
<p>An MCP server implementation for retrieving information from the AWS Knowledge Base using the Bedrock Agent Runtime.</p>
<h2 id="features"><a class="anchor" aria-hidden="true" tabindex="-1" href="#features" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Features</h2>
<ul>
<li><strong>RAG (Retrieval-Augmented Generation)</strong>: Retrieve context from the AWS Knowledge Base based on a query and a Knowledge Base ID.</li>
<li><strong>Supports multiple results retrieval</strong>: Option to retrieve a customizable number of results.</li>
</ul>
<h2 id="tools"><a class="anchor" aria-hidden="true" tabindex="-1" href="#tools" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Tools</h2>
<ul>
<li><strong>retrieve_from_aws_kb</strong>
<ul>
<li>Perform retrieval operations using the AWS Knowledge Base.</li>
<li>Inputs:
<ul>
<li><code>query</code> (string): The search query for retrieval.</li>
<li><code>knowledgeBaseId</code> (string): The ID of the AWS Knowledge Base.</li>
<li><code>n</code> (number, optional): Number of results to retrieve (default: 3).</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="configuration"><a class="anchor" aria-hidden="true" tabindex="-1" href="#configuration" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Configuration</h2>
<h3 id="setting-up-aws-credentials"><a class="anchor" aria-hidden="true" tabindex="-1" href="#setting-up-aws-credentials" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Setting up AWS Credentials</h3>
<ol>
<li>Obtain AWS access key ID, secret access key, and region from the AWS Management Console.</li>
<li>Ensure these credentials have appropriate permissions for Bedrock Agent Runtime operations.</li>
</ol>
<h3 id="usage-with-claude-desktop"><a class="anchor" aria-hidden="true" tabindex="-1" href="#usage-with-claude-desktop" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Usage with Claude Desktop</h3>
<p>Add this to your <code>claude_desktop_config.json</code>:</p>
<h4 id="docker"><a class="anchor" aria-hidden="true" tabindex="-1" href="#docker" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Docker</h4>
<pre class="language-json"><code class="language-json code-highlight"><span class="code-line"><span class="token punctuation">{</span>
</span><span class="code-line">  <span class="token property">"mcpServers"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">    <span class="token property">"aws-kb-retrieval"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">      <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"docker"</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">"run"</span><span class="token punctuation">,</span> <span class="token string">"-i"</span><span class="token punctuation">,</span> <span class="token string">"--rm"</span><span class="token punctuation">,</span> <span class="token string">"-e"</span><span class="token punctuation">,</span> <span class="token string">"AWS_ACCESS_KEY_ID"</span><span class="token punctuation">,</span> <span class="token string">"-e"</span><span class="token punctuation">,</span> <span class="token string">"AWS_SECRET_ACCESS_KEY"</span><span class="token punctuation">,</span> <span class="token string">"-e"</span><span class="token punctuation">,</span> <span class="token string">"AWS_REGION"</span><span class="token punctuation">,</span> <span class="token string">"mcp/aws-kb-retrieval-server"</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"env"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">        <span class="token property">"AWS_ACCESS_KEY_ID"</span><span class="token operator">:</span> <span class="token string">"YOUR_ACCESS_KEY_HERE"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token property">"AWS_SECRET_ACCESS_KEY"</span><span class="token operator">:</span> <span class="token string">"YOUR_SECRET_ACCESS_KEY_HERE"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token property">"AWS_REGION"</span><span class="token operator">:</span> <span class="token string">"YOUR_AWS_REGION_HERE"</span>
</span><span class="code-line">      <span class="token punctuation">}</span>
</span><span class="code-line">    <span class="token punctuation">}</span>
</span><span class="code-line">  <span class="token punctuation">}</span>
</span><span class="code-line"><span class="token punctuation">}</span>
</span></code><div class="copied" data-code="{
  &quot;mcpServers&quot;: {
    &quot;aws-kb-retrieval&quot;: {
      &quot;command&quot;: &quot;docker&quot;,
      &quot;args&quot;: [ &quot;run&quot;, &quot;-i&quot;, &quot;--rm&quot;, &quot;-e&quot;, &quot;AWS_ACCESS_KEY_ID&quot;, &quot;-e&quot;, &quot;AWS_SECRET_ACCESS_KEY&quot;, &quot;-e&quot;, &quot;AWS_REGION&quot;, &quot;mcp/aws-kb-retrieval-server&quot; ],
      &quot;env&quot;: {
        &quot;AWS_ACCESS_KEY_ID&quot;: &quot;YOUR_ACCESS_KEY_HERE&quot;,
        &quot;AWS_SECRET_ACCESS_KEY&quot;: &quot;YOUR_SECRET_ACCESS_KEY_HERE&quot;,
        &quot;AWS_REGION&quot;: &quot;YOUR_AWS_REGION_HERE&quot;
      }
    }
  }
}
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<pre class="language-json"><code class="language-json code-highlight"><span class="code-line"><span class="token punctuation">{</span>
</span><span class="code-line">  <span class="token property">"mcpServers"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">    <span class="token property">"aws-kb-retrieval"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">      <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"npx"</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
</span><span class="code-line">        <span class="token string">"-y"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"@modelcontextprotocol/server-aws-kb-retrieval"</span>
</span><span class="code-line">      <span class="token punctuation">]</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"env"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">        <span class="token property">"AWS_ACCESS_KEY_ID"</span><span class="token operator">:</span> <span class="token string">"YOUR_ACCESS_KEY_HERE"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token property">"AWS_SECRET_ACCESS_KEY"</span><span class="token operator">:</span> <span class="token string">"YOUR_SECRET_ACCESS_KEY_HERE"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token property">"AWS_REGION"</span><span class="token operator">:</span> <span class="token string">"YOUR_AWS_REGION_HERE"</span>
</span><span class="code-line">      <span class="token punctuation">}</span>
</span><span class="code-line">    <span class="token punctuation">}</span>
</span><span class="code-line">  <span class="token punctuation">}</span>
</span><span class="code-line"><span class="token punctuation">}</span>
</span></code><div class="copied" data-code="{
  &quot;mcpServers&quot;: {
    &quot;aws-kb-retrieval&quot;: {
      &quot;command&quot;: &quot;npx&quot;,
      &quot;args&quot;: [
        &quot;-y&quot;,
        &quot;@modelcontextprotocol/server-aws-kb-retrieval&quot;
      ],
      &quot;env&quot;: {
        &quot;AWS_ACCESS_KEY_ID&quot;: &quot;YOUR_ACCESS_KEY_HERE&quot;,
        &quot;AWS_SECRET_ACCESS_KEY&quot;: &quot;YOUR_SECRET_ACCESS_KEY_HERE&quot;,
        &quot;AWS_REGION&quot;: &quot;YOUR_AWS_REGION_HERE&quot;
      }
    }
  }
}
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h2 id="building"><a class="anchor" aria-hidden="true" tabindex="-1" href="#building" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Building</h2>
<p>Docker:</p>
<pre class="language-sh"><code class="language-sh code-highlight"><span class="code-line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> mcp/aws-kb-retrieval <span class="token parameter variable">-f</span> src/aws-kb-retrieval-server/Dockerfile <span class="token builtin class-name">.</span> 
</span></code><div class="copied" data-code="docker build -t mcp/aws-kb-retrieval -f src/aws-kb-retrieval-server/Dockerfile . 
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h2 id="license"><a class="anchor" aria-hidden="true" tabindex="-1" href="#license" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>License</h2>
<p>This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.</p>
<p>This README assumes that your server package is named <code>@modelcontextprotocol/server-aws-kb-retrieval</code>. Adjust the package name and installation details if they differ in your setup. Also, ensure that your server script is correctly built and that all dependencies are properly managed in your <code>package.json</code>.</p></div></div></div></div>`,
    description: "An MCP server implementation for retrieving information from the AWS Knowledge Base using the Bedrock Agent Runtime.",
    id: 88888,
    is_featured: true,
    name: "Aws Kb Retrieval Server",
    sort: 1,
    status: "active",
    tags: "aws-kb-retrieval,mcp",
    title: "Aws Kb Retrieval Server",
    type: "official",
  },
  {
    author_avatar_url: "https://mcp.so/_next/image?url=https%3A%2F%2Fr2.trys.ai%2Fimgs%2F33zouerce-1741876955447.png&w=48&q=75",
    author_name: "modelcontextprotocol",
    category: ['official'],
    content:`<div class="rounded-lg border bg-card text-card-foreground shadow-sm"><div class="flex flex-col space-y-1.5 p-6"><div class="text-2xl font-semibold leading-none tracking-tight">Content</div></div><div class="p-6 pt-0"><div data-color-mode="light"><div class="wmde-markdown wmde-markdown-color markdown text-xs"><h1 id="sequential-thinking-mcp-server"><a class="anchor" aria-hidden="true" tabindex="-1" href="#sequential-thinking-mcp-server" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Sequential Thinking MCP Server</h1>
<p>An MCP server implementation that provides a tool for dynamic and reflective problem-solving through a structured thinking process.</p>
<h2 id="features"><a class="anchor" aria-hidden="true" tabindex="-1" href="#features" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Features</h2>
<ul>
<li>Break down complex problems into manageable steps</li>
<li>Revise and refine thoughts as understanding deepens</li>
<li>Branch into alternative paths of reasoning</li>
<li>Adjust the total number of thoughts dynamically</li>
<li>Generate and verify solution hypotheses</li>
</ul>
<h2 id="tool"><a class="anchor" aria-hidden="true" tabindex="-1" href="#tool" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Tool</h2>
<h3 id="sequential_thinking"><a class="anchor" aria-hidden="true" tabindex="-1" href="#sequential_thinking" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>sequential_thinking</h3>
<p>Facilitates a detailed, step-by-step thinking process for problem-solving and analysis.</p>
<p><strong>Inputs:</strong></p>
<ul>
<li><code>thought</code> (string): The current thinking step</li>
<li><code>nextThoughtNeeded</code> (boolean): Whether another thought step is needed</li>
<li><code>thoughtNumber</code> (integer): Current thought number</li>
<li><code>totalThoughts</code> (integer): Estimated total thoughts needed</li>
<li><code>isRevision</code> (boolean, optional): Whether this revises previous thinking</li>
<li><code>revisesThought</code> (integer, optional): Which thought is being reconsidered</li>
<li><code>branchFromThought</code> (integer, optional): Branching point thought number</li>
<li><code>branchId</code> (string, optional): Branch identifier</li>
<li><code>needsMoreThoughts</code> (boolean, optional): If more thoughts are needed</li>
</ul>
<h2 id="usage"><a class="anchor" aria-hidden="true" tabindex="-1" href="#usage" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Usage</h2>
<p>The Sequential Thinking tool is designed for:</p>
<ul>
<li>Breaking down complex problems into steps</li>
<li>Planning and design with room for revision</li>
<li>Analysis that might need course correction</li>
<li>Problems where the full scope might not be clear initially</li>
<li>Tasks that need to maintain context over multiple steps</li>
<li>Situations where irrelevant information needs to be filtered out</li>
</ul>
<h2 id="configuration"><a class="anchor" aria-hidden="true" tabindex="-1" href="#configuration" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Configuration</h2>
<h3 id="usage-with-claude-desktop"><a class="anchor" aria-hidden="true" tabindex="-1" href="#usage-with-claude-desktop" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Usage with Claude Desktop</h3>
<p>Add this to your <code>claude_desktop_config.json</code>:</p>
<h4 id="npx"><a class="anchor" aria-hidden="true" tabindex="-1" href="#npx" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>npx</h4>
<pre class="language-json"><code class="language-json code-highlight"><span class="code-line"><span class="token punctuation">{</span>
</span><span class="code-line">  <span class="token property">"mcpServers"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">    <span class="token property">"sequential-thinking"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">      <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"npx"</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
</span><span class="code-line">        <span class="token string">"-y"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"@modelcontextprotocol/server-sequential-thinking"</span>
</span><span class="code-line">      <span class="token punctuation">]</span>
</span><span class="code-line">    <span class="token punctuation">}</span>
</span><span class="code-line">  <span class="token punctuation">}</span>
</span><span class="code-line"><span class="token punctuation">}</span>
</span></code><div class="copied" data-code="{
  &quot;mcpServers&quot;: {
    &quot;sequential-thinking&quot;: {
      &quot;command&quot;: &quot;npx&quot;,
      &quot;args&quot;: [
        &quot;-y&quot;,
        &quot;@modelcontextprotocol/server-sequential-thinking&quot;
      ]
    }
  }
}
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h4 id="docker"><a class="anchor" aria-hidden="true" tabindex="-1" href="#docker" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>docker</h4>
<pre class="language-json"><code class="language-json code-highlight"><span class="code-line"><span class="token punctuation">{</span>
</span><span class="code-line">  <span class="token property">"mcpServers"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">    <span class="token property">"sequentialthinking"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">      <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"docker"</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
</span><span class="code-line">        <span class="token string">"run"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"--rm"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"-i"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"mcp/sequentialthinking"</span>
</span><span class="code-line">      <span class="token punctuation">]</span>
</span><span class="code-line">    <span class="token punctuation">}</span>
</span><span class="code-line">  <span class="token punctuation">}</span>
</span><span class="code-line"><span class="token punctuation">}</span>
</span></code><div class="copied" data-code="{
  &quot;mcpServers&quot;: {
    &quot;sequentialthinking&quot;: {
      &quot;command&quot;: &quot;docker&quot;,
      &quot;args&quot;: [
        &quot;run&quot;,
        &quot;--rm&quot;,
        &quot;-i&quot;,
        &quot;mcp/sequentialthinking&quot;
      ]
    }
  }
}
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h2 id="building"><a class="anchor" aria-hidden="true" tabindex="-1" href="#building" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Building</h2>
<p>Docker:</p>
<pre class="language-bash"><code class="language-bash code-highlight"><span class="code-line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> mcp/sequentialthinking <span class="token parameter variable">-f</span> src/sequentialthinking/Dockerfile <span class="token builtin class-name">.</span>
</span></code><div class="copied" data-code="docker build -t mcp/sequentialthinking -f src/sequentialthinking/Dockerfile .
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h2 id="license"><a class="anchor" aria-hidden="true" tabindex="-1" href="#license" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>License</h2>
<p>This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.</p></div></div></div></div>`,
    description: "An MCP server implementation that provides a tool for dynamic and reflective problem-solving through a structured thinking process.",
    id: 88888,
    is_featured: true,
    name: "Sequential Thinking",
    sort: 1,
    status: "active",
    tags: "sequentialthinking,mcp",
    title: "Sequential Thinking",
    type: "official",
  },{
    author_avatar_url: "https://mcp.so/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F135057108%3Fv%3D4&w=48&q=75",
    author_name: "mendableai",
    category: ['official'],
    content:`<div class="rounded-lg border bg-card text-card-foreground shadow-sm"><div class="flex flex-col space-y-1.5 p-6"><div class="text-2xl font-semibold leading-none tracking-tight">Overview</div></div><div class="p-6 pt-0"><div data-color-mode="light"><div class="wmde-markdown wmde-markdown-color markdown text-xs"><h2 id="what-is-firecrawl-mcp-server"><a class="anchor" aria-hidden="true" tabindex="-1" href="#what-is-firecrawl-mcp-server" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>What is Firecrawl MCP Server?</h2>
<p>Firecrawl MCP Server is an implementation of the Model Context Protocol (MCP) that enhances web scraping capabilities for various LLM clients, including Cursor and Claude.</p>
<h2 id="how-to-use-firecrawl-mcp-server"><a class="anchor" aria-hidden="true" tabindex="-1" href="#how-to-use-firecrawl-mcp-server" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>How to use Firecrawl MCP Server?</h2>
<p>To use the Firecrawl MCP Server, you can run it using npx or install it manually via npm. Configuration is required to set up the API key and other environment variables.</p>
<h2 id="key-features-of-firecrawl-mcp-server"><a class="anchor" aria-hidden="true" tabindex="-1" href="#key-features-of-firecrawl-mcp-server" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Key features of Firecrawl MCP Server?</h2>
<ul>
<li>Powerful web scraping with JavaScript rendering support</li>
<li>Automatic retries with exponential backoff</li>
<li>Efficient batch processing with rate limiting</li>
<li>Comprehensive logging and credit usage monitoring</li>
<li>Support for both cloud and self-hosted instances</li>
</ul>
<h2 id="use-cases-of-firecrawl-mcp-server"><a class="anchor" aria-hidden="true" tabindex="-1" href="#use-cases-of-firecrawl-mcp-server" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Use cases of Firecrawl MCP Server?</h2>
<ol>
<li>Scraping content from websites for data analysis</li>
<li>Automating data collection for research purposes</li>
<li>Extracting structured information from web pages using LLM capabilities</li>
</ol>
<h2 id="faq-from-firecrawl-mcp-server"><a class="anchor" aria-hidden="true" tabindex="-1" href="#faq-from-firecrawl-mcp-server" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>FAQ from Firecrawl MCP Server?</h2>
<ul>
<li>Can I use Firecrawl MCP Server for any website?</li>
</ul>
<blockquote>
<p>Yes, as long as the website allows scraping, you can use Firecrawl MCP Server to extract data.</p>
</blockquote>
<ul>
<li>Is there a limit to the number of requests I can make?</li>
</ul>
<blockquote>
<p>Yes, there are rate limits in place to prevent overwhelming the server, but you can configure these settings.</p>
</blockquote>
<ul>
<li>How do I monitor my credit usage?</li>
</ul>
<blockquote>
<p>The server includes a credit usage monitoring feature that alerts you when you reach specified thresholds.</p>
</blockquote></div></div></div></div>`,
    description: "Official Firecrawl MCP Server - Adds powerful web scraping to Cursor, Claude and any other LLM clients.",
    id: 88888,
    is_featured: true,
    name: "Firecrawl MCP Server",
    sort: 1,
    status: "active",
    tags: "web-crawler,mcp",
    title: "Firecrawl MCP Server",
    type: "official",
  },{
    author_avatar_url: "https://mcp.so/_next/image?url=https%3A%2F%2Fr2.trys.ai%2Fimgs%2F3agh2zflb-1733450118163.png&w=48&q=75",
    author_name: "modelcontextprotocol",
    category: ['official'],
    content:`<div class="rounded-lg border bg-card text-card-foreground shadow-sm"><div class="flex flex-col space-y-1.5 p-6"><div class="text-2xl font-semibold leading-none tracking-tight">Overview</div></div><div class="p-6 pt-0"><div data-color-mode="light"><div class="wmde-markdown wmde-markdown-color markdown text-xs"><h2 id="what-is-sentry"><a class="anchor" aria-hidden="true" tabindex="-1" href="#what-is-sentry" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>what is Sentry?</h2>
<p>Sentry is a Model Context Protocol server designed for retrieving and analyzing issues from Sentry.io. It enables developers to inspect error reports, stack traces, and debugging information efficiently.</p>
<h2 id="how-to-use-sentry"><a class="anchor" aria-hidden="true" tabindex="-1" href="#how-to-use-sentry" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>how to use Sentry?</h2>
<p>To use Sentry, install it via pip or the recommended uv tool, set your Sentry authentication token, and invoke it through command line or integration in development environments like Claude Desktop or Zed.</p>
<h2 id="key-features-of-sentry"><a class="anchor" aria-hidden="true" tabindex="-1" href="#key-features-of-sentry" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>key features of Sentry?</h2>
<ul>
<li>Retrieve and analyze Sentry issues by ID or URL.</li>
<li>Detailed insights into issue including title, status, timestamps, and stack traces.</li>
<li>Support for debugging with the MCP inspector.</li>
</ul>
<h2 id="use-cases-of-sentry"><a class="anchor" aria-hidden="true" tabindex="-1" href="#use-cases-of-sentry" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>use cases of Sentry?</h2>
<ol>
<li>Analyzing application errors in real-time.</li>
<li>Retrieving historical error reports for diagnostics.</li>
<li>Debugging and improving application reliability by inspecting stack traces.</li>
</ol>
<h2 id="faq-from-sentry"><a class="anchor" aria-hidden="true" tabindex="-1" href="#faq-from-sentry" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>FAQ from Sentry?</h2>
<ul>
<li>How do I install Sentry?</li>
</ul>
<blockquote>
<p>You can install Sentry via pip using the command 'pip install mcp-server-sentry' or by using the uv tool.</p>
</blockquote>
<ul>
<li>What programming languages does Sentry support?</li>
</ul>
<blockquote>
<p>Sentry can be used with any programming language that can communicate with Sentry.io, as it primarily retrieves data from the Sentry API.</p>
</blockquote>
<ul>
<li>Is there support for multiple Sentry projects?</li>
</ul>
<blockquote>
<p>Yes, Sentry can handle multiple projects as long as you provide the corresponding authentication token for each project.</p>
</blockquote></div></div></div></div>`,
    description: "Retrieving and analyzing issues from Sentry.io",
    id: 88888,
    is_featured: true,
    name: "Sentry",
    sort: 1,
    status: "active",
    tags: "sentry,mcp",
    title: "Sentry",
    type: "official",
  },{
    author_avatar_url: "https://mcp.so/_next/image?url=https%3A%2F%2Fr2.trys.ai%2Fimgs%2F1yqvdha3j-1733449620948.png&w=48&q=75",
    author_name: "modelcontextprotocol",
    category: ['official'],
    content:`<div class="p-6 pt-0"><div data-color-mode="light"><div class="wmde-markdown wmde-markdown-color markdown text-xs"><h1 id="gitlab-mcp-server"><a class="anchor" aria-hidden="true" tabindex="-1" href="#gitlab-mcp-server" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>GitLab MCP Server</h1>
<p>MCP Server for the GitLab API, enabling project management, file operations, and more.</p>
<h3 id="features"><a class="anchor" aria-hidden="true" tabindex="-1" href="#features" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Features</h3>
<ul>
<li><strong>Automatic Branch Creation</strong>: When creating/updating files or pushing changes, branches are automatically created if they don't exist</li>
<li><strong>Comprehensive Error Handling</strong>: Clear error messages for common issues</li>
<li><strong>Git History Preservation</strong>: Operations maintain proper Git history without force pushing</li>
<li><strong>Batch Operations</strong>: Support for both single-file and multi-file operations</li>
</ul>
<h2 id="tools"><a class="anchor" aria-hidden="true" tabindex="-1" href="#tools" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Tools</h2>
<ol>
<li>
<p><code>create_or_update_file</code></p>
<ul>
<li>Create or update a single file in a project</li>
<li>Inputs:
<ul>
<li><code>project_id</code> (string): Project ID or URL-encoded path</li>
<li><code>file_path</code> (string): Path where to create/update the file</li>
<li><code>content</code> (string): Content of the file</li>
<li><code>commit_message</code> (string): Commit message</li>
<li><code>branch</code> (string): Branch to create/update the file in</li>
<li><code>previous_path</code> (optional string): Path of the file to move/rename</li>
</ul>
</li>
<li>Returns: File content and commit details</li>
</ul>
</li>
<li>
<p><code>push_files</code></p>
<ul>
<li>Push multiple files in a single commit</li>
<li>Inputs:
<ul>
<li><code>project_id</code> (string): Project ID or URL-encoded path</li>
<li><code>branch</code> (string): Branch to push to</li>
<li><code>files</code> (array): Files to push, each with <code>file_path</code> and <code>content</code></li>
<li><code>commit_message</code> (string): Commit message</li>
</ul>
</li>
<li>Returns: Updated branch reference</li>
</ul>
</li>
<li>
<p><code>search_repositories</code></p>
<ul>
<li>Search for GitLab projects</li>
<li>Inputs:
<ul>
<li><code>search</code> (string): Search query</li>
<li><code>page</code> (optional number): Page number for pagination</li>
<li><code>per_page</code> (optional number): Results per page (default 20)</li>
</ul>
</li>
<li>Returns: Project search results</li>
</ul>
</li>
<li>
<p><code>create_repository</code></p>
<ul>
<li>Create a new GitLab project</li>
<li>Inputs:
<ul>
<li><code>name</code> (string): Project name</li>
<li><code>description</code> (optional string): Project description</li>
<li><code>visibility</code> (optional string): 'private', 'internal', or 'public'</li>
<li><code>initialize_with_readme</code> (optional boolean): Initialize with README</li>
</ul>
</li>
<li>Returns: Created project details</li>
</ul>
</li>
<li>
<p><code>get_file_contents</code></p>
<ul>
<li>Get contents of a file or directory</li>
<li>Inputs:
<ul>
<li><code>project_id</code> (string): Project ID or URL-encoded path</li>
<li><code>file_path</code> (string): Path to file/directory</li>
<li><code>ref</code> (optional string): Branch/tag/commit to get contents from</li>
</ul>
</li>
<li>Returns: File/directory contents</li>
</ul>
</li>
<li>
<p><code>create_issue</code></p>
<ul>
<li>Create a new issue</li>
<li>Inputs:
<ul>
<li><code>project_id</code> (string): Project ID or URL-encoded path</li>
<li><code>title</code> (string): Issue title</li>
<li><code>description</code> (optional string): Issue description</li>
<li><code>assignee_ids</code> (optional number[]): User IDs to assign</li>
<li><code>labels</code> (optional string[]): Labels to add</li>
<li><code>milestone_id</code> (optional number): Milestone ID</li>
</ul>
</li>
<li>Returns: Created issue details</li>
</ul>
</li>
<li>
<p><code>create_merge_request</code></p>
<ul>
<li>Create a new merge request</li>
<li>Inputs:
<ul>
<li><code>project_id</code> (string): Project ID or URL-encoded path</li>
<li><code>title</code> (string): MR title</li>
<li><code>description</code> (optional string): MR description</li>
<li><code>source_branch</code> (string): Branch containing changes</li>
<li><code>target_branch</code> (string): Branch to merge into</li>
<li><code>draft</code> (optional boolean): Create as draft MR</li>
<li><code>allow_collaboration</code> (optional boolean): Allow commits from upstream members</li>
</ul>
</li>
<li>Returns: Created merge request details</li>
</ul>
</li>
<li>
<p><code>fork_repository</code></p>
<ul>
<li>Fork a project</li>
<li>Inputs:
<ul>
<li><code>project_id</code> (string): Project ID or URL-encoded path</li>
<li><code>namespace</code> (optional string): Namespace to fork to</li>
</ul>
</li>
<li>Returns: Forked project details</li>
</ul>
</li>
<li>
<p><code>create_branch</code></p>
<ul>
<li>Create a new branch</li>
<li>Inputs:
<ul>
<li><code>project_id</code> (string): Project ID or URL-encoded path</li>
<li><code>branch</code> (string): Name for new branch</li>
<li><code>ref</code> (optional string): Source branch/commit for new branch</li>
</ul>
</li>
<li>Returns: Created branch reference</li>
</ul>
</li>
</ol>
<h2 id="setup"><a class="anchor" aria-hidden="true" tabindex="-1" href="#setup" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Setup</h2>
<h3 id="personal-access-token"><a class="anchor" aria-hidden="true" tabindex="-1" href="#personal-access-token" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Personal Access Token</h3>
<p><a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow">Create a GitLab Personal Access Token</a> with appropriate permissions:</p>
<ul>
<li>Go to User Settings &gt; Access Tokens in GitLab</li>
<li>Select the required scopes:
<ul>
<li><code>api</code> for full API access</li>
<li><code>read_api</code> for read-only access</li>
<li><code>read_repository</code> and <code>write_repository</code> for repository operations</li>
</ul>
</li>
<li>Create the token and save it securely</li>
</ul>
<h3 id="usage-with-claude-desktop"><a class="anchor" aria-hidden="true" tabindex="-1" href="#usage-with-claude-desktop" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Usage with Claude Desktop</h3>
<p>Add the following to your <code>claude_desktop_config.json</code>:</p>
<h4 id="docker"><a class="anchor" aria-hidden="true" tabindex="-1" href="#docker" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Docker</h4>
<pre class="language-json"><code class="language-json code-highlight hljs" data-highlighted="yes"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">"mcpServers"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> 
    <span class="hljs-attr">"gitlab"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">"command"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"docker"</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">"args"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">"run"</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">"--rm"</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">"-i"</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">"-e"</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">"GITLAB_PERSONAL_ACCESS_TOKEN"</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">"-e"</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">"GITLAB_API_URL"</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">"mcp/gitlab"</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">"env"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">"GITLAB_PERSONAL_ACCESS_TOKEN"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"&lt;YOUR_TOKEN&gt;"</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">"GITLAB_API_URL"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"https://gitlab.com/api/v4"</span> <span class="hljs-comment">// Optional, for self-hosted instances</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code><div class="copied" data-code="{
  &quot;mcpServers&quot;: { 
    &quot;gitlab&quot;: {
      &quot;command&quot;: &quot;docker&quot;,
      &quot;args&quot;: [
        &quot;run&quot;,
        &quot;--rm&quot;,
        &quot;-i&quot;,
        &quot;-e&quot;,
        &quot;GITLAB_PERSONAL_ACCESS_TOKEN&quot;,
        &quot;-e&quot;,
        &quot;GITLAB_API_URL&quot;,
        &quot;mcp/gitlab&quot;
      ],
      &quot;env&quot;: {
        &quot;GITLAB_PERSONAL_ACCESS_TOKEN&quot;: &quot;<YOUR_TOKEN>&quot;,
        &quot;GITLAB_API_URL&quot;: &quot;https://gitlab.com/api/v4&quot; // Optional, for self-hosted instances
      }
    }
  }
}
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h3 id="npx"><a class="anchor" aria-hidden="true" tabindex="-1" href="#npx" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>NPX</h3>
<pre class="language-json"><code class="language-json code-highlight hljs" data-highlighted="yes"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">"mcpServers"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">"gitlab"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">"command"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"npx"</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">"args"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">"-y"</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">"@modelcontextprotocol/server-gitlab"</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">"env"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">"GITLAB_PERSONAL_ACCESS_TOKEN"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"&lt;YOUR_TOKEN&gt;"</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">"GITLAB_API_URL"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"https://gitlab.com/api/v4"</span> <span class="hljs-comment">// Optional, for self-hosted instances</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code><div class="copied" data-code="{
  &quot;mcpServers&quot;: {
    &quot;gitlab&quot;: {
      &quot;command&quot;: &quot;npx&quot;,
      &quot;args&quot;: [
        &quot;-y&quot;,
        &quot;@modelcontextprotocol/server-gitlab&quot;
      ],
      &quot;env&quot;: {
        &quot;GITLAB_PERSONAL_ACCESS_TOKEN&quot;: &quot;<YOUR_TOKEN>&quot;,
        &quot;GITLAB_API_URL&quot;: &quot;https://gitlab.com/api/v4&quot; // Optional, for self-hosted instances
      }
    }
  }
}
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h2 id="build"><a class="anchor" aria-hidden="true" tabindex="-1" href="#build" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Build</h2>
<p>Docker build:</p>
<pre class="language-bash"><code class="language-bash code-highlight hljs" data-highlighted="yes">docker build -t vonwig/gitlab:mcp -f src/gitlab/Dockerfile .
</code><div class="copied" data-code="docker build -t vonwig/gitlab:mcp -f src/gitlab/Dockerfile .
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h2 id="environment-variables"><a class="anchor" aria-hidden="true" tabindex="-1" href="#environment-variables" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Environment Variables</h2>
<ul>
<li><code>GITLAB_PERSONAL_ACCESS_TOKEN</code>: Your GitLab personal access token (required)</li>
<li><code>GITLAB_API_URL</code>: Base URL for GitLab API (optional, defaults to <code>https://gitlab.com/api/v4</code>)</li>
</ul>
<h2 id="license"><a class="anchor" aria-hidden="true" tabindex="-1" href="#license" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>License</h2>
<p>This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.</p></div></div></div>`,
    description: "GitLab API, enabling project management",
    id: 88888,
    is_featured: true,
    name: "GitLab",
    sort: 1,
    status: "active",
    tags: "gitLab,mcp",
    title: "GitLab",
    type: "official",
  },{
    author_avatar_url: "https://mcp.so/_next/image?url=https%3A%2F%2Fr2.trys.ai%2Fimgs%2F3e6b71g5l-1733450233614.png&w=48&q=75",
    author_name: "modelcontextprotocol",
    category: ['official'],
    content:`<div class="p-6 pt-0"><div data-color-mode="light"><div class="wmde-markdown wmde-markdown-color markdown text-xs"><h1 id="slack-mcp-server"><a class="anchor" aria-hidden="true" tabindex="-1" href="#slack-mcp-server" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Slack MCP Server</h1>
<p>MCP Server for the Slack API, enabling Claude to interact with Slack workspaces.</p>
<h2 id="tools"><a class="anchor" aria-hidden="true" tabindex="-1" href="#tools" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Tools</h2>
<ol>
<li>
<p><code>slack_list_channels</code></p>
<ul>
<li>List public channels in the workspace</li>
<li>Optional inputs:
<ul>
<li><code>limit</code> (number, default: 100, max: 200): Maximum number of channels to return</li>
<li><code>cursor</code> (string): Pagination cursor for next page</li>
</ul>
</li>
<li>Returns: List of channels with their IDs and information</li>
</ul>
</li>
<li>
<p><code>slack_post_message</code></p>
<ul>
<li>Post a new message to a Slack channel</li>
<li>Required inputs:
<ul>
<li><code>channel_id</code> (string): The ID of the channel to post to</li>
<li><code>text</code> (string): The message text to post</li>
</ul>
</li>
<li>Returns: Message posting confirmation and timestamp</li>
</ul>
</li>
<li>
<p><code>slack_reply_to_thread</code></p>
<ul>
<li>Reply to a specific message thread</li>
<li>Required inputs:
<ul>
<li><code>channel_id</code> (string): The channel containing the thread</li>
<li><code>thread_ts</code> (string): Timestamp of the parent message</li>
<li><code>text</code> (string): The reply text</li>
</ul>
</li>
<li>Returns: Reply confirmation and timestamp</li>
</ul>
</li>
<li>
<p><code>slack_add_reaction</code></p>
<ul>
<li>Add an emoji reaction to a message</li>
<li>Required inputs:
<ul>
<li><code>channel_id</code> (string): The channel containing the message</li>
<li><code>timestamp</code> (string): Message timestamp to react to</li>
<li><code>reaction</code> (string): Emoji name without colons</li>
</ul>
</li>
<li>Returns: Reaction confirmation</li>
</ul>
</li>
<li>
<p><code>slack_get_channel_history</code></p>
<ul>
<li>Get recent messages from a channel</li>
<li>Required inputs:
<ul>
<li><code>channel_id</code> (string): The channel ID</li>
</ul>
</li>
<li>Optional inputs:
<ul>
<li><code>limit</code> (number, default: 10): Number of messages to retrieve</li>
</ul>
</li>
<li>Returns: List of messages with their content and metadata</li>
</ul>
</li>
<li>
<p><code>slack_get_thread_replies</code></p>
<ul>
<li>Get all replies in a message thread</li>
<li>Required inputs:
<ul>
<li><code>channel_id</code> (string): The channel containing the thread</li>
<li><code>thread_ts</code> (string): Timestamp of the parent message</li>
</ul>
</li>
<li>Returns: List of replies with their content and metadata</li>
</ul>
</li>
<li>
<p><code>slack_get_users</code></p>
<ul>
<li>Get list of workspace users with basic profile information</li>
<li>Optional inputs:
<ul>
<li><code>cursor</code> (string): Pagination cursor for next page</li>
<li><code>limit</code> (number, default: 100, max: 200): Maximum users to return</li>
</ul>
</li>
<li>Returns: List of users with their basic profiles</li>
</ul>
</li>
<li>
<p><code>slack_get_user_profile</code></p>
<ul>
<li>Get detailed profile information for a specific user</li>
<li>Required inputs:
<ul>
<li><code>user_id</code> (string): The user's ID</li>
</ul>
</li>
<li>Returns: Detailed user profile information</li>
</ul>
</li>
</ol>
<h2 id="setup"><a class="anchor" aria-hidden="true" tabindex="-1" href="#setup" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Setup</h2>
<ol>
<li>
<p>Create a Slack App:</p>
<ul>
<li>Visit the <a href="https://api.slack.com/apps" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow">Slack Apps page</a></li>
<li>Click "Create New App"</li>
<li>Choose "From scratch"</li>
<li>Name your app and select your workspace</li>
</ul>
</li>
<li>
<p>Configure Bot Token Scopes:
Navigate to "OAuth &amp; Permissions" and add these scopes:</p>
<ul>
<li><code>channels:history</code> - View messages and other content in public channels</li>
<li><code>channels:read</code> - View basic channel information</li>
<li><code>chat:write</code> - Send messages as the app</li>
<li><code>reactions:write</code> - Add emoji reactions to messages</li>
<li><code>users:read</code> - View users and their basic information</li>
</ul>
</li>
<li>
<p>Install App to Workspace:</p>
<ul>
<li>Click "Install to Workspace" and authorize the app</li>
<li>Save the "Bot User OAuth Token" that starts with <code>xoxb-</code></li>
</ul>
</li>
<li>
<p>Get your Team ID (starts with a <code>T</code>) by following <a href="https://slack.com/help/articles/221769328-Locate-your-Slack-URL-or-ID#find-your-workspace-or-org-id" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow">this guidance</a></p>
</li>
</ol>
<h3 id="usage-with-claude-desktop"><a class="anchor" aria-hidden="true" tabindex="-1" href="#usage-with-claude-desktop" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Usage with Claude Desktop</h3>
<p>Add the following to your <code>claude_desktop_config.json</code>:</p>
<h4 id="npx"><a class="anchor" aria-hidden="true" tabindex="-1" href="#npx" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>npx</h4>
<pre class="language-json"><code class="language-json code-highlight"><span class="code-line"><span class="token punctuation">{</span>
</span><span class="code-line">  <span class="token property">"mcpServers"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">    <span class="token property">"slack"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">      <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"npx"</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
</span><span class="code-line">        <span class="token string">"-y"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"@modelcontextprotocol/server-slack"</span>
</span><span class="code-line">      <span class="token punctuation">]</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"env"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">        <span class="token property">"SLACK_BOT_TOKEN"</span><span class="token operator">:</span> <span class="token string">"xoxb-your-bot-token"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token property">"SLACK_TEAM_ID"</span><span class="token operator">:</span> <span class="token string">"T01234567"</span>
</span><span class="code-line">      <span class="token punctuation">}</span>
</span><span class="code-line">    <span class="token punctuation">}</span>
</span><span class="code-line">  <span class="token punctuation">}</span>
</span><span class="code-line"><span class="token punctuation">}</span>
</span></code><div class="copied" data-code="{
  &quot;mcpServers&quot;: {
    &quot;slack&quot;: {
      &quot;command&quot;: &quot;npx&quot;,
      &quot;args&quot;: [
        &quot;-y&quot;,
        &quot;@modelcontextprotocol/server-slack&quot;
      ],
      &quot;env&quot;: {
        &quot;SLACK_BOT_TOKEN&quot;: &quot;xoxb-your-bot-token&quot;,
        &quot;SLACK_TEAM_ID&quot;: &quot;T01234567&quot;
      }
    }
  }
}
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h4 id="docker"><a class="anchor" aria-hidden="true" tabindex="-1" href="#docker" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>docker</h4>
<pre class="language-json"><code class="language-json code-highlight"><span class="code-line"><span class="token punctuation">{</span>
</span><span class="code-line">  <span class="token property">"mcpServers"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">    <span class="token property">"slack"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">      <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"docker"</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
</span><span class="code-line">        <span class="token string">"run"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"-i"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"--rm"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"-e"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"SLACK_BOT_TOKEN"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"-e"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"SLACK_TEAM_ID"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token string">"mcp/slack"</span>
</span><span class="code-line">      <span class="token punctuation">]</span><span class="token punctuation">,</span>
</span><span class="code-line">      <span class="token property">"env"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
</span><span class="code-line">        <span class="token property">"SLACK_BOT_TOKEN"</span><span class="token operator">:</span> <span class="token string">"xoxb-your-bot-token"</span><span class="token punctuation">,</span>
</span><span class="code-line">        <span class="token property">"SLACK_TEAM_ID"</span><span class="token operator">:</span> <span class="token string">"T01234567"</span>
</span><span class="code-line">      <span class="token punctuation">}</span>
</span><span class="code-line">    <span class="token punctuation">}</span>
</span><span class="code-line">  <span class="token punctuation">}</span>
</span><span class="code-line"><span class="token punctuation">}</span>
</span></code><div class="copied" data-code="{
  &quot;mcpServers&quot;: {
    &quot;slack&quot;: {
      &quot;command&quot;: &quot;docker&quot;,
      &quot;args&quot;: [
        &quot;run&quot;,
        &quot;-i&quot;,
        &quot;--rm&quot;,
        &quot;-e&quot;,
        &quot;SLACK_BOT_TOKEN&quot;,
        &quot;-e&quot;,
        &quot;SLACK_TEAM_ID&quot;,
        &quot;mcp/slack&quot;
      ],
      &quot;env&quot;: {
        &quot;SLACK_BOT_TOKEN&quot;: &quot;xoxb-your-bot-token&quot;,
        &quot;SLACK_TEAM_ID&quot;: &quot;T01234567&quot;
      }
    }
  }
}
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h3 id="troubleshooting"><a class="anchor" aria-hidden="true" tabindex="-1" href="#troubleshooting" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Troubleshooting</h3>
<p>If you encounter permission errors, verify that:</p>
<ol>
<li>All required scopes are added to your Slack app</li>
<li>The app is properly installed to your workspace</li>
<li>The tokens and workspace ID are correctly copied to your configuration</li>
<li>The app has been added to the channels it needs to access</li>
</ol>
<h2 id="build"><a class="anchor" aria-hidden="true" tabindex="-1" href="#build" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Build</h2>
<p>Docker build:</p>
<pre class="language-bash"><code class="language-bash code-highlight"><span class="code-line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> mcp/slack <span class="token parameter variable">-f</span> src/slack/Dockerfile <span class="token builtin class-name">.</span>
</span></code><div class="copied" data-code="docker build -t mcp/slack -f src/slack/Dockerfile .
"><svg class="octicon-copy" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg class="octicon-check" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" height="12" width="12"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></div></pre>
<h2 id="license"><a class="anchor" aria-hidden="true" tabindex="-1" href="#license" node="[object Object]" target="_blank" rel="noopener noreferrer nofollow"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>License</h2>
<p>This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.</p></div></div></div>`,
    description: "Channel management and messaging capabilities",
    id: 88888,
    is_featured: true,
    name: "Slack",
    sort: 1,
    status: "active",
    tags: "slack,mcp",
    title: "Slack",
    type: "official",
  },
]
import pageJson from "@/pagejson/en.json";

// 添加一个新函数来获取相同类型的项目
async function getSimilarProjects(limit: number = 10) {
  // 使用现有的getProjects方法，然后在客户端过滤
  const allProjects = await getProjects(1, 50);
  
  // 过滤出与当前项目类型相同的项目，并排除当前项目自身
  const similarProjects = allProjects
    .slice(0, limit); // 只取前10条
    console.log('similarProjects:',allProjects, similarProjects);
  return similarProjects;
}
// 确保 officials 是一个数组
const officialsList = Array.isArray(officials) ? officials : [];
const similarProjects = await getSimilarProjects();
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams?.id;
  
  let project = officialsList.find((p:any) => p.name.toLowerCase() === resolvedParams.name.toLowerCase());
  if (!project) return {};
  
  // 生成 canonical URL 时进行编码
  const canonicalName = encodeURIComponent(project.name);
  return {
    title: `Discover MCP Clients For ${project.name} | ${pageJson?.metadata?.title}`,
    description: project.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/servers/${canonicalName}`,
    },
    keywords: [
      'MCP Server',
      'MCP Servers',
      'Model Context Protocol',
      'MCP Resources',
      'MCP.ad',
      'Discover MCP Servers',
      'MCP Server Detail'
    ],
  };
}
export default async function ProjectDetail({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  // 从缓存的 officials 数组中查找匹配的数据
  const decodedName = decodeURIComponent(resolvedParams.name);
  const project = officialsList.find((p:any) => p.name.toLowerCase() === decodedName.toLowerCase());
  console.log('从缓存的 officials 数组中查找匹配的数据:',officialsList,project);
  if (!project) return {};

  const tags = typeof project.tags === 'string' ? project.tags.split(',') : project.tags;
  

  project.content = `<div>${project.content}</div>`;
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <ProjectContent 
          project={project} 
          tags={tags || []} 
          similarProjects={similarProjects}
          pathPrefix="/servers"
          hideComments={true}
        />
      </div>
    </div>
  );
}
