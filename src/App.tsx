import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Define activity types as a constant object
const ActivityTypes = {
    class: 'Class',    // Changed to proper display names
    study: 'Study',
    work: 'Work',
    workout: 'Workout',
    meals: 'Meals',
    project: 'Project',
    routine: 'Routine',
    sleep: 'Sleep',
    leisure: 'Leisure'
} as const;

// Create a type from the ActivityTypes object
type ActivityType = keyof typeof ActivityTypes;

// Define the Activity interface with proper typing
interface Activity {
    time: string;
    activity: string;
    type: ActivityType;
    details: string;
}

// Define valid days of the week
type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// Define the Schedule type using Record utility type
type Schedule = Record<DayOfWeek, Activity[]>;


const WeeklySchedule = () => {
    // Define days in chronological order
    // Define days with proper typingg
    const days: DayOfWeek[] = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ] as const;

    const activityColors: Record<ActivityType, string> = {
        class: 'bg-green-200',
        study: 'bg-yellow-100',
        work: 'bg-purple-100',
        workout: 'bg-red-100',
        meals: 'bg-orange-100',
        project: 'bg-indigo-100',
        routine: 'bg-gray-100',
        sleep: 'bg-blue-100',
        leisure: 'bg-pink-100'
    };


    const schedule: Schedule = {
        Monday: [
            { time: '5:30-6:00', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:00-7:00', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '7:00-7:45', activity: 'Shower/Get Ready', type: 'routine', details: 'Personal care and preparation' },
            { time: '7:45-8:45', activity: 'Breakfast & Transit', type: 'meals', details: 'Breakfast and travel to campus' },
            { time: '9:05-10:00', activity: 'PD 2050', type: 'class', details: 'Swift Hall 516' },
            { time: '10:00-11:00', activity: 'Study Block', type: 'study', details: 'Review PD 2050 material' },
            { time: '11:15-12:10', activity: 'CS 4065', type: 'class', details: 'Swift Hall 800' },
            { time: '12:15-1:00', activity: 'Lunch', type: 'meals', details: 'Balanced meal and short break' },
            { time: '1:00-2:15', activity: 'Remote Work', type: 'work', details: 'Async work block' },
            { time: '2:30-3:25', activity: 'CS 4071', type: 'class', details: 'Baldwin Hall 544' },
            { time: '3:30-5:00', activity: 'Study Block', type: 'study', details: 'CS coursework focus' },
            { time: '5:00-5:30', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '5:45-6:30', activity: 'Dinner', type: 'meals', details: 'Final meal of the day' },
            { time: '6:30-8:30', activity: 'Personal Project', type: 'project', details: 'Coding and development' },
            { time: '8:30-9:30', activity: 'Evening Routine', type: 'routine', details: 'Wind down activities' },
            { time: '9:30-5:30', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Tuesday: [
            { time: '5:30-6:00', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:00-7:00', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '7:00-7:45', activity: 'Shower/Get Ready', type: 'routine', details: 'Personal care and preparation' },
            { time: '7:45-8:45', activity: 'Breakfast & Planning', type: 'meals', details: 'Breakfast and day planning' },
            { time: '9:00-12:15', activity: 'Remote Work', type: 'work', details: 'Focused async work block' },
            { time: '12:30-1:50', activity: 'CS 3093C', type: 'class', details: 'Swift Hall 500' },
            { time: '2:00-2:45', activity: 'Lunch', type: 'meals', details: 'Balanced meal and break' },
            { time: '2:45-4:45', activity: 'Study Block', type: 'study', details: 'Software Engineering focus' },
            { time: '5:00-6:20', activity: 'CS 4092', type: 'class', details: 'Baldwin Hall 544' },
            { time: '6:30-7:00', activity: 'Dinner', type: 'meals', details: 'Final meal of the day' },
            { time: '7:00-8:30', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '8:30-9:30', activity: 'Evening Routine', type: 'routine', details: 'Wind down activities' },
            { time: '9:30-5:30', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Wednesday: [
            { time: '5:30-6:00', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:00-7:00', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '7:00-7:45', activity: 'Shower/Get Ready', type: 'routine', details: 'Personal care and preparation' },
            { time: '7:45-8:45', activity: 'Breakfast & Study', type: 'meals', details: 'Breakfast and review' },
            { time: '9:00-11:00', activity: 'Remote Work', type: 'work', details: 'Async work block' },
            { time: '11:15-12:10', activity: 'CS 4065', type: 'class', details: 'Swift Hall 800' },
            { time: '12:15-1:00', activity: 'Lunch', type: 'meals', details: 'Balanced meal' },
            { time: '1:00-2:15', activity: 'Study Block', type: 'study', details: 'Coursework focus' },
            { time: '2:30-3:25', activity: 'CS 4071', type: 'class', details: 'Baldwin Hall 544' },
            { time: '3:30-5:00', activity: 'Study Block', type: 'study', details: 'CS coursework focus' },
            { time: '5:00-5:30', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '5:45-6:30', activity: 'Dinner', type: 'meals', details: 'Final meal of the day' },
            { time: '6:30-8:30', activity: 'Leisure Time', type: 'leisure', details: 'Free time' },
            { time: '8:30-9:30', activity: 'Evening Routine', type: 'routine', details: 'Wind down activities' },
            { time: '9:30-5:30', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Thursday: [
            { time: '5:30-6:00', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:00-7:00', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '7:00-7:45', activity: 'Shower/Get Ready', type: 'routine', details: 'Personal care and preparation' },
            { time: '7:45-8:45', activity: 'Breakfast & Planning', type: 'meals', details: 'Breakfast and day planning' },
            { time: '9:00-12:15', activity: 'Remote Work', type: 'work', details: 'Focused async work block' },
            { time: '12:30-1:50', activity: 'CS 3093C', type: 'class', details: 'Swift Hall 500' },
            { time: '2:00-2:45', activity: 'Lunch', type: 'meals', details: 'Balanced meal and break' },
            { time: '2:45-4:45', activity: 'Study Block', type: 'study', details: 'Software Engineering focus' },
            { time: '5:00-6:20', activity: 'CS 4092', type: 'class', details: 'Baldwin Hall 544' },
            { time: '6:30-7:00', activity: 'Dinner', type: 'meals', details: 'Final meal of the day' },
            { time: '7:00-8:30', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '8:30-9:30', activity: 'Evening Routine', type: 'routine', details: 'Wind down activities' },
            { time: '9:30-5:30', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Friday: [
            { time: '5:30-6:00', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:00-7:00', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '7:00-7:45', activity: 'Shower/Get Ready', type: 'routine', details: 'Personal care and preparation' },
            { time: '7:45-8:45', activity: 'Breakfast & Transit', type: 'meals', details: 'Breakfast and travel to campus' },
            { time: '9:00-11:00', activity: 'Study Block', type: 'study', details: 'Review week\'s material' },
            { time: '11:15-12:10', activity: 'CS 4065', type: 'class', details: 'Swift Hall 800' },
            { time: '12:15-1:00', activity: 'Lunch', type: 'meals', details: 'Balanced meal and short break' },
            { time: '1:00-2:15', activity: 'Remote Work', type: 'work', details: 'Async work block' },
            { time: '2:30-3:25', activity: 'CS 4071', type: 'class', details: 'Baldwin Hall 544' },
            { time: '3:30-5:00', activity: 'Study Block', type: 'study', details: 'CS coursework focus' },
            { time: '5:00-5:30', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '5:45-6:30', activity: 'Dinner', type: 'meals', details: 'Final meal of the day' },
            { time: '6:30-8:30', activity: 'Leisure Time', type: 'leisure', details: 'Free time for social activities' },
            { time: '8:30-9:30', activity: 'Evening Routine', type: 'routine', details: 'Wind down activities' },
            { time: '9:30-5:30', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Saturday: [
            { time: '7:00-8:00', activity: 'Sleep Extended', type: 'sleep', details: 'Extra hour of rest' },
            { time: '8:00-8:30', activity: 'Morning Routine', type: 'routine', details: 'Relaxed wake-up routine' },
            { time: '8:30-9:30', activity: 'Weight Training', type: 'workout', details: 'Optional strength session' },
            { time: '9:30-10:15', activity: 'Breakfast', type: 'meals', details: 'Relaxed breakfast' },
            { time: '10:30-1:30', activity: 'Remote Work', type: 'work', details: 'Extended work block' },
            { time: '1:30-2:15', activity: 'Lunch', type: 'meals', details: 'Balanced meal' },
            { time: '2:30-4:30', activity: 'Study Block', type: 'study', details: 'Weekly review and assignments' },
            { time: '4:30-5:00', activity: 'Evening Run', type: 'workout', details: 'Optional cardio' },
            { time: '5:00-6:30', activity: 'Personal Project', type: 'project', details: 'Extended development time' },
            { time: '6:30-7:00', activity: 'Dinner', type: 'meals', details: 'Final meal of the day' },
            { time: '7:00-9:30', activity: 'Leisure Time', type: 'leisure', details: 'Free time for social activities' },
            { time: '9:30-7:00', activity: 'Sleep', type: 'sleep', details: 'Extended rest period' }
        ],
        Sunday: [
            { time: '7:00-8:00', activity: 'Sleep Extended', type: 'sleep', details: 'Extra hour of rest' },
            { time: '8:00-8:30', activity: 'Morning Routine', type: 'routine', details: 'Relaxed wake-up routine' },
            { time: '8:30-9:15', activity: 'Breakfast', type: 'meals', details: 'Relaxed breakfast' },
            { time: '9:30-12:30', activity: 'Remote Work', type: 'work', details: 'Extended work block' },
            { time: '12:30-1:30', activity: 'Lunch', type: 'meals', details: 'Balanced meal' },
            { time: '1:30-4:30', activity: 'Study Block', type: 'study', details: 'Week ahead preparation' },
            { time: '4:30-5:00', activity: 'Evening Run', type: 'workout', details: 'Optional cardio' },
            { time: '5:00-6:00', activity: 'Week Planning', type: 'routine', details: 'Prepare for week ahead' },
            { time: '6:00-6:30', activity: 'Meal Prep', type: 'routine', details: 'Prepare meals for week' },
            { time: '6:30-7:00', activity: 'Dinner', type: 'meals', details: 'Final meal of the day' },
            { time: '7:00-8:30', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '8:30-9:30', activity: 'Evening Routine', type: 'routine', details: 'Wind down activities' },
            { time: '9:30-5:30', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ]
    };



    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <div className="text-sm text-gray-500">All times include transition periods</div>
                </CardHeader>
                <CardContent>
                    {/* Legend */}
                    // First, let's modify how we use ActivityTypes in our legend rendering:

                    <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                        {(Object.entries(activityColors) as [ActivityType, string][]).map(([type, color]) => (
                            <div key={type} className="flex items-center">
                                <div className={`w-4 h-4 ${color} mr-2 rounded`}></div>
                                {/* Use ActivityTypes to display proper formatted names */}
                                <span className="capitalize">{ActivityTypes[type]}</span>
                            </div>
                        ))}
                    </div>

                    {/* Schedule */}
                    <div className="space-y-8">
                        {days.map((day: DayOfWeek) => (
                            <div key={day} className="border rounded-lg p-4 shadow-sm">
                                <h3 className="text-xl font-bold mb-4 text-gray-800">{day}</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {schedule[day].map((activity: Activity, index: number) => (
                                        <div
                                            key={index}
                                            className={`${activityColors[activity.type]} p-2 rounded flex justify-between items-center`}
                                        >
                                            <span className="font-medium w-24">{activity.time}</span>
                                            <span className="flex-grow px-4">{activity.activity}</span>
                                            {activity.details && (
                                                <span className="text-sm text-gray-600 hidden md:inline">
                                                    {activity.details}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Weekly Summary */}
                    <div className="mt-8 p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-lg font-bold mb-4">Weekly Totals</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>Study Time: 25 hours</div>
                            <div>Work Time: 20 hours</div>
                            <div>Class Time: 15 hours</div>
                            <div>Exercise: 7.5 hours</div>
                            <div>Personal Project: 10 hours</div>
                            <div>Sleep: 56-60 hours</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default WeeklySchedule;