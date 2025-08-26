"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Clock,
  ImageIcon,
  Link,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Plus,
  Save,
  Send,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Post {
  id: string;
  content: string;
  mediaUrls: string[];
  platforms: string[];
  scheduledFor: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
  };
  createdAt: string;
}

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-600' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-blue-400' }
];

const mockPosts: Post[] = [
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

export function ContentCreator() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState({
    content: '',
    platforms: [] as string[],
    scheduledFor: '',
    mediaUrls: [] as string[]
  });
  const [activeTab, setActiveTab] = useState('create');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleCreatePost = () => {
    if (!newPost.content.trim() || selectedPlatforms.length === 0) return;

    const post: Post = {
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
      case 'published': return <CheckCircle className="h-4 w-4" />;
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <Edit className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Creator</h2>
          <p className="text-muted-foreground">
            Create and schedule social media content across all platforms
          </p>
        </div>
        <Button onClick={() => setActiveTab('create')}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Create Post</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
              <CardDescription>
                Write your content and select platforms to publish to
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Content Input */}
              <div className="space-y-2">
                <Label htmlFor="content">Post Content</Label>
                <Textarea
                  id="content"
                  placeholder="What would you like to share with your audience?"
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-[120px]"
                />
                <div className="text-sm text-muted-foreground">
                  {newPost.content.length}/280 characters
                </div>
              </div>

              {/* Platform Selection */}
              <div className="space-y-2">
                <Label>Select Platforms</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => handlePlatformToggle(platform.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedPlatforms.includes(platform.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-8 h-8 ${platform.color} rounded-full flex items-center justify-center`}>
                          <platform.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium">{platform.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scheduling */}
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule Post (Optional)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="schedule"
                    type="datetime-local"
                    value={newPost.scheduledFor}
                    onChange={(e) => setNewPost(prev => ({ ...prev, scheduledFor: e.target.value }))}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => setNewPost(prev => ({ ...prev, scheduledFor: '' }))}
                  >
                    Post Now
                  </Button>
                </div>
              </div>

              {/* Media Upload */}
              <div className="space-y-2">
                <Label>Media (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Upload images or videos</p>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Media
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleCreatePost}
                  disabled={!newPost.content.trim() || selectedPlatforms.length === 0}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save as Draft
                </Button>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPost.content.trim() || selectedPlatforms.length === 0}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {newPost.scheduledFor ? 'Schedule Post' : 'Publish Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid gap-4">
            {posts.filter(post => post.status === 'scheduled').map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <p className="text-sm">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(post.scheduledFor).toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Globe className="h-4 w-4" />
                          <span>{post.platforms.length} platforms</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="capitalize">
                        {post.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          <div className="grid gap-4">
            {posts.filter(post => post.status === 'published').map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <p className="text-sm">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.engagement?.likes || 0} likes</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default" className="capitalize">
                        {post.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <div className="grid gap-4">
            {posts.filter(post => post.status === 'draft').map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <p className="text-sm">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Draft created {new Date(post.createdAt).toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="capitalize">
                        {post.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

