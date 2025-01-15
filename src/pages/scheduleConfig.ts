// Types for the compressed schedule format
interface TemplateActivity {
    activity: string;
    type: ActivityType;
    details: string;
    duration: number;  // in minutes
}

interface LocationMap {
    [key: string]: string;
}

interface TimeBlock {
    start: string;
    blocks: [string, number][];  // [templateKey, duration]
}

interface DayPattern {
    pattern: string;
    unique?: Activity[];
}

interface CompressedSchedule {
    templates: Record<string, TemplateActivity>;
    locations: LocationMap;
    defaultTimes: {
        weekday: { wakeup: string; sleep: string; };
        weekend: { wakeup: string; sleep: string; };
    };
    patterns: Record<string, TimeBlock>;
    days: Record<DayOfWeek, DayPattern>;
    rules: {
        minStudyTime: number;
        maxWorkTime: number;
        requiredBreaks: {
            study: number;
            work: number;
        };
    };
}

// Convert time string to minutes past midnight
function timeToMinutes(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// Convert minutes to time string
function minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// Generate a full activity from a template and time
function createActivityFromTemplate(
    templateKey: string,
    startTime: string,
    duration: number,
    templates: Record<string, TemplateActivity>
): Activity {
    const template = templates[templateKey];
    const endMinutes = timeToMinutes(startTime) + duration;
    const endTime = minutesToTime(endMinutes);

    return {
        time: `${startTime}-${endTime}`,
        activity: template.activity,
        type: template.type,
        details: template.details
    };
}

// Apply a pattern to generate a day's schedule
function applyDayPattern(
    pattern: TimeBlock,
    templates: Record<string, TemplateActivity>
): Activity[] {
    let currentTime = pattern.start;
    const activities: Activity[] = [];

    pattern.blocks.forEach(([templateKey, duration]) => {
        const activity = createActivityFromTemplate(
            templateKey,
            currentTime,
            duration,
            templates
        );
        activities.push(activity);

        // Update current time
        currentTime = minutesToTime(timeToMinutes(currentTime) + duration);
    });

    return activities;
}

// Main function to generate the full schedule
export function generateSchedule(config: CompressedSchedule): Schedule {
    const schedule: Schedule = {} as Schedule;

    // Generate schedule for each day
    Object.entries(config.days).forEach(([day, dayConfig]) => {
        const dayPattern = config.patterns[dayConfig.pattern];
        let activities = applyDayPattern(dayPattern, config.templates);

        // Add unique activities for the day
        if (dayConfig.unique) {
            activities = mergeUniqueActivities(activities, dayConfig.unique);
        }

        schedule[day as DayOfWeek] = activities;
    });

    // Validate against rules
    validateSchedule(schedule, config.rules);

    return schedule;
}

// Helper function to merge unique activities into the pattern-generated schedule
function mergeUniqueActivities(baseActivities: Activity[], uniqueActivities: Activity[]): Activity[] {
    const merged = [...baseActivities];

    uniqueActivities.forEach(unique => {
        // Find overlapping activities and adjust/remove them
        const [uniqueStart, uniqueEnd] = unique.time.split('-');
        const uniqueStartMins = timeToMinutes(uniqueStart);
        const uniqueEndMins = timeToMinutes(uniqueEnd);

        // Remove or adjust overlapping activities
        for (let i = merged.length - 1; i >= 0; i--) {
            const [start, end] = merged[i].time.split('-');
            const startMins = timeToMinutes(start);
            const endMins = timeToMinutes(end);

            if (uniqueStartMins <= endMins && uniqueEndMins >= startMins) {
                merged.splice(i, 1);
            }
        }

        // Insert the unique activity in the correct position
        const insertIndex = merged.findIndex(activity => {
            const [, actEnd] = activity.time.split('-');
            return timeToMinutes(actEnd) > uniqueStartMins;
        });

        if (insertIndex === -1) {
            merged.push(unique);
        } else {
            merged.splice(insertIndex, 0, unique);
        }
    });

    return merged;
}

// Validate schedule against rules
function validateSchedule(schedule: Schedule, rules: CompressedSchedule['rules']): void {
    Object.entries(schedule).forEach(([day, activities]) => {
        let studyTime = 0;
        let workTime = 0;

        activities.forEach(activity => {
            const duration = calculateDuration(activity.time);

            if (activity.type === 'study') {
                studyTime += duration;
            } else if (activity.type === 'work') {
                workTime += duration;
            }
        });

        if (studyTime < rules.minStudyTime) {
            console.warn(`Warning: ${day} has insufficient study time`);
        }
        if (workTime > rules.maxWorkTime) {
            console.warn(`Warning: ${day} exceeds maximum work time`);
        }
    });
}