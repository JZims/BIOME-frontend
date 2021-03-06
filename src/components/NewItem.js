import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'

function NewItem(props) {

const dispatch = useDispatch()

const userId = useSelector(state => state.userReducer.user.id)

const [producerName, setProducerName] = useState("")
const [proprietaryName, setProprietaryName ] = useState("")
const [vintage, setVintage] = useState(0)
const [imageUrl, setImageUrl] = useState("")
const [newCategory, setNewCategory] = useState("")
const [newBin, setNewBin] = useState(0)

console.log(userId)
const newBeverageItem = {
    producer_name: producerName, 
    proprietary_name: proprietaryName,
    vintage: vintage, 
    image_url: imageUrl, 
    category: newCategory,
    bin: newBin,
    user_id: userId, 
    quantity: 1
}


function handleNewItem(e){
    e.preventDefault()

    fetch('http://localhost:3000/beverages', {
        method: "POST", 
        headers: {
            "content-Type": "application/json", 
            "Authorization": `Bearer ${localStorage.token}`
        }, body: JSON.stringify(newBeverageItem)
    })
    .then(beverageResults => beverageResults.json())
    .then(beverageResults => {
        console.log(beverageResults)
        const rebuiltObj = {  
            id: beverageResults.beverage.id, 
            proprietary_name: beverageResults.beverage.proprietary_name, 
            producer_name: beverageResults.beverage.producer_name, 
            vintage: beverageResults.beverage.vintage, 
            image_url: beverageResults.beverage.image_url, 
            bin: beverageResults.beverage.bin, 
            inventories: beverageResults.inventories
        }

        dispatch({type: "addItem", payload: rebuiltObj})

})
}


return ( 
<Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
        >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Add a New Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="new_item" onSubmit={e => {handleNewItem(e)}}>
                <Form.Group controlId="newItemProducerName" className="producer_name_field">
                    <Form.Label> Producer Name </Form.Label>
                    <br/>
                    <Form.Control type="text" onChange={event => setProducerName(event.target.value)}/> 
                </Form.Group>
                   
                <Form.Group controlId="newItemProprietaryName" className="proprietary_name_field">
                    <Form.Label> Proprietary Name </Form.Label>
                    <br/>
                    <Form.Control type="text" onChange={event => setProprietaryName(event.target.value)} /> 
                </Form.Group>
                <Form.Group controlId="newItemVintage" className="vintage_field">
                    <Form.Label> Vintage </Form.Label>
                    <br/>
                    <Form.Control type="number" min="1980" max="2020" step="1" onChange={event => setVintage(event.target.value)} /> 
                </Form.Group>
                <Form.Group controlId="newItemImage" className="image_field">
                    <Form.Label> Image URL </Form.Label>
                    <br/>
                    <Form.Control type="text" onChange={event => setImageUrl(event.target.value)} /> 
                </Form.Group>
                <Form.Group controlId="newItemCategory" className="category_field">
                    <Form.Label> Category </Form.Label>
                    <br/>
                    <Form.Control as="select" custom onChange={event => setNewCategory(event.target.value)}>
                    <option value="0">Category...</option>
                    <option value="wine">Wine</option>
                    <option value="beer">Beer</option>
                    <option value="spirits">Spirits</option>
                    </Form.Control>  
                </Form.Group>
                <Form.Group controlId="newItemBin" className="bin_field">
                    <Form.Label> BIN # </Form.Label>
                    <br/>
                    <Form.Control type="number" onChange={event => setNewBin(event.target.value)} /> 
                </Form.Group>
                <Button variant="primary" type="submit" onClick={props.onHide}>
                 Submit
                </Button>
            </Form >
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

    )
}
export default NewItem