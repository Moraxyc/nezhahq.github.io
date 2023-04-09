import{_ as n,c as a,o as t,a as s}from"./app.3817bf4e.js";const k='{"title":"Install Agent using one-click script","description":"","frontmatter":{},"headers":[{"level":2,"title":"Install Agent using one-click script","slug":"install-agent-using-one-click-script"},{"level":3,"title":"Preparation","slug":"preparation"},{"level":3,"title":"One-click installation on Linux (Ubuntu, Debian, CentOS)","slug":"one-click-installation-on-linux-ubuntu-debian-centos"},{"level":3,"title":"One-click installation on Windows","slug":"one-click-installation-on-windows"},{"level":2,"title":"Other ways to install Agent","slug":"other-ways-to-install-agent"},{"level":3,"title":"Installing Agent on Linux (Ubuntu, Debian, CentOS)","slug":"installing-agent-on-linux-ubuntu-debian-centos"},{"level":3,"title":"Installing Agent on other Linux (such as alpine use oprec not systemd)","slug":"installing-agent-on-other-linux-such-as-alpine-use-oprec-not-systemd"},{"level":3,"title":"Installing Agent on Windows","slug":"installing-agent-on-windows"},{"level":3,"title":"Installing Agent on Synology DSM","slug":"installing-agent-on-synology-dsm"},{"level":3,"title":"Installing Agent on MacOS","slug":"installing-agent-on-macos"},{"level":3,"title":"Installing Agent on OpenWRT","slug":"installing-agent-on-openwrt"},{"level":2,"title":"FAQ","slug":"faq"},{"level":3,"title":"Is there a Docker image for Agent?","slug":"is-there-a-docker-image-for-agent"}],"relativePath":"en_US/guide/agent.md","lastUpdated":1681026579000}',e={},o=s(`<p><strong>The service in the monitored server is called Agent. This document will describe how to install the Agent on the monitored server and connect it with Dashboard</strong><br><br></p><h2 id="install-agent-using-one-click-script" tabindex="-1">Install Agent using one-click script <a class="header-anchor" href="#install-agent-using-one-click-script" aria-hidden="true">#</a></h2><p>Nezha Monitoring now supports one-click installation of the Agent on Windows and Linux. Follow the steps in this document and you can easily deploy it on your server<br><br></p><h3 id="preparation" tabindex="-1">Preparation <a class="header-anchor" href="#preparation" aria-hidden="true">#</a></h3><p>First of all, you need to set up the communication domain name in the settings page of the admin panel, this domain name can not connect to the CDN, here is the sample communication domain name &quot;<a href="http://data.example.com" target="_blank" rel="noopener noreferrer">data.example.com</a>&quot; mentioned earlier for demonstration<br> Enter the administration panel, go to the &quot;Settings&quot; page, in the item &quot;CDN Bypassed Domain/IP &quot;, fill in the communication domain name, and then click &quot;Save&quot;<br><br></p><h3 id="one-click-installation-on-linux-ubuntu-debian-centos" tabindex="-1">One-click installation on Linux (Ubuntu, Debian, CentOS) <a class="header-anchor" href="#one-click-installation-on-linux-ubuntu-debian-centos" aria-hidden="true">#</a></h3><ul><li>First add a server in the admin panel</li><li>Click on the green Linux icon button next to the newly added server and copy the one-click installation command</li><li>Run the copied one-click installation command on the monitored server, wait for the installation to complete, and then return to the Dashboard home page to see if the server is online.<br><br></li></ul><h3 id="one-click-installation-on-windows" tabindex="-1">One-click installation on Windows <a class="header-anchor" href="#one-click-installation-on-windows" aria-hidden="true">#</a></h3><ul><li>First add a server in the admin panel</li><li>Click on the green Linux icon button next to the newly added server and copy the one-click installation command</li><li>Login to Windows Server, open PowerShell, and run the copied installation command in PowerShell</li><li>If you encounter the prompt &quot;Implement Policy Change&quot; please select Y</li><li>Wait for the installation to complete and return to the Dashboard home page to see if the server is online<br><br><br><br></li></ul><h2 id="other-ways-to-install-agent" tabindex="-1">Other ways to install Agent <a class="header-anchor" href="#other-ways-to-install-agent" aria-hidden="true">#</a></h2><br><h3 id="installing-agent-on-linux-ubuntu-debian-centos" tabindex="-1">Installing Agent on Linux (Ubuntu, Debian, CentOS) <a class="header-anchor" href="#installing-agent-on-linux-ubuntu-debian-centos" aria-hidden="true">#</a></h3><ul><li>First add a server in the admin panel</li><li>In the monitored server, run the script:</li></ul><div class="language-bash"><pre><code><span class="token function">curl</span> -L https://raw.githubusercontent.com/naiba/nezha/master/script/install_en.sh  -o nezha.sh <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x nezha.sh <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> ./nezha.sh   
</code></pre></div><ul><li><p>Select \u201CInstall_agent\u201D</p></li><li><p>Input the communication domain name, e.g. &quot;<a href="http://data.example.com" target="_blank" rel="noopener noreferrer">data.example.com</a>&quot;</p></li><li><p>Input RPC port, default is 5555</p></li><li><p>Input the Agent Secret, which is generated when adding a server in the administration panel and can be found in the &quot; Servers &quot; page of the administration panel</p></li><li><p>Wait for the installation to complete and return to the Dashboard home page to see if the server is online<br><br></p></li></ul><h3 id="installing-agent-on-other-linux-such-as-alpine-use-oprec-not-systemd" tabindex="-1">Installing Agent on other Linux (such as alpine use oprec not systemd) <a class="header-anchor" href="#installing-agent-on-other-linux-such-as-alpine-use-oprec-not-systemd" aria-hidden="true">#</a></h3><p>Contributed by <a href="https://github.com/unknwon0054" target="_blank" rel="noopener noreferrer">unknown0054</a></p><ul><li>Edit SERVER,SECRET,TLS then run it in Shell</li></ul><div class="language-shell"><pre><code><span class="token function">cat</span> <span class="token operator">&gt;</span>/etc/init.d/nezha-agent<span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/sbin/openrc-run
SERVER=&quot;&quot; #Dashboard address ip:port
SECRET=&quot;&quot; #SECRET
TLS=&quot;&quot; # Enable tls?  yes:&quot;--tls&quot; no:&quot;&quot;
NZ_BASE_PATH=&quot;/opt/nezha&quot;
NZ_AGENT_PATH=&quot;<span class="token variable">\${NZ_BASE_PATH}</span>/agent&quot;
pidfile=&quot;/run/<span class="token variable">\${RC_SVCNAME}</span>.pid&quot;
command=&quot;/opt/nezha/agent/nezha-agent&quot;
command_args=&quot;-s <span class="token variable">\${SERVER}</span>  -p <span class="token variable">\${SECRET}</span> <span class="token variable">\${TLS}</span>&quot;
command_background=true
depend() {
	need net
}
checkconfig() {
	GITHUB_URL=&quot;github.com&quot;
	if [ ! -f &quot;<span class="token variable">\${NZ_AGENT_PATH}</span>/nezha-agent&quot; ]; then
		if [[ <span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -m <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;x86_64&#39;</span><span class="token variable">)</span></span> != &quot;&quot; ]]; then
			os_arch=&quot;amd64&quot;
		elif [[ <span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -m <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;i386\\|i686&#39;</span><span class="token variable">)</span></span> != &quot;&quot; ]]; then
			os_arch=&quot;386&quot;
		elif [[ <span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -m <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;aarch64\\|armv8b\\|armv8l&#39;</span><span class="token variable">)</span></span> != &quot;&quot; ]]; then
			os_arch=&quot;arm64&quot;
		elif [[ <span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -m <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;arm&#39;</span><span class="token variable">)</span></span> != &quot;&quot; ]]; then
			os_arch=&quot;arm&quot;
		elif [[ <span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -m <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;s390x&#39;</span><span class="token variable">)</span></span> != &quot;&quot; ]]; then
			os_arch=&quot;s390x&quot;
		elif [[ <span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -m <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;riscv64&#39;</span><span class="token variable">)</span></span> != &quot;&quot; ]]; then
			os_arch=&quot;riscv64&quot;
		fi
		local version=<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> -m <span class="token number">10</span> -sL <span class="token string">&quot;https://api.github.com/repos/naiba/nezha/releases/latest&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;tag_name&quot;</span> <span class="token operator">|</span> <span class="token function">head</span> -n <span class="token number">1</span> <span class="token operator">|</span> <span class="token function">awk</span> -F <span class="token string">&quot;:&quot;</span> <span class="token string">&#39;{print $2}&#39;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&#39;s/\\&quot;//g;s/,//g;s/ //g&#39;</span><span class="token variable">)</span></span>
		if [ ! -n &quot;<span class="token variable">$version</span>&quot; ]; then
			version=<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> -m <span class="token number">10</span> -sL <span class="token string">&quot;https://fastly.jsdelivr.net/gh/naiba/nezha/&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;option\\.value&quot;</span> <span class="token operator">|</span> <span class="token function">awk</span> -F <span class="token string">&quot;&#39;&quot;</span> <span class="token string">&#39;{print $2}&#39;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&#39;s/naiba\\/nezha@/v/g&#39;</span><span class="token variable">)</span></span>
		fi
		if [ ! -n &quot;<span class="token variable">$version</span>&quot; ]; then
			version=<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> -m <span class="token number">10</span> -sL <span class="token string">&quot;https://gcore.jsdelivr.net/gh/naiba/nezha/&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;option\\.value&quot;</span> <span class="token operator">|</span> <span class="token function">awk</span> -F <span class="token string">&quot;&#39;&quot;</span> <span class="token string">&#39;{print $2}&#39;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&#39;s/naiba\\/nezha@/v/g&#39;</span><span class="token variable">)</span></span>
		fi
		if [ ! -n &quot;<span class="token variable">$version</span>&quot; ]; then
			echo -e &quot;Failed to get the version number, please check if the network can connect to https://api.github.com/repos/naiba/nezha/releases/latest&quot;
			return 0
		else
			echo -e &quot;The current latest version is: <span class="token variable">\${version}</span>&quot;
		fi
		wget -t 2 -T 10 -O nezha-agent_linux_<span class="token variable">\${os_arch}</span>.zip https://<span class="token variable">\${GITHUB_URL}</span>/naiba/nezha/releases/download/<span class="token variable">\${version}</span>/nezha-agent_linux_<span class="token variable">\${os_arch}</span>.zip &gt;/dev/null 2&gt;&amp;1
		if [[ <span class="token variable">$?</span> != 0 ]]; then
			echo -e &quot;Release download failed, please check if the network can connect to <span class="token variable">\${GITHUB_URL}</span><span class="token variable">\${plain}</span>&quot;
			return 0
		fi
		mkdir -p <span class="token variable">$NZ_AGENT_PATH</span>
		chmod 755 -R <span class="token variable">$NZ_AGENT_PATH</span>
		unzip -qo nezha-agent_linux_<span class="token variable">\${os_arch}</span>.zip &amp;&amp; mv nezha-agent <span class="token variable">$NZ_AGENT_PATH</span> &amp;&amp; rm -rf nezha-agent_linux_<span class="token variable">\${os_arch}</span>.zip README.md
	fi
	if [ ! -x &quot;<span class="token variable">\${NZ_AGENT_PATH}</span>/nezha-agent&quot; ]; then
		chmod +x <span class="token variable">\${NZ_AGENT_PATH}</span>/nezha-agent
	fi
}
start_pre() {
	if [ &quot;<span class="token variable">\${RC_CMD}</span>&quot; != &quot;restart&quot; ]; then
		checkconfig || return <span class="token variable">$?</span>
	fi
}
EOF</span>
</code></pre></div><ul><li><p>Add execute permission</p><div class="language-shell"><pre><code><span class="token function">chmod</span> +x /etc/init.d/nezha-agent
</code></pre></div></li><li><p>Run Nezha-Agent</p><div class="language-shell"><pre><code>rc-service nezha-agent-hy start
</code></pre></div></li><li><p>Set self-start after boot</p><div class="language-shell"><pre><code>rc-update <span class="token function">add</span> nezha-agent
</code></pre></div></li></ul><h3 id="installing-agent-on-windows" tabindex="-1">Installing Agent on Windows <a class="header-anchor" href="#installing-agent-on-windows" aria-hidden="true">#</a></h3><ul><li>Please refer to the community article:<br><a href="https://nyko.me/2020/12/13/nezha-windows-client.html" target="_blank" rel="noopener noreferrer">\u54EA\u5412\u63A2\u9488 - Windows \u5BA2\u6237\u7AEF\u5B89\u88C5</a> (Chinese)<br><br></li></ul><h3 id="installing-agent-on-synology-dsm" tabindex="-1">Installing Agent on Synology DSM <a class="header-anchor" href="#installing-agent-on-synology-dsm" aria-hidden="true">#</a></h3><ul><li><p>Please refer to the community article:<br><a href="https://blog.mitsea.com/3929551d08bd4bb0a8baa453e2d92b0c/" target="_blank" rel="noopener noreferrer">\u7FA4\u6656 DSM 7.x \u5B89\u88C5 \u54EA\u5412\u76D1\u63A7 Agent</a> (Chinese)<br><a href="https://wl.gta5pdx.cn/archives/546/" target="_blank" rel="noopener noreferrer">\u54EA\u5412\u63A2\u9488\u2014\u2014\u7FA4\u6656\u5BA2\u6237\u7AEF\uFF08\u88AB\u63A7\u7AEF\uFF09\u5B89\u88C5\u6559\u7A0B</a> (Chinese)</p></li><li><p>Using Systemd <em>Only available on DSM7</em>:</p><div class="language-sh"><pre><code># Path of the agent binary file.
EXEC=&quot;/PATH/TO/nezha-agent&quot;
# Path of the agent&#39;s log.
LOG=&quot;\${EXEC}.log&quot;
# Extend arguments, can be blank.
ARGS=&quot;--disable-command-execute&quot;
# The address of nezha server&#39;s GRPC.
SERVER=&quot;HOST_OR_IP:GRPC_PORT&quot;
# The token of host.
SECRET=&quot;APP_SECRET&quot;
# Specify \`run_as\` user. * Strongly suggest NOT use \`root\`! *
RUN_USER=&quot;nezha&quot;
# Create the service file.
cat &lt;&lt; EOF &gt; /usr/lib/systemd/system/nezha.service
[Unit]
Description=Nezha Agent Service
After=network.target
[Service]
Type=simple
ExecStart=/bin/nohup \${EXEC} \${ARGS} -s \${SERVER} -p \${SECRET} &amp;&gt;&gt; \${LOG} &amp;
ExecStop=ps -fe |grep nezha-agent|awk &#39;{print \\$2}&#39;|xargs kill
User=\${RUN_USER}
Restart=on-abort
[Install]
WantedBy=multi-user.target
EOF
# Reload services
systemctl daemon-reload
# Start the agent service
systemctl start nezha
# Enable auto-start
systemctl enable nezha
</code></pre></div><p>\u203C\uFE0FDO IT WHEN YOU HAVE MODIFIED THE ENVS\u203C\uFE0F</p><p>Using <code>root</code> to execute command above, that&#39;s all.</p></li></ul><br><h3 id="installing-agent-on-macos" tabindex="-1">Installing Agent on MacOS <a class="header-anchor" href="#installing-agent-on-macos" aria-hidden="true">#</a></h3><p><em><strong>This section is adapted from <a href="https://blog.mitsea.com/e796f93db38d49e4b18df234c6ee75f5" target="_blank" rel="noopener noreferrer">Mitsea Blog</a>, with permission from the original author</strong></em><br><br></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If you are prompted with &quot;macOS cannot verify this app&quot; during installation, please go to system settings to allow the app to run.</p></div><ul><li>First add a server in the admin panel</li><li>Go to the <a href="https://github.com/naiba/nezha/releases" target="_blank" rel="noopener noreferrer">Release</a> page to download the Agent binary and choose whether to download the darwin amd64 or arm64 Agent depending on the CPU architecture<br> For example, download the amd64 version for Intel CPU and the arm64 version for Apple Silicon. After downloading, extract the Agent binary file, e.g. to the Download folder</li><li>Create a new file named <code>nezha_agent.plist</code> and save it, edit the contents of the file:</li></ul><div class="language-xml"><pre><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">plist</span> <span class="token name">PUBLIC</span> <span class="token string">&quot;-//Apple//DTD PLIST 1.0//EN&quot;</span> <span class="token string">&quot;http://www.apple.com/DTDs/PropertyList-1.0.dtd&quot;</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plist</span> <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dict</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">&gt;</span></span>KeepAlive<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>true</span><span class="token punctuation">/&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">&gt;</span></span>Label<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">&gt;</span></span>nezha_agent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">&gt;</span></span>Program<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">&gt;</span></span>Change the path of the Agent binary here, e.g. /Users/123/Downloads/nezha-agent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">&gt;</span></span>ProgramArguments<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>array</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">&gt;</span></span>Change the path of the Agent binary here, e.g. /Users/123/Downloads/nezha-agent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">&gt;</span></span>--password<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">&gt;</span></span>Communication Secret, eg: 529664783eeb23cc25<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">&gt;</span></span>--server<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">&gt;</span></span>Communication URL and RPC port, eg:data.example.com:5555<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>array</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">&gt;</span></span>RunAtLoad<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>true</span><span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dict</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plist</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><ul><li>Use the following command in Terminal to load the plist file into launchd<br><strong>Be sure to change the file path</strong></li></ul><div class="language-shell"><pre><code>launchctl load /Users/123/Desktop/nezha_agent.plist
</code></pre></div><ul><li>Start Service</li></ul><div class="language-shell"><pre><code>launchctl start nezha_agent
</code></pre></div><ul><li>Check if the service is running</li></ul><div class="language-shell"><pre><code>launchctl list <span class="token operator">|</span> <span class="token function">grep</span> nezha_agent
</code></pre></div><ul><li>Stop service and remove</li></ul><div class="language-shell"><pre><code>launchctl stop nezha_agent
</code></pre></div><div class="language-shell"><pre><code>launchctl remove nezha_agent
</code></pre></div><br><h3 id="installing-agent-on-openwrt" tabindex="-1">Installing Agent on OpenWRT <a class="header-anchor" href="#installing-agent-on-openwrt" aria-hidden="true">#</a></h3><p><strong>How to solve various problems during the installation process in one step</strong></p><ul><li>Please refer to the project:<br><a href="https://github.com/dysf888/NZ-OpenWrt" target="_blank" rel="noopener noreferrer">NZ-OpenWrt</a> (Chinese) <br></li></ul><p><strong>How to make the old version of OpenWRT/LEDE self-boot?</strong></p><ul><li>Please refer to the project:<br><a href="https://github.com/Erope/openwrt_nezha" target="_blank" rel="noopener noreferrer">\u54EA\u5412\u76D1\u63A7 For OpenWRT</a> (Chinese) <br></li></ul><p><strong>How to make the new version of OpenWRT self-boot? By @\u827E\u65AF\u5FB7\u65AF</strong></p><ul><li>First download the corresponding binary from the release, unzip the zip package and place it in <code>/root</code></li><li>Then run <code>chmod +x /root/nezha-agent</code> to give it execute access, create file <code>/etc/init.d/nezha-service</code>\uFF1A</li></ul><div class="language-shell"><pre><code><span class="token shebang important">#!/bin/sh /etc/rc.common</span>

<span class="token assign-left variable">START</span><span class="token operator">=</span><span class="token number">99</span>
<span class="token assign-left variable">USE_PROCD</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token function-name function">start_service</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 procd_open_instance
 procd_set_param <span class="token builtin class-name">command</span> /root/nezha-agent -s data.example.com:5555 -p secreat -d
 procd_set_param respawn
 procd_close_instance
<span class="token punctuation">}</span>

<span class="token function-name function">stop_service</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">killall</span> nezha-agent
<span class="token punctuation">}</span>

<span class="token function-name function">restart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 stop
 <span class="token function">sleep</span> <span class="token number">2</span>
 start
<span class="token punctuation">}</span>
</code></pre></div><ul><li>Give it permission to execute: <code>chmod +x /etc/init.d/nezha-service</code></li><li>Start the service <code>/etc/init.d/nezha-service enable &amp;&amp; /etc/init.d/nezha-service start</code><br><br></li></ul><h2 id="faq" tabindex="-1">FAQ <a class="header-anchor" href="#faq" aria-hidden="true">#</a></h2><h3 id="is-there-a-docker-image-for-agent" tabindex="-1">Is there a Docker image for Agent? <a class="header-anchor" href="#is-there-a-docker-image-for-agent" aria-hidden="true">#</a></h3><p><strong>There is currently no Docker image for Agent.</strong><br> The Agent is designed to be the opposite of the Dashboard, in that the Dashboard is designed to work without affecting the server as much as possible, while the Agent needs to execute monitoring services and run commands in the server.<br> Putting the Agent in a container does continue to execute monitoring services, but features such as WebShell do not work, so we do not provide Docker image of the Agent.</p>`,52),p=[o];function l(i,c,r,u,g,h){return t(),a("div",null,p)}var m=n(e,[["render",l]]);export{k as __pageData,m as default};
