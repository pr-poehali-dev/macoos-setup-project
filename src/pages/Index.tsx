import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

type WindowType = 'settings' | 'thisMac' | 'macShop' | 'macSteam' | null;

const wallpapers = [
  { id: 1, name: 'Ventura Blue', gradient: 'from-blue-400 via-purple-500 to-pink-500' },
  { id: 2, name: 'Desert', gradient: 'from-orange-400 via-red-500 to-pink-500' },
  { id: 3, name: 'Forest', gradient: 'from-green-400 via-emerald-500 to-teal-500' },
  { id: 4, name: 'Night', gradient: 'from-gray-800 via-gray-900 to-black' },
  { id: 5, name: 'Sunset', gradient: 'from-yellow-400 via-orange-500 to-red-500' },
  { id: 6, name: 'Ocean', gradient: 'from-cyan-400 via-blue-500 to-indigo-600' },
];

const games = [
  { id: 1, name: 'Minecraft', size: '1.2 GB', icon: '🎮' },
  { id: 2, name: 'Among Us', size: '250 MB', icon: '🚀' },
  { id: 3, name: 'Roblox', size: '450 MB', icon: '🎯' },
  { id: 4, name: 'Fortnite', size: '26 GB', icon: '⚔️' },
  { id: 5, name: 'GTA V', size: '94 GB', icon: '🏎️' },
  { id: 6, name: 'Valorant', size: '23 GB', icon: '🎯' },
];

const steamGames = [
  { id: 1, name: 'Counter-Strike 2', size: '45 GB', icon: '🔫', price: 'Free' },
  { id: 2, name: 'Dota 2', size: '40 GB', icon: '⚔️', price: 'Free' },
  { id: 3, name: 'Team Fortress 2', size: '15 GB', icon: '🎮', price: 'Free' },
  { id: 4, name: 'Rust', size: '20 GB', icon: '🏗️', price: '$39.99' },
  { id: 5, name: 'Apex Legends', size: '75 GB', icon: '🎯', price: 'Free' },
  { id: 6, name: 'PUBG', size: '30 GB', icon: '🪂', price: 'Free' },
];

export default function Index() {
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);
  const [openWindow, setOpenWindow] = useState<WindowType>(null);
  const [showReinstallDialog, setShowReinstallDialog] = useState(false);
  const [showCrashDialog, setShowCrashDialog] = useState(false);
  const [systemCrashed, setSystemCrashed] = useState(false);
  const [systemExists, setSystemExists] = useState(true);

  const handleInstallGame = (gameName: string) => {
    toast.success(`${gameName} начинает загрузку...`, {
      description: 'Проверьте прогресс в разделе загрузок',
    });
  };

  const handleDeleteSystemFile = () => {
    setSystemExists(false);
    setShowCrashDialog(true);
    setTimeout(() => {
      setSystemCrashed(true);
    }, 2000);
  };

  const handleReinstall = () => {
    setSystemCrashed(false);
    setSystemExists(true);
    setShowReinstallDialog(false);
    setOpenWindow(null);
    toast.success('macOS Ventura переустановлена!', {
      description: 'Система успешно восстановлена',
    });
  };

  if (systemCrashed) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="text-8xl">⚠️</div>
          <h1 className="text-4xl font-bold text-white">Критическая ошибка системы</h1>
          <p className="text-xl text-gray-400">SystemMac32 был удален</p>
          <p className="text-lg text-gray-500">macOS Ventura не может продолжить работу</p>
          <Button 
            onClick={handleReinstall}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg"
          >
            Переустановить систему
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen w-screen bg-gradient-to-br ${wallpaper.gradient} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 p-4">
          <div className="flex gap-4 flex-wrap">
            <button 
              onClick={() => window.open('https://google.com', '_blank')}
              className="dock-icon bg-white/90 backdrop-blur flex items-center justify-center text-3xl hover:bg-white transition-all"
              title="Google"
            >
              🌐
            </button>
            <button 
              onClick={() => setOpenWindow('settings')}
              className="dock-icon bg-white/90 backdrop-blur flex items-center justify-center text-3xl hover:bg-white transition-all"
              title="Настройки"
            >
              ⚙️
            </button>
            <button 
              onClick={() => setOpenWindow('thisMac')}
              className="dock-icon bg-white/90 backdrop-blur flex items-center justify-center text-3xl hover:bg-white transition-all"
              title="Этот Mac"
            >
              💻
            </button>
            <button 
              onClick={() => setOpenWindow('macShop')}
              className="dock-icon bg-white/90 backdrop-blur flex items-center justify-center text-3xl hover:bg-white transition-all"
              title="MacSHOP"
            >
              🛍️
            </button>
            <button 
              onClick={() => setOpenWindow('macSteam')}
              className="dock-icon bg-white/90 backdrop-blur flex items-center justify-center text-3xl hover:bg-white transition-all"
              title="MacSteam"
            >
              🎮
            </button>
          </div>
        </div>

        <div className="macos-blur border-t border-white/20 px-4 py-3 flex items-center justify-center gap-2">
          <div className="dock-icon bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <Icon name="Search" size={24} className="text-white" />
          </div>
          <div className="h-12 w-px bg-white/20"></div>
          {[
            { icon: '🌐', action: () => window.open('https://google.com', '_blank'), title: 'Google' },
            { icon: '⚙️', action: () => setOpenWindow('settings'), title: 'Настройки' },
            { icon: '💻', action: () => setOpenWindow('thisMac'), title: 'Этот Mac' },
            { icon: '🛍️', action: () => setOpenWindow('macShop'), title: 'MacSHOP' },
            { icon: '🎮', action: () => setOpenWindow('macSteam'), title: 'MacSteam' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="dock-icon bg-white/90 backdrop-blur flex items-center justify-center text-3xl hover:bg-white transition-all"
              title={item.title}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>

      <Dialog open={openWindow === 'settings'} onOpenChange={() => setOpenWindow(null)}>
        <DialogContent className="macos-window max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <span className="text-3xl">⚙️</span>
              Настройки macOS Ventura
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Обои рабочего стола</h3>
              <div className="grid grid-cols-3 gap-4">
                {wallpapers.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => {
                      setWallpaper(wp);
                      toast.success(`Обои "${wp.name}" установлены`);
                    }}
                    className={`aspect-video rounded-lg bg-gradient-to-br ${wp.gradient} transition-all ${
                      wallpaper.id === wp.id ? 'ring-4 ring-blue-500 scale-105' : 'hover:scale-105'
                    }`}
                  >
                    <span className="text-white text-xs font-medium">{wp.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openWindow === 'thisMac'} onOpenChange={() => setOpenWindow(null)}>
        <DialogContent className="macos-window max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <span className="text-3xl">💻</span>
              Этот Mac
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">macOS Ventura</h3>
              <Button 
                variant="destructive" 
                onClick={() => setShowReinstallDialog(true)}
                className="gap-2"
              >
                <Icon name="RotateCcw" size={16} />
                Переустановить устройство
              </Button>
            </div>

            <Tabs defaultValue="disks" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="disks">Эти диски для вашего Mac</TabsTrigger>
                <TabsTrigger value="system">Информация</TabsTrigger>
              </TabsList>
              <TabsContent value="disks" className="space-y-4 mt-4">
                <Card className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                        💾
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">F.mac</h4>
                        <p className="text-sm text-gray-500">Основной диск</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">200 GB из 700 GB</p>
                      <p className="text-sm text-gray-500">500 GB свободно</p>
                    </div>
                  </div>
                  <Progress value={28.57} className="h-2" />
                </Card>

                <Card className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                        ⚙️
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">A.Setting</h4>
                        <p className="text-sm text-gray-500">Системные настройки</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Системные файлы:</p>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Icon name="FileCode" size={20} className="text-red-500" />
                        <span className="font-mono text-sm">SystemMac32</span>
                        {!systemExists && <span className="text-xs text-red-500">(удален)</span>}
                      </div>
                      {systemExists && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleDeleteSystemFile}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="system" className="space-y-4 mt-4">
                <Card className="p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Версия ОС:</span>
                    <span className="font-semibold">macOS Ventura 13.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Процессор:</span>
                    <span className="font-semibold">Apple M2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Память:</span>
                    <span className="font-semibold">16 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Графика:</span>
                    <span className="font-semibold">Apple M2 10-Core GPU</span>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openWindow === 'macShop'} onOpenChange={() => setOpenWindow(null)}>
        <DialogContent className="macos-window max-w-5xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <span className="text-3xl">🛍️</span>
              MacSHOP
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Популярные игры</h3>
              <p className="text-sm text-gray-500">Скачивайте и устанавливайте игры одним кликом</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {games.map((game) => (
                <Card key={game.id} className="p-4 hover:shadow-lg transition-all">
                  <div className="text-5xl mb-3">{game.icon}</div>
                  <h4 className="font-semibold text-lg mb-1">{game.name}</h4>
                  <p className="text-sm text-gray-500 mb-3">{game.size}</p>
                  <Button 
                    onClick={() => handleInstallGame(game.name)} 
                    className="w-full gap-2"
                  >
                    <Icon name="Download" size={16} />
                    Скачать
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openWindow === 'macSteam'} onOpenChange={() => setOpenWindow(null)}>
        <DialogContent className="macos-window max-w-5xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <span className="text-3xl">🎮</span>
              MacSteam
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
              <h3 className="text-xl font-bold mb-1">Игровая платформа для Mac</h3>
              <p className="text-sm opacity-90">Дизайн в стиле macOS Ventura</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Магазин игр</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {steamGames.map((game) => (
                <Card key={game.id} className="p-4 hover:shadow-lg transition-all">
                  <div className="text-5xl mb-3">{game.icon}</div>
                  <h4 className="font-semibold text-lg mb-1">{game.name}</h4>
                  <p className="text-sm text-gray-500 mb-1">{game.size}</p>
                  <p className="text-lg font-bold text-blue-500 mb-3">{game.price}</p>
                  <Button 
                    onClick={() => handleInstallGame(game.name)} 
                    className="w-full gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Icon name="Download" size={16} />
                    {game.price === 'Free' ? 'Играть' : 'Купить'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showReinstallDialog} onOpenChange={setShowReinstallDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Переустановить macOS Ventura?</AlertDialogTitle>
            <AlertDialogDescription>
              Все данные и настройки будут сброшены. Система будет установлена заново с чистыми настройками.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleReinstall}>
              Переустановить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showCrashDialog} onOpenChange={setShowCrashDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">⚠️ Критическая ошибка</AlertDialogTitle>
            <AlertDialogDescription>
              Файл SystemMac32 был удален! Система не может продолжить работу. 
              macOS Ventura будет завершена через 2 секунды...
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
