// Global variables
let currentUser = {};
let currentQuestionIndex = 0;
let answers = [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let isAdminLoggedIn = false;

// Prakriti questions
const questions = [
    {
        question: "What is your body frame?",
        options: [
            { text: "Thin, light frame", type: "vata", score: 3 },
            { text: "Medium, muscular frame", type: "pitta", score: 3 },
            { text: "Large, heavy frame", type: "kapha", score: 3 }
        ]
    },
    {
        question: "How is your skin?",
        options: [
            { text: "Dry, rough, cool", type: "vata", score: 3 },
            { text: "Warm, oily, prone to rashes", type: "pitta", score: 3 },
            { text: "Thick, moist, cool", type: "kapha", score: 3 }
        ]
    },
    {
        question: "What is your hair like?",
        options: [
            { text: "Dry, brittle, curly", type: "vata", score: 3 },
            { text: "Fine, oily, early graying", type: "pitta", score: 3 },
            { text: "Thick, lustrous, wavy", type: "kapha", score: 3 }
        ]
    },
    {
        question: "How is your appetite?",
        options: [
            { text: "Variable, irregular", type: "vata", score: 3 },
            { text: "Strong, regular", type: "pitta", score: 3 },
            { text: "Slow, steady", type: "kapha", score: 3 }
        ]
    },
    {
        question: "How do you handle stress?",
        options: [
            { text: "Worry, anxiety", type: "vata", score: 3 },
            { text: "Anger, irritability", type: "pitta", score: 3 },
            { text: "Calm, withdrawn", type: "kapha", score: 3 }
        ]
    },
    {
        question: "What is your sleep pattern?",
        options: [
            { text: "Light, interrupted", type: "vata", score: 3 },
            { text: "Moderate, sound", type: "pitta", score: 3 },
            { text: "Deep, long", type: "kapha", score: 3 }
        ]
    },
    {
        question: "How is your energy level?",
        options: [
            { text: "Comes in bursts", type: "vata", score: 3 },
            { text: "Moderate, focused", type: "pitta", score: 3 },
            { text: "Steady, enduring", type: "kapha", score: 3 }
        ]
    },
    {
        question: "How do you learn?",
        options: [
            { text: "Quick to learn, quick to forget", type: "vata", score: 3 },
            { text: "Sharp, focused learning", type: "pitta", score: 3 },
            { text: "Slow to learn, good retention", type: "kapha", score: 3 }
        ]
    },
    {
        question: "What is your speaking style?",
        options: [
            { text: "Fast, talkative", type: "vata", score: 3 },
            { text: "Sharp, precise", type: "pitta", score: 3 },
            { text: "Slow, melodious", type: "kapha", score: 3 }
        ]
    },
    {
        question: "How do you handle cold weather?",
        options: [
            { text: "Dislike cold, prefer warmth", type: "vata", score: 3 },
            { text: "Moderate tolerance", type: "pitta", score: 3 },
            { text: "Tolerate cold well", type: "kapha", score: 3 }
        ]
    },
    {
        question: "What is your emotional nature?",
        options: [
            { text: "Enthusiastic, changeable", type: "vata", score: 3 },
            { text: "Intense, passionate", type: "pitta", score: 3 },
            { text: "Calm, steady", type: "kapha", score: 3 }
        ]
    },
    {
        question: "How is your digestion?",
        options: [
            { text: "Irregular, gas, bloating", type: "vata", score: 3 },
            { text: "Strong, sometimes burning", type: "pitta", score: 3 },
            { text: "Slow, heavy feeling", type: "kapha", score: 3 }
        ]
    },
    {
        question: "What is your preferred exercise?",
        options: [
            { text: "Light, varied activities", type: "vata", score: 3 },
            { text: "Moderate, competitive", type: "pitta", score: 3 },
            { text: "Slow, steady activities", type: "kapha", score: 3 }
        ]
    },
    {
        question: "How do you make decisions?",
        options: [
            { text: "Quick, often change mind", type: "vata", score: 3 },
            { text: "Decisive, determined", type: "pitta", score: 3 },
            { text: "Slow, deliberate", type: "kapha", score: 3 }
        ]
    },
    {
        question: "What is your memory like?",
        options: [
            { text: "Good short-term, poor long-term", type: "vata", score: 3 },
            { text: "Sharp, clear", type: "pitta", score: 3 },
            { text: "Slow to recall, but good retention", type: "kapha", score: 3 }
        ]
    }
];

// Diet recommendations
const dietRecommendations = {
    vata: {
        recommended: ["Warm foods", "Sweet fruits", "Cooked vegetables", "Ghee", "Nuts", "Warm milk", "Rice", "Wheat"],
        avoid: ["Cold foods", "Raw vegetables", "Dry foods", "Beans", "Cabbage", "Caffeine", "Alcohol"],
        meals: {
            breakfast: "Warm oatmeal with nuts and honey",
            lunch: "Rice with cooked vegetables and ghee",
            dinner: "Warm soup with bread",
            snacks: "Dates, figs, warm milk"
        }
    },
    pitta: {
        recommended: ["Cool foods", "Sweet fruits", "Leafy greens", "Coconut", "Cucumber", "Milk", "Rice", "Barley"],
        avoid: ["Spicy foods", "Sour foods", "Tomatoes", "Citrus", "Alcohol", "Coffee", "Red meat"],
        meals: {
            breakfast: "Cool cereal with milk and sweet fruits",
            lunch: "Rice with cooling vegetables",
            dinner: "Light soup with bread",
            snacks: "Sweet fruits, coconut water"
        }
    },
    kapha: {
        recommended: ["Light foods", "Spicy foods", "Bitter vegetables", "Honey", "Ginger", "Legumes", "Barley"],
        avoid: ["Heavy foods", "Sweet foods", "Dairy", "Oily foods", "Cold foods", "Excessive salt"],
        meals: {
            breakfast: "Light cereal with honey",
            lunch: "Spiced vegetables with barley",
            dinner: "Light soup with spices",
            snacks: "Herbal tea, light fruits"
        }
    }
};

// Daily routines
const dailyRoutines = {
    vata: {
        morning: ["Wake up at 6 AM", "Oil massage", "Warm shower", "Meditation (10 min)", "Light exercise"],
        afternoon: ["Regular meals", "Short walk", "Avoid overexertion", "Stay warm"],
        evening: ["Early dinner", "Gentle yoga", "Warm bath", "Sleep by 10 PM"]
    },
    pitta: {
        morning: ["Wake up at 5:30 AM", "Cool shower", "Meditation (15 min)", "Moderate exercise"],
        afternoon: ["Regular meals", "Avoid midday sun", "Stay cool", "Mental activities"],
        evening: ["Light dinner", "Cooling activities", "Avoid late nights", "Sleep by 10:30 PM"]
    },
    kapha: {
        morning: ["Wake up at 5 AM", "Vigorous exercise", "Warm shower", "Energizing activities"],
        afternoon: ["Light lunch", "Active work", "Avoid naps", "Stay active"],
        evening: ["Early light dinner", "Active hobbies", "Stimulating activities", "Sleep by 10 PM"]
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadStoredData();
    initializeAnimations();
});

function initializeAnimations() {
    // Add stagger animation to elements
    const animateElements = document.querySelectorAll('.form-group, .option, .diet-card, .schedule-card');
    animateElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('animate-in');
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-orbs');
        parallaxElements.forEach(el => {
            el.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.5}px)`;
        });
    });
    
    // Mouse movement effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            orb.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
}

function initializeApp() {
    // Show home section by default
    showSection('home');
    
    // Initialize questionnaire
    document.getElementById('total-questions').textContent = questions.length;
    
    // Setup follow-up reminders
    setupFollowUpReminders();
}

function setupEventListeners() {
    // Navigation
    document.querySelector('.hamburger').addEventListener('click', toggleMobileMenu);
    
    // Profile form
    document.getElementById('profile-form').addEventListener('submit', saveProfile);
    
    // Admin login
    document.getElementById('admin-login-form').addEventListener('submit', adminLogin);
    
    // Follow-up form
    document.getElementById('followup-form').addEventListener('submit', submitFollowUp);
    
    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    
    // Range inputs
    document.getElementById('energy-level').addEventListener('input', updateRangeValue);
    document.getElementById('sleep-quality').addEventListener('input', updateRangeValue);
    
    // Navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            showSection(section);
        });
    });
}

function toggleMobileMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
}

function showSection(sectionId) {
    // Hide all sections with fade out
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
        section.style.opacity = '0';
        section.style.transform = 'perspective(1000px) translateY(50px) rotateX(20deg)';
    });
    
    // Show target section with delay for smooth transition
    setTimeout(() => {
        const targetSection = document.getElementById(sectionId);
        targetSection.classList.add('active');
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'perspective(1000px) translateY(0) rotateX(0deg)';
    }, 200);
    
    // Close mobile menu
    document.querySelector('.nav-menu').classList.remove('active');
    
    // Add entrance animations
    setTimeout(() => {
        const elements = document.querySelectorAll(`#${sectionId} .form-group, #${sectionId} .option, #${sectionId} .diet-card, #${sectionId} .schedule-card`);
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) rotateX(0deg)';
            }, index * 100);
        });
    }, 300);
    
    // Special handling for certain sections
    if (sectionId === 'analysis') {
        setTimeout(() => startQuestionnaire(), 400);
    } else if (sectionId === 'diet' && currentUser.prakriti) {
        setTimeout(() => displayDietRecommendations(), 400);
    } else if (sectionId === 'schedule' && currentUser.prakriti) {
        setTimeout(() => displayDailySchedule(), 400);
    }
}

function saveProfile(e) {
    e.preventDefault();
    
    currentUser = {
        id: Date.now(),
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        healthConditions: document.getElementById('health-conditions').value,
        lifestyle: document.getElementById('lifestyle').value,
        createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    users.push(currentUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Profile saved successfully!');
    showSection('analysis');
}

function startQuestionnaire() {
    currentQuestionIndex = 0;
    answers = [];
    document.getElementById('questionnaire').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    displayQuestion();
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option.text;
        optionDiv.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    document.getElementById('prev-btn').style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    document.getElementById('next-btn').textContent = currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next';
}

function selectOption(optionIndex) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    
    // Add selection to clicked option
    document.querySelectorAll('.option')[optionIndex].classList.add('selected');
    
    // Store answer
    answers[currentQuestionIndex] = questions[currentQuestionIndex].options[optionIndex];
}

function nextQuestion() {
    if (!answers[currentQuestionIndex]) {
        alert('Please select an option before proceeding.');
        return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        calculatePrakriti();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        
        // Restore previous selection
        if (answers[currentQuestionIndex]) {
            const selectedIndex = questions[currentQuestionIndex].options.findIndex(
                opt => opt.text === answers[currentQuestionIndex].text
            );
            if (selectedIndex !== -1) {
                document.querySelectorAll('.option')[selectedIndex].classList.add('selected');
            }
        }
    }
}

function calculatePrakriti() {
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    answers.forEach(answer => {
        scores[answer.type] += answer.score;
    });
    
    // Determine dominant dosha
    const dominantDosha = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    // Update current user
    currentUser.prakriti = dominantDosha;
    currentUser.scores = scores;
    
    // Update stored data
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    displayResults(dominantDosha, scores);
}

function displayResults(prakriti, scores) {
    document.getElementById('questionnaire').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    const resultDiv = document.getElementById('prakriti-result');
    resultDiv.innerHTML = `
        <div class="prakriti-type ${prakriti}">
            <h3>Your Primary Prakriti: ${prakriti.toUpperCase()}</h3>
            <p>${getPrakritiDescription(prakriti)}</p>
        </div>
        <div class="scores">
            <h4>Your Scores:</h4>
            <p>Vata: ${scores.vata} | Pitta: ${scores.pitta} | Kapha: ${scores.kapha}</p>
        </div>
    `;
}

function getPrakritiDescription(prakriti) {
    const descriptions = {
        vata: "You have a Vata constitution. You are creative, energetic, and adaptable, but may experience anxiety and irregular patterns.",
        pitta: "You have a Pitta constitution. You are intelligent, focused, and determined, but may experience anger and inflammation.",
        kapha: "You have a Kapha constitution. You are calm, stable, and nurturing, but may experience sluggishness and weight gain."
    };
    return descriptions[prakriti];
}

function displayDietRecommendations() {
    if (!currentUser.prakriti) return;
    
    const diet = dietRecommendations[currentUser.prakriti];
    
    document.getElementById('recommended-foods').innerHTML = `
        <div class="food-list">
            ${diet.recommended.map(food => `<div class="food-item">${food}</div>`).join('')}
        </div>
    `;
    
    document.getElementById('avoid-foods').innerHTML = `
        <div class="food-list">
            ${diet.avoid.map(food => `<div class="food-item">${food}</div>`).join('')}
        </div>
    `;
    
    document.getElementById('meal-plan').innerHTML = `
        <div class="meal-plan">
            <div class="meal"><strong>Breakfast:</strong> ${diet.meals.breakfast}</div>
            <div class="meal"><strong>Lunch:</strong> ${diet.meals.lunch}</div>
            <div class="meal"><strong>Dinner:</strong> ${diet.meals.dinner}</div>
            <div class="meal"><strong>Snacks:</strong> ${diet.meals.snacks}</div>
        </div>
    `;
}

function displayDailySchedule() {
    if (!currentUser.prakriti) return;
    
    const routine = dailyRoutines[currentUser.prakriti];
    
    document.getElementById('morning-routine').innerHTML = `
        <div class="routine-list">
            ${routine.morning.map(item => `<div class="routine-item">${item}</div>`).join('')}
        </div>
    `;
    
    document.getElementById('afternoon-routine').innerHTML = `
        <div class="routine-list">
            ${routine.afternoon.map(item => `<div class="routine-item">${item}</div>`).join('')}
        </div>
    `;
    
    document.getElementById('evening-routine').innerHTML = `
        <div class="routine-list">
            ${routine.evening.map(item => `<div class="routine-item">${item}</div>`).join('')}
        </div>
    `;
}

function adminLogin(e) {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    
    if (password === 'admin123') {
        isAdminLoggedIn = true;
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        document.getElementById('admin-link').style.display = 'inline';
        loadAdminData();
    } else {
        alert('Invalid password');
    }
}

function loadAdminData() {
    document.getElementById('total-users').textContent = users.length;
    document.getElementById('completed-tests').textContent = users.filter(u => u.prakriti).length;
    
    const usersTable = document.getElementById('users-table');
    usersTable.innerHTML = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background: #f8f9fa;">
                    <th style="padding: 10px; border: 1px solid #dee2e6;">Name</th>
                    <th style="padding: 10px; border: 1px solid #dee2e6;">Age</th>
                    <th style="padding: 10px; border: 1px solid #dee2e6;">Prakriti</th>
                    <th style="padding: 10px; border: 1px solid #dee2e6;">Date</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td style="padding: 10px; border: 1px solid #dee2e6;">${user.name}</td>
                        <td style="padding: 10px; border: 1px solid #dee2e6;">${user.age}</td>
                        <td style="padding: 10px; border: 1px solid #dee2e6;">${user.prakriti || 'Not tested'}</td>
                        <td style="padding: 10px; border: 1px solid #dee2e6;">${new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function setupFollowUpReminders() {
    // Show follow-up modal after 7 days (simulated with 10 seconds for demo)
    setTimeout(() => {
        if (currentUser.prakriti) {
            document.getElementById('followup-modal').style.display = 'block';
        }
    }, 10000);
}

function submitFollowUp(e) {
    e.preventDefault();
    
    const followUpData = {
        userId: currentUser.id,
        energyLevel: document.getElementById('energy-level').value,
        sleepQuality: document.getElementById('sleep-quality').value,
        comments: document.getElementById('followup-comments').value,
        date: new Date().toISOString()
    };
    
    // Store follow-up data
    let followUps = JSON.parse(localStorage.getItem('followUps')) || [];
    followUps.push(followUpData);
    localStorage.setItem('followUps', JSON.stringify(followUps));
    
    alert('Thank you for your feedback!');
    closeModal();
}

function closeModal() {
    document.getElementById('followup-modal').style.display = 'none';
}

function updateRangeValue(e) {
    const valueSpan = document.getElementById(e.target.id.replace('-', '-') + '-value');
    if (valueSpan) {
        valueSpan.textContent = e.target.value;
    }
}

function loadStoredData() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        
        // Pre-fill profile form if user exists
        if (currentUser.name) {
            document.getElementById('name').value = currentUser.name || '';
            document.getElementById('age').value = currentUser.age || '';
            document.getElementById('gender').value = currentUser.gender || '';
            document.getElementById('height').value = currentUser.height || '';
            document.getElementById('weight').value = currentUser.weight || '';
            document.getElementById('health-conditions').value = currentUser.healthConditions || '';
            document.getElementById('lifestyle').value = currentUser.lifestyle || '';
        }
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('followup-modal');
    if (event.target === modal) {
        closeModal();
    }
}