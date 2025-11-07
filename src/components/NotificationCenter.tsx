import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Trophy, Target, TrendingUp, BookOpen, Settings, Check, X } from 'lucide-react';
import { NotificationItem } from '@/types';

// Mock notifications data
const mockNotifications: NotificationItem[] = [
  {
    id: 'n1',
    type: 'achievement',
    title: 'Achievement Unlocked',
    titleGeorgian: 'ახალი მიღწევა განბლოკილია',
    message: 'You earned the "Green Friend" badge!',
    messageGeorgian: 'შენ მიიღე "მწვანე მეგობარი" ნიშანი!',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    actionUrl: '/achievements',
    icon: '🏆'
  },
  {
    id: 'n2',
    type: 'challenge',
    title: 'Challenge Progress',
    titleGeorgian: 'გამოწვევის პროგრესი',
    message: 'You are 80% complete in Weekly Paper Challenge',
    messageGeorgian: 'შენ 80%-ით შეასრულე კვირეული ქაღალდის გამოწვევა',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    actionUrl: '/challenges',
    icon: '🎯'
  },
  {
    id: 'n3',
    type: 'ranking',
    title: 'Ranking Update',
    titleGeorgian: 'რეიტინგის განახლება',
    message: 'You moved up to #3 in your class ranking!',
    messageGeorgian: 'შენ გადახვედი #3 ადგილზე კლასის რეიტინგში!',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    actionUrl: '/competition',
    icon: '📈'
  },
  {
    id: 'n4',
    type: 'educational',
    title: 'New Eco Tip',
    titleGeorgian: 'ახალი ეკო რჩევა',
    message: 'Learn about water conservation techniques',
    messageGeorgian: 'გაეცანი წყლის დაზოგვის ტექნიკებს',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    actionUrl: '/tips',
    icon: '💡'
  },
  {
    id: 'n5',
    type: 'system',
    title: 'System Update',
    titleGeorgian: 'სისტემის განახლება',
    message: 'EcoBox platform has been updated with new features',
    messageGeorgian: 'EcoBox პლატფორმა განახლდა ახალი ფუნქციებით',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    actionUrl: '/changelog',
    icon: '🔧'
  }
];

interface NotificationCenterProps {
  onClose?: () => void;
}

const NotificationCenter = ({ onClose }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedTab, setSelectedTab] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-5 h-5 text-success" />;
      case 'challenge':
        return <Target className="w-5 h-5 text-primary" />;
      case 'ranking':
        return <TrendingUp className="w-5 h-5 text-accent" />;
      case 'educational':
        return <BookOpen className="w-5 h-5 text-warning" />;
      case 'system':
        return <Settings className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Bell className="w-5 h-5 text-primary" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'მიღწევა';
      case 'challenge':
        return 'გამოწვევა';
      case 'ranking':
        return 'რეიტინგი';
      case 'educational':
        return 'განათლება';
      case 'system':
        return 'სისტემა';
      default:
        return type;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'ახლახან';
    if (diffInMinutes < 60) return `${diffInMinutes} წუთის წინ`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} საათის წინ`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} დღის წინ`;
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const filteredNotifications = notifications.filter(n => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'unread') return !n.read;
    return n.type === selectedTab;
  });

  return (
    <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm shadow-2xl border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-primary" />
            <span>შეტყობინებები</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="w-4 h-4" />
              </Button>
            )}
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <div className="px-4 pb-3">
            <TabsList className="grid w-full grid-cols-3 text-xs h-8">
              <TabsTrigger value="all" className="text-xs px-2">ყველა</TabsTrigger>
              <TabsTrigger value="unread" className="text-xs px-2">
                არაწაკითხული {unreadCount > 0 && `(${unreadCount})`}
              </TabsTrigger>
              <TabsTrigger value="achievement" className="text-xs px-2">მიღწევები</TabsTrigger>
            </TabsList>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <TabsContent value={selectedTab} className="mt-0">
              {filteredNotifications.length > 0 ? (
                <div className="space-y-1">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                      }`}
                      onClick={() => {
                        if (!notification.read) {
                          markAsRead(notification.id);
                        }
                        // Handle navigation to actionUrl if needed
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {notification.icon ? (
                            <span className="text-xl">{notification.icon}</span>
                          ) : (
                            getNotificationIcon(notification.type)
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-sm font-medium truncate flex-1 ${
                              !notification.read ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {notification.titleGeorgian}
                            </h4>
                            <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                              {getTypeLabel(notification.type)}
                            </Badge>
                          </div>
                          
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {notification.messageGeorgian}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(notification.createdAt)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-sm font-medium text-foreground mb-1">
                    შეტყობინებები არ არის
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    ახალი შეტყობინებები გამოჩნდება აქ
                  </p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>

        {filteredNotifications.length > 0 && (
          <div className="p-4 border-t border-border/50">
            <Button variant="outline" size="sm" className="w-full text-xs">
              ყველა შეტყობინების ნახვა
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;