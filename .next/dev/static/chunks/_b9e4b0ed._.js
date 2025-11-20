(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/SnakeGame.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SnakeGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const INITIAL_GRID_SIZE = 4;
const CELL_SIZE = 80;
const INITIAL_SPEED = 500; // ms between moves
function SnakeGame() {
    _s();
    // État du jeu principal
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [totalPoints, setTotalPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentPoints, setCurrentPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [healthPoints, setHealthPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10); // Points de vie du serpent
    const [healthBonus, setHealthBonus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0); // Bonus de PV des améliorations
    const [highScore, setHighScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(30); // 30 secondes
    const [baseTime, setBaseTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(30); // Temps de base pouvant être amélioré
    const pointsAddedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false); // Pour éviter le double comptage
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Pour gérer l'hydratation
    // État du snake
    const [snake, setSnake] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            x: 1,
            y: 1
        }
    ]);
    const [direction, setDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("RIGHT");
    const [food, setFood] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 2,
        y: 2
    });
    // Fonction pour calculer la taille de la grille selon la progression
    const getGridDimensions = (level)=>{
        const evenLevel = Math.floor(level / 2);
        const oddLevel = level % 2;
        // Niveau 0: 4x4
        // Niveau 1: 4x5
        // Niveau 2: 5x5
        // Niveau 3: 5x6
        // Niveau 4: 6x6
        // Niveau 5: 6x7
        // etc.
        const baseSize = 4;
        const width = baseSize + evenLevel;
        const height = baseSize + evenLevel + oddLevel;
        return {
            width,
            height
        };
    };
    // État des dimensions de grille (séparées pour largeur/hauteur)
    const [gridWidth, setGridWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(4);
    const [gridHeight, setGridHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(4);
    // Références pour éviter les recréations de useEffect
    const directionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("RIGHT");
    const snakeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([
        {
            x: 1,
            y: 1
        }
    ]);
    // Synchroniser les références avec l'état
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SnakeGame.useEffect": ()=>{
            snakeRef.current = snake;
        }
    }["SnakeGame.useEffect"], [
        snake
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SnakeGame.useEffect": ()=>{
            directionRef.current = direction;
        }
    }["SnakeGame.useEffect"], [
        direction
    ]);
    // État des onglets et améliorations
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("game");
    const [appleValue, setAppleValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [timeBonus, setTimeBonus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0); // Bonus de temps additionnel
    const [savedUpgrades, setSavedUpgrades] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]); // Améliorations sauvegardées
    const [upgrades, setUpgrades] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: "appleValue",
            name: "Valeur des Pommes",
            description: "Augmente la valeur de chaque pomme récoltée",
            baseCost: 10,
            level: 0,
            maxLevel: 20,
            unlocked: true,
            position: {
                x: 1,
                y: 1
            },
            effect: {
                "SnakeGame.useState": ()=>{}
            }["SnakeGame.useState"]
        },
        {
            id: "healthBonus",
            name: "Points de Vie",
            description: "Augmente les PV de départ du serpent",
            baseCost: 10,
            level: 0,
            maxLevel: 20,
            unlocked: true,
            position: {
                x: 1,
                y: 3
            },
            effect: {
                "SnakeGame.useState": ()=>{}
            }["SnakeGame.useState"]
        },
        {
            id: "timeBonus",
            name: "Bonus Temps",
            description: "+2 secondes par partie",
            baseCost: 50,
            level: 0,
            maxLevel: 10,
            unlocked: false,
            requiredLevel: "appleValue",
            requiredLevelValue: 3,
            position: {
                x: -1,
                y: 1
            },
            effect: {
                "SnakeGame.useState": ()=>{}
            }["SnakeGame.useState"]
        },
        {
            id: "gridSize",
            name: "Taille de la Grille",
            description: "Agrandit le terrain de jeu",
            baseCost: 25,
            level: 0,
            maxLevel: 6,
            unlocked: false,
            requiredLevel: "appleValue",
            requiredLevelValue: 3,
            position: {
                x: 3,
                y: 1
            },
            effect: {
                "SnakeGame.useState": ()=>{}
            }["SnakeGame.useState"]
        }
    ]);
    // Gérer le montage du composant
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SnakeGame.useEffect": ()=>{
            setIsMounted(true);
            // Initialiser la nourriture aléatoirement seulement côté client
            const initialSnake = [
                {
                    x: 1,
                    y: 1
                }
            ];
            setFood(generateRandomFood(initialSnake) || {
                x: 2,
                y: 2
            });
        }
    }["SnakeGame.useEffect"], []);
    // Vérifier les déverrouillages d'améliorations
    const checkUnlocks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SnakeGame.useCallback[checkUnlocks]": (updatedUpgrades)=>{
            return updatedUpgrades.map({
                "SnakeGame.useCallback[checkUnlocks]": (upgrade)=>{
                    if (!upgrade.unlocked && upgrade.requiredLevel && upgrade.requiredLevelValue) {
                        const requiredUpgrade = updatedUpgrades.find({
                            "SnakeGame.useCallback[checkUnlocks].requiredUpgrade": (u)=>u.id === upgrade.requiredLevel
                        }["SnakeGame.useCallback[checkUnlocks].requiredUpgrade"]);
                        if (requiredUpgrade && requiredUpgrade.level >= upgrade.requiredLevelValue) {
                            return {
                                ...upgrade,
                                unlocked: true
                            };
                        }
                    }
                    return upgrade;
                }
            }["SnakeGame.useCallback[checkUnlocks]"]);
        }
    }["SnakeGame.useCallback[checkUnlocks]"], []);
    // Calculer le coût d'une amélioration en fonction de son niveau
    const getUpgradeCost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SnakeGame.useCallback[getUpgradeCost]": (baseCost, level)=>{
            return Math.floor(baseCost * Math.pow(1.5, level));
        }
    }["SnakeGame.useCallback[getUpgradeCost]"], []);
    // Acheter une amélioration
    const buyUpgrade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SnakeGame.useCallback[buyUpgrade]": (upgradeId)=>{
            setUpgrades({
                "SnakeGame.useCallback[buyUpgrade]": (prevUpgrades)=>{
                    const upgrade = prevUpgrades.find({
                        "SnakeGame.useCallback[buyUpgrade].upgrade": (u)=>u.id === upgradeId
                    }["SnakeGame.useCallback[buyUpgrade].upgrade"]);
                    if (!upgrade || upgrade.level >= upgrade.maxLevel || !upgrade.unlocked) return prevUpgrades;
                    const currentCost = getUpgradeCost(upgrade.baseCost, upgrade.level);
                    // Vérifier si on a assez de points dans le total accumulé uniquement
                    if (totalPoints < currentCost) return prevUpgrades;
                    // Appliquer l'amélioration d'abord
                    const updatedUpgrades = prevUpgrades.map({
                        "SnakeGame.useCallback[buyUpgrade].updatedUpgrades": (u)=>{
                            if (u.id === upgradeId) {
                                const newLevel = u.level + 1;
                                if (upgradeId === "appleValue") {
                                    setAppleValue(1 + newLevel);
                                } else if (upgradeId === "healthBonus") {
                                    setHealthBonus(newLevel); // +1 PV par niveau
                                } else if (upgradeId === "gridSize") {
                                    const dimensions = getGridDimensions(newLevel);
                                    setGridWidth(dimensions.width);
                                    setGridHeight(dimensions.height);
                                    // Réinitialiser la partie si en cours
                                    if (gameState === "playing") {
                                        setGameState("idle");
                                        setActiveTab("game"); // Retourner à l'onglet jeu
                                    }
                                } else if (upgradeId === "timeBonus") {
                                    setTimeBonus(newLevel * 2); // +2 secondes par niveau
                                }
                                return {
                                    ...u,
                                    level: newLevel
                                };
                            }
                            return u;
                        }
                    }["SnakeGame.useCallback[buyUpgrade].updatedUpgrades"]);
                    // Vérifier les déverrouillages
                    return checkUnlocks(updatedUpgrades);
                }
            }["SnakeGame.useCallback[buyUpgrade]"]);
            // Déduire les points du total accumulé uniquement (après la mise à jour)
            const upgrade = upgrades.find({
                "SnakeGame.useCallback[buyUpgrade].upgrade": (u)=>u.id === upgradeId
            }["SnakeGame.useCallback[buyUpgrade].upgrade"]);
            if (upgrade) {
                const currentCost = getUpgradeCost(upgrade.baseCost, upgrade.level);
                setTotalPoints({
                    "SnakeGame.useCallback[buyUpgrade]": (prev)=>Math.max(0, prev - currentCost)
                }["SnakeGame.useCallback[buyUpgrade]"]);
            }
        }
    }["SnakeGame.useCallback[buyUpgrade]"], [
        totalPoints,
        getUpgradeCost,
        gameState,
        checkUnlocks
    ]);
    // Sauvegarder les améliorations actuelles
    const saveUpgrades = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SnakeGame.useCallback[saveUpgrades]": ()=>{
            const currentUpgradesData = upgrades.map({
                "SnakeGame.useCallback[saveUpgrades].currentUpgradesData": (u)=>({
                        id: u.id,
                        name: u.name,
                        description: u.description,
                        baseCost: u.baseCost,
                        level: u.level,
                        maxLevel: u.maxLevel,
                        unlocked: u.unlocked,
                        position: u.position
                    })
            }["SnakeGame.useCallback[saveUpgrades].currentUpgradesData"]);
            setSavedUpgrades(currentUpgradesData);
            // Créer et télécharger le fichier JSON
            const dataStr = JSON.stringify({
                savedUpgrades: currentUpgradesData,
                gameState: {
                    appleValue,
                    healthBonus,
                    timeBonus,
                    gridWidth,
                    gridHeight,
                    totalPoints,
                    highScore
                },
                timestamp: new Date().toISOString()
            }, null, 2);
            const dataBlob = new Blob([
                dataStr
            ], {
                type: "application/json"
            });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `snake_idle_upgrades_${Date.now()}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }["SnakeGame.useCallback[saveUpgrades]"], [
        upgrades,
        appleValue,
        timeBonus,
        gridWidth,
        gridHeight,
        totalPoints,
        highScore
    ]);
    // Charger les améliorations depuis un fichier
    const loadUpgrades = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SnakeGame.useCallback[loadUpgrades]": (event)=>{
            const file = event.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ({
                "SnakeGame.useCallback[loadUpgrades]": (e)=>{
                    try {
                        const data = JSON.parse(e.target?.result);
                        if (data.savedUpgrades && Array.isArray(data.savedUpgrades)) {
                            setSavedUpgrades(data.savedUpgrades);
                            // Restaurer l'état du jeu si disponible
                            if (data.gameState) {
                                setAppleValue(data.gameState.appleValue || 1);
                                setHealthBonus(data.gameState.healthBonus || 0);
                                setTimeBonus(data.gameState.timeBonus || 0);
                                setGridWidth(data.gameState.gridWidth || INITIAL_GRID_SIZE);
                                setGridHeight(data.gameState.gridHeight || INITIAL_GRID_SIZE);
                                setHighScore(data.gameState.highScore || 0);
                            }
                        }
                    } catch (error) {
                        console.error("Erreur lors du chargement des améliorations:", error);
                        alert("Erreur: Le fichier de sauvegarde est invalide");
                    }
                }
            })["SnakeGame.useCallback[loadUpgrades]"];
            reader.readAsText(file);
        }
    }["SnakeGame.useCallback[loadUpgrades]"], []);
    // Appliquer les améliorations sauvegardées
    const applySavedUpgrades = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SnakeGame.useCallback[applySavedUpgrades]": ()=>{
            if (savedUpgrades.length === 0) {
                alert("Aucune amélioration sauvegardée à appliquer");
                return;
            }
            // Réinitialiser tous les états
            setAppleValue(1);
            setHealthBonus(0);
            setTimeBonus(0);
            setGridWidth(INITIAL_GRID_SIZE);
            setGridHeight(INITIAL_GRID_SIZE);
            // Appliquer les améliorations sauvegardées
            const newUpgrades = upgrades.map({
                "SnakeGame.useCallback[applySavedUpgrades].newUpgrades": (baseUpgrade)=>{
                    const savedUpgrade = savedUpgrades.find({
                        "SnakeGame.useCallback[applySavedUpgrades].newUpgrades.savedUpgrade": (s)=>s.id === baseUpgrade.id
                    }["SnakeGame.useCallback[applySavedUpgrades].newUpgrades.savedUpgrade"]);
                    if (savedUpgrade) {
                        const levelDiff = savedUpgrade.level - baseUpgrade.level;
                        // Appliquer les effets en fonction du niveau
                        if (baseUpgrade.id === "appleValue") {
                            setAppleValue({
                                "SnakeGame.useCallback[applySavedUpgrades].newUpgrades": (prev)=>prev + levelDiff
                            }["SnakeGame.useCallback[applySavedUpgrades].newUpgrades"]);
                        } else if (baseUpgrade.id === "healthBonus") {
                            setHealthBonus({
                                "SnakeGame.useCallback[applySavedUpgrades].newUpgrades": (prev)=>prev + levelDiff
                            }["SnakeGame.useCallback[applySavedUpgrades].newUpgrades"]);
                        } else if (baseUpgrade.id === "timeBonus") {
                            setTimeBonus({
                                "SnakeGame.useCallback[applySavedUpgrades].newUpgrades": (prev)=>prev + savedUpgrade.level * 2
                            }["SnakeGame.useCallback[applySavedUpgrades].newUpgrades"]);
                        } else if (baseUpgrade.id === "gridSize") {
                            const dimensions = getGridDimensions(savedUpgrade.level);
                            setGridWidth(dimensions.width);
                            setGridHeight(dimensions.height);
                        }
                        return savedUpgrade;
                    }
                    return baseUpgrade;
                }
            }["SnakeGame.useCallback[applySavedUpgrades].newUpgrades"]);
            setUpgrades(newUpgrades);
            setSavedUpgrades([]); // Vider les améliorations sauvegardées après application
            alert("Améliorations appliquées avec succès!");
        }
    }["SnakeGame.useCallback[applySavedUpgrades]"], [
        savedUpgrades,
        upgrades
    ]);
    // Générer une position aléatoire pour la nourriture
    const generateRandomFood = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SnakeGame.useCallback[generateRandomFood]": (currentSnake)=>{
            // Créer une liste de toutes les positions possibles
            const availablePositions = [];
            for(let x = 0; x < gridWidth; x++){
                for(let y = 0; y < gridHeight; y++){
                    const isOccupied = currentSnake.some({
                        "SnakeGame.useCallback[generateRandomFood].isOccupied": (segment)=>segment.x === x && segment.y === y
                    }["SnakeGame.useCallback[generateRandomFood].isOccupied"]);
                    if (!isOccupied) {
                        availablePositions.push({
                            x,
                            y
                        });
                    }
                }
            }
            // S'il n'y a plus de place disponible, retourner null
            if (availablePositions.length === 0) {
                return null;
            }
            // Choisir une position aléatoire parmi les positions disponibles
            const randomIndex = Math.floor(Math.random() * availablePositions.length);
            return availablePositions[randomIndex];
        }
    }["SnakeGame.useCallback[generateRandomFood]"], [
        gridWidth,
        gridHeight
    ]);
    // Initialiser le jeu
    const startGame = ()=>{
        const initialSnake = [
            {
                x: 1,
                y: 1
            }
        ];
        snakeRef.current = initialSnake;
        directionRef.current = "RIGHT";
        pointsAddedRef.current = false; // Réinitialiser le flag de points
        setSnake(initialSnake);
        setDirection("RIGHT");
        // Générer la nourriture seulement si le composant est monté
        const newFood = isMounted ? generateRandomFood(initialSnake) : {
            x: 2,
            y: 2
        };
        setFood(newFood || {
            x: 2,
            y: 2
        });
        setCurrentPoints(0);
        setHealthPoints(10 + healthBonus); // Réinitialiser les PV avec le bonus
        setTimeLeft(baseTime + timeBonus); // Utiliser le temps de base + le bonus
        setGameState("playing");
    };
    // Déplacer le snake
    const moveSnake = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SnakeGame.useCallback[moveSnake]": ()=>{
            if (gameState !== "playing") return;
            const currentSnake = [
                ...snakeRef.current
            ];
            const newSnake = [
                ...currentSnake
            ];
            const head = {
                ...newSnake[0]
            };
            const currentDirection = directionRef.current;
            // Déplacer la tête selon la direction
            switch(currentDirection){
                case "UP":
                    head.y -= 1;
                    break;
                case "DOWN":
                    head.y += 1;
                    break;
                case "LEFT":
                    head.x -= 1;
                    break;
                case "RIGHT":
                    head.x += 1;
                    break;
            }
            // Vérifier les collisions
            // Collision avec les murs
            if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
                setGameState("gameOver");
                return;
            }
            // Collision avec soi-même
            // On exclut le dernier segment car il va se déplacer (cas où le serpent mange de la nourriture)
            const segmentsToCheck = newSnake.length > 1 ? newSnake.slice(0, -1) : newSnake;
            if (segmentsToCheck.some({
                "SnakeGame.useCallback[moveSnake]": (segment)=>segment.x === head.x && segment.y === head.y
            }["SnakeGame.useCallback[moveSnake]"])) {
                setGameState("gameOver");
                return;
            }
            newSnake.unshift(head);
            // Vérifier si le snake mange la nourriture
            if (head.x === food.x && head.y === food.y) {
                setCurrentPoints({
                    "SnakeGame.useCallback[moveSnake]": (prev)=>prev + appleValue
                }["SnakeGame.useCallback[moveSnake]"]);
                setHealthPoints({
                    "SnakeGame.useCallback[moveSnake]": (prev)=>{
                        const newHP = prev - 1;
                        if (newHP <= 0) {
                            setGameState("gameOver");
                        }
                        return newHP;
                    }
                }["SnakeGame.useCallback[moveSnake]"]); // Le serpent perd 1 PV en mangeant une pomme
                const newFoodPosition = generateRandomFood(newSnake);
                if (newFoodPosition === null) {
                    // Plus de place pour la nourriture, le snake a gagné !
                    setGameState("gameOver");
                    return;
                }
                setFood(newFoodPosition);
            } else {
                newSnake.pop();
            }
            snakeRef.current = newSnake;
            setSnake(newSnake);
        }
    }["SnakeGame.useCallback[moveSnake]"], [
        food,
        gameState,
        generateRandomFood,
        gridWidth,
        gridHeight,
        appleValue
    ]);
    // Gérer la fin de partie
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SnakeGame.useEffect": ()=>{
            if (gameState === "gameOver" && !pointsAddedRef.current) {
                // currentPoints contient déjà le score avec la valeur des pommes appliquée
                setTotalPoints({
                    "SnakeGame.useEffect": (prev)=>prev + currentPoints
                }["SnakeGame.useEffect"]);
                if (currentPoints > highScore) {
                    setHighScore(currentPoints);
                }
                pointsAddedRef.current = true; // Marquer que les points ont été ajoutés
            }
        }
    }["SnakeGame.useEffect"], [
        gameState,
        currentPoints,
        highScore
    ]);
    // Game loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SnakeGame.useEffect": ()=>{
            if (gameState !== "playing") return;
            const gameInterval = setInterval(moveSnake, INITIAL_SPEED);
            return ({
                "SnakeGame.useEffect": ()=>clearInterval(gameInterval)
            })["SnakeGame.useEffect"];
        }
    }["SnakeGame.useEffect"], [
        gameState,
        moveSnake
    ]);
    // Chronomètre
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SnakeGame.useEffect": ()=>{
            if (gameState !== "playing") return;
            const timerInterval = setInterval({
                "SnakeGame.useEffect.timerInterval": ()=>{
                    setTimeLeft({
                        "SnakeGame.useEffect.timerInterval": (prev)=>{
                            if (prev <= 1) {
                                setGameState("gameOver");
                                return 0;
                            }
                            return prev - 1;
                        }
                    }["SnakeGame.useEffect.timerInterval"]);
                }
            }["SnakeGame.useEffect.timerInterval"], 1000); // 1 seconde
            return ({
                "SnakeGame.useEffect": ()=>clearInterval(timerInterval)
            })["SnakeGame.useEffect"];
        }
    }["SnakeGame.useEffect"], [
        gameState
    ]);
    // Vérifier si un changement de direction causerait une collision
    const wouldCollideWithSelf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SnakeGame.useCallback[wouldCollideWithSelf]": (newDirection)=>{
            const currentSnake = [
                ...snakeRef.current
            ];
            if (currentSnake.length <= 2) return false; // Pas de risque avec 2 segments ou moins
            const head = {
                ...currentSnake[0]
            };
            // Calculer la nouvelle position de la tête
            switch(newDirection){
                case "UP":
                    head.y -= 1;
                    break;
                case "DOWN":
                    head.y += 1;
                    break;
                case "LEFT":
                    head.x -= 1;
                    break;
                case "RIGHT":
                    head.x += 1;
                    break;
            }
            // Vérifier si la nouvelle tête entrerait en collision avec un segment du corps
            // On exclut le dernier segment car il va se déplacer si le serpent mange de la nourriture
            const segmentsToCheck = currentSnake.length > 1 ? currentSnake.slice(1, -1) : [];
            return segmentsToCheck.some({
                "SnakeGame.useCallback[wouldCollideWithSelf]": (segment)=>segment.x === head.x && segment.y === head.y
            }["SnakeGame.useCallback[wouldCollideWithSelf]"]);
        }
    }["SnakeGame.useCallback[wouldCollideWithSelf]"], []);
    // Gérer les contrôles clavier
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SnakeGame.useEffect": ()=>{
            const handleKeyPress = {
                "SnakeGame.useEffect.handleKeyPress": (e)=>{
                    if (gameState !== "playing") return;
                    // Empêcher le défilement de la page avec les flèches
                    if ([
                        "ArrowUp",
                        "ArrowDown",
                        "ArrowLeft",
                        "ArrowRight"
                    ].includes(e.key)) {
                        e.preventDefault();
                    }
                    let newDirection = null;
                    switch(e.key){
                        case "ArrowUp":
                        case "z":
                        case "Z":
                            newDirection = "UP";
                            break;
                        case "ArrowDown":
                        case "s":
                        case "S":
                            newDirection = "DOWN";
                            break;
                        case "ArrowLeft":
                        case "q":
                        case "Q":
                            newDirection = "LEFT";
                            break;
                        case "ArrowRight":
                        case "d":
                        case "D":
                            newDirection = "RIGHT";
                            break;
                    }
                    // Vérifier si la nouvelle direction est valide
                    if (newDirection) {
                        // Ne pas permettre de faire demi-tour direct
                        const isOpposite = newDirection === "UP" && directionRef.current === "DOWN" || newDirection === "DOWN" && directionRef.current === "UP" || newDirection === "LEFT" && directionRef.current === "RIGHT" || newDirection === "RIGHT" && directionRef.current === "LEFT";
                        // Ne pas permettre les changements qui causeraient une collision avec soi-même
                        if (!isOpposite && !wouldCollideWithSelf(newDirection)) {
                            directionRef.current = newDirection;
                            setDirection(newDirection);
                        }
                    }
                }
            }["SnakeGame.useEffect.handleKeyPress"];
            window.addEventListener("keydown", handleKeyPress);
            return ({
                "SnakeGame.useEffect": ()=>window.removeEventListener("keydown", handleKeyPress)
            })["SnakeGame.useEffect"];
        }
    }["SnakeGame.useEffect"], [
        gameState,
        wouldCollideWithSelf
    ]);
    // Fonction pour obtenir l'image appropriée pour chaque partie du snake
    const getSnakeImage = (segment, index)=>{
        if (index === 0) {
            // Tête
            switch(direction){
                case "UP":
                    return "/Graphics/head_up.png";
                case "DOWN":
                    return "/Graphics/head_down.png";
                case "LEFT":
                    return "/Graphics/head_left.png";
                case "RIGHT":
                    return "/Graphics/head_right.png";
            }
        } else if (index === snake.length - 1) {
            // Queue
            const prevSegment = snake[index - 1];
            // La queue pointe dans la direction opposée au segment précédent
            if (prevSegment.x < segment.x) return "/Graphics/tail_right.png";
            if (prevSegment.x > segment.x) return "/Graphics/tail_left.png";
            if (prevSegment.y < segment.y) return "/Graphics/tail_down.png";
            if (prevSegment.y > segment.y) return "/Graphics/tail_up.png";
        } else {
            // Corps
            const prevSegment = snake[index - 1];
            const nextSegment = snake[index + 1];
            if (prevSegment.x === nextSegment.x) {
                return "/Graphics/body_vertical.png";
            } else if (prevSegment.y === nextSegment.y) {
                return "/Graphics/body_horizontal.png";
            } else {
                // Coins
                if (prevSegment.x < segment.x && nextSegment.y < segment.y || prevSegment.y < segment.y && nextSegment.x < segment.x) {
                    return "/Graphics/body_topleft.png";
                }
                if (prevSegment.x > segment.x && nextSegment.y < segment.y || prevSegment.y < segment.y && nextSegment.x > segment.x) {
                    return "/Graphics/body_topright.png";
                }
                if (prevSegment.x < segment.x && nextSegment.y > segment.y || prevSegment.y > segment.y && nextSegment.x < segment.x) {
                    return "/Graphics/body_bottomleft.png";
                }
                if (prevSegment.x > segment.x && nextSegment.y > segment.y || prevSegment.y > segment.y && nextSegment.x > segment.x) {
                    return "/Graphics/body_bottomright.png";
                }
            }
        }
        return "/Graphics/body_horizontal.png";
    };
    // Si le composant n'est pas encore monté, afficher un fallback simple
    if (!isMounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold mb-4",
                        children: "Snake Idle"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 670,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-400",
                        children: "Chargement du jeu..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 671,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SnakeGame.tsx",
                lineNumber: 669,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/SnakeGame.tsx",
            lineNumber: 668,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-4xl mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-center mb-4",
                        children: "Snake Idle"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 681,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-800 p-1 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("game"),
                                    className: `px-6 py-2 rounded-md font-semibold transition-colors ${activeTab === "game" ? "bg-green-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`,
                                    children: "🎮 JEU"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 686,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("upgrades"),
                                    className: `px-6 py-2 rounded-md font-semibold transition-colors ml-2 ${activeTab === "upgrades" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`,
                                    children: "🚀 AMÉLIORATIONS"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 696,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 685,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 684,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-6 gap-4 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-800 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "PV"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 713,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-2xl font-bold ${healthPoints <= 5 ? "text-red-500" : healthPoints <= 10 ? "text-yellow-400" : "text-red-400"}`,
                                            children: [
                                                "❤️ ",
                                                healthPoints
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 714,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 712,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-800 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Points actuels"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 721,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-green-400",
                                            children: currentPoints
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 722,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 720,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-800 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Total accumulé"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 727,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-yellow-400",
                                            children: totalPoints
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 728,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 726,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-800 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Meilleur score"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 733,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-purple-400",
                                            children: highScore
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 734,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 732,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `bg-gray-800 p-4 rounded-lg ${timeLeft <= 10 ? "border-2 border-red-500" : ""}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Temps restant"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 741,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-2xl font-bold ${timeLeft <= 10 ? "text-red-400" : "text-blue-400"}`,
                                            children: [
                                                timeLeft,
                                                "s"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 742,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 738,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-800 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Valeur pomme"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 749,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-red-400",
                                            children: [
                                                "+",
                                                appleValue
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 750,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 748,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 711,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 710,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SnakeGame.tsx",
                lineNumber: 680,
                columnNumber: 7
            }, this),
            activeTab === "game" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative bg-gray-800 p-4 rounded-lg shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative grid bg-gray-700 border-4 border-gray-600",
                            style: {
                                gridTemplateColumns: `repeat(${gridWidth}, ${CELL_SIZE}px)`,
                                gridTemplateRows: `repeat(${gridHeight}, ${CELL_SIZE}px)`
                            },
                            children: [
                                Array.from({
                                    length: gridWidth * gridHeight
                                }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border border-gray-600 bg-gray-750"
                                    }, `cell-${index}`, false, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 772,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute flex items-center justify-center",
                                    style: {
                                        left: `${food.x * CELL_SIZE}px`,
                                        top: `${food.y * CELL_SIZE}px`,
                                        width: `${CELL_SIZE}px`,
                                        height: `${CELL_SIZE}px`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/Graphics/apple.png",
                                            alt: "Food",
                                            className: "w-12 h-12",
                                            onError: (e)=>{
                                                console.error("Error loading apple.png");
                                                e.currentTarget.style.display = "none";
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 788,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 bg-red-500 rounded-full",
                                            style: {
                                                display: "none"
                                            },
                                            id: "apple-fallback"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 797,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 779,
                                    columnNumber: 15
                                }, this),
                                snake.map((segment, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute flex items-center justify-center",
                                        style: {
                                            left: `${segment.x * CELL_SIZE}px`,
                                            top: `${segment.y * CELL_SIZE}px`,
                                            width: `${CELL_SIZE}px`,
                                            height: `${CELL_SIZE}px`
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: getSnakeImage(segment, index),
                                            alt: `Snake segment ${index}`,
                                            className: "w-16 h-16"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 816,
                                            columnNumber: 19
                                        }, this)
                                    }, `snake-${index}`, false, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 806,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 763,
                            columnNumber: 13
                        }, this),
                        gameState === "gameOver" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold mb-2 text-red-400",
                                        children: timeLeft === 0 ? "Temps écoulé!" : currentPoints === gridWidth * gridHeight - 1 ? "Parfait! Tableau rempli!" : "Game Over!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 829,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg mb-4",
                                        children: [
                                            "Score: ",
                                            currentPoints
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 836,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-300 mb-4",
                                        children: [
                                            "+",
                                            currentPoints,
                                            " points ajoutés au total!"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 837,
                                        columnNumber: 19
                                    }, this),
                                    timeLeft === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-blue-300 mb-4",
                                        children: "⏰ Les 30 secondes sont terminées"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 841,
                                        columnNumber: 21
                                    }, this),
                                    currentPoints === gridWidth * gridHeight - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-green-300 mb-4",
                                        children: "🎉 Vous avez rempli tout le tableau!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 846,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SnakeGame.tsx",
                                lineNumber: 828,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 827,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SnakeGame.tsx",
                    lineNumber: 762,
                    columnNumber: 11
                }, this)
            }, void 0, false),
            activeTab === "upgrades" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UpgradeTree, {
                upgrades: upgrades,
                totalPoints: totalPoints,
                currentPoints: currentPoints,
                appleValue: appleValue,
                gridWidth: gridWidth,
                gridHeight: gridHeight,
                timeBonus: timeBonus,
                onBuyUpgrade: buyUpgrade,
                onPlayGame: ()=>{
                    setActiveTab("game");
                    if (gameState === "idle" || gameState === "gameOver") {
                        startGame();
                    }
                },
                gameState: gameState,
                saveUpgrades: saveUpgrades,
                loadUpgrades: loadUpgrades,
                applySavedUpgrades: applySavedUpgrades,
                savedUpgrades: savedUpgrades,
                healthBonus: healthBonus
            }, void 0, false, {
                fileName: "[project]/src/components/SnakeGame.tsx",
                lineNumber: 858,
                columnNumber: 9
            }, this),
            activeTab === "game" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 text-center",
                children: [
                    gameState === "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: startGame,
                        className: "bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors",
                        children: "Commencer à jouer"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 886,
                        columnNumber: 13
                    }, this),
                    gameState === "gameOver" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: startGame,
                        className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors",
                        children: "Rejouer"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 895,
                        columnNumber: 13
                    }, this),
                    gameState === "playing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-400",
                        children: "Utilisez les flèches ou Z/Q/S/D pour contrôler le snake"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 904,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SnakeGame.tsx",
                lineNumber: 884,
                columnNumber: 9
            }, this),
            activeTab === "game" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 text-center text-sm text-gray-500 max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2",
                        children: [
                            "🎮 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Objectif:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SnakeGame.tsx",
                                lineNumber: 915,
                                columnNumber: 16
                            }, this),
                            " Ramassez les pommes pour gagner des points"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 914,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2",
                        children: [
                            "🍎 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Points:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SnakeGame.tsx",
                                lineNumber: 919,
                                columnNumber: 16
                            }, this),
                            " Chaque pomme vaut ",
                            appleValue,
                            " point",
                            appleValue > 1 ? "s" : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 918,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2",
                        children: [
                            "⏰ ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Temps:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SnakeGame.tsx",
                                lineNumber: 923,
                                columnNumber: 15
                            }, this),
                            " Vous avez 30 secondes par partie!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 922,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2",
                        children: [
                            "💎 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Idle:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SnakeGame.tsx",
                                lineNumber: 926,
                                columnNumber: 16
                            }, this),
                            " Vos points sont conservés même après la mort!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 925,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "🚀 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Améliorations:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SnakeGame.tsx",
                                lineNumber: 930,
                                columnNumber: 16
                            }, this),
                            " Utilisez vos points pour débloquer des bonus permanents!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 929,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SnakeGame.tsx",
                lineNumber: 913,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SnakeGame.tsx",
        lineNumber: 678,
        columnNumber: 5
    }, this);
}
_s(SnakeGame, "xprUp4pDU85ijy/ijCcAJYfio2Q=");
_c = SnakeGame;
// Composant UpgradeTree pour afficher l'arbre d'améliorations
function UpgradeTree({ upgrades, totalPoints, currentPoints, appleValue, gridWidth, gridHeight, timeBonus, onBuyUpgrade, onPlayGame, gameState, saveUpgrades, loadUpgrades, applySavedUpgrades, savedUpgrades, healthBonus }) {
    const getUpgradeCost = (baseCost, level)=>{
        return Math.floor(baseCost * Math.pow(1.5, level));
    };
    const getAvailablePoints = ()=>{
        return totalPoints;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-800 rounded-lg p-8 shadow-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-center mb-8 text-purple-400",
                    children: "Arbre d'Améliorations"
                }, void 0, false, {
                    fileName: "[project]/src/components/SnakeGame.tsx",
                    lineNumber: 984,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 mb-16",
                    children: upgrades.map((upgrade)=>{
                        const currentCost = getUpgradeCost(upgrade.baseCost, upgrade.level);
                        const availablePoints = getAvailablePoints();
                        const canAfford = availablePoints >= currentCost;
                        const isMaxed = upgrade.level >= upgrade.maxLevel;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `p-4 rounded-lg border-2 transition-all cursor-pointer ${!upgrade.unlocked ? "bg-gray-900 border-gray-700 opacity-50" : isMaxed ? "bg-purple-900 border-purple-600" : canAfford ? "bg-gray-800 border-green-600 hover:bg-gray-750" : "bg-gray-800 border-gray-700 opacity-75"}`,
                            onClick: ()=>upgrade.unlocked && !isMaxed && canAfford && onBuyUpgrade(upgrade.id),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-bold text-gray-300",
                                                        children: upgrade.id === "appleValue" ? "POMMES" : upgrade.id === "healthBonus" ? "PV" : upgrade.id === "gridSize" ? "GRILLE" : upgrade.id === "timeBonus" ? "TEMPS" : "BONUS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                                        lineNumber: 1018,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-white",
                                                        children: upgrade.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                                        lineNumber: 1029,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-400",
                                                        children: [
                                                            "Niv. ",
                                                            upgrade.level,
                                                            "/",
                                                            upgrade.maxLevel
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                                        lineNumber: 1030,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1017,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-400 mb-2",
                                                children: upgrade.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1035,
                                                columnNumber: 21
                                            }, this),
                                            !upgrade.unlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-yellow-400",
                                                children: [
                                                    "🔒 Verrouillé - Nécessite Niv.",
                                                    upgrade.requiredLevelValue,
                                                    " en",
                                                    " ",
                                                    upgrades.find((u)=>u.id === upgrade.requiredLevel)?.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1040,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 mt-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-semibold text-gray-300",
                                                    children: [
                                                        "Actuellement:",
                                                        upgrade.id === "appleValue" && ` +${appleValue} points/pomme`,
                                                        upgrade.id === "healthBonus" && ` ${10 + healthBonus} PV de départ`,
                                                        upgrade.id === "gridSize" && ` ${gridWidth}x${gridHeight}`,
                                                        upgrade.id === "timeBonus" && ` +${timeBonus}s par partie`
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                                    lineNumber: 1051,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1050,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 1016,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-end ml-4",
                                        children: [
                                            upgrade.unlocked && !isMaxed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold",
                                                children: canAfford ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-green-400",
                                                    children: [
                                                        currentCost,
                                                        " pts"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                                    lineNumber: 1069,
                                                    columnNumber: 27
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-400",
                                                    children: [
                                                        currentCost,
                                                        " pts"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                                    lineNumber: 1073,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1067,
                                                columnNumber: 23
                                            }, this),
                                            isMaxed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold text-purple-400",
                                                children: "MAX"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1081,
                                                columnNumber: 23
                                            }, this),
                                            !upgrade.unlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold text-yellow-400",
                                                children: "🔒"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1087,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 1065,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SnakeGame.tsx",
                                lineNumber: 1015,
                                columnNumber: 17
                            }, this)
                        }, upgrade.id, false, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 997,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/SnakeGame.tsx",
                    lineNumber: 989,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-t border-gray-700 pt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onPlayGame,
                                className: `px-8 py-3 rounded-lg font-bold text-lg transition-colors ${gameState === "idle" || gameState === "gameOver" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`,
                                children: gameState === "idle" ? "🎮 Commencer à jouer" : gameState === "gameOver" ? "🔄 Rejouer" : "🎮 Retourner au jeu"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SnakeGame.tsx",
                                lineNumber: 1101,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 1100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 grid grid-cols-3 gap-4 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-700 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Valeur des pommes"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 1120,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xl font-bold text-red-400",
                                            children: [
                                                "+",
                                                appleValue
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 1121,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 1119,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-700 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Bonus temps"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 1126,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xl font-bold text-yellow-400",
                                            children: [
                                                "+",
                                                timeBonus,
                                                "s"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 1127,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 1125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-700 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Taille de la grille"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 1132,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xl font-bold text-blue-400",
                                            children: [
                                                gridWidth,
                                                "x",
                                                gridHeight
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 1133,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 1131,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 1118,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SnakeGame.tsx",
                    lineNumber: 1099,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SnakeGame.tsx",
            lineNumber: 983,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SnakeGame.tsx",
        lineNumber: 982,
        columnNumber: 5
    }, this);
}
_c1 = UpgradeTree;
var _c, _c1;
__turbopack_context__.k.register(_c, "SnakeGame");
__turbopack_context__.k.register(_c1, "UpgradeTree");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_b9e4b0ed._.js.map