# TaskManagement

Application web collaborative de gestion de taches, realisee dans le cadre du module *Outils et pratiques du code*.

## Workflow Git Et Collaboration

Le travail a ete organise avec des branches dediees (`main`, `develop`, branches features) et des protections de branches.

Exemples de regles appliquees sur `main`:

- Require a pull request before merging
- Require approvals (1 minimum)
- Dismiss stale pull request approvals when new commits are pushed
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Require conversation resolution before merging
- Block force pushes
- Block deletions

## Qualite De Code Et DevOps

Pour fiabiliser le projet, nous avons mis en place:

- ESLint sur backend et frontend
- Husky pour declencher les controles avant commit
- lint-staged pour verifier uniquement les fichiers modifies

Commandes utiles:

```bash
npm run lint --prefix backend
npm run lint --prefix frontend
npm run test --prefix backend
npm run test --prefix frontend -- --run
```

## Tests Realises

- Tests backend (Jest + Supertest): endpoints d'authentification et de taches
- Tests frontend (Vitest): composants critiques (Login, Dashboard, TaskForm, TaskList, TaskCard)
- Test E2E (Selenium): scenario de verification navigateur

## Captures Et Resultats

Verification du bon fonctionnement de l'application:

![Demarrage application](image-2.png)

Resultats des tests:

![Resultat tests](image.png)

Metriques de couverture / qualite:

![Couverture et qualite](image-1.png)

![Metriques supplementaires](image-3.png)
