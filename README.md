# Calcolo incentivi

Web app responsive in italiano per simulare il recupero fiscale di un investimento. Il primo incentivo implementato è l’iperammortamento 2026 per acquisti di beni materiali. Nessuna dipendenza, account, database o trasmissione dei dati inseriti.

## Online

- App: https://Siriusmac.github.io/Calcolo-incentivi/
- Repository: https://github.com/Siriusmac/Calcolo-incentivi

## Avvio

Con Node.js 20 o successivo: `npm start`, quindi aprire http://localhost:4174. Da uno smartphone sulla stessa rete usare http://INDIRIZZO-LAN-DEL-COMPUTER:4174, lasciando acceso il computer e consentendo l’accesso alla porta nella rete locale. La versione GitHub Pages è utilizzabile da smartphone e computer senza un server locale.

`npm test` esegue i test del motore di calcolo. I file index.html, style.css, app.mjs e calculator.mjs sono distribuibili su qualsiasi hosting statico.

## Funzioni

- Importo fiscale agevolabile, aliquote 12,5 / 15 / 20 / 25 / 40%.
- Aliquota fiscale modificabile, valore iniziale 24% come ipotesi IRES.
- Primo anno e piano con primo esercizio dimezzato o quote intere.
- Scaglioni progressivi 180%, 100%, 50%; tetto 20 milioni.
- Beneficio aggiuntivo, risparmio ordinario, recupero complessivo, costo netto fiscale.
- Grafico cumulativo, prospetto annuale, CSV con parametri, stampa/PDF tramite browser.

## Metodo e limiti

Il beneficio è una deduzione maggiorata che riduce le imposte sui redditi, non un credito F24. La percentuale di ammortamento modifica la distribuzione annuale, non il beneficio nominale totale. Si assume aliquota fiscale costante, capienza piena, unico investimento dell’annualità, coincidenza tra decorrenza dell’incentivo e inizio dell’ammortamento. Esclusi IRAP, leasing, attualizzazione e altri cumuli oltre allo scenario Veneto Energia. Non verifica ammissibilità, settore/coefficienti, documentazione o esito GSE. Anni di deduzione, non di incasso. La modalità a quote intere è uno scenario e va verificata per il bene.

Fonte consultata il 7 settembre 2026: https://www.mimit.gov.it/it/incentivi/nuovo-piano-transizione-5-0-iperammortamento

Motore separato in calculator.mjs per consentire l’aggiunta successiva di altri incentivi senza modificare le regole esistenti. È disponibile anche lo scenario opzionale Veneto Sviluppo Energia.

## Verifica

I test automatici coprono esempio 100.000 euro, scaglioni e massimale, tutte le aliquote e i due piani, riconciliazione ai centesimi, input non validi, fiscalità zero e importi minimi. La prima verifica browser era bloccata; i controlli aggiornati sono riportati nella sezione del 9 ottobre 2026.

Concept in design/concept.png. Pubblicazione tramite GitHub Actions: ogni push su `main` esegue test e build, poi distribuisce esclusivamente i file della web app, il manifest e le icone da `dist/`. README, test e concept restano nella repository e non nell’artefatto del sito. Vedi HANDOFF.md per stato e limiti.

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
