import { loginUser, checkAuthStatus } from './auth.js';
import { addRecord, getRecords } from './db.js';

// State
let currentUser = null;
let currentFarmType = 'dairy'; // Default or set by selection

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupLivestockSelection();
    
    checkAuthStatus((user) => {
        currentUser = user;
        if (user) {
            loadDashboard(); // Load data from cloud
        }
    });
});

// Navigation Logic (Smooth Transitions)
function setupNavigation() {
    const views = ['dashboard', 'history', 'finance', 'health', 'reports', 'settings'];
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.dataset.target; // e.g., 'finance'
            
            // Hide all views
            views.forEach(view => document.getElementById(view + '-view').style.display = 'none');
            
            // Show target view
            document.getElementById(target + '-view').style.display = 'block';
            
            // Load specific data for that view
            if(target === 'finance') loadFinanceData();
            if(target === 'history') loadHistoryData();
        });
    });
}

function setupLivestockSelection() {
    // Attach to your "Dairy", "Poultry" cards on landing page
    document.querySelectorAll('.livestock-card').forEach(card => {
        card.addEventListener('click', (e) => {
            currentFarmType = e.currentTarget.dataset.type; // 'dairy', 'poultry', etc.
            
            // Transition: Hide Landing, Show App Layout
            document.getElementById('landing-page').style.display = 'none';
            document.getElementById('main-app-layout').style.display = 'block';
            
            loadDashboard();
        });
    });
}

// Data Loading (Example for Finance)
async function loadFinanceData() {
    if (!currentUser) return; // Handle offline/local mode here if needed
    
    const transactions = await getRecords(currentUser.uid, currentFarmType, 'finance');
    const container = document.getElementById('finance-list');
    container.innerHTML = ''; // Clear current
    
    transactions.forEach(t => {
        const html = `
            <div class="transaction-card">
                <div class="icon">${t.type === 'income' ? '↓' : '↑'}</div>
                <div class="details">
                    <h4>${t.description}</h4>
                    <p>${t.date}</p>
                </div>
                <div class="amount ${t.type === 'income' ? 'green' : 'red'}">
                    $${t.amount}
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// Expose functions to window for onclick events in HTML if needed
window.handleLogin = loginUser;
