import React from 'react';
import { NextPage } from 'next';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Button } from '@/components/ui/button';
import {
  ArrowUp,
  ArrowDown,
  Award,
  Activity,
  TrendingUp,
  Calendar,
  Target,
  Dribbble,
  ChevronRight,
  Users,
  Bell
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Sample data for charts
const teamPerformanceData = [
  { game: 'Game 1', points: 102, opponentPoints: 96 },
  { game: 'Game 2', points: 89, opponentPoints: 92 },
  { game: 'Game 3', points: 110, opponentPoints: 85 },
  { game: 'Game 4', points: 95, opponentPoints: 101 },
  { game: 'Game 5', points: 105, opponentPoints: 98 },
  { game: 'Game 6', points: 115, opponentPoints: 105 },
  { game: 'Game 7', points: 98, opponentPoints: 94 },
];

const shootingPercentageData = [
  { position: 'PG', threePoint: 38, twoPoint: 46, free: 84 },
  { position: 'SG', threePoint: 41, twoPoint: 44, free: 88 },
  { position: 'SF', threePoint: 35, twoPoint: 48, free: 76 },
  { position: 'PF', threePoint: 32, twoPoint: 52, free: 72 },
  { position: 'C', threePoint: 28, twoPoint: 58, free: 68 },
];

const teamStatsData = [
  { category: 'Scoring', team: 105.2, league: 102.5 },
  { category: 'Rebounds', team: 44.8, league: 42.1 },
  { category: 'Assists', team: 24.3, league: 23.7 },
  { category: '3PT%', team: 36.5, league: 35.2 },
  { category: 'FG%', team: 46.3, league: 45.1 },
  { category: 'Steals', team: 8.2, league: 7.5 },
  { category: 'Blocks', team: 5.1, league: 4.9 },
  { category: 'Turnovers', team: 13.7, league: 14.1 },
];

// Sample data for tables
const recentGamesData = [
  { id: 1, opponent: 'Lakers', date: '2023-12-15', result: 'W', score: '105-98', location: 'Home' },
  { id: 2, opponent: 'Celtics', date: '2023-12-12', result: 'L', score: '89-92', location: 'Away' },
  { id: 3, opponent: 'Bulls', date: '2023-12-10', result: 'W', score: '110-85', location: 'Home' },
  { id: 4, opponent: 'Warriors', date: '2023-12-07', result: 'L', score: '95-101', location: 'Away' },
  { id: 5, opponent: 'Heat', date: '2023-12-05', result: 'W', score: '98-94', location: 'Away' },
];

const topPerformersData = [
  { id: 1, name: 'Michael Johnson', position: 'PG', ppg: 22.5, rpg: 3.2, apg: 7.1, image: '/placeholder.jpg' },
  { id: 2, name: 'David Williams', position: 'C', ppg: 18.3, rpg: 11.5, apg: 1.7, image: '/placeholder.jpg' },
  { id: 3, name: 'Robert Davis', position: 'SF', ppg: 17.8, rpg: 5.2, apg: 3.5, image: '/placeholder.jpg' },
];

// Types
type StatCardProps = {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  description?: string;
  iconBg?: string;
  isLarge?: boolean;
};

// Components
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  icon,
  description,
  iconBg = "bg-orange-500/10",
  isLarge = false
}) => {
  return (
    <Card className="border border-slate-200 dark:border-slate-800 overflow-hidden">
      <CardContent className={`p-6 ${isLarge ? 'pb-8' : ''}`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <h3 className={`${isLarge ? 'text-4xl' : 'text-2xl'} font-bold mt-1`}>{value}</h3>
            {trend !== undefined && (
              <div className={`flex items-center mt-1 text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend > 0 ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                {Math.abs(trend)}%
              </div>
            )}
            {description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>
            )}
          </div>
          <div className={`p-3 ${iconBg} rounded-full`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard: NextPage = () => {

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Team Performance</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Season 2023-2024 statistics and analytics
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800/30 px-3 py-1">
            <Bell size={14} className="mr-1" />
            Next Game: Dec 22
          </Badge>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Win Percentage"
          value="62.5%"
          trend={3.2}
          icon={<Award size={24} className="text-orange-500" />}
          description="10 wins, 6 losses"
          isLarge={true}
          iconBg="bg-orange-500/10"
        />
        <StatCard
          title="Points Per Game"
          value="105.2"
          trend={1.8}
          icon={<Activity size={24} className="text-blue-500" />}
          description="+2.7 from last season"
          iconBg="bg-blue-500/10"
        />
        <StatCard
          title="Offensive Rating"
          value="112.4"
          trend={-0.6}
          icon={<TrendingUp size={24} className="text-green-500" />}
          description="League rank: 8th"
          iconBg="bg-green-500/10"
        />
        <StatCard
          title="Next Game"
          value="vs Mavericks"
          icon={<Calendar size={24} className="text-purple-500" />}
          description="Dec 22, 2023 • 7:30 PM"
          iconBg="bg-purple-500/10"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-6 bg-slate-100 p-1 dark:bg-slate-800/50">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="offense"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md"
          >
            Offense
          </TabsTrigger>
          <TabsTrigger
            value="defense"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md"
          >
            Defense
          </TabsTrigger>
          <TabsTrigger
            value="players"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md"
          >
            Players
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Performance Chart */}
            <Card className="border border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <CardTitle className="text-lg flex items-center justify-between">
                  Team Performance
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <ChevronRight size={16} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={teamPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="game" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "none",
                          borderRadius: "8px",
                          color: "#ffffff"
                        }}
                        itemStyle={{ color: "#ffffff" }}
                        labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="points"
                        stroke="#f97316"
                        strokeWidth={3}
                        activeDot={{ r: 8, fill: "#f97316", stroke: "#ffffff" }}
                        name="Team Points"
                        dot={{ r: 4, fill: "#f97316", stroke: "#ffffff", strokeWidth: 1 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="opponentPoints"
                        stroke="#94a3b8"
                        strokeWidth={2}
                        activeDot={{ r: 6, fill: "#94a3b8", stroke: "#ffffff" }}
                        name="Opponent Points"
                        dot={{ r: 3, fill: "#94a3b8", stroke: "#ffffff", strokeWidth: 1 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Team Stats Comparison */}
            <Card className="border border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <CardTitle className="text-lg flex items-center justify-between">
                  Team vs. League Average
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <ChevronRight size={16} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={teamStatsData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" width={80} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "none",
                          borderRadius: "8px",
                          color: "#ffffff"
                        }}
                        itemStyle={{ color: "#ffffff" }}
                        labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
                      />
                      <Legend />
                      <Bar dataKey="team" fill="#f97316" name="Team" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="league" fill="#94a3b8" name="League Avg" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Games Table */}
            <Card className="border border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <CardTitle className="text-lg flex items-center justify-between">
                  Recent Games
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <ChevronRight size={16} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Opponent</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentGamesData.map((game) => (
                      <TableRow key={game.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                        <TableCell className="font-medium">{game.date}</TableCell>
                        <TableCell>{game.opponent}</TableCell>
                        <TableCell>{game.location}</TableCell>
                        <TableCell>
                          <Badge variant={game.result === 'W' ? 'default' : 'outline'}
                            className={game.result === 'W' ? 'bg-green-500 hover:bg-green-600' : 'border-red-500 text-red-500'}>
                            {game.result}
                          </Badge>
                        </TableCell>
                        <TableCell>{game.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card className="border border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <CardTitle className="text-lg flex items-center justify-between">
                  Top Performers
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <ChevronRight size={16} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {topPerformersData.map((player) => (
                    <div key={player.id} className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full mr-4 flex items-center justify-center text-white font-bold border-2 border-white dark:border-slate-700">
                        {player.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold">{player.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{player.position}</p>
                      </div>
                      <div className="flex space-x-4 text-center">
                        <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                          <div className="text-lg font-bold">{player.ppg}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">PPG</div>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                          <div className="text-lg font-bold">{player.rpg}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">RPG</div>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                          <div className="text-lg font-bold">{player.apg}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">APG</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="offense">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Shooting Percentage By Position */}
            <Card className="border border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <CardTitle className="text-lg">Shooting % by Position</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={shootingPercentageData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="position" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "none",
                          borderRadius: "8px",
                          color: "#ffffff"
                        }}
                        itemStyle={{ color: "#ffffff" }}
                        labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
                      />
                      <Legend />
                      <Bar dataKey="threePoint" fill="#f97316" name="3PT%" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="twoPoint" fill="#3b82f6" name="2PT%" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="free" fill="#22c55e" name="FT%" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Offensive Stats Overview */}
            <Card className="border border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <CardTitle className="text-lg">Offensive Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                    <div className="flex items-center">
                      <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl mr-3">
                        <Target size={20} className="text-orange-500 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Shooting</p>
                        <h4 className="text-xl font-bold">46.3%</h4>
                        <p className="text-xs text-green-500">+1.2% above league avg</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mr-3">
                        <Activity size={20} className="text-blue-500 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">3-Point</p>
                        <h4 className="text-xl font-bold">36.5%</h4>
                        <p className="text-xs text-green-500">+1.3% above league avg</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl mr-3">
                        <TrendingUp size={20} className="text-green-500 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Pace</p>
                        <h4 className="text-xl font-bold">98.2</h4>
                        <p className="text-xs text-slate-500">League rank: 12th</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl mr-3">
                        <Users size={20} className="text-purple-500 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Assists</p>
                        <h4 className="text-xl font-bold">24.3</h4>
                        <p className="text-xs text-green-500">+0.6 above league avg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="defense">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Defense placeholder */}
            <Card className="col-span-2 border border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <CardTitle className="text-lg">Defensive Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-64 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                  <div className="text-center">
                    <Dribbble size={48} className="mx-auto mb-4 text-orange-500/50" />
                    <p className="text-slate-500 dark:text-slate-400">
                      More detailed defensive analytics will be available soon.
                    </p>
                    <Button className="mt-4 bg-orange-500 hover:bg-orange-600">Notify Me</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="players">
          <div className="grid grid-cols-1 gap-6">
            {/* Players placeholder */}
            <Card className="col-span-1 border border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <CardTitle className="text-lg">Player Statistics</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-64 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                  <div className="text-center">
                    <Users size={48} className="mx-auto mb-4 text-orange-500/50" />
                    <p className="text-slate-500 dark:text-slate-400">
                      More detailed player stats will be available soon.
                    </p>
                    <Button className="mt-4 bg-orange-500 hover:bg-orange-600">Explore Players</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;