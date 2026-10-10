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
- `calculator.test.mjs`: test del motore, comprese tutte le aliquote/piani e riconciliazione.
- `app.mjs`: aggiornamento DOM, grafico SVG, CSV e stampa.
- `index.html`, `style.css`: interfaccia e responsive a 760px.
- `server.mjs`: server locale sulla porta 4174, raggiungibile anche in LAN.
- `build.mjs`: selezione esplicita dei soli file pubblicabili, incluse icone e manifest.
- `design/`: concept e note di progettazione, non serviti dal sito.

## Validazione e limiti

I test del motore superati prima della pubblicazione; verifica sintattica JavaScript superata. Il workflow di rilascio ripete test e build. Il risultato effettivo di ogni pubblicazione è registrato nella scheda Actions della repository.

La verifica browser iniziale era bloccata dalla policy; il 9 ottobre 2026 il browser integrato è risultato disponibile. Vedi i controlli aggiornati in fondo. La disponibilità HTTP pubblica è un controllo distinto dalla validazione visiva.

La simulazione non certifica ammissibilità o capienza fiscale. Assume un solo investimento nell’annualità, aliquota fiscale costante, deducibilità integrale e decorrenza simultanea di incentivo e ammortamento. Non gestisce leasing, altri bandi oltre Veneto Energia, ulteriori cumuli, IRAP o attualizzazione. Le annualità rappresentano deduzioni e non incassi. La maggiorazione è una deduzione, non credito d’imposta F24. Fonte MIMIT e data di consultazione sono riportate in app e README.

## Prossimi interventi

1. Verificare su browser reale desktop e smartphone: input, overflow tabella, CSV e stampa.
2. Validare il modello fiscale con il professionista che segue i casi d’uso effettivi.
3. Per altri bandi, introdurre regole indipendenti con test dedicati e regole di cumulo esplicite; Veneto Energia è già presente come scenario opzionale.

## Icona e schermata Home

Icona generata con Image Gen integrato: calcolatrice chiara con scritta 5.0 su fondo verde, coerente con l’app. Master 1024 px e PNG 32, 180, 192 e 512 px in `icons/`. Favicon e Apple Touch Icon sono collegate nella pagina; `site.webmanifest` usa percorsi relativi compatibili con GitHub Pages. Il manifest non introduce supporto offline. La verifica su iPhone reale rimane da effettuare.

## Veneto Energia — modello aggiornato il 9 ottobre 2026

Importo iniziale 0 €, fondo perduto opzionale (inizialmente escluso), percentuale iniziale 20% modificabile. Zero mostra un invito a inserire un importo e nessun piano annuale.

Contributo = investimento × percentuale. Base residua = investimento − contributo. Sulla base residua sono calcolati sia le quote ordinarie nette sia la maggiorazione dell’iperammortamento. Contributo incluso una sola volta nel totale; grafico e cumulato annuale riguardano solo l’iperammortamento. CSV e totali delle quote ordinarie usano la base netta.

Per contributi in conto impianti imponibili, il metodo diretto riduce il costo del cespite. Quello indiretto conserva l’ammortamento lordo e rileva proventi da contributo per competenza. Il modello simula il medesimo effetto netto, assumendo la stessa distribuzione temporale; non simula esenzioni fiscali specifiche. Corregge e sostituisce la precedente ipotesi di beneficio ordinario sul lordo senza proventi compensativi.

Fonte fiscale: https://def.finanze.it/DocTribFrontend/getPrassiDetail.do?id=%7BCE108E79-8BDC-48B8-989D-C55681DF5110%7D
Riferimento contabile: OIC 16, paragrafi 87–88.
Fonte bando: https://agevolazioni.venetoinnovazione.it/images/DGR_1418_EFFICIENZA%20ENERGIA/DGR_557_25_ALLEGATO_A.pdf

Condizioni sintetiche mostrate nel form: 20% a fondo perduto abbinato a finanziamento agevolato; sedi operative in Veneto; efficientamento energetico con diagnosi; investimento ammissibile da 100.000 a 1.000.000 euro; limiti ESL/de minimis e istruttoria. Fuori intervallo compare un avviso, il risultato resta uno scenario matematico. Nessuna verifica automatica di ammissibilità o cumulo; esclusi finanziamento e risparmio interessi.

Esempio 100.000 €, contributo 20%, aliquota fiscale 24%: contributo 20.000 €, base netta 80.000 €, risparmio ordinario 19.200 €, iperammortamento 34.560 €, recupero complessivo 73.760 €, costo netto 26.240 €.

## Verifica corrente

14 test del motore superati, verifica sintattica e build completate. Browser integrato: importo iniziale 0, percentuale 20, scenario 100.000 € verificati; nessun errore console rilevato. Rimangono da verificare stampa e download su iPhone reale. Rilascio su GitHub Pages autorizzato il 10 ottobre 2026; il workflow esegue nuovamente test e build prima della distribuzione.
