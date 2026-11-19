const DB_NAME = 'paper-stash-v2';
const DB_VERSION = 1;
const MATERIAL_STORE = 'materials';
const SETTINGS_KEY = 'paper-stash.settings.v2';

export const COLOR_GROUPS = [
	{ id: 'red', name: '红色', hex: '#C96B62' },
	{ id: 'orange', name: '橙色', hex: '#D99358' },
	{ id: 'yellow', name: '黄色', hex: '#D5B45D' },
	{ id: 'green', name: '绿色', hex: '#819B72' },
	{ id: 'cyan', name: '青色', hex: '#72A6A2' },
	{ id: 'blue', name: '蓝色', hex: '#7C9DB5' },
	{ id: 'purple', name: '紫色', hex: '#9881AA' },
	{ id: 'pink', name: '粉色', hex: '#C98E9E' },
	{ id: 'brown', name: '棕色', hex: '#9D806A' },
	{ id: 'neutral', name: '黑白灰', hex: '#8B8B84' },
	{ id: 'multicolor', name: '多彩', hex: 'linear-gradient(120deg,#C96B62,#D5B45D,#7C9DB5)' },
];

export const PLATFORM_META = {
	taobao: { name: '淘宝', short: '淘', color: '#D77845' },
	weidian: { name: '微店', short: '微', color: '#6C8D74' },
	xhs: { name: '小红书', short: '红', color: '#BD625F' },
	other: { name: '其他', short: '讯', color: '#8A806D' },
};

export const COLOR_TO_GROUP = Object.fromEntries(COLOR_GROUPS.map((group) => [group.name, group.id]));

export const SAMPLE_MATERIALS = [
	{
		id: 'demo-rose',
		name: '复古玫瑰贴纸',
		color: '棕色',
		tone: ['#C08D77', '#8E9B84', '#E9E0CE'],
		box: 'A-1 · 3 格',
		qty: 12,
		categories: ['复古'],
		favorite: true,
		createdAt: Date.now() - 7_200_000,
		sample: true,
	},
	{
		id: 'demo-wildflower',
		name: '野花小枝贴纸',
		color: '绿色',
		tone: ['#D6B69A', '#93A183', '#F0E7D6'],
		box: 'A-1 · 5 格',
		qty: 8,
		categories: ['植物'],
		createdAt: Date.now() - 6_000_000,
		sample: true,
	},
	{
		id: 'demo-morandi-tape',
		name: '莫兰迪和纸胶带',
		color: '粉色',
		tone: ['#D9B9BB', '#9FB0A0', '#C9BBA5'],
		box: 'B-1 · 1 格',
		qty: 5,
		categories: ['莫兰迪'],
		createdAt: Date.now() - 5_000_000,
		sample: true,
	},
	{
		id: 'demo-mist-tape',
		name: '雾蓝细胶带',
		color: '蓝色',
		tone: ['#A9BCC6', '#D7CEC1', '#E7E2D8'],
		box: 'B-1 · 4 格',
		qty: 2,
		categories: ['莫兰迪'],
		createdAt: Date.now() - 4_000_000,
		sample: true,
	},
	{
		id: 'demo-animals',
		name: '手绘小动物贴纸',
		color: '黄色',
		tone: ['#E5C6A8', '#F2E3D5', '#B9C9D8'],
		box: 'A-2 · 2 格',
		qty: 18,
		categories: ['可爱'],
		createdAt: Date.now() - 3_000_000,
		sample: true,
	},
	{
		id: 'demo-rabbit',
		name: '小兔爱心贴纸',
		color: '粉色',
		tone: ['#EFD3CE', '#F6EBDF', '#A9BBC9'],
		box: 'A-2 · 6 格',
		qty: 6,
		categories: ['可爱'],
		createdAt: Date.now() - 2_000_000,
		sample: true,
	},
	{
		id: 'demo-botanical',
		name: '干燥植物标本',
		color: '绿色',
		tone: ['#9C9E76', '#C2A57D', '#E4D8C3'],
		box: 'C-2 · 1 格',
		qty: 9,
		categories: ['植物'],
		createdAt: Date.now() - 1_000_000,
		sample: true,
	},
	{
		id: 'demo-ginkgo',
		name: '银杏叶书签',
		color: '黄色',
		tone: ['#C9A24C', '#A8905F', '#EDE3CF'],
		box: 'C-2 · 3 格',
		qty: 4,
		categories: ['植物', '复古'],
		createdAt: Date.now() - 500_000,
		sample: true,
	},
];

export const SAMPLE_NEWS = [
	{
		id: 'news-demo-1',
		club: '纸间合作社',
		platform: 'taobao',
		title: '秋日票根企划 · 社团限定 6 款',
		tag: '上新',
		startAt: null,
		url: '',
		publishedAt: Date.now() - 8 * 60_000,
		sample: true,
	},
	{
		id: 'news-demo-2',
		club: '一页手账社',
		platform: 'xhs',
		title: '莫兰迪色卡交换 · 报名开放',
		tag: '活动',
		startAt: Date.now() + 2 * 86_400_000,
		url: '',
		publishedAt: Date.now() - 35 * 60_000,
		sample: true,
	},
	{
		id: 'news-demo-3',
		club: '慢纸研究所',
		platform: 'weidian',
		title: '植物标本拼贴教程 · 更新第 3 期',
		tag: '教程',
		startAt: null,
		url: '',
		publishedAt: Date.now() - 86_400_000,
		sample: true,
	},
];

const DEFAULT_SETTINGS = {
	seeded: false,
	categories: [
		{ id: 'cat-vintage', name: '复古', color: '#B27F68' },
		{ id: 'cat-botanical', name: '植物', color: '#78906E' },
		{ id: 'cat-morandi', name: '莫兰迪', color: '#9A998A' },
		{ id: 'cat-cute', name: '可爱', color: '#C88893' },
	],
	sources: [],
	manualNews: [],
	lastNewsRefresh: 0,
	hideSampleNews: false,
	boxes: [],
};

function uid(prefix = 'id') {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function readSettings() {
	try {
		const raw = localStorage.getItem(SETTINGS_KEY);
		return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : structuredClone(DEFAULT_SETTINGS);
	} catch {
		return structuredClone(DEFAULT_SETTINGS);
	}
}

function writeSettings(settings) {
	try {
		localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
		return true;
	} catch {
		return false;
	}
}

function openDatabase() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(MATERIAL_STORE)) {
				db.createObjectStore(MATERIAL_STORE, { keyPath: 'id' });
			}
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

async function withStore(mode, work) {
	const db = await openDatabase();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(MATERIAL_STORE, mode);
		const store = tx.objectStore(MATERIAL_STORE);
		let result;
		try {
			result = work(store);
		} catch (error) {
			db.close();
			reject(error);
			return;
		}
		tx.oncomplete = () => {
			db.close();
			resolve(result);
		};
		tx.onerror = () => {
			db.close();
			reject(tx.error);
		};
	});
}

function requestToPromise(request) {
	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

function makeCanvas(width, height) {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	return canvas;
}

function loadImage(src) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = () => reject(new Error('图片读取失败'));
		image.src = src;
	});
}

function fileToDataURL(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
}

function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	if (max === min) return { h: 0, s: 0, l };
	const d = max - min;
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	let h;
	if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
	else if (max === g) h = (b - r) / d + 2;
	else h = (r - g) / d + 4;
	return { h: h * 60, s, l };
}

function hueGroup(h, s, l) {
	if (l < 0.24 && s < 0.26) return 'neutral';
	if (s < 0.09) return l > 0.9 ? null : 'neutral';
	if (h >= 12 && h < 48 && s > 0.18 && l < 0.45) return 'brown';
	if (h < 12 || h >= 345) return 'red';
	if (h < 38) return 'orange';
	if (h < 66) return 'yellow';
	if (h < 162) return 'green';
	if (h < 192) return 'cyan';
	if (h < 252) return 'blue';
	if (h < 292) return 'purple';
	return 'pink';
}

function representativeColor(bucket) {
	if (!bucket || !bucket.samples.length) return '#B5B2A9';
	let r = 0;
	let g = 0;
	let b = 0;
	for (const c of bucket.samples) {
		r += c[0];
		g += c[1];
		b += c[2];
	}
	const n = bucket.samples.length;
	return `rgb(${Math.round(r / n)},${Math.round(g / n)},${Math.round(b / n)})`;
}

export function analyzeImage(image) {
	const maxSide = 240;
	const scale = Math.min(1, maxSide / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height));
	const w = Math.max(24, Math.round((image.naturalWidth || image.width) * scale));
	const h = Math.max(24, Math.round((image.naturalHeight || image.height) * scale));
	const canvas = makeCanvas(w, h);
	const ctx = canvas.getContext('2d', { willReadFrequently: true });
	ctx.drawImage(image, 0, 0, w, h);
	const pixels = ctx.getImageData(0, 0, w, h).data;
	const buckets = {};
	const all = [];
	let valid = 0;
	let colored = 0;
	for (let y = 0; y < h; y += 2) {
		for (let x = 0; x < w; x += 2) {
			const i = (y * w + x) * 4;
			const a = pixels[i + 3];
			if (a < 90) continue;
			const r = pixels[i];
			const g = pixels[i + 1];
			const b = pixels[i + 2];
			const { h: hue, s, l } = rgbToHsl(r, g, b);
			if (Math.max(r, g, b) > 247 && Math.min(r, g, b) > 236) continue;
			valid++;
			const group = hueGroup(hue, s, l);
			if (!group) continue;
			const isColored = group !== 'neutral';
			if (isColored) colored++;
			const weight = isColored ? 0.45 + s * 1.8 : 0.35;
			const bucket = (buckets[group] ??= { weight: 0, samples: [] });
			bucket.weight += weight;
			if (bucket.samples.length < 16) bucket.samples.push([r, g, b]);
			all.push({ r, g, b, weight, group });
		}
	}

	const ranked = Object.entries(buckets).sort((a, b) => b[1].weight - a[1].weight);
	let primary = ranked[0]?.[0] ?? 'neutral';
	const totalWeight = ranked.reduce((sum, [, bucket]) => sum + bucket.weight, 0) || 1;
	const dominantShare = (ranked[0]?.[1].weight ?? 0) / totalWeight;
	if (colored / Math.max(1, valid) > 0.12 && dominantShare < 0.46 && ranked.length >= 3) primary = 'multicolor';

	const swatches = ranked
		.filter(([group]) => group !== primary)
		.slice(0, 2)
		.map(([, bucket]) => representativeColor(bucket));
	const primaryGroup = COLOR_GROUPS.find((group) => group.id === primary) ?? COLOR_GROUPS[9];
	swatches.unshift(representativeColor(buckets[primary]) || primaryGroup.hex);
	while (swatches.length < 3) swatches.push(primaryGroup.hex);

	const name = primary === 'multicolor' ? '多彩' : primaryGroup.name;
	return {
		color: name,
		colorId: primary,
		tone: swatches.slice(0, 3),
		confidence: Math.max(0.35, Math.min(0.98, dominantShare)),
	};
}

async function normalizeImage(dataUrl, maxSide = 1800, quality = 0.86) {
	const image = await loadImage(dataUrl);
	const iw = image.naturalWidth || image.width;
	const ih = image.naturalHeight || image.height;
	const scale = Math.min(1, maxSide / Math.max(iw, ih));
	const w = Math.max(1, Math.round(iw * scale));
	const h = Math.max(1, Math.round(ih * scale));
	const canvas = makeCanvas(w, h);
	const ctx = canvas.getContext('2d', { willReadFrequently: true });
	ctx.drawImage(image, 0, 0, w, h);
	return {
		dataUrl: canvas.toDataURL('image/webp', quality),
		image,
		width: w,
		height: h,
	};
}

export async function imageFileToDataUrl(file, { maxSide = 640, quality = 0.78 } = {}) {
	const raw = await fileToDataURL(file);
	const normalized = await normalizeImage(raw, maxSide, quality);
	return {
		dataUrl: normalized.dataUrl,
		width: normalized.width,
		height: normalized.height,
	};
}

function hashString(value) {
	let hash = 2166136261;
	for (let i = 0; i < value.length; i += 97) {
		hash ^= value.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0).toString(36);
}

function colorDistance(r, g, b, target) {
	const dr = r - target[0];
	const dg = g - target[1];
	const db = b - target[2];
	return Math.sqrt(dr * dr + dg * dg + db * db);
}

function borderColor(px, w, h) {
	let r = 0;
	let g = 0;
	let b = 0;
	let count = 0;
	const step = Math.max(1, Math.round(Math.max(w, h) / 80));
	const add = (x, y) => {
		const i = (y * w + x) * 4;
		if (px[i + 3] < 40) return;
		r += px[i];
		g += px[i + 1];
		b += px[i + 2];
		count++;
	};
	for (let x = 0; x < w; x += step) {
		add(x, 0);
		add(x, h - 1);
	}
	for (let y = 0; y < h; y += step) {
		add(0, y);
		add(w - 1, y);
	}
	return count ? [r / count, g / count, b / count] : [255, 255, 255];
}

export async function createCutouts(dataUrl, tolerance = 34, maxSide = 1200) {
	const normalized = await normalizeImage(dataUrl, maxSide);
	const image = normalized.image;
	const w = normalized.width;
	const h = normalized.height;
	const source = makeCanvas(w, h);
	const sourceCtx = source.getContext('2d', { willReadFrequently: true });
	sourceCtx.drawImage(image, 0, 0, w, h);
	const imageData = sourceCtx.getImageData(0, 0, w, h);
	const px = imageData.data;
	const border = borderColor(px, w, h);
	const bg = new Uint8Array(w * h);
	const queue = new Int32Array(w * h);
	let head = 0;
	let tail = 0;
	const threshold = Math.max(14, tolerance);

	const isBackgroundColor = (index) => {
		const i = index * 4;
		if (px[i + 3] < 28) return true;
		const r = px[i];
		const g = px[i + 1];
		const b = px[i + 2];
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		if (max > 244 && min > 232 && max - min < 18) return true;
		return colorDistance(r, g, b, border) <= threshold;
	};

	const push = (index) => {
		if (bg[index] || !isBackgroundColor(index)) return;
		bg[index] = 1;
		queue[tail++] = index;
	};
	for (let x = 0; x < w; x++) {
		push(x);
		push((h - 1) * w + x);
	}
	for (let y = 1; y < h - 1; y++) {
		push(y * w);
		push(y * w + w - 1);
	}
	while (head < tail) {
		const index = queue[head++];
		const x = index % w;
		const y = (index / w) | 0;
		if (x > 0) push(index - 1);
		if (x < w - 1) push(index + 1);
		if (y > 0) push(index - w);
		if (y < h - 1) push(index + w);
	}

	const visited = new Uint8Array(w * h);
	const components = [];
	const minArea = Math.max(220, Math.round(w * h * 0.0012));
	for (let start = 0; start < w * h; start++) {
		if (visited[start] || bg[start] || px[start * 4 + 3] < 20) continue;
		head = 0;
		tail = 0;
		queue[tail++] = start;
		visited[start] = 1;
		let area = 0;
		let minX = w;
		let minY = h;
		let maxX = 0;
		let maxY = 0;
		while (head < tail) {
			const index = queue[head++];
			const x = index % w;
			const y = (index / w) | 0;
			area++;
			if (x < minX) minX = x;
			if (x > maxX) maxX = x;
			if (y < minY) minY = y;
			if (y > maxY) maxY = y;
			if (x > 0) {
				const next = index - 1;
				if (!visited[next] && !bg[next] && px[next * 4 + 3] >= 20) {
					visited[next] = 1;
					queue[tail++] = next;
				}
			}
			if (x < w - 1) {
				const next = index + 1;
				if (!visited[next] && !bg[next] && px[next * 4 + 3] >= 20) {
					visited[next] = 1;
					queue[tail++] = next;
				}
			}
			if (y > 0) {
				const next = index - w;
				if (!visited[next] && !bg[next] && px[next * 4 + 3] >= 20) {
					visited[next] = 1;
					queue[tail++] = next;
				}
			}
			if (y < h - 1) {
				const next = index + w;
				if (!visited[next] && !bg[next] && px[next * 4 + 3] >= 20) {
					visited[next] = 1;
					queue[tail++] = next;
				}
			}
		}
		if (area < minArea) continue;
		components.push({ area, minX, minY, maxX, maxY });
	}

	components.sort((a, b) => b.area - a.area);
	const keep = components.slice(0, 18);
	const pieces = [];
	for (let index = 0; index < keep.length; index++) {
		const box = keep[index];
		const pad = 3;
		const x0 = Math.max(0, box.minX - pad);
		const y0 = Math.max(0, box.minY - pad);
		const x1 = Math.min(w, box.maxX + pad + 1);
		const y1 = Math.min(h, box.maxY + pad + 1);
		const out = makeCanvas(x1 - x0, y1 - y0);
		const outCtx = out.getContext('2d', { willReadFrequently: true });
		const region = sourceCtx.getImageData(x0, y0, x1 - x0, y1 - y0);
		const ox = x0;
		const oy = y0;
		for (let y = 0; y < region.height; y++) {
			for (let x = 0; x < region.width; x++) {
				const localIndex = y * region.width + x;
				const globalIndex = (y + oy) * w + x + ox;
				if (bg[globalIndex]) region.data[localIndex * 4 + 3] = 0;
			}
		}
		outCtx.putImageData(region, 0, 0);
		pieces.push({
			id: `piece-${index + 1}`,
			name: `图案 ${index + 1}`,
			image: out.toDataURL('image/png'),
			width: x1 - x0,
			height: y1 - y0,
		});
	}

	if (!pieces.length) {
		const out = makeCanvas(w, h);
		const outCtx = out.getContext('2d', { willReadFrequently: true });
		const region = sourceCtx.getImageData(0, 0, w, h);
		for (let i = 0; i < w * h; i++) {
			if (bg[i]) region.data[i * 4 + 3] = 0;
		}
		outCtx.putImageData(region, 0, 0);
		pieces.push({
			id: 'piece-full',
			name: '整张透明素材',
			image: out.toDataURL('image/png'),
			width: w,
			height: h,
		});
	}

	return { pieces, background: border.map((v) => Math.round(v)) };
}

function parseFeedText(text, source) {
	const items = [];
	const trimmed = text.trim();
	if (!trimmed) return items;
	if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
		const data = JSON.parse(trimmed);
		const list = Array.isArray(data) ? data : data.items ?? data.news ?? data.data ?? [];
		for (const item of list.slice(0, 50)) {
			const title = item.title ?? item.name ?? item.content ?? '';
			if (!title) continue;
			items.push({
				id: `feed-${hashString(`${source.id}-${item.id ?? item.link ?? title}`)}`,
				club: source.club,
				platform: source.platform,
				title: String(title).trim(),
				tag: item.tag ?? item.type ?? '上新',
				startAt: item.startAt ? new Date(item.startAt).getTime() : null,
				url: item.url ?? item.link ?? source.shopUrl ?? '',
				publishedAt: item.pubDate ? new Date(item.pubDate).getTime() : item.publishedAt ? new Date(item.publishedAt).getTime() : Date.now(),
				sourceId: source.id,
			});
		}
		return items;
	}
	const doc = new DOMParser().parseFromString(trimmed, 'application/xml');
	const rssItems = Array.from(doc.querySelectorAll('item, entry')).slice(0, 50);
	for (const node of rssItems) {
		const get = (selector) => node.querySelector(selector)?.textContent?.trim() ?? '';
		const title = get('title');
		if (!title) continue;
		const link = node.querySelector('link')?.getAttribute('href') || get('link') || source.shopUrl || '';
		const date = get('pubDate') || get('published') || get('updated');
		items.push({
			id: `feed-${hashString(`${source.id}-${link || title}`)}`,
			club: source.club,
			platform: source.platform,
			title,
			tag: '上新',
			startAt: null,
			url: link,
			publishedAt: date ? new Date(date).getTime() : Date.now(),
			sourceId: source.id,
		});
	}
	return items;
}

export class StashStore {
	constructor() {
		this.materials = [];
		this.settings = readSettings();
		this.dbAvailable = true;
		this.memory = new Map();
	}

	async init() {
		try {
			const db = await openDatabase();
			db.close();
			const records = await withStore('readonly', (store) => requestToPromise(store.getAll()));
			this.materials = records || [];
		} catch (error) {
			console.warn('IndexedDB unavailable, using memory storage', error);
			this.dbAvailable = false;
		}
		if (!this.settings.seeded) {
			const existingIds = new Set(this.materials.map((item) => item.id));
			for (const material of SAMPLE_MATERIALS) {
				if (!existingIds.has(material.id)) {
					this.materials.push({ ...material });
					await this.putMaterial(material);
				}
			}
			this.settings.seeded = true;
			this.saveSettings();
		}
		this.materials.sort((a, b) => (b.favorite - a.favorite) || b.createdAt - a.createdAt);
		return this;
	}

	saveSettings() {
		return writeSettings(this.settings);
	}

	async putMaterial(material) {
		if (!this.dbAvailable) {
			this.memory.set(material.id, material);
			return;
		}
		await withStore('readwrite', (store) => store.put(material));
	}

	async addMaterial(material) {
		this.materials.unshift(material);
		await this.putMaterial(material);
		return material;
	}

	async updateMaterial(id, patch) {
		const material = this.materials.find((item) => item.id === id);
		if (!material) return null;
		Object.assign(material, patch, { updatedAt: Date.now() });
		await this.putMaterial(material);
		return material;
	}

	async deleteMaterials(ids) {
		const remove = new Set(ids);
		this.materials = this.materials.filter((item) => !remove.has(item.id));
		if (this.dbAvailable) {
			await withStore('readwrite', (store) => {
				for (const id of remove) store.delete(id);
			});
		} else {
			for (const id of remove) this.memory.delete(id);
		}
	}

	async importFiles(files, categories) {
		const results = [];
		const existingHashes = new Set(this.materials.map((item) => item.hash).filter(Boolean));
		for (const file of files) {
			if (!file.type.startsWith('image/')) continue;
			const raw = await fileToDataURL(file);
			const normalized = await normalizeImage(raw);
			const hash = hashString(normalized.dataUrl);
			if (existingHashes.has(hash)) {
				results.push({ file, duplicate: true });
				continue;
			}
			existingHashes.add(hash);
			const analysis = analyzeImage(normalized.image);
			const material = {
				id: uid('mat'),
				name: file.name.replace(/\.[^.]+$/, '').slice(0, 40) || '未命名素材',
				color: analysis.color,
				colorId: analysis.colorId,
				tone: analysis.tone,
				image: normalized.dataUrl,
				width: normalized.width,
				height: normalized.height,
				qty: 1,
				box: '待收纳',
				boxId: null,
				categories: [],
				favorite: false,
				hash,
				createdAt: Date.now(),
				cutouts: null,
			};
			await this.addMaterial(material);
			results.push({ file, material });
		}
		if (this.materials.length > SAMPLE_MATERIALS.length) {
			const sampleIds = this.materials.filter((item) => item.sample).map((item) => item.id);
			if (sampleIds.length) {
				await this.deleteMaterials(sampleIds);
			}
		}
		return results;
	}

	addCategory(name, color) {
		const category = { id: uid('cat'), name: name.trim().slice(0, 18), color: color || '#8A907E' };
		if (!category.name) return null;
		this.settings.categories.push(category);
		this.saveSettings();
		return category;
	}

	removeCategory(id) {
		this.settings.categories = this.settings.categories.filter((category) => category.id !== id);
		this.saveSettings();
	}

	addBox(box) {
		const item = {
			id: uid('box'),
			name: box.name.trim().slice(0, 24),
			location: String(box.location ?? '').trim().slice(0, 40),
			slots: Math.max(1, Math.min(99, Number(box.slots) || 12)),
			cover: box.cover || '',
			createdAt: Date.now(),
		};
		if (!item.name) return null;
		this.settings.boxes.push(item);
		this.saveSettings();
		return item;
	}

	async updateBox(id, patch) {
		const box = this.settings.boxes.find((item) => item.id === id);
		if (!box) return null;
		Object.assign(box, patch, {
			name: String(patch.name ?? box.name).trim().slice(0, 24),
			location: String(patch.location ?? box.location).trim().slice(0, 40),
			slots: Math.max(1, Math.min(99, Number(patch.slots ?? box.slots) || 12)),
			updatedAt: Date.now(),
		});
		for (const material of this.materials.filter((item) => item.boxId === id)) {
			await this.updateMaterial(material.id, { box: box.name });
		}
		this.saveSettings();
		return box;
	}

	async removeBox(id) {
		this.settings.boxes = this.settings.boxes.filter((box) => box.id !== id);
		for (const material of this.materials.filter((item) => item.boxId === id)) {
			await this.updateMaterial(material.id, { boxId: null, box: '待收纳' });
		}
		this.saveSettings();
	}

	boxCount(id) {
		return this.materials.filter((material) => material.boxId === id).length;
	}

	async assignMaterialToBox(materialId, boxId) {
		const material = this.materials.find((item) => item.id === materialId);
		if (!material) return { ok: false, message: '没有找到这个素材' };
		if (!boxId) {
			await this.updateMaterial(materialId, { boxId: null, box: '待收纳' });
			return { ok: true };
		}
		const box = this.settings.boxes.find((item) => item.id === boxId);
		if (!box) return { ok: false, message: '这个收纳盒已经不存在' };
		if (this.boxCount(box.id) >= box.slots && material.boxId !== box.id) {
			return { ok: false, message: `「${box.name}」已经装满了` };
		}
		await this.updateMaterial(materialId, { boxId: box.id, box: box.name });
		return { ok: true, box };
	}

	addSource(source) {
		const item = { ...source, id: uid('src') };
		this.settings.sources.push(item);
		this.saveSettings();
		return item;
	}

	updateSource(id, patch) {
		const source = this.settings.sources.find((item) => item.id === id);
		if (!source) return;
		Object.assign(source, patch);
		this.saveSettings();
	}

	removeSource(id) {
		this.settings.sources = this.settings.sources.filter((source) => source.id !== id);
		this.saveSettings();
	}

	addManualNews(news) {
		const item = { ...news, id: uid('news'), publishedAt: Date.now(), manual: true };
		this.settings.manualNews.unshift(item);
		this.saveSettings();
		return item;
	}

	async refreshFeeds() {
		const all = [];
		const errors = [];
		await Promise.all(
			this.settings.sources
				.filter((source) => source.feedUrl)
				.map(async (source) => {
					try {
						const response = await fetch(source.feedUrl, { cache: 'no-store', headers: { Accept: 'application/rss+xml, application/atom+xml, application/json, text/xml, */*' } });
						if (!response.ok) throw new Error(`HTTP ${response.status}`);
						const text = await response.text();
						all.push(...parseFeedText(text, source));
					} catch (error) {
						errors.push({ source, message: error.message });
					}
				}),
		);
		this.settings.sources = this.settings.sources.map((source) => ({
			...source,
			lastChecked: all.some((item) => item.sourceId === source.id) ? Date.now() : source.lastChecked,
			lastError: errors.find((entry) => entry.source.id === source.id)?.message ?? '',
		}));
		this.settings.cachedNews = all;
		this.settings.lastNewsRefresh = Date.now();
		this.saveSettings();
		return { items: all, errors };
	}

	allNews(items) {
		const feedNews = Array.isArray(this.settings.cachedNews) ? this.settings.cachedNews : [];
		const samples = this.settings.hideSampleNews ? [] : SAMPLE_NEWS;
		return [...this.settings.manualNews, ...items, ...feedNews, ...samples].sort((a, b) => {
			if (a.sample !== b.sample) return a.sample ? 1 : -1;
			return (b.publishedAt || 0) - (a.publishedAt || 0);
		});
	}

	exportBackup() {
		return {
			version: 2,
			exportedAt: new Date().toISOString(),
			settings: this.settings,
			materials: this.materials,
		};
	}

	async importBackup(data) {
		if (!data || !Array.isArray(data.materials)) throw new Error('备份文件格式不正确');
		if (data.settings && typeof data.settings === 'object') {
			this.settings = { ...DEFAULT_SETTINGS, ...data.settings };
			if (!Array.isArray(this.settings.categories)) this.settings.categories = DEFAULT_SETTINGS.categories;
			if (!Array.isArray(this.settings.sources)) this.settings.sources = [];
			if (!Array.isArray(this.settings.boxes)) this.settings.boxes = [];
			this.saveSettings();
		}
		await this.deleteMaterials(this.materials.map((item) => item.id));
		this.materials = [];
		for (const material of data.materials) {
			if (!material?.id) continue;
			this.materials.push(material);
			await this.putMaterial(material);
		}
		this.materials.sort((a, b) => (b.favorite - a.favorite) || b.createdAt - a.createdAt);
	}
}

export function formatRelativeTime(timestamp) {
	if (!timestamp) return '时间待定';
	const diff = Date.now() - timestamp;
	if (diff < 60_000) return '刚刚';
	if (diff < 3_600_000) return `${Math.max(1, Math.floor(diff / 60_000))} 分钟前`;
	if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} 小时前`;
	if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)} 天前`;
	return new Date(timestamp).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' });
}

export function formatCountdown(timestamp) {
	if (!timestamp) return '';
	const diff = timestamp - Date.now();
	if (diff <= 0) return '已开始';
	const days = Math.floor(diff / 86_400_000);
	const hours = Math.floor((diff % 86_400_000) / 3_600_000);
	if (days > 0) return `${days} 天 ${hours} 小时后`;
	const minutes = Math.floor((diff % 3_600_000) / 60_000);
	return `${hours} 小时 ${minutes} 分后`;
}

export function makeMaterialId() {
	return uid('mat');
}
