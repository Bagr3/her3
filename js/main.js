const quizData = [
    {
        title: "Onde foi nosso primeiro encontro?",
        question: "Escolha a opção correta:",
        options: ["Na frente da casa da Sara kkk", "Shopping Bosque", "Shopping CG", "Centro", "Parque das Nações"],
        correct: 2
    },
    {
        title: "Qual foi a primeira coisa que eu te falei?",
        question: "Escolha a opção correta:",
        options: [
            "Eu tô gostando tanto", 
            "Oi, tudo bem?", 
            "Acabou a segunda temporada", 
            "Você é linda", 
            "Boa noite!"
        ],
        correct: 2
    },
    {
        title: "Qual foi a primeira flor que eu te dei?",
        question: "Escolha a opção correta:",
        options: ["Rosa", "Lírio", "Tulipa", "Girassol", "Margarida"],
        correct: 3
    },
    {
        title: "Qual é o meu acompanhamento favorito no açaí?",
        question: "Escolha a opção correta:",
        options: ["Paçoca", "Granola", "Banana", "Ovomaltine", "M&M"],
        correct: 3
    },
    {
        title: "Qual é a sua comida favorita de almoço?",
        question: "Escolha a opção correta:",
        options: ["Frango assado", "Feijão tropeiro", "Lasanha", "Estrogonofe", "Carne moída"],
        correct: 4
    },
    {
        title: "Quantos quilômetros já andamos de moto juntos?",
        question: "Escolha a opção correta:",
        options: ["100km", "250km", "300km", "500km", "Mais de 500km"],
        correct: 4
    },
    {
        title: "O que você me deu de aniversário?",
        question: "Escolha a opção correta:",
        options: ["Relógio", "Wacom", "Camisa", "Livro", "Perfume"],
        correct: 1
    },
    {
        title: "O que eu te dei de aniversário?",
        question: "Escolha a opção correta:",
        options: ["Flores", "Chocolate", "Colar de prata", "Aliança", "Ursinho"],
        correct: 2
    },
    {
        title: "Qual é minha comida favorita?",
        question: "Escolha a opção correta:",
        options: ["Pizza", "Churrasco", "Hambúrguer", "Tacos", "Macarrão"],
        correct: 2
    },
    {
        title: "Qual é minha profissão?",
        question: "Escolha a opção correta:",
        options: ["Engenheiro", "Médico", "Programador Python", "Designer", "Professor"],
        correct: 2
    },
    {
        title: "Na sua casa sempre falta o quê?",
        question: "Escolha a opção correta:",
        options: ["Açúcar", "Sal", "Gelo", "Arroz", "Álcool"],
        correct: 2
    },
    {
        title: "O que vou te dar de presente nos nossos 7 meses?",
        question: "Escolha a opção correta:",
        options: ["Flores e chocolate", "Flores e um salve", "Par de meias", "Tratado de tordesilhas", "Uma moto"],
        correct: 0
    }
];


// Variáveis globais
let currentQuestionIndex = 0;

// Configuração inicial
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente carregado');
    // Adicionar efeitos visuais
    document.body.classList.add('animated-bg');
    
    // Ocultar o carrossel no início
    const carousel = document.getElementById('carousel');
    if (carousel) {
        carousel.classList.add('hidden');
    } else {
        console.error('Elemento carousel não encontrado');
    }
});