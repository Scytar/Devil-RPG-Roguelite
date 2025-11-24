// Local items database (from items-db.json)
const ITEMS_DB = [
    {
        "id": 1,
        "name": "Iron Sword",
        "type": "weapon",
        "class": "Warrior",
        "rarity": "common",
        "str": 2,
        "agi": 0,
        "vit": 0,
        "int": 0,
        "luk": 0,
        "description": "A basic iron sword for beginners."
    },
    {
        "id": 2,
        "name": "Leather Armor",
        "type": "armor",
        "class": "Guardian",
        "rarity": "common",
        "str": 0,
        "agi": 1,
        "vit": 2,
        "int": 0,
        "luk": 0,
        "description": "Simple armor offering minimal protection."
    },
    {
        "id": 3,
        "name": "Swift Boots",
        "type": "boots",
        "class": "Thief",
        "rarity": "uncommon",
        "str": 0,
        "agi": 3,
        "vit": 0,
        "int": 0,
        "luk": 1,
        "description": "Boots that increase agility and luck."
    },
    {
        "id": 4,
        "name": "Mystic Gloves",
        "type": "gloves",
        "class": "Mage",
        "rarity": "rare",
        "str": 0,
        "agi": 0,
        "vit": 0,
        "int": 4,
        "luk": 0,
        "description": "Gloves infused with magical energy."
    },
    {
        "id": 5,
        "name": "Priest's Amulet",
        "type": "accessory",
        "class": "Priest",
        "rarity": "epic",
        "str": 0,
        "agi": 0,
        "vit": 2,
        "int": 3,
        "luk": 2,
        "description": "An amulet that boosts vitality, intelligence, and luck."
    },
    {
        "id": 6,
        "name": "Ranger's Bow",
        "type": "weapon",
        "class": "Ranger",
        "rarity": "rare",
        "str": 1,
        "agi": 4,
        "vit": 0,
        "int": 0,
        "luk": 1,
        "description": "A bow favored by skilled rangers."
    }
];
// Emoji map for item types
const ITEM_TYPE_EMOJI = {
    weapon: '⚔️',
    armor: '🛡️',
    boots: '🥾',
    gloves: '🧤',
    accessory: '📿'
};

// Rarity color map
const RARITY_COLOR = {
    common: '255,255,255',      // white
    uncommon: '0,255,255',     // cyan
    rare: '0,128,0',           // green
    epic: '128,0,128',         // purple
    legendary: '255,140,0'     // orange
};

// Parse items-db.json and create item cards
async function loadAndDisplayItems(containerSelector = '#itemsContainer') {
    // try {
    //     const response = await fetch('src/public/items-db.json');
    //     const items = await response.json();
    //     const container = document.querySelector(containerSelector);
    //     if (!container) return;
    //     container.innerHTML = '';
    //     items.forEach(item => {
    //         container.appendChild(createItemCard(item));
    //     });
    // } catch (err) {
    //     console.error('Failed to load items-db.json:', err);
    // }
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = '';
    ITEMS_DB.forEach(item => {
        container.appendChild(createItemCard(item));
    });
}

// Create a card element for an item
function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    card.style.justifyContent = 'center';
    card.style.gap = '8px';
    card.style.width = '200px';
    card.style.height = '120px';
    card.style.border = '1px solid #ccc';
    card.style.borderRadius = '16px';
    card.style.marginBottom = '10px';
    const rgb = RARITY_COLOR[item.rarity] || '128,128,128';
    card.style.background = `rgba(${rgb}, 0.5)`;
    card.style.boxSizing = 'border-box';

    // Rarity circle
    const rarityCircle = document.createElement('span');
    rarityCircle.style.display = 'inline-block';
    rarityCircle.style.width = '22px';
    rarityCircle.style.height = '22px';
    rarityCircle.style.borderRadius = '50%';
    rarityCircle.style.background = RARITY_COLOR[item.rarity] || 'gray';
    rarityCircle.style.border = '2px solid #888';
    rarityCircle.title = item.rarity;

    // Emoji
    const emoji = document.createElement('span');
    emoji.textContent = ITEM_TYPE_EMOJI[item.type] || '❓';
    emoji.style.fontSize = '1.5em';

    // Name
    const name = document.createElement('span');
    name.textContent = item.name;
    name.style.fontWeight = 'bold';
    name.style.fontSize = '1.1em';

    // Class
    const className = document.createElement('span');
    className.textContent = item.class;
    className.style.fontStyle = 'italic';
    className.style.color = '#555';

    card.appendChild(rarityCircle);
    card.appendChild(emoji);
    card.appendChild(name);
    card.appendChild(className);
    // Tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'item-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.zIndex = '1000';
    tooltip.style.background = 'rgba(30,30,30,0.95)';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '10px 14px';
    tooltip.style.borderRadius = '10px';
    tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    tooltip.style.fontSize = '0.95em';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.display = 'none';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.2s';
    tooltip.style.maxWidth = '260px';
    // Build non-zero attributes string
    const attrs = [];
    if (item.str) attrs.push(`<em>STR:</em> ${item.str}`);
    if (item.agi) attrs.push(`<em>AGI:</em> ${item.agi}`);
    if (item.vit) attrs.push(`<em>VIT:</em> ${item.vit}`);
    if (item.int) attrs.push(`<em>INT:</em> ${item.int}`);
    if (item.luk) attrs.push(`<em>LUK:</em> ${item.luk}`);
    const attrLine = attrs.length ? attrs.join(' | ') + '<br>' : '';

    tooltip.innerHTML = `
        <strong>${item.name}</strong><br>
        <em>Type:</em> ${item.type}<br>
        <em>Class:</em> ${item.class}<br>
        <em>Rarity:</em> ${item.rarity}<br>
        ${attrLine}
        <em>Description:</em> ${item.description}
    `;
    document.body.appendChild(tooltip);

    function showTooltip(x, y) {
        tooltip.style.display = 'block';
        tooltip.style.left = `${x + 8}px`;
        tooltip.style.top = `${y + 8}px`;
        setTimeout(() => { tooltip.style.opacity = '1'; }, 10);
    }
    function hideTooltip() {
        tooltip.style.opacity = '0';
        setTimeout(() => { tooltip.style.display = 'none'; }, 200);
    }

    let tooltipVisible = false;

    card.addEventListener('mouseenter', e => {
        showTooltip(e.pageX, e.pageY);
        tooltipVisible = true;
    });
    card.addEventListener('mouseleave', () => {
        hideTooltip();
        tooltipVisible = false;
    });
    card.addEventListener('mousemove', e => {
        if (tooltipVisible) {
            tooltip.style.left = `${e.pageX + 8}px`;
            tooltip.style.top = `${e.pageY + 8}px`;
        }
    });
    card.addEventListener('click', e => {
        e.stopPropagation();
        if (tooltip.style.display === 'block' && tooltip.style.opacity === '1') {
            hideTooltip();
            tooltipVisible = false;
        } else {
            showTooltip(e.pageX, e.pageY);
            tooltipVisible = true;
        }
    });
    // Hide tooltip if clicking elsewhere
    document.addEventListener('click', function docClick() {
        if (tooltipVisible) {
            hideTooltip();
            tooltipVisible = false;
        }
    });
    return card;
}
// Utility: show status bar message
function showStatus(message, type = 'info') {
    const bar = document.getElementById('statusBar');
    if (!bar) return;
    bar.textContent = message;
    bar.className = 'status-bar show';
    bar.style.backgroundColor = type === 'error' ? '#e74c3c' : 
                                  type === 'success' ? '#27ae60' : '#3498db';
    setTimeout(() => bar.classList.remove('show'), 3000);
}

// 🎲 Dice sound (Web Audio API - no external files)
function playDiceSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        const now = ctx.currentTime;
        
        // Shake sound
        const shake = ctx.createOscillator();
        const shakeGain = ctx.createGain();
        shake.type = 'sawtooth';
        shake.frequency.setValueAtTime(200, now);
        shake.frequency.exponentialRampToValueAtTime(600, now + 0.2);
        shakeGain.gain.setValueAtTime(0.1, now);
        shakeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        shake.connect(shakeGain);
        shakeGain.connect(ctx.destination);
        shake.start(now);
        shake.stop(now + 0.2);
        
        // Land "clack"
        setTimeout(() => {
            const clack = ctx.createOscillator();
            const clackGain = ctx.createGain();
            clack.type = 'square';
            clack.frequency.value = 800;
            clackGain.gain.setValueAtTime(0.3, now);
            clackGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            clack.connect(clackGain);
            clackGain.connect(ctx.destination);
            clack.start(now);
            clack.stop(now + 0.1);
        }, 220);
    } catch (e) {
        console.log('Audio disabled or not supported');
    }
}

// 🎯 Show result popup
function showDiceResult(value, dieType) {
    const resultEl = document.getElementById('diceResult');
    const numEl = document.getElementById('resultNumber');
    const labelEl = document.getElementById('resultLabel');
    
    if (!resultEl || !numEl || !labelEl) return;
    
    numEl.textContent = value;
    labelEl.textContent = dieType;
    numEl.className = dieType === 'd6' ? 'roll-d6' : 'roll-d20';
    
    resultEl.classList.remove('show');
    void resultEl.offsetWidth; // Trigger reflow
    resultEl.classList.add('show');
    
    // Auto-hide after 1.5s
    setTimeout(() => {
        resultEl.classList.remove('show');
    }, 1500);
}

// 📜 Add to roll history
function addToHistory(value, dieType) {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    const item = document.createElement('div');
    item.className = 'roll-item';
    item.innerHTML = `
        <span>${timeStr}</span>
        <span class="roll-value ${dieType === 'd6' ? 'roll-d6' : 'roll-d20'}">${value}</span>
        <span>${dieType}</span>
    `;
    
    historyList.insertBefore(item, historyList.firstChild);
    
    // Keep only last 8 rolls
    while (historyList.children.length > 8) {
        historyList.removeChild(historyList.lastChild);
    }
}

// 🎲 Roll dice
function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

// Collect all character data — now includes roll history
function collectCharacterData() {
    const data = {
        name: document.getElementById('name')?.value || '',
        class: document.getElementById('class')?.value || '',
        player: document.getElementById('player')?.value || '',
        level: document.getElementById('level')?.value || '',
        exp: document.getElementById('exp')?.value || '',
        hp: document.getElementById('hp')?.value || '',
        fatigue: document.getElementById('fatigue')?.value || '',
        max: document.getElementById('max')?.value || '',
        str: document.getElementById('str')?.value || '',
        agi: document.getElementById('agi')?.value || '',
        vit: document.getElementById('vit')?.value || '',
        int: document.getElementById('int')?.value || '',
        luk: document.getElementById('luk')?.value || '',
        melee: document.getElementById('melee')?.value || '1d6+STR',
        ranged: document.getElementById('ranged')?.value || '1d6+AGI',
        magic: document.getElementById('magic')?.value || '1d6+INT',
        physDef: document.getElementById('physDef')?.value || '1d6+VIT',
        magDef: document.getElementById('magDef')?.value || '1d6+INT',
        reaction: document.getElementById('reaction')?.value || '1d6+LUK',
        actives: [
            document.getElementById('active1')?.value || '',
            document.getElementById('active2')?.value || '',
            document.getElementById('active3')?.value || '',
            document.getElementById('active4')?.value || '',
            document.getElementById('active5')?.value || ''
        ],
        weapon: document.getElementById('weapon')?.value || '',
        armor: document.getElementById('armor')?.value || '',
        gloves: document.getElementById('gloves')?.value || '',
        boots: document.getElementById('boots')?.value || '',
        accessory: document.getElementById('accessory')?.value || '',
        passives: [
            document.getElementById('passive1')?.value || '',
            document.getElementById('passive2')?.value || '',
            document.getElementById('passive3')?.value || '',
            document.getElementById('passive4')?.value || '',
            document.getElementById('passive5')?.value || ''
        ],
        poison: document.getElementById('poison')?.value || '',
        burn: document.getElementById('burn')?.value || '',
        bleed: document.getElementById('bleed')?.value || '',
        arcane: document.getElementById('arcane')?.value || '',
        stun: document.getElementById('stun')?.value || '',
        turns: {
            poison: parseInt(document.getElementById('turnPoison')?.value) || 0,
            burn: parseInt(document.getElementById('turnBurn')?.value) || 0,
            slow: parseInt(document.getElementById('turnSlow')?.value) || 0,
            wounded: parseInt(document.getElementById('turnWounded')?.value) || 0,
            stunned: parseInt(document.getElementById('turnStunned')?.value) || 0
        },
        dungeonName: document.getElementById('dungeonName')?.value || '',
        smRooms: document.getElementById('smRooms')?.value || '',
        inventory: Array.from(document.querySelectorAll('.inventory-list input')).map(input => input.value || '')
    };

    // Add roll history
    const historyItems = Array.from(document.querySelectorAll('#historyList .roll-item')).map(item => {
        const children = item.children;
        return {
            time: children[0]?.textContent || '',
            value: parseInt(children[1]?.textContent) || 0,
            die: children[2]?.textContent || ''
        };
    });

    return {...data, rollHistory: historyItems};
}

// Populate form from data — including roll history
function populateForm(data) {
    if (!data) return;
    
    document.getElementById('name') && (document.getElementById('name').value = data.name || '');
    const classSelect = document.getElementById('class');
    if (classSelect) {
        // Normalize input for comparison
        const validClasses = ['Warrior','Guardian','Thief','Mage','Priest','Ranger'];
        const importedClass = (data.class || '').trim().toLowerCase();
        console.log('Imported class from JSON:', data.class);
        console.log('Normalized imported class:', importedClass);
        const foundClass = validClasses.find(c => c.toLowerCase() === importedClass);
        console.log('Matched class in dropdown:', foundClass);
        if (foundClass) {
            classSelect.value = foundClass;
            console.log('Class dropdown set to:', foundClass);
        } else {
            classSelect.value = validClasses[0]; // fallback to first class
            console.log('Class not found, defaulting to:', validClasses[0]);
        }
    }
    document.getElementById('player') && (document.getElementById('player').value = data.player || '');
    document.getElementById('level') && (document.getElementById('level').value = data.level || '');
    document.getElementById('exp') && (document.getElementById('exp').value = data.exp || '');
    document.getElementById('hp') && (document.getElementById('hp').value = data.hp || '');
    document.getElementById('fatigue') && (document.getElementById('fatigue').value = data.fatigue || '');
    document.getElementById('max') && (document.getElementById('max').value = data.max || '');
    document.getElementById('str') && (document.getElementById('str').value = data.str || '');
    document.getElementById('agi') && (document.getElementById('agi').value = data.agi || '');
    document.getElementById('vit') && (document.getElementById('vit').value = data.vit || '');
    document.getElementById('int') && (document.getElementById('int').value = data.int || '');
    document.getElementById('luk') && (document.getElementById('luk').value = data.luk || '');
    document.getElementById('melee') && (document.getElementById('melee').value = data.melee || '1d6+STR');
    document.getElementById('ranged') && (document.getElementById('ranged').value = data.ranged || '1d6+AGI');
    document.getElementById('magic') && (document.getElementById('magic').value = data.magic || '1d6+INT');
    document.getElementById('physDef') && (document.getElementById('physDef').value = data.physDef || '1d6+VIT');
    document.getElementById('magDef') && (document.getElementById('magDef').value = data.magDef || '1d6+INT');
    document.getElementById('reaction') && (document.getElementById('reaction').value = data.reaction || '1d6+LUK');
    
    if (data.actives && data.actives.length >= 5) {
        document.getElementById('active1') && (document.getElementById('active1').value = data.actives[0] || '');
        document.getElementById('active2') && (document.getElementById('active2').value = data.actives[1] || '');
        document.getElementById('active3') && (document.getElementById('active3').value = data.actives[2] || '');
        document.getElementById('active4') && (document.getElementById('active4').value = data.actives[3] || '');
        document.getElementById('active5') && (document.getElementById('active5').value = data.actives[4] || '');
    }
    
    document.getElementById('weapon') && (document.getElementById('weapon').value = data.weapon || '');
    document.getElementById('armor') && (document.getElementById('armor').value = data.armor || '');
    document.getElementById('gloves') && (document.getElementById('gloves').value = data.gloves || '');
    document.getElementById('boots') && (document.getElementById('boots').value = data.boots || '');
    document.getElementById('accessory') && (document.getElementById('accessory').value = data.accessory || '');
    
    if (data.passives && data.passives.length >= 5) {
        document.getElementById('passive1') && (document.getElementById('passive1').value = data.passives[0] || '');
        document.getElementById('passive2') && (document.getElementById('passive2').value = data.passives[1] || '');
        document.getElementById('passive3') && (document.getElementById('passive3').value = data.passives[2] || '');
        document.getElementById('passive4') && (document.getElementById('passive4').value = data.passives[3] || '');
        document.getElementById('passive5') && (document.getElementById('passive5').value = data.passives[4] || '');
    }
    
    document.getElementById('poison') && (document.getElementById('poison').value = data.poison || '');
    document.getElementById('burn') && (document.getElementById('burn').value = data.burn || '');
    document.getElementById('bleed') && (document.getElementById('bleed').value = data.bleed || '');
    document.getElementById('arcane') && (document.getElementById('arcane').value = data.arcane || '');
    document.getElementById('stun') && (document.getElementById('stun').value = data.stun || '');
    document.getElementById('dungeonName') && (document.getElementById('dungeonName').value = data.dungeonName || '');
    document.getElementById('smRooms') && (document.getElementById('smRooms').value = data.smRooms || '');
    
    // ✅ Restore turn counters
    if (data.turns) {
        document.getElementById('turnPoison') && (document.getElementById('turnPoison').value = data.turns.poison || 0);
        document.getElementById('turnBurn') && (document.getElementById('turnBurn').value = data.turns.burn || 0);
        document.getElementById('turnSlow') && (document.getElementById('turnSlow').value = data.turns.slow || 0);
        document.getElementById('turnWounded') && (document.getElementById('turnWounded').value = data.turns.wounded || 0);
        document.getElementById('turnStunned') && (document.getElementById('turnStunned').value = data.turns.stunned || 0);
        
        ['Poison','Burn','Slow','Wounded','Stunned'].forEach(n => {
            const el = document.getElementById(`turn${n}Value`);
            const slider = document.getElementById(`turn${n}`);
            if (el && slider) el.textContent = slider.value;
        });
    }

    // ✅ Restore inventory
    if (Array.isArray(data.inventory)) {
        const inventoryInputs = document.querySelectorAll('.inventory-list input');
        for (let i = 0; i < inventoryInputs.length; i++) {
            inventoryInputs[i].value = data.inventory[i] || '';
        }
    }

    // ✅ Restore roll history
    if (data.rollHistory && Array.isArray(data.rollHistory)) {
        const historyList = document.getElementById('historyList');
        if (historyList) {
            historyList.innerHTML = '';
            data.rollHistory.slice(-8).forEach(item => {
                const el = document.createElement('div');
                el.className = 'roll-item';
                el.innerHTML = `
                    <span>${item.time}</span>
                    <span class="roll-value ${item.die === 'd6' ? 'roll-d6' : 'roll-d20'}">${item.value}</span>
                    <span>${item.die}</span>
                `;
                historyList.appendChild(el);
            });
        }
    }
}

// Update turn display
function updateTurnDisplay(name) {
    const el = document.getElementById(`turn${name}Value`);
    const slider = document.getElementById(`turn${name}`);
    if (el && slider) el.textContent = slider.value;
}

// Save to cache
function saveToCache() {
    try {
        const data = collectCharacterData();
        console.log('Saving class value:', data.class);
        localStorage.setItem('rpg-character-draft', JSON.stringify(data));
        localStorage.setItem('rpg-character-draft-timestamp', new Date().toISOString());
        showStatus('✓ Auto-saved', 'success');
        updateUnsavedIndicator(false);
    } catch (e) {
        showStatus('⚠ Cache save failed', 'error');
    }
}

function updateUnsavedIndicator(hasUnsaved) {
    const indicator = document.getElementById('unsavedIndicator');
    if (indicator) indicator.style.display = hasUnsaved ? 'block' : 'none';
}

let lastExportedData = null;
let hasUnsavedChanges = false;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load cached draft
    try {
        const cached = localStorage.getItem('rpg-character-draft');
        if (cached) {
            const data = JSON.parse(cached);
            populateForm(data);
            lastExportedData = {...data};
            hasUnsavedChanges = false;
            updateUnsavedIndicator(false);
            showStatus('✓ Loaded cached draft', 'success');
        }
    } catch (e) {
        console.warn('Cache load failed', e);
    }
    // Render item cards at the bottom
    loadAndDisplayItems();
    
        // Show/hide roll history panel with floating button
        const showHistoryBtn = document.getElementById('showHistoryBtn');
        if (showHistoryBtn) {
            showHistoryBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const panel = document.getElementById('rollHistory');
                if (panel) panel.classList.toggle('visible');
            });
        }

    // ✅ Dice button handlers
    const rollD6Btn = document.getElementById('rollD6');
    const rollD20Btn = document.getElementById('rollD20');
    
    if (rollD6Btn) {
        rollD6Btn.addEventListener('click', function() {
            playDiceSound();
            const result = rollDie(6);
            showDiceResult(result, 'd6');
            addToHistory(result, 'd6');
            hasUnsavedChanges = true;
            updateUnsavedIndicator(true);
            saveToCache();
        });
    }

    if (rollD20Btn) {
        rollD20Btn.addEventListener('click', function() {
            playDiceSound();
            const result = rollDie(20);
            showDiceResult(result, 'd20');
            addToHistory(result, 'd20');
            hasUnsavedChanges = true;
            updateUnsavedIndicator(true);
            saveToCache();
        });

        // Toggle history panel on d20 long press / double click
        let clickTimer;
        rollD20Btn.addEventListener('click', function() {
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                const panel = document.getElementById('rollHistory');
                if (panel) panel.classList.toggle('visible');
            }, 300);
        });

        rollD20Btn.addEventListener('dblclick', function(e) {
            e.preventDefault();
            clearTimeout(clickTimer);
            const panel = document.getElementById('rollHistory');
            if (panel) panel.classList.toggle('visible');
        });
    }

    // Close history on outside click
    document.addEventListener('click', function(e) {
        const panel = document.getElementById('rollHistory');
        const d20Btn = document.getElementById('rollD20');
        if (panel && panel.classList.contains('visible') && 
            !panel.contains(e.target) && 
            e.target !== d20Btn) {
            panel.classList.remove('visible');
        }
    });

    // Attach input handlers
    ['Poison', 'Burn', 'Slow', 'Wounded', 'Stunned'].forEach(name => {
        const slider = document.getElementById(`turn${name}`);
        if (slider) {
            slider.addEventListener('input', () => {
                updateTurnDisplay(name);
                hasUnsavedChanges = true;
                updateUnsavedIndicator(true);
                saveToCache();
            });
        }
    });

    document.querySelectorAll('input:not([type="range"]), textarea').forEach(input => {
        input.addEventListener('input', () => {
            hasUnsavedChanges = true;
            updateUnsavedIndicator(true);
            saveToCache();
        });
    });

    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            const data = collectCharacterData();
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${data.name || 'character'}_sheet.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            lastExportedData = {...data};
            hasUnsavedChanges = false;
            updateUnsavedIndicator(false);
            showStatus('✓ Exported!', 'success');
        });
    }

    // Import button
    const importBtn = document.getElementById('importBtn');
    if (importBtn) {
        importBtn.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = e => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = ev => {
                    try {
                        const data = JSON.parse(ev.target.result);
                        populateForm(data);
                        lastExportedData = {...data};
                        hasUnsavedChanges = false;
                        updateUnsavedIndicator(false);
                        saveToCache();
                        showStatus('✓ Imported!', 'success');
                    } catch (err) {
                        showStatus('❌ Import failed', 'error');
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        });
    }

    // Reset button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (confirm('Reset all fields?')) {
                document.querySelectorAll('input, textarea').forEach(input => {
                    if (['melee','ranged','magic','physDef','magDef','reaction'].includes(input.id)) return;
                    if (input.type === 'range') {
                        input.value = 0;
                        updateTurnDisplay(input.id.replace('turn', ''));
                    } else {
                        input.value = '';
                    }
                });
                const historyList = document.getElementById('historyList');
                if (historyList) historyList.innerHTML = '';
                hasUnsavedChanges = true;
                updateUnsavedIndicator(true);
                saveToCache();
            }
        });
    }

    // Clear cache button
    const clearCacheBtn = document.getElementById('clearCacheBtn');
    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', function() {
            if (confirm('Clear cached draft?')) {
                localStorage.removeItem('rpg-character-draft');
                localStorage.removeItem('rpg-character-draft-timestamp');
                showStatus('✓ Cache cleared', 'success');
            }
        });
    }

    // Before unload warning
    window.addEventListener('beforeunload', e => {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '';
            return '';
        }
    });
});
