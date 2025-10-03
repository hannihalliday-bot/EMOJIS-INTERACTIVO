document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const strobeBtn = document.getElementById('strobeBtn');
    const dayNightBtn = document.getElementById('dayNightBtn');
    
    // Lista de emojis para usar aleatoriamente
    const emojis = ['😀', '😂', '🤣', '😍', '🥰', '😎', '🤩', '😜', '🤪', '😇', '🥳', '🤯', '👽', '🚀', '💥', '⭐', '🌈', '🍕', '🍦', '🎮'];
    
    // Variables para controlar el estado de los emojis y efectos
    let isStrobeActive = false;
    let strobeInterval;
    let isDayMode = false;
    
    // Crear estrellas en el cielo nocturno
    function createStars() {
        const body = document.body;
        
        // Crear 50 estrellas
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Tamaño aleatorio entre 2px y 4px
            const size = Math.random() * 2 + 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Posición aleatoria
            const left = Math.random() * 100;
            const top = Math.random() * 40; // Solo en la parte superior del cielo
            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            
            // Duración aleatoria de la animación
            const duration = Math.random() * 3 + 1;
            star.style.animationDuration = `${duration}s`;
            
            // Añadir la estrella al body
            body.appendChild(star);
        }
    }
    
    // Iniciar la creación de estrellas
    createStars();
    
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
        
        // Tamaño aleatorio entre 0.5 y 3
        const randomSize = Math.random() * 2.5 + 0.5;
        emoji.style.transform = `scale(${randomSize})`;
        
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
    
    // Función para activar/desactivar el efecto estrobo
    strobeBtn.addEventListener('click', () => {
        isStrobeActive = !isStrobeActive;
        
        if (isStrobeActive) {
            strobeBtn.textContent = 'Desactivar Estrobo';
            document.body.classList.add('strobe-active');
            
            // Crear el efecto estrobo con un intervalo
            strobeInterval = setInterval(() => {
                document.body.style.backgroundColor = getRandomColor();
            }, 100);
        } else {
            strobeBtn.textContent = 'Efecto Estrobo';
            document.body.classList.remove('strobe-active');
            clearInterval(strobeInterval);
            
            // Restaurar el color de fondo según el modo día/noche
            document.body.style.backgroundColor = isDayMode ? '#87CEEB' : '#0a0e29';
        }
    });
    
    // Función para cambiar entre modo día y noche
    dayNightBtn.addEventListener('click', () => {
        isDayMode = !isDayMode;
        
        if (isDayMode) {
            dayNightBtn.textContent = 'Cambiar a Noche';
            document.body.classList.add('day-mode');
        } else {
            dayNightBtn.textContent = 'Cambiar a Día';
            document.body.classList.remove('day-mode');
        }
        
        // Si el estrobo está activo, no cambiar el color de fondo
        if (!isStrobeActive) {
            document.body.style.backgroundColor = isDayMode ? '#87CEEB' : '#0a0e29';
        }
    });
    
    // Función para generar un color aleatorio para el efecto estrobo
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});