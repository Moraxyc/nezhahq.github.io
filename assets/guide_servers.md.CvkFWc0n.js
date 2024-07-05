import{_ as s,c as i,o as a,a4 as e}from"./chunks/framework.BmdFiWrL.js";const g=JSON.parse('{"title":"服务器","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/servers.md","filePath":"guide/servers.md","lastUpdated":1720181150000}'),l={name:"guide/servers.md"},h=e(`<h1 id="服务器" tabindex="-1">服务器 <a class="header-anchor" href="#服务器" aria-label="Permalink to &quot;服务器&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>服务器区域负责管理 Agent，是哪吒探针中最基础的区域，也是其他功能的基础。</p><h2 id="新增服务器" tabindex="-1">新增服务器 <a class="header-anchor" href="#新增服务器" aria-label="Permalink to &quot;新增服务器&quot;">​</a></h2><p>第一步是新增服务器，可以自定义名称、分组、排序和备注。<br> 拥有相同分组的服务器会在受支持的主题中划分到一起进行显示，备注仅会在后台显示，无需担心泄露信息。</p><h2 id="安装-agent" tabindex="-1">安装 Agent <a class="header-anchor" href="#安装-agent" aria-label="Permalink to &quot;安装 Agent&quot;">​</a></h2><p>请参考前文<a href="/guide/agent.html">安装 Agent</a>。<br> 推荐使用一键安装，即<strong>配置好参数后</strong>，点击服务器<strong>一键安装</strong>列上的对应的系统图标即可复制安装命令，在相应服务器上进行安装。</p><h2 id="强制更新" tabindex="-1">强制更新 <a class="header-anchor" href="#强制更新" aria-label="Permalink to &quot;强制更新&quot;">​</a></h2><p>Agent 更新相关的参数是 <a href="/guide/q7.html">自定义 Agent 监控项目</a> 中的 <code>--disable-auto-update</code> 和 <code>--disable-force-update</code>。<br> 默认情况下，Agent 会自动更新，无需干预。但当用户关闭自动更新后，也可以选中指定服务器进行强制更新。<br><code>disable-force-update</code> 开启时此功能不生效。</p><h2 id="数据列" tabindex="-1">数据列 <a class="header-anchor" href="#数据列" aria-label="Permalink to &quot;数据列&quot;">​</a></h2><ul><li>版本号：记录 Agent 当前版本。</li><li>对游客隐藏：为 True 时，游客在面板中无法查看到此服务器。</li><li>启用 DDNS：为 True 时，当该服务器 IP 发生变化，Dashboard 会自动更新 DNS 记录。</li><li>DDNS 域名：为该服务器配置的 DDNS 域名。</li><li>密钥：即 secret/key，配置 Agent 时会用到，用于验证 Agent 与 Dashboard 的通信。</li><li>一键安装：点击相应的系统按钮，复制命令到服务器执行即可一键安装。</li><li>管理：分别为连接 WebShell，修改服务器配置，删除服务器。</li></ul><h2 id="在线终端" tabindex="-1">在线终端 <a class="header-anchor" href="#在线终端" aria-label="Permalink to &quot;在线终端&quot;">​</a></h2><p>即 WebShell，<code>disable-command-execute</code> 开启时此功能不生效。<br> Linux 和 Windows 均可用，可使用 Ctrl+Shift+V 粘贴。<br> 连接失败请参考<a href="/guide/q4.html">实时通道断开/在线终端连接失败</a>。<br> 注意在线终端功能中，Agent 也是通过 WebSocket 连接到<strong>公开访问域名</strong>，而非通过 gRPC 交互。</p><h2 id="ddns-功能" tabindex="-1">DDNS 功能 <a class="header-anchor" href="#ddns-功能" aria-label="Permalink to &quot;DDNS 功能&quot;">​</a></h2><p>DDNS 功能适用于使用动态 IP 的服务器，当 Agent 上报了一个新的 IP，Dashboard 会根据配置自动更新 DNS 记录。</p><h3 id="为什么我要使用哪吒监控的-ddns-功能" tabindex="-1">为什么我要使用哪吒监控的 DDNS 功能？ <a class="header-anchor" href="#为什么我要使用哪吒监控的-ddns-功能" aria-label="Permalink to &quot;为什么我要使用哪吒监控的 DDNS 功能？&quot;">​</a></h3><ul><li>方便集中管理 DDNS 设置，而不是在每台服务器上都部署一个 DDNS 服务。</li><li>仅在面板服务器上保存您的机密信息，防止外泄。</li></ul><h3 id="配置说明" tabindex="-1">配置说明 <a class="header-anchor" href="#配置说明" aria-label="Permalink to &quot;配置说明&quot;">​</a></h3><p>目前 DDNS 功能支持两种形式的配置：单配置和多配置。如使用单配置，则所有 Agent 服务器都使用相同的配置更新 DDNS；如使用多配置，则可为每台服务器指定一个配置更新 DDNS，灵活性更强。</p><h4 id="单配置" tabindex="-1">单配置 <a class="header-anchor" href="#单配置" aria-label="Permalink to &quot;单配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">DDNS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  Enable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  Provider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;webhook&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  AccessID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  AccessSecret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  WebhookMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  WebhookURL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  WebhookRequestBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  WebhookHeaders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  MaxRetries</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  Profiles</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span></span></code></pre></div><ul><li><code>Enable</code>：布尔值，选择是否开启 DDNS 功能。</li><li><code>Provider</code>：DDNS 供应商的名称；目前支持 <code>webhook</code>、<code>cloudflare</code> 以及 <code>tencentcloud</code>。</li><li><code>AccessID</code>：DDNS 供应商的令牌 ID；仅适用于供应商 <code>tencentcloud</code>。</li><li><code>AccessSecret</code>：DDNS 供应商的令牌 Secret；仅适用于供应商 <code>cloudflare</code> 及 <code>tencentcloud</code>。</li><li><code>WebhookMethod</code>：Webhook 的请求方法。例如 <code>GET</code>、<code>POST</code> 等；仅适用于供应商 <code>webhook</code>。</li><li><code>WebhookURL</code>：Webhook 的请求地址；仅适用于供应商 <code>webhook</code>。</li><li><code>WebhookRequestBody</code>：Webhook 的请求体；仅适用于供应商 <code>webhook</code>。</li><li><code>WebhookHeaders</code>：Webhook 的请求头；仅适用于供应商 <code>webhook</code>。</li><li><code>MaxRetries</code>：当请求失败时，重试请求的次数。</li><li><code>Profiles</code>：多配置设定；在单配置设定中，此项忽略。</li></ul><p><code>WebhookURL</code>、<code>WebhookRequestBody</code> 以及 <code>WebhookHeaders</code> 可以包含以下参数：</p><ul><li><code>{ip}</code>：主机当前 IP。</li><li><code>{domain}</code>：ddns 域名。</li><li><code>{type}</code>：IP 类型，可能为 &quot;ipv4&quot; 和 &quot;ipv6&quot;。</li><li><code>{access_id}</code>：凭据 1。</li><li><code>{access_secret}</code>：凭据 2。</li></ul><p>配置示例：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">WebhookHeaders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    a:{access_id}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    b:{access_secret}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">WebhookRequestBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;{&quot;domain&quot;: &quot;{domain}&quot;, &quot;ip&quot;: &quot;{ip}&quot;, &quot;type&quot;: &quot;{type}&quot;}&#39;</span></span></code></pre></div><h4 id="多配置" tabindex="-1">多配置 <a class="header-anchor" href="#多配置" aria-label="Permalink to &quot;多配置&quot;">​</a></h4><p>当使用多配置时，请将 <code>DDNS.Provider</code> 留空。如 <code>DDNS.Provider</code> 的值不为空，多配置设定将被忽略。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">DDNS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  Enable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  MaxRetries</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  Profiles</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    example</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      Provider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      AccessID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      AccessSecret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      WebhookMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      WebhookURL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      WebhookRequestBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      WebhookHeaders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span></code></pre></div><ul><li><code>Profiles</code>：多配置设定。</li><li><code>example</code>：可替换为 DDNS 配置名，可填任意字符串。</li></ul><p>其它选项请参考<a href="#单配置">单配置</a>段。</p><h4 id="dashboard-配置" tabindex="-1">Dashboard 配置 <a class="header-anchor" href="#dashboard-配置" aria-label="Permalink to &quot;Dashboard 配置&quot;">​</a></h4><p>修改配置文件后，还需要在 Dashboard 中修改服务器设置才能使 DDNS 生效。</p><p>DDNS 相关选项说明：</p><ul><li><code>启用 DDNS</code>：为此服务器启用 DDNS 功能。</li><li><code>启用 DDNS IPv4</code>：更新 DDNS 记录时，启用 IPv4 解析。</li><li><code>启用 DDNS IPv6</code>：更新 DDNS 记录时，启用 IPv6 解析。</li><li><code>DDNS 域名</code>：记录指向的域名。</li><li><code>DDNS 配置</code>：在多配置情况下，要使用的 DDNS 配置名。</li></ul><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>在 Dashboard 设置中修改配置并保存时，会在 <code>config.yaml</code> 中填入默认配置选项，此时 DDNS 段中会同时存在单配置和多配置。</p><ul><li>如需使用单配置，请配置 <code>DDNS.Provider</code>，并忽略 <code>Profiles</code> 选项相关内容。</li><li>如需使用多配置，请将 <code>DDNS.Provider</code> 留空。如 <code>DDNS.Provider</code> 的值不为空，多配置设定将被忽略。</li></ul></div><h4 id="查看日志" tabindex="-1">查看日志 <a class="header-anchor" href="#查看日志" aria-label="Permalink to &quot;查看日志&quot;">​</a></h4><p>在 Dashboard 的日志中，可以看到 DDNS 功能的相关日志，配置正确时，更新 DNS 记录时会有相应的日志记录。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dashboard_1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 2024/03/16</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 23:16:25</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> NEZH</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">A</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 正在尝试更新域名</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ddns.example.com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DDNS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1/3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dashboard_1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 2024/03/16</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 23:16:28</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> NEZH</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">A</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 尝试更新域名</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ddns.example.com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">DDNS成功</span></span></code></pre></div>`,39),t=[h];function n(d,o,k,p,r,c){return a(),i("div",null,t)}const u=s(l,[["render",n]]);export{g as __pageData,u as default};