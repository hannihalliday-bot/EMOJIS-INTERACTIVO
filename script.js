document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const sizeIncreaseBtn = document.getElementById('sizeIncreaseBtn');
    const sizeDecreaseBtn = document.getElementById('sizeDecreaseBtn');
    const sizeSlider = document.getElementById('sizeSlider');
    const sizeValue = document.getElementById('sizeValue');
    const distortBtn = document.getElementById('distortBtn');
    const distortSlider = document.getElementById('distortSlider');
    const distortValue = document.getElementById('distortValue');
    
    // Lista de emojis para usar aleatoriamente
    const emojis = ['😀', '😂', '🤣', '😍', '🥰', '😎', '🤩', '😜', '🤪', '😇', '🥳', '🤯', '👽', '🚀', '💥', '⭐', '🌈', '🍕', '🍦', '🎮'];
    
    // Variables para controlar el estado de los emojis
    let emojiSize = 1;
    let isDistorted = false;
    let distortIntensity = 50;
    
    // Crear corazones flotantes en el fondo
    function createHearts() {
        const body = document.body;
        const heartSymbols = ['❤️', '💙', '💜', '💖', '💗', '💓', '💕'];
        
        // Crear 20 corazones
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                
                // Posición horizontal aleatoria
                const left = Math.random() * 100;
                heart.style.left = `${left}%`;
                
                // Duración aleatoria de la animación
                const duration = Math.random() * 10 + 5;
                heart.style.animationDuration = `${duration}s`;
                
                // Añadir el corazón al body
                body.appendChild(heart);
                
                // Eliminar el corazón después de que termine la animación
                setTimeout(() => {
                    body.removeChild(heart);
                }, duration * 1000);
            }, i * 300); // Crear corazones con un pequeño retraso entre ellos
        }
    }
    
    // Iniciar la creación de corazones y repetir cada cierto tiempo
    createHearts();
    setInterval(createHearts, 10000);
    
    // Función para crear un emoji al hacer clic
    function createEmoji(e) {
        // Obtener posición del clic
        const x = e.clientX;
        const y = e.clientY;
        
        // Crear elemento emoji
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        
        // Seleccionar un emoji aleatorio
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.textContent = randomEmoji;
        
        // Posicionar el emoji donde se hizo clic
        emoji.style.left = `${x}px`;
        emoji.style.top = `${y}px`;
        
        // Aplicar tamaño actual
        emoji.style.transform = `scale(${emojiSize})`;
        
        // Aplicar distorsión si está activa
        if (isDistorted) {
            emoji.classList.add('distorted');
            emoji.style.setProperty('--distort-intensity', distortIntensity + '%');
        }
        
        // Añadir el emoji al contenedor
        container.appendChild(emoji);
        
        // Eliminar el emoji después de un tiempo aleatorio (entre 3 y 8 segundos)
        const duration = Math.random() * 5000 + 3000;
        setTimeout(() => {
            emoji.style.opacity = '0';
            emoji.style.transition = 'opacity 1s ease';
            setTimeout(() => {
                container.removeChild(emoji);
            }, 1000);
        }, duration);
    }
    
    // Evento para crear emojis al hacer clic
    container.addEventListener('click', createEmoji);
    
    // Funciones para controlar el tamaño de los emojis
    sizeIncreaseBtn.addEventListener('click', () => {
        emojiSize = Math.min(emojiSize + 0.5, 5);
        updateSizeControls();
    });
    
    sizeDecreaseBtn.addEventListener('click', () => {
        emojiSize = Math.max(emojiSize - 0.5, 0.5);
        updateSizeControls();
    });
    
    sizeSlider.addEventListener('input', () => {
        emojiSize = parseFloat(sizeSlider.value);
        updateSizeControls();
    });
    
    function updateSizeControls() {
        sizeSlider.value = emojiSize;
        sizeValue.textContent = emojiSize.toFixed(1) + 'x';
        
        // Actualizar todos los emojis existentes
        document.querySelectorAll('.emoji').forEach(emoji => {
            emoji.style.transform = `scale(${emojiSize})`;
        });
    }
    
    // Funciones para controlar la distorsión de los emojis
    distortBtn.addEventListener('click', () => {
        isDistorted = !isDistorted;
        
        // Actualizar texto del botón
        distortBtn.textContent = isDistorted ? 'Normalizar Emojis' : 'Distorsionar Emojis';
        
        // Aplicar o quitar la distorsión a todos los emojis existentes
        document.querySelectorAll('.emoji').forEach(emoji => {
            if (isDistorted) {
                emoji.classList.add('distorted');
                emoji.style.setProperty('--distort-intensity', distortIntensity + '%');
            } else {
                emoji.classList.remove('distorted');
            }
        });
    });
    
    distortSlider.addEventListener('input', () => {
        distortIntensity = parseInt(distortSlider.value);
        distortValue.textContent = distortIntensity + '%';
        
        // Actualizar la intensidad de distorsión en los emojis existentes si la distorsión está activa
        if (isDistorted) {
            document.querySelectorAll('.emoji').forEach(emoji => {
                emoji.style.setProperty('--distort-intensity', distortIntensity + '%');
            });
        }
    });
});