
       
        const startPage = document.getElementById("start-page");
        const gamePage = document.getElementById("game-page");
        const playButton = document.getElementById("play-button");
        const scoreDisplay = document.getElementById("score");
        const timerDisplay = document.getElementById("timer");
        const equationDisplay = document.getElementById("equation");
        const answerInput = document.getElementById("answer-input");
        const submitButton = document.getElementById("submit-button");
        const restartButton = document.getElementById("restart-button");
        const student = document.getElementById("student");
        const ghostCursor = document.querySelector(".ghost-cursor");
        
        let score = 0;
        let currentAnswer = 0;
        let timeLeft = 60;
        let timer;
        
        document.addEventListener("mousemove", (e) => {
            ghostCursor.style.left = e.clientX + "px";
            ghostCursor.style.top = e.clientY + "px";
        });
        
        function startTimer() {
            timeLeft = 60;
            timerDisplay.textContent = `TIME: ${timeLeft}`;
            clearInterval(timer);
            timer = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = `TIME: ${timeLeft}`;
                
                if (timeLeft <= 10) {
                    timerDisplay.style.color = "#ff0000";
                    timerDisplay.style.animation = "glow 0.5s infinite alternate";
                }
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    gameOver();
                }
            }, 1000);
        }
        
        function gameOver() {
            alert(`Game Over! Your final score is: ${score}`);
            resetGame();
        }
        
        function resetGame() {
            score = 0;
            scoreDisplay.textContent = `SCORE: ${score}`;
            timerDisplay.textContent = `TIME: 60`;
            timerDisplay.style.color = "#ff5555";
            timerDisplay.style.animation = "none";
            startPage.style.display = "flex";
            gamePage.style.display = "none";
            clearInterval(timer);
        }
        
        function generateEquation() {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const operators = ['+', '-', '*'];
            const operator = operators[Math.floor(Math.random() * operators.length)];
            
            currentAnswer = eval(`${num1} ${operator} ${num2}`);
            equationDisplay.textContent = `${num1} ${operator} ${num2} = ?`;
            answerInput.value = "";
            answerInput.focus();
        }
      
        function checkAnswer() {
            const userAnswer = parseFloat(answerInput.value);
            
            if (userAnswer === currentAnswer) {
               
                score += 10;
                scoreDisplay.textContent = `SCORE: ${score}`;
                student.textContent = "😄";
                setTimeout(() => {
                    student.textContent = "👨";
                    generateEquation();
                }, 1000);
            } else {
               
                student.textContent = "😱";
                answerInput.value = "";
                setTimeout(() => student.textContent = "👨", 1000);
            }
        }

        function createPortalEffect() {
            const btnRect = playButton.getBoundingClientRect();
            const centerX = btnRect.left + btnRect.width / 2;
            const centerY = btnRect.top + btnRect.height / 2;
            
            const portalGhost = document.createElement("div");
            portalGhost.className = "portal-ghost";
            portalGhost.innerHTML = "👻";
            portalGhost.style.left = `${centerX}px`;
            portalGhost.style.top = `${centerY}px`;
            document.body.appendChild(portalGhost);
            
            setTimeout(() => {
                portalGhost.remove();
                startPage.style.display = "none";
                gamePage.style.display = "flex";
             
                for (let i = 0; i < 3; i++) {
                    const bat = document.createElement("div");
                    bat.className = "bat";
                    bat.innerHTML = "🦇";
                    bat.style.left = `${Math.random() * 100}%`;
                    bat.style.top = `${Math.random() * 100}%`;
                    bat.style.animationDuration = `${15 + Math.random() * 10}s`;
                    document.body.appendChild(bat);
                    
                    const ghost = document.createElement("div");
                    ghost.className = "floating-ghost";
                    ghost.innerHTML = "👻";
                    ghost.style.left = `${Math.random() * 100}%`;
                    ghost.style.top = `${Math.random() * 100}%`;
                    ghost.style.animationDuration = `${18 + Math.random() * 12}s`;
                    document.body.appendChild(ghost);
                }
                
                startTimer();
                generateEquation();
            }, 1000);
        }
        
        playButton.addEventListener("click", createPortalEffect);
        
        submitButton.addEventListener("click", checkAnswer);
        answerInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") checkAnswer();
        });
        restartButton.addEventListener("click", () => {
            resetGame();
        });
    