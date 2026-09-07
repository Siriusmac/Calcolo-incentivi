# Incentiva

Web app responsive in italiano per simulare il recupero fiscale di un investimento. Il primo incentivo implementato è l’iperammortamento 2026 per acquisti di beni materiali. Nessuna dipendenza, account, database o trasmissione dei dati inseriti.

## Online

- App: https://Siriusmac.github.io/Incentiva/
- Repository: https://github.com/Siriusmac/Incentiva

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

Il beneficio è una deduzione maggiorata che riduce le imposte sui redditi, non un credito F24. La percentuale di ammortamento modifica la distribuzione annuale, non il beneficio nominale totale. Si assume aliquota fiscale costante, capienza piena, unico investimento dell’annualità, coincidenza tra decorrenza dell’incentivo e inizio dell’ammortamento. Esclusi IRAP, leasing, attualizzazione e cumulo. Non verifica ammissibilità, settore/coefficienti, documentazione o esito GSE. Anni di deduzione, non di incasso. La modalità a quote intere è uno scenario e va verificata per il bene.

Fonte consultata il 7 settembre 2026: https://www.mimit.gov.it/it/incentivi/nuovo-piano-transizione-5-0-iperammortamento

Motore separato in calculator.mjs per consentire l’aggiunta successiva di altri incentivi senza modificare le regole esistenti. Nessun altro bando è simulato in questa versione.

## Verifica

Sei test automatici coprono esempio 100.000 euro, scaglioni e massimale, tutte le aliquote e i due piani, riconciliazione ai centesimi, input non validi, fiscalità zero e importi minimi. Verifica browser desktop/mobile e stampa/CSV interattivi ancora da completare: il browser integrato ha negato accesso per indisponibilità della verifica della policy amministrativa. Nessuna verifica visiva finale viene dichiarata.

Concept in design/concept.png. Pubblicazione tramite GitHub Actions: ogni push su `main` esegue test e build, poi distribuisce esclusivamente i quattro file della web app da `dist/`. README, test e concept restano nella repository e non nell’artefatto del sito. Vedi HANDOFF.md per stato e limiti.
