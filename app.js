/* ============================================================
   华仔效率工坊 · EfficientTool Studio — 应用逻辑
   纯前端实现，可直接用浏览器打开 index.html
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- 工具函数 ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------------- SVG 线性图标（统一描边语言） ---------------- */
  const ICON = {
    home:    '<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',
    table:   '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14.5h18M9 9v11M15 9v11"/>',
    pdf:     '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M12 11v6M9.5 14.5L12 17l2.5-2.5"/>',
    crop:    '<path d="M7 3v13a2 2 0 0 0 2 2h12"/><path d="M3 7h13a2 2 0 0 1 2 2v12"/>',
    collage: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>',
    video:   '<rect x="2.5" y="5" width="14" height="14" rx="2.5"/><path d="M16.5 10l5-3v10l-5-3z"/>',
    clock:   '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3.5 2.5"/>',
    menu:    '<path d="M4 7h16M4 12h16M4 17h16"/>',
    copy:    '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
    spark:   '<path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z"/>',
    refresh: '<path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v4h-4"/>',
    rotate:  '<path d="M4 12a8 8 0 1 0 2.6-5.9M4 4v4h4"/>',
    trash:   '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    layoutH: '<rect x="2.5" y="6" width="8" height="12" rx="1.5"/><rect x="13.5" y="6" width="8" height="12" rx="1.5"/>',
    layoutV: '<rect x="6" y="2.5" width="12" height="8" rx="1.5"/><rect x="6" y="13.5" width="12" height="8" rx="1.5"/>',
    upload:  '<path d="M12 16V4M7.5 8.5L12 4l4.5 4.5"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    sun:     '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>',
    moon:    '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
    idcard:  '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2.1"/><path d="M5.5 16.2c.9-1.6 2-2.4 3-2.4s2.1.8 3 2.4"/><path d="M14.5 9.5h4M14.5 12.5h4M14.5 15.5h3"/>',
    chev:    '<path d="M6 9l6 6 6-6"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c.9 0 1.4-.7 1.4-1.4 0-.9.7-1.4 1.4-1.4H16a3.5 3.5 0 0 0 3.5-3.5C19.5 7.5 16 3 12 3z"/><circle cx="7.5" cy="11" r="1.1" fill="currentColor" stroke="none"/><circle cx="10" cy="7.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="16.5" cy="11" r="1.1" fill="currentColor" stroke="none"/>',
    text:    '<path d="M5 6h14M5 6V4.5h14V6M12 6v13M9 19h6"/>',
    json:    '<path d="M9.5 4C7 5.2 6.5 7.6 7 10c.3 1.7.3 2.6 0 4.4.5 2.4 0 4.8-2.5 6"/><path d="M14.5 4c2.5 1.2 3 3.6 2.5 6c-.3 1.7-.3 2.6 0 4.4C17 17.4 16.5 19.8 14 21"/>',
    ai:      '<rect x="5" y="8" width="14" height="11" rx="2.5"/><path d="M12 8V5M9 13h.01M15 13h.01M9 16h6"/>',
    sites:   '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/>',
    pet:     '<circle cx="6.5" cy="10" r="2" fill="currentColor" stroke="none"/><circle cx="10" cy="7.5" r="2" fill="currentColor" stroke="none"/><circle cx="14" cy="7.5" r="2" fill="currentColor" stroke="none"/><circle cx="17.5" cy="10" r="2" fill="currentColor" stroke="none"/><path d="M12 12c-2.5 0-4.5 1.8-4.8 4.2-.3 2.4.6 4.8 4.8 4.8s5.1-2.4 4.8-4.8C16.5 13.8 14.5 12 12 12z"/>',
  };
  function svg(name, size) {
    size = size || 22;
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICON[name] || '') + '</svg>';
  }
  // 填充静态 HTML 里的 <span data-icon="xxx"> 占位
  function paintIcons(root) {
    $$('[data-icon]', root || document).forEach(el => {
      if (!el.firstElementChild) el.innerHTML = svg(el.dataset.icon, +el.dataset.size || 20);
    });
  }

  function formatBytes(b) {
    if (!b && b !== 0) return '-';
    if (b < 1024) return b + ' B';
    const u = ['KB', 'MB', 'GB'];
    let i = -1, n = b;
    do { n /= 1024; i++; } while (n >= 1024 && i < u.length - 1);
    return n.toFixed(n < 10 ? 2 : 1) + ' ' + u[i];
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const uid = () => Math.random().toString(36).slice(2, 9);

  let toastTimer = null;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.hidden = false;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => (t.hidden = true), 200);
    }, 2200);
  }

  function downloadBlob(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast('已复制')).catch(() => fallbackCopy(text));
    } else fallbackCopy(text);
  }
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('已复制'); } catch { toast('复制失败'); }
    ta.remove();
  }

  // 多时区日期时间格式化（tz 为空表示本地时区）
  function fmtDateTime(ms, tz) {
    const d = new Date(ms);
    const opts = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    if (tz) opts.timeZone = tz;
    try { return new Intl.DateTimeFormat('zh-CN', opts).format(d); }
    catch { return d.toLocaleString(); }
  }

  let tsTimer = null; // 时间戳页实时时钟句柄

  function buildTsOut(ms, tz) {
    const d = new Date(ms);
    const tzLabel = tz ? tz : '本地';
    return `
      <div class="ts-row"><span class="ts-k">${tzLabel}</span><span class="ts-v">${fmtDateTime(ms, tz)}</span><button class="ts-copy" data-c="${fmtDateTime(ms, tz)}" aria-label="复制">${svg('copy', 15)}</button></div>
      <div class="ts-row"><span class="ts-k">UTC</span><span class="ts-v">${fmtDateTime(ms, 'UTC')}</span><button class="ts-copy" data-c="${fmtDateTime(ms, 'UTC')}" aria-label="复制">${svg('copy', 15)}</button></div>
      <div class="ts-row"><span class="ts-k">ISO 8601</span><span class="ts-v">${d.toISOString()}</span><button class="ts-copy" data-c="${d.toISOString()}" aria-label="复制">${svg('copy', 15)}</button></div>
      <div class="ts-row"><span class="ts-k">毫秒</span><span class="ts-v">${ms}</span><button class="ts-copy" data-c="${ms}" aria-label="复制">${svg('copy', 15)}</button></div>`;
  }

  /* ---------------- 处理记录 ---------------- */
  const REC_KEY = 'ets_records';
  function loadRecords() {
    try { return JSON.parse(localStorage.getItem(REC_KEY)) || []; }
    catch { return []; }
  }
  function addRecord(r) {
    const list = loadRecords();
    list.unshift(Object.assign({ time: new Date().toLocaleString('zh-CN') }, r));
    localStorage.setItem(REC_KEY, JSON.stringify(list.slice(0, 50)));
  }
  function renderRecords() {
    const list = loadRecords();
    const box = $('#recordList');
    if (!list.length) { box.innerHTML = '<div class="empty-hint">暂无处理记录</div>'; return; }
    box.innerHTML = list.map(r => `
      <div class="record-item">
        <div class="ri-ico">${ICON[r.ico] ? svg(r.ico, 22) : (r.ico || svg('pdf', 22))}</div>
        <div class="ri-meta">
          <div class="ri-name">${r.name}</div>
          <div class="ri-sub">${r.tool} · ${r.time}</div>
        </div>
        <div class="ri-tag">${r.result}</div>
      </div>`).join('');
  }

  /* ---------------- 拖拽上传通用 ---------------- */
  function bindDropzone(zone, input, onFiles) {
    zone.setAttribute('role', 'button');
    zone.setAttribute('tabindex', '0');
    zone.setAttribute('aria-label', '点击或拖入文件以上传');
    zone.addEventListener('click', () => input.click());
    zone.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); }
    });
    input.addEventListener('change', () => { if (input.files.length) onFiles(input.files); input.value = ''; });
    ['dragenter', 'dragover'].forEach(ev =>
      zone.addEventListener(ev, e => { e.preventDefault(); zone.classList.add('drag'); }));
    ['dragleave', 'drop'].forEach(ev =>
      zone.addEventListener(ev, e => { e.preventDefault(); zone.classList.remove('drag'); }));
    zone.addEventListener('drop', e => {
      const files = e.dataTransfer.files;
      if (files && files.length) onFiles(files);
    });
  }

  /* ---------------- 路由 ---------------- */
  const TOOLS = {
    home:    { title: '主工作台', short: '工作台', icon: 'home', color: 'var(--c-amber)', desc: '一站式轻量化办公处理工具集', render: renderHome },
    excel:   { title: 'Excel 瘦身', short: '表格', icon: 'table', color: 'var(--c-green)', desc: '清除无效格式与冗余单元格，显著减小表格体积', render: renderExcel },
    pdf:     { title: 'PDF 转 Word', short: 'PDF', icon: 'pdf', color: 'var(--c-coral)', desc: '解析文档结构，保持排版输出可编辑 Docx', render: renderPDF },
    crop:    { title: '批量裁剪', short: '裁剪', icon: 'crop', color: 'var(--c-teal)', desc: '自定义比例与框选范围，一键应用至全部图片', render: renderCrop },
    collage: { title: '多图拼图', short: '拼图', icon: 'collage', color: 'var(--c-violet)', desc: '横向 / 纵向 / 宫格拼图，实时预览与微调', render: renderCollage },
    video:   { title: 'MP4 视频压缩', short: '视频', icon: 'video', color: 'var(--c-amber)', desc: '高 / 中 / 低三档压缩比率，自由调节目标比特率', render: renderVideo },
    timestamp: { title: '时间戳转换', short: '时间戳', icon: 'clock', color: 'var(--c-teal)', desc: 'Unix 时间戳与日期时间互转，支持多时区与实时时钟', render: renderTimestamp },
    idcard:  { title: '证件生成', short: '证件', icon: 'idcard', color: 'var(--c-amber)', desc: '生成仿真居民身份证样张，支持随机信息、手动输入与图片导出', render: renderIdcard },
    palette: { title: '调色盘', short: '背景', icon: 'palette', color: 'var(--c-coral)', desc: '自定义每个页面的背景：预设色 / 自定义色 / 上传图片，自动保存', render: renderPalette },
    font:    { title: '字体设置', short: '字体', icon: 'text', color: 'var(--c-violet)', desc: '分别设置每个页面以及侧栏、顶栏的字体大小、颜色与样式', render: renderFont },
    ai:      { title: 'AI 大全', short: 'AI', icon: 'ai', color: 'var(--c-teal)', desc: '常用 AI 网站导航，点击直达官网', render: renderAi },
    sites:   { title: '常用网站', short: '网站', icon: 'sites', color: 'var(--c-blue)', desc: '常用站点导航，点击直达', render: renderSites },
    json:    { title: 'JSON 工具', short: 'JSON', icon: 'json', color: 'var(--c-green)', desc: '在线解析格式化、压缩转义、可视化编辑器', render: renderJson },
    pet:     { title: '宠物陪伴', short: '宠物', icon: 'pet', color: 'var(--c-violet)', desc: '挑选一位小伙伴常驻网页右下角，陪你一起干活', render: renderPet },
    homecfg: { title: '首页设置', short: '首页', icon: 'home', color: 'var(--c-amber)', desc: '设置进入页背景、陪伴宠物与动作、播放速度，自动保存到本地', render: renderHomeCfg },
  };

  // 侧栏分组 与 移动端底部 Tab（第 6 格为「更多」→ 打开完整抽屉）
  const NAV_GROUPS = [
    { name: '实用工具', tools: ['timestamp', 'idcard', 'ai', 'sites', 'json'] },
    { name: '个性化', tools: ['palette', 'font', 'pet', 'homecfg'] },
    { name: '文档', tools: ['excel', 'pdf'] },
    { name: '图片', tools: ['crop', 'collage'] },
    { name: '视频', tools: ['video'] },
  ];
  const TAB_KEYS = ['home', 'excel', 'pdf', 'crop', 'collage'];

  function renderNav() {
    $('#nav').innerHTML = NAV_GROUPS.map(g => {
      const open = g.name === '实用工具';
      return `
      <div class="nav-group" data-open="${open}">
        <div class="nav-group-title" data-toggle="${g.name}">${g.name}<span class="ng-caret">${svg('chev', 14)}</span></div>
        <div class="nav-items">
          ${g.tools.map(k => `
            <button class="nav-item" data-tool="${k}">
              <span class="nav-ico">${svg(TOOLS[k].icon, 22)}</span>${TOOLS[k].title}
            </button>`).join('')}
        </div>
      </div>`;
    }).join('');

    $('#bottomtab').innerHTML =
      TAB_KEYS.map(k => `
        <button class="tab-item" data-tool="${k}" aria-label="${TOOLS[k].title}">
          ${svg(TOOLS[k].icon, 23)}<span>${TOOLS[k].short}</span>
        </button>`).join('') +
      `<button class="tab-item" id="tabMore" aria-label="更多功能">${svg('menu', 23)}<span>更多</span></button>`;
  }

  function setTool(tool) {
    if (tsTimer) { clearInterval(tsTimer); tsTimer = null; }
    const t = TOOLS[tool] || TOOLS.home;
    $('#toolTitle').textContent = t.title;
    $('#toolDesc').textContent = t.desc;
    $('#content').innerHTML = '';
    t.render($('#content'));
    $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.tool === tool));
    $$('.tab-item').forEach(b => b.classList.toggle('active', b.dataset.tool === tool));
    $('#content').scrollTop = 0;
    applyBgFor(tool);
    applyFontFor(tool, $('#content'));
  }


  /* ---------------- 首页 ---------------- */
  const HOME_WELCOME = '欢迎小主来到华仔效率工坊，请选择你的专属宠物陪伴你一起努力工作吧！';

  async function renderHome(root) {
    const cards = [
      { tool: 'excel', desc: '清理冗余格式，表格秒变小' },
      { tool: 'pdf', desc: '保持排版，输出可编辑文档' },
      { tool: 'crop', desc: '比例框选，一键应用全部图' },
      { tool: 'collage', desc: '横 / 纵 / 宫格，实时预览' },
      { tool: 'video', desc: '高中低三档，自由调比特率' },
      { tool: 'timestamp', desc: '时间戳与日期互转，多时区' },
      { tool: 'idcard', desc: '一键生成仿真证件事例样张' },
      { tool: 'palette', desc: '自定义页面背景，支持上传图片' },
      { tool: 'json', desc: '解析格式化、压缩转义、可视化编辑' },
      { tool: 'ai', desc: '常用 AI 网站导航，点击直达官网' },
      { tool: 'sites', desc: '百度、B站、GitHub 等常用网站导航' },
      { tool: 'pet', petSlug: 'nezukocoder', desc: '挑选小伙伴常驻网页，陪你一起干活' },
    ];
    const tip = HOME_WELCOME;
    root.innerHTML = `
      <div class="workbench">
        <div class="home-hero">
          <div class="hh-ico bob">${svg('spark', 40)}</div>
          <div>
            <div class="hh-tip">小提示</div>
            <div class="hh-txt">${tip}</div>
          </div>
        </div>
        <div class="home-grid">
          ${cards.map((c, i) => {
            const t = TOOLS[c.tool];
            const ico = c.petSlug
              ? `<div class="hc-pet" data-pet="${c.petSlug}"></div>`
              : `<div class="hc-ico" style="background:${t.color}">${svg(t.icon, 24)}</div>`;
            return `
            <div class="home-card" data-tool="${c.tool}" style="animation-delay:${i * 45}ms">
              ${ico}
              <h3>${t.title}</h3>
              <p>${c.desc}</p>
            </div>`;
          }).join('')}
        </div>
      </div>`;
    $$('.home-card', root).forEach(card =>
      card.addEventListener('click', () => setTool(card.dataset.tool)));

    // 宠物卡片：中间显示该宠的预览动作（review）
    for (const box of $$('.hc-pet', root)) {
      const slug = box.dataset.pet;
      const p = allPets()[slug];
      if (!p) continue;
      await ensurePetStates(p);
      ensurePetKeyframes();
      const body = document.createElement('div');
      body.className = 'pet-body';
      if (setPetBodyState(body, p, slug, 'review')) box.appendChild(body);
    }
  }

  /* ============================================================
     0. 时间戳转换（参考 timestamp.onl）
     ============================================================ */
  function renderTimestamp(root) {
    if (tsTimer) { clearInterval(tsTimer); tsTimer = null; }
    const localTZ = (Intl.DateTimeFormat().resolvedOptions().timeZone) || '本地';
    const TZS = [
      { label: '本地 (' + localTZ + ')', val: '' },
      { label: 'UTC', val: 'UTC' },
      { label: 'Asia/Shanghai', val: 'Asia/Shanghai' },
      { label: 'Asia/Tokyo', val: 'Asia/Tokyo' },
      { label: 'Europe/London', val: 'Europe/London' },
      { label: 'America/New_York', val: 'America/New_York' },
      { label: 'America/Los_Angeles', val: 'America/Los_Angeles' },
    ];
    const tzOpts = TZS.map(t => `<option value="${t.val}">${t.label}</option>`).join('');

    root.innerHTML = `
      <div class="workbench">
        <div class="card ts-live">
          <div class="ts-live-top">
            <div class="ts-live-main">
              <div class="ts-live-label">当前 Unix 时间戳（实时）</div>
              <div class="ts-live-line">
                <div class="ts-live-sec" id="liveSec">-</div>
                <button class="ts-copy" id="liveSecCopy" data-c="" aria-label="复制秒时间戳">${svg('copy', 15)}</button>
              </div>
              <div class="ts-live-line ts-live-sub">
                <span>毫秒：<span id="liveMs">-</span></span>
                <button class="ts-copy" id="liveMsCopy" data-c="" aria-label="复制毫秒时间戳">${svg('copy', 15)}</button>
              </div>
              <div class="ts-live-line ts-live-date">
                <span id="liveDate">-</span>
                <button class="ts-copy" id="liveDateCopy" data-c="" aria-label="复制本地时间">${svg('copy', 15)}</button>
              </div>
            </div>
            <button class="ghost-btn" id="liveToggle" style="width:auto">⏸ 暂停</button>
          </div>
        </div>

        <div class="ts-grid">
          <div class="card">
            <div class="section-title">时间戳 → 时间</div>
            <div class="param-row">
              <div class="param-label">时间戳</div>
              <div class="param-control">
                <input class="input" id="tsInput" placeholder="如 1700000000 或 1700000000000" inputmode="numeric" />
              </div>
            </div>
            <div class="param-row">
              <div class="param-label">单位</div>
              <div class="param-control">
                <div class="seg" id="tsUnit">
                  <button data-u="auto" class="active">自动</button>
                  <button data-u="s">秒</button>
                  <button data-u="ms">毫秒</button>
                </div>
              </div>
            </div>
            <div class="param-row">
              <div class="param-label">时区</div>
              <div class="param-control"><select class="input" id="tsTz">${tzOpts}</select></div>
            </div>
            <div class="action-bar"><button class="btn-primary" id="tsToDate">转换</button></div>
            <div class="ts-out" id="tsOut"></div>
          </div>

          <div class="card">
            <div class="section-title">时间 → 时间戳</div>
            <div class="param-row">
              <div class="param-label">日期时间</div>
              <div class="param-control"><input type="datetime-local" class="input" id="dtInput" step="1" /></div>
            </div>
            <div class="param-row">
              <div class="param-label">时区</div>
              <div class="param-control"><select class="input" id="dtTz">${tzOpts}</select></div>
            </div>
            <div class="action-bar"><button class="btn-primary" id="dateToTs">转换</button></div>
            <div class="ts-out" id="dtOut"></div>
          </div>
        </div>
      </div>`;

    // 实时时钟
    const liveSec = $('#liveSec'), liveMs = $('#liveMs'), liveDate = $('#liveDate');
    const liveSecCopy = $('#liveSecCopy'), liveMsCopy = $('#liveMsCopy'), liveDateCopy = $('#liveDateCopy');
    function tick() {
      const now = Date.now();
      const sec = String(Math.floor(now / 1000));
      const ms = String(now);
      const date = fmtDateTime(now, '');
      liveSec.textContent = sec;
      liveMs.textContent = ms;
      liveDate.textContent = date;
      liveSecCopy.dataset.c = sec;
      liveMsCopy.dataset.c = ms;
      liveDateCopy.dataset.c = date;
    }
    tick(); tsTimer = setInterval(tick, 1000);
    let paused = false;
    $('#liveToggle').addEventListener('click', e => {
      paused = !paused;
      if (paused) { clearInterval(tsTimer); tsTimer = null; e.target.textContent = '▶ 继续'; }
      else { tick(); tsTimer = setInterval(tick, 1000); e.target.textContent = '⏸ 暂停'; }
    });

    // 单位切换
    let unit = 'auto';
    $$('#tsUnit button').forEach(b => b.addEventListener('click', () => {
      $$('#tsUnit button').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); unit = b.dataset.u;
    }));

    // 时间戳 → 时间
    $('#tsToDate').addEventListener('click', () => {
      const raw = $('#tsInput').value.trim();
      const num = Number(raw);
      if (!raw || isNaN(num)) { toast('请输入有效的数字时间戳'); return; }
      let ms;
      if (unit === 's') ms = num * 1000;
      else if (unit === 'ms') ms = num;
      else ms = num < 1e12 ? num * 1000 : num;
      const tz = $('#tsTz').value;
      $('#tsOut').innerHTML = buildTsOut(ms, tz);
      addRecord({ ico: 'clock', tool: '时间戳转换', name: String(num), result: fmtDateTime(ms, tz) });
    });

    // 时间 → 时间戳
    $('#dateToTs').addEventListener('click', () => {
      const v = $('#dtInput').value;
      if (!v) { toast('请选择日期时间'); return; }
      const ms = new Date(v).getTime();
      if (isNaN(ms)) { toast('日期时间无效'); return; }
      const sec = Math.floor(ms / 1000);
      $('#dtOut').innerHTML = `
        <div class="ts-row"><span class="ts-k">Unix 秒</span><span class="ts-v">${sec}</span><button class="ts-copy" data-c="${sec}" aria-label="复制">${svg('copy', 15)}</button></div>
        <div class="ts-row"><span class="ts-k">Unix 毫秒</span><span class="ts-v">${ms}</span><button class="ts-copy" data-c="${ms}" aria-label="复制">${svg('copy', 15)}</button></div>
        <div class="ts-row"><span class="ts-k">ISO 8601</span><span class="ts-v">${new Date(ms).toISOString()}</span><button class="ts-copy" data-c="${new Date(ms).toISOString()}" aria-label="复制">${svg('copy', 15)}</button></div>
        <div class="ts-row"><span class="ts-k">UTC</span><span class="ts-v">${fmtDateTime(ms, 'UTC')}</span><button class="ts-copy" data-c="${fmtDateTime(ms, 'UTC')}" aria-label="复制">${svg('copy', 15)}</button></div>`;
      addRecord({ ico: 'clock', tool: '时间戳转换', name: v, result: '秒 ' + sec });
    });
  }

  /* ============================================================
     证件生成（仿真居民身份证样张）
     ============================================================ */
  function renderIdcard(root) {
    const SURNAMES = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳';
    const GIVEN = ['伟','芳','娜','秀英','敏','静','丽','强','磊','洋','勇','艳','杰','娟','涛','明','超','军','平','刚','桂兰','志强','建国','晓明','婷','雪','琳','宇','浩然','梦琪','子轩','欣怡','梓涵'];
    const REGIONS = [['110114','北京市','海淀区'],['310115','上海市','浦东新区'],['440305','深圳市','南山区'],['510107','成都市','武侯区'],['330106','杭州市','西湖区'],['420106','武汉市','武昌区'],['320106','南京市','鼓楼区'],['120104','天津市','南开区'],['440106','广州市','天河区'],['610113','西安市','雁塔区']];
    const ETHNIC = ['汉','回','满','蒙','藏','维吾尔','壮','苗','彝','土家','朝鲜','侗','瑶'];
    const STREETS = ['中关村南大街','世纪大道','科技园路','人民南路','文三路','中山路','解放路','建设路','和平路','滨江大道','学院路','湖滨路'];

    const SILHOUETTE = '<svg viewBox="0 0 100 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<rect width="100" height="120" fill="#cfd8de"/>' +
      '<circle cx="50" cy="44" r="22" fill="#8a99a3"/>' +
      '<path d="M16 120 C16 88 32 72 50 72 C68 72 84 88 84 120 Z" fill="#8a99a3"/></svg>';

    // 内置默认头像（3 男 3 女）
    const ID_AVATARS = [
      { gender: '男', label: '男生1', src: 'avatars/male1.webp' },
      { gender: '男', label: '男生2', src: 'avatars/male2.webp' },
      { gender: '男', label: '男生3', src: 'avatars/male3.webp' },
      { gender: '女', label: '女生1', src: 'avatars/female1.webp' },
      { gender: '女', label: '女生2', src: 'avatars/female2.webp' },
      { gender: '女', label: '女生3', src: 'avatars/female3.webp' },
    ];
    const _avatarCache = {};
    function avatarImage(i) {
      const key = 'a' + i;
      if (_avatarCache[key]) return _avatarCache[key];
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = ID_AVATARS[i].src;
      _avatarCache[key] = img;
      return img;
    }


    function idCheck(base17) {
      const w = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
      const c = ['1','0','X','9','8','7','6','5','4','3','2'];
      let s = 0; for (let i = 0; i < 17; i++) s += parseInt(base17[i], 10) * w[i];
      return c[s % 11];
    }
    function genId(birth, gender) {
      const ymd = (birth || '19900101').replace(/-/g, '').slice(0, 8);
      const region = REGIONS[Math.floor(Math.random() * REGIONS.length)][0];
      const seq = String(Math.floor(Math.random() * 500) * 2 + (gender === '男' ? 1 : 0)).padStart(3, '0');
      const base = region + ymd + seq;
      return base + idCheck(base);
    }
    // 刷新号码：保留前 14 位（地区 + 出生），仅重排最后 4 位（顺序码 3 位 + 校验位）
    function refreshIdTail(id, gender) {
      let head = (id || '').slice(0, 14);
      if (head.length < 14) head = REGIONS[0][0] + (state.birth || '19900101').replace(/-/g, '').slice(0, 8) + '000';
      const seq = String(Math.floor(Math.random() * 500) * 2 + (gender === '男' ? 1 : 0)).padStart(3, '0');
      const base = head + seq;
      return base + idCheck(base);
    }
    function parseId(v) {
      v = (v || '').trim().toUpperCase();
      if (!/^\d{17}[\dX]$/.test(v)) return null;
      const birth = v.substr(6,4) + '-' + v.substr(10,2) + '-' + v.substr(12,2);
      const gender = (parseInt(v[16], 10) % 2 === 1) ? '男' : '女';
      return { id: v, birth, gender };
    }
    function fmtCnDate(s) {
      if (!s) return '';
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
      if (!m) return s;
      return m[1] + '年' + (+m[2]) + '月' + (+m[3]) + '日';
    }
    function calcAge(birth) {
      if (!birth) return '';
      const b = new Date(birth); if (isNaN(b)) return '';
      const now = new Date();
      let age = now.getFullYear() - b.getFullYear();
      const m = now.getMonth() - b.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
      return age;
    }
    function calcBirthFromAge(age) {
      const n = parseInt(age, 10);
      if (isNaN(n) || n < 0) return '';
      const now = new Date();
      const y = now.getFullYear() - n;
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }

    const state = { name: '夏尔', gender: '女', ethnic: '汉', birth: '1997-05-02', addr: '二仙桥成华大道', id: '110101199705020502', age: 29, avatar: null, avatarIndex: null };

    root.innerHTML = `
      <div class="workbench idcard-layout">
        <div class="card">
          <div class="section-title">证件信息</div>
          <div class="param-row"><div class="param-label">姓名</div><div class="param-control"><input class="input" id="inName" placeholder="点击「随机生成」填充"></div></div>
          <div class="param-row"><div class="param-label">年龄</div><div class="param-control"><input type="number" min="0" max="150" class="input" id="inAge" placeholder="根据当前时间自动计算出生"></div></div>
          <div class="param-row"><div class="param-label">性别</div><div class="param-control"><select class="input" id="inGender"><option>男</option><option>女</option></select></div></div>
          <div class="param-row"><div class="param-label">民族</div><div class="param-control"><input class="input" id="inEthnic" value="汉"></div></div>
          <div class="param-row"><div class="param-label">出生</div><div class="param-control"><input type="date" class="input" id="inBirth"></div></div>
          <div class="param-row"><div class="param-label">住址</div><div class="param-control"><textarea class="input" id="inAddr" rows="2"></textarea></div></div>
          <label class="chk-row"><input type="checkbox" id="idManual"> 手动输入证件号码</label>
          <div class="id-no-box">
            <span class="id-no" id="idNoView">—</span>
            <input class="input" id="idNoInput" style="display:none" maxlength="18" placeholder="输入 18 位号码（末位可为 X）">
          </div>
          <div class="param-row"><div class="param-label">头像</div><div class="param-control"><input type="file" id="inAvatar" accept="image/*"></div></div>
          <div class="param-row"><div class="param-label">默认头像</div><div class="param-control"><div class="avatar-presets" id="avatarPresets">${ID_AVATARS.map((a, i) => `<button type="button" class="av-thumb" data-i="${i}" title="${a.label}"><img src="${a.src}" alt="${a.label}" loading="lazy"></button>`).join('')}</div></div></div>
          <div class="action-bar">
            <button class="btn-primary" id="idRandom">随机生成</button>
            <button class="ghost-btn" id="idRefreshNo">刷新号码</button>
            <button class="ghost-btn" id="idCopy">复制号码</button>
            <button class="ghost-btn" id="idRefreshCopy">刷新并复制</button>
          </div>
          <p class="id-note">⚠️ 本工具仅用于设计演示、排版预览与开发测试。所生成号码非真实有效证件，仅供样例使用，<b>严禁</b>用于任何冒充、欺诈等违法用途。</p>
        </div>

        <div class="idcard-right">
          <div class="card idcard-wrap">
            <div class="idcard" id="idcard">
              <div class="idcard-head">
                <div class="idcard-emblem">★</div>
                <div class="idcard-title">
                  <div class="idcard-cn">中华人民共和国</div>
                  <div class="idcard-en">居民身份证</div>
                </div>
              </div>
              <div class="idcard-main">
                <div class="idcard-fields">
                  <div class="id-row"><span class="id-k">姓名</span><span class="id-v" id="pvName">—</span></div>
                  <div class="id-row id-row-3">
                    <span class="id-k">性别</span><span class="id-v" id="pvGender">—</span>
                    <span class="id-k">民族</span><span class="id-v" id="pvEthnic">—</span>
                    <span class="id-k">年龄</span><span class="id-v" id="pvAge">—</span>
                  </div>
                  <div class="id-row"><span class="id-k">出生</span><span class="id-v" id="pvBirth">—</span></div>
                  <div class="id-row"><span class="id-k">住址</span><span class="id-v" id="pvAddr">—</span></div>
                  <div class="id-row"><span class="id-k">公民身份号码</span><span class="id-v id-no" id="pvId">—</span></div>
                </div>
                <div class="idcard-photo" id="pvPhoto"></div>
              </div>
            </div>
          </div>
          <div class="action-bar idcard-dl-bar">
            <button class="btn-primary" id="idDownload">下载证件图片（PNG）</button>
          </div>
        </div>
      </div>`;

    const $ = (s) => root.querySelector(s);
    const isManual = () => $('#idManual').checked;

    function syncForm() {
      $('#inName').value = state.name || '';
      $('#inAge').value = state.age ?? '';
      $('#inGender').value = state.gender || '男';
      $('#inEthnic').value = state.ethnic || '汉';
      $('#inBirth').value = state.birth || '';
      $('#inAddr').value = state.addr || '';
      $('#idNoView').textContent = state.id || '—';
    }
    function updatePreview() {
      $('#pvName').textContent = state.name || '—';
      $('#pvGender').textContent = state.gender || '—';
      $('#pvEthnic').textContent = state.ethnic || '—';
      $('#pvAge').textContent = state.age ?? '—';
      $('#pvBirth').textContent = fmtCnDate(state.birth) || '—';
      $('#pvAddr').textContent = state.addr || '—';
      $('#pvId').textContent = state.id || '—';
      $('#inAge').value = state.age ?? '';
      $('#inBirth').value = state.birth || '';
      if (isManual()) $('#idNoInput').value = state.id;
      else $('#idNoView').textContent = state.id || '—';
      const pv = $('#pvPhoto');
      if (state.avatar && state.avatar.complete) pv.innerHTML = '<img src="' + state.avatar.src + '" alt="头像">';
      else pv.innerHTML = SILHOUETTE;
      $$('#avatarPresets .av-thumb', root).forEach(b => b.classList.toggle('active', +b.dataset.i === state.avatarIndex));
    }
    function randomAll() {
      const s = SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
      const g = GIVEN[Math.floor(Math.random() * GIVEN.length)];
      state.name = s + g;
      state.gender = Math.random() < 0.5 ? '男' : '女';
      state.ethnic = ETHNIC[Math.floor(Math.random() * ETHNIC.length)];
      const y = 1965 + Math.floor(Math.random() * 40);
      const m = 1 + Math.floor(Math.random() * 12);
      const d = 1 + Math.floor(Math.random() * 28);
      state.birth = y + '-' + String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      state.age = calcAge(state.birth);
      const r = REGIONS[Math.floor(Math.random() * REGIONS.length)];
      state.addr = r[1] + r[2] + STREETS[Math.floor(Math.random() * STREETS.length)] + (1 + Math.floor(Math.random() * 200)) + '号';
      state.id = genId(state.birth, state.gender);
      const pool = ID_AVATARS.map((a, i) => i).filter(i => ID_AVATARS[i].gender === state.gender);
      const idx = pool[Math.floor(Math.random() * pool.length)];
      state.avatar = avatarImage(idx); state.avatarIndex = idx;
      if (state.avatar.complete) updatePreview();
      else state.avatar.onload = () => updatePreview();
      syncForm(); updatePreview();
    }

    $('#inName').addEventListener('input', e => { state.name = e.target.value; updatePreview(); });
    $('#inAge').addEventListener('input', e => {
      state.age = e.target.value === '' ? '' : parseInt(e.target.value, 10);
      const birth = calcBirthFromAge(state.age);
      if (birth) { state.birth = birth; if (!isManual()) state.id = genId(state.birth, state.gender); }
      updatePreview();
    });
    $('#inEthnic').addEventListener('input', e => { state.ethnic = e.target.value; updatePreview(); });
    $('#inAddr').addEventListener('input', e => { state.addr = e.target.value; updatePreview(); });
    $('#inBirth').addEventListener('change', e => {
      state.birth = e.target.value;
      state.age = calcAge(state.birth);
      if (!isManual()) state.id = genId(state.birth, state.gender);
      updatePreview();
    });
    $('#inGender').addEventListener('change', e => { state.gender = e.target.value; if (!isManual()) state.id = genId(state.birth, state.gender); updatePreview(); });
    $('#inAvatar').addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return;
      const img = new Image();
      img.onload = () => { state.avatar = img; state.avatarIndex = -1; updatePreview(); };
      img.src = URL.createObjectURL(f);
    });
    $$('#avatarPresets .av-thumb', root).forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.i;
      state.avatar = avatarImage(i); state.avatarIndex = i;
      if (state.avatar.complete) updatePreview();
      else state.avatar.onload = () => updatePreview();
    }));
    $('#idManual').addEventListener('change', e => {
      const on = e.target.checked;
      $('#idNoView').style.display = on ? 'none' : '';
      $('#idNoInput').style.display = on ? 'block' : 'none';
      if (on) { $('#idNoInput').value = state.id; }
      else { updatePreview(); }
    });
    $('#idNoInput').addEventListener('input', e => {
      const p = parseId(e.target.value);
      if (!p) { state.id = e.target.value.trim().toUpperCase(); updatePreview(); return; }
      state.id = p.id; state.birth = p.birth; state.gender = p.gender; syncForm(); updatePreview();
    });
    $('#idRandom').addEventListener('click', randomAll);
    $('#idRefreshNo').addEventListener('click', () => { state.id = refreshIdTail(state.id, state.gender); if (isManual()) $('#idNoInput').value = state.id; updatePreview(); });
    $('#idCopy').addEventListener('click', () => { if (state.id) { copyText(state.id); toast('已复制证件号码'); } });
    $('#idRefreshCopy').addEventListener('click', () => { state.id = refreshIdTail(state.id, state.gender); if (isManual()) $('#idNoInput').value = state.id; updatePreview(); if (state.id) { copyText(state.id); toast('已刷新并复制证件号码'); } });
    $('#idDownload').addEventListener('click', download);

    // 初始默认值（年龄按当前电脑时间实时计算）
    state.age = calcAge(state.birth);
    // 每次进入随机取一个默认头像显示在图片上（按默认性别匹配）
    const initPool = ID_AVATARS.map((a, i) => i).filter(i => ID_AVATARS[i].gender === state.gender);
    const initIdx = initPool[Math.floor(Math.random() * initPool.length)];
    state.avatar = avatarImage(initIdx); state.avatarIndex = initIdx;
    if (state.avatar.complete) updatePreview();
    else state.avatar.onload = () => updatePreview();
    syncForm(); updatePreview();

    function drawStar(ctx, cx, cy, spikes, outerR, innerR, color) {
      let rot = Math.PI / 2 * 3, step = Math.PI / spikes;
      ctx.beginPath(); ctx.moveTo(cx, cy - outerR);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR); rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR); rot += step;
      }
      ctx.closePath(); ctx.fillStyle = color; ctx.fill();
    }
    function drawCover(ctx, img, x, y, w, h) {
      const ir = img.width / img.height, br = w / h;
      let sw, sh, sx, sy;
      if (ir > br) { sh = img.height; sw = sh * br; sx = (img.width - sw) / 2; sy = 0; }
      else { sw = img.width; sh = sw / br; sx = 0; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    }
    function wrapText(ctx, text, x, y, maxW, lh) {
      const chars = (text || '').split('');
      let line = '', yy = y;
      for (const ch of chars) {
        if (ctx.measureText(line + ch).width > maxW && line) { ctx.fillText(line, x, yy); line = ch; yy += lh; }
        else line += ch;
      }
      if (line) ctx.fillText(line, x, yy);
    }

    function download() {
      const W = 1024, H = 645;
      const cv = document.createElement('canvas');
      cv.width = W; cv.height = H;
      const ctx = cv.getContext('2d');
      const F = '"Microsoft YaHei","PingFang SC","Heiti SC",sans-serif';
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, '#e7eef3'); g.addColorStop(1, '#d7e6dd');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#1f3a4d'; ctx.lineWidth = 3; ctx.strokeRect(8, 8, W - 16, H - 16);

      ctx.fillStyle = '#c0392b';
      ctx.beginPath(); ctx.arc(78, 74, 20, 0, Math.PI * 2); ctx.fill();
      drawStar(ctx, 78, 74, 5, 11, 4.5, '#fff');

      ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#243444';
      ctx.font = 'bold 30px ' + F; ctx.fillText('中华人民共和国', 112, 60);
      ctx.font = 'bold 38px ' + F; ctx.fillText('居民身份证', 112, 102);

      const lx = 56, vx = 150;
      ctx.font = '600 22px ' + F; ctx.fillText('姓名', lx, 175);
      ctx.font = 'bold 28px ' + F; ctx.fillText(state.name || '', vx, 179);
      ctx.font = '600 22px ' + F; ctx.fillText('性别', lx, 225);
      ctx.font = 'bold 26px ' + F; ctx.fillText(state.gender || '', vx, 229);
      ctx.font = '600 22px ' + F; ctx.fillText('民族', 270, 225);
      ctx.font = 'bold 26px ' + F; ctx.fillText(state.ethnic || '', 340, 229);
      ctx.font = '600 22px ' + F; ctx.fillText('年龄', 440, 225);
      ctx.font = 'bold 26px ' + F; ctx.fillText(String(state.age ?? ''), 500, 229);
      ctx.font = '600 22px ' + F; ctx.fillText('出生', lx, 275);
      ctx.font = 'bold 26px ' + F; ctx.fillText(fmtCnDate(state.birth), vx, 279);
      ctx.font = '600 22px ' + F; ctx.fillText('住址', lx, 325);
      ctx.font = 'bold 22px ' + F; wrapText(ctx, state.addr || '', vx, 329, 560, 28);
      ctx.font = '600 22px ' + F; ctx.fillText('公民身份号码', lx, 470);
      ctx.font = 'bold 30px ' + F;
      if ('letterSpacing' in ctx) ctx.letterSpacing = '3px';
      ctx.fillText(state.id || '', lx, 510);
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';

      const px = 820, py = 165, pw = 170, ph = 210;
      ctx.strokeStyle = '#243444'; ctx.lineWidth = 2; ctx.strokeRect(px, py, pw, ph);
      ctx.save();
      ctx.beginPath(); ctx.rect(px, py, pw, ph); ctx.clip();
      if (state.avatar && state.avatar.complete) drawCover(ctx, state.avatar, px, py, pw, ph);
      else {
        ctx.fillStyle = '#cfd8de'; ctx.fillRect(px, py, pw, ph);
        ctx.fillStyle = '#8a99a3';
        ctx.beginPath(); ctx.arc(px + pw / 2, py + ph * 0.42, pw * 0.22, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(px + pw * 0.18, py + ph); ctx.quadraticCurveTo(px + pw / 2, py + ph * 0.62, px + pw * 0.82, py + ph); ctx.closePath(); ctx.fill();
      }
      ctx.restore();

      cv.toBlob(b => {
        if (!b) { toast('导出失败，请重试'); return; }
        const a = document.createElement('a');
        a.href = URL.createObjectURL(b); a.download = '身份证样张_' + state.id + '.png';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        addRecord({ ico: 'idcard', tool: '证件生成', name: state.name || '样张', result: state.id });
      });
    }
  }

  /* ============================================================
     证件生成（仿真居民身份证样张）
     ============================================================ */
  function renderPalette(root) {
    const PRESETS = [
      { name: '浅灰', val: '#F4F7F9' }, { name: '米白', val: '#F6F1E7' },
      { name: '薄荷', val: '#E6F2EE' }, { name: '天青', val: '#E7F0F7' },
      { name: '淡紫', val: '#EFEAF7' }, { name: '暖橙', val: '#FBEFE3' },
      { name: '墨蓝', val: '#1F2A36' }, { name: '深绿', val: '#16241F' },
      { name: '暗紫', val: '#221B2E' }, { name: '纯黑', val: '#10141A' },
    ];
    const SCOPE_STORE_KEY = 'ets_pal_scope';
    const scopeOpts = [{ key: 'global', label: '全站默认（所有页面）' }]
      .concat(Object.keys(TOOLS).map(k => ({ key: k, label: TOOLS[k].title })));
    const scopeKey = v => v === 'global' ? 'ets_bg' : 'ets_bg_' + v;
    const currentScope = () => $('#palScope').value;
    const readScope = (v = currentScope()) => readBg(scopeKey(v));
    const saveScope = (cfg, v = currentScope()) => { if (cfg) localStorage.setItem(scopeKey(v), JSON.stringify(cfg)); else localStorage.removeItem(scopeKey(v)); };
    const scopeLabel = v => (scopeOpts.find(o => o.key === v) || { label: '当前页面' }).label;

    function syncControls(cfg) {
      $('#palCustom').value = cfg && cfg.type === 'color' ? cfg.value : '#F4F7F9';
      $('#palOverlay').value = cfg ? (cfg.overlay || 0) : 0;
      $('#palOverlayVal').textContent = (cfg ? (cfg.overlay || 0) : 0) + '%';
      $$('#palModes button').forEach(b => b.classList.toggle('active', cfg && cfg.type === 'image' && b.dataset.mode === cfg.mode));
      $('#palImgTip').textContent = cfg && cfg.type === 'image' ? '已设置图片背景' : '未设置图片背景';
      $$('.swatch').forEach(s => s.classList.toggle('active', cfg && cfg.type === 'color' && cfg.value && cfg.value.toLowerCase() === s.dataset.val.toLowerCase()));
    }

    root.innerHTML = `
      <div class="workbench palette">
        <div class="card">
          <h2 class="card-h">应用范围</h2>
          <p class="pal-tip">选择要设置的页面：选「全站默认」对所有页面生效；选具体页面则只为该页设置独立背景。切换工具页时背景会自动匹配。</p>
          <select id="palScope" class="pal-select">
            ${scopeOpts.map(o => `<option value="${o.key}">${o.label}</option>`).join('')}
          </select>
          <div class="pal-scope-now" id="palScopeNow">正在为 <strong>全站默认（所有页面）</strong> 设置背景</div>
        </div>

        <div class="card">
          <h2 class="card-h">预设背景色</h2>
          <div class="swatches" id="palSwatches">
            ${PRESETS.map(p => `<button class="swatch" data-val="${p.val}" title="${p.name}" style="background:${p.val}"><span>${p.name}</span></button>`).join('')}
          </div>
        </div>

        <div class="card">
          <h2 class="card-h">自定义颜色</h2>
          <div class="pal-custom-row">
            <input type="color" id="palCustom" value="#F4F7F9" />
            <button class="btn-primary" id="palApplyColor">应用此颜色</button>
          </div>
        </div>

        <div class="card">
          <h2 class="card-h">上传背景图片</h2>
          <div class="dz-ico">${svg('upload', 30)}</div>
          <div class="dropzone" id="palDrop" style="margin-top:12px">
            <div class="dz-main">点击或拖拽图片到此处</div>
            <input type="file" id="palFile" accept="image/*" hidden />
          </div>
          <p class="pal-tip" id="palImgTip">未设置图片背景</p>
          <div class="pal-modes" id="palModes">
            <button data-mode="cover" class="active">填充铺满</button>
            <button data-mode="repeat">平铺</button>
          </div>
          <div class="pal-overlay-row">
            <label>暗化遮罩（提升文字可读性）</label>
            <input type="range" id="palOverlay" min="0" max="70" value="0" />
            <span id="palOverlayVal">0%</span>
          </div>
        </div>

        <div class="card">
          <h2 class="card-h">侧栏 / 顶栏透明度</h2>
          <p class="pal-tip">调整左侧栏与顶栏的透明度：拉低可让背景透出，形成整站沉浸效果；拉高则更接近实色。</p>
          <div class="pal-overlay-row">
            <label>透明度</label>
            <input type="range" id="palPanelAlpha" min="0" max="100" value="80" />
            <span id="palPanelAlphaVal">80%</span>
          </div>
          <div class="pal-reset-row">
            <button class="ghost-btn" id="palAlphaReset">恢复默认透明度</button>
          </div>
        </div>

        <div class="card">
          <h2 class="card-h">还原</h2>
          <div class="pal-reset-row">
            <button class="ghost-btn" id="palReset">恢复默认背景</button>
            <span class="pal-note">设置会自动保存到本地，刷新后仍然生效。</span>
          </div>
        </div>

        <div class="card">
          <h2 class="card-h">保存为站点默认</h2>
          <p class="pal-tip">把当前所有背景、侧栏/顶栏透明度、主题等参数保存为站点默认。点击后会下载 <b>defaults.js</b> 并复制到剪贴板，将其放入项目目录覆盖同名文件，其他电脑通过 IP 访问也会自动套用这套外观。</p>
          <div class="pal-reset-row">
            <button class="ghost-btn" id="palSaveDefault">生成并下载 defaults.js</button>
          </div>
        </div>
      </div>`;

    function updateScopeUI() {
      const v = currentScope();
      $('#palScopeNow').innerHTML = `正在为 <strong>${scopeLabel(v)}</strong> 设置背景`;
      localStorage.setItem(SCOPE_STORE_KEY, v);
    }

    // 恢复上次选择的范围
    let lastScope = localStorage.getItem(SCOPE_STORE_KEY);
    if (!lastScope || !scopeOpts.some(o => o.key === lastScope)) lastScope = 'global';
    $('#palScope').value = lastScope;
    updateScopeUI();

    // 侧栏 / 顶栏透明度
    const alphaInput = $('#palPanelAlpha'), alphaVal = $('#palPanelAlphaVal');
    let savedAlpha = parseInt(localStorage.getItem('ets_panel_alpha'), 10);
    if (isNaN(savedAlpha)) savedAlpha = 80;
    alphaInput.value = savedAlpha; alphaVal.textContent = savedAlpha + '%';
    alphaInput.addEventListener('input', () => {
      const v = parseInt(alphaInput.value, 10);
      alphaVal.textContent = v + '%';
      applyPanelAlpha(v);
      localStorage.setItem('ets_panel_alpha', v);
    });
    $('#palAlphaReset').addEventListener('click', () => {
      localStorage.removeItem('ets_panel_alpha');
      applyPanelAlpha(null);
      const def = document.documentElement.getAttribute('data-theme') === 'dark' ? 82 : 80;
      alphaInput.value = def; alphaVal.textContent = def + '%';
      toast('已恢复默认透明度');
    });

    function applyAndSave(cfg) {
      const v = currentScope();
      if (v === 'global') clearPerPageBgs();
      applyBg(cfg);
      saveScope(cfg, v);
      syncControls(cfg);
      toast(`已保存到「${scopeLabel(v)}」背景`);
    }

    // 切换范围：预览该范围已保存的背景（无则清空为默认）
    $('#palScope').addEventListener('change', () => {
      updateScopeUI();
      const c = readScope();
      applyBg(c);
      syncControls(c);
    });

    // 预设色
    $('#palSwatches').addEventListener('click', e => {
      const s = e.target.closest('.swatch'); if (!s) return;
      applyAndSave({ type: 'color', value: s.dataset.val });
    });
    // 自定义色
    $('#palApplyColor').addEventListener('click', () => {
      applyAndSave({ type: 'color', value: $('#palCustom').value });
    });
    // 上传
    const fileInput = $('#palFile');
    const pick = () => fileInput.click();
    $('#palDrop').addEventListener('click', pick);
    $('#palDrop').addEventListener('dragover', e => { e.preventDefault(); $('#palDrop').classList.add('drag'); });
    $('#palDrop').addEventListener('dragleave', () => $('#palDrop').classList.remove('drag'));
    $('#palDrop').addEventListener('drop', e => {
      e.preventDefault(); $('#palDrop').classList.remove('drag');
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', () => { if (fileInput.files[0]) handleFile(fileInput.files[0]); });

    function handleFile(file) {
      if (!file.type.startsWith('image/')) { toast('请选择图片文件'); return; }
      const reader = new FileReader();
      reader.onload = () => compressImage(reader.result, dataUrl => {
        const ov = parseInt($('#palOverlay').value, 10);
        applyAndSave({ type: 'image', value: dataUrl, mode: 'cover', overlay: ov });
        toast('背景图片已设置');
      });
      reader.readAsDataURL(file);
    }
    // 图片模式
    $('#palModes').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const cur2 = readScope(); if (!cur2 || cur2.type !== 'image') return;
      cur2.mode = b.dataset.mode; applyAndSave(cur2);
    });
    // 遮罩强度
    $('#palOverlay').addEventListener('input', () => {
      const cur2 = readScope(); if (!cur2 || cur2.type !== 'image') return;
      cur2.overlay = parseInt($('#palOverlay').value, 10);
      $('#palOverlayVal').textContent = cur2.overlay + '%';
      applyBg(cur2); saveScope(cur2);
    });
    // 重置（当前范围）
    $('#palReset').addEventListener('click', () => {
      const v = currentScope();
      saveScope(null, v);
      if (v === 'global') clearPerPageBgs();
      applyBg(null);
      syncControls(null);
      toast(`已清除「${scopeLabel(v)}」的自定义背景`);
    });

    // 保存为站点默认
    $('#palSaveDefault').addEventListener('click', () => exportSiteDefaults());
  }

  /* ---------------- 首页设置（进入页背景 / 宠物 / 动作 / 速度） ---------------- */
  function renderHomeCfg(root) {
    const PRESETS = [
      { name: '浅灰', val: '#F4F7F9' }, { name: '米白', val: '#F6F1E7' },
      { name: '薄荷', val: '#E6F2EE' }, { name: '天青', val: '#E7F0F7' },
      { name: '淡紫', val: '#EFEAF7' }, { name: '暖橙', val: '#FBEFE3' },
      { name: '墨蓝', val: '#1F2A36' }, { name: '深绿', val: '#16241F' },
      { name: '暗紫', val: '#221B2E' }, { name: '纯黑', val: '#10141A' },
    ];
    let cfg = loadHomeCfg();

    root.innerHTML = `
      <div class="workbench palette homecfg-page">
        <div class="homecfg-layout">
          <div class="homecfg-left">
            <div class="card">
              <h2 class="card-h">进入页背景</h2>
              <p class="pal-tip">可以选择预设色、自定义颜色，或上传一张图片作为进入页背景。</p>
              <div class="swatches" id="hcSwatches">
                ${PRESETS.map(p => `<button class="swatch" data-val="${p.val}" title="${p.name}" style="background:${p.val}"><span>${p.name}</span></button>`).join('')}
              </div>
              <div class="pal-custom-row" style="margin-top:14px">
                <input type="color" id="hcCustom" value="#E6F2EE" />
                <button class="btn-primary" id="hcApplyColor">应用此颜色</button>
              </div>
              <div class="dz-ico">${svg('upload', 30)}</div>
              <div class="dropzone" id="hcDrop" style="margin-top:12px">
                <div class="dz-main">点击或拖拽图片到此处</div>
                <input type="file" id="hcFile" accept="image/*" hidden />
              </div>
              <div class="pal-modes" id="hcModes" style="display:none">
                <button data-mode="cover" class="active">填充铺满</button>
                <button data-mode="repeat">平铺</button>
              </div>
              <p class="pal-tip" id="hcImgTip">未设置图片背景</p>
            </div>

            <div class="card">
              <h2 class="card-h">进入页宠物与动作</h2>
              <p class="pal-tip">选择进入页中央陪伴你的宠物，并指定要展示的第几个动作。</p>
              <div class="hc-field">
                <label>选择宠物</label>
                <select class="pal-select" id="hcPet"></select>
              </div>
              <div class="hc-field">
                <label>选择第几个动作</label>
                <select class="pal-select" id="hcAction"></select>
              </div>
            </div>

            <div class="card">
              <h2 class="card-h">播放速度</h2>
              <p class="pal-tip">调整进入页宠物动画速度（相对默认的倍数）。</p>
          <div class="hc-speeds" id="hcSpeeds">
            ${[0.5, 1, 2, 5, 10].map(m => `<button data-mult="${m}">${m}×</button>`).join('')}
          </div>
        </div>

        <div class="card">
          <h2 class="card-h">宠物大小</h2>
          <p class="pal-tip">拖动调整进入页宠物的显示大小（0.1× 缩小十倍 至 3× 放大三倍）。</p>
          <div class="hc-field">
            <label>大小倍数 <span class="hc-size-val" id="hcSizeVal">1.0×</span></label>
            <input type="range" id="hcSize" min="0.1" max="3" step="0.1" value="1">
          </div>
        </div>

        <div class="card">
          <h2 class="card-h">碎片消失方式</h2>
          <p class="pal-tip">选择从进入页进入工作台时，碎片如何消失。默认「全部向下掉落」；另提供「黑洞扭曲」与「子弹射击」两种特效。</p>
          <div class="hc-speeds" id="hcDissolve">
            <button data-mode="fall">全部向下掉落</button>
            <button data-mode="blackhole">黑洞扭曲</button>
            <button data-mode="bullet">子弹射击</button>
            <button data-mode="matrix">黑客帝国</button>
            <button data-mode="matrix2">至尊黑客帝国</button>
          </div>
          <label class="checkbox" style="margin-top: var(--space-3);">
            <input type="checkbox" id="hcInstant">
            <span>关闭进入特效（点击按钮直接进入工作台）</span>
          </label>
        </div>
      </div>

      <div class="homecfg-right">
            <div class="card">
              <h2 class="card-h">进入页实时预览</h2>
              <p class="pal-tip">右侧为进入页效果预览，修改左侧任意设置后立即生效并保存到本地浏览器；下次打开自动套用。</p>
              <div class="homecfg-preview" id="hcPreview">
                <div class="homecfg-preview-pet" id="hcPreviewPet"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="card homecfg-reset">
          <h2 class="card-h">还原</h2>
          <div class="pal-reset-row">
            <button class="ghost-btn" id="hcSetDefault">将当前设置设为默认值</button>
            <button class="ghost-btn" id="hcReset">恢复为默认值</button>
          </div>
          <div class="pal-reset-row">
            <button class="btn-primary" id="hcSaveStart">保存当前开始页面</button>
          </div>
          <p class="pal-note" id="hcDefaultNote">默认值为：<span id="hcDefaultDesc"></span>。点击「将当前设置设为默认值」可把现在这套配置固化为默认；「恢复为默认值」会回到它。</p>
        </div>
      </div>`;

    const preview = $('#hcPreview');
    const previewPet = $('#hcPreviewPet');

    function syncControls() {
      $('#hcCustom').value = (cfg.bg && cfg.bg.type === 'color') ? cfg.bg.value : '#E6F2EE';
      $$('#hcSwatches .swatch').forEach(s => s.classList.toggle('active', cfg.bg && cfg.bg.type === 'color' && cfg.bg.value && cfg.bg.value.toLowerCase() === s.dataset.val.toLowerCase()));
      const isImg = cfg.bg && cfg.bg.type === 'image';
      $('#hcModes').style.display = isImg ? 'flex' : 'none';
      $$('#hcModes button').forEach(b => b.classList.toggle('active', isImg && b.dataset.mode === (cfg.bg.mode || 'cover')));
      $('#hcImgTip').textContent = isImg ? '已设置图片背景' : '未设置图片背景';
      $$('#hcSpeeds button').forEach(b => b.classList.toggle('active', (cfg.speed || 2) === parseFloat(b.dataset.mult)));
      $$('#hcDissolve button').forEach(b => b.classList.toggle('active', (cfg.dissolve || 'fall') === b.dataset.mode));
      const hcInstant = $('#hcInstant'); if (hcInstant) hcInstant.checked = !!cfg.instant;
      const sc = (cfg.scale && cfg.scale > 0) ? cfg.scale : 1;
      $('#hcSize').value = sc;
      $('#hcSizeVal').textContent = sc.toFixed(1) + '×';
    }

    function renderBgPreview() { applyBgToEl(preview, cfg.bg); }

    async function renderPetPreview() {
      const slug = $('#hcPet').value;
      const action = $('#hcAction').value;
      const p = PETS[slug]; if (!p) { previewPet.innerHTML = ''; return; }
      await ensurePetStates(p);
      ensurePetKeyframes();
      const stMap = petStateMap(p);
      const sid = stMap[action] ? action : 'idle';
      previewPet.innerHTML = '';
      const body = document.createElement('div');
      body.className = 'pet-body';
      if (setPetBodyState(body, p, slug, sid)) {
        previewPet.appendChild(body);
        const mult = (cfg.speed && cfg.speed > 0) ? cfg.speed : 2;
        const baseDur = parseFloat(body.style.getPropertyValue('--dur')) || 0.96;
        body.style.setProperty('--dur', (baseDur * mult).toFixed(2) + 's');
        const sc = (cfg.scale && cfg.scale > 0) ? cfg.scale : 1;
        body.style.transform = 'scale(' + (sc * 3.2) + ')';
        body.style.transformOrigin = 'center bottom';
      }
    }

    function applyAndSave() {
      saveHomeCfg(cfg);
      // 若进入页当前可见，立即应用
      const landing = document.getElementById('landing');
      if (landing && !landing.classList.contains('hide')) {
        applyBgToEl(landing, cfg.bg);
        paintLandingPet();
      }
      toast('进入页设置已保存');
    }

    function fillPetSelect() {
      const sel = $('#hcPet');
      const pets = allPets();
      const keys = Object.keys(pets).sort((a, b) => (pets[a]._order || 0) - (pets[b]._order || 0));
      sel.innerHTML = keys.map(k => `<option value="${k}">${pets[k].name || k}</option>`).join('');
      if (cfg.pet && cfg.pet.slug && pets[cfg.pet.slug]) sel.value = cfg.pet.slug;
      else sel.value = ('beerus' in pets) ? 'beerus' : keys[0];
    }
    async function fillActionSelect() {
      const slug = $('#hcPet').value;
      const p = PETS[slug];
      await ensurePetStates(p);
      ensurePetKeyframes();
      const stMap = petStateMap(p);
      const sel = $('#hcAction');
      const opts = PET_STATE_ORDER.filter(id => stMap[id]).map(id => {
        const n = PET_STATE_ORDER.indexOf(id) + 1;
        return `<option value="${id}">第 ${n} 个 · ${PET_STATE_LABEL[id]}</option>`;
      });
      sel.innerHTML = opts.join('') || `<option value="idle">第 1 个 · Idle</option>`;
      if (cfg.pet && cfg.pet.action && stMap[cfg.pet.action]) sel.value = cfg.pet.action;
    }

    // 预设色
    $('#hcSwatches').addEventListener('click', e => {
      const s = e.target.closest('.swatch'); if (!s) return;
      cfg.bg = { type: 'color', value: s.dataset.val };
      syncControls(); renderBgPreview(); applyAndSave();
    });
    // 自定义色
    $('#hcApplyColor').addEventListener('click', () => {
      cfg.bg = { type: 'color', value: $('#hcCustom').value };
      syncControls(); renderBgPreview(); applyAndSave();
    });
    // 上传图片
    const fileInput = $('#hcFile');
    $('#hcDrop').addEventListener('click', () => fileInput.click());
    $('#hcDrop').addEventListener('dragover', e => { e.preventDefault(); $('#hcDrop').classList.add('drag'); });
    $('#hcDrop').addEventListener('dragleave', () => $('#hcDrop').classList.remove('drag'));
    $('#hcDrop').addEventListener('drop', e => {
      e.preventDefault(); $('#hcDrop').classList.remove('drag');
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', () => { if (fileInput.files[0]) handleFile(fileInput.files[0]); });
    function handleFile(file) {
      if (!file.type.startsWith('image/')) { toast('请选择图片文件'); return; }
      const reader = new FileReader();
      reader.onload = () => compressImage(reader.result, dataUrl => {
        cfg.bg = { type: 'image', value: dataUrl, mode: 'cover' };
        syncControls(); renderBgPreview(); applyAndSave();
        toast('背景图片已设置');
      });
      reader.readAsDataURL(file);
    }
    // 图片模式
    $('#hcModes').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (!cfg.bg || cfg.bg.type !== 'image') return;
      cfg.bg.mode = b.dataset.mode;
      syncControls(); renderBgPreview(); applyAndSave();
    });
    // 宠物切换：重置动作为 idle 并刷新
    $('#hcPet').addEventListener('change', async () => {
      cfg.pet = cfg.pet || {};
      cfg.pet.slug = $('#hcPet').value;
      cfg.pet.action = 'idle';
      await fillActionSelect();
      syncControls(); renderBgPreview(); renderPetPreview(); applyAndSave();
    });
    // 动作切换
    $('#hcAction').addEventListener('change', () => {
      cfg.pet = cfg.pet || {};
      cfg.pet.action = $('#hcAction').value;
      renderPetPreview(); applyAndSave();
    });
    // 速度
    $('#hcSpeeds').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      cfg.speed = parseFloat(b.dataset.mult);
      syncControls(); renderPetPreview(); applyAndSave();
    });
    // 碎片消失方式（fall / blackhole / bullet）
    $('#hcDissolve').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      cfg.dissolve = b.dataset.mode;
      syncControls(); applyAndSave();
    });
    // 关闭进入特效开关：开启后点击进入按钮直接进工作台，跳过所有碎片/闪电/屏震特效
    $('#hcInstant').addEventListener('change', e => {
      cfg.instant = !!e.target.checked;
      syncControls(); applyAndSave();
    });
    // 宠物大小（拖动实时调整，不弹 toast）
    $('#hcSize').addEventListener('input', e => {
      cfg.scale = parseFloat(e.target.value);
      $('#hcSizeVal').textContent = cfg.scale.toFixed(1) + '×';
      saveHomeCfg(cfg);
      const landing = document.getElementById('landing');
      if (landing && !landing.classList.contains('hide')) paintLandingPet();
      renderPetPreview();
    });
    // 将当前设置固化为默认值（写入 ets_homecfg_default，覆盖代码内置默认）
    $('#hcSetDefault').addEventListener('click', () => {
      localStorage.setItem(HOME_DEFAULT_KEY, JSON.stringify(cfg));
      $('#hcDefaultDesc').textContent = describeCfg(cfg);
      toast('已将当前进入页设置设为默认值');
    });
    // 刷新默认描述展示
    $('#hcDefaultDesc').textContent = describeCfg(defaultHomeCfg());

    // 恢复默认
    $('#hcReset').addEventListener('click', async () => {
      localStorage.removeItem('ets_homecfg');
      cfg = defaultHomeCfg();
      syncControls(); renderBgPreview(); fillPetSelect(); await fillActionSelect(); renderPetPreview();
      applyAndSave();
      toast('已恢复为默认进入页设置');
    });
    // 保存当前开始页面：将当前这套进入页配置（背景/宠物/动作/速度/大小/碎片消失方式）固化持久化
    function saveStartPage(snap) {
      saveHomeCfg(snap);
      try { localStorage.setItem('ets_startpage', JSON.stringify(snap)); } catch (e) {}
      toast('已保存当前开始页面');
    }
    $('#hcSaveStart').addEventListener('click', () => saveStartPage(JSON.parse(JSON.stringify(cfg))));

    // 初始化
    syncControls();
    renderBgPreview();
    fillPetSelect();
    fillActionSelect().then(() => renderPetPreview());
  }

  // 生成并下载 defaults.js（背景/字体/透明度/主题等全部参数），供 IP 访问等新访客自动套用
  function exportSiteDefaults() {
    const d = {};
    Object.keys(localStorage).forEach(k => {
      if (k.indexOf('ets_') === 0 && k !== REC_KEY) d[k] = localStorage.getItem(k);
    });
    const code = '// 站点默认配置（由「保存为站点默认」生成）\nwindow.ETS_DEFAULTS = ' + JSON.stringify(d, null, 2) + ';\n';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => toast('已复制到剪贴板')).catch(() => {});
    }
    const blob = new Blob([code], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'defaults.js';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast('已生成 defaults.js，覆盖项目目录同名文件即可');
  }

  /* ---------------- 字体设置 ---------------- */
  // 各 target（sidebar / topbar / 各页面）独立保存：ets_font_<target> = {scale, color, family}
  const FONT_SCOPES = [
    { key: 'sidebar', label: '侧边栏' },
    { key: 'topbar', label: '顶栏' },
  ].concat(Object.keys(TOOLS).filter(k => k !== 'font').map(k => ({ key: k, label: TOOLS[k].title })));
  const FONT_FAMILIES = [
    { label: '默认（跟随系统）', val: '' },
    { label: '无衬线 / 现代', val: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif' },
    { label: '衬线 / 宋体', val: 'Georgia, "Times New Roman", "SimSun", "Songti SC", serif' },
    { label: '黑体', val: '"Microsoft YaHei", "Heiti SC", "PingFang SC", sans-serif' },
    { label: '楷体', val: '"KaiTi", "Kaiti SC", "STKaiti", serif' },
    { label: '等宽 / 代码', val: '"SF Mono", Consolas, "Courier New", monospace' },
  ];
  const FONT_BASE_PX = 14; // 与 --fs-base 默认一致
  const FONT_SCOPE_KEY = 'ets_font_scope';
  // 各字号档位的默认像素值（与 style.css :root 中 --fs-* 对应），用于按比例缩放后直接写回元素
  const FS_BASES = { xs: 12, sm: 13, base: 14, md: 15, lg: 16, xl: 18, '2xl': 20, '3xl': 24, '4xl': 30 };

  function elForFontTarget(target) {
    return target === 'sidebar' ? $('.sidebar') : target === 'topbar' ? $('.topbar') : $('#content');
  }
  function readFont(target) {
    try { return JSON.parse(localStorage.getItem('ets_font_' + target) || 'null'); } catch (e) { return null; }
  }
  function writeFont(target, cfg) {
    if (cfg) localStorage.setItem('ets_font_' + target, JSON.stringify(cfg));
    else localStorage.removeItem('ets_font_' + target);
  }
  // 把字体配置应用到目标元素：
  //   scale → 把每个 --fs-* 变量写成「默认px × scale」的具体像素值（子元素 var(--fs-*) 继承即生效）
  //   color → 覆盖 --text（重设该范围文字色）
  //   family → font-family
  function applyFont(cfg, el) {
    if (!el) return;
    Object.keys(FS_BASES).forEach(k => el.style.removeProperty('--fs-' + k));
    el.style.removeProperty('--text');
    el.style.fontFamily = '';
    if (!cfg) return;
    if (cfg.scale != null) {
      const s = +cfg.scale;
      Object.keys(FS_BASES).forEach(k => {
        el.style.setProperty('--fs-' + k, Math.round(FS_BASES[k] * s * 100) / 100 + 'px');
      });
    }
    if (cfg.color) el.style.setProperty('--text', cfg.color);
    if (cfg.family) el.style.fontFamily = cfg.family;
  }
  function applyFontFor(target, el) { applyFont(readFont(target), el); }
  // 启动时常驻元素（侧栏 / 顶栏）套用已存字体；页面字体在 setTool 时套用到 #content
  function applySavedFonts() {
    const sb = readFont('sidebar') || { scale: 1.429, color: '', family: '' }; // 侧栏默认 20px
    applyFont(sb, $('.sidebar'));
    applyFontFor('topbar', $('.topbar'));
  }

  function renderFont(root) {
    const scopeOpts = FONT_SCOPES.map(o => `<option value="${o.key}">${o.label}</option>`).join('');
    const famOpts = FONT_FAMILIES.map(f => `<option value="${f.val.replace(/"/g, '&quot;')}">${f.label}</option>`).join('');
    const currentScope = () => $('#fontScope').value;
    const scopeLabel = v => (FONT_SCOPES.find(o => o.key === v) || { label: '当前页面' }).label;

    function syncControls(cfg) {
      const sizePx = cfg && cfg.scale != null ? Math.round(cfg.scale * FONT_BASE_PX) : FONT_BASE_PX;
      $('#fontSize').value = sizePx;
      $('#fontSizeVal').textContent = sizePx + 'px';
      const color = cfg && cfg.color ? cfg.color : '';
      $('#fontColor').value = color || '#1E2A35';
      $('#fontColorRow').style.display = color ? 'flex' : 'none';
      $('#fontFamily').value = (cfg && cfg.family) ? cfg.family : '';
    }

    root.innerHTML = `
      <div class="workbench palette">
        <div class="card">
          <h2 class="card-h">应用范围</h2>
          <p class="pal-tip">选择要设置的区域：侧栏 / 顶栏可单独设置；选择某个页面则只为该页设置字体，互不影响。</p>
          <select id="fontScope" class="pal-select">${scopeOpts}</select>
          <div class="pal-scope-now" id="fontScopeNow">正在为 <strong>侧边栏</strong> 设置字体</div>
        </div>

        <div class="card">
          <h2 class="card-h">字号</h2>
          <div class="pal-overlay-row">
            <label>字体大小</label>
            <input type="range" id="fontSize" min="11" max="22" step="1" value="14" />
            <span id="fontSizeVal">14px</span>
          </div>
        </div>

        <div class="card">
          <h2 class="card-h">字体颜色</h2>
          <div class="pal-custom-row">
            <input type="color" id="fontColor" value="#1E2A35" />
            <button class="btn-primary" id="fontColorOn">应用此颜色</button>
          </div>
          <div class="pal-overlay-row" id="fontColorRow" style="display:none;margin-top:10px">
            <label>已自定义</label>
            <button class="ghost-btn" id="fontColorOff">恢复默认颜色</button>
          </div>
        </div>

        <div class="card">
          <h2 class="card-h">字体样式</h2>
          <select id="fontFamily" class="pal-select">${famOpts}</select>
        </div>

        <div class="card">
          <h2 class="card-h">预览</h2>
          <p class="pal-tip">下方为当前所选范围的实时预览（页面范围会直接作用于右侧内容区）。</p>
          <div class="font-preview" id="fontPreview">
            <h3>华仔效率工坊</h3>
            <p>一站式轻量化办公处理工具集，支持表格瘦身、PDF 转换、批量裁剪与拼图、视频压缩、时间戳转换与证件生成。</p>
            <p class="fp-small">Aa Bb Cc 123 · 中英文混排示例文字</p>
          </div>
        </div>

        <div class="card">
          <h2 class="card-h">还原</h2>
          <div class="pal-reset-row">
            <button class="ghost-btn" id="fontReset">恢复该范围默认字体</button>
            <span class="pal-note">设置会自动保存到本地，刷新后仍然生效。</span>
          </div>
        </div>

        <div class="card">
          <h2 class="card-h">保存为站点默认</h2>
          <p class="pal-tip">字体设置会与背景一起导出为 defaults.js，覆盖项目目录后，其他电脑通过 IP 访问也会自动套用。</p>
          <div class="pal-reset-row">
            <button class="ghost-btn" id="fontSaveDefault">生成并下载 defaults.js</button>
          </div>
        </div>
      </div>`;

    function updateScopeUI() {
      const v = currentScope();
      $('#fontScopeNow').innerHTML = `正在为 <strong>${scopeLabel(v)}</strong> 设置字体`;
      localStorage.setItem(FONT_SCOPE_KEY, v);
    }
    function liveApply() {
      const v = currentScope();
      const cfg = readFont(v);
      applyFont(cfg, elForFontTarget(v));
      applyFont(cfg, $('#fontPreview'));
    }

    // 恢复上次选择的范围
    let lastScope = localStorage.getItem(FONT_SCOPE_KEY);
    if (!lastScope || !FONT_SCOPES.some(o => o.key === lastScope)) lastScope = 'sidebar';
    $('#fontScope').value = lastScope;
    updateScopeUI();
    syncControls(readFont(lastScope));
    applyFont(readFont(lastScope), $('#fontPreview'));

    // 注意：页面范围在右侧内容区实时预览，需先渲染到预览区
    const preview = $('#fontPreview');

    function buildCfg() {
      const sizePx = parseInt($('#fontSize').value, 10);
      const scale = +(sizePx / FONT_BASE_PX).toFixed(3);
      const colorOn = $('#fontColorRow').style.display !== 'none';
      const color = colorOn ? $('#fontColor').value : null;
      const family = $('#fontFamily').value || null;
      return { scale, color, family };
    }
    function saveAndApply() {
      const v = currentScope();
      const cfg = buildCfg();
      writeFont(v, cfg);
      applyFont(cfg, elForFontTarget(v));
      applyFont(cfg, $('#fontPreview')); // 预览区始终跟随当前配置
      toast(`已保存到「${scopeLabel(v)}」字体`);
    }

    $('#fontScope').addEventListener('change', () => {
      updateScopeUI();
      syncControls(readFont(currentScope()));
      liveApply();
    });
    $('#fontSize').addEventListener('input', () => {
      $('#fontSizeVal').textContent = $('#fontSize').value + 'px';
      saveAndApply();
    });
    $('#fontColor').addEventListener('input', () => { $('#fontColorRow').style.display = 'flex'; saveAndApply(); });
    $('#fontColorOn').addEventListener('click', () => { $('#fontColorRow').style.display = 'flex'; saveAndApply(); });
    $('#fontColorOff').addEventListener('click', () => {
      $('#fontColorRow').style.display = 'none';
      saveAndApply();
      syncControls(readFont(currentScope()));
    });
    $('#fontFamily').addEventListener('change', () => saveAndApply());
    $('#fontReset').addEventListener('click', () => {
      const v = currentScope();
      writeFont(v, null);
      applyFont(null, elForFontTarget(v));
      syncControls(null);
      $('#fontColorRow').style.display = 'none';
      toast(`已清除「${scopeLabel(v)}」的自定义字体`);
    });
    $('#fontSaveDefault').addEventListener('click', () => exportSiteDefaults());

    // 预览区始终反映当前配置
    function refreshPreview() { /* 预览区本身在 #content 内，页面范围已实时生效 */ }
    refreshPreview();
  }

  /* ============================================================
     AI 大全：常用 AI 网站导航
     ============================================================ */
  const AI_SITES = [
    { name: 'DeepSeek', url: 'https://chat.deepseek.com', cat: '对话', desc: '深度求索开源大模型' },
    { name: '豆包', url: 'https://www.doubao.com', cat: '对话', desc: '字节跳动 AI 助手' },
    { name: '腾讯元宝', url: 'https://yuanbao.tencent.com', cat: '对话', desc: '腾讯混元大模型助手' },
    { name: '通义千问', url: 'https://tongyi.aliyun.com', cat: '对话', desc: '阿里云通义系列模型' },
    { name: 'ChatGPT', url: 'https://chat.openai.com', cat: '对话', desc: 'OpenAI 通用对话与创作助手' },
    { name: 'Claude', url: 'https://claude.ai', cat: '对话', desc: 'Anthropic 长文本与推理模型' },
    { name: 'Gemini', url: 'https://gemini.google.com', cat: '对话', desc: '谷歌多模态 AI 助手' },
    { name: 'Kimi', url: 'https://kimi.moonshot.cn', cat: '对话', desc: '月之暗面超长上下文助手' },
    { name: '文心一言', url: 'https://yiyan.baidu.com', cat: '对话', desc: '百度知识增强大模型' },
    { name: '智谱清言', url: 'https://chatglm.cn', cat: '对话', desc: '智谱 AI 对话助手' },
    { name: '讯飞星火', url: 'https://xinghuo.xfyun.cn', cat: '对话', desc: '科大讯飞认知大模型' },
    { name: '扣子', url: 'https://www.coze.cn/overview', cat: '开发', desc: '字节 AI 智能体搭建平台' },
    { name: 'Dify', url: 'https://dify.ai', cat: '开发', desc: '开源 LLM 应用开发平台' },
    { name: '秘塔搜索', url: 'https://metaso.cn', cat: '搜索', desc: '无广告 AI 学术搜索' },
    { name: 'Perplexity', url: 'https://www.perplexity.ai', cat: '搜索', desc: '对话式答案引擎' },
    { name: 'Poe', url: 'https://poe.com', cat: '聚合', desc: '多模型聚合对话平台' },
    { name: '纳米 AI', url: 'https://www.n.cn', cat: '搜索', desc: '360 推出的 AI 搜索' },
    { name: 'Midjourney', url: 'https://www.midjourney.com', cat: '绘画', desc: '高质量 AI 图像生成' },
    { name: '即梦 AI', url: 'https://dreamina.capcut.com', cat: '绘画', desc: '剪映旗下 AI 创作平台' },
    { name: '可灵', url: 'https://klingai.com', cat: '视频', desc: '快手 AI 视频生成' },
    { name: 'Suno', url: 'https://suno.com', cat: '音乐', desc: '一句话生成完整歌曲' },
    { name: 'Runway', url: 'https://runwayml.com', cat: '视频', desc: '专业 AI 视频与特效' },
    { name: '海螺 AI', url: 'https://hailuoai.video', cat: '视频', desc: 'MiniMax 视频与对话' },
    { name: 'Hugging Face', url: 'https://huggingface.co', cat: '开发', desc: '开源模型与数据集社区' },
  ];
  const COMMON_SITES = [
    { name: '百度', url: 'https://www.baidu.com', cat: '搜索', desc: '全球最大中文搜索引擎' },
    { name: '哔哩哔哩', url: 'https://www.bilibili.com', cat: '视频', desc: 'B 站视频与弹幕社区' },
    { name: 'GitHub', url: 'https://github.com', cat: '开发', desc: '全球最大代码托管与协作平台' },
    { name: 'CSDN', url: 'https://www.csdn.net', cat: '开发', desc: '中文 IT 技术社区与博客' },
    { name: 'UI', url: 'https://uiverse.io/loaders?page=1', cat: '前端', desc: '免费 UI 组件与 Loaders 素材库' },
    { name: '宠物', url: 'https://petdex.dev/zh', cat: '设计', desc: '宠物精灵图素材站点' },
    { name: '壁纸', url: 'https://wallpaper.061129.xyz/desktop/', cat: '设计', desc: '桌面壁纸下载站' },
    { name: '掘金', url: 'https://juejin.cn', cat: '开发', desc: '面向开发者的技术内容社区' },
    { name: '知乎', url: 'https://www.zhihu.com', cat: '社区', desc: '中文问答与知识分享平台' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com', cat: '开发', desc: '全球程序员问答社区' },
    { name: 'Gitee', url: 'https://gitee.com', cat: '开发', desc: '国内代码托管平台（码云）' },
    { name: '菜鸟教程', url: 'https://www.runoob.com', cat: '开发', desc: '免费编程基础教程站' },
    { name: 'MDN', url: 'https://developer.mozilla.org', cat: '开发', desc: 'Web 技术与文档参考' },
    { name: 'W3School', url: 'https://www.w3school.com.cn', cat: '开发', desc: '在线 Web 技术教程' },
    { name: 'GitLab', url: 'https://gitlab.com', cat: '开发', desc: '代码托管与 DevOps 平台' },
    { name: 'Docker Hub', url: 'https://hub.docker.com', cat: '开发', desc: '容器镜像仓库' },
    { name: 'npm', url: 'https://www.npmjs.com', cat: '开发', desc: 'Node.js 包管理 registry' },
    { name: 'LeetCode', url: 'https://leetcode.cn', cat: '算法', desc: '力扣算法题库与面试题' },
    { name: '阮一峰的网络日志', url: 'https://www.ruanyifeng.com/blog', cat: '博客', desc: '知名前端技术博主' },
    { name: 'BootCDN', url: 'https://www.bootcdn.cn', cat: '前端', desc: '开源前端库 CDN 加速' },
    { name: 'iconfont', url: 'https://www.iconfont.cn', cat: '前端', desc: '阿里矢量图标库' },
    { name: '微信公众平台', url: 'https://mp.weixin.qq.com', cat: '运营', desc: '公众号内容管理后台' },
    { name: '支付宝开放平台', url: 'https://open.alipay.com', cat: '开发', desc: '支付宝开发者门户' },
  ];
  const AI_AVATAR_COLORS = ['#4E677E', '#E07A5F', '#81B29A', '#9B8CFF', '#F2B705', '#3D9BE9', '#E76F92', '#5FB49C'];
  function aiAvatarColor(name) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return AI_AVATAR_COLORS[h % AI_AVATAR_COLORS.length];
  }
  function renderSites(root) {
    const cards = COMMON_SITES.map(s => `
      <a class="ai-card" href="${s.url}" target="_blank" rel="noopener noreferrer"
         data-url="${s.url}" data-cat="${s.cat}" style="--ai-c:${aiAvatarColor(s.name)}">
        <span class="ai-avatar">${s.name.slice(0, 1)}</span>
        <span class="ai-meta">
          <span class="ai-name">${s.name}</span>
          <span class="ai-desc">${s.desc}</span>
        </span>
        <span class="ai-go">${svg('chev', 16)}</span>
      </a>`).join('');
    root.innerHTML = `
      <div class="workbench">
        <div class="ai-search">
          <input type="text" id="sitesSearch" placeholder="搜索常用网站（名称 / 分类）" />
        </div>
        <div class="ai-grid" id="sitesGrid">${cards}</div>
        <p class="ai-tip">点击任意卡片即可在新标签页打开对应网站，本站仅作导航跳转。</p>
      </div>`;
    const grid = $('#sitesGrid');
    $$('.ai-card', grid).forEach(c => {
      c.addEventListener('click', e => {
        const url = c.getAttribute('data-url') || c.href;
        if (url) { e.preventDefault(); window.open(url, '_blank', 'noopener,noreferrer'); }
      });
    });
    $('#sitesSearch').addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      $$('.ai-card', grid).forEach(c => {
        const txt = (c.textContent + ' ' + (c.dataset.cat || '')).toLowerCase();
        c.style.display = (!q || txt.indexOf(q) >= 0) ? '' : 'none';
      });
    });
  }

  function renderAi(root) {
    const cards = AI_SITES.map(s => `
      <a class="ai-card" href="${s.url}" target="_blank" rel="noopener noreferrer"
         data-url="${s.url}" data-cat="${s.cat}" style="--ai-c:${aiAvatarColor(s.name)}">
        <span class="ai-avatar">${s.name.slice(0, 1)}</span>
        <span class="ai-meta">
          <span class="ai-name">${s.name}</span>
          <span class="ai-desc">${s.desc}</span>
        </span>
        <span class="ai-go">${svg('chev', 16)}</span>
      </a>`).join('');
    root.innerHTML = `
      <div class="workbench">
        <div class="ai-search">
          <input type="text" id="aiSearch" placeholder="搜索 AI 网站（名称 / 分类）" />
        </div>
        <div class="ai-grid" id="aiGrid">${cards}</div>
        <p class="ai-tip">点击任意卡片即可在新标签页打开对应官网，本站仅作导航跳转。</p>
      </div>`;
    const grid = $('#aiGrid');
    // 显式跳转，避免被任何全局/冒泡处理拦截
    $$('.ai-card', grid).forEach(c => {
      c.addEventListener('click', e => {
        const url = c.getAttribute('data-url') || c.href;
        if (url) { e.preventDefault(); window.open(url, '_blank', 'noopener,noreferrer'); }
      });
    });
    $('#aiSearch').addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      $$('.ai-card', grid).forEach(c => {
        const txt = (c.textContent + ' ' + (c.dataset.cat || '')).toLowerCase();
        c.style.display = (!q || txt.indexOf(q) >= 0) ? '' : 'none';
      });
    });
  }

  /* ============================================================
     宠物陪伴（网页桌宠）：改造自桌面宠物思路，固定右下角常驻，
     切换页面不消失；可拖拽、可点击对话；选择记忆于 localStorage。
     ============================================================ */
  /* 素材来自 https://petdex.dev（非手绘）。
     每张 spritesheet 为 8 列×9 行，单帧 192×208；
     每行对应一个状态（Idle/Run Right/Run Left/Waving/Jumping/Failed/Waiting/Running/Review）。
     我们把每行裁成独立 PNG strip，宠物会自动在这些状态间切换。 */
  const PET_STATE_ORDER = ['idle','running-right','running-left','waving','jumping','failed','waiting','running','review'];
  const PET_AMBIENT_STATES = ['waiting','running','review','waving','jumping','failed']; // 自动切换时排除方向奔跑
  const PET_STATE_LABEL = {
    idle:'Idle', 'running-right':'Run Right', 'running-left':'Run Left',
    waving:'Waving', jumping:'Jumping', failed:'Failed',
    waiting:'Waiting', running:'Running', review:'Review'
  };
  const PET_STATE_DURATION = {
    idle: 1100, 'running-right': 1060, 'running-left': 1060,
    waving: 700, jumping: 840, failed: 1220,
    waiting: 1010, running: 820, review: 1030
  };
  function makeBuiltInStates(slug, frameMap) {
    const states = {};
    for (const id of PET_STATE_ORDER) {
      const frames = frameMap[id];
      if (!frames) continue;
      states[id] = { label: PET_STATE_LABEL[id], frames, sprite: `pets/${slug}-${id}.png` };
    }
    return states;
  }
  const PETS = {
    paimon: {
      slug: 'paimon',
      name: 'Super Paimon',
      color: '#3a6ff0',
      states: makeBuiltInStates('paimon', { idle:7, 'running-right':9, 'running-left':9, waving:5, jumping:6, failed:9, waiting:7, running:7, review:7 }),
      phrases: ['今天也是充满希望的一天！', '诶嘿，需要我帮忙吗？', '我可是行走的向导哦~', '加油，你一定可以的！', '别担心，有我在呢。', '去试试新功能吧！'],
    },
    iikun: {
      slug: 'iikun',
      name: 'iikun',
      color: '#2bb6cf',
      states: makeBuiltInStates('iikun', { idle:7, 'running-right':9, 'running-left':9, waving:5, jumping:6, failed:9, waiting:7, running:7, review:7 }),
      phrases: ['今天也是充满希望的一天！', '咕噜~ 陪你一起搬砖！', '摸鱼一下也没关系啦~', '你最棒啦！', '要不要听个冷笑话？', '冲冲冲，搞定它！'],
    },
    duidui: {
      slug: 'duidui',
      name: '墩墩',
      color: '#e0556b',
      states: makeBuiltInStates('dundun', { idle:7, 'running-right':9, 'running-left':9, waving:5, jumping:6, failed:9, waiting:7, running:7, review:7 }),
      phrases: ['今天也是充满希望的一天！', '墩墩陪着你，安心干活~', '抱着我充个电吧！', '你是全世界最厉害的！', '慢慢来，不着急。', '完成一个小目标啦！'],
    },
  };
  // 合并由 download_pets.py 生成的额外内置宠物（素材为完整精灵表，运行时切片为 9 动作）
  const DEFAULT_PET_PHRASES = ['今天也是充满希望的一天！', '陪你一起干活啦~', '加油，你最棒！', '慢慢来，不着急。', '完成一个小目标！', '需要我帮忙吗？'];
  // 创建顺序标记：用于「创建时间」排序（内置在前，extra 按加入先后）
  let _petOrder = 0;
  Object.keys(PETS).forEach(k => { PETS[k]._order = _petOrder++; });
  if (window.PETS_EXTRA && Array.isArray(window.PETS_EXTRA)) {
    window.PETS_EXTRA.forEach(p => {
      p.phrases = DEFAULT_PET_PHRASES;
      p._order = _petOrder++;
      PETS[p.slug] = p;
    });
  }

  const PETS_SELECTED_KEY = 'ets_pets';
  let petEls = [];          // 当前常驻的宠物元素列表 [{el, pet, slug}]
  let petSpeakTimer = null;

  function getStateList(states) {
    return states ? Object.keys(states).filter(k => states[k] && states[k].sprite) : [];
  }
  function pickRandomState(states, exclude) {
    const list = getStateList(states).filter(s => s !== exclude);
    return list.length ? list[(Math.random() * list.length) | 0] : 'idle';
  }
  // 宠物可能用预切 states（内置三宠）或运行时切出的 _states（额外宠物）
  function petStateMap(p) {
    return (p && (p.states || p._states)) || {};
  }

  // ---------- 多选模型（ets_pets 为 slug 数组） ----------
  function getSelectedPets() {
    try {
      const v = JSON.parse(localStorage.getItem(PETS_SELECTED_KEY));
      if (Array.isArray(v)) return v.filter(Boolean);
    } catch (e) {}
    // 兼容旧版单只选择
    const old = localStorage.getItem('ets_pet');
    if (old) { try { localStorage.removeItem('ets_pet'); } catch (e) {} return [old]; }
    return [];
  }
  function setSelectedPets(arr) { localStorage.setItem(PETS_SELECTED_KEY, JSON.stringify(arr)); }
  function togglePet(slug) {
    const cur = getSelectedPets();
    const i = cur.indexOf(slug);
    if (i >= 0) cur.splice(i, 1); else cur.push(slug);
    setSelectedPets(cur);
  }
  // 计算实际展示的陪伴宠物：已选则用之；未选则兜底默认宠（NezukoCoder / 派蒙），保证页面始终有桌宠
  function getShownPets() {
    const sel = getSelectedPets();
    if (sel.length) return sel;
    if (PETS['nezukocoder']) return ['nezukocoder'];
    if (PETS['paimon']) return ['paimon'];
    return [];
  }

  // 内置宠物集合
  function allPets() {
    return Object.assign({}, PETS);
  }

  // 动态生成每只宠物每个状态的关键帧（字面量 steps，位移 -N*96px 对齐单帧边界）
  function ensurePetKeyframes() {
    let s = document.getElementById('pet-keyframes');
    if (!s) { s = document.createElement('style'); s.id = 'pet-keyframes'; document.head.appendChild(s); }
    let css = '';
    const pets = allPets();
    for (const slug in pets) {
      const states = petStateMap(pets[slug]);
      for (const sid in states) {
        const st = states[sid];
        const n = st.frames || 6;
        const end = -(n * 96);
        if (st._sheet) {
          // 切片宠物：整张精灵表作背景，动画时固定行（Y），仅平移 X
          const y = -(st.row * 104);
          css += `@keyframes petSteps_${slug}_${sid}{from{background-position:0px ${y}px}to{background-position:${end}px ${y}px}}`;
        } else {
          css += `@keyframes petSteps_${slug}_${sid}{from{background-position-x:0}to{background-position-x:${end}px}}`;
        }
      }
    }
    s.textContent = css;
  }

  /* ---------- 运行时把完整精灵表切成 9 个状态条（额外内置宠物） ---------- */
  const _imgCache = new Map();
  function loadImage(url) {
    if (_imgCache.has(url)) return _imgCache.get(url);
    const pr = new Promise((res, rej) => {
      const i = new Image();
      i.decoding = 'async';
      i.onload = () => res(i);
      i.onerror = () => { _imgCache.delete(url); rej(new Error('img load failed: ' + url)); };
      i.src = url;
    });
    _imgCache.set(url, pr);
    return pr;
  }
  // 逐行扫描 alpha，把每行裁成横向 PNG 条（dataURL）；末尾复制第 0 帧让 steps(N) 循环无缝。
  // 返回 { stateId: { label, frames, sprite:dataURL } }
  // 运行时解析完整精灵表为 9 个状态（额外内置宠物）。
  // 优化：不再把每行切片成 dataURL（toDataURL 极慢且生成巨大 base64，且预切全部宠物会卡主线程）。
  // 改为只统计每个状态所在行 + 帧数，渲染时直接以原图（webp）作 CSS 背景、用 background-position 定位行，
  // 首屏只加载真正要展示的宠物，性能与内存都大幅改善。
  async function buildPetSheetInfo(url) {
    let img;
    try { img = await loadImage(url); }
    catch (e) {
      try { const r = await fetch(url); img = await createImageBitmap(await r.blob()); }
      catch (e2) { return null; }
    }
    const fw = 192, fh = 208;
    const maxCols = Math.max(1, Math.floor(img.width / fw));
    const maxRows = Math.max(1, Math.floor(img.height / fh));
    const rows = Math.min(maxRows, PET_STATE_ORDER.length);
    // 仅一次取像素，逐行统计有内容的列数（帧数）
    const check = document.createElement('canvas');
    check.width = maxCols * fw; check.height = rows * fh;
    const cctx = check.getContext('2d', { willReadFrequently: true });
    cctx.drawImage(img, 0, 0, maxCols * fw, rows * fh);
    const px = cctx.getImageData(0, 0, maxCols * fw, rows * fh).data;
    const frameRows = [];
    for (let r = 0; r < rows; r++) {
      const y0 = r * fh;
      let cols = 0;
      for (let c = 0; c < maxCols; c++) {
        const x0 = c * fw;
        let has = false;
        for (let yy = 0; yy < fh && !has; yy++) {
          const base = ((y0 + yy) * maxCols * fw + x0) * 4;
          for (let x = 0; x < fw; x++) { if (px[base + x * 4 + 3] > 0) { has = true; break; } }
        }
        if (has) cols = c + 1; else break;
      }
      if (cols < 1) cols = 1;
      frameRows[r] = cols;
    }
    return { url, cols: maxCols, rows, frameRows };
  }
  // 确保某宠物的状态已就绪（预切宠物直接返回，额外宠物首次解析精灵表并缓存）
  // _statePromises 缓存「进行中」的解析，避免并发重复解析同一宠物
  const _statePromises = new WeakMap();
  async function ensurePetStates(pet) {
    if (pet.states) return pet.states;
    if (pet._states) return pet._states;
    if (!pet.sheet) return {};
    if (_statePromises.has(pet)) return _statePromises.get(pet);
    const pr = buildPetSheetInfo(pet.sheet).then(info => {
      if (!info) { pet._states = {}; return pet._states; }
      pet._sheet = info;
      const states = {};
      for (let r = 0; r < info.rows; r++) {
        const sid = PET_STATE_ORDER[r];
        const frames = info.frameRows[r];
        const st = {
          label: PET_STATE_LABEL[sid] || sid,
          frames,
          sheet: info.url,
          row: r,
          sprite: info.url,   // 兼容旧消费方（仍引用 .sprite 作背景图 URL）
          _sheet: true,
        };
        if (pet.fps && pet.fps > 0) st.duration = +(frames / pet.fps).toFixed(2);
        states[sid] = st;
      }
      pet._states = states;
      return states;
    });
    _statePromises.set(pet, pr);
    return pr;
  }

  function petSpeak(el, p) {
    const b = el.querySelector('.pet-bubble');
    if (!b || !p) return;
    b.textContent = p.phrases[(Math.random() * p.phrases.length) | 0];
    b.hidden = false;
    el.classList.add('pet-talk');
    clearTimeout(el._bTimer);
    el._bTimer = setTimeout(() => { b.hidden = true; el.classList.remove('pet-talk'); }, 2800);
  }

  function enablePetDrag(el, slug, pet) {
    el._slug = slug; el._pet = pet;
    let sx, sy, ox, oy, moved = false;
    el.addEventListener('pointerdown', e => {
      moved = false;
      sx = e.clientX; sy = e.clientY;
      const r = el.getBoundingClientRect();
      ox = r.left; oy = r.top;
      el.setPointerCapture(e.pointerId);
      el.classList.add('pet-dragging');
    });
    el.addEventListener('pointermove', e => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
      el.style.left = clamp(ox + dx, 4, window.innerWidth - el.offsetWidth - 4) + 'px';
      el.style.top = clamp(oy + dy, 4, window.innerHeight - el.offsetHeight - 4) + 'px';
      el.style.right = 'auto'; el.style.bottom = 'auto';
    });
    el.addEventListener('pointerup', e => {
      el.releasePointerCapture(e.pointerId);
      el.classList.remove('pet-dragging');
      if (moved) {
        localStorage.setItem('ets_pet_pos_' + slug, JSON.stringify({ x: parseFloat(el.style.left), y: parseFloat(el.style.top) }));
      } else {
        petSpeak(el, pet);
        // 点击触发一个随机互动动作，2.5 秒后恢复 Idle
        const body = el.querySelector('.pet-body');
        if (body && setPetBodyState(body, pet, slug, pickRandomState(petStateMap(pet), 'idle'))) {
          clearTimeout(el._restore);
          el._restore = setTimeout(() => schedulePetState(el, pet, slug), 2500);
        }
      }
    });
  }

  function setPetBodyState(body, p, slug, sid) {
    const st = petStateMap(p)[sid];
    if (!st || !st.sprite) return false;
    // 往返循环：素材首尾不衔接时（如大圣摆动动画），用 alternate 让末帧接回相邻帧，消除收尾跳变
    const alt = !!(p && p.loop === 'alternate');
    let dur = st.duration ? st.duration : Math.max(0.7, st.frames * 0.12);
    // 保持素材原速（12fps），不做提速补偿；一来一回约 2× 时长，但每帧速度与原素材一致
    body.style.backgroundImage = `url('${st.sprite}')`;
    if (st._sheet) {
      // 切片宠物：整张精灵表作背景，尺寸为「整表.frame」，用 background-position-y 锁到对应行
      const info = p._sheet || { cols: 8, rows: PET_STATE_ORDER.length };
      body.style.backgroundSize = `${info.cols * 96}px ${info.rows * 104}px`;
      body.style.backgroundPositionY = `${-st.row * 104}px`;
    } else {
      body.style.backgroundSize = `${st.frames * 96}px 104px`;
    }
    body.style.setProperty('--dur', `${dur.toFixed(2)}s`);
    const dir = alt ? ' alternate' : '';
    body.style.animation = `petSteps_${slug}_${sid} var(--dur) steps(${st.frames}) infinite${dir}`;
    body.dataset.state = sid;
    return true;
  }

  function schedulePetState(el, p, slug) {
    clearTimeout(el._stateTimer);
    clearTimeout(el._restore);
    // 8-20 秒后随机切到非 Idle 状态，持续 3-6 秒后回到 Idle
    const next = 8000 + Math.random() * 12000;
    el._stateTimer = setTimeout(() => {
      const ambient = getStateList(petStateMap(p)).filter(s => PET_AMBIENT_STATES.includes(s));
      const sid = ambient.length ? ambient[(Math.random() * ambient.length) | 0] : pickRandomState(petStateMap(p), 'idle');
      const body = el.querySelector('.pet-body');
      if (body && setPetBodyState(body, p, slug, sid)) {
        el._restore = setTimeout(() => schedulePetState(el, p, slug), 3000 + Math.random() * 3000);
      } else {
        schedulePetState(el, p, slug);
      }
    }, next);
  }

  async function applyPet() {
    const layer = $('#petLayer');
    if (!layer) return;
    if (petSpeakTimer) { clearInterval(petSpeakTimer); petSpeakTimer = null; }
    petEls.forEach(o => { clearTimeout(o.el._stateTimer); clearTimeout(o.el._restore); });
    layer.innerHTML = '';
    petEls = [];

    const all = allPets();
    const selected = getSelectedPets();
    const showList = getShownPets();
    const perRow = 6;
    for (let i = 0; i < showList.length; i++) {
      const slug = showList[i];
      const p = all[slug];
      if (!p) continue;
      const states = await ensurePetStates(p);
      if (!states || !Object.keys(states).length) continue;

      const el = document.createElement('div');
      el.className = 'pet';
      el.style.setProperty('--pet', p.color);
      el.innerHTML = `<div class="pet-bubble" hidden></div>`;
      const body = document.createElement('div');
      body.className = 'pet-body';
      const initialState = (selected.length === 0 && slug === 'nezukocoder') ? 'running-right' : 'idle';
      setPetBodyState(body, p, slug, initialState);
      el.appendChild(body);

      const posKey = 'ets_pet_pos_' + slug;
      const pos = JSON.parse(localStorage.getItem(posKey) || 'null');
      if (pos && typeof pos.x === 'number') {
        el.style.left = clamp(pos.x, 4, window.innerWidth - 122) + 'px';
        el.style.top = clamp(pos.y, 4, window.innerHeight - 154) + 'px';
        el.style.right = 'auto'; el.style.bottom = 'auto';
      } else {
        // 默认排布：右下角起每行 6 只向左展开，多行向上堆叠
        const col = i % perRow, row = Math.floor(i / perRow);
        el.style.right = (22 + col * 110) + 'px';
        el.style.bottom = (22 + row * 120) + 'px';
      }
      layer.appendChild(el);
      enablePetDrag(el, slug, p);
      schedulePetState(el, p, slug);
      petEls.push({ el, pet: p, slug });
    }
    ensurePetKeyframes();

    if (petEls.length) {
      petSpeakTimer = setInterval(() => {
        const o = petEls[(Math.random() * petEls.length) | 0];
        const b = o.el.querySelector('.pet-bubble');
        if (b && b.hidden) petSpeak(o.el, o.pet);
      }, 30000);
    }
  }

  // 宠物页视图状态（搜索 / 排序）
  const petView = { q: '', sort: 'created-asc' }; // 默认：创建时间正序

  async function renderPet(root) {
    root.innerHTML = `
      <div class="workbench">
        <div class="pet-head">
          <h2>宠物陪伴</h2>
          <p>挑选一位或多位小伙伴常驻在网页右下角，陪你一起干活。它们不会随页面切换消失，可以分别拖拽到喜欢的位置，点一下还会跟你说话～</p>
        </div>
        <div class="pet-toolbar">
          <input class="pet-search" id="petSearch" type="search" placeholder="搜索宠物名字 / 拼音…" autocomplete="off" />
          <label class="pet-sort-label" for="petSort">排序</label>
          <select class="pet-sort" id="petSort">
            <option value="created-asc">创建时间 ↑ 正序</option>
            <option value="created-desc">创建时间 ↓ 倒序</option>
            <option value="name-asc">姓名 A→Z</option>
            <option value="name-desc">姓名 Z→A</option>
          </select>
          <span class="pet-count" id="petCount"></span>
        </div>
        <div class="pet-grid" id="petGrid"></div>
        <div class="pet-actions">
          <button class="ghost-btn" id="petClear">取消全部陪伴</button>
        </div>
      </div>`;

    const grid = $('#petGrid', root);
    const search = $('#petSearch', root);
    const sortSel = $('#petSort', root);
    search.value = petView.q;
    sortSel.value = petView.sort;

    // 计算过滤 + 排序后的宠物 key 列表
    function computeList() {
      const pets = allPets();
      let keys = Object.keys(pets);
      const q = petView.q.trim().toLowerCase();
      if (q) {
        keys = keys.filter(k => {
          const p = pets[k];
          return (p.name || '').toLowerCase().includes(q) || (p.slug || '').toLowerCase().includes(q);
        });
      }
      const cmp = {
        'created-asc': (a, b) => pets[a]._order - pets[b]._order,
        'created-desc': (a, b) => pets[b]._order - pets[a]._order,
        'name-asc': (a, b) => (pets[a].name || '').localeCompare(pets[b].name || '', 'zh-Hans-CN'),
        'name-desc': (a, b) => (pets[b].name || '').localeCompare(pets[a].name || '', 'zh-Hans-CN'),
      }[petView.sort] || ((a, b) => pets[a]._order - pets[b]._order);
      keys.sort(cmp);
      return keys;
    }

    // 刷新单张卡片的选中态与动作数
    function refreshCard(c) {
      const pets = allPets();
      const k = c.dataset.pet;
      const on = getSelectedPets().includes(k);
      c.classList.toggle('pet-on', on);
      const sc = Object.keys(petStateMap(pets[k])).length;
      const sEl = c.querySelector('.pet-state');
      if (sEl) sEl.textContent = (on ? '陪伴中' : '点击选择') + (sc ? ' · ' + sc + '动作' : '');
    }

    // 宠物状态懒加载：只在卡片进入视口时加载，限制并发避免主线程卡顿
    const PET_LOAD_LIMIT = 4;
    let _petLoadRunning = 0;
    const _petLoadQueue = [];
    const _petObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        const k = card.dataset.pet;
        const p = allPets()[k];
        _petObserver.unobserve(card);
        const st = petStateMap(p);
        if (st && Object.keys(st).length) {
          updatePetCard(card, p, st);
          return;
        }
        _petLoadQueue.push({ card, pet: p });
        _runPetLoadQueue();
      });
    }, { rootMargin: '120px 0px' });

    function updatePetCard(card, p, states) {
      states = states || {};
      const idle = states.idle || {};
      const pv = card.querySelector('.pet-preview');
      if (pv && (idle.sprite || idle.sheet)) {
        if (idle._sheet) {
          const info = p._sheet || { cols: 8, rows: PET_STATE_ORDER.length };
          pv.style.backgroundImage = `url('${idle.sheet}')`;
          pv.style.backgroundSize = `${info.cols * 96}px ${info.rows * 104}px`;
          pv.style.backgroundPosition = `0px ${-idle.row * 104}px`;
        } else if (idle.sprite) {
          pv.style.backgroundImage = `url('${idle.sprite}')`;
          pv.style.backgroundSize = `${(idle.frames || 6) * 96}px 104px`;
        }
        pv.classList.remove('pet-loading');
      }
      const on = getSelectedPets().includes(card.dataset.pet);
      const stEl = card.querySelector('.pet-state');
      if (stEl) stEl.textContent = (on ? '陪伴中' : '点击选择') + (Object.keys(states).length ? ' · ' + Object.keys(states).length + '动作' : '');
    }

    function _runPetLoadQueue() {
      if (!_petLoadQueue.length || _petLoadRunning >= PET_LOAD_LIMIT) return;
      const { card, pet } = _petLoadQueue.shift();
      _petLoadRunning++;
      ensurePetStates(pet).then(states => {
        if (card.isConnected) updatePetCard(card, pet, states);
      }).catch(() => {
        if (card.isConnected) {
          const pv = card.querySelector('.pet-preview');
          if (pv) pv.classList.remove('pet-loading');
        }
      }).finally(() => {
        _petLoadRunning--;
        _runPetLoadQueue();
      });
    }

    // 渲染网格（仅重建 #petGrid，不刷新工具栏，避免输入框失焦）
    function renderGrid() {
      const pets = allPets();
      const keys = computeList();
      const selected = getSelectedPets();
      grid.innerHTML = keys.map(k => {
        const p = pets[k];
        const on = selected.includes(k);
        const st = petStateMap(p) || {};
        const idle = st.idle || {};
        let bg = '', bgSize = '', bgPos = '';
        if (idle._sheet) {
          const info = p._sheet || { cols: 8, rows: PET_STATE_ORDER.length };
          bg = idle.sheet;
          bgSize = `${info.cols * 96}px ${info.rows * 104}px`;
          bgPos = `0px ${-idle.row * 104}px`;
        } else {
          bg = idle.sprite || '';
          bgSize = bg ? `${(idle.frames || 6) * 96}px 104px` : '';
        }
        const cnt = Object.keys(st).length;
        const loading = bg ? '' : ' pet-loading';
        const stateText = (on ? '陪伴中' : '点击选择') + (cnt ? ' · ' + cnt + '动作' : (loading ? ' · 加载中…' : ''));
        const bgStyle = bg ? ` style="background-image:url('${bg}');background-size:${bgSize};${bgPos ? `background-position:${bgPos};` : ''}"` : '';
        return `
        <button class="pet-card ${on ? 'pet-on' : ''}" data-pet="${k}" style="--pet:${p.color}">
          <span class="pet-preview${loading}"${bgStyle}></span>
          <span class="pet-name">${p.name}</span>
          <span class="pet-state">${stateText}</span>
        </button>`;
      }).join('');
      const count = $('#petCount', root);
      if (count) count.textContent = '共 ' + keys.length + ' 只';

      $$('.pet-card', grid).forEach(c => {
        c.addEventListener('click', () => {
          const slug = c.dataset.pet;
          const wasOn = getSelectedPets().includes(slug);
          togglePet(slug);
          applyPet();
          refreshCard(c);
          toast(wasOn ? '已取消「' + pets[slug].name + '」陪伴' : '已添加「' + pets[slug].name + '」陪伴');
        });
      });

      // 已缓存的宠物直接显示；未缓存的进入视口后再异步加载，避免首屏并发 68 张图
      _petObserver.disconnect();
      $$('.pet-card', grid).forEach(card => {
        const p = pets[card.dataset.pet];
        const st = petStateMap(p);
        if (st && Object.keys(st).length) {
          updatePetCard(card, p, st);
        } else {
          _petObserver.observe(card);
        }
      });
    }

    search.addEventListener('input', () => { petView.q = search.value; renderGrid(); });
    sortSel.addEventListener('change', () => { petView.sort = sortSel.value; renderGrid(); });

    const clear = $('#petClear', root);
    if (clear) clear.addEventListener('click', () => {
      setSelectedPets([]);
      applyPet();
      $$('.pet-card', grid).forEach(refreshCard);
      toast('已取消全部宠物陪伴');
    });

    renderGrid();
  }

  /* ============================================================
     JSON 工具（参考 json.cn）：在线解析 / 压缩转义 / 编辑器
     ============================================================ */
  function renderJson(root) {
    root.innerHTML = `
      <div class="workbench">
        <div class="card">
          <div class="seg" id="jsonTabs">
            <button class="active" data-tab="parse">在线解析</button>
            <button data-tab="mini">压缩转义</button>
            <button data-tab="edit">JSON 编辑器</button>
          </div>
        </div>

        <div class="card">
          <div class="section-title" id="jsonTitle">在线解析（格式化 / 校验）</div>
          <div class="action-bar" id="jsonActions"></div>
          <div class="json-io">
            <textarea class="json-area" id="jsonIn" placeholder="在此粘贴 JSON 文本…（支持对象、数组、嵌套结构）"></textarea>
            <pre class="json-out" id="jsonOut"></pre>
          </div>
          <div class="json-status" id="jsonStatus"></div>

          <div class="json-edit-wrap" id="jsonEditWrap" style="display:none">
            <div class="json-edit-side">
              <div class="json-edit-h">编辑区</div>
              <textarea class="json-area" id="jsonEditIn" spellcheck="false" placeholder="在此编辑 JSON，右侧实时预览…"></textarea>
            </div>
            <div class="json-edit-side">
              <div class="json-edit-h">
                实时预览
                <button class="ghost-btn ghost-sm" id="jsonEditCopy">复制格式化结果</button>
              </div>
              <pre class="json-out" id="jsonEditPrev"></pre>
            </div>
          </div>
        </div>
      </div>`;

    const $in = $('#jsonIn'), $out = $('#jsonOut'), $status = $('#jsonStatus'),
          $actions = $('#jsonActions'), $title = $('#jsonTitle'),
          editWrap = $('#jsonEditWrap'), editInput = $('#jsonEditIn'), editPrev = $('#jsonEditPrev');

    // JSON 语法高亮（先转义 HTML，避免注入）
    function hl(json) {
      const e = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return e.replace(/("(?:\\.|[^"\\])*")(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, (m, str, colon) => {
        if (str !== undefined) {
          if (colon !== undefined) return '<span class="jh-key">' + str + '</span>' + colon;
          return '<span class="jh-str">' + str + '</span>';
        }
        if (m === 'true' || m === 'false' || m === 'null') return '<span class="jh-bool">' + m + '</span>';
        return '<span class="jh-num">' + m + '</span>';
      });
    }
    function setStatus(ok, msg) {
      $status.className = 'json-status' + (ok ? ' ok' : (msg ? ' err' : ''));
      $status.textContent = msg || '';
    }
    function parseSafe(text) {
      try { return { ok: true, val: JSON.parse(text) }; }
      catch (e) { return { ok: false, err: e.message }; }
    }
    function copy(t) {
      if (!t) return;
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(() => toast('已复制')).catch(() => {});
      else toast('复制失败');
    }

    function doParse() {
      const r = parseSafe($in.value);
      if (!r.ok) { setStatus(false, '解析失败：' + r.err); $out.textContent = ''; return; }
      $out.innerHTML = hl(JSON.stringify(r.val, null, 2));
      setStatus(true, '解析成功，共 ' + JSON.stringify(r.val).length + ' 字符');
    }
    function doMinify() {
      const r = parseSafe($in.value);
      if (!r.ok) { setStatus(false, '解析失败：' + r.err); $out.textContent = ''; return; }
      const s = JSON.stringify(r.val);
      $out.textContent = s;
      setStatus(true, '压缩完成，' + s.length + ' 字符');
    }
    function doEscape() {
      const r = parseSafe($in.value);
      if (!r.ok) { setStatus(false, '解析失败：' + r.err); $out.textContent = ''; return; }
      const s = JSON.stringify(JSON.stringify(r.val));
      $out.textContent = s;
      setStatus(true, '已转义为字符串字面量，' + s.length + ' 字符');
    }
    function doUnescape() {
      const raw = $in.value.trim();
      let inner;
      try { inner = JSON.parse(raw); }
      catch (e) { setStatus(false, '这不是一段合法的转义字符串：' + e.message); $out.textContent = ''; return; }
      const r = parseSafe(inner);
      if (!r.ok) { setStatus(false, '转义内容解析失败：' + r.err); $out.textContent = ''; return; }
      $out.innerHTML = hl(JSON.stringify(r.val, null, 2));
      setStatus(true, '已解压 / 反转义');
    }

    const MODES = {
      parse: { title: '在线解析（格式化 / 校验）', actions: [
        { label: '格式化 / 解析', cls: 'btn-primary', fn: doParse },
        { label: '清空', cls: 'ghost-btn', fn: () => { $in.value = ''; $out.textContent = ''; setStatus(false, ''); } },
        { label: '复制结果', cls: 'ghost-btn', fn: () => copy($out.textContent) },
      ] },
      mini: { title: '压缩 / 转义', actions: [
        { label: '压缩（去空白）', cls: 'btn-primary', fn: doMinify },
        { label: '转义（→ 字符串）', cls: 'ghost-btn', fn: doEscape },
        { label: '解压（去转义）', cls: 'ghost-btn', fn: doUnescape },
        { label: '复制结果', cls: 'ghost-btn', fn: () => copy($out.textContent) },
      ] },
    };

    function renderActions(tab) {
      $actions.innerHTML = MODES[tab].actions.map((a, i) =>
        '<button class="' + a.cls + '" data-ai="' + i + '">' + a.label + '</button>').join('');
      $$('#jsonActions button').forEach(b =>
        b.addEventListener('click', () => MODES[tab].actions[+b.dataset.ai].fn()));
    }

    function triggerEdit() {
      const r = parseSafe(editInput.value);
      if (!r.ok) { editPrev.className = 'json-out json-err'; editPrev.textContent = 'JSON 语法错误：\n' + r.err; return; }
      editPrev.className = 'json-out';
      editPrev.innerHTML = hl(JSON.stringify(r.val, null, 2));
    }

    function switchTab(tab) {
      $$('#jsonTabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
      $title.textContent = (MODES[tab] ? MODES[tab].title : 'JSON 编辑器（左侧编辑，右侧实时预览）');
      const isEdit = tab === 'edit';
      $in.style.display = isEdit ? 'none' : 'block';
      $out.style.display = isEdit ? 'none' : 'block';
      $actions.style.display = isEdit ? 'none' : 'flex';
      editWrap.style.display = isEdit ? 'block' : 'none';
      if (isEdit) {
        editInput.value = $in.value;
        triggerEdit();
      } else {
        $in.value = editInput.value;
        renderActions(tab);
        $out.textContent = '';
        setStatus(false, '');
      }
    }
    editInput.addEventListener('input', triggerEdit);
    $('#jsonEditCopy').addEventListener('click', () => copy(editPrev.textContent));
    $$('#jsonTabs button').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
    switchTab('parse');
  }

  function compressImage(dataUrl, cb) {
    const img = new Image();
    img.onload = () => {
      const max = 1600;
      let { width: w, height: h } = img;
      if (w > max || h > max) { const r = max / Math.max(w, h); w = Math.round(w * r); h = Math.round(h * r); }
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      cb(c.toDataURL('image/jpeg', 0.82));
    };
    img.src = dataUrl;
  }

  function applyBg(cfg) {
    const bgLayer = $('#bgLayer');
    if (!cfg) { bgLayer.style.background = ''; bgLayer.style.backgroundImage = ''; return; }
    if (cfg.type === 'color') {
      bgLayer.style.backgroundImage = ''; bgLayer.style.background = cfg.value;
    } else if (cfg.type === 'image') {
      const cover = cfg.mode !== 'repeat';
      const ov = (cfg.overlay || 0) / 100;
      const tint = ov > 0 ? 'linear-gradient(rgba(0,0,0,' + ov + '),rgba(0,0,0,' + ov + ')),' : '';
      bgLayer.style.background = 'transparent';
      bgLayer.style.backgroundImage = tint + 'url("' + cfg.value + '")';
      bgLayer.style.backgroundSize = cover ? 'cover' : 'auto';
      bgLayer.style.backgroundRepeat = cover ? 'no-repeat' : 'repeat';
      bgLayer.style.backgroundPosition = 'center';
    }
  }
  function applySavedBg() { applyBgFor('home'); }
  // 侧栏 / 顶栏透明度：写入 --panel-alpha 变量；pct 传 null 表示恢复主题默认
  function applyPanelAlpha(pct) {
    const root = document.documentElement;
    const a = pct == null ? (root.getAttribute('data-theme') === 'dark' ? 0.82 : 0.80) : pct / 100;
    root.style.setProperty('--panel-alpha', a);
  }
  function readBg(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
  }
  // 每页独立背景：优先本页专属（ets_bg_<tool>），否则回退全局（ets_bg）
  function applyBgFor(tool) {
    const cfg = readBg('ets_bg_' + tool) || readBg('ets_bg');
    applyBg(cfg);
  }
  // 清空所有「页专属」背景，使全局（全站默认）真正覆盖每一页
  function clearPerPageBgs() {
    Object.keys(localStorage).forEach(k => {
      if (k.indexOf('ets_bg_') === 0) localStorage.removeItem(k);
    });
  }
  // 站点默认：访客 localStorage 为空时，用 defaults.js 的值预填（使 IP/新设备访问也保持相同外观）
  function applyDefaults() {
    const d = window.ETS_DEFAULTS;
    if (!d || typeof d !== 'object') return;
    Object.keys(d).forEach(k => {
      if (localStorage.getItem(k) == null) {
        try { localStorage.setItem(k, d[k]); } catch (e) {}
      }
    });
  }

  /* ============================================================
     1. Excel 瘦身
     ============================================================ */
  function renderExcel(root) {
    root.innerHTML = `
      <div class="workbench">
        <div class="dropzone" id="dz">
          <div class="dz-ico">${svg('upload')}</div>
          <div class="dz-main">拖入或点击上传 Excel 文件</div>
          <div class="dz-sub">支持 .xlsx / .xls，自动剥离冗余样式与格式</div>
        </div>
        <input type="file" id="file" accept=".xlsx,.xls" hidden />

        <div class="fileinfo" id="fi">
          <div class="fi-ico">${svg('table')}</div>
          <div class="fi-meta">
            <div class="fi-name" id="fiName"></div>
            <div class="fi-size" id="fiSize"></div>
          </div>
          <div class="fi-cmp">
            <b id="fiNew">-</b>
            <span id="fiPct">预估压缩</span>
          </div>
        </div>

        <div class="progress" id="prog">
          <div class="bar"><i id="progBar"></i></div>
          <div class="ptext" id="progTxt">处理中…</div>
        </div>

        <div class="action-bar">
          <button class="btn-primary" id="go" disabled>开始处理</button>
        </div>
      </div>`;

    let current = null; // {name, ab, outBlob, outSize}

    bindDropzone($('#dz'), $('#file'), files => handle(files[0]));

    async function handle(file) {
      if (!/\.xlsx?$/i.test(file.name)) { toast('请上传 Excel 文件'); return; }
      const ab = await file.arrayBuffer();
      $('#dz').classList.add('has-file');
      $('#fi').classList.add('show');
      $('#fiName').textContent = file.name;
      $('#fiSize').textContent = '原始大小：' + formatBytes(file.size);
      $('#go').disabled = true;
      $('#prog').classList.add('show');
      setProgress(20, '正在解析工作簿…');

      // 真实处理：用 SheetJS 去除样式后重写，体积通常显著减小
      try {
        if (typeof XLSX === 'undefined') throw new Error('lib');
        const wb = XLSX.read(ab, { type: 'array', cellStyles: false });
        const out = XLSX.write(wb, { type: 'array', bookType: 'xlsx', bookSST: false, cellStyles: false });
        const blob = new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        setProgress(100, '完成');
        const pct = Math.round((1 - blob.size / file.size) * 100);
        current = { name: file.name.replace(/\.xlsx?$/i, '') + '_slim.xlsx', ab: null, outBlob: blob, outSize: blob.size, original: file.size };
        $('#fiNew').textContent = formatBytes(blob.size);
        $('#fiPct').textContent = (pct >= 0 ? '减少 ' + pct + '%' : '增加 ' + (-pct) + '%');
        $('#go').disabled = false;
        toast('解析完成，可开始处理');
      } catch (e) {
        // 离线降级：仅给出估算
        setProgress(100, '完成（估算模式）');
        const est = Math.max(file.size * 0.45, 1024);
        current = { name: file.name.replace(/\.xlsx?$/i, '') + '_slim.xlsx', estSize: est, original: file.size, estimated: true };
        $('#fiNew').textContent = formatBytes(est);
        $('#fiPct').textContent = '预估减少 ' + Math.round((1 - est / file.size) * 100) + '%';
        $('#go').disabled = false;
        toast('已就绪（估算模式，未加载压缩库）');
      }
    }

    function setProgress(p, txt) {
      $('#progBar').style.width = p + '%';
      if (txt) $('#progTxt').textContent = txt;
    }

    $('#go').addEventListener('click', () => {
      if (!current) return;
      if (current.estimated) {
        toast('当前为估算模式，请联网加载压缩库以获得真实文件');
        return;
      }
      downloadBlob(current.outBlob, current.name);
      addRecord({ ico: 'table', tool: 'Excel 瘦身', name: current.name, result: '-' + Math.round((1 - current.outSize / current.original) * 100) + '%' });
      toast('已导出瘦身后的表格');
    });
  }

  /* ============================================================
     2. MP4 视频压缩（比率 + 比特率，估算真实体积）
     ============================================================ */
  function renderVideo(root) {
    root.innerHTML = `
      <div class="workbench">
        <div class="dropzone" id="dz">
          <div class="dz-ico">${svg('upload')}</div>
          <div class="dz-main">拖入或点击上传 MP4 视频</div>
          <div class="dz-sub">本地估算输出体积，支持目标比特率微调</div>
        </div>
        <input type="file" id="file" accept="video/mp4" hidden />

        <div class="fileinfo" id="fi">
          <div class="fi-ico">${svg('video')}</div>
          <div class="fi-meta">
            <div class="fi-name" id="fiName"></div>
            <div class="fi-size" id="fiSize"></div>
          </div>
          <div class="fi-cmp">
            <b id="fiNew">-</b>
            <span id="fiPct">预估压缩</span>
          </div>
        </div>

        <div class="params">
          <div class="param-row">
            <div class="param-label">压缩比率</div>
            <div class="param-control">
              <div class="seg" id="ratio">
                <button data-r="high" class="active">高 (小体积)</button>
                <button data-r="mid">中</button>
                <button data-r="low">低 (高画质)</button>
              </div>
            </div>
          </div>
          <div class="param-row">
            <div class="param-label">目标比特率</div>
            <div class="param-control">
              <input type="range" id="bitrate" min="300" max="8000" step="100" value="1200" />
              <div style="font-size:12px;color:var(--text-muted);margin-top:4px">
                当前 <b id="brVal" style="color:var(--primary)">1200</b> kbps
              </div>
            </div>
          </div>
        </div>

        <div class="progress" id="prog">
          <div class="bar"><i id="progBar"></i></div>
          <div class="ptext" id="progTxt"></div>
        </div>

        <div class="action-bar">
          <button class="btn-primary" id="go" disabled>开始处理</button>
        </div>
        <p style="text-align:center;font-size:11.5px;color:var(--text-muted);margin-top:14px;max-width:60%;margin-left:auto;margin-right:auto">
          提示：浏览器端无需上传即可预估压缩体积。真正的视频重编码需 ffmpeg.wasm，本演示提供精确的体积估算。
        </p>
      </div>`;

    let file = null, duration = 0, originalBitrate = 0, ratio = 'high';
    const RATIO_MULT = { high: 0.35, mid: 0.6, low: 0.85 };

    bindDropzone($('#dz'), $('#file'), files => handle(files[0]));

    async function handle(f) {
      if (!/video\/mp4/i.test(f.type) && !/\.mp4$/i.test(f.name)) { toast('请上传 MP4 文件'); return; }
      file = f;
      $('#dz').classList.add('has-file');
      $('#fi').classList.add('show');
      $('#fiName').textContent = f.name;
      $('#fiSize').textContent = '原始大小：' + formatBytes(f.size);

      // 读取时长与原始比特率
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.src = URL.createObjectURL(f);
      await new Promise(res => {
        v.onloadedmetadata = () => res();
        v.onerror = () => res();
      });
      duration = v.duration || 0;
      originalBitrate = duration ? (f.size * 8) / duration / 1000 : 0; // kbps
      URL.revokeObjectURL(v.src);
      updateEstimate();
      $('#go').disabled = false;
    }

    function targetBitrate() {
      const base = parseFloat($('#bitrate').value);
      return base;
    }
    function updateEstimate() {
      if (!file) return;
      const br = targetBitrate();
      // 估算体积 = 时长(s) * 比特率(kbps) / 8  (KB) ，再加约5%音频
      const est = duration ? (duration * br / 8) * 1.05 * 1024 : file.size * RATIO_MULT[ratio];
      const pct = Math.round((1 - est / file.size) * 100);
      $('#fiNew').textContent = formatBytes(est);
      $('#fiPct').textContent = '预估减少 ' + Math.max(pct, 0) + '%';
    }

    $$('#ratio button').forEach(b =>
      b.addEventListener('click', () => {
        $$('#ratio button').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        ratio = b.dataset.r;
        // 比率联动预设比特率
        const presets = { high: 800, mid: 1500, low: 3000 };
        $('#bitrate').value = presets[ratio];
        $('#brVal').textContent = presets[ratio];
        updateEstimate();
      }));
    $('#bitrate').addEventListener('input', e => {
      $('#brVal').textContent = e.target.value;
      updateEstimate();
    });

    $('#go').addEventListener('click', () => {
      if (!file) return;
      const prog = $('#prog'); prog.classList.add('show');
      let p = 0;
      const est = duration ? (duration * targetBitrate() / 8) * 1.05 * 1024 : file.size * RATIO_MULT[ratio];
      const timer = setInterval(() => {
        p += 8 + Math.random() * 10;
        if (p >= 100) {
          p = 100; clearInterval(timer);
          $('#progBar').style.width = '100%';
          $('#progTxt').textContent = '预估完成 · 输出约 ' + formatBytes(est);
          const pct = Math.max(Math.round((1 - est / file.size) * 100), 0);
          addRecord({ ico: 'video', tool: 'MP4 压缩', name: file.name, result: '-' + pct + '%' });
          toast('压缩体积已预估：' + formatBytes(est));
        } else {
          $('#progBar').style.width = p + '%';
          $('#progTxt').textContent = '压缩中… ' + Math.floor(p) + '%';
        }
      }, 140);
    });
  }

  /* ============================================================
     3. PDF 转 Word
     ============================================================ */
  function renderPDF(root) {
    root.innerHTML = `
      <div class="workbench">
        <div class="dropzone" id="dz">
          <div class="dz-ico">${svg('upload')}</div>
          <div class="dz-main">拖入或点击上传 PDF 文件</div>
          <div class="dz-sub">解析文本与段落结构，输出可编辑 Word 文档</div>
        </div>
        <input type="file" id="file" accept="application/pdf" hidden />

        <div class="fileinfo" id="fi">
          <div class="fi-ico">${svg('pdf')}</div>
          <div class="fi-meta">
            <div class="fi-name" id="fiName"></div>
            <div class="fi-size" id="fiSize"></div>
          </div>
          <div class="fi-cmp">
            <b id="fiNew">-</b>
            <span id="fiPct">输出大小</span>
          </div>
        </div>

        <div class="progress" id="prog">
          <div class="bar"><i id="progBar"></i></div>
          <div class="ptext" id="progTxt"></div>
        </div>

        <div class="action-bar">
          <button class="btn-primary" id="go" disabled>开始转换</button>
        </div>
      </div>`;

    let file = null, html = '';

    bindDropzone($('#dz'), $('#file'), files => handle(files[0]));

    async function handle(f) {
      if (!/pdf$/i.test(f.name) && f.type !== 'application/pdf') { toast('请上传 PDF 文件'); return; }
      file = f;
      $('#dz').classList.add('has-file');
      $('#fi').classList.add('show');
      $('#fiName').textContent = f.name;
      $('#fiSize').textContent = '原始大小：' + formatBytes(f.size);
      $('#go').disabled = false;
      toast('文件已就绪，点击开始转换');
    }

    $('#go').addEventListener('click', async () => {
      if (!file) return;
      if (typeof pdfjsLib === 'undefined') {
        toast('PDF 解析库未加载，请联网后重试'); return;
      }
      try {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const prog = $('#prog'); prog.classList.add('show');
        $('#progBar').style.width = '10%'; $('#progTxt').textContent = '解析 PDF…';

        const ab = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: ab }).promise;
        let body = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          $('#progBar').style.width = (10 + (i / pdf.numPages) * 80) + '%';
          $('#progTxt').textContent = '读取第 ' + i + ' / ' + pdf.numPages + ' 页…';
          const page = await pdf.getPage(i);
          const tc = await page.getTextContent();
          let lines = [], cur = '', lastY = null;
          tc.items.forEach(it => {
            if (lastY !== null && Math.abs(it.transform[5] - lastY) > 3) { lines.push(cur); cur = ''; }
            cur += (cur ? ' ' : '') + (it.str || '');
            lastY = it.transform[5];
          });
          if (cur) lines.push(cur);
          body += '<h3 style="page-break-before:always">第 ' + i + ' 页</h3>';
          body += '<p>' + lines.filter(l => l.trim()).map(escapeHtml).join('</p><p>') + '</p>';
        }
        const title = file.name.replace(/\.pdf$/i, '');
        html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"></head><body><h1>${escapeHtml(title)}</h1>${body}</body></html>`;
        const blob = new Blob(['﻿' + html], { type: 'application/msword' });
        $('#progBar').style.width = '100%'; $('#progTxt').textContent = '转换完成';
        $('#fiNew').textContent = formatBytes(blob.size);
        $('#fiPct').textContent = pdf.numPages + ' 页';
        addRecord({ ico: 'pdf', tool: 'PDF 转 Word', name: file.name, result: pdf.numPages + ' 页' });
        toast('转换完成，正在导出…');
        downloadBlob(blob, file.name.replace(/\.pdf$/i, '') + '.doc');
      } catch (e) {
        console.error(e);
        toast('转换失败：' + (e.message || e));
      }
    });
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  /* ============================================================
     4. 智能图像实验室 · 批量裁剪
     ============================================================ */
  const cropState = {
    images: [], currentId: null, applyAll: false, ratio: null,
  };

  function renderCrop(root) {
    root.innerHTML = `
      <div class="toolbar">
        <button class="ghost-btn" id="addImgs" style="width:auto">＋ 添加图片</button>
        <label class="checkbox"><input type="checkbox" id="applyAll" /> 应用至全部</label>
      </div>
      <input type="file" id="file" accept="image/*" multiple hidden />
      <div class="crop-layout">
        <div>
          <div class="crop-stage" id="stage">
            <div class="empty-hint" id="emptyHint">请先添加图片</div>
          </div>
          <div class="params" style="max-width:none;margin-top:20px">
            <div class="param-row">
              <div class="param-label">裁剪比例</div>
              <div class="param-control field-inline">
                <input class="input" id="ratioInput" placeholder="如 1:1 / 16:9 / 自由" />
                <button class="ghost-btn" id="ratioApply" style="width:auto">应用</button>
              </div>
            </div>
            <div class="param-row">
              <div class="param-label">坐标 / 尺寸</div>
              <div class="param-control">
                <div class="coord-grid">
                  <input class="input" id="cx" type="number" placeholder="X" />
                  <input class="input" id="cy" type="number" placeholder="Y" />
                  <input class="input" id="cw" type="number" placeholder="宽 W" />
                  <input class="input" id="ch" type="number" placeholder="高 H" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="crop-side">
          <div class="section-title">图片列表</div>
          <div class="thumb-list" id="thumbs"></div>
          <button class="btn-primary" id="go" style="width:100%">导出裁剪</button>
        </div>
      </div>`;

    cropState.images = []; cropState.currentId = null; cropState.applyAll = false; cropState.ratio = null;
    const stage = $('#stage'), fileInput = $('#file');

    $('#addImgs').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) addImages(fileInput.files);
      fileInput.value = '';
    });

    $('#applyAll').addEventListener('change', e => {
      cropState.applyAll = e.target.checked;
      if (cropState.applyAll && cropState.currentId) {
        const r = getCur().region;
        cropState.images.forEach(im => { if (im.id !== cropState.currentId) im.region = { ...r }; });
        toast('已同步裁剪区域至全部图片');
      }
    });

    $('#ratioApply').addEventListener('click', () => {
      const v = $('#ratioInput').value.trim();
      if (!v) { cropState.ratio = null; toast('已切换为自由比例'); return; }
      let r = null;
      if (v.includes(':')) { const [a, b] = v.split(':').map(Number); r = a / b; }
      else r = parseFloat(v);
      if (!r || r <= 0) { toast('比例格式不正确'); return; }
      cropState.ratio = r;
      applyRatio(r);
      toast('已应用比例 ' + v);
    });

    ['cx', 'cy', 'cw', 'ch'].forEach(id =>
      $('#' + id).addEventListener('change', applyCoordInputs));

    $('#go').addEventListener('click', exportCrop);

    function addImages(files) {
      Array.from(files).forEach(f => {
        const reader = new FileReader();
        reader.onload = ev => {
          const img = new Image();
          img.onload = () => {
            const id = uid();
            cropState.images.push({
              id, name: f.name, src: ev.target.result,
              natW: img.naturalWidth, natH: img.naturalHeight,
              region: { x: 0.1, y: 0.1, w: 0.8, h: 0.8 },
            });
            if (!cropState.currentId) cropState.currentId = id;
            renderThumbs();
            if (cropState.images.length === 1) loadMain(id);
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(f);
      });
    }

    function getCur() { return cropState.images.find(i => i.id === cropState.currentId); }

    function renderThumbs() {
      const box = $('#thumbs');
      box.innerHTML = cropState.images.map(im => `
        <div class="thumb ${im.id === cropState.currentId ? 'active' : ''}" data-id="${im.id}">
          <img src="${im.src}" />
          <div class="t-name">${im.name}</div>
        </div>`).join('');
      $$('.thumb', box).forEach(t =>
        t.addEventListener('click', () => loadMain(t.dataset.id)));
    }

    function loadMain(id) {
      cropState.currentId = id;
      renderThumbs();
      const im = getCur();
      $('#emptyHint')?.remove();
      // 重建 img + crop box
      const old = $('#cropImg');
      if (old) old.remove();
      $('#cropBox')?.remove();
      const img = document.createElement('img');
      img.id = 'cropImg';
      img.src = im.src;
      stage.appendChild(img);
      img.onload = () => { syncCoordInputs(); layoutCropBox(); };
      if (img.complete) { syncCoordInputs(); layoutCropBox(); }
    }

    function imgRect() {
      const im = $('#cropImg'); const sr = stage.getBoundingClientRect();
      const ir = im.getBoundingClientRect();
      return { left: ir.left - sr.left, top: ir.top - sr.top, w: ir.width, h: ir.height };
    }

    function layoutCropBox() {
      const im = getCur(); if (!im) return;
      let box = $('#cropBox');
      if (!box) {
        box = document.createElement('div');
        box.id = 'cropBox'; box.className = 'crop-box';
        box.innerHTML = '<div class="handle h-nw"></div><div class="handle h-ne"></div><div class="handle h-sw"></div><div class="handle h-se"></div>';
        stage.appendChild(box);
        attachBoxHandlers(box);
      }
      const r = imgRect();
      box.style.left = (r.left + im.region.x * r.w) + 'px';
      box.style.top = (r.top + im.region.y * r.h) + 'px';
      box.style.width = (im.region.w * r.w) + 'px';
      box.style.height = (im.region.h * r.h) + 'px';
    }

    function syncCoordInputs() {
      const im = getCur(); if (!im) return;
      $('#cx').value = Math.round(im.region.x * im.natW);
      $('#cy').value = Math.round(im.region.y * im.natH);
      $('#cw').value = Math.round(im.region.w * im.natW);
      $('#ch').value = Math.round(im.region.h * im.natH);
    }

    function applyCoordInputs() {
      const im = getCur(); if (!im) return;
      let x = clamp(+$('#cx').value || 0, 0, im.natW);
      let y = clamp(+$('#cy').value || 0, 0, im.natH);
      let w = clamp(+$('#cw').value || 1, 1, im.natW - x);
      let h = clamp(+$('#ch').value || 1, 1, im.natH - y);
      im.region = { x: x / im.natW, y: y / im.natH, w: w / im.natW, h: h / im.natH };
      if (cropState.applyAll) cropState.images.forEach(o => { if (o.id !== im.id) o.region = { ...im.region }; });
      layoutCropBox();
    }

    function applyRatio(r) {
      const im = getCur(); if (!im) return;
      const reg = im.region;
      const cx = reg.x + reg.w / 2, cy = reg.y + reg.h / 2;
      // 以当前面积为基准，按比率重算 w/h（保持面积近似）
      let nw = Math.sqrt(reg.w * reg.h * r);
      let nh = nw / r;
      nw = clamp(nw, 0.02, 1); nh = clamp(nh, 0.02, 1);
      let nx = clamp(cx - nw / 2, 0, 1 - nw);
      let ny = clamp(cy - nh / 2, 0, 1 - nh);
      im.region = { x: nx, y: ny, w: nw, h: nh };
      layoutCropBox(); syncCoordInputs();
    }

    function attachBoxHandlers(box) {
      let mode = '', sx = 0, sy = 0, start = null;
      box.addEventListener('pointerdown', e => {
        if (e.target.classList.contains('handle')) mode = e.target.className.replace('handle h-', '');
        else mode = 'move';
        sx = e.clientX; sy = e.clientY;
        start = JSON.parse(JSON.stringify(getCur().region));
        box.setPointerCapture(e.pointerId);
        e.preventDefault();
      });
      box.addEventListener('pointermove', e => {
        if (!mode) return;
        const r = imgRect();
        const dx = (e.clientX - sx) / r.w;
        const dy = (e.clientY - sy) / r.h;
        let reg = getCur().region;
        if (mode === 'move') {
          reg.x = clamp(start.x + dx, 0, 1 - start.w);
          reg.y = clamp(start.y + dy, 0, 1 - start.h);
        } else {
          let { x, y, w, h } = start;
          if (mode === 'se') { w = clamp(start.w + dx, 0.02, 1 - x); h = clamp(start.h + dy, 0.02, 1 - y); }
          if (mode === 'sw') { const nw = clamp(start.w - dx, 0.02, x + start.w); x = start.x + (start.w - nw); w = nw; h = clamp(start.h + dy, 0.02, 1 - start.y); }
          if (mode === 'ne') { const nw = clamp(start.w + dx, 0.02, 1 - x); w = nw; const nh = clamp(start.h - dy, 0.02, y + start.h); y = start.y + (start.h - nh); h = nh; }
          if (mode === 'nw') { const nw = clamp(start.w - dx, 0.02, x + start.w); x = start.x + (start.w - nw); w = nw; const nh = clamp(start.h - dy, 0.02, y + start.h); y = start.y + (start.h - nh); h = nh; }
          if (cropState.ratio) {
            if (mode.startsWith('s')) { h = w / cropState.ratio; if (y + h > 1) { h = 1 - y; w = h * cropState.ratio; } if (x + w > 1) { w = 1 - x; h = w / cropState.ratio; } }
            else { w = h * cropState.ratio; if (x + w > 1) { w = 1 - x; h = w / cropState.ratio; } if (y + h > 1) { h = 1 - y; w = h * cropState.ratio; } }
          }
          reg.x = clamp(x, 0, 1); reg.y = clamp(y, 0, 1); reg.w = clamp(w, 0.02, 1); reg.h = clamp(h, 0.02, 1);
        }
        if (cropState.applyAll) cropState.images.forEach(o => { if (o.id !== getCur().id) o.region = { ...reg }; });
        layoutCropBox(); syncCoordInputs();
      });
      box.addEventListener('pointerup', () => { mode = ''; });
    }

    function exportCrop() {
      if (!cropState.images.length) { toast('请先添加图片'); return; }
      cropState.images.forEach((im, i) => {
        const img = new Image();
        img.onload = () => {
          const r = im.region;
          const sx = r.x * im.natW, sy = r.y * im.natH, sw = r.w * im.natW, sh = r.h * im.natH;
          const c = document.createElement('canvas');
          c.width = Math.max(1, Math.round(sw)); c.height = Math.max(1, Math.round(sh));
          const ctx = c.getContext('2d');
          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
          c.toBlob(b => {
            setTimeout(() => downloadBlob(b, im.name.replace(/\.[^.]+$/, '') + '_crop.png'), i * 400);
          }, 'image/png');
        };
        img.src = im.src;
      });
      addRecord({ ico: 'crop', tool: '批量裁剪', name: cropState.images.length + ' 张图片', result: '已导出' });
      toast('已开始导出 ' + cropState.images.length + ' 张裁剪图');
    }
  }

  /* ============================================================
     5. 智能图像实验室 · 多图拼图
     ============================================================ */
  const collageState = {
    images: [], // {id, src, rotation, el}
    layout: 'v', margin: 16, bg: '#FFFFFF', cells: [],
  };

  function renderCollage(root) {
    root.innerHTML = `
      <div class="toolbar">
        <button class="ghost-btn" id="addImgs" style="width:auto">＋ 添加图片</button>
        <div class="layout-seg" id="layoutSeg">
          <button data-l="h" title="横向拼接">${svg('layoutH', 20)}</button>
          <button data-l="v" class="active" title="纵向拼接">${svg('layoutV', 20)}</button>
          <button data-l="grid" title="宫格">${svg('collage', 20)}</button>
        </div>
      </div>
      <input type="file" id="file" accept="image/*" multiple hidden />
      <div class="collage-layout">
        <div>
          <div class="collage-canvas-wrap" id="wrap">
            <div class="empty-hint" id="emptyHint">请先添加至少 2 张图片</div>
            <canvas id="canvas" hidden></canvas>
          </div>
        </div>
        <div class="collage-side">
          <div class="section-title">画布设置</div>
          <div class="slider-row">
            <label>边距 <span class="val" id="mgVal">16px</span></label>
            <input type="range" id="margin" min="0" max="50" value="16" />
          </div>
          <div class="slider-row">
            <label>背景颜色</label>
            <div class="color-row">
              <input type="color" id="bgColor" value="#FFFFFF" />
              <div class="swatches">
                ${['#FFFFFF', '#2C3E50', '#F2F4F7', '#000000', '#E74C3C'].map(c => `<div class="swatch" style="background:${c}" data-c="${c}"></div>`).join('')}
              </div>
            </div>
          </div>
          <div class="section-title" style="margin-top:8px">图片顺序（拖动排序）</div>
          <div class="sort-list" id="sortList"></div>
          <button class="btn-primary" id="go" style="width:100%" disabled>导出拼图</button>
        </div>
      </div>`;

    collageState.images = []; collageState.cells = [];
    const wrap = $('#wrap'), fileInput = $('#file'), canvas = $('#canvas');

    $('#addImgs').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) addImages(fileInput.files);
      fileInput.value = '';
    });

    $$('#layoutSeg button').forEach(b =>
      b.addEventListener('click', () => {
        $$('#layoutSeg button').forEach(x => x.classList.remove('active'));
        b.classList.add('active'); collageState.layout = b.dataset.l; draw();
      }));

    $('#margin').addEventListener('input', e => {
      collageState.margin = +e.target.value;
      $('#mgVal').textContent = e.target.value + 'px'; draw();
    });
    $('#bgColor').addEventListener('input', e => { collageState.bg = e.target.value; draw(); });
    $$('.swatch').forEach(s =>
      s.addEventListener('click', () => { collageState.bg = s.dataset.c; $('#bgColor').value = s.dataset.c; draw(); }));

    $('#go').addEventListener('click', () => {
      canvas.toBlob(b => {
        downloadBlob(b, 'collage.png');
        addRecord({ ico: 'collage', tool: '多图拼图', name: collageState.images.length + ' 张图片', result: '已导出' });
        toast('拼图已导出');
      }, 'image/png');
    });

    // 画布点击 → 呼起操作浮层
    canvas.addEventListener('click', e => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width, scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX, y = (e.clientY - rect.top) * scaleY;
      const hit = collageState.cells.find(c => x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h);
      if (hit) showPopover(e.clientX, e.clientY, hit.id);
    });

    let replaceTargetId = null;
    const replaceInput = document.createElement('input');
    replaceInput.type = 'file'; replaceInput.accept = 'image/*'; replaceInput.hidden = true;
    document.body.appendChild(replaceInput);
    replaceInput.addEventListener('change', () => {
      const f = replaceInput.files[0]; if (!f || !replaceTargetId) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const img = new Image();
        img.onload = () => {
          const it = collageState.images.find(i => i.id === replaceTargetId);
          it.src = ev.target.result; it.el = img; draw();
          renderSort(); toast('已替换图片');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(f);
      replaceInput.value = '';
    });

    function showPopover(cx, cy, id) {
      let pop = $('#pop');
      if (!pop) { pop = document.createElement('div'); pop.id = 'pop'; pop.className = 'popover'; document.body.appendChild(pop); }
      pop.innerHTML = `
        <button data-a="replace">${svg('refresh', 18)} 替换</button>
        <button data-a="rotate">${svg('rotate', 18)} 旋转</button>
        <button data-a="delete" class="danger">${svg('trash', 18)} 删除</button>`;
      pop.style.left = (cx + 8) + 'px';
      pop.style.top = (cy + 8) + 'px';
      pop.classList.add('show');
      $$('button', pop).forEach(b => b.addEventListener('click', () => {
        const a = b.dataset.a;
        if (a === 'replace') { replaceTargetId = id; replaceInput.click(); }
        if (a === 'rotate') { const it = collageState.images.find(i => i.id === id); it.rotation = (it.rotation + 90) % 360; draw(); renderSort(); }
        if (a === 'delete') { collageState.images = collageState.images.filter(i => i.id !== id); draw(); renderSort(); }
        pop.classList.remove('show');
      }));
      setTimeout(() => document.addEventListener('click', function hide(ev) {
        if (!pop.contains(ev.target)) { pop.classList.remove('show'); document.removeEventListener('click', hide); }
      }), 0);
    }

    function addImages(files) {
      Array.from(files).forEach(f => {
        const reader = new FileReader();
        reader.onload = ev => {
          const img = new Image();
          img.onload = () => {
            collageState.images.push({ id: uid(), name: f.name, src: ev.target.result, rotation: 0, el: img });
            $('#emptyHint')?.remove(); canvas.hidden = false;
            renderSort(); draw();
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(f);
      });
    }

    function renderSort() {
      const box = $('#sortList');
      box.innerHTML = collageState.images.map(im => `
        <div class="sort-item" draggable="true" data-id="${im.id}">
          <img src="${im.src}" />
          <div class="s-name">${im.name}</div>
          <div class="s-rot">${im.rotation}°</div>
        </div>`).join('');
      $('#go').disabled = collageState.images.length < 1;
      bindSortDrag(box);
    }

    function bindSortDrag(box) {
      let dragId = null;
      $$('.sort-item', box).forEach(el => {
        el.addEventListener('dragstart', () => { dragId = el.dataset.id; el.classList.add('dragging'); });
        el.addEventListener('dragend', () => el.classList.remove('dragging'));
        el.addEventListener('dragover', e => e.preventDefault());
        el.addEventListener('drop', e => {
          e.preventDefault();
          const targetId = el.dataset.id;
          if (!dragId || dragId === targetId) return;
          const arr = collageState.images;
          const from = arr.findIndex(i => i.id === dragId);
          const to = arr.findIndex(i => i.id === targetId);
          const [m] = arr.splice(from, 1);
          arr.splice(to, 0, m);
          dragId = null; renderSort(); draw();
        });
      });
    }

    function draw() {
      const imgs = collageState.images;
      if (!imgs.length) return;
      const m = collageState.margin;
      const cv = canvas;
      const ctx = cv.getContext('2d');
      // 计算布局
      let cells = [], W = 0, H = 0;
      const BASE = 1000;
      if (collageState.layout === 'v') {
        W = BASE; let y = m;
        imgs.forEach(im => {
          const ar = effAspect(im);
          const cw = W - 2 * m;
          const ch = cw / ar;
          cells.push({ id: im.id, x: m, y, w: cw, h: ch, im });
          y += ch + m;
        });
        H = y;
      } else if (collageState.layout === 'h') {
        H = BASE; let x = m;
        imgs.forEach(im => {
          const ar = effAspect(im);
          const ch = H - 2 * m;
          const cw = ch * ar;
          cells.push({ id: im.id, x, y: m, w: cw, h: ch, im });
          x += cw + m;
        });
        W = x;
      } else { // grid
        const cols = Math.ceil(Math.sqrt(imgs.length)) || 1;
        const cell = (BASE - (cols + 1) * m) / cols;
        W = BASE;
        imgs.forEach((im, i) => {
          const col = i % cols, row = Math.floor(i / cols);
          const x = m + col * (cell + m), y = m + row * (cell + m);
          cells.push({ id: im.id, x, y, w: cell, h: cell, im, fit: 'contain' });
        });
        const rows = Math.ceil(imgs.length / cols);
        H = m + rows * (cell + m);
      }
      cv.width = Math.round(W); cv.height = Math.round(H);
      ctx.fillStyle = collageState.bg; ctx.fillRect(0, 0, W, H);
      cells.forEach(c => drawInto(ctx, c));
      collageState.cells = cells;
    }

    function effAspect(im) {
      const ar = im.el.naturalWidth / im.el.naturalHeight;
      return (im.rotation % 180 !== 0) ? 1 / ar : ar;
    }

    function drawInto(ctx, c) {
      const im = c.im, el = im.el;
      ctx.save();
      ctx.beginPath(); ctx.rect(c.x, c.y, c.w, c.h); ctx.clip();
      const ar = el.naturalWidth / el.naturalHeight;
      let dw, dh, dx, dy;
      if (c.fit === 'contain') {
        if (ar > c.w / c.h) { dw = c.w; dh = c.w / ar; } else { dh = c.h; dw = c.h * ar; }
        dx = c.x + (c.w - dw) / 2; dy = c.y + (c.h - dh) / 2;
      } else { dw = c.w; dh = c.h; dx = c.x; dy = c.y; }
      // 旋转围绕图片中心
      ctx.translate(dx + dw / 2, dy + dh / 2);
      ctx.rotate(im.rotation * Math.PI / 180);
      ctx.drawImage(el, -dw / 2, -dh / 2, dw, dh);
      ctx.restore();
    }
  }

  /* ---------------- 移动端侧栏抽屉 ---------------- */
  const menuBtn = $('#menuBtn'), backdrop = $('#backdrop'), sidebar = $('.sidebar');
  const appEl = $('.app');
  function openSidebar() {
    sidebar.classList.add('open');
    appEl.classList.add('sidebar-open');   // 提升 .app 堆叠层级，使 sidebar 盖住 backdrop
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add('show'));
    menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    appEl.classList.remove('sidebar-open');
    backdrop.classList.remove('show');
    menuBtn.setAttribute('aria-expanded', 'false');
    setTimeout(() => { backdrop.hidden = true; }, 220);
  }
  menuBtn.addEventListener('click', () =>
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar());
  backdrop.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

  /* ---------------- 全局事件 ---------------- */
  // 侧栏与底部 Tab 用容器委托：renderNav 会重渲染其内部元素，逐元素绑定会失效
  $('#nav').addEventListener('click', e => {
    const title = e.target.closest('.nav-group-title');
    if (title) {
      const grp = title.closest('.nav-group');
      grp.setAttribute('data-open', grp.getAttribute('data-open') !== 'true');
      return;
    }
    const b = e.target.closest('.nav-item'); if (!b) return;
    setTool(b.dataset.tool);
    if (isMobile()) closeSidebar();
  });
  $('#bottomtab').addEventListener('click', e => {
    const b = e.target.closest('.tab-item'); if (!b) return;
    if (b.id === 'tabMore') { openSidebar(); return; }
    setTool(b.dataset.tool);
  });
  $('#homeBtn').addEventListener('click', () => { setTool('home'); if (isMobile()) closeSidebar(); });

  // 时间戳结果复制（委托到 #content，避免重复绑定）
  $('#content').addEventListener('click', e => {
    const c = e.target.closest('.ts-copy');
    if (c) copyText(c.dataset.c);
  });

  $('#recordBtn').addEventListener('click', () => {
    renderRecords(); $('#recordModal').hidden = false;
  });
  $('#closeRecord').addEventListener('click', () => $('#recordModal').hidden = true);
  $('#recordModal').addEventListener('click', e => { if (e.target.id === 'recordModal') $('#recordModal').hidden = true; });
  $('#clearRecord').addEventListener('click', () => {
    localStorage.removeItem(REC_KEY); renderRecords(); toast('记录已清空');
  });

  /* ---------------- 神秘代码弹窗（点击左上角「华」） ---------------- */
  const $secretModal = $('#secretModal');
  const $secretInput = $('#secretInput');
  const $secretErr = $('#secretErr');
  const SECRET_CODE = '为人民服务';
  function openSecret() {
    $secretInput.value = '';
    $secretErr.hidden = true;
    $secretModal.hidden = false;
    setTimeout(() => $secretInput.focus(), 60);
  }
  function closeSecret() { $secretModal.hidden = true; }
  function submitSecret() {
    const v = ($secretInput.value || '').trim();
    if (v === SECRET_CODE) {
      closeSecret();
      window.location.href = '3d.html';
    } else {
      $secretErr.hidden = false;
      $secretInput.select();
    }
  }
  $('#logoBtn').addEventListener('click', openSecret);
  $('#logoBtn').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSecret(); } });
  $('#closeSecret').addEventListener('click', closeSecret);
  $('#secretCancel').addEventListener('click', closeSecret);
  $secretModal.addEventListener('click', e => { if (e.target.id === 'secretModal') closeSecret(); });
  $('#secretOk').addEventListener('click', submitSecret);
  $secretInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitSecret(); });

  /* ---------------- 动态进入页 ---------------- */
  // 进入页配置（首页设置面板保存）读写；默认 = 云层地球夜景图 / Beerus idle / 慢一倍 2×
  const HOME_DEFAULT_KEY = 'ets_homecfg_default_v3';
  function defaultHomeCfg() {
    const base = { bg: { type: 'image', value: 'landing-default-bg.jpg', mode: 'cover' }, pet: { slug: 'beerus', action: 'idle' }, speed: 2, scale: 1, dissolve: 'matrix2', instant: true };
    // 站点出厂默认：优先读取 defaults.js 提供的 ETS_DEFAULTS.ets_homecfg（即「保存为站点默认」那套当前配置）
    let src = base;
    try {
      const ev = (window.ETS_DEFAULTS && window.ETS_DEFAULTS.ets_homecfg)
        ? JSON.parse(window.ETS_DEFAULTS.ets_homecfg) : null;
      if (ev && typeof ev === 'object') src = Object.assign({}, base, ev);
    } catch (e) {}
    // 用户曾点「将当前设置设为默认值」写入的本地默认，覆盖出厂默认
    try {
      const v = JSON.parse(localStorage.getItem(HOME_DEFAULT_KEY));
      if (v && typeof v === 'object') {
        const merged = Object.assign({}, src, v);
        merged.dissolve = src.dissolve || base.dissolve;   // 碎片消失方式以默认来源为准
        return merged;
      }
    } catch (e) {}
    return src;
  }
  function describeCfg(c) {
    if (!c) return '';
    const bg = (c.bg && c.bg.type === 'image') ? '图片背景' : (c.bg && c.bg.value ? c.bg.value : '薄荷色');
    const pet = (c.pet && PETS[c.pet.slug]) ? PETS[c.pet.slug].name : (c.pet ? c.pet.slug : 'Beerus');
    const act = (c.pet && c.pet.action) ? c.pet.action : 'Idle';
    const sp = (c.speed && c.speed > 0) ? c.speed : 2;
    const sc = (c.scale && c.scale > 0) ? c.scale : 1;
    const DM = { fall: '全部向下掉落', blackhole: '黑洞扭曲', bullet: '子弹射击', matrix: '黑客帝国', matrix2: '至尊黑客帝国' };
    const ds = DM[(c.dissolve) || 'fall'] || '全部向下掉落';
    return `背景:${bg} / 宠物:${pet} · ${act} / 速度:${sp}× / 大小:${sc.toFixed(1)}× / 碎片消失:${ds} / 进入特效:${c.instant ? '关闭' : '开启'}`;
  }
  function loadHomeCfg() {
    try {
      const v = JSON.parse(localStorage.getItem('ets_homecfg'));
      if (v && typeof v === 'object') return Object.assign(defaultHomeCfg(), v);
    } catch (e) {}
    return defaultHomeCfg();
  }
  function saveHomeCfg(cfg) { localStorage.setItem('ets_homecfg', JSON.stringify(cfg)); }
  // 将背景配置应用到某个元素（#landing 与首页设置预览框共用）
  function applyBgToEl(el, bg) {
    if (!el) return;
    el.style.background = ''; el.style.backgroundImage = '';
    if (!bg) { el.style.background = '#E6F2EE'; return; }
    if (bg.type === 'image') {
      el.style.backgroundImage = `url('${bg.value}')`;
      el.style.backgroundSize = bg.mode === 'repeat' ? 'auto' : 'cover';
      el.style.backgroundRepeat = bg.mode === 'repeat' ? 'repeat' : 'no-repeat';
      el.style.backgroundPosition = 'center center';
    } else {
      el.style.background = bg.value || '#E6F2EE';
    }
  }
  // 按当前配置重绘进入页中央宠物（initLanding 与首页设置面板实时预览共用）
  async function paintLandingPet() {
    const stage = $('#landingPet');
    if (!stage) return;
    const cfg = loadHomeCfg();
    const mascot = PETS[(cfg.pet && cfg.pet.slug)] || PETS['beerus']
      || (() => { const a = allPets(); return a[Object.keys(a)[0]]; })();
    if (!mascot) return;
    stage.innerHTML = ''; // 清空可能残留的旧切片节点
    try {
      // 超时保护：宠物切片最多等 8 秒，超时则走兜底显示名字，避免卡死首屏
      await Promise.race([
        ensurePetStates(mascot),
        new Promise(r => setTimeout(r, 8000))
      ]);
      ensurePetKeyframes();
      const action = (cfg.pet && cfg.pet.action) || 'idle';
      const sid = petStateMap(mascot)[action] ? action : 'idle'; // 该动作不可用则回退 idle
      const body = document.createElement('div');
      body.className = 'pet-body';
      if (setPetBodyState(body, mascot, mascot.slug, sid)) {
        stage.appendChild(body);
        // 速度倍数（0.5/1/2/5/10），默认 2（=现在的慢一倍），仅影响进入页
        const mult = (cfg.speed && cfg.speed > 0) ? cfg.speed : 2;
        const baseDur = parseFloat(body.style.getPropertyValue('--dur')) || 0.96;
        body.style.setProperty('--dur', (baseDur * mult).toFixed(2) + 's');
        // 大小倍数（0.1× ~ 3×），默认 1
        const sc = (cfg.scale && cfg.scale > 0) ? cfg.scale : 1;
        body.style.transform = 'scale(' + sc + ')';
        body.style.transformOrigin = 'center bottom';
      } else if (mascot.name) {
        stage.textContent = mascot.name;
      }
    } catch (e) {
      if (mascot.name) stage.textContent = mascot.name;
    }
  }

  // 展示配置中的宠物于进入页中央，脚下放置与工作台同款按钮【领域展开】
  async function initLanding() {
    const landing = $('#landing');
    const btn = $('#enterBtn');
    if (!landing) return;

    const cfg = loadHomeCfg();
    applyBgToEl(landing, cfg.bg);  // 应用进入页背景（颜色 / 图片）

    // 先绑定进入按钮点击事件，避免宠物切片(paintLandingPet)卡住时按钮无法点击
    const enter = () => {
      const ecfg = loadHomeCfg();
      // 关闭进入特效：直接隐藏进入页并进入工作台，跳过闪电/碎片/屏震等全部特效
      if (ecfg.instant) {
        landing.hidden = true;
        setTool('home');
        if (isMobile()) closeSidebar();
        return;
      }
      if (btn) btn.disabled = true;
      impactFeedback('heavy');                       // 点击瞬间：屏震 + 移动端振动（+ 可选炸裂声）
      const onDone = () => {
        landing.classList.add('hide');
        setTimeout(() => { landing.hidden = true; }, 520);
        setTool('home');
        if (isMobile()) closeSidebar();
      };
      const mode = (ecfg.dissolve) || 'fall';
      // 三种方式都先走「闪电分割 → 碎片沿裂纹裂开 → 屏震」前奏，再接各自的消失特效
      triggerCrackShatter(btn, onDone, mode);
    };
    if (btn) btn.addEventListener('click', enter);

    await paintLandingPet();

    // 领域展开：背景炸裂成不规则碎片并向下掉落出屏，结束后进入工作台首页
    // 半平面裁剪（Sutherland–Hodgman）：保留 (p-mid)·d <= 0 一侧，用于生成 Voronoi 单元
    function clipHalfPlane(poly, dx, dy, mx, my) {
      const out = []; const n = poly.length;
      for (let i = 0; i < n; i++) {
        const A = poly[i], B = poly[(i + 1) % n];
        const da = (A[0] - mx) * dx + (A[1] - my) * dy;
        const db = (B[0] - mx) * dx + (B[1] - my) * dy;
        const ina = da <= 0, inb = db <= 0;
        if (ina) out.push(A);
        if (ina !== inb) {
          const t = da / (da - db);
          out.push([A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1])]);
        }
      }
      return out;
    }
    // 由站点点集做 Voronoi 切分（屏幕矩形内）：相邻单元共享中垂线顶点，碎片边界天然无缝拼接
    function voronoiCells(sites, W, H) {
      const cells = [];
      for (let i = 0; i < sites.length; i++) {
        let poly = [[0, 0], [W, 0], [W, H], [0, H]];
        for (let j = 0; j < sites.length; j++) {
          if (i === j) continue;
          const sx = sites[i].x, sy = sites[i].y, ox = sites[j].x, oy = sites[j].y;
          const dx = ox - sx, dy = oy - sy;
          const mx = (sx + ox) / 2, my = (sy + oy) / 2;
          poly = clipHalfPlane(poly, dx, dy, mx, my);
          if (poly.length < 3) break;
        }
        cells.push(poly);
      }
      return cells;
    }

    // 领域展开：背景炸裂成不规则碎片并向下掉落出屏，结束后进入工作台首页
    // sites 为可选站点（闪电裂纹节点）：传入时按 Voronoi 切成沿裂纹的不规则多边形碎片；否则退回均匀网格
    // mode: 'fall'(全部向下掉落) | 'blackhole'(黑洞扭曲汇聚) | 'bullet'(子弹射击) | 'matrix'(黑客帝国) | 'matrix2'(至尊黑客帝国，默认)
    function triggerShatter(onDone, cellsPx, mode) {
      mode = mode || 'fall';
      // 碎片背景时刻与进入页(landing)实际背景保持一致：有背景图则用图切碎片，否则用背景色（如薄荷色）
      const cs = getComputedStyle(landing);
      const bgImage = cs.backgroundImage || 'none';
      const hasImg = /url\(/.test(bgImage);
      const bgColor = cs.backgroundColor || 'transparent';
      const W = window.innerWidth, H = window.innerHeight;

      // 计算每块碎片的百分比多边形顶点（cellsPx 为像素坐标多边形；裂纹内部边即碎片边界）
      let polys;
      if (cellsPx && cellsPx.length) {
        polys = cellsPx
          .filter(c => c.length >= 3)
          .map(c => c.map(([x, y]) => [+(x / W * 100).toFixed(2), +(y / H * 100).toFixed(2)]));
      } else {
        // 兜底：均匀网格 + 顶点抖动，保持碎片尺寸相对一致
        const cols = 10, rows = 8, jitter = 0.3;
        const cw = 100 / cols, ch = 100 / rows, cx = c => c * cw, cy = r => r * ch;
        const jx = [], jy = [];
        for (let r = 0; r <= rows; r++) {
          jx[r] = []; jy[r] = [];
          for (let c = 0; c <= cols; c++) {
            jx[r][c] = (Math.random() - 0.5) * jitter * cw;
            jy[r][c] = (Math.random() - 0.5) * jitter * ch;
          }
        }
        polys = [];
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          polys.push([
            [cx(c) + jx[r][c], cy(r) + jy[r][c]],
            [cx(c + 1) + jx[r][c + 1], cy(r) + jy[r][c + 1]],
            [cx(c + 1) + jx[r + 1][c + 1], cy(r + 1) + jy[r + 1][c + 1]],
            [cx(c) + jx[r + 1][c], cy(r + 1) + jy[r + 1][c]]
          ]);
        }
      }

      const overlay = document.createElement('div');
      overlay.id = 'shatter';
      const frags = polys.map(poly => {
        const d = 'polygon(' + poly.map(p => p[0].toFixed(2) + '% ' + p[1].toFixed(2) + '%').join(',') + ')';
        const f = document.createElement('div');
        f.className = 'shatter-frag';
        if (hasImg) {
          f.style.backgroundImage = bgImage; // computed 已为绝对 url
        } else {
          f.style.backgroundImage = 'none';
          f.style.background = bgColor;
        }
        f.style.clipPath = d;
        f.style.webkitClipPath = d;
        overlay.appendChild(f);
        return f;
      });
      document.body.appendChild(overlay);

      // 隐藏原背景与内容，露出碎片层
      landing.style.background = 'transparent';
      const inner = landing.querySelector('.landing-inner');
      if (inner) { inner.style.transition = 'opacity .16s ease'; inner.style.opacity = '0'; }

      // 计算每片质心（像素），用于黑洞汇聚 / 子弹方向判定
      const cx = W / 2, cy = H / 2;
      const cents = polys.map(poly => {
        let sx = 0, sy = 0;
        for (const p of poly) { sx += p[0] / 100 * W; sy += p[1] / 100 * H; }
        return [sx / poly.length, sy / poly.length];
      });
      // 每片旋转/缩放支点设为自身质心：避免绕屏幕中心公转甩动（黑洞模式的关键修正）
      frags.forEach((f, i) => { f.style.transformOrigin = cents[i][0] + 'px ' + cents[i][1] + 'px'; });

      if (mode === 'matrix') {
        // 黑客帝国：立即铺上矩阵雨层（z 298，盖住下方工作台透出），碎片在其上慢慢淡化露出矩阵雨 → 展示3秒 → 淡出进入工作台
        const layer = spawnMatrixRain();
        frags.forEach((f) => {
          f.animate([{ opacity: 1 }, { opacity: 0 }],
            { duration: 700 + Math.random() * 500, delay: Math.random() * 300, easing: 'ease-out', fill: 'forwards' });
        });
        setTimeout(() => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 1500);
        setTimeout(() => closeMatrixRain(layer, onDone), 3000); // 矩阵雨展示 3 秒后淡出进入工作台
        return;
      }
      if (mode === 'matrix2') {
        // 至尊黑客帝国：矩阵雨始终在后方；碎片带墙皮掉落感，按 中心1块→附近3块→其余由内向外 依次坠落，
        // 每处掉落即露出背后矩阵雨；全部掉落后矩阵雨完整显示 3 秒再进入工作台
        const layer = spawnMatrixRain();
        const order = frags.map((f, i) => ({ i, d: Math.hypot(cents[i][0] - cx, cents[i][1] - cy) }));
        order.sort((a, b) => a.d - b.d);                 // 由内向外排序：首位=正中心，1~3=附近三块，之后由内向外
        const STEP = Math.max(8, Math.min(30, 1500 / Math.max(1, order.length - 1)));
        const promises = order.map((o, rank) => {
          let delay = rank * STEP;
          if (rank >= 4) delay += 140;                  // 突出「中心1 + 附近3」与「其余由内向外」的分段节奏
          const f = frags[o.i];
          const dx = (Math.random() - 0.5) * 60;
          const dy = H + 220 + Math.random() * 320;
          const rot = (Math.random() < 0.5 ? -1 : 1) * (18 + Math.random() * 42);
          return f.animate([
            { transform: 'translate(0px,0px) rotate(0deg)', opacity: 1 },
            { transform: 'translate(' + (dx * 0.2).toFixed(1) + 'px,-12px) rotate(' + (rot * 0.25).toFixed(1) + 'deg)', opacity: 1, offset: 0.1 }, // 起皮微翘
            { transform: 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg)', opacity: 0 }              // 加速坠落
          ], { duration: 760 + Math.random() * 340, delay: delay, easing: 'cubic-bezier(.5,0,.9,.4)', fill: 'forwards' }).finished;
        });
        const finishM2 = () => {
          if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
          // 全部掉落后：矩阵雨完整展示约 1 秒，最后 2 秒取消位移，仅通过透明度渐变平滑淡出（带柔和模糊、无位置变化）
          const HOLD = 1000, REVEAL = 2000;
          setTimeout(() => {
            // 1) 工作台就位：隐藏进入页覆盖层并显示 home；此刻矩阵雨仍以 z298 盖在其上，不会出现闪现
            landing.classList.add('hide');
            landing.hidden = true;
            setTool('home');
            if (isMobile()) closeSidebar();
            // 2) 纯透明度渐变淡出：opacity 1→0（配合柔和模糊），无任何 translate 位移，结束时完全不可见
            layer.animate([
              { transform: 'translateY(0)', opacity: 1, filter: 'blur(6px)' },
              { transform: 'translateY(0)', opacity: 0.45, filter: 'blur(10px)', offset: 0.5 },
              { transform: 'translateY(0)', opacity: 0, filter: 'blur(14px)' }
            ], { duration: REVEAL, easing: 'ease-in-out', fill: 'forwards' });
            setTimeout(() => { if (layer.parentNode) layer.parentNode.removeChild(layer); }, REVEAL + 80);
          }, HOLD);
        };
        Promise.all(promises).then(finishM2).catch(finishM2);
        return;
      }
      let promises;
      let maxEnd = 0;
      if (mode === 'blackhole') {
        // 黑洞扭曲：碎片整体旋转并收缩，沿质心向屏幕中心汇聚成一点后消失
        promises = frags.map((f, i) => {
          const px = cents[i][0], py = cents[i][1];
          const tx = cx - px, ty = cy - py;                 // 平移使碎片质心归位到屏幕中心
          const dist = Math.hypot(tx, ty);
          const rot = 180 + Math.random() * 180;            // 整体旋转卷入（绕自身质心，保留扭曲不甩动）
          const dur = 1150 + dist * 0.35 + Math.random() * 240;
          const delay = (dist / Math.hypot(W, H)) * 240 + Math.random() * 70;
          maxEnd = Math.max(maxEnd, dur + delay);
          return f.animate([
            { transform: 'translate(0px,0px) rotate(0deg) scale(1)', opacity: 1 },
            { transform: 'translate(' + (tx * 0.9).toFixed(1) + 'px,' + (ty * 0.9).toFixed(1) + 'px) rotate(' + (rot * 0.6).toFixed(1) + 'deg) scale(0.2)', opacity: 1, offset: 0.72 },
            { transform: 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg) scale(0.04)', opacity: 0 }
          ], { duration: dur, delay: delay, easing: 'cubic-bezier(.5,.02,.75,.45)', fill: 'forwards' }).finished;
        });
        spawnBlackHole(cx, cy);
      } else if (mode === 'bullet') {
        // 子弹射击：由慢到快加速；左侧碎片向右射出、右侧碎片向左射出屏幕外
        promises = frags.map((f, i) => {
          const px = cents[i][0];
          const toRight = px < cx;                          // 左侧→右射，右侧→左射
          const tx = (toRight ? 1 : -1) * (W * 1.25 + 120);
          const ty = (Math.random() - 0.5) * H * 0.35;      // 轻微纵向散布，增加冲击层次
          const rot = (Math.random() - 0.5) * 50;           // 翻滚
          const dur = 2800 + Math.random() * 300;           // 整体约 3s + ease-in → 由慢到快加速感
          const delay = Math.random() * 90;
          maxEnd = Math.max(maxEnd, dur + delay);
          return f.animate([
            { transform: 'translate(0px,0px) rotate(0deg)', opacity: 1 },
            { transform: 'translate(' + (tx * 0.92).toFixed(1) + 'px,' + (ty * 0.92).toFixed(1) + 'px) rotate(' + (rot * 0.7).toFixed(1) + 'deg)', opacity: 1, offset: 0.86 },
            { transform: 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg)', opacity: 0 }
          ], { duration: dur, delay: delay, easing: 'cubic-bezier(.62,0,.92,.32)', fill: 'forwards' }).finished;
        });
      } else {
        // fall（现有）：每片独立掉落，横向微偏移 + 旋转 + 加速下落，出屏后淡出
        promises = frags.map((f, i) => {
          const dx = (Math.random() - 0.5) * 140;
          const dy = H + 240 + Math.random() * 220;
          const rot = (Math.random() - 0.5) * 70;
          const dur = 900 + Math.random() * 520;
          const delay = Math.random() * 110;
          maxEnd = Math.max(maxEnd, dur + delay);
          return f.animate([
            { transform: 'translate(0px,0px) rotate(0deg)', opacity: 1 },
            { transform: 'translate(' + (dx * 0.85).toFixed(1) + 'px,' + (dy * 0.82).toFixed(1) + 'px) rotate(' + (rot * 0.5).toFixed(1) + 'deg)', opacity: 1, offset: 0.82 },
            { transform: 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg)', opacity: 0 }
          ], { duration: dur, delay: delay, easing: 'cubic-bezier(.5,.05,.9,.45)', fill: 'forwards' }).finished;
        });
      }

      let done = false;
      const finish = () => {
        if (done) return; done = true;
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        if (onDone) onDone();
      };
      Promise.all(promises).then(finish).catch(finish);
      setTimeout(finish, maxEnd + 250); // 兜底，按实际最长动画时长，防止个别动画未回调
    }

    // 黑洞视觉：中心暗核 + 紫蓝吸积光环，先膨胀后坍缩为一点，与碎片汇聚同步
    function spawnBlackHole(cx, cy) {
      const bh = document.createElement('div');
      bh.id = 'blackhole';
      bh.style.left = cx + 'px';
      bh.style.top = cy + 'px';
      document.body.appendChild(bh);
      const anim = bh.animate([
        { transform: 'translate(-50%,-50%) scale(0.12)', opacity: 0 },
        { transform: 'translate(-50%,-50%) scale(1.18)', opacity: 0.95, offset: 0.5 },
        { transform: 'translate(-50%,-50%) scale(0.05)', opacity: 0 }
      ], { duration: 1500, easing: 'cubic-bezier(.5,0,.85,.4)', fill: 'forwards' });
      anim.finished.then(() => bh.remove()).catch(() => bh.remove());
    }

    // 黑客帝国矩阵雨：全屏覆盖层，碎片淡化后展示约 3 秒，再淡化消失进入工作台
    function showMatrixRain(onDone) {
      const layer = spawnMatrixRain();
      setTimeout(() => closeMatrixRain(layer, onDone), 3000);
    }
    // 仅创建并淡入矩阵雨层（始终位于碎片层下方 z298，盖住工作台透出），返回该层供外部控制展示时长
    function spawnMatrixRain() {
      const layer = document.createElement('div');
      layer.id = 'matrixRain';
      const W = window.innerWidth;
      const COLW = 24;                                  // 列宽(px)，与 CSS font-size/line-height 协调
      const n = Math.max(40, Math.ceil(W / COLW) + 6);   // 按视口宽度动态补足列数，保证铺满
      let cols = '';
      for (let i = 0; i < n; i++) {
        const leftPct = (i / (n - 1)) * 100;            // 均匀铺满 0%~100%
        const dur = (2.2 + Math.random() * 2.2).toFixed(2);    // 每列下落时长 2.2~4.4s 各异
        const delay = (-Math.random() * 4).toFixed(2);         // 负延迟：进入即已在下落，避免整齐起始
        cols += '<div class="matrix-column" style="left:' + leftPct.toFixed(2) + '%;animation-duration:' + dur + 's;animation-delay:' + delay + 's;"></div>';
      }
      layer.innerHTML = '<div class="matrix-container"><div class="matrix-pattern">' + cols + '</div></div>';
      document.body.appendChild(layer);
      requestAnimationFrame(() => layer.classList.add('show'));
      return layer;
    }
    // 保持 holdMs 后淡出矩阵雨层并进入工作台
    function closeMatrixRain(layer, onDone) {
      if (!layer || !layer.parentNode) { if (onDone) onDone(); return; }
      layer.classList.remove('show');
      setTimeout(() => {
        if (layer.parentNode) layer.parentNode.removeChild(layer);
        if (onDone) onDone();
      }, 850);
    }

    // 领域展开：裂纹 = 碎块边界（Voronoi 内部边），以按钮中心为放射源 → 2s 铺满 → 白光闪 → 沿裂纹碎裂掉落
    function triggerCrackShatter(originEl, onDone, mode) {
      const W = window.innerWidth, H = window.innerHeight;
      const rect = originEl ? originEl.getBoundingClientRect() : null;
      const ox = rect ? rect.left + rect.width / 2 : W / 2;
      const oy = rect ? rect.top + rect.height / 2 : H / 2;
      const spreadMs = 2000;                       // 裂纹蔓延总时长（可控）
      const maxR = Math.hypot(Math.max(ox, W - ox), Math.max(oy, H - oy));

      // 1) 从按钮中心呈闪电状放射扩散地布点（站点）；Voronoi 切出的内部边即裂纹走向。
      //    中央站点位于按钮中心，外圈按极坐标放射但加入强随机抖动 + 每环随机方向数/角度，
      //    → 裂纹既从按钮发散，又摆脱均匀几何/对称结构，呈自然闪电分叉。
      const rnd = (a, b) => a + Math.random() * (b - a);
      const sites = [{ x: ox, y: oy }];   // 按钮中心 = 裂纹放射源
      const ringStep = Math.hypot(W, H) * 0.082;   // 径向间距（控制碎块大小）
      const rings = Math.ceil(maxR / ringStep) + 1;
      for (let m = 1; m <= rings; m++) {
        const ANG = 9 + Math.floor(Math.random() * 7);          // 每环放射方向数随机(9~15)，打破对称
        const r = m * ringStep * (0.7 + Math.random() * 0.6);   // 半径强抖动
        const base = rnd(0, Math.PI * 2);                       // 每环整体旋转随机
        for (let a = 0; a < ANG; a++) {
          const ang = base + a * (Math.PI * 2 / ANG) + rnd(-0.22, 0.22);  // 角度抖动
          const perp = ang + Math.PI / 2;
          const j = (Math.random() - 0.5) * ringStep * 1.05;     // 切向抖动 → 闪电弯折
          sites.push({
            x: ox + Math.cos(ang) * r + Math.cos(perp) * j,
            y: oy + Math.sin(ang) * r + Math.sin(perp) * j
          });
          // 偶发外侧随机分支，增强自然感而不破坏放射主结构
          if (Math.random() < 0.18) {
            const ra = r + ringStep * rnd(0.6, 1.5);
            const aa = ang + rnd(-0.6, 0.6);
            const jp = (Math.random() - 0.5) * ringStep * 1.0;
            sites.push({
              x: ox + Math.cos(aa) * ra + Math.cos(aa + Math.PI / 2) * jp,
              y: oy + Math.sin(aa) * ra + Math.sin(aa + Math.PI / 2) * jp
            });
          }
        }
      }
      // 剔除过近站点，避免极小碎片/退化单元（块大小更均匀）
      const minDist = Math.hypot(W, H) * 0.03;
      const kept = [];
      for (const p of sites) {
        let ok = true;
        for (const q of kept) { if ((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y) < minDist * minDist) { ok = false; break; } }
        if (ok) kept.push(p);
      }
      kept.push({ x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: H }, { x: 0, y: H });
      kept.push({ x: W / 2, y: 0 }, { x: W, y: H / 2 }, { x: W / 2, y: H }, { x: 0, y: H / 2 });

      // 2) Voronoi 切分：每个单元即一块碎片
      const cells = voronoiCells(kept, W, H);

      // 3) 抽取 Voronoi 内部边作为裂纹（= 碎片边界），与碎块 100% 重合。
      //    每条边生成一条锯齿状闪电折线：同一份路径既用于绘制裂纹，也用于碎片裁剪，
      //    保证碎块严格沿裂纹裂开；另追加随机分叉枝杈（含末端小分叉）增强闪电张力。
      const r2 = (a, b) => a + Math.random() * (b - a);
      const edgeKey = (A, B) => {
        const ra = [Math.round(A[0]), Math.round(A[1])], rb = [Math.round(B[0]), Math.round(B[1])];
        return (ra[0] < rb[0] || (ra[0] === rb[0] && ra[1] <= rb[1]))
          ? ra.join(',') + '|' + rb.join(',') : rb.join(',') + '|' + ra.join(',');
      };
      // 锯齿闪电折线：在 A→B 直线基础上叠加垂直随机偏移 + 沿轴顿挫，制造锐利转折
      function jaggedPath(a, b, ampScale) {
        const dx = b[0] - a[0], dy = b[1] - a[1];
        const len = Math.hypot(dx, dy);
        if (len < 1) return [[a[0], a[1]], [b[0], b[1]]];
        const ux = dx / len, uy = dy / len, px = -uy, py = ux;
        const segs = Math.max(3, Math.round(len / (11 + Math.random() * 15)));
        const pts = [];
        for (let i = 0; i <= segs; i++) {
          const t = i / segs;
          let x = a[0] + dx * t, y = a[1] + dy * t;
          if (i > 0 && i < segs) {
            const env = Math.sin(t * Math.PI);                 // 两端收敛、中部最狂
            const amp = (len * 0.12 + 6) * (0.35 + Math.random() * 1.05) * env * ampScale;
            const off = (Math.random() * 2 - 1) * amp;        // 垂直随机偏移 → 锯齿
            const along = (Math.random() - 0.5) * len * 0.07; // 沿轴顿挫 → 锐利转折
            x += px * off + ux * along;
            y += py * off + uy * along;
          }
          pts.push([x, y]);
        }
        return pts;
      }
      const pathD = pts => {
        let d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
        for (let i = 1; i < pts.length; i++) d += ' L' + pts[i][0].toFixed(1) + ' ' + pts[i][1].toFixed(1);
        return d;
      };

      const crackEdges = [];
      const seen = new Set();
      const onBorder = p => p[0] <= 0.5 || p[0] >= W - 0.5 || p[1] <= 0.5 || p[1] >= H - 0.5;
      for (const cell of cells) {
        if (cell.length < 3) continue;
        const n = cell.length;
        for (let i = 0; i < n; i++) {
          const A = cell[i], B = cell[(i + 1) % n];
          if (onBorder(A) && onBorder(B)) continue; // 跳过屏幕外框边
          const k = edgeKey(A, B);
          if (seen.has(k)) continue; seen.add(k);
          crackEdges.push([A, B]);
        }
      }
      // 为每条内部边生成锯齿路径（A→B 朝向），存入 Map 供绘制与裁剪共用
      const jag = new Map();
      for (const [A, B] of crackEdges) {
        jag.set(edgeKey(A, B), jaggedPath(A, B, r2(0.7, 1.55))); // 振幅各异 → 狂野度差异
      }
      // 由锯齿边重建每块碎片的裁剪多边形（与裂纹 100% 重合）
      function jaggedCell(cell) {
        const out = [];
        const n = cell.length;
        for (let i = 0; i < n; i++) {
          const A = cell[i], B = cell[(i + 1) % n];
          const pts = jag.get(edgeKey(A, B));
          if (!pts) { if (out.length) out.push([B[0], B[1]]); else out.push([A[0], A[1]], [B[0], B[1]]); continue; }
          const startsAtA = Math.hypot(pts[0][0] - A[0], pts[0][1] - A[1]) <= Math.hypot(pts[0][0] - B[0], pts[0][1] - B[1]);
          const seq = startsAtA ? pts : pts.slice().reverse();
          if (out.length === 0) out.push(seq[0]);
          for (let k = 1; k < seq.length; k++) out.push(seq[k]); // 跳过 seq[0]（= 上一边终点），避免重复
        }
        return out;
      }
      const cellsJagged = cells.map(c => c.length >= 3 ? jaggedCell(c) : c);

      // 4) 绘制裂纹：锯齿主裂 + 随机分叉枝杈（含末端分叉），按距按钮远近错峰蔓延
      const NS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(NS, 'svg');
      svg.id = 'crack';
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.innerHTML =
        '<defs><filter id="crackGlow" x="-50%" y="-50%" width="200%" height="200%">' +
        '<feGaussianBlur stdDeviation="2.2" result="b"/>' +
        '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
        '</filter></defs>';
      document.body.appendChild(svg);
      const gHalo = document.createElementNS(NS, 'g'); svg.appendChild(gHalo);
      const gCore = document.createElementNS(NS, 'g'); gCore.setAttribute('filter', 'url(#crackGlow)'); svg.appendChild(gCore);

      // 装饰性分叉枝杈（不参与碎片裁剪）：从部分边随机甩出，末端再分一个小叉
      const branches = [];
      for (const [A, B] of crackEdges) {
        if (Math.random() > 0.42) continue;
        const pts = jag.get(edgeKey(A, B));
        const count = Math.random() < 0.25 ? 2 : 1;
        for (let z = 0; z < count; z++) {
          const idx = 1 + Math.floor(Math.random() * (pts.length - 2));
          const o = pts[idx];
          const edgeAng = Math.atan2(B[1] - A[1], B[0] - A[0]);
          const side = Math.random() < 0.5 ? 1 : -1;
          const ang = edgeAng + side * r2(0.5, 1.25);          // 偏垂直方向甩出 → 自然分叉
          const blen = r2(0.18, 0.5) * Math.hypot(B[0] - A[0], B[1] - A[1]) + r2(18, 60);
          const bpts = jaggedPath(o, [o[0] + Math.cos(ang) * blen, o[1] + Math.sin(ang) * blen], r2(0.7, 1.3));
          branches.push(bpts);
          if (Math.random() < 0.6) {                            // 末端再分一个小叉
            const tip = bpts[bpts.length - 1];
            const fa = ang + r2(-0.8, 0.8);
            const fl = blen * r2(0.3, 0.6);
            branches.push(jaggedPath(tip, [tip[0] + Math.cos(fa) * fl, tip[1] + Math.sin(fa) * fl], r2(0.6, 1.1)));
          }
        }
      }

      function drawBolt(pts, coreW, haloW) {
        const d = pathD(pts);
        if (haloW) {
          const halo = document.createElementNS(NS, 'path');
          halo.setAttribute('d', d); halo.setAttribute('class', 'halo');
          halo.style.strokeWidth = haloW;
          gHalo.appendChild(halo);
          animateDraw(halo, pts);
        }
        const core = document.createElementNS(NS, 'path');
        core.setAttribute('d', d); core.setAttribute('class', 'core');
        core.style.strokeWidth = coreW;
        gCore.appendChild(core);
        animateDraw(core, pts);
      }
      function animateDraw(pp, pts) {
        const total = pts.reduce((s, p, i) => i ? s + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : s, 0);
        const mid = pts[Math.floor(pts.length / 2)];
        const delay = (Math.hypot(mid[0] - ox, mid[1] - oy) / maxR) * spreadMs * 0.6; // 由内向外错峰蔓延
        pp.style.strokeDasharray = total; pp.style.strokeDashoffset = total;
        pp.animate([{ strokeDashoffset: total }, { strokeDashoffset: 0 }],
          { duration: spreadMs * 0.5, delay: delay, easing: 'ease-out', fill: 'forwards' });
      }

      for (const [A, B] of crackEdges) {
        const w = r2(1.6, 4.3);                                // 每条主裂粗细不同
        drawBolt(jag.get(edgeKey(A, B)), w.toFixed(1), (w * 3).toFixed(1));
      }
      for (const br of branches) {
        const w = r2(0.8, 1.7);                                // 枝杈更细 → 末端锐利
        const b = document.createElementNS(NS, 'path');
        b.setAttribute('d', pathD(br)); b.setAttribute('class', 'core');
        b.style.strokeWidth = w.toFixed(1); b.style.opacity = '0.82';
        gCore.appendChild(b); animateDraw(b, br);
      }

      // 蔓延过程中叠加轻微电流闪烁，增强动态张力
      svg.animate([{ opacity: 0.85 }, { opacity: 1, offset: 0.5 }, { opacity: 0.7 }, { opacity: 1 }],
        { duration: 240, iterations: Math.max(2, Math.round((spreadMs - 120) / 240)), easing: 'ease-in-out' });

      // 5) 蔓延结束：白光闪 → 裂纹淡出 → 屏幕沿裂纹碎裂掉落（cellsJagged 即裂纹界定的碎片）
      setTimeout(() => {
        const flash = document.createElement('div');
        flash.id = 'crackFlash';
        document.body.appendChild(flash);
        flash.animate([{ opacity: 0 }, { opacity: 0.9, offset: 0.3 }, { opacity: 0 }],
          { duration: 300, fill: 'forwards' }).finished.then(() => flash.remove()).catch(() => flash.remove());
        svg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, fill: 'forwards' })
          .finished.then(() => svg.remove()).catch(() => svg.remove());
        triggerShatter(onDone, cellsJagged, mode || 'fall');
      }, spreadMs);
    }

    // 点击屏震/振动反馈：移动端走 Vibration API，桌面端走视觉抖动；强度按场景匹配
    // IMPACT_SOUND 控制是否同步播放炸裂声（WebAudio），默认关闭，可与屏震配合使用
    const IMPACT_SOUND = false;
    function impactFeedback(intensity, target) {
      const presets = {
        light:  { amp: 3,  rot: 0.18, vib: 14 },
        medium: { amp: 7,  rot: 0.40, vib: [0, 26, 14, 26] },
        heavy:  { amp: 12, rot: 0.70, vib: [0, 46, 24, 46, 24, 46] }   // 领域展开：最强冲击
      };
      const p = presets[intensity] || presets.medium;
      // 触觉：移动端振动（无 API 时静默跳过）
      try { if (navigator.vibrate) navigator.vibrate(p.vib); } catch (e) {}
      // 视觉：桌面端屏震（尊重「减弱动态效果」系统偏好）
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const el = target || landing;
      if (!reduce && el) {
        el.style.setProperty('--amp', p.amp);
        el.style.setProperty('--rot', p.rot);
        el.classList.remove('ets-shake');
        void el.offsetWidth;                       // 强制重排，重启动画
        el.classList.add('ets-shake');
        el.addEventListener('animationend', () => el.classList.remove('ets-shake'), { once: true });
      }
      playImpactSound();
    }
    function playImpactSound() {
      if (!IMPACT_SOUND) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        const ctx = new AC(); const now = ctx.currentTime;
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(42, now + 0.5);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.6, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.66);
        const dur = 0.35, buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2);
        const noise = ctx.createBufferSource(); noise.buffer = buf;
        const ng = ctx.createGain(); ng.gain.value = 0.22;
        const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 700;
        noise.connect(hp).connect(ng).connect(ctx.destination);
        noise.start(now);
        setTimeout(() => { try { ctx.close(); } catch (e) {} }, 800);
      } catch (e) {}
    }

    landing.hidden = false;
  }

  /* ---------------- 启动 ---------------- */
  applyDefaults();
  // 一次性迁移：把侧栏字体纠正为默认 20px（覆盖早期测试残留的小字号）
  if (localStorage.getItem('ets_font_sb_fixed') !== '1') {
    const cur = readFont('sidebar');
    const curPx = cur && cur.scale != null ? Math.round(cur.scale * FONT_BASE_PX) : 0;
    if (!cur || curPx < 13) {
      writeFont('sidebar', { scale: 1.429, color: '', family: '' });
    }
    localStorage.setItem('ets_font_sb_fixed', '1');
  }
  paintIcons(document);
  renderNav();
  applySavedBg();
  applySavedFonts();
  applyPet(); // 恢复常驻宠物（若存在）；状态改为按需懒加载，不再预切全部宠物
  // 侧栏 / 顶栏透明度（偏好）
  const savedA = parseInt(localStorage.getItem('ets_panel_alpha'), 10);
  if (!isNaN(savedA)) applyPanelAlpha(savedA);

  // 深浅主题切换（记忆偏好）
  const themeBtn = $('#themeBtn');
  function syncThemeIcon() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeBtn.innerHTML = dark ? svg('sun', 20) : svg('moon', 20);
  }
  const savedTheme = localStorage.getItem('ets_theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  syncThemeIcon();
  themeBtn.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ets_theme', next);
    syncThemeIcon();
  });

  initLanding(); // 先展示动态进入页，点击【领域展开】后再进入工作台首页
})();
