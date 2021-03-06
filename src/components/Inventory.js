import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import InventoryCard from './InventoryCard'
import Filter from './Filter'
import { useSelector, useDispatch } from 'react-redux'


function Inventory({setAddToManifest}) {

    
    
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user)
    const beverageArray = useSelector(state => state.userReducer.beverages)
    

   

    useEffect(() => {
        if(user === "not logged in" || beverageArray === null){
            return (
                <div>
                    <Link to='/login'>Please Log In to see your inventory</Link>
                </div>
            )
        } else {
            
            fetch(`http://localhost:3000/stock`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${localStorage.token}`
                }, 
                body: JSON.stringify({user_id: user.id})
            })
            .then(res => res.json())
            .then(res => {
                
                dispatch({type: "populate_items", payload: res})
            })
        }
        },[])
        
         if (beverageArray !== null){

            

             const createBeverageCards = beverageArray.map(beverage => {
               const userInventory = beverage.inventories.filter(obj => obj.user_id === user.id )
               return <InventoryCard 
                key={beverage.id}
                beverageId={beverage.id}
                producer_name={beverage.producer_name}
                proprietary_name={beverage.proprietary_name}
                vintage={beverage.vintage}
                category={beverage.category}
                image_url={beverage.image_url}
                bin={beverage.bin}
                quantity={userInventory[0].quantity}
                setAddToManifest = {setAddToManifest}
                inventories = {beverage.inventories}
               
                /> 
                })

         return(
                <div className="inventory-wrapper">
                { createBeverageCards }
                    <Filter />
                </div>
            )    

    } else {
        return(
            <div>
                <Link to='/login'>Please Log In to see your inventory</Link>
            </div>
        )
    }
}


export default Inventory
