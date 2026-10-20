
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Configuración de INFERNMC Network
  const SERVER_IP = "infernmc.nyxelis.tech";
  const DISCORD_URL = "https://discord.gg/r2YBStG73s";

  const toast = document.getElementById("toast");
  let toastTimer;

  // Mostrar notificaciones
  function showToast(message) {
    if (!toast) {
      console.log(message);
      return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  // Copiar texto al portapapeles
  async function copyText(text, successMessage) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();

        const copied = document.execCommand("copy");
        textarea.remove();

        if (!copied) {
          throw new Error("No se pudo copiar el texto");
        }
      }

      showToast(successMessage);
    } catch (error) {
      showToast("No se pudo copiar. Texto: " + text);
      console.error("Error al copiar:", error);
    }
  }

  // Botón principal para copiar la IP
  const copyIpButton = document.getElementById("copyIp");

  if (copyIpButton) {
    copyIpButton.addEventListener("click", () => {
      copyText(SERVER_IP, "¡IP copiada! " + SERVER_IP);
    });
  }

  // Cualquier elemento con data-copy copia su contenido
  document.querySelectorAll("[data-copy]").forEach((element) => {
    element.addEventListener("click", () => {
      const value = element.getAttribute("data-copy");

      if (value) {
        copyText(value, "Texto copiado correctamente.");
      }
    });
  });

  // Menú para móviles
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });

    // Cerrar menú al seleccionar una sección
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Cerrar menú con Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Marcar la sección actual en la navegación lateral
  const sidebarLinks = document.querySelectorAll(".sidebar a[href^='#']");

  if (sidebarLinks.length && "IntersectionObserver" in window) {
    const sections = Array.from(sidebarLinks)
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          sidebarLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Enlaces de Discord: usar la invitación oficial
  document.querySelectorAll("[data-discord]").forEach((element) => {
    element.setAttribute("href", DISCORD_URL);
    element.setAttribute("target", "_blank");
    element.setAttribute("rel", "noopener noreferrer");
  });

  console.log("INFERNMC Wiki cargada correctamente.");
});
