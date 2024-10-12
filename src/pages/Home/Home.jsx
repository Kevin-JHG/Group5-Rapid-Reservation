import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabase';
import { Flex, Button, Image, SimpleGrid, Title, Text, Card } from '@mantine/core';

export const Home = () => {
  const navigate = useNavigate();
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        // Fetch menu items from Supabase
        const { data, error } = await supabase.from('menu_item').select('*');

        if (error) {
          console.error("Error fetching menu items:", error.message);
          setError(error.message);
        } else {
          // Shuffle and select four random items
          const shuffledItems = data.sort(() => 0.5 - Math.random());
          setFeaturedItems(shuffledItems.slice(0, 4)); // Select the first 4 items
        }
      } catch (err) {
        console.error("Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleReserve = () => navigate('/reservations');
  const handleMenu = () => navigate('/menu');
  const handleLogin = () => navigate('/login');

  // Helper function to get image path based on menu item ID
  const getImagePath = (id) => {
    return `./${id}.png`;
  };

  // Sample customer reviews data
  const reviews = [
    { id: 1, name: "Alice Johnson", text: "Reserving a table was a breeze! The food was incredible, and we had our meals ready when we arrived!" },
    { id: 2, name: "Bob Smith", text: "This app is a game changer! No more waiting—our table was ready and the order was waiting for us!" },
    { id: 3, name: "Charlie Thompson", text: "I love how easy it is to pre-order my favorite dishes! It makes my nights out so much smoother!" },
    { id: 4, name: "Diana Reyes", text: "Made a reservation for my anniversary, and it was flawless! The staff even had a surprise dessert waiting for us!" },
    { id: 5, name: "Evan Patel", text: "This app saves me so much time! I can order ahead and just walk in to enjoy a fantastic meal!" },
    { id: 6, name: "Fiona Chang", text: "I can’t recommend this enough! I’ve reserved tables for group outings, and everything has gone off without a hitch!" },
  ];  

  return (
    <>
      <Flex justify="center" sx={{ width: '100%'}} gap="md">
        <Button variant="outline" color="dark" onClick={handleReserve} radius="md" size="xl">RESERVE</Button>
        <Button variant="outline" color="dark" onClick={handleMenu} radius="md" size="xl">MENU</Button>
      </Flex>

      <Title order={2} style={{ marginTop: '2.5%', marginBottom: '1%' }}>Featured Menu Items</Title>
      <Flex justify="center" style={{ maxWidth: '50%', margin: '0 auto', marginBottom: '3%'}}>
        <SimpleGrid 
          cols={4} 
          spacing="lg"
          breakpoints={[
            { maxWidth: '1200px', cols: 3, spacing: 'md' },
            { maxWidth: '900px', cols: 2, spacing: 'sm' },
            { maxWidth: '600px', cols: 1, spacing: 'xs' },
          ]}
        >
          {loading ? (
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              textAlign: 'center' 
            }}>
              Loading...
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            featuredItems.map(item => (
              <Flex key={item.id} direction="column" align="center">
                <Image 
                  src={getImagePath(item.id)} 
                  alt={item.description} 
                  width="100%"
                  height="100%"
                  fit="cover"
                />
                <Flex style={{ marginTop: '3%'}}>{item.name}</Flex>
              </Flex>
            ))
          )}
        </SimpleGrid>
      </Flex>

      <Button color="dark" onClick={handleLogin} radius="md" size="xl" style={{marginBottom: '3%'}}>LOGIN / SIGN UP</Button>

      <Title order={2}>What Our Customers Say</Title>
      <Flex direction="column" align="center" style={{ margin: '1% 0', marginBottom: '5%' }}>
        <Flex wrap="wrap" justify="center" style={{ marginBottom: '10px', transform: 'translateX(-20px)' }}>
          {reviews.slice(0, 3).map(review => (
            <Card key={review.id} shadow="sm" padding="lg" style={{
              margin: '10px',
              width: '300px',
              height: '190px',
              border: '1px solid #ccc',
              backgroundColor: 'white',
            }}>
              <Text size="lg" weight={500} style={{ marginBottom: '10px' }}>{review.name}</Text>
              <Text style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '4px', quotes: '"\\201C""\\201D"' }}>
                &ldquo;{review.text}&rdquo;
              </Text>
            </Card>
          ))}
        </Flex>

        <Flex wrap="wrap" justify="center" style={{ marginBottom: '10px', transform: 'translateX(20px)' }}>
          {reviews.slice(3).map(review => (
            <Card key={review.id} shadow="sm" padding="lg" style={{
              margin: '10px',
              width: '300px',
              height: '190px',
              border: '1px solid #ccc',
              backgroundColor: 'white',
            }}>
              <Text size="lg" weight={500} style={{ marginBottom: '10px' }}>{review.name}</Text>
              <Text style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '4px', quotes: '"\\201C""\\201D"' }}>
                &ldquo;{review.text}&rdquo;
              </Text>
            </Card>
          ))}
        </Flex>
      </Flex>
    </>
  );
};
