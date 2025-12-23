// --- CONFIGURATION ---
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- STATE MANAGEMENT ---
let currentState = {
    selectedLivestock: null,
    currentView: 'welcome',
    currency: 'USD',
    isDarkMode: true,
    user: null
};

// --- CORE FUNCTIONS ---

function selectLivestock(type) {
    currentState.selectedLivestock = type;
    document.getElementById('screen-welcome').classList.add('hidden');
    document.getElementById('app-shell').classList.remove('hidden');
    switchView('dashboard');
}

function switchView(viewName) {
    currentState.currentView = viewName;
    const container = document.getElementById('view-container');
    
    // Update Navigation UI
    document.querySelectorAll('.nav-item').forEach(el => el.classList.replace('text-[#1ED760]', 'text-gray-500'));
    // (Logic to highlight active nav button here)

    switch(viewName) {
        case 'dashboard': renderDashboard(container); break;
        case 'history': renderHistory(container); break;
        case 'health': renderHealth(container); break;
        case 'settings': renderSettings(container); break;
        case 'finance': renderFinance(container); break;
    }
    lucide.createIcons();
}

// --- VIEW RENDERING ---

function renderDashboard(container) {
    const animal = currentState.selectedLivestock.charAt(0).toUpperCase() + currentState.selectedLivestock.slice(1);
    container.innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <div>
                <h2 class="text-2xl font-bold">Good Morning, John</h2>
                <p class="text-zinc-500 text-sm">Here's what's happening today.</p>
            </div>
            <div class="bg-zinc-900 p-2 rounded-xl text-center">
                <p class="text-[10px] text-orange-400 font-bold uppercase">Sunny</p>
                <p class="text-lg font-bold">24°C</p>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-zinc-900/50 border border-white/5 p-4 rounded-3xl">
                <div class="flex justify-between items-start mb-2">
                    <div class="bg-blue-500/20 p-2 rounded-lg text-blue-500"><i data-lucide="paw-print" class="w-4 h-4"></i></div>
                    <span class="text-xs text-green-500">+2 ↗</span>
                </div>
                <p class="text-xs text-zinc-500 font-medium">TOTAL HERD</p>
                <p class="text-2xl font-bold">145</p>
            </div>
            <div class="bg-zinc-900/50 border border-white/5 p-4 rounded-3xl">
                <div class="flex justify-between items-start mb-2">
                    <div class="bg-green-500/20 p-2 rounded-lg text-green-500"><i data-lucide="droplet" class="w-4 h-4"></i></div>
                    <span class="text-xs text-green-500">+5% ↗</span>
                </div>
                <p class="text-xs text-zinc-500 font-medium">DAILY YIELD</p>
                <p class="text-2xl font-bold">2,400L</p>
            </div>
        </div>

        <div class="bg-zinc-900/50 border border-white/5 p-5 rounded-3xl mb-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold flex items-center gap-2"><i data-lucide="heart" class="w-4 h-4 text-red-500"></i> Herd Health Status</h3>
                <span class="text-[10px] text-zinc-500">Updated 10m ago</span>
            </div>
            <div class="w-full h-2 bg-zinc-800 rounded-full flex overflow-hidden mb-4">
                <div class="bg-green-500 w-[90%]"></div>
                <div class="bg-orange-500 w-[7%]"></div>
                <div class="bg-red-500 w-[3%]"></div>
            </div>
            <div class="flex justify-between text-center">
                <div><p class="text-xs text-zinc-500">Healthy</p><p class="font-bold">142</p></div>
                <div class="border-x border-white/5 px-6"><p class="text-xs text-zinc-500">Monitoring</p><p class="font-bold">2</p></div>
                <div><p class="text-xs text-zinc-500">Sick</p><p class="font-bold">1</p></div>
            </div>
        </div>

        <h3 class="font-bold mb-4">Smart Insights</h3>
        <div class="space-y-3">
            <div class="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl flex gap-4 items-center">
                <div class="bg-orange-500/20 p-3 rounded-xl text-orange-500"><i data-lucide="trending-up"></i></div>
                <div class="flex-1">
                    <p class="text-sm font-bold">Feed Efficiency Alert</p>
                    <p class="text-xs text-zinc-500">Consumption is 10% higher than average.</p>
                </div>
                <i data-lucide="chevron-right" class="text-zinc-600"></i>
            </div>
        </div>
    `;
}

// --- MODAL & FORM LOGIC ---

function toggleRecordModal() {
    const modal = document.getElementById('record-modal');
    const content = document.getElementById('modal-content');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        setTimeout(() => content.classList.remove('translate-y-full'), 10);
    } else {
        content.classList.add('translate-y-full');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

function openForm(type) {
    toggleRecordModal();
    // Logic to open a fullscreen form for data entry
    alert(`Opening ${type} form for ${currentState.selectedLivestock}`);
}

// --- EXPORT TOOLS ---

function exportToCSV(data, filename) {
    let csvContent = "data:text/csv;charset=utf-8," 
        + data.map(e => Object.values(e).join(",")).join("\n");
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
}

// Listen for Auth changes
auth.onAuthStateChanged(user => {
    currentState.user = user;
    if(user) console.log("User Logged In");
});
