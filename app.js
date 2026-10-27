(() => {
'use strict';

/* =================== i18n =================== */
const STR = {
ar: {
  appName:'محول الملفات', heroTitle:'حوّل أي ملف في ثوانٍ',
  heroText:'صور • فيديو • صوت • PDF • Word • Excel<br>كل التحويلات تتم على جهازك، ولا يُرفع أي ملف إلى أي خادم.',
  pickFile:'📂 اختر ملفاً للتحويل', quickConvert:'تحويل سريع', recent:'آخر التحويلات', viewAll:'عرض الكل',
  adPlaceholder:'مساحة إعلانية', searchPh:'ابحث عن صيغة… مثل PDF أو MP3',
  tabAll:'الكل', tabImages:'صور', tabVideo:'فيديو', tabAudio:'صوت', tabDocs:'مستندات', tabSheets:'ملفات الاكسل',
  noTools:'لا توجد أدوات مطابقة لبحثك.', chooseFiles:'اختر ملفات',
  historyTitle:'سجل التحويلات', clearHistory:'مسح السجل', historyEmpty:'السجل فارغ.',
  historyNote:'يُحفظ السجل على جهازك فقط.', convCount:'{n} تحويل', emptyRecent:'لا توجد تحويلات بعد. ابدأ الآن!',
  navHome:'الرئيسية', navTools:'الأدوات', navHistory:'السجل',
  drawerHome:'الرئيسية', drawerTools:'كل الأدوات', drawerHistory:'سجل التحويلات', drawerPrivacy:'سياسة الخصوصية',
  drawerAbout:'عن التطبيق', drawerTelegram:'تواصل معنا على تليجرام', drawerShare:'شارك التطبيق',
  themeDark:'الوضع الداكن', themeLight:'الوضع الفاتح', langToEn:'English', langToAr:'العربية',
  footer:'الإصدار 2.0 · صُنع بحب بواسطة ALGRANDSON',
  pickTitle:'حوّل الملف إلى…', selectFirst:'اختر صيغة أولاً', convertTo:'تحويل إلى {f}',
  multiImages:'{n} صور مختارة', batch:'دفعة', total:'مجموع',
  warnBig:'⚠ حجم كبير: قد يبطئ التحويل أو يتوقف على الأجهزة الضعيفة.', batchPartial:'نجح {ok} من {n}. تعذّر تحويل: {first}',
  chainBtn:'🔁 متابعة بهذا الملف', optFrom:'من (د:ث)', optTo:'إلى (د:ث)', e_trim:'وقت النهاية يجب أن يكون بعد وقت البداية، والصيغة مثل 1:30.', openStored:'فتح', storedGone:'هذا الملف لم يعد محفوظاً على الجهاز.',
  optTargetKB:'الحجم الأقصى', optNoLimit:'بلا حد', lim50:'50 KB', lim100:'100 KB', lim200:'200 KB', lim500:'500 KB',
  optIdSize:'المقاس', idPassport:'35×45 مم', idVisa:'50×50 مم', idSmall:'40×60 مم',
  d_idphoto:'صورة شخصية بمقاس الهوية أو الجواز، بخلفية بيضاء', d_merge:'دمج عدة ملفات PDF بالترتيب الذي اخترته',
  d_rotate:'تدوير كل الصفحات', d_split:'ملف منفصل لكل صفحة (في ملف ZIP)', optAngle:'زاوية التدوير', stepSplit:'فصل الصفحة {i} من {n}', sizeNote:'تم تصغير الأبعاد من {a} إلى {b} بكسل للوصول إلى الحجم المطلوب.',
  k_image:'صورة', k_video:'فيديو', k_audio:'صوت', k_pdf:'PDF', k_docx:'Word', k_text:'نص', k_sheet:'ملفات الاكسل',
  u_image:'الصور', u_video:'الفيديو', u_audio:'الصوت', u_pdf:'ملفات PDF', u_docx:'ملفات Word', u_text:'ملفات النص', u_sheet:'ملفات الاكسل',
  s_image:'حوّل الصور بين JPG وPNG وWebP، أو اجمع عدة صور في ملف PDF واحد',
  s_video:'غيّر صيغة الفيديو بين MP4 وMKV وAVI، أو استخرج منه الصوت',
  s_audio:'حوّل بين MP3 وWAV وM4A وFLAC بجودة تختارها',
  s_pdf:'استخرج النص إلى TXT أو Word، أو حوّل الصفحات إلى صور',
  s_docx:'حوّل مستندات Word إلى نص عادي أو إلى PDF',
  s_text:'حوّل TXT وMarkdown إلى PDF أو Word',
  s_sheet:'حوّل Excel وCSV إلى CSV وExcel وJSON وPDF وTXT',
  d_jpg:'صورة مضغوطة مناسبة للمشاركة', d_png:'بدون فقدان مع دعم الشفافية', d_webp:'حجم صغير وجودة عالية',
  d_imgpdf:'صورة أو عدة صور في ملف PDF واحد', d_mp4:'الأكثر توافقاً مع الهواتف', d_mkv:'حاوية مرنة عالية الجودة',
  d_avi:'متوافقة مع الأنظمة القديمة', d_vidmp3:'استخراج الصوت من الفيديو', d_wav:'صوت غير مضغوط عالي الدقة',
  d_m4a:'صوت AAC بحجم صغير', d_mp3:'الأكثر انتشاراً وتوافقاً', d_flac:'جودة مثالية بدون فقدان',
  d_pdftxt:'نص عادي من محتوى الملف', d_pdfdocx:'ملف Word قابل للتحرير', d_pdfpng:'كل صفحة كصورة PNG',
  d_pdfjpg:'كل صفحة كصورة مضغوطة', d_docxtxt:'نص عادي من مستند Word', d_docxpdf:'ملف PDF جاهز للطباعة',
  d_textpdf:'ملف PDF من النص', d_textdocx:'ملف Word قابل للتحرير', d_csv:'جدول نصي متوافق مع Excel',
  d_xlsx:'ملف Excel', d_sheettxt:'بيانات مفصولة بجدولة (Tab)', d_json:'بيانات منظمة للمطورين', d_sheetpdf:'الجدول كملف PDF',
  optQuality:'الجودة', optMaxSide:'الأبعاد القصوى', optOrig:'أصلية (حتى 16 ميغابكسل)', optVq:'جودة الفيديو',
  vqHigh:'عالية', vqMed:'متوازنة', vqSmall:'صغيرة', optBr:'جودة الصوت', optDpi:'الدقة',
  dpiNormal:'عادية', dpiHigh:'عالية', dpiUltra:'فائقة',
  progTitle:'جارٍ التحويل', cancel:'إلغاء', prepping:'جارٍ التحضير…', progDone:'اكتمل التحويل',
  loadingEngine:'جارٍ تحميل محرك المعالجة (مرة واحدة فقط)…', processing:'جارٍ التحويل… لا تغلق الصفحة',
  stepConv:'تحويل {i} من {n}…', stepAdd:'إضافة الصورة {i} من {n}…', stepRead:'قراءة الصفحة {i} من {n}…',
  stepRender:'تحويل الصفحة {i} من {n}…', stepBuild:'إنشاء الصفحة {i} من {n}…',
  resSuccess:'تم التحويل بنجاح', downloadBtn:'⬇ تحميل إلى الهاتف', shareBtn:'📤 حفظ أو مشاركة', againBtn:'تحويل ملف آخر',
  smaller:'أصغر بنسبة {p}%', larger:'أكبر بنسبة {p}%',
  confirmTitle:'تأكيد التحويل', cFile:'الملف', cSize:'الحجم', cOpts:'الخيارات',
  confirmGo:'▶ ابدأ التحويل', confirmBack:'رجوع', resOpen:'👁 فتح الملف',
  e_empty:'الملف "{name}" فارغ.', e_type:'نوع الملف غير مدعوم: {name}', e_oneKind:'اختر ملفات من نوع واحد فقط.',
  e_multi:'الاختيار المتعدد متاح للصور وملفات PDF فقط.', e_busy:'انتظر انتهاء التحويل الحالي أولاً.',
  cancelled:'تم إلغاء التحويل.', e_unknown:'حدث خطأ غير متوقع.', e_noOut:'لم يتم إنتاج أي ملف.',
  e_noText:'لا يحتوي الملف على نص قابل للاستخراج (ربما يكون ملفاً ممسوحاً ضوئياً).',
  e_lib:'تعذّر تحميل مكوّن من الإنترنت. تحقق من اتصالك ثم حاول مجدداً.',
  e_engine:'تعذّر تحميل محرك المعالجة. تحقق من اتصال الإنترنت.',
  e_ff:'تعذّر التحويل. قد يكون ترميز هذا الملف غير مدعوم.', e_outInvalid:'لم يُنتج المحوّل ملفاً صالحاً.',
  e_imgOpen:'تعذّر فتح الصورة "{name}". الصيغة قد لا تكون مدعومة في هذا المتصفح، جرّب حفظها كصورة JPG من المعرض ثم اختارها مرة أخرى.', e_read:'تعذّر قراءة الملف "{name}" من الجهاز. اختره مرة أخرى، أو انسخه إلى مجلد التنزيلات ثم اختره منه.', linkCopied:'تم نسخ رابط التطبيق.', e_imgEmpty:'الصورة تالفة أو فارغة.', e_heic:'تعذّر تحميل مكتبة قراءة صور HEIC. تحقق من اتصال الإنترنت ثم أعد المحاولة.',
  e_encode:'المتصفح لا يدعم ترميز صيغة {f}.', e_render:'تعذّر إنشاء الصورة.', e_init:'تعذّر تهيئة المكوّن.',
  dlHint:'إن لم يبدأ التحميل تلقائياً، استخدم زر «حفظ أو مشاركة».', openFail:'تعذّر فتح الملف هنا. استخدم زر التحميل أو المشاركة.', scaleNote:'تم تصغير الصورة من {a} إلى {b} بكسل لتفادي نفاد ذاكرة الهاتف.', dlStarted:'تم بدء التحميل، تفقد مجلد التنزيلات.', cleared:'تم مسح السجل.', shareFail:'تعذّرت المشاركة، استخدم زر التحميل.',
  shareLink:'شارك رابط التطبيق مع أصدقائك.', shareText:'حوّل الصور والفيديو والصوت وPDF وWord بسهولة 🔄',
  privacyBody:`<h4>آخر تحديث: 27 أكتوبر 2026</h4>
<p>نحترم خصوصيتك. توضح هذه السياسة كيف نتعامل مع بياناتك عند استخدام «محول الملفات».</p>
<h4>1. ملفاتك</h4><p>لا تُرفع ملفاتك إلى أي خادم، ولا نطّلع عليها ولا نحتفظ بها. تبقى دائماً على جهازك.</p>
<h4>2. البيانات</h4><p>لا نجمع بياناتك الشخصية، ولا يتطلب التطبيق إنشاء حساب أو إدخال أي معلومات شخصية. نرسل إحصائيات مجهولة لا تحدد هويتك، لأغراض الصيانة وتحسين الأداء: نوع التحويل (مثل PNG إلى JPG)، وعدد الملفات وحجمها التقريبي، ومدة العملية، ونجاحها أو فشلها، والمنصة ونسخة التطبيق، ومعرّف عشوائي لكل تثبيت. لا نرسل أبداً محتوى أي ملف ولا اسمه. تُرسل هذه البيانات فقط عند توفر اتصال بالإنترنت.</p>
<h4>3. السجل</h4><p>سجل التحويلات محفوظ على جهازك فقط، ويمكنك مسحه في أي وقت.</p>
<h4>4. الإعلانات</h4><p>قد تظهر إعلانات من جهات خارجية، وتخضع لسياساتها الخاصة.</p>
<h4>5. الروابط الخارجية</h4><p>تخضع الروابط التي تفتحها من داخل التطبيق، مثل رابط التواصل على تليجرام، لسياسات الخصوصية الخاصة بها.</p>
<h4>6. التواصل</h4><p>لأي استفسار: <a href="https://t.me/algrandson" target="_blank" rel="noopener">@algrandson</a></p>`,
  aboutBody:`<h4>محول الملفات 2.0</h4>
<p>أداة واحدة لكل تحويلاتك: الصور (JPG، PNG، WebP، GIF، HEIC)، الفيديو (MP4، MKV، AVI، MOV)، الصوت (MP3، WAV، M4A، FLAC)، المستندات (PDF، Word، TXT)، والجداول (Excel، CSV، JSON).</p>
<h4>المميزات</h4><p>تحويل سريع بدون رفع الملفات، دمج الصور في PDF واحد، استخراج الصوت من الفيديو، وتحويل صفحات PDF إلى صور، مع حفظ النتيجة مباشرة على هاتفك.</p>
<h4>المطوّر</h4><p>تابعني على تلغرام: <a href="https://t.me/algrandson" target="_blank" rel="noopener">@algrandson</a></p>`
},
en: {
  appName:'File Converter', heroTitle:'Convert any file in seconds',
  heroText:'Images • Video • Audio • PDF • Word • Excel<br>All conversions run on your device. No file is uploaded to any server.',
  pickFile:'📂 Choose a file to convert', quickConvert:'Quick convert', recent:'Recent conversions', viewAll:'View all',
  adPlaceholder:'Ad space', searchPh:'Search a format… e.g. PDF or MP3',
  tabAll:'All', tabImages:'Images', tabVideo:'Video', tabAudio:'Audio', tabDocs:'Documents', tabSheets:'Excel files',
  noTools:'No tools match your search.', chooseFiles:'Choose files',
  historyTitle:'Conversion history', clearHistory:'Clear history', historyEmpty:'History is empty.',
  historyNote:'History is stored on your device only.', convCount:'{n} conversions', emptyRecent:'No conversions yet. Start now!',
  navHome:'Home', navTools:'Tools', navHistory:'History',
  drawerHome:'Home', drawerTools:'All tools', drawerHistory:'Conversion history', drawerPrivacy:'Privacy policy',
  drawerAbout:'About', drawerTelegram:'Contact us on Telegram', drawerShare:'Share app',
  themeDark:'Dark mode', themeLight:'Light mode', langToEn:'English', langToAr:'Arabic',
  footer:'Version 2.0 · Made with love by ALGRANDSON',
  pickTitle:'Convert file to…', selectFirst:'Select a format first', convertTo:'Convert to {f}',
  multiImages:'{n} images selected', batch:'Batch', total:'Total',
  warnBig:'⚠ Large total size: conversion may be slow or fail on older devices.', batchPartial:'{ok} of {n} converted. Could not convert: {first}',
  chainBtn:'🔁 Continue with this file', optFrom:'From (m:s)', optTo:'To (m:s)', e_trim:'End time must be after start time. Format like 1:30.', openStored:'Open', storedGone:'This file is no longer stored on the device.',
  optTargetKB:'Max file size', optNoLimit:'No limit', lim50:'50 KB', lim100:'100 KB', lim200:'200 KB', lim500:'500 KB',
  optIdSize:'Size', idPassport:'35×45 mm', idVisa:'50×50 mm', idSmall:'40×60 mm',
  d_idphoto:'Passport / ID-size photo with a white background', d_merge:'Merge several PDFs in the order you picked',
  d_rotate:'Rotate every page', d_split:'One file per page (packed in a ZIP)', optAngle:'Rotation', stepSplit:'Splitting page {i} of {n}', sizeNote:'Dimensions reduced from {a} to {b} px to meet the size limit.',
  k_image:'Image', k_video:'Video', k_audio:'Audio', k_pdf:'PDF', k_docx:'Word', k_text:'Text', k_sheet:'Excel files',
  u_image:'Images', u_video:'Video', u_audio:'Audio', u_pdf:'PDF files', u_docx:'Word files', u_text:'Text files', u_sheet:'Excel files',
  s_image:'Convert images between JPG, PNG and WebP, or merge several images into one PDF',
  s_video:'Change video format between MP4, MKV and AVI, or extract its audio',
  s_audio:'Convert between MP3, WAV, M4A and FLAC with the quality you choose',
  s_pdf:'Extract text to TXT or Word, or turn pages into images',
  s_docx:'Convert Word documents to plain text or PDF',
  s_text:'Convert TXT and Markdown to PDF or Word',
  s_sheet:'Convert Excel and CSV to CSV, Excel, JSON, PDF or TXT',
  d_jpg:'Compressed image, great for sharing', d_png:'Lossless with transparency support', d_webp:'Small size, high quality',
  d_imgpdf:'One or more images in a single PDF', d_mp4:'Most compatible with phones', d_mkv:'Flexible, high-quality container',
  d_avi:'Compatible with older systems', d_vidmp3:'Extract audio from the video', d_wav:'Uncompressed, high fidelity',
  d_m4a:'AAC audio at a small size', d_mp3:'Most common and compatible', d_flac:'Perfect quality, lossless',
  d_pdftxt:'Plain text from the file', d_pdfdocx:'Editable Word file', d_pdfpng:'Each page as a PNG image',
  d_pdfjpg:'Each page as a compressed image', d_docxtxt:'Plain text from the Word document', d_docxpdf:'Print-ready PDF',
  d_textpdf:'PDF made from the text', d_textdocx:'Editable Word file', d_csv:'Plain table compatible with Excel',
  d_xlsx:'Excel file', d_sheettxt:'Tab-separated data', d_json:'Structured data for developers', d_sheetpdf:'The table as a PDF',
  optQuality:'Quality', optMaxSide:'Max dimensions', optOrig:'Original (up to 16 MP)', optVq:'Video quality',
  vqHigh:'High', vqMed:'Balanced', vqSmall:'Small', optBr:'Audio quality', optDpi:'Resolution',
  dpiNormal:'Normal', dpiHigh:'High', dpiUltra:'Ultra',
  progTitle:'Converting', cancel:'Cancel', prepping:'Preparing…', progDone:'Conversion complete',
  loadingEngine:'Loading processing engine (one-time)…', processing:'Converting… keep this page open',
  stepConv:'Converting {i} of {n}…', stepAdd:'Adding image {i} of {n}…', stepRead:'Reading page {i} of {n}…',
  stepRender:'Rendering page {i} of {n}…', stepBuild:'Building page {i} of {n}…',
  resSuccess:'Converted successfully', downloadBtn:'⬇ Download to device', shareBtn:'📤 Save or share', againBtn:'Convert another file',
  smaller:'{p}% smaller', larger:'{p}% larger',
  confirmTitle:'Confirm conversion', cFile:'File', cSize:'Size', cOpts:'Options',
  confirmGo:'▶ Start conversion', confirmBack:'Back', resOpen:'👁 Open file',
  e_empty:'File "{name}" is empty.', e_type:'Unsupported file type: {name}', e_oneKind:'Choose files of one type only.',
  e_multi:'Multiple selection is for images and PDFs only.', e_busy:'Wait for the current conversion to finish.',
  cancelled:'Conversion cancelled.', e_unknown:'An unexpected error occurred.', e_noOut:'No file was produced.',
  e_noText:'No extractable text found (it may be a scanned file).',
  e_lib:'Failed to load a component from the internet. Check your connection and try again.',
  e_engine:'Failed to load the processing engine. Check your internet connection.',
  e_ff:'Conversion failed. This file\'s encoding may not be supported.', e_outInvalid:'The converter produced an invalid file.',
  e_imgOpen:'Could not open image "{name}". This browser may not support the format; try saving it as a JPG from your gallery and pick it again.', e_read:'Could not read "{name}" from the device. Pick it again, or copy it to Downloads and pick it from there.', linkCopied:'App link copied.', e_imgEmpty:'The image is corrupt or empty.', e_heic:'Could not load the HEIC decoder. Check your internet connection and try again.',
  e_encode:'This browser cannot encode {f}.', e_render:'Could not create the image.', e_init:'Failed to initialize a component.',
  dlHint:'If the download does not start, use the "Save or share" button.', openFail:'Could not open the file here. Use the download or share button.', scaleNote:'The image was resized from {a} to {b} px to avoid running out of phone memory.', dlStarted:'Download started. Check your Downloads folder.', cleared:'History cleared.', shareFail:'Sharing failed, use the download button.',
  shareLink:'Share the app link with your friends.', shareText:'Convert images, video, audio, PDF, Word and Excel easily 🔄',
  privacyBody:`<h4>Last updated: October 27, 2026</h4>
<p>We respect your privacy. This policy explains how we handle your data when you use File Converter.</p>
<h4>1. Your files</h4><p>Your files are never uploaded to any server. We do not access or keep them. They stay on your device.</p>
<h4>2. Data</h4><p>We do not collect your personal data, and the app does not require an account or any personal information. For maintenance and performance, we send anonymous usage statistics that do not identify you: the conversion type (for example PNG to JPG), the number of files and their approximate size, the duration, whether it succeeded or failed, the platform, the app version, and a random identifier per installation. We never send the content or the name of any file. These statistics are sent only when an internet connection is available.</p>
<h4>3. History</h4><p>Your conversion history is saved only on your device, and you can clear it at any time.</p>
<h4>4. Advertising</h4><p>Ads from third parties may appear, and they follow their own privacy policies.</p>
<h4>5. External links</h4><p>Links you open from within the app, such as the Telegram contact, are subject to the privacy policies of their platforms.</p>
<h4>6. Contact</h4><p>For any question: <a href="https://t.me/algrandson" target="_blank" rel="noopener">algrandson</a></p>`,
  aboutBody:`<h4>File Converter 2.0</h4>
<p>One tool for all your conversions: images (JPG, PNG, WebP, GIF, HEIC), video (MP4, MKV, AVI, MOV), audio (MP3, WAV, M4A, FLAC), documents (PDF, Word, TXT) and spreadsheets (Excel, CSV, JSON).</p>
<h4>Features</h4><p>Fast conversion without uploading files, merging images into one PDF, extracting audio from video, turning PDF pages into images, and saving results directly to your phone.</p>
<h4>Developer</h4><p>Follow me on Telegram: <a href="https://t.me/algrandson" target="_blank" rel="noopener">@algrandson</a></p>`
}
};

let lang = 'ar';
const t = (key, vars) => {
  let s = (STR[lang] && STR[lang][key]) || STR.ar[key] || key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : ''));
  return s;
};

/* =================== Helpers =================== */
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const clamp01 = v => Math.min(1, Math.max(0, Number.isFinite(v) ? v : 0));
const extOf = n => ((/\.([a-z0-9]+)$/i.exec(n || '')) || [, ''])[1].toLowerCase();
const stamp = () => {
  const d = new Date(), p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
};
// The output keeps the original file name without its extension.
// A name is generated only when the file has no name at all.
const baseName = f => (f.name || '').replace(/\.[^.]+$/, '') || ('converted-' + (jobStamp || stamp()));
// Some pickers hand over a generated name such as "jpg.1001107998" or "1001107998.jpg";
// that is not the real file name, so the file gets a readable name with the date and time.
const isGeneratedName = name => { const n = (name || '').replace(/\.[^.]+$/, ''); return !n || /^\d{6,}$/.test(n) || /^[a-z0-9]{2,5}\.\d{6,}$/i.test(name || ''); };
const KIND_WORD = { image: 'image', video: 'video', audio: 'audio', pdf: 'pdf', docx: 'word', text: 'text', sheet: 'sheet' };
const nameFor = (f, ext, idx = 0) => (idx ? idx + '-' : '') + baseName(f) + '.' + ext;
const safeName = s => String(s).replace(/[\\/:*?"<>|]/g, '_');
const wait = ms => new Promise(r => setTimeout(r, ms));
const xmlEsc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
const fmtBytes = b => {
  if (!Number.isFinite(b)) return '—';
  const u = ['B', 'KB', 'MB', 'GB']; let i = 0, n = b;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return (i === 0 ? n : n.toFixed(n < 10 ? 2 : 1)) + ' ' + u[i];
};
const fmtDate = ts => new Date(ts).toLocaleString(lang === 'ar' ? 'ar' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' });
const MAX_PIXELS = 16_000_000;
const FF_BASE = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/';
// Media-only filters (image/*, video/*) open the Android photo picker, which hides the real file name and
// can revoke read access later. Explicit extensions in a mixed list open the file browser instead.
const IMG_EXT = '.jpg,.jpeg,.png,.webp,.gif,.bmp,.heic,.heif,.avif';
const VID_EXT = '.mp4,.mkv,.avi,.mov,.webm,.m4v';
const ALL_ACCEPT = `${IMG_EXT},${VID_EXT},audio/*,.pdf,.docx,.txt,.md,.csv,.xlsx,.xls`;

let toastT;
function toast(msg, type = 'info') {
  const el = $('#toast');
  el.textContent = msg;
  el.className = 'toast show ' + type;
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('show'), 4200);
}

/* =================== Catalog =================== */
const KIND = {
  image: { icon: '🖼', group: 'images', accept: ALL_ACCEPT },
  video: { icon: '🎬', group: 'video',  accept: ALL_ACCEPT },
  audio: { icon: '🎵', group: 'audio',  accept: 'audio/*' },
  pdf:   { icon: '📕', group: 'docs',   accept: '.pdf,application/pdf' },
  docx:  { icon: '📘', group: 'docs',   accept: '.docx' },
  text:  { icon: '📝', group: 'docs',   accept: '.txt,.md,text/plain' },
  sheet: { icon: '📊', group: 'sheets', accept: '.csv,.xlsx,.xls' }
};
const SOURCE = {
  jpg: 'image', png: 'image', webp: 'image', gif: 'image', bmp: 'image', heic: 'image', avif: 'image',
  mp4: 'video', mov: 'video', mkv: 'video', webm: 'video', avi: 'video',
  mp3: 'audio', wav: 'audio', m4a: 'audio', flac: 'audio', ogg: 'audio', aac: 'audio',
  pdf: 'pdf', docx: 'docx', txt: 'text', csv: 'sheet', xlsx: 'sheet', xls: 'sheet'
};

const OPT = {
  from:     { type: 'time', key: 'from', lk: 'optFrom', value: '' },
  to:       { type: 'time', key: 'to', lk: 'optTo', value: '' },
  angle:    { type: 'seg', key: 'angle', lk: 'optAngle', value: '90',
              options: [['90', '90°'], ['180', '180°'], ['270', '270°']] },
  targetKB: { type: 'select', key: 'targetKB', lk: 'optTargetKB', value: '0',
              options: [['0', 'optNoLimit'], ['50', 'lim50'], ['100', 'lim100'], ['200', 'lim200'], ['500', 'lim500']] },
  idSize:   { type: 'seg', key: 'idSize', lk: 'optIdSize', value: 'passport',
              options: [['passport', 'idPassport'], ['visa', 'idVisa'], ['small', 'idSmall']] },
  quality: { type: 'range', key: 'quality', lk: 'optQuality', min: 10, max: 100, value: 85, unit: '%' },
  maxSide: { type: 'select', key: 'maxSide', lk: 'optMaxSide', value: '0',
             options: [['0', 'optOrig'], ['3840', '3840 px'], ['1920', '1920 px'], ['1280', '1280 px']] },
  vq:      { type: 'seg', key: 'vq', lk: 'optVq', value: 'balanced',
             options: [['high', 'vqHigh'], ['balanced', 'vqMed'], ['small', 'vqSmall']] },
  br:      { type: 'seg', key: 'br', lk: 'optBr', value: '192',
             options: [['128', '128k'], ['192', '192k'], ['320', '320k']] },
  dpi:     { type: 'seg', key: 'scale', lk: 'optDpi', value: '2',
             options: [['1', 'dpiNormal'], ['2', 'dpiHigh'], ['3', 'dpiUltra']] }
};

// T(id, label, descKey, opts, run)
const T = (id, label, descKey, opts, run) => ({ id, label, descKey, opts, run });

/* =================== Libraries (on demand) =================== */
// Each library is tried from ./vendor first (offline-capable once fetched; see README),
// then from its pinned CDN address. Versions are pinned, never "latest".
function loadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = src; s.async = true; s.onload = res;
    s.onerror = () => { s.remove(); rej(new Error(t('e_lib'))); };
    document.head.appendChild(s);
  });
}
async function loadFirst(urls) {
  let lastErr = null;
  for (const u of urls) {
    try { await loadScript(u); return u; } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error(t('e_lib'));
}
const LIBS = {
  pdflib:  { urls: ['vendor/pdf-lib.min.js', 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js'],
             get: () => window.PDFLib },
  pdfjs:   { urls: ['vendor/pdf.min.js', CDN + 'pdf.js/3.11.174/pdf.min.js'], get: () => window.pdfjsLib,
             init: (l, base) => { l.GlobalWorkerOptions.workerSrc = base + 'pdf.worker.min.js'; } },
  mammoth: { urls: ['vendor/mammoth.browser.min.js', CDN + 'mammoth/1.6.0/mammoth.browser.min.js'], get: () => window.mammoth },
  xlsx:    { urls: ['vendor/xlsx.full.min.js', CDN + 'xlsx/0.18.5/xlsx.full.min.js'], get: () => window.XLSX },
  jszip:   { urls: ['vendor/jszip.min.js', CDN + 'jszip/3.10.1/jszip.min.js'], get: () => window.JSZip },
  heic:    { urls: ['vendor/heic2any.min.js', 'https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js'], get: () => window.heic2any }
};
const libCache = {};
function lib(name) {
  if (!libCache[name]) {
    const L = LIBS[name];
    libCache[name] = loadFirst(L.urls).then(url => {
      const g = L.get();
      if (!g) throw new Error(t('e_init'));
      if (L.init) L.init(g, url.slice(0, url.lastIndexOf('/') + 1));
      return g;
    }).catch(e => { delete libCache[name]; throw e; });
  }
  return libCache[name];
}

/* ---- FFmpeg ---- */
let ffmpeg = null, ffmpegPromise = null, progressSink = null;
async function getFFmpeg() {
  if (ffmpeg) return ffmpeg;
  if (!ffmpegPromise) {
    ffmpegPromise = (async () => {
      if (!window.FFmpegWASM) await loadScript('https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/umd/ffmpeg.js');
      if (!window.FFmpegUtil) await loadScript('https://unpkg.com/@ffmpeg/util@0.12.1/dist/umd/index.js');
      const ff = new window.FFmpegWASM.FFmpeg();
      ff.on('progress', ({ progress }) => { if (progressSink) progressSink(progress); });
      const { toBlobURL } = window.FFmpegUtil;
      await ff.load({
        coreURL: await toBlobURL(FF_BASE + '/ffmpeg-core.js', 'text/javascript'),
        wasmURL: await toBlobURL(FF_BASE + '/ffmpeg-core.wasm', 'application/wasm')
      });
      ffmpeg = ff;
      return ff;
    })().catch(() => { ffmpegPromise = null; throw new Error(t('e_engine')); });
  }
  return ffmpegPromise;
}
async function ffRun(file, srcKey, outExt, argsFn, mime) {
  if (!ffmpeg) setProgress(0.02, t('loadingEngine'));
  const ff = await getFFmpeg();
  const inName = 'input.' + ((srcKey || 'bin').replace(/[^a-z0-9]/gi, '') || 'bin');
  const outName = 'output.' + outExt;
  progressSink = p => setProgress(0.05 + 0.9 * clamp01(p), t('processing'));
  setProgress(0.05, t('processing'));
  try {
    await ff.writeFile(inName, await window.FFmpegUtil.fetchFile(file));
    const code = await ff.exec(argsFn(inName, outName));
    if (code !== 0) throw new Error(t('e_ff'));
    const data = await ff.readFile(outName);
    if (!(data instanceof Uint8Array) || !data.byteLength) throw new Error(t('e_outInvalid'));
    return new Blob([data], { type: mime });
  } finally {
    progressSink = null;
    await ff.deleteFile(inName).catch(() => {});
    await ff.deleteFile(outName).catch(() => {});
  }
}
// Trimming: "from" becomes an input seek (-ss) and "to" an output duration (-t).
// Audio/video are re-encoded in every case, so the cut is frame-accurate.
// Accepts "90", "1:30" or "0:01:30". UNTESTED here: FFmpeg cannot run in this sandbox.
const parseTime = s => {
  if (s === undefined || s === null || !String(s).trim()) return null;
  const parts = String(s).trim().split(':').map(Number);
  if (parts.length > 3 || parts.some(n => !isFinite(n) || n < 0)) return NaN;
  return parts.reduce((acc, n) => acc * 60 + n, 0);
};
const ffTrim = fn => (inp, out, o) => {
  const a = parseTime(o.from), b = parseTime(o.to);
  if (Number.isNaN(a) || Number.isNaN(b)) throw new Error(t('e_trim'));
  const start = a || 0;
  if (b !== null && b <= start) throw new Error(t('e_trim'));
  const pre = start > 0 ? ['-ss', String(start)] : [];
  const post = b !== null ? ['-t', String(+(b - start).toFixed(3))] : [];
  const args = fn(inp, out, o);
  const i = args.indexOf('-i');
  return [...args.slice(0, i), ...pre, ...args.slice(i, -1), ...post, args[args.length - 1]];
};
const VQ = { high: { crf: 20, qv: 3 }, balanced: { crf: 23, qv: 6 }, small: { crf: 28, qv: 10 } };
const vidArgs = fmt => ffTrim((inp, out, o) => {
  const p = VQ[o.vq] || VQ.balanced;
  const even = ['-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2'];
  if (fmt === 'avi') return ['-i', inp, ...even, '-c:v', 'mpeg4', '-q:v', String(p.qv), '-c:a', 'libmp3lame', '-q:a', '4', out];
  const h = ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', String(p.crf), '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k'];
  return fmt === 'mp4' ? ['-i', inp, ...even, ...h, '-movflags', '+faststart', out] : ['-i', inp, ...even, ...h, out];
});
const audArgs = fmt => ffTrim((inp, out, o) => {
  const br = (o.br || '192') + 'k';
  if (fmt === 'mp3')  return ['-i', inp, '-vn', '-c:a', 'libmp3lame', '-b:a', br, out];
  if (fmt === 'm4a')  return ['-i', inp, '-vn', '-c:a', 'aac', '-b:a', br, out];
  if (fmt === 'flac') return ['-i', inp, '-vn', '-c:a', 'flac', out];
  return ['-i', inp, '-vn', '-c:a', 'pcm_s16le', out];
});
const ffTarget = (outExt, mime, builder) => async (files, o, ctx) => {
  const f = files[0];
  const blob = await ffRun(f, ctx.key, outExt, builder(outExt), mime);
  return [{ blob, name: nameFor(f, outExt) }];
};

/* ---- Images ---- */
/* Opens an image: the <img> path first, then the browser's bitmap decoder. If neither works,
   a file that cannot be read at all gets its own message, separate from an unsupported format. */
async function openImage(file) {
  const url = URL.createObjectURL(file);
  try {
    return await new Promise((res, rej) => {
      const im = new Image();
      im.onload = () => res(im);
      im.onerror = () => rej(new Error('img'));
      im.src = url;
    });
  } catch (_) {
    if (await isHeicFile(file)) return openHeic(file);
    try { return await createImageBitmap(file); } catch (_2) { /* try the next check */ }
    try { await file.arrayBuffer(); } catch (_3) { throw new Error(t('e_read', { name: file.name })); }
    throw new Error(t('e_imgOpen', { name: file.name }));
  } finally { URL.revokeObjectURL(url); }
}
// HEIC/HEIF files carry an "ftyp" box whose brand names the format.
async function isHeicFile(file) {
  try {
    const h = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    const brand = String.fromCharCode(...h.slice(8, 12));
    return String.fromCharCode(...h.slice(4, 8)) === 'ftyp' && /^(heic|heix|heim|heis|hevc|mif1|msf1)$/.test(brand);
  } catch (_) { return false; }
}
// Most browsers cannot draw HEIC, so the photo is converted to JPEG first (decoder loaded on first use).
async function openHeic(file) {
  let convert;
  try { convert = await lib('heic'); } catch (_) { throw new Error(t('e_heic')); }
  let out;
  try {
    out = await convert({ blob: new Blob([file], { type: 'image/heic' }), toType: 'image/jpeg', quality: 0.95 });
  } catch (_) { throw new Error(t('e_imgOpen', { name: file.name })); }
  return decodeJpegBlob(Array.isArray(out) ? out[0] : out, file.name);
}
function decodeJpegBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  return new Promise((res, rej) => {
    const im = new Image();
    im.onload = () => { URL.revokeObjectURL(url); res(im); };
    im.onerror = () => { URL.revokeObjectURL(url); rej(new Error(t('e_imgOpen', { name }))); };
    im.src = url;
  });
}
async function drawImage(file, maxSide, flatten) {
  const img = await openImage(file);
  try {
    const ow = img.naturalWidth || img.width, oh = img.naturalHeight || img.height;
    let w = ow, h = oh;
    if (!w || !h) throw new Error(t('e_imgEmpty'));
    const capS = Math.min(1, Math.sqrt(MAX_PIXELS / (w * h)));
    let s = capS;
    if (maxSide > 0) s = Math.min(s, maxSide / Math.max(w, h));
    const capped = capS < 1 && s >= capS;
    w = Math.max(1, Math.round(w * s)); h = Math.max(1, Math.round(h * s));
    if (capped) scaleNotes.push({ from: `${ow}×${oh}`, to: `${w}×${h}` });
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const x = c.getContext('2d');
    if (flatten) { x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h); }
    x.drawImage(img, 0, 0, w, h);
    return c;
  } finally { if (img.close) img.close(); }
}
const IMG_MIME = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
async function convertImage(file, fmt, o) {
  const canvas = await drawImage(file, +o.maxSide || 0, fmt === 'jpg');
  const q = (+o.quality || 85) / 100, limit = (+o.targetKB || 0) * 1024;
  if (fmt === 'png' || !limit) return encodeCanvas(canvas, fmt, q);
  return encodeToLimit(canvas, fmt, q, limit);
}
function encodeCanvas(c, fmt, q) {
  return new Promise((res, rej) => c.toBlob(
    b => b ? res(b) : rej(new Error(t('e_encode', { f: fmt.toUpperCase() }))),
    IMG_MIME[fmt], fmt === 'png' ? undefined : q));
}
// Finds the highest quality under `limit` (binary search); if even the lowest quality
// is too big, the pixels are reduced step by step and the change is reported to the user.
async function encodeToLimit(canvas, fmt, q0, limit) {
  let c = canvas, sizeNote = null;
  for (let pass = 0; pass < 4; pass++) {
    const top = await encodeCanvas(c, fmt, q0);
    if (top.size <= limit) return top;
    let lo = 0.05, hi = q0, fit = null;
    for (let k = 0; k < 7; k++) {
      const mid = (lo + hi) / 2;
      const b = await encodeCanvas(c, fmt, mid);
      if (b.size <= limit) { fit = b; lo = mid; } else hi = mid;
    }
    if (fit) return fit;
    const n = document.createElement('canvas');
    n.width = Math.max(1, Math.round(c.width * 0.8)); n.height = Math.max(1, Math.round(c.height * 0.8));
    const x = n.getContext('2d'); x.imageSmoothingQuality = 'high';
    x.drawImage(c, 0, 0, n.width, n.height);
    c = n;
    if (!sizeNote) { sizeNote = { from: `${canvas.width}×${canvas.height}`, to: '' }; scaleNotes.push(sizeNote); }
    sizeNote.to = `${c.width}×${c.height}`;
    sizeNote.reason = 'size';
  }
  return encodeCanvas(c, fmt, 0.05);
}
// Passport / ID sizes at 300 dpi. Centre crop, pushed slightly up to keep head room.
// No face detection: for exact framing the user should crop manually first.
const ID_SIZES = { passport: [413, 531], visa: [591, 591], small: [472, 709] };
async function idPhotoRun(files, o) {
  const [W, H] = ID_SIZES[o.idSize] || ID_SIZES.passport;
  return eachFile(files, i => t('stepConv', { i: i + 1, n: files.length }), async (f, i) => {
    const src = await drawImage(f, 0, true);
    let cw = src.width, ch = src.height;
    if (cw / ch > W / H) cw = Math.round(ch * W / H); else ch = Math.round(cw * H / W);
    const sx = Math.round((src.width - cw) / 2), sy = Math.round((src.height - ch) * 0.35);
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d'); x.imageSmoothingQuality = 'high';
    x.fillStyle = '#ffffff'; x.fillRect(0, 0, W, H);
    x.drawImage(src, sx, sy, cw, ch, 0, 0, W, H);
    return { blob: await encodeCanvas(c, 'jpg', 0.95), name: nameFor(f, 'jpg') };
  });
}
// Runs fn on every file. A file that fails is recorded in batchErrors and skipped;
// cancellation still stops the whole batch. Fails only if no file succeeded.
async function eachFile(files, label, fn) {
  const results = [];
  batchErrors = [];
  for (let i = 0; i < files.length; i++) {
    checkCancel();
    setProgress(i / files.length, label(i));
    try { results.push(await fn(files[i], i)); }
    catch (e) {
      if (currentJob && currentJob.cancelled) throw e;
      console.warn(e);
      batchErrors.push({ name: files[i].name, msg: e.message });
    }
  }
  if (!results.length) throw new Error(batchErrors[0] ? batchErrors[0].msg : t('e_noOut'));
  return results;
}
const imgRun = fmt => (files, o) => eachFile(files, i => t('stepConv', { i: i + 1, n: files.length }),
  async (f, i) => ({ blob: await convertImage(f, fmt, o), name: nameFor(f, fmt) }));
async function canvasJpeg(c, q) {
  const b = await new Promise((res, rej) => c.toBlob(
    x => x ? res(x) : rej(new Error(t('e_encode', { f: 'PDF' }))), 'image/jpeg', q));
  return new Uint8Array(await b.arrayBuffer());
}
async function imagesToPdf(files) {
  const PDFLib = await lib('pdflib');
  const pdf = await PDFLib.PDFDocument.create();
  await eachFile(files, i => t('stepAdd', { i: i + 1, n: files.length }), async f => {
    const c = await drawImage(f, 0, true);
    const img = await pdf.embedJpg(await canvasJpeg(c, 0.92));
    const pw = c.width * 0.75, ph = c.height * 0.75;   // 96-dpi pixels -> PDF points
    pdf.addPage([pw, ph]).drawImage(img, { x: 0, y: 0, width: pw, height: ph });
  });
  const bytes = await pdf.save();
  return [{ blob: new Blob([bytes], { type: 'application/pdf' }), name: nameFor(files[0], 'pdf') }];
}

/* ---- PDF ---- */
async function loadPdf(file) {
  const pdfjs = await lib('pdfjs');
  return pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
}
async function pdfText(file) {
  const doc = await loadPdf(file);
  const parts = [];
  for (let i = 1; i <= doc.numPages; i++) {
    checkCancel();
    setProgress(i / doc.numPages * 0.9, t('stepRead', { i, n: doc.numPages }));
    const page = await doc.getPage(i);
    const tc = await page.getTextContent();
    parts.push(tc.items.map(it => it.str + (it.hasEOL ? '\n' : ' ')).join('').replace(/[ \t]+\n/g, '\n').trim());
  }
  return parts.join('\n\n');
}
const pdfToImages = fmt => async (files, o) => {
  const doc = await loadPdf(files[0]);
  const n = doc.numPages, scale = (+o.scale || 2) * 1.5, outs = [];
  for (let i = 1; i <= n; i++) {
    checkCancel();
    setProgress((i - 1) / n, t('stepRender', { i, n }));
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale });
    const c = document.createElement('canvas');
    c.width = Math.floor(vp.width); c.height = Math.floor(vp.height);
    await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
    const blob = await new Promise((res, rej) => c.toBlob(
      b => b ? res(b) : rej(new Error(t('e_render'))),
      fmt === 'png' ? 'image/png' : 'image/jpeg', (+o.quality || 90) / 100));
    outs.push({ blob, name: nameFor(files[0], fmt, n > 1 ? i : 0) });
  }
  return outs;
};

/* ---- PDF tools (pdf-lib) ---- */
async function openPdfDoc(file) {
  const PDFLib = await lib('pdflib');
  return PDFLib.PDFDocument.load(new Uint8Array(await file.arrayBuffer()), { ignoreEncryption: true });
}
const pdfBlob = bytes => new Blob([bytes], { type: 'application/pdf' });
async function mergePdfs(files) {
  const PDFLib = await lib('pdflib');
  const out = await PDFLib.PDFDocument.create();
  await eachFile(files, i => t('stepRead', { i: i + 1, n: files.length }), async f => {
    const src = await openPdfDoc(f);
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach(p => out.addPage(p));
  });
  return [{ blob: pdfBlob(await out.save()), name: 'merged.pdf' }];
}
async function rotatePdf(files, o) {
  const PDFLib = await lib('pdflib');
  const pdf = await openPdfDoc(files[0]);
  const add = +o.angle || 90;
  for (const page of pdf.getPages()) {
    page.setRotation(PDFLib.degrees((page.getRotation().angle + add) % 360));
  }
  return [{ blob: pdfBlob(await pdf.save()), name: nameFor(files[0], 'pdf') }];
}
async function splitPdf(files) {
  const PDFLib = await lib('pdflib');
  const src = await openPdfDoc(files[0]);
  const n = src.getPageCount(), base = baseName(files[0]), pad = String(n).length, outs = [];
  for (let i = 0; i < n; i++) {
    checkCancel();
    setProgress(i / n, t('stepSplit', { i: i + 1, n }));
    const one = await PDFLib.PDFDocument.create();
    const [page] = await one.copyPages(src, [i]);
    one.addPage(page);
    outs.push({ blob: pdfBlob(await one.save()), name: base + '-' + String(i + 1).padStart(pad, '0') + '.pdf' });
  }
  return outs;
}

/* ---- Word ---- */
async function docxText(file) {
  const m = await lib('mammoth');
  const r = await m.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return r.value;
}
async function textToDocx(text) {
  const JSZip = await lib('jszip');
  const z = new JSZip();
  const H = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
  z.file('[Content_Types].xml', H + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>');
  z.file('_rels/.rels', H + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
  const paras = text.split(/\r?\n/).map(line => {
    if (!line.trim()) return '<w:p/>';
    const rtl = /[\u0600-\u06FF]/.test(line);
    const ppr = rtl ? '<w:pPr><w:bidi/><w:jc w:val="right"/></w:pPr>' : '';
    return `<w:p>${ppr}<w:r><w:t xml:space="preserve">${xmlEsc(line)}</w:t></w:r></w:p>`;
  }).join('');
  z.file('word/document.xml', H + '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + paras + '<w:sectPr/></w:body></w:document>');
  return z.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
}

/* ---- Text → PDF (canvas-rendered so Arabic shapes correctly) ---- */
function wrapLine(ctx, para, maxW) {
  const out = []; let cur = '';
  const w = s => ctx.measureText(s).width;
  for (const p of para.split(/(\s+)/)) {
    if (!p) continue;
    const test = cur + p;
    if (w(test) <= maxW) { cur = test; continue; }
    if (cur.trim()) { out.push(cur.trimEnd()); cur = ''; }
    if (w(p) > maxW) {
      let chunk = '';
      for (const ch of p) {
        if (w(chunk + ch) > maxW) { out.push(chunk); chunk = ch; } else chunk += ch;
      }
      cur = chunk;
    } else cur = p.trimStart();
  }
  out.push(cur.trimEnd());
  return out;
}
async function textToPdf(text) {
  const PDFLib = await lib('pdflib');
  const W = 595, H = 842, M = 44, FS = 13, LH = 19, S = 2;
  const cv = document.createElement('canvas');
  cv.width = W * S; cv.height = H * S;
  const ctx = cv.getContext('2d');
  ctx.scale(S, S);
  const font = `${FS}px system-ui,"Segoe UI",Tahoma,Arial,sans-serif`;
  ctx.font = font;
  const maxW = W - 2 * M;
  const lines = [];
  for (const para of text.split(/\r?\n/)) {
    if (!para.trim()) { lines.push({ t: '', rtl: false }); continue; }
    const rtl = /[\u0600-\u06FF]/.test(para);
    wrapLine(ctx, para, maxW).forEach(tx => lines.push({ t: tx, rtl }));
  }
  const perPage = Math.floor((H - 2 * M) / LH);
  const pages = Math.max(1, Math.ceil(lines.length / perPage));
  const pdf = await PDFLib.PDFDocument.create();
  for (let p = 0; p < pages; p++) {
    checkCancel();
    setProgress(p / pages, t('stepBuild', { i: p + 1, n: pages }));
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#111111';
    ctx.font = font;
    lines.slice(p * perPage, (p + 1) * perPage).forEach((ln, i) => {
      const y = M + (i + 1) * LH - 5;
      ctx.textAlign = ln.rtl ? 'right' : 'left';
      ctx.fillText(ln.t, ln.rtl ? W - M : M, y);
    });
    const img = await pdf.embedJpg(await canvasJpeg(cv, 0.9));
    pdf.addPage([W, H]).drawImage(img, { x: 0, y: 0, width: W, height: H });
  }
  return new Blob([await pdf.save()], { type: 'application/pdf' });
}

/* ---- Spreadsheets ---- */
async function readWB(file) {
  const X = await lib('xlsx');
  if (extOf(file.name) === 'csv') return X.read(await file.text(), { type: 'string' });
  return X.read(new Uint8Array(await file.arrayBuffer()), { type: 'array' });
}
const sheetOut = fmt => async files => {
  const X = await lib('xlsx');
  const wb = await readWB(files[0]);
  const base = baseName(files[0]);
  return wb.SheetNames.map(n => {
    const ws = wb.Sheets[n];
    let blob;
    if (fmt === 'csv') blob = new Blob(['\uFEFF' + X.utils.sheet_to_csv(ws)], { type: 'text/csv;charset=utf-8' });
    else if (fmt === 'txt') blob = new Blob([X.utils.sheet_to_csv(ws, { FS: '\t' })], { type: 'text/plain;charset=utf-8' });
    else blob = new Blob([JSON.stringify(X.utils.sheet_to_json(ws, { defval: '' }), null, 2)], { type: 'application/json' });
    const name = (wb.SheetNames.length > 1 ? `${base}-${safeName(n)}` : base) + '.' + fmt;
    return { blob, name };
  });
};
async function sheetToXlsx(files) {
  const X = await lib('xlsx');
  const wb = await readWB(files[0]);
  const arr = X.write(wb, { bookType: 'xlsx', type: 'array' });
  return [{ blob: new Blob([arr], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), name: nameFor(files[0], 'xlsx') }];
}
async function sheetText(file) {
  const X = await lib('xlsx');
  const wb = await readWB(file);
  return wb.SheetNames.map(n => `## ${n}\n` + X.utils.sheet_to_csv(wb.Sheets[n])).join('\n\n');
}

/* ---- Generic "text → file" ---- */
const toText = (getter, ext, conv) => async files => {
  const text = (await getter(files[0])).trim();
  if (!text) throw new Error(t('e_noText'));
  return [{ blob: await conv(text), name: nameFor(files[0], ext) }];
};
const readText = async f => (await f.text()).replace(/^\uFEFF/, '');
const txtBlob = tx => new Blob([tx], { type: 'text/plain;charset=utf-8' });

/* =================== Targets =================== */
const TARGETS = {
  image: [
    T('jpg',  'JPG',  'd_jpg',    [OPT.quality, OPT.maxSide, OPT.targetKB], imgRun('jpg')),
    T('png',  'PNG',  'd_png',    [OPT.maxSide], imgRun('png')),
    T('webp', 'WebP', 'd_webp',   [OPT.quality, OPT.maxSide, OPT.targetKB], imgRun('webp')),
    T('pdf',  'PDF',  'd_imgpdf', [], imagesToPdf),
    T('id',   'ID',   'd_idphoto', [OPT.idSize], idPhotoRun)
  ],
  video: [
    T('mp4', 'MP4', 'd_mp4',     [OPT.vq, OPT.from, OPT.to], ffTarget('mp4', 'video/mp4', vidArgs)),
    T('mkv', 'MKV', 'd_mkv',     [OPT.vq, OPT.from, OPT.to], ffTarget('mkv', 'video/x-matroska', vidArgs)),
    T('avi', 'AVI', 'd_avi',     [OPT.vq, OPT.from, OPT.to], ffTarget('avi', 'video/x-msvideo', vidArgs)),
    T('mp3', 'MP3', 'd_vidmp3',  [OPT.br, OPT.from, OPT.to], ffTarget('mp3', 'audio/mpeg', audArgs)),
    T('wav', 'WAV', 'd_wav',     [OPT.from, OPT.to], ffTarget('wav', 'audio/wav', audArgs)),
    T('m4a', 'M4A', 'd_m4a',     [OPT.br, OPT.from, OPT.to], ffTarget('m4a', 'audio/mp4', audArgs))
  ],
  audio: [
    T('mp3',  'MP3',  'd_mp3',  [OPT.br, OPT.from, OPT.to], ffTarget('mp3', 'audio/mpeg', audArgs)),
    T('wav',  'WAV',  'd_wav',  [OPT.from, OPT.to], ffTarget('wav', 'audio/wav', audArgs)),
    T('m4a',  'M4A',  'd_m4a',  [OPT.br, OPT.from, OPT.to], ffTarget('m4a', 'audio/mp4', audArgs)),
    T('flac', 'FLAC', 'd_flac', [OPT.from, OPT.to], ffTarget('flac', 'audio/flac', audArgs))
  ],
  pdf: [
    T('txt',  'TXT',  'd_pdftxt',  [], toText(pdfText, 'txt', txtBlob)),
    T('docx', 'Word', 'd_pdfdocx', [], toText(pdfText, 'docx', textToDocx)),
    T('png',  'PNG',  'd_pdfpng',  [OPT.dpi], pdfToImages('png')),
    T('jpg',  'JPG',  'd_pdfjpg',  [OPT.dpi, OPT.quality], pdfToImages('jpg')),
    T('rotate', 'Rotate', 'd_rotate', [OPT.angle], rotatePdf),
    T('split',  'Split',  'd_split',  [], splitPdf),
    { ...T('merge', 'Merge', 'd_merge', [], mergePdfs), multi: true, multiOnly: true }
  ],
  docx: [
    T('txt', 'TXT', 'd_docxtxt', [], toText(docxText, 'txt', txtBlob)),
    T('pdf', 'PDF', 'd_docxpdf', [], toText(docxText, 'pdf', textToPdf))
  ],
  text: [
    T('pdf',  'PDF',  'd_textpdf',  [], toText(readText, 'pdf', textToPdf)),
    T('docx', 'Word', 'd_textdocx', [], toText(readText, 'docx', textToDocx))
  ],
  sheet: [
    T('csv',  'CSV',   'd_csv',     [], sheetOut('csv')),
    T('xlsx', 'Excel', 'd_xlsx',    [], sheetToXlsx),
    T('txt',  'TXT',   'd_sheettxt',[], sheetOut('txt')),
    T('json', 'JSON',  'd_json',    [], sheetOut('json')),
    T('pdf',  'PDF',   'd_sheetpdf',[], async files => [{ blob: await textToPdf(await sheetText(files[0])), name: nameFor(files[0], 'pdf') }])
  ]
};

TARGETS.image.forEach(x => { x.multi = true; });

/* =================== Detection (by file signature) =================== */
async function detectKey(file) {
  const buf = new Uint8Array(await file.slice(0, 512).arrayBuffer());
  const ext = extOf(file.name);
  const b = (o, arr) => arr.every((v, i) => buf[o + i] === v);
  const s = (o, str) => str.split('').every((c, i) => buf[o + i] === c.charCodeAt(0));
  const str = (from, to) => String.fromCharCode(...buf.slice(from, to));

  if (b(0, [0xFF, 0xD8, 0xFF])) return 'jpg';
  if (b(0, [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])) return 'png';
  if (s(0, 'RIFF') && s(8, 'WEBP')) return 'webp';
  if (s(0, 'RIFF') && s(8, 'WAVE')) return 'wav';
  if (s(0, 'RIFF') && s(8, 'AVI ')) return 'avi';
  if (s(0, 'GIF8')) return 'gif';
  if (s(0, '%PDF')) return 'pdf';
  if (b(0, [0x1A, 0x45, 0xDF, 0xA3])) return str(0, 64).includes('webm') ? 'webm' : 'mkv';
  if (s(0, 'fLaC')) return 'flac';
  if (s(0, 'OggS')) return 'ogg';
  if (s(4, 'ftyp')) {
    const br = str(8, 12);
    if (/^(heic|heix|heim|heis|hevc|mif1|msf1)$/.test(br)) return 'heic';
    if (/^avi[fs]$/.test(br)) return 'avif';
    if (br === 'M4A ' || br === 'M4B ') return 'm4a';
    if (br === 'qt  ') return 'mov';
    return 'mp4';
  }
  if (b(0, [0x50, 0x4B, 0x03, 0x04])) {
    if (ext === 'docx') return 'docx';
    if (ext === 'xlsx') return 'xlsx';
  }
  if (b(0, [0xD0, 0xCF, 0x11, 0xE0]) && ext === 'xls') return 'xls';
  if (s(0, 'ID3') || (buf[0] === 0xFF && (buf[1] & 0xE0) === 0xE0)) return 'mp3';

  const alias = { jpeg: 'jpg', heif: 'heic', md: 'txt' };
  const e = alias[ext] || ext;
  const known = ['mp3', 'wav', 'flac', 'm4a', 'aac', 'ogg', 'opus', 'mp4', 'mov', 'mkv', 'webm', 'avi',
                 'jpg', 'png', 'webp', 'gif', 'bmp', 'heic', 'avif', 'pdf', 'docx', 'xlsx', 'xls', 'csv', 'txt'];
  if (known.includes(e)) return e === 'opus' ? 'ogg' : e;
  return null;
}

/* =================== State =================== */
const state = { items: [], target: null, opts: {}, tab: 'all', result: null, resultUrl: null };
let currentJob = null;
let batchErrors = [];
let scaleNotes = [];
let jobStamp = '';
const checkCancel = () => { if (currentJob && currentJob.cancelled) throw new Error('cancelled'); };

/* Smooth progress bar: moves toward real progress and keeps advancing slowly while work runs */
let progReal = 0, progShown = 0, progTimer = null;
function renderProg() {
  const v = Math.round(progShown * 100);
  $('#barFill').style.width = v + '%';
  $('#pct').textContent = v + '%';
}
function startProgAnim() {
  clearInterval(progTimer);
  progReal = 0; progShown = 0; renderProg();
  progTimer = setInterval(() => {
    const ceil = Math.min(0.92, progReal + 0.12);
    if (progShown < ceil) progShown = Math.min(ceil, progShown + 0.006);
    if (progShown < progReal) progShown = progReal;
    renderProg();
  }, 80);
}
function finishProg() {
  clearInterval(progTimer); progTimer = null;
  progReal = 1; progShown = 1; renderProg();
}
function setProgress(p, msg) {
  progReal = Math.max(progReal, clamp01(p));
  if (msg) $('#progText').textContent = msg;
}

/* =================== Overlays & navigation =================== */
const openSheet = s => { $(s).classList.add('open'); updateMask(); };
const closeSheet = s => { $(s).classList.remove('open'); updateMask(); };
const openModal = s => $(s).classList.add('open');
const closeModal = s => $(s).classList.remove('open');
const openPage = id => { closeDrawer(); $('#' + id).classList.add('open'); };
const closePage = el => el.classList.remove('open');
function updateMask() { $('#mask').classList.toggle('show', !!document.querySelector('.sheet.open,.drawer.open')); }
function openDrawer() { $('#drawer').classList.add('open'); updateMask(); }
function closeDrawer() { $('#drawer').classList.remove('open'); updateMask(); }
function closeAllOverlays() {
  $$('.sheet.open').forEach(x => x.classList.remove('open'));
  closeDrawer();
  $$('.page.open').forEach(closePage);
  updateMask();
}
function showView(name) {
  $$('.view').forEach(v => v.classList.toggle('on', v.id === 'v-' + name));
  $$('.bnav').forEach(b => b.classList.toggle('on', b.dataset.go === name));
  if (name === 'history') renderHistory();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeDrawer();
}

/* =================== File selection =================== */
function pickFor(kind) {
  const input = $('#fileInput');
  input.accept = kind ? (kind && TARGETS[kind] && KIND[kind].accept) : ALL_ACCEPT;
  input.click();
}
const pickGeneral = () => pickFor(null);

// Copies a picked file into memory, so later steps do not depend on the picker's access to it.
// Very large files (mostly videos) are kept as they are to limit memory use.
async function snapshotFile(f) {
  if (f.size > 30 * 1048576) return f;
  try { return new File([await f.arrayBuffer()], f.name, { type: f.type }); } catch (_) { return f; }
}

async function handleFiles(list) {
  if (!list || !list.length) return;
  if (currentJob) { toast(t('e_busy'), 'error'); return; }
  const items = [];
  for (const f of list) {
    if (f.size === 0) { toast(t('e_empty', { name: f.name }), 'error'); return; }
    const key = await detectKey(f);
    let kind = key && SOURCE[key];
    if (!kind && f.type.startsWith('image/')) kind = 'image';
    if (!kind && f.type.startsWith('video/')) kind = 'video';
    if (!kind && f.type.startsWith('audio/')) kind = 'audio';
    if (!kind) { toast(t('e_type', { name: f.name }), 'error'); return; }
    const kept = await snapshotFile(f);
    const shown = isGeneratedName(f.name)
      ? new File([kept], `${KIND_WORD[kind] || 'file'}-${stamp()}${key ? '.' + key : ''}`, { type: f.type })
      : kept;
    items.push({ file: shown, key: key || extOf(f.name) || 'bin', kind });
  }
  if (new Set(items.map(i => i.kind)).size > 1) { toast(t('e_oneKind'), 'error'); return; }
  if (items.length > 1 && !['image', 'pdf'].includes(items[0].kind)) { toast(t('e_multi'), 'error'); return; }
  state.items = items;
  state.target = null;
  state.opts = {};
  openPickSheet();
}

/* =================== Pick sheet =================== */
function renderPickSheet() {
  const it = state.items;
  if (!it.length) return;
  const k = it[0].kind;
  const total = it.reduce((s, i) => s + i.file.size, 0);
  $('#sumIcon').textContent = KIND[k].icon;
  $('#sumName').textContent = it.length > 1 ? t('multiImages', { n: it.length }) : it[0].file.name;
  $('#sumMeta').textContent = `${t('k_' + k)} · ${it.length > 1 ? t('total') + ' ' : ''}${fmtBytes(total)}${total > 150 * 1048576 ? ' · ' + t('warnBig') : ''}`;
  $('#sumBadge').textContent = it.length > 1 ? t('batch') : (it[0].key || '');

  const list = it.length > 1 ? TARGETS[k].filter(tg => tg.multi)
                             : TARGETS[k].filter(tg => tg.id !== it[0].key && !tg.multiOnly);
  if (state.target && !list.includes(state.target)) state.target = null;
  const grid = $('#targetGrid');
  grid.innerHTML = '';
  list.forEach(tg => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'fopt' + (state.target === tg ? ' on' : '');
    const name = document.createElement('b');
    name.textContent = tg.label;
    const desc = document.createElement('small');
    desc.textContent = t(tg.descKey);
    b.append(name, desc);
    b.addEventListener('click', () => selectTarget(tg));
    grid.appendChild(b);
  });
  renderOpts();
  setConvertBtn();
}
function openPickSheet() { renderPickSheet(); openSheet('#pickSheet'); }

function selectTarget(tg) {
  state.target = tg;
  state.opts = {};
  tg.opts.forEach(o => { state.opts[o.key] = o.value; });
  $$('#targetGrid .fopt').forEach((b, i) => b.classList.toggle('on', b.querySelector('b').textContent === tg.label));
  renderOpts();
  setConvertBtn();
}
function setConvertBtn() {
  const btn = $('#convertBtn');
  btn.disabled = !state.target;
  btn.textContent = state.target ? t('convertTo', { f: state.target.label }) : t('selectFirst');
}
function renderOpts() {
  const box = $('#sheetOpts');
  const tg = state.target;
  if (!tg || !tg.opts.length) { box.hidden = true; box.innerHTML = ''; return; }
  box.hidden = false;
  box.innerHTML = tg.opts.map(o => {
    const cur = state.opts[o.key];
    const label = t(o.lk);
    if (o.type === 'range') return `
      <div class="opt"><label>${label}<b data-val="${o.key}">${cur}${o.unit || ''}</b></label>
      <input type="range" data-key="${o.key}" min="${o.min}" max="${o.max}" value="${cur}"></div>`;
    if (o.type === 'time') return `
      <div class="opt"><label>${label}</label>
      <input type="text" inputmode="numeric" dir="ltr" data-tkey="${o.key}" placeholder="0:00" value="${cur || ''}"></div>`;
    if (o.type === 'select') return `
      <div class="opt"><label>${label}</label>
      <select data-key="${o.key}">${o.options.map(([v, l]) =>
        `<option value="${v}" ${String(v) === String(cur) ? 'selected' : ''}>${/^[a-z]/i.test(l) && l.includes('px') ? l : t(l)}</option>`).join('')}</select></div>`;
    return `
      <div class="opt"><label>${label}</label>
      <div class="seg" data-key="${o.key}">${o.options.map(([v, l]) =>
        `<button type="button" data-v="${v}" class="${String(v) === String(cur) ? 'on' : ''}">${/^[a-z]/i.test(l) && /\d/.test(l) ? l : t(l)}</button>`).join('')}</div></div>`;
  }).join('');

  box.querySelectorAll('input[type=range]').forEach(inp => inp.addEventListener('input', () => {
    state.opts[inp.dataset.key] = +inp.value;
    box.querySelector(`b[data-val="${inp.dataset.key}"]`).textContent = inp.value + '%';
  }));
  box.querySelectorAll('select').forEach(sel => sel.addEventListener('change', () => { state.opts[sel.dataset.key] = sel.value; }));
  box.querySelectorAll('input[data-tkey]').forEach(inp => inp.addEventListener('input', () => { state.opts[inp.dataset.tkey] = inp.value.trim(); }));
  box.querySelectorAll('.seg').forEach(g => g.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    state.opts[g.dataset.key] = b.dataset.v;
    g.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  }));
}

/* =================== Confirm popup & result preview =================== */
function optsSummary() {
  const tg = state.target;
  if (!tg || !tg.opts.length) return '—';
  return tg.opts.map(o => {
    const v = state.opts[o.key];
    if (o.type === 'range') return `${t(o.lk)} ${v}%`;
    if (o.type === 'time') return `${t(o.lk)} ${v || '—'}`;
    const hit = o.options.find(([val]) => String(val) === String(v));
    return `${t(o.lk)}: ${t(hit ? hit[1] : String(v))}`;
  }).join(' · ');
}
function openConfirm() {
  const tg = state.target;
  if (!tg || currentJob) return;
  const it = state.items;
  const total = it.reduce((s, i) => s + i.file.size, 0);
  const from = it.length > 1 ? t('k_image') : it[0].key.toUpperCase();
  $('#cIcon').textContent = KIND[it[0].kind].icon;
  $('#cRoute').textContent = `${from}  →  ${tg.label}`;
  $('#cFile').textContent = it.length > 1 ? t('multiImages', { n: it.length }) : it[0].file.name;
  $('#cSize').textContent = fmtBytes(total);
  $('#cOpts').textContent = optsSummary();
  openModal('#confirmModal');
}
function buildPreview(file) {
  const pv = $('#resPreview');
  pv.innerHTML = '';
  const ct = file.blob.type || '';
  let el = null;
  if (ct.startsWith('image/')) { el = new Image(); el.alt = ''; }
  else if (ct.startsWith('video/')) { el = document.createElement('video'); el.controls = true; el.playsInline = true; }
  else if (ct.startsWith('audio/')) { el = document.createElement('audio'); el.controls = true; }
  if (!el) return;
  el.onerror = () => { pv.innerHTML = ''; };
  el.src = state.resultUrl;
  pv.appendChild(el);
}

/* =================== Conversion job =================== */
async function pack(outs, base) {
  if (!outs.length) throw new Error(t('e_noOut'));
  if (outs.length === 1) return outs[0];
  const JSZip = await lib('jszip');
  const z = new JSZip();
  const taken = new Set();
  outs.forEach(o => {
    const dot = o.name.lastIndexOf('.'), stem = dot > 0 ? o.name.slice(0, dot) : o.name, ext = dot > 0 ? o.name.slice(dot) : '';
    let name = o.name;
    for (let k = 2; taken.has(name.toLowerCase()); k++) name = `${stem}-${k}${ext}`;
    taken.add(name.toLowerCase());
    z.file(name, o.blob);
  });
  return { blob: await z.generateAsync({ type: 'blob' }), name: base + '.zip' };
}

async function keepAwake() {
  try {
    if (!navigator.wakeLock) return () => {};
    const s = await navigator.wakeLock.request('screen');
    return () => { try { s.release(); } catch (_) {} };
  } catch (_) { return () => {}; }
}
/* ---- Anonymous usage events (metadata only: never file names or contents) ---- */
function usageMeta(items, tg) {
  const safe = k => (/^[a-z0-9]{1,5}$/.test(k || '') ? k : 'other');
  const bytes = items.reduce((s, i) => s + i.file.size, 0);
  return {
    category: items[0].kind,
    route: `${safe(items[0].key)}>${safe(tg.id)}`,
    files: items.length,
    sizeKb: Math.round(bytes / 1024)
  };
}
function track(name, props) {
  try { if (window.FCSync) window.FCSync.track(name, props); } catch (_) {}
}

async function startConvert() {
  const tg = state.target;
  if (!tg || currentJob) return;
  const files = state.items.map(i => i.file);
  const started = Date.now();
  const meta = usageMeta(state.items, tg);
  batchErrors = [];
  const job = { cancelled: false, abort: null };
  job.p = new Promise((_, rej) => { job.abort = rej; });
  job.p.catch(() => {});
  currentJob = job;
  scaleNotes = [];
  jobStamp = stamp();

  closeSheet('#pickSheet');
  closeModal('#confirmModal');
  startProgAnim();
  setProgress(0, t('prepping'));
  openModal('#progressModal');
  const releaseWake = await keepAwake();

  try {
    const outs = await Promise.race([
      tg.run(files, { ...state.opts }, { key: state.items[0].key }),
      job.p
    ]);
    const packed = await pack(outs, baseName(files[0]));
    setProgress(1, t('progDone'));
    finishProg();
    await wait(250);
    closeModal('#progressModal');
    const inputBytes = files.reduce((s, f) => s + f.size, 0);
    const oid = await saveOutput(packed.blob, packed.name);
    addHistory({ name: packed.name, to: tg.label, size: packed.blob.size, date: Date.now(), oid });
    if (batchErrors.length) toast(t('batchPartial', { ok: files.length - batchErrors.length, n: files.length, first: batchErrors[0].name }), 'info');
    track('convert', { ...meta, status: batchErrors.length ? 'partial' : 'ok', durationMs: Date.now() - started });
    showResult(packed, inputBytes);
  } catch (err) {
    clearInterval(progTimer); progTimer = null;
    closeModal('#progressModal');
    track('convert', {
      ...meta,
      status: job.cancelled ? 'cancelled' : 'failed',
      durationMs: Date.now() - started,
      errorCode: job.cancelled ? null : (err && err.name) || 'Error'
    });
    if (job.cancelled) toast(t('cancelled'), 'info');
    else { console.error(err); toast(err.message || t('e_unknown'), 'error'); }
    openSheet('#pickSheet');
  } finally {
    releaseWake();
    if (currentJob === job) currentJob = null;
  }
}
function cancelJob() {
  const job = currentJob;
  if (!job) return;
  job.cancelled = true;
  if (ffmpeg) { try { ffmpeg.terminate(); } catch (_) {} ffmpeg = null; ffmpegPromise = null; }
  job.abort(new Error('cancelled'));
}

function revokeResult() {
  const pv = $('#resPreview');
  if (pv) pv.innerHTML = '';
  if (state.resultUrl) URL.revokeObjectURL(state.resultUrl);
  state.resultUrl = null;
  state.result = null;
}
function showResult(file, inputBytes) {
  revokeResult();
  state.result = file;
  state.resultUrl = URL.createObjectURL(file.blob);
  const dl = $('#dlBtn');
  dl.href = state.resultUrl;
  dl.download = file.name;
  $('#resName').textContent = file.name;
  $('#resSize').textContent = fmtBytes(file.blob.size);
  const ch = ((file.blob.size - inputBytes) / (inputBytes || 1)) * 100;
  const d = $('#resDiff');
  d.className = 'pill ' + (ch <= 0 ? 'good' : 'bad');
  d.textContent = ch <= 0 ? t('smaller', { p: Math.abs(ch).toFixed(0) }) : t('larger', { p: ch.toFixed(0) });
  let can = false;
  try {
    can = !!(navigator.canShare && navigator.canShare({ files: [new File([file.blob], file.name, { type: file.blob.type })] }));
  } catch (_) {}
  $('#shareBtn').hidden = !can;
  const note = $('#resNote');
  if (note) {
    note.hidden = !scaleNotes.length;
    if (scaleNotes.length) {
      const n0 = scaleNotes[0];
      note.textContent = t(n0.reason === 'size' ? 'sizeNote' : 'scaleNote', { a: n0.from, b: n0.to }) + (scaleNotes.length > 1 ? ` (×${scaleNotes.length})` : '');
    }
  }
  buildPreview(file);
  if (navigator.vibrate) { try { navigator.vibrate([120, 60, 120]); } catch (_) {} }
  openModal('#resultModal');
}
async function shareResult() {
  const r = state.result;
  if (!r) return;
  try {
    await navigator.share({ files: [new File([r.blob], r.name, { type: r.blob.type })], title: r.name });
  } catch (err) {
    if (err.name !== 'AbortError') toast(t('shareFail'), 'error');
  }
}

/* =================== History =================== */
/* ---- Output store (IndexedDB): keeps the last few results so history can reopen them ---- */
const STORE = { db: 'fc-store', os: 'outputs', keep: 10, maxBytes: 60 * 1048576 };
let storeP = null, lastOid = 0;
function openStore() {
  if (!storeP) storeP = new Promise((res, rej) => {
    if (!window.indexedDB) return rej(new Error('no idb'));
    const r = indexedDB.open(STORE.db, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE.os);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  }).catch(e => { storeP = null; throw e; });
  return storeP;
}
const reqP = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
// History entries whose stored file was pruned no longer offer "open".
function dropOids(oids) {
  const gone = new Set(oids);
  const h = getHistory().map(e => (gone.has(e.oid) ? { ...e, oid: null } : e));
  try { localStorage.setItem(HKEY, JSON.stringify(h)); } catch (_) {}
}
async function saveOutput(blob, name) {
  if (blob.size > STORE.maxBytes) return null;
  try {
    const db = await openStore();
    const oid = Math.max(Date.now(), lastOid + 1);
    lastOid = oid;
    const tx = db.transaction(STORE.os, 'readwrite');
    tx.objectStore(STORE.os).put({ blob, name }, oid);
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = () => rej(tx.error); tx.onabort = () => rej(tx.error); });
    const keys = await reqP(db.transaction(STORE.os).objectStore(STORE.os).getAllKeys());
    const extra = keys.slice(0, Math.max(0, keys.length - STORE.keep));
    if (extra.length) {
      const dt = db.transaction(STORE.os, 'readwrite');
      extra.forEach(k => dt.objectStore(STORE.os).delete(k));
      dropOids(extra);
    }
    return oid;
  } catch (e) { console.warn(e); return null; }
}
async function openStored(oid) {
  let rec = null;
  try { rec = await reqP((await openStore()).transaction(STORE.os).objectStore(STORE.os).get(oid)); } catch (_) {}
  if (!rec) { toast(t('storedGone'), 'info'); return; }
  const url = URL.createObjectURL(rec.blob);
  let w = null;
  try { w = window.open(url, '_blank'); } catch (_) {}
  if (!w) toast(t('openFail'), 'info');
  setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000);
}

const HKEY = 'fc_history';
function getHistory() { try { return JSON.parse(localStorage.getItem(HKEY)) || []; } catch (_) { return []; } }
function addHistory(entry) {
  const h = [entry, ...getHistory()].slice(0, 100);
  try { localStorage.setItem(HKEY, JSON.stringify(h)); } catch (_) {}
  renderRecent();
}
function makeItem(icon, title, sub) {
  const el = document.createElement('div');
  el.className = 'item';
  el.innerHTML = '<div class="ico-s"></div><div class="txt"><b></b><small></small></div>';
  el.querySelector('.ico-s').textContent = icon;
  el.querySelector('b').textContent = title;
  el.querySelector('small').textContent = sub;
  return el;
}
function renderRecent() {
  const box = $('#recentList');
  const h = getHistory().slice(0, 3);
  box.innerHTML = '';
  if (!h.length) { box.innerHTML = `<div class="empty">${t('emptyRecent')}</div>`; return; }
  h.forEach(e => box.appendChild(makeItem('✔', e.name, `→ ${e.to} · ${fmtBytes(e.size)}`)));
}
function renderHistory() {
  const box = $('#historyList');
  const h = getHistory();
  box.innerHTML = '';
  $('#histCount').textContent = t('convCount', { n: h.length });
  if (!h.length) { box.innerHTML = `<div class="empty">${t('historyEmpty')}</div>`; return; }
  h.forEach(e => {
    const row = makeItem('🕘', e.name, `→ ${e.to} · ${fmtBytes(e.size)} · ${fmtDate(e.date)}`);
    if (e.oid) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'btn-sm'; b.textContent = t('openStored');
      b.addEventListener('click', () => openStored(e.oid));
      row.appendChild(b);
    }
    box.appendChild(row);
  });
}

/* =================== Catalog views =================== */
const TABS = [['all', 'tabAll'], ['images', 'tabImages'], ['video', 'tabVideo'], ['audio', 'tabAudio'], ['docs', 'tabDocs'], ['sheets', 'tabSheets']];
function renderTabs() {
  const box = $('#tabs');
  box.innerHTML = '';
  TABS.forEach(([v, lk]) => {
    const b = document.createElement('button');
    b.className = 'chip' + (state.tab === v ? ' on' : '');
    b.textContent = t(lk);
    b.addEventListener('click', () => { state.tab = v; renderTabs(); renderTools(); });
    box.appendChild(b);
  });
}
function renderTools() {
  const q = $('#search').value.trim().toLowerCase();
  const box = $('#toolList');
  box.innerHTML = '';
  const kinds = Object.keys(KIND).filter(k => {
    if (state.tab !== 'all' && KIND[k].group !== state.tab) return false;
    if (!q) return true;
    const hay = [t('u_' + k), t('s_' + k), t('k_' + k), ...TARGETS[k].map(x => x.label + ' ' + t(x.descKey))].join(' ').toLowerCase();
    return hay.includes(q);
  });
  if (!kinds.length) { box.innerHTML = `<div class="empty">${t('noTools')}</div>`; return; }
  kinds.forEach(k => {
    const card = document.createElement('article');
    card.className = 'card tool';
    card.innerHTML = `<div class="ico">${KIND[k].icon}</div><div class="tbody"><h4></h4><p></p><div class="tags"></div><button class="btn-sm" type="button"></button></div>`;
    card.querySelector('h4').textContent = t('u_' + k);
    card.querySelector('p').textContent = t('s_' + k);
    const tags = card.querySelector('.tags');
    TARGETS[k].forEach(x => { const s = document.createElement('span'); s.className = 'tag'; s.textContent = x.label; tags.appendChild(s); });
    const btn = card.querySelector('.btn-sm');
    btn.textContent = t('chooseFiles');
    btn.addEventListener('click', () => pickFor(k));
    box.appendChild(card);
  });
}
function renderTiles() {
  const quick = [['image', '🖼'], ['pdf', '📕'], ['video', '🎬'], ['audio', '🎵'], ['docx', '📘'], ['sheet', '📊']];
  const box = $('#tiles');
  box.innerHTML = '';
  quick.forEach(([k, e]) => {
    const b = document.createElement('button');
    b.className = 'tile';
    b.type = 'button';
    b.innerHTML = `<span class="e">${e}</span><b></b>`;
    b.querySelector('b').textContent = t('k_' + k);
    b.addEventListener('click', () => pickFor(k));
    box.appendChild(b);
  });
}

/* =================== Theme & language =================== */
function setTheme(th) {
  document.body.dataset.theme = th;
  try { localStorage.setItem('fc_theme', th); } catch (_) {}
  refreshToggles();
}
function toggleTheme() { setTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark'); }

function refreshToggles() {
  const dark = document.body.dataset.theme === 'dark';
  $('#themeQuick').textContent = dark ? '☀️' : '🌙';
  $('#themeIcon').textContent = dark ? '\u2600\uFE0F' : '\u{1F319}';
  $('#themeLbl').textContent = dark ? t('themeLight') : t('themeDark');
  $('#langBtn').textContent = lang === 'ar' ? 'EN' : 'ع';
  $('#langLbl').textContent = lang === 'ar' ? t('langToEn') : t('langToAr');
}

function setLang(l) {
  lang = l;
  try { localStorage.setItem('fc_lang', l); } catch (_) {}
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  document.title = l === 'ar' ? 'محول الملفات · File Converter' : 'File Converter · محول الملفات';
  $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  $$('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  $$('.back').forEach(el => { el.textContent = l === 'ar' ? '→' : '←'; });
  $('#privacyBody').innerHTML = t('privacyBody');
  $('#aboutBody').innerHTML = t('aboutBody');
  $('#fabBtn').setAttribute('aria-label', t('pickFile'));
  $('#fabBtn').title = t('pickFile');
  $('#drawer').setAttribute('aria-label', t('appName'));
  refreshToggles();
  renderTiles();
  renderTabs();
  renderTools();
  renderRecent();
  if (currentJob === null && state.items.length && $('#pickSheet').classList.contains('open')) renderPickSheet();
  if ($('#v-history').classList.contains('on')) renderHistory();
}
function toggleLang() { setLang(lang === 'ar' ? 'en' : 'ar'); }

/* =================== Events =================== */
$('#fileInput').addEventListener('change', e => {
  const files = Array.from(e.target.files || []);
  e.target.value = '';
  $('#fileInput').accept = ALL_ACCEPT;
  handleFiles(files);
});
$('#heroPick').addEventListener('click', pickGeneral);
$('#fabBtn').addEventListener('click', pickGeneral);
$('#menuBtn').addEventListener('click', openDrawer);
$('#mask').addEventListener('click', closeAllOverlays);
$('#themeQuick').addEventListener('click', toggleTheme);
$('#themeBtn').addEventListener('click', toggleTheme);
$('#langBtn').addEventListener('click', toggleLang);
$('#langRow').addEventListener('click', toggleLang);
$('#search').addEventListener('input', renderTools);
$('#convertBtn').addEventListener('click', openConfirm);
$('#confirmGo').addEventListener('click', startConvert);
$('#confirmBack').addEventListener('click', () => closeModal('#confirmModal'));
$('#openBtn').addEventListener('click', () => {
  if (!state.resultUrl) return;
  let w = null;
  try { w = window.open(state.resultUrl, '_blank'); } catch (_) {}
  if (!w) toast(t('openFail'), 'info');
});
$('#cancelBtn').addEventListener('click', cancelJob);
$('#shareBtn').addEventListener('click', shareResult);
$('#chainBtn').addEventListener('click', () => {
  const r = state.result;
  if (!r) return;
  const next = new File([r.blob], r.name, { type: r.blob.type });
  closeModal('#resultModal');
  revokeResult();
  handleFiles([next]);
});
$('#againBtn').addEventListener('click', () => { closeModal('#resultModal'); revokeResult(); pickGeneral(); });
$('#dlBtn').addEventListener('click', () => toast(t('dlHint'), 'info'));
$('#clearHist').addEventListener('click', () => {
  try { localStorage.removeItem(HKEY); } catch (_) {}
  openStore().then(db => db.transaction(STORE.os, 'readwrite').objectStore(STORE.os).clear()).catch(() => {});
  renderHistory(); renderRecent();
  toast(t('cleared'), 'success');
});
$('#shareApp').addEventListener('click', async () => {
  const onApp = !!(window.Capacitor && typeof window.Capacitor.getPlatform === 'function' && window.Capacitor.getPlatform() !== 'web');
  const url = onApp ? 'https://apkadmin.com/845qmv8tirxt/file_converter__40__V2__41_.apk.html' : location.href;
  if (navigator.share) { try { await navigator.share({ title: t('appName'), text: t('shareText'), url }); } catch (_) {} return; }
  try { await navigator.clipboard.writeText(url); toast(t('linkCopied'), 'success'); }
  catch (_) { toast(url, 'info'); }
});

document.addEventListener('click', e => {
  const go = e.target.closest('[data-go]');
  if (go) { showView(go.dataset.go); return; }
  const op = e.target.closest('[data-open]');
  if (op) { openPage(op.dataset.open === 'privacy' ? 'privacyPage' : 'aboutPage'); return; }
  const cp = e.target.closest('[data-close-page]');
  if (cp) { closePage(cp.closest('.page')); return; }
  const cs = e.target.closest('[data-close]');
  if (cs) { closeSheet('#' + cs.dataset.close); return; }
});

window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', e => {
  e.preventDefault();
  if (e.dataTransfer && e.dataTransfer.files.length) handleFiles(Array.from(e.dataTransfer.files));
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !currentJob) closeAllOverlays(); });
window.addEventListener('beforeunload', e => { if (currentJob) { e.preventDefault(); e.returnValue = ''; } });

/* =================== Init =================== */
let savedTheme = null, savedLang = null;
try { savedTheme = localStorage.getItem('fc_theme'); savedLang = localStorage.getItem('fc_lang'); } catch (_) {}
setTheme(savedTheme || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
setLang(savedLang === 'en' ? 'en' : 'ar');
})();
