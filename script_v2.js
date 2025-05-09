// Define the game state and elements
const gameState = {
    selectedCharacter: null,
    score: 0,
    playerPosition: 50,
    gameInterval: null,
    chatMessages: [
        "- La vaca que ríe: Los mensajes y las llamadas están cifrados de extremo a extremo.",
        "- Ana: Ana creó el grupo 'Finde Málaga'.",
        "- La vaca que ríe: Ana te añadió.",
        "- Luigi: Ana añadió a Luigi.",
        "- Ana: Para decidir... y después seguimos en el otro.",
        "- Xoana: Venga lo veo ahora.",
        "- Lolina: Eso son hoteles?",
        "- Boque: Ok.",
        "- Lolina: Más versatilidad nos da un apartamento no?",
        "- Boque: Lo suyo sería reservar un par de sitios.",
        "- Xoana: Yo busqué para 7 contando con Luis y Laura.",
        "- Alberto: Luego los veo! Gracias!",
        "- Boque: Esperad, que estoy dando clase.",
        "- Alberto: Te van a confiscar el móvil tus alumnos.",
        "- Xoana: ¿De qué les estás hablando hoy?",
        "- Boque: Pues ahora mismo en 4º estamos viendo la proclamación de la IIª República.",
        "- Boque: Con los de 1º acabo de terminar Egipto y Mesopotamia.",
        "- Xoana: Qué maravilla.",
        "- Alberto: Qué guay tu curro Boque!",
        "- Luigi: Yo estoy pintando zócalos y ventanas en París.",
        "- Boque: Así que, en mi opinión lo mejor va a ser coger varios apartamentos en un mismo edificio o misma calle.",
        "- Xoana: Genial.",
        "- Alberto: Yo no estoy en absoluto de acuerdo. No sé, esperaba un poco más de búsqueda e ilusión."
    ]
};

const friends = ["Ana", "Lolina", "Xoana", "Laura", "Luigi", "Ángel", "Boque", "Alberto"];
const drinks = ["Ron con cola", "Gintonic", "Cerveza", "Vino", "Jagger", "Chupito de tequila", "Pollo", "Agua con gas", "Tinto de verano"];
let assignedDrinks = [];
let servedDrinks = [];
let currentFriendIndex = 0;

const chatMessages = [
    "Los mensajes y las llamadas están cifrados de extremo a extremo.",
    "Ana creó el grupo 'Finde Málaga'.",
    "Ana te añadió.",
    "Ana añadió a Luigi.",
    "Para decidir... y después seguimos en el otro.",
    "Venga lo veo ahora.",
    "Eso son hoteles?",
    "Más versatilidad nos da un apartamento no?",
    "Lo suyo sería reservar un par de sitios: uno mínimo para los que estamos confirmados ya.",
    "Yo busqué para 7 contando con Luis y Laura que hará todo lo posible por venir.",
    "Esperad, que estoy dando clase.",
    "Te van a confiscar el móvil tus alumnos.",
    "De qué les estás hablando hoy?",
    "Pues ahora mismo en 4º estamos viendo la proclamación de la IIª República.",
    "Con los de 1º acabo de terminar Egipto y Mesopotamia.",
    "Qué maravilla. Puedes con eso y mucho más.",
    "Jajajaja. Y yo escribiendo pliegos. Qué palabra más horrorosa.",
    "Yo estoy pintando zócalos y ventanas en un hôtel particulier de 150M de € en París.",
    "Ok a ver, estoy ahora viendo un video sobre Cambio Climático con los chavales y estoy viendo todo lo que habéis enviado.",
    "Si os parece hablo con ellos y a ver si me hacen algo de precio.",
    "Lo suyo sería, por ejemplo, pillar los dos apartamentos de calle salitre (4 y 4).",
    "Genial.",
    "Lo que te parezca.",
    "Dsbuten.",
    "Ea.",
    "Pues les llamo esta tarde y os digo.",
    "En Valencia se dice 'estoy de acuerdo'.",
    "Aquí diríamos 'non reserves, maloserá'.",
    "jajaja.",
    "Si reservamos estos tres apartamentos nos garantizamos 11 plazas en la misma calle.",
    "Por 846,50€.",
    "salimos a 77€/testa.",
    "Me parece estupendo.",
    "Está muy bien.",
    "Me da pena no estar más juntos (que no revueltos).",
    "Ya, a mi también me molaba la idea de estar todos en uno solo.",
    "Pero para eso nos tenemos que alejar más del centro.",
    "Y al final ahí solo vamos a estar para dormir y ducharnos.",
    "Por eso.",
    "Has dicho mismo edificio?",
    "Sí, creo recordar que los dos de Salitre I están en el mismo edificio.",
    "Pues genial.",
    "Llamo esta tarde y os digo, y si parece ya reservamos.",
    "Más que nada por garantizarnos algo y olvidarnos ya del tema.",
    "Perfecto.",
    "Muchas gracias.",
    "Madre mía, se me acelera el corazón cuando lo pienso detenidamente.",
    "Vernos juntos otra vez.",
    "Jajaja.",
    "El túnel del tiempo.",
    "Y si os parece correcto el planning que hice en el otro grupo, también organizo reservas en todos esos sitios que propuse.",
    "Total.",
    "Guay. Si podemos colaborar con algo dinos. Si no, adelante.",
    "Muchísimas gracias!"
];

const chatBox = document.getElementById('chat-box');
const chatContent = document.getElementById('chat-content');
const startButton = document.getElementById('start-button');
const gameContainer = document.getElementById('game-container');

// Show random chat messages during drink selection
function showRandomChatMessage(button) {
    const randomIndex = Math.floor(Math.random() * gameState.chatMessages.length);
    const originalText = button.textContent;

    button.textContent = gameState.chatMessages[randomIndex];
    button.disabled = true;

    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Attach chat message logic to drink buttons
function attachDrinkButtonLogic() {
    document.querySelectorAll('.drink-button').forEach(button => {
        button.addEventListener('click', () => showRandomChatMessage(button));
    });
}

function startInfiniteChat() {
    setInterval(() => {
        const randomMessage = chatMessages[Math.floor(Math.random() * chatMessages.length)];
        const messageElement = document.createElement('p');
        messageElement.textContent = randomMessage;
        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight;
    }, 2000);
}

function assignRandomDrinks() {
    assignedDrinks = friends.map(friend => {
        const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];
        return { friend, drink: randomDrink };
    });
}

function showFriendDrink() {
    if (currentFriendIndex < assignedDrinks.length) {
        const { friend, drink } = assignedDrinks[currentFriendIndex];
        gameContainer.innerHTML = `<h1>${friend} ha elegido:</h1><p>${drink}</p>`;
        gameContainer.innerHTML += '<button id="next-button">Siguiente</button>';

        document.getElementById('next-button').addEventListener('click', () => {
            currentFriendIndex++;
            showFriendDrink();
        });
    } else {
        showServingScreen();
    }
}

function showServingScreen() {
    gameContainer.innerHTML = '<h1>Prepara las bebidas</h1>';
    const drinkButtons = drinks.map(drink => `<button class="serve-button" data-drink="${drink}">${drink}</button>`).join('');
    gameContainer.innerHTML += `<p>Haz clic en las bebidas para prepararlas:</p>${drinkButtons}`;
    gameContainer.innerHTML += '<button id="submit-drinks">Servir bebidas</button>';

    document.querySelectorAll('.serve-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedDrink = e.target.getAttribute('data-drink');
            servedDrinks.push(selectedDrink);
        });
    });

    document.getElementById('submit-drinks').addEventListener('click', checkResults);
}

function checkResults() {
    let score = 0;
    assignedDrinks.forEach((assignment, index) => {
        if (servedDrinks[index] === assignment.drink) {
            score++;
        }
    });

    gameContainer.innerHTML = `<h1>Resultados</h1><p>Has acertado ${score} de ${friends.length} bebidas.</p>`;
}

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    chatBox.style.display = 'block';
    assignRandomDrinks();
    showFriendDrink();
    startInfiniteChat();
});

// Initialize everything on window load
window.onload = () => {
    attachDrinkButtonLogic();
};