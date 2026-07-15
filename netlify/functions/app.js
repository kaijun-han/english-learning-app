const serverless = require('serverless-http');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const JWT_SECRET = process.env.JWT_SECRET || 'english-learning-secret-key';

app.use(express.json());

let users = [];
let words = [];
let lessons = [];
let userProgress = {};

const initData = () => {
  words = [
    { id: 1, word: 'apple', meaning: '鑻规灉', phonetic: '/藞忙pl/', example: 'I eat an apple every day.', level: 1 },
    { id: 2, word: 'book', meaning: '涔?, phonetic: '/b蕣k/', example: 'This is a good book.', level: 1 },
    { id: 3, word: 'cat', meaning: '鐚?, phonetic: '/k忙t/', example: 'The cat is sleeping.', level: 1 },
    { id: 4, word: 'dog', meaning: '鐙?, phonetic: '/d蓲伞/', example: 'I have a pet dog.', level: 1 },
    { id: 5, word: 'egg', meaning: '楦¤泲', phonetic: '/e伞/', example: 'I had an egg for breakfast.', level: 1 },
    { id: 6, word: 'family', meaning: '瀹跺涵', phonetic: '/藞f忙m蓹li/', example: 'I love my family.', level: 2 },
    { id: 7, word: 'garden', meaning: '鑺卞洯', phonetic: '/藞伞蓱藧dn/', example: 'She has a beautiful garden.', level: 2 },
    { id: 8, word: 'house', meaning: '鎴垮瓙', phonetic: '/ha蕣s/', example: 'This is my house.', level: 2 },
    { id: 9, word: 'important', meaning: '閲嶈鐨?, phonetic: '/瑟m藞p蓴藧t蓹nt/', example: 'This is very important.', level: 2 },
    { id: 10, word: 'journey', meaning: '鏃呯▼', phonetic: '/藞d蕭蓽藧ni/', example: 'Life is a long journey.', level: 2 },
    { id: 11, word: 'knowledge', meaning: '鐭ヨ瘑', phonetic: '/藞n蓲l瑟d蕭/', example: 'Knowledge is power.', level: 3 },
    { id: 12, word: 'language', meaning: '璇█', phonetic: '/藞l忙艐伞w瑟d蕭/', example: 'English is a global language.', level: 3 },
    { id: 13, word: 'mountain', meaning: '灞?, phonetic: '/藞ma蕣nt瑟n/', example: 'We climbed the mountain.', level: 3 },
    { id: 14, word: 'natural', meaning: '鑷劧鐨?, phonetic: '/藞n忙t蕛r蓹l/', example: 'This is a natural beauty.', level: 3 },
    { id: 15, word: 'opportunity', meaning: '鏈轰細', phonetic: '/藢蓲p蓹藞tju藧n蓹ti/', example: 'This is a great opportunity.', level: 3 },
    { id: 16, word: 'perspective', meaning: '瑙嗚', phonetic: '/p蓹藞spekt瑟v/', example: 'Try to see things from different perspectives.', level: 4 },
    { id: 17, word: 'questionnaire', meaning: '闂嵎', phonetic: '/藢kwest蕛蓹藞ne蓹r/', example: 'Please fill out this questionnaire.', level: 4 },
    { id: 18, word: 'responsibility', meaning: '璐ｄ换', phonetic: '/r瑟藢sp蓲ns蓹藞b瑟l蓹ti/', example: 'Everyone has their responsibilities.', level: 4 },
    { id: 19, word: 'sophisticated', meaning: '澶嶆潅鐨?, phonetic: '/s蓹藞f瑟st瑟ke瑟t瑟d/', example: 'This is a sophisticated system.', level: 4 },
    { id: 20, word: 'temperature', meaning: '娓╁害', phonetic: '/藞tempr蓹t蕛蓹/', example: 'The temperature is rising.', level: 4 },
    { id: 21, word: 'unprecedented', meaning: '鍙叉棤鍓嶄緥鐨?, phonetic: '/蕦n藞pres瑟dent瑟d/', example: 'This is an unprecedented event.', level: 5 },
    { id: 22, word: 'vulnerability', meaning: '鑴嗗急鎬?, phonetic: '/藢v蕦ln蓹r蓹藞b瑟l蓹ti/', example: 'Identify the vulnerabilities.', level: 5 },
    { id: 23, word: 'phenomenon', meaning: '鐜拌薄', phonetic: '/f瑟藞n蓲m瑟n蓹n/', example: 'This is a natural phenomenon.', level: 5 },
    { id: 24, word: 'entrepreneur', meaning: '浼佷笟瀹?, phonetic: '/藢蓲ntr蓹pr蓹藞n蓽藧/', example: 'He is a successful entrepreneur.', level: 5 },
    { id: 25, word: 'collaboration', meaning: '鍚堜綔', phonetic: '/k蓹藢l忙b蓹藞re瑟蕛n/', example: 'Collaboration is key to success.', level: 5 }
  ];

  lessons = [
    { id: 1, title: '鎴戠殑瀹跺涵', content: 'This is my family. My father is a teacher. My mother is a doctor. I have a brother and a sister. We live together happily.', level: 1, words: [1, 6] },
    { id: 2, title: '缇庝附鐨勮姳鍥?, content: 'There is a beautiful garden in front of my house. There are many flowers and trees in the garden. I like to walk in the garden every morning.', level: 2, words: [7, 8] },
    { id: 3, title: '鐭ヨ瘑鐨勫姏閲?, content: 'Knowledge is power. Learning English is very important. It opens many doors and opportunities. With knowledge, we can achieve great things.', level: 3, words: [11, 15] },
    { id: 4, title: '璐ｄ换涓庢垚闀?, content: 'As we grow up, we take on more responsibilities. It is important to understand our role in society. Responsibility brings maturity and wisdom.', level: 4, words: [18, 19] },
    { id: 5, title: '鍏ㄧ悆鍖栨椂浠?, content: 'In this unprecedented era of globalization, collaboration is essential. Entrepreneurs must understand international markets and cultural differences.', level: 5, words: [24, 25] }
  ];
};

initData();

app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: '鐢ㄦ埛鍚嶅拰瀵嗙爜涓嶈兘涓虹┖' });
  
  const existingUser = users.find(u => u.username === username);
  if (existingUser) return res.status(400).json({ error: '鐢ㄦ埛鍚嶅凡瀛樺湪' });
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, password: hashedPassword, level: 1, createdAt: new Date() };
  users.push(newUser);
  userProgress[newUser.id] = { learnedWords: [], reviewWords: {}, streak: 0, lastStudyDate: null, totalStudyTime: 0, quizScores: [] };
  
  const token = jwt.sign({ userId: newUser.id, username }, JWT_SECRET);
  res.json({ token, user: { id: newUser.id, username, level: newUser.level } });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: '鐢ㄦ埛鍚嶅拰瀵嗙爜涓嶈兘涓虹┖' });
  
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: '鐢ㄦ埛涓嶅瓨鍦? });
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ error: '瀵嗙爜閿欒' });
  
  const token = jwt.sign({ userId: user.id, username }, JWT_SECRET);
  res.json({ token, user: { id: user.id, username, level: user.level } });
});

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: '鏈巿鏉? });
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: '鏃犳晥鐨則oken' });
  }
};

app.get('/api/users/progress', authenticate, (req, res) => {
  const progress = userProgress[req.user.userId] || { learnedWords: [], reviewWords: {}, streak: 0, lastStudyDate: null, totalStudyTime: 0, quizScores: [] };
  res.json(progress);
});

app.get('/api/users/level-test', (req, res) => {
  const questions = [
    { id: 1, question: 'What is your favorite food?', options: ['Apple', 'Book', 'Cat', 'Dog'] },
    { id: 2, question: 'Which word means "瀹跺涵"?', options: ['Family', 'Garden', 'House', 'Important'] },
    { id: 3, question: 'Knowledge is ____.', options: ['power', 'book', 'cat', 'dog'] },
    { id: 4, question: 'What does "opportunity" mean?', options: ['鏈轰細', '鐭ヨ瘑', '璇█', '灞?] },
    { id: 5, question: 'Choose the most difficult word:', options: ['unprecedented', 'apple', 'book', 'cat'] }
  ];
  res.json(questions);
});

app.post('/api/users/level-test', authenticate, (req, res) => {
  const { answers } = req.body;
  let score = 0;
  const correctAnswers = ['Apple', 'Family', 'power', '鏈轰細', 'unprecedented'];
  
  answers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) score++;
  });
  
  let level = 1;
  if (score >= 4) level = 3;
  else if (score >= 2) level = 2;
  
  const user = users.find(u => u.id === req.user.userId);
  if (user) user.level = level;
  
  res.json({ score, level, maxScore: 5 });
});

app.get('/api/words', (req, res) => {
  const { level } = req.query;
  let filteredWords = words;
  if (level) filteredWords = words.filter(w => w.level === parseInt(level));
  res.json(filteredWords);
});

app.get('/api/words/:id', (req, res) => {
  const word = words.find(w => w.id === parseInt(req.params.id));
  if (!word) return res.status(404).json({ error: '鍗曡瘝涓嶅瓨鍦? });
  res.json(word);
});

app.post('/api/words/learn', authenticate, (req, res) => {
  const { wordId, rating } = req.body;
  const word = words.find(w => w.id === parseInt(wordId));
  if (!word) return res.status(404).json({ error: '鍗曡瘝涓嶅瓨鍦? });
  
  const progress = userProgress[req.user.userId] || { learnedWords: [], reviewWords: {}, streak: 0, lastStudyDate: null, totalStudyTime: 0, quizScores: [] };
  
  if (!progress.learnedWords.includes(wordId)) {
    progress.learnedWords.push(wordId);
  }
  
  const today = new Date().toDateString();
  if (progress.lastStudyDate !== today) {
    if (progress.lastStudyDate) {
      const lastDate = new Date(progress.lastStudyDate);
      const diffDays = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) progress.streak++;
      else if (diffDays > 1) progress.streak = 0;
    } else {
      progress.streak = 1;
    }
    progress.lastStudyDate = today;
  }
  
  progress.totalStudyTime += 5;
  
  if (rating >= 3) {
    const now = Date.now();
    const interval = rating === 3 ? 1 : (rating === 4 ? 3 : 7);
    progress.reviewWords[wordId] = now + interval * 24 * 60 * 60 * 1000;
  }
  
  userProgress[req.user.userId] = progress;
  res.json({ success: true, progress });
});

app.get('/api/words/daily', authenticate, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  const progress = userProgress[req.user.userId] || { learnedWords: [], reviewWords: {} };
  
  const now = Date.now();
  const reviewWords = words.filter(w => {
    const reviewTime = progress.reviewWords[w.id];
    return reviewTime && reviewTime <= now;
  });
  
  const newWords = words.filter(w => 
    w.level <= user.level && !progress.learnedWords.includes(w.id)
  ).slice(0, 10 - reviewWords.length);
  
  res.json({ review: reviewWords, new: newWords });
});

app.get('/api/lessons', (req, res) => {
  const { level } = req.query;
  let filteredLessons = lessons;
  if (level) filteredLessons = lessons.filter(l => l.level === parseInt(level));
  res.json(filteredLessons);
});

app.get('/api/lessons/:id', (req, res) => {
  const lesson = lessons.find(l => l.id === parseInt(req.params.id));
  if (!lesson) return res.status(404).json({ error: '璇炬枃涓嶅瓨鍦? });
  
  const lessonWords = lesson.words.map(wid => words.find(w => w.id === wid)).filter(Boolean);
  res.json({ ...lesson, words: lessonWords });
});

app.post('/api/ai/generate-quiz', authenticate, (req, res) => {
  const { topic, count } = req.body;
  const numQuestions = count || 5;
  
  const user = users.find(u => u.id === req.user.userId);
  const levelWords = words.filter(w => w.level <= user.level);
  
  const quiz = [];
  for (let i = 0; i < numQuestions && i < levelWords.length; i++) {
    const word = levelWords[Math.floor(Math.random() * levelWords.length)];
    const wrongOptions = levelWords
      .filter(w => w.id !== word.id)
      .slice(0, 3)
      .map(w => w.meaning);
    
    const options = [...wrongOptions, word.meaning].sort(() => Math.random() - 0.5);
    
    quiz.push({
      id: i + 1,
      question: `What is the meaning of "${word.word}"?`,
      options,
      correctAnswer: word.meaning,
      wordId: word.id
    });
  }
  
  res.json({ quiz });
});

app.post('/api/ai/evaluate-quiz', authenticate, (req, res) => {
  const { quiz, answers } = req.body;
  
  let score = 0;
  const results = quiz.map((q, index) => {
    const isCorrect = answers[index] === q.correctAnswer;
    if (isCorrect) score++;
    return {
      question: q.question,
      userAnswer: answers[index],
      correctAnswer: q.correctAnswer,
      isCorrect
    };
  });
  
  const progress = userProgress[req.user.userId] || { learnedWords: [], reviewWords: {}, streak: 0, lastStudyDate: null, totalStudyTime: 0, quizScores: [] };
  progress.quizScores.push({ date: new Date(), score, total: quiz.length });
  userProgress[req.user.userId] = progress;
  
  res.json({ score, total: quiz.length, results });
});

app.get('/api/words/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  
  const results = words.filter(w => 
    w.word.toLowerCase().includes(q.toLowerCase()) ||
    w.meaning.includes(q)
  ).slice(0, 10);
  
  res.json(results);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

module.exports.handler = serverless(app);