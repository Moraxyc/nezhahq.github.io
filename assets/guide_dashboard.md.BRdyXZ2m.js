import{_ as a,c as s,o as e,a4 as i}from"./chunks/framework.BmdFiWrL.js";const b=JSON.parse('{"title":"安装 Dashboard","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/dashboard.md","filePath":"guide/dashboard.md","lastUpdated":1725160726000}'),t={name:"guide/dashboard.md"},l=i(`<h1 id="安装-dashboard" tabindex="-1">安装 Dashboard <a class="header-anchor" href="#安装-dashboard" aria-label="Permalink to &quot;安装 Dashboard&quot;">​</a></h1><h2 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h2><p>搭建一个哪吒监控，你需要：</p><ol><li>一台可以连接公网的服务器，防火墙和安全策略需要放行 8008 和 5555 端口，否则会无法访问和无法接收数据。单核 512MB 内存的服务器配置就足以满足大多数使用场景。</li><li>一个已经设置好 A 记录，指向 Dashboard 服务器 IP 的域名。</li></ol><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>如果你想使用 CDN，请准备两个域名，一个配置好 CDN 用作公开访问，CDN 需要支持 WebSocket 协议；另一个域名不要使用 CDN，用作 Agent 端与 Dashboard 的通信。</p><p>本文档分别以 &quot;dashboard.example.com&quot; 和 &quot;data.example.com&quot; 两个域名来演示。</p></div><ol start="3"><li>一个 Github 账号（或：Gitlab、Gitee）。</li></ol><p><strong>本文档将以宝塔面板反代 Dashboard 的过程作为示范，随着未来版本的变化，部分功能的入口可能会发生改变，本文档仅供参考。</strong></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>本项目并不依赖宝塔，你可以选择使用你喜欢的任何服务器面板，或手动安装 Nginx 或 Caddy 来配置 SSL 和反代。<br> 如果你认为没有必要使用 80、443 端口来访问 Dashboard，你甚至不需要安装 Nginx 就可以直接使用安装脚本安装并运行哪吒监控。</p></div><h2 id="获取-github-的-client-id-和密钥" tabindex="-1">获取 Github 的 Client ID 和密钥 <a class="header-anchor" href="#获取-github-的-client-id-和密钥" aria-label="Permalink to &quot;获取 Github 的 Client ID 和密钥&quot;">​</a></h2><p>哪吒监控接入 Github、Gitlab、Gitee 作为后台管理员账号。</p><ol><li>首先我们需要新建一个验证应用，以 Github 为例，登录 Github 后，打开 <a href="https://github.com/settings/developers" target="_blank" rel="noreferrer">https://github.com/settings/developers</a> ，依次选择“OAuth Apps” - “New OAuth App”。<br><code>Application name</code> - 随意填写。<br><code>Homepage URL</code> - 填写面板的访问域名，如：&quot;<a href="http://dashboard.example.com" target="_blank" rel="noreferrer">http://dashboard.example.com</a>&quot;（你的域名）。<br><code>Authorization callback URL</code> - 填写回调地址，如：&quot;<a href="http://dashboard.example.com/oauth2/callback" target="_blank" rel="noreferrer">http://dashboard.example.com/oauth2/callback</a>&quot;（不要忘记<code>/oauth2/callback</code>）。</li><li>点击 “Register application”。</li><li>保存页面中的 Client ID，然后点击 “Generate a new client secret“，创建一个新的 Client Secret，新建的密钥仅会显示一次，<strong>请妥善保存</strong>。</li></ol><h2 id="使用-cloudflare-access-作为-oauth2-提供方" tabindex="-1">使用 Cloudflare Access 作为 OAuth2 提供方 <a class="header-anchor" href="#使用-cloudflare-access-作为-oauth2-提供方" aria-label="Permalink to &quot;使用 Cloudflare Access 作为 OAuth2 提供方&quot;">​</a></h2><p>对于位于中国大陆的用户，直接连接到 GitHub 可能会遇到困难。如果您在使用 GitHub、GitLab 或 Gitee 作为管理员账户登录时遇到问题，建议切换到使用 <a href="/guide/q8.html">Cloudflare Access 作为 OAuth2 提供方</a> 进行登录。</p><h3 id="新建-saas-oidc-应用流程" tabindex="-1">新建 SaaS-OIDC 应用流程 <a class="header-anchor" href="#新建-saas-oidc-应用流程" aria-label="Permalink to &quot;新建 SaaS-OIDC 应用流程&quot;">​</a></h3><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>以下步骤适用于已经开始使用 Zero Trust 的用户。如果您尚未使用过 Cloudflare Zero Trust，强烈建议您首先阅读 <a href="/guide/q8.html">Cloudflare Access 作为 OAuth2 提供方的使用指南</a>，以了解 Cloudflare Access 的配置示例和流程。</p></div><ol><li>前往 <a href="https://one.dash.cloudflare.com" target="_blank" rel="noreferrer">Zero Trust Dashboard</a>，使用 Cloudflare 账号登录。</li><li><code>My Team</code> -&gt; <code>Users</code> -&gt; <code>&lt;具体用户&gt;</code> -&gt; 获取 <code>User ID</code> 并保存。</li><li><code>Access</code> -&gt; <code>Application</code> -&gt; <code>Add an Application</code>。</li><li>选择 <code>SaaS</code>，在 <code>Application</code> 中输入自定义的应用名称（例如 nezha），选择 <code>OIDC</code> 后点击 <code>Add application</code>。</li><li><code>Scopes</code> 选择 <code>openid</code>, <code>email</code>, <code>profile</code>, <code>groups</code>。</li><li><code>Redirect URLs</code> 填写你的 callback 地址，例如 <code>https://dashboard.example.com/oauth2/callback</code>。</li><li>保存 <code>Client ID</code>、<code>Client Secret</code>、<code>Issuer</code> 地址中协议与域名的部分，例如 <code>https://xxxxx.cloudflareaccess.com</code>。</li></ol><p><strong>如使用此方式，安装 Dashboard 完成后，需要修改配置文件 <code>/opt/nezha/dashboard/data/config.yaml</code>，将 <code>Endpoint</code> 配置修改为之前保存的 <code>Issuer</code> 地址，例如 <code>https://xxxxx.cloudflareaccess.com</code>，保存后需重启 Dashboard。</strong></p><h2 id="oidc-验证配置-可选" tabindex="-1">OIDC 验证配置（可选） <a class="header-anchor" href="#oidc-验证配置-可选" aria-label="Permalink to &quot;OIDC 验证配置（可选）&quot;">​</a></h2><p>哪吒支持自定义 OIDC 验证登录。有关配置详情，请参考文档：<a href="/guide/q10.html">启用 OIDC 认证</a>。</p><h2 id="在服务器中安装-dashboard" tabindex="-1">在服务器中安装 Dashboard <a class="header-anchor" href="#在服务器中安装-dashboard" aria-label="Permalink to &quot;在服务器中安装 Dashboard&quot;">​</a></h2><p>在面板服务器中，运行安装脚本：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -L</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://raw.githubusercontent.com/naiba/nezha/master/script/install.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nezha.sh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nezha.sh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./nezha.sh</span></span></code></pre></div><p>如果你的面板服务器位于中国大陆，可以使用镜像：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -L</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://gitee.com/naibahq/nezha/raw/master/script/install.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nezha.sh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nezha.sh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CN=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./nezha.sh</span></span></code></pre></div><p>等待 Docker 安装完毕后，分别输入以下值：</p><ul><li><code>OAuth提供商</code> - github、cloudflare、gitlab、gitee 中选择一个。</li><li><code>Client ID</code> - 之前保存的 Client ID。</li><li><code>Client Secret</code> - 之前保存的 Client Secret。</li><li><code>用户名</code> - OAuth 提供商中的用户名/User ID。</li><li><code>站点标题</code> - 自定义站点标题。</li><li><code>访问端口</code> - 公开访问端口，可自定义，默认 8008。</li><li><code>Agent的通信端口</code> - Agent 与 Dashboard 的通信端口，默认 5555。</li></ul><p>输入完成后，等待拉取镜像。<br> 安装结束后，如果一切正常，此时你可以访问域名+端口号，如 “<a href="http://dashboard.example.com:8008" target="_blank" rel="noreferrer">http://dashboard.example.com:8008</a>” 来查看面板。</p><p>将来如果需要再次运行脚本，可以运行：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./nezha.sh</span></span></code></pre></div><p>来打开管理脚本。</p><h2 id="配置反向代理" tabindex="-1">配置反向代理 <a class="header-anchor" href="#配置反向代理" aria-label="Permalink to &quot;配置反向代理&quot;">​</a></h2><p>在宝塔面板中新建一个站点，域名填写公开访问域名，如 “<a href="http://dashboard.example.com" target="_blank" rel="noreferrer">http://dashboard.example.com</a>“ ，然后点击“设置”进入站点设置选项，选择“反向代理” - “新建反向代理”。</p><p>自定义一个代理名称，在下方“目标 URL”中填入 <code>http://127.0.0.1</code> 然后点击“保存”。</p><p>打开刚刚新建的反向代理右边的“配置文件”，将配置文件替换为以下内容：</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#PROXY-START/</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://127.0.0.1:8008;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $http_host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     Upgrade $http_upgrade;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> ^/(ws|terminal/.+|file/.+)$ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://127.0.0.1:8008;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_http_version </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Upgrade $http_upgrade;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Connection </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Upgrade&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $http_host;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#PROXY-END/</span></span></code></pre></div><p>点击“保存”。<br> 现在，你应该可以直接使用域名，如：“<a href="http://dashboard.example.com" target="_blank" rel="noreferrer">http://dashboard.example.com</a>“ 来访问面板了。</p><h3 id="扩展内容" tabindex="-1">扩展内容： <a class="header-anchor" href="#扩展内容" aria-label="Permalink to &quot;扩展内容：&quot;">​</a></h3><p>CaddyServer v1（v2 无需特别配置）：</p><div class="language-caddy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">caddy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>proxy /ws http://ip:8008 {</span></span>
<span class="line"><span>    websocket</span></span>
<span class="line"><span>    header_upstream -Origin</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>proxy /terminal/* http://ip:8008 {</span></span>
<span class="line"><span>    websocket</span></span>
<span class="line"><span>    header_upstream -Origin</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>proxy /file/* http://ip:8008 {</span></span>
<span class="line"><span>    websocket</span></span>
<span class="line"><span>    header_upstream -Origin</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="在宝塔面板中配置-ssl" tabindex="-1">在宝塔面板中配置 SSL <a class="header-anchor" href="#在宝塔面板中配置-ssl" aria-label="Permalink to &quot;在宝塔面板中配置 SSL&quot;">​</a></h2><p>首先，先暂时关闭反向代理。<br> 正如在其他网站中配置 SSL 证书一样，进入站点设置中的 “SSL”，你可以选择自动申请 Let´s Encrypt 证书或手动配置已有的证书。<br> 完成 SSL 的设置后，你需要回到 <a href="https://github.com/settings/developers" target="_blank" rel="noreferrer">https://github.com/settings/developers</a> ，编辑之前创建的验证应用程序，将之前我们填入的 &quot;Homepage URL&quot; 和 &quot;Authorization callback URL&quot; 中的域名全部从 <code>http</code> 改为 <code>https</code>，如：&quot;<a href="https://dashboard.example.com" target="_blank" rel="noreferrer">https://dashboard.example.com</a>&quot; 和 &quot;<a href="https://dashboard.example.com/oauth2/callback" target="_blank" rel="noreferrer">https://dashboard.example.com/oauth2/callback</a>&quot; ，<strong>不更改此项可能会导致你无法登录面板后台</strong>。</p><h2 id="更新-dashboard" tabindex="-1">更新 Dashboard <a class="header-anchor" href="#更新-dashboard" aria-label="Permalink to &quot;更新 Dashboard&quot;">​</a></h2><p>运行脚本 <code>./nezha.sh</code> ，选择重启面板并更新。</p>`,43),n=[l];function h(p,o,d,r,c,k){return e(),s("div",null,n)}const u=a(t,[["render",h]]);export{b as __pageData,u as default};
