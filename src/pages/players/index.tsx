import React, { useState } from 'react';
import {
    Search,
    SortAsc,
    SortDesc,
    ChevronRight,
    Users,
    Award,
    TrendingUp
} from 'lucide-react';

// Sample player data
const playerData = [
    {
        id: 1,
        name: 'Michael Johnson',
        team: 'Golden State Warriors',
        position: 'PG',
        age: 27,
        height: '6\'2"',
        ppg: 22.5,
        rpg: 3.2,
        apg: 7.1,
        steals: 1.5,
        blocks: 0.3,
        fieldGoalPercentage: 45.6,
        threePointPercentage: 38.2,
        image: '/api/placeholder/100/100'
    },
    {
        id: 2,
        name: 'David Williams',
        team: 'Boston Celtics',
        position: 'C',
        age: 29,
        height: '6\'11"',
        ppg: 18.3,
        rpg: 11.5,
        apg: 1.7,
        steals: 0.6,
        blocks: 2.1,
        fieldGoalPercentage: 52.4,
        threePointPercentage: 29.8,
        image: '/api/placeholder/100/100'
    },
    {
        id: 3,
        name: 'Robert Davis',
        team: 'Milwaukee Bucks',
        position: 'SF',
        age: 25,
        height: '6\'7"',
        ppg: 17.8,
        rpg: 5.2,
        apg: 3.5,
        steals: 1.2,
        blocks: 0.5,
        fieldGoalPercentage: 44.9,
        threePointPercentage: 36.5,
        image: '/api/placeholder/100/100'
    },
    {
        id: 4,
        name: 'James Rodriguez',
        team: 'Denver Nuggets',
        position: 'SG',
        age: 26,
        height: '6\'5"',
        ppg: 20.1,
        rpg: 4.5,
        apg: 4.3,
        steals: 1.3,
        blocks: 0.4,
        fieldGoalPercentage: 46.2,
        threePointPercentage: 40.1,
        image: '/api/placeholder/100/100'
    },
    {
        id: 5,
        name: 'Alex Thompson',
        team: 'Phoenix Suns',
        position: 'PF',
        age: 28,
        height: '6\'9"',
        ppg: 16.5,
        rpg: 7.8,
        apg: 2.1,
        steals: 0.8,
        blocks: 1.2,
        fieldGoalPercentage: 48.7,
        threePointPercentage: 33.6,
        image: '/api/placeholder/100/100'
    }
];

const PlayersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'ppg', direction: 'desc' });
    const [positionFilter, setPositionFilter] = useState('all');

    const positionOptions = ['all', 'PG', 'SG', 'SF', 'PF', 'C'];

    return (
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                        Player Rankings
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm sm:text-base">
                        Comprehensive player performance and statistics
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search players..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        {positionOptions.map((pos) => (
                            <button
                                key={pos}
                                onClick={() => setPositionFilter(pos)}
                                className={`px-3 py-2 rounded-md text-sm ${positionFilter === pos
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                    }`}
                            >
                                {pos === 'all' ? 'All' : pos}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <table className="min-w-full">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                        <tr className="whitespace-nowrap">
                            <th className="p-3 text-left">Player</th>
                            {['ppg', 'rpg', 'apg'].map((stat) => (
                                <th
                                    key={stat}
                                    className="p-3 text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                                    onClick={() =>
                                        setSortConfig({
                                            key: stat,
                                            direction:
                                                sortConfig.key === stat && sortConfig.direction === 'asc'
                                                    ? 'desc'
                                                    : 'asc',
                                        })
                                    }
                                >
                                    {stat.toUpperCase()}
                                    {sortConfig.key === stat &&
                                        (sortConfig.direction === 'asc' ? (
                                            <SortAsc size={16} className="ml-2 text-orange-500 inline" />
                                        ) : (
                                            <SortDesc size={16} className="ml-2 text-orange-500 inline" />
                                        ))}
                                </th>
                            ))}
                            <th className="p-3 text-left">Team</th>
                            <th className="p-3 text-left">Position</th>
                            <th className="p-3 text-left">Age</th>
                            <th className="p-3 text-left">Height</th>
                            <th className="p-3 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerData.map((player) => (
                            <tr
                                key={player.id}
                                className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors border-b last:border-b-0 border-slate-200 dark:border-slate-700 whitespace-nowrap"
                            >
                                <td className="p-3">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="font-bold">{player.name}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                FG: {player.fieldGoalPercentage}% | 3P: {player.threePointPercentage}%
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-3 font-medium">{player.ppg}</td>
                                <td className="p-3">{player.rpg}</td>
                                <td className="p-3">{player.apg}</td>
                                <td className="p-3">{player.team}</td>
                                <td className="p-3">
                                    <span className="px-2 py-1 rounded-md text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                                        {player.position}
                                    </span>
                                </td>
                                <td className="p-3">{player.age}</td>
                                <td className="p-3">{player.height}</td>
                                <td className="p-3">
                                    <button className="hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-full">
                                        <ChevronRight size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <Users className="mr-2 text-orange-500" />
                        <h3 className="text-lg font-semibold">Total Players</h3>
                    </div>
                    <div className="text-3xl font-bold">450</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Across all teams in the league
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <Award className="mr-2 text-blue-500" />
                        <h3 className="text-lg font-semibold">Top Scorer</h3>
                    </div>
                    <div className="text-2xl font-bold">Michael Johnson</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        22.5 points per game
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <TrendingUp className="mr-2 text-green-500" />
                        <h3 className="text-lg font-semibold">League Averages</h3>
                    </div>
                    <div className="text-2xl font-bold">18.6</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Average points per game
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlayersPage;