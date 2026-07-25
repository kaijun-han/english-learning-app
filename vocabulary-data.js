let VOCABULARY_DATA = null;
let VOCABULARY_LEVELS = {};
let VOCABULARY_TOPICS = {};
let VOCABULARY_BY_LEVEL = {};

async function loadVocabularyData() {
    if (VOCABULARY_DATA) {
        return VOCABULARY_DATA;
    }

    try {
        const response = await fetch('vocabulary.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        VOCABULARY_DATA = await response.json();

        VOCABULARY_LEVELS = {};
        VOCABULARY_TOPICS = VOCABULARY_DATA.topics || {};
        VOCABULARY_BY_LEVEL = {};

        Object.keys(VOCABULARY_DATA.levels || {}).forEach(level => {
            VOCABULARY_LEVELS[level] = {
                name: VOCABULARY_DATA.levels[level].name,
                description: VOCABULARY_DATA.levels[level].description,
                wordCount: VOCABULARY_DATA.levels[level].wordCount,
                cefr: VOCABULARY_DATA.levels[level].cefr,
                schoolLevel: VOCABULARY_DATA.levels[level].schoolLevel
            };
            VOCABULARY_BY_LEVEL[level] = VOCABULARY_DATA.levels[level].words || [];
        });

        return VOCABULARY_DATA;
    } catch (error) {
        console.error('Failed to load vocabulary data:', error);

        VOCABULARY_LEVELS = {
            1: { name: 'Level 1', description: 'Primary 3-4 / CEFR A1', wordCount: 0, cefr: 'A1', schoolLevel: 'Primary 3-4' },
            2: { name: 'Level 2', description: 'Primary 5-6 / CEFR A2', wordCount: 0, cefr: 'A2', schoolLevel: 'Primary 5-6' },
            3: { name: 'Level 3', description: 'Junior 1-2 / CEFR B1', wordCount: 0, cefr: 'B1', schoolLevel: 'Junior 1-2' },
            4: { name: 'Level 4', description: 'Junior 3-Senior 1 / CEFR B2', wordCount: 0, cefr: 'B2', schoolLevel: 'Junior 3-Senior 1' },
            5: { name: 'Level 5', description: 'Senior+ / CEFR C1', wordCount: 0, cefr: 'C1', schoolLevel: 'Senior+' }
        };
        VOCABULARY_TOPICS = {
            1: ['Pronouns/Articles', 'Verbs/Actions', 'Family/Social', 'School/Education', 'Emotions/Descriptions', 'Daily Items', 'Food', 'Time', 'Animals', 'Weather', 'Colors', 'Numbers', 'Body Parts', 'Locations', 'Clothing', 'Transport'],
            2: ['School Life', 'Travel', 'Sports', 'Festivals', 'Careers', 'Hobbies', 'Clothing', 'Seasons', 'Nature', 'Social', 'Emotions', 'Food', 'Time', 'Family', 'Locations', 'Transport'],
            3: ['Technology', 'Culture', 'History', 'Geography', 'Environment', 'Health', 'Entertainment', 'Social', 'Education', 'Economics', 'Politics', 'Art', 'Media', 'International Relations', 'Science', 'Business'],
            4: ['Business', 'Education', 'Politics', 'Economics', 'Science', 'Art', 'Media', 'International Relations', 'Philosophy', 'Psychology', 'Sociology', 'Law', 'Medicine', 'Engineering', 'Literature', 'Academic'],
            5: ['Philosophy', 'Psychology', 'Sociology', 'Law', 'Medicine', 'Engineering', 'Literature', 'Academic Research', 'Technology', 'Culture', 'History', 'Geography', 'Environment', 'Health', 'Business', 'International Relations']
        };
        VOCABULARY_BY_LEVEL = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: []
        };

        return VOCABULARY_DATA;
    }
}

loadVocabularyData();

window.VOCABULARY_LEVELS = VOCABULARY_LEVELS;
window.VOCABULARY_TOPICS = VOCABULARY_TOPICS;
window.VOCABULARY_BY_LEVEL = VOCABULARY_BY_LEVEL;
window.loadVocabularyData = loadVocabularyData;
