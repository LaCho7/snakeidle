"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Types pour le jeu
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };
type GameState = "playing" | "gameOver" | "idle";

// Types pour la nourriture
type FoodType = "apple" | "goldenApple" | "blueFruit";
type FoodItem = {
  position: Position;
  type: FoodType;
};

// Types pour la bombe
type BombState = "active" | "exploded" | "disarmed";
type Bomb = {
  position: Position;
  timer: number;
  maxTimer: number;
  state: BombState;
};

// Types pour les bonus actifs
type ActiveBonus = {
  type: "doubleScore" | "permanentPoints" | "extraHealth" | "extraTime";
  value: number;
  duration?: number; // Pour les bonus temporaires
  permanent?: boolean; // Pour les bonus permanents
};

// Types pour les améliorations
type Upgrade = {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  requiredLevel?: string; // ID de l'amélioration requise
  requiredLevelValue?: number; // Niveau requis
  effect: () => void;
  position?: { x: number; y: number }; // Position dans l'arbre
};

const INITIAL_GRID_SIZE = 4;
const CELL_SIZE = 80;
const INITIAL_SPEED = 500; // ms between moves

export default function SnakeGame() {
  // État du jeu principal
  const [gameState, setGameState] = useState<GameState>("idle");
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [healthPoints, setHealthPoints] = useState(10); // Points de vie du serpent
  const [healthBonus, setHealthBonus] = useState(0); // Bonus de PV des améliorations
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 secondes
  const [baseTime, setBaseTime] = useState(30); // Temps de base pouvant être amélioré
  const pointsAddedRef = useRef(false); // Pour éviter le double comptage
  const [isMounted, setIsMounted] = useState(false); // Pour gérer l'hydratation

  // État du snake
  const [snake, setSnake] = useState<Position[]>([{ x: 1, y: 1 }]);
  const [direction, setDirection] = useState<Direction>("RIGHT");

  // État de la nourriture (remplace food et blueFruit)
  const [foodItems, setFoodItems] = useState<FoodItem[]>([{ position: { x: 2, y: 2 }, type: "apple" }]);

  // États pour les améliorations
  const [goldenAppleLevel, setGoldenAppleLevel] = useState(0); // Niveau de l'amélioration pomme d'or
  const [bombSystemLevel, setBombSystemLevel] = useState(0); // Niveau de l'amélioration système de bombe

  // État de la bombe
  const [bomb, setBomb] = useState<Bomb | null>(null);
  const [bombSpawnTimer, setBombSpawnTimer] = useState(0); // Timer avant apparition des bombes (secondes)

  // États pour les bonus actifs
  const [activeBonuses, setActiveBonuses] = useState<ActiveBonus[]>([]);
  const [isDoubleScoreActive, setIsDoubleScoreActive] = useState(false);
  const [permanentPointsBonus, setPermanentPointsBonus] = useState(0); // +0.1% par point

  // État du multiplicateur de pomme d'or
  const [goldenAppleMultiplier, setGoldenAppleMultiplier] = useState(0); // Nombre de pommes bonus restantes (0-3)

  // Anciens états maintenus pour compatibilité
  const [food, setFood] = useState<Position>({ x: 2, y: 2 }); // Position de la pomme rouge (compatibilité)
  const [blueFruit, setBlueFruit] = useState<Position | null>(null); // Position du fruit bleu
  const [isBlueFruitActive, setIsBlueFruitActive] = useState(false); // Pour afficher le fruit bleu

  // État du mode développeur
  const [isDevMode, setIsDevMode] = useState(false);
  const [devPassword, setDevPassword] = useState("");
  const [devPoints, setDevPoints] = useState("");

  // Fonction pour calculer la taille de la grille selon la progression
  const getGridDimensions = (level: number) => {
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

    return { width, height };
  };

  // État des dimensions de grille (séparées pour largeur/hauteur)
  const [gridWidth, setGridWidth] = useState(4);
  const [gridHeight, setGridHeight] = useState(4);

  // Références pour éviter les recréations de useEffect
  const directionRef = useRef<Direction>("RIGHT");
  const snakeRef = useRef<Position[]>([{ x: 1, y: 1 }]);

  // Synchroniser les références avec l'état
  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // État des onglets et améliorations
  const [activeTab, setActiveTab] = useState<"game" | "upgrades">("game");
  const [appleValue, setAppleValue] = useState(1);
  const [timeBonus, setTimeBonus] = useState(0); // Bonus de temps additionnel
  const [speedBonus, setSpeedBonus] = useState(0); // Bonus de vitesse en pourcentage
  const [blueFruitBonus, setBlueFruitBonus] = useState(0); // Bonus du fruit bleu
  const [savedUpgrades, setSavedUpgrades] = useState<Upgrade[]>([]); // Améliorations sauvegardées
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    {
      id: "appleValue",
      name: "Valeur des Pommes",
      description: "Augmente la valeur de chaque pomme récoltée",
      baseCost: 10,
      level: 0,
      maxLevel: 20,
      unlocked: true,
      position: { x: 1, y: 1 },
      effect: () => {},
    },
    {
      id: "healthBonus",
      name: "Points de Vie",
      description: "Augmente les PV de départ du serpent",
      baseCost: 10,
      level: 0,
      maxLevel: 20,
      unlocked: true,
      position: { x: 1, y: 3 },
      effect: () => {},
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
      position: { x: -1, y: 1 },
      effect: () => {},
    },
    {
      id: "gridSize",
      name: "Taille de la Grille",
      description: "Agrandit le terrain de jeu",
      baseCost: 25,
      level: 0,
      maxLevel: 6, // 4x4 -> 5x5 -> 6x6 -> 7x7 -> 8x8 -> 9x9 -> 10x10
      unlocked: false,
      requiredLevel: "appleValue",
      requiredLevelValue: 3,
      position: { x: 3, y: 1 },
      effect: () => {},
    },
    {
      id: "speedBonus",
      name: "Vitesse",
      description: "Augmente la vitesse du serpent de 5%",
      baseCost: 100,
      level: 0,
      maxLevel: 15,
      unlocked: false,
      requiredLevel: "healthBonus",
      requiredLevelValue: 5, // Débloqué quand les PV de départ atteignent le niveau 5
      position: { x: 1, y: 5 },
      effect: () => {},
    },
    {
      id: "blueFruit",
      name: "Fruit Bleu",
      description: "Active le fruit bleu. Effets : +1 PV, +2s temps/partie, 0.5x points (vs pomme rouge)",
      baseCost: 200,
      level: 0,
      maxLevel: 10,
      unlocked: false,
      requiredLevel: "gridSize",
      requiredLevelValue: 2, // Débloqué à 6x6
      position: { x: 3, y: 3 },
      effect: () => {},
    },
    {
      id: "goldenApple",
      name: "Pomme d'Or",
      description: "1% de chance par niveau d'apparaître (valeur 10x normale)",
      baseCost: 500,
      level: 0,
      maxLevel: 100,
      unlocked: false,
      requiredLevel: "gridSize",
      requiredLevelValue: 4, // Débloqué à terrain 7x7 (gridSize niveau 4)
      position: { x: 5, y: 3 },
      effect: () => {},
    },
    {
      id: "bombSystem",
      name: "Système Bombe",
      description: "Place des bombes explosives. Apparaissent après 5s de jeu. Si touchées : -75% PV. Si elles explosent seules : bonus aléatoire parmi :\n• +0.1% permanent points/pomme\n• Double score 30s\n• +1 PV permanent\n• +10s temps de jeu",
      baseCost: 1000,
      level: 0,
      maxLevel: 10,
      unlocked: false,
      requiredLevel: "gridSize",
      requiredLevelValue: 3, // Débloqué à terrain 6x6 (gridSize niveau 3)
      position: { x: 5, y: 5 },
      effect: () => {},
    },
  ]);

  // Charger les données depuis localStorage au montage
  useEffect(() => {
    // S'assurer qu'on est côté client
    if (typeof window === 'undefined') return;

    const loadGameState = () => {
      try {
        const savedState = localStorage.getItem('snakeGameState');
        if (savedState) {
          const state = JSON.parse(savedState);

          // Restaurer les améliorations
          if (state.upgrades) {
            setUpgrades(state.upgrades);
          }

          // Restaurer les états du jeu
          if (state.gameState) {
            setTotalPoints(state.gameState.totalPoints || 0);
            setHighScore(state.gameState.highScore || 0);
            setAppleValue(state.gameState.appleValue || 1);
            setHealthBonus(state.gameState.healthBonus || 0);
            setTimeBonus(state.gameState.timeBonus || 0);
            setSpeedBonus(state.gameState.speedBonus || 0);
            setBlueFruitBonus(state.gameState.blueFruitBonus || 0);
            setIsBlueFruitActive(state.gameState.isBlueFruitActive || false);
            setGoldenAppleLevel(state.gameState.goldenAppleLevel || 0);
            setBombSystemLevel(state.gameState.bombSystemLevel || 0);
            setPermanentPointsBonus(state.gameState.permanentPointsBonus || 0);
            setGridWidth(state.gameState.gridWidth || INITIAL_GRID_SIZE);
            setGridHeight(state.gameState.gridHeight || INITIAL_GRID_SIZE);
            setGoldenAppleMultiplier(state.gameState.goldenAppleMultiplier || 0);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'état du jeu:', error);
      }
    };

    loadGameState();
    setIsMounted(true);

    // Initialiser la nourriture aléatoirement seulement côté client
    const initialSnake = [{ x: 1, y: 1 }];
    const newFood = generateRandomFood(initialSnake) || { x: 2, y: 2 };
    setFoodItems([{ position: newFood, type: "apple" }]);

    // Pour compatibilité avec l'ancien code
    setFood(newFood);
  }, []);

  // Sauvegarder l'état du jeu dans localStorage
  const saveGameState = useCallback(() => {
    // S'assurer qu'on est côté client
    if (typeof window === 'undefined') return;

    try {
      const gameState = {
        upgrades: upgrades,
        gameState: {
          totalPoints,
          highScore,
          appleValue,
          healthBonus,
          timeBonus,
          speedBonus,
          blueFruitBonus,
          isBlueFruitActive,
          goldenAppleLevel,
          bombSystemLevel,
          permanentPointsBonus,
          gridWidth,
          gridHeight,
          goldenAppleMultiplier,
        },
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('snakeGameState', JSON.stringify(gameState));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'état du jeu:', error);
    }
  }, [upgrades, totalPoints, highScore, appleValue, healthBonus, timeBonus, speedBonus, blueFruitBonus, isBlueFruitActive, goldenAppleLevel, bombSystemLevel, permanentPointsBonus, gridWidth, gridHeight, goldenAppleMultiplier]);

  // Sauvegarder automatiquement quand l'état change (mais pas trop fréquemment)
  useEffect(() => {
    // Sauvegarder seulement côté client et après le montage
    if (!isMounted || typeof window === 'undefined') return;

    const timeoutId = setTimeout(() => {
      saveGameState();
    }, 500); // Délai de 500ms pour éviter les sauvegardes excessives

    return () => clearTimeout(timeoutId);
  }, [totalPoints, upgrades, highScore, appleValue, healthBonus, timeBonus, speedBonus, blueFruitBonus, isBlueFruitActive, goldenAppleLevel, bombSystemLevel, permanentPointsBonus, gridWidth, gridHeight, goldenAppleMultiplier, isMounted]);

  // Vérifier les déverrouillages d'améliorations
  const checkUnlocks = useCallback((updatedUpgrades: Upgrade[]) => {
    return updatedUpgrades.map((upgrade) => {
      if (
        !upgrade.unlocked &&
        upgrade.requiredLevel &&
        upgrade.requiredLevelValue
      ) {
        const requiredUpgrade = updatedUpgrades.find(
          (u) => u.id === upgrade.requiredLevel,
        );
        if (
          requiredUpgrade &&
          requiredUpgrade.level >= upgrade.requiredLevelValue
        ) {
          return { ...upgrade, unlocked: true };
        }
      }
      return upgrade;
    });
  }, []);

  // Calculer le coût d'une amélioration en fonction de son niveau
  const getUpgradeCost = useCallback(
    (baseCost: number, level: number): number => {
      return Math.floor(baseCost * Math.pow(1.5, level));
    },
    [],
  );

  // Acheter une amélioration
  const buyUpgrade = useCallback(
    (upgradeId: string) => {
      setUpgrades((prevUpgrades) => {
        const upgrade = prevUpgrades.find((u) => u.id === upgradeId);
        if (!upgrade || upgrade.level >= upgrade.maxLevel || !upgrade.unlocked)
          return prevUpgrades;

        const currentCost = getUpgradeCost(upgrade.baseCost, upgrade.level);

        // Vérifier si on a assez de points dans le total accumulé uniquement
        if (totalPoints < currentCost) return prevUpgrades;

        // Appliquer l'amélioration d'abord
        const updatedUpgrades = prevUpgrades.map((u) => {
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
              setIsBlueFruitActive(true); // Activer l'affichage du fruit bleu
            } else if (upgradeId === "goldenApple") {
              setGoldenAppleLevel(newLevel);
            } else if (upgradeId === "bombSystem") {
              setBombSystemLevel(newLevel);
            }

            return { ...u, level: newLevel };
          }
          return u;
        });

        // Vérifier les déverrouillages
        return checkUnlocks(updatedUpgrades);
      });

      // Déduire les points du total accumulé uniquement (après la mise à jour)
      const upgrade = upgrades.find((u) => u.id === upgradeId);
      if (upgrade) {
        const currentCost = getUpgradeCost(upgrade.baseCost, upgrade.level);
        setTotalPoints((prev) => Math.max(0, prev - currentCost));
      }
    },
    [totalPoints, getUpgradeCost, gameState, checkUnlocks],
  );

  // Sauvegarder les améliorations actuelles
  const saveUpgrades = useCallback(() => {
    // S'assurer qu'on est côté client
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const currentUpgradesData = upgrades.map((u) => ({
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
      effect: () => {}, // Fonction vide placeholder pour la sauvegarde
    }));

    setSavedUpgrades(currentUpgradesData);

    // Créer et télécharger le fichier JSON
    const dataStr = JSON.stringify(
      {
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
          highScore,
        },
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    );

    try {
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `snake_idle_upgrades_${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
      alert('Erreur lors du téléchargement du fichier de sauvegarde');
    }
  }, [upgrades, appleValue, timeBonus, gridWidth, gridHeight, totalPoints, highScore]);

  // Charger les améliorations depuis un fichier
  const loadUpgrades = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);

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
      };
      reader.readAsText(file);
    },
    [],
  );

  // Appliquer les améliorations sauvegardées
  const applySavedUpgrades = useCallback(() => {
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
    const newUpgrades = upgrades.map((baseUpgrade) => {
      const savedUpgrade = savedUpgrades.find((s) => s.id === baseUpgrade.id);
      if (savedUpgrade) {
        const levelDiff = savedUpgrade.level - baseUpgrade.level;

        // Appliquer les effets en fonction du niveau
        if (baseUpgrade.id === "appleValue") {
          setAppleValue((prev) => prev + levelDiff);
        } else if (baseUpgrade.id === "healthBonus") {
          setHealthBonus((prev) => prev + levelDiff);
        } else if (baseUpgrade.id === "timeBonus") {
          setTimeBonus((prev) => prev + savedUpgrade.level * 2);
        } else if (baseUpgrade.id === "speedBonus") {
          setSpeedBonus(savedUpgrade.level * 5);
        } else if (baseUpgrade.id === "blueFruit") {
          setBlueFruitBonus(savedUpgrade.level * 1);
          setIsBlueFruitActive(true);
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
  }, [savedUpgrades, upgrades]);

  // Fonctions du mode développeur
  const toggleDevMode = useCallback(() => {
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
  }, [isDevMode, devPassword]);

  const addDevPoints = useCallback(() => {
    const points = parseInt(devPoints);
    if (!isNaN(points) && points > 0) {
      setTotalPoints(prev => prev + points);
      setDevPoints("");
      alert(`${points} points ajoutés !`);
    } else {
      alert("Veuillez entrer un nombre valide !");
    }
  }, [devPoints]);

  // Obtenir une position aléatoire non occupée
  const getAvailablePosition = useCallback(
    (currentSnake: Position[], excludePositions: Position[] = []): Position | null => {
      const availablePositions: Position[] = [];

      for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
          const isOccupied = currentSnake.some(
            (segment) => segment.x === x && segment.y === y,
          );
          const isExcluded = excludePositions.some(
            (pos) => pos.x === x && pos.y === y
          );

          if (!isOccupied && !isExcluded) {
            availablePositions.push({ x, y });
          }
        }
      }

      if (availablePositions.length === 0) return null;

      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      return availablePositions[randomIndex];
    },
    [gridWidth, gridHeight],
  );

  // Générer une position aléatoire pour la nourriture (ancienne fonction pour compatibilité)
  const generateRandomFood = useCallback(
    (currentSnake: Position[]): Position | null => {
      return getAvailablePosition(currentSnake);
    },
    [getAvailablePosition],
  );

  // Générer les objets de nourriture (pour initialisation complète)
  const generateFoodItems = useCallback(
    (currentSnake: Position[]): FoodItem[] => {
      const foodItems: FoodItem[] = [];
      const occupiedPositions: Position[] = [];
      let attempts = 0;
      const maxAttempts = 100; // Éviter les boucles infinies

      // Fonction helper pour générer une position avec tentative limitée
      const tryGetPosition = (snake: Position[], occupied: Position[]): Position | null => {
        attempts++;
        if (attempts > maxAttempts) return null;
        return getAvailablePosition(snake, occupied);
      };

      // Toujours générer une pomme rouge normale
      const applePosition = tryGetPosition(currentSnake, occupiedPositions);
      if (applePosition) {
        foodItems.push({ position: applePosition, type: "apple" });
        occupiedPositions.push(applePosition);
      }

      // Générer une pomme d'or si l'amélioration est active
      if (goldenAppleLevel > 0 && attempts < maxAttempts) {
        const goldenAppleChance = goldenAppleLevel * 0.01; // 1% par niveau
        if (Math.random() < goldenAppleChance) {
          const goldenApplePosition = tryGetPosition(currentSnake, occupiedPositions);
          if (goldenApplePosition) {
            foodItems.push({ position: goldenApplePosition, type: "goldenApple" });
            occupiedPositions.push(goldenApplePosition);
          }
        }
      }

      // Générer un fruit bleu si l'amélioration est active
      if (isBlueFruitActive && attempts < maxAttempts) {
        const blueFruitPosition = tryGetPosition(currentSnake, occupiedPositions);
        if (blueFruitPosition) {
          foodItems.push({ position: blueFruitPosition, type: "blueFruit" });
          occupiedPositions.push(blueFruitPosition);
        }
      }

      return foodItems;
    },
    [goldenAppleLevel, isBlueFruitActive, getAvailablePosition],
  );

  // Générer un seul type de nourriture pour remplacer celle qui a été mangée
  const generateSingleFoodItem = useCallback(
    (currentSnake: Position[], existingFood: FoodItem[], foodType: FoodType): FoodItem | null => {
      const occupiedPositions = [
        ...currentSnake,
        ...existingFood.map(f => f.position),
      ];

      const position = getAvailablePosition([], occupiedPositions);
      if (!position) return null;

      return { position, type: foodType };
    },
    [getAvailablePosition],
  );

  // Générer le fruit bleu (en plus de la pomme rouge) - ancienne fonction pour compatibilité
  const generateBlueFruit = useCallback(
    (currentSnake: Position[], foodPosition: Position): Position | null => {
      if (!isBlueFruitActive) return null;
      return getAvailablePosition(currentSnake, [foodPosition]);
    },
    [isBlueFruitActive, getAvailablePosition],
  );

  // Générer une bombe
  const generateBomb = useCallback(
    (currentSnake: Position[], existingFood: FoodItem[]): Bomb | null => {
      if (bombSystemLevel === 0) return null;

      // Les bombes n'apparaissent qu'après 5 secondes de jeu
      if (bombSpawnTimer < 5) return null;

      // Probabilité d'apparition de la bombe (augmente avec le niveau)
      const bombChance = Math.min(0.3, bombSystemLevel * 0.05); // Max 30% de chance
      if (Math.random() > bombChance) return null;

      const occupiedPositions = [
        ...currentSnake,
        ...existingFood.map(f => f.position),
      ];

      const bombPosition = getAvailablePosition([], occupiedPositions);
      if (!bombPosition) return null;

      const baseTimer = 15; // 15 secondes de base
      const timerReduction = bombSystemLevel; // -1 seconde par niveau
      const actualTimer = Math.max(5, baseTimer - timerReduction); // Minimum 5 secondes

      return {
        position: bombPosition,
        timer: actualTimer,
        maxTimer: actualTimer,
        state: "active",
      };
    },
    [bombSystemLevel, bombSpawnTimer, getAvailablePosition],
  );

  // Appliquer un bonus aléatoire de la bombe
  const applyBombBonus = useCallback(() => {
    const bonuses = [
      {
        type: "permanentPoints" as const,
        value: 0.1, // +0.1% permanent par pomme
        permanent: true,
      },
      {
        type: "doubleScore" as const,
        value: 1,
        duration: 30, // 30 secondes
      },
      {
        type: "extraHealth" as const,
        value: 1,
        permanent: true,
      },
      {
        type: "extraTime" as const,
        value: 10,
      },
    ];

    const randomBonus = bonuses[Math.floor(Math.random() * bonuses.length)];

    switch (randomBonus.type) {
      case "permanentPoints":
        setPermanentPointsBonus(prev => prev + randomBonus.value);
        break;
      case "doubleScore":
        setIsDoubleScoreActive(true);
        setActiveBonuses(prev => [...prev, randomBonus]);
        setTimeout(() => {
          setIsDoubleScoreActive(false);
          setActiveBonuses(prev => prev.filter(b => b.type !== "doubleScore"));
        }, randomBonus.duration * 1000);
        break;
      case "extraHealth":
        setHealthPoints(prev => prev + randomBonus.value);
        break;
      case "extraTime":
        setTimeLeft(prev => prev + randomBonus.value);
        break;
    }

    setActiveBonuses(prev => [...prev, randomBonus]);
  }, []);

  // Initialiser le jeu
  const startGame = () => {
    const initialSnake = [{ x: 1, y: 1 }];
    snakeRef.current = initialSnake;
    directionRef.current = "RIGHT";
    pointsAddedRef.current = false; // Réinitialiser le flag de points
    setSnake(initialSnake);
    setDirection("RIGHT");

    // Générer les objets de nourriture avec le nouveau système
    if (isMounted) {
      const newFoodItems = generateFoodItems(initialSnake);
      setFoodItems(newFoodItems);

      // Pour compatibilité avec l'ancien code
      const appleFood = newFoodItems.find(f => f.type === "apple");
      if (appleFood) {
        setFood(appleFood.position);
      }

      const blueFruitFood = newFoodItems.find(f => f.type === "blueFruit");
      setBlueFruit(blueFruitFood?.position || null);

      // Générer une bombe si activé
      const newBomb = generateBomb(initialSnake, newFoodItems);
      setBomb(newBomb);
    } else {
      // Fallback pour le rendu serveur
      setFoodItems([{ position: { x: 2, y: 2 }, type: "apple" }]);
      setFood({ x: 2, y: 2 });
      setBlueFruit(null);
      setBomb(null);
    }

    setCurrentPoints(0);
    setHealthPoints(10 + healthBonus); // Réinitialiser les PV avec le bonus de santé uniquement
    setTimeLeft(baseTime + timeBonus); // Utiliser le temps de base + le bonus
    setGoldenAppleMultiplier(0); // Réinitialiser le multiplicateur de pomme d'or
    setBombSpawnTimer(0); // Réinitialiser le timer d'apparition des bombes
    setGameState("playing");
  };

  // Déplacer le snake
  const moveSnake = useCallback(() => {
    if (gameState !== "playing") return;

    const currentSnake = [...snakeRef.current];
    const newSnake = [...currentSnake];
    const head = { ...newSnake[0] };
    const currentDirection = directionRef.current;

    // Déplacer la tête selon la direction
    switch (currentDirection) {
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

    // Collision avec la bombe
    if (bomb && bomb.state === "active" && head.x === bomb.position.x && head.y === bomb.position.y) {
      // Le serpent perd 75% de ses PV
      setHealthPoints((prev) => {
        const newHP = Math.floor(prev * 0.25); // Conserve 25% des PV
        if (newHP <= 0) {
          setGameState("gameOver");
        }
        return newHP;
      });
      setBomb(null); // Retirer la bombe
      return;
    }

    // Collision avec soi-même
    const segmentsToCheck =
      newSnake.length > 1 ? newSnake.slice(0, -1) : newSnake;
    if (
      segmentsToCheck.some(
        (segment) => segment.x === head.x && segment.y === head.y,
      )
    ) {
      setGameState("gameOver");
      return;
    }

    newSnake.unshift(head);

    // Vérifier si le snake mange de la nourriture (nouveau système)
    let ateFood = false;
    const eatenFoodIndices: number[] = [];

    // D'abord identifier les indices de la nourriture mangée
    foodItems.forEach((foodItem, index) => {
      if (head.x === foodItem.position.x && head.y === foodItem.position.y) {
        eatenFoodIndices.push(index);

        let pointsToAdd = 0;
        let healthChange = 0;

        switch (foodItem.type) {
          case "apple":
            pointsToAdd = appleValue;
            healthChange = -1; // Perd 1 PV
            break;
          case "goldenApple":
            pointsToAdd = appleValue * 10; // 10x la valeur normale
            healthChange = -1; // Perd 1 PV aussi
            // Activer le multiplicateur pour les 3 prochaines pommes
            setGoldenAppleMultiplier(3);
            break;
          case "blueFruit":
            pointsToAdd = Math.floor(appleValue / 2); // Moitié des points de la pomme rouge
            healthChange = 1; // Gagne 1 PV
            // +2 secondes au chrono (temporaire pour cette partie)
            setTimeLeft((prev) => prev + 2);
            break;
        }

        // Appliquer le multiplicateur de pomme d'or si actif
        let multiplier = 1;
        if (goldenAppleMultiplier > 0 && foodItem.type !== "goldenApple") {
          multiplier = 3; // x3 pour les pommes suivantes
          setGoldenAppleMultiplier(prev => prev - 1); // Décrémenter le multiplicateur
        }

        // Appliquer le bonus de points permanent si actif
        const finalPoints = pointsToAdd * (1 + permanentPointsBonus / 100) * multiplier;

        // Appliquer le double score si actif
        const actualPointsToAdd = isDoubleScoreActive ? finalPoints * 2 : finalPoints;

        setCurrentPoints((prev) => prev + Math.floor(actualPointsToAdd));

        setHealthPoints((prev) => {
          const maxHP = 10 + healthBonus;
          const newHP = Math.min(prev + healthChange, maxHP);
          if (newHP <= 0) {
            setGameState("gameOver");
          }
          return newHP;
        });
      }
    });

    // Retirer la nourriture mangée et mettre à jour le tableau
    let newFoodItems = [...foodItems];
    if (eatenFoodIndices.length > 0) {
      newFoodItems = newFoodItems.filter((_, index) => !eatenFoodIndices.includes(index));
      ateFood = true;
    }

    // Si de la nourriture a été mangée, générer seulement des remplacements pour celles mangées
    if (ateFood) {
      // Générer des remplacements pour chaque type de nourriture mangée
      const replacementItems: FoodItem[] = [];

      eatenFoodIndices.forEach((eatenIndex) => {
        const eatenFood = foodItems[eatenIndex];
        if (eatenFood) {
          // Pour les pommes rouges, toujours générer un remplacement
          if (eatenFood.type === "apple") {
            const replacement = generateSingleFoodItem(newSnake, [...newFoodItems, ...replacementItems], "apple");
            if (replacement) {
              replacementItems.push(replacement);
            }
          }
          // Pour les pommes d'or, chance d'en générer une nouvelle
          else if (eatenFood.type === "goldenApple") {
            const goldenAppleChance = goldenAppleLevel * 0.01; // 1% par niveau
            if (Math.random() < goldenAppleChance) {
              const replacement = generateSingleFoodItem(newSnake, [...newFoodItems, ...replacementItems], "goldenApple");
              if (replacement) {
                replacementItems.push(replacement);
              }
            }
          }
          // Pour les fruits bleus, toujours générer un remplacement si l'amélioration est active
          else if (eatenFood.type === "blueFruit" && isBlueFruitActive) {
            const replacement = generateSingleFoodItem(newSnake, [...newFoodItems, ...replacementItems], "blueFruit");
            if (replacement) {
              replacementItems.push(replacement);
            }
          }
        }
      });

      // Ajouter les nouveaux items aux nourritures existantes
      const finalFoodItems = [...newFoodItems, ...replacementItems];
      setFoodItems(finalFoodItems);

      // Pour compatibilité avec l'ancien code
      const appleFood = finalFoodItems.find(f => f.type === "apple");
      if (appleFood) {
        setFood(appleFood.position);
      }

      const blueFruitFood = finalFoodItems.find(f => f.type === "blueFruit");
      setBlueFruit(blueFruitFood?.position || null);

      // Générer une nouvelle bombe seulement s'il n'y en a pas déjà une active
      if (!bomb || bomb.state !== "active") {
        const newBomb = generateBomb(newSnake, finalFoodItems);
        setBomb(newBomb);
      }

      // Vérifier si le serpent a rempli tout le tableau
      if (newSnake.length >= gridWidth * gridHeight) {
        setGameState("gameOver");
        return;
      }
    }

    // Si le serpent n'a rien mangé, il rétrécit
    if (!ateFood) {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    setSnake(newSnake);
  }, [foodItems, bomb, gameState, generateSingleFoodItem, generateBomb, gridWidth, gridHeight, appleValue, goldenAppleLevel, isBlueFruitActive, permanentPointsBonus, isDoubleScoreActive, goldenAppleMultiplier]);

  // Gérer la fin de partie
  useEffect(() => {
    if (gameState === "gameOver" && !pointsAddedRef.current) {
      // currentPoints contient déjà le score avec la valeur des pommes appliquée
      setTotalPoints((prev) => prev + currentPoints);
      if (currentPoints > highScore) {
        setHighScore(currentPoints);
      }
      pointsAddedRef.current = true; // Marquer que les points ont été ajoutés
    }
  }, [gameState, currentPoints, highScore]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    // Calculer la vitesse avec le bonus (plus le bonus est élevé, plus l'intervalle est court)
    const speedMultiplier = 1 - (speedBonus / 100); // 5% par niveau = 0.05 par niveau
    const adjustedSpeed = Math.max(100, INITIAL_SPEED * speedMultiplier); // Minimum 100ms

    const gameInterval = setInterval(moveSnake, adjustedSpeed);
    return () => clearInterval(gameInterval);
  }, [gameState, moveSnake, speedBonus]);

  // Chronomètre et gestion des bombes
  useEffect(() => {
    if (gameState !== "playing") return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("gameOver");
          return 0;
        }
        return prev - 1;
      });

      // Incrémenter le timer d'apparition des bombes
      setBombSpawnTimer((prev) => prev + 1);

      // Gérer le timer de la bombe
      setBomb((prevBomb) => {
        if (prevBomb && prevBomb.state === "active") {
          const newTimer = prevBomb.timer - 1;
          if (newTimer <= 0) {
            // La bombe explose !
            applyBombBonus();
            return null; // Retirer la bombe
          }
          return { ...prevBomb, timer: newTimer };
        }
        return prevBomb;
      });
    }, 1000); // 1 seconde

    return () => clearInterval(timerInterval);
  }, [gameState, applyBombBonus]);

  // Gérer le fruit bleu quand le mode est activé/désactivé
  useEffect(() => {
    if (isBlueFruitActive && gameState === "playing" && !blueFruit) {
      // Générer le fruit bleu si le mode est activé et qu'il n'y en a pas
      const newBlueFruit = generateBlueFruit(snake, food);
      setBlueFruit(newBlueFruit);
    } else if (!isBlueFruitActive && blueFruit) {
      // Retirer le fruit bleu si le mode est désactivé
      setBlueFruit(null);
    }
  }, [isBlueFruitActive, gameState, blueFruit, snake, food, generateBlueFruit]);

  // Vérifier si un changement de direction causerait une collision
  const wouldCollideWithSelf = useCallback(
    (newDirection: Direction): boolean => {
      const currentSnake = [...snakeRef.current];
      if (currentSnake.length <= 2) return false; // Pas de risque avec 2 segments ou moins

      const head = { ...currentSnake[0] };

      // Calculer la nouvelle position de la tête
      switch (newDirection) {
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
      const segmentsToCheck =
        currentSnake.length > 1 ? currentSnake.slice(1, -1) : [];
      return segmentsToCheck.some(
        (segment) => segment.x === head.x && segment.y === head.y,
      );
    },
    [],
  );

  // Gérer les contrôles clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;

      // Empêcher le défilement de la page avec les flèches
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      let newDirection: Direction | null = null;

      switch (e.key) {
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
        const isOpposite =
          (newDirection === "UP" && directionRef.current === "DOWN") ||
          (newDirection === "DOWN" && directionRef.current === "UP") ||
          (newDirection === "LEFT" && directionRef.current === "RIGHT") ||
          (newDirection === "RIGHT" && directionRef.current === "LEFT");

        // Ne pas permettre les changements qui causeraient une collision avec soi-même
        if (!isOpposite && !wouldCollideWithSelf(newDirection)) {
          directionRef.current = newDirection;
          setDirection(newDirection);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, wouldCollideWithSelf]);

  // Fonction pour obtenir l'image appropriée pour chaque partie du snake
  const getSnakeImage = (segment: Position, index: number) => {
    if (index === 0) {
      // Tête
      switch (direction) {
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
        if (
          (prevSegment.x < segment.x && nextSegment.y < segment.y) ||
          (prevSegment.y < segment.y && nextSegment.x < segment.x)
        ) {
          return "/Graphics/body_topleft.png";
        }
        if (
          (prevSegment.x > segment.x && nextSegment.y < segment.y) ||
          (prevSegment.y < segment.y && nextSegment.x > segment.x)
        ) {
          return "/Graphics/body_topright.png";
        }
        if (
          (prevSegment.x < segment.x && nextSegment.y > segment.y) ||
          (prevSegment.y > segment.y && nextSegment.x < segment.x)
        ) {
          return "/Graphics/body_bottomleft.png";
        }
        if (
          (prevSegment.x > segment.x && nextSegment.y > segment.y) ||
          (prevSegment.y > segment.y && nextSegment.x > segment.x)
        ) {
          return "/Graphics/body_bottomright.png";
        }
      }
    }
    return "/Graphics/body_horizontal.png";
  };

  // Si le composant n'est pas encore monté, afficher un fallback simple
  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Snake Idle</h1>
          <div className="text-gray-400">Chargement du jeu...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* En-tête avec onglets */}
      <div className="w-full max-w-4xl mb-6">
        <h1 className="text-4xl font-bold text-center mb-4">Snake Idle</h1>

        {/* Contrôles mode développeur */}
        <div className="mb-4 text-center">
          {!isDevMode ? (
            <div className="flex justify-center items-center gap-2">
              <input
                type="password"
                value={devPassword}
                onChange={(e) => setDevPassword(e.target.value)}
                placeholder="Mot de passe dev"
                className="px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && toggleDevMode()}
              />
              <button
                onClick={toggleDevMode}
                className="px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Activer Mode Dev
              </button>
            </div>
          ) : (
            <div className="bg-purple-900 bg-opacity-50 p-3 rounded-lg">
              <div className="flex justify-center items-center gap-2 mb-2">
                <span className="text-purple-300 font-semibold">Mode Développeur Activé</span>
                <button
                  onClick={toggleDevMode}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                >
                  Désactiver
                </button>
              </div>
              <div className="flex justify-center items-center gap-2">
                <input
                  type="number"
                  value={devPoints}
                  onChange={(e) => setDevPoints(e.target.value)}
                  placeholder="Nombre de points"
                  className="px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none w-32"
                  onKeyPress={(e) => e.key === 'Enter' && addDevPoints()}
                />
                <button
                  onClick={addDevPoints}
                  className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Ajouter Points
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Onglets */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("game")}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                activeTab === "game"
                  ? "bg-green-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              🎮 JEU
            </button>
            <button
              onClick={() => setActiveTab("upgrades")}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ml-2 ${
                activeTab === "upgrades"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              🚀 AMÉLIORATIONS
            </button>
          </div>
        </div>

        {/* Tableau des scores */}
        <div className="text-center">
          <div className="grid grid-cols-6 gap-4 mb-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-400">PV</div>
              <div
                className={`text-2xl font-bold ${healthPoints <= 5 ? "text-red-500" : healthPoints <= 10 ? "text-yellow-400" : "text-red-400"}`}
              >
                ❤️ {healthPoints}
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Points actuels</div>
              <div className="text-2xl font-bold text-green-400">
                {currentPoints}
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Total accumulé</div>
              <div className="text-2xl font-bold text-yellow-400">
                {totalPoints}
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Meilleur score</div>
              <div className="text-2xl font-bold text-purple-400">
                {highScore}
              </div>
            </div>
            <div
              className={`bg-gray-800 p-4 rounded-lg ${timeLeft <= 10 ? "border-2 border-red-500" : ""}`}
            >
              <div className="text-sm text-gray-400">Temps restant</div>
              <div
                className={`text-2xl font-bold ${timeLeft <= 10 ? "text-red-400" : "text-blue-400"}`}
              >
                {timeLeft}s
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Valeur pomme</div>
              <div className="text-2xl font-bold text-red-400">
                +{appleValue}
              </div>
            </div>
            {(isDoubleScoreActive || permanentPointsBonus > 0 || goldenAppleMultiplier > 0) && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-400">Bonus actifs</div>
                <div className="text-lg font-bold text-green-400">
                  {isDoubleScoreActive && "2x "}
                  {permanentPointsBonus > 0 && `+${permanentPointsBonus.toFixed(1)}% `}
                  {goldenAppleMultiplier > 0 && (
                    <span className="text-yellow-400">
                      🌟 x3 ({goldenAppleMultiplier} rest.)
                    </span>
                  )}
                </div>
              </div>
            )}
            {/* Indicateur du timer d'apparition des bombes */}
            {bombSystemLevel > 0 && gameState === "playing" && bombSpawnTimer < 5 && (
              <div className={`bg-gray-800 p-4 rounded-lg ${bombSpawnTimer >= 3 ? "border-2 border-orange-500 animate-pulse" : ""}`}>
                <div className="text-sm text-gray-400">
                  {bombSpawnTimer >= 3 ? "⚠️ Bombes imminentes" : "Bombes dans"}
                </div>
                <div className={`text-2xl font-bold ${bombSpawnTimer >= 3 ? "text-orange-400" : "text-yellow-400"}`}>
                  {5 - bombSpawnTimer}s
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenu des onglets */}
      {activeTab === "game" && (
        <>
          {/* Grille de jeu */}
          <div className="relative bg-gray-800 p-4 rounded-lg shadow-2xl">
            <div
              className="relative grid bg-gray-700 border-4 border-gray-600"
              style={{
                gridTemplateColumns: `repeat(${gridWidth}, ${CELL_SIZE}px)`,
                gridTemplateRows: `repeat(${gridHeight}, ${CELL_SIZE}px)`,
              }}
            >
              {/* Grille de fond */}
              {Array.from({ length: gridWidth * gridHeight }).map((_, index) => (
                <div
                  key={`cell-${index}`}
                  className="border border-gray-600 bg-gray-750"
                />
              ))}

              {/* Nourriture (nouveau système) */}
              {foodItems.map((foodItem, index) => (
                <div
                  key={`food-${index}`}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: `${foodItem.position.x * CELL_SIZE}px`,
                    top: `${foodItem.position.y * CELL_SIZE}px`,
                    width: `${CELL_SIZE}px`,
                    height: `${CELL_SIZE}px`,
                  }}
                >
                  {foodItem.type === "apple" && (
                    <>
                      <img
                        src="/Graphics/apple.png"
                        alt="Food"
                        className="w-12 h-12 opacity-90"
                        onError={(e) => {
                          console.error("Error loading apple.png");
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div
                        className="w-8 h-8 bg-red-500 rounded-full"
                        style={{ display: "none" }}
                        id="apple-fallback"
                      />
                    </>
                  )}
                  {foodItem.type === "goldenApple" && (
                    <>
                      <div className="relative">
                        <img
                          src="/Graphics/golden_apple.png"
                          alt="Pomme d'or"
                          className="w-12 h-12 opacity-90"
                          style={{
                            filter: 'brightness(1.2) contrast(1.1) drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))',
                          }}
                          onError={(e) => {
                            console.error("Error loading golden_apple.png");
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-yellow-300 text-xs font-bold">10x</span>
                          <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                            3x
                          </div>
                        </div>
                      </div>
                      <div
                        className="w-8 h-8 bg-yellow-400 rounded-full"
                        style={{ display: "none" }}
                        id="golden-apple-fallback"
                      />
                    </>
                  )}
                  {foodItem.type === "blueFruit" && (
                    <>
                      <img
                        src="/Graphics/blue_apple.png"
                        alt="Blue Fruit"
                        className="w-12 h-12 opacity-90"
                        onError={(e) => {
                          console.error("Error loading blue_apple.png");
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div
                        className="w-8 h-8 bg-blue-500 rounded-full"
                        style={{ display: "none" }}
                        id="blue-fruit-fallback"
                      />
                    </>
                  )}
                </div>
              ))}

              {/* Bombe avec compte à rebours */}
              {bomb && bomb.state === "active" && (
                <div
                  className="absolute flex items-center justify-center"
                  style={{
                    left: `${bomb.position.x * CELL_SIZE}px`,
                    top: `${bomb.position.y * CELL_SIZE}px`,
                    width: `${CELL_SIZE}px`,
                    height: `${CELL_SIZE}px`,
                  }}
                >
                  <div className="relative">
                    {/* Cercle de la bombe */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                        bomb.timer <= 3 ? "bg-red-600 animate-pulse" : "bg-gray-700"
                      }`}
                    >
                      💣
                    </div>
                    {/* Compte à rebours */}
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {bomb.timer}
                    </div>
                    {/* Cercle d'avertissement */}
                    {bomb.timer <= 3 && (
                      <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping" />
                    )}
                  </div>
                </div>
              )}

              {/* Snake */}
              {snake.map((segment, index) => (
                <div
                  key={`snake-${index}`}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: `${segment.x * CELL_SIZE}px`,
                    top: `${segment.y * CELL_SIZE}px`,
                    width: `${CELL_SIZE}px`,
                    height: `${CELL_SIZE}px`,
                  }}
                >
                  <img
                    src={getSnakeImage(segment, index)}
                    alt={`Snake segment ${index}`}
                    className="w-16 h-16"
                  />
                </div>
              ))}
            </div>

            {/* Overlay de game over */}
            {gameState === "gameOver" && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 text-red-400">
                    {timeLeft === 0
                      ? "Temps écoulé!"
                      : currentPoints === gridWidth * gridHeight - 1
                        ? "Parfait! Tableau rempli!"
                        : "Game Over!"}
                  </h2>
                  <p className="text-lg mb-4">Score: {currentPoints}</p>
                  <p className="text-sm text-gray-300 mb-4">
                    +{currentPoints} points ajoutés au total!
                  </p>
                  {timeLeft === 0 && (
                    <p className="text-sm text-blue-300 mb-4">
                      ⏰ Les 30 secondes sont terminées
                    </p>
                  )}
                  {currentPoints === gridWidth * gridHeight - 1 && (
                    <p className="text-sm text-green-300 mb-4">
                      🎉 Vous avez rempli tout le tableau!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "upgrades" && (
        <UpgradeTree
          upgrades={upgrades}
          totalPoints={totalPoints}
          currentPoints={currentPoints}
          appleValue={appleValue}
          gridWidth={gridWidth}
          gridHeight={gridHeight}
          timeBonus={timeBonus}
          speedBonus={speedBonus}
          blueFruitBonus={blueFruitBonus}
          goldenAppleLevel={goldenAppleLevel}
          bombSystemLevel={bombSystemLevel}
          onBuyUpgrade={buyUpgrade}
          onPlayGame={() => {
            setActiveTab("game");
            if (gameState === "idle" || gameState === "gameOver") {
              startGame();
            }
          }}
          gameState={gameState}
          saveUpgrades={saveUpgrades}
          loadUpgrades={loadUpgrades}
          applySavedUpgrades={applySavedUpgrades}
          savedUpgrades={savedUpgrades}
          healthBonus={healthBonus}
        />
      )}

      {/* Contrôles - seulement dans l'onglet jeu */}
      {activeTab === "game" && (
        <div className="mt-6 text-center">
          {gameState === "idle" && (
            <button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
            >
              Commencer à jouer
            </button>
          )}

          {gameState === "gameOver" && (
            <button
              onClick={startGame}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
            >
              Rejouer
            </button>
          )}

          {gameState === "playing" && (
            <div className="text-sm text-gray-400">
              Utilisez les flèches ou Z/Q/S/D pour contrôler le snake
            </div>
          )}
        </div>
      )}

      {/* Instructions - seulement dans l'onglet jeu */}
      {activeTab === "game" && (
        <div className="mt-6 text-center text-sm text-gray-500 max-w-md">
          <p className="mb-2">
            🎮 <strong>Objectif:</strong> Ramassez les pommes pour gagner des
            points
          </p>
          <p className="mb-2">
            🍎 <strong>Points:</strong> Chaque pomme vaut {appleValue} point
            {appleValue > 1 ? "s" : ""}
          </p>
          <p className="mb-2">
            ⏰ <strong>Temps:</strong> Vous avez 30 secondes par partie!
          </p>
          <p className="mb-2">
            💎 <strong>Idle:</strong> Vos points sont conservés même après la
            mort!
          </p>
          <p>
            🚀 <strong>Améliorations:</strong> Utilisez vos points pour
            débloquer des bonus permanents!
          </p>
          <p className="mb-2">
            ⭐ <strong>Pomme d'Or:</strong> Accorde un bonus x3 sur les 3 prochaines pommes mangées!
          </p>
        </div>
      )}
    </div>
  );
}

// Composant UpgradeTree pour afficher l'arbre d'améliorations
function UpgradeTree({
  upgrades,
  totalPoints,
  currentPoints,
  appleValue,
  gridWidth,
  gridHeight,
  timeBonus,
  speedBonus,
  blueFruitBonus,
  goldenAppleLevel,
  bombSystemLevel,
  onBuyUpgrade,
  onPlayGame,
  gameState,
  saveUpgrades,
  loadUpgrades,
  applySavedUpgrades,
  savedUpgrades,
  healthBonus,
}: {
  upgrades: Upgrade[];
  totalPoints: number;
  currentPoints: number;
  appleValue: number;
  gridWidth: number;
  gridHeight: number;
  timeBonus: number;
  speedBonus: number;
  blueFruitBonus: number;
  goldenAppleLevel: number;
  bombSystemLevel: number;
  onBuyUpgrade: (id: string) => void;
  onPlayGame: () => void;
  gameState: GameState;
  saveUpgrades: () => void;
  loadUpgrades: (event: React.ChangeEvent<HTMLInputElement>) => void;
  applySavedUpgrades: () => void;
  savedUpgrades: any[];
  healthBonus: number;
}) {
  const getUpgradeCost = (baseCost: number, level: number): number => {
    return Math.floor(baseCost * Math.pow(1.5, level));
  };

  const getAvailablePoints = () => {
    return totalPoints;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-8 text-purple-400">
          Arbre d'Améliorations
        </h2>

        {/* Liste d'améliorations */}
        <div className="space-y-4 mb-16">
          {upgrades.map((upgrade) => {
            const currentCost = getUpgradeCost(upgrade.baseCost, upgrade.level);
            const availablePoints = getAvailablePoints();
            const canAfford = availablePoints >= currentCost;
            const isMaxed = upgrade.level >= upgrade.maxLevel;

            return (
              <div
                key={upgrade.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  !upgrade.unlocked
                    ? "bg-gray-900 border-gray-700 opacity-50"
                    : isMaxed
                      ? "bg-purple-900 border-purple-600"
                      : canAfford
                        ? "bg-gray-800 border-green-600 hover:bg-gray-750"
                        : "bg-gray-800 border-gray-700 opacity-75"
                }`}
                onClick={() =>
                  upgrade.unlocked &&
                  !isMaxed &&
                  canAfford &&
                  onBuyUpgrade(upgrade.id)
                }
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-lg font-bold text-gray-300">
                        {upgrade.id === "appleValue"
                          ? "POMMES"
                          : upgrade.id === "healthBonus"
                            ? "PV"
                            : upgrade.id === "gridSize"
                              ? "GRILLE"
                              : upgrade.id === "timeBonus"
                                ? "TEMPS"
                                : upgrade.id === "speedBonus"
                                  ? "VITESSE"
                                  : upgrade.id === "blueFruit"
                                    ? "BLEU"
                                    : upgrade.id === "goldenApple"
                                      ? "OR"
                                      : upgrade.id === "bombSystem"
                                        ? "BOMBE"
                                        : "BONUS"}
                      </div>
                      <h3 className="font-bold text-white">{upgrade.name}</h3>
                      <div className="text-sm text-gray-400">
                        Niv. {upgrade.level}/{upgrade.maxLevel}
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-2">
                      {upgrade.description}
                    </p>

                    {!upgrade.unlocked && (
                      <div className="text-sm text-yellow-400">
                        🔒 Verrouillé - Nécessite Niv.
                        {upgrade.requiredLevelValue} en{" "}
                        {
                          upgrades.find((u) => u.id === upgrade.requiredLevel)
                            ?.name
                        }
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-2">
                      <div className="text-sm font-semibold text-gray-300">
                        Actuellement:
                        {upgrade.id === "appleValue" &&
                          ` +${appleValue} points/pomme`}
                        {upgrade.id === "healthBonus" &&
                          ` ${10 + healthBonus} PV de départ`}
                        {upgrade.id === "gridSize" &&
                          ` ${gridWidth}x${gridHeight}`}
                        {upgrade.id === "timeBonus" &&
                          ` +${timeBonus}s par partie`}
                        {upgrade.id === "speedBonus" &&
                          ` ${speedBonus}% de vitesse`}
                        {upgrade.id === "blueFruit" &&
                          (blueFruitBonus > 0
                            ? ` +${blueFruitBonus} PV, 0.5x points, +2s chrono/pomme`
                            : " Pas possédé")}
                        {upgrade.id === "goldenApple" &&
                          (goldenAppleLevel > 0
                            ? ` ${goldenAppleLevel}% chance, valeur 10x`
                            : " Non débloqué")}
                        {upgrade.id === "bombSystem" &&
                          (bombSystemLevel > 0
                            ? ` Niv.${bombSystemLevel}, temps: ${15 - bombSystemLevel}s`
                            : " Non débloqué")}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end ml-4">
                    {upgrade.unlocked && !isMaxed && (
                      <div className="text-lg font-bold">
                        {canAfford ? (
                          <span className="text-green-400">
                            {currentCost} pts
                          </span>
                        ) : (
                          <span className="text-red-400">
                            {currentCost} pts
                          </span>
                        )}
                      </div>
                    )}

                    {isMaxed && (
                      <div className="text-lg font-bold text-purple-400">
                        MAX
                      </div>
                    )}

                    {!upgrade.unlocked && (
                      <div className="text-lg font-bold text-yellow-400">
                        🔒
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bouton pour jouer - séparé de la grille */}
        <div className="border-t border-gray-700 pt-6">
          <div className="text-center">
            <button
              onClick={onPlayGame}
              className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${
                gameState === "idle" || gameState === "gameOver"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {gameState === "idle"
                ? "🎮 Commencer à jouer"
                : gameState === "gameOver"
                  ? "🔄 Rejouer"
                  : "🎮 Retourner au jeu"}
            </button>
          </div>

          {/* Statistiques */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Valeur des pommes</div>
              <div className="text-xl font-bold text-red-400">
                +{appleValue}
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Bonus temps</div>
              <div className="text-xl font-bold text-yellow-400">
                +{timeBonus}s
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Taille de la grille</div>
              <div className="text-xl font-bold text-blue-400">
                {gridWidth}x{gridHeight}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
