//Metodo para dirigir el foco al titulo principal
window.onload = () => {
    const titulo = document.getElementById("Titulo-principal");
    if (titulo) {
        titulo.focus();
    }
    };

    //Metodo para que mis botones envien a los links ingresados
        const botones = document.querySelectorAll('.Botones_del_pie_de_pagina button');
        botones.forEach(boton => {
            boton.addEventListener('click', function() {
                const url = this.dataset.url; 
                if (url) {             
                    window.open(url, '_blank'); 
                }
            });
        });