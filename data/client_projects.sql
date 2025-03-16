-- 大公司和知名组织的客户端 (1-20) -> category = 'mcp_clients_big_companies'
update projects set sort = 1, category = 'mcp_clients_big_companies' where url = 'https://github.com/apify/tester-mcp-client';
update projects set sort = 2, category = 'mcp_clients_big_companies' where url = 'https://github.com/datalayer/langchain-mcp-client';
update projects set sort = 3, category = 'mcp_clients_big_companies' where url = 'https://github.com/amida-tech/mcp-data-client';
update projects set sort = 4, category = 'mcp_clients_big_companies' where url = 'https://github.com/cpage-pivotal/cf-mcp-client';
update projects set sort = 5, category = 'mcp_clients_big_companies' where url = 'https://github.com/future-architect/go-mcprotocol';

-- 框架和库 (21-40) -> category = 'mcp_clients_frameworks'
update projects set sort = 21, category = 'mcp_clients_frameworks' where url = 'https://github.com/continuedev/continue';
update projects set sort = 22, category = 'mcp_clients_frameworks' where url = 'https://github.com/danny-avila/LibreChat';
update projects set sort = 23, category = 'mcp_clients_frameworks' where url = 'https://github.com/bmorphism/mcp-clients-docs';
update projects set sort = 24, category = 'mcp_clients_frameworks' where url = 'https://github.com/parultripathiDS/awesome-mcp-clients';
update projects set sort = 25, category = 'mcp_clients_frameworks' where url = 'https://github.com/jerome3o/mcp-clients';
update projects set sort = 26, category = 'mcp_clients_frameworks' where url = 'https://github.com/Automata-Labs-team/mcp-client-manager';

-- 特定语言的客户端 (41-70) -> category = 'mcp_clients_language_specific'
-- Python 客户端
update projects set sort = 41, category = 'mcp_clients_language_specific' where url = 'https://github.com/hideya/mcp-client-langchain-py';
update projects set sort = 42, category = 'mcp_clients_language_specific' where url = 'https://github.com/MCP-Mirror/hideya_mcp-client-langchain-py';
update projects set sort = 43, category = 'mcp_clients_language_specific' where url = 'https://github.com/hideya/langchain-mcp-tools-py-usage';
update projects set sort = 44, category = 'mcp_clients_language_specific' where url = 'https://github.com/S1M0N38/mcp-openai';
update projects set sort = 45, category = 'mcp_clients_language_specific' where url = 'https://github.com/dylibso/mcpx-py';
update projects set sort = 46, category = 'mcp_clients_language_specific' where url = 'https://github.com/dylibso/mcp-run-py';
update projects set sort = 47, category = 'mcp_clients_language_specific' where url = 'https://github.com/catsanzsh/ClientsMCPy';
update projects set sort = 48, category = 'mcp_clients_language_specific' where url = 'https://github.com/ananis25/mcp-client-ref';

-- JavaScript/TypeScript 客户端
update projects set sort = 49, category = 'mcp_clients_language_specific' where url = 'https://github.com/hideya/mcp-client-node';
update projects set sort = 50, category = 'mcp_clients_language_specific' where url = 'https://github.com/thomas92fr/mcp-ts-client';
update projects set sort = 51, category = 'mcp_clients_language_specific' where url = 'https://github.com/isaacwasserman/mcp-langchain-ts-client';
update projects set sort = 52, category = 'mcp_clients_language_specific' where url = 'https://github.com/hideya/langchain-mcp-tools-ts-usage';
update projects set sort = 53, category = 'mcp_clients_language_specific' where url = 'https://github.com/ollama-tlms-langchainjs/04-mcp-sse-client';

-- Rust 客户端
update projects set sort = 54, category = 'mcp_clients_language_specific' where url = 'https://github.com/darinkishore/mcp_client_rust';
update projects set sort = 55, category = 'mcp_clients_language_specific' where url = 'https://github.com/BalloonUpdate/Mcpatch2RustClient';

-- Java 客户端
update projects set sort = 56, category = 'mcp_clients_language_specific' where url = 'https://github.com/BalloonUpdate/Mcpatch2JavaClient';
update projects set sort = 57, category = 'mcp_clients_language_specific' where url = 'https://github.com/BalloonUpdate/McPatchClient';
update projects set sort = 58, category = 'mcp_clients_language_specific' where url = 'https://github.com/dylibso/mcpx4j';

-- Swift 客户端
update projects set sort = 59, category = 'mcp_clients_language_specific' where url = 'https://github.com/eastlondoner/swift-mcp-client';

-- 其他语言客户端
update projects set sort = 60, category = 'mcp_clients_language_specific' where url = 'https://github.com/lizqwerscott/mcp.el';
update projects set sort = 61, category = 'mcp_clients_language_specific' where url = 'https://github.com/ZWORX52/mcpp-client';
update projects set sort = 62, category = 'mcp_clients_language_specific' where url = 'https://github.com/Jtezz/clienteMCP';

-- AI 集成客户端 (71-90) -> category = 'mcp_clients_ai_integration'
update projects set sort = 71, category = 'mcp_clients_ai_integration' where url = 'https://github.com/SomewhatJustin/claude-mcp-client';
update projects set sort = 72, category = 'mcp_clients_ai_integration' where url = 'https://github.com/Nomak77/mcp-claude-client';
update projects set sort = 73, category = 'mcp_clients_ai_integration' where url = 'https://github.com/adamdude828/claude-mcp-agent';
update projects set sort = 74, category = 'mcp_clients_ai_integration' where url = 'https://github.com/emgeee/mcp-ollama';
update projects set sort = 75, category = 'mcp_clients_ai_integration' where url = 'https://github.com/brucepro/llamacppMCPClientDemo';
update projects set sort = 76, category = 'mcp_clients_ai_integration' where url = 'https://github.com/Nikunj2003/LLaMa-MCP-Streamlit';
update projects set sort = 77, category = 'mcp_clients_ai_integration' where url = 'https://github.com/AI-QL/chat-mcp';
update projects set sort = 78, category = 'mcp_clients_ai_integration' where url = 'https://github.com/amidabuddha/console-chat-gpt';
update projects set sort = 79, category = 'mcp_clients_ai_integration' where url = 'https://github.com/AnyContext-ai/remote-mcp-chat';
update projects set sort = 80, category = 'mcp_clients_ai_integration' where url = 'https://github.com/leartbeqiraj1/openai-mcp-client';
update projects set sort = 81, category = 'mcp_clients_ai_integration' where url = 'https://github.com/dev-mahfuj80/OpenAI-MCP-Client';
update projects set sort = 82, category = 'mcp_clients_ai_integration' where url = 'https://github.com/Ejb503/multimodal-mcp-client';
update projects set sort = 83, category = 'mcp_clients_ai_integration' where url = 'https://github.com/MCP-Mirror/Ejb503_multimodal-mcp-client';

-- 工具和实用程序 (91-110) -> category = 'mcp_clients_tools'
update projects set sort = 91, category = 'mcp_clients_tools' where url = 'https://github.com/jacksteamdev/obsidian-mcp-tools';
update projects set sort = 92, category = 'mcp_clients_tools' where url = 'https://github.com/jagan-shanmugam/mattermost-mcp-client';
update projects set sort = 93, category = 'mcp_clients_tools' where url = 'https://github.com/baryhuang/mcp-slack-client';
update projects set sort = 94, category = 'mcp_clients_tools' where url = 'https://github.com/justjoehere/mcp_gradio_client';
update projects set sort = 95, category = 'mcp_clients_tools' where url = 'https://github.com/adhikasp/mcp-client-cli';
update projects set sort = 96, category = 'mcp_clients_tools' where url = 'https://github.com/ihrpr/mcp-client-jupyter-chat';
update projects set sort = 97, category = 'mcp_clients_tools' where url = 'https://github.com/elie/mcp-client-notebook';
update projects set sort = 98, category = 'mcp_clients_tools' where url = 'https://github.com/felores/airtable-mcp';
update projects set sort = 99, category = 'mcp_clients_tools' where url = 'https://github.com/ggozad/oterm';
update projects set sort = 100, category = 'mcp_clients_tools' where url = 'https://github.com/runekaagaard/aterm2';
update projects set sort = 101, category = 'mcp_clients_tools' where url = 'https://github.com/frgmt0/blnk';
update projects set sort = 102, category = 'mcp_clients_tools' where url = 'https://github.com/block/goose';
update projects set sort = 103, category = 'mcp_clients_tools' where url = 'https://github.com/cline/cline';
update projects set sort = 104, category = 'mcp_clients_tools' where url = 'https://github.com/aswincandra/fast-mcp-client';
update projects set sort = 105, category = 'mcp_clients_tools' where url = 'https://github.com/getsimpletool/mcp-sse-proxy';

-- 其他客户端 (111-200) -> category = 'mcp_clients_other'
update projects set sort = 111, category = 'mcp_clients_other' where url = 'https://github.com/99btyler/modded-minecraft-mcp918';
update projects set sort = 112, category = 'mcp_clients_other' where url = 'https://github.com/Fitz-Amu/xdt-mini_client-mcp';
update projects set sort = 113, category = 'mcp_clients_other' where url = 'https://github.com/MannyBruh/Mcpe-clients';
update projects set sort = 114, category = 'mcp_clients_other' where url = 'https://github.com/aimcp/aime';
update projects set sort = 115, category = 'mcp_clients_other' where url = 'https://github.com/agree-able/room-mcp';
update projects set sort = 116, category = 'mcp_clients_other' where url = 'https://github.com/Kjdragan/build_mcp_client';
update projects set sort = 117, category = 'mcp_clients_other' where url = 'https://github.com/reblabers/mcp-client-sample';
update projects set sort = 118, category = 'mcp_clients_other' where url = 'https://github.com/adilthebestboy/mcpclient';
update projects set sort = 119, category = 'mcp_clients_other' where url = 'https://github.com/cgersht/MCProject-client';
update projects set sort = 120, category = 'mcp_clients_other' where url = 'https://github.com/ching0422/MCPTT_Client';
update projects set sort = 121, category = 'mcp_clients_other' where url = 'https://github.com/atiq-zangoh/mcp_self_client';
update projects set sort = 122, category = 'mcp_clients_other' where url = 'https://github.com/ryuhei-linkai/mcp-client-app';
update projects set sort = 123, category = 'mcp_clients_other' where url = 'https://github.com/deadshot465/novelcrafter-mcp';
update projects set sort = 124, category = 'mcp_clients_other' where url = 'https://github.com/doinkythederp/mcpi-client';
update projects set sort = 125, category = 'mcp_clients_other' where url = 'https://github.com/dxxxxy/mcp1.8.9op';
update projects set sort = 126, category = 'mcp_clients_other' where url = 'https://github.com/EcranNoir/MCP-Dynamite-Client-1.7.10-by-EcranNoir';
update projects set sort = 127, category = 'mcp_clients_other' where url = 'https://github.com/commandblock2/unnamed-client';
update projects set sort = 128, category = 'mcp_clients_other' where url = 'https://github.com/georgiantoniou/mcperf-client-conf';
update projects set sort = 129, category = 'mcp_clients_other' where url = 'https://github.com/glassBead-tc/srcbook-mcp-dos';
update projects set sort = 130, category = 'mcp_clients_other' where url = 'https://github.com/GongRzhe/MCP-client';
update projects set sort = 131, category = 'mcp_clients_other' where url = 'https://github.com/hdresearch/kips';
update projects set sort = 132, category = 'mcp_clients_other' where url = 'https://github.com/andrewdeng318/MCP_Client';
update projects set sort = 133, category = 'mcp_clients_other' where url = 'https://github.com/Lynxiummc/Mcpe-plus-plus';
update projects set sort = 134, category = 'mcp_clients_other' where url = 'https://github.com/cgersht/MCProject-Client1';
update projects set sort = 135, category = 'mcp_clients_other' where url = 'https://github.com/14ms/Simple-Base';
update projects set sort = 136, category = 'mcp_clients_other' where url = 'https://github.com/HybrideTV/Client-MCP-1.12.2';
update projects set sort = 137, category = 'mcp_clients_other' where url = 'https://github.com/hydraontopp/MCPE-Client-DLLS';
update projects set sort = 138, category = 'mcp_clients_other' where url = 'https://github.com/ImGGAAVVIINN/Aleph-0';
update projects set sort = 139, category = 'mcp_clients_other' where url = 'https://github.com/costinm/istio-k8slite';
update projects set sort = 140, category = 'mcp_clients_other' where url = 'https://github.com/mchecca/MCPClient';
update projects set sort = 141, category = 'mcp_clients_other' where url = 'https://github.com/cablate/Dive-APP';
update projects set sort = 142, category = 'mcp_clients_other' where url = 'https://github.com/jesse23/mcp-test-bed';
update projects set sort = 143, category = 'mcp_clients_other' where url = 'https://github.com/Biztactix-Ryan/MCPforge';
update projects set sort = 144, category = 'mcp_clients_other' where url = 'https://github.com/Downrest/Downrest-s-MCP-Snippets';
update projects set sort = 145, category = 'mcp_clients_other' where url = 'https://github.com/RooVetGit/Roo-Code';
update projects set sort = 146, category = 'mcp_clients_other' where url = 'https://github.com/edanyal/mcp-client';
update projects set sort = 147, category = 'mcp_clients_other' where url = 'https://github.com/AzionMC-team/Azion-Client-MCP';
update projects set sort = 148, category = 'mcp_clients_other' where url = 'https://github.com/Swedeachu/MCPE-Hack-Client-Hash-Values';
update projects set sort = 149, category = 'mcp_clients_other' where url = 'https://github.com/lethal2/MCPE-Client-Sources-1';

DO $$
DECLARE 
    counter INT := 150;
    project RECORD;
BEGIN
    FOR project IN 
        SELECT url 
        FROM projects 
        WHERE category = 'mcp_clients_other' AND sort > 149
        ORDER BY url
    LOOP
        EXECUTE format('UPDATE projects SET sort = %s, category = ''mcp_clients_other'' WHERE url = %L', counter, project.url);
        counter := counter + 1;
    END LOOP;
END $$;