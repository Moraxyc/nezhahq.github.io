import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.BmdFiWrL.js";const c=JSON.parse('{"title":"反向代理 Telegram Bot API","description":"","frontmatter":{},"headers":[],"relativePath":"guide/q1.md","filePath":"guide/q1.md","lastUpdated":1719239024000}'),l={name:"guide/q1.md"},p=n(`<h1 id="反向代理-telegram-bot-api" tabindex="-1">反向代理 Telegram Bot API <a class="header-anchor" href="#反向代理-telegram-bot-api" aria-label="Permalink to &quot;反向代理 Telegram Bot API&quot;">​</a></h1><p>如果你的 Dashboard 服务器无法访问 Telegram Bot API，但你依然想使用 Telegram 来推送通知，你可以尝试使用反向代理的方式解决这个问题。</p><h2 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h2><p><strong>这里介绍使用你自己的服务器进行反代的方法。你也可以选择使用 Cloudflare 的 Workers 进行反代，但可能对于中国大陆的用户来说网络连通性依然不佳。</strong></p><p>要搭建一个 Telegram Bot API 反代，你需要准备以下内容：</p><ol><li>一个可以连接 Telegram Bot API 服务器（并安装好 Nginx）。</li><li>一个域名（提前申请 SSL 证书）。</li></ol><h2 id="nginx-配置" tabindex="-1">NGINX 配置 <a class="header-anchor" href="#nginx-配置" aria-label="Permalink to &quot;NGINX 配置&quot;">​</a></h2><p>编辑 Nginx 配置文件，在 <code>http{}</code> 中添加如下配置：</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># HTTP 强制跳转到 HTTPS</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    listen </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[::]:80;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    server_name </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;yourDomainName&gt;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 强制 HTTPS</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 301</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> https://$server_name$request_uri;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># HTTPS 配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">443</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ssl;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    listen </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[::]:443 ssl;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    server_name </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;yourDomainName&gt;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # SSL 证书路径</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_certificate </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/path/to/your/server.pem&gt;;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_certificate_key </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/path/to/your/server.key&gt;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Root 非必要</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    root </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/var/www/tgbot/;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 必须配置 DNS，否则会报 502 错误</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    resolver </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8.8.8.8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 以 /bot 开头的请求会被正则匹配</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~*</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> ^/bot </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_buffering </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">off</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> https://api.telegram.org$request_uri;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_http_version </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Root 非必要，主要用于确认服务器状态。也可以改为 return 403</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        try_files </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$uri $uri /index.html;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 错误日志</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    error_log </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/var/log/tg.log </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li><code>yourDomainName</code>：你准备的域名</li><li><code>ssl_certificate</code>：SSL 证书路径</li><li><code>ssl_certificate_key</code>：SSL 证书路径</li></ul><h2 id="使用方式" tabindex="-1">使用方式 <a class="header-anchor" href="#使用方式" aria-label="Permalink to &quot;使用方式&quot;">​</a></h2><p>执行 <code>systemctl restart nginx</code> 重启 Nginx。然后在 Nezha 中将原来的 <code>https://api.telegram.org/</code> 替换为 <code>https://&lt;yourDomainName&gt;/</code>，即可正常推送消息。</p><h2 id="防止盗用" tabindex="-1">防止盗用 <a class="header-anchor" href="#防止盗用" aria-label="Permalink to &quot;防止盗用&quot;">​</a></h2><p>配置防火墙以防止他人盗用你的反代服务：</p><ul><li><code>serverIp</code>：Agent 的 IP 地址。根据你的系统选择适用的命令，<code>ufw</code> 或 <code>iptables</code> 均可。</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Ubuntu</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ufw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> allow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> proto</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tcp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> from</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">serverI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> any</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> port</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 443</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># CentOS</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">iptables</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -I</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> INPUT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tcp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --dport</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 443</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -j</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> DROP</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">iptables</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -I</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> INPUT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">serverI</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tcp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --dport</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 443</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -j</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ACCEPT</span></span></code></pre></div><p>通过以上配置，可以有效防止未经授权的访问。</p>`,17),t=[p];function h(e,k,r,d,g,o){return a(),i("div",null,t)}const y=s(l,[["render",h]]);export{c as __pageData,y as default};
