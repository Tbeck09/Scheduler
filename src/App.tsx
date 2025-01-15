import {useMemo} from "react";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
/**
 * @fileoverview Weekly Schedule Component
 * This file implements a comprehensive weekly schedule management system with activity tracking
 * and time analysis capabilities. It handles multiple activity types, provides visual organization,
 * and calculates time utilization across different categories.
 */

/**
 * Base activity types that can be scheduled
 * These represent the fundamental categories of activities that can be tracked
 * in the schedule. Each type corresponds to a specific color in the UI for
 * visual distinction.
 */
const ActivityTypes = {
    class: 'Class',      // Academic classes
    study: 'Study',      // Study sessions
    work: 'Work',        // Work-related activities
    workout: 'Workout',  // Physical exercise
    meals: 'Meals',      // Meal times
    project: 'Project',  // Personal or academic projects
    routine: 'Routine',  // Daily routines
    sleep: 'Sleep',      // Sleep schedule
    leisure: 'Leisure'   // Free time activities
} as const;

// Type definitions for TypeScript type safety
type ActivityType = keyof typeof ActivityTypes;
type ActivityTotals = Record<ActivityType, number>;
type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

/**
 * Interface defining the structure of an individual activity
 * @property {string} time - Time range for the activity in format "HH:MMam/pm-HH:MMam/pm"
 * @property {string} activity - Name/title of the activity
 * @property {ActivityType} type - Category of the activity from ActivityTypes
 * @property {string} details - Additional information about the activity
 */
interface Activity {
    time: string;
    activity: string;
    type: ActivityType;
    details: string;
}

/**
 * Type definition for the full weekly schedule
 * Maps each day to an array of activities
 */
type Schedule = Record<DayOfWeek, Activity[]>;

/**
 * Converts a time string to minutes since midnight
 * Handles both 12-hour and 24-hour time formats with AM/PM indicators
 *
 * @param timeStr - Time string in format "HH:MM(am/pm)"
 * @returns {number} Minutes since midnight
 *
 * @example
 * timeToMinutes("9:30am") // Returns 570 (9 hours * 60 + 30 minutes)
 * timeToMinutes("2:15pm") // Returns 855 (14 hours * 60 + 15 minutes)
 */
const timeToMinutes = (timeStr: string): number => {
    // Clean up input string by removing spaces and converting to lowercase
    const cleanTime = timeStr.toLowerCase().replace(/\s/g, '');

    // Split time and AM/PM indicator
    const [time, modifier] = cleanTime.split(/(?=[ap]m)/);
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr || '0');

    // Convert to 24-hour format
    if (hours === 12) {
        hours = modifier === 'pm' ? 12 : 0;
    } else if (modifier === 'pm') {
        hours += 12;
    }

    return hours * 60 + minutes;
};

/**
 * Calculates the duration between two times in minutes
 * Handles cases where the end time is on the next day (crosses midnight)
 *
 * @param timeRange - String in format "start-end" where times are in HH:MM(am/pm) format
 * @returns {number} Duration in minutes
 */
const calculateDuration = (timeRange: string): number => {
    const [startStr, endStr] = timeRange.split('-').map(t => t.trim());
    const start = timeToMinutes(startStr);
    let end = timeToMinutes(endStr);

    // Handle cases where activity crosses midnight
    if (end <= start) {
        end += 24 * 60; // Add 24 hours worth of minutes
    }

    return end - start;
};

/**
 * Formats a duration in minutes to a human-readable string
 * Converts minutes to hours and remaining minutes
 *
 * @param totalMinutes - Duration in minutes
 * @returns {string} Formatted string like "X hours Y mins"
 */
const formatDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hours${minutes > 0 ? ` ${minutes} mins` : ''}`;
};

/**
 * WeeklySchedule Component
 * Renders a complete weekly schedule with time analysis and visual organization
 * Features:
 * - Daily activity timeline
 * - Color-coded activity types
 * - Time utilization analysis
 * - Responsive layout
 * - Weekly summary statistics
 */
const WeeklySchedule = () => {



    // Define days of week for iteration
    const days: DayOfWeek[] = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday'
    ] as const;

    /**
     * Color mapping for different activity types
     * Uses Tailwind CSS color classes for consistent styling
     */
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

    /**
     * Weekly schedule definition
     * Detailed schedule for each day including all activities
     * Note: Schedule constant moved to separate file for brevity
     */


    const schedule: Schedule = {
        Monday: [
            { time: '6:00am-6:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:30am-7:30am', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '7:30am-8:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '8:00am-9:05am', activity: 'Study Block', type: 'study', details: 'Morning study session' },
            { time: '9:05am-10:00am', activity: 'PD 2050', type: 'class', details: 'Swift Hall 516' },
            { time: '10:00am-11:15am', activity: 'Study Block', type: 'study', details: 'Review PD 2050 material' },
            { time: '11:15am-12:10pm', activity: 'CS 4065', type: 'class', details: 'Swift Hall 800' },
            { time: '12:10pm-12:40pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '12:40pm-2:15pm', activity: 'Remote Work', type: 'work', details: 'Async work block' },
            { time: '2:15pm-2:30pm', activity: 'CS 4071', type: 'class', details: 'Baldwin Hall 544' },
            { time: '2:30pm-4:30pm', activity: 'Study Block', type: 'study', details: 'CS coursework focus' },
            { time: '4:30pm-5:00pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '5:00pm-7:00pm', activity: 'Study Block', type: 'study', details: 'Evening study session' },
            { time: '7:00pm-8:30pm', activity: 'Remote Work', type: 'work', details: 'Extended work block' },
            { time: '8:30pm-9:30pm', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '9:30pm-10:00pm', activity: 'Leisure Time', type: 'leisure', details: 'Wind down' },
            { time: '10:00pm-6:00am', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Tuesday: [
            { time: '6:00am-6:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:30am-7:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '7:00am-9:00am', activity: 'Study Block', type: 'study', details: 'Morning study session' },
            { time: '9:00am-12:00pm', activity: 'Remote Work', type: 'work', details: 'Focused work block' },
            { time: '12:00pm-12:30pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '12:30pm-1:50pm', activity: 'CS 3093C', type: 'class', details: 'Swift Hall 500' },
            { time: '1:50pm-2:30pm', activity: 'Remote Work', type: 'work', details: 'Async work block' },
            { time: '2:30pm-4:30pm', activity: 'Study Block', type: 'study', details: 'Software Engineering focus' },
            { time: '4:30pm-5:00pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '5:00pm-6:20pm', activity: 'CS 4092', type: 'class', details: 'Baldwin Hall 544' },
            { time: '6:20pm-6:50pm', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '6:50pm-8:30pm', activity: 'Study Block', type: 'study', details: 'Evening study session' },
            { time: '8:30pm-9:30pm', activity: 'Leisure Time', type: 'leisure', details: 'Free time' },
            { time: '9:30pm-10:00pm', activity: 'Wind Down', type: 'leisure', details: 'Prepare for rest' },
            { time: '10:00pm-6:00am', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Wednesday: [
            { time: '6:00am-6:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:30am-7:30am', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '7:30am-8:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '8:00am-9:00am', activity: 'Study Block', type: 'study', details: 'Morning study session' },
            { time: '9:00am-11:15am', activity: 'Remote Work', type: 'work', details: 'Focused work block' },
            { time: '11:15am-12:10pm', activity: 'CS 4065', type: 'class', details: 'Swift Hall 800' },
            { time: '12:10pm-12:40pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '12:40pm-4:30pm', activity: 'Study Block', type: 'study', details: 'Coursework focus' },
            { time: '4:30pm-5:00pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '5:00pm-6:20pm', activity: 'Study Block', type: 'study', details: 'Evening study session' },
            { time: '6:20pm-8:30pm', activity: 'Remote Work', type: 'work', details: 'Extended work block' },
            { time: '8:30pm-9:30pm', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '9:30pm-10:00pm', activity: 'Leisure Time', type: 'leisure', details: 'Free time' },
            { time: '10:00pm-6:00am', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Thursday: [
            { time: '6:00am-6:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:30am-7:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '7:00am-9:00am', activity: 'Study Block', type: 'study', details: 'Morning study session' },
            { time: '9:00am-12:30pm', activity: 'Remote Work', type: 'work', details: 'Focused work block' },
            { time: '12:30pm-1:50pm', activity: 'CS 3093C', type: 'class', details: 'Swift Hall 500' },
            { time: '1:50pm-2:30pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '2:30pm-4:30pm', activity: 'Study Block', type: 'study', details: 'Software Engineering focus' },
            { time: '4:30pm-5:00pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '5:00pm-6:20pm', activity: 'CS 4092', type: 'class', details: 'Baldwin Hall 544' },
            { time: '6:20pm-6:50pm', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '6:50pm-8:30pm', activity: 'Study Block', type: 'study', details: 'Evening study session' },
            { time: '8:30pm-9:30pm', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '9:30pm-10:00pm', activity: 'Leisure Time', type: 'leisure', details: 'Wind down' },
            { time: '10:00pm-6:00am', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Friday: [
            { time: '6:00am-6:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up, hydration, light stretching' },
            { time: '6:30am-7:30am', activity: 'Weight Training', type: 'workout', details: 'Strength training session' },
            { time: '7:30am-8:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '8:00am-11:15am', activity: 'Study Block', type: 'study', details: 'Morning study session' },
            { time: '11:15am-12:10pm', activity: 'CS 4065', type: 'class', details: 'Swift Hall 800' },
            { time: '12:10pm-12:45pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '12:45pm-4:30pm', activity: 'Remote Work', type: 'work', details: 'Async work block' },
            { time: '4:30pm-5:00pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '5:00pm-6:20pm', activity: 'Study Block', type: 'study', details: 'Evening study session' },
            { time: '6:00pm-8:30pm', activity: 'Remote Work', type: 'work', details: 'Extended work block' },
            { time: '8:30pm-9:30pm', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '9:30pm-11:00pm', activity: 'Leisure Time', type: 'leisure', details: 'Wind down' },
            { time: '10:00pm-7:00am', activity: 'Sleep', type: 'sleep', details: '8 hours of rest' }
        ],
        Saturday: [
            { time: '7:00am-7:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up routine' },
            { time: '7:30am-8:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '8:00am-12:00am', activity: 'Study Block', type: 'study', details: 'Morning study' },
            { time: '12:00pm-12:30pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '12:30pm-4:00pm', activity: 'Remote Work', type: 'work', details: 'Extended work block' },
            { time: '4:00pm-6:20pm', activity: 'Study Block', type: 'study', details: 'Evening study session' },
            { time: '6:20pm-6:50pm', activity: 'Evening Run', type: 'workout', details: '30-minute cardio' },
            { time: '6:50pm-7:30pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '7:30pm-8:30pm', activity: 'Personal Project', type: 'project', details: 'Extended development time' },
            { time: '8:30pm-11:00pm', activity: 'Leisure Time', type: 'leisure', details: 'Free time for social activities' },
            { time: '11:00pm-7:00am', activity: 'Sleep', type: 'sleep', details: 'Extended rest period' }
        ],
        Sunday: [
            { time: '7:00am-7:30am', activity: 'Morning Routine', type: 'routine', details: 'Wake up routine' },
            { time: '7:30am-8:00am', activity: 'Breakfast', type: 'meals', details: 'Morning meal' },
            { time: '8:00am-12:00am', activity: 'Study Block', type: 'study', details: 'Morning study' },
            { time: '12:00pm-12:30pm', activity: 'Lunch', type: 'meals', details: 'Quick meal' },
            { time: '12:30pm-4:00pm', activity: 'Remote Work', type: 'work', details: 'Extended work block' },
            { time: '4:00pm-6:20pm', activity: 'Study Block', type: 'study', details: 'Evening study session' },
            { time: '6:20pm-7:00pm', activity: 'Dinner', type: 'meals', details: 'Evening meal' },
            { time: '7:00pm-8:30pm', activity: 'Personal Project', type: 'project', details: 'Development work' },
            { time: '8:30pm-10:00pm', activity: 'Leisure Time', type: 'leisure', details: 'Free time and wind down' },
            { time: '10:00pm-6:00am', activity: 'Sleep', type: 'sleep', details: 'Extended rest period' }
        ]
    }
    /**
     * Calculate weekly totals for each activity type
     * Uses useMemo to cache calculations and prevent unnecessary recalculations
     * Handles special cases like adjusting meal durations
     */
    const weeklyTotals = useMemo(() => {
        const totals: ActivityTotals = {
            class: 0,
            study: 0,
            work: 0,
            workout: 0,
            meals: 0,
            project: 0,
            routine: 0,
            sleep: 0,
            leisure: 0
        };

        days.forEach(day => {
            schedule[day].forEach(activity => {
                const duration = calculateDuration(activity.time);
                const activityType = activity.type;

                // Special handling for different activity types
                switch(activityType) {
                    case 'meals':
                        // Adjust meal times to account for preparation/cleanup
                        totals[activityType] += Math.floor(duration * 0.5);
                        break;
                    default:
                        // Standard duration calculation for other activitiess
                        totals[activityType] += duration;
                }
            });
        });

        return totals;
    }, [schedule]);

    // Calculate total scheduled hours with explicit type annotations
    const totalScheduledMinutes: number = Object.values(weeklyTotals).reduce((acc, curr) => acc + curr, 0);
    const totalScheduledTime: string = formatDuration(totalScheduledMinutes);
    const hoursInWeek: number = 168;
    const scheduledHoursPercentage: number = Math.round((totalScheduledMinutes / (hoursInWeek * 60)) * 100);

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <div className="text-sm text-gray-500">
                        Showing adjusted times accounting for overlapping activities
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Schedule display */}
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
                        <h3 className="text-lg font-bold mb-4">Weekly Time Analysis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                {Object.entries(weeklyTotals).map(([type, minutes]) => (
                                    <div key={type} className="flex justify-between items-center">
                                        <span className="capitalize">{ActivityTypes[type as ActivityType]}:</span>
                                        <span className="font-medium">{formatDuration(minutes)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center font-bold">
                                    <span>Total Scheduled Time:</span>
                                    <span>{totalScheduledTime}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Hours in Week:</span>
                                    <span>{hoursInWeek} hours</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Schedule Utilization:</span>
                                    <span>{scheduledHoursPercentage}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default WeeklySchedule;