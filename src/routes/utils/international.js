import cookieParser from 'cookie-parser';
import i18n from 'i18n';
import express from 'express'
const app = express();
i18n.configure({
// setup some locales - other locales default to en silently
locales: ['en', 'fr', 'ki'],
header: 'accept-language',
extension: '.json',
queryParameter: 'lang', 
directoryPermissions: '755',
autoReload: true,
cookie: 'yourcookiename',
directory: __dirname + '/locales'
});
app.use(cookieParser());
app.use(i18n.init);
module.exports =app;