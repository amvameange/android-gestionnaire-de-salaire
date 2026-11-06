import { DomainMeta, Chapter } from '../types/math';
import { ALL_EXERCISES_BY_CHAPTER } from './exercises';

export const DOMAINS: DomainMeta[] = [
  {
    id: 'nombres-calculs',
    title: 'Arithmétique & Calculs Numériques',
    shortTitle: 'Calculs',
    description: 'Priorités opératoires, nombres décimaux relatifs, fractions et divisibilité',
    iconName: 'Calculator',
    color: '#6366f1', // Electric Indigo
    badgeBg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40',
  },
  {
    id: 'donnees-fonctions',
    title: 'Organisation de données & Proportionnalité',
    shortTitle: 'Proportionnalité & F CFA',
    description: 'Tableaux, produit en croix au marché, pourcentages et échelles',
    iconName: 'PieChart',
    color: '#ec4899', // Bright Pink
    badgeBg: 'bg-pink-500/15 text-pink-300 border-pink-500/40',
  },
  {
    id: 'geometrie',
    title: 'Espace et Géométrie du Collège',
    shortTitle: 'Géométrie',
    description: 'Triangles, somme des angles (180°), symétrie centrale et parallélogrammes',
    iconName: 'Compass',
    color: '#8b5cf6', // Magic Violet
    badgeBg: 'bg-violet-500/15 text-violet-300 border-violet-500/40',
  },
  {
    id: 'mesures',
    title: 'Grandeurs, Aires et Périmètres',
    shortTitle: 'Aires & Mesures',
    description: 'Aires du triangle, du parallélogramme et du disque, volumes des prismes',
    iconName: 'Ruler',
    color: '#10b981', // Tropical Emerald
    badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  },
];

export const CHAPTERS: Chapter[] = [
  // ==========================================
  // CHAPITRE 1 : PRIORITÉS OPÉRATOIRES
  // ==========================================
  {
    id: 'chap-1-priorites',
    domainId: 'nombres-calculs',
    order: 1,
    title: 'Enchaînement d’opérations & Priorités opératoires',
    badge: 'Chapitre 1 · 5ème Gabon',
    shortDesc: 'Ordre absolu des calculs, parenthèses et calcul mental au marché avec la distributivité.',
    themeColor: '#6366f1',
    themeGradient: 'from-indigo-500 via-sky-500 to-cyan-400',
    readingTimeMinutes: 12,
    visualizerType: 'priority',
    keyFormulas: [
      'Ordre : ( ) puis × et ÷ puis + et -',
      'De gauche à droite pour des opérations de même niveau',
      'Distributivité : k × (a + b) = k × a + k × b',
      'Prix total = Somme des achats individuels en F CFA',
    ],
    memoSheet: {
      title: 'Fiche Mémo : Priorités Opératoires',
      slogan: 'L’ordre absolu des calculs avec égalités parfaitement alignées en colonne',
      summaryBulletPoints: [
        'La multiplication (×) et la division (÷) sont prioritaires sur l’addition (+) et la soustraction (-).',
        'Les calculs entre parenthèses ( ) se font TOUJOURS avant tout le reste.',
        'S’il n’y a que des + et des - (ou que des × et ÷), on calcule de gauche à droite dans l’ordre de lecture.',
        'La distributivité k × (a + b) = k × a + k × b permet de faire des calculs mentaux ultra-rapides au marché.',
      ],
      verticalFormulas: [
        {
          name: 'Calcul sans parenthèses (Priorité de ×)',
          badge: '🚀',
          ruleTitle: '× prioritaire sur +',
          steps: [
            'A = 1 500 + 500 × 3',
            'A = 1 500 + 1 500',
            'A = 3 000 F CFA',
          ],
          resultHighlight: 'A = 3 000 F CFA',
          explanation: 'On effectue d’abord la multiplication prioritaire 500 × 3 = 1 500, puis l’addition.',
          tip: 'Souligne au crayon le paquet 500 × 3 avant de descendre à la ligne suivante !',
        },
        {
          name: 'Calcul avec parenthèses prioritaires',
          badge: '🎯',
          ruleTitle: '( ) Reine absolue',
          steps: [
            'B = 4 × (1 200 - 500)',
            'B = 4 × 700',
            'B = 2 800 F CFA',
          ],
          resultHighlight: 'B = 2 800 F CFA',
          explanation: 'La parenthèse (1 200 - 500) est calculée en premier pour donner 700.',
          tip: 'Dès que la parenthèse ne contient plus qu’un seul nombre, on l’enlève !',
        },
        {
          name: 'Distributivité pour le calcul mental',
          badge: '🧺',
          ruleTitle: 'Développement',
          steps: [
            'C = 6 × (1 000 + 20)',
            'C = 6 × 1 000 + 6 × 20',
            'C = 6 000 + 120',
            'C = 7 120 F CFA',
          ],
          resultHighlight: 'C = 7 120 F CFA',
          explanation: 'On distribue le facteur 6 sur 1 000 et sur 20 pour calculer de tête très vite.',
          tip: 'Très pratique au grand marché Mont-Bouët pour vérifier sa monnaie !',
        },
      ],
      kokoTip: 'En devoir, n’écris jamais deux signes égal (=) sur la même ligne horizontale. Aligne toujours chaque étape verticalement sous la précédente !',
      pitfallToAvoid: 'Calculer de gauche à droite sans regarder s’il y a un signe × ou ÷ caché au milieu (ex: écrire 10 + 2 × 5 = 12 × 5 = 60 au lieu de 10 + 10 = 20) !',
    },
    sections: [
      {
        title: '1. Calculs sans parenthèses (La super-glue des maths)',
        explanation: [
          'Au collège au Gabon, quand tu as une longue ligne de calculs, toutes les opérations ne se valent pas.',
          'La MULTIPLICATION (×) et la DIVISION (÷) sont PRIORITAIRES sur l’addition (+) et la soustraction (-).',
          'Astuce : Imagine que le signe × colle les nombres ensemble comme de la super-glue ! Tu dois calculer le paquet avant de faire les additions.',
          'S’il n’y a que des + et des - (ou que des × et ÷), on calcule simplement dans l’ordre de lecture, de gauche à droite.',
        ],
        rules: [
          {
            name: 'Règle d’or des priorités',
            description: 'Multiplications et divisions d’abord, additions et soustractions ensuite.',
            example: 'A = 1 500 F + 500 F × 3 = 1 500 F + 1 500 F = 3 000 F CFA (et NON 2 000 F × 3 = 6 000 F !)',
            tip: 'Souligne toujours au stylo le bloc prioritaire avant de passer à la ligne suivante.',
          },
          {
            name: 'De gauche à droite',
            description: 'Pour une suite de + et -, calcule dans l’ordre de lecture.',
            example: 'B = 25 - 7 + 4 = 18 + 4 = 22 (et NON 25 - 11 = 14 !)',
          },
        ],
        commonMistakes: [
          'Calculer de gauche à droite sans regarder s’il y a un × ou un ÷ caché au milieu.',
          'Additionner avant de soustraire dans une suite de + et - (10 - 2 + 3 = 8 + 3 = 11, et pas 10 - 5 = 5).',
        ],
      },
      {
        title: '2. Calculs avec parenthèses et crochets',
        explanation: [
          'Les parenthèses sont les chefs suprêmes du calcul ! On calcule TOUJOURS en priorité ce qui est enfermé dans les parenthèses.',
          'S’il y a des crochets [ ] avec des parenthèses ( ) à l’intérieur, on commence par les parenthèses les plus profondes (les plus intérieures).',
        ],
        rules: [
          {
            name: 'Priorité absolue des parenthèses',
            description: 'Effectue le calcul entre parenthèses en respectant les règles normales à l’intérieur.',
            example: 'C = 4 × (1 200 F - 500 F) = 4 × 700 F = 2 800 F CFA',
            tip: 'Dès que le calcul dans la parenthèse est réduit à un seul nombre, tu peux enlever les parenthèses.',
          },
        ],
      },
      {
        title: '3. La Distributivité simple (L’astuce du calcul mental rapide)',
        explanation: [
          'La distributivité permet de calculer rapidement de tête des prix de marchandises au marché.',
          'Formule magique : k × (a + b) = k × a + k × b.',
        ],
        rules: [
          {
            name: 'Calculer mentalement avec la distributivité',
            description: 'Décomposer un nombre difficile en une somme simple (comme 100 + 2 ou 1 000 - 5).',
            example: '7 régimes à 1 020 F CFA l’un : 7 × (1 000 + 20) = 7 000 + 140 = 7 140 F CFA !',
          },
        ],
      },
    ],
    exercises: ALL_EXERCISES_BY_CHAPTER['chap-1-priorites'] || [],
  },

  // ==========================================
  // CHAPITRE 2 : NOMBRES RELATIFS
  // ==========================================
  {
    id: 'chap-2-relatifs',
    domainId: 'nombres-calculs',
    order: 2,
    title: 'Nombres Décimaux Relatifs : Positifs, Négatifs & Sommes',
    badge: 'Chapitre 2 · 5ème Gabon',
    shortDesc: 'Altitudes du Mont Bengoué à l’Océan Atlantique, gains, dettes et règle d’or de la soustraction.',
    themeColor: '#10b981',
    themeGradient: 'from-emerald-500 via-teal-400 to-cyan-500',
    readingTimeMinutes: 14,
    visualizerType: 'relatifs',
    keyFormulas: [
      'Deux nombres opposés ont la même distance à zéro : (+10) et (-10)',
      'Addition même signe : garde le signe et additionne les distances',
      'Addition signes contraires : prends le signe du plus grand en valeur absolue et soustrais',
      'Règle d’or : a - b = a + (-b) (ajouter l’opposé !)',
    ],
    memoSheet: {
      title: 'Fiche Mémo : Nombres Relatifs',
      slogan: 'Comparer, additionner et soustraire les positifs et négatifs en toute confiance',
      summaryBulletPoints: [
        'Positifs (+) : hauteurs (Mont Bengoué +1 070 m), gains d’argent en F CFA.',
        'Négatifs (-) : profondeurs sous-marines (-80 m), dettes financières, températures sous zéro.',
        'Addition de même signe : on garde le signe commun et on additionne les valeurs.',
        'Addition de signes contraires : on prend le signe du nombre le plus éloigné de 0 et on soustrait.',
        'Soustraction : on ne soustrait jamais directement, on ajoute l’opposé : a - b = a + (-b) !',
      ],
      verticalFormulas: [
        {
          name: 'Addition de même signe (Deux dettes)',
          badge: '📉',
          ruleTitle: 'Même signe',
          steps: [
            'A = (-400 F) + (-300 F)',
            'A = -(400 + 300)',
            'A = -700 F CFA',
          ],
          resultHighlight: 'A = -700 F CFA',
          explanation: 'On a une dette de 400 F puis une dette de 300 F, on a donc une dette totale de 700 F CFA.',
          tip: 'Deux moins additionnés donnent toujours un résultat négatif plus grand en valeur absolue !',
        },
        {
          name: 'Addition de signes contraires (Bataille des signes)',
          badge: '⚔️',
          ruleTitle: 'Signes contraires',
          steps: [
            'B = (+1 500 F) + (-900 F)',
            'B = +(1 500 - 900)',
            'B = +600 F CFA',
          ],
          resultHighlight: 'B = +600 F CFA',
          explanation: 'Le gain (+1 500 F) est plus grand que la perte (-900 F), le résultat est donc positif.',
          tip: 'C’est le nombre qui a la plus grande distance à zéro qui donne son signe au résultat final !',
        },
        {
          name: 'Soustraction : Ajouter l’opposé',
          badge: '🔄',
          ruleTitle: 'Règle d’or du CIAM',
          steps: [
            'C = (+12) - (-8)',
            'C = (+12) + (+8)',
            'C = +20',
          ],
          resultHighlight: 'C = +20',
          explanation: 'Soustraire (-8) revient à ajouter son opposé (+8). Les deux signes moins consécutifs - (-8) font + (+8).',
          tip: 'Ne calcule jamais une soustraction de tête : écris toujours la ligne intermédiaire avec le signe + !',
        },
      ],
      kokoTip: 'Pour comparer deux négatifs (ex: -5 et -20), imagine le thermomètre ou la dette : -5 est plus grand que -20 car il est plus proche de 0 !',
      pitfallToAvoid: 'Penser que deux moins font toujours un plus ! C’est vrai pour - (-b) = +b, mais (-5) + (-3) = -8 et NON +8 !',
    },
    sections: [
      {
        title: '1. Qu’est-ce qu’un nombre relatif ?',
        explanation: [
          'Un nombre relatif a un SIGNE (+ ou -) et une DISTANCE À ZÉRO.',
          'Les nombres positifs (+) représentent des hauteurs au-dessus du niveau de la mer (Mont Bengoué : +1 070 m) ou de l’argent que l’on gagne.',
          'Les nombres négatifs (-) représentent des profondeurs marines (-80 m dans l’Atlantique), des dettes d’argent ou des températures sous zéro.',
          'Le zéro (0) est le seul nombre à la fois positif et négatif (le niveau de la mer).',
        ],
        rules: [
          {
            name: 'Comparaison des nombres négatifs',
            description: 'Entre deux nombres négatifs, le plus grand est le plus proche de zéro.',
            example: '-2 > -7  car -2 est plus proche de 0 (avoir une dette de 2 000 F est moins grave qu’une dette de 7 000 F !)',
          },
        ],
      },
      {
        title: '2. Addition de deux nombres relatifs',
        explanation: [
          'Cas 1 (Même signe) : On garde le signe commun et on additionne les distances.',
          'Cas 2 (Signes contraires) : On prend le signe du champion (celui qui a la plus grande distance à zéro) et on fait la différence des distances.',
        ],
        rules: [
          {
            name: 'Exemples concrets au Gabon',
            description: 'Gains et pertes d’argent en F CFA.',
            example: '(-400 F) + (-300 F) = -700 F CFA  |  (-900 F) + (+400 F) = -500 F CFA',
          },
        ],
      },
      {
        title: '3. Soustraction de relatifs (Transformer en addition de l’opposé)',
        explanation: [
          'En 5ème, retiens bien cette règle d’or : On ne fait JAMAIS de soustraction directe de relatifs !',
          'On transforme TOUTE soustraction en addition de l’opposé : a - b = a + (-b).',
          'Deux signes "moins" qui se touchent se transforment en "+" : - (-5) devient + (+5).',
        ],
        rules: [
          {
            name: 'Règle d’or de la soustraction',
            description: 'Soustraire un nombre, c’est ajouter son opposé.',
            example: '(+8) - (-5) = (+8) + (+5) = +13   |   (-6) - (+4) = (-6) + (-4) = -10',
          },
        ],
      },
    ],
    exercises: ALL_EXERCISES_BY_CHAPTER['chap-2-relatifs'] || [],
  },

  // ==========================================
  // CHAPITRE 3 : FRACTIONS & PARTAGES
  // ==========================================
  {
    id: 'chap-3-fractions',
    domainId: 'nombres-calculs',
    order: 3,
    title: 'Fractions & Écritures Fractionnaires : Égalités & Sommes',
    badge: 'Chapitre 3 · 5ème Gabon',
    shortDesc: 'Partages d’atangas et beignets, fractions égales, simplification par le PGCD et additions.',
    themeColor: '#f97316',
    themeGradient: 'from-orange-500 via-amber-400 to-yellow-400',
    readingTimeMinutes: 15,
    visualizerType: 'fractions',
    keyFormulas: [
      'Fraction égale : (a × k) / (b × k) = a / b',
      'Même dénominateur : a/c + b/c = (a + b) / c',
      'Prendre une fraction d’une quantité : (a/b) × N = (a × N) / b',
    ],
    memoSheet: {
      title: 'Fiche Mémo : Fractions & Partages',
      slogan: 'Simplifier et additionner des fractions pas à pas',
      summaryBulletPoints: [
        'Dénominateur (en bas) = nombre total de parts égales découpées.',
        'Numérateur (en haut) = nombre de parts sélectionnées.',
        'Pour simplifier : diviser haut et bas par le même diviseur commun.',
        'Pour additionner : trouver d’abord un dénominateur commun, puis additionner les numérateurs.',
        'Ne JAMAIS additionner les dénominateurs entre eux (3/5 + 1/5 = 4/5 et NON 4/10) !',
      ],
      verticalFormulas: [
        {
          name: 'Simplification de fraction',
          badge: '✂️',
          ruleTitle: 'Division haut & bas',
          steps: [
            'F = 15 / 20',
            'F = (15 ÷ 5) / (20 ÷ 5)',
            'F = 3 / 4',
          ],
          resultHighlight: 'F = 3/4',
          explanation: '15 et 20 se terminent par 5 et 0, on les divise tous les deux par 5 pour obtenir la fraction irréductible.',
          tip: 'Pense aux tables de multiplication (table de 2, 3, 5 ou 10) !',
        },
        {
          name: 'Addition avec dénominateurs multiples',
          badge: '➕',
          ruleTitle: 'Mise au même dénominateur',
          steps: [
            'S = 1/2 + 3/4',
            'S = (1 × 2) / (2 × 2) + 3/4',
            'S = 2/4 + 3/4',
            'S = 5/4',
          ],
          resultHighlight: 'S = 5/4',
          explanation: '4 est un multiple de 2 (2 × 2 = 4). On convertit 1/2 en 2/4 pour avoir le même dénominateur.',
          tip: 'Une fois que le bas est identique (4), on additionne SEULEMENT le haut : 2 + 3 = 5 !',
        },
        {
          name: 'Prendre une fraction d’une somme en F CFA',
          badge: '💰',
          ruleTitle: 'Partage en Franc CFA',
          steps: [
            'Somme = 40 000 F × (3/5)',
            'Somme = (40 000 ÷ 5) × 3',
            'Somme = 8 000 × 3',
            'Somme = 24 000 F CFA',
          ],
          resultHighlight: 'Somme = 24 000 F CFA',
          explanation: 'On calcule d’abord 1 part (40 000 ÷ 5 = 8 000 F), puis on prend 3 parts (8 000 × 3).',
          tip: 'Divise toujours d’abord par le dénominateur pour manipuler des petits nombres !',
        },
      ],
      kokoTip: 'Avant d’écrire le résultat final, vérifie toujours si la fraction peut encore être simplifiée !',
      pitfallToAvoid: 'Le piège n°1 au collège : additionner les dénominateurs (ex: 1/2 + 1/2 = 2/4 = 1/2 ! C’est faux ! 1 demi + 1 demi = 1 entier 2/2 = 1) !',
    },
    sections: [
      {
        title: '1. Comprendre la fraction (Le partage équitable)',
        explanation: [
          'Une fraction a/b représente un partage en parts égales.',
          'Le DÉNOMINATEUR (en bas, b) indique en combien de parts égales on a coupé le gâteau ou le tas d’atangas.',
          'Le NUMÉRATEUR (en haut, a) indique combien de parts tu prends ou manges.',
        ],
        rules: [
          {
            name: 'Fractions égales & Simplification',
            description: 'On ne change pas une fraction si on multiplie ou divise en haut et en bas par le même nombre.',
            example: '6 atangas sur 8 = 6/8 = (6 ÷ 2) / (8 ÷ 2) = 3/4 (Fraction simplifiée irréductible)',
          },
        ],
      },
      {
        title: '2. Additionner et soustraire des fractions',
        explanation: [
          'ATTENTION INTERDIT : On ne peut JAMAIS additionner des fractions qui n’ont pas les mêmes parts (même dénominateur) !',
          'Si les dénominateurs sont différents, on met d’abord la fraction au même dénominateur.',
        ],
        rules: [
          {
            name: 'Règle du dénominateur commun',
            description: 'On additionne seulement les numérateurs, le dénominateur commun reste intact !',
            example: '1/3 + 5/12 = (1 × 4) / (3 × 4) + 5/12 = 4/12 + 5/12 = 9/12 = 3/4',
            tip: 'Visualise des parts : 4 douzièmes + 5 douzièmes = 9 douzièmes !',
          },
        ],
      },
      {
        title: '3. Prendre une fraction d’une somme en F CFA',
        explanation: [
          'Prendre les 3/4 de 20 000 F CFA : on divise par 4, puis on multiplie par 3.',
        ],
        rules: [
          {
            name: 'Calcul pratique',
            description: '(20 000 ÷ 4) × 3 = 5 000 × 3 = 15 000 F CFA.',
            example: 'Les 3/4 de 20 000 F CFA valent 15 000 F CFA.',
          },
        ],
      },
    ],
    exercises: ALL_EXERCISES_BY_CHAPTER['chap-3-fractions'] || [],
  },

  // ==========================================
  // CHAPITRE 4 : PROPORTIONNALITÉ & POURCENTAGES
  // ==========================================
  {
    id: 'chap-4-proportionnalite',
    domainId: 'donnees-fonctions',
    order: 4,
    title: 'Proportionnalité, Règle de trois & Pourcentages au Marché',
    badge: 'Chapitre 4 · 5ème Gabon',
    shortDesc: 'Marché Mont-Bouët, produit en croix, remises en F CFA et échelles des cartes du Gabon.',
    themeColor: '#ec4899',
    themeGradient: 'from-pink-500 via-rose-400 to-amber-400',
    readingTimeMinutes: 13,
    visualizerType: 'proportion',
    keyFormulas: [
      'Produit en croix : x = (diagonale 1 × diagonale 2) ÷ nombre restant',
      'Calculer t% de N : (N × t) ÷ 100',
      'Prix après remise : Prix initial - Remise',
    ],
    memoSheet: {
      title: 'Fiche Mémo : Proportionnalité & Pourcentages',
      slogan: 'Maîtriser le produit en croix et les calculs de remises au marché',
      summaryBulletPoints: [
        'Deux grandeurs sont proportionnelles si on multiplie l’une par un coefficient constant pour trouver l’autre.',
        'Produit en croix : on multiplie les deux nombres sur la diagonale complète, et on divise par le troisième.',
        'Pourcentages repères : 50% = diviser par 2 | 25% = diviser par 4 | 10% = diviser par 10.',
        'Pour calculer t% : on multiplie par t et on divise par 100.',
      ],
      verticalFormulas: [
        {
          name: 'Produit en croix (Cahiers au marché)',
          badge: '📓',
          ruleTitle: 'Règle de trois',
          steps: [
            'x = (7 cahiers × 1 200 F) ÷ 3 cahiers',
            'x = 8 400 ÷ 3',
            'x = 2 800 F CFA',
          ],
          resultHighlight: 'x = 2 800 F CFA',
          explanation: 'Si 3 cahiers coûtent 1 200 F, on multiplie en diagonale 7 × 1 200, puis on divise par 3.',
          tip: 'Trace mentalement une croix dans le tableau pour repérer la diagonale complète !',
        },
        {
          name: 'Calcul de remise de 25% en boutique',
          badge: '🏷️',
          ruleTitle: 'Remise & Prix final',
          steps: [
            'Remise = 16 000 F × (25 / 100)',
            'Remise = 16 000 F ÷ 4',
            'Remise = 4 000 F CFA',
            'Prix final = 16 000 - 4 000 = 12 000 F CFA',
          ],
          resultHighlight: 'Prix final = 12 000 F CFA',
          explanation: '25% correspond au quart du montant total. On soustrait ensuite la remise au prix initial.',
          tip: 'N’oublie pas de soustraire la remise pour donner le prix payé en caisse !',
        },
        {
          name: 'Vitesse, Distance et Temps',
          badge: '🚗',
          ruleTitle: 'd = v × t',
          steps: [
            'Distance = Vitesse × Temps',
            'Distance = 80 km/h × 2,5 h',
            'Distance = 200 km',
          ],
          resultHighlight: 'Distance = 200 km',
          explanation: 'Attention : 2 heures et 30 minutes s’écrit 2,5 heures en écriture décimale (et non 2,3 h !).',
          tip: '30 minutes = 0,5 heure (la moitié d’une heure) !',
        },
      ],
      kokoTip: 'Dans un problème de pourcentage, lis bien la consigne : demande-t-on le MONTANT de la réduction ou le PRIX FINAL après réduction ?',
      pitfallToAvoid: 'Ne jamais additionner directement deux remises successives (ex: -20% puis -10% ne fait JAMAIS -30% car la 2ème s’applique sur le prix déjà réduit) !',
    },
    sections: [
      {
        title: '1. La Proportionnalité dans la vie courante au Gabon',
        explanation: [
          'Deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre : le COEFFICIENT DE PROPORTIONNALITÉ (le prix à l’unité).',
        ],
        rules: [
          {
            name: 'Le prix unitaire',
            description: 'Si 3 régimes de bananes coûtent 4 500 F CFA, 1 régime coûte 4 500 ÷ 3 = 1 500 F CFA.',
            example: 'Pour 7 régimes : 7 × 1 500 F = 10 500 F CFA.',
          },
        ],
      },
      {
        title: '2. Le Produit en croix magique',
        explanation: [
          'C’est l’outil le plus puissant du commerçant !',
          'Si tu as un tableau à 4 cases avec une case inconnue x, multiplie en diagonale et divise par le nombre restant.',
        ],
        rules: [
          {
            name: 'Formule du produit en croix',
            description: 'x = (valeur 1 × valeur 2) ÷ valeur 3.',
            example: 'Si 4 kg de poissons du fleuve Ogooué coûtent 6 000 F, alors 10 kg coûtent (10 × 6 000) ÷ 4 = 15 000 F CFA.',
          },
        ],
      },
      {
        title: '3. Les Pourcentages (Soldes & Réductions)',
        explanation: [
          'Prendre 20% d’une somme, c’est multiplier par 20 et diviser par 100 (ou multiplier par 0,20).',
          '50% = la moitié | 25% = le quart | 10% = le dixième (diviser par 10).',
        ],
        rules: [
          {
            name: 'Calcul de remise en boutique',
            description: 'Remise de 20% sur un maillot des Panthères du Gabon à 15 000 F CFA.',
            example: 'Remise = (15 000 × 20) ÷ 100 = 3 000 F. Prix payé = 15 000 - 3 000 = 12 000 F CFA.',
          },
        ],
      },
    ],
    exercises: ALL_EXERCISES_BY_CHAPTER['chap-4-proportionnalite'] || [],
  },

  // ==========================================
  // CHAPITRE 5 : TRIANGLES & ANGLES
  // ==========================================
  {
    id: 'chap-5-triangles',
    domainId: 'geometrie',
    order: 5,
    title: 'Triangles : Inégalité triangulaire & Somme des angles (180°)',
    badge: 'Chapitre 5 · 5ème Gabon',
    shortDesc: 'Constructibilité au compas, théorème fondamental des 180° et triangles particuliers.',
    themeColor: '#8b5cf6',
    themeGradient: 'from-violet-500 via-purple-500 to-indigo-500',
    readingTimeMinutes: 14,
    visualizerType: 'triangle',
    keyFormulas: [
      'Inégalité triangulaire : Le plus grand côté < Somme des deux autres',
      'Somme des angles : Dans TOUT triangle, Â + B̂ + Ĉ = 180°',
      'Triangle rectangle : Â = 90°, les deux autres angles font 90° ensemble',
      'Triangle équilatéral : 3 angles égaux de 60° (180 ÷ 3)',
    ],
    memoSheet: {
      title: 'Fiche Mémo : Triangles & Angles',
      slogan: 'Le théorème fondamental des 180° et la constructibilité au compas',
      summaryBulletPoints: [
        'Dans N’IMPORTE QUEL triangle, la somme des trois angles vaut TOUJOURS 180°.',
        'Triangle rectangle : possède un angle droit de 90° ; les deux autres angles ont une somme de 90°.',
        'Triangle isocèle : possède 2 côtés égaux et 2 angles à la base égaux.',
        'Triangle équilatéral : possède 3 côtés égaux et 3 angles égaux à 60° (180° ÷ 3).',
        'Inégalité triangulaire : un triangle est constructible si le plus grand côté est STRICTEMENT INFÉRIEUR à la somme des deux autres.',
      ],
      verticalFormulas: [
        {
          name: 'Calcul du 3ème angle (Théorème des 180°)',
          badge: '📐',
          ruleTitle: 'Â + B̂ + Ĉ = 180°',
          steps: [
            'Dans le triangle ABC :',
            'Â + B̂ + Ĉ = 180°',
            'Ĉ = 180° - (50° + 70°)',
            'Ĉ = 180° - 120°',
            'Ĉ = 60°',
          ],
          resultHighlight: 'Ĉ = 60°',
          explanation: 'On additionne les deux angles connus (50 + 70 = 120°), puis on soustrait le résultat à 180°.',
          tip: 'Écris toujours la phrase d’introduction : "Dans le triangle ABC, la somme des angles vaut 180°" !',
        },
        {
          name: 'Angles à la base d’un triangle isocèle',
          badge: '⛰️',
          ruleTitle: 'Triangle isocèle',
          steps: [
            'Angle au sommet Â = 40°',
            'B̂ + Ĉ = 180° - 40° = 140°',
            'Comme le triangle est isocèle : B̂ = Ĉ',
            'B̂ = Ĉ = 140° ÷ 2',
            'B̂ = Ĉ = 70°',
          ],
          resultHighlight: 'B̂ = Ĉ = 70°',
          explanation: 'On soustrait l’angle au sommet à 180°, puis on partage équitablement entre les deux angles à la base.',
          tip: 'Les deux angles à la base d’un triangle isocèle sont toujours jumeaux (identiques) !',
        },
        {
          name: 'Test de l’inégalité triangulaire',
          badge: '🚧',
          ruleTitle: 'Constructibilité',
          steps: [
            'Côtés : 3 cm, 4 cm, 9 cm',
            'Plus grand côté = 9 cm',
            'Somme des deux autres = 3 + 4 = 7 cm',
            'Or : 9 > 7',
            'Conclusion : Triangle impossible à fermer !',
          ],
          resultHighlight: 'Impossible à tracer',
          explanation: 'Le plus grand côté (9) dépasse la somme des deux autres (7). Les cercles de tracé au compas ne se croisent pas.',
          tip: 'Si la somme est égale au plus grand côté (ex: 4 + 6 = 10), les 3 points sont alignés (triangle plat).',
        },
      ],
      kokoTip: 'Au rapporteur, vérifie toujours si ton angle est aigu (< 90°) ou obtus (> 90°) pour ne pas lire la mauvaise graduation !',
      pitfallToAvoid: 'Affirmer qu’un triangle a pour angles 60°, 70° et 60° : fais toujours la somme (60 + 70 + 60 = 190° ≠ 180°, c’est impossible) !',
    },
    sections: [
      {
        title: '1. Inégalité triangulaire : Peut-on toujours tracer un triangle ?',
        explanation: [
          'NON ! Si tu prends trois bâtons de bois d’okoumé de 3 cm, 4 cm et 9 cm, ils ne pourront jamais se toucher pour fermer le triangle !',
          'Règle : Le plus grand côté doit être STRICTEMENT PLUS PETIT que la somme des deux autres.',
        ],
        rules: [
          {
            name: 'Critère de constructibilité',
            description: 'Plus grand côté < Côté 2 + Côté 3.',
            example: 'Côtés 3 cm, 4 cm, 9 cm : 9 > 3 + 4 (9 > 7), impossible à tracer ! Côtés 5, 7, 10 cm : 10 < 5 + 7, triangle valide.',
          },
        ],
      },
      {
        title: '2. Le Théorème Fondamental des 180°',
        explanation: [
          'Peu importe que le triangle soit géant comme le Gabon ou minuscule comme un grain de sable, la somme de ses trois angles fait TOUJOURS 180° (un angle plat) !',
        ],
        rules: [
          {
            name: 'Formule des 180°',
            description: 'Dans le triangle ABC : Â + B̂ + Ĉ = 180°.',
            example: 'Si Â = 50° et B̂ = 70°, alors Ĉ = 180° - (50° + 70°) = 180° - 120° = 60°.',
          },
        ],
      },
    ],
    exercises: ALL_EXERCISES_BY_CHAPTER['chap-5-triangles'] || [],
  },

  // ==========================================
  // CHAPITRE 6 : PÉRIMÈTRES & AIRES
  // ==========================================
  {
    id: 'chap-6-aires',
    domainId: 'mesures',
    order: 6,
    title: 'Aires du Triangle, du Parallélogramme & du Disque',
    badge: 'Chapitre 6 · 5ème Gabon',
    shortDesc: 'Calculer les surfaces de terrains, pignons de maisons gabonaises et rond-points.',
    themeColor: '#10b981',
    themeGradient: 'from-emerald-500 via-green-400 to-lime-400',
    readingTimeMinutes: 12,
    keyFormulas: [
      'Aire du triangle : (base × hauteur) ÷ 2',
      'Aire du parallélogramme : base × hauteur',
      'Périmètre du cercle : 2 × π × r = π × d',
      'Aire du disque : π × r² (avec π ≈ 3,14)',
    ],
    memoSheet: {
      title: 'Fiche Mémo : Périmètres & Aires',
      slogan: 'Toutes les formules d’aires géométriques avec décomposition en colonne',
      summaryBulletPoints: [
        'Périmètre = longueur du contour extérieur (en m ou cm).',
        'Aire = mesure de la surface intérieure (en m² ou cm²).',
        'Triangle : (Base × Hauteur) ÷ 2 (la hauteur doit être perpendiculaire à la base).',
        'Parallélogramme : Base × Hauteur (on ne divise pas par 2 !).',
        'Cercle & Disque : Périmètre = 2 × π × r | Aire = π × r² (avec π ≈ 3,14).',
      ],
      verticalFormulas: [
        {
          name: 'Aire d’un triangle (Diviser par 2 !)',
          badge: '🔺',
          ruleTitle: '(b × h) ÷ 2',
          steps: [
            'Aire = (Base × Hauteur) ÷ 2',
            'Aire = (12 cm × 7 cm) ÷ 2',
            'Aire = 84 ÷ 2',
            'Aire = 42 cm²',
          ],
          resultHighlight: 'Aire = 42 cm²',
          explanation: 'Tout triangle est la moitié d’un rectangle de même base et hauteur.',
          tip: 'N’oublie jamais de diviser par 2 pour le triangle ! C’est l’erreur la plus fréquente.',
        },
        {
          name: 'Aire d’un parallélogramme',
          badge: '▰',
          ruleTitle: 'b × h',
          steps: [
            'Aire = Base × Hauteur',
            'Aire = 9 cm × 4 cm',
            'Aire = 36 cm²',
          ],
          resultHighlight: 'Aire = 36 cm²',
          explanation: 'Pour le parallélogramme, on multiplie directement la base par la hauteur relative correspondante.',
          tip: 'Attention : le côté oblique n’est pas la hauteur ! La hauteur est perpendiculaire.',
        },
        {
          name: 'Périmètre et Aire d’un disque (π ≈ 3,14)',
          badge: '⭕',
          ruleTitle: 'Cercle & Disque',
          steps: [
            'Rayon r = 5 cm',
            'Périmètre = 2 × π × r = 2 × 3,14 × 5 = 31,4 cm',
            'Aire = π × r² = 3,14 × 5 × 5',
            'Aire = 3,14 × 25',
            'Aire = 78,5 cm²',
          ],
          resultHighlight: 'Aire = 78,5 cm²',
          explanation: 'Périmètre pour la longueur du tour (en cm), Aire pour la surface du disque (en cm²).',
          tip: 'Moyen mnémotechnique : 2πr pour le périmètre, πr² pour l’aire !',
        },
      ],
      kokoTip: 'Avant de calculer une aire, vérifie toujours que la base et la hauteur sont exprimées dans la MÊME unité (tout en cm, ou tout en m) !',
      pitfallToAvoid: 'Confondre le rayon (du centre au bord) et le diamètre (qui traverse tout). Si le diamètre fait 10 cm, le rayon vaut 5 cm !',
    },
    sections: [
      {
        title: '1. Aire du triangle (La moitié du rectangle)',
        explanation: [
          'Tout triangle est la moitié exacte d’un parallélogramme ou d’un rectangle ayant la même base et la même hauteur.',
          'Formule : Aire = (Base × Hauteur relative) ÷ 2.',
          'Attention : La hauteur doit obligatoirement être perpendiculaire à la base choisie !',
        ],
        rules: [
          {
            name: 'Formule de l’aire du triangle',
            description: 'Aire = (b × h) ÷ 2.',
            example: 'Base = 12 m, Hauteur = 5 m ➔ Aire = (12 × 5) ÷ 2 = 60 ÷ 2 = 30 m².',
          },
        ],
      },
      {
        title: '2. Aire et Périmètre du disque & cercle',
        explanation: [
          'Le nombre π (Pi) est un nombre magique qui vaut environ 3,14.',
          'Le rayon (r) va du centre au bord. Le diamètre (d) traverse tout le disque (d = 2r).',
        ],
        rules: [
          {
            name: 'Périmètre du rond-point (longueur du bord)',
            description: 'Périmètre = 2 × π × r = π × d.',
            example: 'Rayon r = 10 m ➔ Périmètre = 2 × 3,14 × 10 = 62,8 m.',
          },
          {
            name: 'Aire du disque (surface intérieure)',
            description: 'Aire = π × r² = π × r × r.',
            example: 'Rayon r = 5 m ➔ Aire = 3,14 × 5² = 3,14 × 25 = 78,5 m².',
          },
        ],
      },
    ],
    exercises: ALL_EXERCISES_BY_CHAPTER['chap-6-aires'] || [],
  },
];
