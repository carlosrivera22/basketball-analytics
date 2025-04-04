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

// Sample team data
const teamData = [
    {
        id: 1,
        name: 'Golden State Warriors',
        conference: 'Western',
        division: 'Pacific',
        record: '42-17',
        winPercentage: '0.712',
        pointsPerGame: 118.5,
        lastTenGames: '7-3',
        homeRecord: '22-8',
        awayRecord: '20-9',
        rank: 1,
        logo: '/api/placeholder/100/100'
    },
    {
        id: 2,
        name: 'Boston Celtics',
        conference: 'Eastern',
        division: 'Atlantic',
        record: '41-18',
        winPercentage: '0.695',
        pointsPerGame: 115.3,
        lastTenGames: '6-4',
        homeRecord: '23-7',
        awayRecord: '18-11',
        rank: 2,
        logo: '/api/placeholder/100/100'
    },
    {
        id: 3,
        name: 'Milwaukee Bucks',
        conference: 'Eastern',
        division: 'Central',
        record: '39-20',
        winPercentage: '0.661',
        pointsPerGame: 112.7,
        lastTenGames: '6-4',
        homeRecord: '21-9',
        awayRecord: '18-11',
        rank: 3,
        logo: '/api/placeholder/100/100'
    },
    {
        id: 4,
        name: 'Denver Nuggets',
        conference: 'Western',
        division: 'Northwest',
        record: '38-21',
        winPercentage: '0.644',
        pointsPerGame: 114.2,
        lastTenGames: '5-5',
        homeRecord: '22-8',
        awayRecord: '16-13',
        rank: 4,
        logo: '/api/placeholder/100/100'
    },
    {
        id: 5,
        name: 'Phoenix Suns',
        conference: 'Western',
        division: 'Pacific',
        record: '36-23',
        winPercentage: '0.610',
        pointsPerGame: 110.8,
        lastTenGames: '7-3',
        homeRecord: '20-10',
        awayRecord: '16-13',
        rank: 5,
        logo: '/api/placeholder/100/100'
    }
];

const TeamsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const sortConfig = { key: 'rank', direction: 'asc' };
    const [conference, setConference] = useState('all');



    return (
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header and Filters */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                        Team Rankings
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm sm:text-base">
                        Comprehensive team performance and statistics
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            placeholder="Search teams..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {['all', 'western', 'eastern'].map((conf) => (
                            <button
                                key={conf}
                                onClick={() => setConference(conf)}
                                className={`px-3 py-2 rounded-md text-sm ${conference === conf
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                    }`}
                            >
                                {conf.charAt(0).toUpperCase() + conf.slice(1)}
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
                            <th className="p-3 text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
                                Rank
                                {sortConfig.key === 'rank' &&
                                    (sortConfig.direction === 'asc' ? (
                                        <SortAsc size={16} className="ml-2 text-orange-500 inline" />
                                    ) : (
                                        <SortDesc size={16} className="ml-2 text-orange-500 inline" />
                                    ))}
                            </th>
                            <th className="p-3 text-left">Team</th>
                            <th className="p-3 text-left">Record</th>
                            <th className="p-3 text-left">PPG</th>
                            <th className="p-3 text-left">Conference</th>
                            <th className="p-3 text-left">Division</th>
                            <th className="p-3 text-left">Last 10</th>
                            <th className="p-3 text-left">Home/Away</th>
                            <th className="p-3 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamData.map((team) => (
                            <tr
                                key={team.id}
                                className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors border-b last:border-b-0 border-slate-200 dark:border-slate-700 whitespace-nowrap"
                            >
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded-md text-sm font-medium ${team.rank <= 3
                                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                                            : 'bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-400'
                                            }`}
                                    >
                                        {team.rank}
                                    </span>
                                </td>
                                <td className="p-3 font-bold">{team.name}</td>
                                <td className="p-3">
                                    <span className="font-medium">{team.record}</span>
                                    <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                                        ({team.winPercentage})
                                    </span>
                                </td>
                                <td className="p-3 font-medium">{team.pointsPerGame}</td>
                                <td className="p-3">{team.conference}</td>
                                <td className="p-3">{team.division}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded-md text-sm font-medium ${team.lastTenGames.startsWith('7') ||
                                            team.lastTenGames.startsWith('6')
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}
                                    >
                                        {team.lastTenGames}
                                    </span>
                                </td>
                                <td className="p-3">
                                    {team.homeRecord} / {team.awayRecord}
                                </td>
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

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <Users className="mr-2 text-orange-500" />
                        <h3 className="text-lg font-semibold">Total Teams</h3>
                    </div>
                    <div className="text-3xl font-bold">30</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        15 in Western Conference, 15 in Eastern Conference
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <Award className="mr-2 text-blue-500" />
                        <h3 className="text-lg font-semibold">Top Performers</h3>
                    </div>
                    <div className="text-2xl font-bold">Warriors</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Highest win percentage at 71.2%
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <TrendingUp className="mr-2 text-green-500" />
                        <h3 className="text-lg font-semibold">League Trends</h3>
                    </div>
                    <div className="text-2xl font-bold">112.4</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Average points per game across the league
                    </p>
                </div>
            </div>
        </div>
    );
};


export default TeamsPage;