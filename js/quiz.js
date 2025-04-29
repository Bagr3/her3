document.addEventListener('DOMContentLoaded', () => {
    // Elementos DOM
    const startButton = document.getElementById('start-quiz');
    const quizContainer = document.getElementById('quiz-container');
    const optionsContainer = document.getElementById('options');
    const questionElement = document.getElementById('question');
    const finalMessage = document.getElementById('final-message');
    const carousel = document.getElementById('carousel');
    const feedback = document.getElementById('feedback');

    // Verificação de elementos
    if (!startButton || !quizContainer || !optionsContainer || !questionElement || !finalMessage || !carousel || !feedback) {
        console.error('Elementos necessários não encontrados:', {
            startButton, quizContainer, optionsContainer, questionElement, finalMessage, carousel, feedback
        });
        return;
    }
    
    console.log('Quiz inicializado - elementos verificados');
    
    // Configurar efeitos de partículas
    setupParticles();
    
    // Particles container
    const particlesCorrect = document.createElement('div');
    particlesCorrect.id = 'particles-correct';
    particlesCorrect.className = 'fixed inset-0 z-20 pointer-events-none opacity-0 transition-opacity duration-500';
    document.body.appendChild(particlesCorrect);
    
    const particlesWrong = document.createElement('div');
    particlesWrong.id = 'particles-wrong';
    particlesWrong.className = 'fixed inset-0 z-20 pointer-events-none opacity-0 transition-opacity duration-500';
    document.body.appendChild(particlesWrong);

    // Event listener único para o botão iniciar
    startButton.addEventListener('click', () => {
        console.log('Botão de iniciar quiz clicado');
        
        // Efeito de desaparecimento do botão
        startButton.classList.add('scale-110', 'opacity-0');
        setTimeout(() => {
            startButton.classList.add('hidden');
            
            // Efeito de aparecimento do quiz
            quizContainer.classList.remove('hidden');
            quizContainer.classList.add('scale-95', 'opacity-0');
            
            setTimeout(() => {
                quizContainer.classList.remove('scale-95', 'opacity-0');
                quizContainer.classList.add('scale-100', 'opacity-100');
                
                // Reset quiz state
                currentQuestionIndex = 0;
                showQuestion();
            }, 50);
        }, 300);
        
        carousel.classList.add('hidden');
    });

    // Exibir pergunta atual
    function showQuestion() {
        console.log('Mostrando pergunta', currentQuestionIndex);
        const currentQuestion = quizData[currentQuestionIndex];
        
        // Popula o conteúdo da pergunta
        questionElement.innerHTML = `
            <h2 class="text-2xl font-bold mb-2 opacity-0 transition-all duration-500 transform translate-y-4" id="question-title">${currentQuestion.title}</h2>
            <p class="opacity-0 transition-all duration-500 delay-300 transform translate-y-4" id="question-text">${currentQuestion.question}</p>
        `;
        
        // Animar aparecimento
        setTimeout(() => {
            document.getElementById('question-title').classList.remove('opacity-0', 'translate-y-4');
            
            setTimeout(() => {
                document.getElementById('question-text').classList.remove('opacity-0', 'translate-y-4');
            }, 200);
        }, 100);
        
        // Limpa e cria opções com efeito sequenciado
        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            if (option) {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('bg-purple-500', 'text-white', 'py-3', 'px-6', 'rounded-lg', 'hover:bg-purple-600', 'transition-all', 'opacity-0', 'scale-95', 'transform');
                button.style.transitionDelay = `${index * 100 + 400}ms`;
                button.dataset.index = index;
                button.addEventListener('click', () => handleAnswer(index));
                optionsContainer.appendChild(button);
                
                setTimeout(() => {
                    button.classList.remove('opacity-0', 'scale-95');
                }, 50 + index * 100);
            }
        });
    }

    // Processar resposta
    function handleAnswer(selectedIndex) {
        console.log('Resposta selecionada:', selectedIndex);
        const currentQuestion = quizData[currentQuestionIndex];
        const buttons = optionsContainer.querySelectorAll('button');
        const selectedButton = buttons[selectedIndex];
        
        // Desabilitar todos os botões para evitar múltiplos cliques
        buttons.forEach(button => {
            button.disabled = true;
        });
        
        if (selectedIndex === currentQuestion.correct) {
            // Resposta correta - efeito avançado
            playCorrectAnimation(selectedButton);
            
            // Mostrar partículas de sucesso
            particlesCorrect.classList.remove('opacity-0');
            particlesCorrect.classList.add('opacity-100');
            
            feedback.textContent = "Correto! 🎉";
            feedback.className = 'mt-6 text-xl font-medium scale-0 opacity-0';
            feedback.classList.add('text-green-500');
            
            // Animar o feedback aparecendo
            setTimeout(() => {
                feedback.classList.add('scale-110', 'opacity-100');
                feedback.classList.remove('scale-0');
                
                setTimeout(() => {
                    feedback.classList.remove('scale-110');
                    feedback.classList.add('scale-100');
                }, 200);
            }, 300);
            
            // Avançar para próxima pergunta com delay para ver os efeitos
            setTimeout(() => {
                // Esconder partículas
                particlesCorrect.classList.remove('opacity-100');
                particlesCorrect.classList.add('opacity-0');
                
                // Fade out do conteúdo atual
                fadeOutCurrentQuestion(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < quizData.length) {
                        showQuestion();
                        feedback.textContent = "";
                        feedback.className = 'mt-6 text-xl font-medium';
                    } else {
                        showFinalMessage();
                    }
                });
            }, 2000);
        } else {
            // Resposta incorreta - efeito avançado
            playWrongAnimation(selectedButton);
            
            // Mostrar partículas de erro
            particlesWrong.classList.remove('opacity-0');
            particlesWrong.classList.add('opacity-100');
            
            feedback.textContent = "ERROUUUU! ❌";
            feedback.className = 'mt-6 text-xl font-medium scale-0 opacity-0';
            feedback.classList.add('text-red-500');
            
            // Animar o feedback aparecendo
            setTimeout(() => {
                feedback.classList.add('scale-110', 'opacity-100');
                feedback.classList.remove('scale-0');
                
                setTimeout(() => {
                    feedback.classList.remove('scale-110');
                    feedback.classList.add('scale-100');
                }, 200);
            }, 300);
            
            // Remover o botão incorreto com efeito
            setTimeout(() => {
                // Esconder partículas
                particlesWrong.classList.remove('opacity-100');
                particlesWrong.classList.add('opacity-0');
                
                selectedButton.classList.add('scale-0', 'opacity-0');
                
                // Reativar botões restantes após o efeito
                setTimeout(() => {
                    selectedButton.style.display = 'none';
                    feedback.textContent = "";
                    feedback.className = 'mt-6 text-xl font-medium';
                    
                    buttons.forEach(button => {
                        if (button !== selectedButton) {
                            button.disabled = false;
                        }
                    });
                }, 500);
            }, 1500);
        }
    }
    
    // Função para animar saída da pergunta atual
    function fadeOutCurrentQuestion(callback) {
        const questionTitle = document.getElementById('question-title');
        const questionText = document.getElementById('question-text');
        const options = optionsContainer.querySelectorAll('button');
        
        if (questionTitle) questionTitle.classList.add('opacity-0', 'translate-y-4');
        if (questionText) questionText.classList.add('opacity-0', 'translate-y-4');
        
        options.forEach((button, index) => {
            button.style.transitionDelay = `${index * 50}ms`;
            button.classList.add('opacity-0', 'scale-95');
        });
        
        // Esperar as animações terminarem
        setTimeout(callback, 500);
    }
    
    // Efeitos visuais para resposta correta
    function playCorrectAnimation(button) {
        // Remover classes anteriores
        button.classList.remove('bg-purple-500', 'hover:bg-purple-600');
        
        // Efeito de ripple
        const ripple = document.createElement('span');
        ripple.className = 'absolute inset-0 rounded-lg animate-ping';
        ripple.style.backgroundColor = 'rgba(34, 197, 94, 0.3)';
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Adicionar classes para efeito de sucesso
        button.classList.add('bg-green-500', 'border-green-600', 'shadow-lg');
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.5)';
        
        // Efeito de pulso
        button.animate([
            { transform: 'scale(1)', boxShadow: '0 0 0 rgba(34, 197, 94, 0.7)' },
            { transform: 'scale(1.15)', boxShadow: '0 0 30px rgba(34, 197, 94, 0.8)' },
            { transform: 'scale(1.05)', boxShadow: '0 0 20px rgba(34, 197, 94, 0.7)' }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            iterations: 1
        });
    }
    
    // Efeitos visuais para resposta incorreta
    function playWrongAnimation(button) {
        // Remover classes anteriores
        button.classList.remove('bg-purple-500', 'hover:bg-purple-600');
        
        // Efeito de shake melhorado
        button.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(8px)' },
            { transform: 'translateX(-8px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)',
            iterations: 1
        });
        
        // Adicionar classes para efeito de erro
        button.classList.add('bg-red-500', 'border-red-600');
        button.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.5)';
    }

    // Exibir mensagem final
    function showFinalMessage() {
        console.log('Mostrando mensagem final');
        
        // Fadeout do quiz
        quizContainer.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            quizContainer.classList.add('hidden');
            
            // Mostrar mensagem com efeito de explosão
            finalMessage.classList.remove('hidden');
            finalMessage.classList.add('scale-0', 'opacity-0');
            
            setTimeout(() => {
                finalMessage.classList.remove('scale-0', 'opacity-0');
                finalMessage.classList.add('scale-110', 'opacity-100');
                
                // Efeito explosivo de confetes
                particlesCorrect.classList.remove('opacity-0');
                particlesCorrect.classList.add('opacity-100');
                
                // Ajustar para explosão maior
                if (window.tsParticles) {
                    const particlesInstance = tsParticles.domItem(0);
                    if (particlesInstance) {
                        particlesInstance.options.particles.number.value = 200;
                        particlesInstance.refresh();
                    }
                }
                
                setTimeout(() => {
                    finalMessage.classList.remove('scale-110');
                    finalMessage.classList.add('scale-100');
                    
                    // Mostrar carrossel
                    setTimeout(() => {
                        carousel.classList.remove('hidden');
                        carousel.classList.add('scale-95', 'opacity-0');
                        
                        setTimeout(() => {
                            carousel.classList.remove('scale-95', 'opacity-0');
                            carousel.classList.add('scale-100', 'opacity-100');
                            
                            // Inicializar o carrossel
                            if (typeof window.initCarousel === 'function') {
                                window.initCarousel();
                            } else {
                                console.error('Função initCarousel não encontrada!');
                            }
                        }, 50);
                    }, 1000);
                }, 200);
            }, 50);
        }, 500);
    }
    
    // Configurar partículas
    function setupParticles() {
        if (!window.tsParticles) {
            console.error('Biblioteca tsParticles não encontrada');
            return;
        }
        
        // Configuração para partículas de acerto
        tsParticles.load("particles-correct", {
            fpsLimit: 60,
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#22c55e", "#16a34a", "#86efac", "#bbf7d0", "#f0fdf4"]
                },
                shape: {
                    type: ["circle", "star", "triangle"]
                },
                opacity: {
                    value: 0.8,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                move: {
                    enable: true,
                    speed: 8,
                    direction: "top",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            detectRetina: true
        });
        
        // Configuração para partículas de erro
        tsParticles.load("particles-wrong", {
            fpsLimit: 60,
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#ef4444", "#dc2626", "#fca5a5", "#fecaca", "#fee2e2"]
                },
                shape: {
                    type: ["circle", "triangle"]
                },
                opacity: {
                    value: 0.8,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "bottom-right",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            detectRetina: true
        });
    }
});