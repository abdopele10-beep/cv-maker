// ====== متغيرات عامة ======
let currentLang = 'ar';
let selectedTemplate = 'classic';
let photoData = null;
let skills = [];
let langs = [];

// ====== قاموس الترجمات ======
var translations = {
    ar: {
        summary: 'الملف الشخصي',
        experience: 'الخبرة العملية',
        education: 'التعليم',
        skills: 'المهارات',
        languages: 'اللغات',
        contact: 'معلومات التواصل',
        workExperience: 'الخبرة العملية',
        dir: 'rtl'
    },
    en: {
        summary: 'SUMMARY',
        experience: 'EXPERIENCE',
        education: 'EDUCATION',
        skills: 'SKILLS',
        languages: 'LANGUAGES',
        contact: 'CONTACT',
        workExperience: 'WORK EXPERIENCE',
        dir: 'ltr'
    },
    de: {
        summary: 'ZUSAMMENFASSUNG',
        experience: 'BERUFSERFAHRUNG',
        education: 'AUSBILDUNG',
        skills: 'FÄHIGKEITEN',
        languages: 'SPRACHEN',
        contact: 'KONTAKT',
        workExperience: 'BERUFSERFAHRUNG',
        dir: 'ltr'
    }
};

function t(key) {
    return translations[currentLang][key] || translations.ar[key];
}

function getDir() {
    return translations[currentLang].dir;
}

// ====== اقتراحات حسب المجال ======
var fieldSuggestions = {
    accounting: {
        summary: 'محاسب محترف خبرة في إعداد التقارير المالية، إدارة الحسابات، والمراجعة الداخلية. متمكن من البرامج المحاسبية الحديثة، وأسعى لتقديم قيمة حقيقية للشركة من خلال دقة الأرقام والالتزام بالمواعيد.',
        skills: ['Excel', 'QuickBooks', 'المراجعة المالية', 'إعداد التقارير', 'الضرائب', 'التحليل المالي', 'SAP'],
        langs: ['العربية - لغة أم', 'الإنجليزية - جيد جداً']
    },
    engineering: {
        summary: 'مهندس متخصص في التصميم والتنفيذ، خبرة في إدارة المشاريع الهندسية من البداية للنهاية. متمكن من البرامج الهندسية الحديثة، وأعمل على تقديم حلول عملية وفعالة.',
        skills: ['AutoCAD', 'SolidWorks', 'إدارة المشاريع', 'الرسم الهندسي', 'MATLAB', 'حل المشكلات'],
        langs: ['العربية - لغة أم', 'الإنجليزية - جيد جداً']
    },
    it: {
        summary: 'مطور برمجيات شغوف، خبرة في بناء تطبيقات الويب والموبايل. متمكن من تقنيات حديثة، وأسعى لتقديم حلول تقنية مبتكرة. أحب التعلم المستمر والعمل ضمن فريق.',
        skills: ['JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 'Git', 'SQL', 'حل المشكلات'],
        langs: ['العربية - لغة أم', 'الإنجليزية - جيد جداً']
    },
    teaching: {
        summary: 'معلم مخلص خبرة في تدريس المراحل التعليمية المختلفة. متمكن من استخدام استراتيجيات التعليم الحديثة، وأسعى لتطوير مهارات الطلاب وتنمية قدراتهم.',
        skills: ['التخطيط التربوي', 'إدارة الصف', 'التعلم النشط', 'Microsoft Office', 'التقييم', 'التواصل'],
        langs: ['العربية - لغة أم', 'الإنجليزية - جيد']
    },
    marketing: {
        summary: 'أخصائي تسويق رقمي خبرة في إدارة الحملات الإعلانية ومنصات التواصل. متمكن من تحليل السوق وبناء استراتيجيات تسويقية فعالة تزيد المبيعات وتحقق الأهداف.',
        skills: ['Digital Marketing', 'SEO', 'Google Ads', 'Facebook Ads', 'Content Writing', 'تحليل البيانات', 'CRM'],
        langs: ['العربية - لغة أم', 'الإنجليزية - جيد جداً']
    },
    design: {
        summary: 'مصمم جرافيك مبدع خبرة في تصميم الهويات البصرية والمواد الإعلانية. متمكن من برامج التصميم الحديثة، وأسعى لتقديم أعمال فنية مميزة تعكس رؤية العميل.',
        skills: ['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'UI/UX', 'الهوية البصرية', 'الإبداع'],
        langs: ['العربية - لغة أم', 'الإنجليزية - جيد']
    },
    medicine: {
        summary: 'أخصائي صحي خبرة في تقديم الرعاية الطبية للمرضى. متمكن من التشخيص والمتابعة، وأسعى لتقديم أفضل رعاية ممكنة وفق المعايير الطبية الحديثة.',
        skills: ['التشخيص', 'رعاية المرضى', 'السجلات الطبية', 'الإسعافات الأولية', 'التواصل', 'العمل تحت الضغط'],
        langs: ['العربية - لغة أم', 'الإنجليزية - جيد جداً']
    },
    management: {
        summary: 'مدير خبرة في إدارة الفرق وتطوير الأداء المؤسسي. متمكن من وضع الخطط الاستراتيجية وتحقيق الأهداف، وأسعى لبناء بيئة عمل محفزة ومنتجة.',
        skills: ['إدارة الفرق', 'التخطيط الاستراتيجي', 'الموارد البشرية', 'حل المشكلات', 'القيادة', 'التفاوض'],
        langs: ['العربية - لغة أم', 'الإنجليزية - جيد جداً']
    },
    hospitality: {
        summary: 'خبير ضيافة خبرة في تقديم خدمة عملاء متميزة. متمكن من إدارة المطاعم والفنادق، وأسعى لتقديم تجربة استثنائية للضيوف.',
        skills: ['خدمة العملاء', 'إدارة المطاعم', 'الضيافة', 'التواصل', 'اللغات', 'العمل الجماعي'],
        langs: ['العربية - لغة أم', 'الإنجليزية - جيد جداً']
    },
    other: {
        summary: 'محترف طموح أسعى لتقديم أفضل ما لدي في مجالي. متمكن من المهارات الأساسية، وأحب التعلم والتطوير المستمر.',
        skills: ['التواصل', 'العمل الجماعي', 'إدارة الوقت', 'حل المشكلات', 'Microsoft Office'],
        langs: ['العربية - لغة أم', 'الإنجليزية - جيد']
    }
};

// ====== اقتراحات التعليم ======
var degreesList = ['بكالوريوس', 'ليسانس', 'دبلوم', 'ماجستير', 'دكتوراه', 'ثانوية عامة'];
var majorsList = {
    it: ['علوم الحاسب', 'هندسة الحاسبات', 'تقنية المعلومات', 'نظم المعلومات'],
    engineering: ['هندسة مدنية', 'هندسة كهربائية', 'هندسة ميكانيكية', 'هندسة معمارية'],
    accounting: ['محاسبة', 'إدارة أعمال', 'مالية ومصرفية', 'تجارة'],
    medicine: ['طب بشري', 'طب أسنان', 'صيدلة', 'تمريض'],
    teaching: ['تربية', 'آداب', 'علوم', 'لغات وترجمة'],
    marketing: ['تسويق', 'إدارة أعمال', 'إعلام', 'تجارة'],
    design: ['فنون تطبيقية', 'فنون جميلة', 'تصميم جرافيك', 'إعلام'],
    management: ['إدارة أعمال', 'محاسبة', 'موارد بشرية', 'تجارة'],
    hospitality: ['فندقة وسياحة', 'إدارة فنادق', 'سياحة'],
    other: ['أخرى']
};
var schoolsList = ['جامعة القاهرة', 'جامعة عين شمس', 'جامعة الإسكندرية', 'جامعة المنصورة', 'جامعة أسيوط', 'الجامعة الأمريكية', 'جامعة الأزهر', 'جامعة حلوان', 'أخرى'];

// ====== هل المستخدم دفع؟ ======
function isPaid() {
    return localStorage.getItem('paid') === 'yes';
}

// ====== هل هو أدمن؟ ======
function isAdmin() {
    return localStorage.getItem('adminMode') === 'yes';
}

// ====== إظهار النبذة للأدمن ======
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (isAdmin() || isPaid()) {
            var ss = document.getElementById('summarySection');
            var sl = document.getElementById('summaryLocked');
            if (ss) ss.style.display = 'block';
            if (sl) sl.style.display = 'none';
        }
    }, 100);
});

// ====== قراءة القالب والمجال من الرابط ======
window.addEventListener('DOMContentLoaded', function() {
    var params = new URLSearchParams(window.location.search);
    
    // القالب
    var templateFromUrl = params.get('template');
    if (templateFromUrl) {
        var opt = document.querySelector('.template-option[data-template="' + templateFromUrl + '"]');
        if (opt) {
            var allOpts = document.querySelectorAll('.template-option');
            for (var i = 0; i < allOpts.length; i++) allOpts[i].classList.remove('active');
            opt.classList.add('active');
            selectedTemplate = templateFromUrl;
        }
    }
    
    // المجال (من صفحة اختيار المجال)
    var fieldFromUrl = params.get('field');
    if (fieldFromUrl) {
        var fieldSelect = document.getElementById('fieldSelect');
        if (fieldSelect) {
            fieldSelect.value = fieldFromUrl;
            // نادي على حدث التغيير عشان الاقتراحات تظهر
            var event = new Event('change');
            fieldSelect.dispatchEvent(event);
        }
    }
    
    // الأدمن
    if (isAdmin()) {
        var note = document.getElementById('downloadNote');
        if (note) note.textContent = '✅ وضع الأدمن — تحميل مجاني';
    }
});

// ====== اختيار اللغة ======
var langBtns = document.querySelectorAll('.lang-btn');
for (var i = 0; i < langBtns.length; i++) {
    langBtns[i].addEventListener('click', function() {
        var all = document.querySelectorAll('.lang-btn');
        for (var j = 0; j < all.length; j++) all[j].classList.remove('active');
        this.classList.add('active');
        currentLang = this.getAttribute('data-lang');
    });
}

// ====== اختيار القالب ======
var templateOpts = document.querySelectorAll('.template-option');
for (var i = 0; i < templateOpts.length; i++) {
    templateOpts[i].addEventListener('click', function() {
        var all = document.querySelectorAll('.template-option');
        for (var j = 0; j < all.length; j++) all[j].classList.remove('active');
        this.classList.add('active');
        selectedTemplate = this.getAttribute('data-template');
    });
}

// ====== اختيار المجال ======
document.getElementById('fieldSelect').addEventListener('change', function() {
    var field = this.value;
    var summarySugg = document.getElementById('summarySuggestions');
    
    if (!field || !fieldSuggestions[field]) {
        if (summarySugg) summarySugg.innerHTML = '';
        return;
    }
    
    var sugg = fieldSuggestions[field];
    
    var skillsSugg = document.getElementById('skillsSuggestions');
    var skillsHTML = '';
    sugg.skills.forEach(function(s) {
        skillsHTML += '<button type="button" class="sugg-btn sugg-skill" data-skill="' + s + '">' + s + '</button>';
    });
    skillsSugg.innerHTML = skillsHTML;
    
    var langsSugg = document.getElementById('langsSuggestions');
    var langsHTML = '';
    sugg.langs.forEach(function(l) {
        langsHTML += '<button type="button" class="sugg-btn sugg-lang" data-lang="' + l + '">' + l + '</button>';
    });
    langsSugg.innerHTML = langsHTML;
    
    if (summarySugg && (isAdmin() || isPaid())) {
        summarySugg.innerHTML = '<button type="button" class="sugg-btn sugg-summary" data-summary="' + sugg.summary.replace(/"/g, '&quot;') + '">📝 استخدم النبذة المقترحة</button>';
    }
    
    attachSuggestionsEvents();
});

function attachSuggestionsEvents() {
    document.querySelectorAll('.sugg-summary').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.getElementById('summary').value = this.getAttribute('data-summary');
            this.classList.add('added');
            this.textContent = '✅ تم استخدام النبذة';
        });
    });
    
    document.querySelectorAll('.sugg-skill').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var val = this.getAttribute('data-skill');
            if (val && skills.indexOf(val) === -1) {
                skills.push(val);
                renderSkills();
                this.classList.add('added');
            }
        });
    });
    
    document.querySelectorAll('.sugg-lang').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var val = this.getAttribute('data-lang');
            if (val && langs.indexOf(val) === -1) {
                langs.push(val);
                renderLangs();
                this.classList.add('added');
            }
        });
    });
}

// ====== رفع الصورة ======
var photoInput = document.getElementById('photoInput');
photoInput.addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
        photoData = ev.target.result;
        document.getElementById('photoPreview').innerHTML = '<img src="' + photoData + '" alt="صورة">';
        document.getElementById('photoText').textContent = '✅ تم اختيار الصورة';
    };
    reader.readAsDataURL(file);
});

// ====== إضافة خبرة ======
document.getElementById('addExpBtn').addEventListener('click', function() {
    var div = document.createElement('div');
    div.className = 'experience-item';
    div.innerHTML = '<button type="button" class="btn-remove" onclick="this.parentElement.remove()">×</button>' +
        '<div class="form-row">' +
            '<div class="form-group"><label>المسمى الوظيفي</label><input type="text" class="exp-job" placeholder="مطور ويب"></div>' +
            '<div class="form-group"><label>اسم الشركة</label><input type="text" class="exp-company" placeholder="شركة جوجل"></div>' +
        '</div>' +
        '<div class="form-row">' +
            '<div class="form-group"><label>من تاريخ</label><input type="month" class="exp-from"></div>' +
            '<div class="form-group"><label>إلى تاريخ</label><input type="month" class="exp-to"></div>' +
        '</div>' +
        '<div class="form-group"><label>الوصف</label><textarea class="exp-desc" rows="3"></textarea></div>';
    document.getElementById('experienceContainer').appendChild(div);
});

// ====== إضافة تعليم ======
document.getElementById('addEduBtn').addEventListener('click', function() {
    var div = document.createElement('div');
    div.className = 'education-item';
    
    var field = document.getElementById('fieldSelect') ? document.getElementById('fieldSelect').value : '';
    var majors = majorsList[field] || majorsList.other;
    
    var degreeOptions = '<option value="">اختار الدرجة</option>';
    degreesList.forEach(function(d) {
        degreeOptions += '<option value="' + d + '">' + d + '</option>';
    });
    
    var majorOptions = '<option value="">اختار التخصص</option>';
    majors.forEach(function(m) {
        majorOptions += '<option value="' + m + '">' + m + '</option>';
    });
    
    var schoolOptions = '<option value="">اختار الجامعة</option>';
    schoolsList.forEach(function(s) {
        schoolOptions += '<option value="' + s + '">' + s + '</option>';
    });
    
    div.innerHTML = '<button type="button" class="btn-remove" onclick="this.parentElement.remove()">×</button>' +
        '<div class="form-row">' +
            '<div class="form-group"><label>الدرجة العلمية</label><select class="edu-degree">' + degreeOptions + '</select></div>' +
            '<div class="form-group"><label>التخصص</label><select class="edu-major">' + majorOptions + '</select></div>' +
        '</div>' +
        '<div class="form-row">' +
            '<div class="form-group"><label>الجامعة</label><select class="edu-school">' + schoolOptions + '</select></div>' +
            '<div class="form-group"><label>سنة التخرج</label><input type="text" class="edu-year" placeholder="2024"></div>' +
        '</div>';
    document.getElementById('educationContainer').appendChild(div);
});

// ====== المهارات ======
var skillInput = document.getElementById('skillInput');
var skillsList = document.getElementById('skillsList');

skillInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        var val = skillInput.value.trim();
        if (val && skills.indexOf(val) === -1) {
            skills.push(val);
            skillInput.value = '';
            renderSkills();
        }
    }
});

function renderSkills() {
    skillsList.innerHTML = '';
    skills.forEach(function(skill, index) {
        var tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.innerHTML = skill + ' <button type="button" onclick="removeSkill(' + index + ')">×</button>';
        skillsList.appendChild(tag);
    });
}

function removeSkill(index) {
    skills.splice(index, 1);
    renderSkills();
}
window.removeSkill = removeSkill;

// ====== اللغات ======
var langInput = document.getElementById('langInput');
var langsList = document.getElementById('langsList');

langInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        var val = langInput.value.trim();
        if (val && langs.indexOf(val) === -1) {
            langs.push(val);
            langInput.value = '';
            renderLangs();
        }
    }
});

function renderLangs() {
    langsList.innerHTML = '';
    langs.forEach(function(lang, index) {
        var tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.innerHTML = lang + ' <button type="button" onclick="removeLang(' + index + ')">×</button>';
        langsList.appendChild(tag);
    });
}

function removeLang(index) {
    langs.splice(index, 1);
    renderLangs();
}
window.removeLang = removeLang;
// ====== جمع البيانات ======
function collectData() {
    var experiences = [];
    var expItems = document.querySelectorAll('.experience-item');
    for (var i = 0; i < expItems.length; i++) {
        var item = expItems[i];
        var job = item.querySelector('.exp-job') ? item.querySelector('.exp-job').value : '';
        var company = item.querySelector('.exp-company') ? item.querySelector('.exp-company').value : '';
        var from = item.querySelector('.exp-from') ? item.querySelector('.exp-from').value : '';
        var to = item.querySelector('.exp-to') ? item.querySelector('.exp-to').value : '';
        var desc = item.querySelector('.exp-desc') ? item.querySelector('.exp-desc').value : '';
        if (job || company) {
            experiences.push({ job: job, company: company, from: from, to: to, desc: desc });
        }
    }

    var educations = [];
    var eduItems = document.querySelectorAll('.education-item');
    for (var i = 0; i < eduItems.length; i++) {
        var item = eduItems[i];
        var degree = item.querySelector('.edu-degree') ? item.querySelector('.edu-degree').value : '';
        var major = item.querySelector('.edu-major') ? item.querySelector('.edu-major').value : '';
        var school = item.querySelector('.edu-school') ? item.querySelector('.edu-school').value : '';
        var year = item.querySelector('.edu-year') ? item.querySelector('.edu-year').value : '';
        if (degree || school) {
            educations.push({ degree: degree, major: major, school: school, year: year });
        }
    }

    return {
        fullName: document.getElementById('fullName').value.trim(),
        jobTitle: document.getElementById('jobTitle').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        city: document.getElementById('citySelect') ? document.getElementById('citySelect').value : '',
        website: document.getElementById('website').value.trim(),
        summary: document.getElementById('summary') ? document.getElementById('summary').value.trim() : '',
        experiences: experiences,
        educations: educations,
        skills: skills,
        langs: langs,
        lang: currentLang,
        template: selectedTemplate,
        photo: photoData
    };
}

// ====== العلامة المائية ======
function getWatermark() {
    if (isAdmin() || isPaid()) return '';
    return '<div class="cv-watermark">' +
        '<div class="watermark-content">' +
            '<div class="wm-logo">📄</div>' +
            '<div class="wm-name">Abdelrhman</div>' +
            '<div class="wm-site">CV بسرعة</div>' +
        '</div>' +
    '</div>';
}

// ====== القالب الكلاسيكي (زي الصورة) ======
function generateClassicCV(d, wm) {
    var html = '<div class="cv-final template-classic" dir="' + getDir() + '">' + wm;
    
    html += '<header class="cv-classic-header">';
    html += '<h1>' + d.fullName + '</h1>';
    if (d.jobTitle) html += '<p class="cv-classic-job">' + d.jobTitle + '</p>';
    html += '<div class="cv-classic-contact">';
    if (d.city) html += '<span>' + d.city + '</span>';
    if (d.email) html += '<span>' + d.email + '</span>';
    if (d.phone) html += '<span>' + d.phone + '</span>';
    html += '</div></header>';
    
    if (d.summary) {
        html += '<section class="cv-classic-section">';
        html += '<p class="cv-classic-summary">' + d.summary + '</p>';
        html += '</section>';
    }
    
    if (d.experiences.length) {
        html += '<section class="cv-classic-section">';
        html += '<h2 class="cv-classic-title">' + t('experience') + '</h2>';
        d.experiences.forEach(function(exp) {
            html += '<div class="cv-classic-exp-item">';
            html += '<div class="cv-classic-exp-date">' + (exp.from || '') + (exp.to ? ' - ' + exp.to : '') + '</div>';
            html += '<div class="cv-classic-exp-info">';
            if (exp.job) html += '<h3>' + exp.job + '</h3>';
            if (exp.company) html += '<p class="cv-classic-exp-company">' + exp.company + '</p>';
            if (exp.desc) {
                html += '<ul class="cv-classic-desc-list">';
                exp.desc.split('\n').forEach(function(line) {
                    if (line.trim()) html += '<li>' + line.trim() + '</li>';
                });
                html += '</ul>';
            }
            html += '</div></div>';
        });
        html += '</section>';
    }
    
    if (d.educations.length) {
        html += '<section class="cv-classic-section">';
        html += '<h2 class="cv-classic-title">' + t('education') + '</h2>';
        d.educations.forEach(function(edu) {
            html += '<div class="cv-classic-edu-item">';
            html += '<div class="cv-classic-edu-date">' + (edu.year || '') + '</div>';
            html += '<div class="cv-classic-edu-info">';
            html += '<h3>' + (edu.school || '') + '</h3>';
            html += '<p>' + (edu.degree || '') + (edu.major ? ' - ' + edu.major : '') + '</p>';
            html += '</div></div>';
        });
        html += '</section>';
    }
    
    if (d.skills.length) {
        html += '<section class="cv-classic-section">';
        html += '<h2 class="cv-classic-title">' + t('skills') + '</h2>';
        html += '<ul class="cv-classic-skills-list">';
        d.skills.forEach(function(s) { html += '<li>' + s + '</li>'; });
        html += '</ul></section>';
    }
    
    if (d.langs.length) {
        html += '<section class="cv-classic-section">';
        html += '<h2 class="cv-classic-title">' + t('languages') + '</h2>';
        html += '<ul class="cv-classic-skills-list">';
        d.langs.forEach(function(l) { html += '<li>' + l + '</li>'; });
        html += '</ul></section>';
    }
    
    html += '</div>';
    return html;
}

// ====== قالب السايدبار ======
function generateSidebarCV(d, wm) {
    var html = '<div class="cv-final template-sidebar" dir="' + getDir() + '">' + wm;
    html += '<div class="cv-sidebar-layout">';
    html += '<aside class="cv-sidebar">';
    if (d.photo) {
        html += '<img src="' + d.photo + '" class="cv-sidebar-photo" alt="صورة">';
    } else {
        html += '<div class="cv-sidebar-photo-placeholder">' + (d.fullName ? d.fullName.charAt(0) : '?') + '</div>';
    }
    html += '<h2 class="cv-sidebar-name">' + d.fullName + '</h2>';
    if (d.jobTitle) html += '<p class="cv-sidebar-job">' + d.jobTitle + '</p>';
    
    html += '<div class="cv-sidebar-section"><h3>' + t('contact') + '</h3>';
    if (d.phone) html += '<p>📞 ' + d.phone + '</p>';
    if (d.email) html += '<p>📧 ' + d.email + '</p>';
    if (d.city) html += '<p>📍 ' + d.city + '</p>';
    if (d.website) html += '<p>🌐 ' + d.website + '</p>';
    html += '</div>';
    
    if (d.langs.length) {
        html += '<div class="cv-sidebar-section"><h3>' + t('languages') + '</h3>';
        d.langs.forEach(function(l) { html += '<p>• ' + l + '</p>'; });
        html += '</div>';
    }
    
    if (d.skills.length) {
        html += '<div class="cv-sidebar-section"><h3>' + t('skills') + '</h3>';
        d.skills.forEach(function(s) { html += '<p>• ' + s + '</p>'; });
        html += '</div>';
    }
    html += '</aside>';
    
    html += '<main class="cv-main-content">';
    if (d.summary) html += '<section class="cv-main-section"><h3>' + t('summary') + '</h3><p>' + d.summary + '</p></section>';
    
    if (d.experiences.length) {
        html += '<section class="cv-main-section"><h3>' + t('experience') + '</h3>';
        d.experiences.forEach(function(exp) {
            html += '<div class="cv-main-item">';
            html += '<h4>' + (exp.job || '') + '</h4>';
            html += '<p class="cv-main-company">' + (exp.company || '') + (exp.from ? ' | ' + exp.from : '') + (exp.to ? ' - ' + exp.to : '') + '</p>';
            if (exp.desc) html += '<p>' + exp.desc + '</p>';
            html += '</div>';
        });
        html += '</section>';
    }
    
    if (d.educations.length) {
        html += '<section class="cv-main-section"><h3>' + t('education') + '</h3>';
        d.educations.forEach(function(edu) {
            html += '<div class="cv-main-item">';
            html += '<h4>' + (edu.degree || '') + (edu.major ? ' - ' + edu.major : '') + '</h4>';
            html += '<p class="cv-main-company">' + (edu.school || '') + (edu.year ? ' | ' + edu.year : '') + '</p>';
            html += '</div>';
        });
        html += '</section>';
    }
    html += '</main></div></div>';
    return html;
}

// ====== قالب الاحترافي ======
function generateProfessionalCV(d, wm) {
    var html = '<div class="cv-final template-professional" dir="' + getDir() + '">' + wm;
    html += '<div class="cv-prof-header">';
    html += '<h1>' + d.fullName + '</h1>';
    if (d.jobTitle) html += '<p class="cv-prof-job">' + d.jobTitle + '</p>';
    html += '</div>';
    
    if (d.photo || d.summary) {
        html += '<div class="cv-prof-top">';
        if (d.photo) html += '<img src="' + d.photo + '" class="cv-prof-photo" alt="صورة">';
        if (d.summary) {
            html += '<div class="cv-prof-summary"><h3>' + t('summary') + '</h3><p>' + d.summary + '</p></div>';
        }
        html += '</div>';
    }
    
    html += '<div class="cv-prof-body">';
    html += '<aside class="cv-prof-side">';
    html += '<div class="cv-prof-side-section"><h3>' + t('contact') + '</h3>';
    if (d.phone) html += '<p>📞 ' + d.phone + '</p>';
    if (d.email) html += '<p>📧 ' + d.email + '</p>';
    if (d.city) html += '<p>📍 ' + d.city + '</p>';
    if (d.website) html += '<p>🌐 ' + d.website + '</p>';
    html += '</div>';
    
    if (d.educations.length) {
        html += '<div class="cv-prof-side-section"><h3>' + t('education') + '</h3>';
        d.educations.forEach(function(edu) {
            html += '<p><strong>' + (edu.school || '') + '</strong><br>' + (edu.degree || '') + (edu.major ? ' - ' + edu.major : '') + '<br>' + (edu.year || '') + '</p>';
        });
        html += '</div>';
    }
    
    if (d.skills.length) {
        html += '<div class="cv-prof-side-section"><h3>' + t('skills') + '</h3>';
        d.skills.forEach(function(s) { html += '<p>• ' + s + '</p>'; });
        html += '</div>';
    }
    
    if (d.langs.length) {
        html += '<div class="cv-prof-side-section"><h3>' + t('languages') + '</h3>';
        d.langs.forEach(function(l) { html += '<p>• ' + l + '</p>'; });
        html += '</div>';
    }
    html += '</aside>';
    
    html += '<main class="cv-prof-main">';
    if (d.experiences.length) {
        html += '<section class="cv-prof-main-section"><h3>' + t('workExperience') + '</h3>';
        d.experiences.forEach(function(exp) {
            html += '<div class="cv-prof-item">';
            if (exp.from) html += '<span class="cv-prof-date">' + exp.from + (exp.to ? ' - ' + exp.to : '') + '</span>';
            html += '<h4>' + (exp.job || '') + '</h4>';
            if (exp.company) html += '<p class="cv-prof-company">' + exp.company + '</p>';
            if (exp.desc) html += '<p>' + exp.desc + '</p>';
            html += '</div>';
        });
        html += '</section>';
    }
    html += '</main></div></div>';
    return html;
}

// ====== توليد CV ======
function generateCVHTML(d) {
    var wm = getWatermark();
    if (d.template === 'sidebar') return generateSidebarCV(d, wm);
    if (d.template === 'professional') return generateProfessionalCV(d, wm);
    return generateClassicCV(d, wm);
}

// ====== معاينة ======
document.getElementById('previewBtn').addEventListener('click', function() {
    var data = collectData();
    if (!data.fullName || !data.email || !data.phone) {
        alert('⚠️ من فضلك املأ: الاسم، البريد الإلكتروني، ورقم الهاتف');
        return;
    }
    document.getElementById('cvPreview').innerHTML = generateCVHTML(data);
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('previewSection').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    var note = document.getElementById('downloadNote');
    if (isAdmin()) {
        note.textContent = '✅ وضع الأدمن — تحميل مجاني';
    } else if (localStorage.getItem('firstCV') !== 'done') {
        note.textContent = '🎁 أول تحميل مجاني — مع علامة مائية';
    } else if (!isPaid()) {
        note.textContent = '💰 التحميل بـ 15 جنيه';
    } else {
        note.textContent = '✅ تحميل بدون علامة مائية';
    }
});

// ====== رجوع ======
document.getElementById('backBtn').addEventListener('click', function() {
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('previewSection').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ====== تحميل ======
document.getElementById('downloadBtn').addEventListener('click', function() {
    if (isAdmin()) {
        printCV();
        return;
    }
    var isFirst = localStorage.getItem('firstCV') !== 'done';
    if (isFirst) {
        var confirmed = window.confirm('🎉 مبروك! أول CV مجاني!\n\nهيظهر عليه علامة مائية.\n\nاضغط OK للتحميل');
        if (confirmed) {
            localStorage.setItem('firstCV', 'done');
            printCV();
        }
    } else if (!isPaid()) {
        alert('💳 هنتحول لصفحة الدفع على InstaPay\n\n15 جنيه لتحميل CV بدون علامة مائية');
    } else {
        printCV();
    }
});
// ====== طباعة CV ======
function printCV() {
    var cvContent = document.getElementById('cvPreview').innerHTML;
    var printWindow = window.open('', '_blank', 'width=900,height=1000');
    
    var styles = '* { margin: 0; padding: 0; box-sizing: border-box; }' +
        'body { font-family: "Cairo", sans-serif; background: white; color: #1e293b; }' +
        '.cv-final { font-family: "Cairo", sans-serif; color: #1e293b; line-height: 1.7; max-width: 210mm; margin: 0 auto; position: relative; background: white; }' +
        '.cv-watermark { position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; overflow: hidden; z-index: 1; }' +
        '.watermark-content { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); text-align: center; opacity: 0.08; }' +
        '.wm-logo { font-size: 90px; margin-bottom: 10px; }' +
        '.wm-name { font-size: 55px; font-weight: 900; color: #6366f1; letter-spacing: 4px; }' +
        '.wm-site { font-size: 30px; font-weight: 700; color: #ec4899; }' +
        '.cv-watermark::before, .cv-watermark::after { content: "Abdelrhman"; position: absolute; font-size: 20px; font-weight: 700; color: #6366f1; opacity: 0.18; letter-spacing: 2px; }' +
        '.cv-watermark::before { top: 20px; right: 20px; transform: rotate(15deg); }' +
        '.cv-watermark::after { bottom: 20px; left: 20px; transform: rotate(-15deg); }' +
        
        /* الكلاسيكي */
        '.template-classic { padding: 45px 50px; background: white; }' +
        '.cv-classic-header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #1e293b; margin-bottom: 25px; }' +
        '.cv-classic-header h1 { font-size: 26px; font-weight: 700; color: #1e293b; margin: 0 0 5px; }' +
        '.cv-classic-job { font-size: 14px; color: #475569; font-weight: 500; margin: 0 0 12px; }' +
        '.cv-classic-contact { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: #1e293b; }' +
        '.cv-classic-section { margin-bottom: 25px; }' +
        '.cv-classic-title { font-size: 18px; font-weight: 700; color: #1e293b; margin: 0 0 15px; padding-bottom: 5px; border-bottom: 1.5px solid #1e293b; }' +
        '.cv-classic-summary { font-size: 13.5px; color: #334155; line-height: 1.7; margin: 0; }' +
        '.cv-classic-exp-item, .cv-classic-edu-item { display: flex; gap: 20px; margin-bottom: 18px; }' +
        '.cv-classic-exp-date, .cv-classic-edu-date { width: 120px; font-size: 13px; font-weight: 600; color: #1e293b; }' +
        '.cv-classic-exp-info, .cv-classic-edu-info { flex: 1; }' +
        '.cv-classic-exp-info h3, .cv-classic-edu-info h3 { font-size: 14px; font-weight: 700; color: #1e293b; margin: 0 0 3px; }' +
        '.cv-classic-exp-company { font-size: 13px; color: #475569; margin: 0 0 8px; font-style: italic; }' +
        '.cv-classic-edu-info p { font-size: 13px; color: #475569; margin: 0; }' +
        '.cv-classic-desc-list { list-style: none; padding: 0; margin: 0; }' +
        '.cv-classic-desc-list li { font-size: 13px; color: #334155; line-height: 1.6; padding-right: 15px; position: relative; margin-bottom: 4px; }' +
        '.cv-classic-desc-list li::before { content: "–"; position: absolute; right: 0; }' +
        '.cv-classic-skills-list { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px 30px; }' +
        '.cv-classic-skills-list li { font-size: 13px; color: #334155; padding-right: 15px; position: relative; }' +
        '.cv-classic-skills-list li::before { content: "–"; position: absolute; right: 0; }' +
        
        /* السايدبار */
        '.template-sidebar { padding: 0; }' +
        '.cv-sidebar-layout { display: grid; grid-template-columns: 260px 1fr; min-height: 297mm; }' +
        '.cv-sidebar { background: #1e3a5f; color: white; padding: 25px 18px; text-align: center; }' +
        '.cv-sidebar-photo { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 4px solid #3b82f6; margin: 0 auto 12px; display: block; }' +
        '.cv-sidebar-photo-placeholder { width: 110px; height: 110px; border-radius: 50%; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; font-size: 45px; font-weight: 900; margin: 0 auto 12px; border: 4px solid white; }' +
        '.cv-sidebar-name { font-size: 18px; font-weight: 900; margin-bottom: 4px; }' +
        '.cv-sidebar-job { font-size: 12px; color: #93c5fd; margin-bottom: 20px; }' +
        '.cv-sidebar-section { text-align: right; margin-bottom: 20px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.15); }' +
        '.cv-sidebar-section h3 { font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #60a5fa; margin-bottom: 10px; text-align: center; }' +
        '.cv-sidebar-section p { font-size: 12px; margin-bottom: 5px; color: #e0e7ff; word-break: break-word; }' +
        '.cv-main-content { padding: 35px 25px; background: white; }' +
        '.cv-main-section { margin-bottom: 25px; }' +
        '.cv-main-section h3 { font-size: 13px; font-weight: 700; letter-spacing: 2px; color: #1e3a5f; padding-bottom: 6px; border-bottom: 2px solid #3b82f6; margin-bottom: 12px; }' +
        '.cv-main-item { margin-bottom: 12px; }' +
        '.cv-main-item h4 { font-size: 14px; font-weight: 700; color: #1e3a5f; margin-bottom: 2px; }' +
        '.cv-main-company { font-size: 12px; color: #3b82f6; font-weight: 600; margin-bottom: 4px; }' +
        '.cv-main-item p { font-size: 12px; color: #475569; line-height: 1.6; }' +
        
        /* الاحترافي */
        '.template-professional { padding: 25px; }' +
        '.cv-prof-header { text-align: right; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 2px solid #e2e8f0; }' +
        '.cv-prof-header h1 { font-size: 32px; font-weight: 900; margin-bottom: 5px; }' +
        '.cv-prof-job { font-size: 13px; color: #64748b; letter-spacing: 2px; font-weight: 600; }' +
        '.cv-prof-top { background: #bfdbfe; border-radius: 15px; padding: 22px; display: flex; align-items: center; gap: 22px; margin-bottom: 25px; }' +
        '.cv-prof-photo { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 4px solid white; flex-shrink: 0; }' +
        '.cv-prof-summary { flex: 1; text-align: right; }' +
        '.cv-prof-summary h3 { font-size: 13px; font-weight: 700; letter-spacing: 2px; color: #1e3a5f; margin-bottom: 8px; }' +
        '.cv-prof-summary p { font-size: 12px; color: #334155; line-height: 1.7; }' +
        '.cv-prof-body { display: grid; grid-template-columns: 220px 1fr; gap: 25px; }' +
        '.cv-prof-side-section { margin-bottom: 22px; text-align: right; }' +
        '.cv-prof-side-section h3 { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #1e3a5f; padding-bottom: 5px; border-bottom: 2px solid #bfdbfe; margin-bottom: 10px; }' +
        '.cv-prof-side-section p { font-size: 12px; color: #475569; margin-bottom: 6px; }' +
        '.cv-prof-side-section strong { color: #1e3a5f; font-weight: 700; }' +
        '.cv-prof-main-section h3 { font-size: 13px; font-weight: 700; letter-spacing: 2px; color: #1e3a5f; padding-bottom: 5px; border-bottom: 2px solid #bfdbfe; margin-bottom: 12px; }' +
        '.cv-prof-item { margin-bottom: 18px; padding-right: 12px; border-right: 3px solid #3b82f6; text-align: right; }' +
        '.cv-prof-date { font-size: 11px; color: #64748b; font-weight: 600; }' +
        '.cv-prof-item h4 { font-size: 14px; font-weight: 700; color: #1e3a5f; margin: 4px 0; }' +
        '.cv-prof-company { font-size: 12px; color: #3b82f6; font-weight: 600; margin-bottom: 5px; }' +
        '.cv-prof-item p { font-size: 12px; color: #475569; line-height: 1.6; }' +
        '[dir="ltr"] .cv-sidebar-section, [dir="ltr"] .cv-prof-side-section { text-align: left; }' +
        '[dir="ltr"] .cv-prof-header, [dir="ltr"] .cv-prof-summary, [dir="ltr"] .cv-prof-item { text-align: left; }' +
        '[dir="ltr"] .cv-prof-item { padding-right: 0; padding-left: 12px; border-right: none; border-left: 3px solid #3b82f6; }' +
        '@page { size: A4; margin: 0; }' +
        '@media print { body { padding: 0; } }';
    
    var html = '<!DOCTYPE html><html lang="ar" dir="' + getDir() + '"><head><meta charset="UTF-8"><title>CV</title>' +
        '<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">' +
        '<style>' + styles + '</style></head><body>' + cvContent +
        '<script>window.onload=function(){setTimeout(function(){window.print();},800);};<\/script>' +
        '</body></html>';
    
    printWindow.document.write(html);
    printWindow.document.close();
}

console.log("✅ create.js شغال — Abdelrhman");