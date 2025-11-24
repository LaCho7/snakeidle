"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Types pour le jeu
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };
type GameState = "playing" | "gameOver" | "idle";

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
  const [food, setFood] = useState<Position>({ x: 2, y: 2 });
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
      requiredLevel: "gridSize",
      requiredLevelValue: 1, // Débloqué à 5x5
      position: { x: 1, y: 5 },
      effect: () => {},
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
      requiredLevelValue: 2, // Débloqué à 6x6
      position: { x: 3, y: 3 },
      effect: () => {},
    },
  ]);

  // Gérer le montage du composant
  useEffect(() => {
    setIsMounted(true);
    // Initialiser la nourriture aléatoirement seulement côté client
    const initialSnake = [{ x: 1, y: 1 }];
    setFood(generateRandomFood(initialSnake) || { x: 2, y: 2 });
  }, []);

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
              setTimeBonus((prev) => prev + newLevel * 2); // +2 secondes par niveau
              setIsBlueFruitActive(true); // Activer l'affichage du fruit bleu
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

    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `snake_idle_upgrades_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
          setTimeBonus((prev) => prev + savedUpgrade.level * 2);
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

  // Générer une position aléatoire pour la nourriture
  const generateRandomFood = useCallback(
    (currentSnake: Position[]): Position | null => {
      // Créer une liste de toutes les positions possibles
      const availablePositions: Position[] = [];

      for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
          const isOccupied = currentSnake.some(
            (segment) => segment.x === x && segment.y === y,
          );
          if (!isOccupied) {
            availablePositions.push({ x, y });
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
    },
    [gridWidth, gridHeight],
  );

  // Générer le fruit bleu (en plus de la pomme rouge)
  const generateBlueFruit = useCallback(
    (currentSnake: Position[], foodPosition: Position): Position | null => {
      if (!isBlueFruitActive) return null;

      // Créer une liste de toutes les positions possibles en excluant le serpent ET la pomme rouge
      const availablePositions: Position[] = [];

      for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
          const isOccupied = currentSnake.some(
            (segment) => segment.x === x && segment.y === y
          );
          const isFood = foodPosition.x === x && foodPosition.y === y;

          if (!isOccupied && !isFood) {
            availablePositions.push({ x, y });
          }
        }
      }

      if (availablePositions.length === 0) return null;

      // Choisir une position aléatoire parmi les positions disponibles
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      return availablePositions[randomIndex];
    },
    [gridWidth, gridHeight, isBlueFruitActive],
  );

  // Initialiser le jeu
  const startGame = () => {
    const initialSnake = [{ x: 1, y: 1 }];
    snakeRef.current = initialSnake;
    directionRef.current = "RIGHT";
    pointsAddedRef.current = false; // Réinitialiser le flag de points
    setSnake(initialSnake);
    setDirection("RIGHT");

    // Générer la nourriture seulement si le composant est monté
    const newFood = isMounted
      ? generateRandomFood(initialSnake)
      : { x: 2, y: 2 };
    const foodPosition = newFood || { x: 2, y: 2 };
    setFood(foodPosition);

    // Générer le fruit bleu si activé
    const newBlueFruit = isMounted
      ? generateBlueFruit(initialSnake, foodPosition)
      : null;
    setBlueFruit(newBlueFruit);

    setCurrentPoints(0);
    setHealthPoints(10 + healthBonus + blueFruitBonus); // Réinitialiser les PV avec le bonus + fruit bleu
    setTimeLeft(baseTime + timeBonus); // Utiliser le temps de base + le bonus
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

    // Collision avec soi-même
    // On exclut le dernier segment car il va se déplacer (cas où le serpent mange de la nourriture)
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

    // Vérifier si le snake mange la nourriture (pomme rouge)
    let ateFood = false;
    if (head.x === food.x && head.y === food.y) {
      setCurrentPoints((prev) => prev + appleValue);
      setHealthPoints((prev) => {
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
      ateFood = true;
    }

    // Vérifier si le snake mange le fruit bleu
    let ateBlueFruit = false;
    if (blueFruit && head.x === blueFruit.x && head.y === blueFruit.y) {
      setCurrentPoints((prev) => prev + appleValue * 2); // Double les points
      setHealthPoints((prev) => {
        const newHP = prev + 1; // +1 PV au lieu de -1
        return newHP;
      }); // Le serpent gagne 1 PV avec le fruit bleu
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
  }, [food, blueFruit, gameState, generateRandomFood, generateBlueFruit, gridWidth, gridHeight, appleValue]);

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

  // Chronomètre
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
    }, 1000); // 1 seconde

    return () => clearInterval(timerInterval);
  }, [gameState]);

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

              {/* Nourriture */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  left: `${food.x * CELL_SIZE}px`,
                  top: `${food.y * CELL_SIZE}px`,
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                }}
              >
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
              </div>

              {/* Fruit Bleu */}
              {blueFruit && (
                <div
                  className="absolute flex items-center justify-center"
                  style={{
                    left: `${blueFruit.x * CELL_SIZE}px`,
                    top: `${blueFruit.y * CELL_SIZE}px`,
                    width: `${CELL_SIZE}px`,
                    height: `${CELL_SIZE}px`,
                  }}
                >
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
                            ? ` +${blueFruitBonus} PV, +${blueFruitBonus * 2}s par partie`
                            : " Pas possédé")}
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
