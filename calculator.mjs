export const rates=[12.5,15,20,25,40];
const round=n=>Math.round((n+Number.EPSILON)*100)/100;
export function extraBase(n){return Math.min(n,2500000)*1.8+Math.min(Math.max(n-2500000,0),7500000)+Math.min(Math.max(n-10000000,0),10000000)*.5;}
export function calculate({amount,rate,tax,year,half,energyEnabled=false,energyRate=20}){
 if(!Number.isFinite(amount)||amount<0||amount>1e9||!rates.includes(rate)||!Number.isFinite(tax)||tax<0||tax>100||!Number.isInteger(year)||year<2026||year>2100) throw Error('Inserisci un importo non negativo (massimo 1 miliardo), un’aliquota fiscale tra 0 e 100 e un anno tra 2026 e 2100.');
 if(energyEnabled && (!Number.isFinite(energyRate)||energyRate<0||energyRate>100)) throw Error('Inserisci una percentuale di fondo perduto tra 0 e 100.');
 const grant=energyEnabled?round(amount*energyRate/100):0;
 const hyperBase=round(amount-grant);
 const extra=round(extraBase(hyperBase)),ordinarySaving=round(hyperBase*tax/100),saving=round(extra*tax/100);let used=0,usedExtra=0,cumulative=0,usedOrdinarySaving=0,usedNet=0;const rows=[];
 for(let i=0;used<amount&&i<100;i++){
 const fraction=Math.min(1,rate/100*(i+1-(half?.5:0)));const target=round(amount*fraction);const quota=round(target-used);const last=fraction===1;
 const deduction=last?round(extra-usedExtra):round(extra*quota/amount);
 const benefit=last?round(saving-cumulative):round(deduction*tax/100);
 const netTarget=round(hyperBase*fraction);const netQuota=round(netTarget-usedNet);usedNet=netTarget;
 const ordinary=last?round(ordinarySaving-usedOrdinarySaving):round(netQuota*tax/100);
 used=round(used+quota);usedExtra=round(usedExtra+deduction);cumulative=round(cumulative+benefit);usedOrdinarySaving=round(usedOrdinarySaving+ordinary);
 rows.push({year:year+i,quota:netQuota,deduction,benefit,ordinary,cumulative});
 }
 return {rows,extra,saving,ordinarySaving,grant,hyperBase,total:round(grant+saving+ordinarySaving),net:round(amount-grant-saving-ordinarySaving)};
}
