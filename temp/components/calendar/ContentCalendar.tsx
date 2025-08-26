"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Plus,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  ImageIcon,
  Video,
  Link,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Settings,
  Download,
  X
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  type: 'post' | 'story' | 'video' | 'article';
  clientId?: string;
  tags: string[];
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
  };
}

interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Legal Tips for Small Business',
    content: 'Share practical legal advice for entrepreneurs...',
    date: '2024-12-15',
    time: '10:00',
    platforms: ['facebook', 'linkedin'],
    status: 'scheduled',
    type: 'post',
    tags: ['legal-tips', 'small-business', 'entrepreneurs']
  },
  {
    id: '2',
    title: 'Client Success Story',
    content: 'Showcase how we helped a client...',
    date: '2024-12-16',
    time: '14:00',
    platforms: ['instagram', 'facebook'],
    status: 'draft',
    type: 'story',
    tags: ['success-story', 'client-testimonial']
  },
  {
    id: '3',
    title: 'Tax Law Changes 2024',
    content: 'New regulations that could impact your business...',
    date: '2024-12-17',
    time: '09:00',
    platforms: ['linkedin', 'twitter'],
    status: 'scheduled',
    type: 'article',
    tags: ['tax-law', 'regulations', 'business']
  }
];

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-600' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-blue-400' }
];

const contentTypes = [
  { id: 'post', name: 'Post', icon: FileText, color: 'bg-blue-500' },
  { id: 'story', name: 'Story', icon: ImageIcon, color: 'bg-purple-500' },
  { id: 'video', name: 'Video', icon: Video, color: 'bg-red-500' },
  { id: 'article', name: 'Article', icon: Link, color: 'bg-green-500' }
];

export function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const getMonthDays = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: CalendarDay[] = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dateString = currentDate.toISOString().split('T')[0];
      const dayEvents = mockEvents.filter(event => event.date === dateString);
      
      days.push({
        date: dateString,
        day: currentDate.getDate(),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === today.toDateString(),
        events: dayEvents
      });
    }
    
    return days;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'draft': return 'bg-gray-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-3 w-3" />;
      case 'scheduled': return <Clock className="h-3 w-3" />;
      case 'draft': return <FileText className="h-3 w-3" />;
      case 'failed': return <AlertTriangle className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  const getPlatformIcon = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform ? <platform.icon className="h-3 w-3" /> : <Globe className="h-3 w-3" />;
  };

  const getContentTypeIcon = (typeId: string) => {
    const type = contentTypes.find(t => t.id === typeId);
    return type ? <type.icon className="h-3 w-3" /> : <FileText className="h-3 w-3" />;
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    const matchesPlatform = selectedPlatform === 'all' || event.platforms.includes(selectedPlatform);
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const monthDays = getMonthDays(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Calendar</h2>
          <p className="text-muted-foreground">
            Plan and schedule your social media content with visual calendar interface
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Content
          </Button>
        </div>
      </div>

      <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as 'month' | 'week' | 'day')} className="space-y-4">
        <TabsList>
          <TabsTrigger value="month">Month View</TabsTrigger>
          <TabsTrigger value="week">Week View</TabsTrigger>
          <TabsTrigger value="day">Day View</TabsTrigger>
        </TabsList>

        <TabsContent value="month" className="space-y-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-xl font-semibold">{monthName}</h3>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
          </div>

          {/* Calendar Grid */}
          <Card>
            <CardContent className="p-0">
              {/* Day Headers */}
              <div className="grid grid-cols-7 border-b">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-3 text-center font-medium text-sm text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {monthDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[120px] border-r border-b p-2 ${
                      !day.isCurrentMonth ? 'bg-gray-50' : ''
                    } ${day.isToday ? 'bg-blue-50' : ''}`}
                  >
                    <div className={`text-sm font-medium mb-2 ${
                      day.isToday ? 'text-blue-600' : 
                      day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {day.day}
                    </div>
                    
                    {/* Events for this day */}
                    <div className="space-y-1">
                      {day.events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className="p-1 rounded text-xs cursor-pointer hover:bg-gray-100"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="flex items-center space-x-1 mb-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(event.status)}`} />
                            <span className="font-medium truncate">{event.title}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600">
                            {event.platforms.slice(0, 2).map((platform) => (
                              <div key={platform} className="w-3 h-3">
                                {getPlatformIcon(platform)}
                              </div>
                            ))}
                            {event.platforms.length > 2 && (
                              <span className="text-xs">+{event.platforms.length - 2}</span>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {day.events.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{day.events.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Week View Coming Soon</h3>
            <p className="text-muted-foreground">
              Detailed weekly planning with time slots and content blocks
            </p>
          </div>
        </TabsContent>

        <TabsContent value="day" className="space-y-4">
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Day View Coming Soon</h3>
            <p className="text-muted-foreground">
              Hour-by-hour content scheduling with detailed event management
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Content List View */}
      <Card>
        <CardHeader>
          <CardTitle>Content Overview</CardTitle>
          <CardDescription>
            Manage all your scheduled and draft content
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
              <option value="failed">Failed</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="all">All Platforms</option>
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>

          {/* Content List */}
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge variant="outline" className="capitalize">
                        {event.status}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {getContentTypeIcon(event.type)}
                        <span className="text-sm text-muted-foreground capitalize">{event.type}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">{event.content}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </span>
                      <div className="flex items-center space-x-1">
                        <Globe className="h-4 w-4" />
                        <span>{event.platforms.length} platforms</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {event.platforms.map((platform) => (
                        <div key={platform} className="flex items-center space-x-1">
                          {getPlatformIcon(platform)}
                          <span className="text-xs capitalize">{platform}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedEvent.title}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Content</Label>
                <p className="text-sm text-gray-600 mt-1">{selectedEvent.content}</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Platforms</Label>
                  <div className="flex space-x-2 mt-1">
                    {selectedEvent.platforms.map((platform) => (
                      <Badge key={platform} variant="outline">
                        {platforms.find(p => p.id === platform)?.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedEvent.status)}`} />
                    <span className="text-sm capitalize">{selectedEvent.status}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

