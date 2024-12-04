import{_ as e,c as a,o as t,a4 as n}from"./chunks/framework.BmdFiWrL.js";const k=JSON.parse('{"title":"Agent 常见问题","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/agentq.md","filePath":"guide/agentq.md","lastUpdated":1733283637000}'),o={name:"guide/agentq.md"},s=n('<h1 id="agent-常见问题" tabindex="-1">Agent 常见问题 <a class="header-anchor" href="#agent-常见问题" aria-label="Permalink to &quot;Agent 常见问题&quot;">​</a></h1><hr><h2 id="后台显示的-ip-和-agent-实际-ip-不一致" tabindex="-1">后台显示的 IP 和 Agent 实际 IP 不一致？ <a class="header-anchor" href="#后台显示的-ip-和-agent-实际-ip-不一致" aria-label="Permalink to &quot;后台显示的 IP 和 Agent 实际 IP 不一致？&quot;">​</a></h2><p>如果后台显示的 IP 和 Agent 的实际 IP 不一致，请参考 <a href="/guide/dashboardq.html#为什么管理面板中显示的ip和agent实际ip不一致？">Dashboard 相关 - 为什么管理面板中显示的 IP 和 Agent 实际 IP 不一致？</a>。<br> 该问题的详细解决方法已在相关文档中说明，此处不再赘述。</p><hr><h2 id="一键脚本安装时出错" tabindex="-1">一键脚本安装时出错 <a class="header-anchor" href="#一键脚本安装时出错" aria-label="Permalink to &quot;一键脚本安装时出错&quot;">​</a></h2><h3 id="_1-curl-failed-to-connect-to-raw-githubusercontent-com" tabindex="-1">1. <code>curl: Failed to connect to raw.githubusercontent.com......</code> <a class="header-anchor" href="#_1-curl-failed-to-connect-to-raw-githubusercontent-com" aria-label="Permalink to &quot;1. `curl: Failed to connect to raw.githubusercontent.com......`&quot;">​</a></h3><p>此问题多发生在中国大陆的服务器上，原因是 Github 的连接不稳定。解决方法：</p><ol><li><strong>多次尝试</strong>：直接多尝试几次运行一键脚本。</li><li><strong>手动安装</strong>：按照 <a href="/guide/agent.html#其他方式安装agent">手动安装 Agent</a> 的指南完成安装。</li><li><strong>使用加速服务</strong>：可使用第三方 Github 加速服务或镜像。找到加速地址后，在一键安装脚本中进行替换。</li></ol><hr><h3 id="_2-sudo-command-not-found" tabindex="-1">2. <code>sudo: command not found</code> <a class="header-anchor" href="#_2-sudo-command-not-found" aria-label="Permalink to &quot;2. `sudo: command not found`&quot;">​</a></h3><p>如果提示 <code>sudo: command not found</code>，说明目标服务器未安装 <code>sudo</code> 工具。解决方法：</p><ol><li><strong>手动安装 sudo</strong>： <ul><li>对于 Ubuntu 系统，可以运行以下命令：<div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span></span></code></pre></div></li><li>对于 CentOS 系统，可以运行以下命令：<div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span></span></code></pre></div></li></ul></li><li><strong>检查安装成功</strong>：安装完成后，再次运行一键脚本进行安装。</li></ol><hr><h2 id="agent-有-docker-镜像吗" tabindex="-1">Agent 有 Docker 镜像吗？ <a class="header-anchor" href="#agent-有-docker-镜像吗" aria-label="Permalink to &quot;Agent 有 Docker 镜像吗？&quot;">​</a></h2><p><strong>Agent 目前没有推出 Docker 镜像。</strong><br> Agent 的设计思路和 Dashboard 相反：Dashboard 的目标是尽量减少对宿主机的干扰，而 Agent 则需要深度与宿主机集成以执行监控服务和命令任务。</p><p>虽然将 Agent 放入容器中可以继续执行监控任务，但 WebShell 等功能将无法正常运行，因此官方不提供 Docker 镜像支持。</p>',17),i=[s];function l(r,d,h,c,g,u){return t(),a("div",null,i)}const b=e(o,[["render",l]]);export{k as __pageData,b as default};