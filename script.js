console.log("CV بسرعة شغال ✅");

// ====== تمرير ناعم ======
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ====== تأثير الظهور عند التمرير ======
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature, .showcase-card, .step').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `all 0.7s ease ${index * 0.08}s`;
    observer.observe(el);
});

// ====== حركة الماوس مع الـ CV العائم ======
const floatingCV = document.querySelector('.floating-cv');
const hero = document.querySelector('.hero');

if (floatingCV && hero) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        floatingCV.style.transform = `
            rotateY(${-10 + x * 20}deg) 
            rotateX(${5 - y * 20}deg) 
            translateY(0)
        `;
    });
    
    hero.addEventListener('mouseleave', () => {
        floatingCV.style.transform = 'rotateY(-10deg) rotateX(5deg)';
    });
}

// ====== تغيير لون الهيدر عند التمرير ======
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.7)';
        header.style.boxShadow = 'none';
    }
});

// ====== تأثير الكتابة على العنوان ======
const heroTitle = document.querySelector('.hero h2');
if (heroTitle) {
    const originalHTML = heroTitle.innerHTML;
    heroTitle.style.opacity = '0';
    
    setTimeout(() => {
        heroTitle.style.transition = 'opacity 1s';
        heroTitle.style.opacity = '1';
    }, 300);
}

// ====== حركة الأوربات مع الماوس ======
const orbs = document.querySelectorAll('.orb');
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ====== زر الأدمن المخفي (5 ضغطات على اللوجو) ======
let logoClicks = 0;
let clickTimer = null;
const logo = document.getElementById('logo');

if (logo) {
    logo.addEventListener('click', () => {
        logoClicks++;
        
        // تأثير بصري عند الضغط
        logo.style.transform = 'scale(1.1)';
        setTimeout(() => { logo.style.transform = 'scale(1)'; }, 100);
        
        if (logoClicks === 5) {
            // وصل لـ 5 ضغطات
            activateAdmin();
            logoClicks = 0;
        }
        
        // إعادة العداد لو مفيش ضغط لمدة 2 ثانية
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            logoClicks = 0;
        }, 2000);
    });
}

function activateAdmin() {
    // تأثير بصري
    document.body.style.transition = 'background 0.5s';
    document.body.style.background = 'linear-gradient(135deg, #0f172a, #4c1d95)';
    
    setTimeout(() => {
        document.body.style.background = '';
    }, 1000);
    
    // تخزين في localStorage
    localStorage.setItem('adminMode', 'yes');
    
    // رسالة ترحيب
    showToast('✅ تم تفعيل وضع الأدمن — التحميل المجاني متاح', 'success');
    
    // لو إحنا في صفحة create، نضيف زرار التحميل المجاني
    if (window.location.pathname.includes('create')) {
        addAdminButton();
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 15px 30px;
        border-radius: 30px;
        font-family: 'Cairo', sans-serif;
        font-weight: 700;
        box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        z-index: 9999;
        transition: transform 0.4s;
        font-size: 15px;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ====== التحقق من وضع الأدمن ======
function isAdmin() {
    return localStorage.getItem('adminMode') === 'yes';
}

// إتاحة الدالة للاستخدام في صفحات تانية
window.isAdmin = isAdmin;
window.showToast = showToast;

console.log("🎨 Abdelrhman — CV بسرعة");
console.log("💡 نصيحة: دوس على اللوجو 5 مرات لتفعيل وضع الأدمن");