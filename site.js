"use strict";

(() => {
  const config = window.CARDAPIO;
  const grid = document.querySelector("#menu-grid");
  const search = document.querySelector("#search");
  const filters = [...document.querySelectorAll(".filter")];
  const categories = { comidas: "Comidas", doces: "Doces", bebidas: "Bebidas", brincadeiras: "Brincadeiras" };
  const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  let selected = "todos";
  const normalize = (value) => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[-–—]/g, " ").replace(/\s+/g, " ").toLocaleLowerCase("pt-BR").trim();

  // Ilustrações próprias em SVG: tudo funciona sem imagens ou serviços externos.
  const drawings = {
    hotdog: '<g transform="rotate(-18 100 80)"><rect x="26" y="48" width="148" height="64" rx="32" fill="#d69b55"/><rect x="29" y="48" width="142" height="51" rx="25" fill="#efbd78"/><rect x="34" y="63" width="132" height="26" rx="13" fill="#a85139"/><path d="m48 66 14 13 14-13 14 13 14-13 14 13 14-13 14 13" fill="none" stroke="#f8d260" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M51 53h6m11 0h6m52 0h6" stroke="#fae1aa" stroke-width="3" stroke-linecap="round"/></g>',
    pastel: '<g transform="rotate(-12 100 80)"><path d="M26 103V51q0-8 9-8h130q9 0 9 8v52q0 8-9 8H35q-9 0-9-8Z" fill="#dbab55"/><rect x="27" y="39" width="147" height="64" rx="9" fill="#efc46b"/><path d="M37 45v52m128-52v52M44 48h111M44 94h111" stroke="#dca349" stroke-width="2" stroke-dasharray="3 6" stroke-linecap="round"/><path d="m71 63 8 4m42 11 8-2m-32 9 4-1m27-28 3 1" stroke="#dbab55" stroke-width="3" stroke-linecap="round"/></g>',
    pipoca: '<path d="m50 62 10 76h81l10-76Z" fill="#fff8e4"/><path d="m59 65 8 73h14l-4-73m14 0 2 73h15l2-73m13 0-4 73h14l8-73" fill="#cf7d75"/><ellipse cx="100" cy="65" rx="52" ry="9" fill="#f6e1a9"/><g fill="#fff7d6" stroke="#e8d098" stroke-width="1.5"><path d="M51 58q-12-15 2-21-1-16 15-16 14-12 20 3 18-2 16 15 13 12-2 20Z"/><path d="M96 58q-10-13 1-21-5-20 14-20 10-15 20-1 19-3 18 17 17 10 5 26Z"/><path d="M74 67q-12-16 1-24 4-15 17-8 14-10 19 4 17-1 17 14 9 18-12 18Z"/></g>',
    bolo: '<path d="m40 80 107-40 19 54-108 41Z" fill="#7d4b39"/><path d="m40 63 106-36 21 44-109 38Z" fill="#edbc88"/><path d="m42 57 105-34 24 29-110 41Z" fill="#69412f"/><path d="M61 94v41m105-83v43" fill="none" stroke="#ab6c48" stroke-width="3"/><path d="m61 115 106-37" stroke="#f3d9ad" stroke-width="8"/><path d="M99 34q-5-15 6-20" fill="none" stroke="#547350" stroke-width="3" stroke-linecap="round"/><circle cx="98" cy="36" r="12" fill="#c47783"/><path d="m79 49 7-2m41-14 6 3m5 23 7-3m-42 7 6-2" stroke="#d19d79" stroke-width="3" stroke-linecap="round"/>',
    brigadeiro: '<path d="m45 93 11 31h88l11-31-16 7-12-7-13 7-14-7-14 7-13-7-12 7Z" fill="#c68a9d"/><path d="m63 103 3 15m16-15 2 15m17-15v15m18-15-2 15m18-15-3 15" stroke="#aa6c81" stroke-width="2"/><circle cx="100" cy="72" r="42" fill="#764734"/><path d="m77 44 5 4m18-7 2 6m19 0-4 5m-48 11 6-1m15-5 4 5m18-2 5 1m17 8-4 5m-22 4 3 5m-31-4 5 4m16 12-1 6m23-7 5 2m-51 2 3-4" stroke="#b47d55" stroke-width="3" stroke-linecap="round"/>',
    algodao: '<path d="m96 83 3 59h5l6-60" fill="#d9b384"/><path d="M61 89q-23-8-14-32-5-17 15-25 0-23 21-23 17-15 32 1 27-5 28 19 23 6 13 30 10 24-13 31-12 19-32 9-30 10-50-10Z" fill="#e5a2b9"/><path d="M68 45q-12-16 6-22m17-4q15-9 26 3m11 17q20 6 13 21M64 73q10 11 21 5" stroke="#f4c8d6" stroke-width="7" fill="none" stroke-linecap="round"/>',
    suco: '<path d="m65 37 9 99q26 12 52 0l9-99Z" fill="#fff9e3" stroke="#beaa71" stroke-width="2"/><path d="m70 61 7 72q24 10 46 0l7-72Z" fill="#eab647"/><ellipse cx="100" cy="61" rx="30" ry="5" fill="#f3cf76"/><path d="m111 95 9-75 23-13" stroke="#719982" stroke-width="6" fill="none" stroke-linecap="round"/><path d="m84 67 3 49" stroke="#f9d987" stroke-width="4" stroke-linecap="round"/><circle cx="65" cy="48" r="23" fill="#f5d583" stroke="#f9efbd" stroke-width="5"/><path d="M65 29v37M47 48h37M52 35l26 26m0-26L52 61" stroke="#fff3c3" stroke-width="2"/>',
    refrigerante: '<path d="m65 44 9 90q26 12 52 0l9-90Z" fill="#faf5df" stroke="#91a08c" stroke-width="2"/><path d="m70 67 7 64q24 10 46 0l7-64Z" fill="#865639"/><ellipse cx="100" cy="67" rx="30" ry="5" fill="#a36f4b"/><path d="m111 104 8-80 22-12" stroke="#cd889b" stroke-width="6" fill="none" stroke-linecap="round"/><g fill="#f1dfba" opacity=".8"><rect x="80" y="55" width="17" height="16" rx="4" transform="rotate(-12 80 55)"/><rect x="106" y="52" width="16" height="16" rx="4" transform="rotate(12 106 52)"/></g><g fill="#d4a57c"><circle cx="90" cy="91" r="2"/><circle cx="108" cy="113" r="2"/><circle cx="89" cy="121" r="1.5"/></g>',
    agua: '<rect x="84" y="9" width="32" height="16" rx="4" fill="#759fa3"/><path d="M85 26v12Q67 49 67 66v67q0 9 10 9h46q10 0 10-9V66q0-17-18-28V26Z" fill="#e6f2ee" stroke="#89afb0" stroke-width="2"/><path d="M72 74h56v57q0 6-7 6H79q-7 0-7-6Z" fill="#b7d9d9"/><rect x="67" y="81" width="66" height="36" rx="3" fill="#faf8ee"/><path d="M101 87q-17 20 0 23 17-3 0-23" fill="#91bbc0"/><path d="M78 54v15m0 55v5" stroke="white" stroke-width="4" stroke-linecap="round"/>',
    espetinho: '<g transform="rotate(-30 100 80)"><path d="M100 12v132" stroke="#ad8656" stroke-width="5" stroke-linecap="round"/><g fill="#dfa957" stroke="#ba8245" stroke-width="2"><rect x="80" y="23" width="40" height="29" rx="8"/><rect x="78" y="56" width="44" height="29" rx="8"/><rect x="81" y="90" width="38" height="28" rx="8"/></g><path d="m90 30 17 12m-17 22 18 12m-17 23 15 10" stroke="#bf813e" stroke-width="3" stroke-linecap="round"/></g>',
    mousse: '<path d="m57 68 15 65q28 12 56 0l15-65" fill="#e6e2d2" stroke="#b7aaa0" stroke-width="2"/><path d="m64 83 12 46q24 9 48 0l12-46" fill="#c99691"/><ellipse cx="100" cy="70" rx="44" ry="16" fill="#e4b5ae"/><path d="M78 63q-3-10 10-13 15-13 25 0 12 0 12 10" fill="#f7e6d5"/><path d="m87 62 6 2m13-7 5 3" stroke="#c59382" stroke-width="3" stroke-linecap="round"/><path d="m133 56 14-37" stroke="#8b9a8b" stroke-width="5" stroke-linecap="round"/><ellipse cx="149" cy="15" rx="7" ry="12" fill="#aeb8a4" transform="rotate(20 149 15)"/>',
    gelatina: '<ellipse cx="100" cy="124" rx="70" ry="12" fill="#f8f3e4" stroke="#d9ceba" stroke-width="2"/><path d="m57 116 9-55q3-12 15-13h38q12 1 15 13l9 55q-43 19-86 0Z" fill="#c6778c"/><ellipse cx="100" cy="53" rx="27" ry="9" fill="#e7a8b5"/><path d="m78 67-5 39m20-39-1 43m18-43 1 43m15-39 5 35" stroke="#e39cac" stroke-width="7" stroke-linecap="round"/><path d="M66 117q36 14 68 0" fill="none" stroke="#a96078" stroke-width="3"/>',
    danca: '<path d="m150 27 24-5v43m-24-38v42" stroke="#b88198" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="143" cy="70" rx="9" ry="6" fill="#b88198"/><ellipse cx="167" cy="66" rx="9" ry="6" fill="#b88198"/><circle cx="86" cy="35" r="14" fill="#d6a578"/><path d="m85 58-15 31 30 15 14-39Z" fill="#789b82"/><path d="m77 63-22 9-18-16m66 12 22-12 9-21" stroke="#d6a578" stroke-width="8" fill="none" stroke-linecap="round"/><path d="m77 92-17 31-20 7m56-30 9 25 23 10" stroke="#517361" stroke-width="10" fill="none" stroke-linecap="round"/><path d="m30 35 2-12m-8 6 14 1" stroke="#d3a054" stroke-width="3" stroke-linecap="round"/>',
    desfile: '<path d="m32 132 36-59h63l37 59Z" fill="#e2b3bd"/><path d="m70 132 18-57m44 57-17-57" stroke="#f6d8dd" stroke-width="3"/><circle cx="99" cy="26" r="12" fill="#d6a578"/><path d="m90 9 3-8 7 7 8-7 4 8" fill="#e5b950"/><path d="m89 44-13 42h46l-13-42Z" fill="#648b71"/><path d="m87 49-22 17m46-17 19 20" fill="none" stroke="#d6a578" stroke-width="6" stroke-linecap="round"/><path d="m90 88 4 33m15-33-3 25" fill="none" stroke="#776d60" stroke-width="7" stroke-linecap="round"/><path d="m154 50 3-14m-10 7 16 1m-121-7 2-12m-9 6 16 1" stroke="#d3a054" stroke-width="3" stroke-linecap="round"/>',
    brincadeiras: '<path d="M87 57q-32 4-34 55l-3 20h24l7-24h38l7 24h24l-3-20q-2-51-34-55Z" fill="#91a6b5"/><path d="M87 60q13 8 26 0" stroke="#627f90" stroke-width="4" fill="none"/><path d="M73 80v22m-11-11h22" stroke="#f8f0da" stroke-width="6" stroke-linecap="round"/><circle cx="126" cy="83" r="5" fill="#e4a5b7"/><circle cx="136" cy="96" r="5" fill="#ebc568"/><path d="m37 58 3-13m-10 6 16 1m110-12 3-14m-10 7 16 1" stroke="#c79f62" stroke-width="3" stroke-linecap="round"/><circle cx="103" cy="26" r="10" fill="#e4b0bd"/><path d="m97 26 4 4 7-8" stroke="#fff6e4" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
  };

  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  function card(item, index) {
    const article = make("article", "menu-card");
    const art = make("div", "card-art");
    art.dataset.tone = ["peach", "yellow", "pink", "green", "blue"].includes(item.cor) ? item.cor : "green";
    art.setAttribute("aria-hidden", "true");
    // Apenas os desenhos fixos acima são inseridos como HTML; os dados são texto.
    art.innerHTML = `<svg viewBox="0 0 200 155" xmlns="http://www.w3.org/2000/svg">${drawings[item.desenho] || drawings.pipoca}</svg>`;
    const body = make("div", "card-body");
    body.append(make("p", "category-label", categories[item.categoria] || "Delícias"));
    body.append(make("h3", "", item.nome));
    const bottom = make("div", "card-bottom");
    const hasPrice = typeof item.preco === "number" && Number.isFinite(item.preco) && item.preco >= 0;
    const priceLabel = hasPrice ? (item.preco === 0 ? "Grátis" : currency.format(item.preco)) : (item.valorPendente || "Preço a confirmar");
    bottom.append(make("span", `item-price${hasPrice ? "" : " pending"}${item.preco === 0 ? " free" : ""}`, priceLabel));
    if (item.unidade) bottom.append(make("span", "item-detail", item.unidade));
    body.append(bottom);
    article.append(art, body);
    return article;
  }

  function render() {
    const term = normalize(search.value);
    const items = config.itens.filter((item) =>
      (selected === "todos" || item.categoria === selected) &&
      normalize(`${item.nome} ${item.descricao || ""}`).includes(term)
    );
    const fragment = document.createDocumentFragment();
    items.forEach((item, index) => fragment.append(card(item, index)));
    grid.replaceChildren(fragment);
    document.querySelector("#empty-state").hidden = items.length !== 0;
    document.querySelector("#result-status").textContent = `${items.length} ${items.length === 1 ? "item encontrado" : "itens encontrados"}.`;
  }

  if (!config || !Array.isArray(config.itens)) {
    grid.append(make("p", "no-script", "Não foi possível carregar o cardápio. Verifique o arquivo cardapio.js."));
    return;
  }
  const title = config.titulo || "Cardápio";
  const heading = document.querySelector("#page-title");
  heading.replaceChildren(document.createTextNode(title), make("span", "title-dot", "."));
  const date = /^\d{4}-\d{2}-\d{2}$/.test(config.data || "") ? config.data : "2026-10-09";
  const dateLabel = date.split("-").reverse().join("/");
  document.querySelector("#event-date").dateTime = date;
  document.querySelector("#event-date").textContent = dateLabel;
  document.title = `${title} · ${dateLabel}`;
  document.querySelector("#preview-notice").hidden = !config.previa;

  filters.forEach((button) => button.addEventListener("click", () => {
    selected = button.dataset.category;
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    render();
  }));
  search.addEventListener("input", render);
  document.querySelector("#clear-filters").addEventListener("click", () => {
    search.value = "";
    filters[0].click();
    search.focus();
  });
  render();
})();
