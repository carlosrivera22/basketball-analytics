import React, { useState, useMemo } from 'react';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Home,
    MapPin,
    Monitor
} from 'lucide-react';

// Type definitions
interface GameDetails {
    homeTeam: string;
    awayTeam: string;
    time: string;
    venue: string;
    broadcast: string;
}

interface GameData {
    [day: number]: GameDetails;
}

// Utility function to get days in a month
const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

// Utility function to get the first day of the month
const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
};

// Sample game data generation
const generateGameData = (year: number, month: number): GameData => {
    const teams: string[] = [
        'Warriors', 'Celtics', 'Bucks', 'Nuggets', 'Suns',
        'Heat', 'Lakers', '76ers', 'Mavericks', 'Nets'
    ];

    const venues: string[] = [
        'Chase Center', 'TD Garden', 'Fiserv Forum', 'Ball Arena',
        'Footprint Center', 'Crypto.com Arena', 'Wells Fargo Center'
    ];

    const gameData: GameData = {};
    const daysInMonth = getDaysInMonth(year, month);

    for (let day = 1; day <= daysInMonth; day++) {
        if (Math.random() > 0.7) {  // Randomly generate games
            const homeTeamIndex = Math.floor(Math.random() * teams.length);
            let awayTeamIndex;
            do {
                awayTeamIndex = Math.floor(Math.random() * teams.length);
            } while (awayTeamIndex === homeTeamIndex);

            gameData[day] = {
                homeTeam: teams[homeTeamIndex],
                awayTeam: teams[awayTeamIndex],
                time: `${Math.floor(Math.random() * 12 + 1)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'PM' : 'AM'}`,
                venue: venues[Math.floor(Math.random() * venues.length)],
                broadcast: Math.random() > 0.5 ? 'ESPN' : 'NBA TV'
            };
        }
    }

    return gameData;
};

const GamesCalendarPage: React.FC = () => {
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
    const [selectedGame, setSelectedGame] = useState<GameDetails | null>(null);

    // Generate game data for the current month
    const [gameData, setGameData] = useState<GameData>(() =>
        generateGameData(selectedYear, selectedMonth)
    );

    const monthNames: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Change month navigation
    const changeMonth = (direction: number): void => {
        let newMonth = selectedMonth + direction;
        let newYear = selectedYear;

        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        setSelectedMonth(newMonth);
        setSelectedYear(newYear);

        // Regenerate game data for the new month
        setGameData(generateGameData(newYear, newMonth));
        // Reset selected game when changing months
        setSelectedGame(null);
    };

    // Calculate calendar grid
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDayOfMonth = getFirstDayOfMonth(selectedYear, selectedMonth);

    // Create calendar grid
    const calendarGrid: (number | null)[] = useMemo(() => {
        const grid: (number | null)[] = [];
        let dayCounter = 1;

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            grid.push(null);
        }

        // Add days of the month
        while (dayCounter <= daysInMonth) {
            grid.push(dayCounter);
            dayCounter++;
        }

        return grid;
    }, [selectedYear, selectedMonth, daysInMonth, firstDayOfMonth]);

    return (
        <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Games Calendar</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Upcoming games for {monthNames[selectedMonth]} {selectedYear}
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-3">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => changeMonth(-1)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div className="text-xl font-semibold">
                            {monthNames[selectedMonth]} {selectedYear}
                        </div>
                        <button
                            onClick={() => changeMonth(1)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-6">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div
                        key={day}
                        className="text-center font-semibold text-slate-500 dark:text-slate-400 p-2"
                    >
                        {day}
                    </div>
                ))}
                {calendarGrid.map((day, index) => (
                    <div
                        key={index}
                        className={`
              border border-slate-200 dark:border-slate-700 
              ${day ? 'hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer' : ''}
              ${day === currentDate.getDate() &&
                                selectedMonth === currentDate.getMonth() &&
                                selectedYear === currentDate.getFullYear()
                                ? 'bg-orange-100 dark:bg-orange-900/30' : ''}
              min-h-[120px] p-2 relative
            `}
                        onClick={() => day && setSelectedGame(gameData[day] || null)}
                    >
                        {day && (
                            <div className="flex flex-col">
                                <div className="text-sm font-medium mb-1">
                                    {day}
                                </div>
                                {gameData[day] && (
                                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded p-1 mt-1">
                                        <div className="text-xs font-bold truncate">
                                            {gameData[day].awayTeam} @ {gameData[day].homeTeam}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Game Details Modal */}
            {selectedGame && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Game Details</h2>
                            <button
                                onClick={() => setSelectedGame(null)}
                                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full mr-3 flex items-center justify-center">
                                        {selectedGame.awayTeam}
                                    </div>
                                    <span className="font-medium">{selectedGame.awayTeam}</span>
                                </div>
                                <span className="text-lg font-bold text-slate-500 dark:text-slate-400">@</span>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3 flex items-center justify-center">
                                        {selectedGame.homeTeam}
                                    </div>
                                    <span className="font-medium">{selectedGame.homeTeam}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center">
                                    <Home size={16} className="mr-2 text-slate-500 dark:text-slate-400" />
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        {selectedGame.venue}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Monitor size={16} className="mr-2 text-slate-500 dark:text-slate-400" />
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        {selectedGame.broadcast}
                                    </span>
                                </div>
                                <div className="flex items-center col-span-2">
                                    <Calendar size={16} className="mr-2 text-slate-500 dark:text-slate-400" />
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        {selectedGame.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Calendar Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <Calendar className="mr-2 text-orange-500" />
                        <h3 className="text-lg font-semibold">Total Games</h3>
                    </div>
                    <div className="text-3xl font-bold">{Object.keys(gameData).length}</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Scheduled this month
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <MapPin className="mr-2 text-blue-500" />
                        <h3 className="text-lg font-semibold">Venues</h3>
                    </div>
                    <div className="text-2xl font-bold">
                        {new Set(Object.values(gameData).map(g => g.venue)).size}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Unique arenas
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <Monitor className="mr-2 text-green-500" />
                        <h3 className="text-lg font-semibold">Broadcasts</h3>
                    </div>
                    <div className="text-2xl font-bold">
                        {new Set(Object.values(gameData).map(g => g.broadcast)).size}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        TV networks
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GamesCalendarPage;