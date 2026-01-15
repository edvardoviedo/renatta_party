// ============================================
// CONFIGURACIÓN INICIAL Y VARIABLES GLOBALES
// ============================================

// Configuración de la fecha del evento
const EVENT_DATE = new Date("January 29, 2026 16:00:00").getTime();

// Colores para las partículas
const PARTICLE_COLORS = [
  "rgba(138, 43, 226, 0.6)", // Purple
  "rgba(255, 16, 240, 0.6)", // Pink
  "rgba(255, 0, 170, 0.6)", // Magenta
  "rgba(148, 0, 211, 0.6)", // Violet
];

// Galería de imágenes (placeholders listos para reemplazar)
const GALLERY_IMAGES = [
  "https://raw.githubusercontent.com/edvardoviedo/renatta_party/main/assets/renatta_pics/2.jpg",
  "https://raw.githubusercontent.com/edvardoviedo/renatta_party/main/assets/renatta_pics/4.jpg",
  "https://raw.githubusercontent.com/edvardoviedo/renatta_party/main/assets/renatta_pics/5.jpg",
  "https://raw.githubusercontent.com/edvardoviedo/renatta_party/main/assets/renatta_pics/6.jpg",
  "https://raw.githubusercontent.com/edvardoviedo/renatta_party/main/assets/renatta_pics/7.jpg",
];

// Itinerario del evento
const ITINERARY_ITEMS = [
  {
    icon: "🎉",
    title: "Recepción",
    time: "4:00 PM",
    description: "Bienvenida con música K-Pop y ambientación Huntrix",
  },
  {
    icon: "🍭",
    title: "Candy / Snack",
    time: "4:30 PM",
    description: "Mesa de dulces y snacks temáticos K-Pop",
  },
  {
    icon: "🍕",
    title: "Comida",
    time: "6:00 PM",
    description: "Buffet con opciones para todos los gustos",
  },
  {
    icon: "🎊",
    title: "Piñata",
    time: "6:45 PM",
    description: "Sorpresa especial Huntrix",
  },
  {
    icon: "🎂",
    title: "Pastel",
    time: "7:15 PM",
    description: "¡Momento de cantar y soplar velas!",
  },
];

// ============================================
// INICIALIZACIÓN CUANDO EL DOM ESTÁ LISTO
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  console.log(
    "🎉 Huntrix K-Pop Demon Hunters - Inicializando experiencia premium"
  );

  // Inicializar componentes
  initLoader();
  initParticles();
  initCountdown();
  initGallery();
  initItinerary();
  initRSVPForm();
  initCalendarButtons();
  initScrollEffects();
  initBackToTop();

  // Aplicar animaciones de entrada a las secciones
  animateSectionsOnScroll();
});

// ============================================
// LOADER INICIAL
// ============================================

function initLoader() {
  const loader = document.getElementById("loader");

  // Ocultar loader después de 3 segundos
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";

    // Mostrar contenido principal
    document.querySelector(".main-content").style.opacity = "1";

    // Iniciar animaciones después del loader
    setTimeout(() => {
      animateHeroSection();
    }, 500);
  }, 3000);
}

// ============================================
// SISTEMA DE PARTÍCULAS
// ============================================

function initParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = window.innerWidth < 768 ? 15 : 30;

  // Crear partículas
  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer, i);
  }

  // Añadir efecto parallax al scroll
  window.addEventListener("scroll", updateParticlesOnScroll);
}

function createParticle(container, index) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Tamaño aleatorio entre 50px y 200px
  const size = Math.random() * 150 + 50;

  // Posición aleatoria
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;

  // Color aleatorio de la paleta Huntrix
  const color =
    PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];

  // Aplicar estilos
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;
  particle.style.backgroundColor = color;
  particle.style.setProperty("--particle-color", color);

  // Animación personalizada
  const duration = Math.random() * 30 + 20; // 20-50 segundos
  const delay = Math.random() * 5;

  particle.style.animation = `float ${duration}s infinite ease-in-out`;
  particle.style.animationDelay = `${delay}s`;

  container.appendChild(particle);

  // Guardar datos para el efecto parallax
  particle.dataset.speed = (Math.random() * 0.5 + 0.2).toFixed(2);
}

function updateParticlesOnScroll() {
  const scrollY = window.scrollY;
  const particles = document.querySelectorAll(".particle");

  particles.forEach((particle) => {
    const speed = parseFloat(particle.dataset.speed);
    const yOffset = scrollY * speed * 0.1;
    particle.style.transform = `translateY(${yOffset}px)`;
  });
}

// ============================================
// ANIMACIÓN HERO SECTION
// ============================================

function animateHeroSection() {
  const heroName = document.querySelector(".hero-name");
  const heroAge = document.querySelector(".hero-age");
  const heroTheme = document.querySelector(".hero-theme");

  // Aplicar animaciones secuenciales
  setTimeout(() => {
    heroName.style.animation = "nameGlow 3s infinite alternate";
  }, 500);

  setTimeout(() => {
    heroAge.style.opacity = "1";
    heroAge.style.transform = "translateY(0)";
  }, 800);

  setTimeout(() => {
    heroTheme.style.opacity = "1";
    heroTheme.style.transform = "translateY(0)";
  }, 1100);
}

// ============================================
// CUENTA REGRESIVA
// ============================================

function initCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = EVENT_DATE - now;

    // Si el evento ya pasó
    if (timeLeft < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    // Calcular días, horas, minutos, segundos
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Actualizar elementos del DOM
    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");

    // Efecto visual al cambiar los segundos
    secondsEl.style.transform = "scale(1.1)";
    setTimeout(() => {
      secondsEl.style.transform = "scale(1)";
    }, 200);
  }

  // Actualizar inmediatamente y luego cada segundo
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ============================================
// GALERÍA SWIPEABLE
// ============================================

function initGallery() {
  const galleryTrack = document.getElementById("galleryTrack");
  const galleryDots = document.getElementById("galleryDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentSlide = 0;
  const totalSlides = GALLERY_IMAGES.length;

  // Crear slides de la galería
  GALLERY_IMAGES.forEach((image, index) => {
    // Crear slide
    const slide = document.createElement("div");
    slide.className = "gallery-slide";

    const img = document.createElement("img");
    img.src = image;
    img.alt = `Renatta ${index + 1}`;
    img.loading = "lazy";

    slide.appendChild(img);
    galleryTrack.appendChild(slide);

    // Crear dot
    const dot = document.createElement("div");
    dot.className = `gallery-dot ${index === 0 ? "active" : ""}`;
    dot.dataset.index = index;
    dot.addEventListener("click", () => goToSlide(index));
    galleryDots.appendChild(dot);
  });

  // 👇👇👇 ESTA LÍNEA ES LA CLAVE
  goToSlide(0);

  // Función para cambiar de slide
  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;
    galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Actualizar dots activos
    document.querySelectorAll(".gallery-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  // Event listeners para botones
  prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));

  // Swipe para móviles
  let startX = 0;
  let endX = 0;

  galleryTrack.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  galleryTrack.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe izquierda = siguiente
        goToSlide(currentSlide + 1);
      } else {
        // Swipe derecha = anterior
        goToSlide(currentSlide - 1);
      }
    }
  }

  // Auto-play (opcional, descomentar si se desea)
  // setInterval(() => goToSlide(currentSlide + 1), 5000);
}

// ============================================
// ITINERARIO
// ============================================

function initItinerary() {
  const itineraryContainer = document.querySelector(".itinerary-container");

  ITINERARY_ITEMS.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "itinerary-card";
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
            <div class="itinerary-icon">${item.icon}</div>
            <h3 class="itinerary-title">${item.title}</h3>
            <div class="itinerary-time">${item.time}</div>
            <p class="itinerary-description">${item.description}</p>
        `;

    itineraryContainer.appendChild(card);
  });
}

// ============================================
// FORMULARIO RSVP
// ============================================

function initRSVPForm() {
  const rsvpForm = document.getElementById("rsvpForm");
  const accompanimentsInput = document.getElementById("accompaniments");
  const minusBtn = document.querySelector(".accompaniment-btn.minus");
  const plusBtn = document.querySelector(".accompaniment-btn.plus");
  const totalGuests = document.getElementById("totalGuests");

  // Manejar botones de acompañantes
  minusBtn.addEventListener("click", () => {
    let value = parseInt(accompanimentsInput.value);
    if (value > 0) {
      accompanimentsInput.value = value - 1;
      updateTotalGuests();
    }
  });

  plusBtn.addEventListener("click", () => {
    let value = parseInt(accompanimentsInput.value);
    if (value < 9) {
      accompanimentsInput.value = value + 1;
      updateTotalGuests();
    }
  });

  function updateTotalGuests() {
    const accompaniments = parseInt(accompanimentsInput.value);
    totalGuests.textContent = accompaniments + 1;
  }

  // Enviar formulario a WhatsApp
  rsvpForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const guestName = document.getElementById("guestName").value.trim();
    const accompaniments = document.getElementById("accompaniments").value;
    const message = document.getElementById("message").value.trim();

    if (!guestName) {
      alert("Por favor, ingresa tu nombre");
      return;
    }

    // Crear mensaje para WhatsApp
    const whatsappMessage = `Hola, soy ${guestName}. 
Confirmo mi asistencia a la fiesta de Renatta.
Acompañantes: ${accompaniments}
Mensaje para Renatta: ${
      message || "¡Estoy emocionado(a) de celebrar contigo!"
    }`;

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const phoneNumber = "528443967200";

    // Abrir WhatsApp
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );

    // Resetear formulario (opcional)
    rsvpForm.reset();
    accompanimentsInput.value = "0";
    updateTotalGuests();

    // Feedback visual
    const submitBtn = rsvpForm.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Confirmación enviada!';
    submitBtn.style.background = "linear-gradient(45deg, #25D366, #128C7E)";

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
    }, 3000);
  });

  // Inicializar contador de invitados
  updateTotalGuests();
}

// ============================================
// BOTONES DE CALENDARIO
// ============================================

function initCalendarButtons() {
  const addToCalendarBtn = document.getElementById("addToCalendar");
  const googleCalendarBtn = document.getElementById("googleCalendar");
  const appleCalendarBtn = document.getElementById("appleCalendar");

  // Fecha del evento formateada
  const eventDate = new Date(EVENT_DATE);
  const startDate = eventDate.toISOString().replace(/-|:|\.\d+/g, "");
  const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000) // +4 horas
    .toISOString()
    .replace(/-|:|\.\d+/g, "");

  // Detalles del evento para calendario
  const eventDetails = {
    title: "🎂 Fiesta de Renatta - 5 Años K-Pop Demon Hunters",
    description:
      "¡Celebración de los 5 años de Renatta con temática K-Pop Demon Hunters!",
    location: "Toys House Salón Blvd. Moctezuma 1581 Col. Los Pinos",
    start: startDate,
    end: endDate,
  };

  // Botón principal
  addToCalendarBtn.addEventListener("click", function () {
    this.classList.add("active");
    document.querySelector(".calendar-options").style.display = "flex";

    setTimeout(() => {
      this.classList.remove("active");
    }, 300);
  });

  // Google Calendar
  googleCalendarBtn.addEventListener("click", function () {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.title
    )}&dates=${eventDetails.start}/${
      eventDetails.end
    }&details=${encodeURIComponent(
      eventDetails.description
    )}&location=${encodeURIComponent(eventDetails.location)}`;
    window.open(url, "_blank");
  });

  // Apple Calendar
  appleCalendarBtn.addEventListener("click", function () {
    // Formato para Apple Calendar
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${eventDetails.start}`,
      `DTEND:${eventDetails.end}`,
      `SUMMARY:${eventDetails.title}`,
      `DESCRIPTION:${eventDetails.description}`,
      `LOCATION:${eventDetails.location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Fiesta-Renatta.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

// ============================================
// EFECTOS DE SCROLL
// ============================================

function initScrollEffects() {
  // Efecto de aparición de secciones
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observar todas las secciones
  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });
}

function animateSectionsOnScroll() {
  const sections = document.querySelectorAll(".section");

  // Añadir clase inicial
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Observer para animar al entrar en viewport
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

// ============================================
// BOTÓN "VOLVER ARRIBA"
// ============================================

function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ============================================
// EFECTOS ESPECIALES Y MICRO-INTERACCIONES
// ============================================

// Efecto de tecleo en inputs
document.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", function () {
    this.parentElement.classList.remove("focused");
  });
});

// Efecto hover en botones
document.querySelectorAll('button, a[class*="btn"]').forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// ============================================
// PERFORMANCE Y OPTIMIZACIONES
// ============================================

// Debounce para eventos de scroll
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Aplicar debounce a eventos pesados
window.addEventListener("scroll", debounce(updateParticlesOnScroll, 5));
window.addEventListener("resize", debounce(updateParticlesOnScroll, 100));

// ============================================
// INICIALIZACIÓN FINAL
// ============================================

// Asegurar que todo esté listo
window.addEventListener("load", function () {
  console.log(
    "🚀 Huntrix K-Pop Demon Hunters - Experiencia cargada completamente"
  );

  // Añadir clase para transiciones suaves después de la carga
  document.body.classList.add("loaded");

  // Forzar repaint para algunas animaciones
  setTimeout(() => {
    document.querySelectorAll(".section").forEach((section) => {
      section.style.willChange = "auto";
    });
  }, 1000);
});

// ============================================
// ACCESIBILIDAD
// ============================================

// Mejorar accesibilidad del teclado
document.addEventListener("keydown", function (e) {
  // Tecla ESC cierra modales (si los hubiera)
  if (e.key === "Escape") {
    document.querySelectorAll('[aria-modal="true"]').forEach((modal) => {
      if (!modal.hidden) {
        modal.hidden = true;
      }
    });
  }

  // Navegación por tabs mejora el foco visible
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
  }
});

document.addEventListener("click", function () {
  document.body.classList.remove("user-is-tabbing");
});

// ============================================
// PWA READINESS (OPCIONAL PARA FUTURAS MEJORAS)
// ============================================

// Verificar si el navegador soporta Service Workers
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    // Aquí se podría registrar un Service Worker para hacer la app PWA
    console.log("✅ Este sitio está preparado para convertirse en PWA");
  });
}
