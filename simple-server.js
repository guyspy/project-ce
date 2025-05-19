const express = require('express');
const app = express();
const port = 5000;

// 靜態檔案服務
app.use(express.static('.'));

// 所有路由都導向到主頁面
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`LumiBright 應用程式伺服器執行中，網址: http://0.0.0.0:${port}`);
});