/* ===== 01. Twenty-template rendering engine ===== */
(function () {
  'use strict';

  const templates = [
    {id:'01',name:'经典留白',en:'The Essential',category:'简约',description:'清晰的单栏层级，适合多数行业的第一份正式简历。',accent:'#2c3544',tags:['单栏','通用']},
    {id:'02',name:'编辑来信',en:'Editorial Letter',category:'简约',description:'衬线标题与舒展留白，让职业经历像一篇清楚的叙事。',accent:'#615344',tags:['衬线','叙事']},
    {id:'03',name:'深蓝领航',en:'Navy Executive',category:'商务',description:'深色左侧栏容纳个人信息，工作经历保持醒目的阅读主线。',accent:'#203b58',tags:['左侧栏','稳重']},
    {id:'04',name:'橙色提案',en:'Orange Proposal',category:'创意',description:'横向色带、双栏内容与醒目的项目标题，表达积极的创造力。',accent:'#ce633b',tags:['色带','双栏']},
    {id:'05',name:'青藤初章',en:'Campus Chapter',category:'校园',description:'教育优先，作品与实践并排展示，适合校园招聘与实习申请。',accent:'#36786b',tags:['教育优先','清新']},
    {id:'06',name:'学术清序',en:'Academic Order',category:'学术',description:'居中的身份信息与朴素的分节线，突出教育和研究项目。',accent:'#293b50',tags:['单栏','规范']},
    {id:'07',name:'瑞士网格',en:'Swiss Grid',category:'创意',description:'大字号姓名与编号章节，用明确的网格组织丰富经历。',accent:'#c94e39',tags:['编号','网格']},
    {id:'08',name:'薄荷档案',en:'Mint Profile',category:'简约',description:'浅色个人档案栏与开阔的正文空间，轻盈又有条理。',accent:'#477e75',tags:['浅侧栏','柔和']},
    {id:'09',name:'右岸商务',en:'Right Bank',category:'商务',description:'右侧深色信息栏，让左侧职业经历自然成为视觉焦点。',accent:'#363c56',tags:['右侧栏','专业']},
    {id:'10',name:'项目主张',en:'Project First',category:'创意',description:'先展示项目成果，再展开工作经历，适合作品导向的岗位。',accent:'#487486',tags:['项目优先','作品']},
    {id:'11',name:'时序轨迹',en:'Career Timeline',category:'简约',description:'日期与内容沿时间轴排列，便于浏览连续的职业成长。',accent:'#4b677f',tags:['时间轴','单栏']},
    {id:'12',name:'温暖手记',en:'Warm Notes',category:'创意',description:'米色纸面与柔和的棕色标记，适合亲切而克制的个人表达。',accent:'#9b6a4e',tags:['纸感','双栏']},
    {id:'13',name:'管理视野',en:'Executive View',category:'商务',description:'完整的深色页眉与摘要区，为资深岗位建立沉稳的第一印象。',accent:'#293d43',tags:['大页眉','资深']},
    {id:'14',name:'代码秩序',en:'Code & Clarity',category:'简约',description:'等宽细节与清楚的模块标记，适合理性、技术型的个人风格。',accent:'#314a46',tags:['等宽','模块']},
    {id:'15',name:'格栅档案',en:'Structured File',category:'商务',description:'分区式档案布局，将经历、教育与能力分别安排在清晰的网格中。',accent:'#596b85',tags:['档案','分区']},
    {id:'16',name:'灵感宣言',en:'Creative Statement',category:'创意',description:'强调个人简介与项目叙事，用不对称排版展现设计感。',accent:'#a95469',tags:['不对称','大标题']},
    {id:'17',name:'森林职序',en:'Forest Professional',category:'商务',description:'沉静的绿色标题区与细致的支持栏，适合成熟的专业表达。',accent:'#365d4c',tags:['双栏','绿色']},
    {id:'18',name:'逐光校招',en:'Bright Graduate',category:'校园',description:'先呈现学校与实践，用浅蓝分区帮助招聘者快速找到重点。',accent:'#3c71a3',tags:['校招','教育优先']},
    {id:'19',name:'研习档案',en:'Research Dossier',category:'学术',description:'横向元信息与独立教育章节，适合研究型和继续深造申请。',accent:'#745579',tags:['研究','分节']},
    {id:'20',name:'黑白签名',en:'Signature Mono',category:'简约',description:'大姓名、细线条与紧凑支持栏，保留鲜明而简洁的个人识别。',accent:'#282828',tags:['黑白','大姓名']}
  ];

  const emptyEducation = () => ({school:'',degree:'',major:'',start:'',end:'',details:''});
  const emptyExperience = () => ({company:'',role:'',start:'',end:'',details:''});
  const emptyProject = () => ({name:'',role:'',start:'',end:'',details:''});
  const blank = {
    basics:{name:'',headline:'',phone:'',email:'',city:'',website:'',summary:'',photo:''},
    education:[emptyEducation()],experience:[emptyExperience()],projects:[emptyProject()],
    skills:'',certificates:'',languages:'',awards:'',extra:''
  };
  const demo = {
    basics:{name:'林知夏',headline:'产品设计师 · 体验与视觉设计',phone:'138-0000-0000',email:'zhixia.lin@example.com',city:'杭州',website:'portfolio.example.com/zhixia',summary:'关注真实的用户需求，擅长将复杂的信息转化为清晰、易用的产品体验。拥有从用户研究、交互原型到设计交付的完整项目经验，期待与重视协作的团队一起创造有温度的产品。',photo:''},
    education:[{school:'云川理工大学（示例）',degree:'本科',major:'数字媒体艺术',start:'2017.09',end:'2021.06',details:'主修交互设计、信息可视化、用户研究与视觉传达。\n毕业设计《城市慢行导览》入选院系年度作品展。'}],
    experience:[
      {company:'拾光数字科技（示例）',role:'产品设计师',start:'2023.04',end:'至今',details:'负责协作工具的核心流程设计，围绕项目创建、任务分配与进度反馈建立统一的交互规则。\n通过用户访谈与可用性测试梳理使用障碍，推动 3 个关键流程的迭代与上线。\n维护跨端组件库，与产品及开发团队共同完善设计规范，提升交付与协作效率。'},
      {company:'方舟创意工作室（示例）',role:'初级体验设计师',start:'2021.07',end:'2023.03',details:'参与生活方式与公共服务类产品的界面设计，完成需求梳理、原型和视觉方案。\n建立项目设计资产与交付清单，协助团队进行设计走查和细节优化。'}
    ],
    projects:[
      {name:'「有序」团队协作平台',role:'体验设计负责人',start:'2024.03',end:'2024.11',details:'从日常协作场景出发，重构任务看板和项目概览，减少信息查找成本。\n组织用户测试并持续跟进反馈，完成桌面端与移动端的核心体验统一。'},
      {name:'「慢游」城市导览',role:'交互与视觉设计',start:'2022.06',end:'2022.12',details:'围绕步行探索设计路线收藏、地点导览与行程整理流程。\n用清晰的信息层级和友好的地图标记，帮助用户更轻松地规划城市漫步。'}
    ],
    skills:'产品设计｜用户研究、信息架构、交互原型\n视觉设计｜界面设计、排版、图标与设计系统\n设计工具｜Figma、Photoshop、Illustrator\n协作交付｜设计评审、开发沟通、可用性测试',
    certificates:'设计思维与用户体验课程结业（示例）',
    languages:'普通话｜母语\n英语｜可阅读专业资料与进行日常沟通',
    awards:'院系优秀毕业设计（2021，示例）',
    extra:'喜欢观察城市中的公共信息设计，并用速写记录生活中的小发现。'
  };

  const configs = {
    '01':{layout:'single',header:'classic',order:['summary','experience','projects','education','skills','certificates','languages','awards','extra']},
    '02':{layout:'single',header:'editorial',order:['summary','experience','projects','education','skills','languages','certificates','awards','extra']},
    '03':{layout:'sidebar-left',header:'sidebar',side:['contact','summary','skills','languages','certificates'],main:['experience','projects','education','awards','extra']},
    '04':{layout:'banner-columns',header:'banner',main:['summary','experience','projects','extra'],side:['education','skills','certificates','languages','awards']},
    '05':{layout:'campus',header:'center',lead:['education'],main:['projects','experience','extra'],side:['summary','skills','awards','certificates','languages']},
    '06':{layout:'single',header:'academic',order:['education','summary','projects','experience','awards','certificates','skills','languages','extra']},
    '07':{layout:'swiss',header:'split',main:['summary','experience','projects'],side:['education','skills','certificates','languages','awards','extra'],numbered:true},
    '08':{layout:'sidebar-left',header:'sidebar',side:['contact','summary','education','languages'],main:['experience','projects','skills','certificates','awards','extra']},
    '09':{layout:'sidebar-right',header:'classic',side:['contact','education','skills','languages','certificates'],main:['summary','experience','projects','awards','extra']},
    '10':{layout:'project-first',header:'split',lead:['summary','skills'],main:['projects','experience'],side:['education','certificates','languages','awards','extra']},
    '11':{layout:'single',header:'classic',order:['summary','experience','projects','education','skills','certificates','languages','awards','extra']},
    '12':{layout:'notes',header:'editorial',main:['summary','experience','projects'],side:['education','skills','languages','certificates','awards','extra']},
    '13':{layout:'executive',header:'banner',lead:['summary'],main:['experience','projects'],side:['education','skills','certificates','languages','awards','extra']},
    '14':{layout:'single',header:'code',order:['summary','skills','experience','projects','education','certificates','languages','awards','extra'],numbered:true},
    '15':{layout:'dossier',header:'split',lead:['summary'],main:['experience','projects'],side:['education','skills','certificates','languages','awards','extra']},
    '16':{layout:'statement',header:'editorial',lead:['summary'],main:['projects','experience'],side:['skills','education','awards','languages','certificates','extra'],numbered:true},
    '17':{layout:'forest',header:'banner',main:['experience','projects','extra'],side:['summary','education','skills','languages','certificates','awards']},
    '18':{layout:'graduate',header:'banner',main:['education','projects','experience'],side:['summary','skills','certificates','awards','languages','extra']},
    '19':{layout:'research',header:'academic',lead:['education'],main:['projects','experience','extra'],side:['summary','awards','certificates','skills','languages']},
    '20':{layout:'signature',header:'signature',main:['experience','projects'],side:['summary','education','skills','languages','certificates','awards','extra']}
  };

  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const str = value => typeof value === 'string' || typeof value === 'number' ? String(value).trim() : '';
  const lines = value => str(value).split(/\r?\n/).map(v => v.trim()).filter(Boolean);
  const hasValue = item => item && typeof item === 'object' && Object.keys(item).some(key => str(item[key]));
  const toEntries = value => Array.isArray(value) ? value.filter(hasValue) : [];
  const labels = {summary:'个人简介',education:'教育经历',experience:'工作经历',projects:'项目经历',skills:'专业技能',certificates:'证书资质',languages:'语言能力',awards:'荣誉奖励',extra:'更多关于我'};
  const enLabels = {summary:'PROFILE',education:'EDUCATION',experience:'EXPERIENCE',projects:'PROJECTS',skills:'SKILLS',certificates:'CERTIFICATES',languages:'LANGUAGES',awards:'HONORS',extra:'MORE'};

  function render(data, templateId, options) {
    const source = data && typeof data === 'object' ? data : {};
    const basics = source.basics && typeof source.basics === 'object' ? source.basics : {};
    const template = templates.find(item => item.id === String(templateId).padStart(2,'0')) || templates[0];
    const config = configs[template.id];
    const placeholder = Boolean(options && options.placeholders);
    const name = str(basics.name) || (placeholder ? '你的姓名' : '');
    const headline = str(basics.headline) || (placeholder ? '你的职业方向 / 目标岗位' : '');
    const validPhoto = /^data:image\/(jpeg|png|webp);base64,/.test(str(basics.photo));
    let sectionIndex = 0;

    function photo() {
      return validPhoto ? '<img class="rs-photo" src="'+esc(str(basics.photo))+'" alt="个人照片">' : '';
    }
    function identity(withPhoto) {
      return '<div class="rs-identity'+(!str(basics.name) && placeholder ? ' rs-placeholder' : '')+'">'+
        (withPhoto ? photo() : '')+'<div class="rs-name-block">'+
        (name ? '<h1 class="rs-name">'+esc(name)+'</h1>' : '')+
        (headline ? '<p class="rs-headline'+(!str(basics.headline) && placeholder ? ' rs-placeholder' : '')+'">'+esc(headline)+'</p>' : '')+'</div></div>';
    }
    function contacts() {
      const fields = [['phone','电话'],['email','邮箱'],['city','城市'],['website','主页']];
      const filled = fields.filter(field => str(basics[field[0]]));
      if (!filled.length) return '';
      return '<ul class="rs-contact">'+filled.map(field => '<li><span class="rs-contact-label">'+field[1]+'</span><span class="rs-contact-value">'+esc(str(basics[field[0]]))+'</span></li>').join('')+'</ul>';
    }
    function header(type, withContact) {
      const eyebrow = type === 'code' ? '<p class="rs-eyebrow">// CURRICULUM VITAE</p>' : type === 'editorial' ? '<p class="rs-eyebrow">CURRICULUM VITAE</p>' : type === 'academic' ? '<p class="rs-eyebrow">个人履历 · CURRICULUM VITAE</p>' : '';
      return '<header class="rs-header rs-header-'+type+'">'+eyebrow+identity(true)+(withContact ? contacts() : '')+'</header>';
    }
    function bulletList(value, className) {
      const items = lines(value);
      return items.length ? '<ul class="'+className+'">'+items.map(line => '<li>'+esc(line.replace(/^[-•●·]\s*/,''))+'</li>').join('')+'</ul>' : '';
    }
    function date(item) {
      const dateText = [str(item.start),str(item.end)].filter(Boolean).join(' — ');
      return dateText ? '<span class="rs-date">'+esc(dateText)+'</span>' : '';
    }
    function entries(key) {
      return toEntries(source[key]).map(item => {
        let title = '', subtitle = '';
        if (key === 'education') {title=str(item.school);subtitle=[str(item.degree),str(item.major)].filter(Boolean).join(' · ');}
        if (key === 'experience') {title=str(item.company);subtitle=str(item.role);}
        if (key === 'projects') {title=str(item.name);subtitle=str(item.role);}
        return '<div class="rs-entry rs-entry-'+key+'"><div class="rs-entry-head"><div class="rs-entry-titles">'+
          (title ? '<h3>'+esc(title)+'</h3>' : '')+(subtitle ? '<p class="rs-subtitle">'+esc(subtitle)+'</p>' : '')+
          '</div>'+date(item)+'</div>'+bulletList(item.details,'rs-details')+'</div>';
      }).join('');
    }
    function section(key) {
      if (key === 'contact') return contacts() ? '<div class="rs-side-contact">'+contacts()+'</div>' : '';
      let body = '';
      if (key === 'summary') {
        if (str(basics.summary)) body='<p class="rs-summary">'+esc(str(basics.summary)).replace(/\r?\n/g,'<br>')+'</p>';
      } else if (['education','experience','projects'].includes(key)) {
        body=entries(key);
      } else {
        body=bulletList(source[key],key==='skills' ? 'rs-skills' : 'rs-plain-list');
      }
      if (!body) return '';
      sectionIndex += 1;
      return '<section class="rs-section rs-section-'+key+'"><div class="rs-section-heading">'+
        (config.numbered ? '<span class="rs-section-number" aria-hidden="true">'+String(sectionIndex).padStart(2,'0')+'</span>' : '')+
        '<h2>'+labels[key]+'</h2><span class="rs-section-en" aria-hidden="true">'+enLabels[key]+'</span></div>'+body+'</section>';
    }
    function group(keys) {return (keys || []).map(section).join('');}
    function columns(main, side, extraClass) {
      const mainHtml=group(main), sideHtml=group(side);
      return '<div class="rs-layout '+(extraClass || '')+(!sideHtml ? ' rs-layout-no-side' : '')+'"><div class="rs-main">'+mainHtml+'</div>'+(sideHtml ? '<aside class="rs-sidebar">'+sideHtml+'</aside>' : '')+'</div>';
    }

    let html = '';
    if (config.layout === 'single') {
      html=header(config.header,true)+'<div class="rs-content">'+group(config.order)+'</div>';
    } else if (config.layout === 'sidebar-left') {
      const sideHtml=header('sidebar',false)+group(config.side);
      const mainHtml=group(config.main);
      html='<div class="rs-layout rs-layout-left"><aside class="rs-sidebar">'+sideHtml+'</aside><div class="rs-main">'+mainHtml+'</div></div>';
    } else if (config.layout === 'sidebar-right') {
      const mainHtml=header('classic',false)+group(config.main);
      const sideHtml=photo()+group(config.side);
      html='<div class="rs-layout rs-layout-right"><div class="rs-main">'+mainHtml+'</div><aside class="rs-sidebar">'+sideHtml+'</aside></div>';
    } else if (config.layout === 'campus') {
      html=header(config.header,true)+'<div class="rs-lead">'+group(config.lead)+'</div>'+columns(config.main,config.side,'rs-campus-columns');
    } else if (config.layout === 'research') {
      html=header(config.header,true)+'<div class="rs-lead">'+group(config.lead)+'</div>'+columns(config.main,config.side,'rs-research-columns');
    } else {
      html=header(config.header,true)+(config.lead ? '<div class="rs-lead">'+group(config.lead)+'</div>' : '')+columns(config.main,config.side,'rs-layout-'+config.layout);
    }
    return '<article class="resume-sheet rs-template-'+template.id+' rs-family-'+config.layout+'" data-template="'+template.id+'" style="--rs-accent:'+template.accent+'">'+html+'</article>';
  }

  window.ResumeKit = {templates:templates,demo:demo,blank:blank,render:render};
})();

;

/* ===== 02. Self-contained export styles ===== */
/* Self-contained CSS for the standalone HTML download. Regenerate after editing resume.css. */
window.RESUME_EXPORT_CSS = "/* The resume canvas is self-contained. Application controls live in styles.css. */\n.resume-sheet{--rs-ink:#26313c;--rs-muted:#69727d;--rs-line:#dfe4e7;--rs-paper:#fff;--rs-soft:#f2f5f6;box-sizing:border-box;width:794px;min-height:1123px;padding:54px 55px;background:var(--rs-paper);color:var(--rs-ink);font-family:Arial,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;font-size:13px;line-height:1.7;letter-spacing:.02em;text-align:left;overflow-wrap:anywhere;word-break:normal;font-weight:400}\n.resume-sheet *,.resume-sheet *::before,.resume-sheet *::after{box-sizing:border-box}\n.resume-sheet h1,.resume-sheet h2,.resume-sheet h3,.resume-sheet p,.resume-sheet ul{margin:0}\n.resume-sheet .rs-header{position:relative;margin-bottom:29px;padding-bottom:24px;border-bottom:2px solid var(--rs-accent)}\n.resume-sheet .rs-identity{display:flex;align-items:center;gap:23px;min-width:0}\n.resume-sheet .rs-name-block{flex:1;min-width:0}\n.resume-sheet .rs-name{font-size:34px;line-height:1.2;letter-spacing:.12em;font-weight:700;color:var(--rs-accent)}\n.resume-sheet .rs-headline{margin-top:10px;font-size:14px;letter-spacing:.08em;color:var(--rs-muted);line-height:1.6}\n.resume-sheet .rs-photo{display:block;width:86px;height:108px;object-fit:cover;flex-shrink:0;border-radius:2px;background:var(--rs-soft)}\n.resume-sheet .rs-contact{display:flex;flex-wrap:wrap;gap:5px 19px;padding:0;margin-top:19px;list-style:none;font-size:11px;line-height:1.7}\n.resume-sheet .rs-contact li{display:flex;gap:6px;min-width:0;max-width:100%;align-items:baseline}\n.resume-sheet .rs-contact-label{color:var(--rs-muted);font-size:10px;flex-shrink:0;letter-spacing:.03em}\n.resume-sheet .rs-contact-value{min-width:0;overflow-wrap:anywhere}\n.resume-sheet .rs-eyebrow{font-size:9px;line-height:1.4;letter-spacing:.22em;color:var(--rs-muted);margin-bottom:17px}\n.resume-sheet .rs-section{margin-bottom:24px;break-inside:auto}\n.resume-sheet .rs-section:last-child{margin-bottom:0}\n.resume-sheet .rs-section-heading{display:flex;align-items:baseline;gap:10px;border-bottom:1px solid var(--rs-line);padding-bottom:7px;margin-bottom:13px;break-after:avoid}\n.resume-sheet .rs-section-heading h2{font-size:15px;line-height:1.5;font-weight:700;letter-spacing:.12em;color:var(--rs-accent)}\n.resume-sheet .rs-section-en{font-size:8px;line-height:1.4;font-weight:400;letter-spacing:.12em;color:var(--rs-muted)}\n.resume-sheet .rs-section-number{font-size:11px;font-weight:700;letter-spacing:0;color:var(--rs-accent)}\n.resume-sheet .rs-entry{margin-bottom:17px;break-inside:avoid;page-break-inside:avoid}\n.resume-sheet .rs-entry:last-child{margin-bottom:0}\n.resume-sheet .rs-entry-head{display:flex;gap:12px;align-items:baseline;justify-content:space-between;margin-bottom:6px;break-after:avoid}\n.resume-sheet .rs-entry-titles{min-width:0;flex:1}\n.resume-sheet .rs-entry h3{font-size:13px;font-weight:700;line-height:1.65;letter-spacing:.025em}\n.resume-sheet .rs-subtitle{font-size:11.5px;color:var(--rs-muted);margin-top:2px}\n.resume-sheet .rs-date{flex-shrink:0;font-size:10px;color:var(--rs-muted);letter-spacing:0;line-height:1.7;max-width:45%;text-align:right}\n.resume-sheet .rs-details,.resume-sheet .rs-plain-list{padding:0 0 0 15px;list-style:disc;color:var(--rs-ink)}\n.resume-sheet .rs-details li,.resume-sheet .rs-plain-list li{padding-left:1px;margin:3px 0;font-size:11.5px;line-height:1.8}\n.resume-sheet .rs-details li::marker,.resume-sheet .rs-plain-list li::marker{color:var(--rs-accent);font-size:8px}\n.resume-sheet .rs-summary{font-size:12px;line-height:1.95;white-space:normal}\n.resume-sheet .rs-skills{padding:0;list-style:none}\n.resume-sheet .rs-skills li{font-size:11.5px;line-height:1.8;margin:5px 0;break-inside:avoid}\n.resume-sheet .rs-layout{display:grid;grid-template-columns:minmax(0,1fr) 194px;gap:28px;align-items:start;break-inside:auto}\n.resume-sheet .rs-layout-no-side{grid-template-columns:minmax(0,1fr)}\n.resume-sheet .rs-main,.resume-sheet .rs-sidebar{min-width:0;break-inside:auto}\n.resume-sheet .rs-sidebar .rs-section-heading{gap:5px;flex-wrap:wrap}\n.resume-sheet .rs-sidebar .rs-section-en{font-size:7px}\n.resume-sheet .rs-sidebar .rs-entry-head{display:block}\n.resume-sheet .rs-sidebar .rs-date{display:block;margin-top:3px;max-width:none;text-align:left}\n.resume-sheet .rs-sidebar .rs-section-heading h2{font-size:13px}\n.resume-sheet .rs-sidebar .rs-summary,.resume-sheet .rs-sidebar .rs-skills li,.resume-sheet .rs-sidebar .rs-plain-list li,.resume-sheet .rs-sidebar .rs-details li{font-size:10.5px}\n.resume-sheet .rs-sidebar .rs-entry h3{font-size:11.5px}\n.resume-sheet .rs-sidebar .rs-subtitle{font-size:10.5px}\n.resume-sheet .rs-lead{margin-bottom:26px}\n.resume-sheet .rs-placeholder{color:#9b9b9b}\n\n/* 01 — a compact classic header and calm single-column chronology. */\n.resume-sheet.rs-template-01 .rs-header-classic{padding-right:236px;min-height:90px}\n.resume-sheet.rs-template-01 .rs-header .rs-contact{position:absolute;right:0;top:0;width:210px;display:block;margin:0}\n.resume-sheet.rs-template-01 .rs-header .rs-contact li{margin-bottom:4px}\n.resume-sheet.rs-template-01 .rs-header:has(.rs-photo){padding-right:0}\n.resume-sheet.rs-template-01 .rs-header:has(.rs-photo) .rs-contact{position:static;width:auto;display:flex;margin-top:16px}\n.resume-sheet.rs-template-01 .rs-section-heading{border-bottom:none;padding-bottom:4px;position:relative;padding-left:13px}\n.resume-sheet.rs-template-01 .rs-section-heading::before{content:\"\";position:absolute;left:0;top:4px;width:3px;height:15px;background:var(--rs-accent)}\n\n/* 02 — an editorial page with a narrow date column and serif headlines. */\n.resume-sheet.rs-template-02{padding:59px 68px;--rs-line:#ded7ce;--rs-muted:#83766a}\n.resume-sheet.rs-template-02 .rs-name{font-family:Georgia,\"Songti SC\",\"SimSun\",serif;font-size:42px;letter-spacing:.16em;font-weight:400}\n.resume-sheet.rs-template-02 .rs-header{border-bottom:1px solid var(--rs-accent);margin-bottom:31px;padding-bottom:25px}\n.resume-sheet.rs-template-02 .rs-headline{font-size:13px}\n.resume-sheet.rs-template-02 .rs-section-heading h2{font-family:Georgia,\"Songti SC\",\"SimSun\",serif;font-weight:400;font-size:17px}\n.resume-sheet.rs-template-02 .rs-section-heading{border:0;padding:0;margin-bottom:12px}\n.resume-sheet.rs-template-02 .rs-section-en{margin-left:auto;font-size:7px}\n.resume-sheet.rs-template-02 .rs-section-summary{border-left:2px solid var(--rs-accent);padding-left:18px;margin:0 0 30px}\n.resume-sheet.rs-template-02 .rs-entry-head{flex-direction:row-reverse}\n.resume-sheet.rs-template-02 .rs-entry .rs-date{width:105px;text-align:left;max-width:105px;padding-top:2px}\n.resume-sheet.rs-template-02 .rs-details{margin-left:117px}\n.resume-sheet.rs-template-02 .rs-skills{display:grid;grid-template-columns:1fr 1fr;gap:0 20px}\n\n/* 03 / 08 — side profiles: dense navy or airy mint. */\n.resume-sheet.rs-template-03,.resume-sheet.rs-template-08{padding:0}\n.resume-sheet.rs-template-03 .rs-layout-left,.resume-sheet.rs-template-08 .rs-layout-left{grid-template-columns:237px minmax(0,1fr);gap:0;align-items:stretch;min-height:1123px}\n.resume-sheet.rs-template-03 .rs-sidebar{padding:46px 26px;background:var(--rs-accent);color:#fff;--rs-muted:#c4d3df;--rs-line:#5f7489}\n.resume-sheet.rs-template-03 .rs-main,.resume-sheet.rs-template-08 .rs-main{padding:48px 33px 48px 31px}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-name,.resume-sheet.rs-template-03 .rs-sidebar .rs-section-heading h2,.resume-sheet.rs-template-03 .rs-sidebar .rs-section-number{color:#fff}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-summary,.resume-sheet.rs-template-03 .rs-sidebar .rs-details,.resume-sheet.rs-template-03 .rs-sidebar .rs-plain-list{color:#e1e9f0}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-plain-list li::marker{color:#c4d3df}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-header,.resume-sheet.rs-template-08 .rs-sidebar .rs-header{border-bottom:0;padding-bottom:0;margin-bottom:24px}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-identity,.resume-sheet.rs-template-08 .rs-sidebar .rs-identity{display:block}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-name,.resume-sheet.rs-template-08 .rs-sidebar .rs-name{font-size:29px}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-headline,.resume-sheet.rs-template-08 .rs-sidebar .rs-headline{font-size:12px;letter-spacing:.035em;line-height:1.8}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-photo,.resume-sheet.rs-template-08 .rs-sidebar .rs-photo{width:92px;height:112px;margin-bottom:22px;border-radius:3px}\n.resume-sheet.rs-template-03 .rs-side-contact,.resume-sheet.rs-template-08 .rs-side-contact{margin-bottom:28px}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-contact,.resume-sheet.rs-template-08 .rs-sidebar .rs-contact{display:block;margin:0}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-contact li,.resume-sheet.rs-template-08 .rs-sidebar .rs-contact li{display:block;margin-bottom:12px}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-contact-label,.resume-sheet.rs-template-08 .rs-sidebar .rs-contact-label{display:block;font-size:9px}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-contact-value,.resume-sheet.rs-template-08 .rs-sidebar .rs-contact-value{font-size:10px}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-section,.resume-sheet.rs-template-08 .rs-sidebar .rs-section{margin-bottom:27px}\n.resume-sheet.rs-template-03 .rs-sidebar .rs-section-en,.resume-sheet.rs-template-08 .rs-sidebar .rs-section-en{display:none}\n.resume-sheet.rs-template-03 .rs-main .rs-section-heading{border-bottom:2px solid var(--rs-accent)}\n.resume-sheet.rs-template-08 .rs-sidebar{padding:47px 27px;background:#eaf3ef;--rs-muted:#648179;--rs-line:#ccded6}\n.resume-sheet.rs-template-08 .rs-sidebar .rs-section-heading{border-bottom:0;padding-bottom:0}\n.resume-sheet.rs-template-08 .rs-main .rs-section-heading{border-bottom:1px solid #d9e7e0}\n.resume-sheet.rs-template-08 .rs-main .rs-section-heading h2{font-size:16px}\n.resume-sheet.rs-template-08 .rs-main .rs-section-en{margin-left:auto}\n\n/* 04 — orange top ribbon, with a generous primary column. */\n.resume-sheet.rs-template-04{padding-top:0;--rs-line:#ead8cd}\n.resume-sheet.rs-template-04 .rs-header{margin:0 -55px 30px;padding:42px 55px 28px;background:#fbefe7;border-top:12px solid var(--rs-accent);border-bottom:0}\n.resume-sheet.rs-template-04 .rs-name{font-size:37px;letter-spacing:.16em}\n.resume-sheet.rs-template-04 .rs-layout{grid-template-columns:minmax(0,1fr) 187px;gap:30px}\n.resume-sheet.rs-template-04 .rs-sidebar{border-left:1px solid var(--rs-line);padding-left:20px}\n.resume-sheet.rs-template-04 .rs-section-heading{border-bottom:0;margin-bottom:10px}\n.resume-sheet.rs-template-04 .rs-section-heading h2{background:var(--rs-accent);color:#fff;padding:3px 10px;font-size:13px;letter-spacing:.07em}\n.resume-sheet.rs-template-04 .rs-section-projects .rs-entry{padding:12px 14px;background:#fbf5ef;border-left:2px solid var(--rs-accent)}\n\n/* 05 — centered campus identity and a full-width academic introduction. */\n.resume-sheet.rs-template-05{padding:45px 49px;--rs-line:#d5e4db}\n.resume-sheet.rs-template-05 .rs-header-center{text-align:center;border-bottom:0;padding-bottom:18px;margin-bottom:0}\n.resume-sheet.rs-template-05 .rs-identity{justify-content:center}\n.resume-sheet.rs-template-05 .rs-name-block{flex:0 1 auto}\n.resume-sheet.rs-template-05 .rs-contact{justify-content:center}\n.resume-sheet.rs-template-05 .rs-name{font-size:35px}\n.resume-sheet.rs-template-05 .rs-lead{background:#edf5ee;padding:20px 24px;margin-bottom:28px;border-top:3px solid var(--rs-accent)}\n.resume-sheet.rs-template-05 .rs-lead .rs-section-heading{border-bottom:0;padding-bottom:0;margin-bottom:10px}\n.resume-sheet.rs-template-05 .rs-campus-columns{grid-template-columns:minmax(0,1fr) 197px;gap:26px}\n.resume-sheet.rs-template-05 .rs-main .rs-section-heading{border-bottom:1px dashed #bdcfc1}\n.resume-sheet.rs-template-05 .rs-sidebar .rs-section-heading{border:0}\n.resume-sheet.rs-template-05 .rs-sidebar .rs-section-heading h2{font-size:13px}\n\n/* 06 — traditional academic CV: restrained rules and centered name. */\n.resume-sheet.rs-template-06{padding:54px 66px;font-family:Georgia,\"Songti SC\",\"SimSun\",serif;--rs-line:#c7cfd7}\n.resume-sheet.rs-template-06 .rs-header{text-align:center;border-bottom:3px double var(--rs-accent);padding-bottom:21px;margin-bottom:25px}\n.resume-sheet.rs-template-06 .rs-identity{justify-content:center}\n.resume-sheet.rs-template-06 .rs-name-block{flex:0 1 auto}\n.resume-sheet.rs-template-06 .rs-name{font-size:31px;font-weight:700;letter-spacing:.22em}\n.resume-sheet.rs-template-06 .rs-headline{font-family:Arial,\"Microsoft YaHei\",sans-serif;font-size:12px;letter-spacing:.1em}\n.resume-sheet.rs-template-06 .rs-contact{justify-content:center;font-family:Arial,\"Microsoft YaHei\",sans-serif;font-size:10px}\n.resume-sheet.rs-template-06 .rs-eyebrow{font-family:Arial,\"Microsoft YaHei\",sans-serif;letter-spacing:.17em;font-size:8px}\n.resume-sheet.rs-template-06 .rs-section-heading{border-bottom:1px solid var(--rs-accent);padding-bottom:5px;margin-bottom:10px}\n.resume-sheet.rs-template-06 .rs-section-heading h2{font-size:15px;letter-spacing:.15em}\n.resume-sheet.rs-template-06 .rs-section-en{margin-left:auto;font-family:Georgia,serif;letter-spacing:.13em}\n.resume-sheet.rs-template-06 .rs-details li,.resume-sheet.rs-template-06 .rs-summary{font-size:12px;line-height:1.9}\n.resume-sheet.rs-template-06 .rs-section-summary .rs-section-heading{display:none}\n\n/* 07 — large Swiss name, red rules, and numbered sections. */\n.resume-sheet.rs-template-07{padding:48px 47px;--rs-ink:#282b2b;--rs-line:#d6d7d5}\n.resume-sheet.rs-template-07 .rs-header-split{display:grid;grid-template-columns:1fr 200px;gap:22px;border-bottom:5px solid var(--rs-accent);padding-bottom:26px;margin-bottom:31px}\n.resume-sheet.rs-template-07 .rs-identity{display:block}\n.resume-sheet.rs-template-07 .rs-photo{width:73px;height:90px;margin-bottom:15px}\n.resume-sheet.rs-template-07 .rs-name{font-size:57px;letter-spacing:-.025em;line-height:1.05;font-weight:800}\n.resume-sheet.rs-template-07 .rs-headline{font-size:11px;letter-spacing:.025em}\n.resume-sheet.rs-template-07 .rs-contact{display:block;margin:0;align-self:end;font-size:10px}\n.resume-sheet.rs-template-07 .rs-contact li{display:block;margin-top:5px}\n.resume-sheet.rs-template-07 .rs-contact-label{display:none}\n.resume-sheet.rs-template-07 .rs-layout{grid-template-columns:minmax(0,1fr) 184px;gap:29px}\n.resume-sheet.rs-template-07 .rs-section-heading{border-bottom:1px solid #202020;padding-bottom:7px;gap:9px}\n.resume-sheet.rs-template-07 .rs-section-heading h2{font-size:13px;letter-spacing:.07em;color:#282b2b}\n.resume-sheet.rs-template-07 .rs-section-number{font-size:14px}\n.resume-sheet.rs-template-07 .rs-section-en{display:none}\n\n/* 09 — right-hand private information panel, with a quiet left body. */\n.resume-sheet.rs-template-09{padding:0}\n.resume-sheet.rs-template-09 .rs-layout-right{grid-template-columns:minmax(0,1fr) 223px;gap:0;min-height:1123px;align-items:stretch}\n.resume-sheet.rs-template-09 .rs-main{padding:48px 32px 48px 43px}\n.resume-sheet.rs-template-09 .rs-sidebar{padding:48px 25px;background:var(--rs-accent);color:#fff;--rs-muted:#c6c9da;--rs-line:#676d83}\n.resume-sheet.rs-template-09 .rs-sidebar .rs-photo{margin-bottom:30px;width:89px;height:111px;border-radius:0}\n.resume-sheet.rs-template-09 .rs-sidebar .rs-section-heading h2{color:#fff}\n.resume-sheet.rs-template-09 .rs-sidebar .rs-plain-list,.resume-sheet.rs-template-09 .rs-sidebar .rs-details{color:#eef0f9}\n.resume-sheet.rs-template-09 .rs-sidebar .rs-details li::marker,.resume-sheet.rs-template-09 .rs-sidebar .rs-plain-list li::marker{color:#c6c9da}\n.resume-sheet.rs-template-09 .rs-sidebar .rs-section-en{display:none}\n.resume-sheet.rs-template-09 .rs-contact{display:block;margin-top:0;margin-bottom:31px}\n.resume-sheet.rs-template-09 .rs-contact li{display:block;margin-bottom:11px}\n.resume-sheet.rs-template-09 .rs-contact-label{display:block}\n.resume-sheet.rs-template-09 .rs-contact-value{font-size:10px}\n.resume-sheet.rs-template-09 .rs-name{font-size:35px}\n.resume-sheet.rs-template-09 .rs-header{border-bottom:1px solid var(--rs-accent);margin-bottom:24px;padding-bottom:21px}\n.resume-sheet.rs-template-09 .rs-header .rs-photo{display:none}\n.resume-sheet.rs-template-09 .rs-main .rs-section-heading{border-bottom:0;padding:0}\n.resume-sheet.rs-template-09 .rs-main .rs-section-heading h2{letter-spacing:.15em;font-size:14px}\n\n/* 10 — portfolio-focused résumé: skills stripe followed by projects. */\n.resume-sheet.rs-template-10{padding:46px 49px;--rs-line:#d6e3e8}\n.resume-sheet.rs-template-10 .rs-header{border-bottom:0;margin-bottom:16px;padding-bottom:15px}\n.resume-sheet.rs-template-10 .rs-name{font-size:40px;letter-spacing:.08em}\n.resume-sheet.rs-template-10 .rs-headline{color:var(--rs-accent);font-size:13px}\n.resume-sheet.rs-template-10 .rs-lead{padding:18px 21px;background:#edf3f5;margin-bottom:25px;border-radius:3px}\n.resume-sheet.rs-template-10 .rs-lead .rs-section{margin-bottom:15px}\n.resume-sheet.rs-template-10 .rs-lead .rs-section:last-child{margin-bottom:0}\n.resume-sheet.rs-template-10 .rs-lead .rs-section-heading{border:0;padding:0;margin-bottom:5px}\n.resume-sheet.rs-template-10 .rs-lead .rs-section-heading h2{font-size:12px}\n.resume-sheet.rs-template-10 .rs-lead .rs-section-en{display:none}\n.resume-sheet.rs-template-10 .rs-skills{display:grid;grid-template-columns:1fr 1fr;gap:2px 18px}\n.resume-sheet.rs-template-10 .rs-skills li{font-size:10.5px}\n.resume-sheet.rs-template-10 .rs-layout{grid-template-columns:minmax(0,1fr) 178px;gap:26px}\n.resume-sheet.rs-template-10 .rs-section-projects .rs-entry{padding:0 0 15px 15px;border-left:3px solid var(--rs-accent);margin-bottom:18px}\n.resume-sheet.rs-template-10 .rs-section-projects .rs-entry h3{font-size:15px;color:var(--rs-accent)}\n.resume-sheet.rs-template-10 .rs-section-projects .rs-entry-head{display:block}\n.resume-sheet.rs-template-10 .rs-section-projects .rs-date{display:block;text-align:left;max-width:none;margin-top:3px}\n\n/* 11 — a readable timeline, including an explicit date rail. */\n.resume-sheet.rs-template-11{padding:51px 58px;--rs-line:#d5dfe7}\n.resume-sheet.rs-template-11 .rs-header{border:0;padding-bottom:24px;border-top:5px solid var(--rs-accent);padding-top:27px}\n.resume-sheet.rs-template-11 .rs-name{font-size:36px;letter-spacing:.15em}\n.resume-sheet.rs-template-11 .rs-section-heading{border:0;padding-bottom:0;margin-bottom:13px}\n.resume-sheet.rs-template-11 .rs-section-heading h2{font-size:15px}\n.resume-sheet.rs-template-11 .rs-section-experience,.resume-sheet.rs-template-11 .rs-section-projects,.resume-sheet.rs-template-11 .rs-section-education{position:relative}\n.resume-sheet.rs-template-11 .rs-entry{position:relative;padding-left:137px;margin-bottom:19px}\n.resume-sheet.rs-template-11 .rs-entry::before{content:\"\";position:absolute;left:118px;top:8px;bottom:-22px;border-left:1px solid #cbd6df}\n.resume-sheet.rs-template-11 .rs-entry::after{content:\"\";position:absolute;left:114px;top:7px;width:9px;height:9px;border:2px solid var(--rs-accent);background:#fff;border-radius:50%}\n.resume-sheet.rs-template-11 .rs-entry:last-child::before{bottom:8px}\n.resume-sheet.rs-template-11 .rs-entry-head{display:block}\n.resume-sheet.rs-template-11 .rs-entry .rs-date{position:absolute;left:0;top:1px;width:103px;max-width:103px;text-align:left;font-size:10px}\n.resume-sheet.rs-template-11 .rs-details{padding-left:13px}\n\n/* 12 — a warmer two-column notebook with a decorative margin. */\n.resume-sheet.rs-template-12{padding:52px 51px 52px 65px;--rs-paper:#fffdf8;--rs-line:#e5d9cd;--rs-muted:#8b7b6d;border-left:12px solid #e8d5c1}\n.resume-sheet.rs-template-12 .rs-name{font-family:Georgia,\"Songti SC\",\"SimSun\",serif;font-size:43px;letter-spacing:.12em;font-weight:400}\n.resume-sheet.rs-template-12 .rs-header{border-bottom:1px solid var(--rs-accent);padding-bottom:21px}\n.resume-sheet.rs-template-12 .rs-layout{grid-template-columns:minmax(0,1fr) 171px;gap:28px}\n.resume-sheet.rs-template-12 .rs-sidebar{padding:16px 16px 20px;background:#f3ece2;border-radius:1px}\n.resume-sheet.rs-template-12 .rs-section-heading{border-bottom:0;padding-bottom:0}\n.resume-sheet.rs-template-12 .rs-section-heading h2{font-family:Georgia,\"Songti SC\",\"SimSun\",serif;font-size:16px;font-weight:400}\n.resume-sheet.rs-template-12 .rs-section-en{display:none}\n.resume-sheet.rs-template-12 .rs-entry-head{display:block}\n.resume-sheet.rs-template-12 .rs-date{display:block;text-align:left;max-width:none;margin-top:3px;font-size:9px}\n.resume-sheet.rs-template-12 .rs-main .rs-section-summary{padding-bottom:20px;border-bottom:1px dashed #d9c8b8}\n\n/* 13 — a high-contrast executive masthead and short profile strip. */\n.resume-sheet.rs-template-13{padding-top:0;--rs-line:#d4dedf}\n.resume-sheet.rs-template-13 .rs-header-banner{margin:0 -55px 0;padding:44px 55px 31px;background:var(--rs-accent);color:#fff;border:0}\n.resume-sheet.rs-template-13 .rs-header-banner .rs-name{color:#fff;font-size:39px}\n.resume-sheet.rs-template-13 .rs-header-banner .rs-headline,.resume-sheet.rs-template-13 .rs-header-banner .rs-contact-label{color:#d0dddf}\n.resume-sheet.rs-template-13 .rs-header-banner .rs-contact{font-size:10px}\n.resume-sheet.rs-template-13 .rs-lead{background:#edf2f2;margin:0 -55px 29px;padding:21px 55px 23px}\n.resume-sheet.rs-template-13 .rs-lead .rs-section-heading{border:0;padding-bottom:0;margin-bottom:5px}\n.resume-sheet.rs-template-13 .rs-lead .rs-section-heading h2{font-size:12px}\n.resume-sheet.rs-template-13 .rs-lead .rs-section-en{display:none}\n.resume-sheet.rs-template-13 .rs-layout{grid-template-columns:minmax(0,1fr) 180px;gap:31px}\n.resume-sheet.rs-template-13 .rs-section-heading{border-bottom:2px solid var(--rs-accent);padding-bottom:7px}\n.resume-sheet.rs-template-13 .rs-section-heading h2{font-size:14px;letter-spacing:.13em}\n.resume-sheet.rs-template-13 .rs-section-en{display:none}\n.resume-sheet.rs-template-13 .rs-sidebar{border-left:1px solid var(--rs-line);padding-left:20px}\n\n/* 14 — carefully typeset monospace metadata and numbered modules. */\n.resume-sheet.rs-template-14{padding:48px 56px;--rs-paper:#fcfdfb;--rs-line:#d5ded7;--rs-muted:#6b7a70}\n.resume-sheet.rs-template-14 .rs-header-code{padding:23px 27px;margin-bottom:27px;border:1px solid var(--rs-accent);border-left-width:6px;background:#f0f4ef}\n.resume-sheet.rs-template-14 .rs-eyebrow{font-family:Consolas,\"Courier New\",monospace;font-size:10px;letter-spacing:.1em;margin-bottom:15px;color:var(--rs-accent)}\n.resume-sheet.rs-template-14 .rs-name{font-size:31px;letter-spacing:.14em}\n.resume-sheet.rs-template-14 .rs-contact{font-family:Consolas,\"Courier New\",\"Microsoft YaHei\",monospace;gap:4px 16px;font-size:10px}\n.resume-sheet.rs-template-14 .rs-section-heading{padding:6px 10px;border:0;background:#edf2ec;gap:12px}\n.resume-sheet.rs-template-14 .rs-section-heading h2{font-size:13px;letter-spacing:.07em}\n.resume-sheet.rs-template-14 .rs-section-number,.resume-sheet.rs-template-14 .rs-section-en,.resume-sheet.rs-template-14 .rs-date{font-family:Consolas,\"Courier New\",monospace}\n.resume-sheet.rs-template-14 .rs-section-en{margin-left:auto;font-size:8px}\n.resume-sheet.rs-template-14 .rs-skills{display:grid;grid-template-columns:1fr 1fr;gap:0 24px}\n.resume-sheet.rs-template-14 .rs-entry{padding:0 10px}\n\n/* 15 — structured blocks and top-row contact metadata. */\n.resume-sheet.rs-template-15{padding:44px 45px;--rs-line:#d9e0e7}\n.resume-sheet.rs-template-15 .rs-header{border:1px solid var(--rs-line);border-top:5px solid var(--rs-accent);padding:25px 27px 0;margin-bottom:24px}\n.resume-sheet.rs-template-15 .rs-name{font-size:34px}\n.resume-sheet.rs-template-15 .rs-contact{border-top:1px solid var(--rs-line);margin:22px -27px 0;padding:11px 27px;background:#f6f8fa;gap:4px 16px;font-size:10px}\n.resume-sheet.rs-template-15 .rs-lead{margin-bottom:24px}\n.resume-sheet.rs-template-15 .rs-lead .rs-section-heading{display:none}\n.resume-sheet.rs-template-15 .rs-lead .rs-summary{font-size:11.5px;color:#626f80}\n.resume-sheet.rs-template-15 .rs-layout{grid-template-columns:minmax(0,1fr) 199px;gap:22px}\n.resume-sheet.rs-template-15 .rs-section{border:1px solid var(--rs-line);padding:0 15px 15px;margin-bottom:19px}\n.resume-sheet.rs-template-15 .rs-section-heading{margin:0 -15px 13px;padding:8px 15px;background:#edf1f6;border-bottom:1px solid var(--rs-line)}\n.resume-sheet.rs-template-15 .rs-section-heading h2{font-size:13px;letter-spacing:.08em}\n.resume-sheet.rs-template-15 .rs-section-en{display:none}\n.resume-sheet.rs-template-15 .rs-sidebar .rs-section{padding:0 13px 13px}\n.resume-sheet.rs-template-15 .rs-sidebar .rs-section-heading{margin:0 -13px 11px;padding:8px 13px}\n.resume-sheet.rs-template-15 .rs-lead .rs-section{border:0;padding:0}\n\n/* 16 — a typographic personal statement, project work leads. */\n.resume-sheet.rs-template-16{padding:48px 48px;--rs-paper:#fffcfc;--rs-line:#e8d8de;--rs-muted:#8b747e}\n.resume-sheet.rs-template-16 .rs-header{padding:0 0 25px 168px;min-height:132px;border-bottom:0;margin-bottom:0}\n.resume-sheet.rs-template-16 .rs-eyebrow{position:absolute;left:0;top:9px;max-width:111px;font-size:10px;line-height:2;letter-spacing:.3em;color:var(--rs-accent)}\n.resume-sheet.rs-template-16 .rs-name{font-size:56px;font-weight:800;letter-spacing:.015em;line-height:1.05}\n.resume-sheet.rs-template-16 .rs-headline{font-size:12px;letter-spacing:.03em}\n.resume-sheet.rs-template-16 .rs-contact{font-size:9.5px;gap:2px 12px;margin-top:18px}\n.resume-sheet.rs-template-16 .rs-contact-label{display:none}\n.resume-sheet.rs-template-16 .rs-header:has(.rs-photo){padding-left:0}\n.resume-sheet.rs-template-16 .rs-header:has(.rs-photo) .rs-eyebrow{position:static;max-width:none;margin-bottom:12px}\n.resume-sheet.rs-template-16 .rs-lead{border-top:8px solid var(--rs-accent);padding:20px 0 23px;margin:0 0 27px;border-bottom:1px solid var(--rs-line)}\n.resume-sheet.rs-template-16 .rs-lead .rs-section{display:grid;grid-template-columns:140px minmax(0,1fr);gap:28px}\n.resume-sheet.rs-template-16 .rs-lead .rs-section-heading{display:block;border:0;padding:0;margin:0}\n.resume-sheet.rs-template-16 .rs-lead .rs-section-number{display:block;font-size:24px;line-height:1.1;margin-bottom:8px}\n.resume-sheet.rs-template-16 .rs-layout{grid-template-columns:minmax(0,1fr) 174px;gap:31px}\n.resume-sheet.rs-template-16 .rs-section-heading{border-bottom:0;padding:0;margin-bottom:12px}\n.resume-sheet.rs-template-16 .rs-section-en{display:none}\n.resume-sheet.rs-template-16 .rs-section-heading h2{font-size:14px}\n.resume-sheet.rs-template-16 .rs-section-number{font-size:13px}\n.resume-sheet.rs-template-16 .rs-section-projects .rs-entry-head{display:block}\n.resume-sheet.rs-template-16 .rs-section-projects .rs-entry h3{font-size:15px}\n.resume-sheet.rs-template-16 .rs-section-projects .rs-date{display:block;margin-top:4px;text-align:left;max-width:none}\n\n/* 17 — forest green header with a fine rule down the support column. */\n.resume-sheet.rs-template-17{padding-top:0;--rs-line:#d6e0d8;--rs-muted:#6a7b6e}\n.resume-sheet.rs-template-17 .rs-header-banner{margin:0 -55px 31px;padding:43px 55px 28px;background:#eaf0e8;border-left:15px solid var(--rs-accent);border-bottom:0}\n.resume-sheet.rs-template-17 .rs-name{font-family:Georgia,\"Songti SC\",\"SimSun\",serif;font-size:39px;font-weight:400;letter-spacing:.2em}\n.resume-sheet.rs-template-17 .rs-layout{grid-template-columns:minmax(0,1fr) 187px;gap:28px}\n.resume-sheet.rs-template-17 .rs-sidebar{border-left:1px solid #c9d7cc;padding-left:20px}\n.resume-sheet.rs-template-17 .rs-section-heading{border-bottom:0;padding-bottom:5px;margin-bottom:10px;position:relative}\n.resume-sheet.rs-template-17 .rs-section-heading::after{content:\"\";position:absolute;bottom:0;left:0;width:24px;border-bottom:2px solid var(--rs-accent)}\n.resume-sheet.rs-template-17 .rs-section-heading h2{font-size:14px}\n.resume-sheet.rs-template-17 .rs-section-en{display:none}\n.resume-sheet.rs-template-17 .rs-main .rs-entry h3{color:var(--rs-accent)}\n\n/* 18 — graduate layout with a bright academic banner and blue guide labels. */\n.resume-sheet.rs-template-18{padding:0 46px 49px;--rs-line:#d5e4ef}\n.resume-sheet.rs-template-18 .rs-header-banner{margin:0 -46px 30px;padding:35px 46px 27px;background:#eaf3fa;border-bottom:5px solid var(--rs-accent)}\n.resume-sheet.rs-template-18 .rs-name{font-size:35px;letter-spacing:.14em}\n.resume-sheet.rs-template-18 .rs-headline{font-size:13px;color:#5681a4}\n.resume-sheet.rs-template-18 .rs-contact{margin-top:15px;font-size:10px}\n.resume-sheet.rs-template-18 .rs-layout{grid-template-columns:minmax(0,1fr) 182px;gap:28px}\n.resume-sheet.rs-template-18 .rs-section-heading{border:0;padding:0;margin-bottom:12px}\n.resume-sheet.rs-template-18 .rs-section-heading h2{font-size:14px;padding-left:10px;border-left:4px solid var(--rs-accent)}\n.resume-sheet.rs-template-18 .rs-section-en{display:none}\n.resume-sheet.rs-template-18 .rs-section-education .rs-entry{padding:14px 15px;border:1px solid #cbdff0;background:#f5f9fc}\n.resume-sheet.rs-template-18 .rs-section-education .rs-entry-head{display:block}\n.resume-sheet.rs-template-18 .rs-section-education .rs-date{display:block;text-align:left;max-width:none;margin-top:3px}\n.resume-sheet.rs-template-18 .rs-sidebar{background:#f6f9fc;padding:16px}\n\n/* 19 — research dossier with a compact metadata bar and academic lead. */\n.resume-sheet.rs-template-19{padding:48px 53px;--rs-line:#e0d8e3;--rs-muted:#827587}\n.resume-sheet.rs-template-19 .rs-header-academic{border-bottom:0;padding-bottom:0;margin-bottom:25px;text-align:left}\n.resume-sheet.rs-template-19 .rs-eyebrow{letter-spacing:.23em;font-size:8px;margin-bottom:17px}\n.resume-sheet.rs-template-19 .rs-name{font-family:Georgia,\"Songti SC\",\"SimSun\",serif;font-size:36px;font-weight:400;letter-spacing:.17em}\n.resume-sheet.rs-template-19 .rs-headline{font-size:12px}\n.resume-sheet.rs-template-19 .rs-contact{margin-top:21px;border-top:1px solid var(--rs-accent);border-bottom:1px solid var(--rs-accent);padding:9px 0;font-size:9px;gap:4px 15px}\n.resume-sheet.rs-template-19 .rs-contact-label{font-size:8px}\n.resume-sheet.rs-template-19 .rs-lead{padding:0 0 20px;margin-bottom:23px;border-bottom:1px solid var(--rs-line)}\n.resume-sheet.rs-template-19 .rs-lead .rs-section{display:grid;grid-template-columns:126px minmax(0,1fr);gap:23px}\n.resume-sheet.rs-template-19 .rs-lead .rs-section-heading{display:block;border:0;padding:0;margin:0}\n.resume-sheet.rs-template-19 .rs-lead .rs-section-heading h2{font-size:15px;margin-bottom:5px}\n.resume-sheet.rs-template-19 .rs-lead .rs-section-en{display:block;font-size:8px}\n.resume-sheet.rs-template-19 .rs-layout{grid-template-columns:minmax(0,1fr) 188px;gap:29px}\n.resume-sheet.rs-template-19 .rs-section-heading h2{font-size:14px;letter-spacing:.12em}\n.resume-sheet.rs-template-19 .rs-section-en{display:none}\n.resume-sheet.rs-template-19 .rs-section-projects .rs-entry h3{font-size:13px;color:var(--rs-accent)}\n.resume-sheet.rs-template-19 .rs-section-projects .rs-entry-head{display:block}\n.resume-sheet.rs-template-19 .rs-section-projects .rs-date{display:block;text-align:left;max-width:none;margin-top:3px}\n.resume-sheet.rs-template-19 .rs-sidebar .rs-section-heading{border-bottom:0;padding:0}\n\n/* 20 — oversized signature, monochrome rules, and a slim support column. */\n.resume-sheet.rs-template-20{padding:45px 48px;--rs-ink:#282828;--rs-muted:#747474;--rs-line:#d7d7d7}\n.resume-sheet.rs-template-20 .rs-header-signature{padding-bottom:24px;border-bottom:5px solid #282828;margin-bottom:29px}\n.resume-sheet.rs-template-20 .rs-name{font-size:62px;letter-spacing:.035em;line-height:1.05;font-weight:800}\n.resume-sheet.rs-template-20 .rs-headline{font-size:12px;letter-spacing:.12em;margin-top:13px}\n.resume-sheet.rs-template-20 .rs-contact{font-size:9px;gap:3px 19px;margin-top:22px}\n.resume-sheet.rs-template-20 .rs-contact-label{display:none}\n.resume-sheet.rs-template-20 .rs-layout{grid-template-columns:minmax(0,1fr) 177px;gap:31px}\n.resume-sheet.rs-template-20 .rs-section-heading{display:block;border-top:1px solid #282828;border-bottom:0;padding-top:8px;padding-bottom:0;margin-bottom:12px}\n.resume-sheet.rs-template-20 .rs-section-heading h2{font-size:12px;letter-spacing:.18em}\n.resume-sheet.rs-template-20 .rs-section-en{display:block;font-size:7px;letter-spacing:.18em;margin-top:2px}\n.resume-sheet.rs-template-20 .rs-entry-head{display:block}\n.resume-sheet.rs-template-20 .rs-entry .rs-date{display:block;text-align:left;max-width:none;margin-top:3px}\n.resume-sheet.rs-template-20 .rs-section-summary .rs-section-heading{display:none}\n.resume-sheet.rs-template-20 .rs-sidebar .rs-summary{font-size:10px;line-height:2}\n\n@media print{\n  .resume-sheet{width:auto;min-height:0;margin:0;box-shadow:none;print-color-adjust:exact;-webkit-print-color-adjust:exact}\n  .resume-sheet .rs-layout,.resume-sheet .rs-main,.resume-sheet .rs-sidebar,.resume-sheet .rs-content{break-inside:auto;page-break-inside:auto}\n  .resume-sheet .rs-section{break-inside:auto;page-break-inside:auto}\n  .resume-sheet .rs-section-heading,.resume-sheet .rs-entry-head{break-after:avoid;page-break-after:avoid}\n  .resume-sheet .rs-entry{break-inside:avoid;page-break-inside:avoid}\n  .resume-sheet .rs-summary,.resume-sheet .rs-details li,.resume-sheet .rs-plain-list li{orphans:2;widows:2}\n  .resume-sheet.rs-template-03 .rs-layout-left,.resume-sheet.rs-template-08 .rs-layout-left,.resume-sheet.rs-template-09 .rs-layout-right{min-height:0}\n}\n";

;

/* ===== 03. Editor and application interactions ===== */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const kit = window.ResumeKit;
  if (!kit || kit.templates.length !== 20) return;
  const clone = value => JSON.parse(JSON.stringify(value));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const storageKey = 'resume-atelier:v1';
  const templates = kit.templates;
  const knownTemplate = id => templates.some(template => template.id === id);
  const basicKeys = ['name', 'headline', 'phone', 'email', 'city', 'website', 'summary', 'photo'];
  const listKeys = ['skills', 'certificates', 'languages', 'awards', 'extra'];
  const entryKeys = {
    education: ['school', 'degree', 'major', 'start', 'end', 'details'],
    experience: ['company', 'role', 'start', 'end', 'details'],
    projects: ['name', 'role', 'start', 'end', 'details']
  };
  const entryLabels = { education: '教育经历', experience: '工作经历', projects: '项目经历' };
  const emptyEntry = section => Object.fromEntries(entryKeys[section].map(key => [key, '']));
  let state = { version: 1, profile: clone(kit.blank), templateId: '01', favorites: [], sample: false };
  let category = '全部';
  let search = '';
  let favoritesOnly = false;
  let currentView = '';
  let pendingConfirm = null;
  let saveTimer;
  let previewTimer;
  let toastTimer;
  let layoutFrame;
  let storageWarningShown = false;
  let photoGeneration = 0;

  function normalizeProfile(source) {
    if (!source || typeof source !== 'object' || Array.isArray(source) || !source.basics || typeof source.basics !== 'object' || Array.isArray(source.basics)) throw new Error('资料结构不正确，请选择本站导出的 JSON 备份。');
    const profile = clone(kit.blank);
    const readString = (object, key) => {
      const value = object[key];
      if (value === undefined || value === null) return '';
      if (typeof value !== 'string' || value.length > (key === 'photo' ? 2000000 : 100000)) throw new Error('部分资料格式不正确，或文字超出合理长度。');
      return value;
    };
    basicKeys.forEach(key => { profile.basics[key] = readString(source.basics, key); });
    if (profile.basics.photo && (!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=\s]+$/.test(profile.basics.photo) || profile.basics.photo.length > 2000000)) throw new Error('照片格式不正确，请使用 JPG、PNG 或 WebP。');
    Object.keys(entryKeys).forEach(section => {
      if (source[section] === undefined) { profile[section] = []; return; }
      if (!Array.isArray(source[section]) || source[section].length > 100) throw new Error('经历条目格式不正确，最多可导入 100 条。');
      profile[section] = source[section].map(record => {
        if (!record || typeof record !== 'object' || Array.isArray(record)) throw new Error('经历条目格式不正确。');
        return Object.fromEntries(entryKeys[section].map(key => [key, readString(record, key)]));
      });
    });
    listKeys.forEach(key => { profile[key] = readString(source, key); });
    return profile;
  }
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved?.version === 1) {
      const profile = normalizeProfile(saved.profile);
      state = { version: 1, profile, templateId: knownTemplate(saved.templateId) ? saved.templateId : '01', favorites: Array.isArray(saved.favorites) ? [...new Set(saved.favorites.filter(knownTemplate))] : [], sample: saved.sample === true };
    }
  } catch { /* Empty, restricted or incompatible storage leaves a blank working draft. */ }

  function toast(message) {
    clearTimeout(toastTimer);
    const node = document.createElement('div');
    node.className = 'toast';
    node.innerHTML = '<svg aria-hidden="true"><use href="#ic-check"/></svg><span>' + esc(message) + '</span>';
    $('#toast-container').replaceChildren(node);
    toastTimer = setTimeout(() => $('#toast-container').replaceChildren(), 3400);
  }
  function saveNow() {
    clearTimeout(saveTimer);
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      $('#save-status').textContent = '已保存在当前浏览器';
      storageWarningShown = false;
    } catch {
      $('#save-status').textContent = '保存受限，请导出备份';
      if (!storageWarningShown) toast('当前浏览器无法自动保存，请使用“导出资料”备份你的填写。');
      storageWarningShown = true;
    }
  }
  function scheduleSave() {
    clearTimeout(saveTimer);
    $('#save-status').textContent = '正在保存…';
    saveTimer = setTimeout(saveNow, 250);
  }
  function confirmAction(title, message, callback, accept = '确认继续') {
    pendingConfirm = callback;
    $('#confirm-title').textContent = title;
    $('#confirm-description').textContent = message;
    $('#confirm-accept').textContent = accept;
    $('#confirm-dialog').showModal();
    $('#confirm-cancel').focus();
  }
  $('#confirm-accept').addEventListener('click', () => {
    const action = pendingConfirm;
    pendingConfirm = null;
    $('#confirm-dialog').close();
    if (action) action();
  });
  $('#confirm-cancel').addEventListener('click', () => $('#confirm-dialog').close());
  $('#confirm-dialog').addEventListener('close', () => { pendingConfirm = null; });
  $$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  $$('.app-dialog').forEach(dialog => dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  }));
  $('#open-help').addEventListener('click', () => $('#help-dialog').showModal());
  $('#open-references').addEventListener('click', () => $('#references-dialog').showModal());

  function renderGallery() {
    const query = search.trim().toLocaleLowerCase();
    const filtered = templates.filter(template => (category === '全部' || template.category === category) && (!favoritesOnly || state.favorites.includes(template.id)) && (!query || [template.name, template.en, template.category, template.description, ...template.tags].join(' ').toLocaleLowerCase().includes(query)));
    $('#template-grid').innerHTML = filtered.map(template => {
      const favorite = state.favorites.includes(template.id);
      return `<article class="template-card" data-template="${template.id}">
        <a class="template-select" href="#editor/${template.id}" data-use-template="${template.id}" aria-label="使用${esc(template.name)}模板">
          <span class="template-number">${template.id}</span>
          <div class="template-thumbnail" aria-hidden="true" inert><div class="thumbnail-paper">${kit.render(kit.demo, template.id)}</div></div>
          <span class="template-action">使用此模板 <svg><use href="#ic-arrow"/></svg></span>
        </a>
        <div class="template-info"><div><h3>${esc(template.name)}</h3><span class="template-en">${esc(template.en)}</span></div><button class="template-favorite icon-button" data-favorite="${template.id}" aria-label="${favorite ? '取消收藏' : '收藏'}${esc(template.name)}" aria-pressed="${favorite}"><svg aria-hidden="true"><use href="#ic-heart"/></svg></button></div>
        <div class="template-tags"><span>${esc(template.category)}</span>${template.tags.map(tag => '<span>' + esc(tag) + '</span>').join('')}</div>
      </article>`;
    }).join('');
    $('#empty-results').hidden = filtered.length !== 0;
    $('#result-count').textContent = `${favoritesOnly ? '收藏中 · ' : ''}${filtered.length} 套模板`;
    $$('.filter-button').forEach(button => { const active = button.dataset.category === category; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); });
    $('#favorites-filter').setAttribute('aria-pressed', String(favoritesOnly));
    observeThumbnails();
  }
  const thumbObserver = new ResizeObserver(entries => entries.forEach(entry => entry.target.style.setProperty('--thumb-scale', String(entry.contentRect.width / 794))));
  function observeThumbnails() {
    thumbObserver.disconnect();
    $$('.template-thumbnail').forEach(thumbnail => thumbObserver.observe(thumbnail));
  }
  $('#template-grid').addEventListener('click', event => {
    const use = event.target.closest('[data-use-template]');
    if (use) {
      event.preventDefault();
      selectTemplate(use.dataset.useTemplate);
      location.hash = `editor/${state.templateId}`;
      if (currentView !== 'editor') showRoute();
      return;
    }
    const favorite = event.target.closest('[data-favorite]');
    if (!favorite) return;
    const id = favorite.dataset.favorite;
    if (state.favorites.includes(id)) state.favorites = state.favorites.filter(item => item !== id);
    else state.favorites.push(id);
    saveNow();
    if (favoritesOnly) renderGallery();
    else {
      const active = state.favorites.includes(id);
      favorite.setAttribute('aria-pressed', String(active));
      favorite.setAttribute('aria-label', `${active ? '取消收藏' : '收藏'}${templates.find(item => item.id === id).name}`);
    }
  });
  $$('.filter-button').forEach(button => button.addEventListener('click', () => { category = button.dataset.category; renderGallery(); }));
  $('#template-search').addEventListener('input', event => { search = event.target.value; renderGallery(); });
  $('#favorites-filter').addEventListener('click', () => { favoritesOnly = !favoritesOnly; renderGallery(); });
  $('#clear-filters').addEventListener('click', () => { category = '全部'; search = ''; favoritesOnly = false; $('#template-search').value = ''; renderGallery(); });

  function selectTemplate(id, updateHash = false) {
    if (!knownTemplate(id)) return;
    state.templateId = id;
    const template = templates.find(item => item.id === id);
    $('#active-template-name').textContent = template.name;
    $('#template-select').value = id;
    saveNow();
    renderPreview();
    if (updateHash) history.replaceState(null, '', `#editor/${id}`);
  }
  $('#template-select').innerHTML = templates.map(template => `<option value="${template.id}">${template.id} · ${esc(template.name)}</option>`).join('');
  $('#template-select').addEventListener('change', event => selectTemplate(event.target.value, true));
  function showRoute() {
    const parts = location.hash.slice(1).split('/');
    const view = parts[0] === 'editor' ? 'editor' : 'templates';
    $('#view-editor').hidden = view !== 'editor';
    $('#view-templates').hidden = view !== 'templates';
    document.body.dataset.view = view;
    $$('.header-tab').forEach(link => { const active = link.dataset.view === view; link.classList.toggle('is-active', active); if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
    if (view === 'editor') {
      if (knownTemplate(parts[1])) selectTemplate(parts[1]);
      else selectTemplate(state.templateId);
      document.title = `我的简历 · ${templates.find(item => item.id === state.templateId).name} · 简历工坊`;
      requestAnimationFrame(updatePreviewScale);
    } else {
      document.title = '简历工坊 · 20款可填写简历模板';
      requestAnimationFrame(() => $$('.template-thumbnail').forEach(node => node.style.setProperty('--thumb-scale', String(node.clientWidth / 794))));
    }
    if (currentView && currentView !== view) {
      if (parts[0] !== 'collection') window.scrollTo({ top: 0, behavior: 'instant' });
      $('#main').focus({ preventScroll: true });
    }
    currentView = view;
  }
  window.addEventListener('hashchange', showRoute);
  $('.skip-link').addEventListener('click', event => { event.preventDefault(); $('#main').focus(); });
  $('#start-blank').addEventListener('click', () => { location.hash = `editor/${state.templateId}`; });

  function getValue(path) { return path.split('.').reduce((object, key) => object?.[key], state.profile) ?? ''; }
  function field(path, label, placeholder = '', options = {}) {
    const value = getValue(path);
    const attributes = `name="${path}" data-field="${path}" maxlength="100000" aria-label="${esc(label)}" placeholder="${esc(placeholder)}"`;
    return `<label class="form-field"><span>${esc(label)}${options.optional ? '<small class="optional">选填</small>' : ''}</span>${options.multiline ? `<textarea ${attributes} rows="${options.rows || 3}">${esc(value)}</textarea>` : `<input ${attributes} type="${options.type || 'text'}" value="${esc(value)}">`}${options.hint ? `<small class="field-hint">${esc(options.hint)}</small>` : ''}</label>`;
  }
  const downIcon = '<svg aria-hidden="true"><use href="#ic-down"/></svg>';
  function formSection(key, number, title, body, opened, count = '') {
    return `<details class="form-section" data-form-section="${key}"${opened.has(key) ? ' open' : ''}><summary><span class="section-index">${number}</span>${title}${count !== '' ? `<span class="section-count">${count}</span>` : ''}${downIcon}</summary><div class="section-body">${body}</div></details>`;
  }
  function repeatedSection(key) {
    const list = state.profile[key];
    const label = entryLabels[key];
    const records = list.map((record, index) => {
      const p = `${key}.${index}.`;
      let fields = '';
      if (key === 'education') fields = field(p + 'school', '学校名称', '例如：某某大学') + `<div class="field-row">${field(p + 'degree', '学历 / 学位', '例如：本科')}${field(p + 'major', '专业', '例如：计算机科学')}</div>`;
      if (key === 'experience') fields = field(p + 'company', '公司 / 组织', '例如：某某科技有限公司') + field(p + 'role', '职位', '例如：产品经理');
      if (key === 'projects') fields = field(p + 'name', '项目名称', '例如：校园服务平台') + field(p + 'role', '担任角色', '例如：项目负责人');
      fields += `<div class="field-row">${field(p + 'start', '开始时间', '2024.09')}${field(p + 'end', '结束时间', '2026.06 / 至今')}</div>`;
      const description = key === 'education' ? '课程、成绩或其他亮点' : '做了什么，带来什么成果';
      const hint = key === 'education' ? '每行一个要点，例如主修课程、研究方向或毕业成果。' : '每行一个要点。写清你的行动、负责范围与实际成果。';
      fields += field(p + 'details', description, hint, { multiline: true, rows: 4 });
      return `<div class="entry-card" data-entry="${key}.${index}"><div class="entry-top"><strong>${label} ${String(index + 1).padStart(2, '0')}</strong><div class="entry-actions"><button type="button" data-entry-action="up" data-section="${key}" data-index="${index}" aria-label="上移${label}${index + 1}" title="上移"${index === 0 ? ' disabled' : ''}><svg><use href="#ic-up"/></svg></button><button type="button" data-entry-action="down" data-section="${key}" data-index="${index}" aria-label="下移${label}${index + 1}" title="下移"${index === list.length - 1 ? ' disabled' : ''}><svg><use href="#ic-down"/></svg></button><button type="button" data-entry-action="remove" data-section="${key}" data-index="${index}" aria-label="删除${label}${index + 1}" title="删除"><svg><use href="#ic-delete"/></svg></button></div></div>${fields}</div>`;
    }).join('');
    return records + `<button type="button" class="add-entry" data-add-entry="${key}"><svg><use href="#ic-plus"/></svg>添加${label}</button>`;
  }
  function renderForm(openSection) {
    const opened = new Set($$('.form-section[open]').map(section => section.dataset.formSection));
    if (!$('#resume-form').children.length) opened.add('basics');
    if (openSection) opened.add(openSection);
    const photo = state.profile.basics.photo;
    const photoMarkup = `<div class="photo-control"><div class="photo-thumbnail">${photo ? `<img src="${esc(photo)}" alt="当前个人照片">` : '照片'}</div><div class="photo-details"><div class="photo-buttons"><button type="button" class="button button-outline" data-photo-action="upload">${photo ? '更换照片' : '上传照片'}</button>${photo ? '<button type="button" class="text-button" data-photo-action="remove">移除</button>' : ''}</div><p class="field-hint">选填 · JPG / PNG / WebP，不超过 6 MB</p></div></div>`;
    const basics = photoMarkup + field('basics.name', '姓名', '你的姓名') + field('basics.headline', '求职意向 / 职业方向', '例如：产品设计师 / 前端开发工程师') + `<div class="field-row">${field('basics.phone', '联系电话', '你的手机号码', { type: 'tel' })}${field('basics.city', '所在城市', '例如：杭州')}</div>` + field('basics.email', '电子邮箱', 'you@example.com', { type: 'email' }) + field('basics.website', '作品集 / 个人主页', '你的作品集或主页地址', { optional: true }) + field('basics.summary', '个人简介', '用 2—3 句话介绍你的方向、优势和期待。', { multiline: true, rows: 4, optional: true });
    let html = formSection('basics', '01', '基本资料', basics, opened);
    html += formSection('education', '02', '教育经历', repeatedSection('education'), opened, state.profile.education.length);
    html += formSection('experience', '03', '工作 / 实习经历', repeatedSection('experience'), opened, state.profile.experience.length);
    html += formSection('projects', '04', '项目经历', repeatedSection('projects'), opened, state.profile.projects.length);
    html += formSection('skills', '05', '技能与语言', field('skills', '专业技能', '例如：\n前端开发｜HTML、CSS、JavaScript\n设计工具｜Figma、Photoshop', { multiline: true, rows: 5, hint: '每行一组技能；尽量写出与你目标岗位有关的能力。' }) + field('languages', '语言能力', '例如：英语｜可阅读专业资料', { multiline: true, optional: true }), opened);
    html += formSection('more', '06', '证书与更多', field('certificates', '证书资质', '每行填写一项证书', { multiline: true, optional: true }) + field('awards', '荣誉奖励', '每行填写一项荣誉或奖励', { multiline: true, optional: true }) + field('extra', '更多关于我', '志愿活动、个人兴趣或其他值得展示的内容', { multiline: true, optional: true }), opened);
    $('#resume-form').innerHTML = html;
    $('#sample-banner').hidden = !state.sample;
  }
  $('#resume-form').addEventListener('submit', event => event.preventDefault());
  $('#resume-form').addEventListener('input', event => {
    const path = event.target.dataset.field;
    if (!path) return;
    if (event.target.value.length > 100000) {
      event.target.value = event.target.value.slice(0, 100000);
      toast('单个字段最多保存 100,000 个字符，请将较长内容分成多个条目。');
    }
    const parts = path.split('.');
    let target = state.profile;
    for (const key of parts.slice(0, -1)) target = target[key];
    target[parts[parts.length - 1]] = event.target.value;
    scheduleSave();
    clearTimeout(previewTimer);
    previewTimer = setTimeout(renderPreview, 75);
  });
  $('#resume-form').addEventListener('click', event => {
    const add = event.target.closest('[data-add-entry]');
    if (add) {
      const key = add.dataset.addEntry;
      if (state.profile[key].length >= 100) return toast('当前区块已有 100 条记录，请先整理已有内容。');
      state.profile[key].push(emptyEntry(key));
      renderForm(key); renderPreview(); saveNow();
      const first = $(`[data-entry="${key}.${state.profile[key].length - 1}"] input`);
      first?.focus();
      return;
    }
    const action = event.target.closest('[data-entry-action]');
    if (action && !action.disabled) {
      const key = action.dataset.section;
      const index = Number(action.dataset.index);
      const records = state.profile[key];
      if (action.dataset.entryAction === 'remove') {
        const remove = () => { records.splice(index, 1); renderForm(key); renderPreview(); saveNow(); };
        if (Object.values(records[index]).some(Boolean)) confirmAction('删除这条经历？', '这条记录将从当前简历中移除。其他条目和模板保持可继续编辑。', remove, '删除这条');
        else remove();
      } else {
        const next = index + (action.dataset.entryAction === 'up' ? -1 : 1);
        if (next < 0 || next >= records.length) return;
        [records[index], records[next]] = [records[next], records[index]];
        renderForm(key); renderPreview(); saveNow();
        $(`[data-entry="${key}.${next}"] [data-entry-action="${action.dataset.entryAction}"]`)?.focus();
      }
      return;
    }
    const photoAction = event.target.closest('[data-photo-action]');
    if (!photoAction) return;
    if (photoAction.dataset.photoAction === 'upload') $('#photo-file').click();
    else { photoGeneration++; state.profile.basics.photo = ''; renderForm('basics'); renderPreview(); saveNow(); }
  });

  function renderPreview() {
    clearTimeout(previewTimer);
    $('#resume-preview').innerHTML = kit.render(state.profile, state.templateId, { placeholders: true });
    const photo = $('#resume-preview .rs-photo');
    if (photo) photo.addEventListener('load', updatePreviewScale, { once: true });
    requestAnimationFrame(updatePreviewScale);
  }
  function updatePreviewScale() {
    cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(() => {
      const canvas = $('#preview-canvas');
      const paper = $('#resume-preview .resume-sheet');
      if (!paper) return;
      const css = getComputedStyle(canvas);
      const available = canvas.clientWidth - parseFloat(css.paddingLeft || 0) - parseFloat(css.paddingRight || 0);
      if (available <= 0) return;
      const requested = $('#preview-zoom').value;
      const scale = requested === 'fit' ? Math.min(1, available / 794) : Number(requested);
      const height = Math.max(1123, paper.offsetHeight);
      $('#resume-preview').style.transform = `scale(${scale})`;
      $('#paper-mount').style.width = `${794 * scale}px`;
      $('#paper-mount').style.height = `${height * scale}px`;
      $('#preview-scale-label').textContent = `A4 · ${Math.round(scale * 100)}% · 文字可选择复制`;
      $('#multipage-note').hidden = height <= 1130;
    });
  }
  const previewObserver = new ResizeObserver(updatePreviewScale);
  previewObserver.observe($('#preview-canvas'));
  $('#preview-zoom').addEventListener('change', updatePreviewScale);
  window.addEventListener('resize', updatePreviewScale);
  $$('.mobile-editor-tabs [data-pane]').forEach(button => button.addEventListener('click', () => {
    const pane = button.dataset.pane;
    $('.editor-grid').dataset.pane = pane;
    $$('.mobile-editor-tabs [data-pane]').forEach(tab => { const active = tab.dataset.pane === pane; tab.classList.toggle('is-active', active); tab.setAttribute('aria-pressed', String(active)); });
    requestAnimationFrame(updatePreviewScale);
  }));

  function replaceProfile(profile, sample) {
    photoGeneration++;
    state.profile = clone(profile);
    state.sample = sample;
    renderForm('basics'); renderPreview(); saveNow();
  }
  function clearProfile() { confirmAction('从空白重新开始？', '当前填写内容将清空。你可以先导出资料备份，再开始填写。', () => { replaceProfile(kit.blank, false); toast('已清空资料，可以开始写下你的经历。'); }, '清空资料'); }
  $('#fill-sample').addEventListener('click', () => confirmAction('填入示例资料？', '这会替换当前填写内容。示例人物和经历均为虚构，用于观察完整排版；请按自己的情况修改。', () => { replaceProfile(kit.demo, true); toast('已填入虚构示例，切换模板看看不同效果吧。'); }, '填入示例'));
  $('#clear-profile').addEventListener('click', clearProfile);
  $('#clear-sample').addEventListener('click', event => { event.preventDefault(); clearProfile(); });
  $('#photo-file').addEventListener('change', async event => {
    const file = event.target.files[0];
    event.target.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return toast('请选择 JPG、PNG 或 WebP 图片。');
    if (file.size > 6 * 1024 * 1024) return toast('图片超过 6 MB，请选择较小的照片。');
    const generation = ++photoGeneration;
    const url = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      const ratio = Math.min(1, 512 / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * ratio));
      canvas.height = Math.max(1, Math.round(image.height * ratio));
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      if (generation !== photoGeneration) return;
      state.profile.basics.photo = canvas.toDataURL('image/jpeg', .87);
      renderForm('basics'); renderPreview(); saveNow();
      toast('照片已加入简历，也可以随时移除。');
    } catch { toast('未能读取这张图片，请尝试其他 JPG、PNG 或 WebP 文件。'); }
    finally { URL.revokeObjectURL(url); }
  });

  function closeExportMenu() { $('#export-options').hidden = true; $('#open-export').setAttribute('aria-expanded', 'false'); }
  $('#open-export').addEventListener('click', () => { const opened = $('#export-options').hidden; $('#export-options').hidden = !opened; $('#open-export').setAttribute('aria-expanded', String(opened)); });
  document.addEventListener('click', event => { if (!event.target.closest('.export-menu')) closeExportMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeExportMenu(); });
  const fileName = () => (state.profile.basics.name.trim() || '我的简历').replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').slice(0, 60);
  function download(text, type, name) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const link = document.createElement('a'); link.href = url; link.download = name;
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  $('#export-json').addEventListener('click', () => {
    saveNow(); closeExportMenu();
    const backup = { format: 'resume-atelier', version: 1, templateId: state.templateId, sample: state.sample, profile: state.profile };
    download(JSON.stringify(backup, null, 2), 'application/json;charset=utf-8', `${fileName()}-资料备份.json`);
    toast('资料备份已下载，下次可从“导入资料备份”继续。');
  });
  $('#export-html').addEventListener('click', () => {
    closeExportMenu();
    const css = window.RESUME_EXPORT_CSS;
    if (typeof css !== 'string' || !css.length) return toast('导出样式未能加载，请刷新页面后重试。');
    const template = templates.find(item => item.id === state.templateId);
    const style = css.replace(/<\/style/gi, '<\\/style');
    const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(state.profile.basics.name || '我的简历')} · ${esc(template.name)}</title><style>${style}\nhtml,body{margin:0;background:#e9ece4}body>.resume-sheet{margin:24px auto;box-shadow:0 3px 24px #0001}@page{size:A4;margin:0}@media print{html,body{background:#fff!important}.resume-sheet{width:210mm!important;min-height:297mm;margin:0!important;box-shadow:none!important}}</style></head><body>${kit.render(state.profile, state.templateId, { placeholders: false })}</body></html>`;
    download(html, 'text/html;charset=utf-8', `${fileName()}-${template.name}.html`);
    toast('简历网页已下载，可独立打开并打印。');
  });
  $('#import-json').addEventListener('click', () => { closeExportMenu(); $('#json-file').click(); });
  $('#json-file').addEventListener('change', async event => {
    const file = event.target.files[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) return toast('备份超过 4 MB，请选择本站导出的资料文件。');
    try {
      const backup = JSON.parse(await file.text());
      if (backup?.format !== 'resume-atelier' || backup.version !== 1) throw new Error('请选择本站导出的 JSON 资料备份。');
      const profile = normalizeProfile(backup.profile);
      confirmAction('导入这份简历资料？', '导入后将替换当前填写内容。你可以先取消并导出现有资料，再进行导入。', () => {
        if (knownTemplate(backup.templateId)) selectTemplate(backup.templateId, currentView === 'editor');
        replaceProfile(profile, backup.sample === true);
        toast('导入成功，可以继续编辑了。');
      }, '确认导入');
    } catch (error) { toast(error instanceof SyntaxError ? '文件不是有效的 JSON 备份，当前资料已保留。' : (error.message || '无法导入这份资料，当前填写已保留。')); }
  });
  $('#print-resume').addEventListener('click', () => {
    closeExportMenu(); saveNow();
    renderPreview();
    const photo = $('#resume-preview .rs-photo');
    if (photo && !photo.complete) photo.decode().catch(() => {}).finally(() => window.print());
    else window.print();
  });
  window.addEventListener('beforeprint', () => { clearTimeout(previewTimer); $('#resume-preview').innerHTML = kit.render(state.profile, state.templateId, { placeholders: false }); });
  window.addEventListener('afterprint', renderPreview);
  window.addEventListener('pagehide', saveNow);

  $('#hero-template-back').innerHTML = kit.render(kit.demo, '03');
  $('#hero-template-front').innerHTML = kit.render(kit.demo, '02');
  renderForm();
  renderPreview();
  renderGallery();
  selectTemplate(state.templateId);
  showRoute();
})();

