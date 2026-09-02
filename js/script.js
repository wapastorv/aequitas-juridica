(function(){
  "use strict";

  // Corrige el alto real de la ventana en navegadores embebidos (WhatsApp,
  // Instagram, Facebook, etc.) donde 100vh/100dvh no reflejan el viewport
  // visible y provocan que la barra de control tape el contenido inferior.
  function ajustarAltoVisible(){
    var alto = (window.visualViewport ? window.visualViewport.height : window.innerHeight) * 0.01;
    document.documentElement.style.setProperty("--vh", alto + "px");
  }
  ajustarAltoVisible();
  window.addEventListener("resize", ajustarAltoVisible);
  window.addEventListener("orientationchange", ajustarAltoVisible);
  if (window.visualViewport) window.visualViewport.addEventListener("resize", ajustarAltoVisible);

  var slides   = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var total    = slides.length;
  var barra    = document.getElementById("barra");
  var contador = document.getElementById("contador");
  var btnPrev  = document.getElementById("btn-prev");
  var btnNext  = document.getElementById("btn-next");
  var btnIndice= document.getElementById("btn-indice");
  var indice   = document.getElementById("indice");
  var lista    = document.getElementById("indice-lista");
  var actual   = 0;

  function pad(n){ return (n < 10 ? "0" : "") + n; }

  // Construir el índice a partir de los títulos declarados en el marcado
  slides.forEach(function(slide, i){
    var li = document.createElement("li");
    var b  = document.createElement("button");
    b.type = "button";
    b.innerHTML = "<i>" + pad(i + 1) + "</i><span>" + slide.dataset.titulo + "</span>";
    b.addEventListener("click", function(){ ir(i); cerrarIndice(); });
    li.appendChild(b);
    lista.appendChild(li);
  });
  var botonesIndice = Array.prototype.slice.call(lista.querySelectorAll("button"));

  function ir(n, actualizarHash){
    n = Math.max(0, Math.min(total - 1, n));
    slides[actual].classList.remove("is-active");
    slides[n].classList.add("is-active");
    slides[n].scrollTop = 0;
    actual = n;

    document.body.classList.toggle("oscuro", slides[n].classList.contains("slide--oscura"));
    barra.style.width = ((n + 1) / total * 100) + "%";
    contador.textContent = pad(n + 1) + " / " + pad(total);
    btnPrev.disabled = (n === 0);
    btnNext.disabled = (n === total - 1);
    botonesIndice.forEach(function(b, i){ b.setAttribute("aria-current", i === n ? "true" : "false"); });

    if (actualizarHash !== false) history.replaceState(null, "", "#" + (n + 1));
  }

  function siguiente(){ ir(actual + 1); }
  function anterior(){ ir(actual - 1); }

  function abrirIndice(){ indice.classList.add("abierto"); indice.setAttribute("aria-hidden","false"); botonesIndice[actual].focus(); }
  function cerrarIndice(){ indice.classList.remove("abierto"); indice.setAttribute("aria-hidden","true"); }
  function alternarIndice(){ indice.classList.contains("abierto") ? cerrarIndice() : abrirIndice(); }

  btnNext.addEventListener("click", siguiente);
  btnPrev.addEventListener("click", anterior);
  btnIndice.addEventListener("click", alternarIndice);
  indice.addEventListener("click", function(e){ if (e.target === indice) cerrarIndice(); });

  document.addEventListener("keydown", function(e){
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === "Escape" && indice.classList.contains("abierto")){ cerrarIndice(); return; }

    switch(e.key){
      case "ArrowRight": case "ArrowDown": case "PageDown": case " ":
        e.preventDefault(); siguiente(); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp":
        e.preventDefault(); anterior(); break;
      case "Home": e.preventDefault(); ir(0); break;
      case "End":  e.preventDefault(); ir(total - 1); break;
      case "f": case "F":
        if (document.fullscreenElement) document.exitFullscreen();
        else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
        break;
      case "i": case "I": alternarIndice(); break;
    }
  });

  // Deslizamiento táctil
  var x0 = null, y0 = null;
  document.addEventListener("touchstart", function(e){
    x0 = e.changedTouches[0].clientX;
    y0 = e.changedTouches[0].clientY;
  }, {passive:true});
  document.addEventListener("touchend", function(e){
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    var dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? siguiente() : anterior(); }
    x0 = y0 = null;
  }, {passive:true});

  // Abrir en la diapositiva indicada por la URL (útil al compartir el enlace)
  var inicial = parseInt((location.hash || "").replace("#",""), 10);
  ir(isNaN(inicial) ? 0 : inicial - 1);
})();
