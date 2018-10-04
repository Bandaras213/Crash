//switch(Element was geprüfte werden soll, was auch mit Sub Elementen geht.)
//Beispiel: switch(autos.baujahr)
switch(counter){
	/*case (0): kann getauscht werden mit einer Zahl oder einer var, int, const oder let.
	Für Text basierte cases wird "Text" benutzt. 
	Beispiel: case 0:, case zero: */
	  case 0:
	/*Hier kommt hin was passieren soll wenn 0 als Ergebnis kommt.
	Für Text Änderungen oder generelle STOP Befehle kann return benutzt werden.
	Sollte es sich um eine Änderung handeln ohne return MUSS ein break; folgen. 
	break; lässt den Code aus dem switch ausbrechen ansonsten würde er case 1 + alle nachfolgenden ausführen bis zum nächsten return/break. */
	   return mes.edit(`${user} ${lazytext} for this command.`);
	  case 1:
	   Zu ausführender code
        break;
       //Default wird ausgeführt wenn keine der cases mit den Ergebnis übereinstimmt.
       default:
       Default Text
    };
  
  //Zum schnellen copy pasten.
 
 switch(){
	  case :
	  
	  break;
	} ;