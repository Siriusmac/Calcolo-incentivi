# Handoff — Calcolo incentivi

## Prodotto

Simulatore italiano di recupero fiscale per investimenti. La prima misura implementata è l’iperammortamento 2026 per acquisti di beni materiali. Input: importo, aliquota ammortamento (12,5/15/20/25/40%), aliquota fiscale, anno e piano (primo anno dimezzato o quote intere). Output: beneficio aggiuntivo, beneficio ordinario, totale, costo netto fiscale, grafico cumulativo e prospetto annuale; CSV e stampa.

## Repository e pubblicazione

- Repository: https://github.com/Siriusmac/Calcolo-incentivi
- Sito: https://Siriusmac.github.io/Calcolo-incentivi/
- Branch: main.
- GitHub Pages usa GitHub Actions, workflow `.github/workflows/pages.yml`.
- Ogni push su main passa i test, esegue `npm run build` e pubblica `dist/`.
- Nessun segreto o dipendenza applicativa. Il workflow usa i permessi temporanei standard di GitHub.
- Per ripristinare una versione precedente: revert del commit interessato e nuovo push, previa autorizzazione del proprietario.

## Struttura

- `calculator.mjs`: motore puro con scaglioni progressivi, piano e arrotondamenti.
- `calculator.test.mjs`: sei test, comprese tutte le aliquote/piani e riconciliazione.
- `app.mjs`: aggiornamento DOM, grafico SVG, CSV e stampa.
- `index.html`, `style.css`: interfaccia e responsive a 760px.
- `server.mjs`: server locale sulla porta 4174, raggiungibile anche in LAN.
- `build.mjs`: selezione esplicita dei soli file pubblicabili, incluse icone e manifest.
- `design/`: concept e note di progettazione, non serviti dal sito.

## Validazione e limiti

Sei test del motore superati prima della pubblicazione; verifica sintattica JavaScript superata. Il workflow di rilascio ripete test e build. Il risultato effettivo di ogni pubblicazione è registrato nella scheda Actions della repository.

La verifica visiva e interattiva nel browser integrato è rimasta bloccata dall’indisponibilità della verifica della policy amministrativa. Non dichiarare verificati layout reali desktop/mobile, download CSV o stampa. La disponibilità HTTP pubblica è un controllo distinto dalla validazione visiva.

La simulazione non certifica ammissibilità o capienza fiscale. Assume un solo investimento nell’annualità, aliquota fiscale costante, deducibilità integrale e decorrenza simultanea di incentivo e ammortamento. Non gestisce leasing, altri bandi, cumulo, IRAP o attualizzazione. Le annualità rappresentano deduzioni e non incassi. La maggiorazione è una deduzione, non credito d’imposta F24. Fonte MIMIT e data di consultazione sono riportate in app e README.

## Prossimi interventi

1. Verificare su browser reale desktop e smartphone: input, overflow tabella, CSV e stampa.
2. Validare il modello fiscale con il professionista che segue i casi d’uso effettivi.
3. Per altri bandi, introdurre regole indipendenti con test dedicati e regole di cumulo esplicite; nessun altro incentivo è già implementato.

## Icona e schermata Home

Icona generata con Image Gen integrato: calcolatrice chiara con scritta 5.0 su fondo verde, coerente con l’app. Master 1024 px e PNG 32, 180, 192 e 512 px in `icons/`. Favicon e Apple Touch Icon sono collegate nella pagina; `site.webmanifest` usa percorsi relativi compatibili con GitHub Pages. Il manifest non introduce supporto offline. La verifica su iPhone reale rimane da effettuare.
