/**
 * TACOSTADA TAMPICO — Lógica interactiva de la demo web
 * Propuesta comercial desarrollada por NEXORA
 */

import { RESTAURANT_INFO, MENU_CATEGORIES, MENU_ITEMS } from './menu-data.js';

// Estado global de la aplicación
const state = {
  activeCategory: 'todos',
  searchQuery: '',
  selectedBranch: 'sexta-avenida',
  selectedDishId: null
};

// Formateador de moneda MXN
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(amount);
};

// ==========================================================================
// 1. RENDERIZADO DE PLATILLOS FAVORITOS
// ==========================================================================
function renderFavorites() {
  const container = document.getElementById('favoritesContainer');
  if (!container) return;

  const favorites = MENU_ITEMS.filter(item => item.isFavorite);

  container.innerHTML = favorites.map(item => {
    const imageHtml = item.image ? `
      <div class="dish-card__media">
        <picture>
          <source srcset="${item.image.srcset}" sizes="(max-width: 768px) 100vw, 33vw">
          <img src="${item.image.src}" alt="${item.image.alt}" loading="lazy" width="800" height="600">
        </picture>
        ${item.badge ? `<span class="dish-card__badge">${item.badge}</span>` : ''}
        ${item.image.isReference ? `<span class="dish-card__ref-tag">Foto de referencia</span>` : ''}
      </div>
    ` : '';

    return `
      <article class="dish-card" data-dish-id="${item.id}">
        ${imageHtml}
        <div class="dish-card__body">
          <div class="dish-card__header">
            <h3 class="dish-card__title">${item.name}</h3>
            <div class="dish-card__price">
              ${formatCurrency(item.price)}
              <small>Precio verificado</small>
            </div>
          </div>
          <p class="dish-card__desc">${item.description}</p>
          <div class="dish-card__footer">
            <span class="dish-card__status">
              <span class="dish-card__status-dot"></span>
              Disponible
            </span>
            <button class="btn btn--primary btn--sm btn-select-dish" data-dish-id="${item.id}">
              Pedir este platillo
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// 2. RENDERIZADO DE CATEGORÍAS (PILLS)
// ==========================================================================
function renderCategoryPills() {
  const container = document.getElementById('categoryPills');
  if (!container) return;

  container.innerHTML = MENU_CATEGORIES.map((cat, index) => {
    const isActive = cat.id === state.activeCategory;
    return `
      <button 
        type="button" 
        role="tab" 
        class="menu-cat-btn ${isActive ? 'is-active' : ''}" 
        data-category="${cat.id}"
        aria-selected="${isActive ? 'true' : 'false'}"
        id="catTab-${cat.id}">
        ${cat.label}
      </button>
    `;
  }).join('');
}

// ==========================================================================
// 3. RENDERIZADO DEL MENÚ DIGITAL FILTRABLE
// ==========================================================================
function getFilteredMenuItems() {
  return MENU_ITEMS.filter(item => {
    // Filtro por categoría
    let matchesCategory = true;
    if (state.activeCategory === 'favoritos') {
      matchesCategory = item.isFavorite;
    } else if (state.activeCategory !== 'todos') {
      matchesCategory = item.category === state.activeCategory;
    }

    // Filtro por búsqueda
    let matchesSearch = true;
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      const nameMatch = item.name.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const badgeMatch = item.badge ? item.badge.toLowerCase().includes(q) : false;
      matchesSearch = nameMatch || descMatch || badgeMatch;
    }

    return matchesCategory && matchesSearch;
  });
}

function renderMenuGrid() {
  const grid = document.getElementById('menuGrid');
  const counter = document.getElementById('menuResultsCounter');
  if (!grid) return;

  const items = getFilteredMenuItems();

  if (counter) {
    if (state.searchQuery.trim()) {
      counter.textContent = `Se encontraron ${items.length} resultado(s) para "${state.searchQuery}"`;
    } else {
      counter.textContent = `Mostrando ${items.length} platillo(s) en esta categoría`;
    }
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="menu-empty">
        <h3 class="menu-empty__title">No encontramos platillos con esa búsqueda</h3>
        <p class="menu-empty__desc">Prueba buscando por palabras clave como "pastor", "fajita", "mamalona" o selecciona otra categoría.</p>
        <button class="btn btn--secondary btn--sm" id="btnResetMenuFilter">Ver todo el menú</button>
      </div>
    `;
    const btnReset = document.getElementById('btnResetMenuFilter');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        state.activeCategory = 'todos';
        state.searchQuery = '';
        const searchInput = document.getElementById('menuSearchInput');
        if (searchInput) searchInput.value = '';
        renderCategoryPills();
        renderMenuGrid();
      });
    }
    return;
  }

  grid.innerHTML = items.map(item => {
    return `
      <article class="menu-item-row" data-dish-id="${item.id}">
        <div class="menu-item-row__content">
          <div class="menu-item-row__header">
            <h3 class="menu-item-row__title">${item.name}</h3>
            ${item.badge ? `<span class="menu-item-row__badge">${item.badge}</span>` : ''}
          </div>
          <p class="menu-item-row__desc">${item.description}</p>
          <div class="menu-item-row__meta">
            <span class="menu-item-row__verified">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              ${item.priceNote || 'Precio verificado'}
            </span>
          </div>
        </div>
        <div class="menu-item-row__price-col">
          <div class="menu-item-row__price">${formatCurrency(item.price)}</div>
          <button class="btn btn--secondary btn--sm btn-select-dish menu-item-row__action" data-dish-id="${item.id}" aria-label="Elegir ${item.name}">
            Elegir
          </button>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// 4. RENDERIZADO DE SUCURSALES (UBICACIÓN Y HORARIOS)
// ==========================================================================
function renderBranches() {
  const container = document.getElementById('branchesContainer');
  if (!container) return;

  container.innerHTML = RESTAURANT_INFO.branches.map(branch => {
    const deliveryLinks = [];
    if (branch.delivery.didi) {
      deliveryLinks.push(`<a href="${branch.delivery.didi}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary btn--sm">Pedir en DiDi</a>`);
    }
    if (branch.delivery.rappi) {
      deliveryLinks.push(`<a href="${branch.delivery.rappi}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary btn--sm">Pedir en Rappi</a>`);
    }

    return `
      <article class="branch-card" id="branchCard-${branch.id}">
        <div class="branch-card__header">
          <div>
            <span class="branch-card__tag">${branch.tag}</span>
            <h3 class="branch-card__title" style="margin-top: 8px;">${branch.name}</h3>
          </div>
        </div>

        <div class="branch-detail">
          <span class="branch-detail__icon">📍</span>
          <div>
            <strong>Dirección Confirmada</strong>
            <p>${branch.address}</p>
          </div>
        </div>

        <div class="branch-detail">
          <span class="branch-detail__icon">🕒</span>
          <div>
            <strong>Horario de Servicio</strong>
            <p>${branch.hours}</p>
          </div>
        </div>

        <div class="branch-detail">
          <span class="branch-detail__icon">📞</span>
          <div>
            <strong>Teléfono Directo</strong>
            <p><a href="tel:${branch.phoneRaw.replace('52', '')}" style="color: var(--gold-accent); font-weight: 700;">${branch.phone}</a></p>
          </div>
        </div>

        <div class="branch-card__actions">
          <a href="${branch.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">
            <span>Abrir en Google Maps</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
          </a>
          <button class="btn btn--whatsapp btn--sm btn-branch-whatsapp" data-branch-id="${branch.id}">
            <span>WhatsApp Sucursal</span>
          </button>
          ${deliveryLinks.join('')}
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// 5. SELECTOR DE PRODUCTOS EN EL FORMULARIO DE WHATSAPP
// ==========================================================================
function populateProductSelect() {
  const select = document.getElementById('orderProductSelect');
  if (!select) return;

  const options = MENU_ITEMS.map(item => {
    return `<option value="${item.id}">${item.name} — ${formatCurrency(item.price)}</option>`;
  }).join('');

  select.innerHTML = `<option value="">Selecciona un platillo del menú...</option>` + options;
}

// ==========================================================================
// 6. GENERADOR DE MENSAJE DE PEDIDO POR WHATSAPP
// ==========================================================================
function setupWhatsappOrderGenerator() {
  const btn = document.getElementById('btnSendWhatsapp');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const branchSelect = document.getElementById('orderBranchSelect');
    const productSelect = document.getElementById('orderProductSelect');
    const notesInput = document.getElementById('orderNotes');

    const branchId = branchSelect ? branchSelect.value : 'sexta-avenida';
    const branch = RESTAURANT_INFO.branches.find(b => b.id === branchId) || RESTAURANT_INFO.branches[0];

    const productId = productSelect ? productSelect.value : '';
    const product = MENU_ITEMS.find(p => p.id === productId);

    const notes = notesInput ? notesInput.value.trim() : '';

    // Construcción del mensaje pre-armado
    let text = `¡Hola Tacostada! Quiero hacer una consulta para ${branch.name}:\n\n`;

    if (product) {
      text += `*Platillo:* ${product.name} (${formatCurrency(product.price)})\n`;
    } else {
      text += `*Platillo:* (Consultar menú del día)\n`;
    }

    if (notes) {
      text += `*Detalles/Extras:* ${notes}\n`;
    }

    text += `\n¿Me confirman disponibilidad y tiempo estimado de entrega/preparación? ¡Muchas gracias!`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${branch.phoneRaw}?text=${encodedText}`;

    showToast(`Preparando mensaje para ${branch.name}...`, 'info');

    // Abre WhatsApp en nueva pestaña
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

// ==========================================================================
// 7. MODAL DE PLATILLO
// ==========================================================================
function setupDishModal() {
  const backdrop = document.getElementById('dishModalBackdrop');
  const closeBtn = document.getElementById('btnModalClose');
  const modalTitle = document.getElementById('modalDishTitle');
  const modalPrice = document.getElementById('modalDishPrice');
  const modalDesc = document.getElementById('modalDishDesc');
  const modalMedia = document.getElementById('modalDishMedia');
  const modalOrderBtn = document.getElementById('btnModalOrderWhatsapp');

  if (!backdrop) return;

  function openModal(dish) {
    state.selectedDishId = dish.id;

    if (modalTitle) modalTitle.textContent = dish.name;
    if (modalPrice) modalPrice.textContent = formatCurrency(dish.price);
    if (modalDesc) modalDesc.textContent = dish.description;

    if (modalMedia) {
      if (dish.image) {
        modalMedia.style.display = 'block';
        modalMedia.innerHTML = `
          <img src="${dish.image.src}" alt="${dish.image.alt}">
        `;
      } else {
        modalMedia.style.display = 'none';
        modalMedia.innerHTML = '';
      }
    }

    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
      closeModal();
    }
  });

  if (modalOrderBtn) {
    modalOrderBtn.addEventListener('click', () => {
      const dish = MENU_ITEMS.find(d => d.id === state.selectedDishId);
      closeModal();

      // Enfoca el formulario de pedido y selecciona este producto
      const productSelect = document.getElementById('orderProductSelect');
      if (productSelect && dish) {
        productSelect.value = dish.id;
      }
      const orderSection = document.getElementById('pedido');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
        showToast(`Platillo "${dish.name}" seleccionado en el formulario.`, 'success');
      }
    });
  }

  // Delegación de eventos para botones "Pedir este platillo" y "Elegir"
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-select-dish');
    if (!btn) return;

    const dishId = btn.dataset.dishId;
    const dish = MENU_ITEMS.find(d => d.id === dishId);
    if (dish) {
      openModal(dish);
    }
  });
}

// ==========================================================================
// 8. HEADER STICKY & SCROLLSPY
// ==========================================================================
function setupHeaderAndScrollspy() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-desktop__link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header scrolled state
    if (window.scrollY > 40) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }

    // Scrollspy
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('is-active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('is-active');
        }
      });
    }
  }, { passive: true });
}

// ==========================================================================
// 9. MENÚ MÓVIL (DRAWER)
// ==========================================================================
function setupMobileMenu() {
  const toggleBtn = document.getElementById('btnMobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggleBtn || !mobileNav) return;

  function toggle() {
    const isOpen = mobileNav.classList.contains('is-open');
    if (isOpen) {
      mobileNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    } else {
      mobileNav.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  toggleBtn.addEventListener('click', toggle);

  // Cerrar al hacer clic en un enlace del menú móvil
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

// ==========================================================================
// 10. FILTRADO INTERACTIVO Y BÚSQUEDA
// ==========================================================================
function setupMenuInteractions() {
  const categoryContainer = document.getElementById('categoryPills');
  const searchInput = document.getElementById('menuSearchInput');
  const clearBtn = document.getElementById('menuSearchClear');

  if (categoryContainer) {
    categoryContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.menu-cat-btn');
      if (!btn) return;

      state.activeCategory = btn.dataset.category;
      renderCategoryPills();
      renderMenuGrid();
    });
  }

  if (searchInput) {
    let timeoutId;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        state.searchQuery = e.target.value;
        if (clearBtn) {
          clearBtn.classList.toggle('is-visible', state.searchQuery.length > 0);
        }
        renderMenuGrid();
      }, 150);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      clearBtn.classList.remove('is-visible');
      renderMenuGrid();
      searchInput?.focus();
    });
  }

  // Botón directo "WhatsApp Sucursal" en las tarjetas de sucursal
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-branch-whatsapp');
    if (!btn) return;

    const branchId = btn.dataset.branchId;
    const branch = RESTAURANT_INFO.branches.find(b => b.id === branchId);
    if (!branch) return;

    const msg = encodeURIComponent(`¡Hola Tacostada ${branch.name}! Quiero información sobre servicio a domicilio y horarios.`);
    window.open(`https://wa.me/${branch.phoneRaw}?text=${msg}`, '_blank', 'noopener,noreferrer');
  });
}

// ==========================================================================
// 11. SISTEMA DE TOASTS
// ==========================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span style="color: ${type === 'success' ? '#2ed573' : 'var(--gold-accent)'}">●</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderFavorites();
  renderCategoryPills();
  renderMenuGrid();
  renderBranches();
  populateProductSelect();
  setupWhatsappOrderGenerator();
  setupDishModal();
  setupHeaderAndScrollspy();
  setupMobileMenu();
  setupMenuInteractions();
});
