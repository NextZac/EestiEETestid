# Eesti.ee veebilehe testimise aruanne

Peamine fail: cypress/e2e/eestiee.cy.js

**Ülevaade:**
Kirjeldatud testifail sisaldab Eesti.ee veebilehe põhifunktsionaalsuse testimist, mis hõlmab:

**Avalehe kontrollid:**

Lehe laadimise õigsus

Otsinguriba kättesaadavus ja funktsionaalsus

Peamenüüde töökorrasolek

**Otsingufunktsionaalsus:**

Otsingu tulemuste relevantsus ("Eesti hümn")

Tühja otsingu veateade

**Teenuste lehe testid:**

Navigeerimine "Tervis ja retseptid" sektsiooni

Retseptide lehe laadimine

Terviseportaali lingi avamine uues aknas

**Kontaktvormi testid:**

Kohustuslike väljade olemasolu

E-posti valideerimise kontroll

**Leitud probleemid:**

Kontaktvormi textarea elemendi leidmise probleem (parandatud komponendi spetsiifilise selektori kasutamisega)

**Soovitused:**

Lisada testimine mobiilivaates

Laiendada vormi testimist täiendavate valideerimiste kontrollidega

Lisada testid kasutaja kontodega seotud funktsionaalsusele
