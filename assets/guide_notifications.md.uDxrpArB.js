import{_ as i,c as s,o as a,a4 as t}from"./chunks/framework.BmdFiWrL.js";const c=JSON.parse('{"title":"通知设置","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/notifications.md","filePath":"guide/notifications.md","lastUpdated":1719239024000}'),l={name:"guide/notifications.md"},e=t(`<h1 id="通知设置" tabindex="-1">通知设置 <a class="header-anchor" href="#通知设置" aria-label="Permalink to &quot;通知设置&quot;">​</a></h1><p>哪吒监控支持对服务器的负载、CPU、内存、硬盘、流量、月流量、进程数、连接数进行监控，并在达到用户设定的阈值时发送告警通知。</p><h2 id="灵活的通知方式" tabindex="-1">灵活的通知方式 <a class="header-anchor" href="#灵活的通知方式" aria-label="Permalink to &quot;灵活的通知方式&quot;">​</a></h2><ul><li>在面板消息中，占位符 <code>#DATETIME#</code> 代表事件发生的时间戳。当通知被触发时，面板会自动将 <code>#DATETIME#</code> 替换为事件的实际时间。</li><li><code>#NEZHA#</code> 是面板消息占位符，面板触发通知时会自动用实际消息替换占位符。</li><li>Body 内容是 <code>JSON</code> 格式的：<strong>当请求类型为 FORM 时</strong>，值为 <code>key:value</code> 的形式，<code>value</code> 里面可放置占位符，通知时会自动替换。<strong>当请求类型为 JSON 时</strong> 只会简单进行字符串替换后直接提交到 <code>URL</code>。</li><li>URL 里面也可放置占位符，请求时会进行简单的字符串替换。</li></ul><p><strong>请参考以下的通知方式示例，也可以根据自己的需求灵活设置推送方式。</strong></p><h3 id="bark-示例" tabindex="-1">Bark 示例 <a class="header-anchor" href="#bark-示例" aria-label="Permalink to &quot;Bark 示例&quot;">​</a></h3><details><summary>点击展开/收起</summary><ul><li><p>名称：Bark</p></li><li><p>URL 组成: /:key/:body or /:key/:title/:body or /:key/:category/:title/:body</p></li><li><p>请求方式: GET</p></li><li><p>请求类型: 默认</p></li><li><p>Body: 空</p></li><li><p>名称：Bark</p></li><li><p>URL 组成: /push</p></li><li><p>请求方式: POST</p></li><li><p>请求类型: form</p></li><li><p>Body: <code>{&quot;title&quot;: &quot;#SERVER.NAME#&quot;,&quot;device_key&quot;:&quot;xxxxxxxxx&quot;,&quot;body&quot;:&quot;#NEZHA#&quot;,&quot;icon&quot;:&quot;https://xxxxxxxx/nz.png&quot;}</code></p></li></ul></details><h3 id="slack-示例-贡献者-白歌" tabindex="-1">Slack 示例 贡献者：<a href="https://github.com/cantoblanco" target="_blank" rel="noreferrer">@白歌</a> <a class="header-anchor" href="#slack-示例-贡献者-白歌" aria-label="Permalink to &quot;Slack 示例 贡献者：[@白歌](https://github.com/cantoblanco)&quot;">​</a></h3><details><summary>点击展开/收起</summary><h4 id="url-参数获取说明" tabindex="-1">URL 参数获取说明 <a class="header-anchor" href="#url-参数获取说明" aria-label="Permalink to &quot;URL 参数获取说明&quot;">​</a></h4><p>请提前准备好 Slack 的 Workspace 并为这个 Workspace 创建一个 App。如果你还没有创建，可以在 <a href="https://api.slack.com/apps" target="_blank" rel="noreferrer">Slack API</a> 创建一个 App。</p><p>创建完成 App 后，需要为这个 App 添加一个 Incoming Webhook。在 App 的设置页面中找到 Incoming Webhooks，将 Activate Incoming Webhooks 勾选为 ON，在页面下方找到并点击 Add New Webhook to Workspace，选择一个 Channel，然后点击允许。完成创建后，你会得到一个 Webhook URL，使用这个 URL 替换下方的示例 URL。</p><ul><li>名称：Slack</li><li>URL：<a href="https://hooks.slack.com/services/xxxxxxxxx/xxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxx" target="_blank" rel="noreferrer">https://hooks.slack.com/services/xxxxxxxxx/xxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxx</a></li><li>请求方式: POST</li><li>请求类型: JSON</li><li>Body: <code>{&quot;text&quot;:&quot;#NEZHA#&quot;}</code></li></ul></details><h3 id="server-酱示例" tabindex="-1">Server 酱示例 <a class="header-anchor" href="#server-酱示例" aria-label="Permalink to &quot;Server 酱示例&quot;">​</a></h3><details><summary>点击展开/收起</summary><ul><li>名称：Server 酱</li><li>URL：<a href="https://sc.ftqq.com/SCUrandomkeys.send?title=%E5%93%AA%E5%90%92%E5%91%8A%E8%AD%A6%E4%BF%A1%E6%81%AF&amp;desp=#NEZHA#" target="_blank" rel="noreferrer">https://sc.ftqq.com/SCUrandomkeys.send?title=哪吒告警信息&amp;desp=#NEZHA#</a></li><li>请求方式: GET</li><li>请求类型: 默认</li><li>Body: 空</li></ul><p><strong>Server 酱进阶</strong></p><ul><li><p>名称：Server 酱</p></li><li><p>URL：<a href="https://sc.ftqq.com/SCUrandomkeys.send" target="_blank" rel="noreferrer">https://sc.ftqq.com/SCUrandomkeys.send</a></p></li><li><p>请求方式: POST</p></li><li><p>请求类型: FORM</p></li><li><p>Body:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;title&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.NAME#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;desp&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;**#NEZHA#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">平均负载: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.LOAD1#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.LOAD5#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.LOAD15#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">## [点击访问面板](https://你的面板域名)</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">![logo](https://raw.githubusercontent.com/naiba/nezha/master/resource/static/brand.svg)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><img src="https://github.com/iilemon/nezhahq.github.io/blob/main/docs/images/photo_2023-03-16_00-22-47a.jpg?raw=true" alt="展示"></p></li></ul></details><h3 id="telegram-示例-贡献者-白歌" tabindex="-1">Telegram 示例 贡献者：<a href="https://github.com/cantoblanco" target="_blank" rel="noreferrer">@白歌</a> <a class="header-anchor" href="#telegram-示例-贡献者-白歌" aria-label="Permalink to &quot;Telegram 示例 贡献者：[@白歌](https://github.com/cantoblanco)&quot;">​</a></h3><details><summary>点击展开/收起</summary><h4 id="url-参数获取说明-1" tabindex="-1">URL 参数获取说明 <a class="header-anchor" href="#url-参数获取说明-1" aria-label="Permalink to &quot;URL 参数获取说明&quot;">​</a></h4><p>请提前在 Telegram 中创建一个机器人，获取到机器人的 token 和你的 Telegram 用户 ID。</p><p>机器人的 token 和用户 ID 都是数字和字母的组合，可以在 Telegram 中与 @userinfobot 对话获取自己的用户 ID。与 @BotFather 对话，输入命令 /newbot 创建一个机器人，创建完成后可以获得机器人的 token。</p><p>得到的 token 和用户 ID 都是字符串，可以直接拼接到 URL 中，如下所示，将其中的 botXXXXXX 替换为你的机器人 token，将 YYYYYY 替换为你的用户 ID。注意，你需要先与机器人对话，否则机器人无法发送消息给你。</p><ul><li>名称：Telegram</li><li>URL：<a href="https://api.telegram.org/botXXXXXX/sendMessage?chat_id=YYYYYY&amp;text=#NEZHA#" target="_blank" rel="noreferrer">https://api.telegram.org/botXXXXXX/sendMessage?chat_id=YYYYYY&amp;text=#NEZHA#</a></li><li>请求方式: GET</li><li>请求类型: 默认</li><li>Body: 留空</li></ul></details><h3 id="wxpusher-示例" tabindex="-1">wxpusher 示例 <a class="header-anchor" href="#wxpusher-示例" aria-label="Permalink to &quot;wxpusher 示例&quot;">​</a></h3><p><strong>需要提前关注你的应用</strong></p><details><summary>点击展开/收起</summary><ul><li>名称: wxpusher</li><li>URL：<a href="http://wxpusher.zjiecode.com/api/send/message" target="_blank" rel="noreferrer">http://wxpusher.zjiecode.com/api/send/message</a></li><li>请求方式: POST</li><li>请求类型: JSON</li><li>Body: <code>{&quot;appToken&quot;:&quot;你的appToken&quot;,&quot;topicIds&quot;:[],&quot;content&quot;:&quot;#NEZHA#&quot;,&quot;contentType&quot;:&quot;1&quot;,&quot;uids&quot;:[&quot;你的uid&quot;]}</code></li></ul></details><h3 id="邮件通知示例-sendcloud-贡献者-白歌" tabindex="-1">邮件通知示例 - SendCloud 贡献者：<a href="https://github.com/cantoblanco" target="_blank" rel="noreferrer">@白歌</a> <a class="header-anchor" href="#邮件通知示例-sendcloud-贡献者-白歌" aria-label="Permalink to &quot;邮件通知示例 - SendCloud 贡献者：[@白歌](https://github.com/cantoblanco)&quot;">​</a></h3><details><summary>点击展开/收起</summary><p><strong>注意：SendCloud 有每日免费发送邮件限额限制，这里仅作示例，你可以选择付费服务或其他类似的免费服务，使用方法类似。</strong></p><h4 id="url-参数获取说明-2" tabindex="-1">URL 参数获取说明 <a class="header-anchor" href="#url-参数获取说明-2" aria-label="Permalink to &quot;URL 参数获取说明&quot;">​</a></h4><p>该示例使用 SendCloud 作为发信服务，需提前在 <a href="https://www.sendcloud.net/" target="_blank" rel="noreferrer">SendCloud</a> 注册账号，创建发件邮箱，然后在<a href="https://www.sendcloud.net/sendSetting/apiuser" target="_blank" rel="noreferrer">这里</a>获取 APIUSER 和 APIKEY。</p><p>替换示例 URL 中的 <code>&lt;替换APIUSER&gt;</code> 和 <code>&lt;替换APIKEY&gt;</code> 为自己的 APIUSER 和 APIKEY，替换 URL 中的 <code>&lt;自定义发件邮箱&gt;</code> 和 <code>&lt;自定义收件邮箱&gt;</code> 为任意的的发件邮箱和收件邮箱。</p><ul><li>名称：邮件告警</li><li>URL：<a href="https://api.sendcloud.net/apiv2/mail/send?apiUser=" target="_blank" rel="noreferrer">https://api.sendcloud.net/apiv2/mail/send?apiUser=</a>&lt;替换APIUSER&gt;&amp;apiKey=&lt;替换APIKEY&gt;&amp;from=&lt;自定义发件邮箱&gt;&amp;fromName=Nezha&amp;to=&lt;自定义收件邮箱&gt;&amp;subject=Nezha-Notification&amp;html=#NEZHA#</li><li>请求方式: POST</li><li>请求类型: JSON</li><li>Header: 留空</li><li>Body: 留空</li></ul></details><h3 id="钉钉群机器人配置-示例" tabindex="-1">钉钉群机器人配置 示例 <a class="header-anchor" href="#钉钉群机器人配置-示例" aria-label="Permalink to &quot;钉钉群机器人配置 示例&quot;">​</a></h3><details><summary>点击展开/收起</summary><h4 id="url-参数获取说明-3" tabindex="-1">URL 参数获取说明 <a class="header-anchor" href="#url-参数获取说明-3" aria-label="Permalink to &quot;URL 参数获取说明&quot;">​</a></h4><p>请提前在钉钉中创建一个机器人，获取到机器人的 token。</p><p>机器人 URL 在钉钉群 - 管理机器人 - 创建机器人后获取，安全方式选择自定义关键词，Body 中 content 值内需包含该关键词。</p><ul><li>名称: 哪吒探针小跟班</li><li>URL：<a href="https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxxxxxxxxxxx" target="_blank" rel="noreferrer">https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxxxxxxxxxxx</a></li><li>请求方式: POST</li><li>请求类型: JSON</li><li>Header: <code>{&quot;Content-Type&quot;: &quot;application/json&quot;}</code></li><li>Body: <code>{&quot;msgtype&quot;: &quot;text&quot;,&quot;text&quot;: {&quot;content&quot;:&quot;哪吒探针：\\n#NEZHA#&quot;}}</code></li></ul></details><h3 id="企业微信群机器人-示例-贡献者-chowrex" tabindex="-1">企业微信群机器人 示例 贡献者：<a href="https://github.com/ChowRex" target="_blank" rel="noreferrer">@ChowRex</a> <a class="header-anchor" href="#企业微信群机器人-示例-贡献者-chowrex" aria-label="Permalink to &quot;企业微信群机器人 示例 贡献者：[@ChowRex](https://github.com/ChowRex)&quot;">​</a></h3><details><summary>点击展开/收起</summary><p>支持的占位符一览</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#NEZHA#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;ServerName&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.NAME#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;ServerIP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.IP#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;ServerIPV4&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.IPV4#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;ServerIPV6&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.IPV6#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;CPU&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.CPU#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;MEM&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.MEM#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;SWAP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.SWAP#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;DISK&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.DISK#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;NetInSpeed&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.NETINSPEED#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;NetOutSpeed&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.NETOUTSPEED#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;TransferIn&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.TRANSFERIN#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;TranferOut&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.TRANSFEROUT#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;Load1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.LOAD1#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;Load5&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.LOAD5#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;Load15&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.LOAD15#&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;TCP_CONN_COUNT&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.TCPCONNCOUNT&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 无效</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;UDP_CONN_COUNT&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#SERVER.UDPCONNCOUNT&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> 无效</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><blockquote><p><a href="https://developer.work.weixin.qq.com/document/path/91770#markdown%E7%B1%BB%E5%9E%8B" target="_blank" rel="noreferrer">群机器人配置说明 - 文档 - 企业微信开发者中心</a></p></blockquote><ul><li>名称：企业微信群机器人</li><li>URL：<a href="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_BOT_KEY" target="_blank" rel="noreferrer">https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_BOT_KEY</a></li><li>请求方式: POST</li><li>请求类型: JSON</li><li>Body:<div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;msgtype&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;markdown&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;markdown&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;# 哪吒通知消息</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\n\\n\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#NEZHA#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; 名称: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.NAME#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; IP: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.IP#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; IPv4: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.IPV4#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; IPv6: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.IPV6#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; CPU: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.CPU#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; 内存: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.MEM#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; 交换分区: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.SWAP#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; 存储: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.DISK#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; 实时上传速度: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.NETINSPEED#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; 实时下载速度: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.NETOUTSPEED#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; 总上传: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.TRANSFERIN#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; 总下载: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.TRANSFEROUT#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; 1分钟内负载: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.LOAD1#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; 5分钟内负载: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.LOAD5#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; 15分钟内负载: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.LOAD15#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; TCP连接数: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.TCPCONNCOUNT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt; UDP连接数: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#SERVER.UDPCONNCOUNT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;\\n\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></li></ul><p>根据需求删减相关内容信息即可。</p><p><img src="https://user-images.githubusercontent.com/30169860/223605620-eac53ee6-09f9-4583-94fa-9b0cdedba81c.png" alt="通知效果"></p></details><h3 id="飞书群机器人配置-示例-贡献者-eya46" tabindex="-1">飞书群机器人配置 示例 贡献者：<a href="https://github.com/eya46" target="_blank" rel="noreferrer">@eya46</a> <a class="header-anchor" href="#飞书群机器人配置-示例-贡献者-eya46" aria-label="Permalink to &quot;飞书群机器人配置 示例 贡献者：[@eya46](https://github.com/eya46)&quot;">​</a></h3><details><summary>点击展开/收起</summary><h4 id="url-参数获取说明-4" tabindex="-1">URL 参数获取说明 <a class="header-anchor" href="#url-参数获取说明-4" aria-label="Permalink to &quot;URL 参数获取说明&quot;">​</a></h4><p>机器人 URL 通过飞书群 - 群机器人 - 添加机器人 - 自定义机器人(webhook)创建后获取。</p><ul><li>名称: 哪吒面板 Bot</li><li>URL：<a href="https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxxxxxxxxxxx" target="_blank" rel="noreferrer">https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxxxxxxxxxxx</a></li><li>请求方式: POST</li><li>请求类型: JSON</li><li>Body: <code>{&quot;content&quot;:{&quot;text&quot;:&quot;#NEZHA#\\n#DATETIME#&quot;},&quot;msg_type&quot;:&quot;text&quot;}</code></li></ul></details><h2 id="告警规则说明" tabindex="-1">告警规则说明 <a class="header-anchor" href="#告警规则说明" aria-label="Permalink to &quot;告警规则说明&quot;">​</a></h2><h3 id="基本规则" tabindex="-1">基本规则 <a class="header-anchor" href="#基本规则" aria-label="Permalink to &quot;基本规则&quot;">​</a></h3><ul><li><code>type</code>：可选取一个或多个类型，如在一个规则中选择了多个类型，需要<strong>同时满足</strong>所有选择的类型才会触发通知（可参考后面的示例） <ul><li><code>cpu</code>、<code>memory</code>、<code>swap</code>、<code>disk</code></li><li><code>net_in_speed</code> 入站网速、<code>net_out_speed</code> 出站网速、<code>net_all_speed</code> 双向网速、<code>transfer_in</code> 入站流量、<code>transfer_out</code> 出站流量、<code>transfer_all</code> 双向流量</li><li><code>offline</code> 离线监控</li><li><code>load1</code>、<code>load5</code>、<code>load15</code> 负载</li><li><code>process_count</code> 进程数（目前取线程数占用资源太多，暂时不支持）</li><li><code>tcp_conn_count</code>、<code>udp_conn_count</code> 连接数</li></ul></li><li><code>duration</code>：持续数秒，数秒内采样记录 30% 以上触发阈值才会告警（防数据插针）</li><li><code>min</code> 或 <code>max</code>： <ul><li>流量、网速类单位为字节（1KB=1024B，1MB=1024*1024B）</li><li>内存、硬盘、CPU 以占用百分比计数</li><li>离线监控无需设置此项</li></ul></li><li><code>cover</code>： <ul><li><code>0</code> 监控所有服务器，通过 <code>ignore</code> 忽略特定服务器</li><li><code>1</code> 忽略所有服务器，通过 <code>ignore</code> 监控特定服务器<br> 例如：<code>[{&quot;type&quot;:&quot;offline&quot;,&quot;duration&quot;:10, &quot;cover&quot;:0, &quot;ignore&quot;:{&quot;5&quot;: true}}]</code></li></ul></li><li><code>ignore</code>：选择忽略特定服务器，搭配 <code>cover</code> 使用，内容为服务器 ID 和布尔值，例如：<code>{&quot;1&quot;: true, &quot;2&quot;: false}</code></li></ul><p><strong>完整示例:</strong></p><p>添加一个离线告警：</p><ul><li>名称：离线通知</li><li>规则：<code>[{&quot;Type&quot;:&quot;offline&quot;,&quot;Duration&quot;:10}]</code></li><li>启用：√</li></ul><p>添加一个监控 CPU 持续 10 秒超过 50% <strong>且</strong> 内存持续 20 秒占用低于 20% 的告警：</p><ul><li>名称：CPU+内存</li><li>规则：<code>[{&quot;Type&quot;:&quot;cpu&quot;,&quot;Min&quot;:0,&quot;Max&quot;:50,&quot;Duration&quot;:10},{&quot;Type&quot;:&quot;memory&quot;,&quot;Min&quot;:20,&quot;Max&quot;:0,&quot;Duration&quot;:20}]</code></li><li>启用：√</li></ul><p>将特定的服务器通知发送到特定的通知分组：</p><p>示例场景：<br> 有 1、2、3、4 四台服务器和 A、B 两个不同的通知组。<br> 1、2 这两台服务器掉线十分钟后给通知组 A 发送通知。<br> 3、4 这两台服务器掉线十分钟后给通知组 B 发送通知。</p><p>首先你需要先设置好 A、B 两个通知组，然后添加两条告警规则：</p><p><strong>规则一：</strong></p><ul><li>名称：1、2 离线，发送给通知组 A</li><li>规则：<code>[{&quot;type&quot;:&quot;offline&quot;,&quot;duration&quot;:600,&quot;cover&quot;:1,&quot;ignore&quot;:{&quot;1&quot;:true,&quot;2&quot;:true}}]</code></li><li>通知方式组：A</li><li>启用：√</li></ul><p><strong>规则二：</strong></p><ul><li>名称：3、4 离线，发送给通知组 B</li><li>规则：<code>[{&quot;type&quot;:&quot;offline&quot;,&quot;duration&quot;:600,&quot;cover&quot;:1,&quot;ignore&quot;:{&quot;3&quot;:true,&quot;4&quot;:true}}]</code></li><li>通知方式组：B</li><li>启用：√</li></ul><p><strong>灵活使用参数可以让你的告警功能被充分使用</strong></p><h3 id="特殊-任意周期流量告警" tabindex="-1">特殊：任意周期流量告警 <a class="header-anchor" href="#特殊-任意周期流量告警" aria-label="Permalink to &quot;特殊：任意周期流量告警&quot;">​</a></h3><p>可以用作月流量监控</p><ul><li><code>type</code>： <ul><li><code>transfer_in_cycle</code> 周期内的入站流量</li><li><code>transfer_out_cycle</code> 周期内的出站流量</li><li><code>transfer_all_cycle</code> 周期内双向流量的和</li></ul></li><li><code>cycle_start</code>：统计周期开始日期（可以是你机器计费周期的开始日期），时间格式为 RFC3339，例如北京时间为 <code>2022-01-11T08:00:00.00+08:00</code></li><li><code>cycle_interval</code>：统计周期单位的数量（例如，周期单位为天，该值为 7，则代表每隔 7 天统计一次）</li><li><code>cycle_unit</code>：统计周期单位，默认 <code>hour</code>，可选（<code>hour</code>, <code>day</code>, <code>week</code>, <code>month</code>, <code>year</code>）</li><li><code>min/max</code>、<code>cover</code>、<code>ignore</code> 参考基本规则配置</li></ul><p>示例:</p><p>ID 为 3 和 4 的服务器（ignore 里面定义），以每月 1 号为统计周期，周期内统计的出站月流量达到 1TB 时告警：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;transfer_out_cycle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;max&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1099511627776</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;cycle_start&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2022-01-01T00:00:00+08:00&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;cycle_interval&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;cycle_unit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;month&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;cover&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;ignore&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;3&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;4&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}}]</span></span></code></pre></div><h2 id="通知触发模式" tabindex="-1">通知触发模式 <a class="header-anchor" href="#通知触发模式" aria-label="Permalink to &quot;通知触发模式&quot;">​</a></h2><ul><li><strong>始终触发</strong>：每当 Agent 上报的状态符合告警的规则时，都会触发一次通知。</li><li><strong>单次触发</strong>：仅状态改变时触发一次通知，如从正常状态改变为异常状态，或异常状态恢复为正常状态。</li></ul><h2 id="设置告警时执行任务" tabindex="-1">设置告警时执行任务 <a class="header-anchor" href="#设置告警时执行任务" aria-label="Permalink to &quot;设置告警时执行任务&quot;">​</a></h2><p>如果需要在发出告警消息的同时执行某项任务，可以设置此项目。</p><ul><li><strong>告警时触发任务</strong>：当告警状态符合从“正常”变更为“事件”时，所要执行的任务，任务应提前在任务页设置。</li><li><strong>恢复时触发任务</strong>：当告警状态符合从“事件”恢复为“正常”时，所要执行的任务，任务应提前在任务页设置。</li></ul>`,51),n=[e];function h(o,k,p,r,d,u){return a(),s("div",null,n)}const g=i(l,[["render",h]]);export{c as __pageData,g as default};
