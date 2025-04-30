import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import CollectionComponent from '../../components/CollectionComponent/CollectionComponent';

const CollectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        // Отримуємо колекцію разом з даними з пов'язаної таблиці work
        const { data, error } = await supabase
          .from('collections')
          .select(`
            *,
            work:work_id (folder)
          `)
          .eq('id', id)
          .single();

        if (error) throw error;

        if (!data) {
          throw new Error('Collection not found');
        }

        // Якщо work не знайдено, використовуємо work_id як папку за замовчуванням
        const folder = data.work?.folder || data.work_id.toString();

        setCollection({ 
          ...data,
          folder: folder
        });
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!collection) return <div>Collection not found</div>;

  return <CollectionComponent collection={collection} />;
};

export default CollectionPage;