const compressedSchedule: CompressedSchedule = {
    templates: {
        morningRoutine: {
            activity: 'Morning Routine',
            type: 'routine',
            details: 'Wake up, hydration, light stretching',
            duration: 30
        },
        breakfast: {
            activity: 'Breakfast',
            type: 'meals',
            details: 'Morning meal',
            duration: 30
        },
        morningStudy: {
            activity: 'Study Block',
            type: 'study',
            details: 'Morning study session',
            duration: 60
        },
        weightTraining: {
            activity: 'Weight Training',
            type: 'workout',
            details: 'Strength training session',
            duration: 60
        },
        eveningRun: {
            activity: 'Evening Run',
            type: 'workout',
            details: '30-minute cardio',
            duration: 30
        },
        dinner: {
            activity: 'Dinner',
            type: 'meals',
            details: 'Evening meal',
            duration: 30
        },
        sleep: {
            activity: 'Sleep',
            type: 'sleep',
            details: '8 hours of rest',
            duration: 480
        }
    },

    locations: {
        PD2050: 'Swift Hall 516',
        CS4065: 'Swift Hall 800',
        CS4071: 'Baldwin Hall 544',
        CS3093C: 'Swift Hall 500',
        CS4092: 'Baldwin Hall 544'
    },

    defaultTimes: {
        weekday: {
            wakeup: '06:00',
            sleep: '22:00'
        },
        weekend: {
            wakeup: '07:00',
            sleep: '22:00'
        }
    },

    patterns: {
        weekday: {
            start: '06:00',
            blocks: [
                ['morningRoutine', 30],
                ['breakfast', 30],
                ['morningStudy', 60],
                ['weightTraining', 60]
            ]
        },
        weekend: {
            start: '07:00',
            blocks: [
                ['morningRoutine', 30],
                ['breakfast', 30],
                ['morningStudy', 60],
                ['weightTraining', 60]
            ]
        }
    },

    days: {
        Monday: {
            pattern: 'weekday',
            unique: [
                { time: '9:05am-10:00am', activity: 'PD 2050', type: 'class', details: 'Swift Hall 516' },
                { time: '11:15am-12:10pm', activity: 'CS 4065', type: 'class', details: 'Swift Hall 800' }
            ]
        },
        Tuesday: {
            pattern: 'weekday',
            unique: [
                { time: '12:30pm-1:50pm', activity: 'CS 3093C', type: 'class', details: 'Swift Hall 500' },
                { time: '5:30pm-6:20pm', activity: 'CS 4092', type: 'class', details: 'Baldwin Hall 544' }
            ]
        }
        // ... Define other days similarly
    },

    rules: {
        minStudyTime: 120,  // 2 hours minimum study time per day
        maxWorkTime: 480,   // 8 hours maximum work time per day
        requiredBreaks: {
            study: 15,
            work: 30
        }
    }
};