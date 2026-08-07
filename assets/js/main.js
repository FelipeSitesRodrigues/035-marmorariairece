/* ==========================================================================
   MARMORARIA NUNES · Irecê-BA
   ========================================================================== */
(function () {
  'use strict';

  /* ======================================================================
     ⚠️  TROCAR AQUI (e só aqui) O WHATSAPP DA MARMORARIA
     WA_NUMERO  = número no formato internacional, só dígitos: 55 + DDD + número
     WA_EXIBE   = como o número aparece escrito no site
     ====================================================================== */
  var WA_NUMERO = '5574000000000';
  var WA_EXIBE  = '(74) 0 0000-0000';
  /* ====================================================================== */

  var WA_BASE = 'https://wa.me/' + WA_NUMERO;

  function linkWa(msg) {
    return WA_BASE + '?text=' + encodeURIComponent(msg);
  }

  /* ---- 1. Todo elemento com data-msg vira um link de WhatsApp ---------- */
  document.querySelectorAll('[data-msg]').forEach(function (el) {
    el.setAttribute('href', linkWa(el.getAttribute('data-msg')));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* ---- 2. Número visível sai de um lugar só --------------------------- */
  document.querySelectorAll('[data-fone]').forEach(function (el) {
    el.textContent = WA_EXIBE;
  });

  /* ---- 3. Menu mobile ------------------------------------------------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('menu');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var aberto = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      burger.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  /* ---- 4. Abas de serviços -------------------------------------------- */
  var abas = document.querySelectorAll('.tab');
  abas.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var alvo = btn.getAttribute('data-tab');
      abas.forEach(function (b) {
        var ativo = b === btn;
        b.classList.toggle('is-on', ativo);
        b.setAttribute('aria-selected', ativo ? 'true' : 'false');
      });
      document.querySelectorAll('.panel').forEach(function (p) {
        var mostra = p.id === 'p-' + alvo;
        p.classList.toggle('is-on', mostra);
        if (mostra) { p.removeAttribute('hidden'); } else { p.setAttribute('hidden', ''); }
      });
    });
  });

  /* ======================================================================
     5. TRABALHOS · esteira, galeria completa e tela cheia
     ====================================================================== */

  /* legendas das 47 fotos, na ordem dos arquivos p-01 ... p-47 */
  var FOTOS = [
    'Banheiro com bancada em pedra e box',
    'Nicho em pedra embutido no banheiro',
    'Ilha de cozinha em pedra branca com cooktop embutido',
    'Cozinha com ilha e bancada em pedra clara',
    'Banheiro com bancada em pedra e cuba de apoio',
    'Bancada de lavabo com cuba de apoio branca',
    'Bancada de cozinha em pedra branca com cooktop',
    'Lavabo com bancada em pedra e cuba de apoio branca',
    'Bancada de banheiro com duas cubas de apoio',
    'Bancada de cozinha em pedra clara',
    'Mesa em pedra branca na cozinha',
    'Bancada de banheiro com duas cubas de apoio',
    'Bancada branca com cuba esculpida na própria pedra',
    'Bancada de granito com cuba de apoio',
    'Painel de pedra escura em parede de banheiro',
    'Lavabo com bancada em pedra e cuba de apoio',
    'Bancada em pedra escura com cuba esculpida',
    'Bancada de cozinha em granito com armários',
    'Bancada escura com cuba esculpida',
    'Bancada de cozinha em L em granito',
    'Bancada em pedra escura com cuba de apoio',
    'Bancada em pedra escura instalada',
    'Bancada em L em pedra escura instalada na cozinha',
    'Bancada de cozinha em L em pedra escura',
    'Bancada branca de banheiro com cuba esculpida',
    'Bancada escura com cuba esculpida',
    'Bancada com painel lateral em mármore',
    'Bancada em pedra escura com cuba de apoio',
    'Peça em pedra escura com recorte para cuba',
    'Bancada de cozinha em L em pedra escura',
    'Bancada estreita em pedra escura',
    'Bancada em pedra escura com cuba esculpida',
    'Bancada grafite com cuba esculpida',
    'Bancada de cozinha em L em pedra escura polida',
    'Lápide em granito',
    'Bancada de granito com cuba de apoio em banheiro',
    'Bancada de cozinha com recorte para cooktop',
    'Bancada em pedra escura durante a instalação',
    'Ilha de cozinha em pedra branca',
    'Mesa em pedra branca com pés na mesma pedra',
    'Bancada em pedra escura em área externa',
    'Bancada de cozinha com recorte para cooktop',
    'Peças em pedra cortadas e prontas para instalar',
    'Bancada em pedra escura com painel',
    'Bancada e nicho em pedra no banheiro',
    'Peça em pedra escura instalada',
    'Revestimento de parede em pedra'
  ];

  function arquivo(i, tamanho) {
    return 'assets/img/portfolio/' + tamanho + '/p-' + ('0' + (i + 1)).slice(-2) + '.jpg';
  }

  var total = document.getElementById('pfTotal');
  if (total) { total.textContent = FOTOS.length; }

  /* ---- 5.1 Esteira: duplica a trilha para o laço fechar sem emenda ---- */
  var trilho = document.getElementById('esteiraTrilho');
  if (trilho) {
    var original = Array.prototype.slice.call(trilho.children);
    original.forEach(function (li) {
      var copia = li.cloneNode(true);
      copia.setAttribute('aria-hidden', 'true');
      var b = copia.querySelector('button');
      if (b) { b.setAttribute('tabindex', '-1'); }
      trilho.appendChild(copia);
    });
  }

  /* ---- 5.2 Tela cheia ---- */
  var lupa = document.getElementById('lupa');
  var lupaImg = document.getElementById('lupaImg');
  var lupaLegenda = document.getElementById('lupaLegenda');
  var lupaConta = document.getElementById('lupaConta');
  var atual = 0;
  var voltarFoco = null;

  function mostra(i) {
    atual = (i + FOTOS.length) % FOTOS.length;
    lupaImg.src = arquivo(atual, 'full');
    lupaImg.alt = FOTOS[atual];
    lupaLegenda.textContent = FOTOS[atual];
    lupaConta.textContent = (atual + 1) + ' / ' + FOTOS.length;
  }

  function abreLupa(i, origem) {
    if (!lupa) { return; }
    voltarFoco = origem || document.activeElement;
    mostra(i);
    lupa.removeAttribute('hidden');
    document.body.classList.add('travado');
    document.getElementById('lupaFechar').focus();
  }

  function fechaLupa() {
    if (!lupa || lupa.hasAttribute('hidden')) { return; }
    lupa.setAttribute('hidden', '');
    /* removeAttribute em vez de src="" — src vazio faz o browser rebaixar
       a requisição para a própria página */
    lupaImg.removeAttribute('src');
    if (galeria && galeria.hasAttribute('hidden')) { document.body.classList.remove('travado'); }
    if (voltarFoco && voltarFoco.focus) { voltarFoco.focus(); }
  }

  if (lupa) {
    document.getElementById('lupaFechar').addEventListener('click', fechaLupa);
    document.getElementById('lupaAnt').addEventListener('click', function () { mostra(atual - 1); });
    document.getElementById('lupaProx').addEventListener('click', function () { mostra(atual + 1); });
    lupa.addEventListener('click', function (e) {
      if (e.target === lupa) { fechaLupa(); }
    });
  }

  /* ---- 5.3 Galeria completa ---- */
  var galeria = document.getElementById('galeria');
  var grade = document.getElementById('galeriaGrade');
  var abrirGaleria = document.getElementById('verGaleria');
  var montada = false;

  function montaGrade() {
    if (montada || !grade) { return; }
    var html = '';
    for (var i = 0; i < FOTOS.length; i++) {
      html += '<li><button type="button" data-i="' + i + '">' +
        '<img src="' + arquivo(i, 'mini') + '" alt="' + FOTOS[i] + '" loading="lazy" decoding="async">' +
        '</button></li>';
    }
    grade.innerHTML = html;
    montada = true;
  }

  function abreGaleria() {
    if (!galeria) { return; }
    montaGrade();
    voltarFoco = abrirGaleria;
    galeria.removeAttribute('hidden');
    document.body.classList.add('travado');
    document.getElementById('fecharGaleria').focus();
  }

  function fechaGaleria() {
    if (!galeria || galeria.hasAttribute('hidden')) { return; }
    galeria.setAttribute('hidden', '');
    document.body.classList.remove('travado');
    if (abrirGaleria) { abrirGaleria.focus(); }
  }

  if (abrirGaleria) { abrirGaleria.addEventListener('click', abreGaleria); }
  if (galeria) { document.getElementById('fecharGaleria').addEventListener('click', fechaGaleria); }

  /* ---- 5.4 Um clique só serve esteira e grade ---- */
  document.addEventListener('click', function (e) {
    var alvo = e.target.closest('.pf-foto, .galeria-grade button');
    if (!alvo) { return; }
    abreLupa(parseInt(alvo.getAttribute('data-i'), 10) || 0, alvo);
  });

  document.addEventListener('keydown', function (e) {
    if (lupa && !lupa.hasAttribute('hidden')) {
      if (e.key === 'Escape')     { fechaLupa(); }
      if (e.key === 'ArrowLeft')  { mostra(atual - 1); }
      if (e.key === 'ArrowRight') { mostra(atual + 1); }
      return;
    }
    if (galeria && !galeria.hasAttribute('hidden') && e.key === 'Escape') { fechaGaleria(); }
  });

  /* ---- 6. Revelação ao rolar (progressivo: sem JS, tudo já aparece) ---- */
  var alvos = [];
  [
    ['.hero-copy > *', 0],
    ['.hero-slab', 0],
    ['.nunes .h2', 0], ['.fala', 1], ['.pontos li', 2],
    ['.sec-head > *', 0], ['.svc .tabs', 1],
    ['.pf-topo > *', 0], ['.pf-rodape > *', 1],
    ['.mat .h2', 0], ['.mat .sec-lead', 1], ['.mat-card', 2],
    ['.proc .h2', 0], ['.passos li', 2],
    ['.cta-copy > *', 0], ['.cta-side > *', 1],
    ['.faq .h2', 0], ['.acc', 1], ['.faq-cta', 1]
  ].forEach(function (par) {
    document.querySelectorAll(par[0]).forEach(function (el, i) {
      el.classList.add('rev');
      var d = Math.min(par[1] ? i + 1 : i, 3);
      if (d > 0) { el.classList.add('rev-d' + d); }
      alvos.push(el);
    });
  });

  if ('IntersectionObserver' in window && alvos.length) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    alvos.forEach(function (el) { obs.observe(el); });
  } else {
    alvos.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- 6. Link do menu acompanha a seção ------------------------------ */
  var secoes = ['servicos', 'trabalhos', 'materiais', 'processo', 'contato']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && secoes.length) {
    var obsNav = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        document.querySelectorAll('.nav-a').forEach(function (a) { a.classList.remove('is-on'); });
        var link = document.querySelector('.nav-a[href="#' + e.target.id + '"]');
        if (link) { link.classList.add('is-on'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secoes.forEach(function (s) { obsNav.observe(s); });
  }

  /* ---- 7. Ano do rodapé ----------------------------------------------- */
  var ano = document.getElementById('ano');
  if (ano) { ano.textContent = new Date().getFullYear(); }
})();
