import React, { useEffect, useState } from 'react';
import {
  WorkContainer,
  WorkDescription,
  WorkTextDescription,
  WorkDescriptionWrapp,
  WorkFilterWrapp,
  WorkPhotoWrapp,
  WorkTextFilter,
  WorkTitel,
  WorkTitelContainer,
  NotFoundWraperr,
  NotFoundText,
} from '../Work/Work.styled';
import { supabase } from '../../supabaseClient';
import { Border } from '../../components/Footer/Footer.styled';
import WorkItemComponent from '../../components/WorkItemComponent/WorkItemComponent';

export type WorkItemData = {
  id: string;
  folder: string;
  image_name: string;
  title: string;
  description: string;
};

type Quote = {
  id: number;
  text: string;
  author: string;
  source: string;
};

const Photo: React.FC = () => {
  const [works, setWorks] = useState<WorkItemData[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null); // Додаємо стан для поточної цитати
  const [filter, setFilter] = useState<'ALL' | 'COMMERCIAL' | 'PERSONAL'>(
    'ALL'
  );

  const filteredWorks =
    filter === 'ALL'
      ? works
      : works.filter(work => work.folder.toUpperCase() === filter);

  useEffect(() => {
    const fetchWorks = async () => {
      const { data, error } = await supabase.from('work').select('*');
      if (error) {
        console.error('Помилка при отриманні робіт:', error.message);
      } else {
        setWorks(data);
      }
    };

    const fetchQuotes = async () => {
      const { data, error } = await supabase.from('quotes').select('*');
      if (error) {
        console.error('Помилка при отриманні цитат:', error.message);
      } else {
        setQuotes(data);
      }
    };

    fetchWorks();
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      // Встановлюємо випадкову цитату при завантаженні
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }
  }, [quotes]); // Цей useEffect спрацьовує, коли цитати завантажуються

  // const getImageUrl = (folder: string, imageName: string) => {
  //   return `https://qcrjljxbutsvgveiozjd.supabase.co/storage/v1/object/public/work-images/${folder}/${imageName}`;
  // };

  return (
    <WorkContainer>
      <WorkTitelContainer>
        <WorkTitel>PHOTOGRAPHY</WorkTitel>
        <WorkFilterWrapp>
          {['ALL', 'COMMERCIAL', 'PERSONAL'].map(cat => (
            <WorkTextFilter
              key={cat}
              onClick={() => {
                setFilter(cat as 'ALL' | 'COMMERCIAL' | 'PERSONAL');
                if (quotes.length > 0) {
                  const randomIndex = Math.floor(Math.random() * quotes.length);
                  setCurrentQuote(quotes[randomIndex]);
                }
              }}
              className={filter === cat ? 'active' : ''} // Додаємо клас active до активного фільтра
            >
              {cat}
            </WorkTextFilter>
          ))}
        </WorkFilterWrapp>
      </WorkTitelContainer>

      <WorkPhotoWrapp>
        {filteredWorks.length > 0 ? (
          filteredWorks.map(work => (
            <WorkItemComponent key={work.id} work={work} />
          ))
        ) : (
          <NotFoundWraperr>
            <Border />
            <NotFoundText>
              404
              <br />
              NOT FOUND
            </NotFoundText>
          </NotFoundWraperr>
        )}
      </WorkPhotoWrapp>
      {currentQuote && (
        <WorkDescriptionWrapp>
          <WorkDescription>{currentQuote.text}</WorkDescription>
          <WorkTextDescription>
            — {currentQuote.author}, <i>{currentQuote.source}</i>
          </WorkTextDescription>
        </WorkDescriptionWrapp>
      )}
    </WorkContainer>
  );
};

export default Photo