const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const users = [];
const words = [
  { id: 1, word: 'apple', phonetic: '/藞忙pl/', meaning: '鑻规灉', example: 'I eat an apple every day.', level: 1 },
  { id: 2, word: 'book', phonetic: '/b蕣k/', meaning: '涔?, example: 'This is a good book.', level: 1 },
  { id: 3, word: 'cat', phonetic: '/k忙t/', meaning: '鐚?, example: 'The cat is sleeping.', level: 1 },
  { id: 4, word: 'dog', phonetic: '/d蓲伞/', meaning: '鐙?, example: 'I have a pet dog.', level: 1 },
  { id: 5, word: 'elephant', phonetic: '/藞el瑟f蓹nt/', meaning: '澶ц薄', example: 'Elephants are very big.', level: 1 },
  { id: 6, word: 'friend', phonetic: '/frend/', meaning: '鏈嬪弸', example: 'She is my best friend.', level: 2 },
  { id: 7, word: 'garden', phonetic: '/藞伞蓱藧dn/', meaning: '鑺卞洯', example: 'We have a beautiful garden.', level: 2 },
  { id: 8, word: 'happy', phonetic: '/藞h忙pi/', meaning: '蹇箰鐨?, example: 'I am very happy today.', level: 2 },
  { id: 9, word: 'important', phonetic: '/瑟m藞p蓴藧tnt/', meaning: '閲嶈鐨?, example: 'This is very important.', level: 3 },
  { id: 10, word: 'journey', phonetic: '/藞d蕭蓽藧ni/', meaning: '鏃呯▼', example: 'It was a long journey.', level: 3 },
  { id: 11, word: 'knowledge', phonetic: '/藞n蓲l瑟d蕭/', meaning: '鐭ヨ瘑', example: 'Knowledge is power.', level: 4 },
  { id: 12, word: 'language', phonetic: '/藞l忙艐伞w瑟d蕭/', meaning: '璇█', example: 'English is a global language.', level: 4 },
  { id: 13, word: 'mysterious', phonetic: '/m瑟藞st瑟蓹ri蓹s/', meaning: '绁炵鐨?, example: 'It was a mysterious event.', level: 5 },
  { id: 14, word: 'necessary', phonetic: '/藞nes蓹s蓹ri/', meaning: '蹇呰鐨?, example: 'It is necessary to study.', level: 4 },
  { id: 15, word: 'opportunity', phonetic: '/藢蓲p蓹藞tju藧n蓹ti/', meaning: '鏈轰細', example: 'This is a great opportunity.', level: 5 },
];

const lessons = [
  {
    id: 1,
    title: 'My First Day',
    content: 'Today is my first day at school. I am very happy. I have a new friend. Her name is Lily. We play games together and read books. The school has a beautiful garden with many flowers.',
    level: 1,
    wordIds: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    title: 'Weekend Activities',
    content: 'On weekends, I like to read books in the garden. My friends often come to play with me. We are very happy together. It is important to spend time with friends.',
    level: 2,
    wordIds: [6, 7, 8, 9],
  },
  {
    id: 3,
    title: 'Learning Journey',
    content: 'Learning is a long journey. Knowledge is very important. English is a global language that connects people from all over the world. It is necessary to practice every day.',
    level: 3,
    wordIds: [9, 10, 11, 12],
  },
];

const userWords = [];

app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    level: 1,
    createdAt: new Date(),
    lastStudyDate: null,
    streak: 0,
    totalWordsLearned: 0,
    progress: { learning: 0, mastered: 0 },
  };
  users.push(newUser);
  const token = jwt.sign({ userId: newUser.id }, 'secret');
  res.json({ user: newUser, token });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id }, 'secret');
  res.json({ user, token });
});

app.get('/api/users/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.post('/api/users/test', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { score } = req.body;
    user.level = Math.min(5, Math.max(1, Math.floor(score / 20) + 1));
    res.json({ user, message: `Level set to ${user.level}` });
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/api/words', (req, res) => {
  const level = parseInt(req.query.level) || 1;
  const filtered = words.filter(w => w.level <= level);
  res.json(filtered);
});

app.get('/api/words/learn', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userKnownWords = userWords.filter(uw => uw.userId === user.id).map(uw => uw.wordId);
    const availableWords = words.filter(w => w.level <= user.level && !userKnownWords.includes(w.id));
    const todayWords = availableWords.slice(0, 10);

    res.json(todayWords);
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.post('/api/words/feedback', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { wordId, quality } = req.body;
    let userWord = userWords.find(uw => uw.userId === user.id && uw.wordId === wordId);

    if (!userWord) {
      userWord = {
        userId: user.id,
        wordId,
        repetitions: 0,
        interval: 0,
        easeFactor: 2.5,
        nextReviewDate: new Date(),
        status: 'learning',
      };
      userWords.push(userWord);
    }

    if (quality >= 4) {
      if (userWord.repetitions === 0) {
        userWord.interval = 1;
      } else if (userWord.repetitions === 1) {
        userWord.interval = 6;
      } else {
        userWord.interval = Math.round(userWord.interval * userWord.easeFactor);
      }
      userWord.repetitions += 1;
      userWord.easeFactor = Math.max(1.3, userWord.easeFactor + 0.1);
      if (userWord.repetitions >= 3) {
        userWord.status = 'mastered';
        user.totalWordsLearned += 1;
      }
    } else {
      userWord.repetitions = 0;
      userWord.interval = 1;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + userWord.interval);
    userWord.nextReviewDate = nextDate;

    res.json({ userWord, message: 'Feedback saved' });
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/api/words/review', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const today = new Date();
    const reviewWords = userWords
      .filter(uw => uw.userId === user.id && uw.status !== 'mastered' && new Date(uw.nextReviewDate) <= today)
      .map(uw => words.find(w => w.id === uw.wordId))
      .filter(Boolean);

    res.json(reviewWords);
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/api/lessons', (req, res) => {
  const level = parseInt(req.query.level) || 1;
  const filtered = lessons.filter(l => l.level <= level);
  res.json(filtered);
});

app.get('/api/lessons/:id', (req, res) => {
  const lesson = lessons.find(l => l.id === parseInt(req.params.id));
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

  const lessonWords = words.filter(w => lesson.wordIds.includes(w.id));
  res.json({ ...lesson, words: lessonWords });
});

app.post('/api/ai/quiz', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userWordsList = userWords.filter(uw => uw.userId === user.id).map(uw => uw.wordId);
    const levelWords = words.filter(w => w.level <= user.level);
    const availableWords = levelWords.filter(w => userWordsList.includes(w.id));

    const selectedWords = availableWords.length > 0
      ? availableWords.sort(() => Math.random() - 0.5).slice(0, 5)
      : levelWords.sort(() => Math.random() - 0.5).slice(0, 5);

    const quiz = selectedWords.map(word => ({
      question: `What is the meaning of "${word.word}"?`,
      options: [word.meaning, ...words.filter(w => w.id !== word.id).slice(0, 3).map(w => w.meaning)].sort(() => Math.random() - 0.5),
      correctAnswer: word.meaning,
      wordId: word.id,
    }));

    res.json({ quiz });
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.post('/api/users/progress', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const today = new Date().toDateString();
    if (user.lastStudyDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (user.lastStudyDate === yesterday.toDateString()) {
        user.streak += 1;
      } else {
        user.streak = 1;
      }
      user.lastStudyDate = today;
    }

    const learning = userWords.filter(uw => uw.userId === user.id && uw.status === 'learning').length;
    const mastered = userWords.filter(uw => uw.userId === user.id && uw.status === 'mastered').length;

    res.json({
      user: { ...user, progress: { learning, mastered, total: learning + mastered } },
      message: 'Progress updated',
    });
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/api/users/progress', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const learning = userWords.filter(uw => uw.userId === user.id && uw.status === 'learning').length;
    const mastered = userWords.filter(uw => uw.userId === user.id && uw.status === 'mastered').length;

    res.json({
      user: { ...user, progress: { learning, mastered, total: learning + mastered } },
    });
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/api/words/:id', (req, res) => {
  const word = words.find(w => w.id === parseInt(req.params.id));
  if (!word) return res.status(404).json({ message: 'Word not found' });
  res.json(word);
});

app.post('/api/words/learn', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { wordId, quality } = req.body;
    let userWord = userWords.find(uw => uw.userId === user.id && uw.wordId === wordId);

    if (!userWord) {
      userWord = {
        userId: user.id,
        wordId,
        repetitions: 0,
        interval: 0,
        easeFactor: 2.5,
        nextReviewDate: new Date(),
        status: 'learning',
      };
      userWords.push(userWord);
    }

    if (quality >= 4) {
      if (userWord.repetitions === 0) {
        userWord.interval = 1;
      } else if (userWord.repetitions === 1) {
        userWord.interval = 6;
      } else {
        userWord.interval = Math.round(userWord.interval * userWord.easeFactor);
      }
      userWord.repetitions += 1;
      userWord.easeFactor = Math.max(1.3, userWord.easeFactor + 0.1);
      if (userWord.repetitions >= 3) {
        userWord.status = 'mastered';
        user.totalWordsLearned += 1;
      }
    } else {
      userWord.repetitions = 0;
      userWord.interval = 1;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + userWord.interval);
    userWord.nextReviewDate = nextDate;

    res.json({ userWord, message: 'Feedback saved' });
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/api/words/daily', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const today = new Date();
    const reviewWords = userWords
      .filter(uw => uw.userId === user.id && uw.status !== 'mastered' && new Date(uw.nextReviewDate) <= today)
      .map(uw => words.find(w => w.id === uw.wordId))
      .filter(Boolean);

    const userKnownWords = userWords.filter(uw => uw.userId === user.id).map(uw => uw.wordId);
    const availableWords = words.filter(w => w.level <= user.level && !userKnownWords.includes(w.id));

    res.json({ reviewCount: reviewWords.length, newCount: Math.min(5, availableWords.length) });
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.post('/api/ai/generate-quiz', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const levelWords = words.filter(w => w.level <= user.level);
    const selectedWords = levelWords.sort(() => Math.random() - 0.5).slice(0, 5);

    const questions = selectedWords.map(word => ({
      question: `What is the meaning of "${word.word}"?`,
      options: [word.meaning, ...words.filter(w => w.id !== word.id).slice(0, 3).map(w => w.meaning)].sort(() => Math.random() - 0.5),
      correctAnswer: word.meaning,
      wordId: word.id,
    }));

    res.json({ quizId: Date.now(), questions });
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.post('/api/ai/evaluate-quiz', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { answers } = req.body;
    const levelWords = words.filter(w => w.level <= user.level);
    const selectedWords = levelWords.sort(() => Math.random() - 0.5).slice(0, 5);

    let score = 0;
    selectedWords.forEach((word, idx) => {
      const userAnswer = answers[idx];
      const options = [word.meaning, ...words.filter(w => w.id !== word.id).slice(0, 3).map(w => w.meaning)].sort(() => Math.random() - 0.5);
      if (userAnswer !== null && options[userAnswer] === word.meaning) {
        score += 1;
      }
    });

    const totalQuestions = selectedWords.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    res.json({ score, totalQuestions, percentage });
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/api/users/level-test', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const levelWords = words.filter(w => w.level <= 5);
    const testWords = levelWords.sort(() => Math.random() - 0.5).slice(0, 5);

    const questions = testWords.map(word => ({
      question: `What is the meaning of "${word.word}"?`,
      options: [word.meaning, ...words.filter(w => w.id !== word.id).slice(0, 3).map(w => w.meaning)].sort(() => Math.random() - 0.5),
      correctAnswer: word.meaning,
      wordId: word.id,
    }));

    res.json({ questions });
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.post('/api/users/level-test', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { answers } = req.body;
    const levelWords = words.filter(w => w.level <= 5);
    const testWords = levelWords.sort(() => Math.random() - 0.5).slice(0, 5);

    let score = 0;
    testWords.forEach((word, idx) => {
      const userAnswer = answers[idx];
      const options = [word.meaning, ...words.filter(w => w.id !== word.id).slice(0, 3).map(w => w.meaning)].sort(() => Math.random() - 0.5);
      if (userAnswer !== null && options[userAnswer] === word.meaning) {
        score += 1;
      }
    });

    const newLevel = Math.min(5, Math.max(1, Math.floor(score) + 1));
    user.level = newLevel;

    res.json({ score, total: testWords.length, newLevel });
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Server running on http://192.168.43.209:${PORT}`);
});