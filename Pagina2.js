    //Metodo para dirigir el foco al titulo principal
    window.onload = () => {
    const titulo = document.getElementById("Titulo-principal");
    if (titulo) {
        titulo.focus();
    }
    };

    //Metodo para que mis botones envien a las paginas ingresadas
        const botones = document.querySelectorAll('.Botones_del_pie_de_pagina button');
        botones.forEach(boton => {
            boton.addEventListener('click', function() {
                const url = this.dataset.url; 
                if (url) {             
                    window.open(url, '_blank'); 
                }
            });
        });

    
    //Lógica principal para mostrar/ocultar y cargar los episodios
    const toggleButton = document.getElementById('desplegar-caps');
    const galeriaEpisodiosContainer = document.getElementById('galeria-de-episodios-contenido');
    let episodiosCargados = false; 

    if (toggleButton && galeriaEpisodiosContainer) {
        toggleButton.addEventListener('click', () => {
            
            if (!episodiosCargados) {
                loadEpisodiosXML(); 
                episodiosCargados = true; 
            }

            
            galeriaEpisodiosContainer.classList.toggle('hidden');

           
            const isHidden = galeriaEpisodiosContainer.classList.contains('hidden');
            toggleButton.textContent = isHidden ? 'Mostrar' : 'Ocultar';
            toggleButton.setAttribute('aria-expanded', !isHidden);
        });
    }

    //Función para cargar el XML de episodios
    const loadEpisodiosXML = async () => {
        try {
           
            const response = await fetch('capitulos.xml');
            if (!response.ok) {
                throw new Error(`Error al cargar el XML: ${response.statusText} (Estado: ${response.status})`);
            }
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            
            const episodiosXML = xmlDoc.getElementsByTagName("episodio"); 
            
            renderEpisodios(episodiosXML); 
        } catch (error) {
            console.error('Hubo un error al cargar o parsear los episodios:', error);
            galeriaEpisodiosContainer.innerHTML = '<p>Error al cargar los episodios. Por favor, revisa la consola para más detalles.</p>';
            toggleButton.textContent = 'Error al cargar';
            toggleButton.disabled = true; 
        }
    };

    //Función para renderizar los episodios en el DOM
    const renderEpisodios = (episodios) => {
       
        galeriaEpisodiosContainer.innerHTML = '';

        
        if (episodios.length === 0) {
            galeriaEpisodiosContainer.innerHTML = '<p>No se encontraron episodios en el XML.</p>';
            return;
        }

        
        Array.from(episodios).forEach(episodioXML => {
            
            const imagen = episodioXML.getElementsByTagName("imagen")[0]?.textContent || "";
            const titulo = episodioXML.getElementsByTagName("titulo")[0]?.textContent || "N/A";
            const enlace = episodioXML.getElementsByTagName("enlace")[0]?.textContent || "#";
            const altImagen = episodioXML.getElementsByTagName("alt_imagen")[0]?.textContent || "";
            const tituloEnlace = episodioXML.getElementsByTagName("titulo_enlace")[0]?.textContent || "";

            
            const episodioDiv = document.createElement('div');
            episodioDiv.classList.add('episodio-formato');

            
            episodioDiv.innerHTML = `
                <img src="${imagen}" alt="${altImagen}">
                <a href="${enlace}" title="${tituloEnlace}">${titulo}</a>
            `;
            

            galeriaEpisodiosContainer.appendChild(episodioDiv);
        });
    };
