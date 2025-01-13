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
            { time: '6:00am-6:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:30am-7:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '7:00am-8:00am', activity: 'Study Block', type: 'study', details: 'Morning study session' },
            { time: '8:00am-9:00am', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '9:05am-10:00am', activity: 'PD 2050', type: 'class', details: 'Swift Hall 516' },
            { time: '10:00am-11:00am', activity: 'Study Block', type: 'study', details: 'Review PD 2050 material' },
            { time: '11:15am-12:10pm', activity: 'CS 4065', type: 'class', details: 'Swift Hall 800' },
            { time: '12:15pm-12:45pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '12:45pm-2:15pm', activity: 'Remote Work', type: 'work', details: 'Async work block' },
            { time: '2:30pm-3:25pm', activity: 'CS 4071', type: 'class', details: 'Baldwin Hall 544' },
            { time: '3:30pm-5:00pm', activity: 'Study Block', type: 'study', details: 'CS coursework focus' },
            { time: '5:00pm-5:30pm', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '5:30pm-6:00pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '6:00pm-8:00pm', activity: 'Remote Work', type: 'work', details: 'Extended work block' },
            { time: '8:00pm-9:30pm', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '9:30pm-10:00pm', activity: 'Leisure Time', type: 'leisure', details: 'Wind down' },
            { time: '10:00pm-6:00am', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Tuesday: [
            { time: '6:00am-6:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:30am-7:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '7:00am-8:00am', activity: 'Study Block', type: 'study', details: 'Morning study session' },
            { time: '8:00am-9:00am', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '9:00am-12:00pm', activity: 'Remote Work', type: 'work', details: 'Focused work block' },
            { time: '12:30pm-1:50pm', activity: 'CS 3093C', type: 'class', details: 'Swift Hall 500' },
            { time: '2:00pm-2:30pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '2:30pm-4:30pm', activity: 'Study Block', type: 'study', details: 'Software Engineering focus' },
            { time: '4:30pm-5:00pm', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '5:00pm-5:30pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '5:30pm-6:20pm', activity: 'CS 4092', type: 'class', details: 'Baldwin Hall 544' },
            { time: '6:30pm-8:30pm', activity: 'Study Block', type: 'study', details: 'Evening study session' },
            { time: '8:30pm-9:30pm', activity: 'Leisure Time', type: 'leisure', details: 'Free time' },
            { time: '10:00pm-6:00am', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Wednesday: [
            { time: '6:00am-6:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:30am-7:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '7:00am-8:00am', activity: 'Study Block', type: 'study', details: 'Morning study session' },
            { time: '8:00am-9:00am', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '9:00am-11:00am', activity: 'Remote Work', type: 'work', details: 'Focused work block' },
            { time: '11:15am-12:10pm', activity: 'CS 4065', type: 'class', details: 'Swift Hall 800' },
            { time: '12:15pm-12:45pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '12:45pm-2:15pm', activity: 'Study Block', type: 'study', details: 'Coursework focus' },
            { time: '2:30pm-3:25pm', activity: 'CS 4071', type: 'class', details: 'Baldwin Hall 544' },
            { time: '3:30pm-5:00pm', activity: 'Study Block', type: 'study', details: 'CS coursework focus' },
            { time: '5:00pm-5:30pm', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '5:30pm-6:00pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '6:00pm-8:00pm', activity: 'Remote Work', type: 'work', details: 'Extended work block' },
            { time: '8:00pm-9:00pm', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '9:00pm-10:00pm', activity: 'Leisure Time', type: 'leisure', details: 'Free time' },
            { time: '10:00pm-6:00am', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Thursday: [
            { time: '6:00am-6:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:30am-7:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '7:00am-8:00am', activity: 'Study Block', type: 'study', details: 'Morning study session' },
            { time: '8:00am-9:00am', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '9:00am-12:00pm', activity: 'Remote Work', type: 'work', details: 'Focused work block' },
            { time: '12:30pm-1:50pm', activity: 'CS 3093C', type: 'class', details: 'Swift Hall 500' },
            { time: '2:00pm-2:30pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '2:30pm-4:30pm', activity: 'Study Block', type: 'study', details: 'Software Engineering focus' },
            { time: '4:30pm-5:00pm', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '5:00pm-5:30pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '5:30pm-6:20pm', activity: 'CS 4092', type: 'class', details: 'Baldwin Hall 544' },
            { time: '6:30pm-8:30pm', activity: 'Study Block', type: 'study', details: 'Evening study session' },
            { time: '8:30pm-9:30pm', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '9:30pm-10:00pm', activity: 'Leisure Time', type: 'leisure', details: 'Wind down' },
            { time: '10:00pm-6:00am', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Friday: [
            { time: '6:00am-6:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:30am-7:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '7:00am-8:00am', activity: 'Study Block', type: 'study', details: 'Morning study session' },
            { time: '8:00am-9:00am', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '9:00am-11:00am', activity: 'Study Block', type: 'study', details: 'Extended morning study' },
            { time: '11:15am-12:10pm', activity: 'CS 4065', type: 'class', details: 'Swift Hall 800' },
            { time: '12:15pm-12:45pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '12:45pm-2:15pm', activity: 'Remote Work', type: 'work', details: 'Async work block' },
            { time: '2:30pm-3:25pm', activity: 'CS 4071', type: 'class', details: 'Baldwin Hall 544' },
            { time: '3:30pm-5:00pm', activity: 'Study Block', type: 'study', details: 'CS coursework focus' },
            { time: '5:00pm-5:30pm', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '5:30pm-6:00pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '6:00pm-8:00pm', activity: 'Remote Work', type: 'work', details: 'Extended work block' },
            { time: '8:00pm-9:30pm', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '9:30pm-10:00pm', activity: 'Leisure Time', type: 'leisure', details: 'Wind down' },
            { time: '10:00pm-6:00am', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Saturday: [
            { time: '7:00am-7:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up routine' },
            { time: '7:30am-8:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '8:00am-9:00am', activity: 'Study Block', type: 'study', details: 'Morning study' },
            { time: '9:00am-10:00am', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '10:00am-12:00pm', activity: 'Study Block', type: 'study', details: 'Extended morning study' },
            { time: '12:00pm-12:30pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '12:30pm-4:00pm', activity: 'Remote Work', type: 'work', details: 'Extended work block' },
            { time: '4:00pm-4:30pm', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '4:30pm-5:00pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '5:00pm-7:00pm', activity: 'Study Block', type: 'study', details: 'Evening study session' },
            { time: '7:00pm-8:30pm', activity: 'Personal Project', type: 'project', details: 'Extended development time' },
            { time: '8:30pm-10:00pm', activity: 'Leisure Time', type: 'leisure', details: 'Free time for social activities' },
            { time: '10:00pm-7:00am', activity: 'Sleep', type: 'sleep', details: 'Extended rest period' }
        ],
        Sunday: [
            { time: '7:00am-7:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up routine' },
            { time: '7:30am-8:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '8:00am-9:00am', activity: 'Study Block', type: 'study', details: 'Morning study' },
            { time: '9:00am-10:00am', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '10:00am-12:00pm', activity: 'Study Block', type: 'study', details: 'Extended morning study' },
            { time: '12:00pm-12:30pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '12:30pm-4:00pm', activity: 'Remote Work', type: 'work', details: 'Extended work block' },
            { time: '4:00pm-4:30pm', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '4:30pm-5:00pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '5:00pm-7:00pm', activity: 'Study Block', type: 'study', details: 'Evening study session' },
            { time: '7:00pm-8:30pm', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '8:30pm-10:00pm', activity: 'Leisure Time', type: 'leisure', details: 'Free time and wind down' },
            { time: '10:00pm-7:00am', activity: 'Sleep', type: 'sleep', details: 'Extended rest period' }
        ],}


    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <div className="text-sm text-gray-500">All times include transition periods</div>
                </CardHeader>
                <CardContent>
                    {/* Legend */}

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
                            <div></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default WeeklySchedule;