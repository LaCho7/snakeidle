module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/components/SnakeGame.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SnakeGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const INITIAL_GRID_SIZE = 4;
const CELL_SIZE = 80;
const INITIAL_SPEED = 500; // ms between moves
function SnakeGame() {
    // État du jeu principal
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [totalPoints, setTotalPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentPoints, setCurrentPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [healthPoints, setHealthPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(10); // Points de vie du serpent
    const [healthBonus, setHealthBonus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0); // Bonus de PV des améliorations
    const [highScore, setHighScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(30); // 30 secondes
    const [baseTime, setBaseTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(30); // Temps de base pouvant être amélioré
    const pointsAddedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false); // Pour éviter le double comptage
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false); // Pour gérer l'hydratation
    // État du snake
    const [snake, setSnake] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            x: 1,
            y: 1
        }
    ]);
    const [direction, setDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("RIGHT");
    const [food, setFood] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
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
    const [gridWidth, setGridWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(4);
    const [gridHeight, setGridHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(4);
    // Références pour éviter les recréations de useEffect
    const directionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("RIGHT");
    const snakeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([
        {
            x: 1,
            y: 1
        }
    ]);
    // Synchroniser les références avec l'état
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        snakeRef.current = snake;
    }, [
        snake
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        directionRef.current = direction;
    }, [
        direction
    ]);
    // État des onglets et améliorations
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("game");
    const [appleValue, setAppleValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [timeBonus, setTimeBonus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0); // Bonus de temps additionnel
    const [savedUpgrades, setSavedUpgrades] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]); // Améliorations sauvegardées
    const [upgrades, setUpgrades] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
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
            effect: ()=>{}
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
            effect: ()=>{}
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
            effect: ()=>{}
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
            effect: ()=>{}
        }
    ]);
    // Gérer le montage du composant
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    }, []);
    // Vérifier les déverrouillages d'améliorations
    const checkUnlocks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((updatedUpgrades)=>{
        return updatedUpgrades.map((upgrade)=>{
            if (!upgrade.unlocked && upgrade.requiredLevel && upgrade.requiredLevelValue) {
                const requiredUpgrade = updatedUpgrades.find((u)=>u.id === upgrade.requiredLevel);
                if (requiredUpgrade && requiredUpgrade.level >= upgrade.requiredLevelValue) {
                    return {
                        ...upgrade,
                        unlocked: true
                    };
                }
            }
            return upgrade;
        });
    }, []);
    // Calculer le coût d'une amélioration en fonction de son niveau
    const getUpgradeCost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((baseCost, level)=>{
        return Math.floor(baseCost * Math.pow(1.5, level));
    }, []);
    // Acheter une amélioration
    const buyUpgrade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((upgradeId)=>{
        setUpgrades((prevUpgrades)=>{
            const upgrade = prevUpgrades.find((u)=>u.id === upgradeId);
            if (!upgrade || upgrade.level >= upgrade.maxLevel || !upgrade.unlocked) return prevUpgrades;
            const currentCost = getUpgradeCost(upgrade.baseCost, upgrade.level);
            // Vérifier si on a assez de points dans le total accumulé uniquement
            if (totalPoints < currentCost) return prevUpgrades;
            // Appliquer l'amélioration d'abord
            const updatedUpgrades = prevUpgrades.map((u)=>{
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
            });
            // Vérifier les déverrouillages
            return checkUnlocks(updatedUpgrades);
        });
        // Déduire les points du total accumulé uniquement (après la mise à jour)
        const upgrade = upgrades.find((u)=>u.id === upgradeId);
        if (upgrade) {
            const currentCost = getUpgradeCost(upgrade.baseCost, upgrade.level);
            setTotalPoints((prev)=>Math.max(0, prev - currentCost));
        }
    }, [
        totalPoints,
        getUpgradeCost,
        gameState,
        checkUnlocks
    ]);
    // Sauvegarder les améliorations actuelles
    const saveUpgrades = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const currentUpgradesData = upgrades.map((u)=>({
                id: u.id,
                name: u.name,
                description: u.description,
                baseCost: u.baseCost,
                level: u.level,
                maxLevel: u.maxLevel,
                unlocked: u.unlocked,
                position: u.position
            }));
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
    }, [
        upgrades,
        appleValue,
        timeBonus,
        gridWidth,
        gridHeight,
        totalPoints,
        highScore
    ]);
    // Charger les améliorations depuis un fichier
    const loadUpgrades = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e)=>{
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
        };
        reader.readAsText(file);
    }, []);
    // Appliquer les améliorations sauvegardées
    const applySavedUpgrades = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
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
        const newUpgrades = upgrades.map((baseUpgrade)=>{
            const savedUpgrade = savedUpgrades.find((s)=>s.id === baseUpgrade.id);
            if (savedUpgrade) {
                const levelDiff = savedUpgrade.level - baseUpgrade.level;
                // Appliquer les effets en fonction du niveau
                if (baseUpgrade.id === "appleValue") {
                    setAppleValue((prev)=>prev + levelDiff);
                } else if (baseUpgrade.id === "healthBonus") {
                    setHealthBonus((prev)=>prev + levelDiff);
                } else if (baseUpgrade.id === "timeBonus") {
                    setTimeBonus((prev)=>prev + savedUpgrade.level * 2);
                } else if (baseUpgrade.id === "gridSize") {
                    const dimensions = getGridDimensions(savedUpgrade.level);
                    setGridWidth(dimensions.width);
                    setGridHeight(dimensions.height);
                }
                return savedUpgrade;
            }
            return baseUpgrade;
        });
        setUpgrades(newUpgrades);
        setSavedUpgrades([]); // Vider les améliorations sauvegardées après application
        alert("Améliorations appliquées avec succès!");
    }, [
        savedUpgrades,
        upgrades
    ]);
    // Générer une position aléatoire pour la nourriture
    const generateRandomFood = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((currentSnake)=>{
        // Créer une liste de toutes les positions possibles
        const availablePositions = [];
        for(let x = 0; x < gridWidth; x++){
            for(let y = 0; y < gridHeight; y++){
                const isOccupied = currentSnake.some((segment)=>segment.x === x && segment.y === y);
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
    }, [
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
    const moveSnake = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
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
        if (segmentsToCheck.some((segment)=>segment.x === head.x && segment.y === head.y)) {
            setGameState("gameOver");
            return;
        }
        newSnake.unshift(head);
        // Vérifier si le snake mange la nourriture
        if (head.x === food.x && head.y === food.y) {
            setCurrentPoints((prev)=>prev + appleValue);
            setHealthPoints((prev)=>{
                const newHP = prev - 1;
                if (newHP <= 0) {
                    setGameState("gameOver");
                }
                return newHP;
            }); // Le serpent perd 1 PV en mangeant une pomme
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
    }, [
        food,
        gameState,
        generateRandomFood,
        gridWidth,
        gridHeight,
        appleValue
    ]);
    // Gérer la fin de partie
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (gameState === "gameOver" && !pointsAddedRef.current) {
            // currentPoints contient déjà le score avec la valeur des pommes appliquée
            setTotalPoints((prev)=>prev + currentPoints);
            if (currentPoints > highScore) {
                setHighScore(currentPoints);
            }
            pointsAddedRef.current = true; // Marquer que les points ont été ajoutés
        }
    }, [
        gameState,
        currentPoints,
        highScore
    ]);
    // Game loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (gameState !== "playing") return;
        const gameInterval = setInterval(moveSnake, INITIAL_SPEED);
        return ()=>clearInterval(gameInterval);
    }, [
        gameState,
        moveSnake
    ]);
    // Chronomètre
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (gameState !== "playing") return;
        const timerInterval = setInterval(()=>{
            setTimeLeft((prev)=>{
                if (prev <= 1) {
                    setGameState("gameOver");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000); // 1 seconde
        return ()=>clearInterval(timerInterval);
    }, [
        gameState
    ]);
    // Vérifier si un changement de direction causerait une collision
    const wouldCollideWithSelf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newDirection)=>{
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
        return segmentsToCheck.some((segment)=>segment.x === head.x && segment.y === head.y);
    }, []);
    // Gérer les contrôles clavier
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyPress = (e)=>{
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
        };
        window.addEventListener("keydown", handleKeyPress);
        return ()=>window.removeEventListener("keydown", handleKeyPress);
    }, [
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold mb-4",
                        children: "Snake Idle"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 670,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-4xl mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-center mb-4",
                        children: "Snake Idle"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 681,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-800 p-1 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("game"),
                                    className: `px-6 py-2 rounded-md font-semibold transition-colors ${activeTab === "game" ? "bg-green-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`,
                                    children: "🎮 JEU"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                    lineNumber: 686,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-6 gap-4 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-800 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "PV"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 713,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-800 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Points actuels"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 721,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-800 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Total accumulé"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 727,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-800 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Meilleur score"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 733,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `bg-gray-800 p-4 rounded-lg ${timeLeft <= 10 ? "border-2 border-red-500" : ""}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Temps restant"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 741,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-800 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Valeur pomme"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 749,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            activeTab === "game" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative bg-gray-800 p-4 rounded-lg shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative grid bg-gray-700 border-4 border-gray-600",
                            style: {
                                gridTemplateColumns: `repeat(${gridWidth}, ${CELL_SIZE}px)`,
                                gridTemplateRows: `repeat(${gridHeight}, ${CELL_SIZE}px)`
                            },
                            children: [
                                Array.from({
                                    length: gridWidth * gridHeight
                                }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border border-gray-600 bg-gray-750"
                                    }, `cell-${index}`, false, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 772,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute flex items-center justify-center",
                                    style: {
                                        left: `${food.x * CELL_SIZE}px`,
                                        top: `${food.y * CELL_SIZE}px`,
                                        width: `${CELL_SIZE}px`,
                                        height: `${CELL_SIZE}px`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                snake.map((segment, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute flex items-center justify-center",
                                        style: {
                                            left: `${segment.x * CELL_SIZE}px`,
                                            top: `${segment.y * CELL_SIZE}px`,
                                            width: `${CELL_SIZE}px`,
                                            height: `${CELL_SIZE}px`
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                        gameState === "gameOver" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold mb-2 text-red-400",
                                        children: timeLeft === 0 ? "Temps écoulé!" : currentPoints === gridWidth * gridHeight - 1 ? "Parfait! Tableau rempli!" : "Game Over!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 829,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                    timeLeft === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-blue-300 mb-4",
                                        children: "⏰ Les 30 secondes sont terminées"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                        lineNumber: 841,
                                        columnNumber: 21
                                    }, this),
                                    currentPoints === gridWidth * gridHeight - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            activeTab === "upgrades" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UpgradeTree, {
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
            activeTab === "game" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 text-center",
                children: [
                    gameState === "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: startGame,
                        className: "bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors",
                        children: "Commencer à jouer"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 886,
                        columnNumber: 13
                    }, this),
                    gameState === "gameOver" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: startGame,
                        className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors",
                        children: "Rejouer"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SnakeGame.tsx",
                        lineNumber: 895,
                        columnNumber: 13
                    }, this),
                    gameState === "playing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            activeTab === "game" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 text-center text-sm text-gray-500 max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2",
                        children: [
                            "🎮 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2",
                        children: [
                            "🍎 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2",
                        children: [
                            "⏰ ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2",
                        children: [
                            "💎 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "🚀 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
// Composant UpgradeTree pour afficher l'arbre d'améliorations
function UpgradeTree({ upgrades, totalPoints, currentPoints, appleValue, gridWidth, gridHeight, timeBonus, onBuyUpgrade, onPlayGame, gameState, saveUpgrades, loadUpgrades, applySavedUpgrades, savedUpgrades, healthBonus }) {
    const getUpgradeCost = (baseCost, level)=>{
        return Math.floor(baseCost * Math.pow(1.5, level));
    };
    const getAvailablePoints = ()=>{
        return totalPoints;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-800 rounded-lg p-8 shadow-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-center mb-8 text-purple-400",
                    children: "Arbre d'Améliorations"
                }, void 0, false, {
                    fileName: "[project]/src/components/SnakeGame.tsx",
                    lineNumber: 984,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 mb-16",
                    children: upgrades.map((upgrade)=>{
                        const currentCost = getUpgradeCost(upgrade.baseCost, upgrade.level);
                        const availablePoints = getAvailablePoints();
                        const canAfford = availablePoints >= currentCost;
                        const isMaxed = upgrade.level >= upgrade.maxLevel;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `p-4 rounded-lg border-2 transition-all cursor-pointer ${!upgrade.unlocked ? "bg-gray-900 border-gray-700 opacity-50" : isMaxed ? "bg-purple-900 border-purple-600" : canAfford ? "bg-gray-800 border-green-600 hover:bg-gray-750" : "bg-gray-800 border-gray-700 opacity-75"}`,
                            onClick: ()=>upgrade.unlocked && !isMaxed && canAfford && onBuyUpgrade(upgrade.id),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-bold text-gray-300",
                                                        children: upgrade.id === "appleValue" ? "POMMES" : upgrade.id === "healthBonus" ? "PV" : upgrade.id === "gridSize" ? "GRILLE" : upgrade.id === "timeBonus" ? "TEMPS" : "BONUS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                                        lineNumber: 1018,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-white",
                                                        children: upgrade.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SnakeGame.tsx",
                                                        lineNumber: 1029,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-400 mb-2",
                                                children: upgrade.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1035,
                                                columnNumber: 21
                                            }, this),
                                            !upgrade.unlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 mt-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-end ml-4",
                                        children: [
                                            upgrade.unlocked && !isMaxed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold",
                                                children: canAfford ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-green-400",
                                                    children: [
                                                        currentCost,
                                                        " pts"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/SnakeGame.tsx",
                                                    lineNumber: 1069,
                                                    columnNumber: 27
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            isMaxed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-lg font-bold text-purple-400",
                                                children: "MAX"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SnakeGame.tsx",
                                                lineNumber: 1081,
                                                columnNumber: 23
                                            }, this),
                                            !upgrade.unlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-t border-gray-700 pt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 grid grid-cols-3 gap-4 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-700 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Valeur des pommes"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 1120,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-700 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Bonus temps"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 1126,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-700 p-4 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Taille de la grille"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SnakeGame.tsx",
                                            lineNumber: 1132,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__01728547._.js.map