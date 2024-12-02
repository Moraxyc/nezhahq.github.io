import{_ as a,c as e,o as i,a4 as t}from"./chunks/framework.BmdFiWrL.js";const b=JSON.parse('{"title":"真实 IP 请求头","description":"","frontmatter":{},"headers":[],"relativePath":"guide/q12.md","filePath":"guide/q12.md","lastUpdated":1733168573000}'),o={name:"guide/q12.md"},l=t('<h1 id="真实-ip-请求头" tabindex="-1">真实 IP 请求头 <a class="header-anchor" href="#真实-ip-请求头" aria-label="Permalink to &quot;真实 IP 请求头&quot;">​</a></h1><p>由于 V1 版本引入了本地账户机制，为防止外界暴力破解登录接口（Web 应用防火墙功能），程序需要准确获取客户端的真实 IP 地址。<br> 此功能可通过路径 <strong><code>/dashboard/settings/waf</code></strong> 进行管理配置。</p><hr><h2 id="配置场景" tabindex="-1">配置场景 <a class="header-anchor" href="#配置场景" aria-label="Permalink to &quot;配置场景&quot;">​</a></h2><p>根据服务部署方式的不同，有以下两种配置场景：</p><h3 id="_1-直接将面板服务映射至公网" tabindex="-1">1. 直接将面板服务映射至公网 <a class="header-anchor" href="#_1-直接将面板服务映射至公网" aria-label="Permalink to &quot;1. 直接将面板服务映射至公网&quot;">​</a></h3><ul><li>勾选 <strong><code>使用直连 IP</code></strong> 即可，无需额外配置。</li></ul><hr><h3 id="_2-使用-web-容器反向代理或-cdn" tabindex="-1">2. 使用 Web 容器反向代理或 CDN <a class="header-anchor" href="#_2-使用-web-容器反向代理或-cdn" aria-label="Permalink to &quot;2. 使用 Web 容器反向代理或 CDN&quot;">​</a></h3><ul><li>参考 <a href="/guide/q3.html">反向代理配置</a> 文档。</li><li>在示例配置中，使用了 <code>nz-realip</code> 请求头，您可以沿用或修改为其他自定义值。</li><li>确保代理服务器正确设置请求头，并将客户端 IP 地址通过自定义头部传递给 Dashboard。</li></ul><hr><h2 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h2><h3 id="q1-配置错误导致无法访问面板或探针掉线-如何恢复" tabindex="-1">Q1: 配置错误导致无法访问面板或探针掉线，如何恢复？ <a class="header-anchor" href="#q1-配置错误导致无法访问面板或探针掉线-如何恢复" aria-label="Permalink to &quot;Q1: 配置错误导致无法访问面板或探针掉线，如何恢复？&quot;">​</a></h3><ol><li><p>修改面板配置文件：<br> 文件路径为 <code>/data/config.yaml</code>，找到以下配置项：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">realipheader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span></span></code></pre></div><p>将 <code>realipheader</code> 设置为空值（<code>&quot;&quot;</code>），保存并退出。</p></li><li><p>重启面板服务。</p></li><li><p>重新访问面板并验证连接是否恢复正常。</p></li></ol>',14),s=[l];function r(d,h,n,c,p,u){return i(),e("div",null,s)}const q=a(o,[["render",r]]);export{b as __pageData,q as default};
