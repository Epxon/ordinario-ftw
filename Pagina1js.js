window.onload = () => {
  const titulo = document.getElementById("titulo-principal");
  if (titulo) {
    titulo.focus();
  }
};
    const botones = document.querySelectorAll('.Botones_del_pie_de_pagina button');
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const url = this.dataset.url; // 
            if (url) {             
                window.open(url, '_blank'); 
            }
        });
    });
