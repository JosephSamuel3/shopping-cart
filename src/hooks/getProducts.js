export async function getProducts() {
  // Fetches product list from fakestoreapi
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } 
  
  catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  } 
  
  finally {
    console.log('getProducts request finished');
  }
}
