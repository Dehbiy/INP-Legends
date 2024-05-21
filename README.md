# Projet de Spécialité : INP Legends
## Authors
- [Dehbi Yakoub](https://github.com/dehbiy)
- [Elaasri Youssef](https://github.com/youssef-elaasri)
- [Benabdellah Achraf](https://github.com/benabach)

## Encadrant
- [Sebastien VIARDOT](https://gricad-gitlab.univ-grenoble-alpes.fr/viardots)

## Description
Ce document présente un compte rendu d'un projet de spécialité web. En bref, c'est un RPG 2D où le joueur doit résoudre des défis de programmation en Python. Nous présentons dans ce rapport un cahier des charges et notre implémentation correspondante.

# Table des matières

# Description du Jeu
<!-- Expliquer brièvement l'atmosphère du jeu -->

# Cahier des Charges
## Cas d'Usages
```plantuml
@startuml
!theme plain

left to right direction

actor Player

rectangle "2D RPG Game" {
  usecase UC1 as "Register"
  usecase UC2 as "Login"
  usecase UC3 as "Navigate Map"
  usecase UC4 as "Interact with NPCs"
  usecase UC5 as "Solve Python challenges"
  usecase UC6 as "Chat with other players"
}

Player -down-> UC1 : registers
Player -down-> UC2 : logs in
Player -down-> UC3 : navigates
Player -down-> UC4 : interacts
Player -down-> UC6 : chats with
UC4 .> UC5 : <<extend>>

note right of UC1
  1. Player chooses username and password.
  2. Player submits registration form.
  3. System validates data and creates new account.
end note

note right of UC2
  1. Player enters username and password.
  2. System validates credentials.
  3. System grants access to game.
end note

note right of UC3
  1. Player uses controls to navigate map.
  2. System updates player location.
  3. Player encounters landmarks and NPCs.
end note

note right of UC4
  1. Player approaches NPC and initiates interaction.
  2. System presents NPC dialogue.
  3. NPC offers quests, information.
end note

note right of UC5
  1. NPC explains the challenge to the player.
  2. System shows an IDE, the player can write his python code.
  3. Player executes the code.
end note

note right of UC6
  1. Players exchange messages in real-time.
end note

@enduml
```

## Diagrammes Séquentielles


# Architecture

## Frontend
## Aperçu
Le frontend de INP Legends est conçu pour offrir une expérience interactive et fluide aux joueurs. Il intègre plusieurs composants clés, notamment une fenêtre de jeu, une fonctionnalité de chat, un panneau de profil joueur et un système d'authentification. L'application utilise des technologies web modernes et des bibliothèques pour assurer une interface utilisateur réactive et engageante.

## Technologies Utilisées
- **HTML5** pour la structuration de la page web.
- **CSS3** avec des bibliothèques externes comme Pico.css et Font Awesome pour le style.
- **JavaScript** pour le script côté client, incluant divers modules pour gérer la logique du jeu, l'authentification, le chat et le profil joueur.

## Structure du Projet

### Fichier `index.html`
Le fichier `index.html` constitue la base de l'application et inclut les éléments suivants :
- **En-tête (`<head>`)** : comprend les liens vers les feuilles de style externes et les polices.
- **Corps (`<body>`)** :
  - **Fenêtre de jeu** : contient le canvas pour afficher le jeu, un panneau de chat, et divers boutons de contrôle (déconnexion, profil, sauvegarde, plein écran).
  - **Panneau de profil** : une section cachée par défaut, affichant les informations du joueur et permettant la modification du mot de passe.
  - **Modal d'authentification** : une fenêtre modale pour la connexion et l'inscription des utilisateurs.

### Feuilles de Style
- `src/styles.css` : contient les styles personnalisés pour l'application.

### Scripts JavaScript
- **Bibliothèques externes** : `socket.io`, `jQuery`, et `Ace Editor`.
- **Scripts personnalisés** :
  - `src/socket.js` : gère la connexion WebSocket.
  - `src/authentication.js` : gère les fonctions d'authentification, comme la connexion et l'inscription.
  - `src/chatManager.js` : gère les fonctionnalités de chat en temps réel.
  - `src/playerProfile.js` : gère l'affichage et la mise à jour des informations du profil joueur.
  - `src/IDE.js` : gère l'IDE intégré pour les fonctionnalités de développement.
  - `src/Utils.js` : contient des fonctions utilitaires.
  - `src/DirectionInput.js` : gère les entrées de direction pour le contrôle du jeu.
  - `src/GameObject.js`, `src/Person.js`, `src/NPC.js`, `src/Sprite.js`, `src/OverworldMap.js`, `src/OverworldEvent.js`, `src/MainWorld.js`, `src/init.js` : gèrent les différents aspects et objets du jeu.

## Fonctionnalités Principales
- **Fenêtre de Jeu** : affiche le jeu et permet l'interaction avec le joueur.
- **Chat** : permet aux joueurs de communiquer en temps réel.
- **Profil Joueur** : affiche les informations du joueur et permet la modification du mot de passe.
- **Authentification** : système de connexion et d'inscription sécurisé.
- **Contrôles du Jeu** : inclut des boutons pour sauvegarder le jeu, passer en plein écran, et se déconnecter.
- **chalenges python** : affiche un IDE pour permettre à l'utilisateur de saisir un code python.

## Logique du Jeu

### Affichage et Navigation
Le jeu est affiché sur un canvas HTML, et la navigation se fait à l'aide des touches directionnelles du clavier. Le joueur peut se déplacer sur la carte, qui est rendue à l'aide de la classe `OverworldMap`.

- **`OverworldMap.js`** : gère la carte du monde. Elle charge les tuiles de la carte et place les objets et les personnages (joueurs et NPC) à leurs positions initiales.
- **`Sprite.js`** : gère les sprites, c'est-à-dire les images des personnages et des objets animés. Elle prend en charge l'animation et le rendu des sprites sur le canvas.
- **`DirectionInput.js`** : capture les entrées directionnelles du clavier et les traduit en mouvements pour le personnage principal.

### Interaction avec les NPC
Les joueurs peuvent interagir avec les NPC (Personnages Non Joueurs) en s'approchant d'eux et en appuyant sur une touche d'interaction "espace".

- **`Person.js`** : représente un personnage, joueur ou NPC. Elle gère les propriétés de base comme la position, la vitesse et les méthodes de déplacement.
- **`NPC.js`** : hérite de `Person.js` et ajoute des fonctionnalités spécifiques aux NPC, comme les dialogues et les quêtes.

- **`GameObject.js`** : représente un objet dans le jeu. Il peut s'agir d'un objet interactif avec lequel le joueur peut interagir pour obtenir des informations ou déclencher des événements.

- **`OverworldEvent.js`** : gère les événements dans le monde du jeu, comme les interactions avec les objets ou les NPC.

- **`IDE.js`** : gère l'IDE intégré où les joueurs peuvent résoudre des défis de programmation en Python. Il utilise `Ace Editor` pour fournir une interface de codage conviviale.

### Gestion des Objets
Les joueurs peuvent interagir avec des objets dans le monde du jeu, il y a deux type d'objet dans le jeu : 
- ***les objets "mounted***" : ils sont des objets qui représente des murs, l'utilisateur ne peut pas les traverser ( ex : mur, table ... ) 
- ***les objets qui sont pas "mounted"*** : ils sont des objet qu'on peut les traverser (ex : sol, autres joueurs, ...) 

### Défis Python.
Après une interaction avec des NPC, si l'utilisateur à le droit de jouer le chalenge corespond à ce NPC, un IDE se lance dans le jeux et permet au joueur de saisir un code representant la solution du joueur.
Si l'utilisateur n'a pas le droit de jouer le chalenge ( il faut résoudre des chalenges avant ), l'interaction avec le NPC sera déffirente et l'IDE ne se lance pas.

En effet, les interactio avec les NPC se changent en progressant dans le jeux.

### Initialisation et Monde Principal
Le jeu est initialisé et configuré à l'aide des scripts suivants :

- **`init.js`** : initialise le jeu en configurant les paramètres de base et en lançant le moteur de jeu.
- **`MainWorld.js`** : gère le monde principal du jeu, en coordonnant les différentes cartes et en contrôlant les transitions entre elles.

## Algorithme d'affichage des objets et des NPC

## Fonction `updateMap()`

La fonction `updateMap()` est chargée de vérifier si le prochain déplacement du joueur devrait déclencher le changement de carte. Si tel est le cas, la fonction gère différents cas de changement de carte.

Elle commence par récupérer la nouvelle carte et les nouvelles coordonnées à partir de la table de hachage `changeMap`, qui associe les coordonnées du joueur à la carte et aux coordonnées de destination.

Si aucune nouvelle carte n'est trouvée pour les coordonnées actuelles du joueur, la fonction se termine.

Ensuite, la fonction met à jour la carte et la position du joueur en appelant une fonction `updateMapAndPlayerPosition()`, qui prend en paramètre le nom de la nouvelle carte et les nouvelles coordonnées du joueur. Cette fonction change également la carte affichée et déplace le joueur aux nouvelles coordonnées.

Avant de changer de carte, la fonction peut également sauvegarder la partie et émettre un message au serveur via un socket pour informer les autres joueurs du changement de carte. Cette logique est encapsulée dans une fonction `saveAndEmit()`.

La fonction principale utilise des blocs `try` et `catch` pour gérer les erreurs potentielles. Si une erreur se produit lors du changement de carte, elle est capturée et affichée dans la console.

Les différents cas de changement de carte sont traités de la manière suivante :

- Si le joueur se déplace vers le hall (`lobby`), la fonction appelle `handleLobbyEntry()` pour gérer l'entrée dans le hall, en passant le nom de la carte actuel, les nouvelles coordonnées, la fonction de mise à jour de la carte et la fonction de sauvegarde et d'émission de message.
  
- Si le joueur quitte le hall (`lobby`), la fonction appelle `handleLobbyExit()` pour gérer la sortie du hall, en passant la fonction de mise à jour de la carte et la fonction de sauvegarde et d'émission de message.

- Pour tous les autres cas de changement de carte, la fonction appelle simplement `updateMapAndPlayerPosition()` pour mettre à jour la carte et la position du joueur, puis sauvegarde et émet un message pour informer les autres joueurs du changement de carte.



### Fonction `startGameLoop()`

La fonction `startGameLoop()` représente le cœur de la boucle de jeu. Elle est responsable de l'actualisation et du rendu de tous les éléments visibles à l'écran, y compris les objets et les PNJ.

Elle commence par effacer le canevas à chaque itération pour éviter l'accumulation de frames indésirables, assurant ainsi un rendu propre et fluide.

Ensuite, elle met à jour la carte de jeu en appelant la méthode `updateMap()` de l'objet `window.currentMap`.

Après la mise à jour de la carte, la fonction procède à la mise à jour de chaque objet de jeu, chaque PNJ et chaque joueur. Ces mises à jour peuvent inclure des calculs de déplacement, des interactions avec d'autres éléments du jeu ou des changements d'état en réponse à des événements.

Une fois que tous les éléments ont été mis à jour, la fonction commence le processus de rendu en dessinant les objets de jeu, les PNJ et les joueurs sur le canevas. Pour ce faire, elle parcourt les listes d'objets et utilise la méthode `draw()` de chaque objet pour les dessiner à leur position actuelle.

Les objets et PNJ "supérieurs", c'est-à-dire ceux qui doivent être rendus au-dessus des autres éléments, sont également pris en charge. Ils sont dessinés après les autres éléments et sont stockés dans un tableau `window.upperObjects` pour un rendu ultérieur.

### Méthode `draw(ctx)` de la classe `Sprite`

La méthode `draw(ctx)` est chargée de dessiner un objet ou un PNJ sur le canevas en fonction de sa position et de son état actuels par rapport au joueur principal.

Elle commence par vérifier si l'objet doit être dessiné en fonction de sa position par rapport au joueur principal et de l'état de rendu actuel. Si l'objet doit être rendu, la méthode calcule les coordonnées de rendu en fonction de la position du joueur principal et dessine l'image correspondante sur le canevas en utilisant le contexte de rendu `ctx`.

La méthode `draw()` gère également la logique d'affichage des différentes images en fonction de l'état de l'objet ou du PNJ. Par exemple, elle peut changer l'image affichée pour refléter le mouvement, l'action ou l'état actuel de l'objet.

Si l'objet doit être dessiné au-dessus des autres éléments, il est ajouté à un tableau `window.upperObjects` pour un rendu ultérieur.


## Algorithme de Génération Dynamique des Maps

### Fonction `init(userId)`

La fonction `init()` est responsable de l'initialisation du jeu pour un utilisateur donné. Elle réalise les opérations suivantes :

1. **Chargement de l'état du jeu** :
   - Utilise la fonction `loadGame(userId)` pour charger l'état sauvegardé du jeu pour l'utilisateur spécifié.

2. **Initialisation du joueur** :
   - Si un état de jeu sauvegardé existe, il est utilisé pour initialiser le joueur (`window.Player`). Les informations incluent :
     - Position X et Y du joueur.
     - Identifiant de l'utilisateur.
     - Drapeaux d'histoire (stages complétés).

3. **Création et préparation des objets et des cartes** :
   - Appelle `util.createAllObjects()` pour créer tous les objets nécessaires.
   - Utilise `util.prepareMAP()` pour préparer les différentes cartes en fournissant le nom de la carte et le chemin vers l'image de la carte.

4. **Démarrage de la carte** :
   - Démarre la carte initiale en appelant `this.startMap()` avec la carte sauvegardée dans l'état de jeu.

5. **Capture des entrées directionnelles et initialisation du multijoueur** :
   - Initialise la capture des entrées directionnelles avec `new DirectionInput()`.
   - Initialise le socket pour le multijoueur avec `initializeSocket()`.

6. **Démarrage de la boucle de jeu** :
   - Démarre la boucle de jeu en appelant `this.startGameLoop()`.

### Fonction `prepareMAP(mapName, src)`

La fonction `prepareMAP()` est chargée de préparer une carte spécifique. Voici le processus :

1. **Chargement de l'image de la carte** :
   - Crée une nouvelle image et définit son chemin source (`src`).
   - Assure que l'image est chargée de manière asynchrone avec `crossOrigin` pour éviter les problèmes de politique de même origine.
   - Une fois l'image chargée, appelle `util.crateMap(mapName, levelImage)`.

### Fonction `crateMap(mapName, image)`

La fonction `crateMap()` convertit une image de carte en objets de jeu placés sur la carte. Voici le processus :

1. **Création d'un canevas hors écran** :
   - Crée un canevas hors écran (`offScreenCanvas`) et obtient son contexte (`offCtx`).

2. **Dessin de l'image sur le canevas hors écran** :
   - Définit les dimensions du canevas pour correspondre à celles de l'image.
   - Dessine l'image sur le canevas hors écran.

3. **Extraction des données d'image** :
   - Obtient les données d'image (`imageData`) du canevas.

4. **Parcours des pixels de l'image** :
   - Parcourt chaque pixel de l'image pour lire les valeurs de couleur rouge, verte et bleue (RGB).

5. **Création d'objets de carte** :
   - En fonction des valeurs RGB des pixels, ajoute des objets à la carte en appelant `this.addObject()` avec les paramètres appropriés :
     - `mapName` : Nom de la carte.
     - `window.<ObjectName>` : Objet correspondant aux couleurs RGB.
     - `name` : Nom unique de l'objet.
     - `x, y` : Coordonnées de l'objet.

   - Les objets ajoutés dépendent des couleurs spécifiques des pixels, représentant différents éléments de la carte (murs, sols, meubles, etc.).

### Fonction `addObject(mapName, object, name, x, y)`

La fonction `addObject()` ajoute un objet spécifique à une carte. Elle prend les paramètres suivants :

- `mapName` : Nom de la carte.
- `object` : Objet à ajouter.
- `name` : Nom unique de l'objet.
- `x, y` : Coordonnées de l'objet sur la carte.

Cette fonction est appelée dans `crateMap()` pour chaque pixel correspondant à un objet.


### Tests
<!-- Expliquer la difficulté de tester un jeu -->

## Backend
<!-- Description du backend -->
### Technologies Utilisées
- Node.js: 
- Express.js:
- Dockerode:
- Sequelize:
- Socket.IO:
### Docker

**DockerManager** est essentiel pour l'exécution des fichiers Python et des tests Unit. Comme son nom l'indique, DockerManager est basé sur Docker et permet d'avoir un environnement isolé sur la machine pour exécuter des programmes.

<!-- diagramme de classes -->
```plantuml
@startuml
class dockerManager {
  + docker: Docker
  + imageName: String

  + createVolume(String volumeName, Size size): void
  +runContainer(): void

}
note right of dockerManager::createVolume
Creates a new volume in Docker.
This volume is used to store files
that are executed inside the container.
The volume created is of type tmpfs
and has a size limit.
end note

note right of dockerManager::runContainer
Runs a Docker container based on the
specified image.
In the current project, the image is precreated; app_image.
The container will execute the loader.sh script.
end note
@enduml

```
<!-- Digramme de sequence -->

```plantuml

@startuml
actor User
participant dockerManager
participant Dockerode
participant Container
participant FileSystem

User -> dockerManager: runContainer()
dockerManager -> Dockerode: create container
Dockerode -> Container: create container
Dockerode --> dockerManager: container created

dockerManager -> Dockerode: Attach python_scripts volume
Dockerode -> Container: Attach /app/python_scripts/ volume
Dockerode --> dockerManager: volume attached

dockerManager -> Dockerode: Attach exec volume
Dockerode -> Container: Attach /app/exec/ volume
Dockerode --> dockerManager: volume attached



dockerManager -> Dockerode: start container
Dockerode --> dockerManager: container started

Dockerode -> Container: run loader.sh

Container -> FileSystem: copy <file>_tester.py to exec
FileSystem --> Container: file copied

Container -> FileSystem: create <file>_suggested with <content>
FileSystem --> Container: file created

Container -> Container: run python3 file1
Container -> Dockerode: return exit code

Dockerode --> dockerManager: script executed
dockerManager -> Dockerode: delete container
Dockerode -> Container: delelte

Dockerode --> dockerManager: container deleted

@enduml

```



### Python Scripts
<!-- Explication de la gestion des scripts python -->

### Schéma de la Base de Données

<!-- Schéma de la DB -->
``` plantuml
@startuml

entity "User" {
    +id: INTEGER [PK]
    ---
    username: STRING
    password_hash: STRING
    email: STRING
    created_at: DATE
}

entity "CompletedStage" {
    +flag: STRING(50) [PK]
    ---
    userId: INTEGER [FK]
}

entity "LobbySave" {
    +id: INTEGER [PK]
    ---
    userId: INTEGER [FK]
    mapId: INTEGER [FK]
}

entity "Map" {
    +id: INTEGER [PK]
    ---
    name: STRING
    description: TEXT
}

entity "SavePoint" {
    +id: INTEGER [PK]
    ---
    player_x: INTEGER
    player_y: INTEGER
    userId: INTEGER [FK]
    mapId: INTEGER [FK]
}

CompletedStage "n" -- "1" User
LobbySave "1" -- "1" User
LobbySave "n" -- "1" Map
SavePoint "1" -- "1" User
SavePoint "n" -- "1" Map

@enduml
```

### Rest API
<!-- Add routes -->

### Multijoueur
<!-- Expliquer l'intégration des sockets -->

### Securité
<!-- Ecrier comment docker pas sécurisé -->

### Tests
<!-- Couverture de tests backend -->

# Aspects d'amélioration

# Difficultées

# Prospection pour l'avenir


