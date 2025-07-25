
import React, { useState, useCallback, useMemo } from 'react';
import { Category, Theme, Item, View } from './types';
import { MainMenu } from './components/MainMenu';
import { GalleryView } from './components/GalleryView';
import { QuizView } from './components/QuizView';
import { SurpriseView } from './components/SurpriseView';
import { DetailView } from './components/DetailView';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { allItems } from './services/database';

function App() {
  const [theme, setTheme] = useState<Theme>('stars');
  const [view, setView] = useState<View>('menu');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [surpriseItem, setSurpriseItem] = useState<Item | null>(null);
  const [detailItem, setDetailItem] = useState<Item | null>(null);

  const handleSelectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
    setView('gallery');
  }, []);
  
  const handleStartQuiz = useCallback((category: Category) => {
    setSelectedCategory(category);
    setView('quiz');
  }, []);

  const handleBackToMenu = useCallback(() => {
    setView('menu');
    setSelectedCategory(null);
    setDetailItem(null);
  }, []);

  const handleSurprise = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * allItems.length);
    setSurpriseItem(allItems[randomIndex]);
    setView('surprise');
  }, []);

  const handleCloseSurprise = useCallback(() => {
    setView('menu');
    setSurpriseItem(null);
  }, []);
  
  const handleSelectItem = (item: Item) => {
    setDetailItem(item);
    setView('detail');
  };

  const handleCloseDetail = useCallback(() => {
    setView('gallery'); // Return to the gallery view
    setDetailItem(null);
  }, []);

  const themeClasses = useMemo(() => {
    switch (theme) {
      case 'light': return 'bg-slate-100 text-slate-800';
      case 'dark': return 'bg-gray-900 text-white';
      case 'stars':
      default: return 'bg-stars text-white';
    }
  }, [theme]);

  const renderView = () => {
    switch (view) {
      case 'gallery':
        return selectedCategory && <GalleryView category={selectedCategory} onBack={handleBackToMenu} onStartQuiz={handleStartQuiz} onSelectItem={handleSelectItem} />;
      case 'quiz':
        return selectedCategory && <QuizView category={selectedCategory} onBack={handleBackToMenu} />;
      case 'surprise':
        return surpriseItem && <SurpriseView item={surpriseItem} onClose={handleCloseSurprise} onAnother={handleSurprise}/>;
      case 'detail':
        return detailItem && <DetailView item={detailItem} onClose={handleCloseDetail} />;
      case 'menu':
      default:
        return <MainMenu onSelectCategory={handleSelectCategory} onSurprise={handleSurprise} onStartQuiz={handleStartQuiz} />;
    }
  };

  return (
    <main className={`min-h-screen w-full transition-colors duration-500 ${themeClasses}`}>
      <div className="relative w-full min-h-screen">
          <ThemeSwitcher setTheme={setTheme} currentTheme={theme}/>
          {renderView()}
      </div>
    </main>
  );
}

export default App;
