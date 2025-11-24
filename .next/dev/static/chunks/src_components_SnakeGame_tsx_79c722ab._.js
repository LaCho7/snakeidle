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
    const [blueFruit, setBlueFruit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // Position du fruit bleu
    const [isBlueFruitActive, setIsBlueFruitActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Pour afficher le fruit bleu
    // État du mode développeur
    const [isDevMode, setIsDevMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [devPassword, setDevPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [devPoints, setDevPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
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
    const [speedBonus, setSpeedBonus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0); // Bonus de vitesse en pourcentage
    const [blueFruitBonus, setBlueFruitBonus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0); // Bonus du fruit bleu
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
        },
        {
            id: "speedBonus",
            name: "Vitesse",
            description: "Augmente la vitesse du serpent de 5%",
            baseCost: 100,
            level: 0,
            maxLevel: 15,
            unlocked: false,
            requiredLevel: "gridSize",
            requiredLevelValue: 1,
            position: {
                x: 1,
                y: 5
            },
            effect: {
                "SnakeGame.useState": ()=>{}
            }["SnakeGame.useState"]
        },
        {
            id: "blueFruit",
            name: "Fruit Bleu",
            description: "Ajoute 1 PV et 2 secondes par partie",
            baseCost: 200,
            level: 0,
            maxLevel: 10,
            unlocked: false,
            requiredLevel: "gridSize",
            requiredLevelValue: 2,
            position: {
                x: 3,
                y: 3
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
                                } else if (upgradeId === "speedBonus") {
                                    setSpeedBonus(newLevel * 5); // +5% de vitesse par niveau
                                } else if (upgradeId === "blueFruit") {
                                    setBlueFruitBonus(newLevel * 1); // +1 PV par niveau
                                    setTimeBonus({
                                        "SnakeGame.useCallback[buyUpgrade].updatedUpgrades": (prev)=>prev + newLevel * 2
                                    }["SnakeGame.useCallback[buyUpgrade].updatedUpgrades"]); // +2 secondes par niveau
                                    setIsBlueFruitActive(true); // Activer l'affichage du fruit bleu
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
                        requiredLevel: u.requiredLevel,
                        requiredLevelValue: u.requiredLevelValue,
                        position: u.position,
                        effect: ({
                            "SnakeGame.useCallback[saveUpgrades].currentUpgradesData": ()=>{}
                        })["SnakeGame.useCallback[saveUpgrades].currentUpgradesData"]
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
                    speedBonus,
                    blueFruitBonus,
                    isBlueFruitActive,
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
                                setSpeedBonus(data.gameState.speedBonus || 0);
                                setBlueFruitBonus(data.gameState.blueFruitBonus || 0);
                                setIsBlueFruitActive(data.gameState.isBlueFruitActive || false);
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
            setSpeedBonus(0);
            setBlueFruitBonus(0);
            setIsBlueFruitActive(false);
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
                        } else if (baseUpgrade.id === "speedBonus") {
                            setSpeedBonus(savedUpgrade.level * 5);
                        } else if (baseUpgrade.id === "blueFruit") {
                            setBlueFruitBonus(savedUpgrade.level * 1);
                            setTimeBonus({
                                "SnakeGame.useCallback[applySavedUpgrades].newUpgrades": (prev)=>prev + savedUpgrade.level * 2
                            }["SnakeGame.useCallback[applySavedUpgrades].newUpgrades"]);
                            setIsBlueFruitActive(true);
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
    // Fonctions du mode développeur
    const toggleDevMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SnakeGame.useCallback[toggleDevMode]": ()=>{
            if (isDevMode) {
                setIsDevMode(false);
                setDevPassword("");
            } else {
                if (devPassword === "dev") {
                    setIsDevMode(true);
                    alert("Mode développeur activé !");
                } else {
                    alert("Mot de passe incorrect !");
                }
            }
        }
    }["SnakeGame.useCallback[toggleDevMode]"], [
        isDevMode,
        devPassword
    ]);
    const addDevPoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SnakeGame.useCallback[addDevPoints]": ()=>{
            const points = parseInt(devPoints);
            if (!isNaN(points) && points > 0) {
                setTotalPoints({
                    "SnakeGame.useCallback[addDevPoints]": (prev)=>prev + points
                }["SnakeGame.useCallback[addDevPoints]"]);
                setDevPoints("");
                alert(`${points} points ajoutés !`);
            } else {
                alert("Veuillez entrer un nombre valide !");
            }
        }
    }["SnakeGame.useCallback[addDevPoints]"], [
        devPoints
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
    // Générer le fruit bleu (en plus de la pomme rouge)
    const generateBlueFruit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SnakeGame.useCallback[generateBlueFruit]": (currentSnake, foodPosition)=>{
            if (!isBlueFruitActive) return null;
            // Créer une liste de toutes les positions possibles en excluant le serpent ET la pomme rouge
            const availablePositions = [];
            for(let x = 0; x < gridWidth; x++){
                for(let y = 0; y < gridHeight; y++){
                    const isOccupied = currentSnake.some({
                        "SnakeGame.useCallback[generateBlueFruit].isOccupied": (segment)=>segment.x === x && segment.y === y
                    }["SnakeGame.useCallback[generateBlueFruit].isOccupied"]);
                    const isFood = foodPosition.x === x && foodPosition.y === y;
                    if (!isOccupied && !isFood) {
                        availablePositions.push({
                            x,
                            y
                        });
                    }
                }
            }
            if (availablePositions.length === 0) return null;
            // Choisir une position aléatoire parmi les positions disponibles
            const randomIndex = Math.floor(Math.random() * availablePositions.length);
            return availablePositions[randomIndex];
        }
    }["SnakeGame.useCallback[generateBlueFruit]"], [
        gridWidth,
        gridHeight,
        isBlueFruitActive
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
        const foodPosition = newFood || {
            x: 2,
            y: 2
        };
        setFood(foodPosition);
        // Générer le fruit bleu si activé
        const newBlueFruit = isMounted ? generateBlueFruit(initialSnake, foodPosition) : null;
        setBlueFruit(newBlueFruit);
        setCurrentPoints(0);
        setHealthPoints(10 + healthBonus + blueFruitBonus); // Réinitialiser les PV avec le bonus + fruit bleu
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
            // Vérifier si le snake mange la nourriture (pomme rouge)
            let ateFood = false;
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
                ateFood = true;
            }
            // Vérifier si le snake mange le fruit bleu
            let ateBlueFruit = false;
            if (blueFruit && head.x === blueFruit.x && head.y === blueFruit.y) {
                setCurrentPoints({
                    "SnakeGame.useCallback[moveSnake]": (prev)=>prev + appleValue * 2
                }["SnakeGame.useCallback[moveSnake]"]); // Double les points
                setHealthPoints({
                    "SnakeGame.useCallback[moveSnake]": (prev)=>{
                        const newHP = prev + 1; // +1 PV au lieu de -1
                        return newHP;
                    }
                }["SnakeGame.useCallback[moveSnake]"]); // Le serpent gagne 1 PV avec le fruit bleu
                const newBlueFruitPosition = generateBlueFruit(newSnake, food);
                setBlueFruit(newBlueFruitPosition);
                ateBlueFruit = true;
            }
            // Si le serpent n'a rien mangé, il rétrécit
            if (!ateFood && !ateBlueFruit) {
                newSnake.pop();
            }
            snakeRef.current = newSnake;
            setSnake(newSnake);
        }
    }["SnakeGame.useCallback[moveSnake]"], [
        food,
        blueFruit,
        gameState,
        generateRandomFood,
        generateBlueFruit,
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
            // Calculer la vitesse avec le bonus (plus le bonus est élevé, plus l'intervalle est court)
            const speedMultiplier = 1 - speedBonus / 100; // 5% par niveau = 0.05 par niveau
            const adjustedSpeed = Math.max(100, INITIAL_SPEED * speedMultiplier); // Minimum 100ms
            const gameInterval = setInterval(moveSnake, adjustedSpeed);
            return ({
                "SnakeGame.useEffect": ()=>clearInterval(gameInterval)
            })["SnakeGame.useEffect"];
        }
    }["SnakeGame.useEffect"], [
        gameState,
        moveSnake,
        speedBonus
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
    // Gérer le fruit bleu quand le mode est activé/désactivé
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SnakeGame.useEffect": ()=>{
            if (isBlueFruitActive && gameState === "playing" && !blueFruit) {
                // Générer le fruit bleu si le mode est activé et qu'il n'y en a pas
                const newBlueFruit = generateBlueFruit(snake, food);
                setBlueFruit(newBlueFruit);
            } else if (!isBlueFruitActive && blueFruit) {
                // Retirer le fruit bleu si le mode est désactivé
                setBlueFruit(null);
            }
        }
    }["SnakeGame.useEffect"], [
        isBlueFruitActive,
        gameState,
        blueFruit,
        snake,
        food,
        generateBlueFruit
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
                        lineNumber: 826,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-400",
                        children: "Chargement du jeu..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 827,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SnakeGame.tsx",
                lineNumber: 825,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/SnakeGame.tsx",
            lineNumber: 824,
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
                        lineNumber: 837,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 text-center",
                        children: !isDevMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    value: devPassword,
                                    onChange: (e)=>setDevPassword(e.target.value),
                                    placeholder: "Mot de passe dev",
                                    className: "px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none",
                                    onKeyPress: (e)=>e.key === 'Enter' && toggleDevMode()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 843,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: toggleDevMode,
                                    className: "px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors",
                                    children: "Activer Mode Dev"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 851,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 842,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-purple-900 bg-opacity-50 p-3 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center items-center gap-2 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-purple-300 font-semibold",
                                            children: "Mode Développeur Activé"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 861,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: toggleDevMode,
                                            className: "px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm",
                                            children: "Désactiver"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 862,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 860,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: devPoints,
                                            onChange: (e)=>setDevPoints(e.target.value),
                                            placeholder: "Nombre de points",
                                            className: "px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none w-32",
                                            onKeyPress: (e)=>e.key === 'Enter' && addDevPoints()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 870,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: addDevPoints,
                                            className: "px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors",
                                            children: "Ajouter Points"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 878,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 869,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 859,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 840,
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
                                    lineNumber: 892,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("upgrades"),
                                    className: `px-6 py-2 rounded-md font-semibold transition-colors ml-2 ${activeTab === "upgrades" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`,
                                    children: "🚀 AMÉLIORATIONS"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 902,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 891,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 890,
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
                                            lineNumber: 919,
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
                                            lineNumber: 920,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 918,
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
                                            lineNumber: 927,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-green-400",
                                            children: currentPoints
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 928,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 926,
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
                                            lineNumber: 933,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-yellow-400",
                                            children: totalPoints
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 934,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 932,
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
                                            lineNumber: 939,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-purple-400",
                                            children: highScore
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 940,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 938,
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
                                            lineNumber: 947,
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
                                            lineNumber: 948,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 944,
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
                                            lineNumber: 955,
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
                                            lineNumber: 956,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 954,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 917,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 916,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SnakeGame.tsx",
                lineNumber: 836,
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
                                        lineNumber: 978,
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
                                            className: "w-12 h-12 opacity-90",
                                            onError: (e)=>{
                                                console.error("Error loading apple.png");
                                                e.currentTarget.style.display = "none";
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 994,
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
                                            lineNumber: 1003,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 985,
                                    columnNumber: 15
                                }, this),
                                blueFruit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute flex items-center justify-center",
                                    style: {
                                        left: `${blueFruit.x * CELL_SIZE}px`,
                                        top: `${blueFruit.y * CELL_SIZE}px`,
                                        width: `${CELL_SIZE}px`,
                                        height: `${CELL_SIZE}px`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/Graphics/blue_apple.png",
                                            alt: "Blue Fruit",
                                            className: "w-12 h-12 opacity-90",
                                            onError: (e)=>{
                                                console.error("Error loading blue_apple.png");
                                                e.currentTarget.style.display = "none";
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 1021,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 bg-blue-500 rounded-full",
                                            style: {
                                                display: "none"
                                            },
                                            id: "blue-fruit-fallback"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 1030,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 1012,
                                    columnNumber: 17
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
                                            lineNumber: 1050,
                                            columnNumber: 19
                                        }, this)
                                    }, `snake-${index}`, false, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 1040,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 969,
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
                                        lineNumber: 1063,
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
                                        lineNumber: 1070,
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
                                        lineNumber: 1071,
                                        columnNumber: 19
                                    }, this),
                                    timeLeft === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-blue-300 mb-4",
                                        children: "⏰ Les 30 secondes sont terminées"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 1075,
                                        columnNumber: 21
                                    }, this),
                                    currentPoints === gridWidth * gridHeight - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-green-300 mb-4",
                                        children: "🎉 Vous avez rempli tout le tableau!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 1080,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SnakeGame.tsx",
                                lineNumber: 1062,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 1061,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SnakeGame.tsx",
                    lineNumber: 968,
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
                speedBonus: speedBonus,
                blueFruitBonus: blueFruitBonus,
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
                lineNumber: 1092,
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
                        lineNumber: 1122,
                        columnNumber: 13
                    }, this),
                    gameState === "gameOver" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: startGame,
                        className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors",
                        children: "Rejouer"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 1131,
                        columnNumber: 13
                    }, this),
                    gameState === "playing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-400",
                        children: "Utilisez les flèches ou Z/Q/S/D pour contrôler le snake"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 1140,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SnakeGame.tsx",
                lineNumber: 1120,
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
                                lineNumber: 1151,
                                columnNumber: 16
                            }, this),
                            " Ramassez les pommes pour gagner des points"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 1150,
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
                                lineNumber: 1155,
                                columnNumber: 16
                            }, this),
                            " Chaque pomme vaut ",
                            appleValue,
                            " point",
                            appleValue > 1 ? "s" : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 1154,
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
                                lineNumber: 1159,
                                columnNumber: 15
                            }, this),
                            " Vous avez 30 secondes par partie!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 1158,
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
                                lineNumber: 1162,
                                columnNumber: 16
                            }, this),
                            " Vos points sont conservés même après la mort!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 1161,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "🚀 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Améliorations:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SnakeGame.tsx",
                                lineNumber: 1166,
                                columnNumber: 16
                            }, this),
                            " Utilisez vos points pour débloquer des bonus permanents!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 1165,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SnakeGame.tsx",
                lineNumber: 1149,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SnakeGame.tsx",
        lineNumber: 834,
        columnNumber: 5
    }, this);
}
_s(SnakeGame, "ZNDz3j3wfJ+rdxjQZcaXcjlTZlc=");
_c = SnakeGame;
// Composant UpgradeTree pour afficher l'arbre d'améliorations
function UpgradeTree({ upgrades, totalPoints, currentPoints, appleValue, gridWidth, gridHeight, timeBonus, speedBonus, blueFruitBonus, onBuyUpgrade, onPlayGame, gameState, saveUpgrades, loadUpgrades, applySavedUpgrades, savedUpgrades, healthBonus }) {
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
                    lineNumber: 1224,
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
                                                        lineNumber: 1258,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-white",
                                                        children: upgrade.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                                        lineNumber: 1269,
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
                                                        lineNumber: 1270,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1257,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-400 mb-2",
                                                children: upgrade.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1275,
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
                                                lineNumber: 1280,
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
                                                        upgrade.id === "timeBonus" && ` +${timeBonus}s par partie`,
                                                        upgrade.id === "speedBonus" && ` ${speedBonus}% de vitesse`,
                                                        upgrade.id === "blueFruit" && (blueFruitBonus > 0 ? ` +${blueFruitBonus} PV, +${blueFruitBonus * 2}s par partie` : " Pas possédé")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                                    lineNumber: 1291,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1290,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 1256,
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
                                                    lineNumber: 1315,
                                                    columnNumber: 27
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-400",
                                                    children: [
                                                        currentCost,
                                                        " pts"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                                    lineNumber: 1319,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1313,
                                                columnNumber: 23
                                            }, this),
                                            isMaxed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold text-purple-400",
                                                children: "MAX"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1327,
                                                columnNumber: 23
                                            }, this),
                                            !upgrade.unlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold text-yellow-400",
                                                children: "🔒"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1333,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 1311,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SnakeGame.tsx",
                                lineNumber: 1255,
                                columnNumber: 17
                            }, this)
                        }, upgrade.id, false, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 1237,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/SnakeGame.tsx",
                    lineNumber: 1229,
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
                                lineNumber: 1347,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 1346,
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
                                            lineNumber: 1366,
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
                                            lineNumber: 1367,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 1365,
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
                                            lineNumber: 1372,
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
                                            lineNumber: 1373,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 1371,
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
                                            lineNumber: 1378,
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
                                            lineNumber: 1379,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 1377,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SnakeGame.tsx",
                            lineNumber: 1364,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SnakeGame.tsx",
                    lineNumber: 1345,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SnakeGame.tsx",
            lineNumber: 1223,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SnakeGame.tsx",
        lineNumber: 1222,
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
]);

//# sourceMappingURL=src_components_SnakeGame_tsx_79c722ab._.js.map