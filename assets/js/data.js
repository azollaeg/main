/* ==========================================================================
   AZOLLA EGYPT (تكنولوجيا الأعلاف البديلة .. أزولا مصر)
   Master Data Repository & Constants - v8.0 (Full CMS & Cloud Sync Edition)
   ========================================================================== */

const DEFAULT_AZOLLA_DATA = {
  projectInfo: {
    id: "AZOLLA-EGYPT",
    nameAr: "تكنولوجيا الأعلاف البديلة .. أزولا مصر",
    nameEn: "Alternative Feed Technology .. Azolla Egypt",
    sloganAr: "تكنولوجيا الأعلاف البديلة .. أزولا مصر",
    sloganEn: "Alternative Feed Technology .. Azolla Egypt",
    taglineAr: "من الطبيعة... لصحة أفضل وإنتاج زراعي مستدام وتوفير مائي 90%",
    domain: "https://azollaegypt.org",
    headquarters: "مركز كفر الدوار – محافظة البحيرة – ومزارع فرع أسوان التكاملية",
    officialPhone: "01553335579 / 0452182834 (تواصل تليفون فقط)",
    officialPhoneDisplay: "01553335579 / 0452182834",
    phoneMobile: "01553335579",
    phoneLandline: "0452182834",
    phoneNote: "تواصل تليفون فقط علي هذه الأرقام",
    whatsappPhone: "01011526504",
    whatsappLink: "https://wa.me/201011526504?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%AA%D9%83%D9%86%D9%88%D9%84%D9%88%D8%AC%D9%8A%D8%A7%20%D8%A7%D9%84%D8%A3%D8%B9%D9%84%D8%A7%D9%81%20%D8%A7%D9%84%D8%A8%D8%AF%D9%8A%D9%84%D8%A9%20%D8%A3%D8%B2%D9%88%D9%84%D8%A7%20%D9%85%D8%B5%D8%B1",
    officialEmail: "protic1613@gmail.com",
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
      title: "النموذج التطبيقي لوحدة إنتاج الأزولا المنزلية فوق الأسطح",
      category: "women",
      categoryName: "تمكين المرأة والوحدات المنزلية",
      image: "./assets/images/field_rooftop_basin.jpg",
      location: "كفر الدوار – البحيرة",
      desc: "حوض منزلي معزول بمساحة 30 م² فوق الأسطح، يحقق إنتاجية 12-15 كجم يومياً ووفراً بنسبة 55% في تكلفة الأعلاف."
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
      title: "دراسة تطبيقية لنموذج الحوض المنزلي بكفر الدوار: مؤشرات الإنتاجية والجدوى الاقتصادية",
      date: "أغسطس 2026",
      category: "دراسات تطبيقية",
      image: "./assets/images/field_rooftop_basin.jpg",
      author: "الفريق الفني والاقتصادي – أزولا مصر",
      excerpt: "نتائج النموذج التطبيقي لوحدة إنتاجية 30 م²: إنتاج 12-15 كجم يومياً وخفض تكاليف الأعلاف بنسبة 55% مع وفر مالي 3,800 ج.م شهرياً.",
      content: "يوثق هذا النموذج التطبيقي نتائج تشغيل وحدة إنتاج أزولا منزلية بمساحة 30 م² بإحدى قرى كفر الدوار، حيث أظهرت القياسات الميدانية إنتاجية يومية مستقرة بين 12 إلى 15 كجم أزولا طازجة، محققة وفراً بنسبة 55% في تكاليف التغذية و3,800 جنيه شهرياً كنموذج استرشادي للمربين."
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
      a: "نعم تماماً، يمكن إنشاء أحواض أسطح خفيفة بعمق 15 سم باستخدام الطوب والعازل البلاستيكي لإنتاج أعلاف يومية للطيور والمواشي المنزلية كما في النموذج التطبيقي المعتمد بكفر الدوار."
    },
    {
      q: "ما هي النسبة الآمنة لإدخال الأزولا في عليقة الحيوانات والطيور؟",
      a: "تتراوح النسبة المثالية بين 15% و25% للأبقار والأغنام، و10% إلى 15% للدواجن، وحتى 30% للأسماك، وفق نتائج حاسبة العلائق المعتمدة بالمنصة."
    },
    {
      q: "كيف يمكنني الحصول على التقاوي النقية والتدريب الميداني؟",
      a: "من خلال التواصل المباشر عبر الموقع أو الواتساب (+201011526504) مع جمعية الخدمات المتكاملة بكفر الدوار أو التسجيل في برامج أكاديمية أزولا مصر المعتمدة."
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

  /* News & Blog Articles Data (Synchronized with data/content.json) */
  newsArticles: [
    {
      id: "news-1",
      title: "افتتاح التوسعات الإنتاجية لأحواض أسوان بنظام الطاقة الشمسية والتدوير المغلق",
      category: "farms",
      categoryLabel: "أخبار المزارع والحصاد",
      date: "2026-08-28",
      author: "اللجنة الفنية الميدانية",
      readTime: "3 دقائق",
      image: "./assets/images/field_farm_large.jpg",
      featured: true,
      summary: "تدشين المرحلة الثالثة من الأحواض الإنتاجية في فرع أسوان بمساحة تتجاوز 4,200 م² مع نظام ضخ وتدوير يعمل كلياً بالطاقة الشمسية وتظليل سيرام لخفض البخر المائي بنسبة 90%.",
      content: "<p>شهدت مزارع فرع أسوان التكاملية التابعة لمشروع <strong>«تكنولوجيا الأعلاف البديلة .. أزولا مصر»</strong> تدشين التوسعات الإنتاجية الكبرى لعام 2026، والتي تهدف إلى رفع الطاقة الإنتاجية اليومية لتصل إلى أكثر من 1.8 طن من سرخس الأزولا الطازج فائق البروتين.</p><p>تعتمد المنظومة الجديدة على أحواض عازلة بتقنية التدوير المائي المغلق (Closed-loop water recirculation) بالاعتماد الكامل على محطات الطاقة الشمسية الكهروضوئية، مما يحقق صفر استهلاك للوقود الأحفوري وصفر هدر للمياه الجوفية.</p><p>وأكد المهندس المشرف على المزارع أن هذا الإنجاز يأتي ضمن خطة التوسع المدعومة من برنامج المنح الصغيرة (SGP/GEF/UNDP) لنقل التجربة إلى كافة قرى صعيد مصر لتأمين بدائل أعلاف مستدامة لصغار المربين بأسعار تنافسية.</p>"
    },
    {
      id: "news-2",
      title: "انطلاق الدفعة الرابعة لتدريب المرأة الريفية على مزارع أسطح المنازل المنزلية",
      category: "academy",
      categoryLabel: "فعاليات الأكاديمية",
      date: "2026-08-15",
      author: "أكاديمية أزولا مصر",
      readTime: "4 دقائق",
      image: "./assets/images/field_rooftop_basin.jpg",
      featured: false,
      summary: "بدء فعاليات البرنامج التدريبي التمكيني بمشاركة 48 سيدة ريفية لإنشاء وإدارة وحدات الأزولا على أسطح المنازل لتغذية الدواجن والبط وتوفير تكاليف الشراء بنسبة 55%.",
      content: "<p>أعلنت أكاديمية أزولا مصر بالشراكة مع <strong>حاضنة الأعمال البيئية للمرأة المصرية</strong> عن انطلاق الدفعة الرابعة من البرنامج التدريبي المتخصص في تكنولوجيا استزراع الأزولا على أسطح المنازل والمساحات غير المستغلة.</p><p>يشتمل البرنامج على تدريب تطبيقي على تركيب الأحواض الخشبية المعزولة بمشمعات صديقة للبيئة، ضبط درجات الملوحة والحموضة، واستخدام المستخلصات العضوية في التغذية لضمان إنتاج مستمر يصل إلى 3.5 كجم يومياً لكل وحدة 15 م².</p><p>تحصل المتدربات في نهاية الدورة على شهادة معتمدة وحقيبة تقاوي أولية عالية الحيوية للبدء الفوري في مشاريعهن الإنتاجية المنزلية.</p>"
    },
    {
      id: "news-3",
      title: "تقرير بيئي موثق: منظومة الأزولا توفر 88% من استهلاك مياه ري الأعلاف التقليدية",
      category: "environment",
      categoryLabel: "صون المياه والبيئة",
      date: "2026-08-05",
      author: "فريق الرصد البيئي والمائي",
      readTime: "5 دقائق",
      image: "./assets/images/field_training_basin.jpg",
      featured: false,
      summary: "أظهرت نتائج القياسات الميدانية المقارنة على مدار موسم كامل وفر أكثر من 1,600 م³ مياه لكل طن بروتين جاف يتم إنتاجه من الأزولا مقارنة بزراعة البرسيم الحجازي والذرة.",
      content: "<p>أصدر المركز البيئي لبحوث المياه التابع للمشروع تقريره السنوي حول كفاءة الاستهلاك المائي لمنظومة <strong>«تكنولوجيا الأعلاف البديلة .. أزولا مصر»</strong> مقارنة بالأعلاف الحقلية التقليدية في دلتا النيل وصعيد مصر.</p><p>أوضحت النتائج أن الأزولا لا تحتاج إلى غمر أو ري سطحي، حيث يتم الاحتفاظ بالمياه داخل الأحواض لشهور طويلة مع تعويض الفاقد البخري فقط، مما يخفض البصمة المائية بنسبة تتراوح بين 85% إلى 90.2% مع تغطية الشباك الواقية (Saran Net).</p><p>يساهم هذا الوفر في دعم استراتيجية الدولة المصرية للأمن المائي والتكيف مع التغيرات المناخية في قطاع الإنتاج الحيواني والداجني.</p>"
    },
    {
      id: "news-4",
      title: "توقيع مذكرات تفاهم لتوزيع تقاوي أزولا عالية النقاوة على 15 جمعية أهلية شريكة",
      category: "partners",
      categoryLabel: "الشراكات والتمكين",
      date: "2026-07-22",
      author: "إدارة العلاقات والشراكات",
      readTime: "3 دقائق",
      image: "./assets/images/field_training_banner.jpg",
      featured: false,
      summary: "جمعية الخدمات المتكاملة توقع بروتوكولات تعاون مع جمعيات تنموية في محافظات البحيرة والإسكندرية وقنا لتأسيس مشاتل إنتاجية قاعدية وتدريب صغار المزارعين.",
      content: "<p>في إطار خطة التوسع الأفقي وتعظيم الأثر الاجتماعي للمشروع، أبرمت جمعية الخدمات المتكاملة لتنمية المجتمع بكفر الدوار عدداً من مذكرات التفاهم مع 15 جمعية أهلية ومؤسسة مجتمعية.</p><p>يشمل الاتفاق تزويد الجمعيات الشريكة بسلالات الأزولا النقية (Azolla Pinnata) الخالية من الطفيليات والشوائب، مع تقديم الدعم الفني الرقمي من خلال منصة <strong>NGO HUB</strong> لتتبع نسب الإنتاج والوفر المالي للجمعيات والمستفيدين.</p><p>تستهدف هذه الشراكات الوصول إلى أكثر من 3,000 مستفيد ومستفيدة خلال النصف الثاني من عام 2026 لترسيخ نموذج الاقتصاد الدائري الأخضر.</p>"
    }
  ],

  /* Institutional Privacy, Protection & Governance Policy Data */
  privacyPolicyData: {
    title: "سياسة الخصوصية والحماية وعدم التمييز وتلقي الشكاوى",
    subtitle: "وثيقة الحوكمة الرقمية والعمل المؤسسي لمشروع «تكنولوجيا الأعلاف البديلة .. أزولا مصر»",
    version: "الإصدار 1.0 — عام 2026",
    metadata: {
      issuingEntity: "جمعية الخدمات المتكاملة لتنمية المجتمع بكفر الدوار (مشهرة برقم 1997/752) ومزارع فرع أسوان التكاملية",
      intellectualProperty: "مشروع تكنولوجيا الأعلاف البديلة .. أزولا مصر بالشراكة مع منصة NGOHUB للتحول الرقمي والأخضر",
      applicationScope: "جميع الجمعيات الشريكة، المستفيدين، المزارعين والمربين، المتدربين، المتطوعين (GCT)، وفرق العمل الميدانية",
      documentStatus: "وثيقة حوكمة وسياسة خصوصية وحماية معتمدة ونافذة إلكترونياً وميدانياً – 2026"
    },
    contact: {
      grievanceEmail: "protic1613@gmail.com",
      officialEmail: "protic1613@gmail.com",
      phoneCalls: "01553335579 / 0452182834 (تواصل تليفون فقط)",
      hotline: "01553335579 / 0452182834",
      whatsapp: "01011526504"
    }
  },

  /* Web Traffic & User Interactions Analytics Engine Data (100% Real Tracking Starting at 0) */
  analytics: {
    totalViews: 0,
    uniqueVisitors: 0,
    totalSecondsOnSite: 0,
    avgTimeOnPage: 0,
    pageExitPct: 0,
    bouncePct: 0,
    calculatorRuns: 0,
    feedCalculatorRuns: 0,
    waterCalculatorRuns: 0,
    basinCalculatorRuns: 0,
    carbonCalculatorRuns: 0,
    deviceSessions: {
      desktop: 0,
      mobile: 0,
      tablet: 0
    },
    trafficChannels: {
      organic: 0,
      direct: 0,
      social: 0,
      referral: 0,
      paid: 0
    },
    timeline: {
      months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      sessionsMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      sessionsYear: [0, 0, 0, 0],
      years: ['2023', '2024', '2025', '2026']
    },
    recentEvents: []
  },

  /* Master Site Pages & Sections Media/Content Directory */
  sitePages: {
    home: {
      title: "الصفحة الرئيسية",
      icon: "fa-house",
      sections: [
        {
          id: "hero",
          name: "بانر البداية والترحيب (Hero Section)",
          title: "أزولا مصر… تكنولوجيا الأعلاف البديلة",
          lead: "المنظومة الوطنية الرائدة لإنتاج سرخس الأزولا الطافي وتخفيض تكاليف الأعلاف بنسبة تصل إلى 60%، بدعم تنموي من برنامج المنح الصغيرة (SGP/GEF/UNDP) وتنفيذ جمعية الخدمات المتكاملة بكفر الدوار ومزارع أسوان التكاملية.",
          image: "./assets/images/field_farm_large.jpg",
          defaultImage: "./assets/images/field_farm_large.jpg"
        },
        {
          id: "about_intro",
          name: "نبذة عن سر نجاح الأزولا وكفاءة التكلفة",
          title: "لماذا تكنولوجيا سرخس الأزولا؟",
          lead: "تنتج مزارعنا سلالات نقية مضاعفة الكتلة الحيوية كل 3 إلى 5 أيام بمحتوى بروتيني خام يتراوح بين 25% إلى 35%، متفوقة على البرسيم والذرة وفول الصويا وبأقل استهلاك مائي ممكن.",
          image: "./assets/images/azolla_protein_macro.jpg",
          defaultImage: "./assets/images/azolla_protein_macro.jpg"
        }
      ]
    },
    about: {
      title: "عن المشروع والمؤسسين",
      icon: "fa-circle-info",
      sections: [
        {
          id: "vision",
          name: "رؤية ورسالة المشروع والأهداف الاستراتيجية",
          title: "رؤيتنا: الاكتفاء الذاتي الأخضر لمربي مصر",
          lead: "الوصول إلى أكثر من 10,000 مربٍ ومزارع مصري بحلول 2027، وتخفيض فاتورة استيراد الأعلاف التقليدية، وخلق فرص عمل خضراء مستدامة للمرأة والشباب الريفي في الدلتا والصعيد.",
          image: "./assets/images/field_training_basin.jpg",
          defaultImage: "./assets/images/field_training_basin.jpg"
        },
        {
          id: "governance",
          name: "الحوكمة والريادة الميدانية",
          title: "إشراف مؤسسي معتمد وتطبيق ميداني رصين",
          lead: "تدار كافة العمليات الزراعية والتدريبية تحت إشراف مباشر من جمعية الخدمات المتكاملة بكفر الدوار (مشهرة برقم 1997/752) ومزارع فرع أسوان بالتنسيق مع SGP Egypt / UNDP.",
          image: "./assets/images/field_farm_large.jpg",
          defaultImage: "./assets/images/field_farm_large.jpg"
        }
      ]
    },
    science: {
      title: "الأزولا واستخداماته العلمية",
      icon: "fa-flask",
      sections: [
        {
          id: "nutrition",
          name: "التركيب الغذائي والبروتيني المعملي",
          title: "تحليل معملي دقيق: بروتين فائق وأحماض أمينية أساسية",
          lead: "يحتوي سرخس الأزولا الطافي على نسبة بروتين خام 25-35%، وألياف هضمية مثالية، وأحماض أمينية أساسية تعزز مناعة الماشية والطيور والأسماك وترفع معدلات التحويل الغذائي بنسبة 28%.",
          image: "./assets/images/field_training_banner.jpg",
          defaultImage: "./assets/images/field_training_banner.jpg"
        }
      ]
    },
    services: {
      title: "الخدمات والحاسبات الذكية",
      icon: "fa-calculator",
      sections: [
        {
          id: "calc_feed",
          name: "حاسبة الأعلاف والوفر الاقتصادي",
          title: "حاسبة تكاليف الأعلاف والوفر المالي الذكية",
          lead: "أداة خوارزمية دقيقة تمكن المربي من إدخال عدد رؤوس الماشية أو الدواجن واحتساب التوفير المالي الشهري الدقيق وخفض الأعلاف بنسبة تصل إلى 60%.",
          image: "./assets/images/feed_ration_banner.jpg",
          defaultImage: "./assets/images/feed_ration_banner.jpg"
        },
        {
          id: "calc_water",
          name: "حاسبة صون الموارد المائية",
          title: "حاسبة توفير المياه وخفض البصمة المائية",
          lead: "احتساب كميات المياه المحفوظة بالامتار المكعبة سنوياً عند استبدال زراعة البرسيم والأعلاف النجيلية بأحواض الأزولا المغلقة المزودة بشباك الحماية.",
          image: "./assets/images/carbon_reduction_banner.jpg",
          defaultImage: "./assets/images/carbon_reduction_banner.jpg"
        }
      ]
    },
    academy: {
      title: "الأكاديمية والبرامج التدريبية",
      icon: "fa-graduation-cap",
      sections: [
        {
          id: "programs",
          name: "البرامج التدريبية والتأهيل الفني",
          title: "منهج تدريبي تطبيقي متكامل من المزرعة إلى السوق",
          lead: "تتضمن الأكاديمية 12 مساراً تدريبياً معتمداً يشمل: إنشاء الأحواض، ضبط التغذية، رعاية السلالات النقية، إدارة الطاقة الشمسية، وتمكين رائدات الأعمال في القرى.",
          image: "./assets/images/field_rooftop_basin.jpg",
          defaultImage: "./assets/images/field_rooftop_basin.jpg"
        }
      ]
    },
    impact: {
      title: "الأثر البيئي والتمكين المجتمعي",
      icon: "fa-earth-africa",
      sections: [
        {
          id: "impact_solar",
          name: "المناخ وصون المياه والتمكين النسائي",
          title: "أثر حقيقي موثق بالأرقام والشواهد الميدانية",
          lead: "خفض استهلاك الديزل بأكثر من 10,200 لتر سنوياً عبر محطات الطاقة الشمسية، وخفض انبعاثات الكربون بمقدار 108 أطنان مكافئ سنوياً، مع تمكين 62% من السيدات الريفيات المعيلات.",
          image: "./assets/images/field_farm_medium.jpg",
          defaultImage: "./assets/images/field_farm_medium.jpg"
        }
      ]
    },
    partners: {
      title: "الشركاء والجهات المؤسسية",
      icon: "fa-handshake",
      sections: [
        {
          id: "alliances",
          name: "التحالف التنموي والتكنولوجي",
          title: "شراكات استراتيجية لتحقيق استدامة الأمن الغذائي",
          lead: "تحالف مؤسسي رائد يجمع بين الدعم الدولي (SGP / GEF / UNDP)، والخبرة الميدانية لجمعية الخدمات المتكاملة، والشراكة الرقمية لمنصة NGO HUB.",
          image: "./assets/images/logo_azolla.png",
          defaultImage: "./assets/images/logo_azolla.png"
        }
      ]
    },
    privacy: {
      title: "الخصوصية والحوكمة وتلقي الشكاوى",
      icon: "fa-shield-halved",
      sections: [
        {
          id: "governance_policy",
          name: "ميثاق الحوكمة والحماية وعدم التمييز",
          title: "منظومة شكاوى مشفرة والتزام بأعلى معايير الشفافية",
          lead: "تلتزم إدارة المشروع بحماية خصوصية جميع المزارعين والمستفيدين والمتطوعين، مع توفير قناة سرية مشفرة لرفع الملاحظات والشكاوى دون أي إفصاح.",
          image: "./assets/images/logo_ngo.jpg",
          defaultImage: "./assets/images/logo_ngo.jpg"
        }
      ]
    }
  }
};

// Initialize State with LocalStorage & Cloud Sync
function getAzollaState() {
  try {
    const saved = localStorage.getItem('AZOLLA_STORAGE_V8');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.newsArticles || !Array.isArray(parsed.newsArticles)) {
        parsed.newsArticles = DEFAULT_AZOLLA_DATA.newsArticles;
      }
      if (!parsed.analytics || parsed.analytics.totalViews > 1000 || !('feedCalculatorRuns' in parsed.analytics)) {
        parsed.analytics = JSON.parse(JSON.stringify(DEFAULT_AZOLLA_DATA.analytics));
        localStorage.setItem('AZOLLA_STORAGE_V8', JSON.stringify(parsed));
      }
      if (!parsed.sitePages) {
        parsed.sitePages = DEFAULT_AZOLLA_DATA.sitePages;
      }
      return parsed;
    }
  } catch (e) {
    console.error('Error loading saved state:', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_AZOLLA_DATA));
}

function saveAzollaState(state) {
  try {
    localStorage.setItem('AZOLLA_STORAGE_V8', JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state:', e);
  }
}

/* ==========================================================================
   WEB CRYPTO AES-256-GCM ZERO-KNOWLEDGE VAULT (NIST Compliant)
   ========================================================================== */
async function deriveKeyFromPassword(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptSecret(plainText, password) {
  const enc = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKeyFromPassword(password, salt);
  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    enc.encode(plainText)
  );

  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    iv: btoa(String.fromCharCode(...iv)),
    salt: btoa(String.fromCharCode(...salt))
  };
}

async function decryptSecret(vaultObj, password) {
  const dec = new TextDecoder();
  const salt = new Uint8Array(atob(vaultObj.salt).split('').map(c => c.charCodeAt(0)));
  const iv = new Uint8Array(atob(vaultObj.iv).split('').map(c => c.charCodeAt(0)));
  const ciphertext = new Uint8Array(atob(vaultObj.ciphertext).split('').map(c => c.charCodeAt(0)));
  const key = await deriveKeyFromPassword(password, salt);
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    ciphertext
  );
  return dec.decode(decrypted);
}

/* ==========================================================================
   CROSS-DEVICE CLOUD SYNC & GITHUB CONTENT API PUBLISHING
   ========================================================================== */
async function fetchCloudContent() {
  try {
    const res = await fetch(`./data/content.json?_t=${Date.now()}`);
    if (res.ok) {
      const cloud = await res.json();
      if (cloud.newsArticles && Array.isArray(cloud.newsArticles)) {
        window.AZOLLA_DATA.newsArticles = cloud.newsArticles;
      }
      if (cloud.counters) {
        window.AZOLLA_DATA.counters = Object.assign(window.AZOLLA_DATA.counters || {}, cloud.counters);
      }
      if (cloud.projectInfo) {
        window.AZOLLA_DATA.projectInfo = Object.assign(window.AZOLLA_DATA.projectInfo || {}, cloud.projectInfo);
      }
      if (cloud.sitePages) {
        window.AZOLLA_DATA.sitePages = Object.assign(window.AZOLLA_DATA.sitePages || {}, cloud.sitePages);
      }
      if (cloud.analytics) {
        window.AZOLLA_DATA.analytics = Object.assign(window.AZOLLA_DATA.analytics || {}, cloud.analytics);
      }
      saveAzollaState(window.AZOLLA_DATA);
      console.log('✅ Real-time Cloud Content synchronized from GitHub data/content.json');
      return window.AZOLLA_DATA;
    }
  } catch (err) {
    console.warn('Fallback to local stored content:', err);
  }
  return window.AZOLLA_DATA;
}

async function publishContentToGitHub(token, contentData) {
  const repo = 'azollaeg/main';
  const path = 'data/content.json';
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`;

  // 1. Check existing SHA
  let sha = '';
  try {
    const checkRes = await fetch(apiUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (checkRes.ok) {
      const meta = await checkRes.json();
      sha = meta.sha;
    }
  } catch (e) {
    console.warn('Could not fetch existing file SHA:', e);
  }

  // 2. Prepare payload with UTF-8 base64
  contentData.lastUpdated = new Date().toISOString();
  const jsonString = JSON.stringify(contentData, null, 2);
  const utf8Bytes = new TextEncoder().encode(jsonString);
  let binaryString = '';
  utf8Bytes.forEach(b => binaryString += String.fromCharCode(b));
  const base64Content = btoa(binaryString);

  const payload = {
    message: `CMS: update website content and news articles [${new Date().toISOString()}]`,
    content: base64Content
  };
  if (sha) payload.sha = sha;

  // 3. PUT request
  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!putRes.ok) {
    const errObj = await putRes.json().catch(() => ({ message: putRes.statusText }));
    throw new Error(errObj.message || `فشل الحفظ السحابي في GitHub (رمز ${putRes.status})`);
  }

  return await putRes.json();
}

let AZOLLA_DATA = getAzollaState();
window.AZOLLA_DATA = AZOLLA_DATA;
window.saveAzollaState = saveAzollaState;
window.DEFAULT_AZOLLA_DATA = DEFAULT_AZOLLA_DATA;
window.encryptSecret = encryptSecret;
window.decryptSecret = decryptSecret;
window.fetchCloudContent = fetchCloudContent;
window.publishContentToGitHub = publishContentToGitHub;
