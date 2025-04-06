/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import MyContext from './myContext';
import {collection, getDocs} from "firebase/firestore"
import { fireDB } from '../firebaseConfig/firebaseConfig';

function MyState({children}) {
    // const name = "SagiLoom"
    const [loading, setLoading] = useState(false)
    const [getAllProducts, setGetAllProducts] = useState([]);
    
      // Fetch products from Firestore
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const querySnapshot = await getDocs(collection(fireDB, "products"));
          const fetchedProducts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGetAllProducts(fetchedProducts);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching products:", err);
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchProducts();
      }, []);
    
  return (
    <MyContext.Provider value={{
      loading,
      setLoading,
      getAllProducts
    }}>
       {children}
    </MyContext.Provider>
  )
}

export default MyState