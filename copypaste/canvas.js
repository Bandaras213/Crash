//setzt einen string mit, "Namen = canvas" 
const Canvas = require('canvas');

//setzt einen string der (commands) ergänzt. 
const applyText = (canvas, text, fontsize, style) => {
	//setzt den String = DOMelement zum rendeen
    const ctx = canvas.getContext('2d');

    do {
    	//setzt font und fontgröße
        ctx.font = `${style} ${fontsize -= 2}px Arial`;
        //setzt wir weit der Text auf dem canvas breit sein darf
    } while (ctx.measureText(text).width > 380);
    return ctx.font;
}
//erstellt einen canvas mit den maßen 400x400
const canvas = Canvas.createCanvas(400, 400);
//setzt den renderer auf 2d
    const ctx = canvas.getContext('2d');
    //buffer die body variable und läd das Bild
    const { body: buffer } = await snekfetch.get('https://cdn.glitch.com/f7b3eaee-b74f-4adb-8a42-64ad7d305bc0%2Fbully.jpeg?1538149367561');
    //setzt das Bild aus buffer als bg
    const bg = await Canvas.loadImage(buffer);
    //setzt den Punkt an den das Bild starten soll hier ist es oben links Höhe 0 Breite 0
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
   
   //holt den Text aus Abschnitt 1 und setzt die text Größe und Text attribute
    ctx.font = applyText(canvas, `${customText}`, 60,"bold");
    //setzt die text Umrandung Farbe 
    ctx.strokeStyle = color0;
    //setzt die text Füll Farbe
    ctx.fillStyle = color1;
    //setzt die Linien dicke
    ctx.lineWidth = 6;
    //limitiert die langen in A, N, M, Y usw auf maximal 6 dicke
    ctx.miterLimit=2;
    //setzt den Text in die Mitte der Text box
    ctx.textAlign = "center";
    //setzt den Punkt von wo der Text Umrandung gesetzt werden soll
    ctx.strokeText(`${customText}`, 200, 375);
    //setzt den Punkt von wo der Text gefüllt werden soll
    ctx.fillText(`${customText}`, 200, 375);

//setzt einen string der ein neues attachment erstellt mit Namen und den canvas läd
    const attachment = new Discord.Attachment(canvas.toBuffer(), `antibullyrangermeme.png`);
    //sendet eine Nachricht mit TEXT und dem attachment string
    message.channel.send(`${user} summoned the Anti Bully Ranger`, (attachment));
}


//Copy paste

const canvas = require('canvas');

const applyText = (canvas, text, fontsize, style) => {
    const ctx = canvas.getContext('2d');

    do {
        ctx.font = `${style} ${fontsize -= 2}px [font]`;
    } while (ctx.measureText(text).width > [maximale text weite bis nächste Zeile]);
    return ctx.font;
};

    const canvas = Canvas.createCanvas([lange],  [breite] );
    const ctx = canvas.getContext('2d');
    const { body: buffer } = [picture];
    const bg = await Canvas.loadImage(buffer);
    ctx.drawImage(bg, [breite,] , [Höhe] , canvas.width, canvas.height);
   
    ctx.font = applyText(canvas, `${customText}`, [textsize] ,"[attribute = bold etc]");
    ctx.strokeStyle = [Farbe der Umrandung] ;
    ctx.fillStyle = [Farbe des Textes] ;
    ctx.lineWidth = [Linien Breite] ;
    ctx.miterLimit=2;
    ctx.textAlign = "[Text Ausrichtung] ";
    ctx.strokeText(`${customText}`, [breite] , [höhe] );
    ctx.fillText(`${customText}`, [breite] , [Höhe]);

    const attachment = new Discord.Attachment(canvas.toBuffer(), `[make für attachment] `);    
    message.channel.send([text]`, (attachment));
}