const VOCABULARY_LEVELS = {
    1: { name: '入门', description: '小学3-4年级 / CEFR A1', wordCount: 500, cefr: 'A1', schoolLevel: '小学3-4年级' },
    2: { name: '基础', description: '小学5-6年级 / CEFR A1-A2', wordCount: 500, cefr: 'A2', schoolLevel: '小学5-6年级' },
    3: { name: '进阶', description: '初中1-2年级 / CEFR A2-B1', wordCount: 1000, cefr: 'B1', schoolLevel: '初中1-2年级' },
    4: { name: '高级', description: '初中3-高中1年级 / CEFR B1-B2', wordCount: 700, cefr: 'B2', schoolLevel: '初中3-高中1年级' },
    5: { name: '精通', description: '高中及以上 / CEFR B2-C1', wordCount: 800, cefr: 'C1', schoolLevel: '高中及以上' }
};

const ALL_TOPICS = ['代词/冠词', '动词/动作', '家庭/社交', '学校/教育', '情感/描述', '日常用品', '食物', '时间', '社会/科技', '旅行', '动物', '天气', '颜色', '数字', '身体部位', '地点', '衣物', '交通工具', '自然', '节日', '运动'];

const VOCABULARY_BY_LEVEL = {
    1: [
        { word: 'a', phonetic: '/ə/', meaning: '一个', example: 'I have a book.', topic: '代词/冠词' },
        { word: 'an', phonetic: '/æn/', meaning: '一个', example: 'This is an apple.', topic: '代词/冠词' },
        { word: 'the', phonetic: '/ðə/', meaning: '这个', example: 'The cat is black.', topic: '代词/冠词' },
        { word: 'I', phonetic: '/aɪ/', meaning: '我', example: 'I am happy.', topic: '代词/冠词' },
        { word: 'you', phonetic: '/juː/', meaning: '你', example: 'You are my friend.', topic: '代词/冠词' },
        { word: 'he', phonetic: '/hiː/', meaning: '他', example: 'He likes apples.', topic: '代词/冠词' },
        { word: 'she', phonetic: '/ʃiː/', meaning: '她', example: 'She is beautiful.', topic: '代词/冠词' },
        { word: 'it', phonetic: '/ɪt/', meaning: '它', example: 'It is a dog.', topic: '代词/冠词' },
        { word: 'is', phonetic: '/ɪz/', meaning: '是', example: 'This is a pen.', topic: '动词/动作' },
        { word: 'are', phonetic: '/ɑːr/', meaning: '是', example: 'You are tall.', topic: '动词/动作' },
        { word: 'have', phonetic: '/hæv/', meaning: '有', example: 'I have a book.', topic: '动词/动作' },
        { word: 'go', phonetic: '/ɡəʊ/', meaning: '去', example: 'I go to school.', topic: '动词/动作' },
        { word: 'come', phonetic: '/kʌm/', meaning: '来', example: 'Come here.', topic: '动词/动作' },
        { word: 'see', phonetic: '/siː/', meaning: '看', example: 'I see a bird.', topic: '动词/动作' },
        { word: 'say', phonetic: '/seɪ/', meaning: '说', example: 'Say hello.', topic: '动词/动作' },
        { word: 'eat', phonetic: '/iːt/', meaning: '吃', example: 'I eat breakfast.', topic: '动词/动作' },
        { word: 'play', phonetic: '/pleɪ/', meaning: '玩', example: 'Play games.', topic: '动词/动作' },
        { word: 'read', phonetic: '/riːd/', meaning: '读', example: 'Read a book.', topic: '动词/动作' },
        { word: 'write', phonetic: '/raɪt/', meaning: '写', example: 'Write your name.', topic: '动词/动作' },
        { word: 'run', phonetic: '/rʌn/', meaning: '跑', example: 'Run fast.', topic: '动词/动作' }
    ],
    2: [
        { word: 'friend', phonetic: '/frend/', meaning: '朋友', example: 'She is my best friend.', topic: '家庭/社交' },
        { word: 'school', phonetic: '/skuːl/', meaning: '学校', example: 'I go to school every morning.', topic: '学校/教育' },
        { word: 'teacher', phonetic: '/ˈtiːtʃər/', meaning: '老师', example: 'My teacher is very kind.', topic: '学校/教育' },
        { word: 'student', phonetic: '/ˈstjuːdnt/', meaning: '学生', example: 'I am a student.', topic: '学校/教育' },
        { word: 'family', phonetic: '/ˈfæməli/', meaning: '家庭', example: 'I love my family.', topic: '家庭/社交' },
        { word: 'home', phonetic: '/həʊm/', meaning: '家', example: 'Welcome to my home.', topic: '地点' },
        { word: 'happy', phonetic: '/ˈhæpi/', meaning: '快乐的', example: 'I am very happy today.', topic: '情感/描述' },
        { word: 'beautiful', phonetic: '/ˈbjuːtɪfl/', meaning: '美丽的', example: 'What a beautiful day!', topic: '情感/描述' },
        { word: 'computer', phonetic: '/kəmˈpjuːtər/', meaning: '电脑', example: 'I use my computer every day.', topic: '日常用品' },
        { word: 'book', phonetic: '/bʊk/', meaning: '书', example: 'This is a good book.', topic: '日常用品' },
        { word: 'apple', phonetic: '/ˈæpl/', meaning: '苹果', example: 'I eat an apple every day.', topic: '食物' },
        { word: 'water', phonetic: '/ˈwɔːtər/', meaning: '水', example: 'Drink more water.', topic: '食物' },
        { word: 'food', phonetic: '/fuːd/', meaning: '食物', example: 'I like Chinese food.', topic: '食物' },
        { word: 'time', phonetic: '/taɪm/', meaning: '时间', example: 'What time is it?', topic: '时间' },
        { word: 'day', phonetic: '/deɪ/', meaning: '天', example: 'Have a nice day.', topic: '时间' },
        { word: 'week', phonetic: '/wiːk/', meaning: '周', example: 'I go to school five days a week.', topic: '时间' },
        { word: 'month', phonetic: '/mʌnθ/', meaning: '月', example: 'There are twelve months in a year.', topic: '时间' },
        { word: 'year', phonetic: '/jɪər/', meaning: '年', example: 'Happy New Year!', topic: '时间' },
        { word: 'good', phonetic: '/ɡʊd/', meaning: '好的', example: 'This is very good.', topic: '情感/描述' },
        { word: 'nice', phonetic: '/naɪs/', meaning: '美好的', example: 'You are a nice person.', topic: '情感/描述' }
    ],
    3: [
        { word: 'important', phonetic: '/ɪmˈpɔːtnt/', meaning: '重要的', example: 'This is very important.', topic: '情感/描述' },
        { word: 'different', phonetic: '/ˈdɪfrənt/', meaning: '不同的', example: 'We have different opinions.', topic: '情感/描述' },
        { word: 'practice', phonetic: '/ˈpræktɪs/', meaning: '练习', example: 'Practice makes perfect.', topic: '动词/动作' },
        { word: 'improve', phonetic: '/ɪmˈpruːv/', meaning: '改善', example: 'I want to improve my English.', topic: '动词/动作' },
        { word: 'challenge', phonetic: '/ˈtʃælɪndʒ/', meaning: '挑战', example: 'This is a big challenge.', topic: '社会/科技' },
        { word: 'success', phonetic: '/səkˈses/', meaning: '成功', example: 'Success comes from hard work.', topic: '社会/科技' },
        { word: 'education', phonetic: '/ˌedʒuˈkeɪʃn/', meaning: '教育', example: 'Education is very important.', topic: '学校/教育' },
        { word: 'communicate', phonetic: '/kəˈmjuːnɪkeɪt/', meaning: '交流', example: 'We need to communicate better.', topic: '家庭/社交' },
        { word: 'experience', phonetic: '/ɪkˈspɪəriəns/', meaning: '经验', example: 'She has rich experience.', topic: '家庭/社交' },
        { word: 'opportunity', phonetic: '/ˌɒpəˈtjuːnəti/', meaning: '机会', example: 'This is a great opportunity.', topic: '社会/科技' },
        { word: 'knowledge', phonetic: '/ˈnɒlɪdʒ/', meaning: '知识', example: 'Knowledge is power.', topic: '学校/教育' },
        { word: 'language', phonetic: '/ˈlæŋɡwɪdʒ/', meaning: '语言', example: 'English is a global language.', topic: '学校/教育' },
        { word: 'necessary', phonetic: '/ˈnesəsəri/', meaning: '必要的', example: 'It is necessary to study hard.', topic: '情感/描述' },
        { word: 'development', phonetic: '/dɪˈveləpmənt/', meaning: '发展', example: 'Economic development is important.', topic: '社会/科技' },
        { word: 'technology', phonetic: '/tekˈnɒlədʒi/', meaning: '技术', example: 'Technology changes our lives.', topic: '社会/科技' },
        { word: 'environment', phonetic: '/ɪnˈvaɪrənmənt/', meaning: '环境', example: 'We should protect the environment.', topic: '自然' },
        { word: 'society', phonetic: '/səˈsaɪəti/', meaning: '社会', example: 'We live in a modern society.', topic: '社会/科技' },
        { word: 'culture', phonetic: '/ˈkʌltʃər/', meaning: '文化', example: 'Different countries have different cultures.', topic: '社会/科技' },
        { word: 'journey', phonetic: '/ˈdʒɜːni/', meaning: '旅程', example: 'It was a long journey.', topic: '旅行' },
        { word: 'fantastic', phonetic: '/fænˈtæstɪk/', meaning: '极好的', example: 'That was a fantastic movie.', topic: '情感/描述' },
        { word: 'accomplish', phonetic: '/əˈkʌmplɪʃ/', meaning: '完成', example: 'I accomplished my goal.', topic: '动词/动作' }
    ],
    4: [
        { word: 'perspective', phonetic: '/pəˈspektɪv/', meaning: '视角', example: 'Try to see things from a different perspective.', topic: '社会/科技' },
        { word: 'phenomenon', phonetic: '/fɪˈnɒmɪnən/', meaning: '现象', example: 'This is a natural phenomenon.', topic: '社会/科技' },
        { word: 'consequence', phonetic: '/ˈkɒnsɪkwəns/', meaning: '后果', example: 'Every action has its consequences.', topic: '社会/科技' },
        { word: 'fundamental', phonetic: '/ˌfʌndəˈmentl/', meaning: '基本的', example: 'This is a fundamental principle.', topic: '情感/描述' },
        { word: 'controversy', phonetic: '/ˈkɒntrəvɜːsi/', meaning: '争议', example: 'This issue caused much controversy.', topic: '社会/科技' },
        { word: 'comprehensive', phonetic: '/ˌkɒmprɪˈhensɪv/', meaning: '全面的', example: 'We need a comprehensive solution.', topic: '情感/描述' },
        { word: 'sophisticated', phonetic: '/səˈfɪstɪkeɪtɪd/', meaning: '复杂的', example: 'This is a sophisticated system.', topic: '情感/描述' },
        { word: 'inevitable', phonetic: '/ɪnˈevɪtəbl/', meaning: '不可避免的', example: 'Change is inevitable.', topic: '情感/描述' },
        { word: 'mysterious', phonetic: '/mɪˈstɪəriəs/', meaning: '神秘的', example: 'It was a mysterious event.', topic: '情感/描述' },
        { word: 'significant', phonetic: '/sɪɡˈnɪfɪkənt/', meaning: '重要的', example: 'This is a significant achievement.', topic: '情感/描述' },
        { word: 'substantial', phonetic: '/səbˈstænʃl/', meaning: '大量的', example: 'There has been substantial progress.', topic: '情感/描述' },
        { word: 'considerable', phonetic: '/kənˈsɪdərəbl/', meaning: '相当大的', example: 'It requires considerable effort.', topic: '情感/描述' },
        { word: 'remarkable', phonetic: '/rɪˈmɑːkəbl/', meaning: '显著的', example: 'She made remarkable progress.', topic: '情感/描述' },
        { word: 'essential', phonetic: '/ɪˈsenʃl/', meaning: '必要的', example: 'Water is essential for life.', topic: '情感/描述' },
        { word: 'crucial', phonetic: '/ˈkruːʃl/', meaning: '关键的', example: 'This is a crucial decision.', topic: '情感/描述' },
        { word: 'vital', phonetic: '/ˈvaɪtl/', meaning: '至关重要的', example: 'Health is vital.', topic: '情感/描述' },
        { word: 'primary', phonetic: '/ˈpraɪməri/', meaning: '主要的', example: 'The primary goal is to succeed.', topic: '情感/描述' },
        { word: 'major', phonetic: '/ˈmeɪdʒər/', meaning: '主要的', example: 'This is a major issue.', topic: '情感/描述' },
        { word: 'dominant', phonetic: '/ˈdɒmɪnənt/', meaning: '主导的', example: 'English is the dominant language.', topic: '情感/描述' },
        { word: 'influence', phonetic: '/ˈɪnfluəns/', meaning: '影响', example: 'Music has a big influence on me.', topic: '社会/科技' }
    ],
    5: [
        { word: 'ubiquitous', phonetic: '/juːˈbɪkwɪtəs/', meaning: '无处不在的', example: 'Smartphones are ubiquitous today.', topic: '社会/科技' },
        { word: 'paradigm', phonetic: '/ˈpærədaɪm/', meaning: '范式', example: 'This represents a new paradigm.', topic: '社会/科技' },
        { word: 'ephemeral', phonetic: '/ɪˈfemərəl/', meaning: '短暂的', example: 'Fame can be ephemeral.', topic: '情感/描述' },
        { word: 'pragmatic', phonetic: '/præɡˈmætɪk/', meaning: '务实的', example: 'We need a pragmatic approach.', topic: '情感/描述' },
        { word: 'ambiguous', phonetic: '/æmˈbɪɡjuəs/', meaning: '模糊的', example: 'The statement was ambiguous.', topic: '情感/描述' },
        { word: 'cohesive', phonetic: '/kəʊˈhiːsɪv/', meaning: '有凝聚力的', example: 'The team is very cohesive.', topic: '情感/描述' },
        { word: 'dichotomy', phonetic: '/daɪˈkɒtəmi/', meaning: '二分法', example: 'There is a dichotomy between theory and practice.', topic: '社会/科技' },
        { word: 'eloquent', phonetic: '/ˈeləkwənt/', meaning: '雄辩的', example: 'She gave an eloquent speech.', topic: '情感/描述' },
        { word: 'meticulous', phonetic: '/məˈtɪkjʊləs/', meaning: '一丝不苟的', example: 'He is meticulous about details.', topic: '情感/描述' },
        { word: 'pragmatism', phonetic: '/ˈpræɡmətɪzəm/', meaning: '实用主义', example: 'His approach is based on pragmatism.', topic: '社会/科技' },
        { word: 'resilience', phonetic: '/rɪˈzɪliəns/', meaning: '韧性', example: 'She showed great resilience.', topic: '情感/描述' },
        { word: 'scrutiny', phonetic: '/ˈskruːtəni/', meaning: '仔细审查', example: 'The project came under scrutiny.', topic: '社会/科技' },
        { word: 'tangible', phonetic: '/ˈtændʒəbl/', meaning: '有形的', example: 'We need tangible results.', topic: '情感/描述' },
        { word: 'ubiquity', phonetic: '/juːˈbɪkwɪti/', meaning: '无处不在', example: 'The ubiquity of technology is amazing.', topic: '社会/科技' },
        { word: 'verisimilitude', phonetic: '/ˌverɪsɪˈmɪlɪtjuːd/', meaning: '逼真', example: 'The movie has great verisimilitude.', topic: '情感/描述' },
        { word: 'axiomatic', phonetic: '/ˌæksiəˈmætɪk/', meaning: '公理的', example: 'It is axiomatic that practice improves skills.', topic: '社会/科技' },
        { word: 'cacophony', phonetic: '/kəˈkɒfəni/', meaning: '刺耳的声音', example: 'There was a cacophony of voices.', topic: '社会/科技' },
        { word: 'dogmatic', phonetic: '/dɒɡˈmætɪk/', meaning: '教条的', example: 'He has a dogmatic approach.', topic: '情感/描述' },
        { word: 'equivocal', phonetic: '/ɪˈkwɪvəkl/', meaning: '模棱两可的', example: 'His response was equivocal.', topic: '情感/描述' },
        { word: 'fastidious', phonetic: '/fæˈstɪdiəs/', meaning: '挑剔的', example: 'She is fastidious about cleanliness.', topic: '情感/描述' }
    ]
};

function getAllVocabulary(level) {
    return VOCABULARY_BY_LEVEL[level] || [];
}

function getLevelInfo(level) {
    return VOCABULARY_LEVELS[level] || VOCABULARY_LEVELS[1];
}

function getAllTopics() {
    return ALL_TOPICS;
}

function getTopicWords(level, topic) {
    const words = VOCABULARY_BY_LEVEL[level] || [];
    return words.filter(w => w.topic === topic);
}
