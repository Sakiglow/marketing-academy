import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════
// MARKETING ACADEMY v2.0 — Ventura Highway SA
// Parcours complet : 4 chapitres · 22 modules
// Niveaux : 🟢 Noob → 🟡 Pro → 🔴 Expert
// ═══════════════════════════════════════════════

const LEVELS = [
  { id: "noob", name: "Noob", badge: "🟢", color: "#2D6A4F", chapters: ["ch1", "ch2"] },
  { id: "pro", name: "Pro", badge: "🟡", color: "#F4A261", chapters: ["ch3"] },
  { id: "expert", name: "Expert", badge: "🔴", color: "#E76F51", chapters: ["ch4"] }
];

const COURSES = [
  {
    id: "ch1", chapter: "Chapitre 1", title: "Les Bases", color: "#2D6A4F", level: "noob",
    modules: [
      {
        id: "m0", num: 0, title: "L'histoire du chef et de la pancarte magique", type: "story", duration: "3 min",
        content: {
          intro: "Avant de plonger dans la théorie, découvre comment un simple geste marketing a tout changé pour un petit restaurant de quartier...",
          sections: [
            { title: "Le conte", body: "Il était une fois un chef talentueux dont le restaurant restait vide. Un jour, il place une pancarte avec une phrase simple devant sa porte. Les passants s'arrêtent, entrent, et ne repartent plus. Ce n'était pas de la magie — c'était du marketing." }
          ],
          takeaway: "Le marketing n'est pas de la manipulation. C'est l'art de rendre visible ce qui mérite de l'être."
        }
      },
      {
        id: "m1", num: 1, title: "Les fondamentaux du marketing", type: "cours", duration: "8 min",
        content: {
          intro: "Comprendre ce qu'est le marketing et pourquoi il est essentiel dans la restauration.",
          sections: [
            { title: "Les 3 piliers", body: "① Comprendre le client — ses besoins, ses envies, ses habitudes.\n② Créer de la valeur perçue — ce que le client ressent par rapport à ce qu'il paie.\n③ Relier tous les métiers — cuisine, salle, communication, tout est marketing." },
            { title: "Exemple concret", body: "Chez ma cousine : un client découvre le restaurant sur Instagram → il passe devant la terrasse → il est accueilli avec un sourire → il revient la semaine suivante. Chaque étape est du marketing." },
            { title: "Le message clé", body: "\"Le marketing, c'est la somme de tous les détails qui font que le client choisit ton restaurant.\"" }
          ],
          takeaway: "Le marketing commence bien avant la publicité. Il commence par l'attention portée au client."
        },
        quiz: [
          { q: "Quel est le premier pilier du marketing en restauration ?", options: ["Faire de la publicité", "Comprendre le client", "Baisser les prix", "Poster sur Instagram"], correct: 1 },
          { q: "La valeur perçue, c'est :", options: ["Le prix réel du plat", "Ce que le client ressent par rapport à ce qu'il paie", "La marge bénéficiaire", "Le coût des ingrédients"], correct: 1 },
          { q: "Le marketing dans un restaurant concerne :", options: ["Uniquement la communication", "Uniquement la cuisine", "Tous les métiers et tous les détails", "Le manager uniquement"], correct: 2 }
        ]
      },
      {
        id: "m2", num: 2, title: "Le marché et les clients", type: "cours", duration: "8 min",
        content: {
          intro: "Identifier les profils de clients et comprendre leurs motivations pour mieux adapter l'offre.",
          sections: [
            { title: "La segmentation", body: "Segmenter = découper son marché en groupes cohérents. Dans nos restaurants : les familles (convivialité), les touristes (authenticité), les habitués (confiance), les travailleurs (efficacité)." },
            { title: "Les personas", body: "Un persona = un portrait fictif mais réaliste d'un client type. Exemple : \"Sophie, 38 ans, cadre bancaire, déjeune 2x/semaine. Elle aime l'efficacité et la constance. Elle réserve via Google Maps.\"" },
            { title: "Les motivations d'achat", body: "Derrière chaque repas : Pratique (manger vite), Plaisir (se faire plaisir), Sociale (partager un moment), Statutaire (être vu au bon endroit)." },
            { title: "Le parcours client", body: "AVANT (découverte) → PENDANT (accueil, service, plats) → APRÈS (avis, fidélisation). Chaque étape est une opportunité marketing." }
          ],
          takeaway: "Bien connaître ses clients, c'est anticiper leurs besoins avant même qu'ils les expriment."
        },
        quiz: [
          { q: "Un persona, c'est :", options: ["Une vraie personne interviewée", "Un portrait fictif mais réaliste d'un client type", "Le directeur du restaurant", "Un influenceur"], correct: 1 },
          { q: "Quelles sont les 3 phases du parcours client ?", options: ["Entrée, Plat, Dessert", "Avant, Pendant, Après", "Google, Instagram, TikTok", "Lundi, Mercredi, Vendredi"], correct: 1 }
        ]
      },
      {
        id: "m3", num: 3, title: "Le positionnement et la marque", type: "cours", duration: "8 min",
        content: {
          intro: "Définir ce qui rend chaque concept unique et construire une marque cohérente.",
          sections: [
            { title: "Le positionnement", body: "C'est la place que ton restaurant occupe dans l'esprit du client. 4 axes : Prix, Produit, Image, Promesse. Un bon positionnement se résume en une phrase claire." },
            { title: "La marque", body: "La marque = la somme des émotions que ton restaurant fait vivre. Elle s'exprime par : l'identité visuelle, le ton, l'ambiance et les valeurs." },
            { title: "La cohérence", body: "Si tu dis \"accueil chaleureux\" mais que le client attend 10 min à la porte → la cohérence se brise. Chaque détail renforce ou détruit la promesse." },
            { title: "Exemples", body: "Chez ma cousine → Simple / Généreux / Convivial\nMargherita Social Club → Moderne / Italien / Partage\nDeux positionnements clairs et distincts qui cohabitent sans se marcher dessus." }
          ],
          takeaway: "Une marque forte ne se résume pas à un logo. C'est une expérience cohérente entre ce qu'on promet et ce que le client ressent."
        },
        quiz: [
          { q: "Les 4 axes du positionnement sont :", options: ["Produit, Prix, Place, Promotion", "Prix, Produit, Image, Promesse", "Logo, Couleurs, Typo, Slogan", "Facebook, Instagram, Google, TikTok"], correct: 1 },
          { q: "La marque d'un restaurant, c'est :", options: ["Son logo uniquement", "Son nom sur Google", "La somme des émotions qu'il fait vivre", "Sa note sur TripAdvisor"], correct: 2 }
        ]
      },
      {
        id: "m4", num: 4, title: "Le mix marketing (4P)", type: "cours", duration: "8 min",
        content: {
          intro: "Comprendre les 4 leviers d'action du marketing pour piloter la performance.",
          sections: [
            { title: "Produit", body: "Ce que tu proposes : la carte, les plats, mais aussi l'ambiance, le service, la vaisselle, la musique. Le produit = la promesse rendue visible." },
            { title: "Prix", body: "Le prix doit refléter la valeur perçue. Un prix juste = celui qui fait dire \"ça les vaut\". Trop bas → impression de moindre qualité. Trop haut → blocage." },
            { title: "Place (distribution)", body: "Comment le client accède à ton offre : lieu, horaires, livraison, présence digitale. Si le client ne te trouve pas, même la meilleure cuisine ne suffit pas." },
            { title: "Promotion", body: "Tout ce que tu fais pour te faire connaître : visuels, actions locales, bouche-à-oreille, présence en ligne. La promotion, ce n'est pas parler fort, c'est parler juste." }
          ],
          takeaway: "Les 4P doivent former un ensemble cohérent. Le succès repose sur l'équilibre entre tous."
        },
        quiz: [
          { q: "Dans les 4P, le \"Place\" signifie :", options: ["La place du restaurant dans le classement", "La distribution — comment le client accède à l'offre", "La place assise au restaurant", "La place de parking"], correct: 1 },
          { q: "Si les ventes baissent, il faut :", options: ["Toujours baisser les prix", "Toujours poster plus sur Instagram", "Analyser les 4P pour trouver le déséquilibre", "Changer le logo"], correct: 2 }
        ]
      },
      {
        id: "m5", num: 5, title: "La communication et la notoriété", type: "cours", duration: "8 min",
        content: {
          intro: "Savoir faire connaître et aimer nos établissements avec une image cohérente.",
          sections: [
            { title: "Le mix communication", body: "Publicité (payante), Relations publiques (presse, influenceurs), Marketing direct (newsletter, SMS), Promotion des ventes (offres), Bouche-à-oreille (recommandations)." },
            { title: "Les canaux", body: "Online : réseaux sociaux, Google, site web, newsletters.\nOffline : vitrine, flyers, événements, partenariats locaux.\nLe meilleur canal = celui où sont tes clients." },
            { title: "La notoriété", body: "3 niveaux : Spontanée (le client pense à toi en premier), Assistée (il te reconnaît quand on cite ton nom), Qualifiée (il sait ce que tu proposes). L'objectif : passer de inconnu à réflexe." },
            { title: "Cohérence de marque", body: "Même ton, mêmes couleurs, même promesse sur TOUS les supports. Un client doit reconnaître ta marque en 3 secondes, que ce soit sur Instagram, sur ta vitrine ou dans un article." }
          ],
          takeaway: "Communiquer, ce n'est pas tout dire partout. C'est dire la bonne chose, au bon endroit, au bon moment."
        },
        quiz: [
          { q: "Le bouche-à-oreille fait partie :", options: ["Du mix communication", "De la décoration intérieure", "Du bilan comptable", "Du droit du travail"], correct: 0 },
          { q: "La notoriété spontanée signifie :", options: ["Le client a vu une pub", "Le client pense à toi en premier sans aide", "Le client te suit sur Instagram", "Le client a une carte de fidélité"], correct: 1 }
        ]
      },
      {
        id: "m6", num: 6, title: "L'expérience client", type: "cours", duration: "8 min",
        content: {
          intro: "L'expérience vécue par le client est le meilleur outil marketing d'un restaurant.",
          sections: [
            { title: "Les moments de vérité", body: "Chaque interaction est un moment de vérité : la réservation, l'arrivée, l'accueil, la commande, le plat, l'addition, le départ. Un seul faux pas peut effacer une bonne expérience." },
            { title: "L'effet WOW", body: "Créer un moment inattendu et positif : un mot du chef, un dessert offert pour un anniversaire, un café accompagné d'une petite attention. L'effet WOW transforme un client satisfait en ambassadeur." },
            { title: "Le service comme marketing", body: "Le serveur est le premier commercial du restaurant. Son sourire, sa connaissance de la carte, sa capacité à recommander : c'est du marketing en direct." },
            { title: "Gérer l'insatisfaction", body: "Un client qui se plaint et qui est bien traité devient plus fidèle qu'un client qui n'a jamais eu de problème. La récupération de service = opportunité marketing." }
          ],
          takeaway: "Le marketing ne s'arrête pas à la porte. Il se vit à chaque seconde passée dans le restaurant."
        },
        quiz: [
          { q: "Un \"moment de vérité\" c'est :", options: ["La fin du repas uniquement", "Chaque point de contact entre le client et le restaurant", "Le moment où on fait la caisse", "La réunion d'équipe du lundi"], correct: 1 },
          { q: "Un client mécontent bien traité :", options: ["Ne reviendra jamais", "Devient souvent plus fidèle qu'avant", "Va toujours laisser un avis négatif", "Demande toujours un remboursement"], correct: 1 }
        ]
      },
      {
        id: "m7", num: 7, title: "La fidélisation", type: "cours", duration: "8 min",
        content: {
          intro: "Fidéliser coûte 5x moins cher qu'acquérir un nouveau client. C'est le levier le plus rentable.",
          sections: [
            { title: "Pourquoi fidéliser", body: "Un client fidèle dépense plus, revient plus souvent, recommande autour de lui et pardonne plus facilement. C'est le meilleur investissement marketing." },
            { title: "Les outils", body: "Programme de fidélité, newsletter personnalisée, événements VIP, offres d'anniversaire, surprises régulières. La clé : régularité et sincérité." },
            { title: "Le CRM simplifié", body: "CRM = Customer Relationship Management. En resto : noter les préférences, se souvenir des habitudes, personnaliser l'accueil. Pas besoin d'un logiciel complexe — un carnet suffit pour commencer." },
            { title: "Mesurer la fidélité", body: "Taux de retour, fréquence de visite, panier moyen des habitués vs nouveaux. Si tes habitués représentent moins de 30% de ton CA → il y a un problème de fidélisation." }
          ],
          takeaway: "La fidélisation, c'est l'art de transformer un repas en relation. Les clients fidèles sont la colonne vertébrale du restaurant."
        },
        quiz: [
          { q: "Fidéliser coûte combien de fois moins cher qu'acquérir un nouveau client ?", options: ["2 fois", "5 fois", "10 fois", "C'est pareil"], correct: 1 },
          { q: "Le CRM en restauration, c'est :", options: ["Un logiciel obligatoire et cher", "La gestion de la relation client, même avec un simple carnet", "Le contrôle des recettes mensuelles", "Le calcul du ratio matières"], correct: 1 }
        ]
      }
    ]
  },
  {
    id: "ch2", chapter: "Chapitre 2", title: "Les Fondations", color: "#1B4965", level: "noob",
    modules: [
      {
        id: "m2-0", num: 0, title: "L'histoire du restaurant invisible", type: "story", duration: "3 min",
        content: {
          intro: "Découvre pourquoi un restaurant parfait peut rester désespérément vide...",
          sections: [
            { title: "Le conte", body: "Un restaurateur passionné ouvre le lieu parfait. Mais personne ne vient. Pourquoi ? Parce que personne ne sait qu'il existe. Cette histoire illustre les 3 phases essentielles du marketing : AVANT (attirer), PENDANT (convertir), APRÈS (fidéliser)." }
          ],
          takeaway: "La qualité ne suffit pas. Il faut être visible, convaincant, et mémorable — dans cet ordre."
        }
      },
      {
        id: "m2-1", num: 1, title: "AVANT — Attirer les prospects", type: "cours", duration: "10 min",
        content: {
          intro: "Faire connaître ton restaurant, susciter la curiosité et donner envie aux bonnes personnes de venir.",
          sections: [
            { title: "Connaître ton marché", body: "Actifs du midi → rapidité, prix clair. Couples/amis du soir → ambiance, cocktails. Familles → confort, menu enfant. Touristes → authenticité, carte bilingue." },
            { title: "Formuler ton message", body: "Ton pitch = une phrase, courte, sincère et vraie. Reprise partout : vitrine, carte, publications, discours d'équipe. Si le message est juste, il attire naturellement les bons clients." },
            { title: "Se rendre visible", body: "Digital : fiche Google soignée, réseaux sociaux authentiques, site mobile-friendly.\nPhysique : vitrine vivante, affichage clair, partenariats locaux.\nLe client doit sentir qu'il te connaît avant d'ouvrir la porte." }
          ],
          takeaway: "Attirer, c'est créer de la curiosité. Tu ne vends pas un plat, tu vends une promesse."
        },
        quiz: [
          { q: "Le message clé d'un restaurant doit :", options: ["Lister tous les plats de la carte", "Tenir en une phrase sincère et cohérente", "Mentionner les prix promotionnels", "Être différent sur chaque support"], correct: 1 },
          { q: "Un \"actif du midi\" recherche avant tout :", options: ["Une ambiance romantique", "Rapidité, efficacité et prix clair", "Des plats Instagram-friendly", "Un parking gratuit"], correct: 1 }
        ]
      },
      {
        id: "m2-2", num: 2, title: "PENDANT — Convertir les prospects", type: "cours", duration: "10 min",
        content: {
          intro: "Transformer la curiosité en action : faire réserver et offrir une expérience qui marque.",
          sections: [
            { title: "Point de contact clair", body: "Horaires visibles, réservation facile, carte à jour et lisible sur mobile. Un client qui cherche et ne trouve pas abandonne en 10 secondes." },
            { title: "Accueillir et rassurer", body: "L'impression se forme en moins de 10 secondes : ton, regard, propreté, musique. Un bon accueil = déjà une vente réussie." },
            { title: "Faciliter la décision", body: "Menu clair (trop de choix = confusion). Personnel qui sait recommander. Promotions simples. Expérience fluide sans friction." },
            { title: "Créer un lien", body: "Demander subtilement un avis. Offrir un geste attentionné. Créer un moment photo. Le client se souvient de comment il a été traité." }
          ],
          takeaway: "Convertir, ce n'est pas pousser à acheter. C'est rendre le choix évident et agréable."
        },
        quiz: [
          { q: "En combien de temps un client forme sa première impression ?", options: ["5 minutes", "30 secondes", "Moins de 10 secondes", "Après le dessert"], correct: 2 },
          { q: "Trop de choix sur un menu provoque :", options: ["Plus de ventes", "De la confusion chez le client", "Une meilleure image", "Plus de commandes de desserts"], correct: 1 }
        ]
      },
      {
        id: "m2-3", num: 3, title: "APRÈS — Fidéliser et créer des ambassadeurs", type: "cours", duration: "10 min",
        content: {
          intro: "Prolonger la relation après la visite et transformer la satisfaction en bouche-à-oreille.",
          sections: [
            { title: "Expérience mémorable", body: "Un mot personnalisé, un geste attentionné, une constance exemplaire, une fin soignée. Un client touché > un client satisfait." },
            { title: "Prolonger la relation", body: "QR code pour les avis, réponse à chaque avis avec le ton de marque, affichage des prochains événements, invitations pour les habitués." },
            { title: "Récompenser la fidélité", body: "Carte de fidélité, surprise après 3 visites, offres \"client régulier\", offres saisonnières de rappel. La fidélité = une attention à répéter." },
            { title: "Stimuler les recommandations", body: "Moments instagrammables, encourager les photos/stories, offre parrainage, répondre à TOUS les avis. Les clients satisfaits = ta meilleure campagne." }
          ],
          takeaway: "Fidéliser, ce n'est pas forcer à revenir. C'est donner envie. Les marques durables construisent une relation."
        },
        quiz: [
          { q: "Le bouche-à-oreille est :", options: ["Incontrôlable et inutile", "La publicité la plus crédible et économique", "Réservé aux restaurants étoilés", "Moins efficace qu'une pub Facebook"], correct: 1 },
          { q: "Pour fidéliser, le plus important c'est :", options: ["Les promotions agressives", "Un programme de points complexe", "L'attention sincère et la constance", "Poster tous les jours sur Instagram"], correct: 2 }
        ]
      }
    ]
  },
  {
    id: "ch3", chapter: "Chapitre 3", title: "Le Digital", color: "#F4A261", level: "pro",
    modules: [
      {
        id: "m3-0", num: 0, title: "L'histoire du restaurant qui a conquis Google", type: "story", duration: "3 min",
        content: {
          intro: "Comment un petit restaurant de quartier est devenu le n°1 sur Google Maps grâce à une stratégie digitale simple...",
          sections: [
            { title: "Le conte", body: "Un restaurant familial stagnait à 3.8 étoiles sur Google avec 40 avis. Le manager a mis en place 3 actions simples : répondre à chaque avis, demander systématiquement un avis aux clients satisfaits, et poster une photo par semaine. En 6 mois : 4.6 étoiles, 280 avis, +35% de réservations. Le digital n'est pas compliqué — il demande de la régularité." }
          ],
          takeaway: "Le digital ne remplace pas la qualité. Il la rend visible au monde entier."
        }
      },
      {
        id: "m3-1", num: 1, title: "Google Business Profile — Ta vitrine digitale", type: "cours", duration: "10 min",
        content: {
          intro: "Google Business Profile est souvent le PREMIER contact entre un client et ton restaurant. C'est ta vitrine la plus vue.",
          sections: [
            { title: "Pourquoi c'est crucial", body: "93% des recherches locales passent par Google. Quand quelqu'un cherche \"restaurant italien Genève\", c'est ta fiche Google qui apparaît en premier — avant ton site, avant tes réseaux. Si ta fiche est vide ou mal remplie, tu es invisible." },
            { title: "Les 5 éléments essentiels", body: "① Photos de qualité (min 10, renouvelées régulièrement)\n② Horaires toujours à jour (y compris jours fériés)\n③ Description claire avec mots-clés naturels\n④ Catégorie et attributs corrects\n⑤ Lien de réservation actif" },
            { title: "Les avis Google", body: "Répondre à CHAQUE avis, positif comme négatif. Positif → remercier avec authenticité. Négatif → reconnaître, s'excuser si justifié, proposer une solution. Le ton de la réponse parle autant que l'avis lui-même." },
            { title: "Google Posts", body: "Publier régulièrement des actualités, événements, plats du jour. Ces posts apparaissent directement dans la fiche et montrent que le restaurant est actif et vivant." }
          ],
          takeaway: "Ta fiche Google Business est ton meilleur commercial. Elle travaille 24h/24, 7j/7 — encore faut-il qu'elle soit soignée."
        },
        quiz: [
          { q: "Quel pourcentage des recherches locales passe par Google ?", options: ["50%", "75%", "93%", "100%"], correct: 2 },
          { q: "Face à un avis négatif, il faut :", options: ["L'ignorer", "Le supprimer", "Répondre avec professionnalisme et empathie", "Répondre en se justifiant longuement"], correct: 2 },
          { q: "Combien de photos minimum sur ta fiche Google ?", options: ["1-2 suffisent", "Au moins 10, renouvelées régulièrement", "Pas besoin de photos", "50 minimum"], correct: 1 }
        ]
      },
      {
        id: "m3-2", num: 2, title: "Instagram & Facebook — Créer du lien", type: "cours", duration: "10 min",
        content: {
          intro: "Les réseaux sociaux ne servent pas à vendre — ils servent à créer une relation avec tes clients actuels et futurs.",
          sections: [
            { title: "La règle 80/20", body: "80% de contenu qui inspire, divertit ou informe. 20% de contenu promotionnel. Personne ne suit un restaurant qui ne fait que de la pub. Les gens suivent des histoires, des coulisses, des personnalités." },
            { title: "Les types de contenu qui marchent", body: "Coulisses cuisine (préparation, arrivée produits)\nPortraits d'équipe (humaniser la marque)\nPlats en situation (lumière naturelle, pas de filtre excessif)\nStories interactives (sondages, questions, quiz)\nTémoignages clients (repost de stories)" },
            { title: "La régularité", body: "Mieux vaut 3 posts de qualité par semaine que 10 posts médiocres. Créer un calendrier éditorial simple : Lundi = coulisses, Mercredi = plat vedette, Vendredi = ambiance weekend." },
            { title: "L'engagement", body: "Répondre à TOUS les commentaires et DM. Liker et commenter les posts des clients. Partager les stories des clients qui taguent le restaurant. L'engagement crée la communauté." }
          ],
          takeaway: "Les réseaux sociaux sont une conversation, pas un mégaphone. Écoute autant que tu parles."
        },
        quiz: [
          { q: "La règle 80/20 sur les réseaux signifie :", options: ["80% de pub, 20% de contenu", "80% de contenu inspirant, 20% de promo", "80% Instagram, 20% Facebook", "80% photos, 20% vidéos"], correct: 1 },
          { q: "Quel rythme de publication est recommandé ?", options: ["1 post par mois", "3 posts de qualité par semaine", "10 posts par jour", "Uniquement quand on a une promo"], correct: 1 }
        ]
      },
      {
        id: "m3-3", num: 3, title: "Le site web et le SEO local", type: "cours", duration: "10 min",
        content: {
          intro: "Ton site web est ta maison digitale. Le SEO local te rend trouvable par les clients qui te cherchent sans le savoir.",
          sections: [
            { title: "Le site essentiel", body: "Un site de restaurant doit répondre à 4 questions en moins de 5 secondes : Qu'est-ce qu'on mange ? C'est où ? Combien ça coûte ? Comment réserver ? Si une de ces réponses manque → le client part." },
            { title: "Mobile first", body: "75% des visites sur un site de restaurant viennent du mobile. Si ton site n'est pas parfait sur téléphone, tu perds 3 clients sur 4. Tester son site sur mobile = priorité n°1." },
            { title: "Le SEO local", body: "SEO = Search Engine Optimization. Pour un restaurant, c'est le SEO local qui compte. Tes pages doivent contenir naturellement : nom du quartier, type de cuisine, ville. Exemple : \"Restaurant italien Plainpalais Genève\" dans le titre et le texte." },
            { title: "Le blog comme outil SEO", body: "Publier des articles sur l'actualité du restaurant, les événements du quartier, les produits locaux. Chaque article est une nouvelle porte d'entrée vers ton site depuis Google." }
          ],
          takeaway: "Un bon site web ne remplace pas l'expérience — il la prépare. Le SEO local te rend visible exactement quand le client a faim."
        },
        quiz: [
          { q: "Un site de restaurant doit répondre à combien de questions clés ?", options: ["2", "4", "8", "10"], correct: 1 },
          { q: "Le SEO local pour un restaurant, c'est :", options: ["Payer Google pour apparaître", "Optimiser ses pages avec quartier + type de cuisine + ville", "Acheter un nom de domaine cher", "Avoir le plus de pages possible"], correct: 1 }
        ]
      },
      {
        id: "m3-4", num: 4, title: "La publicité en ligne (Meta Ads & Google Ads)", type: "cours", duration: "10 min",
        content: {
          intro: "La publicité payante amplifie ce qui marche déjà. Elle ne remplace jamais un bon produit et une bonne image.",
          sections: [
            { title: "Quand investir en pub", body: "La pub payante fonctionne SI tu as déjà : une fiche Google soignée, des réseaux actifs, un site fonctionnel. Sans ça, tu paies pour envoyer des clients vers une mauvaise impression." },
            { title: "Meta Ads (Facebook/Instagram)", body: "Idéal pour : événements, brunch, soirées spéciales, nouveaux menus. Ciblage par zone géographique (rayon autour du restaurant), âge, centres d'intérêt. Budget minimum recommandé : 5-10 CHF/jour pendant 7-14 jours." },
            { title: "Google Ads", body: "Idéal pour capter la demande existante : \"restaurant brunch Genève dimanche\". Le client cherche activement → tu apparais en premier. Coût par clic variable (1-3 CHF en restauration locale)." },
            { title: "Mesurer le retour", body: "Toujours mesurer : combien de clics, combien de réservations, quel coût par réservation. Si une campagne coûte 200 CHF et génère 40 réservations → coût de 5 CHF/client. C'est rentable." }
          ],
          takeaway: "La publicité payante est un amplificateur, pas un créateur. Amplifie ce qui marche, pas ce qui ne marche pas."
        },
        quiz: [
          { q: "Avant d'investir en pub payante, il faut :", options: ["Rien de spécial, il suffit de payer", "Avoir une base solide (fiche Google, réseaux, site)", "Avoir au moins 10'000 followers", "Engager une agence"], correct: 1 },
          { q: "Meta Ads est idéal pour :", options: ["Le référencement naturel", "Promouvoir des événements et soirées spéciales", "Remplacer Google Business", "Gérer les réservations"], correct: 1 }
        ]
      },
      {
        id: "m3-5", num: 5, title: "L'email marketing et le CRM digital", type: "cours", duration: "10 min",
        content: {
          intro: "L'email reste le canal avec le meilleur retour sur investissement. Combiné à un CRM, il transforme des visiteurs en habitués.",
          sections: [
            { title: "Pourquoi l'email marche", body: "L'email a un ROI moyen de 36:1 (36 CHF générés pour 1 CHF investi). Contrairement aux réseaux sociaux, tu es propriétaire de ta liste. Pas d'algorithme qui décide si tes clients voient ton message." },
            { title: "Construire sa liste", body: "Wi-Fi du restaurant (email pour se connecter), réservations en ligne, carte de fidélité digitale, concours, QR code sur table. Toujours avec le consentement du client (RGPD)." },
            { title: "Que envoyer", body: "Newsletter mensuelle (nouveautés, événements, coulisses)\nOffre anniversaire automatisée\nRelance après 30 jours sans visite\nInvitation VIP pour les meilleurs clients\nMaximum 2-4 emails par mois." },
            { title: "SevenRooms et le CRM", body: "SevenRooms centralise réservations, données clients, préférences et historique. Il permet d'automatiser des emails personnalisés et de segmenter les clients selon leur comportement. C'est notre outil principal." }
          ],
          takeaway: "L'email est personnel, direct et mesurable. Combiné au CRM, il crée une relation individualisée avec chaque client."
        },
        quiz: [
          { q: "Le ROI moyen de l'email marketing est de :", options: ["5:1", "10:1", "36:1", "100:1"], correct: 2 },
          { q: "Le maximum d'emails recommandé par mois est :", options: ["1", "2-4", "10-15", "Autant que possible"], correct: 1 }
        ]
      },
      {
        id: "m3-6", num: 6, title: "La gestion de la réputation en ligne", type: "cours", duration: "10 min",
        content: {
          intro: "Ta réputation en ligne est la somme de ce que les gens disent de toi quand tu n'es pas là. Il faut la cultiver activement.",
          sections: [
            { title: "Les plateformes clés", body: "Google (le plus impactant), TripAdvisor (touristes), TheFork/LaFourchette (réservations), Instagram (image de marque). Chaque plateforme a son public et son influence." },
            { title: "Répondre aux avis", body: "Positif → remercier sincèrement, mentionner un détail spécifique.\nNégatif → remercier pour le retour, reconnaître le problème, proposer une solution, inviter à revenir.\nJamais : être agressif, nier, ignorer." },
            { title: "Générer des avis positifs", body: "Demander au bon moment (après un compliment spontané). Faciliter (QR code, lien direct). Remercier verbalement. Ne jamais acheter de faux avis — Google les détecte et pénalise." },
            { title: "Le monitoring", body: "Vérifier ses avis chaque jour. Configurer des alertes Google. Suivre sa note moyenne et le volume d'avis. Objectif : répondre à chaque avis dans les 24-48h." }
          ],
          takeaway: "La réputation se construit avis par avis, réponse par réponse. C'est un travail quotidien qui paie sur le long terme."
        },
        quiz: [
          { q: "Quelle plateforme d'avis a le plus d'impact pour un restaurant local ?", options: ["TripAdvisor", "Yelp", "Google", "Instagram"], correct: 2 },
          { q: "Face à un faux avis positif acheté, Google :", options: ["Le met en avant", "Ne peut rien faire", "Le détecte et pénalise le restaurant", "Le transforme en pub gratuite"], correct: 2 }
        ]
      }
    ]
  },
  {
    id: "ch4", chapter: "Chapitre 4", title: "La Stratégie", color: "#E76F51", level: "expert",
    modules: [
      {
        id: "m4-0", num: 0, title: "L'histoire du groupe qui a tout aligné", type: "story", duration: "3 min",
        content: {
          intro: "Comment un groupe de restaurants a transformé son approche marketing en passant du chaos à la cohérence stratégique...",
          sections: [
            { title: "Le conte", body: "Un groupe de 8 restaurants gérait le marketing au coup par coup. Chaque établissement postait quand il voulait, les messages étaient contradictoires, les budgets gaspillés. Un jour, ils ont décidé de tout aligner : une stratégie claire, un calendrier commun, des KPI partagés. En un an : +22% de notoriété, +15% de CA, et une équipe marketing enfin sereine. La stratégie, c'est ce qui transforme l'agitation en direction." }
          ],
          takeaway: "Sans stratégie, le marketing est du bruit. Avec une stratégie, c'est une force."
        }
      },
      {
        id: "m4-1", num: 1, title: "Construire un plan marketing", type: "cours", duration: "12 min",
        content: {
          intro: "Un plan marketing structure tes actions, tes budgets et tes objectifs sur une période donnée. C'est ta feuille de route.",
          sections: [
            { title: "Les 5 étapes du plan", body: "① Analyse (où en sommes-nous ?)\n② Objectifs (où voulons-nous aller ?)\n③ Stratégie (comment y aller ?)\n④ Actions (quoi faire concrètement ?)\n⑤ Mesure (est-ce que ça marche ?)" },
            { title: "L'analyse SWOT appliquée", body: "Forces : ce qu'on fait bien (produit, équipe, emplacement)\nFaiblesses : ce qu'on doit améliorer (digital, service, visibilité)\nOpportunités : ce qu'on peut saisir (événements, tendances, partenariats)\nMenaces : ce qui peut nous freiner (concurrence, conjoncture, météo)" },
            { title: "Fixer des objectifs SMART", body: "Spécifique : \"Augmenter les réservations du brunch\"\nMesurable : \"de 20%\"\nAtteignable : basé sur l'historique\nRéaliste : avec les ressources disponibles\nTemporel : \"d'ici fin juin\"\nExemple complet : \"Augmenter les réservations brunch de 20% d'ici fin juin via Instagram et Google Ads.\"" },
            { title: "Le calendrier marketing", body: "Planifier sur 12 mois : saisons, fêtes, événements locaux, lancements. Chaque mois = un thème ou une action principale. Anticiper au minimum 4 semaines pour chaque action majeure." }
          ],
          takeaway: "Un plan marketing n'est pas rigide — c'est un cadre qui donne de la direction tout en restant adaptable."
        },
        quiz: [
          { q: "Les 5 étapes d'un plan marketing sont :", options: ["Créer, Publier, Mesurer, Répéter, Arrêter", "Analyse, Objectifs, Stratégie, Actions, Mesure", "Idée, Design, Dev, Test, Launch", "Lundi, Mardi, Mercredi, Jeudi, Vendredi"], correct: 1 },
          { q: "Un objectif SMART doit être :", options: ["Simple, Malin, Agile, Rapide, Trendy", "Spécifique, Mesurable, Atteignable, Réaliste, Temporel", "Secret, Motivant, Ambitieux, Radical, Total", "Social, Mobile, Automatisé, Rentable, Tracké"], correct: 1 },
          { q: "Le calendrier marketing doit anticiper une action majeure de :", options: ["1 jour", "1 semaine", "4 semaines minimum", "6 mois"], correct: 2 }
        ]
      },
      {
        id: "m4-2", num: 2, title: "Les KPI qui comptent", type: "cours", duration: "10 min",
        content: {
          intro: "Ce qui ne se mesure pas ne s'améliore pas. Les bons KPI te disent si ta stratégie fonctionne — ou pas.",
          sections: [
            { title: "KPI de notoriété", body: "Impressions (combien de personnes voient tes contenus)\nPortée (combien de personnes uniques touchées)\nRecherches Google (combien cherchent ton nom)\nTrafic site web (combien visitent ton site)\nCes KPI mesurent si tu es visible." },
            { title: "KPI d'engagement", body: "Taux d'engagement réseaux (likes, commentaires, partages / portée)\nTaux de clic sur les emails\nNombre d'avis reçus par mois\nTemps passé sur le site\nCes KPI mesurent si tu intéresses." },
            { title: "KPI de conversion", body: "Nombre de réservations (en ligne + téléphone)\nTaux de conversion (visiteurs du site → réservations)\nCoût par acquisition client (budget pub / nouveaux clients)\nPanier moyen\nCes KPI mesurent si tu convertis." },
            { title: "KPI de fidélisation", body: "Taux de retour (% de clients qui reviennent dans les 90 jours)\nFréquence de visite des habitués\nNote moyenne sur les plateformes\nTaux d'ouverture des newsletters\nCes KPI mesurent si tu fidélises." }
          ],
          takeaway: "Choisis 3-5 KPI maximum et suis-les chaque semaine. Mieux vaut bien suivre peu d'indicateurs que mal suivre beaucoup."
        },
        quiz: [
          { q: "Combien de KPI faut-il suivre idéalement ?", options: ["1 seul", "3 à 5 maximum", "15 à 20", "Tous ceux disponibles"], correct: 1 },
          { q: "Le taux de retour mesure :", options: ["La notoriété", "L'engagement", "La conversion", "La fidélisation"], correct: 3 },
          { q: "Le coût par acquisition client se calcule :", options: ["CA / nombre de plats", "Budget pub / nouveaux clients", "Nombre d'avis / nombre de visites", "Likes / followers"], correct: 1 }
        ]
      },
      {
        id: "m4-3", num: 3, title: "Le marketing en équipe et la culture marketing", type: "cours", duration: "10 min",
        content: {
          intro: "Le marketing n'est pas l'affaire d'une seule personne. C'est une culture partagée par toute l'équipe.",
          sections: [
            { title: "Tout le monde est marketeur", body: "Le serveur qui recommande un plat, le chef qui soigne la présentation, l'hôtesse qui sourit à l'entrée — chaque membre de l'équipe fait du marketing. La culture marketing = quand chacun comprend que son rôle impacte l'image du restaurant." },
            { title: "Former et embarquer l'équipe", body: "Partager les retours clients (positifs ET négatifs)\nExpliquer le \"pourquoi\" derrière chaque action marketing\nCélébrer les victoires ensemble (bonne note, bel avis)\nDonner à chacun un rôle concret (photos, accueil, avis)" },
            { title: "Organiser le marketing au quotidien", body: "Lundi : revue des avis et réponses\nMardi-Jeudi : création et planification de contenu\nVendredi : bilan de la semaine + préparation weekend\nMensuel : bilan des KPI + ajustement du plan\nTrimestriel : revue stratégique complète" },
            { title: "La veille et l'adaptation", body: "Suivre ce que fait la concurrence (sans copier). Observer les tendances food et lifestyle. Écouter les retours terrain de l'équipe. Le meilleur marketing est celui qui évolue avec ses clients." }
          ],
          takeaway: "Le marketing est un sport d'équipe. Quand toute l'équipe porte la même vision, chaque interaction devient une opportunité."
        },
        quiz: [
          { q: "La culture marketing dans un restaurant signifie :", options: ["Seul le manager fait du marketing", "Tout le monde comprend son impact sur l'image", "Il faut embaucher un community manager", "Le marketing se fait uniquement en ligne"], correct: 1 },
          { q: "La revue stratégique complète doit se faire :", options: ["Chaque jour", "Chaque semaine", "Chaque trimestre", "Chaque année"], correct: 2 },
          { q: "Le bilan hebdomadaire des KPI se fait idéalement :", options: ["Le lundi", "Le vendredi", "Le dimanche", "Jamais, c'est inutile"], correct: 1 }
        ]
      }
    ]
  }
];


const TOTAL_MODULES = COURSES.reduce((acc, ch) => acc + ch.modules.length, 0);

// ─── Users (tu peux modifier cette liste) ──────
const USERS = [
  { id: "alex", name: "Alex", email: "alex@venturahighway.ch", pin: "1234" },
  { id: "coralie", name: "Coralie", email: "coralie@venturahighway.ch", pin: "1234" },
  { id: "katinka", name: "Katinka", email: "katinka@venturahighway.ch", pin: "1234" },
  { id: "mariana", name: "Mariana", email: "mariana@venturahighway.ch", pin: "1234" },
  { id: "mike", name: "Mike", email: "mike@venturahighway.ch", pin: "1234" },
];

// ─── Auth + Persistence ──────────────────────────
function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("ma_current_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const login = (email, pin) => {
    const found = USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.pin === pin);
    if (found) {
      localStorage.setItem("ma_current_user", JSON.stringify(found));
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("ma_current_user");
    setUser(null);
  };

  return { user, login, logout };
}

function useProgress(userId) {
  const storageKey = `ma_progress_${userId}`;
  const quizKey = `ma_quiz_${userId}`;

  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; }
  });
  const [quizScores, setQuizScores] = useState(() => {
    try { return JSON.parse(localStorage.getItem(quizKey)) || {}; } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed, storageKey]);

  useEffect(() => {
    localStorage.setItem(quizKey, JSON.stringify(quizScores));
  }, [quizScores, quizKey]);

  const markComplete = (moduleId) => setCompleted(p => ({ ...p, [moduleId]: true }));
  const saveQuiz = (moduleId, score, total) => setQuizScores(p => ({ ...p, [moduleId]: { score, total } }));
  const isComplete = (moduleId) => !!completed[moduleId];
  const totalCompleted = Object.keys(completed).length;
  const pct = Math.round((totalCompleted / TOTAL_MODULES) * 100);

  const getCurrentLevel = () => {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      const lvl = LEVELS[i];
      const lvlModules = COURSES.filter(c => lvl.chapters.includes(c.id)).flatMap(c => c.modules);
      if (lvlModules.every(m => completed[m.id])) return lvl;
    }
    return LEVELS[0];
  };

  const isLevelComplete = (levelId) => {
    const lvl = LEVELS.find(l => l.id === levelId);
    if (!lvl) return false;
    const lvlModules = COURSES.filter(c => lvl.chapters.includes(c.id)).flatMap(c => c.modules);
    return lvlModules.length > 0 && lvlModules.every(m => completed[m.id]);
  };

  return { completed, quizScores, markComplete, saveQuiz, isComplete, totalCompleted, pct, getCurrentLevel, isLevelComplete };
}

// ─── Login Screen ────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const success = onLogin(email, pin);
      if (!success) setError("Email ou code PIN incorrect");
      setLoading(false);
    }, 400);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(160deg, #0D1117 0%, #161B22 50%, #0D1117 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif", padding: 24
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, marginBottom: 12, textTransform: "uppercase" }}>
            Ventura Highway
          </p>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: 36, margin: "0 0 8px", lineHeight: 1.2,
            background: "linear-gradient(135deg, #F4A261, #E76F51)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            Marketing Academy
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            Connecte-toi pour accéder à ton cursus
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16, padding: "32px 28px"
        }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, letterSpacing: 0.5, marginBottom: 8 }}>
              Email
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="ton.email@venturahighway.ch"
              required
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14, fontFamily: "inherit",
                outline: "none", boxSizing: "border-box", transition: "border 0.2s"
              }}
              onFocus={e => e.target.style.borderColor = "#F4A261"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, letterSpacing: 0.5, marginBottom: 8 }}>
              Code PIN
            </label>
            <input
              type="password" value={pin} onChange={e => setPin(e.target.value)}
              placeholder="••••"
              required maxLength={8}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14, fontFamily: "inherit",
                outline: "none", boxSizing: "border-box", letterSpacing: 4, transition: "border 0.2s"
              }}
              onFocus={e => e.target.style.borderColor = "#F4A261"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          {error && (
            <p style={{ color: "#E76F51", fontSize: 13, marginBottom: 16, textAlign: "center" }}>{error}</p>
          )}

          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "14px", borderRadius: 10, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #F4A261, #E76F51)", color: "#fff",
            fontWeight: 700, fontSize: 15, fontFamily: "inherit",
            boxShadow: "0 4px 20px rgba(244,162,97,0.3)",
            opacity: loading ? 0.7 : 1, transition: "opacity 0.2s"
          }}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, textAlign: "center", marginTop: 24 }}>
          Contacte ton manager si tu n'as pas tes identifiants
        </p>
      </div>
    </div>
  );
}

// ─── UI Components ────────────────────────────

function ProgressRing({ pct, size = 120, stroke = 8 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F4A261" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease" }} />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        style={{ transform: "rotate(90deg)", transformOrigin: "center", fill: "#fff", fontSize: size * 0.28, fontWeight: 700 }}>
        {pct}%
      </text>
    </svg>
  );
}

function LevelBadge({ level, earned }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px",
      borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: 0.4,
      background: earned ? `linear-gradient(135deg, ${level.color}, ${level.color}cc)` : "rgba(255,255,255,0.04)",
      color: earned ? "#fff" : "rgba(255,255,255,0.25)",
      border: earned ? "none" : "1px solid rgba(255,255,255,0.08)",
      boxShadow: earned ? `0 2px 12px ${level.color}44` : "none",
      transition: "all 0.3s"
    }}>
      {earned ? level.badge : "○"} {level.name}
    </div>
  );
}

function LevelProgressBar({ progress }) {
  return (
    <div style={{ display: "flex", gap: 3, width: "100%", height: 6, borderRadius: 3, overflow: "hidden" }}>
      {LEVELS.map((lvl) => {
        const lvlModules = COURSES.filter(c => lvl.chapters.includes(c.id)).flatMap(c => c.modules);
        const done = lvlModules.filter(m => progress.isComplete(m.id)).length;
        const pct = lvlModules.length > 0 ? (done / lvlModules.length) * 100 : 0;
        return (
          <div key={lvl.id} style={{ flex: lvlModules.length, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              width: `${pct}%`, height: "100%", borderRadius: 3,
              background: `linear-gradient(90deg, ${lvl.color}, ${lvl.color}cc)`,
              transition: "width 0.6s ease"
            }} />
          </div>
        );
      })}
    </div>
  );
}

// ─── Quiz & Module Views ──────────────────────

function QuizView({ quiz, moduleId, progress, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quiz[current];

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === q.correct) setScore(s => s + 1);
  };

  const next = () => {
    if (current < quiz.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      progress.saveQuiz(moduleId, score, quiz.length);
      progress.markComplete(moduleId);
      setDone(true);
    }
  };

  if (done) {
    const pct = Math.round((score / quiz.length) * 100);
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{pct >= 70 ? "🎉" : "📚"}</div>
        <h3 style={{ color: "#F4A261", marginBottom: 8, fontSize: 22 }}>
          {pct >= 70 ? "Bravo !" : "Continue d'apprendre !"}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
          Score : {score}/{quiz.length} ({pct}%)
        </p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 24 }}>
          {pct >= 70 ? "Module validé ✦" : "Relis le cours et retente le quiz !"}
        </p>
        <button onClick={onFinish} style={{
          padding: "10px 28px", borderRadius: 8, border: "none", cursor: "pointer",
          background: "linear-gradient(135deg, #F4A261, #E76F51)", color: "#fff",
          fontWeight: 600, fontSize: 14
        }}>Retour au cursus</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>
          QUESTION {current + 1}/{quiz.length}
        </span>
        <span style={{ color: "#F4A261", fontSize: 13, fontWeight: 600 }}>Score : {score}</span>
      </div>
      <h3 style={{ color: "#fff", fontSize: 17, lineHeight: 1.5, marginBottom: 20, fontWeight: 500 }}>{q.q}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, i) => {
          let bg = "rgba(255,255,255,0.04)";
          let border = "1px solid rgba(255,255,255,0.08)";
          let col = "rgba(255,255,255,0.8)";
          if (showResult) {
            if (i === q.correct) { bg = "rgba(45,106,79,0.3)"; border = "1px solid #2D6A4F"; col = "#95D5B2"; }
            else if (i === selected && i !== q.correct) { bg = "rgba(231,111,81,0.2)"; border = "1px solid #E76F51"; col = "#E76F51"; }
          } else if (i === selected) { bg = "rgba(244,162,97,0.15)"; border = "1px solid #F4A261"; }
          return (
            <button key={i} onClick={() => handleSelect(i)} style={{
              padding: "12px 16px", borderRadius: 8, background: bg, border, color: col,
              textAlign: "left", cursor: showResult ? "default" : "pointer", fontSize: 14,
              transition: "all 0.2s", fontFamily: "inherit"
            }}>
              {opt}
            </button>
          );
        })}
      </div>
      {showResult && (
        <button onClick={next} style={{
          marginTop: 20, padding: "10px 24px", borderRadius: 8, border: "none",
          background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer",
          fontWeight: 600, fontSize: 14, fontFamily: "inherit"
        }}>
          {current < quiz.length - 1 ? "Question suivante →" : "Voir le résultat"}
        </button>
      )}
    </div>
  );
}

function ModuleView({ module, chapterColor, progress, onBack }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const contentRef = useRef(null);

  const c = module.content;
  const hasQuiz = module.quiz && module.quiz.length > 0;
  const isCompleted = progress.isComplete(module.id);

  if (showQuiz && hasQuiz) {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 24px" }}>
        <button onClick={() => setShowQuiz(false)} style={{
          background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer",
          fontSize: 13, marginBottom: 16, fontFamily: "inherit", padding: 0
        }}>← Retour au cours</button>
        <h2 style={{ color: "#F4A261", marginBottom: 4, fontSize: 18 }}>Quiz — {module.title}</h2>
        <QuizView quiz={module.quiz} moduleId={module.id} progress={progress} onFinish={onBack} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer",
        fontSize: 13, marginBottom: 20, fontFamily: "inherit", padding: 0, flexShrink: 0
      }}>← Retour au cursus</button>

      <div style={{ flexShrink: 0, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{
            display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11,
            fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
            background: module.type === "story" ? "rgba(244,162,97,0.2)" : `${chapterColor}33`,
            color: module.type === "story" ? "#F4A261" : chapterColor
          }}>
            {module.type === "story" ? "Histoire" : `Module ${module.num}`}
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>⏱ {module.duration}</span>
          {isCompleted && <span style={{ color: "#95D5B2", fontSize: 12, fontWeight: 600 }}>✓ Complété</span>}
        </div>
        <h1 style={{ color: "#fff", fontSize: 24, lineHeight: 1.3, margin: 0 }}>{module.title}</h1>
      </div>

      <div ref={contentRef} style={{ flex: 1, overflowY: "auto", paddingBottom: 100 }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7, marginBottom: 28, fontStyle: "italic" }}>
          {c.intro}
        </p>
        {c.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <h3 style={{ color: chapterColor || "#F4A261", fontSize: 15, marginBottom: 8, fontWeight: 600 }}>{s.title}</h3>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-line", margin: 0 }}>
              {s.body}
            </p>
          </div>
        ))}
        <div style={{
          marginTop: 32, padding: "20px 24px", borderRadius: 12,
          background: "linear-gradient(135deg, rgba(244,162,97,0.1), rgba(231,111,81,0.05))",
          borderLeft: `3px solid ${chapterColor || "#F4A261"}`
        }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>🧠 À RETENIR</p>
          <p style={{ color: "#fff", fontSize: 14, lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>{c.takeaway}</p>
        </div>
        <div style={{ marginTop: 32, textAlign: "center" }}>
          {hasQuiz ? (
            <button onClick={() => setShowQuiz(true)} style={{
              padding: "14px 36px", borderRadius: 10, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #F4A261, #E76F51)", color: "#fff",
              fontWeight: 700, fontSize: 15, fontFamily: "inherit",
              boxShadow: "0 4px 20px rgba(244,162,97,0.3)"
            }}>Passer le quiz →</button>
          ) : (
            <button onClick={() => { progress.markComplete(module.id); onBack(); }} style={{
              padding: "14px 36px", borderRadius: 10, border: "none", cursor: "pointer",
              background: isCompleted ? "rgba(255,255,255,0.06)" : `linear-gradient(135deg, ${chapterColor}, ${chapterColor}cc)`,
              color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "inherit"
            }}>
              {isCompleted ? "✓ Déjà complété" : "Marquer comme lu ✓"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────
export default function MarketingAcademy() {
  const auth = useAuth();

  if (!auth.user) {
    return <LoginScreen onLogin={auth.login} />;
  }

  return <AcademyDashboard user={auth.user} onLogout={auth.logout} />;
}

function AcademyDashboard({ user, onLogout }) {
  const progress = useProgress(user.id);
  const [activeModule, setActiveModule] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);

  let currentModule = null;
  let currentChapterColor = null;
  if (activeModule) {
    for (const ch of COURSES) {
      const found = ch.modules.find(m => m.id === activeModule);
      if (found) { currentModule = found; currentChapterColor = ch.color; break; }
    }
  }

  if (currentModule) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0D1117 0%, #161B22 50%, #0D1117 100%)",
        color: "#fff", fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
      }}>
        <ModuleView module={currentModule} chapterColor={currentChapterColor} progress={progress}
          onBack={() => setActiveModule(null)} />
      </div>
    );
  }

  const currentLevel = progress.getCurrentLevel();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0D1117 0%, #161B22 50%, #0D1117 100%)",
      color: "#fff", fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        padding: "40px 24px 24px", maxWidth: 720, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start"
      }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, marginBottom: 8, textTransform: "uppercase" }}>
            Ventura Highway
          </p>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: 32, margin: 0, lineHeight: 1.2,
            background: "linear-gradient(135deg, #F4A261, #E76F51)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            Marketing Academy
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: 0 }}>
              Bienvenue {user.name}
            </p>
            <button onClick={onLogout} style={{
              background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6,
              color: "rgba(255,255,255,0.3)", fontSize: 11, padding: "3px 10px", cursor: "pointer",
              fontFamily: "inherit"
            }}>Déconnexion</button>
          </div>
        </div>
        <ProgressRing pct={progress.pct} size={80} stroke={6} />
      </div>

      {/* Level indicator + progress bar */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px",
            borderRadius: 20, fontSize: 12, fontWeight: 700,
            background: `linear-gradient(135deg, ${currentLevel.color}, ${currentLevel.color}cc)`,
            color: "#fff", boxShadow: `0 2px 12px ${currentLevel.color}44`
          }}>
            {currentLevel.badge} Niveau : {currentLevel.name}
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
            {progress.totalCompleted}/{TOTAL_MODULES} modules
          </span>
        </div>
        <LevelProgressBar progress={progress} />
      </div>

      {/* Stats bar */}
      <div style={{
        maxWidth: 720, margin: "16px auto 28px", padding: "0 24px",
        display: "flex", gap: 12, flexWrap: "wrap"
      }}>
        <div style={{
          flex: 1, minWidth: 130, padding: "14px 16px", borderRadius: 12,
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)"
        }}>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 }}>Score moyen</p>
          <p style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0 }}>
            {Object.keys(progress.quizScores).length > 0
              ? Math.round(Object.values(progress.quizScores).reduce((a, v) => a + (v.score / v.total) * 100, 0) / Object.keys(progress.quizScores).length) + "%"
              : "—"}
          </p>
        </div>
        <div style={{
          flex: 2, minWidth: 200, padding: "14px 16px", borderRadius: 12,
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)"
        }}>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, marginBottom: 6 }}>Badges</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {LEVELS.map(lvl => (
              <LevelBadge key={lvl.id} level={lvl} earned={progress.isLevelComplete(lvl.id)} />
            ))}
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 60px" }}>
        {COURSES.map((ch) => {
          const chLevel = LEVELS.find(l => l.chapters.includes(ch.id));
          return (
            <div key={ch.id} style={{ marginBottom: 32 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 14, cursor: "pointer"
              }} onClick={() => setActiveChapter(activeChapter === ch.id ? null : ch.id)}>
                <div style={{ width: 4, height: 28, borderRadius: 2, background: ch.color }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, margin: 0 }}>
                      {ch.chapter.toUpperCase()}
                    </p>
                    {chLevel && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: 0.5, padding: "2px 8px",
                        borderRadius: 10, background: `${chLevel.color}22`, color: chLevel.color
                      }}>
                        {chLevel.badge} {chLevel.name.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h2 style={{ color: "#fff", fontSize: 19, margin: 0, fontFamily: "'DM Serif Display', serif" }}>
                    {ch.title}
                  </h2>
                </div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                  {ch.modules.filter(m => progress.isComplete(m.id)).length}/{ch.modules.length}
                </div>
                <span style={{
                  color: "rgba(255,255,255,0.3)", fontSize: 18,
                  transform: activeChapter === ch.id || activeChapter === null ? "rotate(0)" : "rotate(-90deg)",
                  transition: "transform 0.2s"
                }}>▾</span>
              </div>

              {(activeChapter === ch.id || activeChapter === null) && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 16 }}>
                  {ch.modules.map((m) => {
                    const done = progress.isComplete(m.id);
                    const hasQuiz = m.quiz && m.quiz.length > 0;
                    const quizScore = progress.quizScores[m.id];
                    return (
                      <div key={m.id} onClick={() => setActiveModule(m.id)} style={{
                        display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                        borderRadius: 12, cursor: "pointer", transition: "all 0.2s",
                        background: done ? "rgba(45,106,79,0.08)" : "rgba(255,255,255,0.02)",
                        border: done ? "1px solid rgba(45,106,79,0.2)" : "1px solid rgba(255,255,255,0.05)",
                      }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                          background: done ? ch.color : "rgba(255,255,255,0.05)",
                          color: done ? "#fff" : "rgba(255,255,255,0.3)", fontSize: 13, fontWeight: 700, flexShrink: 0
                        }}>
                          {done ? "✓" : m.num}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ color: done ? "rgba(255,255,255,0.5)" : "#fff", fontSize: 14, fontWeight: 500, margin: 0,
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {m.title}
                          </p>
                          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 3 }}>
                            <span style={{
                              fontSize: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase",
                              color: m.type === "story" ? "#F4A261" : "rgba(255,255,255,0.25)"
                            }}>
                              {m.type === "story" ? "Histoire" : "Cours"}
                            </span>
                            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 10 }}>•</span>
                            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 10 }}>{m.duration}</span>
                            {hasQuiz && (
                              <>
                                <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 10 }}>•</span>
                                <span style={{ color: quizScore ? "#95D5B2" : "rgba(255,255,255,0.25)", fontSize: 10 }}>
                                  {quizScore ? `Quiz ${quizScore.score}/${quizScore.total}` : "Quiz"}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 16 }}>›</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
