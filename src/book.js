// The opening book: a closed knitted journal resting on the felt mat where the yarn ball used to sit.
// Drag the cover (or just click it) and it swings open; the first time it passes the threshold the
// world starts knitting itself in out of the open book.
//
// The book is its own object, deliberately independent from the yarn-ball intro props (those are hidden
// by weave.hideIntroBall): the ball only exists to drive the knit front, the book is what the visitor sees.
import * as THREE from 'three';

const W = 1.16; // cover width (x)
const D = 1.5; // cover depth (z)
const BOARD = 0.055;
const PAGES = 0.1;
const SPINE = 0.2;

function coverTexture() {
	const c = document.createElement('canvas');
	c.width = 512;
	c.height = 660;
	const g = c.getContext('2d');
	g.clearRect(0, 0, c.width, c.height);
	// stitched border
	g.strokeStyle = 'rgba(247,242,232,.55)';
	g.lineWidth = 3;
	g.setLineDash([10, 8]);
	g.strokeRect(26, 26, c.width - 52, c.height - 52);
	g.setLineDash([]);
	g.fillStyle = '#F7F2E8';
	g.textAlign = 'center';
	g.font = '600 96px "Noto Serif SC","Songti SC",serif';
	g.fillText('纸 间', c.width / 2, 190);
	g.font = '300 30px "Noto Sans SC","PingFang SC",sans-serif';
	g.fillStyle = 'rgba(247,242,232,.86)';
	g.fillText('手 账 素 材 库', c.width / 2, 250);
	// a small pressed flower on the cover
	g.strokeStyle = 'rgba(247,242,232,.7)';
	g.lineWidth = 2;
	g.beginPath();
	g.arc(c.width / 2, 420, 26, 0, Math.PI * 2);
	g.stroke();
	for (let i = 0; i < 8; i++) {
		const a = (i / 8) * Math.PI * 2;
		g.beginPath();
		g.ellipse(c.width / 2 + Math.cos(a) * 52, 420 + Math.sin(a) * 52, 13, 7, a, 0, Math.PI * 2);
		g.stroke();
	}
	g.font = '300 24px "Noto Sans SC",sans-serif';
	g.fillStyle = 'rgba(247,242,232,.6)';
	g.fillText('STATIONERY STASH', c.width / 2, 570);
	const tex = new THREE.CanvasTexture(c);
	tex.colorSpace = THREE.SRGBColorSpace;
	tex.anisotropy = 4;
	return tex;
}

export function setupBook({ scene, y, camera, dom, controls, onOpen }) {
	const group = new THREE.Group();
	group.position.set(0, y, 0);
	group.rotation.y = -0.34;
	const BASE_SCALE = 1.35; // reads as a proper book against the felt mat
	group.scale.setScalar(BASE_SCALE);
	scene.add(group);

	const cloth = new THREE.MeshStandardMaterial({ color: '#7C8D74', roughness: 0.92, metalness: 0 });
	const clothDark = new THREE.MeshStandardMaterial({ color: '#68795F', roughness: 0.95, metalness: 0 });
	const paper = new THREE.MeshStandardMaterial({ color: '#F2E8D6', roughness: 0.9, metalness: 0 });
	const paperEdge = new THREE.MeshStandardMaterial({ color: '#DFD2B9', roughness: 0.9, metalness: 0 });
	const ribbonMat = new THREE.MeshStandardMaterial({ color: '#C08D63', roughness: 0.85, metalness: 0 });

	// ---- back board + page block -------------------------------------------------------------
	const back = new THREE.Mesh(new THREE.BoxGeometry(W + 0.07, BOARD, D + 0.07), clothDark);
	back.position.y = BOARD / 2;
	back.castShadow = true;
	back.receiveShadow = true;
	group.add(back);

	const block = new THREE.Mesh(new THREE.BoxGeometry(W, PAGES, D), paper);
	block.position.y = BOARD + PAGES / 2;
	block.castShadow = true;
	block.receiveShadow = true;
	group.add(block);

	// page striping: three thin slabs on the open edge so the block reads as stacked paper
	for (let i = 0; i < 3; i++) {
		const strip = new THREE.Mesh(new THREE.BoxGeometry(0.012, PAGES - 0.012, D - 0.01), paperEdge);
		strip.position.set(W / 2 - 0.012 * (i + 1), BOARD + PAGES / 2, 0);
		group.add(strip);
	}
	const fore = new THREE.Mesh(new THREE.BoxGeometry(0.016, PAGES, D - 0.02), paperEdge);
	fore.position.set(W / 2 + 0.004, BOARD + PAGES / 2, 0);
	group.add(fore);

	// spine along the hinge edge
	const spine = new THREE.Mesh(new THREE.BoxGeometry(0.065, BOARD + PAGES + 0.02, D + 0.07), cloth);
	spine.position.set(-(W + 0.07) / 2 + 0.032, (BOARD + PAGES) / 2, 0);
	spine.castShadow = true;
	group.add(spine);

	// ---- cover, hinged on the spine -----------------------------------------------------------
	const hingeX = -(W + 0.07) / 2;
	const coverPivot = new THREE.Group();
	coverPivot.position.set(hingeX, BOARD + PAGES, 0);
	group.add(coverPivot);

	const cover = new THREE.Mesh(new THREE.BoxGeometry(W + 0.07, 0.05, D + 0.07), cloth);
	cover.position.set((W + 0.07) / 2, 0.025, 0);
	cover.castShadow = true;
	cover.receiveShadow = true;
	coverPivot.add(cover);

	const title = new THREE.Mesh(
		new THREE.PlaneGeometry(W * 0.92, D * 0.92),
		new THREE.MeshStandardMaterial({ map: coverTexture(), transparent: true, roughness: 0.85 }),
	);
	title.rotation.x = -Math.PI / 2;
	title.position.set((W + 0.07) / 2, 0.052, 0);
	coverPivot.add(title);

	// ribbon bookmark, sticking out from under the pages
	const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.012, 0.62), ribbonMat);
	ribbon.position.set(0.16, BOARD + 0.02, D / 2 + 0.24);
	ribbon.rotation.x = -0.06;
	group.add(ribbon);

	// invisible pick box so the whole closed book is easy to grab
	const hit = new THREE.Mesh(
		new THREE.BoxGeometry(W + 0.3, BOARD + PAGES + 0.28, D + 0.35),
		new THREE.MeshBasicMaterial({ visible: false }),
	);
	hit.position.y = (BOARD + PAGES) / 2 + 0.06;
	group.add(hit);

	// three-mesh-bvh patches Mesh.raycast globally; give our meshes their bounding trees
	group.traverse((o) => {
		if (o.isMesh && o.geometry && !o.geometry.boundsTree) o.geometry.computeBoundsTree?.();
	});

	// ---- state -------------------------------------------------------------------------------
	let target = 0; // 0 closed, 1 open
	let progress = 0;
	let fired = false;
	let dragging = null;
	let doneT = -1;
	let removed = false;

	const OPEN_ANGLE = -1.98;
	const raycaster = new THREE.Raycaster();
	const ndc = new THREE.Vector2();
	const hitPoint = new THREE.Vector3();

	function setRay(ev) {
		const r = dom.getBoundingClientRect();
		ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
		raycaster.setFromCamera(ndc, camera);
	}
	function overBook(ev) {
		setRay(ev);
		return raycaster.intersectObject(hit, false).length > 0;
	}

	dom.addEventListener('pointerdown', (ev) => {
		if (fired || ev.button !== 0) return;
		if (!overBook(ev)) return;
		dragging = { x: ev.clientX, y: ev.clientY, p: progress, moved: 0 };
		controls.enabled = false;
		dom.setPointerCapture?.(ev.pointerId);
		dom.style.cursor = 'grabbing';
	});
	dom.addEventListener('pointermove', (ev) => {
		if (!dragging) {
			if (!fired) dom.style.cursor = overBook(ev) ? 'grab' : '';
			return;
		}
		const dx = ev.clientX - dragging.x;
		const dy = ev.clientY - dragging.y;
		dragging.moved = Math.max(dragging.moved, Math.hypot(dx, dy));
		// drag up or to the right: either reads as "lifting the cover"
		const pull = Math.max(dx, 0) + Math.max(-dy, 0);
		progress = dragging.p + Math.min(1, pull / 180);
		target = progress > 0.22 ? 1 : 0;
	});
	const endDrag = () => {
		if (!dragging) return;
		controls.enabled = true;
		dom.style.cursor = fired ? '' : 'grab';
		// a plain click (no real drag) also opens the book
		if (dragging.moved < 10 && progress < 0.2) target = 1;
		dragging = null;
	};
	dom.addEventListener('pointerup', endDrag);
	dom.addEventListener('pointercancel', endDrag);

	// small nudge so the visitor knows the book is alive
	let breath = 0;

	function update(dt, busy) {
		breath += dt;
		if (!dragging && Math.abs(target - progress) > 0.001) {
			progress += (target - progress) * Math.min(1, dt * 7);
		}
		if (Math.abs(target - progress) <= 0.001) progress = target;
		const e = progress < 0.5 ? 2 * progress * progress : 1 - 2 * (1 - progress) * (1 - progress);
		coverPivot.rotation.z = OPEN_ANGLE * e;
		// the pages lift a touch with the cover, and the whole book settles back down when open
		const settle = Math.sin(e * Math.PI) * 0.012;
		group.position.y = y + settle + (fired ? 0 : Math.sin(breath * 1.1) * 0.004);

		if (!fired && progress > 0.55) {
			fired = true;
			dom.style.cursor = '';
			// the cover's edge lands on the mat with a soft thud (sound is optional in this build)
			onOpen?.();
		}

		// once the island has finished knitting in, the book folds away under it
		if (fired && !busy && doneT < 0) doneT = 0;
		if (doneT >= 0 && !removed) {
			doneT += dt;
			const k = Math.max(0, 1 - doneT / 0.9);
			group.scale.setScalar(Math.max(0.0001, BASE_SCALE * k));
			group.position.y = y - (1 - k) * 0.35;
			if (k <= 0.001) {
				group.visible = false;
				removed = true;
			}
		}
	}

	// point + direction for the DOM guide ("翻开这本书")
	const hintPoint = new THREE.Vector3();
	const hintDir = new THREE.Vector3(0, 0, 1);
	const hint = { kind: 'start', point: hintPoint, dir: hintDir };

	return {
		group,
		update,
		open: () => {
			target = 1;
		},
		get opened() {
			return fired;
		},
		// guide hint while the book is still closed
		get hint() {
			if (fired) return null;
			group.updateMatrixWorld();
			group.localToWorld(hintPoint.set(0, 0.1, 0));
			return hint;
		},
		hitPoint,
	};
}
