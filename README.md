# startfucks

Project. Now no title
專題。標題還沒想

總之是個可個人化的生活資訊小看板

--

### 環境建置

* 需求 Node v6.0.0 以上
* npm install (過程中如有遇到node-gyp錯誤，請先參考[nodejs/node-gyp](https://github.com/nodejs/node-gyp)安裝一些程式)
* 請將專案內的config.example.json修改為config.json，並完成設定檔內容
* 天氣資訊是使用 [OpenWeatherMap](https://openweathermap.org/api)，可以註冊一個帳號獲取API KEY
* 資料庫是使用AWS DynamoDB，可以執行專案內的dynamodb/createtable.js 建立新的table
* 你可能會需要先建立[AWS configure http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html]
* npm start 啟動伺服器 (預設使用nodemon啟動，可以在package.json中修改)
