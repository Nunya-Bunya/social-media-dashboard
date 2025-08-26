"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentCalendar = ContentCalendar;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const mockEvents = [
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
    { id: 'facebook', name: 'Facebook', icon: lucide_react_1.Facebook, color: 'bg-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: lucide_react_1.Instagram, color: 'bg-pink-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: lucide_react_1.Linkedin, color: 'bg-blue-700' },
    { id: 'twitter', name: 'Twitter', icon: lucide_react_1.Twitter, color: 'bg-blue-400' }
];
const contentTypes = [
    { id: 'post', name: 'Post', icon: lucide_react_1.FileText, color: 'bg-blue-500' },
    { id: 'story', name: 'Story', icon: lucide_react_1.ImageIcon, color: 'bg-purple-500' },
    { id: 'video', name: 'Video', icon: lucide_react_1.Video, color: 'bg-red-500' },
    { id: 'article', name: 'Article', icon: lucide_react_1.Link, color: 'bg-green-500' }
];
function ContentCalendar() {
    const [currentDate, setCurrentDate] = (0, react_1.useState)(new Date());
    const [selectedView, setSelectedView] = (0, react_1.useState)('month');
    const [selectedEvent, setSelectedEvent] = (0, react_1.useState)(null);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [selectedStatus, setSelectedStatus] = (0, react_1.useState)('all');
    const [selectedPlatform, setSelectedPlatform] = (0, react_1.useState)('all');
    const getMonthDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        const days = [];
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
    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'bg-green-500';
            case 'scheduled': return 'bg-blue-500';
            case 'draft': return 'bg-gray-500';
            case 'failed': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'published': return <lucide_react_1.CheckCircle className="h-3 w-3"/>;
            case 'scheduled': return <lucide_react_1.Clock className="h-3 w-3"/>;
            case 'draft': return <lucide_react_1.FileText className="h-3 w-3"/>;
            case 'failed': return <lucide_react_1.AlertTriangle className="h-3 w-3"/>;
            default: return <lucide_react_1.FileText className="h-3 w-3"/>;
        }
    };
    const getPlatformIcon = (platformId) => {
        const platform = platforms.find(p => p.id === platformId);
        return platform ? <platform.icon className="h-3 w-3"/> : <lucide_react_1.Globe className="h-3 w-3"/>;
    };
    const getContentTypeIcon = (typeId) => {
        const type = contentTypes.find(t => t.id === typeId);
        return type ? <type.icon className="h-3 w-3"/> : <lucide_react_1.FileText className="h-3 w-3"/>;
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
    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1);
        }
        else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentDate(newDate);
    };
    const goToToday = () => {
        setCurrentDate(new Date());
    };
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Calendar</h2>
          <p className="text-muted-foreground">
            Plan and schedule your social media content with visual calendar interface
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button_1.Button variant="outline" size="sm">
            <lucide_react_1.Download className="mr-2 h-4 w-4"/>
            Export
          </button_1.Button>
          <button_1.Button size="sm">
            <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
            New Content
          </button_1.Button>
        </div>
      </div>

      <tabs_1.Tabs value={selectedView} onValueChange={(value) => setSelectedView(value)} className="space-y-4">
        <tabs_1.TabsList>
          <tabs_1.TabsTrigger value="month">Month View</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="week">Week View</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="day">Day View</tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        <tabs_1.TabsContent value="month" className="space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button_1.Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <lucide_react_1.ChevronLeft className="h-4 w-4"/>
              </button_1.Button>
              <h3 className="text-xl font-semibold">{monthName}</h3>
              <button_1.Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <lucide_react_1.ChevronRight className="h-4 w-4"/>
              </button_1.Button>
            </div>
            <button_1.Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </button_1.Button>
          </div>

          
          <card_1.Card>
            <card_1.CardContent className="p-0">
              
              <div className="grid grid-cols-7 border-b">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (<div key={day} className="p-3 text-center font-medium text-sm text-muted-foreground">
                    {day}
                  </div>))}
              </div>

              
              <div className="grid grid-cols-7">
                {monthDays.map((day, index) => (<div key={index} className={`min-h-[120px] border-r border-b p-2 ${!day.isCurrentMonth ? 'bg-gray-50' : ''} ${day.isToday ? 'bg-blue-50' : ''}`}>
                    <div className={`text-sm font-medium mb-2 ${day.isToday ? 'text-blue-600' :
                day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                      {day.day}
                    </div>
                    
                    
                    <div className="space-y-1">
                      {day.events.slice(0, 2).map((event) => (<div key={event.id} className="p-1 rounded text-xs cursor-pointer hover:bg-gray-100" onClick={() => setSelectedEvent(event)}>
                          <div className="flex items-center space-x-1 mb-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(event.status)}`}/>
                            <span className="font-medium truncate">{event.title}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600">
                            {event.platforms.slice(0, 2).map((platform) => (<div key={platform} className="w-3 h-3">
                                {getPlatformIcon(platform)}
                              </div>))}
                            {event.platforms.length > 2 && (<span className="text-xs">+{event.platforms.length - 2}</span>)}
                          </div>
                        </div>))}
                      
                      {day.events.length > 2 && (<div className="text-xs text-gray-500 text-center">
                          +{day.events.length - 2} more
                        </div>)}
                    </div>
                  </div>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="week" className="space-y-4">
          <div className="text-center py-12">
            <lucide_react_1.Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4"/>
            <h3 className="text-lg font-medium mb-2">Week View Coming Soon</h3>
            <p className="text-muted-foreground">
              Detailed weekly planning with time slots and content blocks
            </p>
          </div>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="day" className="space-y-4">
          <div className="text-center py-12">
            <lucide_react_1.Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4"/>
            <h3 className="text-lg font-medium mb-2">Day View Coming Soon</h3>
            <p className="text-muted-foreground">
              Hour-by-hour content scheduling with detailed event management
            </p>
          </div>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>

      
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Content Overview</card_1.CardTitle>
          <card_1.CardDescription>
            Manage all your scheduled and draft content
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input_1.Input placeholder="Search content..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
              <option value="failed">Failed</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md" value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
              <option value="all">All Platforms</option>
              {platforms.map((platform) => (<option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>))}
            </select>
          </div>

          
          <div className="space-y-4">
            {filteredEvents.map((event) => (<div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium">{event.title}</h3>
                      <badge_1.Badge variant="outline" className="capitalize">
                        {event.status}
                      </badge_1.Badge>
                      <div className="flex items-center space-x-1">
                        {getContentTypeIcon(event.type)}
                        <span className="text-sm text-muted-foreground capitalize">{event.type}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">{event.content}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <lucide_react_1.Calendar className="h-4 w-4"/>
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <lucide_react_1.Clock className="h-4 w-4"/>
                        <span>{event.time}</span>
                      </span>
                      <div className="flex items-center space-x-1">
                        <lucide_react_1.Globe className="h-4 w-4"/>
                        <span>{event.platforms.length} platforms</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {event.platforms.map((platform) => (<div key={platform} className="flex items-center space-x-1">
                          {getPlatformIcon(platform)}
                          <span className="text-xs capitalize">{platform}</span>
                        </div>))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (<badge_1.Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </badge_1.Badge>))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button_1.Button variant="ghost" size="sm">
                      <lucide_react_1.Eye className="h-4 w-4"/>
                    </button_1.Button>
                    <button_1.Button variant="ghost" size="sm">
                      <lucide_react_1.Edit className="h-4 w-4"/>
                    </button_1.Button>
                    <button_1.Button variant="ghost" size="sm">
                      <lucide_react_1.Trash2 className="h-4 w-4"/>
                    </button_1.Button>
                    <button_1.Button variant="ghost" size="sm">
                      <lucide_react_1.MoreHorizontal className="h-4 w-4"/>
                    </button_1.Button>
                  </div>
                </div>
              </div>))}
          </div>
        </card_1.CardContent>
      </card_1.Card>

      
      {selectedEvent && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <card_1.Card className="w-full max-w-2xl mx-4">
            <card_1.CardHeader>
              <div className="flex items-center justify-between">
                <card_1.CardTitle>{selectedEvent.title}</card_1.CardTitle>
                <button_1.Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                  <lucide_react_1.X className="h-4 w-4"/>
                </button_1.Button>
              </div>
              <card_1.CardDescription>
                {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-4">
              <div>
                <label_1.Label className="text-sm font-medium">Content</label_1.Label>
                <p className="text-sm text-gray-600 mt-1">{selectedEvent.content}</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label_1.Label className="text-sm font-medium">Platforms</label_1.Label>
                  <div className="flex space-x-2 mt-1">
                    {selectedEvent.platforms.map((platform) => (<badge_1.Badge key={platform} variant="outline">
                        {platforms.find(p => p.id === platform)?.name}
                      </badge_1.Badge>))}
                  </div>
                </div>
                
                <div>
                  <label_1.Label className="text-sm font-medium">Status</label_1.Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedEvent.status)}`}/>
                    <span className="text-sm capitalize">{selectedEvent.status}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button_1.Button variant="outline" className="flex-1">
                  <lucide_react_1.Edit className="mr-2 h-4 w-4"/>
                  Edit
                </button_1.Button>
                <button_1.Button className="flex-1">
                  <lucide_react_1.Eye className="mr-2 h-4 w-4"/>
                  Preview
                </button_1.Button>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </div>)}
    </div>);
}
//# sourceMappingURL=ContentCalendar.js.map