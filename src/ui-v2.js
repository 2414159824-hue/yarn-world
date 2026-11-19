import {
	COLOR_GROUPS,
	PLATFORM_META,
	SAMPLE_NEWS,
	StashStore,
	createCutouts,
	formatCountdown,
	formatRelativeTime,
	imageFileToDataUrl,
} from './stash-data.js';

const CSS = `
:root{
  --paper:#F6F2EA;--card:#FFFCF7;--ink:#2E3230;--ink-soft:#5B615C;--muted:#8E9188;
  --line:#E3DDD1;--sage:#6E7F6A;--sage-soft:#E6EBE2;--clay:#BE7D62;--red:#C8574E;
}
#zw-ui{position:fixed;inset:0;z-index:20;pointer-events:none;font-family:"Noto Sans SC","PingFang SC","Microsoft YaHei",system-ui,sans-serif;color:var(--ink)}
#zw-ui *{box-sizing:border-box}
#zw-ui button,#zw-ui input,#zw-ui select,#zw-ui textarea{font:inherit}
#zw-ui .panel{pointer-events:auto}
#zw-ui .zw-hidden{display:none!important}

#zw-brand{position:absolute;left:22px;top:18px;display:flex;align-items:center;gap:10px;opacity:0;transition:opacity .6s ease;pointer-events:none}
#zw-brand.on{opacity:1}
#zw-brand .mark{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(150deg,#8FA085,#68795F);color:#F7F4ED;font:600 15px "Noto Serif SC",serif;box-shadow:0 8px 18px -10px rgba(58,72,55,.9)}
#zw-brand b{display:block;font:600 15px "Noto Serif SC",serif;letter-spacing:.14em}
#zw-brand span{display:block;font-size:10px;letter-spacing:.22em;color:#8a8272;margin-top:1px}

#zw-quicknav{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);display:flex;gap:6px;padding:5px;background:rgba(255,252,247,.93);border:1px solid rgba(227,221,209,.94);border-radius:16px;box-shadow:0 16px 36px -24px rgba(42,36,26,.72);backdrop-filter:blur(10px);pointer-events:auto;opacity:0;transition:opacity .35s}
#zw-quicknav.on{opacity:1}
#zw-quicknav button{height:34px;border:0;border-radius:11px;background:transparent;padding:0 12px;display:flex;align-items:center;gap:6px;font-size:11.5px;color:#6B7069;cursor:pointer;white-space:nowrap}
#zw-quicknav button:hover,#zw-quicknav button.on{background:var(--sage-soft);color:#465541}
#zw-quicknav svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}

#zw-drawer{position:absolute;right:0;top:0;bottom:0;width:474px;max-width:96vw;background:var(--card);border-left:1px solid var(--line);box-shadow:-24px 0 60px -40px rgba(40,34,24,.65);transform:translateX(102%);transition:transform .42s cubic-bezier(.2,.8,.25,1);display:flex;flex-direction:column;pointer-events:auto}
#zw-drawer.on{transform:none}
.drawer-hd{display:flex;align-items:flex-start;gap:12px;padding:22px 22px 14px;border-bottom:1px solid var(--line)}
.drawer-hd .kick{font-size:10px;letter-spacing:.22em;color:#B69A63;margin-bottom:3px}
.drawer-hd h2{font:600 20px "Noto Serif SC",serif;letter-spacing:.02em;margin:0}
.drawer-hd .sub{font-size:11.5px;color:var(--muted);margin-top:5px;line-height:1.5}
.drawer-x,.round-x{margin-left:auto;width:30px;height:30px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;font-size:15px;color:var(--ink-soft);background:var(--card);cursor:pointer;flex:none}
.drawer-x:hover,.round-x:hover{background:var(--sage-soft);border-color:#CFD9C7}
.drawer-bd{padding:16px 22px 28px;overflow:auto;flex:1;scrollbar-width:thin;scrollbar-color:#CFC8BB transparent}
.drawer-ft{padding:11px 22px 16px;border-top:1px solid var(--line);font-size:10.5px;color:var(--muted);line-height:1.55}

.toolbar{display:flex;gap:8px;align-items:center;margin-bottom:14px}
.search{position:relative;flex:1}
.search input{width:100%;height:36px;border-radius:11px;border:1px solid var(--line);background:#FFFEFB;padding:0 12px 0 34px;outline:none;font-size:11.5px;color:var(--ink)}
.search input:focus{border-color:#A9B7A0;box-shadow:0 0 0 3px rgba(122,143,111,.12)}
.search svg{position:absolute;left:11px;top:10px;width:15px;height:15px;stroke:#8C9087;fill:none;stroke-width:1.8}
.btn{height:34px;border-radius:10px;border:1px solid var(--line);background:#FFFEFB;padding:0 12px;font-size:11px;color:var(--ink-soft);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:5px;text-decoration:none}
.btn:hover{border-color:#CAD3C2;background:#FAF9F3}
.btn.primary,.btn.sage{background:var(--sage);border-color:var(--sage);color:#FBF9F4}
.btn.clay{background:var(--clay);border-color:var(--clay);color:white}
.btn.ghost{background:transparent}
.btn.danger{color:#A45F4C;border-color:#E9CFC5;background:#FCF4F0}
.btn.small{height:29px;padding:0 9px;font-size:10px}
.btn.icon{width:34px;padding:0}

.chip-row{display:flex;gap:7px;overflow:auto;padding-bottom:2px;margin-bottom:10px;scrollbar-width:none}
.chip-row::-webkit-scrollbar{display:none}
.chip{flex:none;height:28px;padding:0 11px;border-radius:999px;border:1px solid var(--line);background:var(--card);font-size:10.5px;color:var(--ink-soft);cursor:pointer;display:inline-flex;align-items:center;gap:5px}
.chip:hover{border-color:#C7CFBF}
.chip.on{background:var(--ink);border-color:var(--ink);color:#F8F5EE}
.chip .dot{width:8px;height:8px;border-radius:50%;background:currentColor}
.chip.add{border-style:dashed;color:#77836D}

.panel-note{font-size:10.5px;color:var(--muted);line-height:1.65;margin:0 0 13px}
.section-label{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.13em;color:#8C8A7E;margin:14px 0 8px}
.section-label::after{content:"";height:1px;flex:1;background:var(--line)}

.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px}
.stat{border:1px solid var(--line);border-radius:13px;background:#FFFEFB;padding:11px}
.stat b{display:block;font:600 18px "Noto Serif SC",serif}
.stat span{display:block;font-size:9.5px;color:var(--muted);margin-top:3px}
.storage-bar{height:6px;border-radius:99px;background:#EEE9DF;overflow:hidden;margin:8px 0 5px}
.storage-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#9EB096,#6E7F6A)}
.category-list{display:grid;gap:7px}
.category-row{display:flex;align-items:center;gap:10px;padding:9px 10px;border:1px solid var(--line);border-radius:11px;background:#FFFEFB;font-size:11.5px}
.category-row .sw{width:13px;height:13px;border-radius:50%;flex:none;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
.category-row span{flex:1}
.category-row em{font-style:normal;font-size:10px;color:var(--muted)}
.mini-x{border:0;background:transparent;color:#AA9588;font-size:14px;cursor:pointer;padding:2px 4px}

.box-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:5px}
.storage-box{position:relative;border:1px solid var(--line);border-radius:14px;background:#FFFEFB;overflow:hidden;cursor:pointer;transition:.18s;min-width:0}
.storage-box:hover{border-color:#C5CFBE;transform:translateY(-1px);box-shadow:0 12px 24px -22px rgba(52,45,33,.65)}
.storage-box.drag-over{border-color:var(--sage);box-shadow:0 0 0 3px rgba(110,127,106,.17);transform:translateY(-2px)}
.storage-box.full{opacity:.78}
.storage-box .box-cover{height:108px;background:#EFEAE1;position:relative;overflow:hidden}
.storage-box .box-cover img{width:100%;height:100%;object-fit:cover;display:block}
.storage-box .box-cover .empty-cover{height:100%;display:grid;place-items:center;text-align:center;font-size:9px;color:#9A9D92;line-height:1.55;background:
  repeating-linear-gradient(45deg,rgba(120,112,96,.035) 0 8px,transparent 8px 16px),#F5F1E9}
.storage-box .cover-count{position:absolute;right:7px;top:7px;border-radius:99px;background:rgba(46,50,48,.76);color:white;padding:2px 7px;font-size:8.5px;backdrop-filter:blur(4px)}
.storage-box .box-info{padding:9px 10px 10px}
.storage-box .box-info b{display:block;font:600 12px "Noto Serif SC",serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.storage-box .box-info small{display:block;font-size:9px;color:var(--muted);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.storage-box .box-capacity{height:4px;border-radius:99px;background:#EFEAE0;overflow:hidden;margin-top:7px}
.storage-box .box-capacity i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#A6B59C,#6E7F6A)}
.box-edit{position:absolute;right:6px;bottom:6px;width:22px;height:22px;border-radius:7px;border:1px solid rgba(255,255,255,.55);background:rgba(46,50,48,.7);color:white;display:grid;place-items:center;font-size:10px;cursor:pointer;backdrop-filter:blur(4px)}
.box-add-card{min-height:175px;border:1px dashed #CFC8BB;border-radius:14px;background:#FCFAF5;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#74806D;cursor:pointer;font-size:10.5px}
.box-add-card:hover{border-color:var(--sage);background:#F3F6EE}
.box-add-card b{font-size:24px;font-weight:300;line-height:1}
.storage-hint{display:flex;align-items:center;gap:6px;border-radius:10px;background:var(--sage-soft);border:1px solid #D7E0CF;padding:8px 10px;margin:9px 0;font-size:10px;color:#596753;line-height:1.5}
.storage-hint b{font-weight:600}
.pending-strip{display:flex;gap:8px;overflow:auto;padding:2px 1px 6px;scrollbar-width:thin}
.pending-material{position:relative;width:82px;flex:none;border:1px solid var(--line);border-radius:10px;background:#FFFEFB;padding:5px;cursor:grab;user-select:none;transition:.15s}
.pending-material:hover,.pending-material.picked{border-color:#94A78B;box-shadow:0 0 0 2px rgba(110,127,106,.13);transform:translateY(-1px)}
.pending-material:active{cursor:grabbing}
.pending-material .thumb{height:50px;border-radius:6px;overflow:hidden;background:#F1ECE3}
.pending-material .thumb img{width:100%;height:100%;object-fit:cover;pointer-events:none}
.pending-material .tone-strip{height:50px;border-radius:6px;display:flex;overflow:hidden}
.pending-material .tone-strip i{flex:1}
.pending-material b{display:block;margin-top:4px;font-size:8.5px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pending-material small{display:block;font-size:7.8px;color:var(--muted);margin-top:1px}
.box-detail-cover{height:190px;border-radius:13px;overflow:hidden;border:1px solid var(--line);background:#F1ECE3;margin-bottom:12px}
.box-detail-cover img{width:100%;height:100%;object-fit:cover;display:block}
.box-detail-meta{display:flex;align-items:center;gap:10px;margin-bottom:12px;font-size:10.5px;color:var(--muted)}
.box-detail-meta b{font:600 15px "Noto Serif SC",serif;color:var(--ink)}
.box-detail-meta .grow{flex:1}
.box-material-row{display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px dashed var(--line);font-size:10.5px}
.box-material-row img,.box-material-row .tone-strip{width:42px;height:42px;border-radius:8px;object-fit:cover;flex:none}
.box-material-row .tone-strip{display:flex;overflow:hidden}
.box-material-row .tone-strip i{flex:1}
.box-material-row .txt{flex:1;min-width:0}
.box-material-row b{display:block;font-size:10.5px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.box-material-row small{display:block;font-size:9px;color:var(--muted);margin-top:2px}
.cover-editor{display:grid;grid-template-columns:130px 1fr;gap:12px;align-items:center;margin-bottom:12px}
.cover-preview{height:110px;border:1px dashed #CFC8BB;border-radius:12px;background:#F5F1E9;overflow:hidden;display:grid;place-items:center;color:#999B91;font-size:9.5px;text-align:center;line-height:1.55}
.cover-preview img{width:100%;height:100%;object-fit:cover}
.cover-copy b{display:block;font:600 12px "Noto Serif SC",serif;margin-bottom:5px}
.cover-copy p{font-size:9.5px;color:var(--muted);line-height:1.65;margin:0 0 8px}

.mat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.mat-card{position:relative;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#FFFEFB;cursor:pointer;transition:.15s;min-width:0}
.mat-card:hover{transform:translateY(-1px);border-color:#CED6C6;box-shadow:0 12px 24px -22px rgba(52,45,33,.65)}
.mat-card.on{border-color:#8FA085;box-shadow:0 0 0 2px rgba(143,160,133,.35)}
.mat-card .visual{height:105px;position:relative;background:#F3EEE5;overflow:hidden}
.mat-card .visual img{width:100%;height:100%;object-fit:cover;display:block}
.mat-card .tone-strip{height:100%;display:flex}
.mat-card .tone-strip i{flex:1}
.mat-card .color-tag{position:absolute;left:7px;bottom:7px;border-radius:99px;padding:2px 7px;background:rgba(255,252,247,.9);font-size:8.5px;color:#56614F;backdrop-filter:blur(5px);box-shadow:0 1px 4px rgba(0,0,0,.08)}
.mat-card .favorite{position:absolute;right:7px;top:7px;width:22px;height:22px;border-radius:50%;border:0;background:rgba(255,252,247,.9);color:#B97367;display:grid;place-items:center;font-size:12px;cursor:pointer}
.mat-card .mat-meta{padding:9px 10px 10px}
.mat-card b{display:block;font:600 12px "Noto Serif SC",serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mat-card small{display:block;font-size:9.5px;color:var(--muted);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mat-card .cat-mini{display:flex;gap:4px;flex-wrap:wrap;margin-top:5px}
.mat-card .cat-mini span{font-size:8.5px;border-radius:99px;background:#F1F3EB;color:#65715E;padding:1px 6px}
.mat-card .select-dot{position:absolute;right:8px;top:8px;width:20px;height:20px;border-radius:50%;border:1.5px solid #D8D2C4;background:rgba(255,255,255,.92);display:grid;place-items:center;font-size:10px;color:white}
.mat-card.on .select-dot{background:var(--sage);border-color:var(--sage)}
.mat-card .sample-badge{position:absolute;left:7px;top:7px;background:rgba(62,70,60,.72);color:#fff;border-radius:99px;padding:1px 6px;font-size:8px}
.empty-state{border:1px dashed #D8D2C4;border-radius:14px;padding:24px 15px;text-align:center;color:var(--muted);font-size:11.5px;line-height:1.7;background:rgba(255,255,255,.5)}
.empty-state b{display:block;font-size:23px;font-weight:400;color:#B7BBAD;margin-bottom:6px}
.selection-bar{display:flex;align-items:center;gap:8px;background:var(--sage-soft);border:1px solid #D7E0CF;border-radius:11px;padding:8px 10px;margin-bottom:11px;font-size:10.5px;color:#55654F}
.selection-bar button{margin-left:auto}

.import-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:13px}
.import-btn{min-height:76px;border-radius:16px;border:1px solid #D8DFD2;background:linear-gradient(160deg,#EFF3EA,#E1E8DA);color:#4A5643;cursor:pointer;display:grid;place-items:center;gap:3px;font-size:12.5px;font-weight:500;transition:.2s}
.import-btn:hover{border-color:#B9C8AC;transform:translateY(-1px)}
.import-btn small{font-weight:400;font-size:9.5px;color:#7C8874}
.import-btn.ghost{background:var(--card);border-color:var(--line);color:var(--ink-soft)}
.drop-zone{border:1px dashed #CFC8BB;border-radius:15px;min-height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px;background:#FCFAF5;transition:.2s}
.drop-zone.drag{border-color:var(--sage);background:var(--sage-soft)}
.drop-zone .plus{font-size:28px;color:#A8AF9F;line-height:1;margin-bottom:8px}
.drop-zone b{font:600 12.5px "Noto Serif SC",serif}
.drop-zone span{font-size:10.5px;color:var(--muted);line-height:1.65;margin-top:5px}
.import-list{display:grid;gap:7px;margin-top:12px}
.import-row{display:flex;align-items:center;gap:9px;border:1px solid var(--line);border-radius:10px;padding:7px;background:#FFFEFB}
.import-row img,.import-swatch{width:40px;height:40px;border-radius:8px;object-fit:cover;flex:none}
.import-row .txt{flex:1;min-width:0}
.import-row b{display:block;font-size:10.5px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.import-row small{display:block;font-size:9px;color:var(--muted);margin-top:2px}
.import-row em{font-style:normal;font-size:9px;color:#6F7D67}

.banner{display:flex;align-items:flex-start;gap:8px;border-radius:12px;background:#F7EFE3;border:1px solid #EBDCC6;padding:9px 11px;font-size:10.5px;color:#7C6440;line-height:1.6;margin-bottom:12px}
.banner i{width:7px;height:7px;border-radius:50%;background:#D8493C;flex:none;margin-top:5px}
.news-row{display:flex;gap:10px;padding:11px 0;border-bottom:1px dashed var(--line);align-items:flex-start}
.news-row:last-child{border-bottom:0}
.news-dot{width:34px;height:34px;border-radius:10px;flex:none;display:grid;place-items:center;font:600 11px "Noto Serif SC",serif;color:#55654F;background:linear-gradient(150deg,#EDF1E8,#DCE4D6);border:1px solid #D2DCC9;position:relative}
.news-dot.fresh::after{content:"";position:absolute;right:-3px;top:-3px;width:7px;height:7px;border-radius:50%;background:#D8493C;box-shadow:0 0 0 2px #FFFCF7}
.news-main{flex:1;min-width:0}
.news-shop{font-size:9.5px;color:var(--muted);display:flex;align-items:center;gap:5px}
.news-shop em{font-style:normal;border:1px solid var(--line);border-radius:99px;padding:0 5px;font-size:8px;color:#7B7A70}
.news-title{display:block;font-size:12px;line-height:1.55;margin-top:3px;color:var(--ink);text-decoration:none}
a.news-title:hover{color:#6E7F6A;text-decoration:underline}
.news-bottom{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:6px}
.news-tag{display:inline-block;font-size:8.5px;border-radius:99px;padding:1px 6px;border:1px solid #E4D3BF;color:#8A6A44;background:#F7EFE3}
.news-start{font-size:8.5px;color:#A25D4D;background:#FCF1ED;border-radius:99px;padding:1px 6px}
.news-time{margin-left:auto;font-size:9px;color:var(--muted);white-space:nowrap;padding-top:3px}
.source-row{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px dashed var(--line);font-size:10.5px}
.source-row:last-child{border-bottom:0}
.source-row b{font-weight:500}
.source-row small{display:block;font-size:9px;color:var(--muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:260px}
.source-status{margin-left:auto;font-size:8.5px;padding:2px 6px;border-radius:99px;background:var(--sage-soft);color:#60705B}
.source-status.err{background:#FCF0EB;color:#A3614C}

.ai-note{font-size:10.5px;color:var(--muted);line-height:1.7;margin-bottom:12px}
.pair{border:1px solid var(--line);border-radius:14px;padding:13px;margin-bottom:10px;background:#FFFEFB}
.pair .kick{font-size:9px;letter-spacing:.16em;color:#B69A63}
.pair h3{font:600 13.5px "Noto Serif SC",serif;margin:4px 0 9px;line-height:1.45}
.pair .dots{display:flex;gap:7px;margin-bottom:9px}
.pair .dots i{width:29px;height:29px;border-radius:50%;border:2px solid #FFFCF7;box-shadow:0 0 0 1px var(--line)}
.pair p{font-size:10.5px;line-height:1.7;color:#6B7268;margin:0}

.overlay{position:absolute;inset:0;background:rgba(38,34,28,.36);display:grid;place-items:center;pointer-events:auto;backdrop-filter:blur(3px);opacity:0;transition:opacity .2s;padding:20px}
.overlay.on{opacity:1}
.modal{width:min(650px,95vw);max-height:min(86vh,850px);background:var(--card);border-radius:19px;border:1px solid var(--line);box-shadow:0 40px 90px -50px rgba(30,26,18,.9);overflow:hidden;display:flex;flex-direction:column}
.modal-hd{display:flex;align-items:flex-start;gap:12px;padding:16px 18px 12px;border-bottom:1px solid var(--line)}
.modal-hd b{font:600 17px "Noto Serif SC",serif}
.modal-hd span{display:block;font-size:10.5px;color:var(--muted);margin-top:4px;line-height:1.55}
.modal-bd{padding:15px 18px;overflow:auto}
.modal-ft{display:flex;gap:8px;align-items:center;padding:12px 18px 15px;border-top:1px solid var(--line)}
.modal-ft .grow{flex:1}
.field{display:grid;gap:5px;margin-bottom:10px}
.field label{font-size:9.5px;color:#777A71}
.field input,.field select,.field textarea{width:100%;height:35px;border-radius:9px;border:1px solid var(--line);background:#FFFEFB;padding:0 10px;outline:none;font-size:11px;color:var(--ink)}
.field textarea{height:70px;padding-top:8px;resize:vertical}
.field input:focus,.field select:focus,.field textarea:focus{border-color:#A9B7A0;box-shadow:0 0 0 3px rgba(122,143,111,.1)}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.check-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.check{display:flex;align-items:center;gap:6px;padding:7px 8px;border:1px solid var(--line);border-radius:9px;background:#FFFEFB;font-size:10px;cursor:pointer}
.check input{accent-color:var(--sage);width:13px;height:13px}
.detail-visual{height:180px;border-radius:13px;overflow:hidden;background:#F2EDE3;border:1px solid var(--line);margin-bottom:12px}
.detail-visual img{width:100%;height:100%;object-fit:contain;display:block}
.detail-visual .tone-strip{height:100%;display:flex}
.detail-visual .tone-strip i{flex:1}
.subtle{font-size:9.5px;color:var(--muted);line-height:1.6}

.cut-layout{display:grid;grid-template-columns:210px 1fr;gap:14px;min-height:280px}
.cut-preview{border:1px solid var(--line);border-radius:12px;background:
  linear-gradient(45deg,#EEE9DF 25%,transparent 25%,transparent 75%,#EEE9DF 75%),
  linear-gradient(45deg,#EEE9DF 25%,#FAF7F0 25%,#FAF7F0 75%,#EEE9DF 75%);
  background-size:14px 14px;background-position:0 0,7px 7px;overflow:hidden;display:grid;place-items:center;padding:8px}
.cut-preview img{max-width:100%;max-height:270px;object-fit:contain;filter:drop-shadow(0 5px 7px rgba(40,30,20,.14))}
.cut-pieces{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;align-content:start;max-height:330px;overflow:auto}
.cut-piece{border:1px solid var(--line);border-radius:10px;padding:6px;background:#FBF8F1;text-align:center;cursor:pointer}
.cut-piece:hover,.cut-piece.on{border-color:#98AB8F;background:#F1F5EB}
.cut-piece img{width:100%;height:72px;object-fit:contain;display:block}
.cut-piece span{display:block;font-size:8.5px;color:#73766E;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.range-line{display:flex;align-items:center;gap:9px;margin:10px 0 12px;font-size:9.5px;color:var(--muted)}
.range-line input{flex:1;accent-color:var(--sage)}

#zw-collage{position:absolute;inset:0;background:rgba(37,32,25,.46);display:grid;place-items:center;pointer-events:auto;backdrop-filter:blur(4px);padding:16px;opacity:0;transition:opacity .22s}
#zw-collage.on{opacity:1}
.collage-card{width:min(1120px,97vw);height:min(820px,93vh);background:var(--card);border:1px solid var(--line);border-radius:20px;overflow:hidden;box-shadow:0 40px 100px -45px rgba(25,20,14,.95);display:flex;flex-direction:column}
.collage-hd{height:54px;flex:none;display:flex;align-items:center;gap:10px;padding:0 15px;border-bottom:1px solid var(--line)}
.collage-hd b{font:600 15px "Noto Serif SC",serif;white-space:nowrap}
.collage-hd .tip{font-size:9.5px;color:var(--muted);white-space:nowrap}
.collage-hd .grow{flex:1}
.collage-body{flex:1;display:grid;grid-template-columns:minmax(0,1fr) 220px;min-height:0}
.collage-stage{display:grid;place-items:center;background:#EFEAE1;padding:22px;min-height:0;overflow:hidden}
.collage-paper{position:relative;height:100%;max-height:690px;aspect-ratio:3/4;max-width:100%;background:
  repeating-linear-gradient(0deg,rgba(90,83,68,.035) 0 1px,transparent 1px 24px),
  linear-gradient(#FFFDF8,#FDFAF2);
  border:1px solid #E0DACD;box-shadow:0 18px 34px -23px rgba(49,42,29,.65);overflow:hidden;touch-action:none}
.collage-paper::after{content:"";position:absolute;inset:8px;border:1px dashed rgba(129,119,98,.2);pointer-events:none}
.collage-piece{position:absolute;user-select:none;cursor:grab;transform-origin:center;filter:drop-shadow(0 5px 5px rgba(52,43,31,.12));touch-action:none}
.collage-piece.dragging{cursor:grabbing}
.collage-piece.selected{outline:1px solid rgba(102,122,94,.8);outline-offset:4px}
.collage-piece.selected::after{content:"";position:absolute;inset:-7px;border:1px dashed rgba(101,119,94,.65);border-radius:4px;pointer-events:none}
.collage-piece img{display:block;width:100%;height:100%;object-fit:contain;pointer-events:none}
.collage-piece .tone-tile{width:100%;height:100%;border-radius:3px;display:flex;overflow:hidden}
.collage-piece .tone-tile i{flex:1}
.collage-empty{position:absolute;inset:0;display:grid;place-items:center;text-align:center;color:#9B9A8E;font-size:11px;line-height:1.7;padding:30px;pointer-events:none}
.collage-tray{border-left:1px solid var(--line);background:#FBF8F1;display:flex;flex-direction:column;min-height:0}
.tray-hd{padding:11px 12px 8px;font-size:10px;letter-spacing:.1em;color:#77796F;border-bottom:1px solid var(--line)}
.tray-list{overflow:auto;padding:9px;display:grid;grid-template-columns:1fr 1fr;gap:7px;align-content:start;flex:1}
.tray-item{border:1px solid var(--line);border-radius:9px;background:#FFFEFB;padding:5px;cursor:pointer;min-width:0}
.tray-item:hover{border-color:#9EAE96}
.tray-item img{width:100%;height:52px;object-fit:contain;display:block;background:#F4F0E8;border-radius:6px}
.tray-item .tone-strip{height:52px;border-radius:6px;display:flex;overflow:hidden}
.tray-item .tone-strip i{flex:1}
.tray-item span{display:block;font-size:8px;color:#74766E;margin-top:3px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tray-actions{padding:8px 10px 10px;border-top:1px solid var(--line);display:grid;gap:6px}
.selected-tools{height:42px;flex:none;display:flex;align-items:center;gap:6px;padding:0 13px;border-top:1px solid var(--line);font-size:9.5px;color:var(--muted)}
.selected-tools input[type=range]{width:90px;accent-color:var(--sage)}
.selected-tools .grow{flex:1}

#zw-toast{position:absolute;left:50%;bottom:82px;transform:translate(-50%,10px);background:rgba(46,50,48,.94);color:#F8F5EE;font-size:11.5px;padding:9px 16px;border-radius:999px;opacity:0;transition:.3s;pointer-events:none;max-width:min(80vw,520px);text-align:center;line-height:1.45;z-index:8}
#zw-toast.on{opacity:1;transform:translate(-50%,0)}

@media (max-width:760px){
  #zw-brand{left:14px;top:12px}
  #zw-brand .mark{width:30px;height:30px}
  #zw-brand b{font-size:13px}
  #zw-brand span{font-size:8px}
  #zw-drawer{width:100%;max-width:100%;top:0;border-left:0}
  .drawer-hd{padding:17px 16px 12px}
  .drawer-bd{padding:14px 16px 24px}
  .drawer-ft{padding:9px 16px 13px}
  #zw-quicknav{width:calc(100% - 20px);bottom:10px;justify-content:space-between;padding:4px;gap:2px}
  #zw-quicknav button{padding:0 7px;font-size:9.5px;gap:4px;flex:1;justify-content:center}
  #zw-quicknav button svg{width:14px}
  .mat-card .visual{height:92px}
  .overlay{padding:10px;align-items:end}
  .modal{width:100%;max-height:90vh;border-radius:17px 17px 12px 12px}
  .cut-layout{grid-template-columns:1fr}
  .cut-preview{min-height:180px}
  .cut-preview img{max-height:190px}
  .cut-pieces{grid-template-columns:repeat(4,1fr);max-height:200px}
  .collage-card{width:100%;height:calc(100vh - 20px);border-radius:16px}
  .collage-body{grid-template-columns:1fr;grid-template-rows:minmax(0,1fr) 150px}
  .collage-stage{padding:10px}
  .collage-tray{border-left:0;border-top:1px solid var(--line)}
  .tray-list{grid-template-columns:repeat(5,1fr);padding:6px}
  .tray-item img,.tray-item .tone-strip{height:38px}
  .tray-hd,.tray-actions{display:none}
  .collage-hd .tip{display:none}
  .selected-tools{padding:0 8px;font-size:0}
  .selected-tools span{font-size:9px}
  .selected-tools input[type=range]{width:65px}
}
`;

const ICONS = {
	archive: '<svg viewBox="0 0 24 24"><path d="M4 7h16v13H4zM3 4h18v3H3zM9 11h6"/></svg>',
	sheep: '<svg viewBox="0 0 24 24"><path d="M7 16a4 4 0 0 1-1-7.9A4.2 4.2 0 0 1 13 6a4 4 0 0 1 6 4.5A3.8 3.8 0 0 1 17 17H7z"/><path d="M8 17v3M16 17v3M10 11h.01M15 11h.01"/></svg>',
	camera: '<svg viewBox="0 0 24 24"><path d="M4 7h3l1.5-2h7L17 7h3v12H4z"/><circle cx="12" cy="13" r="3.4"/></svg>',
	news: '<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg>',
	collage: '<svg viewBox="0 0 24 24"><path d="m4 18 5-5 3 3 4-5 4 7H4z"/><circle cx="8" cy="7" r="2"/><path d="M4 4h16v16H4z"/></svg>',
	search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>',
};

const COPY = {
	house: ['素材收纳', '创建你的收纳盒，贴上相册封面，再把素材拖进去', '桌面端直接拖动素材；手机端先点素材，再点目标盒子'],
	sheep: ['我的素材', '搜索、筛选、批量整理，或把素材送进拼贴工坊', '点击素材可改名、分类、收藏或抠图；支持批量放进拼贴篮子'],
	camera: ['素材录入', '一次选择多张照片，自动识别主色并建立素材卡', '建议使用纯白或浅色背景拍摄；识别结果仍可在素材详情中手动修正'],
	news: ['社团上新', '订阅社团公开 Feed / JSON，集中查看上新、开团和活动时间', '平台页面通常限制跨站读取，建议配置 RSSHub、博客或自建中转地址'],
	ai: ['素材搭配', '按当前素材库的颜色结构，快速找到可用的拼贴组合', '这里提供的是离线配色建议，不会上传你的素材'],
};

function el(tag, className, html) {
	const node = document.createElement(tag);
	if (className) node.className = className;
	if (html != null) node.innerHTML = html;
	return node;
}

function esc(value) {
	return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function colorMeta(name) {
	return COLOR_GROUPS.find((group) => group.name === name) ?? COLOR_GROUPS.find((group) => group.id === name) ?? COLOR_GROUPS[9];
}

function colorChipStyle(group) {
	return group.hex.startsWith('linear-gradient') ? group.hex : `background:${group.hex}`;
}

function toneStrip(material, className = 'tone-strip') {
	const colors = material.tone?.length ? material.tone : [colorMeta(material.color).hex];
	return `<div class="${className}">${colors.map((color) => `<i style="background:${esc(color)}"></i>`).join('')}</div>`;
}

function visual(material) {
	return material.image ? `<img src="${material.image}" alt="${esc(material.name)}">` : toneStrip(material);
}

function categoryName(store, id) {
	return store.settings.categories.find((category) => category.id === id)?.name ?? '';
}

function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	link.click();
	setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function formatBytes(bytes) {
	if (!Number.isFinite(bytes)) return '无法读取';
	if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function toLocalDateTimeValue(timestamp) {
	if (!timestamp) return '';
	const date = new Date(timestamp);
	const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
	return local.toISOString().slice(0, 16);
}

export async function setupUI() {
	const style = document.createElement('style');
	style.textContent = CSS;
	document.head.appendChild(style);

	const root = el('div');
	root.id = 'zw-ui';
	root.innerHTML = `
		<div id="zw-brand">
			<div class="mark">纸</div>
			<div><b>纸间 · 手账世界</b><span>STATIONERY STASH</span></div>
		</div>
		<nav id="zw-quicknav" aria-label="手账快捷入口">
			<button data-open="house">${ICONS.archive}<span>素材收纳</span></button>
			<button data-open="sheep">${ICONS.sheep}<span>我的素材</span></button>
			<button data-open="camera">${ICONS.camera}<span>录入素材</span></button>
			<button data-open="news">${ICONS.news}<span>社团上新</span></button>
			<button data-open="layout">${ICONS.collage}<span>拼贴工坊</span></button>
		</nav>
		<aside id="zw-drawer" class="panel" aria-label="手账功能面板">
			<div class="drawer-hd">
				<div>
					<div class="kick" id="zw-kicker">STATIONERY STASH</div>
					<h2 id="zw-title">素材收纳</h2>
					<div class="sub" id="zw-sub"></div>
				</div>
				<button class="drawer-x" id="zw-close" aria-label="关闭">×</button>
			</div>
			<div class="drawer-bd" id="zw-body"></div>
			<div class="drawer-ft" id="zw-foot"></div>
		</aside>
		<div id="zw-toast" role="status" aria-live="polite"></div>
	`;
	document.body.appendChild(root);

	const store = await new StashStore().init();
	const state = {
		openKind: null,
		filterColor: '全部',
		filterCategory: 'all',
		search: '',
		selectMode: false,
		selected: new Set(),
		moveMaterialId: null,
		basket: [],
		newsPlatform: 'all',
		newsItems: [],
		importing: false,
		storage: null,
	};

	const brand = root.querySelector('#zw-brand');
	const nav = root.querySelector('#zw-quicknav');
	const drawer = root.querySelector('#zw-drawer');
	const body = root.querySelector('#zw-body');
	const toast = root.querySelector('#zw-toast');

	function toastMsg(text) {
		toast.textContent = text;
		toast.classList.add('on');
		clearTimeout(toastMsg.timer);
		toastMsg.timer = setTimeout(() => toast.classList.remove('on'), 2800);
	}

	async function updateStorage() {
		try {
			const estimate = await navigator.storage?.estimate?.();
			state.storage = estimate ?? null;
		} catch {
			state.storage = null;
		}
	}
	await updateStorage();

	function openOverlay(content, width = 650) {
		const wrap = el('div', 'overlay');
		const modal = el('div', 'modal');
		modal.style.width = `min(${width}px, 95vw)`;
		modal.innerHTML = content;
		wrap.appendChild(modal);
		root.appendChild(wrap);
		requestAnimationFrame(() => wrap.classList.add('on'));
		const close = () => {
			wrap.classList.remove('on');
			setTimeout(() => wrap.remove(), 210);
		};
		wrap.addEventListener('pointerdown', (event) => {
			if (event.target === wrap) close();
		});
		wrap.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', close));
		return { wrap, modal, close };
	}

	function filteredMaterials() {
		const query = state.search.trim().toLowerCase();
		return store.materials
			.filter((material) => state.filterColor === '全部' || material.color === state.filterColor)
			.filter((material) => state.filterCategory === 'all' || material.categories?.includes(state.filterCategory))
			.filter((material) => !query || `${material.name} ${material.color} ${material.categories?.map((id) => categoryName(store, id)).join(' ')}`.toLowerCase().includes(query))
			.sort((a, b) => (b.favorite - a.favorite) || b.createdAt - a.createdAt);
	}

	function panelHouse() {
		const used = state.storage?.usage ?? 0;
		const quota = state.storage?.quota ?? 1;
		const percent = Math.max(1, Math.min(100, (used / quota) * 100));
		const custom = store.settings.categories;
		const colorCounts = COLOR_GROUPS.map((group) => ({
			...group,
			count: store.materials.filter((material) => material.color === group.name).length,
		})).filter((group) => group.count);
		return `
			<div class="stats">
				<div class="stat"><b>${store.materials.length}</b><span>全部素材</span></div>
				<div class="stat"><b>${colorCounts.length}</b><span>已用色系</span></div>
				<div class="stat"><b>${custom.length}</b><span>自定义分类</span></div>
			</div>
			<div class="section-label">浏览器存储</div>
			<p class="panel-note">${store.dbAvailable ? '素材图片与抠图结果保存在当前浏览器数据库。' : '当前浏览器无法使用持久数据库，素材仅保留到页面关闭。'}</p>
			<div class="storage-bar"><i style="width:${percent}%"></i></div>
			<div class="subtle">已使用 ${formatBytes(used)} / 可用约 ${formatBytes(quota)} · <button class="btn small ghost" id="zw-export">导出备份</button> <button class="btn small ghost" id="zw-import">导入备份</button></div>
			<input type="file" id="zw-backup-file" accept="application/json" hidden>
			<div class="section-label">按颜色收纳</div>
			<div class="category-list">
				${colorCounts.map((group) => `<button class="category-row" data-color="${esc(group.name)}"><i class="sw" style="${colorChipStyle(group)}"></i><span>${esc(group.name)}</span><em>${group.count} 件</em></button>`).join('') || '<p class="panel-note">还没有录入素材。</p>'}
			</div>
			<div class="section-label">自由分类</div>
			<div class="category-list">
				${custom.map((category) => {
					const count = store.materials.filter((material) => material.categories?.includes(category.id)).length;
					return `<button class="category-row" data-category="${esc(category.id)}"><i class="sw" style="background:${esc(category.color)}"></i><span>${esc(category.name)}</span><em>${count} 件</em></button>`;
				}).join('')}
				<button class="category-row" id="zw-category-add" style="border-style:dashed;color:#75816C"><span>＋ 新建分类标签</span></button>
			</div>
			${store.materials.some((material) => material.sample) ? '<div class="section-label">示例数据</div><button class="btn small ghost" id="zw-clear-demo">清空示例素材和示例预告</button>' : ''}
		`;
	}

	function panelHouseStorage() {
		const used = state.storage?.usage ?? 0;
		const quota = state.storage?.quota ?? 1;
		const percent = Math.max(1, Math.min(100, (used / quota) * 100));
		const boxes = store.settings.boxes ?? [];
		const boxIds = new Set(boxes.map((box) => box.id));
		const pending = store.materials.filter((material) => !material.boxId || !boxIds.has(material.boxId));
		const moving = pending.find((material) => material.id === state.moveMaterialId);
		const custom = store.settings.categories;
		const colorCounts = COLOR_GROUPS.map((group) => ({
			...group,
			count: store.materials.filter((material) => material.color === group.name).length,
		})).filter((group) => group.count);
		return `
			<div class="stats">
				<div class="stat"><b>${boxes.length}</b><span>收纳盒</span></div>
				<div class="stat"><b>${pending.length}</b><span>待收纳素材</span></div>
				<div class="stat"><b>${store.materials.length}</b><span>全部素材</span></div>
			</div>
			<div class="section-label">我的收纳盒</div>
			<div class="box-grid">
				${boxes.map((box) => {
					const count = store.materials.filter((material) => material.boxId === box.id).length;
					const fill = Math.min(100, Math.round((count / box.slots) * 100));
					return `
						<article class="storage-box ${count >= box.slots ? 'full' : ''}" data-box="${esc(box.id)}" tabindex="0">
							<div class="box-cover">
								${box.cover ? `<img src="${box.cover}" alt="${esc(box.name)}封面">` : '<div class="empty-cover">还没有封面<br>点右下角编辑</div>'}
								<span class="cover-count">${count}/${box.slots}</span>
								<button class="box-edit" data-edit-box="${esc(box.id)}" title="编辑盒子" aria-label="编辑${esc(box.name)}">✎</button>
							</div>
							<div class="box-info">
								<b>${esc(box.name)}</b>
								<small>${esc(box.location || '未填写位置')}</small>
								<div class="box-capacity"><i style="width:${fill}%"></i></div>
							</div>
						</article>`;
				}).join('')}
				<button class="box-add-card" id="zw-box-add"><b>＋</b><span>新建收纳盒</span><span>从相册选择封面</span></button>
			</div>
			<p class="panel-note" style="margin-top:9px">点盒子可查看和整理盒内素材；拖动下方素材到盒子上即可收纳。</p>
			${moving ? `<div class="storage-hint"><b>已拿起「${esc(moving.name)}」</b>，现在点一个盒子放入。<button class="btn small ghost" id="zw-cancel-move" style="margin-left:auto">取消</button></div>` : ''}
			<div class="section-label">待收纳素材 · ${pending.length}</div>
			<div class="pending-strip">
				${pending.map((material) => `
					<article class="pending-material ${state.moveMaterialId === material.id ? 'picked' : ''}" draggable="true" data-storage-material="${esc(material.id)}">
						<div class="thumb">${material.image ? `<img src="${material.image}" alt="">` : toneStrip(material)}</div>
						<b>${esc(material.name)}</b>
						<small>${esc(material.color)} · ${material.qty || 1} 件</small>
					</article>`).join('') || '<p class="panel-note" style="margin:0">所有素材都已经放进收纳盒了。</p>'}
			</div>
			<p class="panel-note">桌面端拖拽；手机端点素材后，再点目标盒子。</p>
			<div class="section-label">浏览器存储</div>
			<div class="storage-bar"><i style="width:${percent}%"></i></div>
			<div class="subtle">已使用 ${formatBytes(used)} / 可用约 ${formatBytes(quota)} · <button class="btn small ghost" id="zw-export">导出备份</button> <button class="btn small ghost" id="zw-import">导入备份</button></div>
			<input type="file" id="zw-backup-file" accept="application/json" hidden>
			<div class="section-label">按颜色查看</div>
			<div class="category-list">
				${colorCounts.map((group) => `<button class="category-row" data-color="${esc(group.name)}"><i class="sw" style="${colorChipStyle(group)}"></i><span>${esc(group.name)}</span><em>${group.count} 件</em></button>`).join('') || '<p class="panel-note">还没有录入素材。</p>'}
			</div>
			<div class="section-label">自由分类</div>
			<div class="category-list">
				${custom.map((category) => {
					const count = store.materials.filter((material) => material.categories?.includes(category.id)).length;
					return `<button class="category-row" data-category="${esc(category.id)}"><i class="sw" style="background:${esc(category.color)}"></i><span>${esc(category.name)}</span><em>${count} 件</em></button>`;
				}).join('')}
				<button class="category-row" id="zw-category-add" style="border-style:dashed;color:#75816C"><span>＋ 新建分类标签</span></button>
			</div>
			${store.materials.some((material) => material.sample) ? '<div class="section-label">示例数据</div><button class="btn small ghost" id="zw-clear-demo">清空示例素材和示例预告</button>' : ''}
		`;
	}

	function panelMaterials() {
		const list = filteredMaterials();
		const colorChips = ['全部', ...COLOR_GROUPS.map((group) => group.name)];
		return `
			<div class="toolbar">
				<label class="search">${ICONS.search}<input id="zw-search" value="${esc(state.search)}" placeholder="搜索名称、颜色、分类"></label>
				<button class="btn ${state.selectMode ? 'sage' : ''}" id="zw-select">${state.selectMode ? '完成' : '批量'}</button>
			</div>
			<div class="chip-row">
				${colorChips.map((name) => {
					const meta = name === '全部' ? null : colorMeta(name);
					return `<button class="chip ${state.filterColor === name ? 'on' : ''}" data-filter-color="${esc(name)}">${meta ? `<i class="dot" style="${colorChipStyle(meta)}"></i>` : ''}${esc(name)}</button>`;
				}).join('')}
			</div>
			<div class="chip-row">
				<button class="chip ${state.filterCategory === 'all' ? 'on' : ''}" data-filter-category="all">全部分类</button>
				${store.settings.categories.map((category) => `<button class="chip ${state.filterCategory === category.id ? 'on' : ''}" data-filter-category="${esc(category.id)}"><i class="dot" style="background:${esc(category.color)}"></i>${esc(category.name)}</button>`).join('')}
				<button class="chip add" id="zw-category-add">＋ 分类</button>
			</div>
			${state.selectMode && state.selected.size ? `<div class="selection-bar"><span>已选 ${state.selected.size} 件</span><button class="btn small danger" id="zw-delete-selected">删除</button><button class="btn small primary" id="zw-add-selected">放进拼贴</button></div>` : `<p class="panel-note">${state.selectMode ? '点素材进行多选。' : '点击素材查看详情；拼贴前可单独抠图。'}</p>`}
			<div class="mat-grid">
				${list.map((material) => {
					const selected = state.selected.has(material.id);
					const cats = (material.categories ?? []).map((id) => categoryName(store, id)).filter(Boolean);
					return `
						<article class="mat-card ${selected ? 'on' : ''}" data-material="${esc(material.id)}">
							<div class="visual">
								${visual(material)}
								<span class="color-tag">${esc(material.color || '未识别')}</span>
								${material.sample ? '<span class="sample-badge">示例</span>' : ''}
								${state.selectMode ? `<span class="select-dot">${selected ? '✓' : ''}</span>` : `<button class="favorite" data-favorite="${esc(material.id)}" aria-label="${material.favorite ? '取消收藏' : '收藏'}">${material.favorite ? '♥' : '♡'}</button>`}
							</div>
							<div class="mat-meta">
								<b>${esc(material.name)}</b>
								<small>${esc(material.box || '新录入')} · ${material.qty || 1} 件</small>
								<div class="cat-mini">${cats.map((cat) => `<span>${esc(cat)}</span>`).join('')}</div>
							</div>
						</article>`;
				}).join('') || `<div class="empty-state" style="grid-column:1/-1"><b>⌕</b>没有符合条件的素材<br>试试清空搜索或切换筛选</div>`}
			</div>
		`;
	}

	function panelCamera() {
		const recent = store.materials.filter((material) => material.image).slice(0, 5);
		return `
			<div class="import-actions">
				<button class="import-btn" id="zw-album">从相册批量选择<small>支持一次选择多张</small></button>
				<button class="import-btn ghost" id="zw-shoot">直接拍照<small>调用后置摄像头</small></button>
			</div>
			<input type="file" id="zw-file" accept="image/*" multiple hidden>
			<input type="file" id="zw-camera" accept="image/*" capture="environment" hidden>
			<div class="drop-zone" id="zw-drop">
				<div class="plus">＋</div>
				<b>${state.importing ? '正在识别颜色并保存…' : '把素材照片拖到这里'}</b>
				<span>推荐 5–20 张一批<br>浅色纯背景更容易识别图案边界</span>
			</div>
			<div class="section-label">最近录入</div>
			<div class="import-list">
				${recent.map((material) => `
					<div class="import-row">
						${material.image ? `<img src="${material.image}" alt="">` : toneStrip(material, 'import-swatch')}
						<div class="txt"><b>${esc(material.name)}</b><small>${esc(material.color)} · ${formatRelativeTime(material.createdAt)}</small></div>
						<em>${material.cutouts?.pieces?.length ? `已分 ${material.cutouts.pieces.length} 图` : '可抠图'}</em>
					</div>`).join('') || '<p class="panel-note">还没有照片素材。</p>'}
			</div>
		`;
	}

	function panelNews() {
		const all = store.allNews(state.newsItems);
		const filtered = all.filter((news) => state.newsPlatform === 'all' || news.platform === state.newsPlatform);
		const connected = store.settings.sources.filter((source) => source.feedUrl).length;
		return `
			<div class="banner"><i></i><div>${connected ? `已连接 ${connected} 个公开订阅源` : '尚未连接真实订阅源'}。淘宝、微店、小红书页面通常无法在浏览器中直接跨站读取；配置公开 RSS / JSON 地址，或手动录入预告即可稳定更新。<br>最近检查：${store.settings.lastNewsRefresh ? formatRelativeTime(store.settings.lastNewsRefresh) : '尚未检查'}</div></div>
			<div class="toolbar">
				<button class="btn primary" id="zw-refresh-news">刷新订阅</button>
				<button class="btn" id="zw-manage-sources">社团与订阅</button>
				<button class="btn" id="zw-manual-news">手动预告</button>
			</div>
			<div class="chip-row">
				<button class="chip ${state.newsPlatform === 'all' ? 'on' : ''}" data-news-platform="all">全部平台</button>
				${Object.entries(PLATFORM_META).map(([id, meta]) => `<button class="chip ${state.newsPlatform === id ? 'on' : ''}" data-news-platform="${id}">${meta.name}</button>`).join('')}
			</div>
			${filtered.map((news) => {
				const platform = PLATFORM_META[news.platform] ?? PLATFORM_META.other;
				const fresh = Date.now() - (news.publishedAt || 0) < 86_400_000;
				const title = news.url ? `<a class="news-title" href="${esc(news.url)}" target="_blank" rel="noopener noreferrer">${esc(news.title)} ↗</a>` : `<span class="news-title">${esc(news.title)}</span>`;
				return `
					<div class="news-row">
						<div class="news-dot ${fresh ? 'fresh' : ''}" style="color:${platform.color}">${platform.short}</div>
						<div class="news-main">
							<div class="news-shop">${esc(news.club)} <em>${platform.name}</em>${news.sample ? '<em>示例</em>' : ''}</div>
							${title}
							<div class="news-bottom">
								<span class="news-tag">${esc(news.tag || '上新')}</span>
								${news.startAt ? `<span class="news-start">${esc(formatCountdown(news.startAt))}</span>` : ''}
							</div>
						</div>
						<div class="news-time">${formatRelativeTime(news.publishedAt)}</div>
					</div>`;
			}).join('') || '<div class="empty-state"><b>讯</b>这个平台还没有预告<br>可以添加社团订阅，或手动录入一条</div>'}
		`;
	}

	function panelPairing() {
		const groups = COLOR_GROUPS.map((group) => ({
			...group,
			count: store.materials.filter((material) => material.color === group.name).length,
		})).filter((group) => group.count).sort((a, b) => b.count - a.count);
		const top = groups.slice(0, 3);
		const schemes = [];
		if (top.length) {
			schemes.push({
				kick: '当前素材 · 主色',
				title: `${top.map((group) => group.name).join(' × ')} 的 60–30–10 结构`,
				swatches: top.map((group) => group.hex),
				text: `把 ${top[0].name} 用作大面积底纸，${top[1]?.name || '中性色'}承担辅助区域，${top[2]?.name || '少量亮色'}只做点题。优先从对应色系中挑选纹理较安静的素材。`,
			});
		}
		if (groups.some((group) => ['棕色', '绿色'].includes(group.name))) {
			schemes.push({
				kick: '自然纸感',
				title: '棕绿低饱和：像旧书页里的植物标本',
				swatches: ['#A68970', '#819574', '#EEE5D4'],
				text: '棕色负责年代感，绿色提供生命力，米白留出书写空间。搭配时可把植物图案沿对角线弱弱呼应，避免左右完全对称。',
			});
		}
		schemes.push({
			kick: '操作建议',
			title: '先定主色，再挑一个“安静”的辅色',
			swatches: ['#D0B879', '#8EA39A', '#F1E6D4'],
			text: '拼贴里最容易被忽略的是留白。先选一张大面积底纸，再放入 2–4 个有明确轮廓的图案；小面积亮色不超过整页的一成。',
		});
		return `
			<div class="stats">
				<div class="stat"><b>${groups[0]?.name || '待录入'}</b><span>当前主色系</span></div>
				<div class="stat"><b>${groups.filter((group) => group.count).length}</b><span>可用色系</span></div>
				<div class="stat"><b>${store.materials.length}</b><span>可搭配素材</span></div>
			</div>
			<p class="ai-note">建议完全在本地按素材主色生成。它不会理解图案内容，最终仍由你决定构图与主题。</p>
			${schemes.map((scheme) => `<section class="pair"><div class="kick">${esc(scheme.kick)}</div><h3>${esc(scheme.title)}</h3><div class="dots">${scheme.swatches.map((color) => `<i style="background:${esc(color)}"></i>`).join('')}</div><p>${esc(scheme.text)}</p></section>`).join('')}
			<button class="btn primary" id="zw-open-collage" style="width:100%">打开拼贴工坊</button>
		`;
	}

	function renderOpen() {
		const copy = COPY[state.openKind] ?? COPY.house;
		root.querySelector('#zw-title').textContent = copy[0];
		root.querySelector('#zw-sub').textContent = copy[1];
		root.querySelector('#zw-foot').textContent = copy[2];
		root.querySelector('#zw-kicker').textContent = {
			house: 'HOUSE · 素材收纳',
			sheep: 'SHEEP · 素材库',
			camera: 'CAMERA · 拍照录入',
			news: 'CLUB BOARD · 社团上新',
			ai: 'COLOR PAIRING · 本地搭配',
		}[state.openKind];
		body.innerHTML =
			state.openKind === 'house'
				? panelHouseStorage()
				: state.openKind === 'sheep'
					? panelMaterials()
					: state.openKind === 'camera'
						? panelCamera()
						: state.openKind === 'news'
							? panelNews()
							: panelPairing();
		bindBody();
		if (state.openKind === 'camera' || state.openKind === 'sheep') updateStorage().catch(() => {});
	}

	function showCategoryEditor() {
		const { modal, close } = openOverlay(`
			<div class="modal-hd"><div><b>自定义分类</b><span>按社团、主题、活动或收纳盒自由组织素材；一个素材可属于多个分类。</span></div><button class="round-x" data-close>×</button></div>
			<div class="modal-bd">
				<div class="category-list" id="category-editor-list">
					${store.settings.categories.map((category) => `<div class="category-row"><i class="sw" style="background:${esc(category.color)}"></i><span>${esc(category.name)}</span><em>${store.materials.filter((material) => material.categories?.includes(category.id)).length} 件</em><button class="mini-x" data-remove-category="${esc(category.id)}">×</button></div>`).join('') || '<p class="panel-note">还没有自定义分类。</p>'}
				</div>
				<div class="section-label">新建分类</div>
				<div class="field"><label>分类名称，例如“纸间合作社 2026 春团”</label><input id="new-category-name" maxlength="18" placeholder="输入分类名称"></div>
				<div class="field-row">
					<div class="field"><label>标签颜色</label><input id="new-category-color" type="color" value="#84977A"></div>
					<div class="field"><label>使用建议</label><input value="可同时归入多个分类" disabled></div>
				</div>
			</div>
			<div class="modal-ft"><span class="grow"></span><button class="btn" data-close>完成</button><button class="btn primary" id="save-category">新建分类</button></div>
		`, 520);
		modal.querySelector('#save-category').addEventListener('click', () => {
			const name = modal.querySelector('#new-category-name').value.trim();
			const color = modal.querySelector('#new-category-color').value;
			if (!name) return toastMsg('先给分类起一个名字');
			if (store.settings.categories.some((category) => category.name === name)) return toastMsg('这个分类已经存在');
			store.addCategory(name, color);
			close();
			renderOpen();
			toastMsg(`已新建分类：${name}`);
		});
		modal.querySelectorAll('[data-remove-category]').forEach((button) => {
			button.addEventListener('click', async () => {
				const id = button.dataset.removeCategory;
				const affected = store.materials.filter((material) => material.categories?.includes(id));
				store.removeCategory(id);
				for (const material of affected) {
					await store.updateMaterial(material.id, { categories: material.categories.filter((category) => category !== id) });
				}
				if (state.filterCategory === id) state.filterCategory = 'all';
				button.closest('.category-row')?.remove();
				renderOpen();
			});
		});
	}

	function showBoxEditor(boxId = null) {
		const existing = boxId ? store.settings.boxes.find((box) => box.id === boxId) : null;
		let cover = existing?.cover ?? '';
		const occupied = existing ? store.boxCount(existing.id) : 0;
		const { modal, close } = openOverlay(`
			<div class="modal-hd"><div><b>${existing ? '编辑收纳盒' : '新建收纳盒'}</b><span>封面会显示在仓库里。建议选择一张能一眼认出盒内素材的照片。</span></div><button class="round-x" data-close>×</button></div>
			<div class="modal-bd">
				<div class="cover-editor">
					<div class="cover-preview" id="box-cover-preview">${cover ? `<img src="${cover}" alt="盒子封面">` : '相册封面<br>尚未选择'}</div>
					<div class="cover-copy">
						<b>盒子封面</b>
						<p>从你的相册选择图片。图片会压缩后保存在当前浏览器。</p>
						<button class="btn small primary" id="choose-box-cover">从相册选择封面</button>
						<input type="file" id="box-cover-file" accept="image/*" hidden>
					</div>
				</div>
				<div class="field"><label>盒子名称</label><input id="box-name" maxlength="24" value="${esc(existing?.name ?? '')}" placeholder="例如：春日贴纸盒"></div>
				<div class="field-row">
					<div class="field"><label>摆放位置</label><input id="box-location" maxlength="40" value="${esc(existing?.location ?? '')}" placeholder="例如：书桌左侧抽屉"></div>
					<div class="field"><label>容量（件）</label><input id="box-slots" type="number" min="${Math.max(1, occupied)}" max="99" value="${existing?.slots ?? 12}"></div>
				</div>
			</div>
			<div class="modal-ft"><span class="subtle grow">${occupied ? `盒内已有 ${occupied} 件素材` : '创建后，把下方素材拖到盒子上即可收纳'}</span><button class="btn" data-close>取消</button><button class="btn primary" id="save-box">${existing ? '保存修改' : '创建盒子'}</button></div>
		`, 560);
		const fileInput = modal.querySelector('#box-cover-file');
		const chooseButton = modal.querySelector('#choose-box-cover');
		const preview = modal.querySelector('#box-cover-preview');
		chooseButton.addEventListener('click', () => fileInput.click());
		fileInput.addEventListener('change', async () => {
			const file = fileInput.files[0];
			if (!file) return;
			chooseButton.disabled = true;
			chooseButton.textContent = '正在读取…';
			try {
				const image = await imageFileToDataUrl(file, { maxSide: 720, quality: 0.8 });
				cover = image.dataUrl;
				preview.innerHTML = `<img src="${cover}" alt="盒子封面">`;
				chooseButton.textContent = '更换封面';
			} catch (error) {
				toastMsg(`封面读取失败：${error.message}`);
				chooseButton.textContent = '重新选择';
			} finally {
				chooseButton.disabled = false;
			}
		});
		modal.querySelector('#save-box').addEventListener('click', async () => {
			const name = modal.querySelector('#box-name').value.trim();
			const location = modal.querySelector('#box-location').value.trim();
			const requestedSlots = Math.max(1, Number(modal.querySelector('#box-slots').value) || 12);
			if (!name) return toastMsg('先给收纳盒起一个名字');
			if (!cover) return toastMsg('请先从相册选择一张盒子封面');
			if (existing && requestedSlots < occupied) return toastMsg(`容量不能低于已经放入的 ${occupied} 件`);
			const payload = { name, location, slots: requestedSlots, cover };
			if (existing) await store.updateBox(existing.id, payload);
			else store.addBox(payload);
			close();
			renderOpen();
			toastMsg(existing ? '收纳盒已更新' : `已创建「${name}」`);
		});
	}

	function showBoxDetail(boxId) {
		const box = store.settings.boxes.find((item) => item.id === boxId);
		if (!box) return;
		const contents = store.materials.filter((material) => material.boxId === box.id);
		const { modal, close } = openOverlay(`
			<div class="modal-hd"><div><b>${esc(box.name)}</b><span>${esc(box.location || '未填写摆放位置')} · ${contents.length}/${box.slots} 件</span></div><button class="round-x" data-close>×</button></div>
			<div class="modal-bd">
				<div class="box-detail-cover">${box.cover ? `<img src="${box.cover}" alt="${esc(box.name)}封面">` : '<div class="empty-state">这个盒子还没有封面</div>'}</div>
				<div class="box-detail-meta"><b>盒内素材</b><span>${contents.length} / ${box.slots}</span><span class="grow"></span><button class="btn small" id="edit-current-box">编辑盒子</button></div>
				${contents.map((material) => `
					<div class="box-material-row">
						${material.image ? `<img src="${material.image}" alt="">` : toneStrip(material)}
						<div class="txt"><b>${esc(material.name)}</b><small>${esc(material.color)} · ${material.qty || 1} 件</small></div>
						<button class="btn small ghost" data-box-remove="${esc(material.id)}">移出</button>
					</div>`).join('') || '<div class="empty-state"><b>盒</b>这个盒子还是空的<br>关掉详情后，把素材拖到盒子上</div>'}
			</div>
			<div class="modal-ft"><button class="btn danger" id="delete-current-box">删除盒子</button><span class="grow"></span><button class="btn" data-close>完成</button></div>
		`, 560);
		modal.querySelectorAll('[data-box-remove]').forEach((button) => {
			button.addEventListener('click', async () => {
				const result = await store.assignMaterialToBox(button.dataset.boxRemove, null);
				if (!result.ok) return toastMsg(result.message);
				close();
				renderOpen();
				toastMsg('素材已移回待收纳');
			});
		});
		modal.querySelector('#edit-current-box').addEventListener('click', () => {
			close();
			setTimeout(() => showBoxEditor(box.id), 220);
		});
		modal.querySelector('#delete-current-box').addEventListener('click', async () => {
			if (!confirm(`删除「${box.name}」？盒内素材会移回待收纳，不会被删除。`)) return;
			await store.removeBox(box.id);
			close();
			renderOpen();
			toastMsg('收纳盒已删除，素材已移回待收纳');
		});
	}

	function showMaterialDetail(id) {
		const material = store.materials.find((item) => item.id === id);
		if (!material) return;
		const checked = new Set(material.categories ?? []);
		const { modal, close } = openOverlay(`
			<div class="modal-hd"><div><b>素材详情</b><span>${esc(material.color)} · 自动识别置信度 ${Math.round((material.confidence || 0.75) * 100)}% · ${formatRelativeTime(material.createdAt)}</span></div><button class="round-x" data-close>×</button></div>
			<div class="modal-bd">
				<div class="detail-visual">${visual(material)}</div>
				<div class="field"><label>素材名称</label><input id="detail-name" maxlength="40" value="${esc(material.name)}"></div>
				<div class="field"><label>颜色分类（可修正自动识别结果）</label><select id="detail-color">${COLOR_GROUPS.map((group) => `<option value="${esc(group.name)}" ${material.color === group.name ? 'selected' : ''}>${esc(group.name)}</option>`).join('')}</select></div>
				<div class="field"><label>自定义分类</label><div class="check-grid">${store.settings.categories.map((category) => `<label class="check"><input type="checkbox" value="${esc(category.id)}" ${checked.has(category.id) ? 'checked' : ''}><span>${esc(category.name)}</span></label>`).join('') || '<span class="subtle">尚未创建分类，可在素材库顶部新建。</span>'}</div></div>
				<div class="field-row">
					<div class="field"><label>数量</label><input id="detail-qty" type="number" min="1" value="${Number(material.qty) || 1}"></div>
					<div class="field"><label>收纳盒</label><select id="detail-box"><option value="">待收纳</option>${(store.settings.boxes ?? []).map((box) => `<option value="${esc(box.id)}" ${material.boxId === box.id ? 'selected' : ''}>${esc(box.name)} · ${store.boxCount(box.id)}/${box.slots}</option>`).join('')}</select></div>
				</div>
				${material.image ? `<p class="subtle">这张素材可自动去除浅色背景，并尝试拆成多个独立图案。背景复杂时可在下一步调整容差。</p>` : '<p class="subtle">示例素材没有原图；录入自己的照片后即可使用抠图。</p>'}
			</div>
			<div class="modal-ft"><button class="btn" id="detail-favorite">${material.favorite ? '♥ 已收藏' : '♡ 收藏'}</button><span class="grow"></span><button class="btn" data-close>取消</button><button class="btn primary" id="detail-cutout">${material.image ? (material.cutouts?.pieces?.length ? '调整抠图/加入拼贴' : '抠图并拼贴') : '放进拼贴'}</button><button class="btn clay" id="detail-save">保存</button></div>
		`, 560);
		modal.querySelector('#detail-save').addEventListener('click', async () => {
			const categories = Array.from(modal.querySelectorAll('.check input:checked')).map((input) => input.value);
			const color = modal.querySelector('#detail-color').value;
			const boxId = modal.querySelector('#detail-box').value || null;
			await store.updateMaterial(id, {
				name: modal.querySelector('#detail-name').value.trim() || '未命名素材',
				color,
				categories,
				qty: Math.max(1, Number(modal.querySelector('#detail-qty').value) || 1),
				confidence: color === material.color ? material.confidence : 1,
			});
			const assigned = await store.assignMaterialToBox(id, boxId);
			if (!assigned.ok) return toastMsg(assigned.message);
			close();
			renderOpen();
			toastMsg(boxId ? `素材已放入「${assigned.box.name}」` : '素材信息已保存');
		});
		modal.querySelector('#detail-favorite').addEventListener('click', async (event) => {
			const favorite = !material.favorite;
			const button = event.currentTarget;
			await store.updateMaterial(id, { favorite });
			button.textContent = favorite ? '♥ 已收藏' : '♡ 收藏';
			toastMsg(favorite ? '已收藏' : '已取消收藏');
		});
		modal.querySelector('#detail-cutout').addEventListener('click', () => {
			close();
			if (material.image) showCutout(id);
			else {
				addMaterialToBasket(material);
				showCollage();
			}
		});
	}

	async function showCutout(id) {
		const material = store.materials.find((item) => item.id === id);
		if (!material?.image) return;
		let activePieces = material.cutouts?.pieces ?? [];
		let tolerance = material.cutouts?.tolerance ?? 34;
		const { modal, close } = openOverlay(`
			<div class="modal-hd"><div><b>自动抠图与图案拆分</b><span>先去掉图片边缘接近的背景色，再按相互分离的图形轮廓拆分。复杂照片可拖动容差重新识别。</span></div><button class="round-x" data-close>×</button></div>
			<div class="modal-bd">
				<div class="cut-layout">
					<div class="cut-preview" id="cut-preview"><img src="${material.image}" alt="${esc(material.name)}"></div>
					<div>
						<div class="toolbar"><button class="btn primary small" id="cut-run">自动去背景并拆分</button><span class="subtle" id="cut-status">${activePieces.length ? `已拆出 ${activePieces.length} 个图案` : '尚未处理'}</span></div>
						<div class="range-line"><span>背景容差</span><input id="cut-tolerance" type="range" min="12" max="80" value="${tolerance}"><b id="cut-value">${tolerance}</b></div>
						<div class="cut-pieces" id="cut-pieces"></div>
					</div>
				</div>
				<p class="subtle" style="margin-top:10px">建议照片为白纸或纯色底、图案之间留有空白。若所有图案连在一起，结果会是一整张透明素材，这是浏览器端识别的正常限制。</p>
			</div>
			<div class="modal-ft"><span class="subtle grow">点击图案可预览；全部加入后会分别成为可移动的拼贴元素。</span><button class="btn" data-close>稍后</button><button class="btn primary" id="cut-add-all">全部加入拼贴</button></div>
		`, 720);

		const piecesEl = modal.querySelector('#cut-pieces');
		const preview = modal.querySelector('#cut-preview');
		const status = modal.querySelector('#cut-status');
		function renderPieces() {
			piecesEl.innerHTML = activePieces.map((piece, index) => `<button class="cut-piece ${index === 0 ? 'on' : ''}" data-piece-index="${index}"><img src="${piece.image}" alt=""><span>${esc(piece.name)}</span></button>`).join('') || '<p class="subtle">还没有拆分结果。</p>';
			piecesEl.querySelectorAll('[data-piece-index]').forEach((button) => {
				button.addEventListener('click', () => {
					piecesEl.querySelectorAll('.cut-piece').forEach((item) => item.classList.remove('on'));
					button.classList.add('on');
					preview.innerHTML = `<img src="${activePieces[Number(button.dataset.pieceIndex)].image}" alt="">`;
				});
			});
		}
		renderPieces();
		const range = modal.querySelector('#cut-tolerance');
		range.addEventListener('input', () => {
			tolerance = Number(range.value);
			modal.querySelector('#cut-value').textContent = tolerance;
		});
		modal.querySelector('#cut-run').addEventListener('click', async (event) => {
			const runButton = event.currentTarget;
			runButton.disabled = true;
			status.textContent = '正在分析像素与轮廓…';
			await new Promise((resolve) => setTimeout(resolve, 30));
			try {
				const result = await createCutouts(material.image, tolerance);
				activePieces = result.pieces;
				await store.updateMaterial(id, { cutouts: { pieces: activePieces, tolerance, createdAt: Date.now() } });
				status.textContent = `拆分完成：${activePieces.length} 个图案`;
				preview.innerHTML = `<img src="${activePieces[0].image}" alt="">`;
				renderPieces();
				toastMsg(`完成去背景，识别到 ${activePieces.length} 个图案`);
			} catch (error) {
				console.error(error);
				status.textContent = '识别失败';
				toastMsg(`抠图失败：${error.message}`);
			} finally {
				runButton.disabled = false;
			}
		});
		modal.querySelector('#cut-add-all').addEventListener('click', () => {
			if (!activePieces.length) return toastMsg('先运行自动拆分，或至少生成透明素材');
			for (const piece of activePieces) addMaterialToBasket(material, piece);
			close();
			showCollage();
		});
		if (!activePieces.length) {
			status.textContent = '正在首次识别…';
			modal.querySelector('#cut-run').click();
		}
	}

	function showSourcesManager() {
		const { modal, close } = openOverlay(`
			<div class="modal-hd"><div><b>社团与订阅</b><span>每个社团可绑定店铺主页和一个公开 RSS / Atom / JSON Feed。浏览器每 10 分钟检查一次，也支持手动刷新。</span></div><button class="round-x" data-close>×</button></div>
			<div class="modal-bd">
				<div id="source-list">${store.settings.sources.map((source) => `<div class="source-row"><div><b>${esc(source.club)} · ${PLATFORM_META[source.platform]?.name || '其他'}</b><small>${esc(source.feedUrl || '仅保存店铺链接，未绑定 Feed')}</small></div><span class="source-status ${source.lastError ? 'err' : ''}">${source.lastError ? '读取失败' : source.feedUrl ? '已订阅' : '店铺'}</span><button class="mini-x" data-remove-source="${esc(source.id)}">×</button></div>`).join('') || '<p class="panel-note">尚未添加社团。</p>'}</div>
				<div class="section-label">添加社团</div>
				<div class="field-row">
					<div class="field"><label>社团名称</label><input id="source-club" placeholder="例如：纸间合作社"></div>
					<div class="field"><label>主要平台</label><select id="source-platform">${Object.entries(PLATFORM_META).map(([id, meta]) => `<option value="${id}">${meta.name}</option>`).join('')}</select></div>
				</div>
				<div class="field"><label>店铺 / 账号主页</label><input id="source-shop" type="url" placeholder="https://..."></div>
				<div class="field"><label>公开 Feed 地址（可选，需允许跨站读取）</label><input id="source-feed" type="url" placeholder="https://你的RSSHub或JSON地址"><span class="subtle">支持 RSS 2.0、Atom、JSON Feed；关闭跨域限制的地址无法直接读取。</span></div>
			</div>
			<div class="modal-ft"><button class="btn ghost" id="source-template">查看格式示例</button><span class="grow"></span><button class="btn" data-close>关闭</button><button class="btn primary" id="source-add">添加社团</button></div>
		`, 620);
		modal.querySelector('#source-add').addEventListener('click', () => {
			const club = modal.querySelector('#source-club').value.trim();
			const platform = modal.querySelector('#source-platform').value;
			const shopUrl = modal.querySelector('#source-shop').value.trim();
			const feedUrl = modal.querySelector('#source-feed').value.trim();
			if (!club) return toastMsg('先填写社团名称');
			store.addSource({ club, platform, shopUrl, feedUrl, lastChecked: 0, lastError: '' });
			close();
			renderOpen();
			toastMsg(`已添加社团：${club}`);
		});
		modal.querySelectorAll('[data-remove-source]').forEach((button) => {
			button.addEventListener('click', () => {
				store.removeSource(button.dataset.removeSource);
				button.closest('.source-row')?.remove();
				renderOpen();
			});
		});
		modal.querySelector('#source-template').addEventListener('click', () => {
			const sample = {
				items: [{
					title: '春日贴纸开团',
					url: 'https://example.com/item',
					tag: '开团',
					startAt: new Date(Date.now() + 86_400_000).toISOString(),
					pubDate: new Date().toISOString(),
				}],
			};
			downloadBlob(new Blob([JSON.stringify(sample, null, 2)], { type: 'application/json' }), '社团预告JSON示例.json');
		});
	}

	function showManualNews() {
		const sources = store.settings.sources;
		const { modal, close } = openOverlay(`
			<div class="modal-hd"><div><b>手动录入预告</b><span>用于搬运公开的社团公告、开团时间或活动链接。</span></div><button class="round-x" data-close>×</button></div>
			<div class="modal-bd">
				<div class="field-row">
					<div class="field"><label>社团</label><input id="manual-club" list="source-clubs" placeholder="社团名称"><datalist id="source-clubs">${sources.map((source) => `<option value="${esc(source.club)}">`).join('')}</datalist></div>
					<div class="field"><label>平台</label><select id="manual-platform">${Object.entries(PLATFORM_META).map(([id, meta]) => `<option value="${id}">${meta.name}</option>`).join('')}</select></div>
				</div>
				<div class="field"><label>预告标题</label><input id="manual-title" placeholder="例如：樱花季限定胶带开团"></div>
				<div class="field-row">
					<div class="field"><label>类型</label><select id="manual-tag"><option>上新</option><option>开团</option><option>活动</option><option>教程</option><option>拼团</option></select></div>
					<div class="field"><label>开团 / 上新时间（可选）</label><input id="manual-start" type="datetime-local"></div>
				</div>
				<div class="field"><label>原文链接</label><input id="manual-url" type="url" placeholder="https://..."></div>
			</div>
			<div class="modal-ft"><span class="grow"></span><button class="btn" data-close>取消</button><button class="btn primary" id="manual-save">保存预告</button></div>
		`, 560);
		modal.querySelector('#manual-save').addEventListener('click', () => {
			const club = modal.querySelector('#manual-club').value.trim();
			const title = modal.querySelector('#manual-title').value.trim();
			if (!club || !title) return toastMsg('社团和预告标题都要填写');
			const startValue = modal.querySelector('#manual-start').value;
			store.addManualNews({
				club,
				platform: modal.querySelector('#manual-platform').value,
				title,
				tag: modal.querySelector('#manual-tag').value,
				startAt: startValue ? new Date(startValue).getTime() : null,
				url: modal.querySelector('#manual-url').value.trim(),
			});
			close();
			renderOpen();
			toastMsg('预告已保存');
		});
	}

	function addMaterialToBasket(material, piece = null) {
		const key = `${material.id}:${piece?.id ?? 'whole'}`;
		if (state.basket.some((item) => item.key === key)) {
			toastMsg('这个素材已经在拼贴篮子里');
			return;
		}
		state.basket.push({
			key,
			materialId: material.id,
			name: piece ? `${material.name} · ${piece.name}` : material.name,
			image: piece?.image ?? material.image ?? '',
			width: piece?.width ?? material.width ?? 600,
			height: piece?.height ?? material.height ?? 600,
			tone: material.tone,
		});
	}

	function showCollage() {
		if (!state.basket.length) {
			toastMsg('拼贴篮子还是空的，先去“我的素材”选择素材');
			open('sheep');
			return;
		}
		const old = root.querySelector('#zw-collage');
		if (old) return;
		const wrap = el('div');
		wrap.id = 'zw-collage';
		wrap.innerHTML = `
			<div class="collage-card">
				<div class="collage-hd">
					<button class="btn small" id="collage-close">← 返回</button>
					<b>自由拼贴工坊</b><span class="tip">拖动摆位 · 点击选中 · 用底栏缩放和旋转</span><span class="grow"></span>
					<button class="btn small" id="collage-reset">重新排布</button>
					<button class="btn small primary" id="collage-export">导出 PNG</button>
				</div>
				<div class="collage-body">
					<div class="collage-stage"><div class="collage-paper" id="collage-paper"></div></div>
					<aside class="collage-tray">
						<div class="tray-hd">拼贴篮子 · ${state.basket.length} 项</div>
						<div class="tray-list" id="tray-list"></div>
						<div class="tray-actions">
							<button class="btn small" id="collage-more">从素材库继续添加</button>
							<button class="btn small ghost" id="collage-clear">清空篮子</button>
						</div>
					</aside>
				</div>
				<div class="selected-tools">
					<span id="collage-selection">未选中图案</span><span class="grow"></span>
					<button class="btn small icon" id="collage-back" title="下移一层">↓</button>
					<button class="btn small icon" id="collage-front" title="上移一层">↑</button>
					<button class="btn small icon" id="collage-smaller" title="缩小">−</button>
					<button class="btn small icon" id="collage-bigger" title="放大">＋</button>
					<input id="collage-rotate" type="range" min="-45" max="45" value="0" title="旋转">
					<button class="btn small danger" id="collage-remove">移除</button>
				</div>
			</div>`;
		root.appendChild(wrap);
		requestAnimationFrame(() => wrap.classList.add('on'));
		const paper = wrap.querySelector('#collage-paper');
		const tray = wrap.querySelector('#tray-list');
		const selectionLabel = wrap.querySelector('#collage-selection');
		const nodes = [];
		let selectedNode = null;
		let drag = null;
		const layoutState = new Map();

		function initialLayout(index) {
			return {
				x: 12 + ((index * 19) % 58),
				y: 12 + ((index * 17) % 52),
				size: index === 0 ? 42 : 28 + (index % 3) * 4,
				rotation: index % 2 ? 4 : -3,
				z: index + 1,
			};
		}

		function renderPaper() {
			paper.innerHTML = state.basket.length ? '' : '<div class="collage-empty">先从右侧篮子点选图案<br>再把它拖到喜欢的位置</div>';
			nodes.length = 0;
			state.basket.forEach((item, index) => {
				const layout = layoutState.get(item.key) ?? initialLayout(index);
				layoutState.set(item.key, layout);
				const node = el('div', 'collage-piece');
				node.dataset.key = item.key;
				node.style.left = `${layout.x}%`;
				node.style.top = `${layout.y}%`;
				node.style.width = `${layout.size}%`;
				node.style.aspectRatio = `${item.width || 1}/${item.height || 1}`;
				node.style.transform = `rotate(${layout.rotation}deg)`;
				node.style.zIndex = layout.z;
				node.innerHTML = item.image ? `<img src="${item.image}" alt="${esc(item.name)}" draggable="false">` : `<div class="tone-tile">${(item.tone ?? ['#CCC']).map((color) => `<i style="background:${esc(color)}"></i>`).join('')}</div>`;
				node.addEventListener('pointerdown', (event) => {
					event.preventDefault();
					selectNode(node);
					const rect = paper.getBoundingClientRect();
					const nodeRect = node.getBoundingClientRect();
					drag = { node, layout, rect, offsetX: event.clientX - nodeRect.left, offsetY: event.clientY - nodeRect.top };
					node.classList.add('dragging');
					node.setPointerCapture?.(event.pointerId);
				});
				paper.appendChild(node);
				nodes.push({ node, item, layout });
			});
			if (!state.basket.length) selectionLabel.textContent = '未选中图案';
		}

		function renderTray() {
			tray.innerHTML = state.basket.map((item) => `<button class="tray-item" data-key="${esc(item.key)}">${item.image ? `<img src="${item.image}" alt="">` : toneStrip(item)}<span>${esc(item.name)}</span></button>`).join('');
			tray.querySelectorAll('[data-key]').forEach((button) => {
				button.addEventListener('click', () => {
					const record = nodes.find((entry) => entry.item.key === button.dataset.key);
					if (record) selectNode(record.node);
				});
			});
		}

		function selectNode(node) {
			nodes.forEach((entry) => entry.node.classList.remove('selected'));
			selectedNode = nodes.find((entry) => entry.node === node) ?? null;
			if (selectedNode) {
				node.classList.add('selected');
				selectionLabel.textContent = selectedNode.item.name;
				wrap.querySelector('#collage-rotate').value = selectedNode.layout.rotation;
			} else {
				selectionLabel.textContent = '未选中图案';
			}
		}

		paper.addEventListener('pointermove', (event) => {
			if (!drag) return;
			const x = ((event.clientX - drag.rect.left - drag.offsetX) / drag.rect.width) * 100;
			const y = ((event.clientY - drag.rect.top - drag.offsetY) / drag.rect.height) * 100;
			drag.layout.x = Math.max(-15, Math.min(85, x));
			drag.layout.y = Math.max(-15, Math.min(85, y));
			drag.node.style.left = `${drag.layout.x}%`;
			drag.node.style.top = `${drag.layout.y}%`;
		});
		const endDrag = () => {
			if (!drag) return;
			drag.node.classList.remove('dragging');
			drag = null;
		};
		paper.addEventListener('pointerup', endDrag);
		paper.addEventListener('pointercancel', endDrag);

		function updateSelected(action) {
			if (!selectedNode) return toastMsg('先点选一个拼贴图案');
			const { node, layout } = selectedNode;
			if (action === 'front') layout.z = Math.max(...nodes.map((entry) => entry.layout.z)) + 1;
			if (action === 'back') layout.z = Math.min(...nodes.map((entry) => entry.layout.z)) - 1;
			if (action === 'smaller') layout.size = Math.max(8, layout.size - 5);
			if (action === 'bigger') layout.size = Math.min(90, layout.size + 5);
			if (action === 'remove') {
				state.basket = state.basket.filter((item) => item.key !== layout.key);
				layoutState.delete(selectedNode.item.key);
				selectedNode = null;
				renderPaper();
				renderTray();
				selectionLabel.textContent = '未选中图案';
				return;
			}
			node.style.width = `${layout.size}%`;
			node.style.zIndex = layout.z;
		}

		wrap.querySelector('#collage-smaller').addEventListener('click', () => updateSelected('smaller'));
		wrap.querySelector('#collage-bigger').addEventListener('click', () => updateSelected('bigger'));
		wrap.querySelector('#collage-front').addEventListener('click', () => updateSelected('front'));
		wrap.querySelector('#collage-back').addEventListener('click', () => updateSelected('back'));
		wrap.querySelector('#collage-remove').addEventListener('click', () => updateSelected('remove'));
		wrap.querySelector('#collage-rotate').addEventListener('input', (event) => {
			if (!selectedNode) return;
			selectedNode.layout.rotation = Number(event.target.value);
			selectedNode.node.style.transform = `rotate(${selectedNode.layout.rotation}deg)`;
		});
		wrap.querySelector('#collage-reset').addEventListener('click', () => {
			layoutState.clear();
			selectedNode = null;
			renderPaper();
			selectionLabel.textContent = '未选中图案';
		});
		wrap.querySelector('#collage-clear').addEventListener('click', () => {
			state.basket = [];
			layoutState.clear();
			selectedNode = null;
			renderPaper();
			renderTray();
		});
		wrap.querySelector('#collage-more').addEventListener('click', () => {
			closeCollage();
			open('sheep');
		});
		const closeCollage = () => {
			wrap.classList.remove('on');
			setTimeout(() => wrap.remove(), 220);
		};
		wrap.querySelector('#collage-close').addEventListener('click', () => {
			closeCollage();
			open('sheep');
		});
		wrap.querySelector('#collage-export').addEventListener('click', async () => {
			try {
				const canvas = document.createElement('canvas');
				canvas.width = 1800;
				canvas.height = 2400;
				const ctx = canvas.getContext('2d');
				ctx.fillStyle = '#FFFDF8';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.strokeStyle = 'rgba(120,108,86,.08)';
				ctx.lineWidth = 1;
				for (let y = 60; y < canvas.height; y += 84) {
					ctx.beginPath();
					ctx.moveTo(0, y);
					ctx.lineTo(canvas.width, y);
					ctx.stroke();
				}
				const sorted = [...nodes].sort((a, b) => a.layout.z - b.layout.z);
				for (const entry of sorted) {
					const { layout } = entry;
					const x = (layout.x / 100) * canvas.width;
					const y = (layout.y / 100) * canvas.height;
					const width = (layout.size / 100) * canvas.width;
					const height = width * ((entry.item.height || 1) / (entry.item.width || 1));
					ctx.save();
					ctx.translate(x + width / 2, y + height / 2);
					ctx.rotate((layout.rotation * Math.PI) / 180);
					if (entry.item.image) {
						const image = await new Promise((resolve, reject) => {
							const img = new Image();
							img.onload = () => resolve(img);
							img.onerror = reject;
							img.src = entry.item.image;
						});
						ctx.drawImage(image, -width / 2, -height / 2, width, height);
					} else {
						const colors = entry.item.tone ?? ['#C8C2B5'];
						const unit = width / colors.length;
						colors.forEach((color, index) => {
							ctx.fillStyle = color;
							ctx.fillRect(-width / 2 + unit * index, -height / 2, unit, height);
						});
					}
					ctx.restore();
				}
				const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
				downloadBlob(blob, `纸间拼贴-${new Date().toISOString().slice(0, 10)}.png`);
				toastMsg('已导出 1800 × 2400 PNG');
			} catch (error) {
				console.error(error);
				toastMsg('导出失败，请重试');
			}
		});
		renderPaper();
		renderTray();
	}

	async function importFiles(files) {
		if (!files?.length || state.importing) return;
		state.importing = true;
		renderOpen();
		const list = Array.from(files).filter((file) => file.type.startsWith('image/'));
		let imported = 0;
		let duplicates = 0;
		try {
			for (const file of list) {
				const result = await store.importFiles([file], store.settings.categories);
				if (result[0]?.duplicate) duplicates++;
				else if (result[0]?.material) imported++;
			}
			await updateStorage();
			state.importing = false;
			renderOpen();
			const sampleRemoved = imported > 0 && !store.materials.some((material) => material.sample);
			toastMsg(`${imported ? `已录入 ${imported} 张素材并完成颜色识别` : '没有新增素材'}${duplicates ? `，跳过 ${duplicates} 张重复图片` : ''}${sampleRemoved ? '；示例数据已自动收起' : ''}`);
		} catch (error) {
			console.error(error);
			state.importing = false;
			renderOpen();
			toastMsg(`录入失败：${error.message}`);
		}
	}

	function bindBody() {
		body.querySelectorAll('[data-open]').forEach(() => {});
		const addBox = body.querySelector('#zw-box-add');
		if (addBox) addBox.addEventListener('click', () => showBoxEditor());
		body.querySelectorAll('[data-edit-box]').forEach((button) => {
			button.addEventListener('click', (event) => {
				event.stopPropagation();
				showBoxEditor(button.dataset.editBox);
			});
		});
		body.querySelectorAll('[data-box]').forEach((boxCard) => {
			const openOrPlace = async () => {
				const boxId = boxCard.dataset.box;
				if (!state.moveMaterialId) {
					showBoxDetail(boxId);
					return;
				}
				const materialId = state.moveMaterialId;
				const result = await store.assignMaterialToBox(materialId, boxId);
				if (!result.ok) {
					state.moveMaterialId = null;
					renderOpen();
					toastMsg(result.message);
					return;
				}
				state.moveMaterialId = null;
				renderOpen();
				toastMsg(`素材已放入「${result.box.name}」`);
			};
			boxCard.addEventListener('click', (event) => {
				if (event.target.closest('[data-edit-box]')) return;
				openOrPlace();
			});
			boxCard.addEventListener('keydown', (event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					openOrPlace();
				}
			});
			boxCard.addEventListener('dragover', (event) => {
				event.preventDefault();
				event.dataTransfer.dropEffect = 'move';
				boxCard.classList.add('drag-over');
			});
			boxCard.addEventListener('dragleave', () => boxCard.classList.remove('drag-over'));
			boxCard.addEventListener('drop', async (event) => {
				event.preventDefault();
				boxCard.classList.remove('drag-over');
				const materialId = event.dataTransfer.getData('text/plain') || state.moveMaterialId;
				if (!materialId) return;
				const result = await store.assignMaterialToBox(materialId, boxCard.dataset.box);
				if (!result.ok) {
					state.moveMaterialId = null;
					renderOpen();
					toastMsg(result.message);
					return;
				}
				state.moveMaterialId = null;
				renderOpen();
				toastMsg(`已收纳到「${result.box.name}」`);
			});
		});
		body.querySelectorAll('[data-storage-material]').forEach((card) => {
			card.addEventListener('click', () => {
				state.moveMaterialId = state.moveMaterialId === card.dataset.storageMaterial ? null : card.dataset.storageMaterial;
				renderOpen();
			});
			card.addEventListener('dragstart', (event) => {
				state.moveMaterialId = card.dataset.storageMaterial;
				event.dataTransfer.effectAllowed = 'move';
				event.dataTransfer.setData('text/plain', card.dataset.storageMaterial);
				card.classList.add('picked');
			});
			card.addEventListener('dragend', () => {
				card.classList.remove('picked');
				body.querySelectorAll('.drag-over').forEach((item) => item.classList.remove('drag-over'));
			});
		});
		const cancelMove = body.querySelector('#zw-cancel-move');
		if (cancelMove) {
			cancelMove.addEventListener('click', () => {
				state.moveMaterialId = null;
				renderOpen();
			});
		}
		body.querySelectorAll('[data-color]').forEach((button) => {
			button.addEventListener('click', () => {
				state.filterColor = button.dataset.color;
				state.filterCategory = 'all';
				open('sheep');
			});
		});
		body.querySelectorAll('[data-category]').forEach((button) => {
			button.addEventListener('click', () => {
				state.filterColor = '全部';
				state.filterCategory = button.dataset.category;
				open('sheep');
			});
		});
		body.querySelectorAll('#zw-category-add').forEach((button) => button.addEventListener('click', showCategoryEditor));
		const search = body.querySelector('#zw-search');
		if (search) {
			search.addEventListener('input', () => {
				state.search = search.value;
				const caret = search.selectionStart;
				renderOpen();
				const next = body.querySelector('#zw-search');
				next?.focus();
				next?.setSelectionRange(caret, caret);
			});
		}
		body.querySelectorAll('[data-filter-color]').forEach((button) => {
			button.addEventListener('click', () => {
				state.filterColor = button.dataset.filterColor;
				renderOpen();
			});
		});
		body.querySelectorAll('[data-filter-category]').forEach((button) => {
			button.addEventListener('click', () => {
				state.filterCategory = button.dataset.filterCategory;
				renderOpen();
			});
		});
		const selectButton = body.querySelector('#zw-select');
		if (selectButton) {
			selectButton.addEventListener('click', () => {
				state.selectMode = !state.selectMode;
				if (!state.selectMode) state.selected.clear();
				renderOpen();
			});
		}
		body.querySelectorAll('[data-material]').forEach((card) => {
			card.addEventListener('click', (event) => {
				if (event.target.closest('[data-favorite]')) return;
				const id = card.dataset.material;
				if (state.selectMode) {
					if (state.selected.has(id)) state.selected.delete(id);
					else state.selected.add(id);
					renderOpen();
				} else {
					showMaterialDetail(id);
				}
			});
		});
		body.querySelectorAll('[data-favorite]').forEach((button) => {
			button.addEventListener('click', async (event) => {
				event.stopPropagation();
				const material = store.materials.find((item) => item.id === button.dataset.favorite);
				if (!material) return;
				await store.updateMaterial(material.id, { favorite: !material.favorite });
				renderOpen();
			});
		});
		const deleteSelected = body.querySelector('#zw-delete-selected');
		if (deleteSelected) {
			deleteSelected.addEventListener('click', async () => {
				const ids = Array.from(state.selected);
				await store.deleteMaterials(ids);
				state.basket = state.basket.filter((item) => !ids.includes(item.materialId));
				state.selected.clear();
				renderOpen();
				toastMsg(`已删除 ${ids.length} 件素材`);
			});
		}
		const addSelected = body.querySelector('#zw-add-selected');
		if (addSelected) {
			addSelected.addEventListener('click', () => {
				for (const id of state.selected) {
					const material = store.materials.find((item) => item.id === id);
					if (material) addMaterialToBasket(material);
				}
				state.selected.clear();
				state.selectMode = false;
				renderOpen();
				showCollage();
			});
		}
		const album = body.querySelector('#zw-album');
		const shoot = body.querySelector('#zw-shoot');
		const file = body.querySelector('#zw-file');
		const camera = body.querySelector('#zw-camera');
		if (album && file) {
			album.addEventListener('click', () => file.click());
			file.addEventListener('change', () => importFiles(file.files));
		}
		if (shoot && camera) {
			shoot.addEventListener('click', () => camera.click());
			camera.addEventListener('change', () => importFiles(camera.files));
		}
		const drop = body.querySelector('#zw-drop');
		if (drop) {
			drop.addEventListener('click', () => file?.click());
			drop.addEventListener('dragover', (event) => {
				event.preventDefault();
				drop.classList.add('drag');
			});
			drop.addEventListener('dragleave', () => drop.classList.remove('drag'));
			drop.addEventListener('drop', (event) => {
				event.preventDefault();
				drop.classList.remove('drag');
				importFiles(event.dataTransfer.files);
			});
		}
		const exportButton = body.querySelector('#zw-export');
		if (exportButton) {
			exportButton.addEventListener('click', () => {
				const backup = store.exportBackup();
				downloadBlob(new Blob([JSON.stringify(backup)], { type: 'application/json' }), `纸间手账备份-${new Date().toISOString().slice(0, 10)}.json`);
				toastMsg('备份已导出，包含素材图片和分类');
			});
		}
		const importButton = body.querySelector('#zw-import');
		const backupFile = body.querySelector('#zw-backup-file');
		if (importButton && backupFile) {
			importButton.addEventListener('click', () => backupFile.click());
			backupFile.addEventListener('change', async () => {
				const file = backupFile.files[0];
				if (!file) return;
				try {
					await store.importBackup(JSON.parse(await file.text()));
					renderOpen();
					toastMsg('备份已导入');
				} catch (error) {
					toastMsg(`备份导入失败：${error.message}`);
				}
			});
		}
		const clearDemo = body.querySelector('#zw-clear-demo');
		if (clearDemo) {
			clearDemo.addEventListener('click', async () => {
				await store.deleteMaterials(store.materials.filter((material) => material.sample).map((material) => material.id));
				store.settings.manualNews = store.settings.manualNews.filter((news) => !news.sample);
				store.settings.hideSampleNews = true;
				store.saveSettings();
				renderOpen();
				toastMsg('示例素材和示例预告已清空');
			});
		}
		body.querySelectorAll('[data-news-platform]').forEach((button) => {
			button.addEventListener('click', () => {
				state.newsPlatform = button.dataset.newsPlatform;
				renderOpen();
			});
		});
		const refresh = body.querySelector('#zw-refresh-news');
		if (refresh) {
			refresh.addEventListener('click', async () => {
				refresh.disabled = true;
				refresh.textContent = '刷新中…';
				const result = await store.refreshFeeds();
				state.newsItems = result.items;
				renderOpen();
				toastMsg(result.errors.length ? `已刷新；${result.errors.length} 个订阅源因跨域或网络问题无法读取` : result.items.length ? `收到 ${result.items.length} 条新预告` : '订阅源暂时没有新内容');
			});
		}
		const sourcesButton = body.querySelector('#zw-manage-sources');
		if (sourcesButton) sourcesButton.addEventListener('click', showSourcesManager);
		const manualButton = body.querySelector('#zw-manual-news');
		if (manualButton) manualButton.addEventListener('click', showManualNews);
		const openCollage = body.querySelector('#zw-open-collage');
		if (openCollage) openCollage.addEventListener('click', showCollage);
	}

	function open(kind) {
		if (kind === 'layout') {
			showCollage();
			return;
		}
		state.openKind = kind;
		renderOpen();
		drawer.classList.add('on');
		nav.classList.add('on');
		api.showChrome(true);
		nav.querySelectorAll('[data-open]').forEach((button) => button.classList.toggle('on', button.dataset.open === kind));
	}

	nav.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => {
		if (button.dataset.open === 'layout') showCollage();
		else if (state.openKind === button.dataset.open && drawer.classList.contains('on')) api.close();
		else open(button.dataset.open);
	}));
	drawer.querySelector('#zw-close').addEventListener('click', () => api.close());

	// A lightweight, configurable feed refresh. Cross-origin restrictions are surfaced instead of hidden.
	const refreshTimer = setInterval(async () => {
		if (!store.settings.sources.some((source) => source.feedUrl)) return;
		const last = store.settings.lastNewsRefresh || 0;
		if (Date.now() - last < 10 * 60_000) return;
		const result = await store.refreshFeeds();
		state.newsItems = result.items;
		if (state.openKind === 'news') renderOpen();
	}, 10 * 60_000);
	addEventListener('focus', async () => {
		if (Date.now() - (store.settings.lastNewsRefresh || 0) < 10 * 60_000) return;
		if (!store.settings.sources.some((source) => source.feedUrl)) return;
		const result = await store.refreshFeeds();
		state.newsItems = result.items;
		if (state.openKind === 'news') renderOpen();
	});
	addEventListener('beforeunload', () => clearInterval(refreshTimer));

	const api = {
		open,
		close() {
			drawer.classList.remove('on');
			state.openKind = null;
			nav.querySelectorAll('[data-open]').forEach((button) => button.classList.remove('on'));
		},
		showChrome(on) {
			brand.classList.toggle('on', on);
			nav.classList.toggle('on', on);
		},
		toast: toastMsg,
		get isOpen() {
			return !!state.openKind;
		},
		get basketCount() {
			return state.basket.length;
		},
	};

	addEventListener('keydown', (event) => {
		if (event.key !== 'Escape') return;
		if (root.querySelector('#zw-collage')) {
			root.querySelector('#collage-close')?.click();
			return;
		}
		const overlays = root.querySelectorAll('.overlay');
		if (overlays.length) {
			const last = overlays[overlays.length - 1];
			last.querySelector('[data-close]')?.click();
			return;
		}
		api.close();
	});

	// Preload the main drawer body so first paint does not show an empty shell.
	renderOpen();
	return api;
}
