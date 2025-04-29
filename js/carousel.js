document.addEventListener('DOMContentLoaded', () => {
    // Função para inicializar o carrossel
    function initCarousel() {
        console.log('Inicializando carrossel infinito aprimorado');
        const carousel = document.getElementById('carousel');
        const carouselInner = document.getElementById('carousel-inner');
        
        if (!carousel || !carouselInner) {
            console.error('Elementos do carrossel não encontrados');
            return;
        }
        
        // Limpar conteúdo anterior
        carouselInner.innerHTML = '';
        
        // Array de imagens para o carrossel
        const totalImages = 21; // 0 a 20
        const images = [];
        
        // Criar elementos de imagem e armazenar referências
        for (let i = 0; i < totalImages; i++) {
            const img = document.createElement('img');
            img.src = `img/a_${i}.png`;
            img.alt = `Memória ${i}`;
            img.classList.add('w-64', 'h-64', 'object-cover', 'rounded', 'mr-4', 'transition-all', 'duration-300', 'hover:scale-105');
            img.onerror = () => {
                img.src = 'https://via.placeholder.com/256x256?text=Imagem+não+encontrada';
            };
            images.push(img);
        }
        
        // Técnica de carrossel infinito: adicionar clones no início e fim
        // Adicionamos os últimos 5 itens no início e os primeiros 5 no final (aumentando para melhor experiência)
        const clonesAtStart = 5;
        const clonesAtEnd = 5;
        
        // Adicionar clones no início (últimos itens)
        for (let i = totalImages - clonesAtStart; i < totalImages; i++) {
            const clone = images[i].cloneNode(true);
            clone.classList.add('clone');
            carouselInner.appendChild(clone);
        }
        
        // Adicionar itens originais
        images.forEach(img => {
            carouselInner.appendChild(img);
        });
        
        // Adicionar clones no final (primeiros itens)
        for (let i = 0; i < clonesAtEnd; i++) {
            const clone = images[i].cloneNode(true);
            clone.classList.add('clone');
            carouselInner.appendChild(clone);
        }
        
        // Configurações do carrossel
        const itemWidth = 272; // 256px (largura) + 16px (margin)
        let position = clonesAtStart; // Começar nos itens reais, após os clones iniciais
        let isTransitioning = false;
        
        // Função para mover o carrossel
        function moveCarousel(newPosition, withAnimation = true) {
            // Permitir movimento mesmo durante a transição para o arrasto
            if (withAnimation) {
                carouselInner.style.transition = 'transform 0.5s ease';
            } else {
                carouselInner.style.transition = 'none';
            }
            
            position = newPosition;
            carouselInner.style.transform = `translateX(${-position * itemWidth}px)`;
            
            // Detectar limites e ajustar posição sem animação, se necessário
            if (position >= totalImages + clonesAtStart) {
                // Precisamos definir um timeout para dar tempo ao renderizador
                setTimeout(() => {
                    position = clonesAtStart;
                    carouselInner.style.transition = 'none';
                    carouselInner.style.transform = `translateX(${-position * itemWidth}px)`;
                    isTransitioning = false;
                }, 510); // Pouco mais que a duração da transição
            } else if (position < clonesAtStart) {
                setTimeout(() => {
                    position = totalImages + clonesAtStart - 1;
                    carouselInner.style.transition = 'none';
                    carouselInner.style.transform = `translateX(${-position * itemWidth}px)`;
                    isTransitioning = false;
                }, 510);
            } else {
                // Se não atingiu os limites, libera a transição após a animação
                if (withAnimation) {
                    setTimeout(() => {
                        isTransitioning = false;
                    }, 510);
                } else {
                    isTransitioning = false;
                }
            }
        }
        
        // Posicionar inicialmente no primeiro item real (após os clones)
        moveCarousel(position, false);
        
        // Autoscroll com verificação melhorada
        let autoScroll;
        
        function startAutoScroll() {
            clearInterval(autoScroll); // Limpar intervalo anterior
            autoScroll = setInterval(() => {
                if (!isTransitioning) {
                    isTransitioning = true;
                    moveCarousel(position + 1);
                }
            }, 3000);
        }
        
        // Iniciar o autoscroll
        startAutoScroll();
        
        // Parar/retomar autoscroll
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoScroll);
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mouseleave', () => {
            carousel.style.cursor = 'default';
            startAutoScroll();
        });
        
        // Suporte para arrastar - melhorado
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let lastDragTime = 0;
        
        carousel.addEventListener('mousedown', (e) => {
            if (isTransitioning) return; // Evitar arrasto durante animação
            
            isDragging = true;
            startPos = e.clientX;
            currentTranslate = position * itemWidth;
            carousel.style.cursor = 'grabbing';
            
            // Desativar transição para arrasto mais fluido
            carouselInner.style.transition = 'none';
            
            // Cancelar qualquer clique acidental
            e.preventDefault();
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const currentPosition = e.clientX;
            const diff = startPos - currentPosition;
            
            // Aplicar um limite de arrasto com resistência
            const maxDrag = itemWidth * 3;
            const constrainedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);
            
            carouselInner.style.transform = `translateX(${-(currentTranslate + constrainedDiff)}px)`;
            lastDragTime = Date.now();
        });
        
        // Usar document para capturar o mouse mesmo fora do elemento
        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            
            // Evitar cliques acidentais logo após arrastar
            if (Date.now() - lastDragTime < 100) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            isDragging = false;
            carousel.style.cursor = 'grab';
            const currentPosition = e.clientX;
            const diff = startPos - currentPosition;
            
            // Reativar transição
            carouselInner.style.transition = 'transform 0.5s ease';
            
            // Ajustar lógica de arrasto
            if (Math.abs(diff) > 50) {
                isTransitioning = true;
                if (diff > 0) {
                    moveCarousel(position + 1);
                } else {
                    moveCarousel(position - 1);
                }
            } else {
                // Movimento muito pequeno, voltar à posição atual
                moveCarousel(position);
            }
        });
        
        // Suporte para touch - também aprimorado
        carousel.addEventListener('touchstart', (e) => {
            if (isTransitioning) return;
            
            isDragging = true;
            startPos = e.touches[0].clientX;
            currentTranslate = position * itemWidth;
            carouselInner.style.transition = 'none';
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            // Prevenir scroll da página ao arrastar o carousel
            e.preventDefault();
            
            const currentPosition = e.touches[0].clientX;
            const diff = startPos - currentPosition;
            
            // Aplicar limite de arrasto com resistência
            const maxDrag = itemWidth * 3;
            const constrainedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);
            
            carouselInner.style.transform = `translateX(${-(currentTranslate + constrainedDiff)}px)`;
            lastDragTime = Date.now();
        });
        
        carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            isDragging = false;
            const currentPosition = e.changedTouches[0].clientX;
            const diff = startPos - currentPosition;
            
            carouselInner.style.transition = 'transform 0.5s ease';
            
            if (Math.abs(diff) > 50) {
                isTransitioning = true;
                if (diff > 0) {
                    moveCarousel(position + 1);
                } else {
                    moveCarousel(position - 1);
                }
            } else {
                moveCarousel(position);
            }
        });
        
        // Adicionar indicador de arrastar mais sutil
        const dragIndicator = document.createElement('div');
        dragIndicator.className = 'flex items-center justify-center mt-4 text-white/60 text-sm';
        dragIndicator.innerHTML = '<span class="animate-pulse-slow">❮</span><span class="mx-2">Arraste para navegar</span><span class="animate-pulse-slow">❯</span>';
        carousel.appendChild(dragIndicator);
    }

    // Tornando a função disponível globalmente
    window.initCarousel = initCarousel;
});