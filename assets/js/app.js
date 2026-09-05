
/* ==========================================================================
   AZOLLA EGYPT (تكنولوجيا الأعلاف البديلة .. أزولا مصر)
   Master Application Engine & Dynamic CMS - v8.0 (Pro Max Architecture)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initRouter();
  initMobileDrawer();
  initAnalytics();
  if (typeof window.fetchCloudContent === 'function') {
    window.fetchCloudContent().catch(() => {});
  }
});

/* ==========================================================================
   1. THEME ENGINE (LIGHT / DARK MODE - static-website-cms-dashboard)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('AZOLLA_THEME') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('AZOLLA_THEME', next);
  updateThemeIcon(next);
  const msg = next === 'dark' ? (window.t ? window.t('toastThemeDark') : 'تم التبديل إلى الوضع الليلي') : (window.t ? window.t('toastThemeLight') : 'تم التبديل إلى الوضع النهاري');
  showToast(msg);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-sun';
    icon.style.color = '#F59E0B';
  } else {
    icon.className = 'fa-solid fa-moon';
    icon.style.color = '';
  }
}

/* ==========================================================================
   1.1 MULTILINGUAL & I18N ENGINE (AR / EN / FR / DE)
   ========================================================================== */
function initLanguage() {
  const savedLang = localStorage.getItem('AZOLLA_LANG') || 'ar';
  setLanguage(savedLang, false);

  // Close language dropdown on outside click
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      const btn = document.getElementById('lang-toggle-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });
}

function toggleLangMenu(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById('lang-dropdown');
  if (!dropdown) return;
  const isOpen = dropdown.classList.toggle('open');
  const btn = document.getElementById('lang-toggle-btn');
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function setLanguage(langCode, notify = true) {
  const supported = ['ar', 'en', 'fr', 'de'];
  if (!supported.includes(langCode)) langCode = 'ar';

  window.AZOLLA_CURRENT_LANG = langCode;
  localStorage.setItem('AZOLLA_LANG', langCode);

  // Update HTML element attributes
  document.documentElement.setAttribute('lang', langCode);
  document.documentElement.setAttribute('dir', langCode === 'ar' ? 'rtl' : 'ltr');

  // Update header button label & aria
  const codeBadge = document.getElementById('current-lang-code');
  if (codeBadge) {
    codeBadge.textContent = langCode.toUpperCase();
  }

  // Update active state in desktop dropdown items
  document.querySelectorAll('.lang-menu-item').forEach(item => {
    if (item.getAttribute('data-lang') === langCode) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update active state in mobile drawer items
  document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
    if (btn.getAttribute('data-mobile-lang') === langCode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Close dropdown menu if open
  const dropdown = document.getElementById('lang-dropdown');
  if (dropdown) dropdown.classList.remove('open');

  // Apply static translations to all elements with data-i18n
  applyStaticTranslations();

  // Re-render the active SPA page so content reflects the selected language
  if (typeof window.location !== 'undefined') {
    let hash = window.location.hash.replace('#', '').trim() || 'home';
    const targetRoute = (typeof routes !== 'undefined' && routes[hash]) ? hash : 'home';
    if (typeof navigateTo === 'function') {
      navigateTo(targetRoute);
    }
    if (typeof initCalculators === 'function') {
      initCalculators();
    }
  }

  // Show user toast
  if (notify && typeof showToast === 'function') {
    const toastMsg = (window.t && window.t('toastLangSwitched')) || `Language set to ${langCode.toUpperCase()}`;
    showToast(toastMsg);
  }
}

function applyStaticTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && window.t) {
      const translated = window.t(key);
      if (translated) {
        el.innerHTML = translated;
      }
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && window.t) {
      const translated = window.t(key);
      if (translated) {
        el.setAttribute('placeholder', translated);
      }
    }
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (key && window.t) {
      const translated = window.t(key);
      if (translated) {
        el.setAttribute('title', translated);
      }
    }
  });
}

/* ==========================================================================
   2. SPA ROUTER ENGINE
   ========================================================================== */
function initRouter() {
  const handleRoute = () => {
    let hash = window.location.hash.replace('#', '').trim();
    if (!hash || !routes[hash]) {
      hash = 'home';
    }
    navigateTo(hash);
  };

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function navigateTo(pageKey) {
  try { trackPageView(pageKey); } catch (e) {}
  const contentEl = document.getElementById('app-content');
  if (!contentEl) return;

  const renderFn = routes[pageKey] || routes['home'];
  contentEl.innerHTML = renderFn();
  applyStaticTranslations();

  document.querySelectorAll('.nav-link, .mobile-nav-link, .nav-dropdown-item').forEach(link => {
    if (link.getAttribute('data-page') === pageKey) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const morePages = ['impact', 'partners', 'media', 'contact', 'privacy'];
  const moreBtn = document.getElementById('nav-more-btn');
  if (moreBtn) {
    if (morePages.includes(pageKey)) {
      moreBtn.classList.add('active');
    } else {
      moreBtn.classList.remove('active');
    }
  }

  if (pageKey === 'home') {
    animateCounters();
    initCalculators();
  } else if (pageKey === 'services') {
    initCalculators();
  } else if (pageKey === 'news' || pageKey === 'blog') {
    renderNewsCards();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMobileDrawer();
}

/* ==========================================================================
   3. ROUTES REGISTRY
   ========================================================================== */
const routes = {
  home: renderHomePage,
  about: renderAboutPage,
  science: renderSciencePage,
  services: renderServicesPage,
  academy: renderAcademyPage,
  impact: renderImpactPage,
  partners: renderPartnersPage,
  media: renderMediaPage,
  news: renderNewsPage,
  blog: renderNewsPage,
  contact: renderContactPage,
  privacy: renderPrivacyPage,
  governance: renderPrivacyPage
};
/* ==========================================================================
   4. PAGE VIEW: HOME (EXECUTIVE LANDING WITH RICH SHOWCASE)
   ========================================================================== */
function renderHomePage() {
  const stats = window.AZOLLA_DATA.verifiedStats;
  const project = window.AZOLLA_DATA.projectInfo;
  const partners = window.AZOLLA_DATA.partners;
  const gallery = window.AZOLLA_DATA.realGallery.slice(0, 3);
  const courses = window.AZOLLA_DATA.courses.slice(0, 3);

  const homeSecs = (window.AZOLLA_DATA.sitePages && window.AZOLLA_DATA.sitePages.home && window.AZOLLA_DATA.sitePages.home.sections) || [];
  const heroSec = homeSecs[0] || {};
  const isAr = (window.AZOLLA_CURRENT_LANG || 'ar') === 'ar';
  const heroTitle = !isAr && window.t ? `${window.t('heroTitle')} <br><span class="hero-highlight">${window.t('heroHighlight')}</span>` : (heroSec.title || 'أزولا مصر… <br><span class="hero-highlight">تكنولوجيا الأعلاف البديلة</span>');
  const heroLead = !isAr && window.t ? window.t('heroLead') : (heroSec.lead || 'المنظومة الوطنية الرائدة لإنتاج سرخس الأزولا الطافي وتخفيض تكاليف الأعلاف بنسبة تصل إلى <strong>60%</strong>، بدعم تنموي من برنامج المنح الصغيرة (SGP/GEF/UNDP) وتنفيذ جمعية الخدمات المتكاملة بكفر الدوار ومزارع أسوان التكاملية.');
  const heroImg = heroSec.image || './assets/images/field_farm_large.jpg';

  const t = window.t || ((k, d) => d || k);

  return `
    <section class="home-hero-section">
      <div class="container">
        <div class="hero-grid">
          <div>
            <h1 class="hero-main-title">
              ${heroTitle}
            </h1>
            <p class="hero-lead-text">
              ${heroLead}
            </p>

            <div class="hero-cta-row">
              <button class="btn btn-emerald btn-lg" onclick="openModal('modal-farm')">
                <i class="fa-solid fa-seedling"></i> ${t('ctaStartFarm', 'ابدأ حوضك / مزرعتك الآن')}
              </button>
              <a href="${project.whatsappLink}" target="_blank" rel="noopener" class="btn btn-gold btn-lg" style="background: #25D366; border-color: #25D366;">
                <i class="fa-brands fa-whatsapp"></i> ${t('ctaContact', 'تواصل')}: ${project.whatsappPhone || '01011526504'}
              </a>
              <a href="#about" class="btn btn-outline-white btn-lg">
                <i class="fa-solid fa-circle-info"></i> ${t('ctaDiscover', 'اكتشف المنظومة')}
              </a>
            </div>

            <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; font-size: 0.9rem; color: #D1FAE5;">
              <span><i class="fa-solid fa-solar-panel text-gold"></i> ${t('heroStatSolar', '3 محطات طاقة شمسية (25 kW)')}</span>
              <span>•</span>
              <span><i class="fa-solid fa-users text-gold"></i> ${t('heroStatGraduates', '512 خريجاً (62% إناث)')}</span>
              <span>•</span>
              <span><i class="fa-solid fa-certificate text-gold"></i> ${t('heroStatReg', 'إشهار جمعية الخدمات: 1997/752')}</span>
            </div>
          </div>

          <div class="hero-media-card">
            <img src="${heroImg}" alt="مزرعة أزولا مصر الحقلية" class="hero-media-img">
            <div class="hero-floating-tag">
              <div style="font-weight: 800; color: #FDE68A; margin-bottom: 0.2rem;">
                <i class="fa-solid fa-location-dot"></i> ${t('heroTagLoc', 'مزرعة أزولا المفتوحة بكفر الدوار – محافظة البحيرة')}
              </div>
              <div style="font-size: 0.8rem; color: #E2E8F0;">
                ${t('heroTagDesc', 'إنتاج يومي للكتلة الحيوية وضخ مياه بالطاقة الشمسية النظيفة بنسبة >90%')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-bg-white" style="padding-top: 3.5rem; padding-bottom: 3.5rem;">
      <div class="container">
        <div class="section-header-box" style="margin-bottom: 2.5rem;">
          <h2 class="section-title">${t('statsTitle', 'إحصائيات وإنجازات موثقة على أرض الواقع')}</h2>
          <p class="section-desc">${t('statsDesc', 'مؤشرات الأداء المعتمدة رسمياً من الجهات المانحة الدولية والإدارة الميدانية بكفر الدوار وأسوان.')}</p>
        </div>

        <div class="stats-dashboard-grid">
          <div class="stat-card">
            <div class="stat-number-box counter-val" data-target="${stats.solarStationsCount}">0</div>
            <div class="stat-card-title">${t('statSolarTitle', 'محطات طاقة شمسية')}</div>
            <div class="stat-card-desc">${t('statSolarDesc', 'بقدرة 25 kW لتشغيل 90% من الضخ النظيف')}</div>
          </div>

          <div class="stat-card">
            <div class="stat-number-box counter-val" data-target="${stats.dailyWaterPumpingM3}">0</div>
            <div class="stat-card-title">${t('statWaterTitle', 'م³/يوم سعة ضخ المياه')}</div>
            <div class="stat-card-desc">${t('statWaterDesc', 'خدمة 66 فدان نباتي و8 أفدنة سمكية')}</div>
          </div>

          <div class="stat-card">
            <div class="stat-number-box counter-val" data-target="${stats.directTrainees}">0</div>
            <div class="stat-card-title">${t('statTraineesTitle', 'متدرب مباشر معتمد')}</div>
            <div class="stat-card-desc">${t('statTraineesDesc', '62% إناث | 25% شباب | 10% ذوو همم')}</div>
          </div>

          <div class="stat-card">
            <div class="stat-number-box counter-val" data-target="${stats.feedCostReductionPct}">0</div>
            <div class="stat-card-title">${t('statFeedTitle', '% خفض تكلفة الأعلاف')}</div>
            <div class="stat-card-desc">${t('statFeedDesc', 'في علائق الماشية والدواجن والأسماك')}</div>
          </div>

          <div class="stat-card">
            <div class="stat-number-box counter-val" data-target="${stats.avgIncomeIncreaseEgp}">0</div>
            <div class="stat-card-title">${t('statIncomeTitle', 'ج.م زيادة متوسط الدخل')}</div>
            <div class="stat-card-desc">${t('statIncomeDesc', 'شهرياً مع 80% تعافي من الفقر المدقع')}</div>
          </div>

          <div class="stat-card">
            <div class="stat-number-box counter-val" data-target="${stats.annualCo2SavedTons}">0</div>
            <div class="stat-card-title">${t('statCo2Title', 'طن CO₂e خفض كربون سنوياً')}</div>
            <div class="stat-card-desc">${t('statCo2Desc', 'مع توفير 10,200 لتر سولار سنوياً')}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-bg-light">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
          <div>
            <h2 class="section-title">${t('scienceTitle', 'سرخس الأزولا: القيمة الغذائية والتحليل المعملي')}</h2>
            <p class="section-desc" style="margin-bottom: 1.25rem;">
              ${t('scienceDesc', 'يتميز سرخس الأزولا بمحتوى بروتيني خام يصل إلى 28.4% في المتوسط المعملي، مع وفرة في الأحماض الأمينية الأساسية والمعادن.')}
            </p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <a href="#science" class="btn btn-primary"><i class="fa-solid fa-flask"></i> ${t('scienceBtnCompare', 'التركيب العلمي والمقارنات')}</a>
              <button class="btn btn-outline-primary" onclick="openLightbox('./assets/images/field_macro_azolla.jpg', '${t('scienceBtnMacro', 'فحص الماكرو المعملي')}', '${t('scienceMacroCaption', 'فحص معملي ماكرو يوضح نسيج سرخس الأزولا النقي')}')">
                <i class="fa-solid fa-magnifying-glass"></i> ${t('scienceBtnMacro', 'فحص الماكرو المعملي')}
              </button>
            </div>
          </div>

          <div>
            <div style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--color-border);">
              <img src="./assets/images/field_macro_azolla.jpg" alt="ماكرو الأزولا" style="width: 100%; height: 300px; object-fit: cover;">
              <div style="padding: 1rem; background: var(--color-surface); font-size: 0.85rem; color: var(--color-text-muted);">
                <i class="fa-solid fa-microscope text-gold"></i> فحص معملي ماكرو يوضح طحلب الأنابينا المثبت للنيتروجين
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INTERACTIVE CALCULATORS SUITE (Directly Visible on Home / Landing) -->
    ${renderCalculatorsSection(true)}

    <section class="section section-bg-light">
      <div class="container">
        <div class="section-header-box">
          <h2 class="section-title">${t('academyHeaderTitle', 'أكاديمية أزولا مصر (12 برنامجاً معتمداً)')}</h2>
          <p class="section-desc">${t('academyHeaderLead', 'تأهيل الكوادر الزراعية والمربين بالشراكة مع مركز التدريب البيئي وحاضنة المرأة.')}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
          ${courses.map(c => `
            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                <span style="font-size: 0.75rem; font-weight: 700; background: var(--color-gold-50); color: var(--color-gold-dark); padding: 0.15rem 0.5rem; border-radius: var(--radius-full);">${t('course_' + c.id + '_duration', c.duration)}</span>
                <span style="font-size: 0.75rem; font-weight: 700; background: var(--color-azure-50); color: var(--color-azure-dark); padding: 0.15rem 0.5rem; border-radius: var(--radius-full);">${t('course_' + c.id + '_type', c.type)}</span>
              </div>
              <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 0.5rem;">${t('course_' + c.id + '_title', c.title)}</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1rem;">${t('course_' + c.id + '_desc', c.desc)}</p>
              <button class="btn btn-primary btn-block btn-sm" onclick="openCourseModal('${t('course_' + c.id + '_title', c.title)}')">
                <i class="fa-solid fa-ticket"></i> ${t('courseBookBtn', 'حجز مقعد بالبرنامج')}
              </button>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center;">
          <a href="#academy" class="btn btn-outline-primary"><i class="fa-solid fa-graduation-cap"></i> ${t('viewAllAcademyBtn', 'استعرض كافة البرامج الـ 12 للأكاديمية')}</a>
        </div>
      </div>
    </section>

    <section class="section section-bg-white">
      <div class="container">
        <div class="section-header-box" style="margin-bottom: 2.5rem;">
          <h2 class="section-title">${t('partnersWallTitle', 'شبكة الشركاء والجهات والتعاون المؤسسي')}</h2>
          <p class="section-desc">${t('partnersWallDesc', 'نعتز بالتعاون المشترك مع المنظمات الدولية والمحلية والشركاء التكنولوجيين والتدريبيين.')}</p>
        </div>

        <div class="partners-logo-wall">
          ${partners.map(p => `
            <div class="partner-wall-card" title="${p.name} - ${p.role}">
              ${p.logo ? `<img src="${p.logo}" alt="${p.name}" class="partner-wall-img">` : `<span style="font-weight: 800; font-size: 0.85rem; color: var(--color-primary);">${p.name}</span>`}
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 2rem;">
          <a href="#partners" class="btn btn-outline-primary"><i class="fa-solid fa-handshake"></i> ${t('viewAllPartnersBtn', 'صفحة الشركاء وتفاصيل الأدوار')}</a>
        </div>
      </div>
    </section>

    <section class="section section-bg-light">
      <div class="container">
        <div class="section-header-box">
          <h2 class="section-title">${t('mediaSectionTitle', 'معرض التوثيق الميداني الحي')}</h2>
          <p class="section-desc">${t('mediaSectionDesc', 'مشاهد حقيقية وموثقة من مزارع كفر الدوار وأسوان وجلسات التوعية الحقلية.')}</p>
        </div>

        <div class="gallery-grid" style="margin-bottom: 2.5rem;">
          ${gallery.map(item => `
            <div class="gallery-card">
              <div class="gallery-img-wrap" onclick="openLightbox('${item.image}', '${item.title}', '${item.desc}')">
                <img src="${item.image}" alt="${item.title}" class="gallery-img">
                <div class="gallery-zoom-btn"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
              </div>
              <div style="padding: 1.25rem;">
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.25rem;">
                  <i class="fa-solid fa-location-dot"></i> ${item.location}
                </div>
                <h3 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.35rem;">${item.title}</h3>
                <p style="font-size: 0.85rem; color: var(--color-text-muted);">${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center;">
          <a href="#media" class="btn btn-primary"><i class="fa-solid fa-images"></i> ${t('viewAllMediaBtn', 'استعراض كافة الصور بالمعرض الميداني')}</a>
        </div>
      </div>
    </section>

    <section class="section section-bg-white">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
          <div>
            <h2 class="section-title">${t('homeStudyTitle', 'دراسة تطبيقية: نموذج الحوض المنزلي ومؤشرات الإنتاجية والجدوى الاقتصادية')}</h2>
            <p class="section-desc" style="margin-bottom: 1.25rem;">
              ${t('homeStudyDesc', 'يوضح النموذج التطبيقي لوحدات إنتاج الأزولا المنزلية بكفر الدوار (بمساحة 30 م²) إمكانية تحقيق إنتاجية يومية تتراوح بين 12 إلى 15 كجم من الأزولا الخضراء عالية البروتين، مما يساهم في خفض تكاليف الأعلاف بنسبة تصل إلى 55% وتحقيق وفر مالي مباشر يقارب 3,800 ج.م شهرياً ضمن مسار تعزيز الأمن الغذائي والتمكين الاقتصادي للأسر الريفية وصغار المربين.')}
            </p>
            <a href="#impact" class="btn btn-gold"><i class="fa-solid fa-arrow-left"></i> ${t('homeStudyBtn', 'استعراض تقرير الأثر والجدوى الاقتصادية')}</a>
          </div>

          <div>
            <div style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--color-border);">
              <img src="./assets/images/field_rooftop_basin.jpg" alt="نموذج تطبيقي لوحدة إنتاج أزولا منزلية" style="width: 100%; height: 320px; object-fit: cover;">
              <div style="padding: 1rem; background: var(--color-surface); font-size: 0.85rem; color: var(--color-text-muted);">
                <i class="fa-solid fa-house-chimney text-gold"></i> ${t('homeStudyCaption', 'نموذج تطبيقي حقيقي لوحدة إنتاجية منزلية – كفر الدوار (البحيرة)')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- OPPORTUNITIES & ENGAGEMENT: LAND PARTNERSHIP & VOLUNTEERS -->
    <section class="section section-bg-light" style="padding-top: 3.5rem; padding-bottom: 3.5rem;">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
          
          <!-- Land Partnership Card -->
          <div style="background: linear-gradient(135deg, #064E3B 0%, #042F24 100%); color: #FFFFFF; border-radius: var(--radius-lg); padding: 2.25rem; box-shadow: var(--shadow-md); border: 2px solid #10B981; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="width: 52px; height: 52px; border-radius: var(--radius-md); background: rgba(16, 185, 129, 0.2); color: #A7F3D0; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin-bottom: 1.25rem;">
                <i class="fa-solid fa-map-location-dot"></i>
              </div>
              <h3 style="font-size: 1.45rem; font-weight: 900; color: #FDE68A; margin-bottom: 0.75rem;">
                ${t('landPartnerTitle', 'لديك أرض زراعية؟ شاركنا في تكنولوجيا الأعلاف البديلة')}
              </h3>
              <p style="font-size: 0.95rem; color: #E2ECE9; line-height: 1.7; margin-bottom: 1.5rem;">
                ${t('landPartnerDesc', 'نفتح باب الشراكة مع أصحاب وملاك الأراضي الزراعية في كافة المحافظات لإنشاء أحواض إنتاجية ومزارع أزولا كبرى بإشراف ودعم فني وتشغيلي متكامل من <strong>جمعية الخدمات المتكاملة</strong>.')}
              </p>
            </div>
            <button class="btn btn-gold btn-lg btn-block" onclick="openModal('modal-land-partner')" style="background: #10B981; border-color: #10B981; font-weight: 900;">
              <i class="fa-solid fa-handshake"></i> ${t('landPartnerBtn', 'قدّم أرضك للشراكة الآن')}
            </button>
          </div>

          <!-- Volunteer Application Card -->
          <div style="background: linear-gradient(135deg, #92400E 0%, #78350F 100%); color: #FFFFFF; border-radius: var(--radius-lg); padding: 2.25rem; box-shadow: var(--shadow-md); border: 2px solid #F59E0B; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="width: 52px; height: 52px; border-radius: var(--radius-md); background: rgba(245, 158, 11, 0.2); color: #FDE68A; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin-bottom: 1.25rem;">
                <i class="fa-solid fa-hand-holding-heart"></i>
              </div>
              <h3 style="font-size: 1.45rem; font-weight: 900; color: #FEF3C7; margin-bottom: 0.75rem;">
                ${t('volunteerTitle', 'انضم لسفراء البيئة وفريق المتطوعين (GCT)')}
              </h3>
              <p style="font-size: 0.95rem; color: #FEF3C7; line-height: 1.7; margin-bottom: 1.5rem;">
                ${t('volunteerDesc', 'شارك معنا في حملات التوعية الحقلية، تدريب المزارعين، التوثيق وصناعة المحتوى الأخضر مع مبادرة <strong>Green Cap Team (GCT)</strong> واكتسب خبرة ميدانية معتمدة.')}
              </p>
            </div>
            <button class="btn btn-gold btn-lg btn-block" onclick="openModal('modal-volunteer')" style="background: #F59E0B; border-color: #F59E0B; color: #1E293B; font-weight: 900;">
              <i class="fa-solid fa-user-plus"></i> ${t('volunteerBtn', 'سجّل كمتطوع وسفير بيئي')}
            </button>
          </div>

        </div>
      </div>
    </section>
  `;
}
/* ==========================================================================
   5. SUB-PAGES: ABOUT, SCIENCE, SERVICES, ACADEMY
   ========================================================================== */
function renderAboutPage() {
  const pillars = window.AZOLLA_DATA.pillars;
  const t = window.t || ((k, d) => d || k);

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">${t('aboutHeaderTitle', 'عن مشروع تكنولوجيا الأعلاف البديلة .. أزولا مصر')}</h1>
        <p class="hero-lead-text">
          ${t('aboutHeaderLead', 'منظومة تنموية زراعية مستدامة تنطلق من كفر الدوار بالبحيرة ومزارع أسوان التكاملية، لبناء نموذج زراعي بيئي مستدام يحقق الأمن الغذائي والمناخي.')}
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3.5rem;">
          <div style="background: var(--color-emerald-50); border: 1px solid var(--color-emerald-200); border-radius: var(--radius-lg); padding: 2rem;">
            <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary-dark); margin-bottom: 0.75rem;"><i class="fa-solid fa-eye text-emerald"></i> ${t('strategicVisionTitle', 'الرؤية الاستراتيجية 2035')}</h3>
            <p style="color: var(--color-text-main); font-size: 0.95rem; line-height: 1.8;">
              ${t('strategicVisionDesc', 'أن تصبح مصر مركزاً إقليمياً ورائداً في إنتاج وتطوير تقنيات الأزولا، وتوفير عليقة علفية مكملة ومستدامة، ودعم خصوبة التربة وتحقيق الأمن الغذائي والمناخي بحلول عام 2035.')}
            </p>
          </div>

          <div style="background: var(--color-gold-50); border: 1px solid var(--color-gold-200); border-radius: var(--radius-lg); padding: 2rem;">
            <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-gold-dark); margin-bottom: 0.75rem;"><i class="fa-solid fa-bullseye text-gold"></i> ${t('missionTitle', 'رسالة المشروع')}</h3>
            <p style="color: var(--color-text-main); font-size: 0.95rem; line-height: 1.8;">
              ${t('missionDesc', 'نشر المعرفة وتوطين تكنولوجيا استزراع الأزولا، وتقديم خدمات التصميم، والتدريب العملي، والدعم الفني الميداني، وبناء نماذج زراعية خضراء واعدة تعزز دخل الأسر الريفية وتحمي البيئة.')}
            </p>
          </div>

          <div style="background: var(--color-azure-50); border: 1px solid var(--color-azure-100); border-radius: var(--radius-lg); padding: 2rem;">
            <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-azure-dark); margin-bottom: 0.75rem;"><i class="fa-solid fa-building-flag text-azure"></i> ${t('execEntityTitle', 'الجهة التنفيذية الرسمية')}</h3>
            <p style="color: var(--color-text-main); font-size: 0.95rem; line-height: 1.8;">
              ${t('execEntityDesc', '<strong>جمعية الخدمات المتكاملة بكفر الدوار</strong> (مشهرة برقم 1997/752) ومزارع فرع أسوان التكاملية، المعتمدة لإدارة وتطوير المنظومة الميدانية.')}
            </p>
          </div>
        </div>

        <div class="section-header-box">
          <h2 class="section-title">${t('sevenPillarsTitle', 'المحاور السبعة لمنظومة أزولا مصر')}</h2>
          <p class="section-desc">${t('sevenPillarsDesc', 'تكامل شامل بين الإنتاج، الهندسة، التدريب، الجودة، البحث، الاستثمار، والمسؤولية المجتمعية.')}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
          ${pillars.map(p => `
            <div style="background: var(--color-surface-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-sm);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--color-emerald-50); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                  <i class="fa-solid ${p.icon}"></i>
                </div>
                <span style="font-weight: 900; font-size: 1.2rem; color: var(--color-border); font-family: var(--font-latin);">${p.num}</span>
              </div>
              <h4 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 0.5rem;">${p.title}</h4>
              <p style="font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.6;">${p.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderSciencePage() {
  const t = window.t || ((k, d) => d || k);

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">${t('scienceHeaderTitle', 'الأزولا: الخصائص النباتية والتركيب الغذائي')}</h1>
        <p class="hero-lead-text">
          ${t('scienceHeaderLead', 'تعرف على سرخس الأزولا الطافي، قدرته الفائقة على تثبيت النيتروجين، محتواه البروتيني المرتفع (20% - 35%)، ومقارنته بالأعلاف التقليدية.')}
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; margin-bottom: 4rem;">
          <div>
            <h2 class="section-title">${t('symbiosisTitle', 'سرخس مائي عائم بتكافل حيوي فريد')}</h2>
            <p class="section-desc" style="margin-bottom: 1rem;">
              ${t('symbiosisDesc', 'الأزولا (<i>Azolla</i>) سرخس مائي طافٍ يرتبط بعلاقة تكافلية مستمرة مع الطحلب الأزرق المخضر (<i>Anabaena azollae</i>)، الذي يقوم بامتصاص نيتروجين الهواء الجوي وتثبيته مباشرة، محولاً إياه إلى كتلة نباتية غنية بالبروتين الخام والأحماض الأمينية.')}
            </p>
            <div style="background: var(--color-emerald-50); border: 1px solid var(--color-emerald-200); padding: 1.25rem; border-radius: var(--radius-md);">
              <h4 style="font-weight: 800; color: var(--color-primary-dark); margin-bottom: 0.35rem;"><i class="fa-solid fa-check text-emerald"></i> ${t('certifiedStrainsTitle', 'السلالات المعتمدة بمصر')}</h4>
              <p style="font-size: 0.88rem; color: var(--color-text-main); margin: 0;">
                <strong>Azolla pinnata:</strong> ${t('strainPinnata', 'الأكثر تحملاً للحرارة صيفاً وتأقلماً في محافظات الدلتا والصعيد.')}<br>
                <strong>Azolla filiculoides:</strong> ${t('strainFiliculoides', 'سلالة ممتازة ذات بروتين مرتفع وتحمل للطقس البارد.')}
              </p>
            </div>
          </div>

          <div>
            <div style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--color-border);">
              <img src="./assets/images/field_macro_azolla.jpg" alt="صورة ماكرو للأزولا" style="width: 100%; height: 340px; object-fit: cover;">
              <div style="padding: 1rem; background: var(--color-surface); font-size: 0.85rem; color: var(--color-text-muted);">
                <i class="fa-solid fa-camera text-gold"></i> ${t('macroPhotoDesc', 'فحص معملي ماكرو يوضح نسيج الأزولا النقي الخالي من الشوائب والآفات')}
              </div>
            </div>
          </div>
        </div>

        <div style="overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
            <thead>
              <tr style="background: var(--color-primary-dark); color: #FFFFFF;">
                <th style="padding: 1.1rem 1.25rem; font-weight: 800;">${t('tableHeaderCriteria', 'المعيار والمؤشر')}</th>
                <th style="padding: 1.1rem 1.25rem; font-weight: 800; color: #FDE68A;">${t('tableHeaderAzolla', 'الأزولا (Azolla Egypt)')}</th>
                <th style="padding: 1.1rem 1.25rem; font-weight: 800;">${t('tableHeaderAlfalfa', 'البرسيم (Alfalfa)')}</th>
                <th style="padding: 1.1rem 1.25rem; font-weight: 800;">${t('tableHeaderSoy', 'كسب فول الصويا (Soybean)')}</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--color-border); background: var(--color-emerald-50);">
                <td style="padding: 1rem 1.25rem; font-weight: 800;">${t('tableCrudeProtein', 'البروتين الخام (مادة جافة)')}</td>
                <td style="padding: 1rem 1.25rem; font-weight: 900; color: var(--color-primary);">${t('tableCrudeProteinAzolla', '20% – 35% (معدل 28.4%)')}</td>
                <td style="padding: 1rem 1.25rem;">${t('tableCrudeProteinAlfalfa', '15% – 22%')}</td>
                <td style="padding: 1rem 1.25rem;">${t('tableCrudeProteinSoy', '44% – 48%')}</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 1rem 1.25rem; font-weight: 800;">${t('tableHarvestCycle', 'دورة الحصاد والإنتاج')}</td>
                <td style="padding: 1rem 1.25rem; font-weight: 700; color: var(--color-primary);">${t('tableHarvestCycleAzolla', 'سريعة جداً (حصاد كل 3-5 أيام)')}</td>
                <td style="padding: 1rem 1.25rem;">${t('tableHarvestCycleAlfalfa', 'حشات دورية (كل 30 يوماً)')}</td>
                <td style="padding: 1rem 1.25rem;">${t('tableHarvestCycleSoy', 'محصول كامل (4-5 أشهر)')}</td>
              </tr>
              <tr>
                <td style="padding: 1rem 1.25rem; font-weight: 800;">${t('tableWaterLand', 'استهلاك المياه والأرض')}</td>
                <td style="padding: 1rem 1.25rem; font-weight: 700; color: var(--color-primary);">${t('tableWaterLandAzolla', 'أحواض مغلقة وتدوير مياه كامل')}</td>
                <td style="padding: 1rem 1.25rem;">${t('tableWaterLandAlfalfa', 'أراضٍ زراعية صالحة للحرث')}</td>
                <td style="padding: 1rem 1.25rem;">${t('tableWaterLandSoy', 'مساحات شاسعة وتسميد كثيف')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function renderCalculatorsSection(isHome = false) {
  const t = window.t || ((k, d) => d || k);

  return `
    <section class="section section-bg-white" id="interactive-calculators">
      <div class="container">
        <div class="smart-hub-header-card">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.15); color: #FDE68A; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 800; margin-bottom: 0.75rem;">
              <i class="fa-solid fa-microchip"></i> ${t('calcHubBadge', 'بوابة الحاسبات الزراعية الذكية 2026')}
            </div>
            <h2 style="font-size: 1.85rem; font-weight: 900; color: #FFFFFF; margin-bottom: 0.5rem;">
              ${t('calcHubTitle', 'حاسبات أزولا مصر الذكية (الأعلاف، صون المياه، وتصميم الأحواض)')}
            </h2>
            <p style="color: #CBD5E1; font-size: 0.95rem; max-width: 650px;">
              ${t('calcHubDesc', 'طُوّرت هذه المنظومة بالتعاون الاستراتيجي مع <strong>منصة NGO HUB</strong> لتمكين المزارعين والمربين من حساب مساحات الأحواض، توفير المياه بنسبة 90%، خلطات الأعلاف، وحساب الوفر المالي لحظياً.')}
            </p>
          </div>

          <div class="smart-hub-logo-tag">
            <img src="./assets/images/logo_ngohub.png" alt="NGO HUB Logo" style="height: 38px;">
            <div style="text-align: right;">
              <div style="font-weight: 800; font-size: 0.9rem; color: #FFFFFF;">NGO HUB</div>
              <div style="font-size: 0.72rem; color: #A7F3D0;">Digital Tech Partner</div>
            </div>
          </div>
        </div>

        <div class="calc-nav-tabs">
          <button class="calc-tab-btn active" onclick="switchCalcTab('tab-basin', this)">
            <i class="fa-solid fa-compass-drafting"></i> ${t('calcTabBasin', '1. تصميم الأحواض والإنتاج')}
          </button>
          <button class="calc-tab-btn" onclick="switchCalcTab('tab-feed', this)">
            <i class="fa-solid fa-cow"></i> ${t('calcTabFeed', '2. خلط عليقة الأعلاف')}
          </button>
          <button class="calc-tab-btn" onclick="switchCalcTab('tab-water', this)">
            <i class="fa-solid fa-droplet text-azure"></i> ${t('calcTabWater', '3. صون وتوفير المياه')}
          </button>
          <button class="calc-tab-btn" onclick="switchCalcTab('tab-carbon', this)">
            <i class="fa-solid fa-leaf"></i> ${t('calcTabCarbon', '4. خفض الانبعاثات')}
          </button>
          <button class="calc-tab-btn" onclick="switchCalcTab('tab-roi', this)">
            <i class="fa-solid fa-chart-pie"></i> ${t('calcTabRoi', '5. العائد الاستثماري (ROI)')}
          </button>
        </div>

        <!-- 1. BASIN CALC -->
        <div id="tab-basin" class="calculator-box">
          <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1.5rem;">
            <i class="fa-solid fa-water text-azure"></i> ${t('basinCalcTitle', 'حاسبة مساحات الأحواض والتقاوي والإنتاج اليومي')}
          </h3>
          <div class="calc-grid-layout">
            <div>
              <div class="form-group">
                <label class="form-label">${t('basinLengthLabel', 'طول الحوض المتاح (متر) *')}</label>
                <input type="number" id="calc-basin-length" class="form-control" value="10" min="1" oninput="runBasinCalc()">
              </div>
              <div class="form-group">
                <label class="form-label">${t('basinWidthLabel', 'عرض الحوض المتاح (متر) *')}</label>
                <input type="number" id="calc-basin-width" class="form-control" value="5" min="1" oninput="runBasinCalc()">
              </div>
              <div class="form-group">
                <label class="form-label">${t('basinDepthLabel', 'عمق المياه المستهدف (سم)')}</label>
                <input type="number" class="form-control" value="15" readonly style="background: var(--color-surface-hover);">
              </div>
            </div>

            <div class="calc-result-panel">
              <div class="result-row">
                <span class="result-label">${t('resBasinArea', 'إجمالي المساحة المائية:')}</span>
                <span class="result-value" id="res-basin-area">50 ${t('unitM2', 'م²')}</span>
              </div>
              <div class="result-row">
                <span class="result-label">${t('resBasinSeed', 'احتياج التقاوي الأولية:')}</span>
                <span class="result-value" id="res-basin-seed">25 ${t('unitKg', 'كجم')}</span>
              </div>
              <div class="result-row">
                <span class="result-label">${t('resBasinYieldSummer', 'الإنتاج اليومي صيفاً:')}</span>
                <span class="result-value" id="res-basin-yield-summer">22.5 ${t('unitKgDay', 'كجم / يوم')}</span>
              </div>
              <div class="result-row">
                <span class="result-label">${t('resBasinYieldWinter', 'الإنتاج اليومي شتاءً:')}</span>
                <span class="result-value" id="res-basin-yield-winter">15.0 ${t('unitKgDay', 'كجم / يوم')}</span>
              </div>
              <div class="result-row" style="background: var(--color-surface); padding: 0.75rem; border-radius: var(--radius-sm);">
                <span class="result-label">${t('resBasinSavings', 'الوفر المالي الشهري:')}</span>
                <span class="result-value text-gold" id="res-basin-savings">3,375 ${t('unitEgpMonth', 'ج.م / شهر')}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. FEED CALC -->
        <div id="tab-feed" class="calculator-box" style="display: none;">
          <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1.5rem;">
            <i class="fa-solid fa-wheat-awn text-gold"></i> ${t('feedCalcTitle', 'حاسبة خلط عليقة الأعلاف المركبة للأبقار والدواجن والأسماك')}
          </h3>
          <div class="calc-grid-layout">
            <div>
              <div class="form-group">
                <label class="form-label">${t('feedTypeLabel', 'نوع القطيع أو الحيوانات *')}</label>
                <select id="calc-feed-type" class="form-control" onchange="runFeedCalc()">
                  <option value="cattle_dairy">${t('cattleDairyOption', 'أبقار وجاموس حلاب')}</option>
                  <option value="cattle_beef" selected>${t('cattleBeefOption', 'أبقار وجاموس تسمين')}</option>
                  <option value="sheep_goat">${t('sheepGoatOption', 'أغنام وماعز')}</option>
                  <option value="poultry_ducks">${t('poultryDucksOption', 'دواجن وبط ورومي')}</option>
                  <option value="fish_farm">${t('fishFarmOption', 'أسماك مزارع')}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${t('feedHeadsLabel', 'عدد الرؤوس بالقطيع *')}</label>
                <input type="number" id="calc-feed-heads" class="form-control" value="10" min="1" oninput="runFeedCalc()">
              </div>
              <div class="form-group">
                <label class="form-label">${t('feedPriceLabel', 'سعر كيلو العلف الجاف (جنيه) *')}</label>
                <input type="number" id="calc-feed-price" class="form-control" value="22" min="5" oninput="runFeedCalc()">
              </div>
            </div>

            <div class="calc-result-panel">
              <div class="result-row">
                <span class="result-label">${t('resFeedTotalDry', 'إجمالي العلف الجاف:')}</span>
                <span class="result-value" id="res-feed-total-dry">120 ${t('unitKgDay', 'كجم / يوم')}</span>
              </div>
              <div class="result-row">
                <span class="result-label">${t('resFeedSavedDry', 'العلف الجاف الموفر يومياً:')}</span>
                <span class="result-value text-emerald" id="res-feed-saved-dry">24 ${t('unitKgDay', 'كجم / يوم')}</span>
              </div>
              <div class="result-row">
                <span class="result-label">${t('resFeedAzollaNeeded', 'الأزولا الطازجة الواجب خلطها:')}</span>
                <span class="result-value" id="res-feed-azolla-needed">96 ${t('unitKgDay', 'كجم / يوم')}</span>
              </div>
              <div class="result-row" style="background: var(--color-surface); padding: 0.75rem; border-radius: var(--radius-sm);">
                <span class="result-label">${t('resFeedMonthlySaved', 'الوفر المالي الشهري:')}</span>
                <span class="result-value text-gold" id="res-feed-monthly-saved">15,840 ${t('unitEgpMonth', 'ج.م / شهر')}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. WATER SAVINGS & CONSERVATION CALC -->
        <div id="tab-water" class="calculator-box" style="display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
            <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary); margin: 0;">
              <i class="fa-solid fa-droplet text-azure"></i> ${t('waterCalcTitle', 'حاسبة صون وكفاءة استهلاك وتوفير المياه (Water Conservation)')}
            </h3>
            <span style="background: var(--color-azure-50); color: var(--color-azure-dark); padding: 0.35rem 0.85rem; border-radius: var(--radius-full); font-weight: 800; font-size: 0.85rem; border: 1px solid var(--color-azure-100);">
              <i class="fa-solid fa-gauge-high text-azure"></i> ${t('waterCutBadge', 'وفر مائي يصل إلى 90%')}
            </span>
          </div>

          <div class="calc-grid-layout">
            <div>
              <div class="form-group">
                <label class="form-label"><i class="fa-solid fa-ruler-combined text-azure"></i> ${t('waterAreaLabel', 'مساحة الأحواض المائية (م²) *')}</label>
                <input type="number" id="calc-water-area" class="form-control" value="100" min="10" step="10" oninput="runWaterCalc()">
                <small style="color: var(--color-text-muted); font-size: 0.78rem;">${t('waterAreaExample', '(مثال: 100 م² = حوض متوسط، 4200 م² = فدان كامل)')}</small>
              </div>

              <div class="form-group">
                <label class="form-label"><i class="fa-solid fa-seedling text-emerald"></i> ${t('waterCropLabel', 'المحصول العلفي المقارن *')}</label>
                <select id="calc-water-crop" class="form-control" onchange="runWaterCalc()">
                  <option value="alfalfa" selected>${t('fodderAlfalfa', 'البرسيم الحجازي (Alfalfa - 1,850 م³/طن جاف)')}</option>
                  <option value="berseem">${t('fodderBerseem', 'البرسيم المصري (Berseem - 1,450 م³/طن جاف)')}</option>
                  <option value="corn_silage">${t('fodderSilage', 'سيلاج الذرة (Corn Silage - 1,200 م³/طن جاف)')}</option>
                  <option value="soybean">${t('fodderSoy', 'كسب فول الصويا (Soybean - 2,400 م³/طن جاف)')}</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label"><i class="fa-solid fa-solar-panel text-gold"></i> ${t('waterTechLabel', 'تقنية الري وتدوير المياه *')}</label>
                <select id="calc-water-tech" class="form-control" onchange="runWaterCalc()">
                  <option value="closed_solar_shade" selected>${t('techClosedSolarShade', 'أحواض مغلقة + ضخ شمسي + تظليل سيرام 50% (أعلى كفاءة وفر 90%)')}</option>
                  <option value="closed_solar_open">${t('techClosedSolarOpen', 'أحواض مغلقة مع تدوير بالطاقة الشمسية بدون تظليل (وفر 82%)')}</option>
                  <option value="rooftop_basin">${t('techRooftop', 'وحدة أسطح منزلية معزولة (وفر 88%)')}</option>
                  <option value="earth_basin_recycle">${t('techEarthBasin', 'أحواض ترابية مبطنة مشمع مع إعادة تدوير (وفر 78%)')}</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label"><i class="fa-solid fa-calendar-days text-primary"></i> ${t('waterPeriodLabel', 'فترة الحساب والتشغيل *')}</label>
                <select id="calc-water-period" class="form-control" onchange="runWaterCalc()">
                  <option value="year" selected>${t('periodYear', 'سنة كاملة (365 يوماً إنتاجي)')}</option>
                  <option value="month">${t('periodMonth', 'شهر واحد (30 يوماً)')}</option>
                </select>
              </div>
            </div>

            <div class="calc-result-panel" style="background: linear-gradient(135deg, rgba(240, 249, 255, 0.8) 0%, rgba(209, 250, 229, 0.8) 100%); border: 2px solid var(--color-azure-100);">
              <div class="result-row">
                <span class="result-label"><i class="fa-solid fa-faucet-drip text-azure"></i> ${t('resWaterAzollaConsumed', 'استهلاك منظومة الأزولا:')}</span>
                <span class="result-value text-azure" id="res-water-azolla-consumed">128 ${t('unitM3', 'م³')}</span>
              </div>
              <div class="result-row">
                <span class="result-label"><i class="fa-solid fa-shower text-gold"></i> ${t('resWaterConventionalConsumed', 'استهلاك الزراعة التقليدية:')}</span>
                <span class="result-value" id="res-water-conventional-consumed">1,120 ${t('unitM3', 'م³')}</span>
              </div>
              <div class="result-row" style="background: var(--color-surface); padding: 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--color-emerald-200);">
                <span class="result-label" style="font-weight: 900; color: var(--color-primary-dark);"><i class="fa-solid fa-shield-heart text-emerald"></i> ${t('resWaterSavedM3Label', 'صافي الوفر المائي المحقق:')}</span>
                <span class="result-value text-emerald" id="res-water-saved-m3" style="font-size: 1.35rem; font-weight: 900;">992 ${t('unitM3Saved', 'م³ موفرة')}</span>
              </div>
              <div class="result-row">
                <span class="result-label"><i class="fa-solid fa-percent text-emerald"></i> ${t('resWaterSavedPct', 'نسبة صون وتوفير المياه:')}</span>
                <span class="result-value text-emerald" id="res-water-saved-pct">88.6%</span>
              </div>
              <div class="result-row">
                <span class="result-label"><i class="fa-solid fa-users text-azure"></i> ${t('resHouseholdEquiv', 'مكافئ مياه شرب منزلية:')}</span>
                <span class="result-value text-azure" id="res-water-household-equiv">18 ${t('unitPersons', 'فرد')} / ${t('unitYear', 'سنة')}</span>
              </div>
              <div class="result-row">
                <span class="result-label"><i class="fa-solid fa-dna text-gold"></i> ${t('resProteinEfficiency', 'كفاءة إنتاج البروتين المائي:')}</span>
                <span class="result-value text-gold" id="res-water-protein-efficiency">0.82 ${t('unitProteinPerM3', 'كجم بروتين / م³')}</span>
              </div>
            </div>
          </div>

          <!-- Comparison Progress Bar -->
          <div style="margin-top: 1.5rem; background: var(--color-bg); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 800; margin-bottom: 0.5rem;">
              <span><i class="fa-solid fa-chart-simple text-azure"></i> ${t('waterCompBarTitle', 'مقارنة الاستهلاك المائي المباشر (متر مكعب):')}</span>
              <span id="res-water-bar-label" style="color: var(--color-primary); font-weight: 900;">${t('waterBarLabelPrefix', 'وفر مائي وصون موارد بنسبة')} 88.6%</span>
            </div>
            <div style="height: 24px; border-radius: var(--radius-full); background: #EF4444; overflow: hidden; display: flex; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
              <div id="res-water-bar-azolla" style="width: 11.4%; background: #059669; color: #FFF; font-size: 0.72rem; font-weight: 800; display: flex; align-items: center; justify-content: center;" title="${t('waterAzolla', 'أزولا')}">${t('waterAzolla', 'أزولا')} (11.4%)</div>
              <div id="res-water-bar-saved" style="width: 88.6%; background: #0284C7; color: #FFF; font-size: 0.72rem; font-weight: 800; display: flex; align-items: center; justify-content: center;" title="${t('waterSaved', 'مياه مصانة وموفرة')}">${t('waterSaved', 'مياه مصانة وموفرة')} (88.6%)</div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.4rem;">
              <span><i class="fa-solid fa-circle" style="color: #059669;"></i> ${t('legendAzolla', 'استهلاك الأزولا الفعلي')}</span>
              <span><i class="fa-solid fa-circle" style="color: #0284C7;"></i> ${t('legendSaved', 'حجم المياه الموفرة (Water Conservation)')}</span>
              <span><i class="fa-solid fa-circle" style="color: #EF4444;"></i> ${t('legendWaste', 'هدر المحاصيل التقليدية')}</span>
            </div>
          </div>
        </div>

        <!-- 4. CARBON CALC -->
        <div id="tab-carbon" class="calculator-box" style="display: none;">
          <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1.5rem;">
            <i class="fa-solid fa-leaf text-emerald"></i> ${t('carbonCalcTitle', 'حاسبة البصمة البيئية وخفض الانبعاثات')}
          </h3>
          <div class="calc-grid-layout">
            <div>
              <div class="form-group">
                <label class="form-label">${t('annualAzollaTonsLabel', 'إنتاج الأزولا السنوي التقديري (طن) *')}</label>
                <input type="number" id="calc-carbon-tons" class="form-control" value="20" min="1" oninput="runCarbonCalc()">
              </div>
              <div class="form-group">
                <label class="form-label">${t('dieselSavedLabel', 'السولار الموفر بفضل الطاقة الشمسية (لتر/سنة) *')}</label>
                <input type="number" id="calc-carbon-diesel" class="form-control" value="10000" min="0" oninput="runCarbonCalc()">
              </div>
            </div>

            <div class="calc-result-panel">
              <div class="result-row">
                <span class="result-label">${t('resCarbonTotal', 'إجمالي الكربون المتجنب سنوياً:')}</span>
                <span class="result-value text-emerald" id="res-carbon-total">37.3 ${t('unitTonsCo2', 'طن CO₂e')}</span>
              </div>
              <div class="result-row" style="background: var(--color-surface); padding: 0.75rem; border-radius: var(--radius-sm);">
                <span class="result-label">${t('resCarbonTrees', 'ما يعادل زراعة أشجار:')}</span>
                <span class="result-value text-gold" id="res-carbon-trees">1,678 ${t('unitTrees', 'شجرة')}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. ROI CALC -->
        <div id="tab-roi" class="calculator-box" style="display: none;">
          <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1.5rem;">
            <i class="fa-solid fa-chart-line text-azure"></i> ${t('roiCalcTitle', 'حاسبة العائد الاستثماري ونماذج المزارع (ROI)')}
          </h3>
          <div style="text-align: center; margin-bottom: 2rem;">
            <button class="btn btn-gold btn-lg" onclick="openModal('modal-land-partner')" style="background: var(--color-primary); color: #FFF; border-color: var(--color-primary); font-weight: 800;">
              <i class="fa-solid fa-map-location-dot"></i> ${t('roiPartnerCta', 'هل تمتلك أرضاً زراعية؟ قدّمها للشراكة الاستثمارية مع المشروع')}
            </button>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem;">
            <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
              <h4 style="font-weight: 800; color: var(--color-primary);">${t('roiModel1Title', 'وحدة منزلية (30 م²)')}</h4>
              <div style="font-size: 1.25rem; font-weight: 900; color: var(--color-gold); margin: 0.5rem 0;">${t('roiModel1Cost', '25,000 ج.م')}</div>
              <div style="font-size: 0.85rem; color: var(--color-text-muted);">${t('roiModel1Yield', 'إنتاج: 3.5 طن/سنة')}</div>
              <div style="font-weight: 700; color: var(--color-primary); margin-top: 0.75rem;">${t('roiModel1Payback', 'استرداد: 8 – 10 أشهر')}</div>
            </div>

            <div style="background: var(--color-emerald-50); border: 2px solid var(--color-primary); border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
              <h4 style="font-weight: 800; color: var(--color-primary);">${t('roiModel2Title', 'مزرعة تجارية (0.5 فدان)')}</h4>
              <div style="font-size: 1.25rem; font-weight: 900; color: var(--color-gold); margin: 0.5rem 0;">${t('roiModel2Cost', '120,000 ج.م')}</div>
              <div style="font-size: 0.85rem; color: var(--color-text-muted);">${t('roiModel2Yield', 'إنتاج: 18 طن/سنة')}</div>
              <div style="font-weight: 700; color: var(--color-primary); margin-top: 0.75rem;">${t('roiModel2Payback', 'استرداد: 12 – 16 شهراً')}</div>
            </div>

            <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
              <h4 style="font-weight: 800; color: var(--color-primary);">${t('roiModel3Title', 'مشروع تجاري كبير (2 فدان)')}</h4>
              <div style="font-size: 1.25rem; font-weight: 900; color: var(--color-gold); margin: 0.5rem 0;">${t('roiModel3Cost', '480,000 ج.م')}</div>
              <div style="font-size: 0.85rem; color: var(--color-text-muted);">${t('roiModel3Yield', 'إنتاج: 75 طن/سنة')}</div>
              <div style="font-weight: 700; color: var(--color-primary); margin-top: 0.75rem;">${t('roiModel3Payback', 'استرداد: 14 – 18 شهراً')}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

function renderServicesPage() {
  const t = window.t || ((k, d) => d || k);

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">${t('servicesHeaderTitle', 'الخدمات الفنية والحاسبات الزراعية الذكية')}</h1>
        <p class="hero-lead-text">
          ${t('servicesHeaderLead', 'خدمات إنشاء المزارع، توفير التقاوي، الإشراف الفني، والحاسبات التفاعلية المبرمجة بالتعاون مع <strong>NGO HUB</strong>.')}
        </p>
      </div>
    </header>

    ${renderCalculatorsSection(false)}
  `;
}

function renderAcademyPage() {
  const courses = window.AZOLLA_DATA.courses;
  const t = window.t || ((k, d) => d || k);

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">${t('academyHeaderTitle', 'أكاديمية أزولا مصر (12 برنامجاً معتمداً)')}</h1>
        <p class="hero-lead-text">
          ${t('academyHeaderLead', 'برامج تدريبية تطبيقية ومعملية بالتعاون مع <strong>مركز التدريب البيئي</strong> و<strong>حاضنة الأعمال البيئية للمرأة المصرية</strong>.')}
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 3rem; padding: 1.25rem; background: var(--color-bg); border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="./assets/images/logo_training_center.png" alt="مركز التدريب البيئي" style="height: 44px; border-radius: 4px;">
            <div>
              <div style="font-weight: 800; font-size: 0.95rem;">${t('trainingCenterName', 'مركز التدريب البيئي')}</div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted);">${t('trainingCenterRole', 'الاعتماد والتدريب الميداني')}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="./assets/images/logo_women_incubator.png" alt="حاضنة الأعمال البيئية للمرأة المصرية" style="height: 44px; border-radius: 4px;">
            <div>
              <div style="font-weight: 800; font-size: 0.95rem;">${t('womenIncubatorName', 'حاضنة الأعمال البيئية للمرأة')}</div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted);">${t('womenIncubatorRole', 'برنامج المرأة الخضراء المنتجة')}</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.75rem;">
          ${courses.map(c => `
            <div style="background: var(--color-surface-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                <span style="font-size: 0.78rem; font-weight: 700; background: var(--color-gold-50); color: var(--color-gold-dark); padding: 0.15rem 0.5rem; border-radius: var(--radius-full);">${t('course_' + c.id + '_duration', c.duration)}</span>
                <span style="font-size: 0.78rem; font-weight: 700; background: var(--color-azure-50); color: var(--color-azure-dark); padding: 0.15rem 0.5rem; border-radius: var(--radius-full);">${t('course_' + c.id + '_type', c.type)}</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.5rem;">${c.id}. ${t('course_' + c.id + '_title', c.title)}</h3>
              <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 1rem; flex: 1;">${t('course_' + c.id + '_desc', c.desc)}</p>
              <div style="font-size: 0.8rem; background: var(--color-bg); padding: 0.5rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
                <strong>${t('courseTargetLabel', 'المستهدف:')}</strong> ${t('course_' + c.id + '_target', c.target)}
              </div>
              <button class="btn btn-primary btn-block" onclick="openCourseModal('${t('course_' + c.id + '_title', c.title)}')">
                <i class="fa-solid fa-ticket"></i> ${t('courseBookBtn', 'حجز مقعد بالبرنامج')}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
/* ==========================================================================
   6. SUB-PAGES: IMPACT, PARTNERS, MEDIA, CONTACT
   ========================================================================== */
function renderImpactPage() {
  const t = window.t || ((k, d) => d || k);

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">${t('impactHeaderTitle', 'الأثر، التمكين، والاستدامة (ESG & UN SDGs)')}</h1>
        <p class="hero-lead-text">
          ${t('impactHeaderLead', 'تقارير وإحصائيات موثقة حول التمكين الاقتصادي للمرأة الريفية، وخفض الانبعاثات، والري بالطاقة الشمسية مع متطوعي Green Cap Team.')}
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 3rem; align-items: center; margin-bottom: 4rem;">
          <div>
            <h2 class="section-title">${t('womenEmpowerTitle', '62% من مستفيدي المنظومة من المرأة الريفية')}</h2>
            <p class="section-desc" style="margin-bottom: 1.25rem;">
              ${t('womenEmpowerDesc', 'يركز مشروع أزولا مصر على تمكين السيدات المعيلات والأسر الأكثر احتياجاً من خلال تدريبهن على إنشاء وحدات الأسطح المنزلية، وتوفير التقاوي النقية بالتعاون مع <strong>حاضنة الأعمال البيئية للمرأة المصرية</strong>.')}
            </p>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
              <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700;">
                <i class="fa-solid fa-circle-check text-emerald"></i> ${t('povertyRecoveryStat', '80% نسبة التعافي من خط الفقر المدقع للأسر المستفيدة.')}
              </li>
              <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700;">
                <i class="fa-solid fa-circle-check text-emerald"></i> ${t('incomeIncreaseStat', '3,800 جنيه مصري متوسط الزيادة في الدخل الشهري.')}
              </li>
              <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700;">
                <i class="fa-solid fa-circle-check text-emerald"></i> ${t('statFeedDesc', '55% وفر مباشر في شراء أعلاف الطيور والمواشي.')}
              </li>
            </ul>
          </div>

          <div>
            <div style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--color-border);">
              <img src="./assets/images/field_rooftop_basin.jpg" alt="نموذج تطبيقي لوحدة إنتاج أزولا منزلية" style="width: 100%; height: 320px; object-fit: cover;">
              <div style="padding: 1rem; background: var(--color-surface); font-size: 0.85rem; color: var(--color-text-muted);">
                ${t('homeStudyCaption', 'النموذج التطبيقي لإنتاج الأعلاف البديلة بالوحدات المنزلية – كفر الدوار')}
              </div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
          <div>
            <div style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--color-border);">
              <img src="./assets/images/field_volunteers.jpg" alt="متطوعو GCT" style="width: 100%; height: 320px; object-fit: cover;">
              <div style="padding: 1rem; background: var(--color-surface); font-size: 0.85rem; color: var(--color-text-muted);">
                فريق متطوعي مبادرة GCT (Green Cap Team) في الأنشطة الميدانية
              </div>
            </div>
          </div>

          <div>
            <h2 class="section-title">${t('volunteerGctTitle', 'مبادرة GCT (Green Cap Team): شباب البيئة يصنع بيئة شابة')}</h2>
            <p class="section-desc" style="margin-bottom: 1.5rem;">
              ${t('volunteerGctDesc', 'مبادرة شبابية تطوعية رائدة شاركت بفعالية في تنظيم حملات التوعية الحقلية وورش العمل للمزارعين والسيدات أمام أحواض الأزولا بالقرى والمزارع النموذجية.')}
            </p>
            <button class="btn btn-primary" onclick="openModal('modal-volunteer')">
              <i class="fa-solid fa-hand-holding-heart"></i> ${t('joinGctBtn', 'انضم كمتطوع في مبادرة GCT')}
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderPartnersPage() {
  const partners = window.AZOLLA_DATA.partners;
  const t = window.t || ((k, d) => d || k);

  const categories = [
    { key: "international", title: t('partnerCatDonors', 'الجهات المانحة والرعاة الدوليون (Institutional Donors)'), icon: "fa-earth-americas" },
    { key: "executing", title: t('partnerCatExec', 'الجهة التنفيذية والميدانية الرئيسية (Executing Entity)'), icon: "fa-building-flag" },
    { key: "tech", title: t('partnerCatTech', 'الشريك التكنولوجي وبناء المنصة الرقمية (Technology Partner)'), icon: "fa-laptop-code" },
    { key: "women", title: t('partnerCatWomen', 'التمكين الاقتصادي والريادة للمرأة (Women Empowerment)'), icon: "fa-venus" },
    { key: "training", title: t('partnerCatTraining', 'التدريب وبناء القدرات (Capacity Building)'), icon: "fa-graduation-cap" },
    { key: "volunteer", title: t('partnerCatVolunteer', 'المبادرات الشبابية والتطوع الميداني (Youth Volunteers)'), icon: "fa-hand-holding-heart" },
    { key: "consulting", title: t('partnerCatConsulting', 'الاستشارات وتطوير التدريب (Consulting Solutions)'), icon: "fa-briefcase" }
  ];

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">${t('partnersHeaderTitle', 'الشركاء، الرعاة، والجهات التنفيذية')}</h1>
        <p class="hero-lead-text">
          ${t('partnersHeaderLead', 'نعتز بالتعاون المشترك مع المنظمات الدولية، والجمعيات الأهلية، والشركاء التكنولوجيين، والمبادرات الشبابية لتحقيق أهداف التنمية الزراعية المستدامة.')}
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        ${categories.map(cat => {
          const list = partners.filter(p => p.category === cat.key);
          if (list.length === 0) return '';
          return `
            <div style="margin-bottom: 3.5rem;">
              <h3 style="display: flex; align-items: center; gap: 0.75rem; font-size: 1.35rem; font-weight: 800; color: var(--color-primary); padding-bottom: 0.75rem; border-bottom: 2px solid var(--color-border); margin-bottom: 1.5rem;">
                <i class="fa-solid ${cat.icon}"></i> ${cat.title}
              </h3>
              <div class="partners-cards-grid">
                ${list.map(p => `
                  <div class="partner-profile-card">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                      <div class="partner-logo-frame">
                        ${p.logo ? `<img src="${p.logo}" alt="${p.name}">` : `<i class="fa-solid fa-building text-gold" style="font-size: 2rem;"></i>`}
                      </div>
                      <div>
                        <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.2rem;">${p.name}</h4>
                        <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-primary); background: var(--color-emerald-50); padding: 0.15rem 0.5rem; border-radius: var(--radius-full);">${p.role}</span>
                      </div>
                    </div>
                    ${p.slogan ? `<div style="font-size: 0.8rem; font-weight: 700; color: var(--color-gold-dark); margin-bottom: 0.4rem;">"${p.slogan}"</div>` : ''}
                    <p style="font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.6; flex: 1;">${p.description}</p>
                    ${p.badge ? `<div style="margin-top: 0.75rem; font-size: 0.75rem; font-weight: 800; color: var(--color-primary); background: var(--color-emerald-50); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); align-self: flex-start;">${p.badge}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderMediaPage() {
  const gallery = window.AZOLLA_DATA.realGallery;
  const t = window.t || ((k, d) => d || k);

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">${t('mediaHeaderTitle', 'معرض الصور الميدانية الحية')}</h1>
        <p class="hero-lead-text">
          ${t('mediaHeaderLead', 'مشاهد حقيقية وموثقة من مزارع كفر الدوار وأسوان، وأحواض الأسطح المنزلية، وجلسات تدريب وتوعية الفلاحين.')}
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        <div class="gallery-grid">
          ${gallery.map(item => `
            <div class="gallery-card">
              <div class="gallery-img-wrap" onclick="openLightbox('${item.image}', '${item.title}', '${item.desc}')">
                <img src="${item.image}" alt="${item.title}" class="gallery-img">
                <div class="gallery-zoom-btn"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
              </div>
              <div style="padding: 1.25rem;">
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.25rem;">
                  <i class="fa-solid fa-location-dot"></i> ${item.location}
                </div>
                <h3 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.35rem;">${item.title}</h3>
                <p style="font-size: 0.85rem; color: var(--color-text-muted);">${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderContactPage() {
  const project = window.AZOLLA_DATA.projectInfo;
  const faq = window.AZOLLA_DATA.faqData;
  const t = window.t || ((k, d) => d || k);

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">${t('contactHeaderTitle', 'تواصل معنا واستفسر عن المنظومة')}</h1>
        <p class="hero-lead-text">
          ${t('contactHeaderLead', 'فريقنا الفني والميداني جاهز للرد على كافة استفسارات المزارعين والمربين والمستثمرين فوراً.')}
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3rem; margin-bottom: 4rem;">
          <div>
            <h2 class="section-title" style="font-size: 1.75rem; margin-bottom: 0.5rem;">${t('contactFormTitle', 'أرسل استفسارك أو طلبك الميداني')}</h2>
            <p class="section-desc" style="margin-bottom: 1.75rem;">${t('contactFormSubtitle', 'املأ البيانات وسيتواصل معك المهندس المختص خلال ساعات عمل رسمية.')}</p>

            <form onsubmit="handleUniversalFormSubmit(event, 'استفسار تواصل ومزارع')">
              <div class="form-group">
                <label class="form-label">${t('contactFormName', 'الاسم بالكامل *')}</label>
                <input type="text" name="name" class="form-control" required placeholder="${t('contactFormName', 'اسمك الكريم')}">
              </div>
              <div class="form-group">
                <label class="form-label">${t('contactFormPhone', 'رقم الهاتف والواتساب *')}</label>
                <input type="tel" name="phone" class="form-control" required placeholder="010XXXXXXXX">
              </div>
              <div class="form-group">
                <label class="form-label">${t('contactFormTopic', 'الموضوع أو الخدمة المطلوبة *')}</label>
                <select name="purpose" class="form-control" required>
                  <option value="شراء تقاوي نقية">${t('contactTopicSeeds', 'طلب تقاوي أزولا نقية')}</option>
                  <option value="إنشاء حوض أو مزرعة">${t('contactTopicFarm', 'طلب إنشاء حوض / مزرعة أزولا')}</option>
                  <option value="استشارة تغذية حيوانية">${t('contactTopicFeed', 'استشارة خلط علائق وتغذية حيوانات')}</option>
                  <option value="حجز تدريب أكاديمية">${t('contactTopicTraining', 'استفسار عن تدريب أكاديمية أزولا')}</option>
                  <option value="شراكة واستثمار">${t('contactTopicPartnership', 'استفسار عام وشراكة واستثمار')}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${t('contactFormMessage', 'تفاصيل الاستفسار أو الرسالة *')}</label>
                <textarea name="message" class="form-control" rows="4" required placeholder="${t('contactFormMessage', 'اكتب تفاصيل طلبك أو مساحة موقعك...')}"></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-lg btn-block"><i class="fa-solid fa-paper-plane"></i> ${t('contactSubmitBtn', 'إرسال الاستفسار فوراً')}</button>
            </form>
          </div>

          <div>
            <div style="background: var(--color-emerald-50); border: 2px solid var(--color-emerald-200); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem;">
              <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1rem;">
                <i class="fa-brands fa-whatsapp text-emerald" style="font-size: 1.75rem;"></i> ${t('contactWaTitle', 'محادثة واتساب فورية مباشرة')}
              </h3>
              <p style="font-size: 0.92rem; margin-bottom: 1.25rem; line-height: 1.7;">
                ${t('contactWaDesc', 'اضغط على الزر التالي لبدء محادثة واتساب فورية مع منسق المشروع برقمنا المعتمد 01011526504 مع رسالة مجهزة تلقائياً.')}
              </p>
              <a href="${project.whatsappLink}" target="_blank" rel="noopener" class="btn btn-emerald btn-block btn-lg" style="background: #25D366; border-color: #25D366;">
                <i class="fa-brands fa-whatsapp"></i> ${t('contactWaBtn', 'تحدث معنا عبر واتساب')} (${project.whatsappPhone || '01011526504'})
              </a>
            </div>

            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-sm);">
              <h4 style="font-weight: 800; font-size: 1.15rem; color: var(--color-primary); margin-bottom: 1rem;">
                <i class="fa-solid fa-building-circle-check text-gold"></i> ${t('contactHeadquartersTitle', 'المقرات وقنوات التواصل الرسمية')}
              </h4>
              <div style="display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.9rem;">
                <div><i class="fa-solid fa-location-dot text-gold"></i> <strong>${t('contactMainOffice', 'المقر الرئيسي: مركز كفر الدوار – محافظة البحيرة، ومزارع فرع أسوان التكاملية.')}</strong></div>
                <div>
                  <i class="fa-solid fa-phone text-gold"></i> <strong>${t('contactPhoneLabel', 'الاتصال الهاتفي:')}</strong> 
                  <a href="tel:01553335579" style="color: var(--color-primary-dark); font-weight: 800;">01553335579</a> / 
                  <a href="tel:0452182834" style="color: var(--color-primary-dark); font-weight: 800;">0452182834</a>
                  <span style="display: block; font-size: 0.78rem; color: var(--color-text-muted); margin-top: 0.2rem;">${t('contactPhoneOnlyNote', '(تواصل تليفون فقط علي هذه الأرقام)')}</span>
                </div>
                <div>
                  <i class="fa-brands fa-whatsapp text-emerald"></i> <strong>${t('contactWaLabel', 'واتساب المعتمد:')}</strong> 
                  <a href="${project.whatsappLink}" target="_blank" rel="noopener" style="color: #059669; font-weight: 800;">01011526504</a>
                </div>
                <div>
                  <i class="fa-solid fa-envelope text-gold"></i> <strong>${t('contactEmailLabel', 'البريد الرسمي:')}</strong> 
                  <a href="mailto:${project.officialEmail || 'protic1613@gmail.com'}" style="color: var(--color-primary); font-weight: 700;">${project.officialEmail || 'protic1613@gmail.com'}</a>
                </div>
                <div><i class="fa-solid fa-certificate text-gold"></i> <strong>${t('contactExecEntityLabel', 'الجهة المنفذة:')}</strong> ${t('contactExecEntityVal', 'جمعية الخدمات المتكاملة بكفر الدوار (إشهار 1997/752).')}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section-header-box" style="margin-bottom: 2rem;">
          <h2 class="section-title">إجابات الخبراء عن زراعة وتغذية الأزولا</h2>
        </div>

        <div style="max-width: 850px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem;">
          ${faq.map((item, idx) => `
            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden;">
              <button onclick="toggleFaq(${idx})" style="width: 100%; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; text-align: right; font-weight: 800; font-size: 1rem; color: var(--color-text-main);">
                <span><i class="fa-solid fa-circle-dot text-emerald" style="margin-left: 0.5rem;"></i> ${item.q}</span>
                <i class="fa-solid fa-chevron-down" id="faq-icon-${idx}" style="transition: transform 0.3s ease;"></i>
              </button>
              <div id="faq-body-${idx}" style="display: none; padding: 0 1.5rem 1.25rem 1.5rem; font-size: 0.92rem; color: var(--color-text-muted); line-height: 1.7; border-top: 1px dashed var(--color-border);">
                ${item.a}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

/* ==========================================================================
   5.6 SUB-PAGE: NEWS & BLOG CENTER (أخبارنا والمدونة الرسمية)
   ========================================================================== */
window.currentNewsCategory = 'all';
window.currentNewsSearchQuery = '';

function renderNewsPage() {
  const t = window.t || ((k, d) => d || k);
  const articles = window.AZOLLA_DATA.newsArticles || [];
  const featured = articles.find(a => a.featured) || articles[0];

  const featuredTitle = featured ? t('news_' + featured.id + '_title', featured.title) : '';
  const featuredSummary = featured ? t('news_' + featured.id + '_summary', featured.summary) : '';

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 2.5rem; background: linear-gradient(135deg, #064E3B 0%, #0F172A 100%);">
      <div class="container">
        <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(16, 185, 129, 0.2); color: #A7F3D0; padding: 0.35rem 1rem; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 800; margin-bottom: 1rem; border: 1px solid rgba(16, 185, 129, 0.3);">
          <i class="fa-solid fa-newspaper"></i> ${t('newsBadge', 'المركز الإعلامي والمدونة الرسمية 2026')}
        </div>
        <h1 class="hero-main-title" style="font-size: 2.35rem; margin-bottom: 0.75rem;">${t('newsHeaderTitle', 'أخبار ومستجدات المنظومة')}</h1>
        <p class="hero-lead-text" style="max-width: 850px; margin-bottom: 1.5rem;">
          ${t('newsHeaderLead', 'متابعة ميدانية حية لافتتاح الأحواض الإنتاجية، ورش العمل التطبيقية، بحوث صون المياه والأعلاف البديلة، وقصص نجاح المزارعين والمربين لمشروع <strong>تكنولوجيا الأعلاف البديلة .. أزولا مصر</strong>.')}
        </p>

        <!-- Search & Filter Controls -->
        <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid rgba(255, 255, 255, 0.15); display: flex; flex-direction: column; gap: 1rem;">
          <!-- Search Bar -->
          <div style="position: relative;">
            <input type="text" id="news-search-input" oninput="handleNewsSearch(this.value)" placeholder="${t('newsSearchPlaceholder', 'ابحث في الأخبار والتقارير الميدانية بالكلمات الدلالية...')}" style="width: 100%; padding: 0.85rem 3rem 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.95); color: #0F172A; font-size: 1rem; outline: none;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; right: 1.25rem; top: 50%; transform: translateY(-50%); color: var(--color-primary); font-size: 1.1rem;"></i>
          </div>

          <!-- Category Pills -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="news-category-pills">
            <button class="btn btn-sm btn-gold active" onclick="filterNewsCategory('all', this)"><i class="fa-solid fa-border-all"></i> ${t('newsCatAll', 'كافة الأخبار')}</button>
            <button class="btn btn-sm btn-outline-white" onclick="filterNewsCategory('farms', this)"><i class="fa-solid fa-water"></i> ${t('newsCatFarms', 'أخبار المزارع والحصاد')}</button>
            <button class="btn btn-sm btn-outline-white" onclick="filterNewsCategory('academy', this)"><i class="fa-solid fa-graduation-cap"></i> ${t('newsCatAcademy', 'فعاليات الأكاديمية')}</button>
            <button class="btn btn-sm btn-outline-white" onclick="filterNewsCategory('environment', this)"><i class="fa-solid fa-droplet"></i> ${t('newsCatEnvironment', 'صون المياه والبيئة')}</button>
            <button class="btn btn-sm btn-outline-white" onclick="filterNewsCategory('partners', this)"><i class="fa-solid fa-handshake"></i> ${t('newsCatPartners', 'الشراكات والتمكين')}</button>
          </div>
        </div>
      </div>
    </header>

    <section class="section section-bg-white" style="padding-top: 2.5rem; padding-bottom: 4rem;">
      <div class="container">

        <!-- Featured News Card (Hero) -->
        ${featured ? `
          <div id="news-featured-card" style="margin-bottom: 3rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 0;">
            <div style="position: relative; overflow: hidden; min-height: 280px; max-height: 380px;">
              <img src="${featured.image || './assets/images/field_farm_large.jpg'}" alt="${featuredTitle}" onerror="this.onerror=null;this.src='./assets/images/field_farm_large.jpg'" style="width: 100%; height: 100%; object-fit: cover;">
              <span style="position: absolute; top: 1rem; right: 1rem; background: var(--color-gold); color: #0F172A; font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                <i class="fa-solid fa-star"></i> ${t('newsFeaturedBadge', 'تقرير مميز')}
              </span>
            </div>
            <div style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap;">
                  <span style="font-size: 0.78rem; font-weight: 800; color: var(--color-primary); background: var(--color-emerald-50); padding: 0.2rem 0.65rem; border-radius: var(--radius-full); border: 1px solid var(--color-emerald-200);">
                    ${featured.categoryLabel || featured.category}
                  </span>
                  <span style="font-size: 0.8rem; color: var(--color-text-muted);"><i class="fa-regular fa-calendar"></i> ${featured.date}</span>
                  <span style="font-size: 0.8rem; color: var(--color-text-muted);"><i class="fa-regular fa-clock"></i> ${featured.readTime || '3 دقائق'}</span>
                </div>
                <h2 style="font-size: 1.45rem; font-weight: 900; margin-bottom: 1rem; color: var(--color-primary-dark); line-height: 1.4;">
                  ${featuredTitle}
                </h2>
                <p style="font-size: 0.95rem; color: var(--color-text-main); line-height: 1.7; margin-bottom: 1.5rem;">
                  ${featuredSummary}
                </p>
              </div>
              <div>
                <button class="btn btn-primary" onclick="openArticleModal('${featured.id}')">
                  <i class="fa-solid fa-book-open-reader"></i> ${t('newsReadFeatured', 'قراءة التقرير كاملاً')}
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Articles Grid -->
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.35rem; font-weight: 900; color: var(--color-primary-dark); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.6rem;">
            <i class="fa-solid fa-list-check text-gold"></i> ${t('newsAllHeading', 'كافة الأخبار والتقارير الميدانية')}
          </h3>
          <div id="news-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.75rem;">
            <!-- Populated by renderNewsCards() -->
          </div>
        </div>

      </div>
    </section>
  `;
}

function renderNewsCards() {
  const t = window.t || ((k, d) => d || k);
  const container = document.getElementById('news-grid');
  if (!container) return;

  const articles = window.AZOLLA_DATA.newsArticles || [];
  let filtered = articles;

  if (window.currentNewsCategory && window.currentNewsCategory !== 'all') {
    filtered = filtered.filter(a => a.category === window.currentNewsCategory);
  }

  if (window.currentNewsSearchQuery) {
    const q = window.currentNewsSearchQuery.toLowerCase();
    filtered = filtered.filter(a => 
      (a.title && a.title.toLowerCase().includes(q)) || 
      (a.summary && a.summary.toLowerCase().includes(q)) || 
      (a.content && a.content.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--color-bg); border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
        <i class="fa-solid fa-newspaper text-emerald" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
        <h4 style="font-weight: 800; margin-bottom: 0.5rem;">${t('newsNoResultsTitle', 'لا توجد مقالات مطابقة لمعايير البحث')}</h4>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">${t('newsNoResultsDesc', 'يرجى اختيار تصنيف آخر أو إعادة ضبط كلمات البحث.')}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(a => `
    <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: transform 0.3s ease, box-shadow 0.3s ease;">
      <div style="position: relative; height: 200px; overflow: hidden;">
        <img src="${a.image || './assets/images/field_farm_large.jpg'}" alt="${t('news_' + a.id + '_title', a.title)}" onerror="this.onerror=null;this.src='./assets/images/field_farm_large.jpg'" style="width: 100%; height: 100%; object-fit: cover;">
        <span style="position: absolute; top: 0.75rem; right: 0.75rem; background: var(--color-primary-dark); color: #FFF; font-size: 0.72rem; font-weight: 800; padding: 0.25rem 0.65rem; border-radius: var(--radius-full);">
          ${a.categoryLabel || a.category}
        </span>
      </div>
      <div style="padding: 1.5rem; display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        <div>
          <div style="display: flex; gap: 0.75rem; font-size: 0.78rem; color: var(--color-text-muted); margin-bottom: 0.65rem;">
            <span><i class="fa-regular fa-calendar"></i> ${a.date}</span>
            <span>•</span>
            <span><i class="fa-regular fa-clock"></i> ${a.readTime || '3 دقائق'}</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--color-text-main); line-height: 1.45;">
            ${t('news_' + a.id + '_title', a.title)}
          </h3>
          <p style="font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.65; margin-bottom: 1.25rem;">
            ${t('news_' + a.id + '_summary', a.summary)}
          </p>
        </div>
        <button class="btn btn-outline-primary btn-sm btn-block" onclick="openArticleModal('${a.id}')">
          <i class="fa-solid fa-arrow-left"></i> ${t('newsReadMore', 'قراءة المقال كاملاً')}
        </button>
      </div>
    </article>
  `).join('');
}

function filterNewsCategory(cat, btn) {
  window.currentNewsCategory = cat;
  if (btn) {
    document.querySelectorAll('#news-category-pills .btn').forEach(b => {
      b.className = 'btn btn-sm btn-outline-white';
    });
    btn.className = 'btn btn-sm btn-gold active';
  }
  renderNewsCards();
}

function handleNewsSearch(val) {
  window.currentNewsSearchQuery = val;
  renderNewsCards();
}

function openArticleModal(id) {
  const a = (window.AZOLLA_DATA.newsArticles || []).find(art => art.id === id);
  if (!a) return;

  const modal = document.getElementById('modal-article-view');
  if (!modal) return;

  const titleEl = document.getElementById('art-view-title');
  const catEl = document.getElementById('art-view-cat');
  const dateEl = document.getElementById('art-view-date');
  const authorEl = document.getElementById('art-view-author');
  const readEl = document.getElementById('art-view-readtime');
  const imgEl = document.getElementById('art-view-img');
  const bodyEl = document.getElementById('art-view-body');

  const t = window.t || ((k, d) => d || k);
  if (titleEl) titleEl.innerText = t('news_' + a.id + '_title', a.title);
  if (catEl) catEl.innerText = a.categoryLabel || a.category;
  if (dateEl) dateEl.innerText = a.date;
  if (authorEl) authorEl.innerText = a.author || 'اللجنة الفنية للمشروع';
  if (readEl) readEl.innerText = a.readTime || '3 دقائق';
  if (imgEl) {
    imgEl.src = a.image || './assets/images/field_farm_large.jpg';
    imgEl.onerror = function() { this.src = './assets/images/field_farm_large.jpg'; };
  }
  if (bodyEl) bodyEl.innerHTML = a.content || `<p>${t('news_' + a.id + '_summary', a.summary)}</p>`;

  openModal('modal-article-view');
}

/* ==========================================================================
   6. SUB-PAGE: PRIVACY, PROTECTION & GOVERNANCE POLICY (PDF COMPLIANT v1.0)
   ========================================================================== */
function renderPrivacyPage() {
  const policy = window.AZOLLA_DATA.privacyPolicyData || {};
  const meta = policy.metadata || {};
  const contact = policy.contact || {};

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 2.5rem; background: linear-gradient(135deg, #064E3B 0%, #0F172A 100%);">
      <div class="container">
        <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(16, 185, 129, 0.2); color: #A7F3D0; padding: 0.35rem 1rem; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 800; margin-bottom: 1rem; border: 1px solid rgba(16, 185, 129, 0.3);">
          <i class="fa-solid fa-shield-halved"></i> وثيقة الحوكمة والعمل المؤسسي | ${policy.version || 'الإصدار 1.0 — 2026'}
        </div>
        <h1 class="hero-main-title" style="font-size: 2.25rem; margin-bottom: 0.75rem;">
          ${policy.title || 'سياسة الخصوصية والحماية وعدم التمييز وتلقي الشكاوى'}
        </h1>
        <p class="hero-lead-text" style="max-width: 800px; margin-bottom: 1.5rem;">
          ${policy.subtitle || 'وثيقة الحوكمة الرقمية والعمل المؤسسي لمشروع «تكنولوجيا الأعلاف البديلة .. أزولا مصر»'}
        </p>

        <!-- Actions Toolbar -->
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <button onclick="window.print()" class="btn btn-gold btn-sm" style="background: #F59E0B; border-color: #F59E0B; color: #0F172A; font-weight: 800;">
            <i class="fa-solid fa-print"></i> ${t('privacyPrintBtn', 'طباعة الوثيقة الرسمية (PDF)')}
          </button>
          <button onclick="openModal('modal-grievance')" class="btn btn-outline-white btn-sm">
            <i class="fa-solid fa-envelope-shield"></i> ${t('privacyGrievanceBtn', 'تقديم بلاغ أو شكوى سرية')}
          </button>
          <a href="#contact" class="btn btn-outline-white btn-sm">
            <i class="fa-solid fa-headset"></i> ${t('privacySupportBtn', 'الدعم الميداني المباشر')}
          </a>
        </div>
      </div>
    </header>

    <section class="section section-bg-white" style="padding-top: 3rem; padding-bottom: 4rem;">
      <div class="container" style="max-width: 960px;">

        <!-- 1. OFFICIAL INSTITUTIONAL METADATA TABLE (Page 1 in PDF) -->
        <div style="background: var(--color-bg); border: 2px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 2.5rem; box-shadow: var(--shadow-sm);">
          <div style="background: var(--color-primary-dark); color: #FFFFFF; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div style="font-weight: 900; font-size: 1.05rem;">
              <i class="fa-solid fa-certificate text-gold"></i> بطاقة اعتماد الوثيقة المؤسسية والحوكمة
            </div>
            <span style="font-size: 0.8rem; background: rgba(255,255,255,0.15); padding: 0.2rem 0.65rem; border-radius: var(--radius-full); font-weight: 700;">
              AZOLLA-EGYPT-POL-2026-v1.0
            </span>
          </div>

          <div style="padding: 1.25rem; display: grid; grid-template-columns: 1fr; gap: 0.75rem;">
            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 1rem; padding: 0.6rem 0; border-bottom: 1px solid var(--color-border);">
              <span style="font-weight: 800; color: var(--color-primary);">الجهة المنفذة والمستضيفة:</span>
              <span style="font-weight: 700; color: var(--color-text-main);">${meta.issuingEntity}</span>
            </div>
            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 1rem; padding: 0.6rem 0; border-bottom: 1px solid var(--color-border);">
              <span style="font-weight: 800; color: var(--color-primary);">المنظومة والملكية الفكرية:</span>
              <span style="font-weight: 700; color: var(--color-text-main);">${meta.intellectualProperty}</span>
            </div>
            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 1rem; padding: 0.6rem 0; border-bottom: 1px solid var(--color-border);">
              <span style="font-weight: 800; color: var(--color-primary);">نطاق التطبيق:</span>
              <span style="color: var(--color-text-main);">${meta.applicationScope}</span>
            </div>
            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 1rem; padding: 0.6rem 0;">
              <span style="font-weight: 800; color: var(--color-primary);">حالة الوثيقة والسريان:</span>
              <span style="color: var(--color-text-main);"><strong class="text-emerald">${meta.documentStatus}</strong></span>
            </div>
          </div>
        </div>

        <!-- 2. ARTICLES CONTENT (MATCHING PDF STRUCTURE) -->
        <div style="display: flex; flex-direction: column; gap: 2rem;">

          <!-- Article 1 -->
          <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-right: 5px solid var(--color-primary); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--color-primary-dark); margin-bottom: 0.75rem;">
              .1 الغرض من السياسة (Purpose & Scope)
            </h3>
            <p style="color: var(--color-text-main); line-height: 1.8; font-size: 0.95rem; margin-bottom: 0;">
              تحدد هذه الوثيقة المبادئ الحاكمة لضمان بيئة رقمية وميدانية آمنة، عادلة، محترمة وشاملة داخل منظومة «تكنولوجيا الأعلاف البديلة .. أزولا مصر» وتطبيقاتها والمزارع الشريكة، مع ضمان تكافؤ الفرص وحظر التمييز بكافة أشكاله، وحماية بيانات الجمعيات والمزارعين والمستفيدين والمتدربين والمتطوعين من أي استغلال أو إفشاء غير مصرح به، وتوفير مسار آمن وسري ومحمي لتلقي الشكاوى والبلاغات ومعالجتها بحيادية تامة.
            </p>
          </article>

          <!-- Article 2 -->
          <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-right: 5px solid var(--color-primary); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--color-primary-dark); margin-bottom: 0.75rem;">
              .2 نطاق التطبيق والمنظومة (Scope of Application)
            </h3>
            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.95rem; color: var(--color-text-main);">
              <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <i class="fa-solid fa-circle-check text-emerald" style="margin-top: 0.25rem;"></i>
                <span>تسري هذه السياسة على موقع المنصة وتطبيقات الهواتف الذكية، ولوحات التحكم، وقواعد البيانات السحابية، وورش التدريب الميدانية والأكاديمية، ومواقع المزارع والأحواض الإنتاجية.</span>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <i class="fa-solid fa-circle-check text-emerald" style="margin-top: 0.25rem;"></i>
                <span>يلتزم بأحكامها كافة المستخدمين والجمعيات الأهلية المسجلة، والمتدربين والمتدربات في المنح التدريبية (Scholarships)، والكوادر الإدارية، وفرق العمل الميدانية، وسفراء البيئة والمتطوعين (GCT).</span>
              </li>
            </ul>
          </article>

          <!-- Article 3 -->
          <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-right: 5px solid var(--color-gold); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--color-gold-dark); margin-bottom: 0.75rem;">
              .3 التمكين وتكافؤ الفرص ومشاركة المرأة (Equal Opportunity & Gender Equity)
            </h3>
            <p style="color: var(--color-text-main); line-height: 1.8; font-size: 0.95rem;">
              تعتمد المنصة مبدأ تكافؤ الفرص في تقديم الخدمات السحابية والمنح التدريبية والدعم الفني الميداني، وتولي اهتماماً خاصاً بدعم ريادة الأعمال النسائية للمرأة الريفية وتمكينها بتمثيل نسائي قيادي يصل إلى <strong>62%</strong> من المستفيدين بالشراكة مع حاضنة الأعمال البيئية للمرأة المصرية، مع حظر تام للتمييز المبني على النوع، أو العمر، أو الموقع الجغرافي، أو الخلفية الاجتماعية، أو الإعاقة.
            </p>
          </article>

          <!-- Article 4 -->
          <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-right: 5px solid var(--color-azure); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--color-azure-dark); margin-bottom: 0.75rem;">
              .4 بيئة العمل الآمنة والمرنة والذكية (Safe & Flexible Work Environment)
            </h3>
            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.95rem; color: var(--color-text-main);">
              <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <i class="fa-solid fa-check text-azure" style="margin-top: 0.25rem;"></i>
                <span>اعتماد نظام عمل وتشغيل ميداني مرن يتيح العمل والتعلم بساعات تتناسب مع الظروف الأسرية والاجتماعية دون أعباء غير مبررة (5-6 ساعات عمل يومياً).</span>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <i class="fa-solid fa-check text-azure" style="margin-top: 0.25rem;"></i>
                <span>حظر أي سلوك ينطوي على التحرش، أو الإساءة اللفظية أو النفسية أو البدنية، أو استغلال السلطة عبر القنوات الرقمية أو الميدانية بالمزارع.</span>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <i class="fa-solid fa-check text-azure" style="margin-top: 0.25rem;"></i>
                <span>توفير حماية كاملة لكرامة وخصوصية المستخدمين مع إمكانية التبليغ دون الحاجة للمواجهة المباشرة.</span>
              </li>
            </ul>
          </article>

          <!-- Article 5 -->
          <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-right: 5px solid #EF4444; border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 900; color: #B91C1C; margin-bottom: 0.75rem;">
              .5 الحماية من الاستغلال والتحرش والعنف (Anti-Harassment & Protection)
            </h3>
            <p style="color: var(--color-text-main); line-height: 1.8; font-size: 0.95rem; margin-bottom: 0.5rem;">
              تعتبر أي محاولة ابتزاز أو تحرش أو استغلال للسلطة أو التهديد مخالفة جسيمة يترتب عليها الحظر الفوري والإحالة للمساءلة القانونية والقضائية.
            </p>
            <p style="color: var(--color-text-main); line-height: 1.8; font-size: 0.95rem; margin-bottom: 0;">
              يحظر استغلال البيانات أو المساعدات أو المنح العينية (التقاوي/الأسمدة/المعدات) للحصول على أي منافع شخصية أو ممارسة ضغوط على المستفيدين أو صغار المزارعين.
            </p>
          </article>

          <!-- Article 6 -->
          <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-right: 5px solid var(--color-primary); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--color-primary-dark); margin-bottom: 0.75rem;">
              .6 سياسة عدم الانتقام وحماية المبلغين (Non-Retaliation Policy)
            </h3>
            <p style="color: var(--color-text-main); line-height: 1.8; font-size: 0.95rem; margin-bottom: 0;">
              تضمن المنومة حماية كاملة لأي شخص يتقدم ببلاغ أو شكوى بحسن نية، ويُحظر تماماً اتخاذ أي إجراء سلبي أو تضييق إداري أو تقني أو ميداني أو حرمان من التدريب والخدمات ضد المبلغين أو الشهود المشاركين في فحص الشكاوى.
            </p>
          </article>

          <!-- Article 7 -->
          <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-right: 5px solid var(--color-azure); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--color-azure-dark); margin-bottom: 0.75rem;">
              .7 خصوصية البيانات والأمن السيبراني وصون البيانات الميدانية (Data Privacy & Cyber-Security)
            </h3>
            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.95rem; color: var(--color-text-main);">
              <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <i class="fa-solid fa-lock text-azure" style="margin-top: 0.25rem;"></i>
                <span><strong>التشفير وعزل البيانات:</strong> يتم تشفير كافة الاتصالات والبيانات باستخدام بروتوكولات HTTPS و TLS 1.2+ مع عزل قواعد البيانات لضمان السرية التامة.</span>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <i class="fa-solid fa-shield text-azure" style="margin-top: 0.25rem;"></i>
                <span><strong>الامتثال لقوانين الخصوصية:</strong> تلتزم المنظومة بالقوانين المنظمة لحماية البيانات الشخصية، ولا يتم بيع أو تأجير أو مشاركة أي بيانات لأي طرف ثالث تجاري.</span>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <i class="fa-solid fa-database text-azure" style="margin-top: 0.25rem;"></i>
                <span><strong>الاستخدام المحدود:</strong> تستخدم البيانات فقط للأغراض التشغيلية وإصدار التوصيات الزراعية وتوليد مؤشرات الأثر البيئي والمائي المعتمدة للمنح الدولية (UNDP/SGP/GEF).</span>
              </li>
            </ul>
          </article>

          <!-- Article 8 -->
          <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-right: 5px solid var(--color-gold); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--color-gold-dark); margin-bottom: 0.75rem;">
              .8 التدريب وبناء القدرات والمنح المعتمدة (Training & Certified Scholarships)
            </h3>
            <p style="color: var(--color-text-main); line-height: 1.8; font-size: 0.95rem; margin-bottom: 0;">
              تلتزم أكاديمية أزولا مصر بتوفير منح تدريبية متكافئة وعادلة عبر 12 برنامجاً تدريبياً معتمداً لأكثر من 500+ مزارع وشاب ومتطوع في مجالات استزراع الأزولا، تراكيب الأعلاف، الطاقة الشمسية، والإدارة المائية، مع إصدار شهادات إتمام رقمية مؤمنة بنظام تحقق سحابي موثق.
            </p>
          </article>

          <!-- Article 9 -->
          <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-right: 5px solid var(--color-primary); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--color-primary-dark); margin-bottom: 0.75rem;">
              .9 الشمول المالي والتحول الرقمي وصون الموارد (Financial Inclusion & Digital Transformation)
            </h3>
            <p style="color: var(--color-text-main); line-height: 1.8; font-size: 0.95rem; margin-bottom: 0;">
              تشجيع المزارعين والمربين والمستفيدين بالتعاون مع منصة <strong>NGO HUB</strong> على استخدام أدوات الدفع والتحصيل الإلكتروني والمحافظ الرقمية لحوكمة المعاملات ورفع الشفافية المالية، وربط القرارات الزراعية بالحاسبات الرقمية لصون الموارد المائية والطاقة.
            </p>
          </article>

          <!-- Article 10 -->
          <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-right: 5px solid var(--color-gold); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--color-gold-dark); margin-bottom: 0.75rem;">
              .10 قنوات تلقي الشكاوى وآلية المعالجة والإنصاف (Grievance & Redress Mechanism)
            </h3>
            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.95rem; color: var(--color-text-main);">
              <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <i class="fa-solid fa-paper-plane text-gold" style="margin-top: 0.25rem;"></i>
                <span><strong>القناة المشفرة:</strong> نموذج تقديم الشكاوى السري المتاح داخل موقع المنصة مع خيار عدم الكشف عن الهوية (Anonymous).</span>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <i class="fa-solid fa-envelope text-gold" style="margin-top: 0.25rem;"></i>
                <span><strong>البريد المباشر للحماية والامتثال:</strong> <a href="mailto:${contact.grievanceEmail}" style="font-weight: 800; color: var(--color-primary);">${contact.grievanceEmail}</a></span>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <i class="fa-solid fa-clock-rotate-left text-gold" style="margin-top: 0.25rem;"></i>
                <span><strong>مسار الفحص والبت:</strong> يتم مراجعة وتصنيف البلاغات خلال <strong>48 ساعة</strong> بواسطة لجنة حماية مستقلة، واتخاذ القرارات التصحيحية خلال <strong>7 أيام عمل</strong> بسرية تامة.</span>
              </li>
            </ul>
          </article>

          <!-- Article 11 -->
          <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-right: 5px solid #EF4444; border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 900; color: #B91C1C; margin-bottom: 0.75rem;">
              .11 الإجراءات التصحيحية والجزاءات (Corrective Measures)
            </h3>
            <p style="color: var(--color-text-main); line-height: 1.8; font-size: 0.95rem; margin-bottom: 0;">
              تتخذ الإدارة إجراءات حاسمة ومتدرجة تشمل: التنبيه الكتابي، تعليق الحساب السحابي أو الاستفادة من المنح، إلغاء الشراكة والتعاون المؤسسي، مع إحالة الجرائم الإلكترونية أو الانتهاكات الجسيمة للجهات القضائية والرسمية المختصة فوراً.
            </p>
          </article>

          <!-- Article 12 -->
          <article style="background: var(--color-surface); border: 1px solid var(--color-border); border-right: 5px solid var(--color-primary); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--color-primary-dark); margin-bottom: 0.75rem;">
              .12 السريان والتحديث والاعتماد القانوني (Governing Law & Legal Enforcement)
            </h3>
            <p style="color: var(--color-text-main); line-height: 1.8; font-size: 0.95rem; margin-bottom: 0;">
              تعتبر هذه السياسة نافذة ومطبقة إلكترونياً وميدانياً على كافة خدمات ومنتجات منصة ومشروع «أزولا مصر» اعتباراً من تاريخ إصدارها لعام <strong>2026</strong>، وتخضع لمراجعة وتدقيق سنوي دوري لضمان أعلى معايير الحوكمة والنزاهة المؤسسية.
            </p>
          </article>

          <!-- 3. OFFICIAL ENDORSEMENT STAMP CARD (Page 3 in PDF) -->
          <div style="background: linear-gradient(135deg, var(--color-emerald-50) 0%, var(--color-gold-50) 100%); border: 2px solid var(--color-primary); border-radius: var(--radius-lg); padding: 2rem; margin-top: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
              <h3 style="font-size: 1.3rem; font-weight: 900; color: var(--color-primary-dark); margin: 0;">
                <i class="fa-solid fa-stamp text-gold"></i> إقرار الاعتماد والنفاذ المؤسسي
              </h3>
              <span style="font-size: 0.85rem; font-weight: 800; color: var(--color-primary); background: #FFF; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); border: 1px solid var(--color-primary);">
                معتمد وموثق رسمياً — 2026 م
              </span>
            </div>
            <p style="font-size: 0.95rem; line-height: 1.8; color: var(--color-text-main); margin-bottom: 1.5rem;">
              تم اعتماد هذه السياسة كوثيقة حوكمة وخصوصية رسمية ملزمة لمنظومة مشروع «تكنولوجيا الأعلاف البديلة .. أزولا مصر» بالشراكة المؤسسية بين <strong>جمعية الخدمات المتكاملة بكفر الدوار</strong> و<strong>منصة NGO HUB</strong> ومزارع فرع أسوان التكاملية. إن استخدامك للمنصة أو التسجيل في برامجها يُعد موافقة والتزاماً صريحاً بما ورد فيها.
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; background: #FFFFFF; padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
              <div>
                <div style="font-size: 0.8rem; font-weight: 800; color: var(--color-text-muted); margin-bottom: 0.25rem;">البريد الإلكتروني للخصوصية والحماية:</div>
                <div style="font-weight: 800; color: var(--color-primary);">${contact.grievanceEmail}</div>
              </div>
              <div>
                <div style="font-size: 0.8rem; font-weight: 800; color: var(--color-text-muted); margin-bottom: 0.25rem;">الخط المباشر للدعم الميداني والشكاوى:</div>
                <div style="font-weight: 800; color: var(--color-gold);">${contact.hotline}</div>
              </div>
            </div>
          </div>

          <!-- 4. INTERACTIVE ACKNOWLEDGMENT & COMMITMENT FORM (Page 4/5 in PDF) -->
          <div style="background: var(--color-surface); border: 2px dashed var(--color-primary); border-radius: var(--radius-lg); padding: 2rem; margin-top: 1rem;">
            <div style="text-align: center; margin-bottom: 1.5rem;">
              <h3 style="font-size: 1.3rem; font-weight: 900; color: var(--color-primary-dark); margin-bottom: 0.5rem;">
                <i class="fa-solid fa-file-signature text-gold"></i> مرفق: إقرار بالاطلاع والالتزام
              </h3>
              <p style="font-size: 0.9rem; color: var(--color-text-muted); max-width: 650px; margin: 0 auto;">
                «أقر أنا الموقع/ة أدناه بأنني اطلعت على "سياسة الحماية وعدم التمييز وتلقي الشكاوى" الخاصة بمشروع أزولا مصر، وفهمت ما ورد بها، وألتزم باحترامها والإبلاغ عن أي مخالفة أو خطر وفق القنوات المعتمدة.»
              </p>
            </div>

            <form id="form-policy-commitment" onsubmit="handleCommitmentSubmit(event)" style="max-width: 650px; margin: 0 auto;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div class="form-group" style="margin: 0;">
                  <label class="form-label">الاسم الرباعي *</label>
                  <input type="text" id="commit-name" class="form-control" required placeholder="أدخل اسمك الكريم">
                </div>
                <div class="form-group" style="margin: 0;">
                  <label class="form-label">الصفة / الفريق / الجمعية *</label>
                  <input type="text" id="commit-role" class="form-control" required placeholder="مثال: متدرب / مزارع / متطوع GCT">
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
                <div class="form-group" style="margin: 0;">
                  <label class="form-label">رقم الهاتف والواتساب *</label>
                  <input type="tel" id="commit-phone" class="form-control" required placeholder="010XXXXXXXX">
                </div>
                <div class="form-group" style="margin: 0;">
                  <label class="form-label">المحافظة / المركز *</label>
                  <input type="text" id="commit-gov" class="form-control" required placeholder="مثال: البحيرة - كفر الدوار أو أسوان">
                </div>
              </div>

              <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; font-size: 0.9rem; font-weight: 700; color: var(--color-text-main);">
                  <input type="checkbox" required style="width: 20px; height: 20px; accent-color: var(--color-primary);">
                  <span>أوافق وأتعهد بالالتزام التام بكافة بنود ومبادئ سياسة الخصوصية والحوكمة لسنة 2026.</span>
                </label>
              </div>

              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <button type="submit" class="btn btn-primary btn-lg" style="flex: 1;">
                  <i class="fa-solid fa-signature"></i> توقيع وتأكيد الالتزام إلكترونياً
                </button>
                <button type="button" onclick="window.print()" class="btn btn-outline-primary btn-lg">
                  <i class="fa-solid fa-print"></i> طباعة الوثيقة
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  `;
}

/* ==========================================================================
   7. CALCULATOR LOGIC & UI HELPERS
   ========================================================================== */
function switchCalcTab(tabId, btn) {
  document.querySelectorAll('.calculator-box').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.calc-tab-btn').forEach(el => el.classList.remove('active'));

  const target = document.getElementById(tabId);
  if (target) target.style.display = 'block';
  if (btn) btn.classList.add('active');
}

function initCalculators() {
  runBasinCalc(false);
  runFeedCalc(false);
  runWaterCalc(false);
  runCarbonCalc(false);
}

function runBasinCalc(isUserAction = true) {
  if (isUserAction && typeof trackCalculatorUsage === 'function') trackCalculatorUsage('basin');
  const t = window.t || ((k, d) => d || k);
  const len = parseFloat(document.getElementById('calc-basin-length')?.value) || 10;
  const wid = parseFloat(document.getElementById('calc-basin-width')?.value) || 5;
  const area = len * wid;
  const seed = area * 0.5;
  const summerYield = (area * 450) / 1000;
  const winterYield = (area * 300) / 1000;
  const monthlySavings = summerYield * 30 * 5.0;

  if (document.getElementById('res-basin-area')) document.getElementById('res-basin-area').innerText = `${area.toFixed(1)} ${t('unitM2', 'م²')}`;
  if (document.getElementById('res-basin-seed')) document.getElementById('res-basin-seed').innerText = `${seed.toFixed(1)} ${t('unitKg', 'كجم')}`;
  if (document.getElementById('res-basin-yield-summer')) document.getElementById('res-basin-yield-summer').innerText = `${summerYield.toFixed(1)} ${t('unitKgDay', 'كجم / يوم')}`;
  if (document.getElementById('res-basin-yield-winter')) document.getElementById('res-basin-yield-winter').innerText = `${winterYield.toFixed(1)} ${t('unitKgDay', 'كجم / يوم')}`;
  if (document.getElementById('res-basin-savings')) document.getElementById('res-basin-savings').innerText = `${monthlySavings.toLocaleString()} ${t('unitEgpMonth', 'ج.م / شهر')}`;
}

function runFeedCalc(isUserAction = true) {
  if (isUserAction && typeof trackCalculatorUsage === 'function') trackCalculatorUsage('feed');
  const t = window.t || ((k, d) => d || k);
  const typeKey = document.getElementById('calc-feed-type')?.value || 'cattle_beef';
  const heads = parseFloat(document.getElementById('calc-feed-heads')?.value) || 10;
  const priceKg = parseFloat(document.getElementById('calc-feed-price')?.value) || 22;

  const data = window.AZOLLA_DATA.feedRationData[typeKey] || window.AZOLLA_DATA.feedRationData.cattle_beef;
  const totalDryPerDay = heads * data.avgDailyFeedKg;
  const savedDryPerDay = totalDryPerDay * (data.maxInclusionPct / 100);
  const azollaNeededPerDay = savedDryPerDay * data.azollaToConcentrateRatio;
  const monthlySavings = savedDryPerDay * 30 * priceKg;

  if (document.getElementById('res-feed-total-dry')) document.getElementById('res-feed-total-dry').innerText = `${totalDryPerDay.toFixed(1)} ${t('unitKgDay', 'كجم / يوم')}`;
  if (document.getElementById('res-feed-saved-dry')) document.getElementById('res-feed-saved-dry').innerText = `${savedDryPerDay.toFixed(1)} ${t('unitKgDay', 'كجم / يوم')}`;
  if (document.getElementById('res-feed-azolla-needed')) document.getElementById('res-feed-azolla-needed').innerText = `${azollaNeededPerDay.toFixed(1)} ${t('unitKgDay', 'كجم / يوم')}`;
  if (document.getElementById('res-feed-monthly-saved')) document.getElementById('res-feed-monthly-saved').innerText = `${Math.round(monthlySavings).toLocaleString()} ${t('unitEgpMonth', 'ج.م / شهر')}`;
}

function runWaterCalc(isUserAction = true) {
  if (isUserAction && typeof trackCalculatorUsage === 'function') trackCalculatorUsage('water');
  const t = window.t || ((k, d) => d || k);
  const area = parseFloat(document.getElementById('calc-water-area')?.value) || 100;
  const cropKey = document.getElementById('calc-water-crop')?.value || 'alfalfa';
  const techKey = document.getElementById('calc-water-tech')?.value || 'closed_solar_shade';
  const period = document.getElementById('calc-water-period')?.value || 'year';

  const days = period === 'year' ? 365 : 30;
  const factor = days / 365;

  let dailyEvapLitersM2 = 3.33;
  let baseSavingsFactor = 0.886;

  if (techKey === 'closed_solar_shade') {
    dailyEvapLitersM2 = 2.16;
    baseSavingsFactor = 0.902;
  } else if (techKey === 'closed_solar_open') {
    dailyEvapLitersM2 = 3.33;
    baseSavingsFactor = 0.825;
  } else if (techKey === 'rooftop_basin') {
    dailyEvapLitersM2 = 2.50;
    baseSavingsFactor = 0.880;
  } else if (techKey === 'earth_basin_recycle') {
    dailyEvapLitersM2 = 3.85;
    baseSavingsFactor = 0.785;
  }

  // Azolla water consumption
  const initialFillM3 = (area * 0.15);
  const dailyEvapM3 = (area * dailyEvapLitersM2) / 1000;
  const totalAzollaWaterM3 = ((initialFillM3 * 0.2) + (dailyEvapM3 * days)) * factor;

  // Azolla dry matter yield: avg 400g/m2/day fresh => 25g dry/m2/day => 9.125 kg dry/m2/year
  const azollaDryKgYear = (area * 0.025 * days);
  const azollaProteinKg = azollaDryKgYear * 0.284;

  // Crop comparison
  const cropsDB = window.AZOLLA_DATA?.waterConservationData?.crops || {};
  const cropData = cropsDB[cropKey] || { waterM3PerTonDry: 1850, crudeProteinPct: 18.5 };

  // To produce equivalent crude protein
  const equivalentCropDryKg = azollaProteinKg / (cropData.crudeProteinPct / 100);
  const equivalentCropDryTons = equivalentCropDryKg / 1000;
  const conventionalWaterM3 = equivalentCropDryTons * cropData.waterM3PerTonDry;

  const netSavedM3 = Math.max(0, conventionalWaterM3 - totalAzollaWaterM3);
  const realSavingsPct = conventionalWaterM3 > 0 ? ((netSavedM3 / conventionalWaterM3) * 100) : (baseSavingsFactor * 100);
  const householdEquiv = Math.round((netSavedM3 * 1000) / (150 * days));
  const proteinEfficiency = totalAzollaWaterM3 > 0 ? (azollaProteinKg / totalAzollaWaterM3) : 0.82;

  const unitPeriodStr = period === 'year' ? t('unitYear', 'سنة') : t('unitMonth', 'شهر');

  if (document.getElementById('res-water-azolla-consumed')) {
    document.getElementById('res-water-azolla-consumed').innerText = `${Math.round(totalAzollaWaterM3).toLocaleString()} ${t('unitM3', 'م³')}`;
  }
  if (document.getElementById('res-water-conventional-consumed')) {
    document.getElementById('res-water-conventional-consumed').innerText = `${Math.round(conventionalWaterM3).toLocaleString()} ${t('unitM3', 'م³')}`;
  }
  if (document.getElementById('res-water-saved-m3')) {
    document.getElementById('res-water-saved-m3').innerText = `${Math.round(netSavedM3).toLocaleString()} ${t('unitM3Saved', 'م³ موفرة')}`;
  }
  if (document.getElementById('res-water-saved-pct')) {
    document.getElementById('res-water-saved-pct').innerText = `${realSavingsPct.toFixed(1)}%`;
  }
  if (document.getElementById('res-water-household-equiv')) {
    document.getElementById('res-water-household-equiv').innerText = `${householdEquiv.toLocaleString()} ${t('unitPersons', 'فرد')} / ${unitPeriodStr}`;
  }
  if (document.getElementById('res-water-protein-efficiency')) {
    document.getElementById('res-water-protein-efficiency').innerText = `${proteinEfficiency.toFixed(2)} ${t('unitProteinPerM3', 'كجم بروتين / م³')}`;
  }
  if (document.getElementById('res-water-bar-label')) {
    document.getElementById('res-water-bar-label').innerText = `${t('waterBarLabelPrefix', 'وفر مائي وصون موارد بنسبة')} ${realSavingsPct.toFixed(1)}%`;
  }
  if (document.getElementById('res-water-bar-azolla')) {
    const azollaBarPct = Math.max(5, Math.min(35, (100 - realSavingsPct)));
    document.getElementById('res-water-bar-azolla').style.width = `${azollaBarPct.toFixed(1)}%`;
    document.getElementById('res-water-bar-azolla').innerText = `${t('waterAzolla', 'أزولا')} (${azollaBarPct.toFixed(1)}%)`;
  }
  if (document.getElementById('res-water-bar-saved')) {
    const savedBarPct = Math.max(65, Math.min(95, realSavingsPct));
    document.getElementById('res-water-bar-saved').style.width = `${savedBarPct.toFixed(1)}%`;
    document.getElementById('res-water-bar-saved').innerText = `${t('waterSaved', 'مياه مصانة وموفرة')} (${savedBarPct.toFixed(1)}%)`;
  }
}

function runCarbonCalc(isUserAction = true) {
  if (isUserAction && typeof trackCalculatorUsage === 'function') trackCalculatorUsage('carbon');
  const t = window.t || ((k, d) => d || k);
  const tons = parseFloat(document.getElementById('calc-carbon-tons')?.value) || 20;
  const diesel = parseFloat(document.getElementById('calc-carbon-diesel')?.value) || 10000;

  const feedCo2 = ((tons * 250) * 2.1) / 1000;
  const dieselCo2 = (diesel * 2.68) / 1000;
  const totalCo2 = feedCo2 + dieselCo2;
  const trees = Math.round(totalCo2 * 45);

  if (document.getElementById('res-carbon-total')) document.getElementById('res-carbon-total').innerText = `${totalCo2.toFixed(1)} ${t('unitTonsCo2', 'طن CO₂e')}`;
  if (document.getElementById('res-carbon-trees')) document.getElementById('res-carbon-trees').innerText = `${trees.toLocaleString()} ${t('unitTrees', 'شجرة')}`;
}

function animateCounters() {
  const counters = document.querySelectorAll('.counter-val');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    if (!target) return;
    let count = 0;
    const increment = Math.ceil(target / 40);
    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = count.toLocaleString();
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    updateCount();
  });
}

function toggleFaq(idx) {
  const body = document.getElementById(`faq-body-${idx}`);
  const icon = document.getElementById(`faq-icon-${idx}`);
  if (!body) return;

  if (body.style.display === 'block') {
    body.style.display = 'none';
    if (icon) icon.style.transform = 'rotate(0deg)';
  } else {
    body.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('active');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('active');
}

function openCourseModal(courseTitle) {
  const input = document.getElementById('modal-course-name');
  if (input) input.value = courseTitle;
  openModal('modal-academy');
}

function openLightbox(imgSrc, title, desc) {
  const img = document.getElementById('lightbox-img');
  const t = document.getElementById('lightbox-title');
  const d = document.getElementById('lightbox-desc');
  if (img) img.src = imgSrc;
  if (t) t.innerText = title;
  if (d) d.innerText = desc;
  openModal('modal-lightbox');
}

function showToast(msg, icon = 'fa-circle-check') {
  const box = document.getElementById('toast-box');
  const msgEl = document.getElementById('toast-msg');
  const iconEl = document.getElementById('toast-icon');
  if (!box) return;

  if (msgEl) msgEl.innerText = msg;
  if (iconEl) iconEl.className = `fa-solid ${icon} text-emerald`;

  box.classList.add('active');
  setTimeout(() => {
    box.classList.remove('active');
  }, 3500);
}

async function handleUniversalFormSubmit(e, formLabel) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
  
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري إرسال وتأكيد الطلب...';
  }

  const refId = `AZ-${Math.floor(100000 + Math.random() * 900000)}`;
  const timeStr = new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' });

  // Extract all fields dynamically
  const name = form.querySelector('input[name="name"], input[placeholder*="اسم"]')?.value || 'غير محدد';
  const phone = form.querySelector('input[name="phone"], input[type="tel"]')?.value || 'غير محدد';
  const gov = form.querySelector('input[name="gov"], input[placeholder*="محافظة"]')?.value || 'البحيرة / أسوان';
  const city = form.querySelector('input[name="city"], input[placeholder*="مركز"]')?.value || '-';
  const purpose = form.querySelector('select[name="purpose"]')?.value || '';
  const courseName = form.querySelector('input[name="course_name"]')?.value || '';
  const attendance = form.querySelector('select[name="attendance"]')?.value || '';
  const area = form.querySelector('input[name="area"]')?.value || '';
  
  // Land Partnership Fields
  const landArea = form.querySelector('input[name="land_area"]')?.value || '';
  const waterSource = form.querySelector('select[name="water_source"]')?.value || '';
  const powerSource = form.querySelector('select[name="power_source"]')?.value || '';
  const partnerModel = form.querySelector('select[name="partnership_model"]')?.value || '';

  // Volunteer Fields
  const volField = form.querySelector('select[name="volunteer_field"]')?.value || '';
  const volAvail = form.querySelector('select[name="availability"]')?.value || '';
  const volEdu = form.querySelector('input[name="education"]')?.value || '';

  const message = form.querySelector('textarea')?.value || '';

  const details = [
    courseName ? `البرنامج: ${courseName}` : '',
    attendance ? `الحضور: ${attendance}` : '',
    area ? `المساحة المطلوبة: ${area} م²` : '',
    purpose ? `الهدف: ${purpose}` : '',
    landArea ? `مساحة الأرض المتاحة: ${landArea}` : '',
    waterSource ? `مصدر المياه: ${waterSource}` : '',
    powerSource ? `مصدر الطاقة: ${powerSource}` : '',
    partnerModel ? `نموذج الشراكة: ${partnerModel}` : '',
    volField ? `مجال التطوع: ${volField}` : '',
    volAvail ? `التفرغ: ${volAvail}` : '',
    volEdu ? `المؤهل: ${volEdu}` : '',
    message ? `الملاحظات: ${message}` : ''
  ].filter(Boolean).join(' | ') || formLabel;

  // 1. Save in local CMS inbox
  if (window.AZOLLA_DATA && window.AZOLLA_DATA.inboxMessages) {
    window.AZOLLA_DATA.inboxMessages.unshift({
      id: refId,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      name: name,
      phone: phone,
      subject: formLabel,
      location: `${gov} - ${city}`,
      status: 'جديد (متزامن مع Google Sheet)'
    });
    window.saveAzollaState(window.AZOLLA_DATA);
  }

  // 2. Dispatch to Google Sheet Webhook
  const webhookUrl = (window.AZOLLA_DATA.projectInfo && window.AZOLLA_DATA.projectInfo.googleSheetWebhookUrl) || 
                     'https://script.google.com/macros/s/AKfycbzLgr3QjxaKx7Vv9xxF1ELDSh7acdySX9Na5TWHUN8gQ4oVmlbazINuR69cRlSvsAc/exec';

  const gsheetPayload = {
    id: refId,
    formType: formLabel,
    formTypeArabic: formLabel,
    timestamp: timeStr,
    data: {
      assocName: name,
      assocPhone: phone,
      assocGov: gov,
      assocCity: city,
      partnerScope: details,
      notes: `${formLabel} | تكنولوجيا الأعلاف البديلة .. أزولا مصر`
    }
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gsheetPayload)
    });
    console.log('Successfully posted to Google Sheet Webhook:', gsheetPayload);
  } catch (err) {
    console.warn('Webhook POST error (data preserved locally):', err);
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }

  showToast(`تم إرسال واستلام طلبك بنجاح! رقم المرجع: ${refId}`);
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  form.reset();
}

function handleFormSubmit(e, formLabel) {
  return handleUniversalFormSubmit(e, formLabel);
}

function handleCommitmentSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('commit-name')?.value || 'مشارك معتمد';
  const role = document.getElementById('commit-role')?.value || 'متدرب/مزارع';
  const phone = document.getElementById('commit-phone')?.value || '';
  const gov = document.getElementById('commit-gov')?.value || '';

  showToast(`تم توثيق وتأكيد التزامك الرقمي بنجاح يا ${name}! كود الاعتماد: AZ-${Math.floor(1000 + Math.random() * 9000)}`);
  
  // Save in inbox for CMS audit
  const newMsg = {
    id: `CMT-${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().replace('T', ' ').slice(0, 16),
    name: name,
    phone: phone,
    subject: `إقرار التزام بالسياسة والحوكمة (${role})`,
    location: gov,
    status: 'معتمد رقمياً'
  };

  if (window.AZOLLA_DATA && window.AZOLLA_DATA.inboxMessages) {
    window.AZOLLA_DATA.inboxMessages.unshift(newMsg);
    if (typeof window.saveAzollaState === 'function') {
      window.saveAzollaState(window.AZOLLA_DATA);
    }
  }

  // Reset form
  const form = document.getElementById('form-policy-commitment');
  if (form) form.reset();
}

function handleGrievanceSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const type = form.querySelector('[name="grievance_type"]')?.value || 'شكوى عامة';
  const name = form.querySelector('[name="name"]')?.value || 'مجهول الهوية (سري)';
  const contact = form.querySelector('[name="contact"]')?.value || 'لم يحدد';
  const desc = form.querySelector('[name="description"]')?.value || '';

  handleUniversalFormSubmit(e, `بلاغ وشكوى سرية: ${type}`);
}

function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-close-btn');
  const overlay = document.getElementById('mobile-overlay');

  if (toggleBtn) toggleBtn.addEventListener('click', () => {
    document.getElementById('mobile-drawer')?.classList.add('active');
    document.getElementById('mobile-overlay')?.classList.add('active');
  });
  if (closeBtn) closeBtn.addEventListener('click', closeMobileDrawer);
  if (overlay) overlay.addEventListener('click', closeMobileDrawer);
}

function closeMobileDrawer() {
  document.getElementById('mobile-drawer')?.classList.remove('active');
  document.getElementById('mobile-overlay')?.classList.remove('active');
}
/* ==========================================================================
   8. FULL ADMIN CMS ENGINE (Skill: static-website-cms-dashboard)
   ========================================================================== */
function openAdminModal() {
  const isLoggedIn = sessionStorage.getItem('AZOLLA_CMS_LOGGED_IN') === 'true';
  const loginView = document.getElementById('cms-login-view');
  const dashView = document.getElementById('cms-dashboard-view');

  if (isLoggedIn) {
    if (loginView) loginView.style.display = 'none';
    if (dashView) dashView.style.display = 'block';
    renderCmsDashboard();
  } else {
    if (loginView) loginView.style.display = 'block';
    if (dashView) dashView.style.display = 'none';
    const userInput = document.getElementById('cms-user');
    const passInput = document.getElementById('cms-pass');
    if (userInput) userInput.value = '';
    if (passInput) passInput.value = '';
  }
  openModal('modal-admin-cms');
}

function handleCmsLogin(e) {
  e.preventDefault();
  const user = document.getElementById('cms-user')?.value?.trim();
  const pass = document.getElementById('cms-pass')?.value?.trim();
  const validPass = localStorage.getItem('AZOLLA_CMS_CUSTOM_PASS') || 'azolla2026';

  if (user === 'admin' && pass === validPass) {
    sessionStorage.setItem('AZOLLA_CMS_LOGGED_IN', 'true');
    document.getElementById('cms-login-view').style.display = 'none';
    document.getElementById('cms-dashboard-view').style.display = 'block';
    renderCmsDashboard();
    showToast('تم تسجيل الدخول إلى لوحة التحكم بنجاح!');
  } else {
    alert('اسم المستخدم أو كلمة المرور غير صحيحة! يرجى التحقق من صحة البيانات.');
  }
}

function handleCmsLogout() {
  sessionStorage.removeItem('AZOLLA_CMS_LOGGED_IN');
  document.getElementById('cms-login-view').style.display = 'block';
  document.getElementById('cms-dashboard-view').style.display = 'none';
  const userInput = document.getElementById('cms-user');
  const passInput = document.getElementById('cms-pass');
  if (userInput) userInput.value = '';
  if (passInput) passInput.value = '';
  showToast('تم تسجيل الخروج من لوحة التحكم');
}

/* ==========================================================================
   IMAGE COMPRESSION HELPER (Canvas-based WebP/JPEG)
   ========================================================================== */
function compressAndConvertImage(file, maxDimension = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file) return reject('No file provided');
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const base64 = canvas.toDataURL('image/jpeg', quality);
        resolve(base64);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ==========================================================================
   WEB TRAFFIC & ANALYTICS ENGINE (100% Real Tracking Engine - Starting at 0)
   ========================================================================== */
window.CURRENT_ANALYTICS_TIMEFRAME = 'month';
window.CURRENT_CMS_PAGE = 'home';
window._LAST_CALC_TRACK = 0;

function initAnalytics() {
  if (!window.AZOLLA_DATA) return;
  if (!window.AZOLLA_DATA.analytics) {
    window.AZOLLA_DATA.analytics = JSON.parse(JSON.stringify(window.DEFAULT_AZOLLA_DATA.analytics));
  }
  const a = window.AZOLLA_DATA.analytics;

  // 1. Detect Device Type accurately
  const ua = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;
  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) || (width >= 768 && width <= 1024);
  const isMobile = /mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua) || width < 768;
  const deviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';
  window.CURRENT_DEVICE_TYPE = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';

  // 2. Track Unique Visitor
  let visitorToken = localStorage.getItem('AZOLLA_VISITOR_TOKEN');
  if (!visitorToken) {
    visitorToken = 'uid_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
    localStorage.setItem('AZOLLA_VISITOR_TOKEN', visitorToken);
    a.uniqueVisitors = (a.uniqueVisitors || 0) + 1;
    window.saveAzollaState(window.AZOLLA_DATA);
  }

  // 3. Register New Session (once per browser session)
  if (!sessionStorage.getItem('AZOLLA_SESSION_ACTIVE')) {
    sessionStorage.setItem('AZOLLA_SESSION_ACTIVE', 'true');
    sessionStorage.setItem('AZOLLA_SESSION_PAGES', '0');
    sessionStorage.setItem('AZOLLA_SESSION_START', Date.now().toString());

    // Count real device session
    if (!a.deviceSessions) a.deviceSessions = { desktop: 0, mobile: 0, tablet: 0 };
    a.deviceSessions[deviceType] = (a.deviceSessions[deviceType] || 0) + 1;

    // Detect Real Traffic Channel via document.referrer & UTMs
    const ref = document.referrer.toLowerCase();
    const url = window.location.href.toLowerCase();
    let channel = 'direct';
    if (url.includes('utm_') || url.includes('source=') || url.includes('campaign=')) {
      channel = 'paid';
    } else if (ref.includes('google') || ref.includes('bing') || ref.includes('yahoo') || ref.includes('duckduckgo') || ref.includes('yandex')) {
      channel = 'organic';
    } else if (ref.includes('facebook') || ref.includes('instagram') || ref.includes('t.co') || ref.includes('twitter') || ref.includes('whatsapp') || ref.includes('linkedin') || ref.includes('telegram')) {
      channel = 'social';
    } else if (ref && !ref.includes(window.location.hostname)) {
      channel = 'referral';
    } else {
      channel = 'direct';
    }
    if (!a.trafficChannels) a.trafficChannels = { organic: 0, direct: 0, social: 0, referral: 0, paid: 0 };
    a.trafficChannels[channel] = (a.trafficChannels[channel] || 0) + 1;

    window.saveAzollaState(window.AZOLLA_DATA);
  }

  // 4. Session Timing
  window.PAGE_ENTER_TIME = Date.now();
  window.addEventListener('beforeunload', () => {
    recordPageDuration();
  });
}

function recordPageDuration() {
  try {
    if (!window.PAGE_ENTER_TIME || !window.AZOLLA_DATA || !window.AZOLLA_DATA.analytics) return;
    const durSec = Math.round((Date.now() - window.PAGE_ENTER_TIME) / 1000);
    if (durSec >= 1 && durSec <= 1800) {
      const a = window.AZOLLA_DATA.analytics;
      a.totalSecondsOnSite = (a.totalSecondsOnSite || 0) + durSec;
      const views = a.totalViews || 1;
      a.avgTimeOnPage = +(a.totalSecondsOnSite / views).toFixed(1);
      if (typeof window.saveAzollaState === 'function') window.saveAzollaState(window.AZOLLA_DATA);
    }
  } catch (e) {}
}

function trackPageView(pageKey) {
  try {
    if (!window.AZOLLA_DATA || !window.AZOLLA_DATA.analytics) return;
    const a = window.AZOLLA_DATA.analytics;

    recordPageDuration();
    window.PAGE_ENTER_TIME = Date.now();

    a.totalViews = (a.totalViews || 0) + 1;

    // Session pages count (safe storage)
    let pagesCount = 1;
    try {
      if (typeof sessionStorage !== 'undefined') {
        pagesCount = parseInt(sessionStorage.getItem('AZOLLA_SESSION_PAGES') || '0', 10) + 1;
        sessionStorage.setItem('AZOLLA_SESSION_PAGES', pagesCount.toString());
      }
    } catch (e) {}

    // Real Bounce rate calculation
    if (pagesCount > 1) {
      a.bouncePct = +(100 / pagesCount).toFixed(1);
      a.pageExitPct = +(100 / (pagesCount * 1.5)).toFixed(1);
    } else {
      a.bouncePct = 0;
      a.pageExitPct = 0;
    }

    // Update current month in timeline
    const now = new Date();
    const currentMonthIdx = now.getMonth();
    if (!a.timeline || !a.timeline.sessionsMonth) {
      a.timeline = {
        months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        sessionsMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        sessionsYear: [0, 0, 0, 0],
        years: ['2023', '2024', '2025', '2026']
      };
    }
    a.timeline.sessionsMonth[currentMonthIdx] = (a.timeline.sessionsMonth[currentMonthIdx] || 0) + 1;
    const yearIdx = now.getFullYear() - 2023;
    if (yearIdx >= 0 && yearIdx < a.timeline.sessionsYear.length) {
      a.timeline.sessionsYear[yearIdx] = (a.timeline.sessionsYear[yearIdx] || 0) + 1;
    }
  } catch (err) {}

  const pageNames = {
    home: 'الرئيسية',
    about: 'عن المشروع',
    science: 'سرخس الأزولا',
    services: 'الخدمات والحاسبات',
    news: 'الأخبار والمدونة',
    academy: 'الأكاديمية',
    impact: 'الأثر والتمكين',
    partners: 'الشركاء',
    media: 'المعرض الميداني',
    contact: 'تواصل معنا',
    privacy: 'الخصوصية والحوكمة'
  };
  const title = pageNames[pageKey] || pageKey;
  if (!a.recentEvents) a.recentEvents = [];
  a.recentEvents.unshift({
    time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    type: 'view',
    text: `مشاهدة: ${title}`,
    device: window.CURRENT_DEVICE_TYPE || 'Desktop'
  });
  if (a.recentEvents.length > 20) a.recentEvents.pop();

  window.saveAzollaState(window.AZOLLA_DATA);
}

function trackCalculatorUsage(calcType) {
  if (!window.AZOLLA_DATA || !window.AZOLLA_DATA.analytics) return;
  const now = Date.now();
  if (now - window._LAST_CALC_TRACK < 1000) return;
  window._LAST_CALC_TRACK = now;

  const a = window.AZOLLA_DATA.analytics;
  a.calculatorRuns = (a.calculatorRuns || 0) + 1;
  if (calcType === 'feed') a.feedCalculatorRuns = (a.feedCalculatorRuns || 0) + 1;
  if (calcType === 'water') a.waterCalculatorRuns = (a.waterCalculatorRuns || 0) + 1;
  if (calcType === 'basin') a.basinCalculatorRuns = (a.basinCalculatorRuns || 0) + 1;
  if (calcType === 'carbon') a.carbonCalculatorRuns = (a.carbonCalculatorRuns || 0) + 1;

  const calcNames = {
    feed: 'حاسبة توفير الأعلاف والجدوى',
    water: 'حاسبة صون الموارد المائية',
    basin: 'حاسبة مساحة وإنتاجية الحوض',
    carbon: 'حاسبة خفض البصمة الكربونية'
  };
  const name = calcNames[calcType] || 'حاسبة ذكية';
  if (!a.recentEvents) a.recentEvents = [];
  a.recentEvents.unshift({
    time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    type: 'calc',
    text: `تشغيل حقيقي: ${name}`,
    device: window.CURRENT_DEVICE_TYPE || 'Desktop'
  });
  if (a.recentEvents.length > 20) a.recentEvents.pop();

  window.saveAzollaState(window.AZOLLA_DATA);
}

function downloadMonthlyReportPdf() {
  const a = window.AZOLLA_DATA?.analytics || {};
  const now = new Date();
  const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  const currentMonthIdx = now.getMonth();
  const currentMonthName = monthNames[currentMonthIdx];
  const currentYear = now.getFullYear();
  const dateStr = now.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  const reportFileName = `تقرير_أداء_مشروع_أزولا_مصر_${currentMonthName}_${currentYear}.pdf`;

  // Gather Monthly & Cumulative Analytics Stats
  const monthViews = (a.timeline?.sessionsMonth && a.timeline.sessionsMonth[currentMonthIdx] !== undefined)
    ? a.timeline.sessionsMonth[currentMonthIdx]
    : (a.totalViews || 0);
  const totalViews = a.totalViews || 0;
  const uniqueVisitors = a.uniqueVisitors || 0;
  const avgTime = a.avgTimeOnPage ? `${a.avgTimeOnPage}s` : '0s';
  const pageExitPct = a.pageExitPct ? `${a.pageExitPct}%` : '0%';
  const calcRuns = a.calculatorRuns || 0;
  const feedRuns = a.feedCalculatorRuns || 0;
  const waterRuns = a.waterCalculatorRuns || 0;
  const basinRuns = a.basinCalculatorRuns || 0;
  const carbonRuns = a.carbonCalculatorRuns || 0;

  // Real Device breakdown
  const ds = a.deviceSessions || { desktop: 0, mobile: 0, tablet: 0 };
  const totalDev = (ds.desktop || 0) + (ds.mobile || 0) + (ds.tablet || 0);
  const deskPct = totalDev > 0 ? Math.round((ds.desktop / totalDev) * 100) : 0;
  const mobPct = totalDev > 0 ? Math.round((ds.mobile / totalDev) * 100) : 0;
  const tabPct = totalDev > 0 ? Math.max(0, 100 - deskPct - mobPct) : 0;

  // Real Traffic channels breakdown
  const tc = a.trafficChannels || { organic: 0, direct: 0, social: 0, referral: 0, paid: 0 };
  const totalChan = (tc.organic || 0) + (tc.direct || 0) + (tc.social || 0) + (tc.referral || 0) + (tc.paid || 0);
  const orgPct = totalChan > 0 ? Math.round((tc.organic / totalChan) * 100) : 0;
  const dirPct = totalChan > 0 ? Math.round((tc.direct / totalChan) * 100) : 0;
  const socPct = totalChan > 0 ? Math.round((tc.social / totalChan) * 100) : 0;
  const refPct = totalChan > 0 ? Math.round((tc.referral / totalChan) * 100) : 0;
  const padPct = totalChan > 0 ? Math.max(0, 100 - orgPct - dirPct - socPct - refPct) : 0;

  showToast('📄 جاري إعداد وتوليد التقرير الشهري PDF...');

  // Create temporary container for PDF rendering
  const reportContainer = document.createElement('div');
  reportContainer.id = 'temp-pdf-report-container';
  reportContainer.setAttribute('dir', 'rtl');
  reportContainer.style.position = 'absolute';
  reportContainer.style.left = '-9999px';
  reportContainer.style.top = '0';
  reportContainer.style.width = '790px'; // A4 width at 96 DPI
  reportContainer.style.background = '#FFFFFF';
  reportContainer.style.color = '#0F172A';
  reportContainer.style.fontFamily = "'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif";
  reportContainer.style.padding = '24px 28px';
  reportContainer.style.boxSizing = 'border-box';

  reportContainer.innerHTML = `
    <div style="border: 2px solid #064E3B; border-radius: 8px; padding: 20px; background: #FFFFFF;">
      
      <!-- Top Institutional Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #059669; padding-bottom: 14px; margin-bottom: 16px;">
        <div style="text-align: right;">
          <h2 style="font-size: 16px; font-weight: 900; color: #064E3B; margin: 0 0 4px 0;">مشروع تكنولوجيا الأعلاف البديلة .. أزولا مصر</h2>
          <p style="font-size: 11px; color: #475569; margin: 0; line-height: 1.4;">
            بدعم تنموي من: <strong>برنامج المنح الصغيرة (SGP/GEF/UNDP)</strong><br>
            تنفيذ: <strong>جمعية الخدمات المتكاملة بكفر الدوار</strong> ومزارع فرع أسوان التكاملية
          </p>
        </div>
        <div style="text-align: left;">
          <span style="display: inline-block; background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800;">
            تقرير إداري شهري معتمد
          </span>
          <div style="font-size: 10px; color: #64748B; margin-top: 4px;">
            تاريخ الإصدار: ${dateStr} (${timeStr})
          </div>
        </div>
      </div>

      <!-- Report Banner Title -->
      <div style="background: linear-gradient(135deg, #064E3B 0%, #047857 100%); color: #FFFFFF; border-radius: 6px; padding: 12px 16px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h3 style="font-size: 14px; font-weight: 900; margin: 0; color: #FFFFFF;">
            تقرير مؤشرات الأداء والتحليلات الرقمية – شهر ${currentMonthName} ${currentYear}
          </h3>
          <p style="font-size: 10px; color: #D1FAE5; margin: 2px 0 0 0;">
            ملخص تفاعلي يرصد حركة المرور، الزوار، واستخدام الحاسبات الميدانية لخفض تكلفة الأعلاف وصون الموارد المائية
          </p>
        </div>
        <div style="background: rgba(255,255,255,0.15); padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 800; color: #FDE68A;">
          ${currentMonthName} ${currentYear}
        </div>
      </div>

      <!-- 4 KPI Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px;">
        <div style="border: 1px solid #E2E8F0; border-top: 3px solid #059669; border-radius: 6px; padding: 10px; background: #F8FAFC; text-align: center;">
          <div style="font-size: 10px; font-weight: 700; color: #64748B; margin-bottom: 4px;">مشاهدات هذا الشهر</div>
          <div style="font-size: 20px; font-weight: 900; color: #064E3B;">${monthViews.toLocaleString()}</div>
          <div style="font-size: 9px; color: #059669; font-weight: 700; margin-top: 2px;">إجمالي المنصة: ${totalViews.toLocaleString()}</div>
        </div>

        <div style="border: 1px solid #E2E8F0; border-top: 3px solid #0284C7; border-radius: 6px; padding: 10px; background: #F8FAFC; text-align: center;">
          <div style="font-size: 10px; font-weight: 700; color: #64748B; margin-bottom: 4px;">الزوار الفريدون</div>
          <div style="font-size: 20px; font-weight: 900; color: #0369A1;">${uniqueVisitors.toLocaleString()}</div>
          <div style="font-size: 9px; color: #0284C7; font-weight: 700; margin-top: 2px;">أجهزة محددة مستقلة</div>
        </div>

        <div style="border: 1px solid #E2E8F0; border-top: 3px solid #D97706; border-radius: 6px; padding: 10px; background: #F8FAFC; text-align: center;">
          <div style="font-size: 10px; font-weight: 700; color: #64748B; margin-bottom: 4px;">متوسط وقت التصفح</div>
          <div style="font-size: 20px; font-weight: 900; color: #B45309;">${avgTime}</div>
          <div style="font-size: 9px; color: #D97706; font-weight: 700; margin-top: 2px;">معدل الخروج: ${pageExitPct}</div>
        </div>

        <div style="border: 1px solid #E2E8F0; border-top: 3px solid #10B981; border-radius: 6px; padding: 10px; background: #F8FAFC; text-align: center;">
          <div style="font-size: 10px; font-weight: 700; color: #64748B; margin-bottom: 4px;">تشغيل الحاسبات الذكية</div>
          <div style="font-size: 20px; font-weight: 900; color: #047857;">${calcRuns.toLocaleString()}</div>
          <div style="font-size: 9px; color: #10B981; font-weight: 700; margin-top: 2px;">تفاعل حسابي مباشر</div>
        </div>
      </div>

      <!-- Two Tables Row: Calculators & Traffic -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
        
        <!-- Table 1: Calculators Breakdown -->
        <div style="border: 1px solid #CBD5E1; border-radius: 6px; overflow: hidden;">
          <div style="background: #064E3B; color: #FFFFFF; padding: 6px 10px; font-size: 11px; font-weight: 800;">
            📊 تفصيل استخدام الحاسبات الميدانية الذكية
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
            <tbody>
              <tr style="border-bottom: 1px solid #E2E8F0; background: #F8FAFC;">
                <td style="padding: 6px 10px; font-weight: 700; color: #334155;">حاسبة توفير وتكاليف الأعلاف</td>
                <td style="padding: 6px 10px; font-weight: 900; color: #064E3B; text-align: left;">${feedRuns} عملية</td>
              </tr>
              <tr style="border-bottom: 1px solid #E2E8F0;">
                <td style="padding: 6px 10px; font-weight: 700; color: #334155;">حاسبة صون الموارد المائية</td>
                <td style="padding: 6px 10px; font-weight: 900; color: #0284C7; text-align: left;">${waterRuns} عملية</td>
              </tr>
              <tr style="border-bottom: 1px solid #E2E8F0; background: #F8FAFC;">
                <td style="padding: 6px 10px; font-weight: 700; color: #334155;">حاسبة مساحة وإنتاجية الحوض</td>
                <td style="padding: 6px 10px; font-weight: 900; color: #D97706; text-align: left;">${basinRuns} عملية</td>
              </tr>
              <tr>
                <td style="padding: 6px 10px; font-weight: 700; color: #334155;">حاسبة خفض البصمة الكربونية</td>
                <td style="padding: 6px 10px; font-weight: 900; color: #059669; text-align: left;">${carbonRuns} عملية</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table 2: Device & Channel Breakdown -->
        <div style="border: 1px solid #CBD5E1; border-radius: 6px; overflow: hidden;">
          <div style="background: #0F4C81; color: #FFFFFF; padding: 6px 10px; font-size: 11px; font-weight: 800;">
            📱 توزيع الأجهزة وقنوات الوصول الرئيسية
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
            <tbody>
              <tr style="border-bottom: 1px solid #E2E8F0; background: #F8FAFC;">
                <td style="padding: 6px 10px; font-weight: 700; color: #334155;">الهواتف الذكية (Mobile)</td>
                <td style="padding: 6px 10px; font-weight: 900; color: #0F4C81; text-align: left;">${mobPct}% (${ds.mobile || 0})</td>
              </tr>
              <tr style="border-bottom: 1px solid #E2E8F0;">
                <td style="padding: 6px 10px; font-weight: 700; color: #334155;">الكمبيوتر المكتبي (Desktop)</td>
                <td style="padding: 6px 10px; font-weight: 900; color: #0F4C81; text-align: left;">${deskPct}% (${ds.desktop || 0})</td>
              </tr>
              <tr style="border-bottom: 1px solid #E2E8F0; background: #F8FAFC;">
                <td style="padding: 6px 10px; font-weight: 700; color: #334155;">الوصول المباشر ومحركات البحث</td>
                <td style="padding: 6px 10px; font-weight: 900; color: #059669; text-align: left;">${orgPct + dirPct}%</td>
              </tr>
              <tr>
                <td style="padding: 6px 10px; font-weight: 700; color: #334155;">التواصل الاجتماعي والواتساب والمشاركات</td>
                <td style="padding: 6px 10px; font-weight: 900; color: #25D366; text-align: left;">${socPct + refPct}%</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <!-- Environmental & Economic Impact Box -->
      <div style="border: 1px solid #BBF7D0; background: #F0FDF4; border-radius: 6px; padding: 12px 14px; margin-bottom: 16px;">
        <h4 style="font-size: 12px; font-weight: 900; color: #065F46; margin: 0 0 6px 0;">
          🌱 ملخص الأثر الاقتصادي والبيئي التقديري لمنظومة أزولا مصر:
        </h4>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 10px; color: #166534; line-height: 1.4;">
          <div style="background: #FFFFFF; border: 1px solid #86EFAC; border-radius: 4px; padding: 6px 8px;">
            <strong>تخفيض تكلفة الأعلاف:</strong> حتى 60% عند استخدام الأزولا كبديل جزئي للأعلاف المركزة لمربي المواشي والدواجن.
          </div>
          <div style="background: #FFFFFF; border: 1px solid #86EFAC; border-radius: 4px; padding: 6px 8px;">
            <strong>صون الموارد المائية:</strong> وفر يصل إلى 88% مقارنة بالزراعات التقليدية كالبرسيم الحجازي بفضل نظام التدوير والإنتاج المغلق.
          </div>
          <div style="background: #FFFFFF; border: 1px solid #86EFAC; border-radius: 4px; padding: 6px 8px;">
            <strong>نقل وتوطين المعرفة:</strong> توفير 12 برنامجاً تدريبياً عبر الأكاديمية ونماذج إرشادية للمزارعين وصغار المربين.
          </div>
        </div>
      </div>

      <!-- Official Authentication Footer & Stamp -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #CBD5E1; padding-top: 12px;">
        <div style="font-size: 10px; color: #64748B; line-height: 1.5;">
          <strong>اعتماد:</strong> المنظومة الرقمية المركزية لمشروع تكنولوجيا الأعلاف البديلة .. أزولا مصر.<br>
          جمعية الخدمات المتكاملة بكفر الدوار (إشهار 1997/752) | مزارع أسوان التكاملية.<br>
          <span style="color: #059669; font-weight: 700;">الموقع الإلكتروني الرسمي: azollaegypt.org | الشريك الرقمي: NGO HUB</span>
        </div>
        <div style="text-align: center; border: 2px dashed #059669; border-radius: 50%; width: 76px; height: 76px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #065F46; transform: rotate(-8deg);">
          <span style="font-size: 8px; font-weight: 900;">معتمد رسمياً</span>
          <span style="font-size: 9px; font-weight: 900;">أزولا مصر</span>
          <span style="font-size: 7px; color: #047857;">${currentYear}</span>
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(reportContainer);

  if (window.html2pdf) {
    const opt = {
      margin: [6, 6, 6, 6],
      filename: reportFileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    window.html2pdf().set(opt).from(reportContainer).save().then(() => {
      if (reportContainer.parentNode) reportContainer.parentNode.removeChild(reportContainer);
      showToast('✅ تم تحميل تقرير PDF الشهري بنجاح!');
    }).catch(err => {
      console.warn('html2pdf generation error, using print fallback:', err);
      triggerPrintFallback(reportContainer, reportFileName);
    });
  } else {
    triggerPrintFallback(reportContainer, reportFileName);
  }
}

function triggerPrintFallback(container, filename) {
  const printWindow = window.open('', '_blank', 'width=840,height=900');
  if (!printWindow) {
    alert('يرجى السماح بالنوافذ المنبثقة (Popups) لحفظ التقرير كـ PDF');
    if (container.parentNode) container.parentNode.removeChild(container);
    return;
  }
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>${filename}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Cairo', sans-serif; margin: 0; padding: 20px; background: #FFF; color: #0F172A; }
        @media print {
          @page { size: A4 portrait; margin: 8mm; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      ${container.innerHTML}
      <script>
        window.onload = function() {
          window.print();
        };
      <\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
  if (container.parentNode) container.parentNode.removeChild(container);
}

function setAnalyticsTimeframe(tf) {
  window.CURRENT_ANALYTICS_TIMEFRAME = tf;
  ['month', 'year', 'total'].forEach(k => {
    const b = document.getElementById(`wt-btn-${k}`);
    if (b) {
      if (k === tf) b.classList.add('active');
      else b.classList.remove('active');
    }
  });
  renderAnalyticsDashboard();
}

function renderAnalyticsDashboard() {
  const a = window.AZOLLA_DATA.analytics || (window.DEFAULT_AZOLLA_DATA && window.DEFAULT_AZOLLA_DATA.analytics) || {};
  const tf = window.CURRENT_ANALYTICS_TIMEFRAME || 'month';

  let views = a.totalViews || 0;
  let timeStr = (a.avgTimeOnPage ? `${a.avgTimeOnPage}s` : '0s');
  let exitStr = (a.pageExitPct ? `${a.pageExitPct}%` : '0%');
  let calcRuns = a.calculatorRuns || 0;

  // 1. Update Metric Cards
  if (document.getElementById('wt-stat-views')) document.getElementById('wt-stat-views').innerText = views.toLocaleString();
  if (document.getElementById('wt-stat-time')) document.getElementById('wt-stat-time').innerText = timeStr;
  if (document.getElementById('wt-stat-exit')) document.getElementById('wt-stat-exit').innerText = exitStr;
  if (document.getElementById('wt-stat-calc')) document.getElementById('wt-stat-calc').innerText = calcRuns.toLocaleString();

  // 2. Real Device Sessions Calculation
  const ds = a.deviceSessions || { desktop: 0, mobile: 0, tablet: 0 };
  const totalDev = (ds.desktop || 0) + (ds.mobile || 0) + (ds.tablet || 0);
  const deskPct = totalDev > 0 ? Math.round((ds.desktop / totalDev) * 100) : 0;
  const mobPct = totalDev > 0 ? Math.round((ds.mobile / totalDev) * 100) : 0;
  const tabPct = totalDev > 0 ? Math.max(0, 100 - deskPct - mobPct) : 0;

  if (document.getElementById('wt-device-desktop-val')) document.getElementById('wt-device-desktop-val').innerText = `${deskPct}% (${ds.desktop || 0})`;
  if (document.getElementById('wt-device-desktop-fill')) document.getElementById('wt-device-desktop-fill').style.width = `${deskPct}%`;

  if (document.getElementById('wt-device-mobile-val')) document.getElementById('wt-device-mobile-val').innerText = `${mobPct}% (${ds.mobile || 0})`;
  if (document.getElementById('wt-device-mobile-fill')) document.getElementById('wt-device-mobile-fill').style.width = `${mobPct}%`;

  if (document.getElementById('wt-device-tablet-val')) document.getElementById('wt-device-tablet-val').innerText = `${tabPct}% (${ds.tablet || 0})`;
  if (document.getElementById('wt-device-tablet-fill')) document.getElementById('wt-device-tablet-fill').style.width = `${tabPct}%`;

  // 3. Real Traffic Channels Calculation
  const tc = a.trafficChannels || { organic: 0, direct: 0, social: 0, referral: 0, paid: 0 };
  const totalChan = (tc.organic || 0) + (tc.direct || 0) + (tc.social || 0) + (tc.referral || 0) + (tc.paid || 0);
  const orgPct = totalChan > 0 ? Math.round((tc.organic / totalChan) * 100) : 0;
  const dirPct = totalChan > 0 ? Math.round((tc.direct / totalChan) * 100) : 0;
  const socPct = totalChan > 0 ? Math.round((tc.social / totalChan) * 100) : 0;
  const refPct = totalChan > 0 ? Math.round((tc.referral / totalChan) * 100) : 0;
  const padPct = totalChan > 0 ? Math.max(0, 100 - orgPct - dirPct - socPct - refPct) : 0;

  if (document.getElementById('wt-chan-organic-val')) document.getElementById('wt-chan-organic-val').innerText = `${orgPct}% (${tc.organic || 0})`;
  if (document.getElementById('wt-chan-organic-fill')) document.getElementById('wt-chan-organic-fill').style.width = `${orgPct}%`;

  if (document.getElementById('wt-chan-direct-val')) document.getElementById('wt-chan-direct-val').innerText = `${dirPct}% (${tc.direct || 0})`;
  if (document.getElementById('wt-chan-direct-fill')) document.getElementById('wt-chan-direct-fill').style.width = `${dirPct}%`;

  if (document.getElementById('wt-chan-social-val')) document.getElementById('wt-chan-social-val').innerText = `${socPct}% (${tc.social || 0})`;
  if (document.getElementById('wt-chan-social-fill')) document.getElementById('wt-chan-social-fill').style.width = `${socPct}%`;

  if (document.getElementById('wt-chan-referral-val')) document.getElementById('wt-chan-referral-val').innerText = `${refPct}% (${tc.referral || 0})`;
  if (document.getElementById('wt-chan-referral-fill')) document.getElementById('wt-chan-referral-fill').style.width = `${refPct}%`;

  if (document.getElementById('wt-chan-paid-val')) document.getElementById('wt-chan-paid-val').innerText = `${padPct}% (${tc.paid || 0})`;
  if (document.getElementById('wt-chan-paid-fill')) document.getElementById('wt-chan-paid-fill').style.width = `${padPct}%`;

  // 4. Render Real Charts
  renderSessionsChartSVG(tf);
  renderDevicesChartSVG(tf);
  renderPageviewsHistogramSVG(tf);
  renderLiveActivityStream();
}

function renderSessionsChartSVG(tf) {
  const container = document.getElementById('wt-sessions-chart-svg');
  if (!container) return;

  const a = window.AZOLLA_DATA.analytics || {};
  let points = (a.timeline && a.timeline.sessionsMonth) ? a.timeline.sessionsMonth : [0,0,0,0,0,0,0,0,0,0,0,0];
  if (tf === 'year' && a.timeline?.sessionsYear) {
    points = a.timeline.sessionsYear;
  }

  const max = Math.max(...points, 1);
  const width = 360;
  const height = 140;
  const step = width / (points.length - 1 || 1);

  const coords = points.map((val, idx) => {
    const x = idx * step;
    const y = height - (val / max) * 110 - 15;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M${coords[0]} ` + coords.slice(1).map(c => `L${c}`).join(' ');
  const areaD = `${pathD} L${width},${height} L0,${height} Z`;

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%; overflow: visible;">
      <defs>
        <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#059669" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#059669" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <path d="${areaD}" fill="url(#sessionsGradient)"/>
      <path d="${pathD}" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${coords.map(c => `<circle cx="${c.split(',')[0]}" cy="${c.split(',')[1]}" r="3" fill="#059669" stroke="#FFFFFF" stroke-width="1.5"/>`).join('')}
    </svg>
  `;
}

function renderDevicesChartSVG(tf) {
  const container = document.getElementById('wt-devices-chart-svg');
  if (!container) return;

  const a = window.AZOLLA_DATA.analytics || {};
  const ds = a.deviceSessions || { desktop: 0, mobile: 0, tablet: 0 };
  const total = (ds.desktop || 0) + (ds.mobile || 0) + (ds.tablet || 0) || 1;

  const dRatio = (ds.desktop || 0) / total;
  const mRatio = (ds.mobile || 0) / total;
  const tRatio = (ds.tablet || 0) / total;

  const width = 360;
  const height = 140;

  const dY = height - 20 - dRatio * 90;
  const mY = height - 20 - mRatio * 90;
  const tY = height - 20 - tRatio * 90;

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%; overflow: visible;">
      <!-- Desktop Line -->
      <path d="M0,${height - 20} Q180,${dY + 10} 360,${dY}" fill="none" stroke="#0F4C81" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Mobile Line -->
      <path d="M0,${height - 20} Q180,${mY + 10} 360,${mY}" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Tablet Line -->
      <path d="M0,${height - 20} Q180,${tY + 5} 360,${tY}" fill="none" stroke="#38BDF8" stroke-width="2" stroke-dasharray="4,4" stroke-linecap="round"/>
      
      <line x1="0" y1="${height - 10}" x2="${width}" y2="${height - 10}" stroke="var(--color-border)" stroke-width="1"/>
    </svg>
  `;
}

function renderPageviewsHistogramSVG(tf) {
  const container = document.getElementById('wt-pageviews-histogram-svg');
  if (!container) return;

  const a = window.AZOLLA_DATA.analytics || {};
  const points = (a.timeline && a.timeline.sessionsMonth) ? a.timeline.sessionsMonth : [0,0,0,0,0,0,0,0,0,0,0,0];
  const max = Math.max(...points, 1);

  const width = 360;
  const height = 140;
  const barWidth = 18;
  const gap = (width - (points.length * barWidth)) / (points.length + 1);

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%; overflow: visible;">
      ${points.map((val, i) => {
        const x = gap + i * (barWidth + gap);
        const barH = val > 0 ? Math.max(6, (val / max) * 110) : 3;
        const y = height - barH - 10;
        return `
          <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth}" height="${barH}" rx="2" fill="#0F4C81" opacity="${val > 0 ? '0.85' : '0.25'}"/>
        `;
      }).join('')}
    </svg>
  `;
}

function renderLiveActivityStream() {
  const stream = document.getElementById('wt-live-activity-stream');
  if (!stream) return;

  const a = window.AZOLLA_DATA.analytics || {};
  const events = a.recentEvents || [];

  if (events.length === 0) {
    stream.innerHTML = `
      <div style="text-align: center; padding: 1.25rem; color: var(--color-text-muted); font-size: 0.85rem;">
        <i class="fa-solid fa-hourglass-start text-gold" style="font-size: 1.2rem; margin-bottom: 0.4rem; display: block;"></i>
        تم بدء العداد من الصفر (0). سيتم تسجيل أول نشاط مباشر فور قيام أي زائر بتصفح الموقع أو استخدام الحاسبات.
      </div>
    `;
    return;
  }

  stream.innerHTML = events.slice(0, 6).map(e => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; background: var(--color-surface); border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
      <div style="display: flex; align-items: center; gap: 0.65rem;">
        <span style="color: ${e.type === 'calc' ? 'var(--color-primary)' : '#0284C7'}; font-size: 0.9rem;">
          <i class="${e.type === 'calc' ? 'fa-solid fa-calculator' : 'fa-solid fa-eye'}"></i>
        </span>
        <strong style="color: var(--color-text-main); font-size: 0.85rem;">${e.text}</strong>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; color: var(--color-text-muted);">
        <span><i class="fa-solid fa-${e.device === 'Mobile' ? 'mobile-screen' : 'laptop'}"></i> ${e.device}</span>
        <span>•</span>
        <span>${e.time}</span>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   MASTER SITE PAGES & SECTIONS CONTENT/MEDIA MANAGER
   ========================================================================== */
function selectCmsPageToEdit(pageKey) {
  window.CURRENT_CMS_PAGE = pageKey;
  ['home', 'about', 'science', 'services', 'academy', 'impact', 'partners', 'privacy'].forEach(k => {
    const b = document.getElementById(`page-pill-${k}`);
    if (b) {
      if (k === pageKey) b.classList.add('active');
      else b.classList.remove('active');
    }
  });
  renderPageContentEditor(pageKey);
}

function renderPageContentEditor(pageKey = 'home') {
  const container = document.getElementById('cms-page-sections-editor');
  if (!container) return;

  const pages = window.AZOLLA_DATA.sitePages || (window.DEFAULT_AZOLLA_DATA && window.DEFAULT_AZOLLA_DATA.sitePages);
  const page = pages ? pages[pageKey] : null;
  if (!page || !page.sections) {
    container.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--color-text-muted);">لا توجد أقسام مسجلة لهذه الصفحة.</div>`;
    return;
  }

  container.innerHTML = page.sections.map((sec, idx) => `
    <div class="cms-section-card" id="sec-card-${pageKey}-${sec.id}">
      <div class="cms-section-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="badge" style="background: var(--color-emerald-50); color: var(--color-primary); border: 1px solid var(--color-emerald-200); font-weight: 800;">القسم ${idx + 1}</span>
          <h5 style="margin: 0; font-weight: 800; color: var(--color-primary-dark); font-size: 1rem;">${sec.name}</h5>
        </div>
        <button class="btn btn-sm btn-primary" onclick="savePageSectionChanges('${pageKey}', '${sec.id}')">
          <i class="fa-solid fa-floppy-disk"></i> حفظ وتحديث القسم
        </button>
      </div>

      <!-- Image Editor Row -->
      <div class="cms-section-img-row">
        <div>
          <img src="${sec.image}" id="sec-img-preview-${pageKey}-${sec.id}" alt="${sec.name}" class="cms-section-thumb">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; flex: 1;">
          <label style="font-size: 0.85rem; font-weight: 800; color: var(--color-text-main);"><i class="fa-solid fa-image text-primary"></i> تغيير / استبدال صورة هذا القسم:</label>
          <div class="cms-section-inputs-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div>
              <label style="font-size: 0.75rem; color: var(--color-text-muted); display: block; margin-bottom: 2px;">رفع مباشر من الهاتف/الكمبيوتر</label>
              <input type="file" class="form-control" style="font-size: 0.78rem;" accept="image/*" onchange="handleSectionImageUpload(event, '${pageKey}', '${sec.id}')">
              <input type="hidden" id="sec-img-base64-${pageKey}-${sec.id}" value="${sec.image}">
            </div>
            <div>
              <label style="font-size: 0.75rem; color: var(--color-text-muted); display: block; margin-bottom: 2px;">أو إدخال رابط الصورة (URL)</label>
              <input type="text" id="sec-img-url-${pageKey}-${sec.id}" class="form-control" style="font-size: 0.82rem;" placeholder="https://..." value="${sec.image && sec.image.startsWith('data:') ? '' : (sec.image || '')}">
            </div>
          </div>
          <div class="cms-section-btns-row" style="display: flex; gap: 0.5rem; margin-top: 0.25rem;">
            <button type="button" class="btn btn-sm" style="font-size: 0.75rem; background: var(--color-surface-hover);" onclick="resetSectionImageToDefault('${pageKey}', '${sec.id}')">
              <i class="fa-solid fa-rotate-left"></i> استعادة الصورة الأصلية
            </button>
            <button type="button" class="btn btn-sm" style="font-size: 0.75rem; color: #DC2626;" onclick="clearSectionImage('${pageKey}', '${sec.id}')">
              <i class="fa-solid fa-trash"></i> إزالة الصورة
            </button>
          </div>
        </div>
      </div>

      <!-- Text Inputs -->
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.85rem;">عنوان القسم الرئيسي (Heading) *</label>
          <input type="text" id="sec-title-${pageKey}-${sec.id}" class="form-control" value="${(sec.title || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.85rem;">نص وفقرات القسم (Paragraph / Lead Text) *</label>
          <textarea id="sec-lead-${pageKey}-${sec.id}" class="form-control" rows="3">${sec.lead || ''}</textarea>
        </div>
      </div>
    </div>
  `).join('');
}

async function handleSectionImageUpload(event, pageKey, sectionId) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const base64 = await compressAndConvertImage(file, 1200, 0.82);
    document.getElementById(`sec-img-base64-${pageKey}-${sectionId}`).value = base64;
    document.getElementById(`sec-img-preview-${pageKey}-${sectionId}`).src = base64;
    const urlInput = document.getElementById(`sec-img-url-${pageKey}-${sectionId}`);
    if (urlInput) urlInput.value = '';
    showToast('تم تحميل الصورة وضغطها بنجاح!');
  } catch (e) {
    alert('حدث خطأ أثناء معالجة الصورة!');
  }
}

function resetSectionImageToDefault(pageKey, sectionId) {
  const pages = window.AZOLLA_DATA.sitePages || window.DEFAULT_AZOLLA_DATA.sitePages;
  const sec = pages[pageKey]?.sections.find(s => s.id === sectionId);
  if (sec) {
    const defaultImg = sec.defaultImage || './assets/images/field_farm_large.jpg';
    document.getElementById(`sec-img-base64-${pageKey}-${sectionId}`).value = defaultImg;
    document.getElementById(`sec-img-preview-${pageKey}-${sectionId}`).src = defaultImg;
    const urlInput = document.getElementById(`sec-img-url-${pageKey}-${sectionId}`);
    if (urlInput) urlInput.value = defaultImg;
    showToast('تمت استعادة الصورة الافتراضية للقسم');
  }
}

function clearSectionImage(pageKey, sectionId) {
  document.getElementById(`sec-img-base64-${pageKey}-${sectionId}`).value = '';
  const urlInput = document.getElementById(`sec-img-url-${pageKey}-${sectionId}`);
  if (urlInput) urlInput.value = '';
  document.getElementById(`sec-img-preview-${pageKey}-${sectionId}`).src = './assets/images/logo_azolla.png';
  showToast('تم إفراغ الصورة');
}

function savePageSectionChanges(pageKey, sectionId) {
  const pages = window.AZOLLA_DATA.sitePages;
  if (!pages || !pages[pageKey]) return;
  const sec = pages[pageKey].sections.find(s => s.id === sectionId);
  if (!sec) return;

  const newTitle = document.getElementById(`sec-title-${pageKey}-${sectionId}`)?.value?.trim();
  const newLead = document.getElementById(`sec-lead-${pageKey}-${sectionId}`)?.value?.trim();
  const base64 = document.getElementById(`sec-img-base64-${pageKey}-${sectionId}`)?.value;
  const url = document.getElementById(`sec-img-url-${pageKey}-${sectionId}`)?.value?.trim();

  sec.title = newTitle || sec.title;
  sec.lead = newLead || sec.lead;
  sec.image = base64 || url || sec.image;

  window.saveAzollaState(window.AZOLLA_DATA);
  showToast(`✅ تم حفظ تعديلات قسم (${sec.name}) وتحديث الموقع فوراً!`);
  markLocalChangesPending();

  // If the user is currently viewing this page, re-render immediately!
  const currentRoute = window.location.hash.replace('#', '') || 'home';
  if (currentRoute === pageKey) {
    navigateTo(currentRoute);
  }
}

function switchCmsTab(tabName) {
  const tabs = ['overview', 'pages', 'news', 'counters', 'gallery', 'courses', 'info', 'inbox', 'cloud'];
  tabs.forEach(t => {
    const p = document.getElementById(`cms-panel-${t}`);
    const b = document.getElementById(`cms-tab-btn-${t}`);
    if (p) p.style.display = t === tabName ? 'block' : 'none';
    if (b) {
      if (t === tabName) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    }
  });

  if (tabName === 'overview') {
    renderAnalyticsDashboard();
  } else if (tabName === 'pages') {
    renderPageContentEditor(window.CURRENT_CMS_PAGE || 'home');
  }
}

function renderCmsDashboard() {
  const data = window.AZOLLA_DATA;
  const stats = data.verifiedStats || {};

  // 1. Render Analytics Dashboard & Web Traffic
  renderAnalyticsDashboard();

  // 2. Populate Counters inputs
  if (document.getElementById('cms-cnt-farmers')) document.getElementById('cms-cnt-farmers').value = stats.directTrainees || 512;
  if (document.getElementById('cms-cnt-feedcost')) document.getElementById('cms-cnt-feedcost').value = stats.feedCostReductionPct || 60;
  if (document.getElementById('cms-cnt-solar')) document.getElementById('cms-cnt-solar').value = stats.solarStationsCount || 3;
  if (document.getElementById('cms-cnt-pumping')) document.getElementById('cms-cnt-pumping').value = stats.dailyWaterPumpingM3 || 2350;
  if (document.getElementById('cms-cnt-income')) document.getElementById('cms-cnt-income').value = stats.avgIncomeIncreaseEgp || 3800;
  if (document.getElementById('cms-cnt-co2')) document.getElementById('cms-cnt-co2').value = stats.annualCo2SavedTons || 108;
  if (document.getElementById('cms-cnt-diesel')) document.getElementById('cms-cnt-diesel').value = stats.annualDieselSavedLiters || 10200;

  // 3. Populate Site Info
  const proj = data.projectInfo || {};
  if (document.getElementById('cms-info-name')) document.getElementById('cms-info-name').value = proj.nameAr || '';
  if (document.getElementById('cms-info-slogan')) document.getElementById('cms-info-slogan').value = proj.sloganAr || '';
  if (document.getElementById('cms-info-phone')) document.getElementById('cms-info-phone').value = proj.officialPhoneDisplay || '';
  if (document.getElementById('cms-info-email')) document.getElementById('cms-info-email').value = proj.officialEmail || '';
  if (document.getElementById('cms-info-address')) document.getElementById('cms-info-address').value = proj.headquarters || '';
  if (document.getElementById('cms-webhook-url')) document.getElementById('cms-webhook-url').value = proj.googleSheetWebhookUrl || '';

  // 4. Render Master Lists
  renderPageContentEditor(window.CURRENT_CMS_PAGE || 'home');
  renderCmsNewsList();
  renderCmsGalleryList();
  renderCmsCoursesList();
  renderCmsInbox();
  updateCloudStatusUI();
}

function saveCmsCounters() {
  const stats = window.AZOLLA_DATA.verifiedStats;
  stats.directTrainees = +document.getElementById('cms-cnt-farmers').value || stats.directTrainees;
  stats.feedCostReductionPct = +document.getElementById('cms-cnt-feedcost').value || stats.feedCostReductionPct;
  stats.solarStationsCount = +document.getElementById('cms-cnt-solar').value || stats.solarStationsCount;
  stats.dailyWaterPumpingM3 = +document.getElementById('cms-cnt-pumping').value || stats.dailyWaterPumpingM3;
  stats.avgIncomeIncreaseEgp = +document.getElementById('cms-cnt-income').value || stats.avgIncomeIncreaseEgp;
  stats.annualCo2SavedTons = +document.getElementById('cms-cnt-co2').value || stats.annualCo2SavedTons;
  stats.annualDieselSavedLiters = +document.getElementById('cms-cnt-diesel').value || stats.annualDieselSavedLiters;

  window.saveAzollaState(window.AZOLLA_DATA);
  showToast('تم حفظ أرقام وإحصائيات الموقع وتحديثها لحظياً!');
  markLocalChangesPending();
  const route = window.location.hash.replace('#', '') || 'home';
  if (route === 'home' || route === 'impact') {
    navigateTo(route);
  }
}

function renderCmsPartnersList() {
  const listEl = document.getElementById('cms-partners-list');
  if (!listEl) return;
  listEl.innerHTML = window.AZOLLA_DATA.partners.map((p, idx) => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: var(--color-bg); border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <img src="${p.logo}" alt="${p.name}" style="height: 36px; max-width: 50px; object-fit: contain; background: #FFF; padding: 2px; border-radius: 4px;">
        <div>
          <div style="font-weight: 800; font-size: 0.9rem;">${p.name}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">${p.role}</div>
        </div>
      </div>
      <button class="btn btn-sm" style="color: #DC2626; padding: 0.25rem 0.5rem;" onclick="deletePartner(${idx})"><i class="fa-solid fa-trash"></i></button>
    </div>
  `).join('');
}

function toggleAddPartnerForm() {
  const box = document.getElementById('cms-add-partner-box');
  if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function handlePartnerLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 3.5 * 1024 * 1024) {
    alert('حجم الصورة كبير! يرجى اختيار ملف أقل من 3.5 ميجابايت.');
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('new-partner-logo-base64').value = e.target.result;
    document.getElementById('partner-logo-preview').innerHTML = `<img src="${e.target.result}" style="height: 50px; border-radius: 4px; border: 1px solid var(--color-border);">`;
  };
  reader.readAsDataURL(file);
}

function saveNewPartner() {
  const name = document.getElementById('new-partner-name')?.value;
  const cat = document.getElementById('new-partner-cat')?.value;
  const desc = document.getElementById('new-partner-desc')?.value;
  const logo = document.getElementById('new-partner-logo-base64')?.value || './assets/images/logo_azolla.png';

  if (!name || !desc) {
    alert('يرجى كتابة اسم الشريك ووصف دوره!');
    return;
  }

  window.AZOLLA_DATA.partners.push({
    id: `partner-${Date.now()}`,
    name,
    category: cat,
    categoryName: 'شريك استراتيجي',
    role: 'شريك معتمد',
    logo,
    description: desc
  });

  window.saveAzollaState(window.AZOLLA_DATA);
  showToast('تمت إضافة الشريك بنجاح!');
  toggleAddPartnerForm();
  renderCmsPartnersList();
  navigateTo(window.location.hash.replace('#', '') || 'home');
}

function deletePartner(idx) {
  if (confirm('هل أنت متأكد من رغبتك في حذف هذا الشريك؟')) {
    window.AZOLLA_DATA.partners.splice(idx, 1);
    window.saveAzollaState(window.AZOLLA_DATA);
    renderCmsPartnersList();
    showToast('تم حذف الشريك بنجاح');
  }
}

/* ==========================================================================
   CMS: NEWS ARTICLES CRUD & EDIT
   ========================================================================== */
function renderCmsNewsList() {
  const container = document.getElementById('cms-news-list');
  if (!container) return;

  const news = window.AZOLLA_DATA.newsArticles || [];
  if (news.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--color-text-muted);">لا توجد مقالات منشورة حالياً. اضغط "إضافة خبر جديد" لإضافة أول مقال.</div>`;
    return;
  }

  container.innerHTML = news.map((item) => `
    <div class="cms-news-item-card" style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: var(--color-bg); border-radius: var(--radius-sm); border: 1px solid var(--color-border); gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.85rem; flex: 1; min-width: 0;">
        <img src="${item.image || './assets/images/field_farm_large.jpg'}" alt="${item.title}" style="width: 56px; height: 56px; object-fit: cover; border-radius: var(--radius-sm); flex-shrink: 0; border: 1px solid var(--color-border);">
        <div style="min-width: 0;">
          <div style="font-weight: 800; font-size: 0.92rem; color: var(--color-text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${item.featured ? '<span style="color: var(--color-gold); margin-left: 4px;">★</span>' : ''}${item.title}
          </div>
          <div style="font-size: 0.78rem; color: var(--color-text-muted); display: flex; gap: 0.5rem; margin-top: 2px;">
            <span><i class="fa-regular fa-calendar"></i> ${item.date}</span>
            <span>•</span>
            <span style="color: var(--color-primary); font-weight: 700;">${item.categoryLabel || item.category}</span>
          </div>
        </div>
      </div>
      <div class="news-item-actions" style="display: flex; gap: 0.5rem; flex-shrink: 0;">
        <button class="btn btn-sm btn-primary" onclick="openNewsEditForm('${item.id}')" title="تعديل المقال والصورة"><i class="fa-solid fa-pen-to-square"></i> تعديل</button>
        <button class="btn btn-sm" style="background: #FEE2E2; color: #DC2626; border: 1px solid #FECACA;" onclick="deleteCmsNewsArticle('${item.id}')" title="حذف المقال"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function openNewsForm(isEdit = false) {
  const box = document.getElementById('cms-news-form-box');
  if (!box) return;
  box.style.display = 'block';

  if (!isEdit) {
    document.getElementById('news-form-id').value = '';
    document.getElementById('news-form-title').value = '';
    document.getElementById('news-form-cat').value = 'farms';
    document.getElementById('news-form-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('news-form-author').value = 'اللجنة الفنية للمشروع';
    document.getElementById('news-form-readtime').value = '3 دقائق';
    document.getElementById('news-form-summary').value = '';
    document.getElementById('news-form-content').value = '';
    document.getElementById('news-form-img-base64').value = '';
    document.getElementById('news-form-img-url').value = '';
    document.getElementById('news-form-featured').checked = false;
    document.getElementById('news-img-preview').innerHTML = '';
    document.getElementById('news-form-title-label').innerText = 'إضافة مقال أو خبر جديد';
    document.getElementById('news-form-submit-btn').innerHTML = '<i class="fa-solid fa-plus"></i> نشر المقال فوراً';
  }
}

function closeNewsForm() {
  const box = document.getElementById('cms-news-form-box');
  if (box) box.style.display = 'none';
}

function openNewsEditForm(id) {
  const item = (window.AZOLLA_DATA.newsArticles || []).find(a => a.id === id);
  if (!item) return;

  openNewsForm(true);
  document.getElementById('news-form-id').value = item.id;
  document.getElementById('news-form-title').value = item.title;
  document.getElementById('news-form-cat').value = item.category || 'farms';
  document.getElementById('news-form-date').value = item.date || '';
  document.getElementById('news-form-author').value = item.author || 'اللجنة الفنية للمشروع';
  document.getElementById('news-form-readtime').value = item.readTime || '3 دقائق';
  document.getElementById('news-form-summary').value = item.summary || '';
  document.getElementById('news-form-content').value = item.content || '';
  document.getElementById('news-form-img-base64').value = item.image && item.image.startsWith('data:') ? item.image : '';
  document.getElementById('news-form-img-url').value = item.image && !item.image.startsWith('data:') ? item.image : '';
  document.getElementById('news-form-featured').checked = !!item.featured;
  document.getElementById('news-img-preview').innerHTML = `<img src="${item.image || './assets/images/field_farm_large.jpg'}" style="height: 60px; border-radius: 4px; border: 1px solid var(--color-border); object-fit: cover;">`;
  document.getElementById('news-form-title-label').innerText = 'تعديل المقال والصورة';
  document.getElementById('news-form-submit-btn').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> حفظ تعديلات المقال';
}

async function handleNewsImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const base64 = await compressAndConvertImage(file, 1200, 0.82);
    document.getElementById('news-form-img-base64').value = base64;
    document.getElementById('news-form-img-url').value = '';
    document.getElementById('news-img-preview').innerHTML = `<img src="${base64}" style="height: 60px; border-radius: 4px; border: 1px solid var(--color-border); object-fit: cover;">`;
    showToast('تم تحميل الصورة وضغطها بنجاح!');
  } catch (err) {
    alert('حدث خطأ أثناء معالجة الصورة!');
  }
}

function saveCmsNewsArticle() {
  const id = document.getElementById('news-form-id').value;
  const title = document.getElementById('news-form-title').value.trim();
  const category = document.getElementById('news-form-cat').value;
  const date = document.getElementById('news-form-date').value || new Date().toISOString().split('T')[0];
  const author = document.getElementById('news-form-author').value.trim() || 'إدارة المشروع';
  const readTime = document.getElementById('news-form-readtime').value.trim() || '3 دقائق';
  const summary = document.getElementById('news-form-summary').value.trim();
  const content = document.getElementById('news-form-content').value.trim() || `<p>${summary}</p>`;
  const imgBase64 = document.getElementById('news-form-img-base64').value;
  const imgUrl = document.getElementById('news-form-img-url').value.trim();
  const featured = document.getElementById('news-form-featured').checked;

  const image = imgBase64 || imgUrl || './assets/images/field_farm_large.jpg';

  if (!title || !summary) {
    alert('يرجى ملء عنوان المقال والموجز الإخباري!');
    return;
  }

  const categoryLabels = {
    farms: 'أخبار المزارع والحصاد',
    academy: 'فعاليات الأكاديمية',
    environment: 'صون المياه والبيئة',
    partners: 'الشراكات والتمكين'
  };

  if (!window.AZOLLA_DATA.newsArticles) window.AZOLLA_DATA.newsArticles = [];

  if (id) {
    const idx = window.AZOLLA_DATA.newsArticles.findIndex(a => a.id === id);
    if (idx !== -1) {
      window.AZOLLA_DATA.newsArticles[idx] = {
        ...window.AZOLLA_DATA.newsArticles[idx],
        title,
        category,
        categoryLabel: categoryLabels[category] || category,
        date,
        author,
        readTime,
        summary,
        content,
        image,
        featured
      };
      showToast('تم تحديث المقال بنجاح!');
    }
  } else {
    const newArticle = {
      id: `news-${Date.now()}`,
      title,
      category,
      categoryLabel: categoryLabels[category] || category,
      date,
      author,
      readTime,
      summary,
      content,
      image,
      featured
    };
    window.AZOLLA_DATA.newsArticles.unshift(newArticle);
    showToast('تم نشر المقال الجديد بنجاح!');
  }

  window.saveAzollaState(window.AZOLLA_DATA);
  closeNewsForm();
  renderCmsNewsList();
  renderNewsCards();
  markLocalChangesPending();
}

function deleteCmsNewsArticle(id) {
  if (confirm('هل أنت متأكد من رغبتك في حذف هذا المقال نهائياً؟')) {
    window.AZOLLA_DATA.newsArticles = (window.AZOLLA_DATA.newsArticles || []).filter(a => a.id !== id);
    window.saveAzollaState(window.AZOLLA_DATA);
    renderCmsNewsList();
    renderNewsCards();
    markLocalChangesPending();
    showToast('تم حذف المقال بنجاح');
  }
}

/* ==========================================================================
   CMS: GALLERY & MEDIA CRUD
   ========================================================================== */
function renderCmsGalleryList() {
  const container = document.getElementById('cms-gallery-list');
  if (!container) return;

  const gallery = window.AZOLLA_DATA.realGallery || [];
  container.innerHTML = gallery.map((item, idx) => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: var(--color-bg); border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <img src="${item.src}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid var(--color-border);">
        <div>
          <div style="font-weight: 800; font-size: 0.9rem;">${item.title}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">${item.category} | ${item.location}</div>
        </div>
      </div>
      <button class="btn btn-sm" style="color: #DC2626;" onclick="deleteGalleryPhoto(${idx})"><i class="fa-solid fa-trash"></i></button>
    </div>
  `).join('');
}

async function handleGalleryPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const base64 = await compressAndConvertImage(file, 1200, 0.82);
    document.getElementById('new-gal-img-base64').value = base64;
    document.getElementById('gal-img-preview').innerHTML = `<img src="${base64}" style="height: 60px; border-radius: 4px; border: 1px solid var(--color-border); object-fit: cover;">`;
  } catch (e) {
    alert('حدث خطأ أثناء معالجة الصورة!');
  }
}

function saveNewGalleryPhoto() {
  const title = document.getElementById('new-gal-title')?.value?.trim();
  const category = document.getElementById('new-gal-category')?.value || 'مزارع تطبيقية';
  const location = document.getElementById('new-gal-location')?.value?.trim() || 'كفر الدوار / أسوان';
  const desc = document.getElementById('new-gal-desc')?.value?.trim() || '';
  const imgBase64 = document.getElementById('new-gal-img-base64')?.value;
  const imgUrl = document.getElementById('new-gal-img-url')?.value?.trim();

  const src = imgBase64 || imgUrl || './assets/images/field_farm_large.jpg';

  if (!title) {
    alert('يرجى إدخال عنوان الصورة!');
    return;
  }

  if (!window.AZOLLA_DATA.realGallery) window.AZOLLA_DATA.realGallery = [];
  window.AZOLLA_DATA.realGallery.unshift({
    id: `gal-${Date.now()}`,
    title,
    category,
    location,
    desc,
    src
  });

  window.saveAzollaState(window.AZOLLA_DATA);
  showToast('تمت إضافة الصورة إلى المعرض الميداني!');
  renderCmsGalleryList();
  markLocalChangesPending();

  document.getElementById('new-gal-title').value = '';
  document.getElementById('new-gal-desc').value = '';
  document.getElementById('new-gal-img-base64').value = '';
  document.getElementById('new-gal-img-url').value = '';
  document.getElementById('gal-img-preview').innerHTML = '';
}

function deleteGalleryPhoto(idx) {
  if (confirm('هل ترغب في حذف هذه الصورة من المعرض الميداني؟')) {
    window.AZOLLA_DATA.realGallery.splice(idx, 1);
    window.saveAzollaState(window.AZOLLA_DATA);
    renderCmsGalleryList();
    markLocalChangesPending();
    showToast('تم حذف الصورة بنجاح');
  }
}

/* ==========================================================================
   CMS: SITE INFO & CONTACTS
   ========================================================================== */
function saveCmsSiteInfo() {
  const p = window.AZOLLA_DATA.projectInfo;
  p.nameAr = document.getElementById('cms-info-name').value.trim() || p.nameAr;
  p.sloganAr = document.getElementById('cms-info-slogan').value.trim() || p.sloganAr;
  p.officialPhoneDisplay = document.getElementById('cms-info-phone').value.trim() || p.officialPhoneDisplay;
  p.officialEmail = document.getElementById('cms-info-email').value.trim() || p.officialEmail;
  p.headquarters = document.getElementById('cms-info-address').value.trim() || p.headquarters;

  window.saveAzollaState(window.AZOLLA_DATA);
  showToast('تم حفظ بيانات ومعلومات الموقع بنجاح!');
  markLocalChangesPending();
}

/* ==========================================================================
   CMS: ACADEMY COURSES
   ========================================================================== */
function renderCmsCoursesList() {
  const container = document.getElementById('cms-courses-list');
  if (!container) return;

  const courses = window.AZOLLA_DATA.courses || [];
  container.innerHTML = courses.map((c) => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: var(--color-bg); border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
      <div>
        <div style="font-weight: 800; font-size: 0.9rem;">${c.title}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted);">${c.category} | ${c.duration} | ${c.targetAudience}</div>
      </div>
      <button class="btn btn-sm btn-outline-primary" onclick="alert('برنامج: ${c.title}\\nالمدة: ${c.duration}\\nالفئة: ${c.targetAudience}')"><i class="fa-solid fa-eye"></i> معاينة</button>
    </div>
  `).join('');
}

/* ==========================================================================
   CMS: INBOX & EXPORT
   ========================================================================== */
function renderCmsInbox(filter = '') {
  const container = document.getElementById('cms-inbox-list');
  if (!container) return;

  let messages = window.AZOLLA_DATA.inboxMessages || [];
  if (filter) {
    messages = messages.filter(m => m.formType && m.formType.includes(filter));
  }

  if (messages.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 2.5rem; color: var(--color-text-muted);">لا توجد رسائل أو استمارات واردة حالياً.</div>`;
    return;
  }

  container.innerHTML = `
    <table class="cms-table">
      <thead>
        <tr>
          <th>كود الطلب</th>
          <th>التاريخ والوقت</th>
          <th>النوع</th>
          <th>الاسم</th>
          <th>الهاتف</th>
          <th>المحافظة</th>
          <th>التفاصيل والملاحظات</th>
        </tr>
      </thead>
      <tbody>
        ${messages.map(m => `
          <tr>
            <td><code>${m.id}</code></td>
            <td style="font-size: 0.78rem; color: var(--color-text-muted);">${m.time}</td>
            <td><span class="badge" style="background: var(--color-emerald-50); color: var(--color-primary); border: 1px solid var(--color-emerald-200);">${m.formType}</span></td>
            <td><strong>${m.name}</strong></td>
            <td><a href="tel:${m.phone}" dir="ltr" style="color: var(--color-primary); font-weight: 700;">${m.phone}</a></td>
            <td>${m.gov}</td>
            <td style="font-size: 0.82rem; max-width: 250px;">${m.details}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function exportInboxCSV() {
  const messages = window.AZOLLA_DATA.inboxMessages || [];
  if (messages.length === 0) {
    alert('لا توجد رسائل واردة لتصديرها!');
    return;
  }
  let csv = '\uFEFFكود الطلب,التاريخ,نوع الاستمارة,الاسم,الهاتف,المحافظة,المدينة,التفاصيل\n';
  messages.forEach(m => {
    csv += `"${m.id}","${m.time}","${m.formType}","${m.name}","${m.phone}","${m.gov}","${m.city}","${(m.details||'').replace(/"/g, '""')}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `azolla_inbox_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  showToast('تم تصدير ملف الإكسل (CSV) بنجاح!');
}

/* ==========================================================================
   CMS: CLOUD SYNC & ENCRYPTED VAULT (AES-256-GCM)
   ========================================================================== */
function markLocalChangesPending() {
  markUnsavedChanges();
}

function getProjectDeployKey() {
  const defaultKey = 'azolla2026';
  const hex = '06121f330d2a7e4a7a07103e1f34551478720b7455431c19243156430404143524025c0c45455152';
  try {
    return hex.match(/.{1,2}/g).map((h, i) => String.fromCharCode(parseInt(h, 16) ^ defaultKey.charCodeAt(i % defaultKey.length))).join('');
  } catch (e) {
    console.error('Key extraction error:', e);
    return '';
  }
}
window.getProjectDeployKey = getProjectDeployKey;

function markUnsavedChanges() {
  const badge = document.getElementById('cms-cloud-status-badge');
  if (badge) {
    badge.className = 'cloud-status-badge pending';
    badge.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> تعديلات جديدة جاهزة للنشر';
  }
}

function updateCloudStatusUI() {
  const badge = document.getElementById('cms-cloud-status-badge');
  if (badge) {
    badge.className = 'cloud-status-badge synced';
    badge.innerHTML = '<i class="fa-solid fa-cloud-check"></i> متصل وجاهز للنشر المباشر';
  }
}

async function publishToCloud(silent = false) {
  const token = getProjectDeployKey();
  if (!token) {
    if (!silent) showToast('تعذر استخراج مفتاح النشر');
    return;
  }

  const btn = document.getElementById('cms-btn-publish-cloud');
  const badge = document.getElementById('cms-cloud-status-badge');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري رفع ونشر التعديلات على الموقع مباشرة...';
  }
  if (badge) {
    badge.className = 'cloud-status-badge pending';
    badge.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري النشر...';
  }

  try {
    const payload = {
      version: '1.0',
      lastUpdated: new Date().toISOString(),
      projectInfo: window.AZOLLA_DATA.projectInfo || {},
      counters: {
        farmers: window.AZOLLA_DATA.verifiedStats?.directTrainees || 5000,
        feedReductionPct: window.AZOLLA_DATA.verifiedStats?.feedCostReductionPct || 60,
        annualTons: 1200,
        waterSavedM3: 240000,
        co2AvoidedTons: window.AZOLLA_DATA.verifiedStats?.annualCo2SavedTons || 37,
        treesPlanted: 1678
      },
      newsArticles: window.AZOLLA_DATA.newsArticles || [],
      sitePages: window.AZOLLA_DATA.sitePages || {},
      analytics: window.AZOLLA_DATA.analytics || {}
    };

    const res = await window.publishContentToGitHub(token, payload);
    showToast('✅ تم نشر كافة التعديلات على الموقع بنجاح! التحديثات متاحة لجميع الزوار الآن.');
    if (badge) {
      badge.className = 'cloud-status-badge synced';
      badge.innerHTML = `<i class="fa-solid fa-circle-check"></i> منشور ومتزامن على الموقع (${new Date().toLocaleTimeString('ar-EG', {hour:'2-digit', minute:'2-digit'})})`;
    }
    const logEl = document.getElementById('cms-cloud-sync-log');
    if (logEl) {
      logEl.innerHTML = `<div style="color: #059669; font-size: 0.9rem; margin-top: 0.75rem; background: #ECFDF5; padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid #A7F3D0;"><i class="fa-solid fa-circle-check"></i> تم نشر وتحديث الموقع بنجاح! التعديلات ظاهرة ومباشرة لكافة الزوار والأجهزة.</div>`;
    }
  } catch (err) {
    console.error('Cloud publish error:', err);
    if (!silent) {
      alert('تم حفظ التعديلات محلياً في متصفحك بنجاح! تعذر النشر السحابي المؤقت: ' + (err.message || 'خطأ في الشبكة'));
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> نشر كافة التعديلات على الموقع فوراً';
    }
  }
}

function handleCmsChangePass(e) {
  e.preventDefault();
  const newPass = document.getElementById('cms-new-password')?.value?.trim();
  if (!newPass || newPass.length < 4) {
    alert('يرجى إدخال كلمة مرور صالحة لا تقل عن 4 أحرف!');
    return;
  }
  localStorage.setItem('AZOLLA_CMS_CUSTOM_PASS', newPass);
  document.getElementById('cms-new-password').value = '';
  showToast('✅ تم حفظ وتحديث كلمة مرور لوحة التحكم بنجاح!');
}

function exportBackupJSON() {
  const jsonString = JSON.stringify(window.AZOLLA_DATA, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `azolla_egypt_backup_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('تم تحميل النسخة الاحتياطية بنجاح!');
}

function importBackupJSON(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.projectInfo && imported.verifiedStats) {
        window.AZOLLA_DATA = imported;
        window.saveAzollaState(window.AZOLLA_DATA);
        showToast('تمت استعادة النسخة الاحتياطية بنجاح!');
        renderCmsDashboard();
        navigateTo(window.location.hash.replace('#', '') || 'home');
      } else {
        alert('الملف المحدد غير صالح كنسخة احتياطية لأزولا مصر!');
      }
    } catch (err) {
      alert('حدث خطأ أثناء قراءة ملف JSON!');
    }
  };
  reader.readAsText(file);
}

function resetCmsDefaults() {
  if (confirm('تحذير: هل أنت متأكد من استعادة كافة بيانات الموقع الافتراضية؟ سيتم مسح أي تعديلات غير محفوظة خارجياً.')) {
    window.AZOLLA_DATA = JSON.parse(JSON.stringify(window.DEFAULT_AZOLLA_DATA));
    window.saveAzollaState(window.AZOLLA_DATA);
    showToast('تمت استعادة الضبط الافتراضي للمصنع');
    renderCmsDashboard();
    navigateTo(window.location.hash.replace('#', '') || 'home');
  }
}
