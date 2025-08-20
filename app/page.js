"use client";



import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Home() {

  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');

  useEffect(()=>{
    const items = localStorage.getItem('shopping-list')
    if(items){
      setItems(JSON.parse(items))
    }else{
      console.log('no items')
    }
  }, [])


  const saveItemToList = () => {
    setItems([...items, item])
    localStorage.setItem('shopping-list', JSON.stringify([...items, item]))
    setItem('')
  }


 const removeItemFromList = (removeIndex) => {
  const filteredItems = items.filter((_, index) => index !== removeIndex);
  setItems(filteredItems);
  localStorage.setItem("shopping-list", JSON.stringify(filteredItems));
};



  return (
    <div className={styles.page}>
      <div className={styles.inputField}>
        <input type="text" placeholder="Add an item" onChange={(e) => {setItem(e.target.value)}}/>
        <button type="submit" onClick={() => saveItemToList()}>Add +</button>
      </div>
      <div className={styles.list}>
        
          {items.map((item, index) => {
            return (
              <div key={index} className={styles.listItem}>
                <h1>{item}</h1>
                <button onClick={() => removeItemFromList(index)}>Remove</button>
              </div>
            )
          })}
        
      </div>
    </div>
  );
}
