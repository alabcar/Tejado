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
    "Ana: ‎Ana creó el grupo “Finde Málaga ”.",
    "Luigi: ‎Ana añadió a Luigi.",
    "Ana: Para decidir... y después seguimos en el otro",
    "Xoana: Venga lo veo ahora",
    "Lolina: Eso son hoteles?",
    "Boque: Ok",
    "Boque: En cuanto pueda los miro 😀",
    "Lolina: Más versatilidad nos da un apartamento no?",
    "Lolina: Lo digo por si vienen laura y alguien más",
    "Boque: Lo suyo sería reservar un par de sitios: uno mínimo para los que estamos confirmados ya",
    "Boque: Y otro para los posibles que vengan",
    "Boque: Y el segundo se cancela en caso de que no vengan",
    "Xoana: Son apartamentos",
    "Xoana: Sí",
    "Xoana: Yo busqué para 7 contando con Luis y Laura que hará todo lo posible por venir",
    "Alberto: Luego los veo! Gracias!",
    "Xoana: @34671447567 si nos descartas alguno tú qué veas por el tema de la zona/calle en la que esté guay. Y ¿los que habías enviado tú no nos quedaban bien? ¿Los descartamos?",
    "Boque: Esperad, que estoy dando clase 😅 ‎<Se editó este mensaje.>",
    "Boque: Esta tarde le echo un vistazo a todos",
    "Alberto: Jajajjas",
    "Alberto: Te van a confiscar el móvil tus alumnos",
    "Xoana: 😂",
    "Xoana: ¿De qué les estás hablando hoy?",
    "Boque: Pues ahora mismo en 4º estamos viendo la proclamación de la IIª República",
    "Boque: Les he puesto un video y por eso puedo escribir desde el fondo de la clase",
    "Boque: Pero no puedo ponerme a ver en detalle los apartamentos que habéis mandado 😂😂😂",
    "Boque: Con los de 1º acabo de terminar Egipto y Mesopotamia",
    "Xoana: Qué maravilla.",
    "Xoana: Puedes con eso y mucho más.",
    "Alberto: Jajajaja",
    "Alberto: Y yo escribiendo pliegos. Qué palabra más horrorosa",
    "Xoana: Que es lo que hay que decirle a los niños hoy en día.",
    "Alberto: Qué guay tu curro Boque!",
    "Xoana: Yo de camino a la playa 😂 que es festivo",
    "Alberto: 💔",
    "Luigi: Muy guapo",
    "Luigi: Yo estoy pintando zocalos y ventanas",
    "Luigi: En un hôtel particulier de 150M de €",
    "Luigi: En Paris",
    "Boque: Ok a ver, estoy ahora viendo un video sobre Cambio Climático con los chavales y estoy viendo todo lo que habéis enviado",
    "Boque: Mirad, de lo que yo envié y, por ejemplo, el de 7 que ha enviado Xo, están bien, pero no están en el propio centro",
    "Boque: Están algo más alejados y es verdad que quizá, si no vamos a usar la piscina (en el caso de los que yo puse) o si tenemos luego que coger taxis para llegar a dormir, quizá lo suyo sea ir a huevo al centro (evitando calles de borrachos y andando lo justo posible para no estar en el meollo y poder dormir algo)",
    "Boque: Así que, en mi opinión lo mejor va a ser coger varios apartamentos en un mismo edificio o misma calle",
    "Boque: Este es el caso de los apartamentos de SunCity"
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

function startInfiniteChat() {
    if (gameState.gameInterval) {
        clearInterval(gameState.gameInterval); // Clear any existing interval to avoid duplicates
    }

    gameState.gameInterval = setInterval(() => {
        const randomMessage = chatMessages[Math.floor(Math.random() * chatMessages.length)];
        const messageElement = document.createElement('p');
        messageElement.textContent = randomMessage;
        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight;

        // Ensure only four messages are displayed at a time
        const chatMessagesDisplayed = chatContent.querySelectorAll('p');
        if (chatMessagesDisplayed.length > 3) {
            chatContent.removeChild(chatMessagesDisplayed[0]);
        }
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
        gameContainer.innerHTML = `<h1>${friend}:</h1><p>${drink}</p>`;
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
    gameContainer.innerHTML += '<div id="selected-drinks"><h2>Bebidas seleccionadas:</h2><ul id="drink-list"></ul></div>';
    gameContainer.innerHTML += '<button id="submit-drinks">Servir bebidas</button>';

    let maxDrinks = assignedDrinks.length;

    document.querySelectorAll('.serve-button').forEach(button => {
        button.addEventListener('click', (e) => {
            if (servedDrinks.length < maxDrinks) {
                const selectedDrink = e.target.getAttribute('data-drink');
                servedDrinks.push(selectedDrink);

                // Update the selected drinks list
                const drinkList = document.getElementById('drink-list');
                const existingItem = Array.from(drinkList.children).find(item => item.dataset.drink === selectedDrink);

                if (existingItem) {
                    const count = parseInt(existingItem.dataset.count, 10) + 1;
                    existingItem.dataset.count = count;
                    existingItem.textContent = `${selectedDrink} x${count}`;
                } else {
                    const listItem = document.createElement('li');
                    listItem.dataset.drink = selectedDrink;
                    listItem.dataset.count = 1;
                    listItem.textContent = `${selectedDrink} x1`;
                    drinkList.appendChild(listItem);
                }
            } else {
                alert('No puedes preparar más bebidas de las pedidas.');
            }
        });
    });

    document.getElementById('submit-drinks').addEventListener('click', checkResults);
}

function resetGame() {
    // Reset game state variables
    gameState.selectedCharacter = null;
    gameState.score = 0;
    gameState.playerPosition = 50;
    if (gameState.gameInterval) {
        clearInterval(gameState.gameInterval); // Stop any ongoing intervals
        gameState.gameInterval = null;
    }
    servedDrinks = [];
    assignedDrinks = [];
    currentFriendIndex = 0;

    // Reset UI elements
    gameContainer.innerHTML = '';
    chatContent.innerHTML = '';
    startButton.style.display = 'none';
    chatBox.style.display = 'block';

    // Reassign drinks and start the game from showFriendDrink
    assignRandomDrinks();
    showFriendDrink();
    startInfiniteChat();
}

function checkResults() {
    let score = 0;

    // Create a copy of assignedDrinks to track matches
    const assignedDrinksCopy = [...assignedDrinks];

    servedDrinks.forEach(servedDrink => {
        const matchIndex = assignedDrinksCopy.findIndex(assignment => assignment.drink === servedDrink);
        if (matchIndex !== -1) {
            score++;
            assignedDrinksCopy.splice(matchIndex, 1); // Remove matched drink to avoid duplicate scoring
        }
    });

    gameContainer.innerHTML = `<h1>Resultados</h1><p>Has acertado ${score} de ${friends.length} bebidas.</p>`;
    gameContainer.innerHTML += '<button id="play-again-button">Volver a la mesa</button>';

    document.getElementById('play-again-button').addEventListener('click', resetGame);
}

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    chatBox.style.display = 'block';
    assignRandomDrinks();
    showFriendDrink();
    startInfiniteChat();
});

// Initialize everything on window load
window.onload = () => {};