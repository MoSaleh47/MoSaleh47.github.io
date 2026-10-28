/* ===========================================================
   Samir Mahamat Saleh - personal site
   Theme toggle, EN/FR switch, nav state, project filters,
   scroll reveal, email assembly.
   English lives in the markup (so it is indexable); this file
   holds the French layer only.
   =========================================================== */

(function () {
  "use strict";

  /* -------------------------------------------------------
     1. Theme
     ------------------------------------------------------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("themeBtn");

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set === "dark" || set === "light") return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* -------------------------------------------------------
     2. Email - assembled at runtime so the address is not
        sitting in the HTML source for scrapers.
     ------------------------------------------------------- */
  var mailUser = ["mahamatsaleh", "samiradam"].join(".");
  var mailHost = ["gmail", "com"].join(".");
  var address = mailUser + "@" + mailHost;

  var mailText = document.getElementById("mailText");
  if (mailText) {
    mailText.textContent = address;
    mailText.href = "mailto:" + address;
  }

  var mailBtn = document.getElementById("mailBtn");
  if (mailBtn) {
    mailBtn.href = "mailto:" + address +
      "?subject=" + encodeURIComponent("Opportunity - AI / Data Engineer");
  }

  /* -------------------------------------------------------
     3. Footer year
     ------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* -------------------------------------------------------
     4. Mobile menu
     ------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* -------------------------------------------------------
     5. Sticky header border + active nav section
     ------------------------------------------------------- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var navAnchors = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a[href^="#"]')
  );
  var watched = navAnchors
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (watched.length && "IntersectionObserver" in window) {
    var setActive = function (id) {
      navAnchors.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
      });
    };

    var navObserver = new IntersectionObserver(function (entries) {
      var visible = entries
        .filter(function (en) { return en.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0.01, 0.2, 0.5] });

    watched.forEach(function (sec) { navObserver.observe(sec); });
  }

  /* -------------------------------------------------------
     6. Reveal on scroll
     ------------------------------------------------------- */
  var revealables = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!revealables.length) {
    /* nothing to do */
  } else if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          obs.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealables.forEach(function (el) { revObserver.observe(el); });
  }

  /* -------------------------------------------------------
     7. Project filters
     ------------------------------------------------------- */
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip[data-filter]"));
  var projects = Array.prototype.slice.call(document.querySelectorAll("#projGrid .proj"));

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.getAttribute("data-filter");

      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });

      projects.forEach(function (card) {
        var tags = (card.getAttribute("data-tags") || "").split(/\s+/);
        var show = filter === "all" || tags.indexOf(filter) !== -1;
        card.hidden = !show;
        if (show) card.classList.add("is-in");
      });
    });
  });

  /* -------------------------------------------------------
     8. French layer
     ------------------------------------------------------- */
  var FR = {
    "skip": "Aller au contenu",

    "nav.about": "Profil",
    "nav.skills": "Compétences",
    "nav.experience": "Expérience",
    "nav.projects": "Projets",
    "nav.research": "Recherche",
    "nav.education": "Formation",
    "nav.cv": "CV",
    "nav.contact": "Contact",

    "hero.pill": "Disponible immédiatement — ouvert aux CDI",
    "hero.role": "Ingénieur IA · Data Scientist &amp; Data Engineer",
    "hero.pitch": "Je construis des systèmes d'IA générative et de données réellement utilisés par des équipes métier — et je mesure rigoureusement s'ils fonctionnent. Deux ans à faire exactement cela au sein de la Direction générale de l'aviation civile.",
    "hero.loc": "Île-de-France, France",
    "hero.open": "CDI · hybride ou sur site",
    "hero.cert": "Microsoft Certified : Azure AI",

    "cta.email": "Me contacter",
    "cta.cv": "Télécharger le CV",

    "stat.yrs": "ans",
    "stat.dgac": "D'alternance à la Direction générale de l'aviation civile (DGAC/DSAC)",
    "stat.fields": "Champs JSON structurés extraits de comptes rendus en texte libre",
    "stat.time": "De temps gagné par déclaration — de plus de 30 min à environ 5",
    "stat.pub": "Prépublication scientifique sur l'évaluation de LLM (SSRN, 2026)",

    "kick.about": "Profil",
    "about.h": "La mesure plutôt que l'intuition",
    "about.sub": "Un profil à double entrée : livrer des systèmes data et GenAI de bout en bout, et démontrer qu'ils tiennent.",
    "about.p1": "Diplômé Bac+5 (titre RNCP niveau 7) en Intelligence artificielle et Science des données de <strong>aivancity School of AI &amp; Data</strong>, <strong>Microsoft Certified: Azure AI Apps and Agents Developer Associate</strong>, et auteur d'une prépublication scientifique sur l'évaluation de LLM.",
    "about.p2": "J'ai passé deux ans en alternance à la <strong>DGAC/DSAC</strong>, à concevoir et livrer des outils d'IA générative utilisés par de vraies équipes métier, dans un environnement public sensible et fortement réglementé. Livrer à de véritables utilisateurs — avec leurs retours, leurs cas limites et leurs contraintes de conformité — m'a appris davantage que n'importe quel benchmark.",
    "about.p3": "Mon travail a deux portes d'entrée. D'un côté, le <strong>traitement de données de bout en bout</strong> : ingestion multi-sources, parsing, nettoyage, contrôles de qualité et de cohérence, APIs et restitution. De l'autre, la conception et surtout l'<strong>évaluation rigoureuse</strong> de systèmes RAG, d'agents et de modèles de classification — groundedness, fidélité des citations, calibration, et la discipline de publier un résultat négatif quand c'est ce que disent les données.",
    "about.p4": "Je démarre un <strong>MSc Data Engineering &amp; Cloud Computing</strong> en novembre 2026 pour approfondir le volet systèmes distribués : Spark, Kafka, Databricks et multi-cloud.",

    "about.facts": "En bref",
    "fact.loc": "Localisation",
    "fact.loc.v": "Île-de-France, France · permis B",
    "fact.avail": "Disponibilité",
    "fact.avail.v": "Immédiate",
    "fact.roles": "Postes visés",
    "fact.roles.v": "Ingénieur IA / GenAI · Data Scientist · Data Engineer · Développeur Python",
    "fact.lang": "Langues",
    "fact.lang.v": "Français (natif) · Anglais (C1)",
    "fact.links": "Liens",

    "kick.skills": "Compétences",
    "skills.h": "Boîte à outils technique",
    "skills.sub": "Ce que j'utilise au quotidien, regroupé comme je travaille vraiment.",

    "sk.lang": "Langages",
    "sk.genai": "IA générative, LLM &amp; agents",
    "sk.eval": "Évaluation &amp; fiabilité",
    "sk.ml": "Machine learning &amp; NLP",
    "sk.data": "Data engineering",
    "sk.back": "Backend &amp; interfaces",
    "sk.cloud": "Cloud &amp; DevOps",
    "sk.analysis": "Analyse &amp; restitution",
    "sk.gov": "Gouvernance &amp; conformité",
    "sk.learning": "En cours d'acquisition — MSc 2026-2027",

    "t.ragdh": "RAG dense &amp; hybride",
    "t.chunk": "Chunking (parent-enfant)",
    "t.rrf": "Reciprocal rank fusion",
    "t.rerank": "Reranking",
    "t.prompt": "Prompt engineering",
    "t.json": "Sorties JSON structurées",
    "t.agents": "Agents &amp; orchestration",
    "t.gold": "Jeux de questions de référence",
    "t.ungrounded": "Taux de réponses non fondées",
    "t.cite": "Fidélité des citations",
    "t.calib": "Calibration",
    "t.pr": "Précision-rappel",
    "t.boot": "IC bootstrap &amp; Wilson",
    "t.imb": "Données déséquilibrées",
    "t.inj": "Tests d'injection de prompt",
    "t.clf": "Classification",
    "t.ie": "Extraction d'information",
    "t.multi": "Ingestion multi-sources",
    "t.parse": "Parsing XML / PDF / JSON",
    "t.clean": "Nettoyage",
    "t.dq": "Data quality",
    "t.batch": "Pipelines batch",
    "t.auto": "Automatisation",
    "t.rest": "APIs REST",
    "t.tests": "Tests &amp; logging",
    "t.sqlan": "SQL analytique",
    "t.doc": "Documentation technique",
    "t.explain": "Vulgarisation auprès des métiers",
    "t.respai": "IA responsable",
    "t.priv": "Confidentialité des données",
    "t.pub": "Réglementation secteur public",
    "t.dist": "Algorithmique distribuée",
    "t.gbm": "Gradient boosting",
    "t.backtest": "Backtesting",

    "kick.exp": "Expérience",
    "exp.h": "Expérience professionnelle",
    "exp.sub": "Cinq ans de pratique appliquée, de l'analyse de données en start-up à l'IA générative dans une autorité publique réglementée.",

    "exp1.role": "Chargé d'études en Data Science — DGAC / DSAC",
    "exp1.when": "Oct. 2024 – Sept. 2026",
    "exp1.org": "Direction générale de l'aviation civile, Direction de la sécurité de l'aviation civile",
    "exp1.b1": "Conception d'une solution IA de traitement des déclarations d'événements de sécurité aérienne, transformant des comptes rendus en texte libre en <strong>48 champs structurés au format JSON</strong>, avec nettoyage, validation d'intégrité et contrôles de cohérence automatisés.",
    "exp1.b2": "Automatisation du pré-remplissage de formulaires réglementaires PDF à partir des données extraites, ramenant le temps de traitement d'une déclaration de <strong>plus de 30 min à environ 5 min</strong>, soit plus de 80 % de temps gagné sur la saisie et la recherche d'informations.",
    "exp1.b3": "Développement d'une chaîne applicative complète en Python : extraction LLM, nettoyage et validation JSON, génération de formulaires, backend FastAPI avec plusieurs endpoints REST et interface web métier.",
    "exp1.b4": "Évaluation de la solution sur <strong>une centaine</strong> d'occurrences réelles de sécurité aérienne, avec vérification des sorties structurées, des champs réglementaires et de la cohérence des données avant utilisation.",
    "exp1.b5": "Mise à disposition et tests auprès de 5 agents métier, avec recueil des retours utilisateurs, corrections, documentation technique et fonctionnelle et amélioration itérative de l'outil.",

    "exp2.role": "Stagiaire développeur Python — UBA Tchad",
    "exp2.when": "Juin – Août 2023",
    "exp2.org": "United Bank for Africa — traitement de données bancaires multi-agences",
    "exp2.place": "Tchad",
    "exp2.b1": "Développement d'une application PyQt5 permettant aux équipes métier d'importer, nettoyer et consolider les fichiers Excel provenant de plusieurs agences bancaires.",
    "exp2.b2": "Automatisation du nettoyage des données avec Python et Pandas, puis génération de visualisations Matplotlib à l'appui de l'analyse et du reporting.",

    "exp3.role": "Data Analyst junior — AI Fashion",
    "exp3.when": "Janv.–mars 2022 · juil.–août 2022",
    "exp3.org": "Projet start-up et stage de validation d'année, Clinique de l'IA aivancity",
    "exp3.place": "À distance",
    "exp3.b1": "Collecte et extraction de données web depuis des sites e-commerce et des marques de parfums et de vêtements, segments luxe et streetwear inclus, pour alimenter des analyses produit.",
    "exp3.b2": "Nettoyage, structuration et stockage des jeux de données avec Excel et Python / Pandas, puis production de visualisations et d'enseignements exploitables.",
    "exp3.b3": "Construction d'un benchmark olfactif fondé sur les ingrédients et les notes, avec analyse comparative des composantes de parfums.",

    "exp4.role": "Data Analyst junior — Bunqr",
    "exp4.when": "Sept. – déc. 2021",
    "exp4.org": "Projet start-up, Clinique de l'IA aivancity",
    "exp4.place": "À distance",
    "exp4.b1": "Projet d'automatisation comptable : lecture de factures par OCR et classification algorithmique des documents dans un plan comptable.",

    "kick.proj": "Projets",
    "proj.h": "Projets sélectionnés",
    "proj.sub": "La plupart sont publics sur GitHub, avec des résultats mesurés plutôt que des démos.",
    "filt.all": "Tous",
    "filt.genai": "GenAI &amp; RAG",
    "filt.eval": "Évaluation &amp; recherche",
    "filt.ml": "ML &amp; simulation",
    "filt.app": "Applications",

    "badge.thesis": "Projet de fin d'études",
    "badge.os": "Open source",
    "badge.pub": "Publication",

    "p1.t": "Where RAG Breaks — question-réponse en réglementation aéronautique",
    "p1.d": "Question-réponse à citations vérifiables sur la réglementation aéronautique européenne, conçu pour identifier où le RAG conventionnel échoue et si un chemin d'escalade calibré y remédie : recherche tenant compte de la hiérarchie, recherche hybride, reranking, vérification et revue humaine. 109 parents juridiques, 1 535 enfants interrogeables, un benchmark de 99 questions reliées aux preuves, sans fuite entre parents.",

    "p2.d": "Un agent RAG qui transforme un cas d'usage IA en cartographie de preuves sourcée au regard du règlement européen sur l'IA, à destination de responsables produit et d'analystes conformité. Découpage parent-enfant, recherche hybride BM25/TF-IDF combinée par reciprocal rank fusion, reranking, puis synthèse en trois passes avec validation par self-consistency (k=3) et étape de critique explicite. Livré avec un serveur MCP à trois outils, du tracing Langfuse, des résultats RAGAS versionnés et cinq scénarios de test d'injection de prompt.",

    "p3.t": "VCBench — évaluation de LLM sur données très déséquilibrées",
    "p3.d": "Code compagnon d'une prépublication SSRN : évaluation de LLM ouverts exécutés localement (Qwen3-32B via Ollama, variante quantifiée GGUF) sur une classification binaire à très faible taux de positifs. Comparaison des stratégies vanilla, chain-of-thought, few-shot et hybride, mesurées par F0.5, précision, rappel, taux de prédictions positives, courbes précision-rappel, intervalles bootstrap et Wilson, face à une baseline régression logistique sur TF-IDF. La conclusion documentée est négative : en petit échantillon, les gains de F0.5 sont instables sans diagnostics de calibration, et la baseline classique reste supérieure.",

    "p4.t": "Hospital Digital Twin",
    "p4.d": "Un jumeau numérique d'hôpital en événements discrets (SimPy) — urgences, réanimation et service général — avec un boarding réaliste : une réanimation saturée bloque les lits d'urgence et la congestion remonte en cascade. Un modèle de gradient boosting prévoit le pic de charge en réanimation à 24 h, backtesté hors échantillon face à une baseline naïve. Sous vague épidémique, un paquet de capacités ciblé fait passer l'attente médiane aux urgences de 4 613 à 71 minutes et traite 63 % de patients en plus ; ajouter des lits d'urgence aurait égalé ce chiffre tout en triplant le temps de boarding. Deux interfaces sur un seul moteur : un command center Flask/ECharts et un tableau de bord Streamlit.",

    "p5.t": "YAKOOTA — assistant d'IA générative",
    "p5.d": "Chatbot documentaire de bout en bout fondé sur le parsing de documents, les embeddings et un workflow de recherche contextualisée, avec tests de robustesse et itérations successives sur la qualité des réponses.",
    "p5.note": "Projet privé — détails sur demande.",

    "p6.t": "EuroMotion Model Factory",
    "p6.d": "Application web de dynamique des systèmes pour la planification stratégique d'une chaîne d'approvisionnement de véhicules électriques et logiciels : moteur de simulation piloté par configuration JSON, diagrammes de nœuds interactifs et restitutions graphiques des scénarios.",

    "p7.t": "Cartoonizer GAN",
    "p7.d": "Réseau antagoniste conditionnel Pix2Pix convertissant des photographies en illustrations de style cartoon : pipeline d'entraînement complet, modèle pré-entraîné livré, application de bureau PyQt5 et évaluation quantitative par SSIM et PSNR.",

    "link.repo": "Dépôt",
    "link.paper": "Prépublication",

    "kick.res": "Références",
    "res.h": "Certification &amp; publication",
    "res.sub": "Les deux sont vérifiables en ligne.",
    "res.cert.meta": "Microsoft · juillet 2026 — valide jusqu'en juillet 2027",
    "res.cert.d": "Périmètre : conception d'applications et d'agents IA sur Azure AI Foundry et Azure OpenAI, RAG, orchestration, évaluation et déploiement responsable.",
    "res.pub.t": "Prépublication — VCBench : évaluation de LLM ouverts",
    "res.pub.d": "Étude de méthodologie sur les modes d'échec et la calibration de LLM ouverts exécutés localement pour la prédiction d'événements rares. Un résultat négatif assumé, documenté avec diagnostics de calibration — parce qu'une évaluation qui ne rapporte que les succès n'est pas une évaluation.",

    "kick.edu": "Formation",
    "edu.h": "Formation",
    "edu1.t": "MSc Data Engineering &amp; Cloud Computing — aivancity",
    "edu1.when": "Nov. 2026 – 2027",
    "edu1.org": "Titre RNCP niveau 7 : Expert infrastructure et traitement des données massives · programme enseigné en anglais",
    "edu1.b1": "Spark, Kafka, MongoDB, Databricks, AWS et Azure, algorithmique distribuée, gestion de projets orientés données, certifications cloud.",
    "edu2.t": "Programme Grande École — aivancity School of AI &amp; Data",
    "edu2.when": "2021 – 2026",
    "edu2.org": "Diplôme d'études supérieures en Intelligence artificielle et Science des données (RNCP38584, niveau 7, Bac+5)",
    "edu2.b1": "Cursus hybride associant intelligence artificielle, science des données, culture business, éthique de l'IA, RGPD et AI Act, gestion de projet, innovation et transformation digitale.",
    "edu2.b2": "Projets menés au sein de la Clinique de l'IA, le dispositif de mise en situation réelle d'aivancity sur des besoins d'entreprises et de start-up.",

    "langs.h": "Langues",
    "lang.fr": "Français",
    "lang.fr.n": "Courant, professionnel",
    "lang.fr.l": "Natif",
    "lang.en": "Anglais",
    "lang.en.n": "Master suivi en anglais · lecture technique quotidienne",

    "str.h": "Ma façon de travailler",
    "str.1": "Rigueur méthodologique, et goût de la mesure plutôt que de l'intuition",
    "str.2": "Autonomie et curiosité technique",
    "str.3": "Capacité à expliquer un travail technique à des interlocuteurs non techniques",
    "str.4": "Documentation systématique",
    "str.5": "À l'aise en équipe pluridisciplinaire",

    "kick.cv": "CV",
    "cv.h": "Télécharger mon CV",
    "cv.sub": "Choisissez la version la plus proche du poste que vous recrutez — ou prenez la version complète.",
    "cv.en.d": "GenAI, RAG et agents LLM. La version anglaise du CV.",
    "cv.genai.d": "Applications GenAI de bout en bout, RAG, agents et workflows.",
    "cv.de.d": "Pipelines, transformations, qualité des données et industrialisation.",
    "cv.fs.d": "Python et Flask, React 18 et TypeScript, APIs REST, CI/CD.",
    "cv.full.t": "CV complet — tous les détails <span class=\"cv-lang\">FR</span>",
    "cv.full.d": "La version longue : compétences complètes, tous les projets, expérience détaillée.",

    "kick.contact": "Contact",
    "contact.h": "Échangeons",
    "contact.sub": "Je suis disponible immédiatement et ouvert aux CDI en ingénierie IA, data science et data engineering en Île-de-France. Si mon profil correspond à un poste que vous recrutez, je serai ravi d'en discuter.",
    "contact.mail": "M'envoyer un email",
    "contact.li": "Me contacter sur LinkedIn",
    "contact.gh": "Voir mon code",
    "contact.or": "Ou écrivez directement à",

    "footer.top": "Haut de page"
  };

  var UI = {
    en: { label: "FR", aria: "Switch to French", title: "Français" },
    fr: { label: "EN", aria: "Passer en anglais", title: "English" }
  };

  var i18nNodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var english = new Map();
  i18nNodes.forEach(function (el) {
    english.set(el, el.innerHTML);
  });

  var langBtn = document.getElementById("langBtn");
  var lang = "en";

  function applyLang(next) {
    lang = next === "fr" ? "fr" : "en";

    i18nNodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (lang === "fr") {
        if (Object.prototype.hasOwnProperty.call(FR, key)) el.innerHTML = FR[key];
      } else {
        el.innerHTML = english.get(el);
      }
    });

    root.setAttribute("lang", lang);

    if (langBtn) {
      langBtn.textContent = UI[lang].label;
      langBtn.setAttribute("aria-label", UI[lang].aria);
      langBtn.setAttribute("title", UI[lang].title);
    }

    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      applyLang(lang === "en" ? "fr" : "en");
    });
  }

  /* Restore a stored choice, otherwise follow the browser for French speakers. */
  var startLang = null;
  try { startLang = localStorage.getItem("lang"); } catch (e) {}

  if (startLang !== "en" && startLang !== "fr") {
    var prefs = navigator.languages || [navigator.language || ""];
    startLang = prefs.some(function (l) { return /^fr/i.test(l || ""); }) ? "fr" : "en";
  }
  if (startLang === "fr") applyLang("fr");
})();
