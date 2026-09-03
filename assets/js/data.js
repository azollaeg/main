/* ==========================================================================
   AZOLLA EGYPT (أزولا مصر – ذهب مصر الأخضر)
   Master Data Repository & Constants - v7.0 (Pro Max + CMS Edition)
   ========================================================================== */

const DEFAULT_AZOLLA_DATA = {
  projectInfo: {
    id: "AZOLLA-EGYPT",
    nameAr: "أزولا مصر",
    nameEn: "Azolla Egypt",
    sloganAr: "ذهب مصر الأخضر",
    sloganEn: "Egypt's Green Gold",
    taglineAr: "من الطبيعة... لصحة أفضل وإنتاج زراعي مستدام",
    domain: "https://azollaegypt.org",
    headquarters: "مركز كفر الدوار – محافظة البحيرة – ومزارع فرع أسوان التكاملية",
    lastUpdated: "2026-08-22",
    officialPhone: "+201026847508",
    officialPhoneDisplay: "01026847508",
    whatsappLink: "https://wa.me/201026847508?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%A3%D8%B2%D9%88%D9%84%D8%A7%20%D9%85%D8%B5%D8%B1%20%D9%88%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D8%A7%D9%84%D9%85%D8%B2%D8%A7%D8%B1%D8%B9%20%D9%88%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%20%D8%A7%D9%84%D9%85%D8%B9%D8%AA%D9%85%D8%AF",
    officialEmail: "info@azollaegypt.org",
    googleSheetWebhookUrl: "https://script.google.com/macros/s/AKfycbzLgr3QjxaKx7Vv9xxF1ELDSh7acdySX9Na5TWHUN8gQ4oVmlbazINuR69cRlSvsAc/exec"
  },

  /* Verified Statistics (SGP/GEF/UNDP Certified 2026) */
  verifiedStats: {
    solarStationsCount: 3,
    solarPowerKw: 25,
    cleanEnergyPct: 90,
    dailyWaterPumpingM3: 2350,
    cultivatedAcresVegetables: 66,
    cultivatedAcresFish: 8,
    directTrainees: 512,
    femalePct: 62,
    youthPct: 25,
    disabledPct: 10,
    awarenessParticipants: 1430,
    indirectReach: 7150,
    feedCostReductionPct: 60,
    jobsCreated: 75,
    avgIncomeIncreaseEgp: 3800,
    povertyRecoveryPct: 80,
    annualCo2SavedTons: 108,
    annualDieselSavedLiters: 10200
  },

  /* Institutional Partners & Collaborators Repository */
  partners: [
    {
      id: "undp",
      name: "برنامج الأمم المتحدة الإنمائي (UNDP)",
      category: "international",
      categoryName: "الجهات المانحة والرعاة الدوليون",
      role: "الجهة المانحة والراعية الدولية الرئيسية",
      logo: "./assets/images/logo_undp.jpg",
      description: "يقدم الدعم التنموي الشامل لتعزيز الاستدامة الزراعية، الأمن الغذائي، والحماية المناخية في جمهورية مصر العربية."
    },
    {
      id: "sgp",
      name: "برنامج المنح الصغيرة (SGP Egypt)",
      category: "international",
      categoryName: "الجهات المانحة والرعاة الدوليون",
      role: "برنامج التمويل التنموي المباشر",
      logo: "./assets/images/logo_sgp.jpg",
      description: "الممول المباشر لمشروع «أزولا مصر» لدعم المبادرات البيئية المحلية والتنمية الريفية المستدامة."
    },
    {
      id: "gef",
      name: "مرفق البيئة العالمية (GEF)",
      category: "international",
      categoryName: "الجهات المانحة والرعاة الدوليون",
      role: "المظلة البيئية الدولية للتمويل",
      logo: "./assets/images/logo_gef.jpg",
      description: "تمويل مشاريع صون التنوع الحيوي، كفاءة الموارد المائية، والحد من الانبعاثات الكربونية في قطاع الزراعة."
    },
    {
      id: "ngo",
      name: "جمعية الخدمات المتكاملة بكفر الدوار",
      category: "executing",
      categoryName: "الجهة التنفيذية والميدانية",
      role: "الجهة التنفيذية والميدانية الرئيسية (مشهرة برقم 1997/752)",
      logo: "./assets/images/logo_ngo.jpg",
      description: "المسؤولة عن العمليات الزراعية، إنشاء وتأهيل الأحواض المائية، توفير التقاوي النقية، الإشراف الفني، وإدارة مزارع كفر الدوار وأسوان."
    },
    {
      id: "ngohub",
      name: "منصة ومبادرة NGO HUB",
      category: "tech",
      categoryName: "الشريك التكنولوجي وبناء المنصة",
      role: "المطور والمنفذ التكنولوجي للمنصة الرقمية والمكون الذكي",
      logo: "./assets/images/logo_ngohub.png",
      badge: "Powered by NGO HUB",
      description: "الشريك التكنولوجي المسؤول عن بناء وتصميم المنصة الرقمية بالكامل، وتطوير المكون الزراعي الذكي (Smart Azolla Tools)، وحاسبات الأعلاف والإنتاج والـ ROI، ورقمنة المعرفة المجتمعية."
    },
    {
      id: "women_incubator",
      name: "حاضنة الأعمال البيئية للمرأة المصرية",
      category: "women",
      categoryName: "التمكين الاقتصادي للمرأة",
      role: "شريك التمكين الاقتصادي والريادة الخضراء للمرأة",
      logo: "./assets/images/logo_women_incubator.png",
      slogan: "نمو مستدام .. لأثر يدوم",
      description: "تأهيل ودعم السيدات الريفيات لإنشاء وحدات إنتاج الأزولا المنزلية وفوق الأسطح، وتحقيق الاكتفاء الذاتي المالي (تمكين 62% من المستفيدات)."
    },
    {
      id: "training_center",
      name: "مركز التدريب البيئي",
      category: "training",
      categoryName: "التدريب وبناء القدرات",
      role: "شريك التدريب وبناء القدرات والاعتماد الفني",
      logo: "./assets/images/logo_training_center.png",
      description: "تقديم البرامج التدريبية الميدانية والتطبيقية، وإعداد وتأهيل الفنيين والمدربين المعتمدين (TOT) لزراعة وتغذية الأزولا."
    },
    {
      id: "gct",
      name: "مبادرة GCT (Green Cap Team)",
      category: "volunteer",
      categoryName: "المبادرات الشبابية والتطوع الميداني",
      role: "مبادرة شبابية تطوعية للتوعية الميدانية والمجتمعية",
      logo: "./assets/images/logo_gct.png",
      slogan: "شباب البيئة يصنع بيئة شابة",
      description: "فريق تطوعي شبابي شارك ميدانياً في تنظيم حملات التوعية الحقلية وورش العمل للمزارعين والسيدات أمام أحواض الأزولا بالقرى والمزارع."
    },
    {
      id: "protic",
      name: "PROTIC Training & Consulting Solutions",
      category: "consulting",
      categoryName: "الاستشارات وتطوير التدريب",
      role: "شريك الحلول والاستشارات التدريبية المعتمدة",
      logo: "./assets/images/logo_protic.png",
      description: "تطوير الحقائب التدريبية المتخصصة والمناهج التطبيقية لأكاديمية أزولا مصر وبناء قدرات الكوادر الزراعية."
    }
  ],

  /* 7 System Pillars */
  pillars: [
    {
      num: "01",
      icon: "fa-box-archive",
      title: "الإنتاج والتقاوي النقية",
      desc: "توفير تقاوي نقية موثوقة مفحوصة معملياً وخالية تماماً من الآفات والحشائش الضارة من سلالات منتخبة."
    },
    {
      num: "02",
      icon: "fa-compass-drafting",
      title: "التصميم والهندسة",
      desc: "رفع المساحات واختيار العوازل المائية والبطانات وتصميم أنظمة التظليل والري وشبكات الضخ الشمسي."
    },
    {
      num: "03",
      icon: "fa-graduation-cap",
      title: "أكاديمية أزولا مصر",
      desc: "تقديم 12 برنامجاً تدريبياً تطبيقياً عبر مركز التدريب البيئي لإعداد المزارعين والمدربين المعتمدين."
    },
    {
      num: "04",
      icon: "fa-user-nurse",
      title: "الدعم الفني والجودة",
      desc: "متابعة دورية لجودة المياه، الـ pH، الملوحة، وفحص الكتلة الحيوية لضمان أقصى إنتاجية للمزارع."
    },
    {
      num: "05",
      icon: "fa-flask",
      title: "البحث والابتكار العلمي",
      desc: "تطوير تقنيات التجفيف، الحفظ، والتعبئة، وإجراء تحاليل المادة الجافة والبروتين بالتعاون مع الجامعات."
    },
    {
      num: "06",
      icon: "fa-chart-pie",
      title: "الاستثمار والجدوى",
      desc: "تقديم دراسات جدوى محدثة ونماذج شراكة تجارية (مزارع كبرى / مزارع شريكة / امتياز تجاري)."
    },
    {
      num: "07",
      icon: "fa-hand-holding-heart",
      title: "التمكين المجتمعي (CSR)",
      desc: "دعم الأسر الأكثر احتياجاً، تمكين المرأة الريفية بنسبة 62%، وتقديم حلول مستدامة لتخفيض الفقر."
    }
  ],

  /* Academy Courses (12 Programs) */
  courses: [
    {
      id: 1,
      category: "beginner",
      title: "أساسيات زراعة واستنبات الأزولا للمبتدئين",
      duration: "يومان (12 ساعة)",
      type: "حضوري / أونلاين",
      target: "المزارعون الجدد والراغبون في إنشاء أحواض صغيرة",
      desc: "التعرف على سلالات الأزولا، تجهيز المياه والتربة، التسميد الأولي، وطرق الحصاد الدوري."
    },
    {
      id: 2,
      category: "commercial",
      title: "إنشاء وإدارة المزارع والأحواض التجارية الكبرى",
      duration: "4 أيام (24 ساعة)",
      type: "ميداني بكفر الدوار وأسوان",
      target: "المستثمرون ومديرو المشروعات الزراعية",
      desc: "الهندسة الهيدروليكية للأحواض الكبرى، شبكات التظليل، حساب التكاليف، وإدارة سلاسل الإمداد."
    },
    {
      id: 3,
      category: "feed",
      title: "تقنيات تصنيع وتكوين علائق الأزولا للحيوانات والطيور والأسماك",
      duration: "3 أيام (18 ساعة)",
      type: "معملي وتطبيقي",
      target: "أصحاب مزارع الإنتاج الحيواني ومصانع الأعلاف",
      desc: "معادلات خلط العلائق، نسب الإدخال الآمنة لكل فئة، وتأثير الأزولا على إدرار اللبن وتسمين اللحوم."
    },
    {
      id: 4,
      category: "women",
      title: "برنامج المرأة الخضراء المنتجة لتأسيس الوحدات المنزلية",
      duration: "5 أيام مكثفة",
      type: "حضوري مجاني مدعوم",
      target: "السيدات والفتيات الريفيات ومعيلات الأسر",
      desc: "بالشراكة مع حاضنة الأعمال البيئية للمرأة المصرية لتأسيس حوض أسطح منزلي وتوفير دخل إضافي."
    },
    {
      id: 5,
      category: "business",
      title: "ريادة الأعمال الخضراء وإدارة المشاريع الناشئة",
      duration: "أسبوع هجين",
      type: "هجين (Zoom + ورش عمل)",
      target: "الشباب ورواد الأعمال البيئيين",
      desc: "بناء خطة العمل، التسويق الرقمي لمحصول الأزولا، دراسة السوق وتأمين قنوات التوزيع."
    },
    {
      id: 6,
      category: "tot",
      title: "برنامج إعداد المدربين المعتمدين (TOT) في تقنيات الأزولا",
      duration: "10 أيام معتمدة",
      type: "تدريب مكثف معتمد",
      target: "المهندسون الزراعيون والمرشدون الميدانيون",
      desc: "بالشراكة مع مركز التدريب البيئي لتخريج مدربين معتمدين لقيادة التوسع في المحافظات."
    },
    {
      id: 7,
      category: "tech",
      title: "إدارة شبكات الري والضخ الشمسي والضبط البيئي للأحواض",
      duration: "3 أيام",
      type: "ميداني وهندسي",
      target: "الفنيون والمهندسون",
      desc: "ربط مضخات المياه بالألواح الشمسية، حساب قدرات الـ Inverter، وصيانة شبكات الضخ النظيف."
    },
    {
      id: 8,
      category: "processing",
      title: "تقنيات التجفيف والتجهيز والحفظ والتعبئة والتخزين السليم",
      duration: "يومان",
      type: "عملي بمعامل المشروع",
      target: "أصحاب الوحدات الإنتاجية",
      desc: "طرق التجفيف الهوائي والشمسي، الحفاظ على القيمة البروتينية، وتجنب التعفن والرطوبة."
    },
    {
      id: 9,
      category: "soil",
      title: "برنامج السماد الحيوي وتحسين خصوبة التربة للأراضي الاستصلاحية",
      duration: "يومان",
      type: "حقلي",
      target: "مزارعو الأراضي الصحراوية والاستصلاح",
      desc: "استخدام الأزولا كسماد أخضر عالي النيتروجين لرفع المادة العضوية وتقليل الأسمدة الكيماوية."
    },
    {
      id: 10,
      category: "quality",
      title: "إدارة المخاطر والآفات وحماية الأحواض من التغيرات المناخية",
      duration: "يومان",
      type: "ميداني",
      target: "القائمون على رعاية الأحواض",
      desc: "الوقاية من الحشرات المائية، الطحالب الخضراء الزرقاء المنافسة، وضبط التظليل الصيفي والصقيع."
    },
    {
      id: 11,
      category: "finance",
      title: "إعداد دراسات الجدوى والتحليل المالي للمشاريع الزراعية",
      duration: "3 أيام",
      type: "تطبيقي أونلاين",
      target: "المستثمرون والمصرفيون والجمعيات",
      desc: "حساب CAPEX و OPEX ونقطة التعادل ومعدل العائد الداخلي (IRR) وفترة الاسترداد."
    },
    {
      id: 12,
      category: "lab",
      title: "إدارة الجودة والاعتماد المعملي للكتلة الحيوية",
      duration: "يومان",
      type: "معملي",
      target: "أخصائيو الجودة والمختبرات",
      desc: "إجراء اختبارات المادة الجافة، فحص البروتين بالمعامل، ومعايير السلامة البيولوجية."
    }
  ],

  /* Real Authentic Media Gallery */
  realGallery: [
    {
      id: "farm-large",
      title: "مزرعة أزولا مفتوحة على مساحة كبرى",
      category: "farms",
      categoryName: "المزارع الميدانية",
      image: "./assets/images/field_farm_large.jpg",
      location: "كفر الدوار – محافظة البحيرة",
      desc: "حوض مائي إنتاجي مفتوح بكامل طاقته التشغيلية يعكس النمو الكثيف لسرخس الأزولا وسط الحقول الزراعية."
    },
    {
      id: "farm-medium",
      title: "حوض أزولا حقلي متوسط معزول بالبطانة المائية",
      category: "farms",
      categoryName: "المزارع الميدانية",
      image: "./assets/images/field_farm_medium.jpg",
      location: "مواقع الإنتاج الميداني",
      desc: "نموذج الأحواض المعزولة بالمشمع المقاوم للحرارة والمخصص للبيئات الحقلية والصحراوية."
    },
    {
      id: "rooftop-basin",
      title: "وحدة أزولا منزلية فوق السطح (مشروع أم أحمد)",
      category: "women",
      categoryName: "تمكين المرأة والوحدات المنزلية",
      image: "./assets/images/field_rooftop_basin.jpg",
      location: "كفر الدوار – البحيرة",
      desc: "حوض منزلي مبني بالطوب والعازل الخفيف فوق الأسطح، يجسد تمكين المرأة الريفية وتحقيق وفر 55% في تكلفة الأعلاف."
    },
    {
      id: "volunteers-gct",
      title: "متطوعو مبادرة GCT الخضراء للتوعية الحقلية",
      category: "training",
      categoryName: "المبادرات والتطوع",
      image: "./assets/images/field_volunteers.jpg",
      location: "الحقول والقرى المستهدفة",
      desc: "فريق شباب البيئة يصنع بيئة شابة (Green Cap Team) بالسترات والكباسين الخضراء أثناء تنظيم الفعاليات الحقلية."
    },
    {
      id: "training-banner",
      title: "جلسة توعية وتدريب ميداني بحضور المزارعات والأهالي",
      category: "training",
      categoryName: "التدريب والتوعية الحقلية",
      image: "./assets/images/field_training_banner.jpg",
      location: "الحقول الإرشادية بكفر الدوار",
      desc: "تدريب تطبيقي وتوعية مباشرة أمام البانر الرسمي للمشروع بمشاركة متطوعي مبادرة GCT والسيدات."
    },
    {
      id: "training-basin",
      title: "ورشة عمل وتوعية عملية أمام حوض الأزولا المظلل",
      category: "training",
      categoryName: "التدريب والتوعية الحقلية",
      image: "./assets/images/field_training_basin.jpg",
      location: "مزارع أزولا النموذجية",
      desc: "شرح عملي للمزارعين وأسرهم حول طرق الحصاد والتغذية وكيفية حماية الأحواض بشباك التظليل الخضراء."
    },
    {
      id: "macro-azolla",
      title: "صورة ماكرو مقربة لنقاء سرخس الأزولا",
      category: "science",
      categoryName: "العلوم والتحليل المعملي",
      image: "./assets/images/field_macro_azolla.jpg",
      location: "الفحص المعملي المباشر",
      desc: "تفاصيل نسيج سرخس الأزولا الطافي وطحلب الأنابينا المثبت للنيتروجين، بمحتوى بروتيني يصل إلى 28.4%."
    }
  ],

  /* Smart Calculator Technical Parameters */
  calcParams: {
    freshYieldSummerGm2Day: 450,
    freshYieldWinterGm2Day: 300,
    azollaDryMatterPct: 0.07,
    proteinInDryMatterPct: 0.28,
    feedCostSavedPerKgEgp: 5.0,
    solarStationCostKwEgp: 15000,
    co2PerKgConcentrateReplaced: 2.1,
    co2PerLiterDieselSaved: 2.68
  },

  /* Feed Ration Guidelines for Smart Calculator */
  feedRationData: {
    cattle_dairy: {
      label: "أبقار وجاموس حلاب",
      avgDailyFeedKg: 15.0,
      maxInclusionPct: 25,
      azollaToConcentrateRatio: 4.0
    },
    cattle_beef: {
      label: "أبقار وجاموس تسمين",
      avgDailyFeedKg: 12.0,
      maxInclusionPct: 20,
      azollaToConcentrateRatio: 4.0
    },
    sheep_goat: {
      label: "أغنام وماعز",
      avgDailyFeedKg: 2.5,
      maxInclusionPct: 25,
      azollaToConcentrateRatio: 3.5
    },
    poultry_ducks: {
      label: "دواجن وبط ورومي",
      avgDailyFeedKg: 0.15,
      maxInclusionPct: 15,
      azollaToConcentrateRatio: 3.0
    },
    fish_farm: {
      label: "أسماك مزارع",
      avgDailyFeedKg: 0.08,
      maxInclusionPct: 30,
      azollaToConcentrateRatio: 2.5
    }
  },

  /* Articles & Success Stories */
  articles: [
    {
      id: "art-1",
      title: "قصة نجاح وحدة «أم أحمد» بكفر الدوار: من حوض سطح صغير إلى الاستقلال المالي",
      date: "أغسطس 2026",
      category: "قصص نجاح",
      image: "./assets/images/field_rooftop_basin.jpg",
      author: "وحدة تمكين المرأة – أزولا مصر",
      excerpt: "كيف تمكنت السيدة سحر من تخفيض فاتورة علف طيورها بنسبة 55% وتوفير 3800 جنيه شهرياً من حوض سطحي 30 م².",
      content: "تمكنت السيدة سحر (أم أحمد) البالغة من العمر 42 عاماً بإحدى قرى كفر الدوار من تأسيس وحدة أسطح منزلية منتجة بمساحة 30 م² بالشراكة مع حاضنة الأعمال البيئية للمرأة المصرية، وتنتج يومياً 12-15 كجم أزولا طازجة وفرت لها 55% من تكاليف العلف."
    },
    {
      id: "art-2",
      title: "دراسة التحليل الكيميائي والبروتيني لكتلة الأزولا الحقلية بمزارع كفر الدوار وأسوان",
      date: "أغسطس 2026",
      category: "أبحاث علمية",
      image: "./assets/images/field_macro_azolla.jpg",
      author: "الفريق الفني والمعملي – مشروع أزولا مصر",
      excerpt: "نتائج معملية موثقة تثبت وصول نسبة البروتين الخام إلى 28.4% متفوقة على البرسيم الحجازي والأعلاف الخضراء.",
      content: "أظهرت التحاليل الكيميائية المعتمدة للكتلة الحيوية المنتجة في مزارع المشروع محتوى بروتيني خام بلغ 28.4% على أساس المادة الجافة، بالإضافة لغناها بالأحماض الأمينية الأساسية والكالسيوم والحديد والبيتاكاروتين."
    },
    {
      id: "art-3",
      title: "اعتماد 3 محطات طاقة شمسية بقدرة 25 كيلووات لضخ المياه النظيفة للزراعة والأسماك",
      date: "يوليو 2026",
      category: "طاقة ومناخ",
      image: "./assets/images/field_farm_large.jpg",
      author: "إدارة المشروعات – جمعية الخدمات المتكاملة",
      excerpt: "تشغيل محطات ضخ بسعة 2350 م³/يوم لخدمة 66 فداناً زراعياً و8 أفدنة سمكية وتوفير 10200 لتر سولار سنوياً.",
      content: "نجح المشروع في تشغيل 3 محطات طاقة شمسية بديلة بقدرة 25 kW لتشغيل مضخات المياه بسعة 2350 م³/يوم بنسبة طاقة نظيفة تتجاوز 90%، مما أدى لخفض 108 أطنان كربون سنوياً."
    }
  ],

  /* FAQs */
  faqData: [
    {
      q: "ما هي الأزولا، ولماذا يُطلق عليها ذهب مصر الأخضر؟",
      a: "الأزولا سرخس مائي عائم سريع النمو يثبت نيتروجين الهواء الجوي تكافلياً، ويحتوي على نسبة بروتين خام تصل إلى 35%، مما يجعله بديلاً واعداً لتخفيض تكاليف الأعلاف المركبة بنسبة تصل إلى 60%."
    },
    {
      q: "هل يمكن زراعة الأزولا فوق أسطح المنازل أو المساحات الصغيرة؟",
      a: "نعم تماماً، يمكن إنشاء أحواض أسطح خفيفة بعمق 15 سم باستخدام الطوب والعازل البلاستيكي لإنتاج أعلاف يومية للطيور والمواشي المنزلية كما في نموذج وحدة أم أحمد."
    },
    {
      q: "ما هي النسبة الآمنة لإدخال الأزولا في عليقة الحيوانات والطيور؟",
      a: "تتراوح النسبة المثالية بين 15% و25% للأبقار والأغنام، و10% إلى 15% للدواجن، وحتى 30% للأسماك، وفق نتائج حاسبة العلائق المعتمدة بالمنصة."
    },
    {
      q: "كيف يمكنني الحصول على التقاوي النقية والتدريب الميداني؟",
      a: "من خلال التواصل المباشر عبر الموقع أو الواتساب (+201026847508) مع جمعية الخدمات المتكاملة بكفر الدوار أو التسجيل في برامج أكاديمية أزولا مصر المعتمدة."
    }
  ],

  /* Contact Submissions Storage in CMS */
  inboxMessages: [
    {
      id: "MSG-101",
      date: "2026-08-22 14:30",
      name: "م. أحمد عبد الرحمن",
      phone: "01012345678",
      subject: "طلب إنشاء مزرعة 2 فدان",
      location: "البحيرة - دمنهور",
      status: "جديد"
    },
    {
      id: "MSG-102",
      date: "2026-08-21 11:15",
      name: "السيدة فاطمة النجار",
      phone: "01298765432",
      subject: "حجز برنامج المرأة الخضراء المنتجة",
      location: "كفر الدوار",
      status: "تم الرد"
    }
  ],

  /* Water Savings & Conservation Engine Data */
  waterConservationData: {
    crops: {
      alfalfa: {
        id: "alfalfa",
        name: "البرسيم الحجازي (Alfalfa)",
        waterM3PerTonDry: 1850,
        waterPerFeddanYearM3: 7500,
        crudeProteinPct: 18.5,
        growthCycleDays: 30,
        icon: "fa-seedling",
        notes: "محصول عالي الشراهة للمياه يتطلب رياً غزيراً مستمراً"
      },
      berseem: {
        id: "berseem",
        name: "البرسيم المصري (Berseem)",
        waterM3PerTonDry: 1450,
        waterPerFeddanYearM3: 6200,
        crudeProteinPct: 15.0,
        growthCycleDays: 25,
        icon: "fa-leaf",
        notes: "محصول شتوي رئيسي يستهلك كميات مياه ضخمة لكل حشة"
      },
      corn_silage: {
        id: "corn_silage",
        name: "سيلاج الذرة (Corn Silage)",
        waterM3PerTonDry: 1200,
        waterPerFeddanYearM3: 5200,
        crudeProteinPct: 8.8,
        growthCycleDays: 90,
        icon: "fa-wheat-awn",
        notes: "يستهلك كميات مياه كبرى بنسبة بروتين منخفضة نسبياً"
      },
      soybean: {
        id: "soybean",
        name: "كسب فول الصويا (Soybean Meal)",
        waterM3PerTonDry: 2400,
        waterPerFeddanYearM3: 4800,
        crudeProteinPct: 38.0,
        growthCycleDays: 110,
        icon: "fa-cubes",
        notes: "بصمة مائية مرتفعة جداً وتكلفة استيرادية باهظة"
      }
    },
    azollaMetrics: {
      dailyEvapLitersPerM2Summer: 4.5,
      dailyEvapLitersPerM2Winter: 2.2,
      saranShadeEvapReductionPct: 35,
      solarClosedLoopRecyclePct: 90,
      avgCrudeProteinPct: 28.4,
      waterPerTonDryClosedLoopM3: 280,
      litersWaterPerCapitaDay: 150
    }
  },

  /* Institutional Privacy, Protection & Governance Policy Data */
  privacyPolicyData: {
    title: "سياسة الخصوصية والحماية وعدم التمييز وتلقي الشكاوى",
    subtitle: "وثيقة الحوكمة الرقمية والعمل المؤسسي لمشروع «أزولا مصر – ذهب مصر الأخضر»",
    version: "الإصدار 1.0 — عام 2026",
    metadata: {
      issuingEntity: "جمعية الخدمات المتكاملة لتنمية المجتمع بكفر الدوار (مشهرة برقم 1997/752) ومزارع فرع أسوان التكاملية",
      intellectualProperty: "مشروع أزولا مصر – ذهب مصر الأخضر بالشراكة مع منصة NGOHUB للتحول الرقمي والأخضر",
      applicationScope: "جميع الجمعيات الشريكة، المستفيدين، المزارعين والمربين، المتدربين، المتطوعين (GCT)، وفرق العمل الميدانية",
      documentStatus: "وثيقة حوكمة وسياسة خصوصية وحماية معتمدة ونافذة إلكترونياً وميدانياً – 2026"
    },
    contact: {
      grievanceEmail: "youssefkhedr92@gmail.com",
      officialEmail: "info@azollaegypt.org",
      hotline: "01026847508"
    }
  }
};

// Initialize State with LocalStorage Sync (static-website-cms-dashboard standard)
function getAzollaState() {
  try {
    const saved = localStorage.getItem('AZOLLA_STORAGE_V7');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading saved state:', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_AZOLLA_DATA));
}

function saveAzollaState(state) {
  try {
    localStorage.setItem('AZOLLA_STORAGE_V7', JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state:', e);
  }
}

let AZOLLA_DATA = getAzollaState();
window.AZOLLA_DATA = AZOLLA_DATA;
window.saveAzollaState = saveAzollaState;
window.DEFAULT_AZOLLA_DATA = DEFAULT_AZOLLA_DATA;
