
/* ==========================================================================
   AZOLLA EGYPT (أزولا مصر – ذهب مصر الأخضر)
   Master Application Engine & Dynamic CMS - v7.0 (Pro Max Architecture)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouter();
  initMobileDrawer();
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
  showToast(`تم التبديل إلى ${next === 'dark' ? 'الوضع الليلي' : 'الوضع النهاري'}`);
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
  const contentEl = document.getElementById('app-content');
  if (!contentEl) return;

  const renderFn = routes[pageKey] || routes['home'];
  contentEl.innerHTML = renderFn();

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    if (link.getAttribute('data-page') === pageKey) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  if (pageKey === 'home') {
    animateCounters();
  } else if (pageKey === 'services') {
    initCalculators();
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
  contact: renderContactPage
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

  return `
    <section class="home-hero-section">
      <div class="container">
        <div class="hero-grid">
          <div>
            <h1 class="hero-main-title">
              أزولا مصر… <br><span class="hero-highlight">ذهب مصر الأخضر</span>
            </h1>
            <p class="hero-lead-text">
              المنظومة الوطنية الرائدة لإنتاج سرخس الأزولا الطافي وتخفيض تكاليف الأعلاف بنسبة تصل إلى <strong>60%</strong>، بدعم تنموي من برنامج المنح الصغيرة (SGP/GEF/UNDP) وتنفيذ جمعية الخدمات المتكاملة بكفر الدوار ومزارع أسوان التكاملية.
            </p>

            <div class="hero-cta-row">
              <button class="btn btn-emerald btn-lg" onclick="openModal('modal-farm')">
                <i class="fa-solid fa-seedling"></i> ابدأ حوضك / مزرعتك الآن
              </button>
              <a href="${project.whatsappLink}" target="_blank" rel="noopener" class="btn btn-gold btn-lg" style="background: #25D366; border-color: #25D366;">
                <i class="fa-brands fa-whatsapp"></i> تواصل واتساب: 01026847508
              </a>
              <a href="#about" class="btn btn-outline-white btn-lg">
                <i class="fa-solid fa-circle-info"></i> اكتشف المنظومة
              </a>
            </div>

            <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; font-size: 0.9rem; color: #D1FAE5;">
              <span><i class="fa-solid fa-solar-panel text-gold"></i> 3 محطات طاقة شمسية (25 kW)</span>
              <span>•</span>
              <span><i class="fa-solid fa-users text-gold"></i> 512 خريجاً (62% إناث)</span>
              <span>•</span>
              <span><i class="fa-solid fa-certificate text-gold"></i> إشهار جمعية الخدمات: 1997/752</span>
            </div>
          </div>

          <div class="hero-media-card">
            <img src="./assets/images/field_farm_large.jpg" alt="مزرعة أزولا مصر الحقلية" class="hero-media-img">
            <div class="hero-floating-tag">
              <div style="font-weight: 800; color: #FDE68A; margin-bottom: 0.2rem;">
                <i class="fa-solid fa-location-dot"></i> مزرعة أزولا المفتوحة بكفر الدوار – محافظة البحيرة
              </div>
              <div style="font-size: 0.8rem; color: #E2E8F0;">
                إنتاج يومي للكتلة الحيوية وضخ مياه بالطاقة الشمسية النظيفة بنسبة >90%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-bg-white" style="padding-top: 3.5rem; padding-bottom: 3.5rem;">
      <div class="container">
        <div class="section-header-box" style="margin-bottom: 2.5rem;">
          <h2 class="section-title">إحصائيات وإنجازات موثقة على أرض الواقع</h2>
          <p class="section-desc">مؤشرات الأداء المعتمدة رسمياً من الجهات المانحة الدولية والإدارة الميدانية بكفر الدوار وأسوان.</p>
        </div>

        <div class="stats-dashboard-grid">
          <div class="stat-card">
            <div class="stat-number-box counter-val" data-target="${stats.solarStationsCount}">0</div>
            <div class="stat-card-title">محطات طاقة شمسية</div>
            <div class="stat-card-desc">بقدرة 25 kW لتشغيل 90% من الضخ النظيف</div>
          </div>

          <div class="stat-card">
            <div class="stat-number-box counter-val" data-target="${stats.dailyWaterPumpingM3}">0</div>
            <div class="stat-card-title">م³/يوم سعة ضخ المياه</div>
            <div class="stat-card-desc">خدمة 66 فدان نباتي و8 أفدنة سمكية</div>
          </div>

          <div class="stat-card">
            <div class="stat-number-box counter-val" data-target="${stats.directTrainees}">0</div>
            <div class="stat-card-title">متدرب مباشر معتمد</div>
            <div class="stat-card-desc">62% إناث | 25% شباب | 10% ذوو همم</div>
          </div>

          <div class="stat-card">
            <div class="stat-number-box counter-val" data-target="${stats.feedCostReductionPct}">0</div>
            <div class="stat-card-title">% خفض تكلفة الأعلاف</div>
            <div class="stat-card-desc">في علائق الماشية والدواجن والأسماك</div>
          </div>

          <div class="stat-card">
            <div class="stat-number-box counter-val" data-target="${stats.avgIncomeIncreaseEgp}">0</div>
            <div class="stat-card-title">ج.م زيادة متوسط الدخل</div>
            <div class="stat-card-desc">شهرياً مع 80% تعافي من الفقر المدقع</div>
          </div>

          <div class="stat-card">
            <div class="stat-number-box counter-val" data-target="${stats.annualCo2SavedTons}">0</div>
            <div class="stat-card-title">طن CO₂e خفض كربون سنوياً</div>
            <div class="stat-card-desc">مع توفير 10,200 لتر سولار سنوياً</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-bg-light">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
          <div>
            <h2 class="section-title">سرخس الأزولا: القيمة الغذائية والتحليل المعملي</h2>
            <p class="section-desc" style="margin-bottom: 1.25rem;">
              يتميز سرخس الأزولا بمحتوى بروتيني خام يصل إلى <strong>28.4%</strong> في المتوسط المعملي، مع وفرة في الأحماض الأمينية الأساسية والمعادن، مما يجعله بديلاً واعداً لتخفيض استهلاك الأعلاف المركبة.
            </p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <a href="#science" class="btn btn-primary"><i class="fa-solid fa-flask"></i> التركيب العلمي والمقارنات</a>
              <button class="btn btn-outline-primary" onclick="openLightbox('./assets/images/field_macro_azolla.jpg', 'صورة ماكرو للأزولا', 'فحص معملي ماكرو يوضح نسيج سرخس الأزولا النقي')">
                <i class="fa-solid fa-magnifying-glass"></i> فحص الماكرو المعملي
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

    <section class="section section-bg-white">
      <div class="container">
        <div class="smart-hub-header-card">
          <div>
            <h2 style="font-size: 1.85rem; font-weight: 900; color: #FFFFFF; margin-bottom: 0.5rem;">
              حاسبات الأعلاف والإنتاج والـ ROI التفاعلية
            </h2>
            <p style="color: #CBD5E1; font-size: 0.95rem; max-width: 620px;">
              طُوّرت هذه الحاسبات بالتعاون الاستراتيجي مع <strong>منصة NGO HUB</strong> لتمكين المزارعين والمربين من حساب مساحات الأحواض، خلطات الأعلاف للمواشي والطيور، وحساب الوفر المالي لحظياً.
            </p>
          </div>

          <div style="text-align: center;">
            <div class="smart-hub-logo-tag">
              <img src="./assets/images/logo_ngohub.png" alt="NGO HUB Logo" style="height: 38px;">
              <div style="text-align: right;">
                <div style="font-weight: 800; font-size: 0.9rem; color: #FFFFFF;">NGO HUB</div>
                <div style="font-size: 0.72rem; color: #A7F3D0;">Digital Tech Partner</div>
              </div>
            </div>
            <a href="#services" class="btn btn-gold" style="margin-top: 1rem; width: 100%;">
              <i class="fa-solid fa-calculator"></i> افتح الحاسبات التفاعلية
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-bg-light">
      <div class="container">
        <div class="section-header-box">
          <h2 class="section-title">أكاديمية أزولا مصر (12 برنامجاً معتمداً)</h2>
          <p class="section-desc">تأهيل الكوادر الزراعية والمربين بالشراكة مع مركز التدريب البيئي وحاضنة المرأة.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
          ${courses.map(c => `
            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                <span style="font-size: 0.75rem; font-weight: 700; background: var(--color-gold-50); color: var(--color-gold-dark); padding: 0.15rem 0.5rem; border-radius: var(--radius-full);">${c.duration}</span>
                <span style="font-size: 0.75rem; font-weight: 700; background: var(--color-azure-50); color: var(--color-azure-dark); padding: 0.15rem 0.5rem; border-radius: var(--radius-full);">${c.type}</span>
              </div>
              <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 0.5rem;">${c.title}</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1rem;">${c.desc}</p>
              <button class="btn btn-primary btn-block btn-sm" onclick="openCourseModal('${c.title}')">
                <i class="fa-solid fa-ticket"></i> حجز مقعد بالبرنامج
              </button>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center;">
          <a href="#academy" class="btn btn-outline-primary"><i class="fa-solid fa-graduation-cap"></i> استعرض كافة البرامج الـ 12 للأكاديمية</a>
        </div>
      </div>
    </section>

    <section class="section section-bg-white">
      <div class="container">
        <div class="section-header-box" style="margin-bottom: 2.5rem;">
          <h2 class="section-title">شبكة الشركاء والجهات والتعاون المؤسسي</h2>
          <p class="section-desc">نعتز بالتعاون المشترك مع المنظمات الدولية والمحلية والشركاء التكنولوجيين والتدريبيين.</p>
        </div>

        <div class="partners-logo-wall">
          ${partners.map(p => `
            <div class="partner-wall-card" title="${p.name} - ${p.role}">
              ${p.logo ? `<img src="${p.logo}" alt="${p.name}" class="partner-wall-img">` : `<span style="font-weight: 800; font-size: 0.85rem; color: var(--color-primary);">${p.name}</span>`}
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 2rem;">
          <a href="#partners" class="btn btn-outline-primary"><i class="fa-solid fa-handshake"></i> صفحة الشركاء وتفاصيل الأدوار</a>
        </div>
      </div>
    </section>

    <section class="section section-bg-light">
      <div class="container">
        <div class="section-header-box">
          <h2 class="section-title">معرض التوثيق الميداني الحي</h2>
          <p class="section-desc">مشاهد حقيقية وموثقة من مزارع كفر الدوار وأسوان وجلسات التوعية الحقلية.</p>
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
          <a href="#media" class="btn btn-primary"><i class="fa-solid fa-images"></i> استعراض كافة الصور بالمعرض الميداني</a>
        </div>
      </div>
    </section>

    <section class="section section-bg-white">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
          <div>
            <h2 class="section-title">قصة نجاح وحدة «أم أحمد»: من حوض سطح إلى الاستقلال المالي</h2>
            <p class="section-desc" style="margin-bottom: 1.25rem;">
              أنشأت السيدة سحر (أم أحمد) بكفر الدوار وحدة أسطح منزلية بمساحة 30 م² تنتج يومياً 12-15 كجم أزولا خضراء، مما خفّض فاتورة علف طيورها بنسبة 55% ووفر لأسرتها 3,800 ج.م شهرياً بالتعاون مع حاضنة الأعمال البيئية للمرأة المصرية.
            </p>
            <a href="#impact" class="btn btn-gold"><i class="fa-solid fa-arrow-left"></i> اقرأ تقرير الأثر وتمكين المرأة</a>
          </div>

          <div>
            <div style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--color-border);">
              <img src="./assets/images/field_rooftop_basin.jpg" alt="حوض أزولا فوق السطح" style="width: 100%; height: 320px; object-fit: cover;">
              <div style="padding: 1rem; background: var(--color-surface); font-size: 0.85rem; color: var(--color-text-muted);">
                <i class="fa-solid fa-house-chimney text-gold"></i> حوض الأسطح المنزلي الحقيقي – كفر الدوار (البحيرة)
              </div>
            </div>
          </div>
        </div>
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
                لديك أرض زراعية؟ شاركنا ذهب مصر الأخضر
              </h3>
              <p style="font-size: 0.95rem; color: #E2ECE9; line-height: 1.7; margin-bottom: 1.5rem;">
                نفتح باب الشراكة مع أصحاب وملاك الأراضي الزراعية في كافة المحافظات لإنشاء أحواض إنتاجية ومزارع أزولا كبرى بإشراف ودعم فني وتشغيلي متكامل من <strong>جمعية الخدمات المتكاملة</strong>.
              </p>
            </div>
            <button class="btn btn-gold btn-lg btn-block" onclick="openModal('modal-land-partner')" style="background: #10B981; border-color: #10B981; font-weight: 900;">
              <i class="fa-solid fa-handshake"></i> قدّم أرضك للشراكة الآن
            </button>
          </div>

          <!-- Volunteer Application Card -->
          <div style="background: linear-gradient(135deg, #92400E 0%, #78350F 100%); color: #FFFFFF; border-radius: var(--radius-lg); padding: 2.25rem; box-shadow: var(--shadow-md); border: 2px solid #F59E0B; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="width: 52px; height: 52px; border-radius: var(--radius-md); background: rgba(245, 158, 11, 0.2); color: #FDE68A; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin-bottom: 1.25rem;">
                <i class="fa-solid fa-hand-holding-heart"></i>
              </div>
              <h3 style="font-size: 1.45rem; font-weight: 900; color: #FEF3C7; margin-bottom: 0.75rem;">
                انضم لسفراء البيئة وفريق المتطوعين (GCT)
              </h3>
              <p style="font-size: 0.95rem; color: #FEF3C7; line-height: 1.7; margin-bottom: 1.5rem;">
                شارك معنا في حملات التوعية الحقلية، تدريب المزارعين، التوثيق وصناعة المحتوى الأخضر مع مبادرة <strong>Green Cap Team (GCT)</strong> واكتسب خبرة ميدانية معتمدة.
              </p>
            </div>
            <button class="btn btn-gold btn-lg btn-block" onclick="openModal('modal-volunteer')" style="background: #F59E0B; border-color: #F59E0B; color: #1E293B; font-weight: 900;">
              <i class="fa-solid fa-user-plus"></i> سجّل كمتطوع وسفير بيئي
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

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">عن مشروع أزولا مصر – ذهب مصر الأخضر</h1>
        <p class="hero-lead-text">
          منظومة تنموية زراعية مستدامة تنطلق من كفر الدوار بالبحيرة ومزارع أسوان التكاملية، لبناء نموذج زراعي بيئي مستدام يحقق الأمن الغذائي والمناخي.
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3.5rem;">
          <div style="background: var(--color-emerald-50); border: 1px solid var(--color-emerald-200); border-radius: var(--radius-lg); padding: 2rem;">
            <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary-dark); margin-bottom: 0.75rem;"><i class="fa-solid fa-eye text-emerald"></i> الرؤية الاستراتيجية 2035</h3>
            <p style="color: var(--color-text-main); font-size: 0.95rem; line-height: 1.8;">
              أن تصبح مصر مركزاً إقليمياً ورائداً في إنتاج وتطوير تقنيات الأزولا، وتوفير عليقة علفية مكملة ومستدامة، ودعم خصوبة التربة وتحقيق الأمن الغذائي والمناخي بحلول عام 2035.
            </p>
          </div>

          <div style="background: var(--color-gold-50); border: 1px solid var(--color-gold-200); border-radius: var(--radius-lg); padding: 2rem;">
            <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-gold-dark); margin-bottom: 0.75rem;"><i class="fa-solid fa-bullseye text-gold"></i> رسالة المشروع</h3>
            <p style="color: var(--color-text-main); font-size: 0.95rem; line-height: 1.8;">
              نشر المعرفة وتوطين تكنولوجيا استزراع الأزولا، وتقديم خدمات التصميم، والتدريب العملي، والدعم الفني الميداني، وبناء نماذج زراعية خضراء واعدة تعزز دخل الأسر الريفية وتحمي البيئة.
            </p>
          </div>

          <div style="background: var(--color-azure-50); border: 1px solid var(--color-azure-100); border-radius: var(--radius-lg); padding: 2rem;">
            <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-azure-dark); margin-bottom: 0.75rem;"><i class="fa-solid fa-building-flag text-azure"></i> الجهة التنفيذية الرسمية</h3>
            <p style="color: var(--color-text-main); font-size: 0.95rem; line-height: 1.8;">
              <strong>جمعية الخدمات المتكاملة بكفر الدوار</strong> (مشهرة برقم 1997/752) ومزارع فرع أسوان التكاملية، المعتمدة لإدارة وتطوير المنظومة الميدانية.
            </p>
          </div>
        </div>

        <div class="section-header-box">
          <h2 class="section-title">المحاور السبعة لمنظومة أزولا مصر</h2>
          <p class="section-desc">تكامل شامل بين الإنتاج، الهندسة، التدريب، الجودة، البحث، الاستثمار، والمسؤولية المجتمعية.</p>
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
  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">الأزولا: الخصائص النباتية والتركيب الغذائي</h1>
        <p class="hero-lead-text">
          تعرف على سرخس الأزولا الطافي، قدرته الفائقة على تثبيت النيتروجين، محتواه البروتيني المرتفع (20% - 35%)، ومقارنته بالأعلاف التقليدية.
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; margin-bottom: 4rem;">
          <div>
            <h2 class="section-title">سرخس مائي عائم بتكافل حيوي فريد</h2>
            <p class="section-desc" style="margin-bottom: 1rem;">
              الأزولا (<i>Azolla</i>) سرخس مائي طافٍ يرتبط بعلاقة تكافلية مستمرة مع الطحلب الأزرق المخضر (<i>Anabaena azollae</i>)، الذي يقوم بامتصاص نيتروجين الهواء الجوي وتثبيته مباشرة، محولاً إياه إلى كتلة نباتية غنية بالبروتين الخام والأحماض الأمينية.
            </p>
            <div style="background: var(--color-emerald-50); border: 1px solid var(--color-emerald-200); padding: 1.25rem; border-radius: var(--radius-md);">
              <h4 style="font-weight: 800; color: var(--color-primary-dark); margin-bottom: 0.35rem;"><i class="fa-solid fa-check text-emerald"></i> السلالات المعتمدة بمصر</h4>
              <p style="font-size: 0.88rem; color: var(--color-text-main); margin: 0;">
                <strong>Azolla pinnata:</strong> الأكثر تحملاً للحرارة صيفاً وتأقلماً في محافظات الدلتا والصعيد.<br>
                <strong>Azolla filiculoides:</strong> سلالة ممتازة ذات بروتين مرتفع وتحمل للطقس البارد.
              </p>
            </div>
          </div>

          <div>
            <div style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--color-border);">
              <img src="./assets/images/field_macro_azolla.jpg" alt="صورة ماكرو للأزولا" style="width: 100%; height: 340px; object-fit: cover;">
              <div style="padding: 1rem; background: var(--color-surface); font-size: 0.85rem; color: var(--color-text-muted);">
                <i class="fa-solid fa-camera text-gold"></i> فحص معملي ماكرو يوضح نسيج الأزولا النقي الخالي من الشوائب والآفات
              </div>
            </div>
          </div>
        </div>

        <div style="overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
          <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 0.95rem;">
            <thead>
              <tr style="background: var(--color-primary-dark); color: #FFFFFF;">
                <th style="padding: 1.1rem 1.25rem; font-weight: 800;">المعيار والمؤشر</th>
                <th style="padding: 1.1rem 1.25rem; font-weight: 800; color: #FDE68A;">الأزولا (Azolla Egypt)</th>
                <th style="padding: 1.1rem 1.25rem; font-weight: 800;">البرسيم (Alfalfa)</th>
                <th style="padding: 1.1rem 1.25rem; font-weight: 800;">كسب فول الصويا (Soybean)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--color-border); background: var(--color-emerald-50);">
                <td style="padding: 1rem 1.25rem; font-weight: 800;">البروتين الخام (مادة جافة)</td>
                <td style="padding: 1rem 1.25rem; font-weight: 900; color: var(--color-primary);">20% – 35% (معدل 28.4%)</td>
                <td style="padding: 1rem 1.25rem;">15% – 22%</td>
                <td style="padding: 1rem 1.25rem;">44% – 48%</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 1rem 1.25rem; font-weight: 800;">دورة الحصاد والإنتاج</td>
                <td style="padding: 1rem 1.25rem; font-weight: 700; color: var(--color-primary);">سريعة جداً (حصاد كل 3-5 أيام)</td>
                <td style="padding: 1rem 1.25rem;">حشات دورية (كل 30 يوماً)</td>
                <td style="padding: 1rem 1.25rem;">محصول كامل (4-5 أشهر)</td>
              </tr>
              <tr>
                <td style="padding: 1rem 1.25rem; font-weight: 800;">استهلاك المياه والأرض</td>
                <td style="padding: 1rem 1.25rem; font-weight: 700; color: var(--color-primary);">أحواض مغلقة وتدوير مياه كامل</td>
                <td style="padding: 1rem 1.25rem;">أراضٍ زراعية صالحة للحرث</td>
                <td style="padding: 1rem 1.25rem;">مساحات شاسعة وتسميد كثيف</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function renderServicesPage() {
  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">الخدمات الفنية والحاسبات الزراعية الذكية</h1>
        <p class="hero-lead-text">
          خدمات إنشاء المزارع، توفير التقاوي، الإشراف الفني، والحاسبات التفاعلية المبرمجة بالتعاون مع <strong>NGO HUB</strong>.
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        <div class="smart-hub-header-card">
          <div>
            <h2 style="font-size: 1.85rem; font-weight: 900; color: #FFFFFF; margin-bottom: 0.5rem;">
              بوابة الحاسبات التفاعلية لاتخاذ القرار الزراعي
            </h2>
            <p style="color: #CBD5E1; font-size: 0.95rem; max-width: 650px;">
              تتيح لك هذه الحاسبات الذكية حساب التقاوي، الإنتاجية المتوقعة، خلطات الأعلاف للمواشي والطيور، والوفر المالي المباشر في ثوانٍ معدودة.
            </p>
          </div>

          <div class="smart-hub-logo-tag">
            <img src="./assets/images/logo_ngohub.png" alt="NGO HUB Logo" style="height: 38px;">
            <div style="text-align: right;">
              <div style="font-weight: 800; font-size: 0.9rem; color: #FFFFFF;">NGO HUB</div>
              <div style="font-size: 0.72rem; color: #A7F3D0;">Technology Builder</div>
            </div>
          </div>
        </div>

        <div class="calc-nav-tabs">
          <button class="calc-tab-btn active" onclick="switchCalcTab('tab-basin', this)">
            <i class="fa-solid fa-compass-drafting"></i> 1. حاسبة تصميم الأحواض والإنتاج
          </button>
          <button class="calc-tab-btn" onclick="switchCalcTab('tab-feed', this)">
            <i class="fa-solid fa-cow"></i> 2. حاسبة خلط عليقة الأعلاف
          </button>
          <button class="calc-tab-btn" onclick="switchCalcTab('tab-carbon', this)">
            <i class="fa-solid fa-leaf"></i> 3. حاسبة خفض الانبعاثات
          </button>
          <button class="calc-tab-btn" onclick="switchCalcTab('tab-roi', this)">
            <i class="fa-solid fa-chart-pie"></i> 4. حاسبة العائد الاستثماري
          </button>
        </div>

        <!-- BASIN CALC -->
        <div id="tab-basin" class="calculator-box">
          <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1.5rem;">
            <i class="fa-solid fa-water text-azure"></i> حاسبة مساحات الأحواض والتقاوي والإنتاج اليومي
          </h3>
          <div class="calc-grid-layout">
            <div>
              <div class="form-group">
                <label class="form-label">طول الحوض المتاح (متر) *</label>
                <input type="number" id="calc-basin-length" class="form-control" value="10" min="1" oninput="runBasinCalc()">
              </div>
              <div class="form-group">
                <label class="form-label">عرض الحوض المتاح (متر) *</label>
                <input type="number" id="calc-basin-width" class="form-control" value="5" min="1" oninput="runBasinCalc()">
              </div>
              <div class="form-group">
                <label class="form-label">عمق المياه المستهدف (سم)</label>
                <input type="number" class="form-control" value="15" readonly style="background: var(--color-surface-hover);">
              </div>
            </div>

            <div class="calc-result-panel">
              <div class="result-row">
                <span class="result-label">إجمالي المساحة المائية:</span>
                <span class="result-value" id="res-basin-area">50 م²</span>
              </div>
              <div class="result-row">
                <span class="result-label">احتياج التقاوي الأولية:</span>
                <span class="result-value" id="res-basin-seed">25 كجم</span>
              </div>
              <div class="result-row">
                <span class="result-label">الإنتاج اليومي صيفاً:</span>
                <span class="result-value" id="res-basin-yield-summer">22.5 كجم / يوم</span>
              </div>
              <div class="result-row">
                <span class="result-label">الإنتاج اليومي شتاءً:</span>
                <span class="result-value" id="res-basin-yield-winter">15.0 كجم / يوم</span>
              </div>
              <div class="result-row" style="background: var(--color-surface); padding: 0.75rem; border-radius: var(--radius-sm);">
                <span class="result-label">الوفر المالي الشهري:</span>
                <span class="result-value text-gold" id="res-basin-savings">3,375 ج.م / شهر</span>
              </div>
            </div>
          </div>
        </div>

        <!-- FEED CALC -->
        <div id="tab-feed" class="calculator-box" style="display: none;">
          <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1.5rem;">
            <i class="fa-solid fa-wheat-awn text-gold"></i> حاسبة خلط عليقة الأعلاف المركبة للأبقار والدواجن والأسماك
          </h3>
          <div class="calc-grid-layout">
            <div>
              <div class="form-group">
                <label class="form-label">نوع القطيع أو الحيوانات *</label>
                <select id="calc-feed-type" class="form-control" onchange="runFeedCalc()">
                  <option value="cattle_dairy">أبقار وجاموس حلاب</option>
                  <option value="cattle_beef" selected>أبقار وجاموس تسمين</option>
                  <option value="sheep_goat">أغنام وماعز</option>
                  <option value="poultry_ducks">دواجن وبط ورومي</option>
                  <option value="fish_farm">أسماك مزارع</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">عدد الرؤوس بالقطيع *</label>
                <input type="number" id="calc-feed-heads" class="form-control" value="10" min="1" oninput="runFeedCalc()">
              </div>
              <div class="form-group">
                <label class="form-label">سعر كيلو العلف الجاف (جنيه) *</label>
                <input type="number" id="calc-feed-price" class="form-control" value="22" min="5" oninput="runFeedCalc()">
              </div>
            </div>

            <div class="calc-result-panel">
              <div class="result-row">
                <span class="result-label">إجمالي العلف الجاف:</span>
                <span class="result-value" id="res-feed-total-dry">120 كجم / يوم</span>
              </div>
              <div class="result-row">
                <span class="result-label">العلف الجاف الموفر يومياً:</span>
                <span class="result-value text-emerald" id="res-feed-saved-dry">24 كجم / يوم</span>
              </div>
              <div class="result-row">
                <span class="result-label">الأزولا الطازجة الواجب خلطها:</span>
                <span class="result-value" id="res-feed-azolla-needed">96 كجم / يوم</span>
              </div>
              <div class="result-row" style="background: var(--color-surface); padding: 0.75rem; border-radius: var(--radius-sm);">
                <span class="result-label">الوفر المالي الشهري:</span>
                <span class="result-value text-gold" id="res-feed-monthly-saved">15,840 ج.م / شهر</span>
              </div>
            </div>
          </div>
        </div>

        <!-- CARBON CALC -->
        <div id="tab-carbon" class="calculator-box" style="display: none;">
          <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1.5rem;">
            <i class="fa-solid fa-leaf text-emerald"></i> حاسبة البصمة البيئية وخفض الانبعاثات
          </h3>
          <div class="calc-grid-layout">
            <div>
              <div class="form-group">
                <label class="form-label">إنتاج الأزولا السنوي التقديري (طن) *</label>
                <input type="number" id="calc-carbon-tons" class="form-control" value="20" min="1" oninput="runCarbonCalc()">
              </div>
              <div class="form-group">
                <label class="form-label">السولار الموفر بفضل الطاقة الشمسية (لتر/سنة) *</label>
                <input type="number" id="calc-carbon-diesel" class="form-control" value="10000" min="0" oninput="runCarbonCalc()">
              </div>
            </div>

            <div class="calc-result-panel">
              <div class="result-row">
                <span class="result-label">إجمالي الكربون المتجنب سنوياً:</span>
                <span class="result-value text-emerald" id="res-carbon-total">37.3 طن CO₂e</span>
              </div>
              <div class="result-row" style="background: var(--color-surface); padding: 0.75rem; border-radius: var(--radius-sm);">
                <span class="result-label">ما يعادل زراعة أشجار:</span>
                <span class="result-value text-gold" id="res-carbon-trees">1,678 شجرة</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ROI CALC -->
        <div id="tab-roi" class="calculator-box" style="display: none;">
          <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1.5rem;">
            <i class="fa-solid fa-chart-line text-azure"></i> حاسبة العائد الاستثماري ونماذج المزارع (ROI)
          </h3>
          <div style="text-align: center; margin-bottom: 2rem;">
            <button class="btn btn-gold btn-lg" onclick="openModal('modal-land-partner')" style="background: var(--color-primary); color: #FFF; border-color: var(--color-primary); font-weight: 800;">
              <i class="fa-solid fa-map-location-dot"></i> هل تمتلك أرضاً زراعية؟ قدّمها للشراكة الاستثمارية مع المشروع
            </button>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem;">
            <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
              <h4 style="font-weight: 800; color: var(--color-primary);">وحدة منزلية (30 م²)</h4>
              <div style="font-size: 1.25rem; font-weight: 900; color: var(--color-gold); margin: 0.5rem 0;">25,000 ج.م</div>
              <div style="font-size: 0.85rem; color: var(--color-text-muted);">إنتاج: 3.5 طن/سنة</div>
              <div style="font-weight: 700; color: var(--color-primary); margin-top: 0.75rem;">استرداد: 8 – 10 أشهر</div>
            </div>

            <div style="background: var(--color-emerald-50); border: 2px solid var(--color-primary); border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
              <h4 style="font-weight: 800; color: var(--color-primary);">مزرعة تجارية (0.5 فدان)</h4>
              <div style="font-size: 1.25rem; font-weight: 900; color: var(--color-gold); margin: 0.5rem 0;">120,000 ج.م</div>
              <div style="font-size: 0.85rem; color: var(--color-text-muted);">إنتاج: 18 طن/سنة</div>
              <div style="font-weight: 700; color: var(--color-primary); margin-top: 0.75rem;">استرداد: 12 – 16 شهراً</div>
            </div>

            <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
              <h4 style="font-weight: 800; color: var(--color-primary);">مشروع تجاري كبير (2 فدان)</h4>
              <div style="font-size: 1.25rem; font-weight: 900; color: var(--color-gold); margin: 0.5rem 0;">480,000 ج.م</div>
              <div style="font-size: 0.85rem; color: var(--color-text-muted);">إنتاج: 75 طن/سنة</div>
              <div style="font-weight: 700; color: var(--color-primary); margin-top: 0.75rem;">استرداد: 14 – 18 شهراً</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

function renderAcademyPage() {
  const courses = window.AZOLLA_DATA.courses;

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">أكاديمية أزولا مصر (12 برنامجاً معتمداً)</h1>
        <p class="hero-lead-text">
          برامج تدريبية تطبيقية ومعملية بالتعاون مع <strong>مركز التدريب البيئي</strong> و<strong>حاضنة الأعمال البيئية للمرأة المصرية</strong>.
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 3rem; padding: 1.25rem; background: var(--color-bg); border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="./assets/images/logo_training_center.png" alt="مركز التدريب البيئي" style="height: 44px; border-radius: 4px;">
            <div>
              <div style="font-weight: 800; font-size: 0.95rem;">مركز التدريب البيئي</div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted);">الاعتماد والتدريب الميداني</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="./assets/images/logo_women_incubator.png" alt="حاضنة الأعمال البيئية للمرأة المصرية" style="height: 44px; border-radius: 4px;">
            <div>
              <div style="font-weight: 800; font-size: 0.95rem;">حاضنة الأعمال البيئية للمرأة</div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted);">برنامج المرأة الخضراء المنتجة</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.75rem;">
          ${courses.map(c => `
            <div style="background: var(--color-surface-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                <span style="font-size: 0.78rem; font-weight: 700; background: var(--color-gold-50); color: var(--color-gold-dark); padding: 0.15rem 0.5rem; border-radius: var(--radius-full);">${c.duration}</span>
                <span style="font-size: 0.78rem; font-weight: 700; background: var(--color-azure-50); color: var(--color-azure-dark); padding: 0.15rem 0.5rem; border-radius: var(--radius-full);">${c.type}</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.5rem;">${c.id}. ${c.title}</h3>
              <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 1rem; flex: 1;">${c.desc}</p>
              <div style="font-size: 0.8rem; background: var(--color-bg); padding: 0.5rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
                <strong>المستهدف:</strong> ${c.target}
              </div>
              <button class="btn btn-primary btn-block" onclick="openCourseModal('${c.title}')">
                <i class="fa-solid fa-ticket"></i> حجز مقعد بالبرنامج
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
  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">الأثر، التمكين، والاستدامة (ESG & UN SDGs)</h1>
        <p class="hero-lead-text">
          تقارير وإحصائيات موثقة حول التمكين الاقتصادي للمرأة الريفية، وخفض الانبعاثات، والري بالطاقة الشمسية مع متطوعي Green Cap Team.
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 3rem; align-items: center; margin-bottom: 4rem;">
          <div>
            <h2 class="section-title">62% من مستفيدي المنظومة من المرأة الريفية</h2>
            <p class="section-desc" style="margin-bottom: 1.25rem;">
              يركز مشروع أزولا مصر على تمكين السيدات المعيلات والأسر الأكثر احتياجاً من خلال تدريبهن على إنشاء وحدات الأسطح المنزلية، وتوفير التقاوي النقية بالتعاون مع <strong>حاضنة الأعمال البيئية للمرأة المصرية</strong>.
            </p>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
              <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700;">
                <i class="fa-solid fa-circle-check text-emerald"></i> 80% نسبة التعافي من خط الفقر المدقع للأسر المستفيدة.
              </li>
              <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700;">
                <i class="fa-solid fa-circle-check text-emerald"></i> 3,800 جنيه مصري متوسط الزيادة في الدخل الشهري.
              </li>
              <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700;">
                <i class="fa-solid fa-circle-check text-emerald"></i> 55% وفر مباشر في شراء أعلاف الطيور والمواشي.
              </li>
            </ul>
          </div>

          <div>
            <div style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--color-border);">
              <img src="./assets/images/field_rooftop_basin.jpg" alt="وحدة أم أحمد فوق السطح" style="width: 100%; height: 320px; object-fit: cover;">
              <div style="padding: 1rem; background: var(--color-surface); font-size: 0.85rem; color: var(--color-text-muted);">
                حاضنة الأعمال البيئية للمرأة المصرية – وحدة كفر الدوار
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
            <h2 class="section-title">مبادرة GCT (Green Cap Team): شباب البيئة يصنع بيئة شابة</h2>
            <p class="section-desc" style="margin-bottom: 1.5rem;">
              مبادرة شبابية تطوعية رائدة شاركت بفعالية في تنظيم حملات التوعية الحقلية وورش العمل للمزارعين والسيدات أمام أحواض الأزولا بالقرى والمزارع النموذجية.
            </p>
            <button class="btn btn-primary" onclick="openModal('modal-volunteer')">
              <i class="fa-solid fa-hand-holding-heart"></i> انضم كمتطوع في مبادرة GCT
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderPartnersPage() {
  const partners = window.AZOLLA_DATA.partners;

  const categories = [
    { key: "international", title: "الجهات المانحة والرعاة الدوليون (Institutional Donors)", icon: "fa-earth-americas" },
    { key: "executing", title: "الجهة التنفيذية والميدانية الرئيسية (Executing Entity)", icon: "fa-building-flag" },
    { key: "tech", title: "الشريك التكنولوجي وبناء المنصة الرقمية (Technology Partner)", icon: "fa-laptop-code" },
    { key: "women", title: "التمكين الاقتصادي والريادة للمرأة (Women Empowerment)", icon: "fa-venus" },
    { key: "training", title: "التدريب وبناء القدرات (Capacity Building)", icon: "fa-graduation-cap" },
    { key: "volunteer", title: "المبادرات الشبابية والتطوع الميداني (Youth Volunteers)", icon: "fa-hand-holding-heart" },
    { key: "consulting", title: "الاستشارات وتطوير التدريب (Consulting Solutions)", icon: "fa-briefcase" }
  ];

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">الشركاء، الرعاة، والجهات التنفيذية</h1>
        <p class="hero-lead-text">
          نعتز بالتعاون المشترك مع المنظمات الدولية، والجمعيات الأهلية، والشركاء التكنولوجيين، والمبادرات الشبابية لتحقيق أهداف التنمية الزراعية المستدامة.
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

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">معرض الصور الميدانية الحية</h1>
        <p class="hero-lead-text">
          مشاهد حقيقية وموثقة من مزارع كفر الدوار وأسوان، وأحواض الأسطح المنزلية، وجلسات تدريب وتوعية الفلاحين.
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

  return `
    <header class="home-hero-section" style="padding: 3.5rem 0 3rem;">
      <div class="container">
        <h1 class="hero-main-title" style="font-size: 2.35rem;">تواصل معنا واستفسر عن المنظومة</h1>
        <p class="hero-lead-text">
          فريقنا الفني والميداني جاهز للرد على كافة استفسارات المزارعين والمربين والمستثمرين فوراً.
        </p>
      </div>
    </header>

    <section class="section section-bg-white">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3rem; margin-bottom: 4rem;">
          <div>
            <h2 class="section-title" style="font-size: 1.75rem; margin-bottom: 0.5rem;">أرسل استفسارك أو طلبك الميداني</h2>
            <p class="section-desc" style="margin-bottom: 1.75rem;">املأ البيانات وسيتواصل معك المهندس المختص خلال ساعات عمل رسمية.</p>

            <form onsubmit="handleUniversalFormSubmit(event, 'استفسار تواصل ومزارع')">
              <div class="form-group">
                <label class="form-label">الاسم بالكامل *</label>
                <input type="text" name="name" class="form-control" required placeholder="اسمك الكريم">
              </div>
              <div class="form-group">
                <label class="form-label">رقم الهاتف والواتساب *</label>
                <input type="tel" name="phone" class="form-control" required placeholder="010XXXXXXXX">
              </div>
              <div class="form-group">
                <label class="form-label">الموضوع أو الخدمة المطلوبة *</label>
                <select name="purpose" class="form-control" required>
                  <option value="شراء تقاوي نقية">طلب تقاوي أزولا نقية</option>
                  <option value="إنشاء حوض أو مزرعة">طلب إنشاء حوض / مزرعة أزولا</option>
                  <option value="استشارة تغذية حيوانية">استشارة خلط علائق وتغذية حيوانات</option>
                  <option value="حجز تدريب أكاديمية">استفسار عن تدريب أكاديمية أزولا</option>
                  <option value="شراكة واستثمار">استفسار عام وشراكة واستثمار</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">تفاصيل الاستفسار أو الرسالة *</label>
                <textarea name="message" class="form-control" rows="4" required placeholder="اكتب تفاصيل طلبك أو مساحة موقعك..."></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-lg btn-block"><i class="fa-solid fa-paper-plane"></i> إرسال الاستفسار فوراً</button>
            </form>
          </div>

          <div>
            <div style="background: var(--color-emerald-50); border: 2px solid var(--color-emerald-200); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem;">
              <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1rem;">
                <i class="fa-brands fa-whatsapp text-emerald" style="font-size: 1.75rem;"></i> محادثة واتساب فورية مباشرة
              </h3>
              <p style="font-size: 0.92rem; margin-bottom: 1.25rem; line-height: 1.7;">
                اضغط على الزر التالي لبدء محادثة واتساب فورية مع منسق المشروع برقمنا المعتمد <strong>+201026847508</strong> مع رسالة مجهزة تلقائياً.
              </p>
              <a href="${project.whatsappLink}" target="_blank" rel="noopener" class="btn btn-emerald btn-block btn-lg" style="background: #25D366; border-color: #25D366;">
                <i class="fa-brands fa-whatsapp"></i> تحدث معنا عبر واتساب (01026847508)
              </a>
            </div>

            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-sm);">
              <h4 style="font-weight: 800; font-size: 1.15rem; color: var(--color-primary); margin-bottom: 1rem;">
                <i class="fa-solid fa-building-circle-check text-gold"></i> المقرات والمعلومات الرسمية
              </h4>
              <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem;">
                <div><i class="fa-solid fa-location-dot text-gold"></i> <strong>المقر الرئيسي:</strong> مركز كفر الدوار – محافظة البحيرة.</div>
                <div><i class="fa-solid fa-seedling text-gold"></i> <strong>مزارع الجنوب:</strong> مزارع فرع أسوان التكاملية.</div>
                <div><i class="fa-solid fa-envelope text-gold"></i> <strong>البريد الرسمي:</strong> ${project.officialEmail}</div>
                <div><i class="fa-solid fa-certificate text-gold"></i> <strong>الجهة المنفذة:</strong> جمعية الخدمات المتكاملة بكفر الدوار (إشهار 1997/752).</div>
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
  runBasinCalc();
  runFeedCalc();
  runCarbonCalc();
}

function runBasinCalc() {
  const len = parseFloat(document.getElementById('calc-basin-length')?.value) || 10;
  const wid = parseFloat(document.getElementById('calc-basin-width')?.value) || 5;
  const area = len * wid;
  const seed = area * 0.5;
  const summerYield = (area * 450) / 1000;
  const winterYield = (area * 300) / 1000;
  const monthlySavings = summerYield * 30 * 5.0;

  if (document.getElementById('res-basin-area')) document.getElementById('res-basin-area').innerText = `${area.toFixed(1)} م²`;
  if (document.getElementById('res-basin-seed')) document.getElementById('res-basin-seed').innerText = `${seed.toFixed(1)} كجم`;
  if (document.getElementById('res-basin-yield-summer')) document.getElementById('res-basin-yield-summer').innerText = `${summerYield.toFixed(1)} كجم / يوم`;
  if (document.getElementById('res-basin-yield-winter')) document.getElementById('res-basin-yield-winter').innerText = `${winterYield.toFixed(1)} كجم / يوم`;
  if (document.getElementById('res-basin-savings')) document.getElementById('res-basin-savings').innerText = `${monthlySavings.toLocaleString()} ج.م / شهر`;
}

function runFeedCalc() {
  const typeKey = document.getElementById('calc-feed-type')?.value || 'cattle_beef';
  const heads = parseFloat(document.getElementById('calc-feed-heads')?.value) || 10;
  const priceKg = parseFloat(document.getElementById('calc-feed-price')?.value) || 22;

  const data = window.AZOLLA_DATA.feedRationData[typeKey] || window.AZOLLA_DATA.feedRationData.cattle_beef;
  const totalDryPerDay = heads * data.avgDailyFeedKg;
  const savedDryPerDay = totalDryPerDay * (data.maxInclusionPct / 100);
  const azollaNeededPerDay = savedDryPerDay * data.azollaToConcentrateRatio;
  const monthlySavings = savedDryPerDay * 30 * priceKg;

  if (document.getElementById('res-feed-total-dry')) document.getElementById('res-feed-total-dry').innerText = `${totalDryPerDay.toFixed(1)} كجم / يوم`;
  if (document.getElementById('res-feed-saved-dry')) document.getElementById('res-feed-saved-dry').innerText = `${savedDryPerDay.toFixed(1)} كجم / يوم`;
  if (document.getElementById('res-feed-azolla-needed')) document.getElementById('res-feed-azolla-needed').innerText = `${azollaNeededPerDay.toFixed(1)} كجم / يوم`;
  if (document.getElementById('res-feed-monthly-saved')) document.getElementById('res-feed-monthly-saved').innerText = `${Math.round(monthlySavings).toLocaleString()} ج.م / شهر`;
}

function runCarbonCalc() {
  const tons = parseFloat(document.getElementById('calc-carbon-tons')?.value) || 20;
  const diesel = parseFloat(document.getElementById('calc-carbon-diesel')?.value) || 10000;

  const feedCo2 = ((tons * 250) * 2.1) / 1000;
  const dieselCo2 = (diesel * 2.68) / 1000;
  const totalCo2 = feedCo2 + dieselCo2;
  const trees = Math.round(totalCo2 * 45);

  if (document.getElementById('res-carbon-total')) document.getElementById('res-carbon-total').innerText = `${totalCo2.toFixed(1)} طن CO₂e`;
  if (document.getElementById('res-carbon-trees')) document.getElementById('res-carbon-trees').innerText = `${trees.toLocaleString()} شجرة`;
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
      notes: `${formLabel} | أزولا مصر ذهب مصر الأخضر`
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
  showToast('تم تسجيل الخروج من لوحة التحكم');
}

function switchCmsTab(tabName) {
  ['stats', 'partners', 'articles', 'inbox', 'backup'].forEach(t => {
    const p = document.getElementById(`cms-panel-${t}`);
    const b = document.getElementById(`cms-tab-btn-${t}`);
    if (p) p.style.display = t === tabName ? 'block' : 'none';
    if (b) {
      if (t === tabName) {
        b.className = 'btn btn-sm btn-primary';
      } else {
        b.className = 'btn btn-sm btn-outline-primary';
      }
    }
  });
}

function renderCmsDashboard() {
  const stats = window.AZOLLA_DATA.verifiedStats;
  if (document.getElementById('cms-stat-solar')) document.getElementById('cms-stat-solar').value = stats.solarStationsCount;
  if (document.getElementById('cms-stat-pumping')) document.getElementById('cms-stat-pumping').value = stats.dailyWaterPumpingM3;
  if (document.getElementById('cms-stat-trainees')) document.getElementById('cms-stat-trainees').value = stats.directTrainees;
  if (document.getElementById('cms-stat-feedcost')) document.getElementById('cms-stat-feedcost').value = stats.feedCostReductionPct;
  if (document.getElementById('cms-stat-income')) document.getElementById('cms-stat-income').value = stats.avgIncomeIncreaseEgp;
  if (document.getElementById('cms-stat-co2')) document.getElementById('cms-stat-co2').value = stats.annualCo2SavedTons;

  renderCmsPartnersList();
  renderCmsArticlesList();
  renderCmsInbox();
}

function saveCmsStats() {
  window.AZOLLA_DATA.verifiedStats.solarStationsCount = +document.getElementById('cms-stat-solar').value;
  window.AZOLLA_DATA.verifiedStats.dailyWaterPumpingM3 = +document.getElementById('cms-stat-pumping').value;
  window.AZOLLA_DATA.verifiedStats.directTrainees = +document.getElementById('cms-stat-trainees').value;
  window.AZOLLA_DATA.verifiedStats.feedCostReductionPct = +document.getElementById('cms-stat-feedcost').value;
  window.AZOLLA_DATA.verifiedStats.avgIncomeIncreaseEgp = +document.getElementById('cms-stat-income').value;
  window.AZOLLA_DATA.verifiedStats.annualCo2SavedTons = +document.getElementById('cms-stat-co2').value;

  window.saveAzollaState(window.AZOLLA_DATA);
  showToast('تم حفظ الإحصائيات وتحديث الموقع بنجاح!');
  navigateTo(window.location.hash.replace('#', '') || 'home');
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

function renderCmsArticlesList() {
  const listEl = document.getElementById('cms-articles-list');
  if (!listEl) return;
  listEl.innerHTML = window.AZOLLA_DATA.articles.map((art, idx) => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: var(--color-bg); border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
      <div>
        <div style="font-weight: 800; font-size: 0.9rem;">${art.title}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted);">${art.category} | ${art.date}</div>
      </div>
      <button class="btn btn-sm" style="color: #DC2626;" onclick="deleteArticle(${idx})"><i class="fa-solid fa-trash"></i></button>
    </div>
  `).join('');
}

function toggleAddArticleForm() {
  const box = document.getElementById('cms-add-article-box');
  if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function handleArticleImgUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('new-art-img-base64').value = e.target.result;
  };
  reader.readAsDataURL(file);
}

function saveNewArticle() {
  const title = document.getElementById('new-art-title')?.value;
  const cat = document.getElementById('new-art-cat')?.value || 'أخبار عامة';
  const excerpt = document.getElementById('new-art-excerpt')?.value;
  const content = document.getElementById('new-art-content')?.value;
  const img = document.getElementById('new-art-img-base64')?.value || './assets/images/field_farm_large.jpg';

  if (!title || !content) {
    alert('يرجى ملء عنوان ونص المقال!');
    return;
  }

  window.AZOLLA_DATA.articles.unshift({
    id: `art-${Date.now()}`,
    title,
    category: cat,
    date: 'الآن',
    image: img,
    author: 'إدارة أزولا مصر',
    excerpt: excerpt || title,
    content
  });

  window.saveAzollaState(window.AZOLLA_DATA);
  showToast('تم نشر المقال بنجاح!');
  toggleAddArticleForm();
  renderCmsArticlesList();
}

function deleteArticle(idx) {
  if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
    window.AZOLLA_DATA.articles.splice(idx, 1);
    window.saveAzollaState(window.AZOLLA_DATA);
    renderCmsArticlesList();
    showToast('تم حذف المقال');
  }
}

function renderCmsInbox() {
  const listEl = document.getElementById('cms-inbox-list');
  if (!listEl) return;
  const msgs = window.AZOLLA_DATA.inboxMessages || [];
  if (msgs.length === 0) {
    listEl.innerHTML = '<p style="color: var(--color-text-muted); font-size: 0.9rem;">لا توجد رسائل جديدة في صندوق الوارد.</p>';
    return;
  }
  listEl.innerHTML = `
    <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: right;">
      <thead>
        <tr style="background: var(--color-bg); border-bottom: 2px solid var(--color-border);">
          <th style="padding: 0.5rem;">التاريخ</th>
          <th style="padding: 0.5rem;">الاسم</th>
          <th style="padding: 0.5rem;">الهاتف</th>
          <th style="padding: 0.5rem;">الموضوع</th>
          <th style="padding: 0.5rem;">الحالة</th>
        </tr>
      </thead>
      <tbody>
        ${msgs.map(m => `
          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 0.5rem;">${m.date}</td>
            <td style="padding: 0.5rem; font-weight: 700;">${m.name}</td>
            <td style="padding: 0.5rem;"><a href="tel:${m.phone}" style="color: var(--color-primary);">${m.phone}</a></td>
            <td style="padding: 0.5rem;">${m.subject}</td>
            <td style="padding: 0.5rem;"><span style="background: var(--color-emerald-50); color: var(--color-primary); padding: 2px 6px; border-radius: 4px;">${m.status}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function exportBackupJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.AZOLLA_DATA, null, 2));
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", `azolla_site_backup_${new Date().toISOString().slice(0, 10)}.json`);
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

function saveWebhookUrl() {
  const url = document.getElementById('cms-webhook-url')?.value?.trim();
  if (!url) return;
  if (!window.AZOLLA_DATA.projectInfo) window.AZOLLA_DATA.projectInfo = {};
  window.AZOLLA_DATA.projectInfo.googleSheetWebhookUrl = url;
  window.saveAzollaState(window.AZOLLA_DATA);
  showToast('تم حفظ رابط Google Sheet Webhook بنجاح!');
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
