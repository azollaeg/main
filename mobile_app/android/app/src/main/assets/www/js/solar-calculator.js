/**
 * ============================================================================
 * AZOLLA EGYPT — COMPREHENSIVE SOLAR ENERGY CALCULATOR (2026)
 * Real-time Solar Power Sizing, Sizing Models & 1/5/10 Year Financial Projections
 * ============================================================================
 */

(function () {
  'use strict';

  // Global State for Solar Calculator
  window.SolarCalc = {
    activeTab: 'home', // 'home' | 'farm' | 'factory'
    systemMode: 'day', // 'day' | 'hybrid'

    // Dynamic Market Prices (Editable by User)
    elecPrice: 2.80,       // EGP / kWh
    solarKwPriceDay: 30000,    // EGP / kW installed (On-Grid / Direct)
    solarKwPriceHybrid: 58000, // EGP / kW installed (With battery storage)

    // Household Appliances List with Defaults
    appliances: [
      { id: 'ref', nameAr: 'ثلاجة منزلية', nameEn: 'Refrigerator', emoji: '🧊', watts: 200, count: 1, hours: 24 },
      { id: 'freezer', nameAr: 'ديب فريزر', nameEn: 'Deep Freezer', emoji: '❄️', watts: 250, count: 0, hours: 14 },
      { id: 'ac1', nameAr: 'تكييف هواء 1.5 حصان', nameEn: 'AC 1.5 HP', emoji: '💨', watts: 1200, count: 0, hours: 6 },
      { id: 'ac2', nameAr: 'تكييف هواء 2.25/3 حصان', nameEn: 'AC 2.25/3 HP', emoji: '💨', watts: 2000, count: 0, hours: 6 },
      { id: 'tv', nameAr: 'شاشة تلفزيون ورسيفر', nameEn: 'TV & Receiver', emoji: '📺', watts: 100, count: 1, hours: 5 },
      { id: 'pc', nameAr: 'كمبيوتر / لابتوب', nameEn: 'PC / Laptop', emoji: '💻', watts: 120, count: 0, hours: 4 },
      { id: 'led', nameAr: 'لمبات إضاءة LED', nameEn: 'LED Bulbs', emoji: '💡', watts: 15, count: 8, hours: 6 },
      { id: 'fan', nameAr: 'مروحة سقف / مكتب', nameEn: 'Fan', emoji: '🌀', watts: 70, count: 2, hours: 8 },
      { id: 'washer', nameAr: 'غسالة ملابس', nameEn: 'Washing Machine', emoji: '🧺', watts: 500, count: 1, hours: 1.5 },
      { id: 'pump', nameAr: 'موتور رفع مياه (1 حصان)', nameEn: 'Water Pump (1 HP)', emoji: '🚰', watts: 750, count: 0, hours: 1 },
      { id: 'kettle', nameAr: 'سخان / غلاية مياه', nameEn: 'Water Heater / Kettle', emoji: '☕', watts: 1200, count: 0, hours: 1 },
      { id: 'microwave', nameAr: 'ميكروويف / فرن كهربائي', nameEn: 'Microwave / Oven', emoji: '🍲', watts: 1000, count: 0, hours: 0.5 }
    ],

    // Farm Parameters
    farm: {
      type: 'green',       // 'green' | 'animal' | 'fish'
      irrigation: 'drip',  // 'drip' | 'sprinkler' | 'flood' | 'well'
      inputMode: 'hp',     // 'hp' | 'kw' | 'feddan'
      hp: 10,
      feddan: 10,
      customKw: 15
    },

    // Factory Parameters
    factory: {
      customKw: 50,
      monthlyBill: 50000
    },

    // Initialize Calculator
    init: function () {
      this.bindMarketInputs();
      this.renderAppliances();
      this.bindEvents();
      this.calculate();
    },

    // Format Numbers to Localized Currency
    formatMoney: function (num) {
      const lang = window.AZOLLA_CURRENT_LANG || (typeof localStorage !== 'undefined' ? localStorage.getItem('AZOLLA_LANG') : null) || 'ar';
      const currency = lang === 'ar' ? ' ج.م' : ' EGP';
      return Math.round(num).toLocaleString('en-US') + currency;
    },

    // Bind Market Price Ticker Inputs
    bindMarketInputs: function () {
      const elecInp = document.getElementById('solar-mkt-elec');
      const dayKwInp = document.getElementById('solar-mkt-kw-day');
      const hybKwInp = document.getElementById('solar-mkt-kw-hyb');

      if (elecInp) {
        elecInp.value = this.elecPrice;
        elecInp.addEventListener('input', (e) => {
          this.elecPrice = parseFloat(e.target.value) || 2.80;
          this.calculate();
        });
      }

      if (dayKwInp) {
        dayKwInp.value = this.solarKwPriceDay;
        dayKwInp.addEventListener('input', (e) => {
          this.solarKwPriceDay = parseFloat(e.target.value) || 30000;
          this.calculate();
        });
      }

      if (hybKwInp) {
        hybKwInp.value = this.solarKwPriceHybrid;
        hybKwInp.addEventListener('input', (e) => {
          this.solarKwPriceHybrid = parseFloat(e.target.value) || 58000;
          this.calculate();
        });
      }
    },

    // Switch Operating Mode (Day Only vs Day+Night)
    setSystemMode: function (mode) {
      this.systemMode = mode;
      document.querySelectorAll('.solar-mode-card').forEach(card => {
        if (card.getAttribute('data-mode') === mode) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
      this.calculate();
    },

    // Switch Calculator Category Tab (Home, Farm, Factory)
    switchTab: function (tabId) {
      this.activeTab = tabId;
      document.querySelectorAll('.solar-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
      });
      document.querySelectorAll('.solar-tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === 'solar-panel-' + tabId);
      });
      this.calculate();
    },

    // Render Home Appliances Grid
    renderAppliances: function () {
      const grid = document.getElementById('solar-appliances-grid');
      if (!grid) return;

      const lang = window.AZOLLA_CURRENT_LANG || (typeof localStorage !== 'undefined' ? localStorage.getItem('AZOLLA_LANG') : null) || 'ar';
      const isAr = lang === 'ar';
      const wattUnit = isAr ? 'واط' : (lang === 'de' ? 'Watt' : 'Watts');
      const hrsUnit = isAr ? 'س/يوم' : (lang === 'fr' ? 'h/jour' : (lang === 'de' ? 'Std/Tag' : 'hrs/day'));
      const usageLabel = isAr ? 'التشغيل:' : (lang === 'fr' ? 'Durée :' : (lang === 'de' ? 'Betrieb:' : 'Usage:'));

      grid.innerHTML = this.appliances.map(app => {
        const hasItems = app.count > 0;
        const appName = isAr ? app.nameAr : (app.nameEn || app.nameAr);
        return `
          <div class="appliance-item-card ${hasItems ? 'has-items' : ''}" id="app-card-${app.id}">
            <div class="appliance-top">
              <div class="appliance-info">
                <span class="appliance-emoji">${app.emoji}</span>
                <div>
                  <div class="appliance-title">${appName}</div>
                  <div class="appliance-watt">${app.watts} ${wattUnit}</div>
                </div>
              </div>
              <div class="stepper-control">
                <button type="button" class="stepper-btn" onclick="SolarCalc.changeCount('${app.id}', -1)" title="-">-</button>
                <span class="stepper-val" id="count-val-${app.id}">${app.count}</span>
                <button type="button" class="stepper-btn" onclick="SolarCalc.changeCount('${app.id}', 1)" title="+">+</button>
              </div>
            </div>
            <div class="appliance-hours-row">
              <span>${usageLabel} <strong id="hours-val-${app.id}">${app.hours}</strong> ${hrsUnit}</span>
              <input type="range" min="0.5" max="24" step="0.5" value="${app.hours}" 
                     oninput="SolarCalc.changeHours('${app.id}', this.value)">
            </div>
          </div>
        `;
      }).join('');
    },

    // Change Appliance Count
    changeCount: function (appId, delta) {
      const app = this.appliances.find(a => a.id === appId);
      if (!app) return;
      app.count = Math.max(0, Math.min(50, app.count + delta));

      const countEl = document.getElementById('count-val-' + appId);
      const cardEl = document.getElementById('app-card-' + appId);
      if (countEl) countEl.textContent = app.count;
      if (cardEl) cardEl.classList.toggle('has-items', app.count > 0);

      this.calculate();
    },

    // Change Appliance Hours
    changeHours: function (appId, hours) {
      const app = this.appliances.find(a => a.id === appId);
      if (!app) return;
      app.hours = parseFloat(hours) || 1;

      const hoursEl = document.getElementById('hours-val-' + appId);
      if (hoursEl) hoursEl.textContent = app.hours;

      this.calculate();
    },

    // Bind Farm & Factory Event Handlers
    bindEvents: function () {
      // Farm inputs
      const farmTypeSelect = document.getElementById('solar-farm-type');
      if (farmTypeSelect) {
        farmTypeSelect.addEventListener('change', (e) => {
          this.farm.type = e.target.value;
          this.calculate();
        });
      }

      const farmIrrigSelect = document.getElementById('solar-farm-irrig');
      if (farmIrrigSelect) {
        farmIrrigSelect.addEventListener('change', (e) => {
          this.farm.irrigation = e.target.value;
          this.calculate();
        });
      }

      const farmHpInput = document.getElementById('solar-farm-hp');
      if (farmHpInput) {
        farmHpInput.addEventListener('input', (e) => {
          this.farm.hp = parseFloat(e.target.value) || 10;
          document.getElementById('solar-farm-hp-val').textContent = this.farm.hp;
          this.calculate();
        });
      }

      const farmKwInput = document.getElementById('solar-farm-kw');
      if (farmKwInput) {
        farmKwInput.addEventListener('input', (e) => {
          this.farm.customKw = parseFloat(e.target.value) || 0;
          this.calculate();
        });
      }

      // Factory input
      const factKwInput = document.getElementById('solar-fact-kw');
      if (factKwInput) {
        factKwInput.addEventListener('input', (e) => {
          this.factory.customKw = parseFloat(e.target.value) || 50;
          this.calculate();
        });
      }

      const factBillInput = document.getElementById('solar-fact-bill');
      if (factBillInput) {
        factBillInput.addEventListener('input', (e) => {
          this.factory.monthlyBill = parseFloat(e.target.value) || 0;
          this.calculate();
        });
      }
    },

    // Set Farm Input Mode (HP vs Direct kW)
    setFarmInputMode: function (mode) {
      this.farm.inputMode = mode;
      document.querySelectorAll('.solar-farm-mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
      });

      const hpWrap = document.getElementById('solar-farm-hp-wrap');
      const kwWrap = document.getElementById('solar-farm-kw-wrap');
      if (hpWrap && kwWrap) {
        if (mode === 'hp') {
          hpWrap.style.display = 'block';
          kwWrap.style.display = 'none';
        } else {
          hpWrap.style.display = 'none';
          kwWrap.style.display = 'block';
        }
      }
      this.calculate();
    },

    // Master Calculation Method
    calculate: function () {
      const pricePerKw = this.systemMode === 'hybrid' ? this.solarKwPriceHybrid : this.solarKwPriceDay;

      let requiredKw = 0;
      let dailyKwh = 0;
      let categoryLabel = '';

      if (this.activeTab === 'home') {
        categoryLabel = 'منزلي (' + (this.systemMode === 'hybrid' ? 'نهاري وليلي ببطاريات' : 'نهاري اقتصادي') + ')';
        // Calculate total daily Wh
        let totalWh = 0;
        this.appliances.forEach(app => {
          if (app.count > 0) {
            totalWh += app.count * app.watts * app.hours;
          }
        });

        dailyKwh = totalWh / 1000;

        if (dailyKwh === 0) {
          // Minimal baseline
          requiredKw = 1.0;
          dailyKwh = 4.4;
        } else {
          if (this.systemMode === 'hybrid') {
            // Needs 24h battery capacity and solar generation margin (~4.0 peak hours effective)
            requiredKw = Math.max(1.5, Math.round((dailyKwh / 4.0) * 10) / 10);
          } else {
            // Daytime On-Grid / Direct (~4.8 peak hours effective)
            requiredKw = Math.max(1.0, Math.round((dailyKwh / 4.8) * 10) / 10);
          }
        }
      } else if (this.activeTab === 'farm') {
        categoryLabel = 'مزارع (' + (this.systemMode === 'hybrid' ? 'نهاري وليلي' : 'نهاري مباشر/طلمبات') + ')';

        if (this.farm.inputMode === 'kw' && this.farm.customKw > 0) {
          requiredKw = this.farm.customKw;
        } else {
          // Calculate from Horsepower (1 HP = 0.746 kW, pump starting ratio 1.25x - 1.35x solar kWp)
          const hp = this.farm.hp || 10;
          let pumpRatio = 1.25;
          if (this.farm.irrigation === 'sprinkler' || this.farm.irrigation === 'well') pumpRatio = 1.35;
          if (this.farm.type === 'fish') pumpRatio = 1.20;

          requiredKw = Math.max(2.0, Math.round(hp * pumpRatio * 10) / 10);
        }
        dailyKwh = requiredKw * 5.0; // Farm avg ~5 sun hours
      } else if (this.activeTab === 'factory') {
        categoryLabel = 'مصانع ومنشآت (' + (this.systemMode === 'hybrid' ? 'هجين مع تخزين' : 'نهاري متصل بالشبكة') + ')';
        requiredKw = Math.max(5.0, this.factory.customKw || 50);
        dailyKwh = requiredKw * 5.2;
      }

      // Total Capital Cost Estimate
      const totalCost = Math.round(requiredKw * pricePerKw);

      // Annual Energy Generated (kWh per year) ~ 1,650 kWh/kWp in Egypt
      const annualKwh = requiredKw * 1650;

      // Annual Financial Savings (Year 1)
      const annualSavings = Math.round(annualKwh * this.elecPrice);

      // Cumulative Savings
      const savingsYear1 = annualSavings;
      // 5-year savings (accounting for 3% modest annual electricity tariff increase)
      const savingsYear5 = Math.round(annualSavings * 5.3);
      // 10-year savings (accounting for 4% average tariff inflation)
      const savingsYear10 = Math.round(annualSavings * 11.5);

      // Payback Period (ROI)
      const paybackYears = annualSavings > 0 ? (totalCost / annualSavings).toFixed(1) : '3.5';

      // CO2 Avoided (Egypt grid emission factor: ~0.53 kg CO2/kWh)
      const co2Tons = (annualKwh * 0.53 / 1000).toFixed(1);

      // Approximate Panel Count (using modern 550W Tier-1 Mono-PERC panels)
      const panelCount = Math.ceil((requiredKw * 1000) / 550);
      const areaM2 = Math.round(panelCount * 2.6); // ~2.6 m2 per 550W panel

      // Update UI
      this.updateResultsDisplay({
        requiredKw: requiredKw.toFixed(1),
        totalCost: this.formatMoney(totalCost),
        savingsYear1: this.formatMoney(savingsYear1),
        savingsYear5: this.formatMoney(savingsYear5),
        savingsYear10: this.formatMoney(savingsYear10),
        paybackYears: paybackYears,
        co2Tons: co2Tons,
        panelCount: panelCount,
        areaM2: areaM2,
        dailyKwh: dailyKwh.toFixed(1),
        categoryLabel: categoryLabel,
        rawCost: totalCost,
        rawYear1: savingsYear1
      });
    },

    // Update Output Cards in HTML
    updateResultsDisplay: function (data) {
      const safeSet = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };

      const lang = window.AZOLLA_CURRENT_LANG || (typeof localStorage !== 'undefined' ? localStorage.getItem('AZOLLA_LANG') : null) || 'ar';
      const isAr = lang === 'ar';
      const yrUnit = isAr ? ' سنة' : (lang === 'fr' ? ' ans' : (lang === 'de' ? ' Jahre' : ' Years'));
      const co2Unit = isAr ? ' طن/سنة' : (lang === 'fr' ? ' t/an' : (lang === 'de' ? ' t/Jahr' : ' tons/yr'));
      const panelsUnit = isAr ? ' لوح (550W)' : (lang === 'fr' ? ' panneaux (550W)' : (lang === 'de' ? ' Module (550W)' : ' Panels (550W)'));
      const areaUnit = isAr ? ' م²' : ' m²';

      safeSet('solar-res-kw', data.requiredKw + ' kW');
      safeSet('solar-res-cost', data.totalCost);
      safeSet('solar-res-yr1', data.savingsYear1);
      safeSet('solar-res-yr5', data.savingsYear5);
      safeSet('solar-res-yr10', data.savingsYear10);
      safeSet('solar-res-roi', data.paybackYears + yrUnit);
      safeSet('solar-res-co2', data.co2Tons + co2Unit);
      safeSet('solar-res-panels', data.panelCount + panelsUnit);
      safeSet('solar-res-area', data.areaM2 + areaUnit);

      // Update WhatsApp CTA Link
      const waBtn = document.getElementById('solar-btn-whatsapp');
      if (waBtn) {
        const msg = encodeURIComponent(
          `السلام عليكم، قمت بحساب تكلفة محطة الطاقة الشمسية على منصة أزولا مصر:\n` +
          `• القطاع: ${data.categoryLabel}\n` +
          `• القدرة المطلوبة: ${data.requiredKw} كيلووات (${data.panelCount} لوح)\n` +
          `• التكلفة التقديرية: ${data.totalCost}\n` +
          `• الوفر السنوي المتوقع: ${data.savingsYear1}\n` +
          `• فترة الاسترداد: ${data.paybackYears} سنة\n` +
          `أود طلب دراسة جدوى هندسية ومعاينة ميدانية مجانية.`
        );
        waBtn.href = `https://wa.me/201011526504?text=${msg}`;
      }
    },

    // Hook called when language changes
    onLanguageChange: function () {
      this.renderAppliances();
      this.calculate();
    }
  };

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.SolarCalc.init());
  } else {
    window.SolarCalc.init();
  }
})();
