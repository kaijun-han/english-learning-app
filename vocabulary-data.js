const VOCABULARY_LEVELS = {
    1: { name: '入门', description: '小学3-4年级 / CEFR A1', wordCount: 500, cefr: 'A1', schoolLevel: '小学3-4年级' },
    2: { name: '基础', description: '小学5-6年级 / CEFR A1-A2', wordCount: 500, cefr: 'A2', schoolLevel: '小学5-6年级' },
    3: { name: '进阶', description: '初中1-2年级 / CEFR A2-B1', wordCount: 1000, cefr: 'B1', schoolLevel: '初中1-2年级' },
    4: { name: '高级', description: '初中3-高中1年级 / CEFR B1-B2', wordCount: 700, cefr: 'B2', schoolLevel: '初中3-高中1年级' },
    5: { name: '精通', description: '高中及以上 / CEFR B2-C1', wordCount: 800, cefr: 'C1', schoolLevel: '高中及以上' }
};

const VOCABULARY_TOPICS = {
    1: ['代词/冠词', '动词/动作', '家庭/社交', '学校/教育', '情感/描述', '日常用品', '食物', '时间', '动物', '天气', '颜色', '数字', '身体部位', '地点', '衣物', '交通工具'],
    2: ['学校生活', '旅行', '运动', '节日', '职业', '爱好', '衣服', '季节', '自然', '社交', '情感', '食物', '时间', '家庭', '地点', '交通工具'],
    3: ['科技', '文化', '历史', '地理', '环境', '健康', '娱乐', '社交', '教育', '经济', '政治', '艺术', '媒体', '国际关系', '科学', '商业'],
    4: ['商业', '教育', '政治', '经济', '科学', '艺术', '媒体', '国际关系', '哲学', '心理学', '社会学', '法律', '医学', '工程', '文学', '学术'],
    5: ['哲学', '心理学', '社会学', '法律', '医学', '工程', '文学', '学术研究', '科技', '文化', '历史', '地理', '环境', '健康', '商业', '国际关系']
};

const VOCABULARY_BY_LEVEL = {
    1: [
        { word: 'a', phonetic: '/ə/', meaning: '一个', example: 'I have a book.' },
        { word: 'an', phonetic: '/æn/', meaning: '一个', example: 'This is an apple.' },
        { word: 'the', phonetic: '/ðə/', meaning: '这个', example: 'The cat is black.' },
        { word: 'I', phonetic: '/aɪ/', meaning: '我', example: 'I am happy.' },
        { word: 'you', phonetic: '/juː/', meaning: '你', example: 'You are my friend.' },
        { word: 'he', phonetic: '/hiː/', meaning: '他', example: 'He likes apples.' },
        { word: 'she', phonetic: '/ʃiː/', meaning: '她', example: 'She is beautiful.' },
        { word: 'it', phonetic: '/ɪt/', meaning: '它', example: 'It is a dog.' },
        { word: 'is', phonetic: '/ɪz/', meaning: '是', example: 'This is a pen.' },
        { word: 'are', phonetic: '/ɑːr/', meaning: '是', example: 'You are tall.' },
        { word: 'have', phonetic: '/hæv/', meaning: '有', example: 'I have a book.' },
        { word: 'go', phonetic: '/ɡəʊ/', meaning: '去', example: 'I go to school.' },
        { word: 'come', phonetic: '/kʌm/', meaning: '来', example: 'Come here.' },
        { word: 'see', phonetic: '/siː/', meaning: '看', example: 'I see a bird.' },
        { word: 'say', phonetic: '/seɪ/', meaning: '说', example: 'Say hello.' },
        { word: 'eat', phonetic: '/iːt/', meaning: '吃', example: 'I eat breakfast.' },
        { word: 'play', phonetic: '/pleɪ/', meaning: '玩', example: 'Play games.' },
        { word: 'read', phonetic: '/riːd/', meaning: '读', example: 'Read a book.' },
        { word: 'write', phonetic: '/raɪt/', meaning: '写', example: 'Write your name.' },
        { word: 'run', phonetic: '/rʌn/', meaning: '跑', example: 'Run fast.' }
    ],
    2: [
        { word: 'friend', phonetic: '/frend/', meaning: '朋友', example: 'She is my best friend.' },
        { word: 'school', phonetic: '/skuːl/', meaning: '学校', example: 'I go to school every morning.' },
        { word: 'teacher', phonetic: '/ˈtiːtʃər/', meaning: '老师', example: 'My teacher is very kind.' },
        { word: 'student', phonetic: '/ˈstjuːdnt/', meaning: '学生', example: 'I am a student.' },
        { word: 'family', phonetic: '/ˈfæməli/', meaning: '家庭', example: 'I love my family.' },
        { word: 'home', phonetic: '/həʊm/', meaning: '家', example: 'Welcome to my home.' },
        { word: 'happy', phonetic: '/ˈhæpi/', meaning: '快乐的', example: 'I am very happy today.' },
        { word: 'beautiful', phonetic: '/ˈbjuːtɪfl/', meaning: '美丽的', example: 'What a beautiful day!' },
        { word: 'computer', phonetic: '/kəmˈpjuːtər/', meaning: '电脑', example: 'I use my computer every day.' },
        { word: 'book', phonetic: '/bʊk/', meaning: '书', example: 'This is a good book.' },
        { word: 'apple', phonetic: '/ˈæpl/', meaning: '苹果', example: 'I eat an apple every day.' },
        { word: 'water', phonetic: '/ˈwɔːtər/', meaning: '水', example: 'Drink more water.' },
        { word: 'food', phonetic: '/fuːd/', meaning: '食物', example: 'I like Chinese food.' },
        { word: 'time', phonetic: '/taɪm/', meaning: '时间', example: 'What time is it?' },
        { word: 'day', phonetic: '/deɪ/', meaning: '天', example: 'Have a nice day.' },
        { word: 'week', phonetic: '/wiːk/', meaning: '周', example: 'I go to school five days a week.' },
        { word: 'month', phonetic: '/mʌnθ/', meaning: '月', example: 'There are twelve months in a year.' },
        { word: 'year', phonetic: '/jɪər/', meaning: '年', example: 'Happy New Year!' },
        { word: 'good', phonetic: '/ɡʊd/', meaning: '好的', example: 'This is very good.' },
        { word: 'nice', phonetic: '/naɪs/', meaning: '美好的', example: 'You are a nice person.' }
    ],
    3: [
        { word: 'important', phonetic: '/ɪmˈpɔːtnt/', meaning: '重要的', example: 'This is very important.' },
        { word: 'different', phonetic: '/ˈdɪfrənt/', meaning: '不同的', example: 'We have different opinions.' },
        { word: 'practice', phonetic: '/ˈpræktɪs/', meaning: '练习', example: 'Practice makes perfect.' },
        { word: 'improve', phonetic: '/ɪmˈpruːv/', meaning: '改善', example: 'I want to improve my English.' },
        { word: 'challenge', phonetic: '/ˈtʃælɪndʒ/', meaning: '挑战', example: 'This is a big challenge.' },
        { word: 'success', phonetic: '/səkˈses/', meaning: '成功', example: 'Success comes from hard work.' },
        { word: 'education', phonetic: '/ˌedʒuˈkeɪʃn/', meaning: '教育', example: 'Education is very important.' },
        { word: 'communicate', phonetic: '/kəˈmjuːnɪkeɪt/', meaning: '交流', example: 'We need to communicate better.' },
        { word: 'experience', phonetic: '/ɪkˈspɪəriəns/', meaning: '经验', example: 'She has rich experience.' },
        { word: 'opportunity', phonetic: '/ˌɒpəˈtjuːnəti/', meaning: '机会', example: 'This is a great opportunity.' },
        { word: 'knowledge', phonetic: '/ˈnɒlɪdʒ/', meaning: '知识', example: 'Knowledge is power.' },
        { word: 'language', phonetic: '/ˈlæŋɡwɪdʒ/', meaning: '语言', example: 'English is a global language.' },
        { word: 'necessary', phonetic: '/ˈnesəsəri/', meaning: '必要的', example: 'It is necessary to study hard.' },
        { word: 'development', phonetic: '/dɪˈveləpmənt/', meaning: '发展', example: 'Economic development is important.' },
        { word: 'technology', phonetic: '/tekˈnɒlədʒi/', meaning: '技术', example: 'Technology changes our lives.' },
        { word: 'environment', phonetic: '/ɪnˈvaɪrənmənt/', meaning: '环境', example: 'We should protect the environment.' },
        { word: 'society', phonetic: '/səˈsaɪəti/', meaning: '社会', example: 'We live in a modern society.' },
        { word: 'culture', phonetic: '/ˈkʌltʃər/', meaning: '文化', example: 'Different countries have different cultures.' },
        { word: 'journey', phonetic: '/ˈdʒɜːni/', meaning: '旅程', example: 'It was a long journey.' },
        { word: 'fantastic', phonetic: '/fænˈtæstɪk/', meaning: '极好的', example: 'That was a fantastic movie.' }
    ],
    4: [
        { word: 'perspective', phonetic: '/pəˈspektɪv/', meaning: '视角', example: 'Try to see things from a different perspective.' },
        { word: 'phenomenon', phonetic: '/fɪˈnɒmɪnən/', meaning: '现象', example: 'This is a natural phenomenon.' },
        { word: 'consequence', phonetic: '/ˈkɒnsɪkwəns/', meaning: '后果', example: 'Every action has its consequences.' },
        { word: 'fundamental', phonetic: '/ˌfʌndəˈmentl/', meaning: '基本的', example: 'This is a fundamental principle.' },
        { word: 'controversy', phonetic: '/ˈkɒntrəvɜːsi/', meaning: '争议', example: 'This issue caused much controversy.' },
        { word: 'comprehensive', phonetic: '/ˌkɒmprɪˈhensɪv/', meaning: '全面的', example: 'We need a comprehensive solution.' },
        { word: 'sophisticated', phonetic: '/səˈfɪstɪkeɪtɪd/', meaning: '复杂的', example: 'This is a sophisticated system.' },
        { word: 'inevitable', phonetic: '/ɪnˈevɪtəbl/', meaning: '不可避免的', example: 'Change is inevitable.' },
        { word: 'accomplish', phonetic: '/əˈkʌmplɪʃ/', meaning: '完成', example: 'I accomplished my goal.' },
        { word: 'mysterious', phonetic: '/mɪˈstɪəriəs/', meaning: '神秘的', example: 'It was a mysterious event.' },
        { word: 'significant', phonetic: '/sɪɡˈnɪfɪkənt/', meaning: '重要的', example: 'This is a significant achievement.' },
        { word: 'substantial', phonetic: '/səbˈstænʃl/', meaning: '大量的', example: 'There has been substantial progress.' },
        { word: 'considerable', phonetic: '/kənˈsɪdərəbl/', meaning: '相当大的', example: 'It requires considerable effort.' },
        { word: 'remarkable', phonetic: '/rɪˈmɑːkəbl/', meaning: '显著的', example: 'She made remarkable progress.' },
        { word: 'essential', phonetic: '/ɪˈsenʃl/', meaning: '必要的', example: 'Water is essential for life.' },
        { word: 'crucial', phonetic: '/ˈkruːʃl/', meaning: '关键的', example: 'This is a crucial decision.' },
        { word: 'vital', phonetic: '/ˈvaɪtl/', meaning: '至关重要的', example: 'Health is vital.' },
        { word: 'primary', phonetic: '/ˈpraɪməri/', meaning: '主要的', example: 'The primary goal is to succeed.' },
        { word: 'major', phonetic: '/ˈmeɪdʒər/', meaning: '主要的', example: 'This is a major issue.' },
        { word: 'dominant', phonetic: '/ˈdɒmɪnənt/', meaning: '主导的', example: 'English is the dominant language.' }
    ],
    5: [
        { word: 'ubiquitous', phonetic: '/juːˈbɪkwɪtəs/', meaning: '无处不在的', example: 'Smartphones are ubiquitous today.' },
        { word: 'paradigm', phonetic: '/ˈpærədaɪm/', meaning: '范式', example: 'This represents a new paradigm.' },
        { word: 'ephemeral', phonetic: '/ɪˈfemərəl/', meaning: '短暂的', example: 'Fame can be ephemeral.' },
        { word: 'pragmatic', phonetic: '/præɡˈmætɪk/', meaning: '务实的', example: 'We need a pragmatic approach.' },
        { word: 'ambiguous', phonetic: '/æmˈbɪɡjuəs/', meaning: '模糊的', example: 'The statement was ambiguous.' },
        { word: 'cohesive', phonetic: '/kəʊˈhiːsɪv/', meaning: '有凝聚力的', example: 'The team is very cohesive.' },
        { word: 'dichotomy', phonetic: '/daɪˈkɒtəmi/', meaning: '二分法', example: 'There is a dichotomy between theory and practice.' },
        { word: 'eloquent', phonetic: '/ˈeləkwənt/', meaning: '雄辩的', example: 'She gave an eloquent speech.' },
        { word: 'meticulous', phonetic: '/məˈtɪkjʊləs/', meaning: '一丝不苟的', example: 'He is meticulous about details.' },
        { word: 'pragmatism', phonetic: '/ˈpræɡmətɪzəm/', meaning: '实用主义', example: 'His approach is based on pragmatism.' },
        { word: 'resilience', phonetic: '/rɪˈzɪliəns/', meaning: '韧性', example: 'She showed great resilience.' },
        { word: 'scrutiny', phonetic: '/ˈskruːtəni/', meaning: '仔细审查', example: 'The project came under scrutiny.' },
        { word: 'tangible', phonetic: '/ˈtændʒəbl/', meaning: '有形的', example: 'We need tangible results.' },
        { word: 'ubiquity', phonetic: '/juːˈbɪkwɪti/', meaning: '无处不在', example: 'The ubiquity of technology is amazing.' },
        { word: 'verisimilitude', phonetic: '/ˌverɪsɪˈmɪlɪtjuːd/', meaning: '逼真', example: 'The movie has great verisimilitude.' },
        { word: 'axiomatic', phonetic: '/ˌæksiəˈmætɪk/', meaning: '公理的', example: 'It is axiomatic that practice improves skills.' },
        { word: 'cacophony', phonetic: '/kəˈkɒfəni/', meaning: '刺耳的声音', example: 'There was a cacophony of voices.' },
        { word: 'dogmatic', phonetic: '/dɒɡˈmætɪk/', meaning: '教条的', example: 'He has a dogmatic approach.' },
        { word: 'equivocal', phonetic: '/ɪˈkwɪvəkl/', meaning: '模棱两可的', example: 'His response was equivocal.' },
        { word: 'fastidious', phonetic: '/fæˈstɪdiəs/', meaning: '挑剔的', example: 'She is fastidious about cleanliness.' }
    ]
};

function getAllVocabulary(level) {
    return VOCABULARY_BY_LEVEL[level] || [];
}

function getLevelInfo(level) {
    return VOCABULARY_LEVELS[level] || VOCABULARY_LEVELS[1];
}

function getLevelTopics(level) {
    return VOCABULARY_TOPICS[level] || VOCABULARY_TOPICS[1];
}
