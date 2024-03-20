import fs from "fs";

const filePath = "webhooks.txt";

const eventType = "yoyo";
const callbackUrl = "www.yoyo";
let data = ""

for (let i = 0; i < 10; i++) {
  data = `Event type: ${eventType}\nCallback URL: ${callbackUrl}${i}.dk\n\n`;
  fs.appendFile(filePath, data, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("File created and data written successfully.");
    }
  });
}



///*
function deleteEntry(callbackUrl) {
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n\n').map(line => line.trim());
  
  for (let i = 0; i < lines.length; i++) {
    console.log(`Webhook:\n ${lines[i]}\n\n`)
  }
}

  /*for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(callbackUrl)) {
      lines.splice(i,1);
    }
  }
  const modifiedContent = lines.join('\n\n');
  fs.writeFileSync(filePath, modifiedContent, 'utf-8');
}
*/
deleteEntry("www.yoyo4.dk")
//