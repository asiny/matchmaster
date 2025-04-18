const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Statik dosyaları serve et
app.use(express.static(__dirname));

// Multer ayarları
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// users.txt'yi kaydetme endpoint'i
app.post('/save-users', upload.single('file'), (req, res) => {
    try {
        // Dosya zaten multer tarafından kaydedildi
        res.json({ success: true });
    } catch (error) {
        console.error('Dosya kaydedilirken hata oluştu:', error);
        res.status(500).json({ error: 'Dosya kaydedilemedi' });
    }
});

// Quiz skorlarını kaydetme endpoint'i
app.post('/save-quiz-scores', upload.single('file'), (req, res) => {
    try {
        // Dosya zaten multer tarafından kaydedildi
        res.json({ success: true });
    } catch (error) {
        console.error('Quiz skorları kaydedilirken hata oluştu:', error);
        res.status(500).json({ error: 'Quiz skorları kaydedilemedi' });
    }
});

// users.txt'yi okuma endpoint'i
app.get('/users.txt', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'users.txt');
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.send('[]');
        }
    } catch (error) {
        console.error('Dosya okunurken hata oluştu:', error);
        res.status(500).json({ error: 'Dosya okunamadı' });
    }
});

// Quiz skorlarını okuma endpoint'i
app.get('/quiz_scores.txt', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'quiz_scores.txt');
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.send('[]');
        }
    } catch (error) {
        console.error('Quiz skorları okunurken hata oluştu:', error);
        res.status(500).json({ error: 'Quiz skorları okunamadı' });
    }
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
}); 