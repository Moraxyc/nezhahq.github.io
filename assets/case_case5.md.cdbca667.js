import{_ as a,o as e,c as s,R as t}from"./chunks/framework.1625126e.js";const u=JSON.parse('{"title":"使用 Argo 隧道的哪吒服务端","description":"","frontmatter":{},"headers":[],"relativePath":"case/case5.md","filePath":"case/case5.md","lastUpdated":1694095078000}'),n={name:"case/case5.md"},l=t(`<h1 id="使用-argo-隧道的哪吒服务端" tabindex="-1">使用 Argo 隧道的哪吒服务端 <a class="header-anchor" href="#使用-argo-隧道的哪吒服务端" aria-label="Permalink to &quot;使用 Argo 隧道的哪吒服务端&quot;">​</a></h1><p>贡献者:</p><ul><li><a href="https://github.com/fscarmen2" target="_blank" rel="noreferrer">fscarmen</a></li></ul><p>项目地址：<a href="https://github.com/fscarmen2/Argo-Nezha-Service-Container" target="_blank" rel="noreferrer">Argo-Nezha-Service-Container</a></p><p>镜像备份（非实时更新）：<a href="https://github.com/nezhahq/Argo-Nezha-Service-Container" target="_blank" rel="noreferrer">Argo-Nezha-Service-Container</a></p><hr><h1 id="目录" tabindex="-1">目录 <a class="header-anchor" href="#目录" aria-label="Permalink to &quot;目录&quot;">​</a></h1><ul><li><a href="./case5.html#项目特点">项目特点</a></li><li><a href="./case5.html#argo-认证的获取方式-json-或-token">Argo 认证的获取方式: json 或 token</a></li><li><a href="./case5.html#准备需要用的变量">准备需要用的变量</a></li><li><a href="./case5.html#PaaS-部署实例">PaaS 部署实例</a></li><li><a href="./case5.html#VPS-部署实例">VPS 部署实例</a></li><li><a href="./case5.html#客户端接入">客户端接入</a></li><li><a href="./case5.html#ssh-接入">SSH 接入</a></li><li><a href="./case5.html#自动还原备份">自动还原备份</a></li><li><a href="./case5.html#手动还原备份">手动还原备份</a></li><li><a href="./case5.html#完美搬家">完美搬家</a></li><li><a href="./case5.html#主体目录文件及说明">主体目录文件及说明</a></li><li><a href="./case5.html#鸣谢下列作者的文章和项目">鸣谢下列作者的文章和项目</a></li><li><a href="./case5.html#免责声明">免责声明</a></li></ul><hr><h2 id="项目特点" tabindex="-1">项目特点: <a class="header-anchor" href="#项目特点" aria-label="Permalink to &quot;项目特点:&quot;">​</a></h2><ul><li>适用范围更广 --- 只要能连通网络，就能安装哪吒服务端，如 Nas 虚拟机 , Container PaaS 等</li><li>Argo 隧道突破需要公网入口的限制 --- 传统的哪吒需要有两个公网端口，一个用于面板的访问，另一个用于客户端上报数据，本项目借用 Cloudflare Argo 隧道，使用内网穿透的办法</li><li>IPv4 / v6 具备更高的灵活性 --- 传统哪吒需要处理服务端和客户端的 IPv4/v6 兼容性问题，还需要通过 warp 等工具来解决不对应的情况。然而，本项目可以完全不需要考虑这些问题，可以任意对接，更加方便和简便</li><li>一条 Argo 隧道分流多个域名和协议 --- 建立一条内网穿透的 Argo 隧道，即可分流三个域名(hostname)和协议(protocal)，分别用于面板的访问(http)，客户端上报数据(tcp)和 ssh（可选）</li><li>Nginx 反向代理的 gRPC 数据端口 --- 配上证书做 tls 终结，然后 Argo 的隧道配置用 https 服务指向这个反向代理，启用http2回源，grpc(nezha)-&gt;h2(nginx)-&gt;argo-&gt;cf cdn edge-&gt;agent</li><li>每天自动备份 --- 北京时间每天 4 时 0 分自动备份整个哪吒面板文件夹到指定的 github 私库，包括面板主题，面板设置，探针数据和隧道信息，备份保留近 5 天数据；鉴于内容十分重要，必须要放在私库</li><li>每天自动更新面板 -- 北京时间每天 4 时 0 分自动检测最新的官方面板版本，有升级时自动更新</li><li>手/自一体还原备份 --- 每分钟检测一次在线还原文件的内容，遇到有更新立刻还原</li><li>默认内置本机探针 --- 能很方便的监控自身服务器信息</li><li>数据更安全 --- Argo 隧道使用TLS加密通信，可以将应用程序流量安全地传输到 Cloudflare 网络，提高了应用程序的安全性和可靠性。此外，Argo Tunnel也可以防止IP泄露和DDoS攻击等网络威胁</li></ul><img width="1298" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/6535a060-2138-4c72-9ffa-1175dc6f5c25.png"><h2 id="argo-认证的获取方式-json-或-token" tabindex="-1">Argo 认证的获取方式: json 或 token <a class="header-anchor" href="#argo-认证的获取方式-json-或-token" aria-label="Permalink to &quot;Argo 认证的获取方式: json 或 token&quot;">​</a></h2><p>Argo 隧道认证方式有 json 和 token，使用两个方式其中之一</p><h3 id="方式-1-josn" tabindex="-1">(方式 1 - Josn): <a class="header-anchor" href="#方式-1-josn" aria-label="Permalink to &quot;(方式 1 - Josn):&quot;">​</a></h3><h4 id="通过-cloudflare-json-生成网轻松获取-argo-隧道-json-信息-https-fscarmen-cloudflare-now-cc" tabindex="-1">通过 Cloudflare Json 生成网轻松获取 Argo 隧道 json 信息: <a href="https://fscarmen.cloudflare.now.cc" target="_blank" rel="noreferrer">https://fscarmen.cloudflare.now.cc</a> <a class="header-anchor" href="#通过-cloudflare-json-生成网轻松获取-argo-隧道-json-信息-https-fscarmen-cloudflare-now-cc" aria-label="Permalink to &quot;通过 Cloudflare Json 生成网轻松获取 Argo 隧道 json 信息: https://fscarmen.cloudflare.now.cc&quot;">​</a></h4><img width="893" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/5b734a9d-b4fd-40ca-b7e6-5a1732a53175"><h4 id="到-cloudflare-官网-在相应的域名-dns-记录里加上客户端上报数据-tcp-和-ssh-可选-的域名-打开橙色云启用-cdn" tabindex="-1">到 Cloudflare 官网，在相应的域名 <code>DNS</code> 记录里加上客户端上报数据(tcp)和 ssh（可选）的域名，打开橙色云启用 CDN <a class="header-anchor" href="#到-cloudflare-官网-在相应的域名-dns-记录里加上客户端上报数据-tcp-和-ssh-可选-的域名-打开橙色云启用-cdn" aria-label="Permalink to &quot;到 Cloudflare 官网，在相应的域名 \`DNS\` 记录里加上客户端上报数据(tcp)和 ssh（可选）的域名，打开橙色云启用 CDN&quot;">​</a></h4><img width="1651" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/d5efb33d-b2a3-484c-b058-346c3e229088"><img width="1618" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/c44b638f-9984-47a7-a342-166549f6092e"><h3 id="方式-2-token-通过-cloudflare-官网-手动生成-argo-隧道-token-信息" tabindex="-1">(方式 2 - Token): 通过 Cloudflare 官网，手动生成 Argo 隧道 token 信息 <a class="header-anchor" href="#方式-2-token-通过-cloudflare-官网-手动生成-argo-隧道-token-信息" aria-label="Permalink to &quot;(方式 2 - Token): 通过 Cloudflare 官网，手动生成 Argo 隧道 token 信息&quot;">​</a></h3><h4 id="到-cf-官网-https-dash-cloudflare-com-进入-zero-trust-里生成-token-隧道和信息。" tabindex="-1">到 cf 官网：<a href="https://dash.cloudflare.com/" target="_blank" rel="noreferrer">https://dash.cloudflare.com/</a> ，进入 zero trust 里生成 token 隧道和信息。 <a class="header-anchor" href="#到-cf-官网-https-dash-cloudflare-com-进入-zero-trust-里生成-token-隧道和信息。" aria-label="Permalink to &quot;到 cf 官网：https://dash.cloudflare.com/ ，进入 zero trust 里生成 token 隧道和信息。&quot;">​</a></h4><img width="1672" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/0c467d8b-5fbc-4bde-ac8a-db70ed8798f0"><img width="1659" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/5aa4df19-f277-4582-8a4d-eef34a00085c"><img width="1470" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/ec06ec20-a68d-405c-b6de-cd4c52cbd8c0"><img width="1652" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/d0fba15c-f41b-4ee4-bea3-f0506d9b2d23"><img width="1670" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/2a28eab8-e434-4d06-85db-f2017b50f8de"><img width="1671" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/c6bcc511-e2f9-4616-bcca-47e1a8a25313"><img width="1670" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/7fbe3ef7-fb43-4925-9478-89ee08e44941"><h2 id="准备需要用的变量" tabindex="-1">准备需要用的变量 <a class="header-anchor" href="#准备需要用的变量" aria-label="Permalink to &quot;准备需要用的变量&quot;">​</a></h2><ul><li>到 Cloudflare 官网，选择使用的域名，打开 <code>网络</code> 选项将 <code>gRPC</code> 开关打开</li></ul><img width="1590" alt="image" src="https://user-images.githubusercontent.com/92626977/233138703-faab8596-a64a-40bb-afe6-52711489fbcf.png"><ul><li>获取 github 认证授权: <a href="https://github.com/settings/applications/new" target="_blank" rel="noreferrer">https://github.com/settings/applications/new</a></li></ul><p>面板域名加上 <code>https://</code> 开头，回调地址再加上 <code>/oauth2/callback</code> 结尾</p><img width="916" alt="image" src="https://user-images.githubusercontent.com/92626977/231099071-b6676f2f-6c7b-4e2f-8411-c134143cab24.png"><img width="1122" alt="image" src="https://user-images.githubusercontent.com/92626977/231086319-1b625dc6-713b-4a62-80b1-cc5b2b7ef3ca.png"><ul><li>获取 github 的 PAT (Personal Access Token): <a href="https://github.com/settings/tokens/new" target="_blank" rel="noreferrer">https://github.com/settings/tokens/new</a></li></ul><img width="1226" alt="image" src="https://user-images.githubusercontent.com/92626977/233346036-60819f98-c89a-4cef-b134-0d47c5cc333d.png"><img width="1148" alt="image" src="https://user-images.githubusercontent.com/92626977/233346508-273c422e-05c3-4c91-9fae-438202364787.png"><ul><li>创建 github 用于备份的私库: <a href="https://github.com/new" target="_blank" rel="noreferrer">https://github.com/new</a></li></ul><img width="814" alt="image" src="https://user-images.githubusercontent.com/92626977/233345537-c5b9dc27-35c4-407b-8809-b0ef68d9ad55.png"><h2 id="paas-部署实例" tabindex="-1">PaaS 部署实例 <a class="header-anchor" href="#paas-部署实例" aria-label="Permalink to &quot;PaaS 部署实例&quot;">​</a></h2><p>镜像 <code>fscarmen/argo-nezha:latest</code> ， 支持 amd64 和 arm64 架构</p><p>用到的变量</p><table><thead><tr><th>变量名</th><th>是否必须</th><th>备注</th></tr></thead><tbody><tr><td>GH_USER</td><td>是</td><td>github 的用户名，用于面板管理授权</td></tr><tr><td>GH_CLIENTID</td><td>是</td><td>在 github 上申请</td></tr><tr><td>GH_CLIENTSECRET</td><td>是</td><td>在 github 上申请</td></tr><tr><td>GH_BACKUP_USER</td><td>否</td><td>在 github 上备份哪吒服务端数据库的 github 用户名，不填则与面板管理授权的账户 GH_USER 一致</td></tr><tr><td>GH_REPO</td><td>否</td><td>在 github 上备份哪吒服务端数据库文件的 github 库</td></tr><tr><td>GH_EMAIL</td><td>否</td><td>github 的邮箱，用于备份的 git 推送到远程库</td></tr><tr><td>GH_PAT</td><td>否</td><td>github 的 PAT</td></tr><tr><td>ARGO_AUTH</td><td>是</td><td>Json: 从 <a href="https://fscarmen.cloudflare.now.cc" target="_blank" rel="noreferrer">https://fscarmen.cloudflare.now.cc</a> 获取的 Argo Json<br> Token: 从 Cloudflare 官网获取</td></tr><tr><td>DATA_DOMAIN</td><td>是</td><td>客户端与服务端的通信 argo 域名</td></tr><tr><td>WEB_DOMAIN</td><td>是</td><td>面板 argo 域名</td></tr><tr><td>SSH_DOMAIN</td><td>否</td><td>ssh 用的 argo 域名</td></tr><tr><td>SSH_PASSWORD</td><td>否</td><td>ssh 的密码，只有在设置 SSH_JSON 后才生效，默认值 password</td></tr></tbody></table><p>Koyeb</p><p><a href="https://app.koyeb.com/deploy?type=docker&amp;name=nezha&amp;ports=80;http;/&amp;env%5BGH_USER%5D=&amp;env%5BGH_CLIENTID%5D=&amp;env%5BGH_CLIENTSECRET%5D=&amp;env%5BGH_REPO%5D=&amp;env%5BGH_EMAIL%5D=&amp;env%5BGH_PAT%5D=&amp;env%5BARGO_AUTH%5D=&amp;env%5BDATA_DOMAIN%5D=&amp;env%5BWEB_DOMAIN%5D=&amp;env%5BSSH_DOMAIN%5D=&amp;env%5BSSH_PASSWORD%5D=&amp;image=docker.io/fscarmen/argo-nezha" target="_blank" rel="noreferrer"><img src="https://www.koyeb.com/static/images/deploy/button.svg" alt="Deploy to Koyeb"></a></p><img width="927" alt="image" src="https://user-images.githubusercontent.com/92626977/231088411-fbac3e6e-a8a6-4661-bcf8-7c777aa8ffeb.png"><img width="750" alt="image" src="https://user-images.githubusercontent.com/92626977/231088973-7134aefd-4c80-4559-8e40-17c3be11d27d.png"><img width="755" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/27a26b1b-6934-41a8-aca4-8a094c905850"><img width="754" alt="image" src="https://user-images.githubusercontent.com/92626977/233336491-6bb801af-257d-467d-aaf0-6dcb68a531ac.png"><img width="1187" alt="image" src="https://user-images.githubusercontent.com/92626977/231092893-c8f017a2-ee0e-4e28-bee3-7343158f0fa7.png"><img width="500" alt="image" src="https://user-images.githubusercontent.com/92626977/231094144-df6715bc-c611-47ce-a529-03c43f38102e.png"><h2 id="vps-部署实例" tabindex="-1">VPS 部署实例 <a class="header-anchor" href="#vps-部署实例" aria-label="Permalink to &quot;VPS 部署实例&quot;">​</a></h2><ul><li>注意: ARGO_JSON= 后面需要有单引号，不能去掉</li><li>如果 VPS 是 IPv6 only 的，请先安装 WARP IPv4 或者双栈: <a href="https://github.com/fscarmen/warp" target="_blank" rel="noreferrer">https://github.com/fscarmen/warp</a></li><li>备份目录为当前路径的 dashboard 文件夹</li></ul><h3 id="docker-部署" tabindex="-1">docker 部署 <a class="header-anchor" href="#docker-部署" aria-label="Permalink to &quot;docker 部署&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker run -dit \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           --name nezha_dashboard \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           --restart always \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e GH_USER=&lt;填 github 用户名&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e GH_EMAIL=&lt;填 github 邮箱&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e GH_PAT=&lt;填获取的&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e GH_REPO=&lt;填自定义的&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e GH_CLIENTID=&lt;填获取的&gt;  \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e GH_CLIENTSECRET=&lt;填获取的&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e ARGO_AUTH=&#39;&lt;填获取的 Argo json 或者 token&gt;&#39; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e WEB_DOMAIN=&lt;填自定义的&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e DATA_DOMAIN=&lt;填自定义的&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e SSH_DOMAIN=&lt;填自定义的&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e SSH_PASSWORD=&lt;填自定义的&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           fscarmen/argo-nezha</span></span></code></pre></div><h3 id="docker-compose-部署" tabindex="-1">docker-compose 部署 <a class="header-anchor" href="#docker-compose-部署" aria-label="Permalink to &quot;docker-compose 部署&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">version: &#39;3.8&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">services:</span></span>
<span class="line"><span style="color:#A6ACCD;">    argo-nezha:</span></span>
<span class="line"><span style="color:#A6ACCD;">        image: fscarmen/argo-nezha</span></span>
<span class="line"><span style="color:#A6ACCD;">        container_name: nezha_dashboard</span></span>
<span class="line"><span style="color:#A6ACCD;">        restart: always</span></span>
<span class="line"><span style="color:#A6ACCD;">        environment:</span></span>
<span class="line"><span style="color:#A6ACCD;">            - GH_USER=&lt;填 github 用户名&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - GH_EMAIL=&lt;&lt;填 github 邮箱&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - GH_PAT=&lt;填获取的&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - GH_REPO=&lt;填自定义的&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - GH_CLIENTID=&lt;填获取的&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - GH_CLIENTSECRET=&lt;填获取的&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - ARGO_AUTH=&#39;&lt;填获取的 Argo json 或者 token&gt;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - WEB_DOMAIN=&lt;填自定义的&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - DATA_DOMAIN=&lt;填自定义的&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - SSH_DOMAIN=&lt;填自定义的&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - SSH_PASSWORD=&lt;填自定义的&gt;</span></span></code></pre></div><h2 id="客户端接入" tabindex="-1">客户端接入 <a class="header-anchor" href="#客户端接入" aria-label="Permalink to &quot;客户端接入&quot;">​</a></h2><p>通过gRPC传输，无需额外配置。使用面板给到的安装方式，举例</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">curl -L https://raw.githubusercontent.com/naiba/nezha/master/script/install.sh -o nezha.sh &amp;&amp; chmod +x nezha.sh &amp;&amp; sudo ./nezha.sh install_agent data.seales.nom.za 443 eAxO9IF519fKFODlW0 --tls</span></span></code></pre></div><h2 id="ssh-接入" tabindex="-1">SSH 接入 <a class="header-anchor" href="#ssh-接入" aria-label="Permalink to &quot;SSH 接入&quot;">​</a></h2><ul><li>以 macOS + WindTerm 为例，其他根据使用的 SSH 工具，结合官方官方说明文档: <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/use_cases/ssh/#2-connect-as-a-user" target="_blank" rel="noreferrer">https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/use_cases/ssh/#2-connect-as-a-user</a></li><li>官方 cloudflared 下载: <a href="https://github.com/cloudflare/cloudflared/releases" target="_blank" rel="noreferrer">https://github.com/cloudflare/cloudflared/releases</a></li><li>以下输入命令举例</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;file path&gt;/cloudflared access ssh --hostname ssh.seales.nom.za</span></span></code></pre></div><img width="834" alt="image" src="https://user-images.githubusercontent.com/92626977/233349393-cec79e11-346e-4a57-8357-8d153d75ee40.png"><img width="830" alt="image" src="https://user-images.githubusercontent.com/92626977/233350601-73de67f9-19ca-451f-b395-8721abbb3342.png"><img width="955" alt="image" src="https://user-images.githubusercontent.com/92626977/233350802-754624e0-8456-4353-8577-1f5385fb8723.png"><h2 id="自动还原备份" tabindex="-1">自动还原备份 <a class="header-anchor" href="#自动还原备份" aria-label="Permalink to &quot;自动还原备份&quot;">​</a></h2><ul><li>把需要还原的文件名改到 github 备份库里的 <code>README.md</code>，定时服务会每分钟检测更新，并把上次同步的文件名记录在本地 <code>/dbfile</code> 处以与在线的文件内容作比对</li></ul><p>下图为以还原文件名为 <code>dashboard-2023-04-23-13:08:37.tar.gz</code> 作示例</p><p><img src="https://user-images.githubusercontent.com/92626977/233822466-c24e94f6-ba8a-47c9-b77d-aa62a56cc929.png" alt="image"></p><h2 id="手动还原备份" tabindex="-1">手动还原备份 <a class="header-anchor" href="#手动还原备份" aria-label="Permalink to &quot;手动还原备份&quot;">​</a></h2><ul><li>ssh 进入容器后运行，github 备份库里的 tar.gz 文件名，格式: dashboard-2023-04-22-21:42:10.tar.gz</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">bash /dashboard/restore.sh &lt;文件名&gt;</span></span></code></pre></div><img width="1209" alt="image" src="https://user-images.githubusercontent.com/92626977/233792709-fb37b79c-c755-4db1-96ec-1039309ff932.png"><h2 id="完美搬家" tabindex="-1">完美搬家 <a class="header-anchor" href="#完美搬家" aria-label="Permalink to &quot;完美搬家&quot;">​</a></h2><ul><li>备份原哪吒的 <code>/dashboard</code> 文件夹，压缩备份为 <code>dashboard.tar.gz</code> 文件</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">tar czvf dashboard.tar.gz /dashboard</span></span></code></pre></div><ul><li>下载文件并放入私库，这个私库名要与新哪吒 &lt;GH_REPO&gt; 完全一致，并把该库的 README.md 的内容编辑为 <code>dashboard.tar.gz</code></li><li>部署本项目新哪吒，完整填入变量即可。部署完成后，自动还原脚本会每分钟作检测，发现有新的内容即会自动还原，全程约 3 分钟</li></ul><h2 id="主体目录文件及说明" tabindex="-1">主体目录文件及说明 <a class="header-anchor" href="#主体目录文件及说明" aria-label="Permalink to &quot;主体目录文件及说明&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">|-- dashboard</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- app                  # 哪吒面板主程序</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- argo.json            # Argo 隧道 json 文件，记录着使用隧道的信息</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- argo.yml             # Argo 隧道 yml 文件，用于在一同隧道下，根据不同域名来分流 web, gRPC 和 ssh 协议的作用</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- backup.sh            # 备份数据脚本</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- data</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   |-- config.yaml      # 哪吒面板的配置，如 Github OAuth2 / gRPC 域名 / 端口 / 是否启用 TLS 等信息</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   \`-- sqlite.db        # SQLite 数据库文件，记录着面板设置的所有 severs 和 cron 等信息</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- entrypoint.sh        # 主脚本，容器运行后执行</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- nezha-agent          # 哪吒客户端，用于监控本地 localhost</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- nezha.csr            # SSL/TLS 证书签名请求</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- nezha.key            # SSL/TLS 证书的私钥信息</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- nezha.pem            # SSL/TLS 隐私增强邮件</span></span>
<span class="line"><span style="color:#A6ACCD;">|   \`-- restore.sh           # 还原备份脚本</span></span>
<span class="line"><span style="color:#A6ACCD;">|-- dbfile                   # 记录最新的还原或备份文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">\`-- version                  # 记录当前的面板 app 版本</span></span></code></pre></div><h2 id="鸣谢下列作者的文章和项目" tabindex="-1">鸣谢下列作者的文章和项目: <a class="header-anchor" href="#鸣谢下列作者的文章和项目" aria-label="Permalink to &quot;鸣谢下列作者的文章和项目:&quot;">​</a></h2><ul><li>热心的朝阳群众 Robin，讨论哪吒服务端与客户端的关系，从而诞生了此项目</li><li>哪吒官网: <a href="https://nezha.wiki/" target="_blank" rel="noreferrer">https://nezha.wiki/</a> , TG 群: <a href="https://t.me/nezhamonitoring" target="_blank" rel="noreferrer">https://t.me/nezhamonitoring</a></li><li>共穷国际老中医: <a href="http://solitud.es/" target="_blank" rel="noreferrer">http://solitud.es/</a></li><li>Akkia&#39;s Blog: <a href="https://blog.akkia.moe/" target="_blank" rel="noreferrer">https://blog.akkia.moe/</a></li><li>HiFeng&#39;s Blog: <a href="https://www.hicairo.com/" target="_blank" rel="noreferrer">https://www.hicairo.com/</a></li><li>用 Cloudflare Tunnel 进行内网穿透: <a href="https://blog.outv.im/2021/cloudflared-tunnel/" target="_blank" rel="noreferrer">https://blog.outv.im/2021/cloudflared-tunnel/</a></li><li>如何给 GitHub Actions 添加自己的 Runner 主机: <a href="https://cloud.tencent.com/developer/article/1756690" target="_blank" rel="noreferrer">https://cloud.tencent.com/developer/article/1756690</a></li><li>github self-hosted runner 添加与启动: <a href="https://blog.csdn.net/sinat_32188225/article/details/125978331" target="_blank" rel="noreferrer">https://blog.csdn.net/sinat_32188225/article/details/125978331</a></li></ul><h2 id="免责声明" tabindex="-1">免责声明: <a class="header-anchor" href="#免责声明" aria-label="Permalink to &quot;免责声明:&quot;">​</a></h2><ul><li>本程序仅供学习了解, 非盈利目的，请于下载后 24 小时内删除, 不得用作任何商业用途, 文字、数据及图片均有所属版权, 如转载须注明来源。</li><li>使用本程序必循遵守部署免责声明。使用本程序必循遵守部署服务器所在地、所在国家和用户所在国家的法律法规, 程序作者不对使用者任何不当行为负责。</li></ul>`,86),r=[l];function o(c,i,p,h,d,g){return e(),s("div",null,r)}const b=a(n,[["render",o]]);export{u as __pageData,b as default};
