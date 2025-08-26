"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentCreator = ContentCreator;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const platforms = [
    { id: 'facebook', name: 'Facebook', icon: lucide_react_1.Facebook, color: 'bg-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: lucide_react_1.Instagram, color: 'bg-pink-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: lucide_react_1.Linkedin, color: 'bg-blue-700' },
    { id: 'twitter', name: 'Twitter', icon: lucide_react_1.Twitter, color: 'bg-blue-400' }
];
const mockPosts = [
    {
        id: '1',
        content: 'Legal Tips for Small Business Owners: Understanding contract basics can save you thousands in legal fees. Here are 3 key points every entrepreneur should know...',
        mediaUrls: ['/api/placeholder/400/300'],
        platforms: ['facebook', 'linkedin'],
        scheduledFor: '2024-12-15T10:00:00',
        status: 'scheduled',
        createdAt: '2024-12-10T09:00:00'
    },
    {
        id: '2',
        content: 'Tax Law Changes for 2024: New regulations that could impact your business. Our legal team breaks down what you need to know...',
        mediaUrls: [],
        platforms: ['linkedin', 'twitter'],
        scheduledFor: '2024-12-16T14:00:00',
        status: 'draft',
        createdAt: '2024-12-10T10:00:00'
    }
];
function ContentCreator() {
    const [posts, setPosts] = (0, react_1.useState)(mockPosts);
    const [newPost, setNewPost] = (0, react_1.useState)({
        content: '',
        platforms: [],
        scheduledFor: '',
        mediaUrls: []
    });
    const [activeTab, setActiveTab] = (0, react_1.useState)('create');
    const [selectedPlatforms, setSelectedPlatforms] = (0, react_1.useState)([]);
    const handlePlatformToggle = (platformId) => {
        setSelectedPlatforms(prev => prev.includes(platformId)
            ? prev.filter(p => p !== platformId)
            : [...prev, platformId]);
    };
    const handleCreatePost = () => {
        if (!newPost.content.trim() || selectedPlatforms.length === 0)
            return;
        const post = {
            id: Date.now().toString(),
            content: newPost.content,
            mediaUrls: newPost.mediaUrls,
            platforms: selectedPlatforms,
            scheduledFor: newPost.scheduledFor || new Date().toISOString(),
            status: newPost.scheduledFor ? 'scheduled' : 'draft',
            createdAt: new Date().toISOString()
        };
        setPosts(prev => [post, ...prev]);
        setNewPost({ content: '', platforms: [], scheduledFor: '', mediaUrls: [] });
        setSelectedPlatforms([]);
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
            case 'published': return <lucide_react_1.CheckCircle className="h-4 w-4"/>;
            case 'scheduled': return <lucide_react_1.Clock className="h-4 w-4"/>;
            case 'draft': return <lucide_react_1.Edit className="h-4 w-4"/>;
            case 'failed': return <lucide_react_1.AlertCircle className="h-4 w-4"/>;
            default: return <lucide_react_1.Edit className="h-4 w-4"/>;
        }
    };
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Creator</h2>
          <p className="text-muted-foreground">
            Create and schedule social media content across all platforms
          </p>
        </div>
        <button_1.Button onClick={() => setActiveTab('create')}>
          <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
          New Post
        </button_1.Button>
      </div>

      <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <tabs_1.TabsList>
          <tabs_1.TabsTrigger value="create">Create Post</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="scheduled">Scheduled</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="published">Published</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="drafts">Drafts</tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        <tabs_1.TabsContent value="create" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Create New Post</card_1.CardTitle>
              <card_1.CardDescription>
                Write your content and select platforms to publish to
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-4">
              
              <div className="space-y-2">
                <label_1.Label htmlFor="content">Post Content</label_1.Label>
                <textarea_1.Textarea id="content" placeholder="What would you like to share with your audience?" value={newPost.content} onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))} className="min-h-[120px]"/>
                <div className="text-sm text-muted-foreground">
                  {newPost.content.length}/280 characters
                </div>
              </div>

              
              <div className="space-y-2">
                <label_1.Label>Select Platforms</label_1.Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {platforms.map((platform) => (<button key={platform.id} onClick={() => handlePlatformToggle(platform.id)} className={`p-3 rounded-lg border-2 transition-all ${selectedPlatforms.includes(platform.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-8 h-8 ${platform.color} rounded-full flex items-center justify-center`}>
                          <platform.icon className="w-4 h-4 text-white"/>
                        </div>
                        <span className="text-sm font-medium">{platform.name}</span>
                      </div>
                    </button>))}
                </div>
              </div>

              
              <div className="space-y-2">
                <label_1.Label htmlFor="schedule">Schedule Post (Optional)</label_1.Label>
                <div className="flex space-x-2">
                  <input_1.Input id="schedule" type="datetime-local" value={newPost.scheduledFor} onChange={(e) => setNewPost(prev => ({ ...prev, scheduledFor: e.target.value }))}/>
                  <button_1.Button variant="outline" onClick={() => setNewPost(prev => ({ ...prev, scheduledFor: '' }))}>
                    Post Now
                  </button_1.Button>
                </div>
              </div>

              
              <div className="space-y-2">
                <label_1.Label>Media (Optional)</label_1.Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <lucide_react_1.ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4"/>
                  <p className="text-sm text-gray-600 mb-2">Upload images or videos</p>
                  <button_1.Button variant="outline" size="sm">
                    <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
                    Add Media
                  </button_1.Button>
                </div>
              </div>

              
              <div className="flex space-x-2 pt-4">
                <button_1.Button variant="outline" onClick={handleCreatePost} disabled={!newPost.content.trim() || selectedPlatforms.length === 0}>
                  <lucide_react_1.Save className="mr-2 h-4 w-4"/>
                  Save as Draft
                </button_1.Button>
                <button_1.Button onClick={handleCreatePost} disabled={!newPost.content.trim() || selectedPlatforms.length === 0}>
                  <lucide_react_1.Send className="mr-2 h-4 w-4"/>
                  {newPost.scheduledFor ? 'Schedule Post' : 'Publish Now'}
                </button_1.Button>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="scheduled" className="space-y-4">
          <div className="grid gap-4">
            {posts.filter(post => post.status === 'scheduled').map((post) => (<card_1.Card key={post.id}>
                <card_1.CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <p className="text-sm">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <lucide_react_1.Clock className="h-4 w-4"/>
                          <span>{new Date(post.scheduledFor).toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <lucide_react_1.Globe className="h-4 w-4"/>
                          <span>{post.platforms.length} platforms</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <badge_1.Badge variant="outline" className="capitalize">
                        {post.status}
                      </badge_1.Badge>
                      <button_1.Button variant="ghost" size="sm">
                        <lucide_react_1.Edit className="h-4 w-4"/>
                      </button_1.Button>
                      <button_1.Button variant="ghost" size="sm">
                        <lucide_react_1.Trash2 className="h-4 w-4"/>
                      </button_1.Button>
                    </div>
                  </div>
                </card_1.CardContent>
              </card_1.Card>))}
          </div>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="published" className="space-y-4">
          <div className="grid gap-4">
            {posts.filter(post => post.status === 'published').map((post) => (<card_1.Card key={post.id}>
                <card_1.CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <p className="text-sm">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <lucide_react_1.Calendar className="h-4 w-4"/>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <lucide_react_1.Eye className="h-4 w-4"/>
                          <span>{post.engagement?.likes || 0} likes</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <badge_1.Badge variant="default" className="capitalize">
                        {post.status}
                      </badge_1.Badge>
                      <button_1.Button variant="ghost" size="sm">
                        <lucide_react_1.Eye className="h-4 w-4"/>
                      </button_1.Button>
                    </div>
                  </div>
                </card_1.CardContent>
              </card_1.Card>))}
          </div>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="drafts" className="space-y-4">
          <div className="grid gap-4">
            {posts.filter(post => post.status === 'draft').map((post) => (<card_1.Card key={post.id}>
                <card_1.CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <p className="text-sm">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <lucide_react_1.Calendar className="h-4 w-4"/>
                          <span>Draft created {new Date(post.createdAt).toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <badge_1.Badge variant="secondary" className="capitalize">
                        {post.status}
                      </badge_1.Badge>
                      <button_1.Button variant="ghost" size="sm">
                        <lucide_react_1.Edit className="h-4 w-4"/>
                      </button_1.Button>
                      <button_1.Button variant="ghost" size="sm">
                        <lucide_react_1.Trash2 className="h-4 w-4"/>
                      </button_1.Button>
                    </div>
                  </div>
                </card_1.CardContent>
              </card_1.Card>))}
          </div>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>
    </div>);
}
//# sourceMappingURL=ContentCreator.js.map