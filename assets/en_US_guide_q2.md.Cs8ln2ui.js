import{_ as e,c as t,o,a4 as n}from"./chunks/framework.BmdFiWrL.js";const g=JSON.parse('{"title":"Agent Startup/Online Troubleshooting Process","description":"","frontmatter":{},"headers":[],"relativePath":"en_US/guide/q2.md","filePath":"en_US/guide/q2.md","lastUpdated":1733027137000}'),r={name:"en_US/guide/q2.md"},a=n('<h1 id="agent-startup-online-troubleshooting-process" tabindex="-1">Agent Startup/Online Troubleshooting Process <a class="header-anchor" href="#agent-startup-online-troubleshooting-process" aria-label="Permalink to &quot;Agent Startup/Online Troubleshooting Process&quot;">​</a></h1><ol><li>Directly execute <code>/opt/nezha/agent/nezha-agent -s DashboardIP or non-CDN domain:RPCPort -p AgentKey -d</code> to check if the logs indicate timeouts due to DNS or poor network conditions.</li><li>Use <code>nc -v Domain/IP RPCPort</code> or <code>telnet Domain/IP RPCPort</code> to check for network issues, inspect the inbound and outbound firewalls of the local machine and the panel server. If you cannot determine the issue, you can use the port checking tool provided by <a href="https://port.ping.pe/" target="_blank" rel="noreferrer">https://port.ping.pe/</a>.</li><li>If the above steps indicate no issues but the Agent still does not go online correctly, try disabling SELinux. <a href="https://www.google.com/search?q=disable+SELINUX" target="_blank" rel="noreferrer">How to disable SELinux?</a></li></ol>',2),s=[a];function i(c,l,d,h,p,u){return o(),t("div",null,s)}const f=e(r,[["render",i]]);export{g as __pageData,f as default};