// DOM layer for the island: the house (仓库 / 素材库), the sheep (我的素材; the one with the neck camera
// imports photos), the board by the bridge (手账社团上新) and the waterwheel (free layout of the basket).
// Sample data only — this is the UI shell.
const MATERIALS = [
	{ name: '复古玫瑰贴纸', color: '复古', tone: ['#C08D77', '#8E9B84', '#E9E0CE'], box: 'A-1 · 3 格', qty: '12 张' },
	{ name: '野花小枝贴纸', color: '复古', tone: ['#D6B69A', '#93A183', '#F0E7D6'], box: 'A-1 · 5 格', qty: '8 张' },
	{ name: '莫兰迪和纸胶带', color: '莫兰迪', tone: ['#D9B9BB', '#9FB0A0', '#C9BBA5'], box: 'B-1 · 1 格', qty: '5 卷' },
	{ name: '雾蓝细胶带', color: '莫兰迪', tone: ['#A9BCC6', '#D7CEC1', '#E7E2D8'], box: 'B-1 · 4 格', qty: '2 卷' },
	{ name: '手绘小动物贴纸', color: '奶油', tone: ['#E5C6A8', '#F2E3D5', '#B9C9D8'], box: 'A-2 · 2 格', qty: '18 枚' },
	{ name: '小兔爱心贴纸', color: '奶油', tone: ['#EFD3CE', '#F6EBDF', '#A9BBC9'], box: 'A-2 · 6 格', qty: '6 枚' },
	{ name: '干燥植物标本', color: '大地', tone: ['#9C9E76', '#C2A57D', '#E4D8C3'], box: 'C-2 · 1 格', qty: '9 片' },
	{ name: '银杏叶书签', color: '大地', tone: ['#C9A24C', '#A8905F', '#EDE3CF'], box: 'C-2 · 3 格', qty: '4 片' },
];

const BOXES = [
	{ id: 'A-1', name: '贴纸盒', where: '书桌左抽屉', filled: 9, slots: 12 },
	{ id: 'A-2', name: '可爱贴纸盒', where: '书桌左抽屉', filled: 9, slots: 9 },
	{ id: 'B-1', name: '胶带盒', where: '书桌右抽屉', filled: 11, slots: 12 },
	{ id: 'B-2', name: '胶带补充盒', where: '书柜第 2 层', filled: 4, slots: 12 },
	{ id: 'C-1', name: '纸张盒', where: '书柜第 1 层', filled: 6, slots: 9 },
	{ id: 'C-2', name: '植物标本盒', where: '窗边收纳架', filled: 8, slots: 9 },
];

const SOCIETY_NEWS = [
	{ club: '纸上声', title: '秋日票根企划 · 社团限定 6 款', tag: '上新', time: '8 分钟前', fresh: true },
	{ club: '一页手账社', title: '莫兰迪色卡交换 · 报名开放', tag: '活动', time: '35 分钟前', fresh: true },
	{ club: '慢纸研究所', title: '植物标本拼贴教程 · 更新第 3 期', tag: '教程', time: '1 小时前', fresh: true },
	{ club: '纸间合作社', title: '和纸胶带拼团 · 12 卷套组', tag: '拼团', time: '3 小时前', fresh: false },
	{ club: '格纸俱乐部', title: '月计划模板 · 11 月版可下载', tag: '模板', time: '昨天', fresh: false },
	{ club: '针脚手账组', title: '布面书衣工作坊 · 周末场', tag: '线下', time: '2 天前', fresh: false },
];

// color-theory pairings over the materials the visitor already has
const PAIRINGS = [
	{
		kicker: '规则 01 · 类似色',
		title: '温柔莫兰迪：同一色相环的 30° 内',
		swatches: ['#D9B9BB', '#9FB0A0', '#C9BBA5'],
		ratio: ['60% 燕麦', '30% 豆绿', '10% 灰粉'],
		uses: '莫兰迪和纸胶带 · 雾蓝细胶带 · 干燥植物标本',
		why: '三者色相相邻、饱和度都在 30% 以下，明度差控制在 15–25 之间，贴在一起不会互相抢；主体区域用最浅的燕麦色留白，灰粉只做页角点缀。',
		layout: '大面积打底 → 中部留白 → 右下角单点贴纸，左侧留一条竖排文字。',
	},
	{
		kicker: '规则 02 · 互补色',
		title: '复古撞色：玫瑰红 × 豆绿，降饱和后对撞',
		swatches: ['#C08D77', '#8E9B84', '#F0E7D6'],
		ratio: ['60% 奶油纸', '30% 玫瑰', '10% 豆绿'],
		uses: '复古玫瑰贴纸 · 野花小枝贴纸 · 手绘小动物贴纸',
		why: '红与绿在色相环上相差约 150°，直接对撞会很吵；把两边饱和度压到 25%–35%，再用奶油白隔离，就变成复古画报的旧纸感。',
		layout: '玫瑰贴纸压左上角作视觉重心，豆绿小枝对角呼应，中间大片奶油纸写日期。',
	},
	{
		kicker: '规则 03 · 三角配色',
		title: '纸感清新：色环三等分，一冷两暖',
		swatches: ['#A9BCC6', '#C9A24C', '#F2E3D5'],
		ratio: ['60% 奶油', '30% 雾蓝', '10% 银杏黄'],
		uses: '雾蓝细胶带 · 银杏叶书签 · 小兔爱心贴纸',
		why: '雾蓝、银杏黄、奶油白在色环上接近三等分，冷色只有一个，画面稳而不闷；黄色的高明度做点睛，蓝色负责压住整页。',
		layout: '上下分栏：上半奶油留白，下半雾蓝细胶带拉横线，银杏叶斜贴破局。',
	},
];

const CSS = `
:root{
  --paper:#F6F2EA; --card:#FFFCF7; --ink:#2E3230; --ink-soft:#5B615C; --muted:#8E9188;
  --line:#E3DDD1; --sage:#6E7F6A; --sage-soft:#E6EBE2; --clay:#BE7D62;
}
#zw-ui{position:fixed;inset:0;z-index:20;pointer-events:none;font-family:"Noto Sans SC","PingFang SC","Microsoft YaHei",system-ui,sans-serif;color:var(--ink)}
#zw-ui .panel{pointer-events:auto}

#zw-brand{position:absolute;left:22px;top:18px;display:flex;align-items:center;gap:10px;opacity:0;transition:opacity .6s ease}
#zw-brand.on{opacity:1}
#zw-brand .mark{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(150deg,#8FA085,#68795F);color:#F7F4ED;font:600 15px "Noto Serif SC",serif;box-shadow:0 8px 18px -10px rgba(58,72,55,.9)}
#zw-brand .txt b{display:block;font:600 15px "Noto Serif SC",serif;letter-spacing:.14em}
#zw-brand .txt span{display:block;font-size:10px;letter-spacing:.22em;color:#8a8272;margin-top:1px}

#zw-drawer{position:absolute;right:0;top:0;bottom:0;width:452px;max-width:92vw;background:var(--card);border-left:1px solid var(--line);box-shadow:-24px 0 60px -40px rgba(40,34,24,.6);transform:translateX(102%);transition:transform .42s cubic-bezier(.2,.8,.25,1);display:flex;flex-direction:column}
#zw-drawer.on{transform:none}
#zw-drawer .hd{display:flex;align-items:flex-start;gap:12px;padding:22px 22px 14px;border-bottom:1px solid var(--line)}
#zw-drawer .hd .kicker{font-size:10px;letter-spacing:.22em;color:#B69A63;margin-bottom:3px}
#zw-drawer .hd h2{font:600 20px "Noto Serif SC",serif;letter-spacing:.02em}
#zw-drawer .hd .sub{font-size:11.5px;color:var(--muted);margin-top:5px}
#zw-drawer .x{margin-left:auto;width:30px;height:30px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;font-size:15px;color:var(--ink-soft);background:var(--card);cursor:pointer}
#zw-drawer .x:hover{background:var(--sage-soft);border-color:#CFD9C7}
#zw-drawer .bd{padding:16px 22px 26px;overflow:auto;flex:1}
#zw-drawer .ft{padding:12px 22px 18px;border-top:1px solid var(--line);font-size:11px;color:var(--muted)}

.chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:14px}
.chip{padding:5px 12px;border-radius:999px;border:1px solid var(--line);background:var(--card);font-size:11.5px;color:var(--ink-soft);cursor:pointer;transition:.18s}
.chip:hover{border-color:#C7CFBF}
.chip.on{background:var(--ink);border-color:var(--ink);color:#F8F5EE}

.box-row{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px dashed var(--line);cursor:pointer}
.box-row:last-child{border-bottom:0}
.box-id{width:46px;height:46px;border-radius:12px;flex:none;display:grid;place-items:center;background:linear-gradient(150deg,#EDF1E8,#DCE4D6);border:1px solid #D2DCC9;font:600 13px "Noto Serif SC",serif;color:#55654F}
.box-row .nm{flex:1;min-width:0}
.box-row .nm b{display:block;font-size:13.5px;font-weight:500}
.box-row .nm span{display:block;font-size:11px;color:var(--muted);margin-top:2px}
.box-bar{height:5px;border-radius:99px;background:#EFEAE0;overflow:hidden;margin-top:7px}
.box-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#A7B4A1,#6E7F6A)}
.box-row .cnt{font-size:11px;color:var(--muted);white-space:nowrap;text-align:right}

/* select mode */
.sel-bar{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.sel-toggle{height:30px;padding:0 14px;border-radius:999px;border:1px solid var(--line);background:var(--card);font-size:11.5px;color:var(--ink-soft);cursor:pointer}
.sel-toggle.on{background:var(--ink);border-color:var(--ink);color:#F8F5EE}
.sel-hint{font-size:11px;color:var(--muted)}
.sel-cnt{font-size:11px;color:#5C6A54}
.sel-acts{display:flex;gap:8px;margin:-4px 0 12px}
.sel-acts button{height:32px;flex:1;border-radius:10px;border:1px solid var(--line);background:#FFFEFB;font-size:11.5px;color:var(--ink-soft);cursor:pointer}
.sel-acts .danger{border-color:#EBD0C5;color:#965B46;background:#FBF1ED}
.sel-acts .primary{background:var(--sage);border-color:var(--sage);color:#FBF9F4}
.sel-acts button:hover{filter:brightness(.98)}
.basket-line{display:flex;align-items:center;gap:8px;font-size:11px;color:#5C6A54;background:var(--sage-soft);border:1px solid #D7E0CF;border-radius:11px;padding:8px 11px;margin-bottom:12px}
.basket-line button{margin-left:auto;border:0;background:transparent;color:#77836D;font-size:10.5px;cursor:pointer;text-decoration:underline}

.mat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.mat-card{position:relative;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#FFFEFB;cursor:pointer;transition:.15s}
.mat-card.on{border-color:#8FA085;box-shadow:0 0 0 2px rgba(143,160,133,.35)}
.mat-card .sw{height:78px;display:flex}
.mat-card .sw i{flex:1}
.mat-card .mt{padding:9px 10px 11px}
.mat-card .mt b{display:block;font:600 12.5px "Noto Serif SC",serif}
.mat-card .mt span{display:block;font-size:10.5px;color:var(--muted);margin-top:3px}
.mat-card .mt em{display:inline-block;font-style:normal;font-size:9.5px;color:#55654F;background:var(--sage-soft);border-radius:99px;padding:1px 7px;margin-top:6px}
.mat-card .ck{position:absolute;right:8px;top:8px;width:18px;height:18px;border-radius:50%;border:1.5px solid #D8D2C4;background:rgba(255,255,255,.9);display:none;place-items:center;font-size:11px;color:#4F5C48}
.mat-card.select .ck{display:grid}
.mat-card.on .ck{background:var(--sage);border-color:var(--sage);color:#fff}
.mat-card.select .sw{filter:saturate(.95)}

/* camera import */
.cap-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
.cap-btn{height:70px;border-radius:16px;border:1px solid #D8DFD2;background:linear-gradient(160deg,#EFF3EA,#E1E8DA);color:#4A5643;cursor:pointer;display:grid;place-items:center;gap:3px;font-size:12.5px;font-weight:500;transition:.2s}
.cap-btn:hover{border-color:#B9C8AC;transform:translateY(-1px)}
.cap-btn small{font-weight:400;font-size:10px;color:#7C8874}
.cap-btn.ghost{background:var(--card);border-color:var(--line);color:var(--ink-soft)}
.cap-btn.ghost:hover{border-color:#C7CFBF}
.thumbs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.thumb{position:relative;border-radius:11px;overflow:hidden;border:1px solid var(--line);background:#F2EDE3;aspect-ratio:1}
.thumb img{width:100%;height:100%;object-fit:cover;display:block}
.thumb .tg{position:absolute;left:5px;bottom:5px;right:5px;font-size:9px;line-height:1.35;color:#F8F5EE;background:rgba(46,50,48,.72);border-radius:7px;padding:2px 5px}
.empty{border:1px dashed #D8D2C4;border-radius:14px;padding:22px 14px;text-align:center;color:var(--muted);font-size:11.5px;line-height:1.7;background:rgba(255,255,255,.5)}
.empty b{display:block;font-size:22px;font-weight:400;color:#B7BBAD;margin-bottom:6px}

/* news */
.news-row{display:flex;gap:11px;padding:11px 0;border-bottom:1px dashed var(--line);align-items:flex-start}
.news-row:last-child{border-bottom:0}
.news-dot{width:34px;height:34px;border-radius:10px;flex:none;display:grid;place-items:center;font:600 11px "Noto Serif SC",serif;color:#55654F;background:linear-gradient(150deg,#EDF1E8,#DCE4D6);border:1px solid #D2DCC9;position:relative}
.news-dot.b::after{content:"";position:absolute;right:-3px;top:-3px;width:7px;height:7px;border-radius:50%;background:#D8493C;box-shadow:0 0 0 2px #FFFCF7}
.news-row .nt{flex:1;min-width:0}
.news-row .shop{font-size:10.5px;color:var(--muted);letter-spacing:.06em}
.news-row .tt{font-size:12.5px;margin-top:3px;line-height:1.5}
.news-row .tag{display:inline-block;font-size:9.5px;border-radius:99px;padding:1px 7px;margin-top:6px;border:1px solid #E4D3BF;color:#8A6A44;background:#F7EFE3}
.news-row .tag.tag-act{border-color:#D2DCC9;color:#5A6B52;background:#EFF3EB}
.news-row .rt{text-align:right;white-space:nowrap}
.news-row .rt .t{font-size:10px;color:var(--muted)}
.banner{display:flex;align-items:center;gap:8px;border-radius:12px;background:#F7EFE3;border:1px solid #EBDCC6;padding:9px 12px;font-size:11px;color:#7C6440;margin-bottom:14px}
.banner i{width:7px;height:7px;border-radius:50%;background:#D8493C;flex:none}

/* ai */
.ai-note{font-size:11px;color:var(--muted);line-height:1.7;margin-bottom:14px}
.pair{border:1px solid var(--line);border-radius:16px;padding:14px;margin-bottom:12px;background:#FFFEFB}
.pair .kick{font-size:9.5px;letter-spacing:.16em;color:#B69A63}
.pair h3{font:600 14px "Noto Serif SC",serif;margin:4px 0 10px;line-height:1.45}
.pair .dots{display:flex;gap:8px;margin-bottom:10px}
.pair .dots i{width:34px;height:34px;border-radius:50%;border:2px solid #FFFCF7;box-shadow:0 0 0 1px var(--line)}
.pair .line{font-size:11.5px;color:var(--ink-soft);line-height:1.75}
.pair .line b{font-weight:500;color:#3E463C}
.pair .ratio{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 10px}
.pair .ratio span{font-size:10px;padding:2px 8px;border-radius:99px;border:1px solid var(--line);color:#6B7268;background:#F7F4EC}
.pair .why{margin-top:8px;font-size:11px;line-height:1.8;color:#6B7268;background:#F8F5EE;border-radius:10px;padding:9px 10px}

/* basket layout */
#zw-layout{position:absolute;inset:0;background:rgba(38,34,28,.34);display:grid;place-items:center;pointer-events:auto;backdrop-filter:blur(3px);opacity:0;transition:opacity .25s}
#zw-layout.on{opacity:1}
.lay-card{width:min(760px,94vw);background:var(--card);border-radius:20px;border:1px solid var(--line);box-shadow:0 40px 90px -50px rgba(30,26,18,.9);overflow:hidden;display:flex;flex-direction:column}
.lay-hd{display:flex;align-items:flex-start;gap:12px;padding:18px 20px 12px;border-bottom:1px solid var(--line)}
.lay-hd b{font:600 17px "Noto Serif SC",serif}
.lay-hd span{display:block;font-size:11px;color:var(--muted);margin-top:4px}
.lay-hd .x{margin-left:auto;width:30px;height:30px;border-radius:50%;border:1px solid var(--line);background:var(--card);cursor:pointer;color:var(--ink-soft)}
.lay-canvas{position:relative;margin:16px 20px 6px;height:min(52vh,430px);border-radius:14px;border:1px dashed #D8D2C4;background:
  repeating-linear-gradient(0deg,rgba(0,0,0,.035) 0 1px,transparent 1px 26px),
  repeating-linear-gradient(90deg,rgba(0,0,0,.035) 0 1px,transparent 1px 26px),#FBF8F1;overflow:hidden;touch-action:none}
.lay-item{position:absolute;width:64px;padding:5px;border-radius:11px;background:#FFFDF8;border:1px solid var(--line);cursor:grab;user-select:none;box-shadow:0 8px 18px -14px rgba(50,42,30,.7)}
.lay-item .sw{height:34px;border-radius:7px;display:flex;overflow:hidden}
.lay-item .sw i{flex:1}
.lay-item span{display:block;font-size:8.5px;line-height:1.25;color:#6B6F66;margin-top:4px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lay-ft{display:flex;gap:10px;padding:14px 20px 18px;border-top:1px solid var(--line);align-items:center}
.lay-ft .tip{font-size:10.5px;color:var(--muted)}
.lay-ft button{height:36px;padding:0 16px;border-radius:999px;border:1px solid var(--line);background:var(--card);font-size:12px;color:var(--ink-soft);cursor:pointer}
.lay-ft .primary{margin-left:auto;background:var(--sage);border-color:var(--sage);color:#FBF9F4}
.lay-confirm{padding:14px 20px 18px;border-top:1px solid var(--line);font-size:12px;color:var(--ink-soft)}
.lay-confirm .q{font:600 13px "Noto Serif SC",serif;margin-bottom:10px;color:var(--ink)}
.lay-confirm .row{display:flex;gap:10px}
.lay-confirm button{height:34px;padding:0 16px;border-radius:999px;border:1px solid var(--line);background:var(--card);font-size:12px;cursor:pointer;color:var(--ink-soft)}
.lay-confirm .yes{background:var(--sage);border-color:var(--sage);color:#FBF9F4}

#zw-toast{position:absolute;left:50%;bottom:84px;transform:translate(-50%,10px);background:rgba(46,50,48,.92);color:#F8F5EE;font-size:12px;padding:9px 16px;border-radius:999px;opacity:0;transition:.3s;pointer-events:none}
#zw-toast.on{opacity:1;transform:translate(-50%,0)}
`;

function el(tag, cls, html) {
	const n = document.createElement(tag);
	if (cls) n.className = cls;
	if (html != null) n.innerHTML = html;
	return n;
}

export function setupUI() {
	const style = document.createElement('style');
	style.textContent = CSS;
	document.head.appendChild(style);

	const root = el('div');
	root.id = 'zw-ui';

	const brand = el('div', '', `
		<div class="mark">纸</div>
		<div class="txt"><b>纸间 · 手账世界</b><span>STATIONERY STASH</span></div>`);
	brand.id = 'zw-brand';
	root.appendChild(brand);

	const drawer = el('aside', 'panel');
	drawer.id = 'zw-drawer';
	drawer.innerHTML = `
		<div class="hd">
			<div>
				<div class="kicker">HOUSE</div>
				<h2 id="zw-title">仓库 · 素材库</h2>
				<div class="sub" id="zw-sub"></div>
			</div>
			<button class="x" id="zw-close" aria-label="关闭">×</button>
		</div>
		<div class="bd" id="zw-body"></div>
		<div class="ft" id="zw-foot"></div>`;
	root.appendChild(drawer);

	const toast = el('div');
	toast.id = 'zw-toast';
	root.appendChild(toast);
	document.body.appendChild(root);

	let materials = MATERIALS.slice();
	let filter = '全部';
	let openKind = null;
	let selectMode = false;
	const selected = new Set();
	let basket = [];
	// preview helper: ?bag=1 pre-fills the basket so the layout board can be looked at
	if (new URLSearchParams(location.search).has('bag')) basket = materials.slice(0, 6).map((m) => m.name);

	const copy = {
		house: ['仓库 · 素材库', '按物理盒子建档，六盒 63 格，装下你全部的手账素材', '点盒子可看格位 · 数据为示例'],
		sheep: ['我的素材', '已有 128 件素材 · 6 个收纳盒 · 最近更新 2 小时前', '可多选后删除，或放进小篮子交给流水车排版'],
		camera: ['素材录入', '挂在羊脖子上的小相机 · 一次可批量选多张', '识别色系与风格后会写进素材库'],
		news: ['手账社团上新', '6 个手账社团 · 今日识别到 3 条上新', '小红点表示 24 小时内有新内容'],
		ai: ['推荐素材搭配', '基于 128 件素材，按色相环与 60-30-10 比例给出方案', '可继续微调，或换一套重新生成'],
	};

	function toastMsg(t) {
		toast.textContent = t;
		toast.classList.add('on');
		clearTimeout(toastMsg.t);
		toastMsg.t = setTimeout(() => toast.classList.remove('on'), 2400);
	}

	function bodyHouse() {
		let html = '';
		for (const b of BOXES) {
			const pct = Math.round((b.filled / b.slots) * 100);
			html += `<div class="box-row">
				<div class="box-id">${b.id}</div>
				<div class="nm">
					<b>${b.name}</b>
					<span>${b.where} · ${b.slots} 格</span>
					<div class="box-bar"><i style="width:${pct}%"></i></div>
				</div>
				<div class="cnt">${b.filled}/${b.slots}<br>${b.filled === b.slots ? '已满' : pct + '%'}</div>
			</div>`;
		}
		return html;
	}

	function bodySheep() {
		const list = materials.filter((m) => filter === '全部' || m.color === filter);
		const tones = ['全部', '莫兰迪', '奶油', '复古', '大地'];
		let html = `<div class="sel-bar">
			<button class="sel-toggle ${selectMode ? 'on' : ''}" id="zw-selmode">${selectMode ? '取消选择' : '选择素材'}</button>
			${selectMode ? `<span class="sel-cnt">已选 ${selected.size} 件</span>` : '<span class="sel-hint">可多选 · 删除或放进小篮子</span>'}
		</div>`;
		if (selectMode && selected.size) {
			html += `<div class="sel-acts">
				<button class="danger" id="zw-del">删除 ${selected.size} 件</button>
				<button class="primary" id="zw-basket">放进小篮子</button>
			</div>`;
		}
		if (basket.length) {
			html += `<div class="basket-line">小篮子里有 ${basket.length} 件素材 · 点画面里的流水车自由排版<button id="zw-clear">清空篮子</button></div>`;
		}
		html += `<div class="chips">${tones.map((t) => `<button class="chip ${t === filter ? 'on' : ''}" data-f="${t}">${t}</button>`).join('')}</div>`;
		html += '<div class="mat-grid">';
		for (const m of list) {
			const on = selected.has(m.name);
			html += `<div class="mat-card ${selectMode ? 'select' : ''} ${on ? 'on' : ''}" data-name="${m.name}">
				<div class="ck">✓</div>
				<div class="sw">${m.tone.map((c) => `<i style="background:${c}"></i>`).join('')}</div>
				<div class="mt"><b>${m.name}</b><span>${m.box}</span><em>${m.qty}</em></div>
			</div>`;
		}
		html += `</div>`;
		return html;
	}

	function bodyCamera() {
		return `
			<div class="cap-actions">
				<button class="cap-btn" id="zw-album">从相册批量选择<small>支持一次选多张</small></button>
				<button class="cap-btn ghost" id="zw-shoot">直接拍照<small>调用后置摄像头</small></button>
			</div>
			<input type="file" id="zw-file" accept="image/*" multiple hidden>
			<input type="file" id="zw-cam" accept="image/*" capture="environment" hidden>
			<div id="zw-thumbs" class="thumbs"></div>
			<div class="ai-note">录入后自动打上色系与风格标签：色系取自图片主色，风格按贴纸 / 胶带 / 纸张 / 标本四类判定，再按盒子剩余格位给出建议位置。</div>`;
	}

	function bodyNews() {
		let html = `<div class="banner"><i></i>木牌上的小红点 = 24 小时内识别到新内容，可直接去社团页看原文</div>`;
		for (const n of SOCIETY_NEWS) {
			const cls = n.tag === '活动' || n.tag === '拼团' ? ' tag-act' : '';
			html += `<div class="news-row">
				<div class="news-dot${n.fresh ? ' b' : ''}">${n.club.slice(0, 1)}</div>
				<div class="nt">
					<div class="shop">${n.club}</div>
					<div class="tt">${n.title}</div>
					<span class="tag${cls}">${n.tag}</span>
				</div>
				<div class="rt"><div class="t">${n.time}</div></div>
			</div>`;
		}
		return html;
	}

	function bodyAI() {
		let html = `<div class="ai-note">按美术设计里的三条原则排序：① 类似色求统一 ② 互补色求张力 ③ 三角配色求平衡；比例统一用 60-30-10，明度差保持在 15–25 之间。</div>`;
		for (const p of PAIRINGS) {
			html += `<div class="pair">
				<div class="kick">${p.kicker}</div>
				<h3>${p.title}</h3>
				<div class="dots">${p.swatches.map((c) => `<i style="background:${c}"></i>`).join('')}</div>
				<div class="ratio">${p.ratio.map((r) => `<span>${r}</span>`).join('')}</div>
				<div class="line"><b>用到：</b>${p.uses}</div>
				<div class="why">${p.why}</div>
				<div class="line" style="margin-top:8px"><b>排版：</b>${p.layout}</div>
			</div>`;
		}
		return html;
	}

	function bindBody() {
		const body = drawer.querySelector('#zw-body');

		const selBtn = body.querySelector('#zw-selmode');
		if (selBtn) {
			selBtn.addEventListener('click', () => {
				selectMode = !selectMode;
				if (!selectMode) selected.clear();
				renderOpen();
			});
		}
		body.querySelectorAll('.chip').forEach((c) => {
			c.addEventListener('click', () => {
				filter = c.dataset.f;
				renderOpen();
			});
		});
		body.querySelectorAll('.mat-card').forEach((card) => {
			card.addEventListener('click', () => {
				if (!selectMode) {
					toastMsg(card.dataset.name);
					return;
				}
				const n = card.dataset.name;
				if (selected.has(n)) selected.delete(n);
				else selected.add(n);
				renderOpen();
			});
		});
		const del = body.querySelector('#zw-del');
		if (del) {
			del.addEventListener('click', () => {
				const n = selected.size;
				materials = materials.filter((m) => !selected.has(m.name));
				basket = basket.filter((b) => !selected.has(b));
				selected.clear();
				selectMode = false;
				renderOpen();
				toastMsg(`已删除 ${n} 件素材`);
			});
		}
		const toBasket = body.querySelector('#zw-basket');
		if (toBasket) {
			toBasket.addEventListener('click', () => {
				const n = selected.size;
				basket = basket.concat(Array.from(selected));
				selected.clear();
				selectMode = false;
				renderOpen();
				toastMsg(`已放进小篮子 · 共 ${basket.length} 件，去点画面里的流水车排版`);
			});
		}
		const clear = body.querySelector('#zw-clear');
		if (clear) {
			clear.addEventListener('click', () => {
				basket = [];
				renderOpen();
				toastMsg('小篮子已清空');
			});
		}

		body.querySelectorAll('.box-row').forEach((r) => {
			r.addEventListener('click', () => toastMsg('打开盒位视图：' + r.querySelector('.box-id').textContent));
		});

		const album = body.querySelector('#zw-album');
		const shoot = body.querySelector('#zw-shoot');
		const file = body.querySelector('#zw-file');
		const camIn = body.querySelector('#zw-cam');
		if (album && file && camIn) {
			const thumbs = body.querySelector('#zw-thumbs');
			album.addEventListener('click', () => file.click());
			shoot.addEventListener('click', () => camIn.click());
			const show = (files) => {
				if (!files || !files.length) return;
				const tones = ['莫兰迪 · 灰粉', '奶油 · 浅棕', '复古 · 豆绿', '大地 · 燕麦'];
				const kinds = ['贴纸', '胶带', '纸张', '标本'];
				for (const [i, f] of Array.from(files).entries()) {
					const url = URL.createObjectURL(f);
					const card = el('div', 'thumb', `<img src="${url}" alt=""><div class="tg">${tones[i % 4]}<br>${kinds[i % 4]} · 待入盒</div>`);
					thumbs.appendChild(card);
				}
				const ph = thumbs.querySelector('.empty');
				if (ph) ph.remove();
				toastMsg(`已录入 ${files.length} 件素材 · 自动打标完成`);
			};
			file.addEventListener('change', () => show(file.files));
			camIn.addEventListener('change', () => show(camIn.files));
			if (!thumbs.children.length) {
				const ph = el('div', 'empty', '<b>+</b>还在等你的第一张素材<br>建议一次选 5–20 张，自动分批处理');
				ph.style.gridColumn = '1 / -1';
				thumbs.appendChild(ph);
			}
		}
	}

	function renderOpen() {
		const [t, s, f] = copy[openKind];
		drawer.querySelector('#zw-title').textContent = t;
		drawer.querySelector('#zw-sub').textContent = s;
		drawer.querySelector('#zw-foot').textContent = f;
		drawer.querySelector('.kicker').textContent = {
			house: 'HOUSE · 仓库',
			sheep: 'SHEEP',
			camera: 'CAMERA',
			news: 'CLUB BOARD',
			ai: 'AI PAIRING',
		}[openKind];
		const body = drawer.querySelector('#zw-body');
		body.innerHTML =
			openKind === 'house'
				? bodyHouse()
				: openKind === 'sheep'
					? bodySheep()
					: openKind === 'camera'
						? bodyCamera()
						: openKind === 'news'
							? bodyNews()
							: bodyAI();
		bindBody();
	}

	// ---- basket layout -----------------------------------------------------------------------
	let layout = null;
	function closeLayout() {
		if (!layout) return;
		layout.classList.remove('on');
		const l = layout;
		layout = null;
		setTimeout(() => l.remove(), 260);
	}

	function showLayout() {
		if (!basket.length) {
			toastMsg('小篮子里还没有素材 · 先去「我的素材」里选几件放进来');
			return;
		}
		if (layout) return;
		const items = basket.map((name, i) => {
			const m = materials.find((x) => x.name === name) ?? materials[0];
			return {
				name,
				m,
				x: 8 + ((i * 3) % 4) * 22 + (i % 2) * 4,
				y: 12 + (i % 3) * 26,
			};
		});
		const wrap = el('div');
		wrap.id = 'zw-layout';
		wrap.innerHTML = `
			<div class="lay-card">
				<div class="lay-hd">
					<div><b>流水车 · 自由排版</b><span>拖动素材摆位置，摆好后可以归纳进仓库</span></div>
					<button class="x" data-x>×</button>
				</div>
				<div class="lay-canvas" id="lay-canvas"></div>
				<div id="lay-ft" class="lay-ft">
					<span class="tip">共 ${basket.length} 件 · 拖动摆放，顺序随意</span>
					<button id="lay-reset">打散重排</button>
					<button class="primary" id="lay-done">完成排版</button>
				</div>
			</div>`;
		root.appendChild(wrap);
		requestAnimationFrame(() => wrap.classList.add('on'));
		layout = wrap;

		const canvas = wrap.querySelector('#lay-canvas');
		const nodes = [];
		function place() {
			canvas.innerHTML = '';
			for (const it of items) {
				const n = el('div', 'lay-item', `<div class="sw">${it.m.tone.map((c) => `<i style="background:${c}"></i>`).join('')}</div><span>${it.name}</span>`);
				n.style.left = `${it.x}%`;
				n.style.top = `${it.y}%`;
				canvas.appendChild(n);
				nodes.push({ n, it });
			}
		}
		place();

		let drag = null;
		canvas.addEventListener('pointerdown', (e) => {
			const item = e.target.closest('.lay-item');
			if (!item) return;
			const rec = nodes.find((r) => r.n === item);
			const box = canvas.getBoundingClientRect();
			const ir = item.getBoundingClientRect();
			drag = { rec, box, ox: e.clientX - ir.left, oy: e.clientY - ir.top };
			item.style.zIndex = 20;
			canvas.setPointerCapture?.(e.pointerId);
		});
		canvas.addEventListener('pointermove', (e) => {
			if (!drag) return;
			const { rec, box, ox, oy } = drag;
			const x = ((e.clientX - box.left - ox) / box.width) * 100;
			const y = ((e.clientY - box.top - oy) / box.height) * 100;
			rec.it.x = Math.max(0, Math.min(84, x));
			rec.it.y = Math.max(0, Math.min(80, y));
			rec.n.style.left = `${rec.it.x}%`;
			rec.n.style.top = `${rec.it.y}%`;
		});
		const endDrag = () => {
			if (!drag) return;
			drag.rec.n.style.zIndex = '';
			drag = null;
		};
			canvas.addEventListener('pointerup', endDrag);
		canvas.addEventListener('pointercancel', endDrag);

		wrap.querySelector('[data-x]').addEventListener('click', closeLayout);
		wrap.querySelector('#lay-reset').addEventListener('click', () => {
			items.forEach((it, i) => {
				it.x = 8 + ((i * 3) % 4) * 22 + (i % 2) * 4;
				it.y = 12 + (i % 3) * 26;
			});
			nodes.forEach(({ n, it }) => {
				n.style.left = `${it.x}%`;
				n.style.top = `${it.y}%`;
			});
		});

		wrap.querySelector('#lay-done').addEventListener('click', () => {
			const ft = wrap.querySelector('#lay-ft');
			const n = basket.length;
			ft.outerHTML = `<div id="lay-ft" class="lay-confirm">
				<div class="q">是否将篮子里的 ${n} 件素材归纳至仓库？</div>
				<div class="row">
					<button class="yes" id="lay-yes">归纳，并清空篮子</button>
					<button id="lay-no">先留在篮子</button>
				</div>
			</div>`;
			wrap.querySelector('#lay-yes').addEventListener('click', () => {
				const box = BOXES[0];
				box.filled = Math.min(box.slots, box.filled + n);
				basket = [];
				selected.clear();
				closeLayout();
				if (openKind === 'sheep') renderOpen();
				toastMsg(`已归纳 ${n} 件素材到 ${box.id} ${box.name}`);
			});
			wrap.querySelector('#lay-no').addEventListener('click', () => {
				closeLayout();
				toastMsg('排版已保存 · 素材先留在小篮子里');
			});
		});
	}

	const api = {
		open(kind) {
			if (kind === 'layout') {
				showLayout();
				return;
			}
			openKind = kind;
			renderOpen();
			drawer.classList.add('on');
			api.showChrome(true);
		},
		close() {
			drawer.classList.remove('on');
			openKind = null;
		},
		showChrome(on) {
			brand.classList.toggle('on', on);
		},
		toast: toastMsg,
		get isOpen() {
			return !!openKind;
		},
		get basketCount() {
			return basket.length;
		},
	};

	drawer.querySelector('#zw-close').addEventListener('click', () => api.close());
	addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			if (layout) closeLayout();
			else api.close();
		}
	});

	return api;
}
